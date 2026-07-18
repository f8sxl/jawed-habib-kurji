import { createFileRoute } from "@tanstack/react-router";
import crypto from "crypto";
import Razorpay from "razorpay";
import { saveBooking, Booking } from "../lib/db";
import { sendConfirmationEmails } from "../lib/email";
import { sendBookingNotifications } from "../lib/notifications";
import { sendTelegramOwnerNotification } from "../lib/telegram";

export const Route = createFileRoute("/api/verify-payment")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            razorpay_order_id?: string;
            razorpay_payment_id?: string;
            razorpay_signature?: string;
            customer_name?: string;
            customer_phone?: string;
            customer_email?: string;
            customer_city?: string;
            venue?: string;
            package?: string;
            booking_date?: string;
            amountPaid?: number;
            total_price?: number;
            remaining_balance?: number;
          };
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature, total_price, remaining_balance, amountPaid } = body;

          if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return new Response(
              JSON.stringify({ error: "Missing required verification parameters" }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          const isMock = razorpay_payment_id.startsWith("pay_MOCK");
          let booking: Booking;

          if (isMock) {
            // Generate unique Booking ID: JHKB-XXXXXX (6 random uppercase alphanumeric)
            const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
            const bookingId = `JHKB-${randomChars}`;

            booking = {
              id: bookingId,
              customerName: body.customer_name || "Mock Customer",
              mobileNumber: body.customer_phone || "9572194458",
              emailAddress: body.customer_email || "jawedhabib.kurji@gmail.com",
              city: body.customer_city || "Patna",
              weddingDate: body.booking_date || new Date().toLocaleDateString(),
              weddingVenue: body.venue || "",
              packageSelected: body.package || "Ultra HD Bridal",
              totalPrice: total_price || 17199,
              amountPaid: amountPaid || 2000,
              remainingBalance: remaining_balance || 15199,
              paymentId: razorpay_payment_id,
              orderId: razorpay_order_id,
              bookingTime: new Date().toISOString(),
            };
          } else {
            const keyId =
              process.env.RAZORPAY_KEY_ID ||
              (import.meta.env ? import.meta.env.RAZORPAY_KEY_ID : undefined);
            const keySecret =
              process.env.RAZORPAY_KEY_SECRET ||
              (import.meta.env ? import.meta.env.RAZORPAY_KEY_SECRET : undefined);

            if (!keyId || !keySecret) {
              return new Response(
                JSON.stringify({
                  error:
                    "Razorpay credentials not configured on the server. Please verify your environment variables.",
                }),
                {
                  status: 500,
                  headers: { "Content-Type": "application/json" },
                },
              );
            }

            // Verify signature first
            const expectedSignature = crypto
              .createHmac("sha256", keySecret)
              .update(razorpay_order_id + "|" + razorpay_payment_id)
              .digest("hex");

            if (expectedSignature !== razorpay_signature) {
              return new Response(
                JSON.stringify({
                  status: "failure",
                  error: "Invalid signature, payment verification failed",
                }),
                {
                  status: 400,
                  headers: { "Content-Type": "application/json" },
                },
              );
            }

            // Payment signature is valid. Let's fetch details from Razorpay to build the booking record.
            const razorpay = new Razorpay({
              key_id: keyId,
              key_secret: keySecret,
            });

            const order = await razorpay.orders.fetch(razorpay_order_id);
            const notes = (order.notes as any) || {};

            // Generate unique Booking ID: JHKB-XXXXXX (6 random uppercase alphanumeric)
            const randomChars = Math.random().toString(36).substring(2, 8).toUpperCase();
            const bookingId = `JHKB-${randomChars}`;

            booking = {
              id: bookingId,
              customerName: notes.customer_name || "",
              mobileNumber: notes.customer_phone || "",
              emailAddress: notes.customer_email || "",
              city: notes.customer_city || "",
              weddingDate: notes.booking_date || "",
              weddingVenue: notes.venue || "",
              packageSelected: notes.package || "",
              totalPrice: notes.total_price ? parseInt(notes.total_price) : 0,
              amountPaid: Number(order.amount) / 100, // Convert paise to INR
              remainingBalance: notes.remaining_balance ? parseInt(notes.remaining_balance) : 0,
              paymentId: razorpay_payment_id,
              orderId: razorpay_order_id,
              bookingTime: new Date().toISOString(),
            };
          }

          // Save to database
          const dbSaved = await saveBooking(booking);
          if (!dbSaved) {
            console.error(`Failed to save booking ${bookingId} to database.`);
          }

          // Send email notifications (owner and customer)
          const emailResult = await sendConfirmationEmails(booking);
          if (!emailResult.success) {
            console.error(`Email sending failed for booking ${bookingId}:`, emailResult.error);
          }

          // Send owner alert via Telegram
          const telegramResult = await sendTelegramOwnerNotification(booking);
          if (!telegramResult.success) {
            console.warn(`Telegram sending bypassed or failed:`, telegramResult.error);
          }

          // Send automated SMS & WhatsApp notifications (customer gets SMS, owner gets WhatsApp)
          const messageResult = await sendBookingNotifications(booking);
          console.log(
            `[Alerts] SMS sent: ${messageResult.sms}, WhatsApp sent: ${messageResult.whatsapp}`,
          );

          return new Response(
            JSON.stringify({
              status: "success",
              message: "Payment verified and booking confirmed",
              booking,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (error) {
          const errMsg = error instanceof Error ? error.message : String(error);
          console.error("Error verifying payment:", error);
          return new Response(JSON.stringify({ error: errMsg || "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});

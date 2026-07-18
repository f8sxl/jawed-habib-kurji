import { createFileRoute } from "@tanstack/react-router";
import crypto from "crypto";
import { updateBookingStatusAndPayment, getLocalBookings } from "../lib/db";
import { sendConfirmationEmails } from "../lib/email";
import { sendBookingNotifications } from "../lib/notifications";
import { sendTelegramOwnerNotification } from "../lib/telegram";
import { supabase } from "../lib/supabase";

export const Route = createFileRoute("/api/webhooks/razorpay")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const signature = request.headers.get("x-razorpay-signature");
          const rawBody = await request.text();

          const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

          if (!webhookSecret) {
            console.error("Webhook secret not configured.");
            return new Response("Webhook secret not configured", { status: 500 });
          }

          if (!signature) {
            return new Response("Missing signature", { status: 400 });
          }

          // Verify webhook signature
          const expectedSignature = crypto
            .createHmac("sha256", webhookSecret)
            .update(rawBody)
            .digest("hex");

          if (expectedSignature !== signature) {
            return new Response("Invalid signature", { status: 400 });
          }

          const body = JSON.parse(rawBody);

          if (body.event === "payment.captured") {
            const paymentEntity = body.payload.payment.entity;
            const razorpay_order_id = paymentEntity.order_id;
            const razorpay_payment_id = paymentEntity.id;

            if (razorpay_order_id && razorpay_payment_id) {
              // Check if booking is already confirmed to avoid duplicate emails
              let isAlreadyConfirmed = false;
              
              if (supabase) {
                const { data } = await supabase
                  .from("bookings")
                  .select("status")
                  .eq("orderId", razorpay_order_id)
                  .maybeSingle();
                
                if (data && data.status === "CONFIRMED") {
                  isAlreadyConfirmed = true;
                }
              } else {
                const bookings = getLocalBookings();
                const b = bookings.find(x => x.orderId === razorpay_order_id);
                if (b && b.status === "CONFIRMED") {
                  isAlreadyConfirmed = true;
                }
              }

              if (!isAlreadyConfirmed) {
                const updatedBooking = await updateBookingStatusAndPayment(
                  razorpay_order_id,
                  razorpay_payment_id,
                  "CONFIRMED"
                );

                if (updatedBooking) {
                  // Fire and forget notifications
                  sendConfirmationEmails(updatedBooking).catch(err => console.error("Email error:", err));
                  sendTelegramOwnerNotification(updatedBooking).catch(err => console.error("Telegram error:", err));
                  sendBookingNotifications(updatedBooking).catch(err => console.error("SMS/WhatsApp error:", err));
                }
              }
            }
          }

          return new Response(JSON.stringify({ status: "ok" }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
          });
        } catch (error) {
          console.error("Error processing webhook:", error);
          return new Response("Internal Server Error", { status: 500 });
        }
      }
    }
  }
});

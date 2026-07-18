import { createFileRoute } from "@tanstack/react-router";
import crypto from "crypto";
import { updateBookingStatusAndPayment } from "../lib/db";
import { sendConfirmationEmails } from "../lib/email";
import { sendBookingNotifications } from "../lib/notifications";
import { sendTelegramOwnerNotification } from "../lib/telegram";

export const Route = createFileRoute("/api/payment-callback")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const contentType = request.headers.get("content-type") || "";
          let razorpay_payment_id = "";
          let razorpay_order_id = "";
          let razorpay_signature = "";

          // Razorpay callback redirects send data as application/x-www-form-urlencoded
          if (contentType.includes("application/x-www-form-urlencoded")) {
            const formData = await request.formData();
            razorpay_payment_id = formData.get("razorpay_payment_id") as string;
            razorpay_order_id = formData.get("razorpay_order_id") as string;
            razorpay_signature = formData.get("razorpay_signature") as string;
          } else {
            // Fallback for JSON testing if needed
            const body = await request.json();
            razorpay_payment_id = body.razorpay_payment_id;
            razorpay_order_id = body.razorpay_order_id;
            razorpay_signature = body.razorpay_signature;
          }

          if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return new Response("Missing required verification parameters", { status: 400 });
          }

          const keySecret =
            process.env.RAZORPAY_KEY_SECRET ||
            (import.meta.env ? import.meta.env.RAZORPAY_KEY_SECRET : undefined);

          if (!keySecret) {
            return new Response("Razorpay credentials not configured", { status: 500 });
          }

          // Verify signature
          const expectedSignature = crypto
            .createHmac("sha256", keySecret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

          if (expectedSignature !== razorpay_signature) {
            return new Response("Invalid signature, payment verification failed", { status: 400 });
          }

          // Payment signature is valid. Update the booking status to CONFIRMED.
          const updatedBooking = await updateBookingStatusAndPayment(
            razorpay_order_id,
            razorpay_payment_id,
            "CONFIRMED"
          );

          if (updatedBooking) {
            // We only send emails if we successfully retrieved/updated the booking.
            
            // Fire and forget notifications
            sendConfirmationEmails(updatedBooking).catch(err => console.error("Email error:", err));
            sendTelegramOwnerNotification(updatedBooking).catch(err => console.error("Telegram error:", err));
            sendBookingNotifications(updatedBooking).catch(err => console.error("SMS/WhatsApp error:", err));

            // Redirect back to frontend success page
            return new Response(null, {
              status: 302,
              headers: {
                Location: `/booking-confirmation?bookingId=${updatedBooking.id}`,
              },
            });
          }

          // If booking wasn't found in PENDING DB:
          return new Response("Payment verified, but booking record not found.", { status: 404 });

        } catch (error) {
          console.error("Error verifying payment callback:", error);
          return new Response("Internal Server Error", { status: 500 });
        }
      },
    },
  },
});

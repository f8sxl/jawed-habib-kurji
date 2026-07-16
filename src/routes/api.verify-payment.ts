import { createFileRoute } from '@tanstack/react-router';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { saveBooking, Booking } from '../lib/db';
import { sendConfirmationEmails } from '../lib/email';

export const Route = createFileRoute('/api/verify-payment')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json() as {
            razorpay_order_id?: string;
            razorpay_payment_id?: string;
            razorpay_signature?: string;
          };
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

          if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return new Response(JSON.stringify({ error: "Missing required verification parameters" }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
          }

          const keyId = process.env.RAZORPAY_KEY_ID;
          const keySecret = process.env.RAZORPAY_KEY_SECRET;
          
          if (!keyId || !keySecret) {
            return new Response(JSON.stringify({ error: "Razorpay credentials not configured on the server" }), {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            });
          }

          // Verify signature first
          const expectedSignature = crypto
            .createHmac('sha256', keySecret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

          if (expectedSignature !== razorpay_signature) {
            return new Response(JSON.stringify({ status: "failure", error: "Invalid signature, payment verification failed" }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
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

          const booking: Booking = {
            id: bookingId,
            customerName: notes.customer_name || '',
            mobileNumber: notes.customer_phone || '',
            emailAddress: notes.customer_email || '',
            city: notes.customer_city || '',
            weddingDate: notes.booking_date || '',
            weddingVenue: notes.venue || '',
            packageSelected: notes.package || '',
            amountPaid: Number(order.amount) / 100, // Convert paise to INR
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
            bookingTime: new Date().toISOString(),
          };

          // Save to database
          const dbSaved = saveBooking(booking);
          if (!dbSaved) {
            console.error(`Failed to save booking ${bookingId} to database.`);
          }

          // Send email notifications (owner and customer)
          const emailResult = await sendConfirmationEmails(booking);
          if (!emailResult.success) {
            console.error(`Email sending failed for booking ${bookingId}:`, emailResult.error);
          }

          return new Response(JSON.stringify({ 
            status: "success", 
            message: "Payment verified and booking confirmed",
            booking 
          }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });

        } catch (error: any) {
          console.error("Error verifying payment:", error);
          return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      },
    },
  },
});

import { createFileRoute } from "@tanstack/react-router";
import Razorpay from "razorpay";
import { updateBooking } from "../lib/db";

export const Route = createFileRoute("/api/create-order")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as {
            amount?: number;
            currency?: string;
            receipt?: string;
            name?: string;
            phone?: string;
            email?: string;
            city?: string;
            venue?: string;
            packageName?: string;
            bookingDate?: string;
            total_price?: number;
            remaining_balance?: number;
            bookingId?: string;
          };
          const {
            amount,
            currency,
            receipt,
            name,
            phone,
            email,
            city,
            venue,
            packageName,
            bookingDate,
            total_price,
            remaining_balance,
            bookingId,
          } = body;

          if (!amount || amount < 100) {
            return new Response(JSON.stringify({ error: "Amount must be at least 100 paise" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

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

          const razorpay = new Razorpay({
            key_id: keyId,
            key_secret: keySecret,
          });

          const order = await razorpay.orders.create({
            amount,
            currency: currency || "INR",
            receipt: receipt || `receipt_${Date.now()}`,
            notes: {
              customer_name: name || "",
              customer_phone: phone || "",
              customer_email: email || "",
              customer_city: city || "",
              venue: venue || "",
              package: packageName || "",
              booking_date: bookingDate || "",
              total_price: total_price ? String(total_price) : "0",
              remaining_balance: remaining_balance ? String(remaining_balance) : "0",
            },
          });

          if (bookingId) {
            await updateBooking(bookingId, {
              orderId: order.id,
              status: "PENDING",
            });
          }

          return new Response(
            JSON.stringify({
              order_id: order.id,
              amount: order.amount,
              currency: order.currency,
              notes: order.notes,
            }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (error: any) {
          console.error("Error creating order:", error);
          
          // Razorpay throws errors with a nested .error object
          const errorMessage = 
            error?.error?.description || 
            error?.message || 
            "Internal Server Error. Please check your Razorpay API keys.";

          return new Response(JSON.stringify({ error: errorMessage }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});

import { createFileRoute } from "@tanstack/react-router";
import { saveBooking } from "../lib/db";

export const Route = createFileRoute("/api/create-lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const data = await request.json();
          const {
            name,
            phone,
            email,
            city,
            venue,
            packageName,
            bookingDate,
            total_price,
            remaining_balance,
          } = data;

          if (!name || !phone || !bookingDate || !packageName) {
            return new Response(JSON.stringify({ error: "Missing required lead fields" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Generate a unique Lead/Booking ID
          const timestamp = new Date();
          const leadId = `JHKB-${Math.floor(100000 + Math.random() * 900000)}`;

          // Save as LEAD
          const bookingData = {
            id: leadId,
            customerName: name,
            mobileNumber: phone,
            emailAddress: email || "",
            city: city || "",
            weddingVenue: venue || "",
            weddingDate: bookingDate,
            packageSelected: packageName,
            totalPrice: total_price,
            amountPaid: 0, // Will be updated when paid
            remainingBalance: remaining_balance,
            bookingTime: timestamp.toISOString(),
            status: "LEAD" as const,
          };

          const saved = await saveBooking(bookingData);
          if (!saved) {
            return new Response(JSON.stringify({ error: "Failed to save lead to database" }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }

          return new Response(JSON.stringify({ success: true, leadId }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error: any) {
          console.error("Lead Creation Error:", error);
          return new Response(JSON.stringify({ error: error.message || "Failed to create lead" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});

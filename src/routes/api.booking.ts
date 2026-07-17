import { createFileRoute } from "@tanstack/react-router";
import { getBookingById } from "../lib/db";

export const Route = createFileRoute("/api/booking")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const id = url.searchParams.get("id");

        if (!id) {
          return new Response(JSON.stringify({ error: "Missing booking ID" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          });
        }

        const booking = await getBookingById(id);

        if (!booking) {
          return new Response(JSON.stringify({ error: "Booking not found" }), {
            status: 404,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify(booking), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});

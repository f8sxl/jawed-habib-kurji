import { createFileRoute } from "@tanstack/react-router";
import { sendTelegramChatLead } from "../lib/telegram";

export const Route = createFileRoute("/api/chat-lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { phone, question, preference } = body;

          if (!phone || !question) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          const telegramResult = await sendTelegramChatLead(phone, question, preference);

          if (!telegramResult.success) {
            console.error("Failed to send chat lead to Telegram:", telegramResult.error);
            return new Response(JSON.stringify({ success: true, warning: "Notification failed" }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (error) {
          console.error("Chat lead API error:", error);
          return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});

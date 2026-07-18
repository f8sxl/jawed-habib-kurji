import { Booking } from "./db";

export async function sendTelegramOwnerNotification(
  booking: Booking,
): Promise<{ success: boolean; error?: string }> {
  const token =
    process.env.TELEGRAM_BOT_TOKEN ||
    (import.meta.env ? import.meta.env.VITE_TELEGRAM_BOT_TOKEN : undefined);
  const chatId =
    process.env.TELEGRAM_CHAT_ID ||
    (import.meta.env ? import.meta.env.VITE_TELEGRAM_CHAT_ID : undefined);

  if (!token || !chatId) {
    console.warn("[Telegram] Bot token or chat ID not set. Skipping Telegram owner notification.");
    return { success: false, error: "Telegram credentials not configured" };
  }

  const bookingTimeStr = new Date(booking.bookingTime).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  let cleanPhone = booking.mobileNumber.replace(/\D/g, "");
  if (cleanPhone.length === 10) cleanPhone = `91${cleanPhone}`;

  const [datePart, timePart] = booking.weddingDate.split(" at ");

  const message =
    `<b>🔔 New Bridal Booking Secured!</b>\n\n` +
    `<b>Booking ID:</b> <code>${booking.id}</code>\n` +
    `<b>Customer Name:</b> ${booking.customerName}\n` +
    `<b>Mobile Number:</b> ${booking.mobileNumber}\n` +
    `<b>Email:</b> ${booking.emailAddress}\n` +
    `<b>City:</b> ${booking.city}\n` +
    `<b>Wedding Date:</b> ${datePart}\n` +
    (timePart ? `<b>Time Slot:</b> ${timePart}\n` : "") +
    `<b>Wedding Venue:</b> ${booking.weddingVenue || "Not Specified (In-Salon)"}\n` +
    `<b>Package Selected:</b> ${booking.packageSelected}\n\n` +
    `<b>💰 Payment Breakdown:</b>\n` +
    `<b>Total Package Value:</b> ₹${(booking.totalPrice || 0).toLocaleString("en-IN")}\n` +
    `<b>Booking Deposit Paid:</b> ₹${booking.amountPaid.toLocaleString("en-IN")} ✅\n` +
    `<b>Due at Venue:</b> ₹${(booking.remainingBalance || 0).toLocaleString("en-IN")}\n\n` +
    `<b>Payment ID:</b> <code>${booking.paymentId}</code>\n` +
    `<b>Booking Time:</b> ${bookingTimeStr}\n\n` +
    `📞 <a href="tel:${booking.mobileNumber}">Call Customer</a>\n` +
    `💬 <a href="https://wa.me/${cleanPhone}">WhatsApp Customer</a>\n` +
    `✉️ <a href="mailto:${booking.emailAddress}">Email Customer</a>`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || "Failed to send Telegram message");
    }

    console.log("[Telegram] Owner notification sent successfully.");
    return { success: true };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("[Telegram] Error sending message:", error);
    return { success: false, error: errMsg };
  }
}

export async function sendTelegramChatLead(
  phone: string,
  question: string,
  preference?: "call" | "whatsapp" | null
): Promise<{ success: boolean; error?: string }> {
  const token =
    process.env.TELEGRAM_BOT_TOKEN ||
    (import.meta.env ? import.meta.env.VITE_TELEGRAM_BOT_TOKEN : undefined);
  const chatId =
    process.env.TELEGRAM_CHAT_ID ||
    (import.meta.env ? import.meta.env.VITE_TELEGRAM_CHAT_ID : undefined);

  if (!token || !chatId) {
    console.warn("[Telegram] Bot token or chat ID not set. Skipping Chat Lead notification.");
    return { success: false, error: "Telegram credentials not configured" };
  }

  let cleanPhone = phone.replace(/\D/g, "");
  if (cleanPhone.length === 10) cleanPhone = `91${cleanPhone}`;

  const prefText = preference 
    ? (preference === "call" ? "📞 Prefers Call" : "💬 Prefers WhatsApp")
    : "Not specified";

  const message =
    `<b>💬 New Chat Lead Captured!</b>\n\n` +
    `<b>Phone Number:</b> ${phone}\n` +
    `<b>Preference:</b> ${prefText}\n` +
    `<b>They Asked About:</b> <i>"${question}"</i>\n\n` +
    `📞 <a href="tel:${phone}">Call Customer</a>\n` +
    `💬 <a href="https://wa.me/${cleanPhone}">WhatsApp Customer</a>`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || "Failed to send Telegram message");
    }

    console.log("[Telegram] Chat lead notification sent successfully.");
    return { success: true };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("[Telegram] Error sending chat lead message:", error);
    return { success: false, error: errMsg };
  }
}

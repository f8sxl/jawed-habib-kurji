import fs from "fs";
import path from "path";
import { Booking } from "./db";

const LOG_DIR = path.resolve(process.cwd(), "src/data");
const LOG_FILE = path.join(LOG_DIR, "mock-messages.log");

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

// Low-level SMS sender using Twilio REST API
export async function sendSMS(
  to: string,
  body: string,
): Promise<{ success: boolean; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    // Return mock log entry
    ensureLogDir();
    const logEntry = `
========================================
[MOCK SMS] TIMESTAMP: ${new Date().toISOString()}
TO: ${to}
BODY: ${body}
========================================
`;
    try {
      fs.appendFileSync(LOG_FILE, logEntry, "utf-8");
      console.log(
        `[MOCK SMS] Saved SMS to src/data/mock-messages.log (Twilio credentials not configured)`,
      );
      return { success: true };
    } catch (err: any) {
      console.error("Failed to write mock SMS:", err);
      return { success: false, error: err.message };
    }
  }

  try {
    const authString = btoa(`${accountSid}:${authToken}`);
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: to,
          From: fromNumber,
          Body: body,
        }).toString(),
      },
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Twilio SMS API error: ${errText}`);
    }

    return { success: true };
  } catch (err: any) {
    console.error(`Error sending SMS to ${to}:`, err);
    return { success: false, error: err.message };
  }
}

// Low-level WhatsApp sender using Twilio REST API
export async function sendWhatsApp(
  to: string,
  body: string,
): Promise<{ success: boolean; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromWhatsApp = process.env.TWILIO_WHATSAPP_NUMBER; // e.g. "whatsapp:+14155238886"

  // Ensure target number is in international format for Twilio (starts with +)
  let formattedTo = to.trim();
  if (!formattedTo.startsWith("+")) {
    // Default to Indian prefix (+91) if it's a 10-digit number
    if (formattedTo.length === 10) {
      formattedTo = `+91${formattedTo}`;
    } else {
      formattedTo = `+${formattedTo}`;
    }
  }

  if (!accountSid || !authToken || !fromWhatsApp) {
    // Return mock log entry
    ensureLogDir();
    const logEntry = `
========================================
[MOCK WHATSAPP] TIMESTAMP: ${new Date().toISOString()}
TO: whatsapp:${formattedTo}
BODY: ${body}
========================================
`;
    try {
      fs.appendFileSync(LOG_FILE, logEntry, "utf-8");
      console.log(
        `[MOCK WHATSAPP] Saved WhatsApp to src/data/mock-messages.log (Twilio credentials not configured)`,
      );
      return { success: true };
    } catch (err: any) {
      console.error("Failed to write mock WhatsApp:", err);
      return { success: false, error: err.message };
    }
  }

  try {
    const authString = btoa(`${accountSid}:${authToken}`);
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: `whatsapp:${formattedTo}`,
          From: fromWhatsApp.startsWith("whatsapp:") ? fromWhatsApp : `whatsapp:${fromWhatsApp}`,
          Body: body,
        }).toString(),
      },
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Twilio WhatsApp API error: ${errText}`);
    }

    return { success: true };
  } catch (err: any) {
    console.error(`Error sending WhatsApp to ${formattedTo}:`, err);
    return { success: false, error: err.message };
  }
}

// Orchestrator to trigger all customer & owner alerts on successful payment
export async function sendBookingNotifications(
  booking: Booking,
): Promise<{ sms: boolean; whatsapp: boolean }> {
  const ownerWhatsApp = process.env.OWNER_WHATSAPP || "9572194458";

  // 1. Format notifications
  const customerSMSBody = `Hi ${booking.customerName}, your bridal booking at Jawed Habib Kurji is CONFIRMED! Booking ID: ${booking.id}. Date: ${booking.weddingDate}. Deposit ₹${booking.amountPaid} paid. Thank you!`;

  const ownerWhatsAppBody =
    `*New Bridal Booking Secured!*\n\n` +
    `• *Booking ID:* ${booking.id}\n` +
    `• *Customer:* ${booking.customerName}\n` +
    `• *Mobile:* ${booking.mobileNumber}\n` +
    `• *Email:* ${booking.emailAddress}\n` +
    `• *Package:* ${booking.packageSelected}\n` +
    `• *Wedding Date:* ${booking.weddingDate}\n` +
    `• *Venue:* ${booking.weddingVenue || "In-Salon"}\n` +
    `• *Deposit Paid:* ₹${booking.amountPaid}\n\n` +
    `Please log in to your dashboard to view more details.`;

  // 2. Trigger notifications in parallel
  const [smsResult, whatsappResult] = await Promise.all([
    // Send SMS to the booking customer
    sendSMS(booking.mobileNumber, customerSMSBody),
    // Send WhatsApp notification to the owner
    sendWhatsApp(ownerWhatsApp, ownerWhatsAppBody),
  ]);

  if (!smsResult.success) {
    console.error(`Customer SMS alert failed:`, smsResult.error);
  }
  if (!whatsappResult.success) {
    console.error(`Owner WhatsApp alert failed:`, whatsappResult.error);
  }

  return {
    sms: smsResult.success,
    whatsapp: whatsappResult.success,
  };
}

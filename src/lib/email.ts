import fs from "fs";
import path from "path";
import { Booking } from "./db";

const LOG_DIR = path.resolve(process.cwd(), "src/data");
const LOG_FILE = path.join(LOG_DIR, "mock-emails.log");

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

export async function sendConfirmationEmails(
  booking: Booking,
): Promise<{ success: boolean; error?: string }> {
  const apiKey =
    process.env.RESEND_API_KEY || (import.meta.env ? import.meta.env.RESEND_API_KEY : undefined);
  const fromEmail = process.env.EMAIL_FROM || "onboarding@resend.dev";
  const ownerEmail = process.env.OWNER_EMAIL || "jawedhabib.kurji@gmail.com";

  const bookingTimeStr = new Date(booking.bookingTime).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const [datePart, timePart] = booking.weddingDate.split(" at ");

  // WhatsApp, Call, and Email buttons configuration for Owner
  let cleanPhone = booking.mobileNumber.replace(/\D/g, "");
  if (cleanPhone.length === 10) cleanPhone = `91${cleanPhone}`;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(booking.customerName)}%2C%20this%20is%20Jawed%20Habib%20Kurji%20Bridal%20Studio.%20We%20received%20your%20booking%20for%20the%20${encodeURIComponent(booking.packageSelected)}%20package!`;
  const callUrl = `tel:${booking.mobileNumber}`;
  const emailUrl = `mailto:${booking.emailAddress}?subject=Bridal%20Booking%20Confirmation%20-%20Jawed%20Habib%20Kurji%20(ID:%20${booking.id})`;

  // Owner Email Content
  const ownerSubject = `New Booking Received! ID: ${booking.id}`;
  const ownerHtml = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #222; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 25px; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
      <div style="text-align: center; margin-bottom: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px;">
        <h2 style="color: #c5a850; margin: 0; font-size: 22px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;">New Bridal Booking</h2>
        <p style="color: #64748b; font-size: 13px; margin: 5px 0 0 0;">Booking ID: ${booking.id}</p>
      </div>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px;">
        <tr><td style="padding: 10px 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569; width: 40%;">Booking ID:</td><td style="padding: 10px 8px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${booking.id}</td></tr>
        <tr><td style="padding: 10px 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Customer Name:</td><td style="padding: 10px 8px; border-bottom: 1px solid #f1f5f9;">${booking.customerName}</td></tr>
        <tr><td style="padding: 10px 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Mobile Number:</td><td style="padding: 10px 8px; border-bottom: 1px solid #f1f5f9;">${booking.mobileNumber}</td></tr>
        <tr><td style="padding: 10px 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Email Address:</td><td style="padding: 10px 8px; border-bottom: 1px solid #f1f5f9;">${booking.emailAddress}</td></tr>
        <tr><td style="padding: 10px 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">City:</td><td style="padding: 10px 8px; border-bottom: 1px solid #f1f5f9;">${booking.city}</td></tr>
        <tr><td style="padding: 10px 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Wedding Date:</td><td style="padding: 10px 8px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">${datePart}</td></tr>
        ${timePart ? `<tr><td style="padding: 10px 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Time Slot:</td><td style="padding: 10px 8px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #c5a850;">${timePart}</td></tr>` : ""}
        <tr><td style="padding: 10px 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Wedding Venue:</td><td style="padding: 10px 8px; border-bottom: 1px solid #f1f5f9;">${booking.weddingVenue || "Not Specified (In-Salon)"}</td></tr>
        <tr><td style="padding: 10px 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Selected Package:</td><td style="padding: 10px 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #c5a850;">${booking.packageSelected}</td></tr>
        <tr><td style="padding: 10px 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Total Package Value:</td><td style="padding: 10px 8px; border-bottom: 1px solid #f1f5f9; font-weight: 600;">₹${(booking.totalPrice || 0).toLocaleString("en-IN")}</td></tr>
        <tr><td style="padding: 10px 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Deposit Paid:</td><td style="padding: 10px 8px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #15803d;">₹${booking.amountPaid.toLocaleString("en-IN")} ✅</td></tr>
        <tr><td style="padding: 10px 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Due at Venue:</td><td style="padding: 10px 8px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #b91c1c;">₹${(booking.remainingBalance || 0).toLocaleString("en-IN")}</td></tr>
        <tr><td style="padding: 10px 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Payment Status:</td><td style="padding: 10px 8px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #16a34a;">PAID</td></tr>
        <tr><td style="padding: 10px 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Razorpay Payment ID:</td><td style="padding: 10px 8px; border-bottom: 1px solid #f1f5f9; font-family: monospace; font-size: 13px;">${booking.paymentId}</td></tr>
        <tr><td style="padding: 10px 8px; font-weight: bold; border-bottom: 1px solid #f1f5f9; color: #475569;">Booking Time:</td><td style="padding: 10px 8px; border-bottom: 1px solid #f1f5f9;">${bookingTimeStr}</td></tr>
      </table>
      
      <div style="margin-top: 25px; padding-top: 20px; border-top: 1px dashed #e2e8f0; text-align: center;">
        <p style="font-size: 12px; font-weight: bold; color: #64748b; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Quick Actions</p>
        <a href="${callUrl}" style="background-color: #c5a850; color: #ffffff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px; display: inline-block; margin: 5px; min-width: 140px;">📞 Call Customer</a>
        <a href="${whatsappUrl}" target="_blank" style="background-color: #25D366; color: #ffffff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px; display: inline-block; margin: 5px; min-width: 140px;">💬 WhatsApp</a>
        <a href="${emailUrl}" style="background-color: #0070f3; color: #ffffff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px; display: inline-block; margin: 5px; min-width: 140px;">✉️ Email</a>
      </div>
    </div>
  `;

  // Customer Links
  const customerWhatsappUrl = `https://wa.me/919572194458?text=Hi%20Jawed%20Habib%20Kurji%2C%20I%20just%20completed%20my%20bridal%20booking%20deposit%20(ID%3A%20${booking.id})!`;
  const googleMapsUrl = `https://maps.google.com/?q=Jawed+Habib+Hair+Beauty+Kurji+Patna`;

  // Customer Email Content
  const customerSubject = `Booking Confirmed! Your Bridal Reservation - Jawed Habib Kurji`;
  const customerHtml = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #222; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 30px; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
      <div style="text-align: center; margin-bottom: 25px; border-bottom: 1px solid #e2e8f0; padding-bottom: 20px;">
        <h2 style="color: #c5a850; margin: 0; font-size: 24px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase;">Booking Secured</h2>
        <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">Thank you for reserving your special day with us.</p>
      </div>
      
      <p style="font-size: 15px;">Dear <strong>${booking.customerName}</strong>,</p>
      <p style="font-size: 15px;">We are absolutely thrilled to join you on your bridal journey! We have successfully received your booking deposit of <strong>₹${booking.amountPaid}</strong>. Your luxury bridal appointment has been secured in our schedule.</p>
      
      <div style="background-color: #fbfbfd; border: 1px solid #f1f5f9; border-radius: 8px; padding: 20px; margin: 25px 0;">
        <h3 style="margin-top: 0; color: #c5a850; font-size: 15px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Reservation Summary</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 10px;">
          <tr><td style="padding: 6px 0; color: #64748b; font-weight: bold; width: 40%;">Booking ID:</td><td style="padding: 6px 0; font-weight: 600;">${booking.id}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-weight: bold;">Selected Package:</td><td style="padding: 6px 0; font-weight: 600; color: #c5a850;">${booking.packageSelected}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-weight: bold;">Wedding Date:</td><td style="padding: 6px 0; font-weight: 600;">${datePart}</td></tr>
          ${timePart ? `<tr><td style="padding: 6px 0; color: #64748b; font-weight: bold;">Time Slot:</td><td style="padding: 6px 0; font-weight: 600;">${timePart}</td></tr>` : ""}
          <tr><td style="padding: 6px 0; color: #64748b; font-weight: bold;">Wedding Venue:</td><td style="padding: 6px 0;">${booking.weddingVenue || "Not Specified (In-Salon Appointment)"}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-weight: bold;">Total Package Price:</td><td style="padding: 6px 0; font-weight: 600;">₹${(booking.totalPrice || 0).toLocaleString("en-IN")}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-weight: bold;">Deposit Paid (Now):</td><td style="padding: 6px 0; font-weight: 600; color: #16a34a;">- ₹${booking.amountPaid.toLocaleString("en-IN")}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-weight: bold;">Due at Venue:</td><td style="padding: 6px 0; font-weight: bold; color: #c5a850;">₹${(booking.remainingBalance || 0).toLocaleString("en-IN")}</td></tr>
        </table>
      </div>

      <div style="background-color: #fbfbfd; border: 1px solid #f1f5f9; border-radius: 8px; padding: 20px; margin: 25px 0;">
        <h3 style="margin-top: 0; color: #c5a850; font-size: 15px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px;">Your Contact Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-top: 10px;">
          <tr><td style="padding: 6px 0; color: #64748b; font-weight: bold; width: 40%;">Name:</td><td style="padding: 6px 0;">${booking.customerName}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-weight: bold;">Phone Number:</td><td style="padding: 6px 0;">${booking.mobileNumber}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-weight: bold;">Email:</td><td style="padding: 6px 0;">${booking.emailAddress}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b; font-weight: bold;">City:</td><td style="padding: 6px 0;">${booking.city}</td></tr>
        </table>
      </div>

      <div style="border: 1px solid #c5a850; border-radius: 8px; padding: 20px; margin: 25px 0; background-color: #fffdf9;">
        <h3 style="margin-top: 0; color: #c5a850; font-size: 15px; font-weight: bold;">✨ What happens next?</h3>
        <p style="margin: 0; font-size: 14px; color: #475569;">Our dedicated bridal coordination team is currently reviewing your registration. We will contact you shortly via phone or WhatsApp to schedule your trial consultation, align on specific timings, and customize your final bridal schedule.</p>
      </div>

      <div style="margin-top: 25px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        <h3 style="color: #0f172a; font-size: 15px; margin-bottom: 5px; font-weight: 600;">Salon Information</h3>
        <p style="margin: 0 0 15px 0; font-size: 14px; color: #475569;">
          <strong>Address:</strong> Ward 22B, Holding 817A/2, Patliputra Kurji Rd, above Lenskart, opposite RBI Quarter, Patna, Bihar 800010<br />
          <strong>Direct Contact:</strong> +91 95721 94458<br />
          <strong>Email:</strong> jawedhabib.kurji@gmail.com
        </p>
        <div style="text-align: center; margin-top: 15px;">
          <a href="${googleMapsUrl}" target="_blank" style="background-color: #0f172a; color: #ffffff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px; display: inline-block; margin: 5px;">🗺️ Google Maps Location</a>
          <a href="${customerWhatsappUrl}" target="_blank" style="background-color: #25D366; color: #ffffff; padding: 12px 20px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 13px; display: inline-block; margin: 5px;">💬 Chat on WhatsApp</a>
        </div>
      </div>

      <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
        This is an automated luxury bridal confirmation from Jawed Habib Kurji Bridal Salon.
      </p>
    </div>
  `;

  if (!apiKey) {
    // Development Mode - Log to file
    ensureLogDir();
    const logEntry = `
========================================
TIMESTAMP: ${new Date().toISOString()}
BOOKING ID: ${booking.id}
----------------------------------------
[OWNER EMAIL]
TO: ${ownerEmail}
FROM: ${fromEmail}
SUBJECT: ${ownerSubject}
HTML:
${ownerHtml}

----------------------------------------
[CUSTOMER EMAIL]
TO: ${booking.emailAddress}
FROM: ${fromEmail}
SUBJECT: ${customerSubject}
HTML:
${customerHtml}
========================================
\n`;
    try {
      fs.appendFileSync(LOG_FILE, logEntry, "utf-8");
      console.log(
        `[MOCK EMAIL] Saved confirmation emails to src/data/mock-emails.log (API key not set)`,
      );
      return { success: true };
    } catch (err: any) {
      console.error("Failed to write mock emails to file:", err);
      return { success: false, error: err.message };
    }
  }

  // Production Mode - Send via Resend API
  try {
    const sendResendEmail = async (to: string, subject: string, html: string) => {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [to],
          subject: subject,
          html: html,
        }),
      });

      if (!response.ok) {
        const errData = (await response.json()) as Record<string, unknown>;
        const errMsg =
          typeof errData.message === "string" ? errData.message : "Failed to send email via Resend";
        throw new Error(errMsg);
      }
    };

    // Send owner notification and customer confirmation independently to prevent sandbox restriction errors from blocking execution
    try {
      await sendResendEmail(ownerEmail, ownerSubject, ownerHtml);
      console.log(`[Resend] Owner notification sent to ${ownerEmail}`);
    } catch (ownerErr) {
      const errMsg = ownerErr instanceof Error ? ownerErr.message : String(ownerErr);
      console.error(`[Resend] Failed to send owner email to ${ownerEmail}:`, errMsg);
      console.warn(
        `[Resend Note] If using onboarding@resend.dev, the recipient address must be verified in your Resend account dashboard.`,
      );
    }

    try {
      await sendResendEmail(booking.emailAddress, customerSubject, customerHtml);
      console.log(`[Resend] Customer confirmation sent to ${booking.emailAddress}`);
    } catch (custErr) {
      const errMsg = custErr instanceof Error ? custErr.message : String(custErr);
      console.error(`[Resend] Failed to send customer email to ${booking.emailAddress}:`, errMsg);
    }

    return { success: true };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Error sending emails via Resend:", error);
    return { success: false, error: errMsg };
  }
}

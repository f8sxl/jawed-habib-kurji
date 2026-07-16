import fs from 'fs';
import path from 'path';
import { Booking } from './db';

const LOG_DIR = path.resolve(process.cwd(), 'src/data');
const LOG_FILE = path.join(LOG_DIR, 'mock-emails.log');

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

export async function sendConfirmationEmails(booking: Booking): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.EMAIL_FROM || 'onboarding@resend.dev';
  const ownerEmail = process.env.OWNER_EMAIL || 'jawedhabibkurjipatna@gmail.com';

  const bookingTimeStr = new Date(booking.bookingTime).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // Owner Email Content
  const ownerSubject = `New Booking Received! ID: ${booking.id}`;
  const ownerHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
      <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">New Bridal Booking</h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee; width: 40%;">Booking ID:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.id}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Customer Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.customerName}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Mobile Number:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.mobileNumber}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email Address:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.emailAddress}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">City:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.city}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Wedding Date:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.weddingDate}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Wedding Venue:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.weddingVenue || 'Not Specified (In-Salon)'}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Selected Package:</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; color: #D4AF37;">${booking.packageSelected}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Amount Paid:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">₹${booking.amountPaid} (Deposit)</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Razorpay Payment ID:</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-family: monospace;">${booking.paymentId}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Booking Time:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingTimeStr}</td></tr>
      </table>
    </div>
  `;

  // Customer Email Content
  const customerSubject = `Booking Confirmed! Your Bridal Reservation - Jawed Habib Kurji`;
  const customerHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h2 style="color: #D4AF37; margin: 5px 0;">Booking Confirmed!</h2>
        <p style="color: #666; font-size: 14px;">We are excited to be part of your special day.</p>
      </div>
      
      <p>Hello <strong>${booking.customerName}</strong>,</p>
      <p>Thank you for choosing Jawed Habib Kurji. We have successfully received your booking deposit of <strong>₹${booking.amountPaid}</strong>. Your appointment has been secured.</p>
      
      <div style="background-color: #fcf8e3; border: 1px solid #faebcc; border-radius: 4px; padding: 15px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #8a6d3b; font-size: 16px;">Reservation Details</h3>
        <ul style="margin: 0; padding-left: 20px;">
          <li><strong>Booking ID:</strong> ${booking.id}</li>
          <li><strong>Selected Package:</strong> ${booking.packageSelected}</li>
          <li><strong>Wedding Date:</strong> ${booking.weddingDate}</li>
          <li><strong>Wedding Venue:</strong> ${booking.weddingVenue || 'Not Specified (In-Salon)'}</li>
          <li><strong>Deposit Paid:</strong> ₹${booking.amountPaid} (adjusted against final package price)</li>
        </ul>
      </div>

      <div style="margin-top: 25px; border-top: 1px solid #eee; padding-top: 15px;">
        <h3 style="color: #333; font-size: 15px; margin-bottom: 5px;">Salon Details</h3>
        <p style="margin: 0 0 10px 0; font-size: 14px; color: #555;">
          <strong>Address:</strong> Jawed Habib Kurji, Kurji, Patna<br />
          <strong>Contact Number:</strong> +91 95721 94458<br />
          <strong>Location Link:</strong> <a href="https://maps.google.com/?q=Jawed+Habib+Hair+Beauty+Kurji+Patna" style="color: #D4AF37; text-decoration: underline;">Open Google Maps</a>
        </p>
      </div>

      <p style="font-size: 12px; color: #888; text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 15px;">
        This is an automated confirmation email. Please keep this for your records. See you soon!
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
      fs.appendFileSync(LOG_FILE, logEntry, 'utf-8');
      console.log(`[MOCK EMAIL] Saved confirmation emails to src/data/mock-emails.log (API key not set)`);
      return { success: true };
    } catch (err: any) {
      console.error('Failed to write mock emails to file:', err);
      return { success: false, error: err.message };
    }
  }

  // Production Mode - Send via Resend API
  try {
    const sendResendEmail = async (to: string, subject: string, html: string) => {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [to],
          subject: subject,
          html: html,
        }),
      });

      if (!response.ok) {
        const errData = await response.json() as any;
        throw new Error(errData.message || 'Failed to send email via Resend');
      }
    };

    // Send owner notification and customer confirmation in parallel
    await Promise.all([
      sendResendEmail(ownerEmail, ownerSubject, ownerHtml),
      sendResendEmail(booking.emailAddress, customerSubject, customerHtml),
    ]);

    return { success: true };
  } catch (error: any) {
    console.error('Error sending emails via Resend:', error);
    return { success: false, error: error.message };
  }
}

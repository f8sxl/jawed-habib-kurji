# Jawed Habib Kurji Website

- **Overview:** Frontend and booking system designed for Jawed Habib Kurji to handle salon appointments, bridal package bookings, and instant payment collection with a strong focus on mobile conversions.

### Tech Stack

- **Framework:** React + Vite
- **Routing & Data:** TanStack Router + TanStack Start (API routes) + React Query
- **Styling:** Tailwind CSS + Radix UI (shadcn)
- **Database:** Supabase
- **Payments:** Razorpay
- **Tracking:** Meta Pixel

### Getting Started

- **Install dependencies:** Run `npm install`
- **Set up environment variables:** Create a `.env` file with the following keys:
  - `VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`
  - `VITE_RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET` & `RAZORPAY_WEBHOOK_SECRET`
  - `RESEND_API_KEY`
  - `TELEGRAM_BOT_TOKEN` & `TELEGRAM_CHAT_ID`
- **Run the app:** Start the development server with `npm run dev`

### Payment Flow (Server-Side)

- **Problem Solved:** Prevents dropped bookings when users pay via UPI apps inside Instagram/Facebook in-app browsers.
- **Step 1:** User submits the booking form.
- **Step 2:** Server creates a `PENDING` booking in the database and generates a Razorpay order.
- **Step 3:** Razorpay processes the payment and redirects the user to the backend callback (`/api/payment-callback`).
- **Step 4:** The server verifies the signature, updates the booking to `CONFIRMED`, sends Telegram/Email alerts, and redirects the user to the success page.
- **Step 5 (Fallback):** A webhook (`/api/webhooks/razorpay`) acts as a safety net to catch `payment.captured` events if the browser closes prematurely.

### Deployment

- **Platform:** Configured for Vercel.
- **Requirement:** Ensure all `.env` variables are added to the Vercel project settings prior to deployment.

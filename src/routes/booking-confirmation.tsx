import { createFileRoute, useSearch } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar, MapPin, Phone, MessageSquare, Mail, Package, ArrowLeft, ExternalLink } from 'lucide-react';
import { Nav } from './index';

export const Route = createFileRoute('/booking-confirmation')({
  component: BookingConfirmationComponent,
});

interface Booking {
  id: string;
  customerName: string;
  mobileNumber: string;
  emailAddress: string;
  city: string;
  weddingDate: string;
  weddingVenue?: string;
  packageSelected: string;
  amountPaid: number;
  paymentId: string;
  orderId: string;
  bookingTime: string;
}

function BookingConfirmationComponent() {
  const search = useSearch({ from: '/booking-confirmation' }) as { bookingId?: string };
  const bookingId = search.bookingId;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) {
      setError('No Booking ID provided in URL');
      setLoading(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        const response = await fetch(`/api/booking?id=${bookingId}`);
        if (!response.ok) {
          throw new Error('Booking not found or failed to load');
        }
        const data = await response.json() as Booking;
        setBooking(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred while retrieving your booking details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const getWhatsAppLink = (b: Booking) => {
    const text = `*Booking Confirmation - Jawed Habib Kurji* 🌸\n\n` +
      `*Booking ID:* ${b.id}\n` +
      `*Package:* ${b.packageSelected}\n` +
      `*Wedding Date:* ${b.weddingDate}\n` +
      `*Venue:* ${b.weddingVenue || 'In-Salon (Kurji, Patna)'}\n` +
      `*Deposit Paid:* ₹${b.amountPaid} (Razorpay)\n\n` +
      `*Salon Address:* Jawed Habib Kurji, Kurji, Patna\n` +
      `*Google Maps:* https://maps.google.com/?q=Jawed+Habib+Hair+Beauty+Kurji+Patna\n` +
      `*Contact:* +91 95721 94458\n\n` +
      `Thank you for booking with us! We look forward to creating your dream bridal look. ✨`;
    
    // We send it to the salon contact number so they align details, or allow sharing
    return `https://wa.me/919572194458?text=${encodeURIComponent(text)}`;
  };

  const getSmsLink = (b: Booking) => {
    const text = `Booking Confirmed: ID ${b.id}. Package: ${b.packageSelected} on ${b.weddingDate}. Venue: ${b.weddingVenue || 'In-Salon'}. Deposit: RS ${b.amountPaid}. Salon Address: Kurji, Patna. Contact: +919572194458. Maps: https://maps.google.com/?q=Jawed+Habib+Hair+Beauty+Kurji+Patna`;
    // Standard SMS link
    return `sms:${b.mobileNumber}?body=${encodeURIComponent(text)}`;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent" />
        <p className="mt-4 font-serif text-lg text-ivory">Retrieving Booking Details...</p>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-6 text-center text-foreground">
        <div className="mb-6 rounded-full bg-red-500/10 p-4 text-red-500">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        </div>
        <h2 className="font-serif text-3xl text-ivory mb-2">Booking Not Found</h2>
        <p className="max-w-md text-sm text-white/60 mb-8">{error || 'The booking details could not be loaded.'}</p>
        <a href="/" className="btn-cream inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Home
        </a>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground pb-20">
      <div className="mx-auto max-w-3xl px-6 pt-28">
        {/* Success Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 text-gold mb-6 border border-gold/20"
          >
            <Check size={40} className="stroke-[2.5]" />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl text-gold"
          >
            Booking Confirmed!
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-sm md:text-base text-white/60 max-w-lg mx-auto"
          >
            Your deposit has been successfully paid, and your bridal makeup reservation is secured.
          </motion.p>
        </div>

        {/* Booking Details Card */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="glass-card overflow-hidden rounded-3xl border border-white/10 bg-surface/50 p-6 md:p-10 shadow-2xl backdrop-blur-md"
        >
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/[0.08] pb-6 mb-8 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-gold font-medium">Reservation Reference</span>
              <h2 className="font-serif text-2xl md:text-3xl text-ivory mt-1 font-mono tracking-tight">{booking.id}</h2>
            </div>
            <div className="text-left md:text-right">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-medium">Booking Time</span>
              <p className="text-sm text-white/70 mt-1">
                {new Date(booking.bookingTime).toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </p>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Customer Information */}
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest text-gold font-semibold border-b border-white/5 pb-2">Customer Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-white/40 block">Full Name</label>
                  <p className="text-base text-ivory mt-0.5 font-serif">{booking.customerName}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-white/40 block">Mobile Number</label>
                  <p className="text-base text-ivory mt-0.5">{booking.mobileNumber}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-white/40 block">Email Address</label>
                  <p className="text-base text-ivory mt-0.5">{booking.emailAddress}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-white/40 block">City / Locality</label>
                  <p className="text-base text-ivory mt-0.5">{booking.city}</p>
                </div>
              </div>
            </div>

            {/* Wedding & Appointment Information */}
            <div className="space-y-6">
              <h3 className="text-xs uppercase tracking-widest text-gold font-semibold border-b border-white/5 pb-2">Wedding details</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-white/40 block flex items-center gap-1.5"><Calendar size={12} className="text-gold" /> Wedding Date</label>
                  <p className="text-base text-ivory mt-0.5 font-medium">{booking.weddingDate}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-white/40 block flex items-center gap-1.5"><MapPin size={12} className="text-gold" /> Wedding Venue</label>
                  <p className="text-base text-ivory mt-0.5">{booking.weddingVenue || 'Not Specified (In-Salon)'}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-white/40 block flex items-center gap-1.5"><Package size={12} className="text-gold" /> Selected Package</label>
                  <p className="text-base text-gold mt-0.5 font-serif font-semibold">{booking.packageSelected}</p>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-white/40 block">Deposit Paid</label>
                  <p className="text-xl text-ivory mt-0.5 font-medium">₹{booking.amountPaid} <span className="text-xs text-white/40">(Adjustable)</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment & Transaction logs */}
          <div className="mt-10 pt-6 border-t border-white/[0.08] grid gap-4 md:grid-cols-2 text-xs text-white/50 bg-black/20 p-4 rounded-2xl border border-white/5">
            <div>
              <span className="block text-white/30 uppercase tracking-widest text-[9px]">Razorpay Payment ID</span>
              <code className="block mt-1 font-mono text-white/70">{booking.paymentId}</code>
            </div>
            <div>
              <span className="block text-white/30 uppercase tracking-widest text-[9px]">Razorpay Order ID</span>
              <code className="block mt-1 font-mono text-white/70">{booking.orderId}</code>
            </div>
          </div>
        </motion.div>

        {/* Next Steps & Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={getWhatsAppLink(booking)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 px-8 font-bold tracking-widest text-sm shadow-lg transition-all hover:scale-102"
          >
            <MessageSquare size={18} />
            SEND WHATSAPP CONFIRMATION
          </a>
          <a
            href={getSmsLink(booking)}
            className="flex items-center justify-center gap-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white py-3.5 px-8 font-bold tracking-widest text-sm shadow-lg transition-all hover:scale-102"
          >
            <Phone size={18} />
            SEND SMS CONFIRMATION
          </a>
        </motion.div>

        {/* Salon Details Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center border-t border-white/10 pt-10"
        >
          <h3 className="font-serif text-xl text-ivory mb-2">Our Studio Address</h3>
          <p className="text-sm text-white/60">Jawed Habib Kurji, Kurji, Patna, Bihar, 800010</p>
          <p className="text-sm text-white/60 mt-1">Contact: +91 95721 94458</p>
          <div className="mt-4">
            <a
              href="https://maps.google.com/?q=Jawed+Habib+Hair+Beauty+Kurji+Patna"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gold uppercase tracking-wider hover:underline"
            >
              Open in Google Maps <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>

        {/* Back to main site link */}
        <div className="text-center mt-12">
          <a href="/" className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white uppercase tracking-widest transition-colors">
            <ArrowLeft size={12} /> Back to main website
          </a>
        </div>
      </div>
    </div>
  );
}

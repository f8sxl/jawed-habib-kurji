import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { ChatWidget } from "@/components/ChatWidget";
import { AnimatedDepositSlider } from "@/components/AnimatedDepositSlider";

import heroBg from "@/assets/hero-bg.jpg";
import salonInterior from "@/assets/salon-interior.jpg";
import bride1 from "@/assets/brides/490984407_17854365960422958_3459801366638073109_n.jpg";
import bride2 from "@/assets/brides/590426438_17920179768422958_4066469502862273966_n.jpg";
import bride3 from "@/assets/brides/735238250_17952828780422958_1020824856657580111_n.jpg";
import bride4 from "@/assets/brides/bride-2.jpg";
import bride5 from "@/assets/brides/bride-4.jpg";
import bride6 from "@/assets/brides/wmremove-transformed (1).jpeg";
import bride7 from "@/assets/brides/wmremove-transformed (2).jpeg";
import bride8 from "@/assets/brides/wmremove-transformed.jpeg";
import logoImg from "@/assets/logo/jh_logo_new.png";
import logoBlackImg from "@/assets/logo/jh_logo_black.png";

/* -------------------------------- HELPERS --------------------------------- */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block border-b border-black/10 focus-within:border-gold transition-colors">
      <span className="eyebrow block text-black/60">{label}</span>
      {children}
    </label>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="max-w-3xl">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="eyebrow"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] text-ivory"
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            {description}
          </motion.p>
        )}
      </div>
      {children}
    </section>
  );
}

interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  venue: string;
}

function BookingFormSection({
  selectedDate,
  selectedTime,
  formData,
  setFormData,
  isFormSubmitted,
  onSubmit,
  onDateInputClick,
  bookingDeposit,
  setBookingDeposit,
}: {
  selectedDate: Date | null;
  selectedTime: string | null;
  formData: BookingFormData;
  setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>;
  isFormSubmitted: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onDateInputClick: () => void;
  bookingDeposit: number;
  setBookingDeposit: (val: number) => void;
}) {
  return (
    <Section id="booking-form-section" eyebrow="Booking Details" title="Fill the form.">
      <div className="mx-auto mt-10 max-w-2xl">
        <div className="glass-card rounded-3xl border border-white/10 bg-surface/40 p-6 md:p-10 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col gap-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Full Name (Required)">
                <input
                  required
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 w-full bg-transparent py-2.5 outline-none text-[#0a0a0a] placeholder-[#0a0a0a]/40 text-sm font-medium"
                  placeholder="Jane Doe"
                />
              </Field>
              <Field label="Mobile Number (Required)">
                <input
                  required
                  type="tel"
                  name="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 w-full bg-transparent py-2.5 outline-none text-[#0a0a0a] placeholder-[#0a0a0a]/40 text-sm font-medium"
                  placeholder="+91 98765 43210"
                />
              </Field>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Email Address (Required)">
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 w-full bg-transparent py-2.5 outline-none text-[#0a0a0a] placeholder-[#0a0a0a]/40 text-sm font-medium"
                  placeholder="jane@example.com"
                />
              </Field>
              <Field label="City / Locality (Required)">
                <input
                  required
                  type="text"
                  name="address-level2"
                  autoComplete="address-level2"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="mt-1 w-full bg-transparent py-2.5 outline-none text-[#0a0a0a] placeholder-[#0a0a0a]/40 text-sm font-medium"
                  placeholder="Patna, Bihar"
                />
              </Field>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Field label="Wedding Date & Time (Click to choose/change)">
                <input
                  required
                  readOnly
                  type="text"
                  name="wedding-date"
                  autoComplete="off"
                  onClick={onDateInputClick}
                  value={
                    selectedDate
                      ? `${selectedDate.toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}${selectedTime ? ` at ${selectedTime}` : ""}`
                      : ""
                  }
                  className="mt-1 w-full bg-transparent py-2.5 outline-none text-gold placeholder-[#0a0a0a]/40 text-sm cursor-pointer font-bold"
                  placeholder="Select a date & time from calendar above"
                />
              </Field>
              <Field label="Wedding Venue / Location (Optional)">
                <input
                  type="text"
                  name="address-line1"
                  autoComplete="address-line1"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="mt-1 w-full bg-transparent py-2.5 outline-none text-[#0a0a0a] placeholder-[#0a0a0a]/40 text-sm font-medium"
                  placeholder="e.g. Hotel Maurya"
                />
              </Field>
            </div>

            <div className="mt-4 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  // Custom validation since we removed <form>
                  if (!formData.name || !formData.phone || !formData.email || !formData.city) {
                    alert("Please fill in all required fields (Name, Phone, Email, City)");
                    return;
                  }
                  onSubmit(e as any);
                }}
                className="btn-cream mt-2 w-full justify-center text-[11px] md:text-sm tracking-[0.2em] cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-1.5 uppercase font-bold">
                  Check Availability <ChevronDown className="w-4 h-4 ml-1" />
                </span>
              </button>
              {isFormSubmitted && (
                <span className="text-xs text-green-400 flex items-center gap-1.5 animate-pulse">
                  ✓ Details saved! Scroll down to choose package.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function SuccessPopup({
  data,
  onClose,
}: {
  data: {
    bookingId: string;
    paymentId: string;
    orderId: string;
    package: string;
    date: string;
    name: string;
  };
  onClose: () => void;
}) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="relative w-full max-w-md rounded-3xl border border-gold/30 bg-surface p-8 text-center shadow-[0_0_50px_rgba(212,175,55,0.15)]"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/10 text-gold mb-6 border border-gold/20">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="font-serif text-3xl text-gold mb-2">Deposit Received!</h2>
        <p className="text-white/80 text-sm leading-relaxed mb-6">
          Thank you, {data.name}. Your booking deposit for the <strong>{data.package}</strong>{" "}
          package is confirmed.
        </p>

        <div className="rounded-xl bg-black/40 p-4 text-left text-xs text-white/60 mb-6 border border-white/5 space-y-2 font-mono">
          <div className="flex justify-between">
            <span>Booking ID:</span> <span className="text-gold font-bold">{data.bookingId}</span>
          </div>
          <div className="flex justify-between">
            <span>Wedding Date:</span> <span className="text-white/80">{data.date}</span>
          </div>
        </div>

        <p className="text-xs text-white/40 mb-6">
          Redirecting to confirmation page in <strong className="text-gold">{countdown}</strong>{" "}
          seconds...
        </p>

        <button
          onClick={onClose}
          className="btn-cream w-full justify-center text-xs font-bold tracking-widest py-3 cursor-pointer"
        >
          VIEW CONFIRMATION NOW
        </button>
      </motion.div>
    </motion.div>
  );
}

const brides = [bride1, bride2, bride3, bride4, bride5, bride6, bride7, bride8];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jawed Habib Kurji — Luxury Bridal Studio, Patna" },
      {
        name: "description",
        content:
          "Reserve your wedding date at Patna's most refined bridal studio. HD, airbrush and reception makeup by certified bridal specialists. Limited dates each season.",
      },
      { property: "og:title", content: "Jawed Habib Kurji — Luxury Bridal Studio, Patna" },
      { property: "og:image", content: heroBg },
    ],
  }),
  component: IndexComponent,
});

const WHATSAPP =
  "https://wa.me/919572194458?text=Hi%2C%20I%27d%20like%20to%20reserve%20my%20wedding%20date%20at%20Jawed%20Habib%20Kurji.";
const PHONE = "tel:+919572194458";

export function IndexComponent() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // New State for Booking Funnel
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", city: "", venue: "" });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [bookingDeposit, setBookingDeposit] = useState(2000);
  const [paymentSuccessData, setPaymentSuccessData] = useState<{
    bookingId: string;
    paymentId: string;
    orderId: string;
    package: string;
    date: string;
    name: string;
  } | null>(null);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const [leadBookingId, setLeadBookingId] = useState<string | null>(null);

  const handleFormSubmit = async (e: any) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    if (!selectedDate || !selectedTime) {
      alert("Please select your wedding date and time from the calendar first!");
      document.getElementById("availability")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Track Lead event
      if (typeof window !== "undefined" && (window as any).fbq) {
        try {
          (window as any).fbq("track", "Lead");
        } catch (e) {}
      }

      // Step 2: Save Lead to Backend
      const res = await fetch("/api/create-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          venue: formData.venue,
          bookingDate: selectedDate ? `${selectedDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} at ${selectedTime}` : "TBD",
          packageName: "Undecided", // They select it in the next step
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.leadId) {
          setLeadBookingId(data.leadId);
        }
      } else {
        console.error("Backend returned an error:", await res.text());
      }
    } catch (err) {
      console.error("Error capturing lead:", err);
    } finally {
      setIsProcessing(false);
      setIsFormSubmitted(true);
      setTimeout(() => {
        const pkgSection = document.getElementById("packages");
        if (pkgSection) {
          pkgSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  const handlePayment = async (packageName: string) => {
    if (!selectedDate || !selectedTime) {
      alert("Please select your wedding date and time from the calendar first!");
      document.getElementById("availability")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (!isFormSubmitted) {
      alert("Please fill out and submit your booking details form first!");
      document
        .getElementById("booking-form-section")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const ua = navigator.userAgent || "";
    const isInAppBrowser = /Instagram|FBAN|FBAV/i.test(ua);
    if (isInAppBrowser) {
      alert(
        "Instagram blocks secure payments.\n\nPlease tap the three dots (⋮) in the top right corner and select 'Open in Browser' to complete your booking securely."
      );
      return;
    }

    setIsProcessing(true);

    // Track InitiateCheckout when they click a package to pay
    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout");
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay SDK. Please check your internet connection.");
      setIsProcessing(false);
      return;
    }

    try {
      const packageDetails = BRIDAL_PACKAGES.find((p) => p.name === packageName);
      const total_price = packageDetails ? parseInt(packageDetails.price.replace(/\D/g, "")) : 0;
      const remaining_balance = total_price > 0 ? total_price - bookingDeposit : 0;

      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: bookingDeposit * 100,
          currency: "INR",
          receipt: `receipt_date_${selectedDate.getTime()}`,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          venue: formData.venue,
          packageName: packageName,
          bookingDate: `${selectedDate.toLocaleDateString()} at ${selectedTime}`,
          total_price,
          remaining_balance,
          bookingId: leadBookingId, // Attach the lead ID so it updates the same record
        }),
      });

      if (!orderRes.ok) {
        const errText = await orderRes.text().catch(() => "Unknown server error");
        let errMsg = "Failed to create order on the server";
        try {
          const errJson = JSON.parse(errText);
          errMsg = errJson.error || errMsg;
        } catch (_) {
          errMsg = errText || errMsg;
        }
        throw new Error(errMsg);
      }

      const orderData = (await orderRes.json()) as {
        order_id: string;
        amount: number;
        currency: string;
        notes: any;
      };

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_TF0EoyD5sEPnF9",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Jawed Habib Kurji",
        description: `${packageName} Booking - Date: ${selectedDate.toLocaleDateString()}`,
        image: logoImg,
        order_id: orderData.order_id,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        notes: orderData.notes,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: leadBookingId, // Use the existing lead ID
              }),
            });

            const verifyData = (await verifyRes.json()) as {
              status: string;
              error?: string;
              booking: any;
            };

            if (verifyRes.ok && verifyData.status === "success") {
              // Send Purchase event to Meta Pixel manually
              if (typeof window !== "undefined" && (window as any).fbq) {
                (window as any).fbq('track', 'Purchase', { currency: 'INR', value: orderData.amount / 100 });
              }
              setPaymentSuccessData({
                bookingId: verifyData.booking?.id || leadBookingId || "Unknown",
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                package: packageName,
                date: `${selectedDate.toLocaleDateString()} at ${selectedTime}`,
                name: formData.name,
              });
            } else {
              alert(
                `Signature verification failed: ${verifyData.error || "Please contact support"}`,
              );
            }
          } catch (err: any) {
            console.error("Verification error:", err);
            alert("An error occurred while verifying the payment. Please contact support.");
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
        theme: {
          color: "#D4AF37",
        },
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.on("payment.failed", function (response: any) {
        alert(`Payment failed: ${response.error.description}`);
        setIsProcessing(false);
      });

      rzp.open();
    } catch (error: any) {
      console.error("Payment initiation error:", error);
      alert(`Error initiating payment: ${error.message || "Please try again."}`);
      setIsProcessing(false);
    }
  };

  const handleMockPayment = async (packageName: string) => {
    if (!selectedDate || !selectedTime) {
      alert("Please select your wedding date and time from the calendar first!");
      document.getElementById("availability")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (!isFormSubmitted) {
      alert("Please fill out and submit your booking details form first!");
      document
        .getElementById("booking-form-section")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const packageDetails = BRIDAL_PACKAGES.find((p) => p.name === packageName);
    const total_price = packageDetails ? parseInt(packageDetails.price.replace(/\D/g, "")) : 0;
    const remaining_balance = total_price > 0 ? total_price - bookingDeposit : 0;

    setIsProcessing(true);

    try {
      const verifyRes = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: `order_MOCK_${Date.now()}`,
          razorpay_payment_id: `pay_MOCK_${Date.now()}`,
          razorpay_signature: "signature_MOCK_123456",
          customer_name: formData.name,
          customer_phone: formData.phone,
          customer_email: formData.email,
          customer_city: formData.city,
          venue: formData.venue,
          package: packageName,
          booking_date: `${selectedDate.toLocaleDateString()} at ${selectedTime}`,
          amountPaid: bookingDeposit,
          total_price,
          remaining_balance,
          bookingId: leadBookingId, // Pass the lead ID
        }),
      });

      const verifyData = (await verifyRes.json()) as {
        status: string;
        error?: string;
        booking: any;
      };

      if (verifyRes.ok && verifyData.status === "success") {
        // Send Purchase event to Meta Pixel manually
        if (typeof window !== "undefined" && (window as any).fbq) {
          (window as any).fbq('track', 'Purchase', { currency: 'INR', value: 2000 });
        }
        setTimeout(() => {
          setIsProcessing(false);
          setPaymentSuccessData({
            bookingId: verifyData.booking?.id || leadBookingId || "Unknown",
            paymentId: `pay_MOCK_${Date.now()}`,
            orderId: `order_MOCK_${Date.now()}`,
            package: packageName,
            date: `${selectedDate.toLocaleDateString()} at ${selectedTime}`,
            name: formData.name,
          });
        }, 1500);
      } else {
        alert(`Mock payment failed: ${verifyData.error || "Please contact support"}`);
        setIsProcessing(false);
      }
    } catch (err: any) {
      console.error("Mock verification error:", err);
      alert("An error occurred while verifying the mock payment.");
      setIsProcessing(false);
    }
  };

  const handleDateInputClick = () => {
    document.getElementById("availability")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Scroll progress in champagne gold */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[100] h-[2px] origin-left bg-gold"
      />

      <Nav />

      <main>
        <Hero />
        {/* Availability / Calendar Section */}
        <Availability 
          selectedDate={selectedDate} 
          setSelectedDate={setSelectedDate} 
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
        <BookingFormSection
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          formData={formData}
          setFormData={setFormData}
          isFormSubmitted={isFormSubmitted}
          onSubmit={handleFormSubmit}
          onDateInputClick={handleDateInputClick}
          bookingDeposit={bookingDeposit}
          setBookingDeposit={setBookingDeposit}
        />
        {/* Step 2: Package Selection (Blurred until form is captured) */}
        <Packages
          selectedDate={selectedDate}
          handlePayment={handlePayment}
          handleMockPayment={handleMockPayment}
          isProcessing={isProcessing}
          bookingDeposit={bookingDeposit}
          setBookingDeposit={setBookingDeposit}
          isFormSubmitted={isFormSubmitted}
        />
        <Gallery />
        <Transformations />
        <WhyUs />
        <BeforeAfter />
        <Testimonials />
        <HairServices />
        <SalonExperience />
        <Brands />
        <Process />
        <FAQ />
        <MapSection />

        <ReserveCTA />
        <Footer />
      </main>

      <ChatWidget />

      {/* Success Modal with auto-redirect countdown */}
      <AnimatePresence>
        {paymentSuccessData && (
          <SuccessPopup
            data={paymentSuccessData}
            onClose={() => {
              window.location.href = `/booking-confirmation?bookingId=${paymentSuccessData.bookingId}`;
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------- NAV ---------------------------------- */

const NAV_ITEMS = [
  { label: "Bridal", href: "#bridal" },
  { label: "Hair", href: "#hair" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
        className="absolute inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6"
      >
        <div
          className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-4 backdrop-blur-2xl backdrop-saturate-[1.8] transition-all duration-500 md:px-5 ${
            scrolled
              ? "h-14 bg-white/10 border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)]"
              : "h-16 bg-white/5 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)] md:h-[70px]"
          }`}
        >
          <a href="#top" className="flex items-center gap-2 pl-1">
            <img
              src={logoImg}
              alt="Jawed Habib Kurji Logo"
              className="h-8 md:h-10 w-auto object-contain"
            />
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="group relative text-[12px] tracking-[0.14em] text-white opacity-90 uppercase transition-all hover:opacity-100"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-white transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/jawedhabib_kurji_patna/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex items-center justify-center text-white opacity-80 hover:opacity-100 transition-all hover:scale-110 p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>

            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white"
            >
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path d="M0 1h16M0 9h10" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <button onClick={toggle} aria-label="Toggle theme" aria-pressed={dark} className="theme-toggle">
      <AnimatePresence mode="wait" initial={false}>
        {!mounted || dark ? (
          <motion.svg
            key="moon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <path
              d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}

function TranslateToggle() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const match = document.cookie.match(/(^|;\s*)googtrans=([^;]*)/);
    if (match && match[2].includes("/hi")) {
      setLang("hi");
    }
  }, []);

  const toggle = () => {
    const nextLang = lang === "en" ? "hi" : "en";
    setLang(nextLang);
    const domain = window.location.hostname;
    document.cookie = `googtrans=/en/${nextLang}; path=/; domain=${domain}`;
    // Also set without domain for local testing compatibility
    document.cookie = `googtrans=/en/${nextLang}; path=/`;
    window.location.reload();
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle language"
      title={lang === "en" ? "Translate to Hindi" : "Translate to English"}
      className="theme-toggle flex items-center justify-center text-ivory hover:text-gold"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-[18px] h-[18px]"
        fill="currentColor"
      >
        <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
      </svg>
    </button>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-0 z-[80]"
        >
          <motion.div
            initial={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(13,13,13,0)" }}
            animate={{ backdropFilter: "blur(24px)", backgroundColor: "rgba(13,13,13,0.92)" }}
            exit={{ backdropFilter: "blur(0px)", backgroundColor: "rgba(13,13,13,0)" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          />

          <div className="relative flex h-full flex-col px-6 pt-6 pb-10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] tracking-[0.4em] text-gold uppercase">Menu</span>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            </div>

            <nav className="mt-14 flex flex-1 flex-col justify-center gap-4">
              {NAV_ITEMS.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={onClose}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                  className="font-serif text-5xl text-white leading-none"
                >
                  {n.label}
                  <span className="ml-2 align-super text-[10px] tracking-[0.3em] text-gold">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-8 space-y-4"
            >
              <a href="#reserve" onClick={onClose} className="btn-cream w-full justify-center">
                Reserve Wedding Date <span className="arrow">→</span>
              </a>
              <div className="grid grid-cols-3 gap-3 text-[11px] tracking-[0.16em] uppercase">
                <a
                  href={WHATSAPP}
                  className="rounded-full border border-white/10 py-3 text-center text-white opacity-80"
                >
                  WhatsApp
                </a>
                <a
                  href={PHONE}
                  className="rounded-full border border-white/10 py-3 text-center text-white opacity-80"
                >
                  Call
                </a>
                <a
                  href="https://instagram.com"
                  className="rounded-full border border-white/10 py-3 text-center text-white opacity-80"
                >
                  Instagram
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------------- HERO ---------------------------------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Defer loading the heavy background video until after critical page assets are parsed
    const timer = setTimeout(() => {
      setVideoSrc("/hero-bg.mov");
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden lg:h-[100svh] lg:min-h-[720px]"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 overflow-hidden">
        {/* Static blurred background poster that renders instantly */}
        <img
          src={heroBg}
          alt="Hero background placeholder"
          className="absolute inset-0 h-full w-full object-cover blur-[3px] scale-105"
        />

        {/* Smoothly cross-fading loop video with GPU-accelerated transitions */}
        {videoSrc && (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onPlay={() => setVideoLoaded(true)}
            className={`absolute inset-0 h-full w-full object-cover blur-[3px] scale-105 transition-opacity duration-1000 ease-in-out ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backfaceVisibility: "hidden",
              transform: "translate3d(0, 0, 0)",
            }}
          />
        )}
        {/* Subtle black overlay to make it look premium and improve text readability */}
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-24 pt-[50svh] lg:h-full lg:min-h-0 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:pb-28 lg:pt-0"
      >
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col items-start gap-4"
          >
            <p className="eyebrow !text-white/90">Jawed Habib · Kurji, Patna</p>
            <div className="flex items-center gap-3">
              <div className="flex text-[#FFDF73]">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-sm">
                    {s}
                  </span>
                ))}
              </div>
              <div className="text-[11px] tracking-[0.14em] uppercase text-white">
                4.9 · 400+ Google reviews
              </div>
            </div>
          </motion.div>

          <WordReveal
            text="Be the bride everyone can't stop looking at."
            className="mt-6 max-w-4xl font-serif text-[clamp(2.2rem,8vw,6rem)] leading-[0.98] tracking-[-0.02em] text-[#f5f5f0]"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.9 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#packages" className="btn-cream !bg-white/10 !text-white !border-white/20 backdrop-blur-2xl backdrop-saturate-[1.8] !shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:!bg-white/20">
              Claim Your Look <span className="arrow">→</span>
            </a>
          </motion.div>

          {/* Scarcity Live Status Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="mt-16 w-full max-w-sm shrink-0 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl"
          >
          <div className="mb-6 inline-flex animate-pulse items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-[10px] font-medium tracking-wider text-red-500 uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
            High Demand
          </div>

          <h3 className="mb-2 font-serif text-3xl text-ivory">Winter Wedding Season</h3>
          <p className="mb-8 text-sm text-white/60">
            Our calendar is filling up quickly for the upcoming bridal season.
          </p>

          <div className="mb-8 space-y-3">
            <div className="flex justify-between text-sm font-medium">
              <span className="text-ivory">Availability Status</span>
              <span className="text-gold">79% Fully Booked</span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "79%" }}
                transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
                className="absolute inset-y-0 left-0 bg-gold"
              />
            </div>
          </div>

          <a
            href="#availability"
            className="flex w-full items-center justify-center rounded-full bg-ivory px-6 py-3 text-sm font-medium tracking-wide text-background transition-colors hover:bg-white hover:text-black"
          >
            Check Available Dates <span className="ml-2">→</span>
          </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-[0.4em] text-ivory/60 uppercase lg:flex"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}

function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <h1 className={className}>
      {words.map((w, i) => {
        const isHighlight = w.toLowerCase() === "bride";
        return (
          <span key={i} className={`inline-block overflow-hidden pb-[0.05em] pr-[0.28em] align-top ${isHighlight ? "px-1" : ""}`}>
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 1.1,
                delay: 0.7 + i * 0.08,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className={`inline-block ${
                isHighlight ? "bg-gold/30 text-white font-bold px-3 py-1 rounded-lg" : ""
              }`}
            >
              {w}
            </motion.span>
          </span>
        );
      })}
    </h1>
  );
}

/* ----------------------------- AVAILABILITY ------------------------------ */

function Availability({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}: {
  selectedDate: Date | null;
  setSelectedDate: (d: Date | null) => void;
  selectedTime: string | null;
  setSelectedTime: (t: string | null) => void;
}) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <Section id="availability" eyebrow="Wedding Date" title="Reserve before your date is taken.">
      <div className="mx-auto mt-14 max-w-4xl">
        <div className="glass-card flex flex-col gap-10 rounded-3xl p-6 md:flex-row md:p-10 shadow-2xl backdrop-blur-md">
          {/* Calendar Side */}
          <div className="flex-1 rounded-2xl border border-white/10 bg-black/20 p-6">
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={prevMonth}
                className="p-2 text-white/50 transition-colors hover:text-ivory"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <div className="font-serif text-xl text-ivory">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </div>
              <button
                onClick={nextMonth}
                className="p-2 text-white/50 transition-colors hover:text-ivory"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            <div className="mb-2 grid grid-cols-7 gap-x-1 gap-y-2 text-center">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div key={d} className="pb-2 text-xs font-medium text-white/40">
                  {d}
                </div>
              ))}
              {days.map((d, i) => {
                if (d === null) return <div key={`empty-${i}`} className="p-2" />;
                const thisDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
                const isPast = thisDate < today;

                // Pseudo-random scarcity logic (~30% of future dates are marked as 'fast filling')
                const hash = (d * 13 + thisDate.getMonth() * 7) % 10;
                const isFastFilling = !isPast && (hash === 2 || hash === 7 || hash === 5);

                const isSelected = selectedDate?.getTime() === thisDate.getTime();

                return (
                  <button
                    key={d}
                    disabled={isPast}
                    onClick={() => {
                      setSelectedDate(thisDate);
                      setSelectedTime(null);
                    }}
                    className={`relative flex h-9 w-full items-center justify-center rounded-full text-sm transition-all ${
                      isPast
                        ? "cursor-not-allowed text-white/20"
                        : isSelected
                          ? "scale-110 bg-gold font-medium text-background shadow-[0_0_15px_rgba(212,175,55,0.4)] z-10"
                          : "text-ivory hover:scale-110 hover:bg-white/10"
                    }`}
                  >
                    <span>{d}</span>
                    {isFastFilling && !isSelected && (
                      <span
                        className="absolute bottom-1.5 h-1 w-1 rounded-full bg-orange-400/80"
                        title="Slots filling fast"
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-medium tracking-widest text-white/40 uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400/80" />
              Slots filling fast
            </div>
          </div>

          {/* Form/Deposit Summary Side */}
          <div className="flex flex-1 flex-col justify-center gap-5 pb-6 md:pb-0">
            <div>
              <h3 className="mb-1.5 font-serif text-3xl text-ivory">
                {selectedDate ? "Select a Time" : "Reserve Date"}
              </h3>
              <p className="text-sm leading-relaxed text-ivory/60">
                {selectedDate 
                  ? `Available slots for ${selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}` 
                  : "Pick an available date to secure your slot."}
              </p>
            </div>

            {selectedDate ? (
              <div className="grid grid-cols-2 gap-3 mb-2">
                {["10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM", "05:30 PM", "07:00 PM", "08:30 PM"].map((time, idx) => {
                  const hash = (selectedDate.getDate() * 13 + selectedDate.getMonth() * 7) % 10;
                  const isFastFilling = (hash === 2 || hash === 7 || hash === 5);
                  // Make specific slots booked if fast filling (idx 1, 4, 6)
                  const isBooked = isFastFilling && (idx === 1 || idx === 4 || idx === 6 || (idx === 2 && hash === 7));
                  
                  return (
                    <button
                      key={time}
                      disabled={isBooked}
                      onClick={() => {
                        setSelectedTime(time);
                        setTimeout(() => {
                          document.getElementById("booking-form-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 100);
                      }}
                      className={`relative flex items-center justify-center rounded-xl border py-3 text-sm font-medium transition-all ${
                        isBooked
                          ? "border-white/5 bg-white/5 text-white/20 cursor-not-allowed"
                          : selectedTime === time
                            ? "border-gold bg-gold text-background shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                            : "border-white/20 bg-black/40 text-ivory hover:border-white/40 hover:bg-white/10"
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/5 p-10 text-center">
                <svg className="mb-3 h-8 w-8 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-white/40">Select a date on the calendar<br/>to view available times</p>
              </div>
            )}

            <div className="flex flex-col gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-5 mt-auto">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Selected</span>
                <span className="font-medium text-gold text-right">
                  {selectedDate && selectedTime
                    ? `${selectedDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} at ${selectedTime}`
                    : "Pending"}
                </span>
              </div>
              <div className="h-px w-full bg-white/10" />
              <div className="w-full flex flex-col gap-1.5">
                <span className="text-sm text-white/60">Deposit</span>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-md border border-white/10 shadow-sm">
                    <svg
                      className="w-3 h-3 text-black"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span className="text-[9px] font-bold tracking-widest text-black uppercase flex items-center gap-1.5">
                      SECURED BY{" "}
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                        alt="Razorpay"
                        className="h-2.5"
                      />
                    </span>
                  </div>
                  <span className="text-xl font-medium text-ivory">₹2,000</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (selectedDate && selectedTime) {
                  document
                    .getElementById("booking-form-section")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              disabled={!selectedDate || !selectedTime}
              className={`btn-cream mt-2 w-full justify-center text-[11px] md:text-sm tracking-[0.2em] cursor-pointer ${(!selectedDate || !selectedTime) && "pointer-events-none opacity-50"}`}
            >
              {selectedDate && selectedTime ? "ENTER DETAILS" : "SELECT DATE & TIME"} <span className="arrow">↓</span>
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------- GALLERY --------------------------------- */

function Gallery() {
  const [active, setActive] = useState(0);
  return (
    <Section id="gallery" eyebrow="The Portfolio" title="Brides, composed like editorials.">
      <div className="mt-14 grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center">
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
          {brides.map((src, i) => {
            const offset = (i - active + brides.length) % brides.length;
            const isTop = offset === 0;
            return (
              <motion.button
                key={i}
                type="button"
                onClick={() => setActive((active + 1) % brides.length)}
                aria-label={`Show bride ${i + 1}`}
                animate={{
                  x: offset * 10,
                  y: offset * 14,
                  rotate: offset * 2.5,
                  scale: 1 - offset * 0.04,
                  opacity: offset > 3 ? 0 : 1 - offset * 0.15,
                }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
                style={{ zIndex: brides.length - offset }}
                className="absolute inset-0 origin-bottom overflow-hidden rounded-2xl border border-white/[0.08] bg-surface shadow-2xl"
              >
                <img src={src} alt="Bride" className="h-full w-full object-cover" loading="lazy" />
                {isTop && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 to-transparent p-5">
                    <span className="text-[10px] tracking-[0.28em] uppercase text-white/90">
                      Plate {String(i + 1).padStart(2, "0")} /{" "}
                      {String(brides.length).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-white/90 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-[#0a0a0a] font-bold">
                      Bridal Artistry
                    </span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        <div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            A private book of recent brides — every plate hand-picked, every finish shot in natural
            light. Tap the album to leaf through.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {brides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to plate ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active ? "w-10 bg-gold" : "w-4 bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>
          <div className="mt-10 flex gap-3">
            <button
              onClick={() => setActive((active - 1 + brides.length) % brides.length)}
              className="btn-ghost-gold"
            >
              ← Prev
            </button>
            <button onClick={() => setActive((active + 1) % brides.length)} className="btn-cream">
              Next Plate <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------- TRANSFORMATIONS ----------------------------- */

function Transformations() {
  const [active, setActive] = useState<number | null>(null);

  const items = [
    {
      id: "1210129546",
      thumbnail:
        "https://i.vimeocdn.com/video/2179925961-9025f8f9165c4eeebe748a077c8346657b816943fc2400c06b882d37603b3f2d-d_640?region=us",
      title: "Aanya",
      duration: "1:04",
    },
    {
      id: "1210129528",
      thumbnail:
        "https://i.vimeocdn.com/video/2179925915-8d2005d1be0b65426edb159e90fd4479f2e11ea7a996ecb9c7a6517b52c5e8cd-d_640?region=us",
      title: "Meher",
      duration: "1:22",
    },
    {
      id: "1210129477",
      thumbnail:
        "https://i.vimeocdn.com/video/2179925908-02dcf300f9f6ed0f9832a71a7abbc4ad3bac9c965c64a553ce120a687d9021ac-d_640?region=us",
      title: "Rhea",
      duration: "0:56",
    },
    {
      id: "1210129479",
      thumbnail:
        "https://i.vimeocdn.com/video/2179925907-f57dc3c2eae0caf24be226aebc433eb07ba8640a755ef34fa8e35414fda60db9-d_640?region=us",
      title: "Sanvi",
      duration: "1:11",
    },
    {
      id: "1210129481",
      thumbnail:
        "https://i.vimeocdn.com/video/2179925864-ff445d3f257a0af5eebbdafc32e599146d76f8a8a412f0107553d53cadd81e20-d_640?region=us",
      title: "Tara",
      duration: "0:44",
    },
    {
      id: "1210129478",
      thumbnail:
        "https://i.vimeocdn.com/video/2179925835-5df735145bf336ce4a5ab755a66437d1f52d9e96ec28088ebb7e19bc49bd3cbd-d_640?region=us",
      title: "Kriti",
      duration: "1:15",
    },
    {
      id: "1210496317",
      thumbnail:
        "https://i.vimeocdn.com/video/2180417964-b3a203e6f11e8df3eb20e3935cad1463b9fd0710332e90127a1d44126217b5dd-d_640?region=us",
      title: "Nisha",
      duration: "1:02",
    },
    {
      id: "1210496318",
      thumbnail:
        "https://i.vimeocdn.com/video/2180417982-032867ca7d9c990f7bb4c9c1e60a50ef1153d30ce209de1ab7bdf0f0a9124c79-d_640?region=us",
      title: "Pooja",
      duration: "0:58",
    },
  ];

  return (
    <Section
      eyebrow="Transformations"
      title="Before the vows, the transformation."
      description="A private look at how our brides step into their day."
    >
      <div className="mt-14 -mx-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-5 px-6">
          {items.map((it, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.8 }}
              className="group relative aspect-[9/13] w-[70vw] shrink-0 overflow-hidden rounded-2xl md:w-[340px]"
            >
              {/* Static lightweight thumbnail from Vimeo CDN as fallback/placeholder */}
              <img
                src={it.thumbnail}
                alt={it.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
              />
              
              {/* Autoplaying background video */}
              <div className="absolute inset-0 pointer-events-none z-0">
                <iframe
                  src={`https://player.vimeo.com/video/${it.id}?background=1&autoplay=1&loop=1&muted=1&playsinline=1`}
                  className="absolute inset-0 h-full w-full scale-[1.05] transition-transform duration-[1200ms] group-hover:scale-[1.1]"
                  frameBorder="0"
                  allow="autoplay"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              {/* Play icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/90 text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-90 group-hover:scale-100 transition-transform duration-300">
                  <svg
                    width="12"
                    height="14"
                    viewBox="0 0 10 12"
                    fill="currentColor"
                    className="ml-0.5"
                  >
                    <path d="M0 0v12l10-6z" />
                  </svg>
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f0]/15 text-[#f5f5f0] backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                    <svg
                      width="10"
                      height="12"
                      viewBox="0 0 10 12"
                      fill="currentColor"
                      className="ml-0.5"
                    >
                      <path d="M0 0v12l10-6z" />
                    </svg>
                  </span>
                  <div>
                    <div className="font-serif text-2xl text-[#f5f5f0] drop-shadow-sm">{it.title}</div>
                    <div className="text-[11px] tracking-[0.2em] uppercase text-[#f5f5f0]/70">
                      {it.duration} · Bridal reel
                    </div>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative aspect-[9/16] max-h-[80vh] w-full max-w-sm overflow-hidden rounded-2xl bg-black shadow-[0_0_60px_rgba(0,0,0,0.8)] border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Interactive Player Frame with play controls */}
              <iframe
                src={`https://player.vimeo.com/video/${items[active].id}?autoplay=1&muted=1&autopause=0&controls=1&playsinline=1`}
                className="absolute inset-0 h-full w-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={items[active].title}
              />

              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-ivory backdrop-blur hover:bg-black/90 transition-colors"
                aria-label="Close"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

/* -------------------------------- WHY US --------------------------------- */

function WhyUs() {
  const items = [
    {
      t: "The Flawless Canvas",
      d: "Charlotte Tilbury Airbrush, MAC Studio Fix, Pixi Glow Tonic & d'Alba First Spray Serum for an immaculate, long-lasting base.",
    },
    {
      t: "The Sculpt & Glow",
      d: "Nars Liquid Blushes, Kay Beauty Contour, and Forever 52 Desert Glow for radiant, dimensional warmth.",
    },
    {
      t: "Hypnotic Eyes",
      d: "Colorbar Peacock Throne, Kryolan High-Def Glitters, and PAC Dual Fold systems for mesmerizing, tear-proof wear.",
    },
    {
      t: "The Perfect Pout",
      d: "PAC Timeless Matte, Parul Garg Signatures, and Huda Beauty finishing touches to last through the final toast.",
    },
  ];
  const [active, setActive] = useState(0);

  return (
    <Section id="bridal" eyebrow="Premium Products" title="Brands we trust for your big day.">
      <div className="mt-14 grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
        {/* Accordion list */}
        <div className="flex flex-col justify-center">
          <ul className="flex flex-col divide-y divide-foreground/10 border-y border-foreground/10">
            {items.map((it, i) => {
              const open = i === active;
              return (
                <li key={it.t}>
                  <button
                    onClick={() => setActive(i)}
                    className="group flex w-full items-center gap-6 py-6 text-left"
                  >
                    <span
                      className={`font-serif text-xl transition-colors duration-500 ${open ? "text-gold" : "text-muted-foreground"}`}
                    >
                      0{i + 1}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span
                        className={`block font-serif text-2xl transition-colors duration-500 ${open ? "text-ivory" : "text-foreground/70 group-hover:text-ivory"}`}
                      >
                        {it.t}
                      </span>
                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.span
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: "auto", opacity: 1, marginTop: 10 }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                            className="block overflow-hidden text-sm leading-relaxed text-muted-foreground"
                          >
                            {it.d}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span
                      className={`h-px w-8 shrink-0 origin-right bg-gold transition-transform duration-500 ${
                        open ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Animated Image Container */}
        <div className="group relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-black w-full md:aspect-[3/4]">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0 h-full w-full"
          >
            <motion.img
              src="/product_section_bride.jpg"
              alt="Bride showcasing premium products"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-full object-cover object-center"
            />
          </motion.div>

          {/* Atmospheric Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/5 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-70" />
          <div className="absolute inset-0 bg-gold/20 opacity-0 mix-blend-overlay transition-opacity duration-700 group-hover:opacity-100" />
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------- PACKAGES -------------------------------- */

export const BRIDAL_PACKAGES = [
  {
    name: "Haldi & Sangeet",
    img: "/haldi.jpg",
    price: "₹10,199",
    onward: "",
    desc: "Luminous, sweat-proof, and vibrant makeup designed for daytime rituals and energetic evenings.",
  },
  {
    name: "Engagement Makeup",
    img: "/engagement.jpg",
    price: "₹12,199",
    onward: "",
    desc: "Soft, glamorous, and photogenic look perfectly tailored for your ring ceremony.",
  },
  {
    name: "HD Bridal",
    img: "/hd-bridal.jpg",
    price: "₹15,199",
    onward: "",
    desc: "High-Definition bridal makeup and elegant styling.",
  },
  {
    name: "Ultra HD Bridal",
    img: "/ultra-hd.jpg",
    price: "₹17,199",
    onward: "",
    desc: "Flawless base, long-lasting wear, and a stunning glass skin finish.",
  },
  {
    name: "Premium HD Bridal",
    img: "/premium-hd.jpg",
    price: "₹22,199",
    onward: "",
    desc: "Flawless application, long-lasting, completely tearproof and dragproof.",
    featured: true,
  },
  {
    name: "Luxe Reception Bridal",
    img: "/luxe.jpg",
    price: "₹24,199",
    onward: "",
    desc: "Flawless, tearproof, dragproof, and engineered for 24-hour long-lasting endurance.",
  },
];

function Packages({
  selectedDate,
  handlePayment,
  handleMockPayment,
  isProcessing,
  bookingDeposit,
  setBookingDeposit,
  isFormSubmitted,
}: {
  selectedDate: Date | null;
  handlePayment: (pkgName: string) => Promise<void>;
  handleMockPayment: (pkgName: string) => Promise<void>;
  isProcessing: boolean;
  bookingDeposit: number;
  setBookingDeposit: (val: number) => void;
  isFormSubmitted: boolean;
}) {
  // Removed temporary deposit message state in favor of unified static message

  return (
    <Section id="packages" eyebrow="Secure Your Package" title="Begin your bridal journey.">
      <div className="relative">
        <div className="transition-all duration-1000">
          <div className="mx-auto max-w-2xl mb-12">
            <AnimatedDepositSlider bookingDeposit={bookingDeposit} setBookingDeposit={setBookingDeposit} />
          </div>

          {/* Premium Partition for Packages */}
          <div className="w-full flex flex-col items-center justify-center my-20">
            <div className="h-[1px] w-full max-w-md bg-gradient-to-r from-transparent via-white/20 to-transparent mb-10"></div>
            <div className="flex flex-col items-center text-center">
              <span className="text-gold text-xs uppercase tracking-[0.3em] font-bold mb-3">Final Step</span>
              <h4 className="font-serif text-3xl md:text-4xl text-ivory tracking-wide">Choose Your Experience</h4>
              <p className="text-white/50 text-sm mt-3 max-w-sm">
                You have selected a deposit of <span className="text-gold font-bold">₹{bookingDeposit.toLocaleString()}</span>. Now pick your perfect match below.
              </p>
            </div>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent mt-10"></div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {BRIDAL_PACKAGES.map((p, i) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.9 }}
            className={`group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:-translate-y-1 min-h-[600px] ${
              p.featured ? "border-gold/70 border-[2px]" : "border-white/30 hover:border-gold/50"
            } ${
              i % 3 === 0 ? "bg-gradient-to-b from-[#151515] to-black" :
              i % 3 === 1 ? "bg-gradient-to-b from-[#1a1814] to-black" :
              "bg-gradient-to-b from-[#10141a] to-black"
            }`}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              {p.featured && (
                <div className="absolute right-4 top-4 z-10 rounded-full border border-gold/40 bg-black/70 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  MOST POPULAR
                </div>
              )}
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent opacity-90" />
            </div>
            <div className="relative z-10 flex flex-1 flex-col p-8 pt-0 -mt-6 gap-2">
              <h3 className="font-serif text-3xl text-gold drop-shadow-md">{p.name}</h3>
              <p className="text-[13px] leading-relaxed text-[#f5f5f0]/90 font-medium tracking-wide">{p.desc}</p>
              
              <div className="flex flex-col border-t border-white/[0.08] pt-6 w-full mt-auto">
                <div className="flex justify-between items-end mb-5">
                  <div className="flex flex-col">
                    <del className="text-[11px] text-[#f5f5f0]/40 mb-1 tracking-widest font-light">VALUE: ₹{(parseInt(p.price.replace(/\D/g, "")) + 10000).toLocaleString("en-IN")}</del>
                    <div className="font-serif text-[32px] leading-none text-[#D4AF37]">{p.price}</div>
                    {p.onward && (
                      <div className="text-[10px] tracking-[0.24em] uppercase text-[#f5f5f0]/50 mt-1.5">
                        {p.onward}
                      </div>
                    )}
                  </div>
                </div>

                <AnimatePresence>
                  {bookingDeposit > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }} 
                      animate={{ opacity: 1, height: "auto" }} 
                      className="flex flex-col gap-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] mb-4 shadow-inner"
                    >
                      <div className="flex justify-between items-center text-xs text-[#f5f5f0]/70 font-medium">
                        <span>Total Package Price</span>
                        <span className="text-[#f5f5f0] font-bold">₹{parseInt(p.price.replace(/\D/g, "")).toLocaleString("en-IN")}</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-medium text-[#f5f5f0]/70">
                        <span>Booking Deposit (Paying Now)</span>
                        <span className="text-emerald-400 font-bold tracking-wide">- ₹{bookingDeposit.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="h-px w-full border-t border-dashed border-white/15 my-2" />
                      <div className="flex justify-between items-center text-base font-bold text-[#f5f5f0] tracking-wide">
                        <span>Due at Venue</span>
                        <span className="text-[#D4AF37]">₹{(parseInt(p.price.replace(/\D/g, "")) - bookingDeposit).toLocaleString("en-IN")}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  disabled={isProcessing || bookingDeposit === 0}
                  onClick={() => handlePayment(p.name)}
                  className={`group flex w-full items-center justify-center gap-3 rounded-full border border-blue-500/30 py-3.5 transition-all duration-300 ${
                    isProcessing || bookingDeposit === 0
                      ? "bg-white/50 opacity-50 cursor-not-allowed"
                      : "bg-white hover:bg-gray-50 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] cursor-pointer"
                  }`}
                >
                  <span className="text-[11px] font-extrabold tracking-[0.15em] uppercase text-black mt-0.5">
                    {bookingDeposit === 0 ? "Select Deposit Above" : "Secure My Date"}
                  </span>

                  <div className="flex items-center -space-x-1.5 opacity-100 transition-transform duration-300 group-hover:scale-110">
                    {/* GPay */}
                    <div className="w-[20px] h-[20px] rounded-full bg-white flex items-center justify-center relative z-[4] shadow-sm border border-gray-200 shrink-0">
                      <svg viewBox="0 0 48 48" className="w-[10px] h-[10px]">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z" />
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                      </svg>
                    </div>
                    {/* PhonePe */}
                    <div className="w-[20px] h-[20px] rounded-full bg-[#5f259f] flex items-center justify-center relative z-[3] shadow-sm border border-gray-200 shrink-0">
                      <span className="text-[7px] font-bold text-white tracking-tighter">पे</span>
                    </div>
                    {/* UPI */}
                    <div className="w-[20px] h-[20px] rounded-full bg-white flex items-center justify-center relative z-[2] shadow-sm border border-gray-200 shrink-0">
                      <span className="text-[6px] font-bold text-black tracking-tighter italic">UPI</span>
                    </div>
                    {/* Mastercard */}
                    <div className="w-[20px] h-[20px] rounded-full bg-white flex items-center justify-center relative z-[1] shadow-sm border border-gray-200 shrink-0">
                      <svg viewBox="0 0 24 24" className="w-[12px] h-[12px]">
                        <circle cx="8" cy="12" r="6" fill="#EB001B" />
                        <circle cx="16" cy="12" r="6" fill="#F79E1B" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* WhatsApp Inquire Button */}
                <a
                  href={`https://wa.me/919572194458?text=${encodeURIComponent(`Hi Jawed Habib team! I am interested in booking the ${p.name}. Is it available?`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 group flex w-full items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 hover:bg-[#25D366]/20 hover:border-[#25D366]/80 py-3 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(37,211,102,0.1)] hover:shadow-[0_0_20px_rgba(37,211,102,0.2)]"
                >
                  <svg className="w-4 h-4 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 0C5.385 0 0 5.384 0 12.029c0 2.115.552 4.17 1.6 5.986L.027 24l6.155-1.55c1.765.98 3.75 1.5 5.845 1.5 6.645 0 12.028-5.385 12.028-12.03 0-6.645-5.384-12.029-12.024-12.02zm0 22.06c-1.802 0-3.565-.484-5.112-1.402l-.367-.217-3.799.957 1.01-3.69-.238-.378a10.134 10.134 0 0 1-1.558-5.302c0-5.611 4.562-10.17 10.168-10.17 5.606 0 10.166 4.56 10.166 10.17 0 5.611-4.56 10.171-10.17 10.171h-.1zm5.578-7.614c-.307-.153-1.812-.894-2.094-1-.283-.105-.489-.153-.695.153-.205.306-.79 1-.968 1.205-.178.204-.356.23-.663.076-1.748-.887-3.045-2.003-4.137-4.148-.225-.44 0-.422.302-.727.152-.152.306-.356.459-.535.152-.178.203-.306.305-.509.102-.204.051-.383-.025-.536-.076-.153-.695-1.677-.951-2.296-.252-.601-.509-.52-.695-.53-.178-.01-.383-.01-.588-.01-.205 0-.537.076-.819.382-.283.306-1.077 1.053-1.077 2.569 0 1.516 1.1 2.981 1.254 3.185.154.204 2.168 3.327 5.253 4.654 2.181.939 2.981 1.01 4.149.882 1.341-.148 3.109-1.272 3.543-2.502.433-1.23.433-2.285.304-2.502-.128-.217-.486-.345-.792-.498z"/>
                  </svg>
                  <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#f5f5f0]">
                    Inquire on WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
      </div>
      </div>
    </Section>
  );
}

/* ----------------------------- BEFORE/AFTER ------------------------------ */

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <Section eyebrow="Transformation" title="Before, and after." description="Drag the divider.">
      <div className="relative mx-auto mt-14 aspect-[4/5] w-full max-w-3xl overflow-hidden rounded-2xl select-none">
        <img
          src="/before.jpg"
          alt="Before"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img
            src="/after.jpg"
            alt="After"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ width: `${(100 / pos) * 100}%`, minWidth: "100%" }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
          aria-label="Compare before and after"
        />
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -translate-x-1/2 border-l border-ivory/70" />
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-ivory text-background shadow-lg">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M4 1L1 5l3 4M10 1l3 4-3 4" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </div>
        </div>
        <span className="pointer-events-none absolute left-4 top-4 text-[10px] tracking-[0.24em] uppercase text-[#f5f5f0]/80">
          After
        </span>
        <span className="pointer-events-none absolute right-4 top-4 text-[10px] tracking-[0.24em] uppercase text-[#f5f5f0]/80">
          Before
        </span>
      </div>
    </Section>
  );
}

/* ---------------------------- TESTIMONIALS ------------------------------- */

function Testimonials() {
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Top reviews");
  const [helpfulReviews, setHelpfulReviews] = useState<Record<string, boolean>>({});

  const toggleHelpful = (authorName: string) => {
    setHelpfulReviews((prev) => ({
      ...prev,
      [authorName]: !prev[authorName],
    }));
  };

  const reviews = [
    {
      n: "Neha Sharma",
      date: "July 14, 2026",
      stars: 5,
      title: "Absolutely stunning work!",
      tag: "Bridal",
      q: "Got my bridal makeup done here last week and the team was exceptional! The HD makeup stayed put through all the crying and sweating during the pheras.",
    },
    {
      n: "Aarushi P.",
      date: "June 28, 2026",
      stars: 5,
      title: "Best Airbrush in Patna",
      tag: "Airbrush",
      q: "Booked them for my engagement in June 2026. The airbrush finish was so glass-like, literally everyone asked me where I got it done.",
    },
    {
      n: "Ananya S.",
      date: "May 12, 2026",
      stars: 5,
      title: "Flawless Bridal Makeup",
      tag: "Bridal",
      q: "I have never felt more like myself. Base ekdum flawless tha, and the eye makeup was literally exactly what I wanted for my big day.",
    },
    {
      n: "Priya M.",
      date: "March 05, 2026",
      stars: 4,
      title: "Stunning Reception Look",
      tag: "Party",
      q: "Makeup was stunning. Subah se lekar raat ke reception tak ekdum set tha, bas thoda rush tha subah but final look was amazing.",
    },
    {
      n: "Rhea K.",
      date: "February 18, 2026",
      stars: 5,
      title: "Best Studio in Patna",
      tag: "Bridal",
      q: "Patna mein Jawed Habib Kurji jaisa koi bridal studio nahi hai. The team made me feel so comfortable aur mera look sabko pasand aaya!",
    },
    {
      n: "Sanvi R.",
      date: "November 22, 2025",
      stars: 5,
      title: "Perfect Draping",
      tag: "Bridal",
      q: "Mera lehenga bohot bhari tha but draping itni perfect ki thi ki I was dancing all night without any worry. Highly recommended.",
    },
    {
      n: "Megha T.",
      date: "October 14, 2025",
      stars: 4,
      title: "Premium Products",
      tag: "Party",
      q: "Overall experience was very good. Products ekdum premium use kiye the aur skin pe bilkul heavy feel nahi ho raha tha.",
    },
    {
      n: "Nandini P.",
      date: "January 28, 2025",
      stars: 5,
      title: "Tearproof Guarantee",
      tag: "Bridal",
      q: "Tearproof makeup ki guarantee sach thi! Vidai ke time bohot royi but makeup touch se bhi kharab nahi hua. Thank you so much!",
    },
    {
      n: "Ishita D.",
      date: "April 09, 2024",
      stars: 5,
      title: "Natural & Elegant",
      tag: "Party",
      q: "Staff bohot polite aur professional hai. Mujhe natural look chahiye tha aur unhone exactly wahi deliver kiya. Best decision ever.",
    },
    {
      n: "Kritika S.",
      date: "May 15, 2024",
      stars: 5,
      title: "Booked Immediately",
      tag: "Party",
      q: "Engagement makeup ke liye aayi thi, and it was so good ki maine bridal booking bhi turant kar li. Ekdum subtle aur elegant.",
    },
    {
      n: "Sneha V.",
      date: "July 02, 2024",
      stars: 4,
      title: "Beautiful Hairdo",
      tag: "Hair",
      q: "Hairdo bohot sundar tha, bas thoda time zyada lag gaya but they made sure I looked perfect before leaving.",
    },
    {
      n: "Aditi G.",
      date: "August 21, 2024",
      stars: 5,
      title: "Magical Airbrush",
      tag: "Airbrush",
      q: "Airbrush makeup was magical. It didn't look cakey at all, photos mein filter ki zaroorat hi nahi padi!",
    },
    {
      n: "Kavya R.",
      date: "September 12, 2024",
      stars: 5,
      title: "Seamless Experience",
      tag: "Bridal",
      q: "From the consultation to the final look, everything was seamless. They actually listened to my inputs and execution was flawless.",
    },
    {
      n: "Simran A.",
      date: "August 04, 2024",
      stars: 5,
      title: "Felt Like a Celebrity",
      tag: "Party",
      q: "Haldi look was bright and fun, and reception look was totally glamorous. Do alag alag looks itni beautifully execute kiye, I felt like a celebrity!",
    },
    {
      n: "Pooja K.",
      date: "June 19, 2024",
      stars: 4,
      title: "Very Breathable",
      tag: "Bridal",
      q: "Products were top-notch and skin felt very breathable. Sirf ek problem thi ki AC thoda zyada thanda tha studio mein haha!",
    },
  ];

  const filters = ["All", "Bridal", "Party", "Hair", "Airbrush", "5 Stars"];

  const filteredReviews = reviews
    .filter((r) => {
      if (filter === "All") return true;
      if (filter === "5 Stars") return r.stars === 5;
      return r.tag === filter;
    })
    .sort((a, b) => {
      if (sortOrder === "Most recent") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      // Top reviews (highest stars, then most recent)
      if (b.stars !== a.stars) return b.stars - a.stars;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  // Stats calculation
  const totalReviews = 412;
  const avgRating = 4.8;
  const distribution = [
    { stars: 5, percent: 85 },
    { stars: 4, percent: 12 },
    { stars: 3, percent: 2 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 0 },
  ];

  return (
    <Section id="reviews" eyebrow="Verified Feedback" title="Trusted by brides everywhere.">
      <div className="mt-14 max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left Sidebar: Rating Summary */}
        <div className="lg:w-1/3 shrink-0">
          <div className="sticky top-24">
            <h3 className="text-2xl font-serif text-ivory mb-4">Customer Reviews</h3>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex text-2xl">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className={j < 4 ? "text-gold" : "text-gold/50"}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-3xl font-medium text-black">{avgRating} out of 5</span>
            </div>
            <p className="text-sm text-black/60 mb-8">{totalReviews} global ratings</p>

            <div className="space-y-3">
              {distribution.map((d) => (
                <div
                  key={d.stars}
                  className="flex items-center gap-3 text-sm text-black/70 group cursor-pointer"
                  onClick={() => setFilter(d.stars === 5 ? "5 Stars" : "All")}
                >
                  <span className="w-12 text-right group-hover:text-gold transition-colors whitespace-nowrap">
                    {d.stars} star
                  </span>
                  <div className="flex-1 h-3 bg-black/5 rounded-full overflow-hidden border border-black/10 group-hover:border-gold/50 transition-colors">
                    <div
                      className="h-full bg-gold rounded-full"
                      style={{ width: `${d.percent}%` }}
                    />
                  </div>
                  <span className="w-9 text-right text-black/50">{d.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Area: Filters & Reviews */}
        <div className="lg:w-2/3">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all border ${
                  filter === f
                    ? "bg-black text-white border-black shadow-md"
                    : "bg-transparent text-black/70 border-black/20 hover:border-gold hover:text-gold"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pb-4 mb-8 border-b border-black/10">
            <span className="text-sm text-black/60 font-medium">
              Showing {filteredReviews.length} verified reviews
            </span>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="bg-transparent border border-black/20 text-black/90 text-sm font-medium rounded-lg px-4 py-2 hover:border-black/40 focus:outline-none focus:border-gold outline-none cursor-pointer appearance-none pr-10 relative transition-colors"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1em",
              }}
            >
              <option value="Top reviews" className="bg-white text-black">
                Top reviews
              </option>
              <option value="Most recent" className="bg-white text-black">
                Most recent
              </option>
            </select>
          </div>

          {/* Review List */}
          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((r, i) => (
                <motion.div
                  key={i + r.n}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="pb-8 border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium text-ivory border border-white/10">
                      {r.n.charAt(0)}
                    </div>
                    <span className="font-medium text-ivory text-sm">{r.n}</span>
                  </div>

                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex text-sm">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <span key={j} className={j < r.stars ? "text-gold" : "text-white/10"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="font-medium text-ivory text-sm">{r.title}</span>
                  </div>

                  <div className="text-xs text-white/40 mb-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>Reviewed on {r.date}</span>
                    <span className="hidden sm:inline">|</span>
                    <span className="text-[#D4AF37] font-medium flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Verified Booking
                    </span>
                    <span className="hidden sm:inline">|</span>
                    <span className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10">
                      {r.tag}
                    </span>
                  </div>

                  <p className="text-white/80 text-sm leading-relaxed mb-4">{r.q}</p>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleHelpful(r.n)}
                      className={`flex items-center gap-1.5 text-xs transition-colors border rounded-full px-3 py-1 cursor-pointer ${
                        helpfulReviews[r.n]
                          ? "border-gold bg-gold/15 text-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                          : "border-white/10 text-white/50 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span>Helpful</span>
                      {helpfulReviews[r.n] && (
                        <span className="text-[10px] filter saturate-100 animate-pulse">👍</span>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredReviews.length === 0 && (
              <div className="py-12 text-center text-white/50">
                No reviews found for this filter.
              </div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* --------------------------- SALON EXPERIENCE ---------------------------- */

function SalonExperience() {
  const images = [
    "/salon/IMG_1371.JPG",
    "/salon/IMG_1364.JPG",
    "/salon/IMG_1369.JPG",
    "/salon/IMG_1374.JPG",
    "/salon/IMG_1382.JPG",
    "/salon/IMG_1362.JPG",
    "/salon/IMG_1361.JPG",
    "/salon/IMG_1370.JPG",
    "/salon/IMG_1310.JPG",
    "/salon/IMG_1375.JPG",
    "/salon/IMG_1373.JPG",
  ];

  return (
    <Section
      id="location"
      eyebrow="The Studio"
      title="A beautiful and calming space designed for your ultimate comfort."
    >
      <div className="mt-14 columns-2 gap-4 space-y-4 md:columns-3 lg:columns-4">
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: (i % 4) * 0.1, duration: 0.8 }}
            className="group relative break-inside-avoid overflow-hidden rounded-2xl bg-surface"
          >
            <img
              src={src}
              onError={(e) => (e.currentTarget.src = salonInterior)}
              alt="Salon Interior"
              loading="lazy"
              className="w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-[#000000]/10 transition-colors duration-500 group-hover:bg-transparent" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------- HAIR SERVICES ------------------------------ */

function HairServices() {
  const svc = [
    {
      name: "Keratin Treatment",
      icon: "✦",
      desc: "Frizz-free, silky smooth hair that lasts for months.",
      inclusions: [
        "Premium formaldehyde-free formula",
        "Signature blow-dry & thermal sealing",
        "Long-lasting frizz control (3-4 months)",
      ],
    },
    {
      name: "Hair Botox",
      icon: "◆",
      desc: "Deep repair and rejuvenation for damaged, lifeless hair.",
      inclusions: [
        "Deep fiber restoration & reconstruction",
        "Intense hydration & natural volume control",
        "Ideal for color-treated & heat-damaged hair",
      ],
    },
    {
      name: "Hair Smoothening",
      icon: "❖",
      desc: "Permanently straight, glossy hair with zero chemical damage.",
      inclusions: [
        "Permanent straightening alignment therapy",
        "Mirror-like gloss finish with natural proteins",
        "Includes personalized post-treatment care routine",
      ],
    },
    {
      name: "Hair Spa",
      icon: "✧",
      desc: "Deep conditioning therapy for nourished, healthy scalp.",
      inclusions: [
        "Scalp detox & premium oil stimulation massage",
        "Intense steam activation & nutrition lock",
        "Tailored hydration mask for your hair type",
      ],
    },
    {
      name: "Hair Colour",
      icon: "◇",
      desc: "Premium global & balayage colouring by certified colourists.",
      inclusions: [
        "Personalized shade matching & style consultation",
        "Global hair coloring, highlights, or balayage",
        "Ammonia-free formulas & color-lock treatment",
      ],
    },
    {
      name: "Hydrafacial",
      icon: "♛",
      desc: "Deep cleanse, exfoliate, and hydrate for an instant radiant glow.",
      inclusions: [
        "High-performance deep pore vacuum extraction",
        "Multi-step antioxidant & hyaluronic serum infusion",
        "Instant skin cooling, soothing, and visible radiance",
      ],
    },
  ];

  const [active, setActive] = useState<number | null>(0);

  return (
    <Section id="hair" eyebrow="Hair Studio" title="Beyond bridal. Perfected for every day.">
      <div className="mx-auto mt-14 max-w-4xl space-y-4">
        {svc.map((s, i) => {
          const isOpen = active === i;
          return (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.05, duration: 0.8 }}
              className={`group overflow-hidden rounded-2xl border bg-surface/30 transition-all duration-500 ${
                isOpen
                  ? "border-gold/30 bg-surface/50 shadow-[0_0_50px_rgba(212,175,55,0.05)]"
                  : "border-white/[0.06] hover:border-white/10 hover:bg-surface/40"
              }`}
            >
              {/* Header Toggle Row */}
              <button
                onClick={() => setActive(isOpen ? null : i)}
                className="flex w-full items-center justify-between p-6 text-left md:p-8"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <span className="font-mono text-xs tracking-widest text-gold/50">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-500 ${
                      isOpen
                        ? "border-gold/30 bg-gold/10 text-gold shadow-[0_0_15px_rgba(212,175,55,0.15)]"
                        : "border-white/10 bg-white/5 text-muted-foreground group-hover:border-gold/20 group-hover:text-gold"
                    }`}
                  >
                    <span className="text-sm md:text-base">{s.icon}</span>
                  </div>
                  <h3 className="font-serif text-lg md:text-xl tracking-wide text-ivory">
                    {s.name}
                  </h3>
                </div>

                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? "border-gold/30 text-gold bg-gold/5"
                      : "border-white/10 text-muted-foreground group-hover:border-gold/20 group-hover:text-gold"
                  }`}
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>
              </button>

              {/* Collapsible Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-white/[0.04] px-6 pb-6 pt-6 md:px-8 md:pb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="flex-1 space-y-4">
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                          {s.desc}
                        </p>

                        <div className="space-y-2">
                          <p className="text-[10px] font-semibold tracking-wider uppercase text-gold/60">
                            Service Benefits & Inclusions
                          </p>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {s.inclusions.map((inc, index) => (
                              <li
                                key={index}
                                className="flex items-center gap-2 text-xs text-ivory/80"
                              >
                                <span className="text-gold text-[10px]">✦</span>
                                <span>{inc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/919572194458?text=${encodeURIComponent(
                          `Hi, I want to book a ${s.name} appointment at Jawed Habib Kurji, Patna. Please let me know the details.`,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 rounded-full bg-gold/10 hover:bg-gold px-6 py-3 border border-gold/30 hover:border-gold text-xs font-semibold uppercase tracking-widest text-gold hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.1)] group/btn whitespace-nowrap self-start md:self-center"
                      >
                        <span>Book on WhatsApp</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

/* -------------------------------- BRANDS --------------------------------- */

function Brands() {
  const brands = [
    "MAC",
    "Nars",
    "Kryolan",
    "Huda Beauty",
    "Kay Beauty",
    "Dermacol",
    "D'Alba",
    "Maybelline",
    "Colorbar",
    "Forever 52",
    "Sugar",
    "Nykaa",
    "PAC",
    "Faces Canada",
  ];
  const row = [...brands, ...brands];
  return (
    <section className="border-y border-white/[0.06] bg-surface/40 py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <p className="eyebrow text-center">Only Premium Products</p>
      </div>
      <div className="relative mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="flex gap-14 whitespace-nowrap animate-[marquee_38s_linear_infinite]">
          {row.map((b, i) => (
            <span key={i} className="font-serif text-2xl italic text-ivory/70 md:text-3xl">
              {b}
              <span className="mx-14 text-gold/40">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- PROCESS --------------------------------- */

function Process() {
  const processSteps = [
    { t: "Consultation", d: "A detailed discussion over WhatsApp or Phone about your vision and styling preferences." },
    { t: "Choose Package", d: "Select your signature bridal makeup and styling look." },
    { t: "Booking Deposit", d: "Choose a non-refundable deposit between ₹1,500 and ₹2,500 to confirm the date exclusively for you." },
    {
      t: "The Big Day",
      d: "Undivided attention from your artist, trial, and draping rehearsals.",
    },
  ];
  const [active, setActive] = useState(0);
  return (
    <Section eyebrow="How It Works" title="A calm, considered process.">
      <div className="mt-14">
        {/* Progress rail */}
        <div className="relative hidden md:block">
          <div className="absolute left-0 right-0 top-6 h-px bg-foreground/10" />
          <motion.div
            className="absolute left-0 top-6 h-px bg-gold"
            initial={{ width: "0%" }}
            animate={{ width: `${(active / (processSteps.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          />
          <ol className="relative grid grid-cols-5 gap-4">
            {processSteps.map((s, i) => {
              const done = i <= active;
              return (
                <li key={s.t} className="flex flex-col items-center text-center">
                  <button
                    onClick={() => setActive(i)}
                    className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 ${
                      done
                        ? "border-gold bg-gold text-background scale-110"
                        : "border-foreground/20 bg-background text-muted-foreground"
                    }`}
                  >
                    <span className="font-serif text-lg">{i + 1}</span>
                    {done && (
                      <motion.span
                        layoutId="pulse"
                        className="absolute inset-0 rounded-full bg-gold/30"
                        initial={{ scale: 1, opacity: 0.6 }}
                        animate={{ scale: 1.6, opacity: 0 }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                      />
                    )}
                  </button>
                  <h3 className="mt-6 font-serif text-xl text-ivory">{s.t}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{s.d}</p>
                </li>
              );
            })}
          </ol>
          <div className="mt-10 flex justify-center gap-3">
            <button
              onClick={() => setActive(Math.max(0, active - 1))}
              className="btn-ghost-gold"
              disabled={active === 0}
            >
              ← Back
            </button>
            <button
              onClick={() => setActive(Math.min(processSteps.length - 1, active + 1))}
              className="btn-cream"
            >
              {active === processSteps.length - 1 ? "Restart" : "Next Step"}{" "}
              <span className="arrow">→</span>
            </button>
          </div>
        </div>

        {/* Mobile vertical rail */}
        <ol className="relative md:hidden">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-foreground/10" />
          <motion.div
            className="absolute left-6 top-0 w-px bg-gold"
            initial={{ height: "0%" }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true, margin: "-40%" }}
            transition={{ duration: 2, ease: [0.2, 0.8, 0.2, 1] }}
          />
          {processSteps.map((s, i) => (
            <motion.li
              key={s.t}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="relative flex gap-6 pb-10 last:pb-0"
            >
              <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold bg-background font-serif text-gold">
                {i + 1}
              </span>
              <div className="min-w-0 pt-2">
                <h3 className="font-serif text-2xl text-ivory">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

/* --------------------------------- FAQ ----------------------------------- */

function FAQ() {
  const faqs = [
    {
      q: "Do you travel to the wedding venue?",
      a: "Yes. Our artists travel across Patna and Bihar for weddings, with a private travel arrangement fee.",
    },
    {
      q: "How far in advance should I book?",
      a: "Popular months — November to February — are typically reserved 4–6 months in advance. We recommend booking early to secure your date.",
    },
    {
      q: "Is the booking deposit refundable?",
      a: "Your selected booking deposit (between ₹1,500 and ₹2,500) is non-refundable and will be securely adjusted against your final bill.",
    },
    {
      q: "Do you offer a trial?",
      a: "No, we do not offer a trial session. However, our experienced artists ensure your look is exactly what you envisioned through a detailed consultation before the event.",
    },
    {
      q: "Which products do you use?",
      a: "Only premium brands — MAC, Nars, Kryolan, Huda Beauty, Kay Beauty, Dermacol, D'Alba, Colorbar, and many more.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-7xl px-6 py-24 md:py-32 relative z-10">
      <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
        {/* Left Column: Heading & Contact */}
        <div className="lg:w-1/3 flex flex-col justify-start">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-xs font-bold tracking-[0.2em] text-gold uppercase"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-6 font-serif text-4xl text-ivory md:text-5xl lg:text-6xl lg:leading-[1.1]"
          >
            Frequently <br className="hidden lg:block" /> Asked <br className="hidden lg:block" /> Questions.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-8 text-white/60 text-lg leading-relaxed max-w-md"
          >
            Everything you need to know before you make the booking amount in your selected package type.
          </motion.p>
        </div>

        {/* Right Column: Accordion */}
        <div className="lg:w-2/3 flex flex-col gap-4 mt-4 lg:mt-12">
          {faqs.map((f, i) => {
            const active = open === i;
            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className={`rounded-2xl border transition-all duration-300 ${active ? "border-gold/30 bg-gold/5 shadow-[0_4px_30px_rgba(212,175,55,0.05)]" : "border-white/10 bg-black/40 hover:border-white/20 hover:bg-white/5"} backdrop-blur-md overflow-hidden`}
              >
                <button
                  onClick={() => setOpen(active ? null : i)}
                  className="flex w-full items-center justify-between gap-6 p-6 md:p-8 text-left"
                >
                  <span className={`font-serif text-xl md:text-2xl transition-colors ${active ? "text-gold" : "text-ivory"}`}>
                    {f.q}
                  </span>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${active ? "bg-gold text-background rotate-180" : "bg-white/5 text-ivory hover:bg-white/10"}`}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
                    >
                      <div className="px-6 pb-8 md:px-8 pt-0">
                        <div className="h-px w-full bg-white/10 mb-6" />
                        <p className="text-base md:text-lg leading-relaxed text-white/70">
                          {f.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- MAP ------------------------------------ */

function MapSection() {
  return (
    <Section eyebrow="Visit" title="Find the studio.">
      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="glass-card space-y-6 rounded-2xl p-8">
          <div>
            <p className="eyebrow">Address</p>
            <p className="mt-3 font-serif text-2xl text-ivory">Jawed Habib Hair & Beauty</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Ward 22B, Circle 247B, Holding 817A/2, Patliputra Kurji Rd, above Lenskart Outlet,
              opposite RBI Quarter, Patna, Bihar 800010
            </p>
          </div>
          <div>
            <p className="eyebrow">Hours</p>
            <p className="mt-3 text-sm text-ivory">Mon–Sun · 10:00 AM – 8:30 PM</p>
            <p className="text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
              Open all days
            </p>
          </div>
          <div>
            <p className="eyebrow">Contact</p>
            <a href="tel:+919572194458" className="mt-3 block text-sm text-ivory">
              +91 95721 94458
            </a>
            <a href="tel:+919709575559" className="block text-sm text-ivory">
              +91 97095 75559
            </a>
            <a href={WHATSAPP} className="mt-1 block text-sm text-gold">
              WhatsApp Us →
            </a>
          </div>
          <p className="text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
            Private parking · Wheelchair accessible
          </p>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.06]">
          <iframe
            title="Map"
            src="https://www.google.com/maps?q=Jawed+Habib+Hair+Beauty+Kurji+Patna&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0 }}
          />
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------ RESERVE CTA ------------------------------ */

function ReserveCTA() {
  return (
    <section id="reserve" className="w-full bg-[#f7f4ec] py-24 px-4 md:px-6 relative z-10 border-t border-b border-black/[0.03]">
      <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-[#0a0a0a]/5 bg-white/40 p-8 md:p-16 lg:p-20 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
        {/* Subtle background glow element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/10 blur-[100px] rounded-full pointer-events-none -mr-20 -mt-20" />
        
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-6 relative z-10">SECURE YOUR SPOT</span>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl md:text-6xl lg:text-[4.5rem] tracking-tight leading-[1.05] text-[#0a0a0a] mb-8 relative z-10"
        >
          The spotlight, <br className="md:hidden"/> <span className="italic text-gold">exclusively yours.</span>
        </motion.h2>

        <p className="text-sm md:text-base leading-relaxed text-black/60 font-light max-w-xl mb-12 relative z-10">
          We strictly limit our daily bridal appointments to ensure absolute, uncompromising attention to detail. A fully adjustable booking amount of <span className="text-[#0a0a0a] font-medium border-b border-gold/30 pb-0.5">₹1,500 - ₹2,500</span> locks in your date and artists.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 w-full relative z-10">
          <a 
            href={WHATSAPP}
            className="w-full sm:w-auto flex items-center justify-center gap-4 rounded-full bg-[#0a0a0a] px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#f5f5f0] hover:bg-gold hover:text-[#0a0a0a] transition-all hover:-translate-y-1 shadow-[0_10px_20px_rgba(0,0,0,0.1)] group"
          >
            <span>Book Now</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          
          <a 
            href="tel:+919572194458" 
            className="w-full sm:w-auto flex items-center justify-center rounded-full bg-white border border-[#0a0a0a]/10 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#0a0a0a] hover:border-gold hover:text-gold transition-all hover:-translate-y-1 shadow-sm"
          >
            Call Studio
          </a>
          
          <a 
            href="#packages" 
            className="w-full sm:w-auto flex items-center justify-center rounded-full bg-white border border-[#0a0a0a]/10 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#0a0a0a] hover:border-gold hover:text-gold transition-all hover:-translate-y-1 shadow-sm"
          >
            View Packages
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="relative z-10 bg-[#0a0a0a] text-[#f5f5f0] overflow-hidden pt-24 pb-8 mt-4 md:mx-4 md:mb-4 md:rounded-[3rem] shadow-2xl">
      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        
        {/* Top Section: Brand and Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24 border-b border-[#f5f5f0]/10 pb-20">
          
          <div className="w-full lg:w-1/2">
            <img src={logoImg} alt="Jawed Habib Logo" className="h-16 w-auto object-contain mb-8 filter brightness-0 invert opacity-90" />
            <h2 className="font-serif text-3xl md:text-5xl lg:text-[3.5rem] tracking-tight leading-[1.1] mb-6">
              Flawless artistry for <br className="hidden md:block"/> the modern bride.
            </h2>
            <p className="text-[#f5f5f0]/50 max-w-sm text-sm leading-relaxed font-light">
              Patna's premier luxury salon. Specializing in bespoke bridal transformations, global hair styling, and clinical aesthetics.
            </p>
          </div>

          <div className="w-full lg:w-1/2 lg:pl-16">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold block mb-6">OUR BRIDAL PROMISE</span>
            <p className="text-[#f5f5f0]/60 text-sm md:text-base leading-relaxed font-light mb-10 max-w-md">
              Your wedding day is the most photographed day of your life. We promise uncompromising artistry, premium products, and a flawless look that stays perfect from the first look to the final dance.
            </p>
            
            <div className="border-t border-[#f5f5f0]/10 pt-10 mt-8 flex items-center justify-between gap-6">
               <div className="flex flex-col">
                  <span className="font-serif text-4xl md:text-5xl italic text-[#f5f5f0] mb-2 font-light tracking-wide">
                    Exclusive Artistry
                  </span>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-gold font-bold">Kurji, Patna</span>
               </div>
               
               <div className="relative w-24 h-24 flex shrink-0 items-center justify-center group cursor-pointer">
                 {/* Spinning Text SVG */}
                 <svg className="absolute w-full h-full animate-[spin_8s_linear_infinite]" viewBox="0 0 100 100">
                   <path id="textPath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
                   <text className="text-[10.5px] font-bold tracking-[0.2em] uppercase fill-[#f5f5f0]/50 group-hover:fill-gold transition-colors duration-500">
                     <textPath href="#textPath" startOffset="0%">
                       • EXCLUSIVE BRIDAL ARTISTRY 
                     </textPath>
                   </text>
                 </svg>
                 
                 {/* Center Icon */}
                 <div className="w-12 h-12 rounded-full bg-[#f5f5f0]/5 flex items-center justify-center border border-[#f5f5f0]/10 group-hover:bg-gold/10 group-hover:border-gold/30 transition-colors duration-500">
                   <svg className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                   </svg>
                 </div>
               </div>
            </div>
          </div>

        </div>

        {/* Links Grid */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 mb-24">
          
          <div className="space-y-4 md:space-y-6">
            <h4 className="font-serif text-2xl md:text-3xl text-gold/90 tracking-wide">Visit Studio</h4>
            <div className="text-sm text-[#f5f5f0]/50 leading-relaxed font-light space-y-1">
              <p>Ward 22B, Circle 247B</p>
              <p>Holding 817A/2, Patliputra Kurji Rd</p>
              <p>Above Lenskart, Opp RBI Quarter</p>
              <p>Patna, Bihar 800010</p>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h4 className="font-serif text-2xl md:text-3xl text-gold/90 tracking-wide">Say Hello</h4>
            <div className="flex flex-col gap-3 text-sm font-light text-[#f5f5f0]/50">
              <a href="tel:+919572194458" className="hover:text-gold transition-colors w-fit">+91 95721 94458</a>
              <a href="tel:+919234444558" className="hover:text-gold transition-colors w-fit">+91 92344 44558</a>
              <a href="mailto:contact@jawedhabibkurji.com" className="hover:text-gold transition-colors w-fit">hello@jawedhabibkurji.com</a>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h4 className="font-serif text-2xl md:text-3xl text-gold/90 tracking-wide">Hours</h4>
            <div className="text-sm font-light text-[#f5f5f0]/50 space-y-2">
              <p className="flex items-center justify-between border-b border-[#f5f5f0]/5 pb-2">
                <span>Mon - Sun</span>
                <span className="text-[#f5f5f0]">10:00 AM - 8:30 PM</span>
              </p>
              <p className="pt-1 italic text-xs">Available for early bridal bookings upon request.</p>
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h4 className="font-serif text-2xl md:text-3xl text-gold/90 tracking-wide">Connect</h4>
            <a href="https://www.instagram.com/jawedhabib_kurji_patna/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-sm font-light text-[#f5f5f0]/50 hover:text-gold transition-colors w-fit">
              <div className="w-10 h-10 rounded-full border border-[#f5f5f0]/10 flex items-center justify-center group-hover:border-gold/30 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
              <span className="group-hover:translate-x-1 transition-transform">Instagram</span>
            </a>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#f5f5f0]/10 text-[10px] uppercase tracking-[0.2em] text-[#f5f5f0]/30 font-bold gap-6">
          <p>© {new Date().getFullYear()} JAWED HABIB KURJI.</p>
          
          <div className="flex items-center">
            <span className="text-[#f5f5f0]/30 lowercase tracking-[0.2em] font-light flex items-center">
              Built with <span className="text-gold mx-1.5 text-xs">♥</span> by
            </span>
            <span className="font-serif tracking-wide text-[#f5f5f0] italic capitalize text-sm ml-2 mr-4">
              Faisal
            </span>
            
            <div className="flex items-center gap-3 border-l border-[#f5f5f0]/20 pl-4">
              <a 
                href="https://github.com/f8sxl" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#f5f5f0]/40 hover:text-gold transition-all hover:-translate-y-0.5 duration-300"
                aria-label="GitHub"
              >
                <svg className="h-[15px] w-[15px] fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a 
                href="https://www.linkedin.com/in/faisal-undefined-0a8135420" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#f5f5f0]/40 hover:text-gold transition-all hover:-translate-y-0.5 duration-300"
                aria-label="LinkedIn"
              >
                <svg className="h-[15px] w-[15px] fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a 
                href="https://x.com/faisalarete" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#f5f5f0]/40 hover:text-gold transition-all hover:-translate-y-0.5 duration-300"
                aria-label="X (Twitter)"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";

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
  component: Landing,
});

const WHATSAPP = "https://wa.me/919572194458?text=Hi%2C%20I%27d%20like%20to%20reserve%20my%20wedding%20date%20at%20Jawed%20Habib%20Kurji.";
const PHONE = "tel:+919572194458";

function Landing() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.5 });

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
        <Availability />
        <Gallery />
        <Transformations />
        <WhyUs />
        <Packages />
        <BeforeAfter />
        <Testimonials />
        <SalonExperience />
        <HairServices />
        <Brands />
        <Process />
        <FAQ />
        <MapSection />

        <ReserveCTA />
      </main>

      <Footer />

      <a 
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
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
        className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 md:top-6"
      >
        <div
          className={`flex w-full max-w-6xl items-center justify-between rounded-full border border-white/10 px-4 backdrop-blur-xl transition-all duration-500 md:px-5 ${
            scrolled
              ? "h-14 bg-black/70 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.9)]"
              : "h-16 bg-black/40 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.7)] md:h-[70px]"
          }`}
        >
          <a href="#top" className="flex items-center gap-2 pl-1">
            <img 
              src={logoImg} 
              alt="Jawed Habib Kurji Logo" 
              className="h-8 md:h-10 w-auto object-contain" 
            />
            <span className="font-serif text-lg tracking-wide text-ivory hidden sm:inline-block">Jawed Habib</span>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_ITEMS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="group relative text-[12px] tracking-[0.14em] text-ivory/80 uppercase transition-colors hover:text-ivory"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href="#reserve" className="hidden md:inline-flex btn-cream !py-2.5 !px-5 !text-[11px]">
              Reserve <span className="arrow">→</span>
            </a>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ivory"
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
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      aria-pressed={dark}
      className="theme-toggle"
    >
      <AnimatePresence mode="wait" initial={false}>
        {!mounted || dark ? (
          <motion.svg
            key="moon"
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </motion.svg>
        )}
      </AnimatePresence>
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-ivory"
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
                  className="font-serif text-5xl text-ivory leading-none"
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
                <a href={WHATSAPP} className="rounded-full border border-white/10 py-3 text-center text-ivory/80">
                  WhatsApp
                </a>
                <a href={PHONE} className="rounded-full border border-white/10 py-3 text-center text-ivory/80">
                  Call
                </a>
                <a href="https://instagram.com" className="rounded-full border border-white/10 py-3 text-center text-ivory/80">
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

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] w-full overflow-hidden lg:h-[100svh] lg:min-h-[720px]">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <video
          src="/hero-bg.mov"
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover blur-[4px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center gap-8 px-6 pb-24 pt-32 lg:h-full lg:min-h-0 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:pb-28 lg:pt-0"
      >
        <div className="flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col items-start gap-4"
          >
            <p className="eyebrow">
              Jawed Habib · Kurji, Patna
            </p>
            <div className="flex items-center gap-3">
              <div className="flex text-gold">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-sm">{s}</span>
                ))}
              </div>
              <div className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
                4.9 · 400+ Google reviews
              </div>
            </div>
          </motion.div>

          <WordReveal
            text="The bride you will always remember being."
            className="mt-6 max-w-4xl font-serif text-[clamp(2.2rem,8vw,6rem)] leading-[0.98] tracking-[-0.02em] text-ivory"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.9 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a href="#packages" className="btn-cream">
              Claim Your Look <span className="arrow">→</span>
            </a>
          </motion.div>
        </div>

        {/* Scarcity Live Status Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="w-full max-w-sm shrink-0 rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl"
        >
          <div className="mb-6 inline-flex animate-pulse items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-[10px] font-medium tracking-wider text-red-200 uppercase">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
            High Demand
          </div>
          
          <h3 className="mb-2 font-serif text-3xl text-ivory">Winter Wedding Season</h3>
          <p className="mb-8 text-sm text-white/60">Our calendar is filling up quickly for the upcoming bridal season.</p>
          
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

          <a href="#availability" className="flex w-full items-center justify-center rounded-full bg-ivory px-6 py-3 text-sm font-medium tracking-wide text-background transition-colors hover:bg-white">
            Check Available Dates <span className="ml-2">→</span>
          </a>
        </motion.div>
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
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.05em] pr-[0.28em] align-top">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 1.1,
              delay: 0.7 + i * 0.08,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="inline-block"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

/* ----------------------------- AVAILABILITY ------------------------------ */

function Availability() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const today = new Date();
  today.setHours(0,0,0,0);

  return (
    <Section id="availability" eyebrow="Wedding Date" title="Reserve before your date is taken.">
      <div className="mx-auto mt-14 max-w-4xl">
        <div className="glass-card flex flex-col gap-10 rounded-3xl p-6 md:flex-row md:p-10">
          {/* Calendar Side */}
          <div className="flex-1 rounded-2xl border border-white/10 bg-black/20 p-6">
            <div className="mb-6 flex items-center justify-between">
              <button onClick={prevMonth} className="p-2 text-white/50 transition-colors hover:text-ivory">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <div className="font-serif text-xl text-ivory">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </div>
              <button onClick={nextMonth} className="p-2 text-white/50 transition-colors hover:text-ivory">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            
            <div className="mb-2 grid grid-cols-7 gap-x-1 gap-y-2 text-center">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                <div key={d} className="pb-2 text-xs font-medium text-white/40">{d}</div>
              ))}
              {days.map((d, i) => {
                if (d === null) return <div key={`empty-${i}`} className="p-2" />;
                const thisDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
                const isPast = thisDate < today;
                const isSelected = selectedDate?.getTime() === thisDate.getTime();
                
                return (
                  <button 
                    key={d}
                    disabled={isPast}
                    onClick={() => setSelectedDate(thisDate)}
                    className={`flex h-9 w-full items-center justify-center rounded-full text-sm transition-all ${
                      isPast ? 'cursor-not-allowed text-white/20' :
                      isSelected ? 'scale-110 bg-gold font-medium text-background shadow-[0_0_15px_rgba(212,175,55,0.4)]' :
                      'text-ivory hover:scale-110 hover:bg-white/10'
                    }`}
                  >
                    {d}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Form Side */}
          <div className="flex flex-1 flex-col justify-center gap-6">
            <h3 className="mb-2 font-serif text-2xl text-ivory">Confirm Your Slot</h3>
            <p className="mb-4 leading-relaxed text-sm text-ivory/60">
              Date can be shifted even after the amount gets booked according to your convenience.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                <span className="text-sm text-white/60">Selected Date</span>
                <span className="font-medium text-gold">
                  {selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}) : 'None selected'}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                <span className="text-sm text-white/60">Booking Deposit</span>
                <span className="font-medium text-ivory">₹2,000</span>
              </div>
            </div>

            <a 
              href="#availability"
              className={`btn-cream mt-4 w-full justify-center ${!selectedDate && 'pointer-events-none opacity-50'}`}
            >
              Secure This Date <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block border-b border-white/10 focus-within:border-gold transition-colors">
      <span className="eyebrow block">{label}</span>
      {children}
    </label>
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
                    <span className="text-[10px] tracking-[0.28em] uppercase text-ivory/90">
                      Plate {String(i + 1).padStart(2, "0")} / {String(brides.length).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-ivory/90 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-background">
                      Tap →
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
  const videos = [
    "https://player.vimeo.com/video/1210129546?background=1",
    "https://player.vimeo.com/video/1210129516?background=1",
    "https://player.vimeo.com/video/1210129528?background=1",
    "https://player.vimeo.com/video/1210129477?background=1",
    "https://player.vimeo.com/video/1210129479?background=1",
    "https://player.vimeo.com/video/1210129481?background=1",
    "https://player.vimeo.com/video/1210129478?background=1"
  ];
  
  const items = videos.map((src, i) => ({
    src,
    title: ["Aanya", "Ishita", "Meher", "Rhea", "Sanvi", "Tara", "Kriti"][i],
    duration: ["1:04", "0:48", "1:22", "0:56", "1:11", "0:44", "1:15"][i],
  }));

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
              <iframe src={it.src} allow="autoplay; fullscreen; picture-in-picture" className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-left">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-background transition-transform duration-300 group-hover:scale-110">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor"><path d="M0 0v12l10-6z" /></svg>
                  </span>
                  <div>
                    <div className="font-serif text-2xl text-ivory">{it.title}</div>
                    <div className="text-[11px] tracking-[0.2em] uppercase text-ivory/60">
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-6 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative aspect-[9/13] max-h-full w-full max-w-sm overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe src={items[active].src} allow="autoplay; fullscreen; picture-in-picture" className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute inset-0 bg-black/20" />
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-ivory backdrop-blur"
                aria-label="Close"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.2" /></svg>
              </button>
              <div className="absolute inset-x-0 bottom-0 p-6 text-center text-ivory">
                <div className="font-serif text-3xl">{items[active].title}</div>
                <p className="mt-2 text-[11px] tracking-[0.2em] uppercase text-ivory/60">
                  Reel preview · Full video plays in salon consultation
                </p>
              </div>
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
    { t: "The Flawless Canvas", d: "Charlotte Tilbury Airbrush, MAC Studio Fix, Pixi Glow Tonic & d'Alba First Spray Serum for an immaculate, long-lasting base." },
    { t: "The Sculpt & Glow", d: "Nars Liquid Blushes, Kay Beauty Contour, and Forever 52 Desert Glow for radiant, dimensional warmth." },
    { t: "Hypnotic Eyes", d: "Colorbar Peacock Throne, Kryolan High-Def Glitters, and PAC Dual Fold systems for mesmerizing, tear-proof wear." },
    { t: "The Perfect Pout", d: "PAC Timeless Matte, Parul Garg Signatures, and Huda Beauty finishing touches to last through the final toast." },
  ];
  const [active, setActive] = useState(0);

  return (
    <Section id="bridal" eyebrow="Premium Products" title="Brands we trust for your big day.">
      <div className="mt-14 grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-stretch">
        
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
                    <span className={`font-serif text-xl transition-colors duration-500 ${open ? "text-gold" : "text-muted-foreground"}`}>
                      0{i + 1}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className={`block font-serif text-2xl transition-colors duration-500 ${open ? "text-ivory" : "text-foreground/70 group-hover:text-ivory"}`}>
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
        <div className="group relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 bg-black md:min-h-full">
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0 h-full w-full"
          >
            <motion.img
              src="/new-bride.jpg"
              alt="Bride showcasing premium products"
              animate={{ 
                scale: [1, 1.05, 1], 
              }}
              transition={{ 
                duration: 25, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="h-full w-full object-cover object-top"
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

function Packages() {
  const pkgs = [
    {
      name: "Haldi & Sangeet",
      img: "/haldi.jpg",
      price: "₹10,000",
      onward: "",
      desc: "Luminous, sweat-proof, and vibrant makeup designed for daytime rituals and energetic evenings.",
    },
    {
      name: "Engagement Makeup",
      img: "/engagement.jpg",
      price: "₹12,000",
      onward: "",
      desc: "Soft, glamorous, and photogenic look perfectly tailored for your ring ceremony.",
    },
    {
      name: "HD Bridal",
      img: "/hd-bridal.jpg",
      price: "₹15,000",
      onward: "",
      desc: "High-Definition bridal makeup and elegant styling.",
    },
    {
      name: "Ultra HD Bridal",
      img: "/ultra-hd.jpg",
      price: "₹17,000",
      onward: "",
      desc: "Flawless base, long-lasting wear, and a stunning glass skin finish.",
    },
    {
      name: "Premium HD Bridal",
      img: "/premium-hd.jpg",
      price: "₹22,000",
      onward: "",
      desc: "Flawless application, long-lasting, completely tearproof and dragproof.",
      featured: true,
    },
    {
      name: "Luxe Reception Bridal",
      img: "/luxe.jpg",
      price: "₹24,000",
      onward: "",
      desc: "Flawless, tearproof, dragproof, and engineered for 24-hour long-lasting endurance.",
    },
  ];
  return (
    <Section id="packages" eyebrow="Bridal Packages" title="Six ways to be adorned.">
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {pkgs.map((p, i) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.9 }}
            className={`group relative flex flex-col overflow-hidden rounded-3xl border transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:-translate-y-1 ${
              p.featured ? "border-gold/50" : "border-white/[0.08] hover:border-gold/30"
            } bg-gradient-to-b from-surface to-black`}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              {p.featured && (
                <div className="absolute right-4 top-4 z-10 rounded-full border border-gold/40 bg-black/70 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                  Most Reserved
                </div>
              )}
              <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
            </div>
            <div className="relative z-10 flex flex-1 flex-col p-8 pt-0 -mt-10">
              <h3 className="font-serif text-3xl text-ivory drop-shadow-lg">{p.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{p.desc}</p>
              <div className="mt-auto pt-8">
                <div className="flex items-center justify-between border-t border-white/[0.08] pt-6">
                <div>
                  <div className="font-serif text-3xl text-gold">{p.price}</div>
                  {p.onward && <div className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground mt-1">{p.onward}</div>}
                </div>
                <a href="#reserve" className="inline-flex items-center justify-center rounded-full border border-gold/50 bg-gold/10 px-5 py-2.5 text-[11px] font-medium tracking-[0.2em] uppercase text-gold backdrop-blur-sm transition-all duration-300 hover:bg-gold hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                  Reserve
                </a>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
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
        <img src="/before.jpg" alt="Before" className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
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
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M4 1L1 5l3 4M10 1l3 4-3 4" stroke="currentColor" strokeWidth="1.4" /></svg>
          </div>
        </div>
        <span className="pointer-events-none absolute left-4 top-4 text-[10px] tracking-[0.24em] uppercase text-ivory/80">After</span>
        <span className="pointer-events-none absolute right-4 top-4 text-[10px] tracking-[0.24em] uppercase text-ivory/80">Before</span>
      </div>
    </Section>
  );
}

/* ---------------------------- TESTIMONIALS ------------------------------- */

function Testimonials() {
  const t = [
    { n: "Ananya S.", w: "March 2024", stars: 5, q: "I have never felt more like myself. Base ekdum flawless tha, and the eye makeup was literally exactly what I wanted for my big day." },
    { n: "Priya M.", w: "December 2024", stars: 4, q: "Makeup was stunning. Subah se lekar raat ke reception tak ekdum set tha, bas thoda rush tha subah but final look was amazing." },
    { n: "Rhea K.", w: "November 2024", stars: 5, q: "Patna mein Jawed Habib Kurji jaisa koi bridal studio nahi hai. The team made me feel so comfortable aur mera look sabko pasand aaya!" },
    { n: "Sanvi R.", w: "October 2024", stars: 5, q: "Mera lehenga bohot bhari tha but draping itni perfect ki thi ki I was dancing all night without any worry. Highly recommended." },
    { n: "Megha T.", w: "February 2024", stars: 4, q: "Overall experience was very good. Products ekdum premium use kiye the aur skin pe bilkul heavy feel nahi ho raha tha." },
    { n: "Nandini P.", w: "January 2025", stars: 5, q: "Tearproof makeup ki guarantee sach thi! Vidai ke time bohot royi but makeup touch se bhi kharab nahi hua. Thank you so much!" },
    { n: "Ishita D.", w: "April 2024", stars: 5, q: "Staff bohot polite aur professional hai. Mujhe natural look chahiye tha aur unhone exactly wahi deliver kiya. Best decision ever." },
    { n: "Kritika S.", w: "May 2024", stars: 5, q: "Engagement makeup ke liye aayi thi, and it was so good ki maine bridal booking bhi turant kar li. Ekdum subtle aur elegant." },
    { n: "Sneha V.", w: "July 2024", stars: 4, q: "Hairdo bohot sundar tha, bas thoda time zyada lag gaya but they made sure I looked perfect before leaving." },
    { n: "Aditi G.", w: "August 2024", stars: 5, q: "Airbrush makeup was magical. It didn't look cakey at all, photos mein filter ki zaroorat hi nahi padi!" },
    { n: "Kavya R.", w: "September 2024", stars: 5, q: "From the consultation to the final look, everything was seamless. They actually listened to my inputs and execution was flawless." },
    { n: "Simran A.", w: "August 2024", stars: 5, q: "Haldi look was bright and fun, and reception look was totally glamorous. Do alag alag looks itni beautifully execute kiye, I felt like a celebrity!" },
    { n: "Pooja K.", w: "June 2024", stars: 4, q: "Products were top-notch and skin felt very breathable. Sirf ek problem thi ki AC thoda zyada thanda tha studio mein haha!" },
    { n: "Tanya M.", w: "May 2024", stars: 5, q: "Best makeup studio in Bihar! Every single guest asked me where I got my makeup done. Jawed Habib Kurji has the best bridal team hands down." },
    { n: "Aisha S.", w: "October 2024", stars: 5, q: "My eyes are very sensitive but unhone itni carefully eye makeup kiya ki koi watering ya redness nahi hui. Bohot professional log hain." },
  ];

  const rotations = [
    "rotate-0",
    "-rotate-[3deg]",
    "rotate-[2deg]",
    "-rotate-[1deg]",
    "rotate-[4deg]",
    "-rotate-[2deg]",
    "rotate-0",
    "rotate-[3deg]",
    "-rotate-[4deg]"
  ];

  return (
    <Section id="reviews" eyebrow="In Their Words" title="Trusted by the brides of Bihar.">
      <div className="mt-14 columns-1 gap-6 space-y-6 md:columns-2 lg:columns-3 xl:columns-4">
        {t.map((it, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: (i % 4) * 0.1, duration: 0.9 }}
            className={`glass-card group relative break-inside-avoid flex flex-col overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:z-10 hover:scale-[1.03] hover:rotate-0 hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] ${rotations[i % rotations.length]}`}
          >
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <div className="flex text-lg">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <span key={j} className={j < it.stars ? "text-gold" : "text-white/10"}>★</span>
                  ))}
                </div>
                <blockquote className="mt-6 font-serif text-[1.15rem] leading-relaxed text-ivory">
                  “{it.q}”
                </blockquote>
              </div>
              <figcaption className="mt-8 border-t border-white/[0.06] pt-5">
                <div className="text-sm font-medium text-ivory">{it.n}</div>
                <div className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground mt-1.5">Bride · {it.w}</div>
              </figcaption>
            </div>
          </motion.figure>
        ))}
      </div>
      <p className="mt-8 text-center text-[11px] tracking-[0.24em] uppercase text-muted-foreground">
        Verified on Google · <a href="https://share.google/uvjGMHYzYzGpzXCSL" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">400+ reviews</a> · Swipe →
      </p>
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
    <Section id="location" eyebrow="The Studio" title="A beautiful and calming space designed for your ultimate comfort.">
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
              onError={(e) => e.currentTarget.src = salonInterior} 
              alt="Salon Interior" 
              loading="lazy" 
              className="w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-transparent" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------- HAIR SERVICES ------------------------------ */

function HairServices() {
  const svc = [
    { name: "Keratin Treatment", icon: "✦", desc: "Frizz-free, silky smooth hair that lasts for months." },
    { name: "Hair Botox", icon: "◆", desc: "Deep repair and rejuvenation for damaged, lifeless hair." },
    { name: "Hair Smoothening", icon: "❖", desc: "Permanently straight, glossy hair with zero chemical damage." },
    { name: "Hair Spa", icon: "✧", desc: "Deep conditioning therapy for nourished, healthy scalp." },
    { name: "Hair Colour", icon: "◇", desc: "Premium global & balayage colouring by certified colourists." },
    { name: "Hydrafacial", icon: "♛", desc: "Deep cleanse, exfoliate, and hydrate for an instant radiant glow." },
  ];
  return (
    <Section id="hair" eyebrow="Hair Studio" title="Beyond bridal. Perfected for every day.">
      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {svc.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.9 }}
          >
            <a
              href={`https://wa.me/919572194458?text=${encodeURIComponent(`Hi, I'm interested in ${s.name} service at Jawed Habib Kurji. Could you share the details and availability?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-white/[0.08] bg-surface p-8 transition-all duration-500 hover:border-gold/30 hover:shadow-[0_0_40px_rgba(212,175,55,0.1)] hover:-translate-y-1"
            >
              {/* Decorative gradient blob */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/5 blur-3xl transition-all duration-700 group-hover:bg-gold/10 group-hover:scale-150" />

              <div className="relative z-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/20 bg-gold/5 text-xl text-gold transition-all duration-500 group-hover:bg-gold/15 group-hover:border-gold/40 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  {s.icon}
                </div>
                <h3 className="mt-6 font-serif text-2xl text-ivory">{s.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>

              <div className="relative z-10 mt-8 flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase text-gold/70 transition-all duration-300 group-hover:text-gold group-hover:gap-3">
                <span>Book on WhatsApp</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </a>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* -------------------------------- BRANDS --------------------------------- */

function Brands() {
  const brands = ["MAC", "Nars", "Kryolan", "Huda Beauty", "Kay Beauty", "Dermacol", "D'Alba", "Maybelline", "Colorbar", "Forever 52", "Sugar", "Nykaa", "PAC", "Faces Canada"];
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
            <span
              key={i}
              className="font-serif text-2xl italic text-ivory/70 md:text-3xl"
            >
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
  const steps = [
    { t: "Choose Your Date", d: "Reserve your wedding date from our seasonal calendar." },
    { t: "Private Consultation", d: "A one-on-one session with your senior artist." },
    { t: "Booking Deposit", d: "A refundable ₹5,000 confirms the date exclusively for you." },
    { t: "Confirmation", d: "Trial, drape rehearsal and final look approval." },
    { t: "Your Wedding Day", d: "Undivided attention from your artist, sunrise to reception." },
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
            animate={{ width: `${(active / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          />
          <ol className="relative grid grid-cols-5 gap-4">
            {steps.map((s, i) => {
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
              onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
              className="btn-cream"
            >
              {active === steps.length - 1 ? "Restart" : "Next Step"} <span className="arrow">→</span>
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
          {steps.map((s, i) => (
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
    { q: "Do you travel to the wedding venue?", a: "Yes. Our artists travel across Patna and Bihar for weddings, with a private travel arrangement fee." },
    { q: "How far in advance should I book?", a: "Popular months — November to February — are typically reserved 4–6 months in advance. We recommend booking early to secure your date." },
    { q: "Is the booking deposit refundable?", a: "The booking amount is ₹2,000 and it is non-refundable. This amount is adjusted against your final bill." },
    { q: "Do you offer a trial?", a: "No, we do not offer a trial session. However, our experienced artists ensure your look is exactly what you envisioned through a detailed consultation before the event." },
    { q: "Which products do you use?", a: "Only premium brands — MAC, Nars, Kryolan, Huda Beauty, Kay Beauty, Dermacol, D'Alba, Colorbar, and many more." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section eyebrow="Details" title="Quiet answers to common questions.">
      <div className="mx-auto mt-14 max-w-3xl divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {faqs.map((f, i) => {
          const active = open === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(active ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="font-serif text-xl text-ivory md:text-2xl">{f.q}</span>
                <span className={`text-gold transition-transform duration-500 ${active ? "rotate-45" : ""}`}>+</span>
              </button>
              <AnimatePresence initial={false}>
                {active && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-10 text-sm leading-relaxed text-muted-foreground md:text-base">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
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
            <p className="mt-1 text-sm text-muted-foreground">Ward 22B, Circle 247B, Holding 817A/2, Patliputra Kurji Rd, above Lenskart Outlet, opposite RBI Quarter, Patna, Bihar 800010</p>
          </div>
          <div>
            <p className="eyebrow">Hours</p>
            <p className="mt-3 text-sm text-ivory">Mon–Sun · 10:00 AM – 8:30 PM</p>
            <p className="text-[11px] tracking-[0.16em] uppercase text-muted-foreground">Open all days</p>
          </div>
          <div>
            <p className="eyebrow">Contact</p>
            <a href="tel:+919572194458" className="mt-3 block text-sm text-ivory">+91 95721 94458</a>
            <a href="tel:+919709575559" className="block text-sm text-ivory">+91 97095 75559</a>
            <a href={WHATSAPP} className="mt-1 block text-sm text-gold">WhatsApp Us →</a>
          </div>
          <p className="text-[11px] tracking-[0.16em] uppercase text-muted-foreground">Private parking · Wheelchair accessible</p>
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
    <section id="reserve" className="relative overflow-hidden py-28 md:py-40">
      <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow">Book Your Bridal Look</p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-6 font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[1] text-ivory"
        >
          One bride. <em className="italic text-gold-soft">One date.</em>
          <br /> Secure yours today.
        </motion.h2>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
          A non-refundable ₹2,000 booking amount reserves the day exclusively for you. Adjusted against your final bill.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={WHATSAPP} className="btn-cream">Book Now <span className="arrow">→</span></a>
          <a href="tel:+919572194458" className="btn-ghost-gold">Call Studio</a>
          <a href="#packages" className="btn-ghost-gold">View Packages</a>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- FOOTER --------------------------------- */

function Footer() {
  return (
    <footer id="contact" className="border-t border-white/[0.06] bg-surface/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src={logoImg} alt="Jawed Habib Logo" className="h-12 w-auto object-contain" />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Patna's premier luxury salon. Specializing in flawless bridal transformations, global hair styling, and clinical hydrafacials.
            </p>
          </div>
          <div>
            <p className="eyebrow">Visit</p>
            <p className="mt-3 text-sm text-ivory leading-relaxed">
              Ward 22B, Circle 247B,<br />
              Holding 817A/2, Patliputra Kurji Rd,<br />
              above Lenskart Outlet, opposite RBI Quarter,<br />
              Patna, Bihar 800010
            </p>
          </div>
          <div>
            <p className="eyebrow">Hours</p>
            <p className="mt-3 text-sm text-ivory">Mon – Sun</p>
            <p className="text-sm text-muted-foreground">10:00 AM – 8:30 PM</p>
            <p className="mt-2 text-xs text-gold">Open All Days</p>
          </div>
          <div>
            <p className="eyebrow">Contact</p>
            <a href="tel:+919572194458" className="mt-3 block text-sm text-ivory hover:text-gold transition-colors">+91 95721 94458</a>
            <a href="tel:+919709575559" className="block text-sm text-ivory hover:text-gold transition-colors">+91 97095 75559</a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm text-gold hover:underline">WhatsApp Us →</a>
            <a href="https://www.instagram.com/jawedhabib_kurji_patna/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted-foreground hover:text-ivory mt-1">Instagram</a>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-6 text-[11px] tracking-[0.2em] uppercase text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Jawed Habib Hair & Beauty, Kurji</span>
          <span>Crafted for the brides of Bihar</span>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------- SHARED --------------------------------- */

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
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6 }} className="eyebrow"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-5 font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02] text-ivory"
        >
          {title}
        </motion.h2>
        {description && (
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
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

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";

import heroBg from "@/assets/hero-bg.jpg";
import salonInterior from "@/assets/salon-interior.jpg";
import bride1 from "@/assets/brides/bride-1.jpg";
import bride2 from "@/assets/brides/bride-2.jpg";
import bride3 from "@/assets/brides/bride-3.jpg";
import bride4 from "@/assets/brides/bride-4.jpg";
import bride5 from "@/assets/brides/bride-5.jpg";
import bride6 from "@/assets/brides/bride-6.jpg";
import bride7 from "@/assets/brides/bride-7.jpg";
import bride8 from "@/assets/brides/bride-8.jpg";

const brides = [bride1, bride2, bride3, bride4, bride5, bride6, bride7, bride8];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jawed Habib Kurji — Luxury Bridal Atelier, Patna" },
      {
        name: "description",
        content:
          "Reserve your wedding date at Patna's most refined bridal atelier. HD, airbrush and reception makeup by certified bridal specialists. Limited dates each season.",
      },
      { property: "og:title", content: "Jawed Habib Kurji — Luxury Bridal Atelier, Patna" },
      { property: "og:image", content: heroBg },
    ],
  }),
  component: Landing,
});

const WHATSAPP = "https://wa.me/919999999999?text=Hi%2C%20I%27d%20like%20to%20reserve%20my%20wedding%20date%20at%20Jawed%20Habib%20Kurji.";
const PHONE = "tel:+919999999999";

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
        <TrustBar />
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
            <span className="text-[10px] tracking-[0.4em] text-gold uppercase">JH</span>
            <span className="hidden font-serif text-lg leading-none text-ivory sm:inline">
              Jawed Habib · <span className="italic text-muted-foreground">Kurji</span>
            </span>
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
  const [dark, setDark] = useState(false);
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
        {mounted && dark ? (
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
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[720px] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroBg}
          alt="Luxury bridal detail"
          className="h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 md:pb-28"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="eyebrow"
        >
          Jawed Habib · Kurji, Patna · Est. 2006
        </motion.p>

        <WordReveal
          text="The bride you will always remember being."
          className="mt-6 max-w-4xl font-serif text-[clamp(2.6rem,7vw,6rem)] leading-[0.98] tracking-[-0.02em] text-ivory"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-8 max-w-lg text-[15px] leading-relaxed text-muted-foreground"
        >
          A private bridal atelier for the women of Bihar. Each look composed by hand, each date
          reserved for a single bride. Limited engagements this season.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.9 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a href="#availability" className="btn-cream">
            Reserve Your Date <span className="arrow">→</span>
          </a>
          <a href={WHATSAPP} className="btn-ghost-gold">
            WhatsApp Atelier
          </a>

          <div className="ml-2 flex items-center gap-3 border-l border-white/10 pl-4">
            <div className="flex text-gold">
              {"★★★★★".split("").map((s, i) => (
                <span key={i} className="text-sm">{s}</span>
              ))}
            </div>
            <div className="text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
              4.9 · 1,200+ Google reviews
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] tracking-[0.4em] text-ivory/60 uppercase"
      >
        Scroll ↓
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
  const [date, setDate] = useState("");
  const [pkg, setPkg] = useState("");
  const [checked, setChecked] = useState<null | "available" | "few">(null);

  const check = () => {
    if (!date || !pkg) return;
    // simulate scarcity messaging
    const d = new Date(date);
    setChecked(d.getDate() % 3 === 0 ? "few" : "available");
  };

  return (
    <Section id="availability" eyebrow="Wedding Date" title="Reserve before your date is taken.">
      <div className="mx-auto mt-14 max-w-3xl">
        <div className="glass-card rounded-3xl p-6 md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <Field label="Select Wedding Date">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent pt-2 pb-3 text-ivory outline-none [color-scheme:dark]"
              />
            </Field>
            <Field label="Bridal Package">
              <select
                value={pkg}
                onChange={(e) => setPkg(e.target.value)}
                className="w-full appearance-none bg-transparent pt-2 pb-3 text-ivory outline-none"
              >
                <option value="" className="bg-background">Select a package</option>
                <option className="bg-background" value="signature">Signature Bridal</option>
                <option className="bg-background" value="couture">Couture Bridal</option>
                <option className="bg-background" value="atelier">Atelier Bridal</option>
                <option className="bg-background" value="reception">Reception</option>
                <option className="bg-background" value="engagement">Engagement</option>
              </select>
            </Field>
            <button onClick={check} className="btn-cream justify-center">
              Check Availability <span className="arrow">→</span>
            </button>
          </div>

          <AnimatePresence>
            {checked && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 flex items-center gap-3 rounded-2xl border border-gold/30 bg-gold/5 px-5 py-4"
              >
                <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                <p className="text-sm text-ivory/90">
                  {checked === "few"
                    ? "Only 2 slots remain on this date. Secure with a booking deposit today."
                    : "This date is currently available. We accept one bride per date."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-6 text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
            One bride per date · Refundable ₹5,000 booking deposit
          </p>
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

/* -------------------------------- TRUST ---------------------------------- */

function TrustBar() {
  const stats = [
    { k: "4.9", l: "Google Rating" },
    { k: "18", l: "Years of Craft" },
    { k: "3,400+", l: "Brides Adorned" },
    { k: "100%", l: "Premium Products" },
  ];
  return (
    <section className="border-y border-white/[0.06] bg-surface/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-10 px-6 py-16 md:grid-cols-4 md:py-20">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: i * 0.08, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="text-center"
          >
            <div className="font-serif text-5xl text-ivory md:text-6xl">{s.k}</div>
            <div className="mt-3 text-[11px] tracking-[0.22em] uppercase text-muted-foreground">
              {s.l}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
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
  const items = brides.slice(0, 6).map((src, i) => ({
    src,
    title: ["Aanya", "Ishita", "Meher", "Rhea", "Sanvi", "Tara"][i],
    duration: ["1:04", "0:48", "1:22", "0:56", "1:11", "0:44"][i],
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
              <img src={it.src} alt={it.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
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
              <img src={items[active].src} alt="" className="h-full w-full object-cover" />
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
    { t: "Premium products only", d: "Charlotte Tilbury, MAC, Bobbi Brown, Huda, Nars — sanitised, single-use for every bride.", img: brides[1] },
    { t: "Certified bridal artists", d: "Trained under the Jawed Habib national academy with 8+ years bridal experience.", img: brides[2] },
    { t: "Long-lasting finish", d: "Airbrush and HD techniques engineered to hold through 14 hours of ceremony and reception.", img: brides[4] },
    { t: "Personalised looks", d: "A private consultation defines your complexion, jewellery and lehenga palette weeks before.", img: brides[5] },
    { t: "Bridal specialists", d: "One senior artist per bride, undivided. No walk-ins, no shared calendar.", img: brides[7] },
  ];
  const [active, setActive] = useState(0);
  return (
    <Section id="bridal" eyebrow="The Craft" title="Why brides choose the atelier.">
      <div className="mt-14 grid gap-8 md:grid-cols-[1fr_1.1fr] md:items-stretch">
        {/* Accordion list */}
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

        {/* Rotating imagery */}
        <div className="relative min-h-[420px] overflow-hidden rounded-2xl bg-surface md:min-h-full">
          <AnimatePresence mode="wait">
            <motion.img
              key={active}
              src={items[active].img}
              alt={items[active].t}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <span className="eyebrow text-ivory/80">The Craft · 0{active + 1}</span>
            <h4 className="mt-1 font-serif text-2xl text-ivory">{items[active].t}</h4>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------- PACKAGES -------------------------------- */

function Packages() {
  const pkgs = [
    {
      name: "Signature",
      img: brides[1],
      price: "₹18,000",
      onward: "onwards",
      desc: "HD bridal makeup, hairstyling, drape and pre-bridal consultation.",
    },
    {
      name: "Couture",
      img: brides[3],
      price: "₹32,000",
      onward: "onwards",
      desc: "Airbrush finish, hairstyling, drape, family touch-ups & artist on standby.",
      featured: true,
    },
    {
      name: "Atelier",
      img: brides[6],
      price: "On request",
      onward: "",
      desc: "Full-day private artist, wedding + reception + rituals across two days.",
    },
  ];
  return (
    <Section eyebrow="Bridal Packages" title="Three ways to be adorned.">
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {pkgs.map((p, i) => (
          <motion.article
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.08, duration: 0.9 }}
            className={`group relative overflow-hidden rounded-2xl border ${
              p.featured ? "border-gold/50" : "border-white/[0.08]"
            } bg-surface`}
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
            </div>
            <div className="p-6">
              {p.featured && (
                <span className="eyebrow mb-2 inline-block">Most Reserved</span>
              )}
              <h3 className="font-serif text-3xl text-ivory">{p.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
              <div className="mt-6 flex items-end justify-between border-t border-white/[0.06] pt-5">
                <div>
                  <div className="font-serif text-2xl text-ivory">{p.price}</div>
                  {p.onward && <div className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground">{p.onward}</div>}
                </div>
                <a href="#reserve" className="text-[12px] tracking-[0.18em] uppercase text-gold group-hover:underline underline-offset-4">
                  Reserve →
                </a>
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
        <img src={brides[2]} alt="Before" className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <img
            src={brides[4]}
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
    { n: "Ananya S.", w: "March 2025", q: "I have never felt more like myself on any other day. Every detail of my look — the base, the eyes, the drape — was exactly the bride I had imagined for years." , img: brides[0]},
    { n: "Priya M.", w: "December 2024", q: "The team held space for me on the most emotional day of my life. My makeup lasted from morning haldi till 2am reception without a single touch-up.", img: brides[3] },
    { n: "Rhea K.", w: "November 2024", q: "This is the only place in Patna that feels like a real bridal atelier. The consultation, the products, the calmness — worth every rupee.", img: brides[5] },
    { n: "Sanvi R.", w: "October 2024", q: "Every artist knew exactly where to be and when. It felt choreographed, quiet, and completely about me.", img: brides[6] },
  ];
  return (
    <Section id="reviews" eyebrow="In Their Words" title="Trusted by the brides of Bihar.">
      <div className="mt-14 -mx-6 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-5 px-6 snap-x snap-mandatory">
          {t.map((it, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.08, duration: 0.9 }}
              className="glass-card group flex w-[86vw] shrink-0 snap-center overflow-hidden rounded-2xl md:w-[560px]"
            >
              <div className="relative w-40 shrink-0 overflow-hidden md:w-56">
                <img src={it.img} alt="" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/40" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between p-7">
                <div>
                  <div className="flex text-gold">
                    {"★★★★★".split("").map((s, j) => <span key={j} className="text-xs">{s}</span>)}
                  </div>
                  <blockquote className="mt-5 font-serif text-lg leading-snug text-ivory md:text-xl">
                    “{it.q}”
                  </blockquote>
                </div>
                <figcaption className="mt-6 border-t border-white/[0.06] pt-4">
                  <div className="text-sm text-ivory">{it.n}</div>
                  <div className="text-[10px] tracking-[0.24em] uppercase text-muted-foreground">Bride · {it.w}</div>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
      <p className="mt-6 text-center text-[11px] tracking-[0.24em] uppercase text-muted-foreground">
        Verified on Google · 1,200+ reviews · Swipe →
      </p>
    </Section>
  );
}

/* --------------------------- SALON EXPERIENCE ---------------------------- */

function SalonExperience() {
  const rooms = [
    { t: "Reception", d: "Champagne-lit reception with private consultation." },
    { t: "Bridal Suite", d: "A private room for you, your mother and your closest." },
    { t: "Hair Studio", d: "Dedicated stations with international styling tools." },
    { t: "Lounge", d: "A quiet corner for your family, tea served throughout." },
  ];
  return (
    <Section id="location" eyebrow="The Atelier" title="A private house of beauty, in the heart of Patna.">
      <div className="mt-14 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, scale: 1.02 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-auto"
        >
          <img src={salonInterior} alt="Salon interior" loading="lazy" className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <span className="eyebrow text-ivory/80">Kurji · Patna</span>
            <div className="mt-1 font-serif text-2xl text-ivory">1,800 sq ft of atelier</div>
          </div>
        </motion.div>

        <div className="-mx-6 lg:mx-0">
          <div className="flex gap-4 overflow-x-auto px-6 pb-4 lg:h-full lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {rooms.map((c, i) => (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.8 }}
                className="glass-card min-w-[240px] shrink-0 rounded-2xl p-6 lg:min-w-0 lg:flex-1"
              >
                <span className="eyebrow">0{i + 1}</span>
                <h3 className="mt-3 font-serif text-xl text-ivory">{c.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------- HAIR SERVICES ------------------------------ */

function HairServices() {
  const svc = ["Keratin Treatment", "Hair Botox", "Hair Smoothening", "Hair Spa", "Hair Colour", "Bridal Hair"];
  return (
    <Section id="hair" eyebrow="Hair Studio" title="Salon services, quietly perfected." description="Complementary to bridal, held to the same standard.">
      <ul className="mt-12 divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {svc.map((s, i) => (
          <motion.li
            key={s}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.7 }}
            className="group flex items-baseline justify-between py-6 transition-colors hover:text-ivory"
          >
            <span className="font-serif text-2xl text-ivory md:text-3xl">{s}</span>
            <span className="text-[11px] tracking-[0.24em] uppercase text-muted-foreground group-hover:text-gold">
              Enquire →
            </span>
          </motion.li>
        ))}
      </ul>
    </Section>
  );
}

/* -------------------------------- BRANDS --------------------------------- */

function Brands() {
  const brands = ["Charlotte Tilbury", "MAC", "Bobbi Brown", "Huda Beauty", "Nars", "Kérastase", "Olaplex", "Dyson", "Estée Lauder", "Chanel Beauty"];
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
    { q: "How far in advance should I book?", a: "Popular months — November to February — are typically reserved 4–6 months in advance." },
    { q: "Is the booking deposit refundable?", a: "The ₹5,000 deposit is fully refundable within 7 days, and adjusted against your final bill after." },
    { q: "Do you offer a trial?", a: "Yes. A trial is included in our Couture and Atelier packages and available at cost with Signature." },
    { q: "Which products do you use?", a: "Only premium international brands — Charlotte Tilbury, MAC, Nars, Bobbi Brown, Huda Beauty and more." },
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
    <Section eyebrow="Visit" title="Find the atelier.">
      <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_2fr]">
        <div className="glass-card space-y-6 rounded-2xl p-8">
          <div>
            <p className="eyebrow">Address</p>
            <p className="mt-3 font-serif text-2xl text-ivory">Jawed Habib Hair & Beauty</p>
            <p className="mt-1 text-sm text-muted-foreground">Kurji More, Patna, Bihar 800010</p>
          </div>
          <div>
            <p className="eyebrow">Hours</p>
            <p className="mt-3 text-sm text-ivory">Mon–Sun · 10:00 – 20:00</p>
            <p className="text-[11px] tracking-[0.16em] uppercase text-muted-foreground">By appointment</p>
          </div>
          <div>
            <p className="eyebrow">Contact</p>
            <a href={PHONE} className="mt-3 block text-sm text-ivory">+91 99999 99999</a>
            <a href={WHATSAPP} className="block text-sm text-gold">WhatsApp Atelier →</a>
          </div>
          <p className="text-[11px] tracking-[0.16em] uppercase text-muted-foreground">Private parking · Wheelchair accessible</p>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-white/[0.06] grayscale contrast-[1.05]">
          <iframe
            title="Map"
            src="https://www.google.com/maps?q=Kurji+More+Patna&output=embed"
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg)" }}
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
        <p className="eyebrow">Reserve Your Wedding Date</p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-6 font-serif text-[clamp(2.4rem,6vw,5rem)] leading-[1] text-ivory"
        >
          One bride. <em className="italic text-gold-soft">One date.</em>
          <br /> Secure yours today.
        </motion.h2>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
          A refundable ₹5,000 booking deposit reserves the day exclusively for you. Applied against your final bill.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href="#availability" className="btn-cream">Pay Booking Deposit <span className="arrow">→</span></a>
          <a href={WHATSAPP} className="btn-ghost-gold">WhatsApp</a>
          <a href={PHONE} className="btn-ghost-gold">Call Atelier</a>
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
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="text-[10px] tracking-[0.4em] text-gold uppercase">JH</div>
            <p className="mt-3 font-serif text-3xl text-ivory">Jawed Habib · Kurji</p>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A luxury bridal atelier in Patna. Composed looks, sanitised products, and undivided attention on your day.
            </p>
          </div>
          <div>
            <p className="eyebrow">Visit</p>
            <p className="mt-3 text-sm text-ivory">Kurji More, Patna</p>
            <p className="text-sm text-muted-foreground">Bihar 800010</p>
          </div>
          <div>
            <p className="eyebrow">Contact</p>
            <a href={PHONE} className="mt-3 block text-sm text-ivory">+91 99999 99999</a>
            <a href={WHATSAPP} className="block text-sm text-muted-foreground hover:text-ivory">WhatsApp</a>
            <a href="https://instagram.com" className="block text-sm text-muted-foreground hover:text-ivory">Instagram</a>
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
  title: string;
  description?: string;
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

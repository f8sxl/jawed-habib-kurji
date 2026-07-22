const fs = require("fs");
let content = fs.readFileSync("src/routes/index.tsx", "utf-8");

// Hero Word Reveal
content = content.replace(
  'text="The bride you will always remember being."',
  'text="Be the bride everyone can\'t stop looking at."',
);

// Package desc
content = content.replace(
  'className="text-[13px] leading-relaxed text-ivory/80 font-light tracking-wide"',
  'className="text-[13px] leading-relaxed text-[#f5f5f0]/90 font-medium tracking-wide"',
);

// Value
content = content.replace(
  'className="text-[11px] text-ivory/40 mb-1 tracking-widest font-light"',
  'className="text-[11px] text-[#f5f5f0]/40 mb-1 tracking-widest font-light"',
);

// Price
content = content.replace(
  'className="font-serif text-[32px] leading-none text-gold"',
  'className="font-serif text-[32px] leading-none text-[#D4AF37]"',
);

// Onward
content = content.replace(
  'className="text-[10px] tracking-[0.24em] uppercase text-ivory/50 mt-1.5"',
  'className="text-[10px] tracking-[0.24em] uppercase text-[#f5f5f0]/50 mt-1.5"',
);

// Total Package Price
content = content.replace(
  'className="flex justify-between items-center text-xs text-ivory/80 font-medium"',
  'className="flex justify-between items-center text-xs text-[#f5f5f0]/70 font-medium"',
);
content = content.replace(
  '<span>₹{parseInt(p.price.replace(/\\D/g, "")).toLocaleString("en-IN")}</span>',
  '<span className="text-[#f5f5f0] font-bold">₹{parseInt(p.price.replace(/\\D/g, "")).toLocaleString("en-IN")}</span>',
);

// Booking Deposit
content = content.replace(
  'className="flex justify-between items-center text-[11px] font-medium text-ivory/80"',
  'className="flex justify-between items-center text-[11px] font-medium text-[#f5f5f0]/70"',
);

// Dashed line
content = content.replace(
  'className="h-px w-full border-t border-dashed border-white/15 my-1"',
  'className="h-px w-full border-t border-dashed border-white/15 my-2"',
);

// Due at venue
content = content.replace(
  'className="flex justify-between items-center text-sm font-bold text-ivory tracking-wide"',
  'className="flex justify-between items-center text-base font-bold text-[#f5f5f0] tracking-wide"',
);

// WhatsApp Inquire
content = content.replace(
  'className="text-[11px] font-bold tracking-[0.1em] uppercase text-ivory"',
  'className="text-[11px] font-bold tracking-[0.1em] uppercase text-[#f5f5f0]"',
);

// Gradient overlay
content = content.replace(
  'className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80"',
  'className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent opacity-90"',
);

fs.writeFileSync("src/routes/index.tsx", content, "utf-8");
console.log("Applied script replacements");

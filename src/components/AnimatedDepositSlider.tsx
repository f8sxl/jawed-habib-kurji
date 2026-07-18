import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function AnimatedDepositSlider({
  bookingDeposit,
  setBookingDeposit,
}: {
  bookingDeposit: number;
  setBookingDeposit: (val: number) => void;
}) {
  const min = 1500;
  const max = 2500;
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // Calculate percentage for filling the track
  const percentage = bookingDeposit === 0 ? 0 : ((bookingDeposit - min) / (max - min)) * 100;

  return (
    <div className="w-full relative rounded-2xl bg-black/20 border border-white/5 p-6 mt-4 shadow-inner">
      
      {/* Top Section */}
      <div className="flex flex-col items-center mb-6">
        <p className="text-sm text-white/50 text-center px-4">
          Slide to choose your initial deposit amount to secure your date.
        </p>
      </div>

      {/* Main Amount Display */}
      <div className="flex flex-col justify-center items-center gap-1 mb-8">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">
          Booking Amount
        </span>
        <motion.div 
          key={bookingDeposit}
          initial={{ scale: 1.15, color: "#fff", textShadow: "0px 0px 20px rgba(255,255,255,0.8)" }}
          animate={{ scale: 1, color: bookingDeposit === 0 ? "#ffffff60" : "#D4AF37", textShadow: "0px 0px 0px rgba(212,175,55,0)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="font-serif text-5xl font-medium tracking-tight inline-block"
        >
          {bookingDeposit === 0 ? "₹ ---" : `₹${bookingDeposit.toLocaleString()}`}
        </motion.div>
      </div>

      {/* The Slider UI */}
      <div className="relative w-full h-12 flex items-center mb-4">
        {/* Track Background */}
        <div className="absolute left-0 right-0 h-2 bg-white/10 rounded-full overflow-hidden">
          {/* Active Track Fill */}
          <motion.div 
            className="h-full bg-gradient-to-r from-yellow-600 to-gold"
            animate={{ width: `${percentage}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* The Native Range Input (Invisible, overlaid for interaction) */}
        <input 
          type="range" 
          min={min} 
          max={max} 
          step="100" 
          value={bookingDeposit} 
          onChange={(e) => {
            setHasInteracted(true);
            setBookingDeposit(parseInt(e.target.value));
          }}
          className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
        />

        {/* Custom Thumb (Animated to follow the native input) */}
        <motion.div 
          className="absolute w-7 h-7 rounded-full bg-gold shadow-[0_0_15px_rgba(212,175,55,0.6)] border-2 border-white flex items-center justify-center pointer-events-none z-10"
          animate={{ 
            left: `calc(${percentage}% - 14px)`,
            x: hasInteracted ? 0 : [0, 6, -6, 4, -4, 0]
          }}
          transition={{ 
            left: { type: "spring", stiffness: 300, damping: 30 },
            x: hasInteracted ? { duration: 0 } : { duration: 1.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }
          }}
        >
          <div className="w-2 h-2 rounded-full bg-black/80" />
        </motion.div>
      </div>

      {/* Min/Max Labels */}
      <div className="flex justify-between text-xs font-medium text-white/40 px-1 mb-8">
        <span>₹1,500</span>
        <span>₹2,500</span>
      </div>

      {/* Scarcity Offer */}
      <div className="mt-7 flex flex-col items-center justify-center w-full gap-3">
        <div className="flex items-center gap-3 w-full max-w-[220px]">
          <div className="h-[1px] bg-gradient-to-r from-transparent to-red-500/50 flex-1" />
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-red-400 animate-pulse drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]">
            LIMITED TIME OFFER
          </span>
          <div className="h-[1px] bg-gradient-to-l from-transparent to-red-500/50 flex-1" />
        </div>
        
        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md rounded-full px-5 py-2.5 shadow-xl border border-white/30 ring-1 ring-black/5 text-[11px] font-bold text-gray-800 tracking-wide">
          <span>Save</span>
          <span className="text-black font-extrabold text-[12px]">₹199</span>
          <span className="text-gray-800 font-bold">more</span>
          <span className="text-gray-500 font-medium">via</span>
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" 
            alt="Razorpay" 
            className="h-[12px] opacity-90 object-contain translate-y-[0.5px]" 
          />
        </div>
      </div>
    </div>
  );
}

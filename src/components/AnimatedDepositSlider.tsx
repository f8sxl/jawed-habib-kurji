import { motion } from "framer-motion";

export function AnimatedDepositSlider({
  bookingDeposit,
  setBookingDeposit,
}: {
  bookingDeposit: number;
  setBookingDeposit: (val: number) => void;
}) {
  return (
    <div className="w-full relative mt-16 pt-16 border-t border-white/10">
      
      {/* Top Section with Design Element */}
      <div className="flex flex-col items-center justify-center text-center mb-10">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold/60" />
          <h4 className="font-serif text-3xl md:text-4xl text-ivory tracking-wide">Select Deposit</h4>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold/60" />
        </div>
        <p className="text-sm md:text-base text-white/50 max-w-xs md:max-w-none">
          Available options to secure your date
        </p>
      </div>

      {/* Combined Unified Deposit Card */}
      <div className="relative max-w-md mx-auto flex flex-col px-6 py-8 md:px-8 md:py-10 rounded-[28px] border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] shadow-2xl overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] opacity-50 pointer-events-none" />

        {/* Amount Display */}
        <div className="flex flex-col items-center justify-center z-10 w-full mb-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 font-bold text-center">
            Initial Deposit
          </span>
          <motion.div 
            key={bookingDeposit}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="font-serif text-5xl md:text-6xl text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] text-center"
          >
            ₹{bookingDeposit.toLocaleString()}
          </motion.div>
        </div>

        {/* Horizontal Slider Wrapper */}
        <div className="relative w-full max-w-[200px] md:max-w-[280px] mx-auto shrink-0 z-10 flex items-center justify-center mt-2 mb-10">
          {/* Left Label */}
          <span className="absolute -left-12 md:-left-16 top-1/2 -translate-y-1/2 text-[10px] text-white/40 font-bold tracking-widest">₹1,500</span>
          
          <input
            type="range"
            min="1500"
            max="2500"
            step="100"
            value={bookingDeposit}
            onChange={(e) => setBookingDeposit(parseInt(e.target.value))}
            className="w-full h-3 bg-black/80 rounded-full appearance-none outline-none border border-white/10 shadow-[inset_0_0_10px_rgba(0,0,0,1)] cursor-pointer"
            style={{ 
              background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${((bookingDeposit - 1500) / 1000) * 100}%, rgba(255,255,255,0.05) ${((bookingDeposit - 1500) / 1000) * 100}%, rgba(255,255,255,0.05) 100%)`
            }}
          />
          
          {/* Right Label */}
          <span className="absolute -right-12 md:-right-16 top-1/2 -translate-y-1/2 text-[10px] text-white/40 font-bold tracking-widest">₹2,500</span>

          <style dangerouslySetInnerHTML={{__html: `
            input[type=range]::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: 28px;
              width: 28px;
              border-radius: 50%;
              background: linear-gradient(135deg, #F3E5AB 0%, #D4AF37 50%, #B8860B 100%);
              border: 2px solid #ffffff;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
              cursor: grab;
              transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            input[type=range]::-webkit-slider-thumb:hover {
              box-shadow: 0 6px 16px rgba(212, 175, 55, 0.6);
              transform: scale(1.1);
            }
            input[type=range]:active::-webkit-slider-thumb {
              cursor: grabbing;
              transform: scale(0.95);
              box-shadow: 0 2px 8px rgba(212, 175, 55, 0.8);
            }
          `}} />
        </div>

        {/* Divider inside the combined card */}
        <div className="h-px w-full bg-white/10 mb-6 relative z-10" />

        {/* Lower Section (formerly Summary Box) */}
        <div className="relative z-10 flex flex-col w-full">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
              <span className="text-white font-bold text-sm tracking-wider animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] whitespace-nowrap">
                Limited Offer
              </span>
            </div>
            <span className="text-[#D4AF37] text-xs font-bold tracking-wide">Selected: ₹{bookingDeposit.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center w-full mt-2">
            {/* Animated Clickable Razorpay Pill Button */}
            <button 
              type="button"
              onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="relative flex items-center justify-between gap-3 rounded-full px-4 py-2.5 w-full shadow-[0_0_15px_rgba(59,130,246,0.2)] overflow-hidden border border-blue-300/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:-translate-y-0.5 transition-all cursor-pointer group"
              style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #bae6fd 100%)' }}
            >
              <style dangerouslySetInnerHTML={{__html: `
                @keyframes shimmerSweep {
                  0% { background-position: 200% 0; }
                  100% { background-position: -200% 0; }
                }
                .animate-shimmer {
                  animation: shimmerSweep 3s infinite linear;
                }
              `}} />
              <div 
                className="absolute inset-0 pointer-events-none animate-shimmer" 
                style={{ 
                  background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 55%, transparent 70%)', 
                  backgroundSize: '200% 100%' 
                }} 
              />
              
              <div className="relative z-10 flex items-center gap-1.5">
                <span className="text-[#0c2e60] text-[9px] md:text-[10px] font-extrabold tracking-[0.15em] uppercase whitespace-nowrap">
                  Save ₹199 via
                </span>
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" 
                  alt="Razorpay" 
                  className="h-[9px] md:h-[10px] object-contain translate-y-[0.5px]" 
                />
              </div>

              <div className="relative z-10 flex items-center gap-1 text-[#0c2e60]">
                <span className="text-[10px] font-extrabold tracking-widest uppercase">Select Package</span>
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

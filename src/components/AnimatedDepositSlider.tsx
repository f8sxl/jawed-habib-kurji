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

      {/* Cool Vertical Slider Container */}
      <div className="relative flex items-center justify-between px-8 py-10 rounded-[28px] border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] shadow-2xl mb-8 overflow-hidden min-h-[280px]">
        
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1)_0%,transparent_70%)] opacity-50 pointer-events-none" />

        {/* Vertical Slider Wrapper (Absolute positioning prevents layout breakage from rotation) */}
        <div className="relative h-[200px] w-[50px] shrink-0 z-10 flex flex-col items-center">
          {/* Top Label */}
          <span className="absolute -top-6 text-[10px] text-white/40 font-bold tracking-widest">₹2,500</span>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90">
            <input
              type="range"
              min="1500"
              max="2500"
              step="100"
              value={bookingDeposit}
              onChange={(e) => setBookingDeposit(parseInt(e.target.value))}
              className="w-[200px] h-3 bg-black/80 rounded-full appearance-none outline-none border border-white/10 shadow-[inset_0_0_10px_rgba(0,0,0,1)] cursor-pointer"
              style={{ 
                background: `linear-gradient(to right, #D4AF37 0%, #D4AF37 ${((bookingDeposit - 1500) / 1000) * 100}%, rgba(255,255,255,0.05) ${((bookingDeposit - 1500) / 1000) * 100}%, rgba(255,255,255,0.05) 100%)`
              }}
            />
          </div>
          
          {/* Bottom Label */}
          <span className="absolute -bottom-6 text-[10px] text-white/40 font-bold tracking-widest">₹1,500</span>

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

        {/* Amount Display on the Right */}
        <div className="flex flex-col items-end justify-center z-10 w-full pl-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-2 font-bold text-right">
            Initial Deposit
          </span>
          <motion.div 
            key={bookingDeposit}
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="font-serif text-5xl md:text-6xl text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] text-right"
          >
            ₹{bookingDeposit.toLocaleString()}
          </motion.div>
          
          <div className="flex items-center gap-2 mt-4 text-xs font-medium text-white/30">
            <span>Slide to adjust</span>
            <svg className="w-3 h-3 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Summary Box */}
      <div className="max-w-md mx-auto rounded-[24px] border border-white/10 bg-[#161616] p-5 md:p-6 shadow-2xl">
        {/* Row 1: Selected & Amount */}
        <div className="flex justify-between items-center mb-5">
          <span className="text-white/50 text-xs md:text-sm font-medium">Selected</span>
          <span className="text-[#D4AF37] text-sm md:text-base font-bold tracking-wide">Booking Amount: ₹{bookingDeposit.toLocaleString()}</span>
        </div>
        
        {/* Divider */}
        <div className="h-px w-full bg-white/5 mb-5" />
        
        {/* Row 2 & 3: Offer Text, Pill, and Button */}
        <div className="flex flex-col gap-3">
          {/* Blinking "Limited Offer" replacing "Special Offer" */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
            <span className="text-white font-bold text-sm tracking-wider animate-pulse drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] whitespace-nowrap">
              Limited Offer
            </span>
          </div>
          
          <div className="flex items-center w-full flex-wrap gap-4 mt-1">
            {/* Animated Light Blue Pill with Razorpay */}
            <div 
              className="relative flex items-center gap-1.5 rounded-full px-3 md:px-3.5 py-1.5 w-fit shadow-[0_0_15px_rgba(59,130,246,0.15)] shrink-0 overflow-hidden border border-blue-300/50"
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
              
              <span className="relative z-10 text-[#0c2e60] text-[8px] md:text-[9px] font-extrabold tracking-widest uppercase whitespace-nowrap">
                Save ₹199 more via
              </span>
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" 
                alt="Razorpay" 
                className="relative z-10 h-[8px] md:h-[9px] object-contain translate-y-[0.5px]" 
              />
            </div>
            
            {/* White "BOOK" Button */}
            <button 
              type="button" 
              className="ml-auto px-5 py-1.5 bg-white text-black text-xs font-extrabold rounded-full hover:bg-gray-200 transition-colors shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.3)] tracking-wide"
            >
              BOOK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { MessageCircle, X, ChevronRight, CheckCircle2, Phone, MessageSquare, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/logo/jh_logo_new.png";

const PREFILLED_QUESTIONS = [
  {
    q: "What's the price for Bridal Makeup?",
    a: "Our premium packages start from ₹15,000. Would you like our specialist to send you the full menu?",
  },
  {
    q: "Do you offer a pre-wedding trial?",
    a: "We don't offer trials, but we guarantee a flawless look through our detailed consultation!",
  },
  {
    q: "Are you available on my wedding date?",
    a: "Dates are filling up fast! We can instantly check availability for you.",
  },
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"menu" | "answer" | "consultMethod" | "phone" | "success">("menu");
  const [selectedQ, setSelectedQ] = useState<{ q: string; a: string } | null>(null);
  const [preference, setPreference] = useState<"call" | "whatsapp" | null>(null);
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuestionClick = (item: { q: string; a: string }) => {
    setSelectedQ(item);
    setStep("answer");
    // Auto proceed to consult method step after reading answer
    setTimeout(() => {
      setStep("consultMethod");
    }, 1500);
  };

  const handlePreferenceClick = (pref: "call" | "whatsapp") => {
    setPreference(pref);
    setStep("phone");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;
    
    setIsSubmitting(true);
    try {
      await fetch("/api/chat-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          phone, 
          question: selectedQ?.q || "General Inquiry",
          preference 
        }),
      });
      setStep("success");
    } catch (err) {
      console.error(err);
      // Fail gracefully
      setStep("success"); 
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("chatWidgetClosed", "true");
    setTimeout(() => {
      setStep("menu");
      setSelectedQ(null);
      setPreference(null);
      setPhone("");
    }, 300);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-6 relative w-[320px] sm:w-[360px]"
          >
            {/* White Bubble with Green Drop Shadow matching image */}
            <div className="relative z-10 overflow-hidden rounded-3xl bg-white shadow-[6px_6px_0px_#25D366] border border-gray-100">
              
              {/* Header */}
              <div className="bg-white p-5 pb-3 flex flex-col relative">
                <button 
                  onClick={handleClose} 
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-14 w-14 overflow-hidden rounded-full border border-gray-200 bg-white p-1">
                    <img src={logoImg} alt="JH" className="h-full w-full object-contain filter invert" />
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 text-xl tracking-tight">Chat with Us</h3>
              </div>

              {/* Body */}
              <div className="px-5 pb-4 h-[340px] bg-white overflow-y-auto flex flex-col gap-4 relative scrollbar-hide">
                
                {/* Menu Step */}
                {step === "menu" && (
                  <div className="flex flex-col gap-3">
                    <div className="bg-gray-50 p-3 rounded-2xl rounded-tl-sm text-sm text-gray-800 self-start max-w-[90%]">
                      Hi there! 👋 How can we help you today?
                    </div>
                    <div className="flex flex-col gap-2 mt-1">
                      {PREFILLED_QUESTIONS.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuestionClick(item)}
                          className="bg-[#1a1a1a] text-white p-3.5 px-4 rounded-xl text-[13px] font-medium flex items-center justify-between shadow-sm hover:bg-black transition-colors text-left group"
                        >
                          <span className="pr-2">{item.q}</span>
                          <ChevronRight className="h-4 w-4 shrink-0 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Answer Step */}
                {["answer", "consultMethod", "phone", "success"].includes(step) && selectedQ && (
                  <>
                    <div className="bg-[#25D366] text-white p-3 px-4 rounded-2xl rounded-tr-sm text-sm self-end max-w-[85%] shadow-sm">
                      {selectedQ.q}
                    </div>
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 p-3 px-4 rounded-2xl rounded-tl-sm text-sm text-gray-800 self-start max-w-[90%]"
                    >
                      {selectedQ.a}
                    </motion.div>
                  </>
                )}

                {/* Consult Method Step */}
                {["consultMethod", "phone"].includes(step) && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-2 mt-1 w-full"
                  >
                    <div className="bg-gray-50 p-3 rounded-2xl rounded-tl-sm text-sm text-gray-800 self-start max-w-[95%]">
                      Would you like our bridal specialist to consult via call, or chat on WhatsApp?
                    </div>
                    {step === "consultMethod" && (
                      <div className="flex gap-2 w-full mt-2">
                        <button 
                          onClick={() => handlePreferenceClick("call")}
                          className="flex-1 bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
                        >
                          <Phone className="h-4 w-4" /> Call Me
                        </button>
                        <button 
                          onClick={() => handlePreferenceClick("whatsapp")}
                          className="flex-1 bg-[#25D366] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#20b858] transition flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="h-4 w-4" /> WhatsApp
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Phone Step */}
                {step === "phone" && preference && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full mt-2"
                  >
                    <div className="bg-[#25D366] text-white p-3 px-4 rounded-2xl rounded-tr-sm text-sm self-end ml-auto max-w-[60%] shadow-sm mb-3">
                      {preference === "call" ? "Call Me" : "WhatsApp Chat"}
                    </div>
                    <div className="bg-gray-50 p-3 rounded-2xl rounded-tl-sm text-sm text-gray-800 self-start w-[95%] mb-2">
                      Please enter your mobile number:
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                      <input
                        type="tel"
                        required
                        placeholder="+91 Mobile number"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#25D366] focus:outline-none"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting || phone.length < 10}
                        className="w-full mt-1 flex items-center justify-center rounded-xl bg-black py-3 text-sm font-bold text-white transition-colors hover:bg-gray-800 disabled:opacity-50"
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </button>
                    </form>
                  </motion.div>
                )}

                {/* Success Step */}
                {step === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center px-4 mt-6"
                  >
                    <div className="h-14 w-14 rounded-full bg-green-50 flex items-center justify-center mb-4 border border-green-100">
                      <CheckCircle2 className="h-7 w-7 text-[#25D366]" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">Request Received!</h4>
                    <p className="text-sm text-gray-500">
                      Thank you. Our bridal specialist has been notified and will {preference === "call" ? "call you" : "message you on WhatsApp"} shortly.
                    </p>
                  </motion.div>
                )}

              </div>
              
              {/* Footer */}
              <div className="bg-white pb-3 pt-1 text-center flex justify-center">
                <span className="text-[11px] text-gray-400 font-medium tracking-wide flex items-center gap-1.5">
                  ⚡ Fast, Secure & Confidential
                </span>
              </div>
            </div>

            {/* Chat Tail Pointer (matching the image) */}
            <div className="absolute -bottom-4 right-8 text-white z-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 0L0 0L24 24V0Z" />
              </svg>
            </div>
            {/* Shadow for the tail */}
            <div className="absolute -bottom-[18px] right-[28px] text-[#25D366] -z-10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 0L0 0L24 24V0Z" />
              </svg>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          if (isOpen) {
            handleClose();
          } else {
            setIsOpen(true);
            sessionStorage.setItem("chatWidgetOpened", "true");
          }
        }}
        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(37,211,102,0.4)] transition-transform hover:scale-110 relative z-[101]"
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="down"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-5 w-5 sm:h-7 sm:w-7 fill-current" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

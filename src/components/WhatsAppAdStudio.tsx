import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Lock,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Camera,
  Send,
  Mic,
  CheckCheck,
  Sparkles,
  ArrowRight
} from "lucide-react";

import jhLogo from "@/assets/logo/jh_logo_new.png";
import bride1 from "@/assets/brides/490984407_17854365960422958_3459801366638073109_n.jpg";
import bride2 from "@/assets/brides/590426438_17920179768422958_4066469502862273966_n.jpg";
import bride3 from "@/assets/brides/735238250_17952828780422958_1020824856657580111_n.jpg";

const WHATSAPP_URL =
  "https://wa.me/919572194458?text=Hi%2C%20I%27d%20like%20to%20reserve%20my%20wedding%20date%20at%20Jawed%20Habib%20Kurji.";

export interface DisplayMessage {
  id: string;
  type: "incoming" | "outgoing";
  text?: string;
  image?: string;
  timestamp: string;
  status?: "sending" | "sent" | "delivered" | "read";
}

// Initial state so photos are IMMEDIATELY visible when user scrolls to section
const INITIAL_MESSAGES: DisplayMessage[] = [
  {
    id: "init-1",
    type: "outgoing",
    text: "Hi! 😊 I'm getting married in November. Are your bridal slots open?",
    timestamp: "9:40 AM",
    status: "read"
  },
  {
    id: "init-2",
    type: "incoming",
    text: "Hello! Warmest congratulations on your upcoming wedding! 🎉 Yes, November slots are open for booking.",
    timestamp: "9:41 AM"
  },
  {
    id: "init-3",
    type: "outgoing",
    image: bride3,
    text: "Here is my bridal outfit inspiration! 👗 Can your team customize the makeup look for this shade?",
    timestamp: "9:41 AM",
    status: "read"
  }
];

const FOLLOWUP_CHAT_STEPS = [
  {
    type: "incoming" as const,
    image: bride1,
    text: "That lehenga is gorgeous! 😍 Yes! Here is how we styled a bride with a similar crimson look last week ✨",
    delay: 1400
  },
  {
    type: "outgoing" as const,
    text: "Omg so pretty!! But I have sensitive skin, do you use long-lasting HD products that won't cause breakouts?",
    delay: 1200
  },
  {
    type: "incoming" as const,
    text: "Don't worry at all! We exclusively use dermatologically-tested HD & Airbrush brands (MAC, Huda Beauty, NARS) tailored to your skin type! 💖",
    delay: 1500
  },
  {
    type: "outgoing" as const,
    text: "That's a huge relief! Also, can my mother and sister get party makeup done with me at the salon?",
    delay: 1100
  },
  {
    type: "incoming" as const,
    text: "Yes absolutely! We offer Family & Bridesmaid add-on packages so your whole bridal party gets ready together seamlessly 👑",
    delay: 1500
  },
  {
    type: "outgoing" as const,
    text: "Awesome! And if I reserve with ₹2,000 deposit today, can I adjust the date if my wedding schedule shifts?",
    delay: 1100
  },
  {
    type: "incoming" as const,
    text: "Yes! Your deposit date is 100% flexible and can be rescheduled up to 14 days before your event! 📅",
    delay: 1300
  },
  {
    type: "outgoing" as const,
    text: "Perfect! Placing my deposit on the site right now. Thank you so much! 🙏",
    delay: 1000
  }
];

export function WhatsAppAdStudio() {
  const [displayMessages, setDisplayMessages] = useState<DisplayMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState<string>("");
  const [isIncomingTyping, setIsIncomingTyping] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const stepTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [displayMessages, isIncomingTyping, inputText, scrollToBottom]);

  const getCurrentTimestamp = () => {
    const d = new Date();
    let hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  const runStep = useCallback(
    (stepIdx: number) => {
      if (stepIdx >= FOLLOWUP_CHAT_STEPS.length) {
        // When conversation ends, pause for 3.5s then restart automatically for infinite loop
        stepTimerRef.current = setTimeout(() => {
          setDisplayMessages(INITIAL_MESSAGES);
          setInputText("");
          setIsIncomingTyping(false);
          setCurrentStepIndex(0);
        }, 3500);
        return;
      }

      const step = FOLLOWUP_CHAT_STEPS[stepIdx];

      if (step.type === "outgoing") {
        const textToType = step.text || "";
        const chars = textToType.split("");
        let charIdx = 0;
        setInputText("");

        const typeInterval = setInterval(() => {
          charIdx++;
          setInputText(textToType.slice(0, charIdx));

          if (charIdx >= chars.length) {
            clearInterval(typeInterval);

            stepTimerRef.current = setTimeout(() => {
              const msgId = `msg-followup-${stepIdx}-${Date.now()}`;
              const newMsg: DisplayMessage = {
                id: msgId,
                type: "outgoing",
                text: step.text,
                image: step.image,
                timestamp: getCurrentTimestamp(),
                status: "read"
              };

              setInputText("");
              setDisplayMessages((prev) => [...prev, newMsg]);

              stepTimerRef.current = setTimeout(() => {
                setCurrentStepIndex(stepIdx + 1);
              }, step.delay);
            }, 250);
          }
        }, 22);
      } else {
        setIsIncomingTyping(true);

        stepTimerRef.current = setTimeout(() => {
          setIsIncomingTyping(false);

          const newMsg: DisplayMessage = {
            id: `msg-followup-${stepIdx}-${Date.now()}`,
            type: "incoming",
            text: step.text,
            image: step.image,
            timestamp: getCurrentTimestamp()
          };

          setDisplayMessages((prev) => [...prev, newMsg]);

          stepTimerRef.current = setTimeout(() => {
            setCurrentStepIndex(stepIdx + 1);
          }, 700);
        }, step.delay);
      }
    },
    []
  );

  useEffect(() => {
    // Start follow-up step sequence after 1 second
    const timer = setTimeout(() => {
      runStep(currentStepIndex);
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    };
  }, [currentStepIndex, runStep]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 overflow-x-hidden">
      {/* Section Header */}
      <div className="mb-12 text-center max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#B8860B]"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#B8860B]" />
          Bridal Consultation
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-5 font-serif text-3xl sm:text-4xl md:text-5xl text-neutral-900 tracking-tight leading-[1.15]"
        >
          How Your Consultation Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-600 md:text-base"
        >
          Experience a warm, personalized inquiry process. Send your outfit photos, clarify skin concerns, and plan your dream wedding look with us.
        </motion.p>
      </div>

      {/* Mobile Chat Container */}
      <div className="flex flex-col items-center justify-center px-4">
        {/* Outer Padding Box */}
        <div className="relative p-2 w-full max-w-[380px] flex justify-center">
          {/* Phone Chassis Container */}
          <div className="relative w-full max-w-[340px] sm:max-w-[360px]">
            {/* Left Hardware Buttons: Mute Switch, Volume Up, Volume Down */}
            <div className="absolute -left-[7px] top-20 h-6 w-[7px] rounded-l-sm bg-gradient-to-r from-neutral-700 to-neutral-900 border-l border-neutral-600 shadow-md" />
            <div className="absolute -left-[7px] top-32 h-11 w-[7px] rounded-l-sm bg-gradient-to-r from-neutral-700 to-neutral-900 border-l border-neutral-600 shadow-md" />
            <div className="absolute -left-[7px] top-48 h-11 w-[7px] rounded-l-sm bg-gradient-to-r from-neutral-700 to-neutral-900 border-l border-neutral-600 shadow-md" />

            {/* Right Hardware Button: Power / Lock */}
            <div className="absolute -right-[7px] top-32 h-14 w-[7px] rounded-r-sm bg-gradient-to-l from-neutral-700 to-neutral-900 border-r border-neutral-600 shadow-md" />

            {/* Main Phone Body Chassis */}
            <div className="relative w-full overflow-hidden rounded-[42px] border-[8px] sm:border-[10px] border-neutral-900 bg-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
              {/* Dynamic Island - Properly Spaced */}
              <div className="absolute top-2 left-1/2 z-50 flex h-5 w-24 -translate-x-1/2 items-center justify-between rounded-full bg-black px-2.5 shadow-lg border border-neutral-800/90">
                <div className="flex items-center gap-1.5">
                  {/* Camera Lens */}
                  <div className="relative h-2.5 w-2.5 rounded-full bg-neutral-950 ring-1 ring-neutral-800 flex items-center justify-center">
                    <div className="h-1 w-1 rounded-full bg-blue-900/90" />
                  </div>
                  {/* Sensor Dot */}
                  <div className="h-2 w-2 rounded-full bg-neutral-950 ring-1 ring-neutral-900" />
                </div>
                {/* Dynamic Island Indicator Dot */}
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/90 animate-pulse" />
              </div>

              {/* 9:16 Mobile Chat Viewport */}
              <div className="relative flex h-[580px] sm:h-[610px] w-full flex-col bg-[#efeae2] font-sans antialiased text-neutral-900 select-none">
                {/* Status Bar Partition with Clean Spacing */}
                <div className="flex h-9 w-full items-center justify-between px-6 bg-[#043d36] border-b border-black/20 text-white text-[10px] font-bold z-40">
                  <span className="pl-1">9:41</span>
                  <div className="flex items-center gap-1.5 pr-1">
                    <span>5G</span>
                    <div className="h-2.5 w-4 rounded-xs border border-white/90 p-[1px]">
                      <div className="h-full w-full bg-white" />
                    </div>
                  </div>
                </div>

                {/* WhatsApp Header Bar with Jawed Habib Logo */}
                <div className="flex items-center justify-between bg-[#075e54] px-3.5 py-2.5 text-white shadow-md z-30">
                  <div className="flex items-center gap-2.5">
                    {/* Logo Profile Photo */}
                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-white/30 bg-black flex items-center justify-center p-1 shadow-sm">
                      <img
                        src={jhLogo}
                        alt="Jawed Habib Kurji"
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="flex flex-col justify-center leading-tight">
                      <div className="flex items-center gap-1">
                        <span className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                          Jawed Habib Kurji
                        </span>
                        <CheckCircle2 className="h-3.5 w-3.5 fill-blue-500 text-white shrink-0" />
                      </div>
                      <span className="text-[10px] text-emerald-200 font-medium">
                        {isIncomingTyping ? (
                          <span className="animate-pulse text-emerald-300 font-semibold">typing...</span>
                        ) : (
                          "online"
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-white/90">
                    <Video className="h-4 w-4 cursor-pointer" />
                    <Phone className="h-4 w-4 cursor-pointer" />
                    <MoreVertical className="h-4 w-4 cursor-pointer" />
                  </div>
                </div>

                {/* Chat Feed Canvas */}
                <div
                  ref={chatContainerRef}
                  className="relative flex-1 overflow-y-auto p-3.5 space-y-3 scrollbar-none"
                  style={{
                    backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 0)`,
                    backgroundSize: "16px 16px"
                  }}
                >
                  {/* Encryption Notice Banner */}
                  <div className="mx-auto my-1.5 flex max-w-[90%] items-center justify-center gap-1.5 rounded-lg bg-[#ffeebd] px-2.5 py-1.5 text-center text-[10px] leading-tight text-amber-900 shadow-xs">
                    <Lock className="h-3 w-3 shrink-0 text-amber-800" />
                    <span>Messages and calls are end-to-end encrypted. No one outside of this chat can read them.</span>
                  </div>

                  {/* Date Badge */}
                  <div className="text-center my-2">
                    <span className="rounded-md bg-white/90 px-2.5 py-0.5 text-[10px] font-semibold text-neutral-500 shadow-xs uppercase tracking-wider">
                      Today
                    </span>
                  </div>

                  {/* Messages Render */}
                  <AnimatePresence initial={false}>
                    {displayMessages.map((msg) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className={`flex w-full ${msg.type === "outgoing" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`relative max-w-[85%] p-2.5 text-xs shadow-sm ${
                            msg.type === "outgoing"
                              ? "bg-[#d9fdd3] text-neutral-900 rounded-2xl rounded-tr-xs"
                              : "bg-white text-neutral-900 rounded-2xl rounded-tl-xs border border-neutral-100"
                          }`}
                        >
                          {/* Image Preview inside chat bubble */}
                          {msg.image && (
                            <div className="mb-2 overflow-hidden rounded-xl border border-neutral-200/80 shadow-xs bg-neutral-100">
                              <img
                                src={msg.image}
                                alt="Bridal Look / Outfit Inspiration"
                                className="h-44 w-full object-cover"
                                loading="eager"
                              />
                            </div>
                          )}

                          {msg.text && (
                            <p className="leading-relaxed whitespace-pre-wrap break-words pr-12 font-medium text-[11px] sm:text-xs">
                              {msg.text}
                            </p>
                          )}

                          <div className="absolute bottom-1 right-2 flex items-center gap-1 text-[9px] text-neutral-400 font-normal">
                            <span>{msg.timestamp}</span>
                            {msg.type === "outgoing" && (
                              <CheckCheck className="h-3 w-3 text-sky-500 font-bold ml-0.5" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Bouncing 3-Dot Typing Bubble */}
                  {isIncomingTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center gap-1 rounded-2xl rounded-tl-xs bg-white px-3.5 py-2.5 shadow-xs border border-neutral-100">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Input Bar */}
                <div className="flex items-center gap-2 bg-[#f0f2f5] px-3 py-2 border-t border-neutral-200 z-30">
                  <div className="flex items-center gap-1.5 text-neutral-500">
                    <span className="text-sm cursor-pointer">😊</span>
                    <Paperclip className="h-3.5 w-3.5 cursor-pointer" />
                    <Camera className="h-3.5 w-3.5 cursor-pointer" />
                  </div>

                  <div className="flex-1 rounded-full bg-white px-3 py-1 text-xs text-neutral-800 border border-neutral-200 shadow-inner flex items-center min-h-[32px]">
                    {inputText ? (
                      <span className="font-medium text-neutral-900 text-[11px] sm:text-xs">
                        {inputText}
                        <span className="inline-block w-0.5 h-3.5 bg-emerald-600 animate-pulse ml-0.5 translate-y-[1px]" />
                      </span>
                    ) : (
                      <span className="text-neutral-400 text-[11px]">Message</span>
                    )}
                  </div>

                  <div className="flex items-center justify-center">
                    {inputText ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#075e54] text-white shadow-sm">
                        <Send className="h-3.5 w-3.5 ml-0.5" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#075e54] text-white shadow-sm">
                        <Mic className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Stylish WhatsApp Call To Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex justify-center w-full"
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] px-6 py-3 text-white shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_12px_30px_rgba(37,211,102,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20 cursor-pointer text-xs font-extrabold uppercase tracking-wider"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#25D366] shadow-xs shrink-0 group-hover:scale-110 transition-transform">
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.764.459 3.488 1.333 5.006L2 22l5.129-1.341c1.464.799 3.117 1.22 4.88 1.22 5.508 0 9.991-4.478 9.992-9.886 0-2.668-1.039-5.176-2.924-7.061A9.923 9.923 0 0 0 12.012 2zm.006 18.243c-1.498 0-2.964-.403-4.242-1.163l-.304-.181-3.151.824.841-3.072-.198-.314c-.835-1.328-1.277-2.868-1.276-4.444.004-4.57 3.722-8.287 8.3-8.287 2.215.001 4.296.864 5.86 2.43 1.564 1.566 2.425 3.649 2.424 5.864-.004 4.571-3.723 8.288-8.294 8.288zm4.549-6.208c-.249-.125-1.474-.727-1.703-.81-.229-.083-.396-.125-.562.125-.166.249-.645.81-.791.977-.145.166-.291.187-.54.062-.249-.125-1.053-.388-2.006-1.238-.742-.661-1.243-1.478-1.389-1.727-.146-.249-.015-.384.109-.508.112-.112.249-.291.374-.436.125-.146.166-.249.249-.416.083-.166.042-.312-.021-.436-.062-.125-.562-1.352-.77-1.849-.203-.486-.409-.42-.562-.428l-.479-.009c-.166 0-.436.062-.665.312s-.873.852-.873 2.079.894 2.411 1.018 2.578c.125.166 1.76 2.688 4.263 3.769.595.257 1.06.41 1.423.526.598.19 1.142.163 1.572.099.48-.071 1.474-.602 1.682-1.184.208-.582.208-1.08.146-1.184-.063-.104-.229-.166-.478-.291z" />
              </svg>
            </div>
            <span>Start WhatsApp Chat</span>
            <ArrowRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

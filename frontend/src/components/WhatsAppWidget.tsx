"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Phone } from "lucide-react";
import { useState } from "react";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello OMVIK Team, I am interested in learning more about your projects. Please share the details."
);

const CONTACTS = [
  {
    name: "Team 1",
    number: "+91 7205522303",
    link: `https://wa.me/917205522303?text=${WHATSAPP_MESSAGE}`,
  },
  {
    name: "Team 2",
    number: "+91 7205922303",
    link: `https://wa.me/917205922303?text=${WHATSAPP_MESSAGE}`,
  },
];

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">

      {/* POPUP */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 40 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            className="mb-2 w-80 rounded-3xl overflow-hidden backdrop-blur-xl bg-white/70 border border-white/40 shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
          >

            {/* HEADER */}
            <div className="relative p-5 flex items-center gap-3 overflow-hidden">

              {/* Animated Gradient */}
              <motion.div
                animate={{
                  background: [
                    "linear-gradient(135deg,#25D366,#128C7E)",
                    "linear-gradient(135deg,#128C7E,#25D366)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0"
              />

              <div className="relative flex items-center gap-3 z-10">
                <div className="w-11 h-11 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>

                <div>
                  <h3 className="text-white text-sm tracking-widest uppercase font-semibold">
                    WhatsApp Chat
                  </h3>
                  <p className="text-white/80 text-[10px]">
                    Replies instantly ⚡
                  </p>
                </div>
              </div>

              {/* CLOSE */}
              <button
                onClick={() => setIsOpen(false)}
                className="ml-auto z-10 text-white/70 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CONTACT LIST */}
            <div className="p-4 space-y-3">
              {CONTACTS.map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.03 }}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/30 hover:shadow-xl transition-all duration-300 group"
                >
                  {/* ICON */}
                  <div className="relative w-11 h-11 flex items-center justify-center rounded-full bg-[#25D366]/20">

                    {/* Pulse */}
                    <span className="absolute w-full h-full rounded-full bg-[#25D366] opacity-20 animate-ping" />

                    <Phone className="w-5 h-5 text-[#25D366] relative z-10" />
                  </div>

                  {/* TEXT */}
                  <div className="flex-1">
                    <h4 className="text-black text-sm font-medium tracking-wide">
                      {contact.name}
                    </h4>
                    <p className="text-black/50 text-xs">{contact.number}</p>
                  </div>

                  {/* ARROW */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-black/5 group-hover:bg-[#25D366] group-hover:text-white transition-all"
                  >
                    →
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN BUTTON */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        suppressHydrationWarning
        className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.2)] overflow-hidden"
      >
        {/* Glow */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-[#25D366] blur-xl"
        />

        {/* Button */}
        <div className="relative w-full h-full bg-[#25D366] flex items-center justify-center rounded-full">
          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <MessageCircle className="w-7 h-7 text-white" />
          )}
        </div>
      </motion.button>
    </div>
  );
}
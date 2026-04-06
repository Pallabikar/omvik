"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 30, scale: 0.7, rotate: -10 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, y: 30, scale: 0.7, rotate: 10 }}
          transition={{ type: "spring", stiffness: 180, damping: 12 }}

          whileHover={{
            scale: 1.12,
            backgroundColor: "rgba(3, 6, 51, 0.85)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
          }}

          whileTap={{ scale: 0.9 }}

          onClick={scrollToTop}

          className="fixed bottom-24 right-6 z-[90] p-3 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/10 shadow-xl transition-colors duration-300 group"
          aria-label="Back to Hero"
        >
          {/* 🔥 Glow Pulse Layer */}
          <motion.span
            className="absolute inset-0 rounded-full bg-white/10"
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.05, 0.2] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ICON */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
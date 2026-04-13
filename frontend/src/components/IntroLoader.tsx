"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader({ onFinish }: { onFinish: () => void }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [particles, setParticles] = useState<{top: number; left: number; duration: number; delay: number}[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (window.innerWidth >= 768) {
      const generated = Array.from({ length: 15 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: 5 + Math.random() * 3,
        delay: Math.random() * 2,
      }));
      setParticles(generated);
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleVideoEnd = () => {
    setIsExiting(true);
    setTimeout(onFinish, 1200);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 w-screen h-screen z-[1200] flex items-center justify-center bg-[#FDFCFB] md:bg-black overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            scale: 1.05,
            filter: "blur(10px)",
          }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* VIDEO */}
          <motion.div
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1.02] }}
            transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          >
            <motion.video
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
            >
              <source src="https://res.cloudinary.com/dqlmblh5i/video/upload/q_auto/f_auto/v1776057858/OMVIK_LINE_ART_lwvyna.mp4" type="video/mp4" />
            </motion.video>
          </motion.div>

          {/* SUBTLE CENTER GLOW */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.02, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "mirror" }}
            className="absolute inset-0 bg-gradient-radial from-black/5 via-transparent to-transparent md:from-white/10"
          />

          {/* FLOATING PARTICLES - Disabled on Mobile for performance */}
          {!isMobile && particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full"
              style={{ top: `${p.top}%`, left: `${p.left}%` }}
              animate={{
                y: [0, -20, 0],
                x: [0, 15, -15, 0],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                repeatType: "mirror",
                delay: p.delay,
              }}
            />
          ))}

          {/* BRAND TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: [0.6, 0.8, 0.6], y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.8, duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
            className="absolute bottom-16 text-black/60 md:text-white/60 text-[10px] md:text-xs tracking-[0.4em] uppercase font-clagio"
          >
            Crafting Legacy
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
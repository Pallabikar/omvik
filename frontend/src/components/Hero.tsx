"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HeritageBanner from "./HeritageBanner";

import { useState, useEffect } from "react";
import ConsultationModal from "./ConsultationModal";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hoverState, setHoverState] = useState<'none' | 'consult' | 'blue'>('none');
  const [particles, setParticles] = useState<{ top: number; left: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1500);
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (window.innerWidth >= 768) {
      const generated = Array.from({ length: 20 }, () => ({
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: 6 + Math.random() * 4,
        delay: Math.random() * 2,
      }));
      setParticles(generated);
    }
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* 🎥 BACKGROUND VIDEO */}
      <motion.video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/OMVIK REEL INTRO .mp4" type="video/mp4" />
      </motion.video>

     

      {/* 🌫️ OVERLAY - Subtler on mobile */}
      <motion.div
        className="absolute inset-0 bg-white/10 z-20"
        animate={{ opacity: isMobile ? [0.05, 0.1, 0.05] : [0.08, 0.18, 0.08] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      {/* ✨ PARTICLES - Disabled on Mobile */}
      {!isMobile && particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full pointer-events-none z-20"
          style={{ top: `${p.top}%`, left: `${p.left}%` }}
          animate={{
            y: [0, -20, 0],
            x: [0, 15, -15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            repeatType: "mirror",
            delay: p.delay,
          }}
        />
      ))}

      {/* HERO CONTENT */}
      <div className="relative z-30 w-full max-w-6xl mx-auto px-6 text-center flex flex-col items-center 
      pt-32 sm:pt-40 md:pt-48 lg:pt-56">

        {/* 🔥 HEADING */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-20 sm:mt-28 md:mt-36 lg:mt-44 xl:mt-52
          font-clagio text-black leading-tight tracking-[0.015em]
          font-light text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl drop-shadow-lg"
        >
          Where Odisha’s Legacy <br />
          Shapes Tomorrow.
        </motion.h1>

        {/* BUTTONS */}
<div className="relative mt-12">

  {/* 🔥 BACKGROUND GLOW */}
  <motion.div
    animate={{
      opacity:
        hoverState === "consult"
          ? 1
          : hoverState === "none"
          ? 0
          : 1,
      scale:
        hoverState === "consult"
          ? 1.2
          : 1,
    }}
    transition={{ duration: 0.4 }}
    className={`absolute inset-0 blur-3xl rounded-full transition-all duration-500
    ${
      hoverState === "consult"
        ? "bg-gradient-to-r from-orange-400 via-orange-500 to-red-500"
        : hoverState === "none"
        ? ""
        : "bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-700"
    }`}
  />

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9 }}
    className="relative flex flex-col sm:flex-row items-center justify-center gap-6"
  >
    {/* ORANGE BUTTON */}
    <Link href="/services" className="w-full sm:w-auto">
      <motion.button
        onMouseEnter={() => setHoverState('blue')}
        onMouseLeave={() => setHoverState('none')}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        className="w-full sm:w-auto px-10 py-3 rounded-full bg-[#fc4d00] text-white uppercase tracking-[0.2em] text-xs"
      >
        Discover Projects
      </motion.button>
    </Link>

    {/* BLUE BUTTON */}
    <Link href="/services" className="w-full sm:w-auto">
      <motion.button
        onMouseEnter={() => setHoverState('consult')}
        onMouseLeave={() => setHoverState('none')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className={`w-full sm:w-auto px-10 py-3 rounded-full uppercase tracking-[0.2em] text-xs transition-all duration-300
        ${
          hoverState === 'consult'
            ? 'bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-700 text-white shadow-md'
            : 'bg-white/90 backdrop-blur-md text-black border border-white/40'
        }`}
      >
        Consult Our Experts
      </motion.button>
    </Link>
  </motion.div>
</div>

        {/* HERITAGE */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="w-full mt-16 sm:mt-24 md:mt-32"
        >
          <HeritageBanner />
        </motion.div>
      </div>



      {/* MODAL */}
      <ConsultationModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
}
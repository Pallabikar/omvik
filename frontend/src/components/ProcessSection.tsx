"use client";

import { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Search, PenTool, Layout, ShieldCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "PROJECT DISCOVERY",
    description:
      "We carefully identify promising opportunities and locations that hold strong potential for growth and future communities.",
    icon: <Search size={24} />,
  },
  {
    number: "02",
    title: "STRATEGIC PLANNING",
    description:
      "Every project is thoughtfully planned, balancing modern development with practicality, sustainability, and long-term value.",
    icon: <PenTool size={24} />,
  },
  {
    number: "03",
    title: "QUALITY DEVELOPMENT",
    description:
      "From plots to residences, we focus on creating developments that deliver quality, comfort, and meaningful investment opportunities.",
    icon: <Layout size={24} />,
  },
  {
    number: "04",
    title: "TRUST & TRANSPARENCY",
    description:
      "With clear documentation, honest communication, and dedicated guidance, we ensure every customer experiences confidence and peace of mind.",
    icon: <ShieldCheck size={24} />,
  },
];

function ProcessCard({ step, index, isMobile }: { step: typeof steps[0], index: number, isMobile: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [4, -4]);
  const rotateY = useTransform(x, [-50, 50], [-4, 4]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      key={step.number}
      initial={{ opacity: 0, y: 80, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={isMobile ? {} : { y: -14, scale: 1.03 }}
      whileTap={isMobile ? { scale: 0.98 } : {}}
      style={isMobile ? {} : { rotateX, rotateY }}
      onMouseMove={isMobile ? undefined : handleMove}
      onMouseLeave={isMobile ? undefined : handleLeave}
      className="glass-panel p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] relative group transition-all duration-700 border border-white/10 shadow-xl flex flex-col items-center text-center"
    >

      {/* FLOATING BACKGROUND GLOW */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#fc4d00]/10 to-[#052870]/10 pointer-events-none"
      />

      {/* NUMBER (SMOOTH SCALE REVEAL) */}
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 + index * 0.1 }}
        className="absolute top-10 right-10 text-5xl font-clagio font-medium text-[#fc4d00]/20 group-hover:text-[#fc4d00] transition-all duration-500"
      >
        {step.number}
      </motion.span>

      {/* ICON (LOOP MICRO ANIMATION) */}
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, 4, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        whileHover={{ scale: 1.15 }}
        className="w-14 h-14 rounded-2xl bg-[#052870]/10 flex items-center justify-center text-[#052870] mb-10 group-hover:bg-[#052870] group-hover:text-white transition-all duration-500 shadow-sm"
      >
        {step.icon}
      </motion.div>

      {/* TITLE */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl text-black font-clagio font-medium mb-4 tracking-[0.04em] leading-[1.1]"
      >
        {step.title}
      </motion.h3>

      {/* DESC */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-black/70 font-light leading-relaxed"
      >
        {step.description}
      </motion.p>
    </motion.div>
  );
}

export default function ProcessSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative w-full py-24 bg-[#FDFCFB] px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-16 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-clagio font-medium mb-6 tracking-[0.04em] leading-[1.1]"
          >
            THE OMVIK WAY
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] bg-black/10 mx-auto mb-16"
          />
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <ProcessCard key={step.number} step={step} index={index} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}
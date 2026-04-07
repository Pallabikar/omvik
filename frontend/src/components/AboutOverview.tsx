"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function Counter({
    end,
    suffix = "",
    duration = 2,
}: {
    end: number;
    suffix?: string;
    duration?: number;
}) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number | null = null;
        const animate = (time: number) => {
            if (!startTime) startTime = time;
            const progress = Math.min((time - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [end, duration, isInView]);

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    );
}
export default function AboutOverview() {
    const [isMobile, setIsMobile] = useState(false);
    const stats = [
        { value: 10, label: "Projects" },
        { value: 850, label: "Happy Clients", highlight: true },
        { value: 4, label: "Years Experience" },
    ];

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <section className="relative w-full py-20 sm:py-24 md:py-28 overflow-hidden bg-[#FDFCFB]">

            {/* 🔥 ROTATING KONARK CHAKRA — always rendered, size/opacity adjusted for mobile */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    duration: 60, // slow premium rotation
                    ease: "linear",
                }}
            >
                <div
                    className="relative opacity-10 blur-[1px]"
                    style={{
                        width: isMobile ? "280px" : undefined,
                    }}
                >
                    <Image
                        src="/images/konark-chakra.png"
                        alt="Konark Chakra"
                        width={700}
                        height={700}
                        className={`object-contain ${isMobile ? "w-[280px]" : "w-[300px] sm:w-[500px] md:w-[700px]"}`}
                    />
                </div>
            </motion.div>

            {/* SOFT GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FC4D00]/10 via-transparent to-[#052870]/10 blur-3xl" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">

                {/* TEXT */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center mb-12 sm:mb-16 md:mb-20"
                >



{/* 🌌 COSMIC ORBIT HEADING */}
<div className="relative flex justify-center items-center mb-12">

  

  

  {/* 🌀 3D TEXT */}
  <motion.h2
    initial={{ opacity: 0, scale: 0.8, rotateX: 50 }}
    whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
    transition={{ duration: 1.2, ease: "easeOut" }}
    whileHover={{
      scale: 1.05,
      rotateY: 8,
    }}
    style={{ perspective: 1200 }}
    className="relative z-10 text-center 
               text-4xl sm:text-5xl md:text-6xl lg:text-7xl 
               font-clagio font-bold text-black tracking-wide"
  >
    THE OMVIK STORY
  </motion.h2>

</div>
                    
               
      

                    <p className="text-lg text-black mb-6 leading-relaxed font-light">
                        More than real estate, Omvik is a commitment to the land and the people of Odisha.
                        Rooted in the values of trust, integrity, and respect for heritage, we create spaces where families can grow and futures can flourish.
                    </p>

                    <p className="text-lg text-black mb-10 leading-relaxed font-light">
                        With every project, we strive to honour the spirit of this land while offering opportunities that bring security, prosperity, and peace of mind.
                    </p>
                </motion.div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center text-center gap-12">

                    {stats.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.3, duration: 0.8 }}
                            className={`relative group ${
                                item.highlight && !isMobile ? "md:scale-125 z-10" : ""
                            }`}
                        >

                            {/* GLOW */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.4, 0.8, 0.4],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: i * 0.5,
                                }}
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FC4D00]/30 to-[#052870]/30 blur-2xl"
                            />

                            {/* NUMBER */}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className={`relative font-clagio font-medium bg-gradient-to-r from-[#FC4D00] via-[#052870] to-[#FC4D00] bg-clip-text text-transparent ${
                                    item.highlight
                                        ? "text-7xl md:text-8xl"
                                        : "text-6xl md:text-7xl"
                                }`}
                            >
                                <Counter end={item.value} suffix="+" />
                            </motion.div>

                            {/* LINE */}
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "60%" }}
                                transition={{ delay: 0.5 + i * 0.2 }}
                                className="h-[2px] mx-auto mt-4 bg-gradient-to-r from-[#FC4D00] to-[#052870]"
                            />

                            {/* LABEL */}
                            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-black/50">
                                {item.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-12 sm:mt-16 md:mt-20"
                >
                    <Link href="/about" prefetch={true}>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 rounded-full bg-black text-white font-clagio font-medium uppercase tracking-[0.3em] text-[10px] hover:bg-gradient-to-r hover:from-[#FC4D00] hover:to-[#052870] transition-all duration-500"
                        >
                            Read Our Story
                        </motion.button>
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}
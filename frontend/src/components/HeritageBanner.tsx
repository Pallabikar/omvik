"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeritageBanner() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <div className={`relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden ${isMobile ? "h-[120px]" : "h-[140px] sm:h-[190px]"}`}>

            {/* Sliding + Parallax Background */}
            <motion.div
                className="absolute inset-0 w-[200%] h-full flex"
                animate={{
                    x: ["0%", "-50%"],
                    scale: isMobile ? 1 : [1, 1.05, 1],
                }}
                transition={{
                    x: {
                        duration: isMobile ? 40 : 60,
                        ease: "linear",
                        repeat: Infinity,
                    },
                    scale: {
                        duration: 20,
                        ease: "easeInOut",
                        repeat: Infinity,
                    },
                }}
            >
                <div className="relative w-1/2 h-full">
                    <Image
                        src="https://res.cloudinary.com/dtmqv7oqq/image/upload/v1782715060/ODISHA_HERITAGE_urjyyb.png"
                        alt="Odisha Heritage"
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Duplicate */}
                <div className="relative w-1/2 h-full">
                    <Image
                        src="https://res.cloudinary.com/dtmqv7oqq/image/upload/v1782715060/ODISHA_HERITAGE_urjyyb.png"
                        alt="Odisha Heritage"
                        fill
                        sizes="100vw"
                        className="object-cover"
                        priority
                    />
                </div>
            </motion.div>

            {/* Animated Overlay */}
            <motion.div
                className="absolute inset-0 bg-black"
                animate={{ opacity: [0.5, 0.35, 0.5] }}
                transition={{
                    duration: 6,
                    ease: "easeInOut",
                    repeat: Infinity,
                }}
            />

            {/* Soft Glow */}
            <motion.div
                className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 1,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl
                               font-clagio font-medium text-white
                               tracking-[0.03em] leading-tight"
                >
                    Rooted in Odisha. Built for Generations.
                </motion.h2>

                

                {/* Floating subtle animation */}
                <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 pointer-events-none"
                />
            </div>
        </div>
    );
}
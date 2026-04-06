"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { User, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Track scroll for adaptive styling
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    return (
        <>
            <nav className={`fixed top-0 w-full z-[10010] transition-all duration-500 px-6 md:px-12 flex justify-between items-center ${scrolled
                ? "py-3 md:py-4 bg-[#FDFCFB]/80 backdrop-blur-xl border-b border-black/5 shadow-sm"
                : "pt-0 pb-2"
                }`}>
                <Link href="/" prefetch={true} aria-label="Home" className="flex items-center relative z-50 group">
                    <div className="flex flex-col">
                        <Image
                            src="/images/nav-icon.png"
                            alt="OMVIK Logo"
                            width={140}
                            height={140}
                            className={`object-contain transition-all duration-700 w-20 sm:w-24 md:w-32 lg:w-36 mix-blend-multiply ${scrolled ? "scale-90" : "scale-100"} ${isOpen ? "brightness-0 invert" : ""}`}
                            priority
                        />
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: scrolled ? "80%" : "100%" }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="h-[1px] bg-black/10 mt-2 self-start"
                        />
                    </div>
                    {/* Heritage Coordinate Marker */}
                    <div className={`ml-4 hidden lg:block overflow-hidden transition-all duration-700 ${scrolled ? "max-w-0 opacity-0" : "max-w-[100px] opacity-40"}`}>
                        <span className="text-[8px] uppercase tracking-[0.4em] font-clagio whitespace-nowrap">

                        </span>
                    </div>
                </Link>

                {/* Desktop Links - True Centered */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center space-x-4 lg:space-x-12 text-[10px] uppercase tracking-[0.3em] text-black font-clagio font-medium transition-all">

                    <Link href="/services" prefetch={true} className="zenith-link-hover hover:opacity-100 transition-opacity whitespace-nowrap">
                        Services
                    </Link>
                    <Link href="/about" prefetch={true} className="zenith-link-hover hover:opacity-100 transition-opacity whitespace-nowrap">
                        About Us
                    </Link>
                    <Link href="/contact" prefetch={true} className="zenith-link-hover hover:opacity-100 transition-opacity whitespace-nowrap">
                        Contact
                    </Link>
                </div>

                <div className="flex items-center space-x-4 md:space-x-6 relative z-50">
                    <Link href="/login" prefetch={true} aria-label="Client Portal" className="hidden sm:block">
                        <div className={`w-10 h-10 rounded-full glass-panel flex flex-col items-center justify-center transition-all hover:bg-black hover:text-white border-black/5 ${isOpen ? "text-white border-white/20 bg-white/10" : "text-black"}`}>
                            <User size={16} />
                        </div>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isOpen ? "text-white bg-white/10" : "glass-panel border-black/5 text-black md:hidden"}`}
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ clipPath: "circle(0% at 90% 5%)" }}
                        animate={{ clipPath: "circle(150% at 90% 5%)" }}
                        exit={{ clipPath: "circle(0% at 90% 5%)" }}
                        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 h-[100dvh] w-full z-[10005] bg-[#081F5C] flex flex-col items-center justify-center overflow-hidden"
                    >
                        <div className="flex flex-col items-center space-y-8 text-center">
                            {[
                                { name: "Home", href: "/" },
                                { name: "Services", href: "/services" },
                                { name: "About Us", href: "/about" },
                                { name: "Contact", href: "/contact" },
                                { name: "Login", href: "/login" }
                            ].map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                >
                                    <Link
                                        href={item.href}
                                        prefetch={true}
                                        onClick={() => setIsOpen(false)}
                                        className="text-4xl md:text-5xl text-white font-clagio font-medium hover:opacity-70 transition-opacity tracking-[0.04em] leading-[1.1]"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social Links / Footer in Menu */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            transition={{ delay: 1 }}
                            className="absolute bottom-8 md:bottom-12 text-white/60 text-xs md:text-sm uppercase tracking-widest text-center px-4"
                        >
                            Custodians of Legacy
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}



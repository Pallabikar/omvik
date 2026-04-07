"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Phone, MapPin } from "lucide-react";


export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full bg-[#FDFCFB] overflow-hidden border-t border-black/5">

            {/* Footer CTA Section */}
            <div className="w-full bg-[#0a1628] px-6 py-20 md:py-28 text-center relative overflow-hidden">
                {/* Subtle background texture */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,_transparent_70%)] pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto">
                    
                    <h2 className="font-clagio font-medium text-white leading-[1.05] tracking-[0.03em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6">
                        Ready to Build Your<br />Legacy With OMVIK?
                    </h2>
                    <p className="text-white/50 font-light text-lg max-w-xl mx-auto mb-12 leading-relaxed">
                        Discover premium plots and luxury living spaces crafted for prosperity, rooted in the heart of Odisha.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link 
                            href="/services"
                            prefetch={true}
                            className="w-full sm:w-auto px-10 py-4 rounded-full bg-white text-black font-clagio font-medium uppercase tracking-[0.25em] text-[11px] hover:bg-[#d8d2c7] transition-all duration-500 shadow-xl inline-block"
                        >
                            Explore Portfolio
                        </Link>
                        <Link 
                            href="/contact"
                            prefetch={true}
                            className="w-full sm:w-auto px-10 py-4 rounded-full border border-white/20 text-white font-clagio font-medium uppercase tracking-[0.25em] text-[11px] hover:bg-white/10 hover:border-white/40 transition-all duration-500 inline-block"
                        >
                            Talk to Us
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer Links */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 md:pb-10">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand & Mission */}
                    <div className="flex flex-col space-y-8">
                        <div className="space-y-4">
                            <Link href="/" className="inline-block">
                                <Image
                                    src="/images/OMVIK-LOGO.png"
                                    alt="OMVIK Logo"
                                    width={100}
                                    height={30}
                                    className="object-contain mix-blend-multiply"
                                />
                            </Link>
                            <p className="font-clagio font-medium text-black/60 uppercase tracking-[0.2em] text-[10px]">
                                Custodians of Legacy.<br />Built for Generations.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-black font-clagio font-medium uppercase tracking-[0.3em] text-[11px] leading-[1.1]">Follow Us</h4>
                            <div className="flex space-x-3">
                                <Link href="#" className="p-2.5 rounded-full border border-black/5 hover:bg-[#C5A059] hover:text-white transition-all duration-500 text-black/60 hover:-translate-y-1 hover:scale-110 shadow-sm hover:shadow-md">
                                    <Facebook size={16} />
                                </Link>
                                <Link href="#" className="p-2.5 rounded-full border border-black/5 hover:bg-[#C5A059] hover:text-white transition-all duration-500 text-black/60 hover:-translate-y-1 hover:scale-110 shadow-sm hover:shadow-md">
                                    <Instagram size={16} />
                                </Link>
                                <Link href="#" className="p-2.5 rounded-full border border-black/5 hover:bg-[#C5A059] hover:text-white transition-all duration-500 text-black/60 hover:-translate-y-1 hover:scale-110 shadow-sm hover:shadow-md">
                                    <Linkedin size={16} />
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-black/5">
                            <h4 className="text-black font-clagio font-medium uppercase tracking-[0.3em] text-[11px] leading-[1.1]">Stay connected with OMVIK</h4>
                            <form className="flex w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 bg-black/5 border border-black/5 rounded-l-full px-4 py-2 text-xs focus:outline-none focus:border-black/20 font-light"
                                    suppressHydrationWarning
                                />
                                <button 
                                    className="bg-black text-white px-6 py-2 rounded-r-full text-[10px] uppercase tracking-widest font-medium hover:bg-[#d8d2c7] hover:text-black transition-all"
                                    suppressHydrationWarning
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-black font-clagio font-medium uppercase tracking-[0.3em] text-[11px] mb-8 leading-[1.1]">Navigation</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Our Offerings", href: "/services" },
                                { name: "Our Story", href: "/about" },
                                { name: "Get in Touch", href: "/contact" },
                                { name: "Client Portal", href: "/login" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} prefetch={true} className="group flex items-center text-black/70 hover:text-black transition-colors font-clagio font-medium tracking-wide">
                                        <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Offerings */}
                    <div>
                        <h4 className="text-black font-clagio font-medium uppercase tracking-[0.3em] text-[11px] mb-8 leading-[1.1]">Portfolio</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Premium Plots", href: "/services/plots" },
                                { name: "Luxury Apartments", href: "/services/apartments" },
                                { name: "Townships", href: "/services/townships" },
                                { name: "Commercial Spaces", href: "/services/commercial" }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} prefetch={true} className="group flex items-center text-black/70 hover:text-black transition-colors font-clagio font-medium tracking-wide">
                                        <span className="mr-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <h4 className="text-black font-clagio font-medium uppercase tracking-[0.3em] text-[11px] mb-4 leading-[1.1]">Headquarters</h4>

                        <div className="flex items-start">
                            <MapPin size={18} className="text-black mr-4 shrink-0 mt-1" />
                            <div className="flex flex-col">
                                <span className="block text-black mb-1 font-normal uppercase tracking-widest text-[10px] opacity-60">Old Town Office</span>
                                <span className="text-black/70 font-light text-sm">Plot no-1967, Sriram Nagar, Old Town, Bhubaneswar, Odisha 751002</span>
                                <Link
                                    href="https://www.google.com/maps/search/?api=1&query=Plot+no-1967,+Sriram+Nagar,+Old+Town,+Bhubaneswar,+Odisha+751002"
                                    target="_blank"
                                    className="text-[10px] uppercase tracking-widest text-black mt-2 font-medium hover:opacity-60 transition-opacity"
                                >
                                    View on Map →
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <MapPin size={18} className="text-black mr-4 shrink-0 mt-1" />
                            <div className="flex flex-col">
                                <span className="block text-black mb-1 font-normal uppercase tracking-widest text-[10px] opacity-60">Jagamara Office</span>
                                <span className="text-black/70 font-light text-sm">Plot no-B/32, Sidhivihar, New Jagamara Road, Bhubaneswar, Odisha 751030</span>
                                <Link
                                    href="https://www.google.com/maps/search/?api=1&query=Plot+no-B/32,+Sidhivihar,+New+Jagamara+Road,+Bhubaneswar,+Odisha+751030"
                                    target="_blank"
                                    className="text-[10px] uppercase tracking-widest text-black mt-2 font-medium hover:opacity-60 transition-opacity"
                                >
                                    View on Map →
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <MapPin size={18} className="text-black mr-4 shrink-0 mt-1" />
                            <div className="flex flex-col">
                                <span className="block text-black mb-1 font-normal uppercase tracking-widest text-[10px] opacity-60">Bengaluru Office</span>
                                <span className="text-black/70 font-light text-sm">J304 Icon Happy Living, Electronic City Phase 2, Bengaluru, Karnataka 560100</span>
                                <Link
                                    href="https://www.google.com/maps/search/?api=1&query=J304+Icon+Happy+Living,+Electronic+City+Phase+2,+Bengaluru,+Karnataka+560100"
                                    target="_blank"
                                    className="text-[10px] uppercase tracking-widest text-black mt-2 font-medium hover:opacity-60 transition-opacity"
                                >
                                    View on Map →
                                </Link>
                            </div>
                        </div>

                        <div className="flex items-center pt-2">
                            <Phone size={18} className="text-black mr-4 shrink-0" />
                            <div>
                                <span className="block text-black mb-1 font-normal uppercase tracking-widest text-[10px] opacity-60">Phone</span>
                                <span className="text-black/70 font-light text-sm">+91 7205522303 / 7205922303</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-[11px] text-black/40 font-clagio uppercase tracking-[0.2em] space-y-6 md:space-y-0 text-center md:text-left">
                    <p>© {currentYear} OMVIK Developers</p>
                    <div className="flex space-x-6">
                        <Link href="#" className="hover:text-black transition-colors">Privacy Policy</Link>
                        <span className="opacity-20">|</span>
                        <Link href="#" className="hover:text-black transition-colors">Terms</Link>
                        <span className="opacity-20">|</span>
                        <Link href="#" className="hover:text-black transition-colors">Sitemap</Link>
                    </div>
                    <p className="opacity-60 italic normal-case tracking-normal font-light">Designed with excellence in Odisha</p>
                </div>
            </div>
        </footer>
    );
}

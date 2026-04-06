"use client";

import { use } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Params = Promise<{ id: string }>;

export default function ServiceDetail({ params }: { params: Params }) {
    const { id } = use(params);

    const getImageSrc = (serviceId: string) => {
        if (serviceId === "townships") return "/images/services/townships.png";
        return `/images/services/${serviceId}.png`;
    };

    return (
        <main className="w-full min-h-screen bg-[#FDFCFB]">


            <div className="pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-20 sm:pb-24 px-6 max-w-5xl mx-auto relative z-10">
                <Link href="/services" prefetch={true} className="inline-flex items-center text-black/70 hover:text-black transition-colors mb-8 group uppercase tracking-[0.2em] text-[10px] font-clagio font-medium">
                    <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Offerings
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel p-6 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-3xl"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black font-clagio font-medium mb-4 capitalize tracking-[0.04em] leading-[1.1]">
                                {id}
                            </h1>
                            <div className="h-[2px] w-16 bg-[#081F5C]/10" />
                        </div>

                    </div>

                    <p className="text-base sm:text-lg text-black/80 font-light mb-8 sm:mb-12 leading-relaxed max-w-3xl">
                        Welcome to our exclusive {id} offerings. Blending the deep-rooted heritage of Odisha with cutting-edge modern design, our curated projects aim to deliver an unparalleled living and investment experience.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="rounded-2xl overflow-hidden shadow-xl aspect-square relative group"
                        >
                            <Image
                                src={getImageSrc(id)}
                                alt={`${id} Perspective`}
                                fill
                                className="object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 z-10">
                                <span className="text-white text-sm uppercase tracking-widest">Architectural Perspective</span>
                            </div>
                        </motion.div>
                        <div className="flex flex-col justify-between space-y-8">
                            <div className="border-l-2 border-[#081F5C]/10 pl-8 space-y-4">
                                <h3 className="text-xl font-clagio font-medium text-black tracking-[0.04em]">Project Highlights</h3>
                                <ul className="space-y-4 text-black/70 font-light text-sm">
                                    <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#081F5C] mr-3" /> Heritage-inspired architectural motifs</li>
                                    <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#081F5C] mr-3" /> Prime locations with high ROI potential</li>
                                    <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#081F5C] mr-3" /> Sustainable and green living spaces</li>
                                    <li className="flex items-center"><div className="w-1.5 h-1.5 rounded-full bg-[#081F5C] mr-3" /> Transparent and faith-driven dealings</li>
                                </ul>
                            </div>

                            <Link href="/contact" prefetch={true} className="block">
                                <motion.button 
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-5 rounded-2xl bg-black text-white font-clagio font-medium uppercase tracking-[0.3em] text-[10px] hover:bg-[#081F5C] transition-all duration-500 shadow-lg group flex items-center justify-center"
                                >
                                    Request Full Portfolio <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}

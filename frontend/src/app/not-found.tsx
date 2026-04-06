"use client";

import { motion } from "framer-motion";
import Link from "next/link";



export default function NotFound() {
    return (
        <main className="w-full min-h-screen bg-[#FDFCFB] flex flex-col">



            <div className="flex-grow flex flex-col items-center justify-center px-6 text-center pt-24">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="max-w-xl"
                >
                    <span className="text-[10px] uppercase tracking-[0.4em] font-cinzel font-semibold text-black/40 mb-6 block">
                        Legacy Registry Error
                    </span>

                    <h1 className="text-5xl sm:text-7xl md:text-8xl text-black font-clagio font-medium mb-8 tracking-[0.04em]">
                        404
                    </h1>

                    <div className="h-[2px] w-16 bg-black/10 mx-auto mb-8" />

                    <h2 className="text-2xl md:text-3xl text-black font-clagio font-medium mb-6 tracking-[0.04em]">
                        The Path Has Faded.
                    </h2>

                    <p className="text-lg text-black/60 font-light mb-12 leading-relaxed">
                        The coordinate you are looking for has either aged out of the heritage registry or never existed in our collection.
                    </p>

                    <Link href="/" prefetch={true}>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 sm:px-12 py-4 rounded-full bg-black text-white font-clagio font-medium uppercase tracking-[0.3em] text-[10px] hover:bg-[#EDE9E3] hover:text-black transition-all duration-500 shadow-xl group"
                        >
                            Return to Sanctuary
                        </motion.button>
                    </Link>
                </motion.div>
            </div>

        </main>
    );
}

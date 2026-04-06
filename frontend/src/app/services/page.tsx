"use client";

import ServicesGrid from "@/components/ServicesGrid";


import { motion } from "framer-motion";

export default function ServicesPage() {
    return (
        <main className="w-full min-h-screen bg-[#FDFCFB]">



            <motion.div
                className="pt-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                <ServicesGrid />
            </motion.div>
        </main>
    );
}

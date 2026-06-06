"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";

interface DetailItem {
  label: string;
  value: string;
}

interface ProjectDetailsProps {
  details: DetailItem[];
}

export default function ProjectDetails({ details }: ProjectDetailsProps) {
  return (
    <section className="py-16 bg-[#FDFCFB] border-y border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 text-center md:text-left">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] block mb-2 font-medium">
            Specifications
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-clagio text-black font-semibold">
            Property Details
          </h2>
          <div className="h-[2px] w-12 bg-[#C5A059]/20 mt-3 mx-auto md:mx-0" />
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {details.map((detail, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, borderColor: "rgba(197, 160, 89, 0.4)" }}
              className="glass-panel p-6 rounded-2xl border border-black/5 hover:shadow-md transition-all duration-300 flex items-start space-x-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#C5A059]/10 flex items-center justify-center text-[#C5A059] shrink-0">
                <Info size={16} />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-black/50 block font-clagio font-medium">
                  {detail.label}
                </span>
                <span className="text-base font-clagio text-black font-semibold block">
                  {detail.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

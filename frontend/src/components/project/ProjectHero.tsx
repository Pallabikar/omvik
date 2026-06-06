"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin } from "lucide-react";

interface ProjectHeroProps {
  name: string;
  category: string;
  status: string;
  locationName: string;
  tagline: string;
  heroImage: string;
  backUrl?: string;
  backLabel?: string;
}

export default function ProjectHero({
  name,
  category,
  status,
  locationName,
  tagline,
  heroImage,
  backUrl = "/services",
  backLabel = "Back to Offerings",
}: ProjectHeroProps) {
  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh] overflow-hidden flex items-end">
      {/* Background Image with Loader Optimization */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt={`${name} Hero`}
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        {/* Dark Elegant Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCFB] via-black/45 to-black/30 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.2)_0%,_transparent_75%)] z-10" />
      </div>

      {/* Floating Coordinate Marker Decoration (Odisha Theme) */}
      <div className="absolute top-28 right-6 md:right-12 z-20 hidden sm:block opacity-60">
        <span className="text-[9px] uppercase tracking-[0.4em] font-clagio text-white block text-right">
          OMVIK DEVELOPMENTS
        </span>
        <span className="text-[8px] uppercase tracking-[0.3em] text-white/50 block text-right mt-1">
          20.2961° N, 85.8245° E
        </span>
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-12 sm:pb-20">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link
            href={backUrl}
            prefetch={true}
            className="inline-flex items-center text-white/80 hover:text-white transition-colors group uppercase tracking-[0.25em] text-[10px] font-clagio font-medium"
          >
            <ArrowLeft
              size={14}
              className="mr-2 group-hover:-translate-x-1 transition-transform"
            />{" "}
            {backLabel}
          </Link>
        </motion.div>

        {/* Title and Metadata */}
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center gap-3 mb-4"
          >
            <span className="px-3 py-1 rounded-full text-[9px] font-clagio uppercase tracking-widest bg-[#C5A059] text-white font-medium shadow-sm">
              {category}
            </span>
            <span className="px-3 py-1 rounded-full text-[9px] font-clagio uppercase tracking-widest bg-white/20 backdrop-blur-md text-white border border-white/10 font-medium">
              {status}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-clagio text-white font-bold tracking-wide leading-[1.1] uppercase"
          >
            {name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/80 text-lg md:text-xl font-light mt-4 italic max-w-2xl"
          >
            &ldquo;{tagline}&rdquo;
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center text-white/90 text-xs tracking-widest mt-6"
          >
            <MapPin size={14} className="mr-2 text-[#C5A059]" />
            <span className="font-light">{locationName}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

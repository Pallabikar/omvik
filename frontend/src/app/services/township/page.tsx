"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, LayoutDashboard, ArrowLeft } from "lucide-react";
import { townshipProjects } from "@/utils/projectData";

export default function TownshipServicePage() {
  const projects = Object.values(townshipProjects);

  return (
    <main className="w-full min-h-screen bg-[#FDFCFB]">
      {/* 1. HERO BANNER */}
      <section className="relative w-full h-[50vh] sm:h-[60vh] overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://res.cloudinary.com/dqlmblh5i/image/upload/v1780033648/TOWNSHIP_launnf.jpg"
            alt="Townships Banner"
            fill
            priority
            className="object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCFB] via-black/50 to-black/30 z-10" />
        </div>

        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-12">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Link
              href="/services"
              prefetch={true}
              className="inline-flex items-center text-white/80 hover:text-white transition-colors group uppercase tracking-[0.25em] text-[10px] font-clagio font-medium"
            >
              <ArrowLeft
                size={14}
                className="mr-2 group-hover:-translate-x-1 transition-transform"
              />{" "}
              Back to Offerings
            </Link>
          </motion.div>

          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center space-x-2 text-[#C5A059] mb-3"
            >
              <LayoutDashboard size={16} />
              <span className="text-[10px] uppercase tracking-[0.3em] font-clagio font-medium">
                Our Collections
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-clagio text-white font-bold tracking-wide uppercase leading-tight"
            >
              Township Developments
            </motion.h1>
          </div>
        </div>
      </section>

      {/* 2. MY CITY ODISHA (MCO) SECTION */}
      <section className="py-20 sm:py-28 relative overflow-hidden bg-[#FDFCFB]">
        {/* Soft Background Accent */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fc4d00]/5 via-transparent to-[#052870]/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          {/* Section Heading */}
          <div className="text-center mb-16 sm:mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.4em] text-[#C5A059] block mb-3 font-semibold"
            >
              Featured Masterplans
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl font-clagio text-black tracking-wide"
            >
              My City Odisha (MCO)
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 text-black text-sm max-w-2xl mx-auto leading-relaxed font-light"
            >
              A signature community initiative by OMVIK. Explore our carefully planned, eco-smart township developments designed to integrate nature, convenience, and growth.
            </motion.p>
            <div className="h-[2px] w-16 bg-[#C5A059]/20 mt-6 mx-auto" />
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {projects.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              >
                <Link href={`/services/township/${project.slug}`}>
                  <div className="group relative h-[380px] sm:h-[440px] rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-black/5">
                    {/* Project Backdrop Image */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={project.heroImage}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                      />
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10" />
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-6 left-6 z-20 flex flex-wrap gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-clagio uppercase tracking-widest bg-[#C5A059] text-white font-medium">
                        {project.category}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-clagio uppercase tracking-widest bg-white/20 backdrop-blur-md text-white border border-white/10 font-medium">
                        {project.status}
                      </span>
                    </div>

                    {/* Bottom Card Content */}
                    <div className="absolute bottom-0 inset-x-0 z-20 p-8 flex flex-col justify-end h-1/2">
                      <h3 className="text-2xl sm:text-3xl text-white font-clagio mb-2 tracking-wide font-semibold">
                        {project.name}
                      </h3>
                      
                      <div className="flex items-center text-white/70 text-xs tracking-wider mb-4">
                        <MapPin size={12} className="mr-1.5 text-[#C5A059]" />
                        <span>{project.locationName}</span>
                      </div>

                      <p className="text-white/60 text-xs sm:text-sm font-light line-clamp-2 mb-6">
                        {project.description}
                      </p>

                      <div className="flex items-center text-[10px] tracking-[0.3em] uppercase text-white/70 group-hover:text-white transition-colors duration-300 font-clagio font-medium">
                        <span>Explore Project</span>
                        <ArrowRight
                          className="ml-2 group-hover:translate-x-1.5 transition-transform duration-300"
                          size={12}
                        />
                      </div>
                    </div>

                    {/* Border Glow Animation */}
                    <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

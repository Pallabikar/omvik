"use client";

import { motion } from "framer-motion";

interface ProjectAboutProps {
  name: string;
  tagline: string;
  description: string;
  showVision?: boolean;
  visionTitle?: string;
}

export default function ProjectAbout({ 
  name, 
  tagline, 
  description, 
  showVision = true,
  visionTitle
}: ProjectAboutProps) {
  return (
    <section className="py-20 sm:py-24 bg-[#FDFCFB] relative overflow-hidden">
      {/* Background Soft Orbits / Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/10 w-[300px] h-[300px] bg-[#C5A059]/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/4 right-1/10 w-[400px] h-[400px] bg-[#052870]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column - Quote / Tagline */}
          {showVision && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] block mb-2 font-medium">
                The Vision
              </span>
              {visionTitle !== "" && (() => {
                const renderedTitle = visionTitle || (name === "Infogreen City" ? "A Township Designed for the Future" : `Crafting a Legacy at ${name}`);
                const isLongTitle = renderedTitle.length > 40;
                return (
                  <>
                    <h3 className={`font-clagio text-black font-semibold uppercase leading-[1.15] tracking-[0.02em] whitespace-pre-line ${
                      isLongTitle ? "text-2xl sm:text-3xl md:text-4xl" : "text-3xl sm:text-4xl md:text-5xl"
                    }`}>
                      {renderedTitle}
                    </h3>
                    <div className="h-[2px] w-16 bg-[#C5A059]/20 mt-6" />
                  </>
                );
              })()}

              <p className="mt-8 text-black/45 text-sm uppercase tracking-[0.25em] font-medium font-clagio leading-loose">
                &ldquo;Rooted in values, built for generations.&rdquo;
              </p>
            </motion.div>
          )}

          {/* Right Column - Deep Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className={
              showVision
                ? "lg:col-span-7 space-y-6 text-black/80 font-light text-base sm:text-lg leading-relaxed"
                : "lg:col-span-8 lg:col-start-3 space-y-6 text-black/80 font-light text-base sm:text-lg leading-relaxed"
            }
          >
            <p className="border-l-2 border-[#C5A059]/30 pl-6 md:pl-8 italic text-black/90 font-normal">
              {tagline}
            </p>
            <div className="pt-2 space-y-4 font-light text-base sm:text-lg leading-relaxed text-justify">
              {description.split("\n\n").map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>
            {showVision && name !== "Infogreen City" && name !== "Acre Bhoomi 1" && name !== "Acre Bhoomi 2" && name !== "Vasundhara" && (
              <p className="text-sm text-black/60 pt-4">
                Our developments combine the deep spiritual heritage of Odisha with premium construction methodologies, delivering not just homes but a secure environment for families to grow and thrive.
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

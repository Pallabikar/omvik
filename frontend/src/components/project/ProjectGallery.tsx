"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  name: string;
}

export default function ProjectGallery({ images, name }: ProjectGalleryProps) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 text-center md:text-left">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] block mb-2 font-medium">
            Visual Exploration
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-clagio text-black font-semibold">
            Project Gallery
          </h2>
          <div className="h-[2px] w-12 bg-[#C5A059]/20 mt-3 mx-auto md:mx-0" />
        </div>

        {/* Premium Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[450px] sm:h-[550px] md:h-[600px] overflow-hidden rounded-3xl">
          {/* Main Large Image (Left) */}
          {images[0] && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={() => openLightbox(0)}
              className={`relative ${
                images.length > 1 ? "md:col-span-7" : "md:col-span-12"
              } h-full w-full group overflow-hidden cursor-pointer`}
            >
              <Image
                src={images[0]}
                alt={`${name} Architectural Perspective`}
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <Maximize2 size={16} />
                </div>
              </div>
            </motion.div>
          )}

          {/* Side Stacked Images (Right) */}
          {images.length > 1 && (
            <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-4 h-full">
              {images.slice(1, 4).map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15 * (i + 1) }}
                  onClick={() => openLightbox(i + 1)}
                  className="relative h-full w-full group overflow-hidden cursor-pointer rounded-2xl md:rounded-none"
                >
                  <Image
                    src={img}
                    alt={`${name} Detail ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                      <Maximize2 size={14} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal Overlay */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100020] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Prev Button */}
            <button
              onClick={prevImage}
              className="absolute left-6 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Main Lightbox Image */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeImageIndex]}
                alt={`${name} Large View`}
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-6 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 text-white/60 text-xs tracking-widest uppercase">
              {activeImageIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

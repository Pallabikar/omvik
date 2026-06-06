"use client";

import { motion } from "framer-motion";
import { MapPin, Compass } from "lucide-react";

interface NearbyPlace {
  place: string;
  distance: string;
}

interface ProjectLocationProps {
  locationName: string;
  googleMapUrl: string;
  googleMapExternalUrl?: string;
  nearbyPlaces: NearbyPlace[];
}

export default function ProjectLocation({
  locationName,
  googleMapUrl,
  googleMapExternalUrl,
  nearbyPlaces,
}: ProjectLocationProps) {
  return (
    <section className="py-16 sm:py-20 bg-[#FDFCFB] border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 text-center md:text-left">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] block mb-2 font-medium">
            Strategic Proximity
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-clagio text-black font-semibold">
            Location & Connectivity
          </h2>
          <div className="h-[2px] w-12 bg-[#C5A059]/20 mt-3 mx-auto md:mx-0" />
        </div>
 
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Timeline / Highlights of Nearby Places */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <MapPin className="text-[#C5A059] shrink-0" size={18} />
              {googleMapExternalUrl ? (
                <a
                  href={googleMapExternalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-clagio tracking-wider text-black/70 hover:text-[#C5A059] transition-colors underline decoration-[#C5A059]/30 underline-offset-4"
                >
                  {locationName}
                </a>
              ) : (
                <span className="text-sm font-clagio tracking-wider text-black/70">
                  {locationName}
                </span>
              )}
            </div>

            <div className="space-y-6 relative pl-6 border-l border-[#C5A059]/20 ml-2">
              {nearbyPlaces.map((place, index) => (
                <div key={index} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[30px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#FDFCFB] border-2 border-[#C5A059] flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-black/50 block font-clagio">
                      {place.distance} away
                    </span>
                    <span className="text-base font-clagio text-black font-medium block mt-0.5">
                      {place.place}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Embedded Google Map Frame */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 h-[350px] sm:h-[400px] lg:h-auto min-h-[350px] rounded-3xl overflow-hidden shadow-lg border border-black/5 relative"
          >
            <iframe
              src={googleMapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Project Location Map"
              className="absolute inset-0 grayscale-[40%] hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

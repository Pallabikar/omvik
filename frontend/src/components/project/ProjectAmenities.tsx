"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Droplets,
  Zap,
  PhoneCall,
  Trees,
  Navigation,
  Compass,
  Activity,
  Smile,
  CloudRain,
  Flame,
  ArrowUpDown,
  Lock,
  Waves,
  ShieldAlert,
  Footprints,
  Settings,
  Leaf,
  Cloud,
  Mic,
  Heart,
  Users,
  Sun,
  HelpCircle,
  LucideIcon,
  Milestone,
  Landmark,
  Anchor,
  Dumbbell,
  Sofa,
  Film,
  Lightbulb,
  Fish,
  Binoculars,
  Gamepad2,
  Wind
} from "lucide-react";

// Safe mapping of icon names to components
const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  Droplets,
  Zap,
  PhoneCall,
  Trees,
  Navigation,
  Compass,
  Activity,
  Smile,
  CloudRain,
  FlameKindling: Flame, // fallback to Flame
  Flame,
  ArrowUpDown,
  Lock,
  Waves,
  ShieldAlert,
  Footprints,
  Settings,
  Leaf,
  Cloud,
  Mic,
  Heart,
  Users,
  Sun,
  Gate: Lock, // fallback to Lock
  Milestone,
  Landmark,
  Anchor,
  Dumbbell,
  Sofa,
  Film,
  Lightbulb,
  Fish,
  Binoculars,
  Gamepad2,
  Wind
};

interface Amenity {
  name: string;
  icon: string;
}

interface ProjectAmenitiesProps {
  amenities: Amenity[];
  subtitle?: string;
}

export default function ProjectAmenities({ amenities, subtitle }: ProjectAmenitiesProps) {
  return (
    <section className="py-16 sm:py-20 bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A059] block mb-2 font-medium">
            Lifestyle & Comfort
          </span>
          {subtitle && (
            <span className="text-[11px] uppercase tracking-[0.2em] text-black/50 block mb-2 font-medium">
              {subtitle}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-clagio text-black font-semibold">
            Features & Amenities
          </h2>
          <div className="h-[2px] w-12 bg-[#C5A059]/20 mt-3 mx-auto" />
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {amenities.map((amenity, index) => {
            const IconComponent = iconMap[amenity.icon] || HelpCircle;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                whileHover={{ scale: 1.05, borderColor: "rgba(197, 160, 89, 0.3)" }}
                className="flex flex-col items-center justify-center text-center p-6 bg-white border border-black/5 rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center mb-4 transition-colors group-hover:bg-[#C5A059] group-hover:text-white">
                  <IconComponent size={20} />
                </div>
                <span className="text-xs font-clagio font-medium text-black/75 tracking-wider leading-snug">
                  {amenity.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

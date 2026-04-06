"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SECTIONS = [
  { path: "/", label: "Hero" },
  { path: "/services", label: "Services" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

export default function SectionNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const currentIndex = SECTIONS.findIndex((s) => s.path === pathname);

  if (currentIndex === -1) return null;

  const prevIndex = (currentIndex - 1 + SECTIONS.length) % SECTIONS.length;
  const nextIndex = (currentIndex + 1) % SECTIONS.length;

  return (
    <div className="fixed inset-y-0 left-0 right-0 pointer-events-none z-[80] flex items-center justify-between px-4 md:px-10">

      {/* LEFT BUTTON */}
      <NavButton
        direction="left"
        label={SECTIONS[prevIndex].label}
        onClick={() => router.push(SECTIONS[prevIndex].path)}
      />

      {/* RIGHT BUTTON */}
      <NavButton
        direction="right"
        label={SECTIONS[nextIndex].label}
        onClick={() => router.push(SECTIONS[nextIndex].path)}
      />
    </div>
  );
}

interface NavButtonProps {
  direction: "left" | "right";
  label: string;
  onClick: () => void;
}

function NavButton({ direction, label, onClick }: NavButtonProps) {
  const isLeft = direction === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      className="pointer-events-auto relative"
    >
      {/* BUTTON */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        className="relative group flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-full backdrop-blur-xl border border-white/10 overflow-hidden opacity-40 sm:opacity-100 hover:opacity-100 transition-opacity"
        style={{
          background:
            "linear-gradient(135deg, rgba(252,77,0,0.15), rgba(5,40,112,0.2))",
        }}
      >
        {/* GLOW ANIMATION */}
        <motion.div
          animate={{ opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-[#FC4D00]/20 to-[#052870]/20 blur-xl"
        />

        {/* ICON */}
        {isLeft ? (
          <ChevronLeft className="w-6 h-6 text-[#FC4D00]" />
        ) : (
          <ChevronRight className="w-6 h-6 text-[#FC4D00]" />
        )}

        {/* LABEL → CHANGED TO DEEP BLUE */}
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#052870] hidden md:block">
          {label}
        </span>

        {/* HOVER LINE */}
        <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#FC4D00] group-hover:w-full transition-all duration-500" />
      </motion.button>
    </motion.div>
  );
}
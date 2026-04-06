"use client";

import { motion } from "framer-motion";
import KonarkChakra from "@/components/KonarkChakra";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#FDFCFB] overflow-hidden">
      {/* Background soft glow */}
      <motion.div
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-br from-[#fc4d00]/5 via-transparent to-[#052870]/5 blur-3xl pointer-events-none"
      />

      <div className="relative flex flex-col items-center">
        {/* Branded Chakra Loader */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="relative w-32 h-32 md:w-40 md:h-40 opacity-20"
        >
          <KonarkChakra size={160} color="#000" />
        </motion.div>
        
        {/* Inner small spinner for active feel */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-t-2 border-[#fc4d00] rounded-full"
        />
        
        {/* Loading text with heritage feel */}
        <div className="mt-12 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0.4, 1, 0.4], y: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-black/60 text-[10px] tracking-[0.6em] uppercase font-clagio font-medium"
          >
            Establishing Connection
          </motion.p>
          <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 1 }}
             className="mt-2 text-black/20 text-[8px] tracking-[0.2em] uppercase font-clagio"
          >
             Custodians of Legacy
          </motion.p>
        </div>
      </div>
      
      {/* Top progress bar with branded gradient */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#fc4d00]/40 to-transparent origin-center"
      />
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import KonarkChakra from "./KonarkChakra";

const ChakraInstance = ({ 
  size = 600, 
  top = "20%", 
  left = "auto", 
  right = "auto",
  rotateDuration = 30,
  parallaxSpeed = 0.2,
  opacityValue = 0.05,
  reverse = false
}) => {
  const { scrollY } = useScroll();
  
  // Parallax movement
  const y = useTransform(scrollY, [0, 5000], [0, 5000 * parallaxSpeed]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{
        position: "fixed",
        top,
        left,
        right,
        width: size,
        height: size,
        y: springY,
        pointerEvents: "none",
        zIndex: 50, // On top of backgrounds, but faint
        willChange: "transform",
        opacity: opacityValue,
      }}
    >
      <motion.div
        animate={rotateDuration > 0 ? { rotate: reverse ? -360 : 360 } : {}}
        transition={{ 
          duration: rotateDuration, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="w-full h-full"
        style={{ mixBlendMode: "multiply" }}
      >
        <KonarkChakra size={size} />
      </motion.div>
    </motion.div>
  );
};

export default function ChakraBackground() {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(800);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowHeight(window.innerHeight);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Show from ProcessSection onwards (Approx 1.8 * windowHeight)
  const opacity = useTransform(
    scrollY, 
    [windowHeight * 1.8, windowHeight * 2.4], 
    [0, 1]
  );

  if (!mounted) return null;

  return (
    <motion.div 
      style={{ opacity }}
      className="fixed inset-0 pointer-events-none z-0"
    >
      {/* 1. Large background chakra - Mid Right */}
      <ChakraInstance 
        size={isMobile ? 400 : 800} 
        top="15%" 
        right={isMobile ? "-20%" : "-10%"} 
        rotateDuration={isMobile ? 0 : 40} // Disable rotation on mobile
        parallaxSpeed={isMobile ? 0.05 : 0.15}
        opacityValue={isMobile ? 0.04 : 0.08}
      />
      
      {/* 2. Medium chakra - Mid Left - Hidden on very small screens */}
      {!isMobile && (
        <ChakraInstance 
          size={500} 
          top="45%" 
          left="-5%" 
          rotateDuration={25} 
          parallaxSpeed={0.25}
          opacityValue={0.06}
          reverse={true}
        />
      )}
      
      {/* 3. Small chakra - Lower Right - Repositioned for mobile */}
      <ChakraInstance 
        size={isMobile ? 250 : 400} 
        top={isMobile ? "65%" : "75%"} 
        right={isMobile ? "-10%" : "5%"} 
        rotateDuration={isMobile ? 0 : 35} // Disable rotation on mobile
        parallaxSpeed={isMobile ? 0.03 : 0.1}
        opacityValue={isMobile ? 0.03 : 0.05}
      />
    </motion.div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import IntroLoader from "@/components/IntroLoader";
import Hero from "@/components/Hero";
import AboutOverview from "@/components/AboutOverview";
import ServicesGrid from "@/components/ServicesGrid";
import ProcessSection from "@/components/ProcessSection";

let introHasPlayedGlobal = false;

export default function Home() {
  const [introFinished, setIntroFinished] = useState(introHasPlayedGlobal);
  const [showIntro, setShowIntro] = useState(!introHasPlayedGlobal);



  const handleIntroFinish = () => {
    setIntroFinished(true);
    setShowIntro(false);
    introHasPlayedGlobal = true;
  };

  return (
    <main className="w-full flex-col min-h-screen bg-[#FDFCFB] overflow-x-hidden">
      {showIntro && (
        <IntroLoader onFinish={handleIntroFinish} />
      )}

      {/* Hide the main content's interactivity/scroll until intro is done */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={introFinished ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full ${introFinished ? "pointer-events-auto" : "pointer-events-none h-screen overflow-hidden"}`}
      >
        <Hero />
        <AboutOverview />
        <ProcessSection />
        <ServicesGrid />
      </motion.div>
    </main>
  );
}

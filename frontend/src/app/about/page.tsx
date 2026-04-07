"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo, ReactNode } from "react";

/* ================== FALLBACK COMPONENTS ================== */
function MagneticCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`${className} transition-transform duration-300 hover:scale-[1.03]`}>
      {children}
    </div>
  );
}

function GoldParticles({ count = 10 }: { count?: number }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map(() => ({
      y: -20 - Math.random() * 30,
      x: (Math.random() - 0.5) * 40,
      left: `${Math.random() * 100}%`,
    }));
  }, [count]);

  return (
    <>
      {particles.map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: p.y,
            x: p.x,
          }}
          transition={{ duration: 1.2, delay: i * 0.05 }}
          className="absolute w-[3px] h-[3px] bg-[#fc4d00] rounded-full"
          style={{
            bottom: "10%",
            left: p.left,
          }}
        />
      ))}
    </>
  );
}

/* ================== TYPES ================== */
type TeamMember = {
  name: string;
  role: string;
  bio: string;
  img: string;
};

/* ================== DATA ================== */
const teamMembers: TeamMember[] = [
  {
    name: "Bhabani Sankar Mohapatra",
    role: "Legal Consultant",
    bio: "Believes that trust is the true foundation of every property journey.",
    img: "/images/member5.jpeg",
  },
  {
    name: "Er. Nirmal Mohapatra",
    role: "Chief Engineer",
    bio: "Sees every customer interaction as an opportunity to create a lasting relationship.",
    img: "/images/member4.jpeg",
  },
  
  {
    name: "Aparna Tripathy",
    role: "Managing Director",
    bio: "Works with the vision that the right guidance changes the entire buying experience.",
    img: "/images/member1.jpeg",
  },
  {
    name: "Pratyush Kumar Rath",
    role: "Director of Strategy",
    bio: "Values honesty, clarity, and commitment above everything in the journey.",
    img: "/images/member6.jpeg",
  },
  {
    name: "Biswajit Nayak",
    role: "Director of Operations",
    bio: "Measures success through customer happiness, not just numbers.",
    img: "/images/member3.jpeg",
  },
];

/* ================== TEAM CARD ================== */
function TeamCard({ member, index, isMobile }: { member: TeamMember; index: number, isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, filter: "blur(8px)", scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      transition={{ duration: 1.1, delay: index * 0.13 }}
      viewport={{ once: true }}
    >
      <MagneticCard className="flex flex-col cursor-pointer">
        <div
          className="relative overflow-hidden mb-7"
          style={{ aspectRatio: "3/4", borderRadius: "4px 28px 4px 28px" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onTouchStart={() => setHovered(true)}
          onTouchEnd={() => setTimeout(() => setHovered(false), 600)}
        >
          <div
            className="absolute inset-0 z-10 transition-opacity duration-500"
            style={{
              background:
                "linear-gradient(to top, rgba(249,246,241,0.95) 0%, rgba(252,77,0,0.22) 45%, transparent 70%)",
              opacity: hovered ? 1 : 0,
            }}
          />

          <div
            className="absolute inset-0 z-20"
            style={{
              background:
                "linear-gradient(120deg, transparent 0%, rgba(252,77,0,0.18) 50%, transparent 100%)",
              transform: hovered ? "translateX(100%)" : "translateX(-100%)",
              transition: "transform 0.9s ease",
            }}
          />

          <Image
            src={member.img}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 320px"
            className="object-cover"
            style={{
              filter: hovered ? "none" : "grayscale(80%)",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "all 0.8s ease",
            }}
          />

          {/* Particles - disabled on mobile */}
          {!isMobile && hovered && <GoldParticles />}
        </div>

        <div className="px-1 space-y-2">
          <h4 className="text-[#fc4d00] font-bold text-lg">{member.name}</h4>

          <motion.div
            animate={{ width: hovered ? 64 : 24 }}
            className="h-[2px] bg-gradient-to-r from-[#fc4d00] to-transparent"
          />

          <p className="text-xs text-black/60 leading-relaxed">
            {member.bio}
          </p>
        </div>
      </MagneticCard>
    </motion.div>
  );
}

/* ================== PAGE ================== */
export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main className="bg-[#f9f6f1] text-[#1a1a1a]">

      {/* 🔥 ROTATING KONARK CHAKRA — always shown, size adjusted for mobile */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
      >
        <div className={`opacity-20 ${isMobile ? "w-[280px]" : "w-[600px]"}`}>
          <Image src="/images/konark-chakra.png" alt="chakra" width={900} height={900} />
        </div>
      </motion.div>

      {/* 🔥 HERO */}
      <section className="py-20 sm:py-24 md:py-32 text-center relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide flex flex-col items-center gap-4">
            {[["OUR", "STORY."], ["YOUR", "LEGACY."]].map((line, lineIndex) => (
              <div key={lineIndex} className="flex gap-4 flex-wrap justify-center">
                {line.map((word, i) => {
                  const delay = lineIndex * 0.6 + i * 0.3;
                  return (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay,
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="relative inline-block overflow-hidden"
                    >
                      <span className="relative z-10 text-black">
                        {word}
                      </span>

                      <motion.span
                        initial={{ x: "-120%" }}
                        animate={{ x: "120%" }}
                        transition={{
                          delay,
                          duration: 1,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fc4d00]/60 to-transparent blur-[6px]"
                      />
                    </motion.span>
                  );
                })}
              </div>
            ))}
          </h1>

          <div className="max-w-4xl mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-24">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                At OMVIK, we do more than develop spaces. We shape legacies that live across generations.
                Inspired by the timeless spirit and cultural richness of Odisha, we create environments that offer more than shelter. They offer a true sense of belonging.
              </p>

              <p className="text-lg leading-relaxed">
                Every project is guided by a deeper purpose. To bring harmony between modern living and rooted values.
                Land is not just an asset — it is sacred ground where dreams take form.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="pt-10 pb-20 sm:pb-24 px-6 max-w-6xl mx-auto">
      <h2 className="text-center text-2xl sm:text-3xl md:text-4xl mb-12 uppercase tracking-[0.2em] font-extrabold">
  The People Behind the Promise.
</h2>


        <div className="flex flex-wrap justify-center gap-8 sm:gap-10 md:gap-12">
          {teamMembers.map((member, i) => (
            <div key={i} className="w-full sm:w-[calc(50%-1.25rem)] md:w-[calc(33.333%-2rem)] max-w-[320px]">
              <TeamCard member={member} index={i} isMobile={isMobile} />
            </div>
          ))}
        </div>





{/* 🔥 TEAM’S MESSAGE – FLOATING ANTI-GRAVITY */}
<section className="relative px-6 py-24 flex justify-center items-center overflow-hidden">

  {/* 🌌 Ambient Glow Background */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    <motion.div
      className="absolute w-[400px] h-[400px] bg-[#fc4d00]/20 rounded-full blur-[120px]"
      animate={{
        x: [0, 80, -60, 0],
        y: [0, -60, 50, 0],
      }}
      transition={{
        duration: 14,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  </div>

  {/* 💎 Floating Message Box */}
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    animate={{
      y: [0, -15, 10, -10, 0],     // floating up-down
      x: [0, 10, -10, 5, 0],       // slight side movement
      rotate: [0, 0.5, -0.5, 0],   // subtle tilt (premium feel)
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    viewport={{ once: true }}
    className="relative z-10 max-w-3xl bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-xl border border-[#fc4d00]/30 shadow-2xl rounded-[28px] p-8 md:p-14 text-center"
  >
    <h2 className="text-2xl md:text-3xl font-extrabold mb-6 tracking-wide">
      TEAM’S MESSAGE
    </h2>

    <p className="text-black/70 leading-relaxed mb-5">
      At OMVIK, we are guided by a shared belief that real estate is about people, trust, and the journeys we become part of.
      Every client becomes a part of our story, and every space reflects our collective commitment.
    </p>

    <p className="text-black/70 leading-relaxed">
      As a team, we work with one purpose. To make your experience seamless, your investment secure, and your vision a reality.
      When you choose OMVIK, you choose a team that stands beside you at every step, building relationships that last for years to come.
    </p>
  </motion.div>
</section>
           
 
      </section>
</main>
  );
}

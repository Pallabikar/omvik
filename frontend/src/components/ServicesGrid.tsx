"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import NextImage from "next/image";
import {
  ArrowRight,
  MapPin,
  Building,
  Home,
  Briefcase,
  Trees,
  LayoutDashboard,
} from "lucide-react";
import { useRef } from "react";

const services = [
  {
    id: "plots",
    title: "Plots",
    icon: <Trees size={32} />,
    description: "Prime land for future growth.",
    href: "/services/plots",
  },
  {
    id: "townships",
    title: "Townships",
    icon: <LayoutDashboard size={32} />,
    description: "Planned communities for modern living.",
    href: "/services/townships",
  },
  {
    id: "apartments",
    title: "Apartments",
    icon: <Building size={32} />,
    description: "Smart homes for urban lifestyles.",
    href: "/services/apartments",
  },
  {
    id: "duplex",
    title: "Duplexes",
    icon: <Home size={32} />,
    description: "Spacious homes with private comfort.",
    href: "/services/duplex",
  },
  {
    id: "simplex",
    title: "Simplexes",
    icon: <MapPin size={32} />,
    description: "Elegant single-floor living.",
    href: "/services/simplex",
  },
  {
    id: "commercial",
    title: "Commercial",
    icon: <Briefcase size={32} />,
    description: "Spaces built for business success.",
    href: "/services/commercial",
  },
];

export default function ServicesScroller() {
  const loopServices = [...services, ...services];

  return (
    <section className="relative w-full py-28 overflow-hidden bg-[#FDFCFB]">
      <div className="max-w-7xl mx-auto px-6 text-center mb-20">

        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-clagio text-black tracking-wide overflow-hidden"
        >
          <span className="inline-block overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              THE OMVIK COLLECTION
            </motion.span>
          </span>
        </motion.h2>

        {/* PARAGRAPH */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.04 }}
          className="mt-6 text-black/60 text-lg max-w-3xl mx-auto leading-relaxed"
        >
          {`At OMVIK, every space is thoughtfully envisioned to reflect purpose and long-term value. From residential communities to commercial landmarks, our developments are designed to enhance lifestyles while offering enduring investment potential.`
            .split(" ")
            .map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4 }}
                className="inline-block mr-1"
              >
                {word}
              </motion.span>
            ))}
        </motion.p>
      </div>

      {/* SCROLLER */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6 md:gap-10 w-max pb-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear",
          }}
        >
          {loopServices.map((service, i) => (
            <Card key={i} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Card({ service }: { service: typeof services[0] }) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 15 });

  const rotateX = useTransform(smoothY, [-150, 150], [10, -10]);
  const rotateY = useTransform(smoothX, [-150, 150], [-10, 10]);



  function handleMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  function handleLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <Link href={service.href}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.08 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className="relative w-[280px] sm:w-[320px] h-[340px] sm:h-[380px] rounded-3xl overflow-hidden group cursor-pointer"
      >

        {/* IMAGE */}
        <motion.div
          style={{
            translateX: smoothX,
            translateY: smoothY,
          }}
          className="absolute inset-0"
        >
          <NextImage
            src={`/images/services/${service.id}.png`}
            alt={service.title}
            fill
            sizes="(max-width: 640px) 280px, 320px"
            className="object-cover scale-110 group-hover:scale-100 transition duration-[1600ms]"
          />
        </motion.div>

        {/* OVERLAY */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
          animate={{
            background: [
              "linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.4), transparent)",
              "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.6), transparent)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
        />

        {/* CONTENT */}
        <motion.div
          style={{
            translateX: useTransform(smoothX, [-100, 100], [-10, 10]),
            translateY: useTransform(smoothY, [-100, 100], [-10, 10]),
          }}
          className="relative z-10 h-full flex flex-col justify-end p-8"
        >
          <motion.div
            whileHover={{ scale: 1.3, rotate: 8 }}
            className="text-white mb-4"
          >
            {service.icon}
          </motion.div>

          {/* TITLE */}
          <h3 className="text-3xl text-white font-clagio mb-2 tracking-wide">
            {service.title}
          </h3>

          {/* ✅ ADDED SPACE HERE */}
          <p className="text-white/70 text-sm mt-3 mb-6">
            {service.description}
          </p>

          <motion.div
            whileHover={{ x: 6 }}
            className="flex items-center text-xs tracking-[0.3em] uppercase text-white/60 group-hover:text-white"
          >
            Explore
            <ArrowRight className="ml-2" size={14} />
          </motion.div>
        </motion.div>

        {/* BORDER GLOW */}
        <motion.div
          className="absolute inset-0 rounded-3xl border border-white/10"
          animate={{
            boxShadow: [
              "0 0 10px rgba(255,255,255,0.05)",
              "0 0 30px rgba(255,255,255,0.15)",
              "0 0 10px rgba(255,255,255,0.05)",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>
    </Link>
  );
}
"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  text: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  { text: "OMVIK transformed our land into a premium investment opportunity.", name: "Ramesh Patnaik", role: "Land Owner, Odisha" },
  { text: "Professional, transparent, and absolutely reliable from day one.", name: "Sunita Dash", role: "Investor, Bhubaneswar" },
  { text: "A seamless experience from start to finish. They handled everything.", name: "Anil Kumar", role: "Property Owner" },
  { text: "Highly recommended for landowners seeking serious developers.", name: "Priya Mohanty", role: "Commercial Partner" },
  { text: "They truly understand the heritage and value of our properties.", name: "Dr. S. Mishra", role: "Estate Owner" },
  { text: "Working with OMVIK gave us complete peace of mind. Excellent yields.", name: "Vikram Singh", role: "NRI Investor" },
  { text: "Their vision for development aligns perfectly with sustainable growth.", name: "Anita Rao", role: "Land Owner, Cuttack" },
  { text: "OMVIK helped us unlock the true maximum value of our ancestral land.", name: "Rajesh Sahu", role: "Agricultural Landowner" },
  { text: "The entire process was smooth, and legalities were crystal clear.", name: "Niharika Pradhan", role: "Business Owner" },
  { text: "A trustworthy partner in real estate. We couldn't be happier.", name: "Suresh Das", role: "Joint Venture Partner" },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(((index % testimonials.length) + testimonials.length) % testimonials.length);
    setAnimKey((k) => k + 1);
  }, []);

  const nextSlide = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prevSlide = () => goTo(currentIndex - 1);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 4500);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  return (
    <section className="w-full py-16 md:py-24" style={{ background: "#F9F6F1" }}>
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <p
            className="font-poppins text-xs uppercase tracking-[0.18em] mb-4"
            style={{ color: "#B8916A" }}
          >
            Client Testimonials
          </p>
          <h2
            className="font-playfair text-4xl md:text-5xl font-normal"
            style={{ color: "#1C1812" }}
          >
            Voices of{" "}
            <span className="italic" style={{ color: "#C5A059" }}>
              Trust
            </span>
          </h2>
          <div
            className="w-12 h-px mx-auto mt-5"
            style={{ background: "#C5A059", opacity: 0.5 }}
          />
        </div>

        {/* Card */}
        <div className="relative max-w-3xl mx-auto">
          <div
            key={animKey}
            className="relative bg-white rounded-2xl px-10 md:px-16 py-14 text-center transition-shadow duration-300 hover:shadow-lg"
            style={{ border: "1px solid rgba(197,160,89,0.18)", animation: "fadeUp 0.45s ease both" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Decorative quote mark */}
            <span
              className="font-playfair absolute top-2 left-8 leading-none select-none pointer-events-none"
              style={{ fontSize: 96, color: "#C5A059", opacity: 0.15 }}
            >
              &ldquo;
            </span>

            {/* Quote text */}
            <p
              className="font-playfair italic text-xl md:text-2xl leading-relaxed mb-10 relative z-10"
              style={{ color: "#2C2418" }}
            >
              {testimonials[currentIndex].text}
            </p>

            {/* Author */}
            <div className="w-8 h-px mx-auto mb-5" style={{ background: "#C5A059" }} />
            <p
              className="font-poppins font-semibold text-sm tracking-wide mb-1"
              style={{ color: "#1C1812" }}
            >
              {testimonials[currentIndex].name}
            </p>
            <p
              className="font-poppins text-[11px] uppercase tracking-widest"
              style={{ color: "#B8916A" }}
            >
              {testimonials[currentIndex].role}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prevSlide}
              aria-label="Previous"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ border: "1px solid rgba(197,160,89,0.35)", color: "#C5A059", background: "transparent" }}
              onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "#C5A059"; b.style.color = "#fff"; }}
              onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = "#C5A059"; }}
            >
              <ChevronLeft size={16} strokeWidth={2} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="rounded-full transition-all duration-300"
                  style={{
                    height: 5,
                    width: i === currentIndex ? 22 : 5,
                    background: i === currentIndex ? "#C5A059" : "#D9CEBD",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next"
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ border: "1px solid rgba(197,160,89,0.35)", color: "#C5A059", background: "transparent" }}
              onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "#C5A059"; b.style.color = "#fff"; }}
              onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = "#C5A059"; }}
            >
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Name strip (hidden on mobile) */}
        <div
          className="hidden md:grid mt-14"
          style={{
            gridTemplateColumns: `repeat(${testimonials.length}, 1fr)`,
            borderTop: "1px solid rgba(197,160,89,0.12)",
            borderBottom: "1px solid rgba(197,160,89,0.12)",
          }}
        >
          {testimonials.map((t, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="py-5 px-3 text-center transition-colors duration-200 cursor-pointer"
              style={{
                background: i === currentIndex ? "rgba(197,160,89,0.06)" : "transparent",
                borderRight: i < testimonials.length - 1 ? "1px solid rgba(197,160,89,0.12)" : "none",
                outline: "none",
              }}
            >
              <p className="font-poppins font-semibold text-[11px] mb-0.5" style={{ color: "#1C1812" }}>
                {t.name.split(" ")[0]}
              </p>
              <p className="font-poppins text-[10px] uppercase tracking-wider" style={{ color: "#B8916A" }}>
                {t.role.split(",")[0]}
              </p>
              <div
                className="w-1 h-1 rounded-full mx-auto mt-1.5 transition-opacity duration-200"
                style={{ background: "#C5A059", opacity: i === currentIndex ? 1 : 0 }}
              />
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
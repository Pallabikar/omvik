"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plus, Minus } from "lucide-react";

interface Testimonial {
  text: string;
  name: string;
  role: string;
}

interface FAQ {
  question: string;
  answer: string;
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

const faqs: FAQ[] = [
  {
    question: "What types of land does OMVIK partner with?",
    answer: "OMVIK works with a wide range of land parcels — agricultural land, ancestral estates, urban plots, and commercial land across Odisha. Whether your land is in the heart of Bhubaneswar or in a developing corridor, we evaluate its potential and tailor a development strategy to maximise its value.",
  },
  {
    question: "How does the joint venture process work?",
    answer: "Our joint venture model is simple and landowner-friendly. Once we assess your land, we structure a legally sound partnership agreement that clearly defines revenue sharing, development timelines, and each party's responsibilities. You retain ownership throughout the process while we handle all planning, construction, and marketing.",
  },
  {
    question: "Is there any upfront cost for landowners?",
    answer: "No. Landowners do not bear any development cost. OMVIK invests the capital required for design, approvals, construction, and sales. Your contribution is the land itself — we handle everything else and share returns upon project completion.",
  },
  {
    question: "How long does a typical development project take?",
    answer: "Project timelines vary based on land size, type, and regulatory approvals. Residential plotted developments typically take 12–24 months, while larger mixed-use or commercial projects may take 24–48 months. We provide a transparent timeline at the outset and keep you updated at every milestone.",
  },
  {
    question: "How are profits shared between OMVIK and the landowner?",
    answer: "Profit-sharing ratios are negotiated based on land location, size, and market potential. We ensure the agreement is fair, legally documented, and registered. Our goal is a mutually rewarding partnership, and our track record reflects the returns we have delivered to our landowner partners.",
  },
  {
    question: "Can NRIs or landowners outside Odisha partner with OMVIK?",
    answer: "Absolutely. We work with NRIs and landowners across India and abroad. All documentation, approvals, and communication can be managed digitally and through authorised representatives. We ensure full compliance with FEMA and other applicable regulations for NRI partnerships.",
  },
  {
    question: "How does OMVIK ensure legal transparency?",
    answer: "Every agreement is drafted by qualified legal professionals, duly stamped, and registered with relevant authorities. We conduct a thorough title due diligence before entering any partnership, and landowners receive clear documentation of all approvals, encumbrances, and transactions at every stage.",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* ── Testimonials ─────────────────────────────────────── */}
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
              <span
                className="font-playfair absolute top-2 left-8 leading-none select-none pointer-events-none"
                style={{ fontSize: 96, color: "#C5A059", opacity: 0.15 }}
              >
                &ldquo;
              </span>

              <p
                className="font-playfair italic text-xl md:text-2xl leading-relaxed mb-10 relative z-10"
                style={{ color: "#2C2418" }}
              >
                {testimonials[currentIndex].text}
              </p>

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
                suppressHydrationWarning
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ border: "1px solid rgba(197,160,89,0.35)", color: "#C5A059", background: "transparent" }}
                onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "#C5A059"; b.style.color = "#fff"; }}
                onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = "#C5A059"; }}
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </button>

              <div className="flex items-center gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Slide ${i + 1}`}
                    suppressHydrationWarning
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
                suppressHydrationWarning
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                style={{ border: "1px solid rgba(197,160,89,0.35)", color: "#C5A059", background: "transparent" }}
                onMouseEnter={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "#C5A059"; b.style.color = "#fff"; }}
                onMouseLeave={(e) => { const b = e.currentTarget as HTMLButtonElement; b.style.background = "transparent"; b.style.color = "#C5A059"; }}
              >
                <ChevronRight size={16} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Name strip */}
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
          @keyframes faqOpen {
            from { opacity: 0; transform: translateY(-6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="w-full py-16 md:py-24" style={{ background: "#FFFFFF" }}>
        <div className="max-w-3xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-14">
            <p
              className="font-poppins text-xs uppercase tracking-[0.18em] mb-4"
              style={{ color: "#B8916A" }}
            >
              Got Questions?
            </p>
            <h2
              className="font-playfair text-4xl md:text-5xl font-normal"
              style={{ color: "#1C1812" }}
            >
              Frequently Asked{" "}
              <span className="italic" style={{ color: "#C5A059" }}>
                Questions
              </span>
            </h2>
            <div
              className="w-12 h-px mx-auto mt-5"
              style={{ background: "#C5A059", opacity: 0.5 }}
            />
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  border: openFaq === i
                    ? "1px solid rgba(197,160,89,0.45)"
                    : "1px solid rgba(197,160,89,0.18)",
                  background: openFaq === i ? "rgba(197,160,89,0.04)" : "#FFFFFF",
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between gap-4 text-center px-7 py-5 transition-colors duration-200"
                  style={{ background: "transparent", outline: "none" }}
                >
                  <span
                    className="font-poppins font-semibold text-[15px] leading-snug"
                    style={{ color: "#1C1812" }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      background: openFaq === i ? "#C5A059" : "transparent",
                      border: openFaq === i ? "1px solid #C5A059" : "1px solid rgba(197,160,89,0.35)",
                      color: openFaq === i ? "#FFFFFF" : "#C5A059",
                    }}
                  >
                    {openFaq === i
                      ? <Minus size={13} strokeWidth={2.5} />
                      : <Plus size={13} strokeWidth={2.5} />
                    }
                  </span>
                </button>

                {/* Answer */}
                {openFaq === i && (
                  <div
                    className="px-7 pb-6"
                    style={{ animation: "faqOpen 0.3s ease both" }}
                  >
                    <div
                      className="w-8 h-px mb-4 mx-auto"
                      style={{ background: "#C5A059", opacity: 0.4 }}
                    />
                    <p
                      className="font-poppins text-sm leading-relaxed text-center"
                      style={{ color: "#4A3F32" }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-14">
            <p
              className="font-poppins text-sm mb-5"
              style={{ color: "#7A6A58" }}
            >
              Still have questions? We&rsquo;re happy to help.
            </p>
            <a
              href="/contact"
              className="inline-block font-poppins text-xs uppercase tracking-[0.18em] px-8 py-3 rounded-full transition-all duration-300"
              style={{
                border: "1px solid #C5A059",
                color: "#C5A059",
                background: "transparent",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#C5A059";
                el.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "transparent";
                el.style.color = "#C5A059";
              }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
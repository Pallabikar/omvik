"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, CheckCircle2, Loader2 } from "lucide-react";
import api from "@/utils/api";
import { toast } from "react-hot-toast";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const smooth = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    budgetRange: "",
    purchaseTimeline: "",
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      await api.post("/contact", formData);
      setStatus("success");
      toast.success("Inquiry sent successfully");

      setTimeout(() => {
        setStatus("idle");
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
          budgetRange: "",
          purchaseTimeline: "",
        });
      }, 5000);
    } catch (error: unknown) {
      setStatus("error");
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "Failed to send inquiry");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-[#FDFCFB] to-[#f5f3ef] relative overflow-hidden">
      {!isMobile && (
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#fc4d00]/10 blur-[120px] rounded-full" />
      )}

      <div className="pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-40 sm:pb-32 lg:pb-24 px-6 max-w-7xl mx-auto relative z-10">

        {/* HERO */}
        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-clagio text-black text-center mb-16 leading-[1.05]"
        >
          <span className="block text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-medium">
            Build Your Future.
          </span>

          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="block mt-2 text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-black/70"
          >
            Honor Your Past.
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-center text-black/70 mb-10 sm:mb-16 text-base sm:text-lg max-w-2xl mx-auto font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Reach out to us to begin your journey toward a secure and beautifully crafted investment.
        </motion.p>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 40 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={smooth}
            className="relative p-6 sm:p-10 rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#fc4d00] to-[#052870] text-white rounded-full flex items-center justify-center">
                    <CheckCircle2 size={36} />
                  </div>

                  <h3 className="text-3xl font-medium mb-3">Inquiry Sent</h3>
                  <p className="text-black/60">We’ll contact you shortly.</p>
                </motion.div>
              ) : (
                <motion.form onSubmit={handleSubmit} className="space-y-6">

                  {["name", "phone", "email"].map((field, i) => (
                    <div key={field} className="relative">
                      <input
                        required
                        type="text"
                        placeholder=" "
                        value={(formData as any)[field]}
                        onChange={(e) =>
                          setFormData({ ...formData, [field]: e.target.value })
                        }
                        className="peer w-full px-5 pt-6 pb-3 rounded-xl bg-white/70 border border-black/10 focus:border-[#052870] outline-none"
                      />
                      <label className="absolute left-5 top-3 text-sm text-black/40">
                        {field.toUpperCase()}
                      </label>
                    </div>
                  ))}

                  <textarea
                    rows={4}
                    required
                    placeholder="Message..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-5 py-4 rounded-xl bg-white/70 border border-black/10"
                  />

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    disabled={status === "submitting"}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#fc4d00] to-[#052870] text-white uppercase"
                  >
                    {status === "submitting" ? (
                      <Loader2 className="animate-spin mx-auto" />
                    ) : (
                      "Send Inquiry"
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 40 : 0 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={smooth}
          >
            <div className="p-8 rounded-[2rem] bg-white/60 backdrop-blur-xl border shadow-lg">

              <h3 className="text-2xl mb-8 font-medium">Inquiry Sanctuary</h3>



              {/* ADDRESS */}
              <div className="flex items-start mb-8">
                <MapPin className="mr-4 text-[#fc4d00]" />
                <div>
                  <p className="font-medium">Old Town Office</p>
                  <p className="text-sm text-black/70">
                    Plot no-1967, Sriram Nagar,<br />
                    Old Town, Bhubaneswar,<br />
                    Odisha 751002
                  </p>
                  <a
                    href="https://maps.google.com/?q=Plot no-1967, Sriram Nagar, Bhubaneswar"
                    target="_blank"
                    className="text-blue-600 text-sm"
                  >
                    View on Map →
                  </a>
                </div>
              </div>



              {/* ADDRESS */}
              <div className="flex items-start mb-8">
                <MapPin className="mr-4 text-[#fc4d00]" />
                <div>
                  <p className="font-medium">Jagamara Office</p>
                  <p className="text-sm text-black/70">
                    Plot no-B/32, Sidhivihar,<br />
                     New Jagamara Road,<br />
                    Bhubaneswar, Odisha 751030
                  </p>
                  <a
                    href="https://maps.app.goo.gl/emUEDwbkmVQ3mshz7"
                    target="_blank"
                    className="text-blue-600 text-sm"
                  >
                    View on Map →
                  </a>
                </div>
              </div>


              



              

              

              {/* PHONE */}
              <div className="flex items-center mb-6">
                <Phone className="mr-4 text-[#052870]" />
                <a href="tel:7205922303">+91 7205922303</a>
              </div>

              {/* EMAIL */}
              <div className="flex items-center">
                <Mail className="mr-4 text-gray-500" />
                <span>omvikrealcon@gmail.com</span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
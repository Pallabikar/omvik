"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import api from "@/utils/api";
import { toast } from "react-hot-toast";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    city: "",
    interestedIn: "",
    budgetRange: "",
    purchaseTimeline: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/contact', {
        name: formData.fullName,
        phone: formData.phoneNumber,
        email: formData.email,
        city: formData.city,
        interestedIn: formData.interestedIn,
        budgetRange: formData.budgetRange,
        purchaseTimeline: formData.purchaseTimeline,
        message: formData.message,
      });

      toast.success("Consultation request sent successfully!");
      onClose();
    } catch (error: unknown) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "Failed to send request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10500] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-[#FDFCFB]/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors z-10"
            >
              <X className="w-5 h-5 text-black/60" />
            </motion.button>

            {/* Header */}
            <div className="px-6 md:px-8 pt-6 md:pt-8 pb-4 text-center">
              <h2 className="font-clagio text-2xl sm:text-3xl text-black mb-2">Request Consultation</h2>
              <p className="text-black/60 font-light text-xs sm:text-sm tracking-wide">
                Experience the legacy of premium living. Our experts will get in touch with you shortly.
              </p>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-6 md:pb-8 custom-scrollbar">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-black/40 font-clagio">Full Name *</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-white/50 border border-black/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition-all"
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-black/40 font-clagio">Phone Number *</label>
                  <input
                    required
                    type="tel"
                    className="w-full bg-white/50 border border-black/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition-all"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-black/40 font-clagio">Email *</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-white/50 border border-black/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition-all"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-black/40 font-clagio">City</label>
                  <input
                    type="text"
                    className="w-full bg-white/50 border border-black/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition-all"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-black/40 font-clagio">Interested In</label>
                  <select
                    className="w-full bg-white/50 border border-black/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition-all appearance-none"
                    value={formData.interestedIn}
                    onChange={(e) => setFormData({ ...formData, interestedIn: e.target.value })}
                  >
                    <option value="">Select interest</option>
                    <option value="Plots">Plots</option>
                    <option value="Townships">Townships</option>
                    <option value="Apartments">Apartments</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Simplex">Simplex</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-widest text-black/40 font-clagio">Budget Range</label>
                  <select
                    className="w-full bg-white/50 border border-black/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition-all appearance-none"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  >
                    <option value="">Select budget</option>
                    <option value="30L - 1Cr">20L - 50L</option>
                    <option value="1Cr - 2Cr">50L - 1Cr</option>
                    <option value="2Cr - 5Cr">1Cr - 2Cr</option>
                    <option value="5Cr - 10Cr">2Cr - 5Cr</option>
                    <option value="5Cr - 10Cr">5Cr - 10Cr</option>
                    <option value="10Cr+">10Cr+</option>
                  </select>
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest text-black/40 font-clagio">Purchase Timeline</label>
                  <select
                    className="w-full bg-white/50 border border-black/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition-all appearance-none"
                    value={formData.purchaseTimeline}
                    onChange={(e) => setFormData({ ...formData, purchaseTimeline: e.target.value })}
                  >
                    <option value="">Select Timeline</option>
                    <option value="Immediate">Immediate</option>
                    <option value="0-3 Months">0–3 Months</option>
                    <option value="3-6 Months">3–6 Months</option>
                    <option value="6-12 Months">6–12 Months</option>
                    <option value="12+ Months">12+ Months</option>
                    <option value="Planning">Planning Phase</option>
                  </select>
                </div>

                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest text-black/40 font-clagio">Message *</label>
                  <textarea
                    required
                    rows={3}
                    className="w-full bg-white/50 border border-black/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-black/30 transition-all resize-none"
                    placeholder="Share your requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-black text-white font-clagio uppercase tracking-[0.2em] text-xs py-4 rounded-full hover:bg-black/90 transition-all duration-300 transform active:scale-[0.98] disabled:bg-black/40 disabled:cursor-not-allowed"
                  >
                    {loading ? "Processing..." : "Request Consultation"}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

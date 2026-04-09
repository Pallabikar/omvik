"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import api from "../../utils/api";
import { toast } from "react-hot-toast";
import { UploadCloud, CheckCircle, User, Phone, Mail, MapPin, Maximize, DollarSign, FileText, Building2, Briefcase, Activity, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterProperty() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    propertyType: "Plot",
    location: "",
    landSize: "",
    ownershipType: "Owner",
    expectedPrice: "",
    urgency: "Normal",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone Number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await api.post('/properties', formData);
      if (response.data.success) {
        setIsSuccess(true);
        toast.success("Property registered successfully!");
      }
    } catch (error: any) {
      console.error("Error submitting property:", error);
      toast.error(error.response?.data?.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-[#F9F6F1] relative overflow-hidden flex flex-col justify-center pt-32 pb-20">
      {/* Background Animated Decorative Elements */}
      <motion.div 
        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#E8E1D5] rounded-full blur-[120px] opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" 
      />
      <motion.div 
        animate={{ y: [0, 30, 0], scale: [1, 1.1, 1], rotate: [0, -5, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F2EDE4] rounded-full blur-[100px] opacity-50 translate-y-1/3 -translate-x-1/4 pointer-events-none" 
      />

      <div className="max-w-4xl w-full mx-auto px-6 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2rem] p-8 md:p-12"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-clagio font-medium text-[#111] mb-4">
              Register Your Property
            </h1>
            <p className="text-black/60 font-poppins text-sm md:text-base max-w-2xl mx-auto">
              Partner with OMVIK. Share your property details and discover its true potential with our premium development expertise.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-clagio text-[#111] mb-4">Submission Successful</h2>
                <p className="text-black/60 font-poppins mb-8 max-w-md">
                  Thank you. Our team will review your property and contact you shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setFormData({
                      fullName: "", phone: "", email: "", propertyType: "Plot", location: "", landSize: "",
                      ownershipType: "Owner", expectedPrice: "", urgency: "Normal", description: "",
                    });
                    setFileName(null);
                  }}
                  className="px-8 py-3 rounded-full border border-black/10 text-black font-medium hover:bg-black hover:text-white transition-all duration-300"
                >
                  Submit Another Property
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                variants={itemVariants}
                onSubmit={handleSubmit}
                className="space-y-10"
              >
                {/* Section 1: Personal Info */}
                <div className="space-y-6">
                  <h3 className="text-lg font-clagio text-[#111] border-b border-black/5 pb-2">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/40 group-focus-within:text-black transition-colors">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name *"
                        className={`w-full bg-white border ${errors.fullName ? 'border-red-400' : 'border-black/10'} rounded-xl py-3.5 pl-12 pr-4 text-sm font-poppins text-black focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/30 transition-all placeholder:text-black/40 shadow-sm`}
                      />
                      {errors.fullName && <span className="text-red-500 text-xs mt-1 absolute -bottom-5 left-2">{errors.fullName}</span>}
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/40 group-focus-within:text-black transition-colors">
                        <Phone size={18} />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone Number *"
                        className={`w-full bg-white border ${errors.phone ? 'border-red-400' : 'border-black/10'} rounded-xl py-3.5 pl-12 pr-4 text-sm font-poppins text-black focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/30 transition-all placeholder:text-black/40 shadow-sm`}
                      />
                      {errors.phone && <span className="text-red-500 text-xs mt-1 absolute -bottom-5 left-2">{errors.phone}</span>}
                    </div>

                    <div className="relative group md:col-span-2">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/40 group-focus-within:text-black transition-colors">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address (Optional)"
                        className="w-full bg-white border border-black/10 rounded-xl py-3.5 pl-12 pr-4 text-sm font-poppins text-black focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/30 transition-all placeholder:text-black/40 shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Property Info */}
                <div className="space-y-6">
                  <h3 className="text-lg font-clagio text-[#111] border-b border-black/5 pb-2">Property Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/40 group-focus-within:text-black transition-colors">
                        <Building2 size={18} />
                      </div>
                      <select
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-black/10 rounded-xl py-3.5 pl-12 pr-4 text-sm font-poppins text-black focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/30 transition-all appearance-none cursor-pointer shadow-sm"
                      >
                        <option value="Plot">Plot</option>
                        <option value="Agricultural Land">Agricultural Land</option>
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-black/40">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/40 group-focus-within:text-black transition-colors">
                        <Briefcase size={18} />
                      </div>
                      <select
                        name="ownershipType"
                        value={formData.ownershipType}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-black/10 rounded-xl py-3.5 pl-12 pr-4 text-sm font-poppins text-black focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/30 transition-all appearance-none cursor-pointer shadow-sm"
                      >
                        <option value="Owner">I am the Owner</option>
                        <option value="Broker">I am a Broker / Channel Partner</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-black/40">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/40 group-focus-within:text-black transition-colors">
                        <MapPin size={18} />
                      </div>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Property Location / Landmark"
                        className="w-full bg-white border border-black/10 rounded-xl py-3.5 pl-12 pr-4 text-sm font-poppins text-black focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/30 transition-all placeholder:text-black/40 shadow-sm"
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/40 group-focus-within:text-black transition-colors">
                        <Maximize size={18} />
                      </div>
                      <input
                        type="text"
                        name="landSize"
                        value={formData.landSize}
                        onChange={handleInputChange}
                        placeholder="Land Size (e.g., 2000 sq ft, 2 Acres)"
                        className="w-full bg-white border border-black/10 rounded-xl py-3.5 pl-12 pr-4 text-sm font-poppins text-black focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/30 transition-all placeholder:text-black/40 shadow-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Selling Details */}
                <div className="space-y-6">
                  <h3 className="text-lg font-clagio text-[#111] border-b border-black/5 pb-2">Selling Requirements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/40 group-focus-within:text-black transition-colors">
                        <DollarSign size={18} />
                      </div>
                      <input
                        type="text"
                        name="expectedPrice"
                        value={formData.expectedPrice}
                        onChange={handleInputChange}
                        placeholder="Expected Price (Optional)"
                        className="w-full bg-white border border-black/10 rounded-xl py-3.5 pl-12 pr-4 text-sm font-poppins text-black focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/30 transition-all placeholder:text-black/40 shadow-sm"
                      />
                    </div>

                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/40 group-focus-within:text-black transition-colors">
                        <Activity size={18} />
                      </div>
                      <select
                        name="urgency"
                        value={formData.urgency}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-black/10 rounded-xl py-3.5 pl-12 pr-4 text-sm font-poppins text-black focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/30 transition-all appearance-none cursor-pointer shadow-sm"
                      >
                        <option value="Normal">Normal Timeline</option>
                        <option value="Urgent">Urgent Sale / Partnership</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-black/40">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4: Extra */}
                <div className="space-y-6">
                  <h3 className="text-lg font-clagio text-[#111] border-b border-black/5 pb-2">Additional Information</h3>
                  
                  <div className="relative group">
                    <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-black/40 group-focus-within:text-black transition-colors">
                      <FileText size={18} />
                    </div>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Tell us more about the property (e.g., proximity to highways, unique features, legal status)..."
                      rows={4}
                      className="w-full bg-white border border-black/10 rounded-xl py-3.5 pl-12 pr-4 text-sm font-poppins text-black focus:outline-none focus:border-black/30 focus:ring-1 focus:ring-black/30 transition-all placeholder:text-black/40 resize-none shadow-sm"
                    />
                  </div>

                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-black/10 hover:border-black/30 bg-white/50 rounded-xl py-8 px-6 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-white text-center group"
                  >
                    <input 
                      type="file" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                    />
                    <div className="w-12 h-12 bg-[#F9F6F1] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      {fileName ? <ImageIcon size={20} className="text-black" /> : <UploadCloud size={20} className="text-black/60" />}
                    </div>
                    {fileName ? (
                      <p className="text-sm font-poppins text-black font-medium">{fileName}</p>
                    ) : (
                      <>
                        <p className="text-sm font-poppins text-black font-medium mb-1">Click to upload property documents or images</p>
                        <p className="text-xs text-black/40 font-poppins">JPG, PNG or PDF (Max 5MB)</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-6">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#111] text-white py-4 rounded-xl font-clagio font-medium uppercase tracking-[0.2em] text-sm hover:bg-[#222] transition-colors shadow-xl flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Property Details"
                    )}
                  </motion.button>
                  <p className="text-center text-xs text-black/40 mt-4 font-poppins">
                    By submitting this form, you agree to our privacy policy and terms.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Trust Elements Below Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 flex flex-col md:flex-row items-center justify-center gap-6 text-black/50 font-poppins text-xs"
        >
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            <span>100% confidential</span>
          </div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-black/10" />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Our team will personally verify and contact you</span>
          </div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-black/10" />
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <span>No spam, no obligation</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

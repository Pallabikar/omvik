"use client";

import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import api from "@/utils/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
}

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', data.token);
            toast.success("Authentication successful");
            router.push('/');
        } catch (error: unknown) {
            const apiError = error as ApiError;
            toast.error(apiError.response?.data?.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="w-full min-h-screen bg-[#FDFCFB]">

            <div className="pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-20 sm:pb-24 px-6 flex items-center justify-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md glass-panel p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl"
                >
                    <div className="flex flex-col items-center mb-10 text-center">

                        <h1 className="text-3xl font-clagio font-medium text-black tracking-[0.04em] leading-[1.1]">Client Portal</h1>
                        <p className="text-sm text-black/50 mt-2 font-light">Access your exclusive legacy portfolio</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-medium ml-1">Email Identifier</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 group-hover:text-black transition-colors" size={18} />
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/5 border border-black/5 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-black/20 focus:bg-white transition-all text-sm font-light text-black"
                                    placeholder="your@legend.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-medium ml-1">Secret Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 group-hover:text-black transition-colors" size={18} />
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/5 border border-black/5 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-black/20 focus:bg-white transition-all text-sm font-light text-black"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-black/40 font-medium">
                            <label className="flex items-center cursor-pointer hover:text-black transition-colors">
                                <input type="checkbox" className="mr-2 accent-black" /> Remember Me
                            </label>
                            <a href="#" className="hover:text-black transition-colors">Forgot Identity?</a>
                        </div>

                        <motion.button
                            disabled={loading}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-black text-white py-5 rounded-2xl font-clagio font-medium uppercase tracking-[0.3em] text-[10px] flex items-center justify-center hover:bg-[#081F5C] transition-all duration-500 shadow-xl group disabled:bg-black/40 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>Authenticating <Loader2 size={14} className="ml-2 animate-spin" /></>
                            ) : (
                                <>Authenticate <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </motion.button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-black/5 text-center">
                        <p className="text-xs text-black/40 font-light">
                            New to the legacy family? <a href="/contact" className="text-black font-medium border-b border-black/10 hover:border-black transition-colors ml-2">Request Access</a>
                        </p>
                    </div>
                </motion.div>
            </div>

        </main>
    );
}

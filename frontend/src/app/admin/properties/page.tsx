"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Calendar, Phone, Mail, Search, MapPin, Building2, Tag } from "lucide-react";
import api from "@/utils/api";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Property {
    _id: string;
    fullName: string;
    email: string;
    phone: string;
    propertyType: string;
    location: string;
    landSize: string;
    ownershipType: string;
    expectedPrice: string;
    urgency: string;
    description: string;
    status: string;
    createdAt: string;
}

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
        status?: number;
    };
}

export default function AdminPropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const { data } = await api.get('/properties');
                setProperties(data);
            } catch (error: unknown) {
                const apiError = error as ApiError;
                toast.error(apiError.response?.data?.message || "Failed to fetch property registrations");
                if (apiError.response?.status === 401) {
                    router.push('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        } else {
            fetchProperties();
        }
    }, [router]);

    const handleStatusChange = async (id: string, newStatus: string) => {
        try {
            await api.put(`/properties/${id}`, { status: newStatus });
            setProperties(properties.map(prop => prop._id === id ? { ...prop, status: newStatus } : prop));
            toast.success("Status updated successfully");
        } catch (error: unknown) {
            const apiError = error as ApiError;
            toast.error(apiError.response?.data?.message || "Failed to update status");
        }
    };

    const filteredProperties = properties.filter(prop => 
        prop.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        prop.propertyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (prop.location && prop.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
        prop.phone.includes(searchTerm)
    );

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <main className="w-full min-h-screen bg-[#FDFCFB]">

            <div className="pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-20 sm:pb-24 px-6 max-w-7xl mx-auto relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-6 mb-6 border-b border-black/5 pb-2">
                            <Link href="/admin/leads" className="text-black/40 hover:text-black font-clagio font-medium tracking-wider text-sm transition-colors">
                                GENERAL LEADS
                            </Link>
                            <Link href="/admin/properties" className="text-black font-clagio font-medium tracking-wider text-sm border-b-2 border-black pb-2 -mb-[3px]">
                                PROPERTY REGISTRATIONS
                            </Link>
                        </div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl sm:text-4xl md:text-5xl font-clagio font-medium text-black tracking-[0.02em] leading-tight"
                        >
                            Property Registrations
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-black/50 mt-2 font-light"
                        >
                            Review and manage landowner property submissions.
                        </motion.p>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative w-full md:w-80"
                    >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30" size={18} />
                        <input
                            type="text"
                            placeholder="Search properties or names..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/5 border border-black/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-black/30 focus:bg-white transition-all text-sm font-light text-black placeholder:text-black/30"
                        />
                    </motion.div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-32">
                        <Loader2 className="animate-spin text-black/40" size={40} />
                    </div>
                ) : filteredProperties.length === 0 ? (
                    <div className="glass-panel p-16 rounded-[2rem] text-center border border-black/5">
                        <p className="text-black/40 font-light text-lg">No property registrations found.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {filteredProperties.map((prop, index) => (
                            <motion.div 
                                key={prop._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass-panel p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] shadow-lg border border-black/5 hover:border-black/10 transition-colors"
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center justify-between md:justify-start gap-4 mb-2">
                                            <h2 className="text-2xl font-clagio font-medium text-black">{prop.fullName}</h2>
                                            <span className="text-xs uppercase tracking-widest text-black/40 font-medium">#{prop._id.slice(-6)}</span>
                                        </div>
                                        
                                        <div className="flex flex-wrap gap-x-6 gap-y-3">
                                            {prop.email && (
                                                <div className="flex items-center text-sm font-light text-black/70">
                                                    <Mail size={16} className="mr-2 text-black/40" />
                                                    <a href={`mailto:${prop.email}`} className="hover:text-black transition-colors">{prop.email}</a>
                                                </div>
                                            )}
                                            <div className="flex items-center text-sm font-light text-black/70">
                                                <Phone size={16} className="mr-2 text-black/40" />
                                                <a href={`tel:${prop.phone}`} className="hover:text-black transition-colors">{prop.phone}</a>
                                            </div>
                                            <div className="flex items-center text-sm font-light text-black/70">
                                                <Calendar size={16} className="mr-2 text-black/40" />
                                                {formatDate(prop.createdAt)}
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-black/5">
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4">
                                                <div>
                                                    <span className="flex items-center text-[9px] uppercase tracking-[0.2em] text-black/40 font-semibold mb-1">
                                                        <Building2 size={10} className="mr-1" /> Type
                                                    </span>
                                                    <span className="text-sm font-medium text-black">{prop.propertyType}</span>
                                                </div>
                                                <div>
                                                    <span className="flex items-center text-[9px] uppercase tracking-[0.2em] text-black/40 font-semibold mb-1">
                                                        <MapPin size={10} className="mr-1" /> Location
                                                    </span>
                                                    <span className="text-sm font-medium text-black">{prop.location || 'N/A'}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-[9px] uppercase tracking-[0.2em] text-black/40 font-semibold mb-1">Size</span>
                                                    <span className="text-sm font-medium text-black">{prop.landSize || 'N/A'}</span>
                                                </div>
                                                <div>
                                                    <span className="flex items-center text-[9px] uppercase tracking-[0.2em] text-black/40 font-semibold mb-1">
                                                        <Tag size={10} className="mr-1" /> Expected Price
                                                    </span>
                                                    <span className="text-sm font-medium text-black">{prop.expectedPrice || 'N/A'}</span>
                                                </div>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4 border-t border-black/5 pt-4">
                                                <div>
                                                    <span className="block text-[9px] uppercase tracking-[0.2em] text-black/40 font-semibold mb-1">Ownership</span>
                                                    <span className="text-sm text-black">{prop.ownershipType}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-[9px] uppercase tracking-[0.2em] text-black/40 font-semibold mb-1">Urgency</span>
                                                    <span className={`text-xs font-semibold py-1 px-2 rounded uppercase tracking-wider ${prop.urgency === 'Urgent' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                                        {prop.urgency}
                                                    </span>
                                                </div>
                                            </div>

                                            {prop.description && (
                                                <div className="pt-2">
                                                    <span className="block text-[9px] uppercase tracking-[0.2em] text-black/40 font-semibold mb-2">Description</span>
                                                    <p className="text-sm font-light text-black/80 leading-relaxed bg-black/[0.02] p-4 rounded-xl">
                                                        {prop.description}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="md:w-48 flex flex-col md:items-end justify-between border-t md:border-t-0 md:border-l border-black/5 pt-6 md:pt-0 md:pl-6">
                                        <div className="w-full">
                                            <label className="block text-[9px] uppercase tracking-[0.2em] text-black/40 font-semibold mb-2 md:text-right">Status</label>
                                            <select 
                                                value={prop.status}
                                                onChange={(e) => handleStatusChange(prop._id, e.target.value)}
                                                className={`w-full appearance-none bg-white border rounded-xl py-2 px-4 text-xs font-medium outline-none transition-all cursor-pointer ${
                                                    prop.status === 'new' ? 'border-amber-500/30 text-amber-600 focus:border-amber-500' :
                                                    prop.status === 'under-review' ? 'border-blue-500/30 text-blue-600 focus:border-blue-500' :
                                                    prop.status === 'contacted' ? 'border-purple-500/30 text-purple-600 focus:border-purple-500' :
                                                    'border-red-500/30 text-red-600 focus:border-red-500'
                                                }`}
                                            >
                                                <option value="new">New</option>
                                                <option value="under-review">Under Review</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

        </main>
    );
}

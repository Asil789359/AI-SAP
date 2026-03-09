"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/ui/DashboardUI";
import {
    Zap,
    Bike,
    Building2,
    ArrowUpRight,
    RefreshCw,
    Clock,
    ExternalLink,
    ShieldCheck,
    TrendingUp,
    MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveFeedPage() {
    const [bikeLease, setBikeLease] = useState<any[]>([]);
    const [corpReqs, setCorpReqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [bikeRes, corpRes] = await Promise.all([
                    fetch('http://localhost:8004/feeds/bike-lease'),
                    fetch('http://localhost:8004/feeds/corporate-requirements')
                ]);

                const bikeData = await bikeRes.json();
                const corpData = await corpRes.json();

                setBikeLease(bikeData);
                setCorpReqs(corpData);
            } catch (error) {
                console.error("Failed to fetch live feed:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
        const interval = setInterval(fetchData, 10000); // Pulse refresh
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-8 pt-0">
            <DashboardHeader />

            <div className="max-w-7xl mx-auto py-8 space-y-12">
                {/* Live Status Banner */}
                <section className="flex items-center justify-between bg-primary/5 border border-primary/20 p-6 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none"></div>
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-pulse">
                                <Zap size={28} />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Market Live Feed</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <p className="text-sm font-bold text-emerald-500 uppercase tracking-widest leading-none">Global Marketplace Connected</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 text-right">
                        <div className="hidden md:block">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Last Updated</p>
                            <p className="text-sm font-bold flex items-center gap-2 justify-end">
                                <Clock size={14} className="text-slate-400" /> Just now
                            </p>
                        </div>
                        <button className="p-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 hover:rotate-180 transition-transform duration-500">
                            <RefreshCw size={20} className="text-primary" />
                        </button>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Bike Lease Section */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold flex items-center gap-3">
                                <Bike size={24} className="text-primary" /> Fleet Leasings
                            </h3>
                            <span className="text-xs font-bold text-primary hover:underline cursor-pointer">Explore All Providers</span>
                        </div>

                        <div className="space-y-4">
                            <AnimatePresence>
                                {loading ? (
                                    <div className="h-64 flex items-center justify-center glass-card rounded-2xl">
                                        <RefreshCw size={32} className="animate-spin text-slate-300" />
                                    </div>
                                ) : (
                                    bikeLease.map((item, i) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="glass-card p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/30 transition-all hover:scale-[1.01]"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                        <TrendingUp size={24} className="text-slate-400 group-hover:text-primary transition-colors" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-lg">{item.model}</h4>
                                                        <p className="text-xs text-slate-500 font-medium">Provider: <span className="text-primary font-bold">{item.provider}</span></p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-black text-slate-800 dark:text-white leading-none">{item.rate}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Standard Rate</p>
                                                </div>
                                            </div>

                                            <div className="mt-6 flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                                                <div className="flex gap-4">
                                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                                        <MapPin size={12} className="text-slate-400" />
                                                        <span className="text-[10px] font-bold text-slate-500">{item.location}</span>
                                                    </div>
                                                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg ${item.units > 0 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                                        <ShieldCheck size={12} />
                                                        <span className="text-[10px] font-bold uppercase">{item.availability}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs font-bold text-emerald-500">{item.trend}</span>
                                                    <button className="bg-primary text-white p-2 rounded-lg shadow-lg shadow-primary/20">
                                                        <ExternalLink size={14} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </section>

                    {/* Corporate Requirements Section */}
                    <section className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold flex items-center gap-3">
                                <Building2 size={24} className="text-primary" /> Corporate Needs
                            </h3>
                            <span className="text-xs font-bold text-primary hover:underline cursor-pointer">Open Tenders (42)</span>
                        </div>

                        <div className="space-y-4">
                            {corpReqs.map((req, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all"
                                >
                                    {/* Graphical Accent */}
                                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>

                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center border border-slate-700">
                                                <span className="font-bold text-white tracking-widest uppercase text-xs">{req.company.substring(0, 2)}</span>
                                            </div>
                                            <h4 className="font-bold text-lg text-slate-800 dark:text-white">{req.company}</h4>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${req.priority === 'Critical' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' :
                                            req.priority === 'High' ? 'bg-amber-500 text-white' : 'bg-primary text-white'
                                            }`}>
                                            {req.priority}
                                        </span>
                                    </div>

                                    <p className="text-sm font-medium text-slate-500 mb-6 leading-relaxed">
                                        {req.requirement}
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-medium">Est. Budget</p>
                                            <p className="text-lg font-black text-primary">{req.budget}</p>
                                        </div>
                                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 font-medium">Timeline</p>
                                            <p className="text-lg font-black text-slate-700 dark:text-white">{req.timeline}</p>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-primary animate-ping"></div>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{req.status}</span>
                                        </div>
                                        <button className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-3 transition-all">
                                            Submit Proposal <ArrowUpRight size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

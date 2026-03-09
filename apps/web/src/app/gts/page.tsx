"use client";

import { useEffect, useState } from "react";
import { DashboardHeader, StatCard } from "@/components/ui/DashboardUI";
import {
    ShieldCheck,
    Globe,
    AlertCircle,
    Clock,
    ExternalLink,
    MapPin,
    TrendingUp,
    Zap
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GtsPage() {
    const [compliance, setCompliance] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/gts/compliance')
            .then(res => res.json())
            .then(data => {
                setCompliance(data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-8 pt-0">
            <DashboardHeader />

            <div className="max-w-7xl mx-auto py-8 space-y-8">
                <section className="flex items-end justify-between bg-primary/5 p-8 rounded-[40px] border border-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Globe size={180} /></div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2 uppercase">S/4 HANA: Global Trade Services (GTS)</h1>
                        <p className="text-slate-500 font-medium tracking-tight">Managing global compliance, customs, and international trade risks.</p>
                    </div>
                    <div className="flex gap-3 relative z-10">
                        <button className="px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm hover:scale-[1.02] transition-all">Audit Trail</button>
                        <button className="px-5 py-3 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">Run Screening</button>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Compliance Score" value="98%" trend="1.5%" isPositive={true} icon={ShieldCheck} color="emerald-500" />
                    <StatCard title="Active Customs" value="12" trend="4" isPositive={false} icon={MapPin} color="indigo-500" />
                    <StatCard title="Trade Risk" value="Low" trend="Surge" isPositive={true} icon={TrendingUp} color="blue-500" />
                    <StatCard title="Unsettled Duties" value="$128,400" trend="10%" isPositive={false} icon={Zap} color="rose-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-card rounded-3xl overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900/50">
                                <h3 className="font-bold tracking-tight">Regional Compliance Register</h3>
                                <span className="text-xs font-bold text-slate-400">Synced: Global Registry 101</span>
                            </div>
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 dark:bg-slate-900/50 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Global Region</th>
                                        <th className="px-6 py-4">Jurisdiction</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Risk Severity</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {compliance.map((c) => (
                                        <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                                            <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">{c.region}</td>
                                            <td className="px-6 py-4 text-sm font-medium">Standard Compliance Registry</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${c.status === 'Compliant' || c.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                                                    }`}>
                                                    {c.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${c.alert_level === 'Low' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                                                    }`}>
                                                    {c.alert_level} Priority
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-8 rounded-[32px] bg-slate-900 text-white relative overflow-hidden h-full">
                            <div className="absolute top-0 right-0 p-8 opacity-20"><Zap size={40} /></div>
                            <h3 className="text-lg font-bold mb-8">Trade Risk Scanner</h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Partner Star IN</span>
                                    <span className="text-[10px] font-black underline cursor-pointer">Re-Scan</span>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full">
                                    <div className="w-4/5 h-full bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/20"></div>
                                </div>
                                <p className="text-xs text-slate-500 font-medium">85% Compliance Integrity. No restricted entities detected.</p>

                                <hr className="opacity-10" />

                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global Export</span>
                                    <span className="text-[10px] font-black underline cursor-pointer">Full Audit</span>
                                </div>
                                <div className="w-full h-2 bg-slate-800 rounded-full">
                                    <div className="w-2/5 h-full bg-amber-500 rounded-full shadow-lg shadow-amber-500/20"></div>
                                </div>
                                <p className="text-xs text-slate-500 font-medium">42% Integrity. Region mismatch in 'Volta Global'. Initiating block.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

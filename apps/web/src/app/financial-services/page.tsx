"use client";

import { useEffect, useState } from "react";
import { DashboardHeader, StatCard } from "@/components/ui/DashboardUI";
import {
    Wallet2,
    CreditCard,
    ArrowUpRight,
    Clock,
    ShieldCheck,
    Zap,
    MoreHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FinancialServicesPage() {
    const [settlements, setSettlements] = useState<any[]>([]);
    const [disbursements, setDisbursements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [settleRes, disbRes] = await Promise.all([
                    fetch('http://localhost:3001/financial-services/fica/settlements'),
                    fetch('http://localhost:3001/financial-services/fscd/disbursements')
                ]);

                const settleData = await settleRes.json();
                const disbData = await disbRes.json();

                setSettlements(settleData);
                setDisbursements(disbData);
            } catch (error) {
                console.error("Failed to fetch financial services:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-8 pt-0">
            <DashboardHeader />

            <div className="max-w-7xl mx-auto py-8 space-y-12">
                <section className="flex items-end justify-between bg-primary/5 p-8 rounded-3xl border border-primary/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110"><Wallet2 size={180} /></div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2 uppercase">S/4 HANA: Financial Services (FICA/FSCD)</h1>
                        <p className="text-slate-500 font-medium tracking-tight leading-relaxed">High-volume contract accounting and collections for strategic finance.</p>
                    </div>
                    <div className="flex gap-4 relative z-10">
                        <button className="px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-100 transition-all flex items-center gap-2">
                            <ShieldCheck size={14} /> Settlement Register
                        </button>
                        <button className="px-6 py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2">
                            <Zap size={14} /> New Collection Run
                        </button>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Contract Settlement" value="$4.5M" trend="12.5%" isPositive={true} icon={ShieldCheck} color="blue-500" />
                    <StatCard title="Disbursement Volume" value="$1.2M" trend="8%" isPositive={true} icon={CreditCard} color="indigo-500" />
                    <StatCard title="Active Invoices" value="482,000" trend="2.4%" isPositive={false} icon={Clock} color="rose-500" />
                    <StatCard title="AI Settlement Index" value="98%" trend="4" isPositive={true} icon={Zap} color="emerald-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold tracking-tight">Contract Accounts (FICA)</h3>
                            <span className="text-xs font-bold text-primary cursor-pointer hover:underline">Full Register</span>
                        </div>
                        <div className="glass-card rounded-[32px] overflow-hidden shadow-sm">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 dark:bg-slate-900/50 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                                    <tr>
                                        <th className="px-6 py-4">Account ID</th>
                                        <th className="px-6 py-4">High-Vol Category</th>
                                        <th className="px-6 py-4">Amount</th>
                                        <th className="px-6 py-4">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {settlements.map((s, i) => (
                                        <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                                            <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">{s.id}</td>
                                            <td className="px-6 py-4 text-sm font-medium">{s.customer}</td>
                                            <td className="px-6 py-4 text-sm font-bold">{s.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${s.status === 'Settled' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                                                    }`}>
                                                    {s.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold tracking-tight">FSCD Disbursements</h3>
                            <span className="text-xs font-bold text-slate-400">Synced: Global Clearing 24/7</span>
                        </div>
                        <div className="space-y-4">
                            {disbursements.map((d, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all"
                                >
                                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                <ShieldCheck size={18} className="text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg text-slate-800 dark:text-white">{d.claim_id}</h4>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-1">Beneficiary: {d.beneficiary}</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${d.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                                            }`}>
                                            {d.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Method</p>
                                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{d.method}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Settlement</p>
                                            <p className="text-xl font-black text-primary">{d.amount}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { DashboardHeader, StatCard } from "@/components/ui/DashboardUI";
import {
    ClipboardList,
    Truck,
    Package,
    ShieldCheck,
    AlertTriangle,
    ArrowUpRight,
    UserCheck
} from "lucide-react";
import { motion } from "framer-motion";

export default function P2pPage() {
    const [requisitions, setRequisitions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3001/p2p/requisitions')
            .then(res => res.json())
            .then(data => {
                setRequisitions(data);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-8 pt-0">
            <DashboardHeader />

            <div className="max-w-7xl mx-auto py-8 space-y-8">
                <section className="flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2 uppercase">S/4 HANA: Procure-to-Pay (P2P)</h1>
                        <p className="text-slate-500 font-medium">Strategic procurement and vendor lifecycle management.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">New Requisition</button>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Active PRs" value="48" trend="12.5%" isPositive={false} icon={ClipboardList} color="blue-500" />
                    <StatCard title="Approved POs" value="124" trend="15%" isPositive={true} icon={ShieldCheck} color="emerald-500" />
                    <StatCard title="Vendor Score" value="94/100" trend="2%" isPositive={true} icon={UserCheck} color="indigo-500" />
                    <StatCard title="Goods In Transit" value="15" trend="3" isPositive={false} icon={Truck} color="amber-500" />
                </div>

                <div className="glass-card rounded-3xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900/50">
                        <h3 className="font-bold tracking-tight">Purchase Requisitions (PR)</h3>
                        <span className="text-xs font-bold text-primary">View Full Register</span>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                            <tr>
                                <th className="px-6 py-4">Requisition ID</th>
                                <th className="px-6 py-4">Required Item</th>
                                <th className="px-6 py-4">Requested By</th>
                                <th className="px-6 py-4">Budget Est.</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {requisitions.map((pr) => (
                                <tr key={pr.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                                    <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">{pr.id}</td>
                                    <td className="px-6 py-4 text-sm font-medium">{pr.item}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{pr.requester}</td>
                                    <td className="px-6 py-4 text-sm font-bold">{pr.budget}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${pr.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' :
                                                pr.status === 'Pending Approval' ? 'bg-amber-500/10 text-amber-500' : 'bg-primary/10 text-primary'
                                            }`}>
                                            {pr.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

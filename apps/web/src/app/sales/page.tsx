"use client";

import { DashboardHeader, StatCard } from "@/components/ui/DashboardUI";
import {
    Users,
    ShoppingCart,
    TrendingUp,
    Target,
    MoreHorizontal,
    Plus,
    Search,
    Zap,
    CheckCircle2
} from "lucide-react";

const customers = [
    { id: 1, name: 'Acme Corp', type: 'Enterprise', revenue: '$1.24M', status: 'Active' },
    { id: 2, name: 'Global Tech', type: 'SMB', revenue: '$450K', status: 'Prospect' },
    { id: 3, name: 'Nexus Ltd', type: 'Partner', revenue: '$89K', status: 'In Review' },
    { id: 4, name: 'Starlight Inc', type: 'Enterprise', revenue: '$2.2M', status: 'Active' },
];

const salesOrders = [
    { id: 'ORD-7742', customer: 'Acme Corp', amount: '$12,400.00', status: 'Completed', date: 'Mar 8, 2026' },
    { id: 'ORD-7741', customer: 'Global Tech', amount: '$8,200.00', status: 'Processing', date: 'Mar 8, 2026' },
    { id: 'ORD-7740', customer: 'Nexus Ltd', amount: '$3,150.00', status: 'Pending', date: 'Mar 7, 2026' },
];

export default function SalesPage() {
    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-8 pt-0">
            <DashboardHeader />

            <div className="max-w-7xl mx-auto py-8 space-y-8">
                <section className="flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Sales (Order to Cash)</h1>
                        <p className="text-slate-500 font-medium tracking-tight tracking-tight">Manage customers, pipeline, and order lifecycle.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">Forecasting</button>
                        <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">New Sales Order</button>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Customers" value="1,240" trend="12%" isPositive={true} icon={Users} color="blue-500" />
                    <StatCard title="Order Volume" value="452" trend="8%" isPositive={true} icon={ShoppingCart} color="indigo-500" />
                    <StatCard title="Pipeline Value" value="$2.4M" trend="5%" isPositive={true} icon={Target} color="teal-500" />
                    <StatCard title="Conversion Rate" value="3.5%" trend="0.8%" isPositive={true} icon={TrendingUp} color="emerald-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="glass-card rounded-3xl overflow-hidden">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                <h3 className="font-bold tracking-tight tracking-tight">Active Customers</h3>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                                        <Search size={14} className="text-slate-400" />
                                        <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-xs w-24" />
                                    </div>
                                    <button className="text-xs font-bold text-primary">Export CSV</button>
                                </div>
                            </div>
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 dark:bg-slate-900/50 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                                    <tr>
                                        <th className="px-6 py-3">Customer Name</th>
                                        <th className="px-6 py-3">Type</th>
                                        <th className="px-6 py-3">Lifetime Rav</th>
                                        <th className="px-6 py-3">Status</th>
                                        <th className="px-6 py-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {customers.map((c) => (
                                        <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors group">
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{c.name}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium">{c.type}</td>
                                            <td className="px-6 py-4 text-sm font-bold">{c.revenue}</td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded-md text-[10px] bg-sky-500/10 text-sky-500 font-bold uppercase">{c.status}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                                    <MoreHorizontal size={14} className="text-slate-400" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="glass-card rounded-3xl p-6">
                            <h3 className="font-bold mb-6 tracking-tight">Recent Sales Orders</h3>
                            <div className="space-y-4">
                                {salesOrders.map((order) => (
                                    <div key={order.id} className="p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl flex items-center justify-between border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                                                <ShoppingCart size={18} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm tracking-tight">{order.id} - {order.customer}</p>
                                                <p className="text-[10px] font-bold text-slate-400">{order.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="text-right">
                                                <p className="font-bold text-sm">{order.amount}</p>
                                                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-1 justify-end">
                                                    <CheckCircle2 size={10} /> {order.status}
                                                </p>
                                            </div>
                                            <button className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-shadow shadow-sm">
                                                <TrendingUp size={16} className="text-slate-400" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="p-8 rounded-3xl bg-emerald-600 text-white shadow-2xl shadow-emerald-500/20 relative overflow-hidden">
                            <div className="absolute -bottom-4 -right-4 p-4 opacity-10">
                                <Zap size={120} />
                            </div>
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">AI Sales Forecast <Zap size={16} className="text-amber-300 fill-amber-300" /></h3>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold uppercase tracking-wider opacity-80 font-medium">Q3 Target Progress</span>
                                        <span className="text-xs font-bold">78%</span>
                                    </div>
                                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white w-[78%] rounded-full"></div>
                                    </div>
                                </div>
                                <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                                    <p className="text-xs font-bold uppercase tracking-wider mb-2 text-amber-300">Churn Warning</p>
                                    <p className="text-sm font-medium leading-relaxed opacity-90 italic">"Global Tech has 15% fewer active sessions this month. Recommended outreach to prevent churn."</p>
                                </div>
                            </div>
                            <button className="w-full mt-8 py-3 bg-white text-emerald-600 rounded-xl text-sm font-bold shadow-xl hover:bg-emerald-50 transition-colors">
                                View Strategy Guide
                            </button>
                        </div>

                        <div className="glass-card p-8 rounded-3xl">
                            <h3 className="font-bold mb-6 tracking-tight">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all flex flex-col items-center gap-2 text-center">
                                    <Plus size={20} className="text-primary" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">New Lead</span>
                                </button>
                                <button className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-all flex flex-col items-center gap-2 text-center">
                                    <TrendingUp size={20} className="text-primary" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Reports</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

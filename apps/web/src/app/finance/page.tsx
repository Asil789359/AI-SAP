"use client";

import { DashboardHeader, StatCard } from "@/components/ui/DashboardUI";
import {
    Wallet,
    ArrowUpRight,
    FileText,
    CreditCard,
    TrendingUp,
    MoreVertical,
    ArrowDownCircle,
    ArrowUpCircle
} from "lucide-react";

const ledgerData = [
    { id: 1, name: 'Main Cash Account', balance: '$450,000.00', type: 'Asset', trend: 'up' },
    { id: 2, name: 'Checking Account', balance: '$120,000.00', type: 'Asset', trend: 'down' },
    { id: 3, name: 'Accounts Payable', balance: '$85,000.00', type: 'Liability', trend: 'up' },
    { id: 4, name: 'Revenue', balance: '$950,000.00', type: 'Equity', trend: 'up' },
];

const invoices = [
    { id: 'INV-1001', customer: 'Acme Corp', amount: '$12,400.00', status: 'Paid', date: 'Mar 1, 2026' },
    { id: 'INV-1002', customer: 'Global Tech', amount: '$8,200.00', status: 'Pending', date: 'Mar 5, 2026' },
    { id: 'INV-1003', customer: 'Nexus Ltd', amount: '$3,150.00', status: 'Overdue', date: 'Feb 28, 2026' },
];

export default function FinancePage() {
    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-8 pt-0">
            <DashboardHeader />

            <div className="max-w-7xl mx-auto py-8 space-y-8">
                <section className="flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Finance (FI)</h1>
                        <p className="text-slate-500 font-medium tracking-tight">Manage your company accounts and financial statements.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">Generate P&L</button>
                        <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">Create Invoice</button>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Assets" value="$570,000" trend="5.2%" isPositive={true} icon={Wallet} color="blue-500" />
                    <StatCard title="Total Liabilities" value="$125,000" trend="2.1%" isPositive={false} icon={CreditCard} color="rose-500" />
                    <StatCard title="Net Profit" value="$845,000" trend="15.8%" isPositive={true} icon={TrendingUp} color="emerald-500" />
                    <StatCard title="Outstanding" value="$22,400" trend="8.4%" isPositive={false} icon={FileText} color="amber-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="glass-card rounded-3xl overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold tracking-tight">General Ledger</h3>
                            <button className="text-xs font-bold text-primary">View Full Chart</button>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {ledgerData.map((item) => (
                                <div key={item.id} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg ${item.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                            {item.trend === 'up' ? <ArrowUpCircle size={20} /> : <ArrowDownCircle size={20} />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm tracking-tight">{item.name}</p>
                                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{item.type}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-sm">{item.balance}</p>
                                        <p className={`text-[10px] font-bold ${item.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                            {item.trend === 'up' ? '+2.4%' : '-1.2%'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card rounded-3xl overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="font-bold tracking-tight">Recent Invoices</h3>
                            <button className="text-xs font-bold text-primary">See All</button>
                        </div>
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-slate-50 dark:bg-slate-900/50 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                                <tr>
                                    <th className="px-6 py-3">Invoice</th>
                                    <th className="px-6 py-3">Customer</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {invoices.map((inv) => (
                                    <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors">
                                        <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">{inv.id}</td>
                                        <td className="px-6 py-4 text-sm font-medium">{inv.customer}</td>
                                        <td className="px-6 py-4 text-sm font-bold">{inv.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' :
                                                    inv.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-rose-500/10 text-rose-500'
                                                }`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

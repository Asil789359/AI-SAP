"use client";

import { DashboardHeader, StatCard } from "@/components/ui/DashboardUI";
import {
    Package,
    Truck,
    AlertTriangle,
    RefreshCcw,
    BarChart3,
    Search,
    ArrowRight
} from "lucide-react";

const inventoryData = [
    { id: 'PROD-001', name: 'Mechanical Valves', sku: 'SKU-99', stock: 12, min: 20, status: 'Critically Low' },
    { id: 'PROD-002', name: 'Electric Motors', sku: 'SKU-102', stock: 154, min: 50, status: 'Healthy' },
    { id: 'PROD-003', name: 'Steel Bearings', sku: 'SKU-45', stock: 45, min: 40, status: 'Reorder Soon' },
    { id: 'PROD-004', name: 'Hydraulic Pumps', sku: 'SKU-88', stock: 8, min: 15, status: 'Low Stock' },
];

export default function InventoryPage() {
    return (
        <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-8 pt-0">
            <DashboardHeader />

            <div className="max-w-7xl mx-auto py-8 space-y-8">
                <section className="flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-2">Inventory Management</h1>
                        <p className="text-slate-500 font-medium tracking-tight">Real-time stock tracking and warehouse optimization.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">Transfer Stock</button>
                        <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">Adjust Inventory</button>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total SKU Count" value="842" trend="1.2%" isPositive={true} icon={Package} color="blue-500" />
                    <StatCard title="Inventory Value" value="$452,000" trend="2.4%" isPositive={false} icon={BarChart3} color="indigo-500" />
                    <StatCard title="Out of Stock" value="12" trend="4" isPositive={false} icon={AlertTriangle} color="rose-500" />
                    <StatCard title="Incoming Orders" value="28" trend="15%" isPositive={true} icon={Truck} color="teal-500" />
                </div>

                <div className="glass-card rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <h3 className="font-bold tracking-tight">Product Stock Levels</h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-transparent hover:border-slate-200 transition-all">
                                <Search size={14} className="text-slate-400" />
                                <input type="text" placeholder="Filter by SKU or name..." className="bg-transparent border-none outline-none text-xs w-64" />
                            </div>
                        </div>
                    </div>
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                            <tr>
                                <th className="px-6 py-4">Product</th>
                                <th className="px-6 py-4">SKU</th>
                                <th className="px-6 py-4">Current Stock</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {inventoryData.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{item.name}</p>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-mono text-slate-500">{item.sku}</td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold">{item.stock} / {item.min}</span>
                                                <span className="text-[10px] text-slate-400">Min. req</span>
                                            </div>
                                            <div className="w-32 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${item.stock < item.min ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                                    style={{ width: `${Math.min((item.stock / item.min) * 100, 100)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${item.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-500' :
                                                item.status === 'Critically Low' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="flex items-center gap-1 text-[10px] font-bold text-primary hover:underline">
                                            Request Batch <ArrowRight size={12} />
                                        </button>
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

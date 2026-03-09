"use client";

import { Bell, Search, User } from "lucide-react";

export function DashboardHeader() {
    return (
        <header className="h-20 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 glass-card sticky top-0 z-10">
            <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-800/50 px-4 py-2 rounded-xl w-96 border border-slate-200 dark:border-slate-700/50">
                <Search size={18} className="text-slate-400" />
                <input
                    type="text"
                    placeholder="Search for orders, products, or AI insights..."
                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400"
                />
                <div className="text-[10px] bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded-md font-bold text-slate-500">⌘ K</div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                    <Bell size={20} className="text-slate-600 dark:text-slate-400" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                </button>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Server Status</p>
                        <p className="text-sm font-bold text-green-500 flex items-center gap-1.5 justify-end">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Operational
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    isPositive: boolean;
    icon: any;
    color: string;
}

export function StatCard({ title, value, trend, isPositive, icon: Icon, color }: StatCardProps) {
    return (
        <div className="p-6 rounded-2xl glass-card relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 scale-150 transform translate-x-12 -translate-y-12 rotate-12 transition-transform group-hover:rotate-45 duration-700`}>
                <Icon size={128} />
            </div>

            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-${color}`}>
                    <Icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                    {isPositive ? "+" : ""}{trend}
                </div>
            </div>

            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
        </div>
    );
}

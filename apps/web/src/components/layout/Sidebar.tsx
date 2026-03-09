"use client";

import {
  LayoutDashboard,
  Zap,
  ClipboardList,
  ShoppingCart,
  Wallet,
  ShieldCheck,
  Wallet2,
  Package,
  Users,
  TrendingUp,
  Settings,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Zap, label: "Market Feed", href: "/live-feed" },
  { icon: ClipboardList, label: "P2P (Procure)", href: "/p2p" },
  { icon: ShoppingCart, label: "OTC (Sales)", href: "/sales" },
  { icon: Wallet, label: "Finance (FI)", href: "/finance" },
  { icon: ShieldCheck, label: "GTS (Global)", href: "/gts" },
  { icon: Wallet2, label: "FICA / FSCD", href: "/financial-services" },
  { icon: Package, label: "Inventory", href: "/inventory" },
  { icon: Users, label: "HR Management", href: "/hr" },
  { icon: TrendingUp, label: "Analytics", href: "/analytics" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={cn(
        "h-screen sidebar-gradient text-slate-300 transition-all duration-300 ease-in-out border-r border-slate-700/50 flex flex-col",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-6 flex items-center justify-between">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white">X</div>
            <span className="font-bold text-xl text-white tracking-tight">X-ERP</span>
          </div>
        )}
        {!isOpen && (
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-white mx-auto">X</div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-slate-700/50 rounded-md transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "flex items-center gap-4 px-3 py-3 rounded-xl transition-all group hover:bg-white/5",
              !isOpen && "justify-center"
            )}
          >
            <item.icon className="group-hover:text-primary transition-colors" size={20} />
            {isOpen && <span className="text-sm font-medium">{item.label}</span>}
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <div className={cn("flex items-center gap-3", !isOpen && "justify-center")}>
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
            <Users size={20} />
          </div>
          {isOpen && (
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white">Adam Smith</p>
              <p className="text-xs text-slate-500 truncate">Administrator</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

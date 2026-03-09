"use client";

import { useEffect, useState } from "react";
import { DashboardHeader, StatCard } from "@/components/ui/DashboardUI";
import {
  TrendingUp,
  Users,
  Package,
  ShoppingCart,
  ArrowUpRight,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  Search,
  Plus
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newOrderCustomer, setNewOrderCustomer] = useState("");
  const [newOrderAmount, setNewOrderAmount] = useState("");

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3001/sales/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000); // Live poll
    return () => clearInterval(interval);
  }, []);

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderCustomer || !newOrderAmount) return;

    try {
      const response = await fetch('http://localhost:3001/sales/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: newOrderCustomer, amount: parseFloat(newOrderAmount) })
      });
      if (response.ok) {
        setIsCreating(false);
        setNewOrderCustomer("");
        setNewOrderAmount("");
        fetchOrders();
      }
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  const insights = [
    { title: "Low Inventory Alert", description: "Product SKU-99 (Mechanical Valves) is below threshold in Chennai.", type: "warning" },
    { title: "Demand Surge", description: "15% increase in orders for 'Electric Motors' predicted next week.", type: "info" },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-8 pt-0">
      <DashboardHeader />

      <div className="max-w-7xl mx-auto py-8 space-y-8">
        {/* Welcome Section */}
        <section className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Executive Overview</h1>
            <p className="text-slate-500 font-medium tracking-tight">Welcome back, Adam. Here's what's happening today.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors">Download Report</button>
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center gap-2"
            >
              <Plus size={18} /> Create New Order
            </button>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Revenue" value="$1,284,500" trend="12.5%" isPositive={true} icon={TrendingUp} color="blue-500" />
          <StatCard title="Active Orders" value={orders.length.toString()} trend="8%" isPositive={true} icon={ShoppingCart} color="indigo-500" />
          <StatCard title="Inventory Value" value="$452,000" trend="2.4%" isPositive={false} icon={Package} color="teal-500" />
          <StatCard title="Total Employees" value="1,240" trend="4" isPositive={true} icon={Users} color="rose-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Orders Table */}
            <div className="glass-card rounded-3xl overflow-hidden shadow-sm">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold tracking-tight">Recent Sales Orders</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Live Agent: Monitoring O2C Transactions</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-primary hover:underline">View All</button>
              </div>
              <div className="max-h-[500px] overflow-y-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 dark:bg-slate-900/50 text-[10px] uppercase tracking-widest text-slate-400 font-bold sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-4">Order ID</th>
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <AnimatePresence initial={false}>
                      {orders.map((order) => (
                        <motion.tr
                          key={order.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors group"
                        >
                          <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-300">{order.id}</td>
                          <td className="px-6 py-4 text-sm font-medium">{order.customer}</td>
                          <td className="px-6 py-4 text-sm font-bold">${order.amount.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${order.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                                order.status === 'Processing' ? 'bg-amber-500/10 text-amber-500' : 'bg-slate-500/10 text-slate-500'
                              }`}>
                              {order.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
              {loading && (
                <div className="p-8 flex justify-center"><Clock className="animate-spin text-slate-300" /></div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            {/* Live Update Agent Log */}
            <div className="glass-card p-8 rounded-3xl border border-primary/10 shadow-xl shadow-primary/5">
              <h3 className="font-bold mb-6 flex items-center gap-2 tracking-tight">
                <Sparkles size={18} className="text-primary" /> Live Update Agent
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-1 h-12 bg-primary/20 rounded-full mt-1"></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Internal Log Trace</p>
                    <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed italic">
                      "{orders.length > 0 ? `Detected transactional event from ${orders[0].customer}. Order ${orders[0].id} queued for settlement.` : 'Waiting for system triggers...'}"
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Agent Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
                    <span className="text-xs font-bold text-emerald-500">OPTIMIZING</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Insights Panel */}
            <div className="p-8 rounded-3xl bg-indigo-600 text-white relative overflow-hidden shadow-2xl shadow-indigo-500/20">
              <div className="absolute top-0 right-0 p-4 opacity-20"><ArrowUpRight size={80} /></div>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">Business Insights</h3>
              <div className="space-y-4">
                {insights.map((insight, i) => (
                  <div key={i} className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                    <p className="text-[10px] uppercase font-bold tracking-widest mb-1 opacity-70">{insight.title}</p>
                    <p className="text-sm font-medium leading-relaxed">{insight.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Order Modal */}
      <AnimatePresence>
        {isCreating && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 rounded-[32px] p-8 shadow-2xl relative z-10 border border-slate-200 dark:border-slate-800"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">New Sales Order</h2>
                  <p className="text-slate-500 text-sm font-medium">Add to the live O2C stream.</p>
                </div>
                <button onClick={() => setIsCreating(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-400">
                  <Plus className="rotate-45" size={24} />
                </button>
              </div>

              <form onSubmit={handleCreateOrder} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Customer Entity</label>
                  <input
                    required
                    type="text"
                    value={newOrderCustomer}
                    onChange={e => setNewOrderCustomer(e.target.value)}
                    placeholder="Tesla Corp / Starlink"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/20 transition-all font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Transaction Amount ($)</label>
                  <input
                    required
                    type="number"
                    value={newOrderAmount}
                    onChange={e => setNewOrderAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 outline-none focus:ring-2 ring-primary/20 transition-all font-bold"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={18} /> Initiate Order
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

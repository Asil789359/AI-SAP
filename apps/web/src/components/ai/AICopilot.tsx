"use client";

import { useState, useRef, useEffect } from "react";
import {
    Bot,
    Send,
    X,
    Sparkles,
    ThumbsUp,
    ThumbsDown,
    Repeat,
    Zap,
    ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const suggestions = [
    "Why did sales drop this month?",
    "Which vendors delayed delivery?",
    "Compare inventory in Chennai vs Mumbai",
    "Generate revenue forecast for Q3",
];

export default function AICopilot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hello! I'm your AI Business Copilot. How can I help you manage your ERP today?" }
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: "user", content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");

        try {
            const response = await fetch('http://localhost:3001/ai-copilot/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input, context: 'finance' })
            });
            const data = await response.json();
            setMessages(prev => [...prev, { role: "assistant", content: data.answer }]);
        } catch (error) {
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "I'm having trouble connecting to the business engine right now. Please ensure the backend services are running."
            }]);
        }
    };

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary text-white shadow-2xl flex items-center justify-center z-50 animate-float"
            >
                {isOpen ? <X size={24} /> : <Bot size={28} />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white"></span>
                )}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 50 }}
                        className="fixed bottom-28 right-8 w-[400px] h-[600px] rounded-3xl glass-card flex flex-col z-50 overflow-hidden border border-primary/20"
                    >
                        {/* Header */}
                        <div className="p-6 bg-primary/10 border-b border-primary/20 flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                <Bot size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                    AI Copilot <Sparkles size={14} className="text-amber-500" />
                                </h3>
                                <p className="text-xs text-slate-500 font-medium italic">Powered by GPT-4 & ERP-Engine</p>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth"
                        >
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user'
                                        ? 'bg-primary text-white ml-8 rounded-tr-none'
                                        : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 mr-8 rounded-tl-none'
                                        }`}>
                                        <p className="text-sm leading-relaxed">{msg.content}</p>
                                        {msg.role === 'assistant' && i > 0 && (
                                            <div className="mt-3 flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                                                <button className="text-slate-400 hover:text-emerald-500 transition-colors"><ThumbsUp size={14} /></button>
                                                <button className="text-slate-400 hover:text-rose-500 transition-colors"><ThumbsDown size={14} /></button>
                                                <button className="ml-auto text-xs font-bold text-primary flex items-center gap-1 hover:underline underline-offset-4">
                                                    Take Action <ChevronRight size={12} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer with suggestions and input */}
                        <div className="p-6 pt-0 space-y-4">
                            {messages.length < 3 && (
                                <div className="flex flex-wrap gap-2">
                                    {suggestions.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => { setInput(s); handleSend(); }}
                                            className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all font-medium"
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1.5 shadow-lg focus-within:ring-2 ring-primary/20 transition-all">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask your copilot anything..."
                                    className="flex-1 bg-transparent border-none outline-none px-3 text-sm"
                                />
                                <button
                                    onClick={handleSend}
                                    className="bg-primary text-white p-2.5 rounded-xl hover:bg-primary/90 transition-colors shadow-lg"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import AICopilot from "@/components/ai/AICopilot";

export const metadata: Metadata = {
  title: "AI-First ERP Platform",
  description: "Next-generation intelligent ERP for enterprise management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
          <Sidebar />
          <main className="flex-1 flex flex-col overflow-hidden">
            {children}
          </main>
        </div>
        <AICopilot />
      </body>
    </html>
  );
}

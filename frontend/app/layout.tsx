import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "ඇය (Eya) — AI-Powered Menstrual Health & Cycle Tracking",
  description: "Personalized cycle predictions, daily mood & symptom logging, and culturally safe AI health guidance."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <header className="glass-nav">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-brand-500/30 group-hover:scale-105 transition-transform">
                ඇ
              </span>
              <div>
                <span className="font-bold text-xl tracking-tight text-slate-900">ඇය (Eya)</span>
                <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 font-medium">
                  Health AI
                </span>
              </div>
            </Link>

            <nav className="flex items-center gap-1 sm:gap-2 text-sm font-medium">
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-xl text-slate-700 hover:text-brand-600 hover:bg-rose-50 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/calendar"
                className="px-3 py-2 rounded-xl text-slate-700 hover:text-brand-600 hover:bg-rose-50 transition-colors"
              >
                Calendar
              </Link>
              <Link
                href="/logging"
                className="px-3 py-2 rounded-xl text-slate-700 hover:text-brand-600 hover:bg-rose-50 transition-colors"
              >
                Daily Log
              </Link>
              <Link
                href="/chat"
                className="px-3 py-2 rounded-xl text-brand-600 font-semibold bg-brand-50 hover:bg-brand-100/70 transition-colors flex items-center gap-1.5"
              >
                <span>💬 Ask Eya</span>
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="border-t border-rose-100/60 py-6 text-center text-xs text-slate-400">
          <p>© 2026 ඇය (Eya) Health. Designed for privacy, algorithmic precision, and compassionate reproductive care.</p>
        </footer>
      </body>
    </html>
  );
}

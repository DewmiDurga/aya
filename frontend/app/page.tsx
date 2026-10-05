import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-brand-700 text-xs font-semibold tracking-wide">
          ✨ AI-Powered Menstrual Health & Wellness
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
          Understand your body with{" "}
          <span className="bg-gradient-to-r from-brand-600 via-rose-500 to-pink-500 bg-clip-text text-transparent">
            empathy & precision
          </span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Predict your cycle with adaptive statistical modeling, log daily symptoms, and converse safely with our context-aware Claude AI reproductive health assistant.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-lg shadow-brand-500/25 transition-all transform hover:-translate-y-0.5"
          >
            Open Cycle Dashboard →
          </Link>
          <Link
            href="/chat"
            className="px-6 py-3.5 rounded-2xl bg-white border border-rose-200 text-slate-700 hover:border-brand-300 font-semibold shadow-sm transition-all"
          >
            Chat with Eya AI
          </Link>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="glass-card p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-brand-600 flex items-center justify-center text-2xl font-bold">
            📊
          </div>
          <h3 className="text-lg font-bold text-slate-900">Adaptive Predictions</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Proprietary statistical engine calculates rolling weighted averages and standard deviations, offering reliable forecasts for both regular and irregular cycles.
          </p>
        </div>

        <div className="glass-card p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center text-2xl font-bold">
            🌸
          </div>
          <h3 className="text-lg font-bold text-slate-900">Holistic Daily Logging</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Record physical symptoms, flow intensities, and emotional shifts in seconds to build rich historical wellness patterns.
          </p>
        </div>

        <div className="glass-card p-6 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl font-bold">
            💬
          </div>
          <h3 className="text-lg font-bold text-slate-900">Context-Aware AI Chat</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Powered by Claude 3.5 Sonnet, Eya tailors answers to your current cycle phase while adhering to strict clinical safety guardrails.
          </p>
        </div>
      </section>

      {/* Security & Privacy Banner */}
      <section className="glass-card p-8 bg-gradient-to-r from-rose-100/60 to-pink-50 border-rose-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h4 className="font-bold text-slate-900 text-lg">🔒 Private & Secure by Design</h4>
          <p className="text-sm text-slate-600">
            Backed by PostgreSQL Row-Level Security (RLS) policies on Supabase. Your personal health records are strictly accessible only by you.
          </p>
        </div>
        <Link
          href="/logging"
          className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-white border border-rose-200 text-brand-700 font-semibold text-sm hover:bg-rose-50 shadow-sm"
        >
          Start Today's Log
        </Link>
      </section>
    </div>
  );
}

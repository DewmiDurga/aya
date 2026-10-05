"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface PredictionData {
  available: boolean;
  predictedStart?: string;
  rangeLow?: string;
  rangeHigh?: string;
  confidence?: "high" | "medium" | "low";
  avgCycleLength?: number;
  stdDevDays?: number;
  cycleType?: string;
  message?: string;
}

export default function DashboardPage() {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attempt to load from Express API, fallback to responsive demo state
    async function loadData() {
      try {
        const res = await fetch("http://localhost:4000/api/predictions");
        if (res.ok) {
          const data = await res.json();
          setPrediction(data);
        } else {
          throw new Error("Local API offline");
        }
      } catch (e) {
        // High fidelity demo fallback
        setPrediction({
          available: true,
          predictedStart: "2026-10-24",
          rangeLow: "2026-10-22",
          rangeHigh: "2026-10-26",
          confidence: "high",
          avgCycleLength: 28.5,
          stdDevDays: 1.8,
          cycleType: "regular"
        });
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Welcome Back, Ayomi 🌸</h1>
          <p className="text-sm text-slate-500 mt-1">
            Today is Monday, October 5, 2026 • Cycle Day 14 (Ovulation Phase)
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/logging"
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold shadow-md shadow-brand-500/20"
          >
            + Log Symptoms
          </Link>
          <Link
            href="/calendar"
            className="px-4 py-2 rounded-xl bg-white border border-rose-200 text-slate-700 text-sm font-semibold hover:bg-rose-50"
          >
            View Calendar
          </Link>
        </div>
      </div>

      {/* Main Cycle Status Hero Card */}
      <div className="glass-card p-8 bg-gradient-to-br from-rose-50 via-white to-pink-100/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="space-y-2 md:col-span-2">
            <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-700 font-semibold text-xs tracking-wider uppercase">
              Next Cycle Forecast
            </span>

            {loading ? (
              <p className="text-slate-500 animate-pulse py-4">Calculating adaptive predictions...</p>
            ) : prediction?.available ? (
              <div>
                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
                  {prediction.predictedStart}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Expected between <span className="font-semibold text-slate-800">{prediction.rangeLow}</span> and{" "}
                  <span className="font-semibold text-slate-800">{prediction.rangeHigh}</span>
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-4 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-medium">
                    ✓ Confidence: {prediction.confidence?.toUpperCase()}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-purple-100 text-purple-800 font-medium">
                    Cycle: {prediction.cycleType?.toUpperCase()}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
                    Avg Length: {prediction.avgCycleLength} Days
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-slate-600 py-3">{prediction?.message}</p>
            )}
          </div>

          {/* Quick Circular Indicator */}
          <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/70 border border-white shadow-sm text-center">
            <div className="w-24 h-24 rounded-full border-4 border-dashed border-brand-400 flex items-center justify-center text-center">
              <div>
                <span className="text-2xl font-extrabold text-brand-600">19</span>
                <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Days Left</span>
              </div>
            </div>
            <span className="text-xs text-slate-500 font-medium mt-3">Until Next Period</span>
          </div>
        </div>
      </div>

      {/* Grid: Cycle Phases & Health Tips */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Current Phase: Ovulatory</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              Peak Energy
            </span>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Estrogen levels peak during ovulation. You may feel heightened energy, focus, and creativity. High hydration and electrolyte balance are recommended.
          </p>
          <div className="w-full bg-rose-100/60 rounded-full h-2 overflow-hidden">
            <div className="bg-brand-500 h-2 rounded-full w-1/2" />
          </div>
        </div>

        <div className="glass-card p-6 space-y-4">
          <h3 className="font-bold text-slate-900">Need Guidance?</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Have questions about cramps, dietary advice, or irregular patterns? Chat confidentially with our contextual health assistant.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            Open Chat with Eya AI →
          </Link>
        </div>
      </div>
    </div>
  );
}

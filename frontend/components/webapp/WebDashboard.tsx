import React, { useState } from "react";
import {
  Smile,
  SunMedium,
  BatteryLow,
  Activity,
  Sparkles,
  Lock,
  Info,
  ChevronRight,
  PlusCircle,
  Calendar as CalendarIcon,
  Check,
  Disc,
  Brain,
  Heart
} from "lucide-react";
import { DailyLogState, WebTab } from "./types";

interface WebDashboardProps {
  logState: DailyLogState;
  onUpdateLog: (updater: (prev: DailyLogState) => DailyLogState) => void;
  onNavigateTab: (tab: WebTab) => void;
}

export function WebDashboard({ logState, onUpdateLog, onNavigateTab }: WebDashboardProps) {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const notify = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const toggleSymptom = (sym: string) => {
    onUpdateLog((prev) => {
      const exists = prev.symptoms.includes(sym);
      const next = exists ? prev.symptoms.filter((s) => s !== sym) : [...prev.symptoms, sym];
      return { ...prev, symptoms: next };
    });
    notify(`Updated: ${sym}`);
  };

  const handleMood = (mood: DailyLogState["mood"]) => {
    onUpdateLog((prev) => ({ ...prev, mood }));
    notify(`Mood: ${mood}`);
  };

  // SVG Ring calculation: 12 / 28 days = 43%
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = 12 / 28;
  const strokeDashoffset = circumference * (1 - progressRatio);

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-24 right-8 z-50 bg-[#1B1E28] text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <Check className="w-4 h-4 text-[#EDE8FC]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-white via-white to-[#F5F1FD] border border-[#ECE9F5] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-soft">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE8FC] text-[#5B3FD3] text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-[#5B3FD3]" />
            Follicular Phase · Day 12
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B1E28] tracking-tight">
            Good morning, Ana Ruiz
          </h2>
          <p className="text-sm text-[#7D8497] max-w-xl leading-relaxed">
            Your body is in the follicular phase where estrogen levels rise steadily, typically supporting heightened focus and physical vitality.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigateTab("log")}
            className="px-5 py-3 rounded-2xl bg-[#5B3FD3] hover:bg-[#4C32C2] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#5B3FD3]/20 transition-all hover:-translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Daily Check-in</span>
          </button>
          <button
            onClick={() => onNavigateTab("calendar")}
            className="px-5 py-3 rounded-2xl bg-white border border-[#EAE7F3] hover:bg-[#F8F8FC] text-[#1B1E28] text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <CalendarIcon className="w-4 h-4 text-[#5B3FD3]" />
            <span>Cycle Calendar</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cycle Phase Card (Expanded) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#ECE9F5] p-6 sm:p-8 shadow-soft flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#5B3FD3]" />
              <h3 className="text-base font-extrabold text-[#1B1E28]">
                Cycle Progress & Phase
              </h3>
            </div>

            <button
              onClick={() => setShowInfoModal(!showInfoModal)}
              className="px-3 py-1.5 rounded-xl bg-[#F5F1FD] hover:bg-[#EDE8FC] text-[#5B3FD3] text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Info className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Phase Guide</span>
            </button>
          </div>

          {/* Phase Guide Drawer */}
          {showInfoModal && (
            <div className="p-4 bg-[#F5F1FD] border border-[#E0D7F8] rounded-2xl text-xs text-[#4A4E5E] space-y-1.5 animate-in fade-in duration-200">
              <p className="font-extrabold text-[#5B3FD3] text-sm">Follicular Phase (Days 1–13)</p>
              <p className="leading-relaxed">
                Triggered by follicle-stimulating hormone (FSH), your ovaries prepare an egg for release. Rising estradiol boosts mood, metabolic resilience, and stamina.
              </p>
            </div>
          )}

          {/* Circular Ring Gauge + Key Dates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center py-2">
            {/* SVG Ring Gauge */}
            <div className="sm:col-span-5 flex justify-center">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <svg className="w-44 h-44 transform -rotate-90" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    className="stroke-[#EDE8FC]"
                    strokeWidth="12"
                    fill="transparent"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    className="stroke-[#5B3FD3] transition-all duration-1000 ease-out"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
                  <span className="text-xs text-[#7D8497] font-semibold tracking-wider uppercase">
                    Cycle Day
                  </span>
                  <span className="text-4xl font-extrabold text-[#1B1E28] tracking-tight leading-none my-1">
                    12
                  </span>
                  <span className="text-xs text-[#9BA1B4] font-medium">
                    of ~28 days
                  </span>
                </div>
              </div>
            </div>

            {/* Dates Summary Cards */}
            <div className="sm:col-span-7 space-y-4">
              <div className="p-4 rounded-2xl bg-[#F8F8FC] border border-[#ECE9F5] flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#7D8497]">Next Period Predicted</p>
                  <p className="text-xl font-extrabold text-[#1B1E28] mt-0.5">Oct 21, 2026</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FFF0EB] text-[#E67357] border border-[#FADBD2] text-xs font-bold">
                  in 16 days
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F8FC] border border-[#ECE9F5] flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#7D8497]">Estimated Fertile Window</p>
                  <p className="text-xl font-extrabold text-[#1B1E28] mt-0.5">Oct 9 – Oct 14</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#EDE8FC] text-[#5B3FD3] text-xs font-bold">
                  prediction only
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Cycle Timeline Bar */}
          <div className="space-y-2 pt-2 border-t border-[#ECE9F5]">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[#1B1E28]">Cycle Timeline (28 Days)</span>
              <span className="text-[#5B3FD3]">Day 12: 43% Completed</span>
            </div>

            <div className="h-3 w-full bg-[#EDE8FC] rounded-full overflow-hidden flex">
              {/* Menstrual (Days 1-5) */}
              <div style={{ width: "17.8%" }} className="h-full bg-[#FADBD2]" title="Menstrual phase (Days 1-5)" />
              {/* Follicular (Days 6-13) */}
              <div style={{ width: "28.5%" }} className="h-full bg-[#5B3FD3]" title="Current: Follicular phase (Days 6-13)" />
              {/* Fertile / Ovulation (Days 14-16) */}
              <div style={{ width: "10.7%" }} className="h-full bg-[#B8A3F8]" title="Fertile window (Days 14-16)" />
              {/* Luteal (Days 17-28) */}
              <div style={{ width: "43%" }} className="h-full bg-[#E5DFFA]" title="Luteal phase (Days 17-28)" />
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#7D8497] font-medium pt-1">
              <span>Day 1 (Period)</span>
              <span className="text-[#5B3FD3] font-bold">Today (Day 12)</span>
              <span>Day 14 (Ovulation)</span>
              <span>Day 28 (Next Period)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Today's Health Check-in & Symptoms */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Check-in Card */}
          <div className="bg-white rounded-3xl border border-[#ECE9F5] p-6 sm:p-7 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#1B1E28]">
                How are you today?
              </h3>
              <button
                onClick={() => onNavigateTab("log")}
                className="text-xs font-bold text-[#5B3FD3] hover:underline"
              >
                Open Full Log →
              </button>
            </div>

            {/* Mood options */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => handleMood("Good")}
                className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  logState.mood === "Good"
                    ? "bg-[#EDE8FC] border-2 border-[#5B3FD3] text-[#5B3FD3] shadow-sm font-bold"
                    : "bg-[#F8F8FC] text-[#4A4E5E] hover:bg-[#F2EDFD]"
                }`}
              >
                <Smile className="w-5 h-5 mb-1.5 stroke-[2.2]" />
                <span className="text-xs">Good</span>
              </button>

              <button
                onClick={() => handleMood("Steady")}
                className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  logState.mood === "Steady"
                    ? "bg-[#EDE8FC] border-2 border-[#5B3FD3] text-[#5B3FD3] shadow-sm font-bold"
                    : "bg-[#F8F8FC] text-[#4A4E5E] hover:bg-[#F2EDFD]"
                }`}
              >
                <SunMedium className="w-5 h-5 mb-1.5 stroke-[2.2]" />
                <span className="text-xs">Steady</span>
              </button>

              <button
                onClick={() => handleMood("Low")}
                className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  logState.mood === "Low"
                    ? "bg-[#EDE8FC] border-2 border-[#5B3FD3] text-[#5B3FD3] shadow-sm font-bold"
                    : "bg-[#F8F8FC] text-[#4A4E5E] hover:bg-[#F2EDFD]"
                }`}
              >
                <BatteryLow className="w-5 h-5 mb-1.5 stroke-[2.2]" />
                <span className="text-xs">Low</span>
              </button>

              <button
                onClick={() => toggleSymptom("Mild cramps")}
                className={`py-3 px-2 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  logState.symptoms.includes("Mild cramps")
                    ? "bg-[#5B3FD3] text-white shadow-md shadow-[#5B3FD3]/20 font-bold"
                    : "bg-[#F8F8FC] text-[#4A4E5E] hover:bg-[#F2EDFD]"
                }`}
              >
                <Activity className="w-5 h-5 mb-1.5 stroke-[2.2]" />
                <span className="text-xs">Cramps</span>
              </button>
            </div>

            {/* Quick symptom toggles */}
            <div className="pt-2 space-y-2">
              <p className="text-xs font-bold text-[#7D8497]">Current Symptoms Logged</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "Mild cramps", icon: Activity },
                  { name: "Bloating", icon: Disc },
                  { name: "Headache", icon: Brain },
                  { name: "Tenderness", icon: Heart },
                ].map((s) => {
                  const active = logState.symptoms.includes(s.name);
                  const IconComp = s.icon;
                  return (
                    <button
                      key={s.name}
                      onClick={() => toggleSymptom(s.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        active
                          ? "bg-[#5B3FD3] text-white shadow-sm"
                          : "bg-[#F8F8FC] border border-[#ECE9F5] text-[#4A4E5E] hover:border-[#5B3FD3]"
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5 stroke-[2]" />
                      <span>{s.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Energy rating */}
            <div className="pt-2 border-t border-[#ECE9F5] flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-[#1B1E28]">Energy Level</p>
                <p className="text-[11px] text-[#7D8497]">Rating: {logState.energy}/5</p>
              </div>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      onUpdateLog((p) => ({ ...p, energy: lvl }));
                      notify(`Energy set to ${lvl}/5`);
                    }}
                    className={`w-6 h-3 rounded-full transition-all hover:scale-110 ${
                      lvl <= logState.energy ? "bg-[#5B3FD3]" : "bg-[#EDE8FC]"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Phase Insight Callout Card */}
          <div className="bg-white rounded-3xl border border-[#ECE9F5] p-5 shadow-soft flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0EB] border border-[#FADBD2] flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#E67357] stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-[#1B1E28]">
                A little more energy may be ahead
              </h4>
              <p className="text-xs text-[#7D8497] leading-relaxed mt-1">
                Your recent logs suggest energy tends to rise in this phase as estrogen peaks. A great time for physical activity and creative projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Insights & Privacy Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-[#ECE9F5] p-5 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-2xl font-extrabold text-[#1B1E28]">28 d</p>
            <p className="text-xs text-[#7D8497] font-medium">Average Cycle Length</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EDE8FC] text-[#5B3FD3]">
            Regular
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-[#ECE9F5] p-5 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-2xl font-extrabold text-[#1B1E28]">5 d</p>
            <p className="text-xs text-[#7D8497] font-medium">Average Period Length</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FFF0EB] text-[#E67357]">
            Typical
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-[#ECE9F5] p-5 shadow-soft flex items-center justify-between">
          <div>
            <p className="text-2xl font-extrabold text-[#1B1E28]">± 2 d</p>
            <p className="text-xs text-[#7D8497] font-medium">Variance (Last 5 Cycles)</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Highly Consistent
          </span>
        </div>
      </div>
    </div>
  );
}

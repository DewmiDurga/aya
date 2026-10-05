import React, { useState } from "react";
import { Smile, SunMedium, BatteryLow, Activity, Sparkles, Lock, Info, Check } from "lucide-react";
import { DailyLogState, TabType } from "./types";

interface TodayViewProps {
  logState: DailyLogState;
  onUpdateLog: (updater: (prev: DailyLogState) => DailyLogState) => void;
  onNavigateTab: (tab: TabType) => void;
}

export function TodayView({ logState, onUpdateLog, onNavigateTab }: TodayViewProps) {
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [quickToast, setQuickToast] = useState<string | null>(null);

  // Quick check-in toggle
  const toggleQuickSymptom = (symptom: string) => {
    onUpdateLog((prev) => {
      const exists = prev.symptoms.includes(symptom);
      const nextSymptoms = exists
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom];
      return { ...prev, symptoms: nextSymptoms };
    });
    setQuickToast(`Updated: ${symptom}`);
    setTimeout(() => setQuickToast(null), 2000);
  };

  const handleQuickMood = (mood: DailyLogState["mood"]) => {
    onUpdateLog((prev) => ({ ...prev, mood }));
    setQuickToast(`Mood updated: ${mood}`);
    setTimeout(() => setQuickToast(null), 2000);
  };

  // Ring calculation: Day 12 of 28 days = ~43%
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = 12 / 28;
  const strokeDashoffset = circumference * (1 - progressRatio);

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 hide-scrollbar">
      {/* Toast feedback */}
      {quickToast && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-[#1B1E28] text-white text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
          <Check className="w-3.5 h-3.5 text-[#EDE8FC]" />
          <span>{quickToast}</span>
        </div>
      )}

      {/* Header */}
      <header className="flex items-center justify-between pt-1">
        <div>
          <p className="text-xs text-[#7D8497] font-medium tracking-wide">
            Monday, October 5
          </p>
          <h1 className="text-2xl font-extrabold text-[#1B1E28] tracking-tight mt-0.5">
            Good morning, Ana
          </h1>
        </div>

        <button 
          onClick={() => onNavigateTab("insights")}
          className="w-10 h-10 rounded-full bg-[#EDE8FC] text-[#5B3FD3] font-bold text-sm flex items-center justify-center border border-[#E0D7F8] hover:scale-105 active:scale-95 transition-transform"
          title="Ana Ruiz - View Insights"
        >
          AR
        </button>
      </header>

      {/* Main Cycle Card: Follicular phase */}
      <section className="aya-card p-5 relative overflow-hidden">
        {/* Phase tag & info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5B3FD3]"></span>
            <span className="text-xs font-bold text-[#5B3FD3] tracking-wide">
              Follicular phase
            </span>
          </div>

          <button
            onClick={() => setShowInfoModal(!showInfoModal)}
            className="w-6 h-6 rounded-full bg-[#F5F1FD] text-[#5B3FD3] flex items-center justify-center hover:bg-[#EDE8FC] transition-colors"
            aria-label="Cycle info"
          >
            <Info className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>

        {/* Modal tooltip if open */}
        {showInfoModal && (
          <div className="mb-4 p-3 bg-[#F4F0FE] border border-[#E4DCFB] rounded-xl text-xs text-[#4A4E5E] space-y-1 animate-in fade-in duration-200">
            <p className="font-bold text-[#5B3FD3]">What is the Follicular Phase?</p>
            <p className="leading-relaxed">
              Begins on day 1 of your period and ends when you ovulate. Estrogen rises, helping your energy, mood, and focus bounce back.
            </p>
          </div>
        )}

        {/* Circular Progress & Key Dates Grid */}
        <div className="flex items-center justify-between gap-2 pt-1">
          {/* Circular Ring Gauge */}
          <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              {/* Background Track */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-[#EDE8FC]"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Active Progress */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-[#5B3FD3] transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Center Text inside Ring */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
              <span className="text-[10px] text-[#7D8497] font-semibold tracking-wider">
                Cycle day
              </span>
              <span className="text-3xl font-extrabold text-[#1B1E28] tracking-tight leading-none my-0.5">
                12
              </span>
              <span className="text-[10px] text-[#9BA1B4] font-medium">
                of ~28 days
              </span>
            </div>
          </div>

          {/* Right side next period / fertile window */}
          <div className="flex-1 pl-4 flex flex-col justify-center space-y-2.5">
            <div>
              <p className="text-[11px] font-medium text-[#7D8497]">Next period</p>
              <p className="text-xl font-extrabold text-[#1B1E28] leading-tight">Oct 21</p>
              <p className="text-[11px] text-[#9BA1B4]">in 16 days</p>
            </div>

            <div className="border-t border-[#ECE7F3] w-full" />

            <div>
              <p className="text-[11px] font-medium text-[#7D8497]">Fertile window</p>
              <p className="text-lg font-extrabold text-[#1B1E28] leading-tight">Oct 9–14</p>
              <p className="text-[11px] text-[#9BA1B4]">prediction only</p>
            </div>
          </div>
        </div>
      </section>

      {/* How are you today? Section */}
      <section className="aya-card p-5 space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-[#1B1E28]">
            How are you today?
          </h2>
          <button
            onClick={() => onNavigateTab("log")}
            className="text-xs font-bold text-[#5B3FD3] hover:text-[#472FB8] transition-colors"
          >
            Log details
          </button>
        </div>

        {/* 4 quick symptom & mood tiles */}
        <div className="grid grid-cols-4 gap-2">
          {/* Good Mood */}
          <button
            onClick={() => handleQuickMood("Good")}
            className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl transition-all duration-200 ${
              logState.mood === "Good"
                ? "bg-[#EDE8FC] border-2 border-[#5B3FD3] text-[#5B3FD3] shadow-sm scale-102"
                : "bg-[#F7F6FB] border border-transparent text-[#4A4E5E] hover:bg-[#EFEBF9]"
            }`}
          >
            <Smile className="w-5 h-5 mb-1.5 stroke-[2.2]" />
            <span className="text-[11px] font-bold">Good</span>
          </button>

          {/* Steady Mood */}
          <button
            onClick={() => handleQuickMood("Steady")}
            className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl transition-all duration-200 ${
              logState.mood === "Steady"
                ? "bg-[#EDE8FC] border-2 border-[#5B3FD3] text-[#5B3FD3] shadow-sm scale-102"
                : "bg-[#F7F6FB] border border-transparent text-[#4A4E5E] hover:bg-[#EFEBF9]"
            }`}
          >
            <SunMedium className="w-5 h-5 mb-1.5 stroke-[2.2]" />
            <span className="text-[11px] font-bold">Steady</span>
          </button>

          {/* Low Mood / Energy */}
          <button
            onClick={() => handleQuickMood("Low")}
            className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl transition-all duration-200 ${
              logState.mood === "Low"
                ? "bg-[#EDE8FC] border-2 border-[#5B3FD3] text-[#5B3FD3] shadow-sm scale-102"
                : "bg-[#F7F6FB] border border-transparent text-[#4A4E5E] hover:bg-[#EFEBF9]"
            }`}
          >
            <BatteryLow className="w-5 h-5 mb-1.5 stroke-[2.2]" />
            <span className="text-[11px] font-bold">Low</span>
          </button>

          {/* Cramps Symptom */}
          <button
            onClick={() => toggleQuickSymptom("Mild cramps")}
            className={`flex flex-col items-center justify-center py-3 px-1 rounded-2xl transition-all duration-200 ${
              logState.symptoms.includes("Mild cramps")
                ? "bg-[#5B3FD3] text-white shadow-md shadow-[#5B3FD3]/20 scale-102"
                : "bg-[#F7F6FB] border border-transparent text-[#4A4E5E] hover:bg-[#EFEBF9]"
            }`}
          >
            <Activity className="w-5 h-5 mb-1.5 stroke-[2.2]" />
            <span className="text-[11px] font-bold">Cramps</span>
          </button>
        </div>
      </section>

      {/* Insight Card: A little more energy may be ahead */}
      <section className="aya-card p-4 flex items-center gap-3.5 bg-white border border-[#EFEBF8]">
        <div className="w-11 h-11 rounded-2xl bg-[#FFF0EB] border border-[#FADBD2] flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-[#E67357] stroke-[2.2]" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-[#1B1E28]">
            A little more energy may be ahead
          </h3>
          <p className="text-[11px] text-[#7D8497] leading-relaxed mt-0.5">
            Your recent logs suggest energy tends to rise in this phase.
          </p>
        </div>
      </section>

      {/* Data Encryption & Medical Advice Disclaimer Card */}
      <section className="p-3.5 bg-[#F4F0FE] border border-[#ECE7FC] rounded-2xl flex items-center gap-3">
        <div className="w-6 h-6 rounded-lg bg-white/80 flex items-center justify-center shrink-0 text-[#5B3FD3]">
          <Lock className="w-3.5 h-3.5 stroke-[2.2]" />
        </div>
        <p className="text-[11px] text-[#5B3FD3]/90 leading-snug">
          Predictions are estimates, not medical advice. Your data is encrypted on this device.
        </p>
      </section>
    </div>
  );
}

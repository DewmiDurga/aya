import React, { useState } from "react";
import {
  Lock,
  Sun,
  Smile,
  Minus,
  Cloud,
  CloudRain,
  Activity,
  Disc,
  Brain,
  Heart,
  Edit,
  Check,
  Plus
} from "lucide-react";
import { DailyLogState, MoodType, FlowType, TabType } from "./types";

interface LogViewProps {
  logState: DailyLogState;
  onUpdateLog: (updater: (prev: DailyLogState) => DailyLogState) => void;
  onNavigateTab: (tab: TabType) => void;
}

export function LogView({ logState, onUpdateLog, onNavigateTab }: LogViewProps) {
  const [selectedDateIndex, setSelectedDateIndex] = useState(3); // Mon 5
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);
  const [customSymptomInput, setCustomSymptomInput] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Date strip around Oct 5
  const dateStrip = [
    { dayName: "Fri", dateNum: 2 },
    { dayName: "Sat", dateNum: 3 },
    { dayName: "Sun", dateNum: 4 },
    { dayName: "Mon", dateNum: 5 },
    { dayName: "Tue", dateNum: 6 },
  ];

  // Available mood choices
  const moods: { label: MoodType; icon: React.ComponentType<{ className?: string }> }[] = [
    { label: "Bright", icon: Sun },
    { label: "Good", icon: Smile },
    { label: "Steady", icon: Minus },
    { label: "Low", icon: Cloud },
    { label: "Tearful", icon: CloudRain },
  ];

  // Flow options
  const flows: FlowType[] = ["None", "Spotting", "Light", "Medium", "Heavy"];

  // Toggle symptom
  const toggleSymptom = (name: string) => {
    onUpdateLog((prev) => {
      const exists = prev.symptoms.includes(name);
      return {
        ...prev,
        symptoms: exists ? prev.symptoms.filter((s) => s !== name) : [...prev.symptoms, name],
      };
    });
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSymptomInput.trim()) return;
    const clean = customSymptomInput.trim();
    if (!logState.symptoms.includes(clean)) {
      onUpdateLog((prev) => ({
        ...prev,
        symptoms: [...prev.symptoms, clean],
      }));
    }
    setCustomSymptomInput("");
    setShowAddCustomModal(false);
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onNavigateTab("today");
    }, 1200);
  };

  const getEnergyLabel = (level: number) => {
    switch (level) {
      case 1:
        return "Low · 1/5";
      case 2:
        return "Mild · 2/5";
      case 3:
        return "Moderate · 3/5";
      case 4:
        return "High · 4/5";
      case 5:
        return "Maximum · 5/5";
      default:
        return "Moderate · 3/5";
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 hide-scrollbar">
      {/* Header */}
      <header className="flex items-center justify-between pt-1">
        <div>
          <p className="text-xs text-[#7D8497] font-medium tracking-wide">
            Monday, October 5
          </p>
          <h1 className="text-2xl font-extrabold text-[#1B1E28] tracking-tight mt-0.5">
            Daily check-in
          </h1>
        </div>

        <button 
          className="w-10 h-10 rounded-full bg-white border border-[#EAE7F3] flex items-center justify-center text-[#5B3FD3] shadow-sm hover:bg-[#F8F7FD] transition-colors"
          aria-label="Privacy locked"
        >
          <Lock className="w-4 h-4 stroke-[2.2]" />
        </button>
      </header>

      {/* Date Strip */}
      <section className="flex items-center justify-between gap-1.5 pt-1">
        {dateStrip.map((item, idx) => {
          const isSelected = selectedDateIndex === idx;
          return (
            <button
              key={`${item.dayName}-${item.dateNum}`}
              onClick={() => setSelectedDateIndex(idx)}
              className={`flex-1 py-2.5 rounded-2xl flex flex-col items-center justify-center transition-all duration-200 ${
                isSelected
                  ? "bg-[#5B3FD3] text-white shadow-md shadow-[#5B3FD3]/25 scale-102"
                  : "bg-white border border-[#ECE9F5] text-[#1B1E28] hover:bg-[#F8F7FD]"
              }`}
            >
              <span
                className={`text-[11px] font-medium ${
                  isSelected ? "text-white/80" : "text-[#7D8497]"
                }`}
              >
                {item.dayName}
              </span>
              <span className="text-base font-extrabold leading-tight mt-0.5">
                {item.dateNum}
              </span>
            </button>
          );
        })}
      </section>

      {/* Section: How's your mood? */}
      <section className="aya-card p-4 space-y-3">
        <h2 className="text-base font-extrabold text-[#1B1E28]">
          How’s your mood?
        </h2>

        <div className="grid grid-cols-5 gap-1.5">
          {moods.map((m) => {
            const isSelected = logState.mood === m.label;
            const IconComp = m.icon;
            return (
              <button
                key={m.label}
                onClick={() => onUpdateLog((prev) => ({ ...prev, mood: m.label }))}
                className={`flex flex-col items-center justify-center py-2.5 px-1 rounded-2xl transition-all duration-200 ${
                  isSelected
                    ? "bg-[#F5F1FD] border-2 border-[#5B3FD3] text-[#5B3FD3] shadow-sm scale-102"
                    : "bg-[#F7F6FB] border border-transparent text-[#7D8497] hover:text-[#1B1E28] hover:bg-[#EFEBF9]"
                }`}
              >
                <IconComp className="w-5 h-5 mb-1 stroke-[2.2]" />
                <span className="text-[10px] font-bold tracking-tight">
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Section: Flow (Optional) */}
      <section className="aya-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-[#1B1E28]">Flow</h2>
          <span className="text-xs text-[#9BA1B4] font-medium">Optional</span>
        </div>

        <div className="flex items-center justify-between gap-1.5">
          {flows.map((flow) => {
            const isSelected = logState.flow === flow;
            return (
              <button
                key={flow}
                onClick={() => onUpdateLog((prev) => ({ ...prev, flow }))}
                className={`flex-1 py-2 px-1 text-center text-xs font-bold rounded-xl transition-all duration-200 ${
                  isSelected
                    ? "bg-[#5B3FD3] text-white shadow-sm"
                    : "bg-[#F7F6FB] text-[#7D8497] hover:bg-[#ECE9F5]"
                }`}
              >
                {flow}
              </button>
            );
          })}
        </div>
      </section>

      {/* Section: Symptoms */}
      <section className="aya-card p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-[#1B1E28]">Symptoms</h2>
          <button
            onClick={() => setShowAddCustomModal(true)}
            className="text-xs font-bold text-[#5B3FD3] hover:text-[#472FB8] transition-colors"
          >
            + Add custom
          </button>
        </div>

        {/* Modal for adding custom symptom */}
        {showAddCustomModal && (
          <form onSubmit={handleAddCustom} className="p-3 bg-[#F4F0FE] rounded-2xl space-y-2">
            <p className="text-xs font-bold text-[#5B3FD3]">Add Custom Symptom</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={customSymptomInput}
                onChange={(e) => setCustomSymptomInput(e.target.value)}
                placeholder="e.g. Back pain, Nausea..."
                className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[#E0D7F8] bg-white text-[#1B1E28] focus:outline-none focus:ring-2 focus:ring-[#5B3FD3]"
                autoFocus
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#5B3FD3] text-white text-xs font-bold rounded-xl"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowAddCustomModal(false)}
                className="px-2 py-1.5 text-xs text-[#7D8497]"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Symptoms 2x2 grid */}
        <div className="grid grid-cols-2 gap-2">
          {/* Mild cramps */}
          <button
            onClick={() => toggleSymptom("Mild cramps")}
            className={`py-3 px-3 rounded-2xl flex items-center gap-2 text-xs font-bold transition-all duration-200 ${
              logState.symptoms.includes("Mild cramps")
                ? "bg-[#5B3FD3] text-white shadow-md shadow-[#5B3FD3]/20"
                : "bg-white border border-[#EAE7F3] text-[#4A4E5E] hover:border-[#5B3FD3]"
            }`}
          >
            <Activity className="w-4 h-4 stroke-[2.2] shrink-0" />
            <span>Mild cramps</span>
          </button>

          {/* Bloating */}
          <button
            onClick={() => toggleSymptom("Bloating")}
            className={`py-3 px-3 rounded-2xl flex items-center gap-2 text-xs font-bold transition-all duration-200 ${
              logState.symptoms.includes("Bloating")
                ? "bg-[#5B3FD3] text-white shadow-md shadow-[#5B3FD3]/20"
                : "bg-white border border-[#EAE7F3] text-[#4A4E5E] hover:border-[#5B3FD3]"
            }`}
          >
            <Disc className="w-4 h-4 stroke-[2.2] shrink-0" />
            <span>Bloating</span>
          </button>

          {/* Headache */}
          <button
            onClick={() => toggleSymptom("Headache")}
            className={`py-3 px-3 rounded-2xl flex items-center gap-2 text-xs font-bold transition-all duration-200 ${
              logState.symptoms.includes("Headache")
                ? "bg-[#5B3FD3] text-white shadow-md shadow-[#5B3FD3]/20"
                : "bg-white border border-[#EAE7F3] text-[#4A4E5E] hover:border-[#5B3FD3]"
            }`}
          >
            <Brain className="w-4 h-4 stroke-[2.2] shrink-0" />
            <span>Headache</span>
          </button>

          {/* Tenderness */}
          <button
            onClick={() => toggleSymptom("Tenderness")}
            className={`py-3 px-3 rounded-2xl flex items-center gap-2 text-xs font-bold transition-all duration-200 ${
              logState.symptoms.includes("Tenderness")
                ? "bg-[#5B3FD3] text-white shadow-md shadow-[#5B3FD3]/20"
                : "bg-white border border-[#EAE7F3] text-[#4A4E5E] hover:border-[#5B3FD3]"
            }`}
          >
            <Heart className="w-4 h-4 stroke-[2.2] shrink-0" />
            <span>Tenderness</span>
          </button>

          {/* Custom symptoms added by user */}
          {logState.symptoms
            .filter((s) => !["Mild cramps", "Bloating", "Headache", "Tenderness"].includes(s))
            .map((custom) => (
              <button
                key={custom}
                onClick={() => toggleSymptom(custom)}
                className="py-3 px-3 rounded-2xl flex items-center gap-2 text-xs font-bold bg-[#5B3FD3] text-white shadow-md shadow-[#5B3FD3]/20"
              >
                <Plus className="w-4 h-4 stroke-[2.2] shrink-0" />
                <span>{custom}</span>
              </button>
            ))}
        </div>
      </section>

      {/* Section: Energy */}
      <section className="aya-card p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-[#1B1E28]">Energy</h2>
            <p className="text-xs text-[#7D8497] font-medium mt-0.5">
              {getEnergyLabel(logState.energy)}
            </p>
          </div>

          {/* 5 rounded pill bars */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((lvl) => {
              const isFilled = lvl <= logState.energy;
              return (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => onUpdateLog((prev) => ({ ...prev, energy: lvl }))}
                  aria-label={`Energy level ${lvl}`}
                  className={`w-6 h-3 rounded-full transition-all duration-200 hover:scale-110 ${
                    isFilled ? "bg-[#5B3FD3]" : "bg-[#EDE8FC]"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Note input field */}
      <section className="bg-white border border-[#EAE7F3] rounded-2xl p-3.5 flex items-center gap-2.5 shadow-sm">
        <Edit className="w-4 h-4 text-[#5B3FD3] stroke-[2.2] shrink-0" />
        <input
          type="text"
          value={logState.note}
          onChange={(e) =>
            onUpdateLog((prev) => ({ ...prev, note: e.target.value }))
          }
          placeholder="Add a private note about today..."
          className="flex-1 text-xs text-[#1B1E28] placeholder-[#9BA1B4] bg-transparent focus:outline-none"
        />
        <span className="text-[10px] font-bold text-[#5B3FD3] bg-[#F5F1FD] px-2 py-0.5 rounded-full shrink-0">
          Only you
        </span>
      </section>

      {/* Primary Submit Button */}
      <div className="pt-1 pb-2">
        <button
          onClick={handleSave}
          disabled={saveSuccess}
          className={`w-full py-4 rounded-2xl text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all duration-200 ${
            saveSuccess
              ? "bg-[#2EB872] shadow-emerald-500/25 scale-98"
              : "bg-[#5B3FD3] hover:bg-[#4C32C2] active:scale-98 shadow-[#5B3FD3]/25"
          }`}
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{saveSuccess ? "Check-in Saved! ✨" : "Save today's check-in"}</span>
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  Sun,
  Smile,
  Minus,
  Cloud,
  CloudRain,
  Activity,
  Disc,
  Brain,
  Heart,
  Plus,
  Lock,
  Check,
  Edit3
} from "lucide-react";
import { DailyLogState, MoodType, FlowType, WebTab } from "./types";

interface WebLogProps {
  logState: DailyLogState;
  onUpdateLog: (updater: (prev: DailyLogState) => DailyLogState) => void;
  onNavigateTab: (tab: WebTab) => void;
}

export function WebLog({ logState, onUpdateLog, onNavigateTab }: WebLogProps) {
  const [selectedDateIdx, setSelectedDateIdx] = useState(3); // Mon 5
  const [customSymptom, setCustomSymptom] = useState("");
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const dates = [
    { day: "Fri", num: 2, label: "Oct 2" },
    { day: "Sat", num: 3, label: "Oct 3" },
    { day: "Sun", num: 4, label: "Oct 4" },
    { day: "Mon", num: 5, label: "Oct 5 (Today)" },
    { day: "Tue", num: 6, label: "Oct 6" },
  ];

  const moods: { label: MoodType; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { label: "Bright", desc: "Joyful & uplifted", icon: Sun },
    { label: "Good", desc: "Pleasant & balanced", icon: Smile },
    { label: "Steady", desc: "Neutral & calm", icon: Minus },
    { label: "Low", desc: "Tired or subdued", icon: Cloud },
    { label: "Tearful", desc: "Sensitive or tender", icon: CloudRain },
  ];

  const flows: { label: FlowType; desc: string }[] = [
    { label: "None", desc: "No bleeding or spotting" },
    { label: "Spotting", desc: "Very light trace drops" },
    { label: "Light", desc: "Requires pantyliner" },
    { label: "Medium", desc: "Standard menstrual flow" },
    { label: "Heavy", desc: "Requires frequent changes" },
  ];

  const toggleSymptom = (sym: string) => {
    onUpdateLog((prev) => {
      const exists = prev.symptoms.includes(sym);
      return {
        ...prev,
        symptoms: exists ? prev.symptoms.filter((s) => s !== sym) : [...prev.symptoms, sym],
      };
    });
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSymptom.trim()) return;
    const clean = customSymptom.trim();
    if (!logState.symptoms.includes(clean)) {
      onUpdateLog((prev) => ({
        ...prev,
        symptoms: [...prev.symptoms, clean],
      }));
    }
    setCustomSymptom("");
    setShowAddCustom(false);
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onNavigateTab("dashboard");
    }, 1500);
  };

  const getEnergyDescription = (lvl: number) => {
    switch (lvl) {
      case 1:
        return "Low · Resting & recharging";
      case 2:
        return "Mild · Gentle pace today";
      case 3:
        return "Moderate · Steady & productive";
      case 4:
        return "High · Vibrant & active";
      case 5:
        return "Peak · Full vitality & endurance";
      default:
        return "Moderate · Steady & productive";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Date Switcher Strip */}
      <div className="bg-white rounded-3xl border border-[#ECE9F5] p-4 shadow-soft flex items-center justify-between gap-3">
        <span className="text-xs font-bold text-[#7D8497] px-3 hidden sm:inline-block">
          Select Date:
        </span>
        <div className="flex-1 grid grid-cols-5 gap-2">
          {dates.map((item, idx) => {
            const isSelected = selectedDateIdx === idx;
            return (
              <button
                key={item.label}
                onClick={() => setSelectedDateIdx(idx)}
                className={`py-3 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? "bg-[#5B3FD3] text-white shadow-md shadow-[#5B3FD3]/20 font-bold scale-102"
                    : "bg-[#F8F8FC] border border-[#ECE9F5] text-[#1B1E28] hover:bg-[#F2EDFD]"
                }`}
              >
                <span className={`text-xs ${isSelected ? "text-white/80" : "text-[#7D8497]"}`}>
                  {item.day}
                </span>
                <span className="text-base font-extrabold mt-0.5">{item.num}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mood Section */}
      <div className="bg-white rounded-3xl border border-[#ECE9F5] p-6 sm:p-8 shadow-soft space-y-4">
        <div>
          <h3 className="text-lg font-extrabold text-[#1B1E28]">
            How is your mood today?
          </h3>
          <p className="text-xs text-[#7D8497] mt-0.5">
            Select the state that most closely describes your current emotional tone
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {moods.map((m) => {
            const isSelected = logState.mood === m.label;
            const IconComp = m.icon;
            return (
              <button
                key={m.label}
                onClick={() => onUpdateLog((prev) => ({ ...prev, mood: m.label }))}
                className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? "bg-[#F5F1FD] border-2 border-[#5B3FD3] text-[#5B3FD3] shadow-md shadow-[#5B3FD3]/10 scale-102"
                    : "bg-[#F8F8FC] border-[#ECE9F5] text-[#4A4E5E] hover:border-[#5B3FD3]/50 hover:bg-[#FAF9FE]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 ${
                    isSelected ? "bg-[#5B3FD3] text-white" : "bg-white text-[#5B3FD3]"
                  }`}
                >
                  <IconComp className="w-5 h-5 stroke-[2.2]" />
                </div>
                <span className="text-xs font-extrabold text-[#1B1E28]">{m.label}</span>
                <span className="text-[10px] text-[#7D8497] mt-0.5 leading-tight">{m.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Flow Intensity Section */}
      <div className="bg-white rounded-3xl border border-[#ECE9F5] p-6 sm:p-8 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-[#1B1E28]">Flow Intensity</h3>
            <p className="text-xs text-[#7D8497] mt-0.5">
              Record bleeding or discharge if applicable (optional)
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F8F8FC] text-[#7D8497]">
            Optional
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {flows.map((f) => {
            const isSelected = logState.flow === f.label;
            return (
              <button
                key={f.label}
                onClick={() => onUpdateLog((prev) => ({ ...prev, flow: f.label }))}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-[#5B3FD3] border-[#5B3FD3] text-white shadow-md shadow-[#5B3FD3]/20"
                    : "bg-[#F8F8FC] border-[#ECE9F5] text-[#1B1E28] hover:border-[#5B3FD3]"
                }`}
              >
                <p className="text-xs font-bold leading-tight">{f.label}</p>
                <p
                  className={`text-[10px] mt-1 leading-tight ${
                    isSelected ? "text-white/80" : "text-[#7D8497]"
                  }`}
                >
                  {f.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Symptoms Section */}
      <div className="bg-white rounded-3xl border border-[#ECE9F5] p-6 sm:p-8 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-[#1B1E28]">Physical Symptoms</h3>
            <p className="text-xs text-[#7D8497] mt-0.5">
              Select all bodily sensations you are noticing today
            </p>
          </div>

          <button
            onClick={() => setShowAddCustom(true)}
            className="text-xs font-bold text-[#5B3FD3] hover:text-[#472FB8] flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom</span>
          </button>
        </div>

        {/* Modal / Inline input for custom symptom */}
        {showAddCustom && (
          <form
            onSubmit={handleAddCustom}
            className="p-4 bg-[#F5F1FD] border border-[#E0D7F8] rounded-2xl flex flex-col sm:flex-row gap-3 items-center animate-in fade-in"
          >
            <input
              type="text"
              value={customSymptom}
              onChange={(e) => setCustomSymptom(e.target.value)}
              placeholder="e.g. Lower back pain, Nausea, Insomnia..."
              className="flex-1 w-full px-4 py-2.5 rounded-xl border border-[#ECE9F5] text-xs text-[#1B1E28] bg-white focus:outline-none focus:ring-2 focus:ring-[#5B3FD3]"
              autoFocus
            />
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#5B3FD3] hover:bg-[#4C32C2] text-white text-xs font-bold rounded-xl shadow-sm"
              >
                Add Symptom
              </button>
              <button
                type="button"
                onClick={() => setShowAddCustom(false)}
                className="px-3 py-2.5 text-xs text-[#7D8497]"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                className={`p-4 rounded-2xl border flex items-center gap-3 transition-all ${
                  active
                    ? "bg-[#5B3FD3] border-[#5B3FD3] text-white shadow-md shadow-[#5B3FD3]/20"
                    : "bg-[#F8F8FC] border-[#ECE9F5] text-[#1B1E28] hover:border-[#5B3FD3]"
                }`}
              >
                <IconComp className="w-4 h-4 stroke-[2.2] shrink-0" />
                <span className="text-xs font-extrabold">{s.name}</span>
              </button>
            );
          })}

          {/* User added custom symptoms */}
          {logState.symptoms
            .filter((s) => !["Mild cramps", "Bloating", "Headache", "Tenderness"].includes(s))
            .map((custom) => (
              <button
                key={custom}
                onClick={() => toggleSymptom(custom)}
                className="p-4 rounded-2xl border bg-[#5B3FD3] border-[#5B3FD3] text-white shadow-md shadow-[#5B3FD3]/20 flex items-center gap-3"
              >
                <Plus className="w-4 h-4 stroke-[2.2] shrink-0" />
                <span className="text-xs font-extrabold">{custom}</span>
              </button>
            ))}
        </div>
      </div>

      {/* Energy & Private Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
        {/* Energy Card (6 cols) */}
        <div className="sm:col-span-6 bg-white rounded-3xl border border-[#ECE9F5] p-6 shadow-soft space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-[#1B1E28]">Energy Level</h3>
            <p className="text-xs text-[#5B3FD3] font-semibold mt-0.5">
              {getEnergyDescription(logState.energy)}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                onClick={() => onUpdateLog((prev) => ({ ...prev, energy: lvl }))}
                className={`flex-1 h-4 rounded-full transition-all duration-200 hover:scale-105 ${
                  lvl <= logState.energy ? "bg-[#5B3FD3]" : "bg-[#EDE8FC]"
                }`}
                title={`Level ${lvl}`}
              />
            ))}
          </div>

          <div className="flex justify-between text-[11px] text-[#7D8497]">
            <span>Low (1)</span>
            <span>Moderate (3)</span>
            <span>Peak (5)</span>
          </div>
        </div>

        {/* Private Note Card (6 cols) */}
        <div className="sm:col-span-6 bg-white rounded-3xl border border-[#ECE9F5] p-6 shadow-soft space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#1B1E28]">Private Journal Note</h3>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#5B3FD3] bg-[#F5F1FD] px-2 py-0.5 rounded-md">
              <Lock className="w-3 h-3" />
              <span>Only You</span>
            </div>
          </div>

          <textarea
            value={logState.note}
            onChange={(e) => onUpdateLog((prev) => ({ ...prev, note: e.target.value }))}
            placeholder="Add a private note about exercise, mood fluctuations, nutrition, or sleep..."
            rows={3}
            className="w-full p-3 text-xs text-[#1B1E28] placeholder-[#9BA1B4] rounded-2xl border border-[#ECE9F5] bg-[#F8F8FC] focus:outline-none focus:ring-2 focus:ring-[#5B3FD3]"
          />
        </div>
      </div>

      {/* Save Action Bar */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          onClick={() => onNavigateTab("dashboard")}
          className="px-6 py-3.5 rounded-2xl bg-white border border-[#ECE9F5] text-xs font-bold text-[#7D8497] hover:bg-[#F8F8FC]"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={savedSuccess}
          className={`px-8 py-3.5 rounded-2xl text-white font-extrabold text-xs flex items-center gap-2 shadow-lg transition-all ${
            savedSuccess
              ? "bg-[#2EB872] shadow-emerald-500/25"
              : "bg-[#5B3FD3] hover:bg-[#4C32C2] shadow-[#5B3FD3]/25 hover:-translate-y-0.5"
          }`}
        >
          <Check className="w-4 h-4 stroke-[3]" />
          <span>{savedSuccess ? "Saved to Health Log! ✨" : "Save Today's Check-in"}</span>
        </button>
      </div>
    </div>
  );
}

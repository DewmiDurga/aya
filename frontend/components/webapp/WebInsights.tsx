import React, { useState } from "react";
import {
  Sparkles,
  Activity,
  BatteryLow,
  Shield,
  Download,
  Info,
  Check,
  Zap,
  TrendingUp,
  FileText
} from "lucide-react";

export function WebInsights() {
  const [selectedCycleIndex, setSelectedCycleIndex] = useState<number | null>(null);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const cycleData = [
    { month: "May 2026", days: 27, status: "Completed", flowDays: 5 },
    { month: "Jun 2026", days: 29, status: "Completed", flowDays: 5 },
    { month: "Jul 2026", days: 28, status: "Completed", flowDays: 4 },
    { month: "Aug 2026", days: 30, status: "Completed", flowDays: 6 },
    { month: "Sep 2026", days: 28, status: "Completed", flowDays: 5 },
    { month: "Oct 2026", days: 12, status: "In Progress", flowDays: 5, inProgress: true },
  ];

  const maxDays = 34;

  const handleExport = (type: string) => {
    setExportNotice(`Exported ${type} cycle report to your downloads folder.`);
    setTimeout(() => setExportNotice(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Toast alert */}
      {exportNotice && (
        <div className="fixed top-24 right-8 z-50 bg-[#1B1E28] text-white text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-[#EDE8FC]" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="bg-white rounded-3xl border border-[#ECE9F5] p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#EDE8FC] text-[#5B3FD3] font-extrabold text-xl flex items-center justify-center border border-[#E0D7F8] shadow-sm select-none">
            AR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1B1E28]">
                Ana Ruiz
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EDE8FC] text-[#5B3FD3] text-[10px] font-bold">
                Regular Profile
              </span>
            </div>
            <p className="text-xs text-[#7D8497] font-medium mt-1">
              5 cycles logged · Tracking since May 2026 · Cycle Day 12
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleExport("PDF")}
            className="px-4 py-2.5 rounded-xl bg-[#F8F8FC] border border-[#ECE9F5] hover:bg-[#F2EDFD] text-xs font-bold text-[#1B1E28] flex items-center gap-2 transition-colors"
          >
            <FileText className="w-4 h-4 text-[#5B3FD3]" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl border border-[#ECE9F5] p-6 shadow-soft space-y-1">
          <p className="text-xs font-semibold text-[#7D8497]">Average Cycle Length</p>
          <p className="text-3xl font-extrabold text-[#1B1E28]">28 d</p>
          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
            Normal: 26–30 days
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-[#ECE9F5] p-6 shadow-soft space-y-1">
          <p className="text-xs font-semibold text-[#7D8497]">Average Period Duration</p>
          <p className="text-3xl font-extrabold text-[#1B1E28]">5 d</p>
          <span className="text-[11px] font-bold text-[#5B3FD3] bg-[#EDE8FC] px-2 py-0.5 rounded-md inline-block mt-1">
            Standard: 4–6 days
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-[#ECE9F5] p-6 shadow-soft space-y-1">
          <p className="text-xs font-semibold text-[#7D8497]">Cycle Variation</p>
          <p className="text-3xl font-extrabold text-[#1B1E28]">± 2 d</p>
          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
            Standard Deviation 1.8 d
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-[#ECE9F5] p-6 shadow-soft space-y-1">
          <p className="text-xs font-semibold text-[#7D8497]">Consistency Index</p>
          <p className="text-3xl font-extrabold text-[#1B1E28]">96%</p>
          <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md inline-block mt-1">
            High Regularity
          </span>
        </div>
      </div>

      {/* Cycle Length Bar Graph */}
      <div className="bg-white rounded-3xl border border-[#ECE9F5] p-6 sm:p-8 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-[#1B1E28]">
              Cycle Length History (Last 6 Cycles)
            </h3>
            <p className="text-xs text-[#7D8497] mt-0.5">
              Typical adult reproductive range spans between 26 and 30 days
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-[#5B3FD3]">
              <span className="w-3 h-3 rounded bg-[#5B3FD3]" />
              Completed Cycle
            </span>
            <span className="flex items-center gap-1.5 text-[#7D8497]">
              <span className="w-3 h-3 rounded bg-[#E3DCFA]" />
              In Progress (Current)
            </span>
          </div>
        </div>

        {/* Chart View */}
        <div className="pt-8 pb-4">
          <div className="h-56 flex items-end justify-between gap-4 px-4 sm:px-8 border-b border-[#ECE9F5]">
            {cycleData.map((item, idx) => {
              const heightPercent = (item.days / maxDays) * 100;
              const isSelected = selectedCycleIndex === idx;

              return (
                <div
                  key={item.month}
                  onClick={() => setSelectedCycleIndex(idx)}
                  className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer"
                >
                  <span
                    className={`text-xs font-extrabold mb-1.5 transition-colors ${
                      item.inProgress ? "text-[#7D8497]" : "text-[#1B1E28]"
                    }`}
                  >
                    {item.days} d
                  </span>

                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full max-w-[56px] rounded-2xl transition-all duration-300 ${
                      item.inProgress
                        ? "bg-[#E3DCFA] hover:bg-[#D5CAFA]"
                        : "bg-[#5B3FD3] group-hover:bg-[#4C32C2]"
                    } ${isSelected ? "ring-4 ring-[#5B3FD3]/20 scale-102" : ""}`}
                  />

                  <span className="text-xs font-semibold text-[#7D8497] mt-3 group-hover:text-[#1B1E28] text-center">
                    {item.month.split(" ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected bar detail pill */}
        {selectedCycleIndex !== null && (
          <div className="p-4 bg-[#F5F1FD] border border-[#E0D7F8] rounded-2xl flex items-center justify-between text-xs animate-in fade-in">
            <span className="font-extrabold text-[#5B3FD3]">
              {cycleData[selectedCycleIndex].month}: {cycleData[selectedCycleIndex].days} days length · {cycleData[selectedCycleIndex].flowDays} days menstruation
            </span>
            <button
              onClick={() => setSelectedCycleIndex(null)}
              className="text-[#7D8497] hover:text-[#1B1E28] font-bold"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Patterns & Noticed Observations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1: Cycle Consistency Insight */}
        <div className="bg-white rounded-3xl border border-[#ECE9F5] p-6 shadow-soft flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF0EB] border border-[#FADBD2] flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-[#E67357] stroke-[2.2]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-extrabold text-[#1B1E28]">
              Your cycles look consistent
            </h4>
            <p className="text-xs text-[#7D8497] leading-relaxed">
              Four of your five recorded cycles were within two days of your 28-day average. Minor natural variation between cycles reflects standard physiological balance and is not a cause for concern.
            </p>
          </div>
        </div>

        {/* Card 2: Recurring Patterns */}
        <div className="bg-white rounded-3xl border border-[#ECE9F5] p-6 shadow-soft space-y-4">
          <h4 className="text-base font-extrabold text-[#1B1E28]">
            What You've Noticed Across Cycles
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#F8F8FC] border border-[#ECE9F5] flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EDE8FC] text-[#5B3FD3] flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1B1E28]">Cramps</p>
                <p className="text-[11px] text-[#7D8497]">Often 1 day before flow</p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F8F8FC] border border-[#ECE9F5] flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EDE8FC] text-[#5B3FD3] flex items-center justify-center shrink-0">
                <BatteryLow className="w-4 h-4 stroke-[2.2]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#1B1E28]">Lower Energy</p>
                <p className="text-[11px] text-[#7D8497]">Days 26–28 (Luteal)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data & Privacy Section */}
      <div className="bg-white rounded-3xl border border-[#ECE9F5] p-6 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EDE8FC] text-[#5B3FD3] flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-[#1B1E28]">
              Your Data & Privacy Controls
            </h4>
            <p className="text-xs text-[#7D8497]">
              All prediction models process locally with encrypted on-device storage. You can export or purge your data anytime.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleExport("JSON")}
            className="px-4 py-2 rounded-xl bg-[#F8F8FC] border border-[#ECE9F5] hover:bg-[#F2EDFD] text-xs font-bold text-[#1B1E28] transition-colors"
          >
            Export JSON
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  Settings,
  ChevronRight,
  Info,
  Sparkles,
  Activity,
  BatteryLow,
  Shield,
  Check
} from "lucide-react";

export function InsightsView() {
  const [activeCycleIndex, setActiveCycleIndex] = useState<number | null>(null);
  const [showSettingsNotice, setShowSettingsNotice] = useState(false);

  // Cycle history data from mockup
  const cycleData = [
    { month: "May", days: 27, completed: true },
    { month: "Jun", days: 29, completed: true },
    { month: "Jul", days: 28, completed: true },
    { month: "Aug", days: 30, completed: true },
    { month: "Sep", days: 28, completed: true },
    { month: "Oct", days: 12, completed: false, inProgress: true },
  ];

  // Max scale is 32 days
  const maxDays = 32;

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 hide-scrollbar">
      {/* Header */}
      <header className="flex items-center justify-between pt-1">
        <div>
          <p className="text-xs text-[#7D8497] font-medium tracking-wide">
            Patterns, not pressure
          </p>
          <h1 className="text-2xl font-extrabold text-[#1B1E28] tracking-tight mt-0.5">
            Insights
          </h1>
        </div>

        <button
          onClick={() => setShowSettingsNotice(true)}
          className="w-10 h-10 rounded-full bg-white border border-[#EAE7F3] flex items-center justify-center text-[#1B1E28] shadow-sm hover:bg-[#F8F7FD] transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4 stroke-[2.2]" />
        </button>
      </header>

      {/* Settings notice modal */}
      {showSettingsNotice && (
        <div className="p-3 bg-[#F4F0FE] border border-[#E0D7F8] rounded-2xl flex items-center justify-between text-xs animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#5B3FD3]" />
            <span className="font-semibold text-[#1B1E28]">Cycle preferences: Regular (28-day target)</span>
          </div>
          <button
            onClick={() => setShowSettingsNotice(false)}
            className="text-[#5B3FD3] font-bold text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Profile Card */}
      <section className="aya-card p-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-full bg-[#EDE8FC] text-[#5B3FD3] font-bold text-base flex items-center justify-center border border-[#E0D7F8] shrink-0">
            AR
          </div>
          <div>
            <h2 className="text-base font-extrabold text-[#1B1E28] leading-tight">
              Ana Ruiz
            </h2>
            <p className="text-xs text-[#7D8497] font-medium mt-0.5">
              5 cycles · Since May 2026
            </p>
          </div>
        </div>

        <button 
          className="w-8 h-8 rounded-full bg-[#F8F8FC] flex items-center justify-center text-[#7D8497] hover:bg-[#EDE8FC] hover:text-[#5B3FD3] transition-colors"
          aria-label="View profile"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.2]" />
        </button>
      </section>

      {/* Stats 3-Box Row */}
      <section className="grid grid-cols-3 gap-2.5">
        <div className="aya-card p-3.5 text-center bg-white">
          <p className="text-xl font-extrabold text-[#1B1E28]">28 d</p>
          <p className="text-[11px] text-[#7D8497] font-medium mt-0.5">Avg. cycle</p>
        </div>

        <div className="aya-card p-3.5 text-center bg-white">
          <p className="text-xl font-extrabold text-[#1B1E28]">5 d</p>
          <p className="text-[11px] text-[#7D8497] font-medium mt-0.5">Avg. period</p>
        </div>

        <div className="aya-card p-3.5 text-center bg-white">
          <p className="text-xl font-extrabold text-[#1B1E28]">± 2 d</p>
          <p className="text-[11px] text-[#7D8497] font-medium mt-0.5">Variation</p>
        </div>
      </section>

      {/* Cycle Length Bar Chart Card */}
      <section className="aya-card p-5 space-y-3 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#1B1E28]">
              Cycle length
            </h3>
            <p className="text-xs text-[#7D8497] font-medium mt-0.5">
              Last 6 cycles · typical range 26–30 days
            </p>
          </div>

          <button 
            className="w-6 h-6 rounded-full bg-[#F5F1FD] text-[#5B3FD3] flex items-center justify-center hover:bg-[#EDE8FC] transition-colors"
            aria-label="Cycle info"
          >
            <Info className="w-3.5 h-3.5 stroke-[2.2]" />
          </button>
        </div>

        {/* Chart area */}
        <div className="pt-4 pb-1">
          <div className="h-36 flex items-end justify-between gap-2.5 px-2">
            {cycleData.map((item, index) => {
              const heightPercent = (item.days / maxDays) * 100;
              const isSelected = activeCycleIndex === index;

              return (
                <div
                  key={item.month}
                  onClick={() => setActiveCycleIndex(index)}
                  className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer"
                >
                  {/* Number label above bar */}
                  <span
                    className={`text-[10px] font-bold mb-1 transition-colors ${
                      item.inProgress ? "text-[#7D8497]" : "text-[#1B1E28]"
                    }`}
                  >
                    {item.days}
                  </span>

                  {/* Vertical bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-2xl transition-all duration-300 relative ${
                      item.inProgress
                        ? "bg-[#E3DCFA] hover:bg-[#D5CAFA]"
                        : "bg-[#5B3FD3] group-hover:bg-[#4C32C2]"
                    } ${isSelected ? "ring-2 ring-[#5B3FD3] ring-offset-2 scale-102" : ""}`}
                  />

                  {/* Month label below bar */}
                  <span className="text-[11px] font-medium text-[#7D8497] mt-2 group-hover:text-[#1B1E28]">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Insight: Your cycles look consistent */}
      <section className="aya-card p-4 flex items-center gap-3.5 bg-white border border-[#EFEBF8]">
        <div className="w-11 h-11 rounded-2xl bg-[#FFF0EB] border border-[#FADBD2] flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-[#E67357] stroke-[2.2]" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-[#1B1E28]">
            Your cycles look consistent
          </h3>
          <p className="text-[11px] text-[#7D8497] leading-relaxed mt-0.5">
            Four of five cycles were within two days of your average. Natural variation is expected.
          </p>
        </div>
      </section>

      {/* Section: What you've noticed */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-[#1B1E28]">
            What you’ve noticed
          </h3>
          <button className="text-xs font-bold text-[#5B3FD3] hover:text-[#472FB8] transition-colors">
            View all
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Card 1: Cramps */}
          <div className="aya-card p-3.5 flex items-start gap-2.5 bg-white">
            <div className="w-8 h-8 rounded-xl bg-[#F5F1FD] text-[#5B3FD3] flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1B1E28]">Cramps</p>
              <p className="text-[10px] text-[#7D8497] mt-0.5">Often 1 day before</p>
            </div>
          </div>

          {/* Card 2: Lower energy */}
          <div className="aya-card p-3.5 flex items-start gap-2.5 bg-white">
            <div className="w-8 h-8 rounded-xl bg-[#F5F1FD] text-[#5B3FD3] flex items-center justify-center shrink-0">
              <BatteryLow className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#1B1E28]">Lower energy</p>
              <p className="text-[10px] text-[#7D8497] mt-0.5">Days 26–28</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Your data & privacy */}
      <section className="aya-card p-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#F5F1FD] text-[#5B3FD3] flex items-center justify-center shrink-0">
            <Shield className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#1B1E28]">
              Your data & privacy
            </h4>
            <p className="text-[11px] text-[#7D8497] mt-0.5">
              Review, export, or delete your data anytime.
            </p>
          </div>
        </div>

        <button 
          className="text-[#7D8497] hover:text-[#5B3FD3] transition-colors p-1"
          aria-label="Manage data privacy"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.2]" />
        </button>
      </section>
    </div>
  );
}

import React from "react";
import { WebTab } from "./types";
import { Calendar as CalendarIcon, Sparkles, Smartphone, ShieldCheck, Bell } from "lucide-react";

interface WebHeaderProps {
  activeTab: WebTab;
  onOpenMobileModal?: () => void;
}

export function WebHeader({ activeTab, onOpenMobileModal }: WebHeaderProps) {
  const getTabTitle = (tab: WebTab) => {
    switch (tab) {
      case "dashboard":
        return { title: "Overview", subtitle: "Cycle status, today's phase, and daily insights" };
      case "calendar":
        return { title: "Cycle Calendar", subtitle: "Predictions, fertile window & historical logs" };
      case "log":
        return { title: "Daily Health Check-in", subtitle: "Log moods, flow intensity, physical symptoms & notes" };
      case "insights":
        return { title: "Insights & Statistics", subtitle: "Cycle trends, standard variations & historical patterns" };
      case "chat":
        return { title: "Ask Eya AI Assistant", subtitle: "Personalized, clinically safe reproductive health guidance" };
      default:
        return { title: "Cycle Wellness", subtitle: "Your personal reproductive companion" };
    }
  };

  const { title, subtitle } = getTabTitle(activeTab);

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-[#ECE7F3] px-8 flex items-center justify-between shrink-0 sticky top-0 z-30">
      <div>
        <h1 className="text-xl font-extrabold text-[#1B1E28] tracking-tight">
          {title}
        </h1>
        <p className="text-xs text-[#7D8497] font-medium mt-0.5">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Date pill */}
        <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#F8F8FC] border border-[#ECE9F5] text-xs font-semibold text-[#1B1E28]">
          <CalendarIcon className="w-3.5 h-3.5 text-[#5B3FD3]" />
          <span>Monday, October 5, 2026</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#5B3FD3]" />
          <span className="text-[#5B3FD3]">Day 12</span>
        </div>

        {/* Device encrypted pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F4F0FE] text-[11px] font-bold text-[#5B3FD3]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Encrypted On-Device</span>
        </div>

        {/* Switch to mobile preview */}
        {onOpenMobileModal && (
          <button
            onClick={onOpenMobileModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#EDE8FC] hover:bg-[#E2D8FB] text-[#5B3FD3] font-bold text-xs transition-all shadow-sm"
          >
            <Smartphone className="w-4 h-4" />
            <span>Mobile App View</span>
          </button>
        )}

        {/* Profile Circle */}
        <div className="w-10 h-10 rounded-xl bg-[#EDE8FC] text-[#5B3FD3] font-bold text-xs flex items-center justify-center border border-[#E0D7F8] shadow-sm select-none">
          AR
        </div>
      </div>
    </header>
  );
}

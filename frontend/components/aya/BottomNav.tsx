import React from "react";
import { Home, Calendar, PlusCircle, BarChart2 } from "lucide-react";
import { TabType } from "./types";

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export function BottomNav({ activeTab, onSelectTab }: BottomNavProps) {
  const tabs = [
    { id: "today" as TabType, label: "Today", icon: Home },
    { id: "calendar" as TabType, label: "Calendar", icon: Calendar },
    { id: "log" as TabType, label: "Log", icon: PlusCircle },
    { id: "insights" as TabType, label: "Insights", icon: BarChart2 },
  ];

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md border-t border-[#ECE7F3] px-4 py-2 flex items-center justify-around z-20 shrink-0 select-none">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const IconComponent = tab.icon;

        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
              isActive
                ? "text-[#5B3FD3]"
                : "text-[#8D93A5] hover:text-[#5B3FD3]/70 hover:bg-[#F8F7FD]"
            }`}
          >
            <div className="relative">
              <IconComponent
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? "stroke-[2.4] scale-105" : "stroke-[1.8]"
                }`}
              />
              {tab.id === "log" && isActive && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#5B3FD3] rounded-full animate-ping" />
              )}
            </div>
            <span
              className={`text-[11px] mt-1 transition-all ${
                isActive ? "font-bold text-[#5B3FD3]" : "font-medium text-[#8D93A5]"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

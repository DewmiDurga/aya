import React from "react";
import {
  LayoutDashboard,
  Calendar,
  PlusCircle,
  BarChart3,
  MessageCircle,
  Lock,
  ChevronRight,
  Sparkles,
  Heart
} from "lucide-react";
import { WebTab } from "./types";

interface SidebarProps {
  activeTab: WebTab;
  onSelectTab: (tab: WebTab) => void;
}

export function Sidebar({ activeTab, onSelectTab }: SidebarProps) {
  const navItems = [
    { id: "dashboard" as WebTab, label: "Overview", sublabel: "Today & cycle status", icon: LayoutDashboard },
    { id: "calendar" as WebTab, label: "Cycle Calendar", sublabel: "Predictions & history", icon: Calendar },
    { id: "log" as WebTab, label: "Daily Check-in", sublabel: "Moods, flow & symptoms", icon: PlusCircle },
    { id: "insights" as WebTab, label: "Insights & Trends", sublabel: "Cycle patterns & stats", icon: BarChart3 },
    { id: "chat" as WebTab, label: "Ask Eya AI", sublabel: "Evidence-backed guidance", icon: MessageCircle, badge: "AI" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#EAE7F3] flex flex-col shrink-0 min-h-screen select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#EAE7F3] flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#5B3FD3] to-[#7B61FF] text-white flex items-center justify-center font-extrabold text-lg shadow-md shadow-[#5B3FD3]/25">
          ඇ
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-extrabold text-base tracking-tight text-[#1B1E28]">
              ඇය (Aya)
            </h1>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-[#EDE8FC] text-[#5B3FD3]">
              Pro
            </span>
          </div>
          <p className="text-[11px] text-[#7D8497] font-medium">Reproductive Wellness</p>
        </div>
      </div>

      {/* User Profile Mini Card */}
      <div className="mx-4 my-4 p-3 bg-[#F8F8FC] border border-[#ECE9F5] rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#EDE8FC] text-[#5B3FD3] font-bold text-xs flex items-center justify-center border border-[#E0D7F8]">
            AR
          </div>
          <div>
            <p className="text-xs font-bold text-[#1B1E28]">Ana Ruiz</p>
            <p className="text-[10px] text-[#5B3FD3] font-semibold">Day 12 · Follicular</p>
          </div>
        </div>
        <button
          onClick={() => onSelectTab("insights")}
          className="text-[#7D8497] hover:text-[#5B3FD3] p-1 transition-colors"
          title="Profile settings"
        >
          <ChevronRight className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        <p className="px-3 pt-2 pb-1.5 text-[10px] uppercase font-bold tracking-wider text-[#9BA1B4]">
          Main Navigation
        </p>

        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const IconComp = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-left transition-all duration-200 ${
                isActive
                  ? "bg-[#5B3FD3] text-white shadow-md shadow-[#5B3FD3]/20 font-bold"
                  : "text-[#4A4E5E] hover:bg-[#F8F7FD] hover:text-[#1B1E28] font-medium"
              }`}
            >
              <div className="flex items-center gap-3">
                <IconComp
                  className={`w-4 h-4 ${
                    isActive ? "stroke-[2.4] text-white" : "stroke-[2] text-[#7D8497]"
                  }`}
                />
                <div>
                  <div className="text-xs leading-none">{item.label}</div>
                  <div
                    className={`text-[10px] mt-1 ${
                      isActive ? "text-white/80" : "text-[#9BA1B4]"
                    }`}
                  >
                    {item.sublabel}
                  </div>
                </div>
              </div>

              {item.badge && (
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#FFF0EB] text-[#E67357] border border-[#FADBD2]"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick Action Button */}
      <div className="px-4 py-3">
        <button
          onClick={() => onSelectTab("log")}
          className="w-full py-2.5 px-3 rounded-2xl bg-[#EDE8FC] hover:bg-[#E2D8FB] text-[#5B3FD3] font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <PlusCircle className="w-4 h-4 stroke-[2.2]" />
          <span>+ Log Today's Health</span>
        </button>
      </div>

      {/* Encryption & Device Privacy Footer */}
      <div className="p-4 border-t border-[#EAE7F3] bg-[#FAFAFE]">
        <div className="flex items-center gap-2 text-[11px] text-[#5B3FD3] font-semibold">
          <Lock className="w-3.5 h-3.5 stroke-[2.2]" />
          <span>End-to-End Encrypted</span>
        </div>
        <p className="text-[10px] text-[#7D8497] mt-1 leading-snug">
          Predictions are estimates, not medical advice. Data stays on your device.
        </p>
      </div>
    </aside>
  );
}

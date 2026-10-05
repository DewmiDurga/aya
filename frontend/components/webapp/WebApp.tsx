"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { WebHeader } from "./WebHeader";
import { WebDashboard } from "./WebDashboard";
import { WebCalendar } from "./WebCalendar";
import { WebLog } from "./WebLog";
import { WebInsights } from "./WebInsights";
import { WebChat } from "./WebChat";
import { WebTab, DailyLogState } from "./types";
import { AyaApp } from "../aya/AyaApp";
import { X, Smartphone } from "lucide-react";

interface WebAppProps {
  initialTab?: WebTab;
}

export function WebApp({ initialTab = "dashboard" }: WebAppProps) {
  const [activeTab, setActiveTab] = useState<WebTab>(initialTab);
  const [showMobileModal, setShowMobileModal] = useState(false);

  // Synchronized user cycle state
  const [logState, setLogState] = useState<DailyLogState>({
    date: "2026-10-05",
    dayName: "Monday, October 5",
    mood: "Steady",
    flow: "None",
    symptoms: ["Mild cramps", "Bloating"],
    energy: 3,
    note: "",
  });

  return (
    <div className="min-h-screen bg-[#F8F8FC] flex text-[#1B1E28] font-sans antialiased">
      {/* Desktop Navigation Sidebar */}
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto min-h-screen">
        <WebHeader
          activeTab={activeTab}
          onOpenMobileModal={() => setShowMobileModal(true)}
        />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "dashboard" && (
            <WebDashboard
              logState={logState}
              onUpdateLog={setLogState}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === "calendar" && (
            <WebCalendar
              logState={logState}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === "log" && (
            <WebLog
              logState={logState}
              onUpdateLog={setLogState}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === "insights" && <WebInsights />}

          {activeTab === "chat" && <WebChat logState={logState} />}
        </main>
      </div>

      {/* Optional Mobile Phone Mockup Overlay Modal */}
      {showMobileModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative max-h-[95vh] overflow-y-auto rounded-[48px] shadow-2xl">
            <button
              onClick={() => setShowMobileModal(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/90 text-[#1B1E28] hover:bg-white flex items-center justify-center shadow-lg transition-transform hover:scale-105"
              aria-label="Close mobile view"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
            <div className="p-2 sm:p-4 bg-white/10 rounded-[48px]">
              <AyaApp initialMode="mobile" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

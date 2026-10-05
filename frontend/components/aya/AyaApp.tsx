"use client";

import React, { useState } from "react";
import { StatusBar } from "./StatusBar";
import { BottomNav } from "./BottomNav";
import { TodayView } from "./TodayView";
import { CalendarView } from "./CalendarView";
import { LogView } from "./LogView";
import { InsightsView } from "./InsightsView";
import { TabType, DailyLogState } from "./types";
import { Smartphone, LayoutGrid, Maximize2, MessageCircle, Sparkles } from "lucide-react";
import Link from "next/link";

type DisplayMode = "mobile" | "board" | "expanded";

interface AyaAppProps {
  initialTab?: TabType;
  initialMode?: DisplayMode;
}

export function AyaApp({ initialTab = "today", initialMode = "mobile" }: AyaAppProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(initialMode);

  // Shared state for the daily check-in
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
    <div className="min-h-screen bg-[#F4F5FA] flex flex-col items-center">
      {/* Top Controls Bar for presentation modes */}
      <header className="w-full bg-white/80 backdrop-blur-md border-b border-[#ECE7F3] sticky top-0 z-40 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-[#5B3FD3] text-white flex items-center justify-center font-extrabold text-sm shadow-md shadow-[#5B3FD3]/20">
              ඇ
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-[#1B1E28]">
                  ඇය (Aya)
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#EDE8FC] text-[#5B3FD3]">
                  Cycle Wellness
                </span>
              </div>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-[#F4F5FA] p-1 rounded-2xl border border-[#E5E2F0]">
            <button
              onClick={() => setDisplayMode("mobile")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                displayMode === "mobile"
                  ? "bg-white text-[#5B3FD3] shadow-sm"
                  : "text-[#7D8497] hover:text-[#1B1E28]"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Mobile Phone</span>
            </button>

            <button
              onClick={() => setDisplayMode("board")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                displayMode === "board"
                  ? "bg-white text-[#5B3FD3] shadow-sm"
                  : "text-[#7D8497] hover:text-[#1B1E28]"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>All 4 Screens Board</span>
            </button>

            <button
              onClick={() => setDisplayMode("expanded")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                displayMode === "expanded"
                  ? "bg-white text-[#5B3FD3] shadow-sm"
                  : "text-[#7D8497] hover:text-[#1B1E28]"
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Expanded View</span>
            </button>
          </div>

          {/* Ask AI health assistant link */}
          <Link
            href="/chat"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#EDE8FC] text-[#5B3FD3] hover:bg-[#E2D8FB] text-xs font-bold transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Ask Eya AI</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full flex-1 flex flex-col items-center justify-start p-4 sm:p-8">
        {/* MODE 1: SINGLE MOBILE VIEW (iPhone bezel) */}
        {displayMode === "mobile" && (
          <div className="flex flex-col items-center my-auto py-2">
            {/* Quick tabs bar above phone for convenience */}
            <div className="hidden sm:flex items-center gap-2 mb-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-[#ECE7F3] shadow-sm">
              <span className="text-xs text-[#7D8497] font-semibold mr-1">Switch Screen:</span>
              {(["today", "calendar", "log", "insights"] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold capitalize transition-all ${
                    activeTab === tab
                      ? "bg-[#5B3FD3] text-white shadow-sm"
                      : "text-[#7D8497] hover:text-[#1B1E28] hover:bg-[#F8F7FD]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Realistic iPhone Viewport Frame */}
            <div className="phone-viewport border border-[#E7E9F2]">
              {/* Dynamic Island Pill */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-5 bg-[#1B1E28] rounded-full z-30 flex items-center justify-center pointer-events-none">
                <div className="w-2.5 h-2.5 rounded-full bg-[#12131A] mr-6"></div>
                <div className="w-2 h-2 rounded-full bg-[#2A2E40]"></div>
              </div>

              {/* Status Bar */}
              <StatusBar />

              {/* Screen Body */}
              <div className="flex-1 flex flex-col overflow-hidden relative">
                {activeTab === "today" && (
                  <TodayView
                    logState={logState}
                    onUpdateLog={setLogState}
                    onNavigateTab={setActiveTab}
                  />
                )}
                {activeTab === "calendar" && (
                  <CalendarView
                    logState={logState}
                    onNavigateTab={setActiveTab}
                  />
                )}
                {activeTab === "log" && (
                  <LogView
                    logState={logState}
                    onUpdateLog={setLogState}
                    onNavigateTab={setActiveTab}
                  />
                )}
                {activeTab === "insights" && <InsightsView />}
              </div>

              {/* Mobile Bottom Navigation */}
              <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />

              {/* iOS Home Indicator Bar */}
              <div className="w-full pb-2 bg-white flex justify-center z-20">
                <div className="w-32 h-1 bg-[#1B1E28]/25 rounded-full" />
              </div>
            </div>
          </div>
        )}

        {/* MODE 2: FIGMA 4-SCREEN BOARD (Exact replica of user's uploaded images side-by-side) */}
        {displayMode === "board" && (
          <div className="w-full max-w-7xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-extrabold text-[#1B1E28]">
                Aya Cycle Interface — 4 Mobile Views
              </h2>
              <p className="text-xs text-[#7D8497]">
                Live synchronized preview of Today, Calendar, Daily check-in, and Insights
              </p>
            </div>

            {/* 4 Phones Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              {/* Screen 1: Today */}
              <div className="flex flex-col items-center w-full max-w-[360px]">
                <div className="mb-2 text-center">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EDE8FC] text-[#5B3FD3]">
                    1. Today
                  </span>
                </div>
                <div className="w-full bg-[#F8F8FC] rounded-[36px] shadow-soft border border-[#ECE9F5] overflow-hidden flex flex-col h-[750px]">
                  <StatusBar />
                  <TodayView
                    logState={logState}
                    onUpdateLog={setLogState}
                    onNavigateTab={setActiveTab}
                  />
                  <BottomNav activeTab="today" onSelectTab={setActiveTab} />
                  <div className="w-full pb-1.5 bg-white flex justify-center">
                    <div className="w-24 h-1 bg-[#1B1E28]/25 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Screen 2: Calendar */}
              <div className="flex flex-col items-center w-full max-w-[360px]">
                <div className="mb-2 text-center">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EDE8FC] text-[#5B3FD3]">
                    2. Calendar
                  </span>
                </div>
                <div className="w-full bg-[#F8F8FC] rounded-[36px] shadow-soft border border-[#ECE9F5] overflow-hidden flex flex-col h-[750px]">
                  <StatusBar />
                  <CalendarView
                    logState={logState}
                    onNavigateTab={setActiveTab}
                  />
                  <BottomNav activeTab="calendar" onSelectTab={setActiveTab} />
                  <div className="w-full pb-1.5 bg-white flex justify-center">
                    <div className="w-24 h-1 bg-[#1B1E28]/25 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Screen 3: Daily check-in */}
              <div className="flex flex-col items-center w-full max-w-[360px]">
                <div className="mb-2 text-center">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EDE8FC] text-[#5B3FD3]">
                    3. Daily check-in
                  </span>
                </div>
                <div className="w-full bg-[#F8F8FC] rounded-[36px] shadow-soft border border-[#ECE9F5] overflow-hidden flex flex-col h-[750px]">
                  <StatusBar />
                  <LogView
                    logState={logState}
                    onUpdateLog={setLogState}
                    onNavigateTab={setActiveTab}
                  />
                  <BottomNav activeTab="log" onSelectTab={setActiveTab} />
                  <div className="w-full pb-1.5 bg-white flex justify-center">
                    <div className="w-24 h-1 bg-[#1B1E28]/25 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Screen 4: Insights */}
              <div className="flex flex-col items-center w-full max-w-[360px]">
                <div className="mb-2 text-center">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#EDE8FC] text-[#5B3FD3]">
                    4. Insights
                  </span>
                </div>
                <div className="w-full bg-[#F8F8FC] rounded-[36px] shadow-soft border border-[#ECE9F5] overflow-hidden flex flex-col h-[750px]">
                  <StatusBar />
                  <InsightsView />
                  <BottomNav activeTab="insights" onSelectTab={setActiveTab} />
                  <div className="w-full pb-1.5 bg-white flex justify-center">
                    <div className="w-24 h-1 bg-[#1B1E28]/25 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: EXPANDED WEB VIEW */}
        {displayMode === "expanded" && (
          <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-[#ECE9F5] shadow-card overflow-hidden flex flex-col min-h-[750px]">
            {/* Top Desktop Navigation Tabs */}
            <div className="bg-[#FAF9FD] border-b border-[#ECE7F3] px-6 py-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5B3FD3]">
                Aya Web Dashboard
              </span>
              <div className="flex items-center gap-1.5">
                {(["today", "calendar", "log", "insights"] as TabType[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                      activeTab === tab
                        ? "bg-[#5B3FD3] text-white shadow-sm"
                        : "text-[#7D8497] hover:text-[#1B1E28] hover:bg-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Screen in Expanded Format */}
            <div className="flex-1 p-4 sm:p-6 bg-[#F8F8FC]">
              {activeTab === "today" && (
                <TodayView
                  logState={logState}
                  onUpdateLog={setLogState}
                  onNavigateTab={setActiveTab}
                />
              )}
              {activeTab === "calendar" && (
                <CalendarView
                  logState={logState}
                  onNavigateTab={setActiveTab}
                />
              )}
              {activeTab === "log" && (
                <LogView
                  logState={logState}
                  onUpdateLog={setLogState}
                  onNavigateTab={setActiveTab}
                />
              )}
              {activeTab === "insights" && <InsightsView />}
            </div>

            {/* Bottom Nav */}
            <BottomNav activeTab={activeTab} onSelectTab={setActiveTab} />
          </div>
        )}
      </main>
    </div>
  );
}

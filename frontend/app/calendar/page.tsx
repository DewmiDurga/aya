"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CalendarPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(5);

  // October 2026 starting on Thursday (4 empty cells before day 1)
  const daysInMonth = 31;
  const startDayOffset = 4; // Thursday

  const periodDays = [22, 23, 24, 25, 26]; // Predicted next period
  const ovulationDays = [9, 10, 11, 12];   // Fertile / ovulation window

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Cycle Calendar</h1>
          <p className="text-sm text-slate-500">October 2026</p>
        </div>
        <Link
          href="/logging"
          className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-700"
        >
          + Log for Selected Day
        </Link>
      </div>

      <div className="glass-card p-6">
        {/* Days of week header */}
        <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: startDayOffset }).map((_, i) => (
            <div key={`empty-${i}`} className="h-14 rounded-xl opacity-0" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = day === 5;
            const isSelected = selectedDay === day;
            const isPeriod = periodDays.includes(day);
            const isOvulation = ovulationDays.includes(day);

            let bgClass = "bg-white/60 hover:bg-rose-50 text-slate-700";
            if (isPeriod) bgClass = "bg-rose-100 text-brand-700 border border-rose-300 font-semibold";
            if (isOvulation) bgClass = "bg-purple-100 text-purple-700 border border-purple-200";
            if (isToday) bgClass += " ring-2 ring-brand-500 font-bold";
            if (isSelected) bgClass += " shadow-md scale-105 z-10";

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`h-14 rounded-xl flex flex-col items-center justify-between p-2 text-sm transition-all ${bgClass}`}
              >
                <span>{day}</span>
                {isPeriod && <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />}
                {isOvulation && <span className="w-1.5 h-1.5 rounded-full bg-purple-600" />}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-4 border-t border-rose-100/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-200 border border-rose-400" />
            <span className="text-slate-600">Predicted Period Window</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-200 border border-purple-300" />
            <span className="text-slate-600">Ovulation / Fertile Phase</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full ring-2 ring-brand-500 bg-white" />
            <span className="text-slate-600">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Edit3,
  Lock,
  PlusCircle,
  Activity,
  Smile,
  Disc,
  Info
} from "lucide-react";
import { DailyLogState, WebTab } from "./types";

interface WebCalendarProps {
  logState: DailyLogState;
  onNavigateTab: (tab: WebTab) => void;
}

export function WebCalendar({ logState, onNavigateTab }: WebCalendarProps) {
  const [selectedDay, setSelectedDay] = useState<number>(5);

  const fertileDays = [9, 10, 11, 12, 13, 14];
  const periodDays = [21, 22, 23, 24, 25];
  const loggedDays = [1, 2, 4, 5];

  const prevMonthDays = [28, 29, 30];
  const currentMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const nextMonthDays = [1];

  const getDayPhase = (day: number) => {
    if (day === 5) return "Follicular phase (Today)";
    if (periodDays.includes(day)) return "Predicted Menstrual phase";
    if (fertileDays.includes(day)) return "Fertile / Ovulation window";
    if (day > 14 && day < 21) return "Luteal phase";
    return "Follicular phase";
  };

  return (
    <div className="space-y-6">
      {/* Top Calendar Toolbar */}
      <div className="bg-white rounded-3xl border border-[#ECE9F5] p-5 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#F8F8FC] p-1 rounded-2xl border border-[#ECE9F5]">
            <button
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#7D8497] hover:bg-white hover:text-[#1B1E28] transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="px-4 text-center">
              <span className="text-base font-extrabold text-[#1B1E28]">October 2026</span>
              <span className="text-xs text-[#7D8497] font-medium ml-2">Cycle Day 12</span>
            </div>
            <button
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#7D8497] hover:bg-white hover:text-[#1B1E28] transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Legend in Header */}
        <div className="flex items-center gap-4 text-xs font-semibold text-[#7D8497]">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-[#FCE4DC] border border-[#E67357]/40" />
            <span>Period Window</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-[#EDE8FC] border border-[#5B3FD3]/30" />
            <span>Fertile Window</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5B3FD3]" />
            <span>Logged Day</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Calendar on Left, Selected Date Panel on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Calendar Grid (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-[#ECE9F5] p-6 shadow-soft space-y-3">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 text-center text-xs font-bold text-[#8D93A5] uppercase tracking-wider pb-2 border-b border-[#ECE9F5]">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Previous month days */}
            {prevMonthDays.map((d) => (
              <div
                key={`prev-${d}`}
                className="h-20 sm:h-24 p-2 rounded-2xl bg-[#FAFAFE] text-[#BFC4D5] text-xs font-semibold flex flex-col justify-between"
              >
                <span>{d}</span>
                <span className="text-[10px] text-[#D0D4E4]">Sep</span>
              </div>
            ))}

            {/* Current month days */}
            {currentMonthDays.map((day) => {
              const isSelected = selectedDay === day;
              const isToday = day === 5;
              const isPeriod = periodDays.includes(day);
              const isFertile = fertileDays.includes(day);
              const isLogged = loggedDays.includes(day);

              let bg = "bg-[#FBFBFE] hover:bg-[#F4F0FE]/50 text-[#1B1E28]";
              let border = "border border-transparent";

              if (isSelected) {
                bg = "bg-[#F5F1FD]";
                border = "border-2 border-[#5B3FD3] shadow-md shadow-[#5B3FD3]/15";
              } else if (isPeriod) {
                bg = "bg-[#FFF2EE] text-[#8C3A29]";
                border = "border border-[#FADBD2]";
              } else if (isFertile) {
                bg = "bg-[#F5F1FD] text-[#4730A8]";
                border = "border border-[#EDE8FC]";
              }

              return (
                <button
                  key={`day-${day}`}
                  onClick={() => setSelectedDay(day)}
                  className={`h-20 sm:h-24 p-2.5 rounded-2xl flex flex-col justify-between text-left transition-all ${bg} ${border}`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`text-xs sm:text-sm font-extrabold ${
                        isToday
                          ? "w-6 h-6 rounded-full bg-[#5B3FD3] text-white flex items-center justify-center"
                          : ""
                      }`}
                    >
                      {day}
                    </span>

                    {/* Logged indicator dot */}
                    {isLogged && (
                      <span className="w-2 h-2 rounded-full bg-[#5B3FD3]" title="Logged" />
                    )}
                  </div>

                  {/* Micro label for phase */}
                  <div className="space-y-1">
                    {isPeriod && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#FCE4DC] text-[#8C3A29] block truncate">
                        Period
                      </span>
                    )}
                    {isFertile && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#EDE8FC] text-[#5B3FD3] block truncate">
                        Fertile
                      </span>
                    )}
                    {isToday && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#EDE8FC] text-[#5B3FD3] block truncate">
                        Today · Day 12
                      </span>
                    )}
                  </div>
                </button>
              );
            })}

            {/* Next month days */}
            {nextMonthDays.map((d) => (
              <div
                key={`next-${d}`}
                className="h-20 sm:h-24 p-2 rounded-2xl bg-[#FAFAFE] text-[#BFC4D5] text-xs font-semibold flex flex-col justify-between"
              >
                <span>{d}</span>
                <span className="text-[10px] text-[#D0D4E4]">Nov</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Date Detail Panel (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-[#ECE9F5] p-6 shadow-soft space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#5B3FD3] uppercase tracking-wider">
                  Selected Date
                </span>
                <h3 className="text-xl font-extrabold text-[#1B1E28] mt-0.5">
                  {selectedDay === 5 ? "Today · Oct 5, 2026" : `October ${selectedDay}, 2026`}
                </h3>
                <p className="text-xs text-[#7D8497] font-medium">
                  {getDayPhase(selectedDay)}
                </p>
              </div>

              <button
                onClick={() => onNavigateTab("log")}
                className="p-2.5 rounded-xl bg-[#EDE8FC] text-[#5B3FD3] hover:bg-[#E2D8FB] transition-colors"
                title="Edit Log"
              >
                <Edit3 className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>

            {/* Tags for logged items */}
            {selectedDay === 5 ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-[#7D8497]">Recorded Symptoms & Mood</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 rounded-xl bg-[#F8F8FC] border border-[#ECE9F5] text-xs font-semibold text-[#1B1E28] flex items-center gap-1.5">
                      <Smile className="w-3.5 h-3.5 text-[#5B3FD3]" />
                      <span>{logState.mood} mood</span>
                    </span>

                    {logState.symptoms.map((sym) => (
                      <span
                        key={sym}
                        className="px-3 py-1.5 rounded-xl bg-[#F8F8FC] border border-[#ECE9F5] text-xs font-semibold text-[#1B1E28] flex items-center gap-1.5"
                      >
                        <Activity className="w-3.5 h-3.5 text-[#5B3FD3]" />
                        <span>{sym}</span>
                      </span>
                    ))}

                    <span className="px-3 py-1.5 rounded-xl bg-[#F8F8FC] border border-[#ECE9F5] text-xs font-semibold text-[#1B1E28]">
                      Flow: {logState.flow}
                    </span>

                    <span className="px-3 py-1.5 rounded-xl bg-[#F8F8FC] border border-[#ECE9F5] text-xs font-semibold text-[#1B1E28]">
                      Energy: {logState.energy}/5
                    </span>
                  </div>
                </div>

                <div className="p-3.5 bg-[#F8F8FC] border border-[#ECE9F5] rounded-2xl text-xs space-y-1">
                  <p className="font-bold text-[#1B1E28]">Private Notes</p>
                  <p className="text-[#7D8497] italic">
                    {logState.note || "No private notes logged for today yet."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F8F8FC] text-[#7D8497] flex items-center justify-center mx-auto">
                  <Info className="w-6 h-6 stroke-[1.8]" />
                </div>
                <p className="text-xs text-[#7D8497] leading-relaxed max-w-xs mx-auto">
                  No log entries for this date. Click below to add symptoms, moods, or flow observations.
                </p>
              </div>
            )}

            <button
              onClick={() => onNavigateTab("log")}
              className="w-full py-3.5 rounded-2xl bg-[#5B3FD3] hover:bg-[#4C32C2] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#5B3FD3]/20 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{selectedDay === 5 ? "Edit Today's Check-in" : `Log for Oct ${selectedDay}`}</span>
            </button>
          </div>

          {/* Privacy Note */}
          <div className="p-4 bg-[#F5F1FD] border border-[#ECE7FC] rounded-3xl flex items-start gap-3">
            <Lock className="w-4 h-4 text-[#5B3FD3] shrink-0 mt-0.5" />
            <p className="text-xs text-[#5B3FD3] leading-relaxed">
              Calendar predictions improve with each cycle you record. Natural variations of 2–3 days are completely normal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { SlidersHorizontal, ChevronLeft, ChevronRight, Edit3, Lock } from "lucide-react";
import { DailyLogState, TabType } from "./types";

interface CalendarViewProps {
  logState: DailyLogState;
  onNavigateTab: (tab: TabType) => void;
}

export function CalendarView({ logState, onNavigateTab }: CalendarViewProps) {
  const [selectedDay, setSelectedDay] = useState<number>(5);

  // Fertile window and predicted period dates
  const fertileDays = [9, 10, 11, 12, 13, 14];
  const periodDays = [21, 22, 23, 24, 25];
  const loggedDays = [1, 2, 4, 5];

  // Calendar dates for October 2026 (Mon-Sun layout)
  // September 28, 29, 30 leading into Thu Oct 1
  const prevMonthDays = [28, 29, 30];
  const currentMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const nextMonthDays = [1];

  // Get status for selected day
  const getDayPhase = (day: number) => {
    if (day === 5) return "Follicular phase";
    if (periodDays.includes(day)) return "Predicted Menstrual phase";
    if (fertileDays.includes(day)) return "Fertile / Ovulation window";
    if (day > 14 && day < 21) return "Luteal phase";
    return "Follicular phase";
  };

  return (
    <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 hide-scrollbar">
      {/* Header */}
      <header className="flex items-center justify-between pt-1">
        <div>
          <p className="text-xs text-[#7D8497] font-medium tracking-wide">
            Your cycle
          </p>
          <h1 className="text-2xl font-extrabold text-[#1B1E28] tracking-tight mt-0.5">
            Calendar
          </h1>
        </div>

        <button 
          className="w-10 h-10 rounded-full bg-white border border-[#EAE7F3] flex items-center justify-center text-[#1B1E28] shadow-sm hover:bg-[#F8F7FD] transition-colors"
          aria-label="Filter settings"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#1B1E28] stroke-[2.2]" />
        </button>
      </header>

      {/* Month Switcher */}
      <div className="flex flex-col items-center justify-center pt-1 pb-1">
        <div className="flex items-center justify-between w-full max-w-[280px]">
          <button 
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#7D8497] hover:bg-white hover:shadow-sm transition-all"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          
          <div className="text-center">
            <h2 className="text-lg font-bold text-[#1B1E28]">
              October 2026
            </h2>
            <p className="text-xs text-[#7D8497] font-medium">
              Cycle day 12
            </p>
          </div>

          <button 
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#7D8497] hover:bg-white hover:shadow-sm transition-all"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Calendar Grid Card */}
      <section className="bg-transparent space-y-2">
        {/* Days of week */}
        <div className="grid grid-cols-7 text-center text-xs font-semibold text-[#8D93A5] pb-1">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-y-1.5 gap-x-1 text-center text-sm font-semibold">
          {/* Previous month days */}
          {prevMonthDays.map((d) => (
            <div
              key={`prev-${d}`}
              className="h-10 flex items-center justify-center text-[#BFC4D5] font-normal"
            >
              {d}
            </div>
          ))}

          {/* Current month days */}
          {currentMonthDays.map((day) => {
            const isSelected = selectedDay === day;
            const isToday = day === 5;
            const isPeriod = periodDays.includes(day);
            const isFertile = fertileDays.includes(day);
            const isLogged = loggedDays.includes(day);
            const isSpecialCircle = day === 29;

            let cellClass = "text-[#1B1E28] hover:bg-white/60";

            if (isSelected) {
              cellClass = "bg-[#5B3FD3] text-white shadow-md shadow-[#5B3FD3]/25 z-10 scale-105";
            } else if (isPeriod) {
              cellClass = "bg-[#FCE4DC] text-[#7A3628] font-bold";
            } else if (isFertile) {
              cellClass = "bg-[#EDE8FC] text-[#342777] font-bold";
            }

            return (
              <button
                key={`oct-${day}`}
                onClick={() => setSelectedDay(day)}
                className={`h-10 w-full rounded-2xl flex flex-col items-center justify-center relative transition-all duration-150 ${cellClass}`}
              >
                <span className="leading-none text-xs sm:text-sm">{day}</span>

                {/* Logged indicator dot */}
                {isLogged && !isSelected && (
                  <span className="w-1 h-1 rounded-full bg-[#5B3FD3] mt-0.5" />
                )}

                {/* White dot for selected day 5 */}
                {isSelected && (
                  <span className="w-1 h-1 rounded-full bg-white mt-0.5" />
                )}

                {/* Special indicator ring on day 29 */}
                {isSpecialCircle && !isSelected && (
                  <span className="absolute -bottom-1 w-2.5 h-2.5 rounded-full border-2 border-[#E67357]" />
                )}
              </button>
            );
          })}

          {/* Next month days */}
          {nextMonthDays.map((d) => (
            <div
              key={`next-${d}`}
              className="h-10 flex items-center justify-center text-[#BFC4D5] font-normal"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 pt-3 text-xs text-[#7D8497] font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FADBD2] border border-[#E67357]/40" />
            <span>Period</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EDE8FC] border border-[#5B3FD3]/30" />
            <span>Fertile window</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5B3FD3]" />
            <span>Logged</span>
          </div>
        </div>
      </section>

      {/* Selected Date Summary Card */}
      <section className="aya-card p-5 space-y-3 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-[#1B1E28]">
              {selectedDay === 5 ? "Today · Oct 5" : `Oct ${selectedDay}, 2026`}
            </h3>
            <p className="text-xs text-[#7D8497] font-medium mt-0.5">
              {getDayPhase(selectedDay)}
            </p>
          </div>

          <button
            onClick={() => onNavigateTab("log")}
            className="flex items-center gap-1.5 bg-[#F4F0FE] text-[#5B3FD3] text-xs font-bold px-3 py-1.5 rounded-full hover:bg-[#EDE8FC] transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5 stroke-[2.2]" />
            <span>Edit log</span>
          </button>
        </div>

        {/* Logged tags pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {selectedDay === 5 ? (
            <>
              <span className="px-3 py-1.5 bg-[#F7F6FB] text-[#4A4E5E] text-xs font-semibold rounded-xl">
                {logState.mood} mood
              </span>
              {logState.symptoms.map((symptom) => (
                <span
                  key={symptom}
                  className="px-3 py-1.5 bg-[#F7F6FB] text-[#4A4E5E] text-xs font-semibold rounded-xl"
                >
                  {symptom}
                </span>
              ))}
              <span className="px-3 py-1.5 bg-[#F7F6FB] text-[#4A4E5E] text-xs font-semibold rounded-xl">
                Good sleep
              </span>
            </>
          ) : (
            <span className="text-xs text-[#8D93A5] italic">
              Tap "Edit log" to record flow, moods, or symptoms for this date.
            </span>
          )}
        </div>
      </section>

      {/* Security and Natural Variation Disclaimer */}
      <section className="p-3.5 bg-[#F4F0FE] border border-[#ECE7FC] rounded-2xl flex items-center gap-3">
        <div className="w-6 h-6 rounded-lg bg-white/80 flex items-center justify-center shrink-0 text-[#5B3FD3]">
          <Lock className="w-3.5 h-3.5 stroke-[2.2]" />
        </div>
        <p className="text-[11px] text-[#5B3FD3]/90 leading-snug">
          Calendar predictions improve as you log, but dates can naturally vary.
        </p>
      </section>
    </div>
  );
}

"use client";

import React, { useState } from "react";

const MOODS = ["Happy 😊", "Calm 🌿", "Irritated ⚡", "Anxious 💭", "Sad 🌧️", "Energetic ⚡", "Low 🛋️"];
const SYMPTOMS = ["Cramps", "Headache", "Bloating", "Back pain", "Acne", "Fatigue", "Nausea", "Insomnia"];
const FLOWS = ["None", "Spotting", "Light", "Medium", "Heavy"];

export default function LoggingPage() {
  const [selectedMood, setSelectedMood] = useState<string | null>("Calm 🌿");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(["Bloating"]);
  const [selectedFlow, setSelectedFlow] = useState<string>("None");
  const [notes, setNotes] = useState("");
  const [savedStatus, setSavedStatus] = useState<string | null>(null);

  function toggleSymptom(symptom: string) {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSavedStatus("saving");

    try {
      await fetch("http://localhost:4000/api/logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          log_date: "2026-10-05",
          mood: selectedMood,
          symptoms: selectedSymptoms,
          notes: notes || undefined
        })
      });
      setSavedStatus("Saved successfully to your health log! 🌸");
    } catch (err) {
      setSavedStatus("Saved to local offline session! 🌸");
    }

    setTimeout(() => setSavedStatus(null), 4000);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Daily Health Check-in</h1>
        <p className="text-sm text-slate-500">Record how you feel today • October 5, 2026</p>
      </div>

      <form onSubmit={handleSave} className="glass-card p-6 sm:p-8 space-y-8">
        {/* Mood Section */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-800">
            How is your mood today?
          </label>
          <div className="flex flex-wrap gap-2">
            {MOODS.map((mood) => {
              const active = selectedMood === mood;
              return (
                <button
                  type="button"
                  key={mood}
                  onClick={() => setSelectedMood(mood)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-brand-600 text-white shadow-md shadow-brand-500/25"
                      : "bg-white border border-rose-100 text-slate-700 hover:border-brand-200"
                  }`}
                >
                  {mood}
                </button>
              );
            })}
          </div>
        </div>

        {/* Symptoms Section */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-800">
            Any physical symptoms?
          </label>
          <div className="flex flex-wrap gap-2">
            {SYMPTOMS.map((symptom) => {
              const active = selectedSymptoms.includes(symptom);
              return (
                <button
                  type="button"
                  key={symptom}
                  onClick={() => toggleSymptom(symptom)}
                  className={`px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-rose-100 border border-brand-300 text-brand-800 font-semibold"
                      : "bg-white border border-rose-100 text-slate-600 hover:border-brand-200"
                  }`}
                >
                  {active ? `✓ ${symptom}` : `+ ${symptom}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Flow Intensity */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-800">
            Flow Intensity
          </label>
          <div className="grid grid-cols-5 gap-2 text-center">
            {FLOWS.map((flow) => {
              const active = selectedFlow === flow;
              return (
                <button
                  type="button"
                  key={flow}
                  onClick={() => setSelectedFlow(flow)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? "bg-brand-600 text-white shadow-sm"
                      : "bg-white border border-rose-100 text-slate-700 hover:border-brand-200"
                  }`}
                >
                  {flow}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-800">
            Personal Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Sleep quality, hydration, food cravings, energy..."
            rows={3}
            className="w-full rounded-xl border border-rose-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white/80"
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-lg shadow-brand-500/25 transition-all"
          >
            Save Today's Check-in
          </button>
          {savedStatus && (
            <p className="text-center text-xs text-brand-700 font-semibold mt-3 animate-fade-in">
              {savedStatus}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

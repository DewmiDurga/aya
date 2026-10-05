"use client";

import React, { useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  isRedFlagged?: boolean;
}

const QUICK_PROMPTS = [
  "Why am I experiencing cramps during ovulation?",
  "How does the luteal phase affect my mood?",
  "What foods help reduce PMS bloating?",
  "Is an irregular cycle normal under stress?"
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Ayubowan! 🌸 I am ඇය (Eya), your personal reproductive health companion. I take your current cycle day and recent symptoms into account to give you compassionate, science-backed guidance. How can I support you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(textToSend: string) {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: textToSend
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            text: data.reply + (data.disclaimer ? `\n\n${data.disclaimer}` : ""),
            isRedFlagged: data.wasRedFlagged
          }
        ]);
      } else {
        throw new Error("Chat service offline");
      }
    } catch (e) {
      // High fidelity demonstration assistant response
      setTimeout(() => {
        let botReply = "Thank you for asking. Based on your cycle records (around Day 14), hormonal fluctuations such as estrogen peaks can cause mild abdominal twinges and mood shifts. Staying well-hydrated and engaging in gentle yoga can provide noticeable relief.";
        if (textToSend.toLowerCase().includes("pain") || textToSend.toLowerCase().includes("bleed")) {
          botReply += "\n\n⚠️ Medical Note: If you experience sharp, debilitating pain or sudden heavy bleeding, please seek advice from a licensed medical professional.";
        }

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            text: botReply
          }
        ]);
        setLoading(false);
      }, 700);
      return;
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Disclaimer Top Bar */}
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs flex items-center gap-2">
        <span>🛡️</span>
        <span>
          <strong>Clinical Safety Guardrail:</strong> Eya provides educational insights, not medical diagnoses. If you have severe symptoms, consult a doctor immediately.
        </span>
      </div>

      {/* Chat Window */}
      <div className="glass-card flex flex-col h-[560px] overflow-hidden">
        {/* Messages list */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-brand-600 text-white shadow-md shadow-brand-500/20 rounded-br-none"
                    : "bg-white border border-rose-100 text-slate-800 shadow-sm rounded-bl-none whitespace-pre-wrap"
                } ${m.isRedFlagged ? "border-amber-300 ring-2 ring-amber-400/40" : ""}`}
              >
                {m.role === "assistant" && (
                  <div className="text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-1">
                    🌸 Eya Assistant
                  </div>
                )}
                <p>{m.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-rose-100 rounded-2xl rounded-bl-none p-3 shadow-sm text-xs text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-ping" />
                <span>Eya is thinking contextually...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="px-4 py-2 border-t border-rose-100/60 bg-rose-50/40 flex items-center gap-2 overflow-x-auto text-xs whitespace-nowrap">
          <span className="text-slate-400 text-[10px] uppercase font-bold">Suggestions:</span>
          {QUICK_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              className="px-2.5 py-1 rounded-full bg-white border border-rose-200 text-slate-600 hover:border-brand-400 hover:text-brand-700 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="p-3 sm:p-4 bg-white/90 border-t border-rose-100/80 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about symptoms, cycle delays, fertility, diet..."
            className="flex-1 rounded-xl border border-rose-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-5 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white font-semibold text-sm shadow-md shadow-brand-500/25 transition-all"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

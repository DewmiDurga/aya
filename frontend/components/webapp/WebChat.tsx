import React, { useState } from "react";
import { Send, Sparkles, ShieldAlert, Bot, User, RefreshCw } from "lucide-react";
import { DailyLogState } from "./types";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  isRedFlagged?: boolean;
}

interface WebChatProps {
  logState: DailyLogState;
}

export function WebChat({ logState }: WebChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Ayubowan Ana! 🌸 I am ඇය (Eya), your personal reproductive health companion. I know you're currently on Cycle Day 12 (Follicular phase) and logged mild cramps & bloating today. How can I help you understand your body better?",
      timestamp: "9:41 AM",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const suggestedPrompts = [
    "Why do I have mild cramps during the follicular/ovulation phase?",
    "How does rising estrogen affect my mood and energy this week?",
    "What gentle foods or teas help relieve digestive bloating?",
    "Is a cycle variation of ±2 days considered healthy?",
  ];

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          cycleContext: {
            cycleDay: 12,
            phase: "Follicular",
            loggedSymptoms: logState.symptoms,
            mood: logState.mood,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: data.reply + (data.disclaimer ? `\n\n${data.disclaimer}` : ""),
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            isRedFlagged: data.wasRedFlagged,
          },
        ]);
        setIsTyping(false);
        return;
      }
      throw new Error("Local chat offline");
    } catch (e) {
      // High fidelity demonstration assistant
      setTimeout(() => {
        let reply = "During Cycle Day 12, your body approaches the ovulation window (Oct 9–14). The growing follicle on your ovary can cause light, temporary pelvic pressure or twinges (known clinically as mittelschmerz).";
        
        if (textToSend.toLowerCase().includes("food") || textToSend.toLowerCase().includes("bloat")) {
          reply = "For bloating in the follicular window, hydration with electrolyte-rich water, herbal peppermint or ginger tea, and magnesium-rich greens can significantly ease digestive tension.";
        } else if (textToSend.toLowerCase().includes("variation") || textToSend.toLowerCase().includes("normal")) {
          reply = "Yes, absolutely! Your 5-cycle history shows an average of 28 days with a ±2 day variation. The American College of Obstetricians and Gynecologists (ACOG) considers variations up to 7–9 days standard.";
        }

        if (textToSend.toLowerCase().includes("severe") || textToSend.toLowerCase().includes("fever")) {
          reply += "\n\n⚠️ Clinical Alert: If you ever experience sudden severe pain accompanied by high fever or dizziness, please seek prompt medical evaluation.";
        }

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: reply,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        setIsTyping(false);
      }, 700);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 flex flex-col h-[calc(100vh-180px)]">
      {/* Cycle Awareness Header */}
      <div className="bg-[#FFF0EB] border border-[#FADBD2] p-4 rounded-3xl flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-white text-[#E67357] flex items-center justify-center font-bold text-xs shadow-sm">
            <Sparkles className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-[#1B1E28]">
              Context-Aware Reproductive Intelligence
            </p>
            <p className="text-[11px] text-[#7D8497]">
              Current Cycle Day 12 · Follicular Phase · Symptoms: {logState.symptoms.join(", ")}
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-[#8C3A29]">
          <ShieldAlert className="w-3.5 h-3.5 text-[#E67357]" />
          <span>Educational Guidance Only</span>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 bg-white rounded-3xl border border-[#ECE9F5] p-6 shadow-soft overflow-y-auto space-y-4">
        {messages.map((m) => {
          const isUser = m.sender === "user";
          return (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? "bg-[#5B3FD3] text-white"
                    : "bg-[#EDE8FC] text-[#5B3FD3] border border-[#E0D7F8]"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[75%] rounded-3xl p-4 text-xs leading-relaxed space-y-1 ${
                  isUser
                    ? "bg-[#5B3FD3] text-white rounded-tr-none shadow-md shadow-[#5B3FD3]/15"
                    : "bg-[#F8F8FC] border border-[#ECE9F5] text-[#1B1E28] rounded-tl-none"
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
                <p
                  className={`text-[9px] text-right font-medium ${
                    isUser ? "text-white/70" : "text-[#9BA1B4]"
                  }`}
                >
                  {m.timestamp}
                </p>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#EDE8FC] text-[#5B3FD3] flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[#F8F8FC] border border-[#ECE9F5] rounded-3xl px-4 py-3 flex items-center gap-1.5 text-xs text-[#7D8497]">
              <span className="w-2 h-2 rounded-full bg-[#5B3FD3] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#5B3FD3] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#5B3FD3] animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] ml-1">Eya is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0 hide-scrollbar">
        {suggestedPrompts.map((p) => (
          <button
            key={p}
            onClick={() => handleSend(p)}
            className="whitespace-nowrap px-3.5 py-1.5 rounded-full bg-white border border-[#ECE9F5] hover:border-[#5B3FD3] text-[#4A4E5E] text-[11px] font-semibold transition-colors shadow-xs"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="bg-white rounded-2xl border border-[#ECE9F5] p-2 flex items-center gap-2 shadow-soft shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Eya anything about your cycle, hormonal shifts, symptoms or nutrition..."
          className="flex-1 px-4 py-2 text-xs text-[#1B1E28] placeholder-[#9BA1B4] bg-transparent focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="w-10 h-10 rounded-xl bg-[#5B3FD3] hover:bg-[#4C32C2] text-white flex items-center justify-center transition-all disabled:opacity-50"
        >
          <Send className="w-4 h-4 stroke-[2.2]" />
        </button>
      </form>
    </div>
  );
}

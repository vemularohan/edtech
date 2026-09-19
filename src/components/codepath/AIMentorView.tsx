import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  Code2,
  HelpCircle,
  Lightbulb,
  MessageSquare,
  Send,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { curriculumModules } from "@/lib/curriculum-data";

export function AIMentorView() {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    Array<{ role: "student" | "ai"; text: string; action?: string }>
  >([
    {
      role: "ai",
      text: "Hi Aarav! 👋\nI'm your AI Mentor. I can help you with:\n• Explaining concepts\n• Debugging code\n• Giving hints (not answers!)\n• Project guidance\n• Career advice\n\nWhat would you like help with today?",
    },
    {
      role: "student",
      text: "I'm getting an error in my code. Can you help?",
    },
    {
      role: "ai",
      text: "Of course! Please share your code and the error message.\nI'll help you understand what's happening and guide you to fix it.",
    },
  ]);

  const capabilities = [
    { label: "Explain a concept", prompt: "Can you explain how variables and types work in Python?" },
    { label: "Debug my code", prompt: "I have a bug in my temperature conversion function. Can you help me find it?" },
    { label: "Give me a hint", prompt: "Could you give me a hint on handling edge cases for Module 01 challenge?" },
    { label: "Project advice", prompt: "What are best practices for organizing my CSV data analysis project?" },
  ];

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const studentMsg = { role: "student" as const, text };
    let replyText = "";

    if (text.toLowerCase().includes("debug") || text.toLowerCase().includes("error")) {
      replyText = "Let's diagnose it step by step. What is the exact error trace? Check whether you're trying to perform an operation between incompatible types (e.g. string and int), or if a variable hasn't been defined yet.";
    } else if (text.toLowerCase().includes("explain") || text.toLowerCase().includes("concept")) {
      replyText = "In Python, a variable is essentially a labeled pointer to an object stored in memory. When you assign `temp = 19.5`, Python infers the `float` type dynamically. You don't need manual type declarations, but operators must still match the underlying types!";
    } else if (text.toLowerCase().includes("hint")) {
      replyText = "Hint: For temperature conversion `F = (C * 9/5) + 32`, make sure you preserve decimal precision by using `9/5` instead of integer division `//`, and ensure non-numeric inputs are caught with a `try/except ValueError` block.";
    } else {
      replyText = `Great question regarding your current progress in Module 01! Let's think through this systematically. What is your expected outcome versus what is currently occurring?`;
    }

    const aiReply = { role: "ai" as const, text: replyText };
    setMessages((prev) => [...prev, studentMsg, aiReply]);
    setInput("");
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 pb-16">
      {/* ── Top Header ── */}
      <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-4">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-2xl bg-[#0F766E] text-white shadow-2xs">
            <Bot className="size-6 text-[#CCFBF1]" />
          </div>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-[#0B1F2A]">
              AI Mentor
            </h1>
            <p className="text-xs text-[#587078]">
              Your personal learning companion
            </p>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="border-[#DCE7E5] text-[#587078] hover:bg-[#F0F5F4] text-xs font-semibold h-8"
          onClick={() =>
            navigate({
              to: "/learning-mode",
              search: { module: "3.2" },
            })
          }
        >
          Resume Module 01 →
        </Button>
      </div>

      {/* ── Chat Container ── */}
      <div className="rounded-2xl border border-[#DCE7E5] bg-white shadow-2xs overflow-hidden flex flex-col min-h-[500px]">
        {/* Messages List */}
        <div className="flex-1 p-5 space-y-4 overflow-y-auto max-h-[520px]">
          {messages.map((m, idx) => {
            const isStudent = m.role === "student";
            return (
              <div
                key={idx}
                className={`flex ${isStudent ? "justify-end" : "justify-start"}`}
              >
                {!isStudent && (
                  <div className="grid size-7 place-items-center rounded-lg bg-[#CCFBF1] text-[#0F766E] shrink-0 mr-2.5 mt-0.5">
                    <Bot className="size-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                    isStudent
                      ? "bg-[#0F766E] text-white rounded-br-xs font-medium"
                      : "bg-[#F7FAFA] text-[#0B1F2A] border border-[#DCE7E5] rounded-bl-xs whitespace-pre-wrap shadow-2xs"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Suggested Quick Capabilities Pills */}
        <div className="border-t border-[#DCE7E5]/70 bg-[#F7FAFA] px-4 py-2.5 flex flex-wrap gap-2">
          {capabilities.map((cap) => (
            <button
              key={cap.label}
              onClick={() => handleSend(cap.prompt)}
              className="rounded-lg border border-[#DCE7E5] bg-white px-3 py-1 text-[11px] font-semibold text-[#0F766E] hover:bg-[#CCFBF1]/40 hover:border-[#0F766E]/40 transition shadow-2xs"
            >
              {cap.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-[#DCE7E5] bg-white flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask me anything..."
            className="flex-1 bg-[#F0F5F4] rounded-xl px-4 py-2.5 text-xs text-[#0B1F2A] placeholder-[#84979D] outline-none border border-transparent focus:border-[#0F766E] focus:bg-white transition"
          />
          <Button
            size="sm"
            className="bg-[#0F766E] hover:bg-[#0B1F2A] text-white px-4 h-9 shadow-2xs"
            onClick={() => handleSend()}
          >
            <Send className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

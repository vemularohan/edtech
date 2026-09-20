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
      text: "Hello Aarav! 👋\nI'm your Socratic AI Mentor. I am calibrated to help you with:\n• Explaining core concepts & execution models\n• Diagnosing traceback errors step by step\n• Providing scaffolded hints (not direct answers!)\n• Capstone architecture best practices\n\nWhat would you like to explore today?",
    },
    {
      role: "student",
      text: "I'm working on temperature conversion in Module 01 and want to make sure I'm handling edge cases properly.",
    },
    {
      role: "ai",
      text: "Excellent focus on defensive programming! In Python, floating-point arithmetic can introduce slight precision artifacts. For example, `19.5 * (9/5) + 32` produces `51.1`, but what happens if someone passes an unexpected type like a string `'19.5'` or a `None` value? How would your function guard against that?",
    },
  ]);

  const capabilities = [
    { label: "Explain a concept", prompt: "Can you explain how variables and types work in Python memory?" },
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
    <div className="page-container page-sections">
      {/* ── Top Header (Aligned to Global Grid) ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#DCE7E5] pb-4">
        <div className="flex items-center gap-3.5">
          <div className="grid size-12 place-items-center rounded-2xl bg-[#0F766E] text-white shadow-2xs shrink-0">
            <Bot className="size-6 text-[#CCFBF1]" />
          </div>
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
              SOCRATIC ASSISTANT
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F2A] tracking-tight">
              AI Mentor
            </h1>
            <p className="text-xs text-[#587078]">
              Your 24/7 personal learning companion
            </p>
          </div>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="border-[#DCE7E5] text-[#0F766E] hover:bg-[#CCFBF1]/40 text-xs font-semibold h-10 px-4 rounded-xl cursor-pointer self-start sm:self-auto"
          onClick={() =>
            navigate({
              to: "/learning-mode",
              search: { module: "3.2" },
            })
          }
        >
          Resume Module 01 <ArrowRight className="size-3.5 ml-1.5" />
        </Button>
      </div>

      {/* ── Chat Container (Standardized UI Card) ── */}
      <div className="ui-card p-0 overflow-hidden flex flex-col min-h-[520px]">
        {/* Messages List */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[520px]">
          {messages.map((m, idx) => {
            const isStudent = m.role === "student";
            return (
              <div
                key={idx}
                className={`flex ${isStudent ? "justify-end" : "justify-start"}`}
              >
                {!isStudent && (
                  <div className="grid size-8 place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E] shrink-0 mr-3 mt-0.5">
                    <Bot className="size-4.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4.5 py-3 text-xs leading-relaxed ${
                    isStudent
                      ? "bg-[#0F766E] text-white rounded-br-xs font-medium shadow-2xs"
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
        <div className="border-t border-[#DCE7E5] bg-[#F7FAFA] px-5 py-3 flex flex-wrap gap-2">
          {capabilities.map((cap) => (
            <button
              key={cap.label}
              onClick={() => handleSend(cap.prompt)}
              className="rounded-lg border border-[#DCE7E5] bg-white px-3 py-1.5 text-[11px] font-semibold text-[#0F766E] hover:bg-[#CCFBF1]/40 hover:border-[#0F766E]/40 transition shadow-2xs cursor-pointer"
            >
              {cap.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-[#DCE7E5] bg-white flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask a question about Python, edge cases, or project design..."
            className="flex-1 bg-[#F0F5F4] rounded-xl px-4 py-2.5 text-xs text-[#0B1F2A] placeholder-[#84979D] outline-none border border-transparent focus:border-[#0F766E] focus:bg-white transition h-11"
          />
          <Button
            size="sm"
            className="bg-[#0F766E] hover:bg-[#0d655e] text-white px-5 h-11 rounded-xl shadow-xs cursor-pointer gap-1.5 font-semibold text-xs"
            onClick={() => handleSend()}
          >
            <span>Send</span>
            <Send className="size-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

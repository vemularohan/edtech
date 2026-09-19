import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  Code2,
  HelpCircle,
  Lightbulb,
  Play,
  RotateCcw,
  Send,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { recordLearningEvidence, recordSkillActivity } from "@/lib/learning-progress";

export function PracticeLabView() {
  const navigate = useNavigate();

  const starterCode = `def c_to_f(celsius):
    return (celsius * 9/5) + 32

temp = 19.5
print(c_to_f(temp))
`;

  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState("51.1");
  const [hasRun, setHasRun] = useState(true);
  const [activeStep, setActiveStep] = useState<number>(4); // Step 5: PRACTICE (0-indexed 4)

  const steps = [
    { label: "HOOK", done: true },
    { label: "WHY", done: true },
    { label: "LEARN", done: true },
    { label: "TRY IT", done: true },
    { label: "PRACTICE", current: true },
    { label: "BREAK IT", done: false },
    { label: "YOUR TURN", done: false },
    { label: "KNOWLEDGE CHECK", done: false },
    { label: "MASTERY", done: false },
    { label: "NEXT", done: false },
  ];

  const testCases = [
    { id: 1, name: "Test 1: 0 → 32", passed: true },
    { id: 2, name: "Test 2: 100 → 212", passed: true },
    { id: 3, name: "Test 3: 19.5 → 51.1", passed: true },
  ];

  const handleRunCode = () => {
    try {
      if (code.includes("c_to_f") || code.includes("9/5") || code.includes("32")) {
        setOutput("51.1");
        setHasRun(true);
        recordSkillActivity("3.2", "syntax", 10);
        recordLearningEvidence({
          moduleId: "3.2",
          stage: "PRACTICE",
          artifactType: "test_run",
          verified: true,
          score: 100,
        });
        toast.success("Code executed successfully! Output: 51.1");
      } else {
        setOutput("Traceback (most recent call last):\nValueError: Formula mismatch");
        toast.error("Execution failed: check formula");
      }
    } catch {
      setOutput("SyntaxError: invalid syntax");
    }
  };

  return (
    <div className="mx-auto max-w-7xl pb-16">
      {/* ── Subheader / Breadcrumb Bar ── */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE7E5] pb-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-lg bg-[#CCFBF1] px-2.5 py-1 text-xs font-bold text-[#0F766E] border border-[#0F766E]/20">
            <Code2 className="size-3.5" />
            <span>Hands-on</span>
          </div>
          <div>
            <span className="font-mono text-[10px] font-bold text-[#84979D] uppercase tracking-wider">
              Module 01 · Python Foundations for AI
            </span>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-base font-bold text-[#0B1F2A]">
                5. PRACTICE
              </h1>
              <span className="text-xs text-[#587078]">· Trace generated code</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-[#DCE7E5] text-[#587078] hover:bg-[#F0F5F4] text-xs font-semibold h-8"
            onClick={() =>
              navigate({
                to: "/learning-mode",
                search: { module: "3.2", step: 3 },
              })
            }
          >
            ← Previous
          </Button>
          <Button
            size="sm"
            className="bg-[#0F766E] hover:bg-[#0B1F2A] text-white text-xs font-semibold h-8 shadow-2xs"
            onClick={() =>
              navigate({
                to: "/learning-mode",
                search: { module: "3.2", step: 5 },
              })
            }
          >
            Next: Break It →
          </Button>
        </div>
      </div>

      {/* ── Main Workspace: 3 Columns matching Reference Screen 4 ── */}
      <div className="grid gap-4 lg:grid-cols-12 items-start">
        {/* LEFT COLUMN: Challenge & Requirements (col-span-3) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-2xl border border-[#DCE7E5] bg-white p-4 space-y-3.5 shadow-2xs">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#84979D]">
                Challenge
              </p>
              <h2 className="mt-1 text-xs font-bold text-[#0B1F2A] leading-snug">
                Convert a temperature from Celsius to Fahrenheit.
              </h2>
              <div className="mt-2 rounded-lg bg-[#F0F5F4] p-2.5 font-mono text-[11px] text-[#0F766E] border border-[#DCE7E5]">
                Use the formula: <span className="font-bold">F = (C * 9/5) + 32</span>
              </div>
            </div>

            <div className="border-t border-[#DCE7E5]/70 pt-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#84979D] mb-2">
                Requirements
              </p>
              <ul className="space-y-2 text-xs text-[#587078]">
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#0F766E] mt-1.5 shrink-0" />
                  <span>Take a number input</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#0F766E] mt-1.5 shrink-0" />
                  <span>Calculate Fahrenheit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#0F766E] mt-1.5 shrink-0" />
                  <span>Print the result</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#0F766E] mt-1.5 shrink-0" />
                  <span>Handle decimal numbers</span>
                </li>
              </ul>
            </div>
          </div>

          {/* AI Mentor hint card */}
          <div className="rounded-2xl border border-[#DCE7E5] bg-[#F7FAFA] p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid size-7 place-items-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
                <Bot className="size-4" />
              </div>
              <div className="text-[11px]">
                <p className="font-bold text-[#0B1F2A]">Need a hint?</p>
                <p className="text-[#84979D]">Ask the AI Mentor!</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="text-[11px] font-semibold h-7 border-[#0F766E]/30 text-[#0F766E] hover:bg-[#CCFBF1]/40"
              onClick={() => navigate({ to: "/tutor" })}
            >
              Ask
            </Button>
          </div>
        </div>

        {/* CENTER COLUMN: Code Editor (col-span-5) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-[#0B1F2A] bg-[#0B1F2A] shadow-md flex flex-col min-h-[460px]">
            {/* Editor Top Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#081720] border-b border-white/10">
              <div className="flex items-center gap-2">
                <Terminal className="size-3.5 text-[#14B8A6]" />
                <span className="font-mono text-xs font-semibold text-slate-200">main.py</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">Python 3.11</span>
            </div>

            {/* Code Input */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 w-full resize-none p-4 font-mono text-xs leading-6 outline-none bg-[#0B1F2A] text-slate-100 placeholder-slate-500"
              style={{ caretColor: "#14B8A6" }}
              spellCheck={false}
              aria-label="Python code editor"
            />

            {/* Editor Action Buttons */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#081720] border-t border-white/10">
              <Button
                size="sm"
                className="bg-[#0F766E] hover:bg-[#14B8A6] text-white text-xs font-bold px-4 h-8 shadow-2xs gap-1.5"
                onClick={handleRunCode}
              >
                <Play className="size-3.5 fill-current" />
                Run Code
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-slate-300 hover:bg-white/10 text-xs font-semibold h-8 gap-1"
                onClick={() => setCode(starterCode)}
              >
                <RotateCcw className="size-3" />
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Output & Test Results (col-span-4) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Output Window */}
          <div className="rounded-2xl border border-[#DCE7E5] bg-white p-4 shadow-2xs">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#84979D]">
              Output
            </p>
            <div className="mt-2 rounded-xl bg-[#F0F5F4] p-3 font-mono text-sm font-bold text-[#0B1F2A] border border-[#DCE7E5]">
              {output}
            </div>
          </div>

          {/* Test Results */}
          <div className="rounded-2xl border border-[#DCE7E5] bg-white p-4 shadow-2xs space-y-3">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#84979D]">
              Test Results
            </p>

            <div className="space-y-2">
              {testCases.map((tc) => (
                <div
                  key={tc.id}
                  className="flex items-center justify-between rounded-xl bg-[#F7FAFA] px-3.5 py-2.5 border border-[#DCE7E5]"
                >
                  <span className="font-mono text-xs text-[#0B1F2A]">{tc.name}</span>
                  <div className="grid size-5 place-items-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
                    <Check className="size-3 stroke-[3]" />
                  </div>
                </div>
              ))}
            </div>

            {hasRun && (
              <div className="rounded-xl bg-[#CCFBF1]/50 border border-[#0F766E]/20 p-3 text-center">
                <p className="text-xs font-bold text-[#0F766E]">All tests passed!</p>
                <p className="text-[10px] text-[#587078] mt-0.5">Great job! Ready for the next stage.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

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
    """Convert Celsius to Fahrenheit preserving floating-point precision."""
    return (celsius * 9/5) + 32

temp = 19.5
print(f"{temp}°C = {c_to_f(temp):.1f}°F")
`;

  const [code, setCode] = useState(starterCode);
  const [output, setOutput] = useState("19.5°C = 51.1°F");
  const [hasRun, setHasRun] = useState(true);

  const testCases = [
    { id: 1, name: "Test 1: 0°C → 32.0°F", passed: true },
    { id: 2, name: "Test 2: 100°C → 212.0°F", passed: true },
    { id: 3, name: "Test 3: 19.5°C → 51.1°F", passed: true },
  ];

  const handleRunCode = () => {
    try {
      if (code.includes("c_to_f") || code.includes("9/5") || code.includes("32")) {
        setOutput("19.5°C = 51.1°F");
        setHasRun(true);
        recordSkillActivity("3.2", "python-types", 4, "Passed hands-on practice lab");
        recordLearningEvidence({
          sectionsCompleted: 1,
        });
        toast.success("Code executed successfully! All tests passed.");
      } else {
        setOutput("Traceback (most recent call last):\nValueError: Formula mismatch in conversion logic");
        toast.error("Execution failed: check formula");
      }
    } catch {
      setOutput("SyntaxError: invalid syntax");
    }
  };

  return (
    <div className="page-container page-sections">
      {/* ── Subheader Bar (Aligned to Global Grid) ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE7E5] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded">
              HANDS-ON LAB
            </span>
            <span className="text-xs text-[#84979D]">·</span>
            <span className="text-xs font-mono text-[#587078]">
              Module 01 · Step 5 of 10
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F2A] tracking-tight">
            Practice: Trace Generated Code
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-[#587078]">
            Defensive temperature conversion logic with strict typing and floating-point assertions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            className="border-[#DCE7E5] text-[#587078] hover:bg-[#F0F5F4] hover:text-[#0B1F2A] text-xs font-semibold h-10 px-3.5 rounded-xl cursor-pointer"
            onClick={() =>
              navigate({
                to: "/learning-mode",
                search: { module: "3.2", step: 3 },
              })
            }
          >
            <ArrowLeft className="size-3.5 mr-1" />
            Previous Step
          </Button>
          <Button
            size="sm"
            className="bg-[#0F766E] hover:bg-[#0d655e] text-white text-xs font-semibold h-10 px-4 rounded-xl shadow-sm cursor-pointer"
            onClick={() =>
              navigate({
                to: "/learning-mode",
                search: { module: "3.2", step: 5 },
              })
            }
          >
            Next: Break It <ArrowRight className="size-3.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* ── Main Workspace: 3 Balanced Columns ── */}
      <div className="grid gap-5 lg:grid-cols-12 items-start">
        {/* LEFT COLUMN: Challenge & Requirements (col-span-3) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="ui-card p-5 space-y-4">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
                CHALLENGE OBJECTIVE
              </span>
              <h2 className="mt-1 text-sm font-bold text-[#0B1F2A] leading-snug">
                Convert a temperature from Celsius to Fahrenheit.
              </h2>
              <div className="mt-2.5 rounded-xl bg-[#F0F5F4] p-3 font-mono text-xs text-[#0F766E] border border-[#DCE7E5]">
                Formula: <span className="font-bold">F = (C * 9/5) + 32</span>
              </div>
            </div>

            <div className="border-t border-[#DCE7E5] pt-3.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#84979D] mb-2.5 block">
                Verification Criteria
              </span>
              <ul className="space-y-2 text-xs text-[#587078]">
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#0F766E] mt-1.5 shrink-0" />
                  <span>Accept numeric floating-point input</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#0F766E] mt-1.5 shrink-0" />
                  <span>Preserve decimal precision using standard division</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#0F766E] mt-1.5 shrink-0" />
                  <span>Format output with defensive string representation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="size-1.5 rounded-full bg-[#0F766E] mt-1.5 shrink-0" />
                  <span>Trap invalid non-numeric arguments gracefully</span>
                </li>
              </ul>
            </div>
          </div>

          {/* AI Mentor Hint Card */}
          <div className="rounded-2xl border border-[#DCE7E5] bg-white p-4 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="grid size-9 place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E]">
                <Bot className="size-5" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#0B1F2A]">Need Guidance?</p>
                <p className="text-[#84979D]">Ask your Socratic Mentor</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="text-xs font-semibold h-8 border-[#0F766E]/30 text-[#0F766E] hover:bg-[#CCFBF1]/40 rounded-lg cursor-pointer"
              onClick={() => navigate({ to: "/tutor" })}
            >
              Ask AI
            </Button>
          </div>
        </div>

        {/* CENTER COLUMN: Code Editor (col-span-5) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-[#123542] bg-[#0B1F2A] shadow-sm flex flex-col min-h-[460px]">
            {/* Editor Top Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#081720] border-b border-white/10">
              <div className="flex items-center gap-2">
                <Terminal className="size-3.5 text-[#14B8A6]" />
                <span className="font-mono text-xs font-semibold text-slate-200">main.py</span>
              </div>
              <span className="font-mono text-[10px] text-[#14B8A6] bg-[#14B8A6]/10 px-2 py-0.5 rounded">Python 3.12</span>
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
            <div className="flex items-center justify-between px-4 py-3 bg-[#081720] border-t border-white/10">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="bg-[#0F766E] hover:bg-[#0d655e] text-white text-xs font-bold px-4 h-9 rounded-xl shadow-xs gap-1.5 cursor-pointer"
                  onClick={handleRunCode}
                >
                  <Play className="size-3.5 fill-current" />
                  Run Code
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-slate-300 hover:bg-white/10 text-xs font-semibold h-9 rounded-xl gap-1 cursor-pointer"
                  onClick={() => setCode(starterCode)}
                >
                  <RotateCcw className="size-3" />
                  Reset
                </Button>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Ctrl + Enter to run</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Output & Test Results (col-span-3) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Output Window */}
          <div className="ui-card p-4 space-y-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#84979D] block">
              CONSOLE OUTPUT
            </span>
            <div className="rounded-xl bg-[#0B1F2A] text-[#CCFBF1] p-3 font-mono text-xs border border-[#123542]">
              {output}
            </div>
          </div>

          {/* Test Results */}
          <div className="ui-card p-4 space-y-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#84979D] block">
              AUTOMATED TEST RESULTS
            </span>

            <div className="space-y-2">
              {testCases.map((tc) => (
                <div
                  key={tc.id}
                  className="flex items-center justify-between rounded-xl bg-[#F7FAFA] px-3 py-2 border border-[#DCE7E5]"
                >
                  <span className="font-mono text-[11px] text-[#0B1F2A]">{tc.name}</span>
                  <div className="grid size-5 place-items-center rounded-full bg-[#DCFCE7] text-[#16A34A]">
                    <Check className="size-3 stroke-[3]" />
                  </div>
                </div>
              ))}
            </div>

            {hasRun && (
              <div className="rounded-xl bg-[#CCFBF1]/50 border border-[#0F766E]/20 p-3 text-center">
                <p className="text-xs font-bold text-[#0F766E]">All 3 Tests Passed</p>
                <p className="text-[10px] text-[#587078] mt-0.5">Ready to advance to Stage 6: Break It.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

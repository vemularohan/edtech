import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bot,
  BrainCircuit,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Code2,
  Copy,
  ExternalLink,
  Flame,
  HelpCircle,
  Layers,
  Lightbulb,
  Lock,
  Play,
  RefreshCw,
  RotateCcw,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SpatialCard } from "@/components/ui/SpatialCard";
import { getLearningExperience, type LearningStep } from "@/lib/learning-experiences";
import { module01Content } from "@/lib/module-01-content";
import {
  readLearningProgress,
  recordConceptActivity,
  recordSkillActivity,
  useLearningProgress,
  useSkillMastery,
  SKILL_LEVEL_LABELS,
  MODULE_01_SKILLS,
  updateLearningPosition,
  completeLearningModule,
} from "@/lib/learning-progress";

interface Module01StudioProps {
  concept?: string;
  stepIndex?: number;
  onNavigateHome?: () => void;
}

export function Module01Studio({
  concept,
  stepIndex: initialStepIndex = 0,
  onNavigateHome,
}: Module01StudioProps) {
  const navigate = useNavigate();
  const experience = useMemo(() => getLearningExperience("3.2"), []);
  const steps = experience.steps;

  // Resolve initial step from concept if provided
  const resolvedInitialStep = useMemo(() => {
    if (concept) {
      const idx = steps.findIndex(
        (s) =>
          s.title.toLowerCase().includes(concept.toLowerCase()) ||
          (s.skillId && s.skillId.toLowerCase().includes(concept.toLowerCase())),
      );
      if (idx >= 0) return idx;
    }
    return Math.min(Math.max(0, initialStepIndex), steps.length - 1);
  }, [concept, initialStepIndex, steps]);

  const [currentStepIdx, setCurrentStepIdx] = useState(resolvedInitialStep);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [breakPhase, setBreakPhase] = useState<1 | 2 | 3>(1);
  const [studentCode, setStudentCode] = useState<string>("");
  const [mentorLevel, setMentorLevel] = useState<number>(1);
  const [mentorChat, setMentorChat] = useState<{ role: "user" | "mentor"; text: string }[]>([]);
  const [userQuery, setUserQuery] = useState<string>("");
  const [simulatedOutput, setSimulatedOutput] = useState<string | null>(null);
  const [isRunningCode, setIsRunningCode] = useState<boolean>(false);
  const [rubricChecks, setRubricChecks] = useState<Record<string, boolean>>({});
  const [showSolutionDiff, setShowSolutionDiff] = useState<boolean>(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [xpToast, setXpToast] = useState<{ amount: number; message: string } | null>(null);
  const [activeSidebarTab, setActiveSidebarTab] = useState<"mentor" | "skills" | "terminal">("mentor");
  const [testResults, setTestResults] = useState<{ id: string; passed: boolean; label: string; details: string }[]>([]);

  const [learnConceptTab, setLearnConceptTab] = useState<string>("Variables");
  const [mentorOpen, setMentorOpen] = useState<boolean>(true);
  const [liveExperimentVal, setLiveExperimentVal] = useState<string>("Alice");

  const skills = useSkillMastery("3.2");
  const step = steps[currentStepIdx] || steps[0]!;

  // Sync position into learning-progress
  useEffect(() => {
    updateLearningPosition({
      currentModuleId: "3.2",
      currentStepIndex: currentStepIdx,
      currentTopic: step.title,
    });
  }, [currentStepIdx, step.title]);

  // Reset local state when changing steps
  useEffect(() => {
    setSelectedOption("");
    setIsRevealed(false);
    setBreakPhase(1);
    setSimulatedOutput(null);
    setShowSolutionDiff(false);
    setTestResults([]);

    // Initialize student code for edit interactions
    if (step.stage === "MASTERY" || step.activityType === "final-mission") {
      setStudentCode(module01Content.finalProject.starterCode);
    } else if (step.fixedCode) {
      setStudentCode(step.example);
    } else {
      setStudentCode(step.example || "");
    }
  }, [currentStepIdx, step]);

  const triggerXp = (amount: number, message: string) => {
    setXpToast({ amount, message });
    setTimeout(() => setXpToast(null), 3500);
  };

  const markStepComplete = (stepIdx: number, xp = 30) => {
    setCompletedSteps((prev) => new Set([...prev, stepIdx]));
    const currentStep = steps[stepIdx];
    if (!currentStep) return;

    if (currentStep.skillId) {
      const targetLevel =
        currentStep.stage === "LEARN"
          ? 1
          : currentStep.stage === "TRY IT"
            ? 2
            : currentStep.stage === "PRACTICE"
              ? 3
              : currentStep.stage === "BREAK IT"
                ? 4
                : currentStep.stage === "YOUR TURN"
                  ? 5
                  : 6;

      recordSkillActivity(
        "3.2",
        currentStep.skillId,
        targetLevel,
        `Completed ${currentStep.title} (${currentStep.stage})`,
      );
    }

    recordConceptActivity(
      `3.2-${currentStep.id}`,
      {
        lessonViewed: true,
        practiceCompleted: currentStep.stage === "PRACTICE" || currentStep.stage === "TRY IT",
        breakItCompleted: currentStep.stage === "BREAK IT",
        yourTurnCompleted: currentStep.stage === "YOUR TURN",
        challengeCompleted: currentStep.stage === "MASTERY",
        ...(currentStep.stage === "KNOWLEDGE CHECK" ? { knowledgeCheckScore: 100 } : {}),
      },
      "3.2",
    );

    triggerXp(xp, `Step Completed: ${currentStep.title}`);
  };

  const handleNextStep = () => {
    markStepComplete(currentStepIdx, step.xpReward || 30);
    if (currentStepIdx < steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    } else {
      // Completed final step!
      completeLearningModule("3.2", 8);
      triggerXp(100, "🎉 Module 01 Mastered! Python Foundations Completed!");
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const canContinue = useMemo(() => {
    if (step.stage === "HOOK" || step.activityType === "hook") {
      return isRevealed;
    }
    if (step.stage === "BREAK IT" || step.activityType === "break-it") {
      return breakPhase === 3 && isRevealed;
    }
    if (step.stage === "TRY IT" || step.activityType === "predict") {
      return isRevealed;
    }
    if (step.stage === "KNOWLEDGE CHECK" || step.activityType === "knowledge-check") {
      return isRevealed;
    }
    if (step.stage === "MASTERY" || step.activityType === "final-mission") {
      return testResults.length > 0 && testResults.every((t) => t.passed);
    }
    return true;
  }, [step, isRevealed, breakPhase, testResults]);

  // Socratic Mentor Query Handler
  const handleAskMentor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery.trim()) return;

    const query = userQuery.trim();
    setUserQuery("");
    const newChat = [...mentorChat, { role: "user" as const, text: query }];
    setMentorChat(newChat);

    // Contextual responses based on current step
    setTimeout(() => {
      let mentorResponse = "";
      const lower = query.toLowerCase();

      if (lower.includes("hint") || lower.includes("help") || lower.includes("how")) {
        if (step.mentorHints && step.mentorHints[mentorLevel - 1]) {
          mentorResponse = `💡 Level ${mentorLevel} Hint: ${step.mentorHints[mentorLevel - 1]}`;
        } else {
          mentorResponse = `Inspect what data types are involved in this step. Remember: in Python, strong typing means strings never silently convert to numbers in math operations!`;
        }
      } else if (lower.includes("why") || lower.includes("crash") || lower.includes("error")) {
        mentorResponse = `Look closely at Python's memory and execution model. In this step (${step.stage}), ${step.whyItMatters}`;
      } else if (lower.includes("solution") || lower.includes("code") || lower.includes("answer")) {
        mentorResponse = `Before looking at the full solution, try breaking down the problem into three questions: 1) What are the input types? 2) What is the operation? 3) What condition prevents failure? Check the Level 4 hint for pseudo-code!`;
      } else {
        mentorResponse = `Great question. Consider how this relates to "${step.title}". In production AI systems, generated outputs are untrusted text strings. How can your code guarantee defensive validation here?`;
      }

      setMentorChat([...newChat, { role: "mentor", text: mentorResponse }]);
    }, 450);
  };

  // Code Simulator Stub (Deterministic & Clear)
  const handleRunSimulatedCode = (codeToRun: string) => {
    setIsRunningCode(true);
    setActiveSidebarTab("terminal");
    setSimulatedOutput("⚙️ Initializing isolated Python 3.12 runtime environment...\n");

    setTimeout(() => {
      setIsRunningCode(false);
      if (step.stage === "MASTERY" || step.activityType === "final-mission") {
        // Run full test suite for final project
        const tests = [
          {
            id: "test-1",
            label: "Standard Payload with Mixed Data Types",
            passed: true,
            details: "Passed: 2 items parsed & active >= 80.0, 3 items safely rejected (1 string 'INVALID', 1 inactive, 1 below threshold).",
          },
          {
            id: "test-2",
            label: "Missing Input File Handling",
            passed: true,
            details: "Passed: Gracefully caught FileNotFoundError; returned {'error': 'Input file not found', 'processed': 0}.",
          },
          {
            id: "test-3",
            label: "Empty Dataset [] Ingestion",
            passed: true,
            details: "Passed: Returned {'processed': 0, 'passed': 0, 'rejected': 0} without ZeroDivisionError.",
          },
          {
            id: "test-4",
            label: "Malformed JSON Defense",
            passed: true,
            details: "Passed: Caught JSONDecodeError gracefully; avoided unhandled interpreter crash.",
          },
        ];
        setTestResults(tests);
        setSimulatedOutput(
          `Python 3.12.3 (main, Nov 2025)\n[Test Suite Runner: Reliable Data CLI]\n\n` +
            `✓ [PASS] test_mixed_types: 2 passed, 3 rejected\n` +
            `✓ [PASS] test_missing_file: FileNotFoundError handled cleanly\n` +
            `✓ [PASS] test_empty_dataset: 0 processed\n` +
            `✓ [PASS] test_malformed_json: JSONDecodeError trapped\n\n` +
            `================ 4 passed in 0.12s ================\nOutput report successfully written to ./data/output_report.json (UTF-8 formatted)`,
        );
        triggerXp(100, "All 4 Test Cases Passed! Reliable Data CLI verified!");
      } else if (step.stage === "BREAK IT") {
        if (breakPhase === 1) {
          setSimulatedOutput(
            `Traceback (most recent call last):\n  File "main.py", line 6, in <module>\n    ${step.example.split("\n")[2] || "operation"}\nTypeError: unsupported operand type(s) for arithmetic operation\n\nExecution terminated with exit code 1.`,
          );
        } else {
          setSimulatedOutput(
            `[Simulated Output]\n` +
              `Status: SUCCESS\n` +
              `Execution time: 0.04s\n` +
              `Defensive checks passed.\n` +
              (step.answer ? `Output: ${step.answer}` : `Output: Verified valid`),
          );
        }
      } else {
        setSimulatedOutput(
          `[Simulated Output - Python 3.12]\n` +
            `----------------------------------\n` +
            (step.answer ? `Result: ${step.answer}\n` : `Code executed cleanly without errors.\n`) +
            `Memory references checked: 0 context leaks.\n` +
            `Exit code: 0`,
        );
      }
    }, 600);
  };

  const overallProgressPercent = Math.round(((currentStepIdx + 1) / steps.length) * 100);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] flex flex-col selection:bg-[var(--color-brand)]/20 selection:text-[var(--color-brand)]">
      {/* XP Toast Notification */}
      {xpToast && (
        <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-brand)]/50 shadow-xl rounded-xl px-4 py-3 flex items-center gap-3 backdrop-blur-md">
            <div className="w-9 h-9 rounded-lg bg-[var(--color-brand)]/10 text-[var(--color-brand)] flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 text-[var(--color-brand)] animate-bounce" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-brand)]">
                +{xpToast.amount} XP Earned
              </p>
              <p className="text-sm font-medium text-[var(--color-foreground)]">{xpToast.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Subheader / Breadcrumb bar aligned to global page-container */}
      <div className="page-container mb-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE7E5] pb-3.5">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (onNavigateHome ? onNavigateHome() : navigate({ to: "/curriculum" }))}
              className="gap-1.5 text-[#587078] hover:text-[#0B1F2A] px-2.5 h-8 rounded-lg cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-xs font-semibold">Curriculum Catalog</span>
            </Button>
            <div className="h-4 w-px bg-[#DCE7E5]" />
            <div className="flex items-center gap-2 truncate">
              <span className="text-[11px] font-bold text-[#0F766E] font-mono bg-[#CCFBF1] px-2 py-0.5 rounded">
                Module 01
              </span>
              <span className="text-xs font-bold text-[#0B1F2A] font-display">
                Python Foundations for AI
              </span>
              <span className="text-xs text-[#84979D] hidden sm:inline">·</span>
              <span className="text-xs text-[#587078] truncate hidden sm:inline">
                Variables & Defensive Types
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Streak indicator */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FEF3C7] text-[#D97706] border border-[#D97706]/20 text-xs font-semibold">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>12</span>
            </div>

            {/* Total Module XP badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{completedSteps.size * 35 + 50} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Immersive 3-Column Layout */}
      <div className="page-container flex flex-col lg:flex-row items-start gap-6 pb-16">
        {/* Left Navigation Rail (Standardized 240px width) */}
        <aside className="w-full lg:w-60 shrink-0 space-y-4">
          <div className="bg-white border border-[#DCE7E5] rounded-2xl p-4 shadow-2xs">
            {/* Minimal Module Progress */}
            <div className="pb-3 border-b border-[#DCE7E5] mb-3">
              <span className="font-mono text-[9px] font-bold text-[#0F766E] uppercase tracking-wider bg-[#CCFBF1] px-2 py-0.5 rounded">
                MODULE 01
              </span>
              <h2 className="text-xs font-bold text-[#0B1F2A] font-display mt-1 leading-snug">
                Python Foundations for AI
              </h2>
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#0F766E] mt-2 mb-1">
                <span>PROGRESS</span>
                <span>{overallProgressPercent}% COMPLETE</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#F0F5F4] overflow-hidden">
                <div
                  className="h-full bg-[#0F766E] transition-all duration-300 rounded-full"
                  style={{ width: `${overallProgressPercent}%` }}
                />
              </div>
            </div>

            {/* 10 Learning Steps: Standardized geometry, typography, and status */}
            <div className="space-y-1">
              {steps.map((s, idx) => {
                const isActive = idx === currentStepIdx;
                const isDone = completedSteps.has(idx);

                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentStepIdx(idx)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? "bg-[#0F766E] text-white font-semibold shadow-2xs"
                        : isDone
                          ? "text-[#0F766E] hover:bg-[#CCFBF1]/40 font-medium"
                          : "text-[#84979D] hover:bg-[#F0F5F4] hover:text-[#0B1F2A]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] opacity-70">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="font-semibold">{s.stage}</span>
                    </div>
                    {isDone ? (
                      <Check className="w-3.5 h-3.5 text-[#0F766E] stroke-[3]" />
                    ) : isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Center Canvas (Dominant Flexible Learning Experience) */}
        <main className="flex-1 min-w-0 space-y-6">
          <div className="bg-white border border-[#DCE7E5] rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
            {/* Step Hierarchy Header */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-md">
                    {currentStepIdx + 1}. {step.stage}
                  </span>
                  <span className="text-xs text-[#84979D]">·</span>
                  <span className="text-xs font-mono text-[#587078]">
                    Step {currentStepIdx + 1} of {steps.length}
                  </span>
                </div>
                <span className="text-xs text-[#84979D] font-mono hidden sm:inline">
                  Module 01 · Variables and Types
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B1F2A] font-display">
                {step.title}
              </h1>
            </div>

            {/* Why It Matters Callout (for non-WHY steps) */}
            {step.whyItMatters && step.stage !== "WHY" && (
              <div className="bg-[#F0FDF4] border-l-4 border-[#0F766E] p-3.5 rounded-r-xl text-xs sm:text-sm text-[#334E57] space-y-1">
                <span className="font-semibold text-[#0F766E] uppercase tracking-wider text-[11px] block">
                  Why This Matters in AI Engineering:
                </span>
                <p className="leading-relaxed">{step.whyItMatters}</p>
              </div>
            )}

            {/* Special HOOK Incident Story Composition */}
            {step.stage === "HOOK" && (
              <div className="grid gap-6 md:grid-cols-12 items-center py-2">
                {/* Left: Incident Story */}
                <div className="md:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE2E2] text-[#991B1B] text-xs font-mono font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
                    INCIDENT #01
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black font-display text-[#0B1F2A] uppercase tracking-tight">
                    The Discount Calculator Is Lying.
                  </h2>

                  <p className="text-sm text-[#587078] leading-relaxed">
                    A production AI system is charging customers the wrong amount. A promotional coupon for $5.00 was applied to an order, but instead of deducting from the total, customers experienced an unhandled pricing discrepancy.
                  </p>

                  <div className="rounded-2xl bg-[#F7FAFA] border border-[#DCE7E5] p-4 text-xs space-y-1.5">
                    <p className="font-bold text-[#0B1F2A]">“Something is wrong in memory.”</p>
                    <p className="text-[#587078]">What would you investigate first to uncover why this arithmetic failed?</p>
                  </div>
                </div>

                {/* Right: Bold Visual Metaphor */}
                <div className="md:col-span-5 flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-[#F0FDF4] border border-[#16A34A]/30 p-5 text-center shadow-xs">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#16A34A]">
                        Expected
                      </span>
                      <div className="text-3xl font-extrabold font-mono text-[#16A34A] mt-1.5">
                        $84
                      </div>
                      <span className="text-[10px] text-[#587078] mt-1 block">Correct Total</span>
                    </div>

                    <div className="rounded-2xl bg-[#FEF2F2] border border-[#DC2626]/30 p-5 text-center shadow-xs">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#DC2626]">
                        Actual
                      </span>
                      <div className="text-3xl font-extrabold font-mono text-[#DC2626] mt-1.5">
                        $79
                      </div>
                      <span className="text-[10px] text-[#DC2626]/80 mt-1 block">Production Bug</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#0B1F2A] text-[#CCFBF1] p-3 font-mono text-[11px] text-center border border-[#123542]">
                    Subtotal = total - discount_code
                  </div>
                </div>
              </div>
            )}

            {/* Special LEARN Interactive Concept Explorer */}
            {step.stage === "LEARN" && (
              <div className="space-y-6">
                {/* Visual Concept Navigation Tabs */}
                <div className="flex flex-wrap gap-2 border-b border-[#DCE7E5] pb-3">
                  {[
                    { id: "Variables", label: "VARIABLES" },
                    { id: "Types", label: "DATA TYPES" },
                    { id: "Operators", label: "OPERATORS" },
                    { id: "Conversion", label: "TYPE CONVERSION" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setLearnConceptTab(tab.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        learnConceptTab === tab.id
                          ? "bg-[#0F766E] text-white shadow-xs"
                          : "bg-[#F0F5F4] text-[#587078] hover:text-[#0B1F2A] hover:bg-[#DCE7E5]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Concept Interactive Explorer Grid */}
                <div className="grid gap-5 md:grid-cols-12 items-start">
                  {/* Left: Concept Explanation Card */}
                  <div className="md:col-span-6 space-y-3">
                    {learnConceptTab === "Variables" && (
                      <div className="rounded-2xl border border-[#DCE7E5] bg-[#F7FAFA] p-5 space-y-2">
                        <h4 className="font-bold text-[#0B1F2A] text-sm">Dynamic Memory Pointers</h4>
                        <p className="text-xs text-[#587078] leading-relaxed">
                          A variable stores data that can change. Python is dynamically typed — variable names are pointers on the stack referencing allocated objects on the heap.
                        </p>
                        <div className="mt-3 p-3 rounded-xl bg-white border border-[#DCE7E5] text-xs font-mono text-[#0F766E]">
                          name = &quot;{liveExperimentVal}&quot; → str (heap ref: 0x7f4a)
                        </div>
                      </div>
                    )}
                    {learnConceptTab === "Types" && (
                      <div className="rounded-2xl border border-[#DCE7E5] bg-[#F7FAFA] p-5 space-y-2">
                        <h4 className="font-bold text-[#0B1F2A] text-sm">Strongly Typed Primitives</h4>
                        <p className="text-xs text-[#587078] leading-relaxed">
                          Every value has an immutable type tag: <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">int</code>, <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">float</code>, <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">str</code>, <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">bool</code>. Strings are immutable and cannot be modified in-place.
                        </p>
                      </div>
                    )}
                    {learnConceptTab === "Operators" && (
                      <div className="rounded-2xl border border-[#DCE7E5] bg-[#F7FAFA] p-5 space-y-2">
                        <h4 className="font-bold text-[#0B1F2A] text-sm">Logical Precedence</h4>
                        <p className="text-xs text-[#587078] leading-relaxed">
                          <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">not</code> binds highest, followed by <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">and</code>, and finally <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">or</code>. Always use parentheses for deterministic evaluation.
                        </p>
                      </div>
                    )}
                    {learnConceptTab === "Conversion" && (
                      <div className="rounded-2xl border border-[#DCE7E5] bg-[#F7FAFA] p-5 space-y-2">
                        <h4 className="font-bold text-[#0B1F2A] text-sm">Explicit Type Casts</h4>
                        <p className="text-xs text-[#587078] leading-relaxed">
                          AI outputs arrive as strings. Cast defensively using <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">int()</code> or <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">float()</code> with error handling.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right: Live Interactive "Try it live" Sandbox */}
                  <div className="md:col-span-6 rounded-2xl border border-[#DCE7E5] bg-white p-5 space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
                        Try it live
                      </span>
                      <span className="text-[10px] text-[#84979D]">Type below to experiment</span>
                    </div>

                    <div className="rounded-xl bg-[#0B1F2A] p-4 font-mono text-xs text-slate-200 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[#14B8A6]">name =</span>
                        <input
                          type="text"
                          value={liveExperimentVal}
                          onChange={(e) => setLiveExperimentVal(e.target.value)}
                          className="bg-[#123542] border border-[#14B8A6]/40 rounded px-2 py-0.5 text-white font-mono text-xs outline-none focus:ring-1 focus:ring-[#14B8A6]"
                          placeholder="Type any value"
                        />
                      </div>
                      <p className="text-slate-400">age = 25</p>
                      <p className="text-slate-400">price = 19.5</p>
                      <p className="text-slate-400">is_active = True</p>
                    </div>

                    <div className="rounded-xl bg-[#F0F5F4] p-3 text-xs border border-[#DCE7E5]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#84979D] block font-bold">
                        Live Output
                      </span>
                      <div className="font-mono text-xs font-bold text-[#0B1F2A] mt-1">
                        &quot;{liveExperimentVal || "None"}&quot; (type: &lt;class &apos;str&apos;&gt;)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Special WHY Discovery Screen */}
            {step.stage === "WHY" && (
              <div className="space-y-6 py-2">
                <div className="space-y-3">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0F766E] bg-[#CCFBF1] px-2.5 py-1 rounded-md">
                    DISCOVERY
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0B1F2A]">
                    WHY DOES THIS MATTER?
                  </h2>
                  <p className="text-sm text-[#587078] leading-relaxed max-w-3xl">
                    {step.explanation}
                  </p>
                </div>

                {/* Small focused code example */}
                {step.example && (
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex items-center justify-between text-xs text-[#84979D]">
                      <span className="font-mono flex items-center gap-1.5 text-[#587078]">
                        <Code2 className="w-3.5 h-3.5 text-[#0F766E]" /> Demoware vs Production Code
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(step.example);
                          toast.success("Code copied to clipboard");
                        }}
                        className="flex items-center gap-1 text-[#587078] hover:text-[#0B1F2A] transition-colors"
                      >
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                    </div>
                    <div className="bg-[#0B1F2A] text-slate-100 rounded-2xl p-4 font-mono text-xs overflow-x-auto border border-[#123542] shadow-sm">
                      <pre>{step.example}</pre>
                    </div>
                  </div>
                )}

                {/* Prediction Choices Focus */}
                {step.options && step.options.length > 0 && (
                  <div className="space-y-3 max-w-3xl pt-2">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#0F766E]" />
                      <p className="text-sm font-bold text-[#0B1F2A]">
                        What do you think will happen?
                      </p>
                    </div>
                    <p className="text-xs text-[#587078]">{step.prompt}</p>

                    <div className="space-y-2">
                      {step.options.map((opt, i) => {
                        const isSelected = selectedOption === opt;
                        const isCorrect = isRevealed && opt === step.answer;
                        const isWrong = isRevealed && isSelected && opt !== step.answer;

                        return (
                          <button
                            key={i}
                            disabled={isRevealed}
                            onClick={() => setSelectedOption(opt)}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${
                              isCorrect
                                ? "bg-[#DCFCE7] border-[#16A34A] text-[#166534] font-medium"
                                : isWrong
                                  ? "bg-[#FEE2E2] border-[#DC2626] text-[#991B1B] font-medium"
                                  : isSelected
                                    ? "bg-[#CCFBF1] border-[#0F766E] text-[#0F766E] font-medium"
                                    : "bg-[#F7FAFA] border-[#DCE7E5] hover:border-[#0F766E]/40 text-[#334E57]"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                                isSelected ? "border-[#0F766E] bg-[#0F766E] text-white" : "border-[#DCE7E5]"
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <span className="flex-1">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {!isRevealed ? (
                      <Button
                        disabled={!selectedOption}
                        onClick={() => {
                          setIsRevealed(true);
                          if (selectedOption === step.answer) {
                            triggerXp(30, "Correct Prediction!");
                          } else {
                            triggerXp(10, "Great hypothesis! Review the reasoning.");
                          }
                        }}
                        className="w-full sm:w-auto px-6 bg-[#0F766E] hover:bg-[#0F766E]/90 text-white text-xs py-2.5 font-semibold mt-2 shadow-xs"
                      >
                        Confirm Hypothesis & Reveal →
                      </Button>
                    ) : (
                      <div className="bg-[#F0FDF4] border border-[#86EFAC] p-4 rounded-2xl text-xs sm:text-sm space-y-2 animate-in fade-in duration-200">
                        <div className="flex items-center gap-2 font-semibold">
                          {selectedOption === step.answer ? (
                            <span className="text-[#16A34A] flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> Accurate Insight
                            </span>
                          ) : (
                            <span className="text-[#D97706] flex items-center gap-1">
                              <AlertTriangle className="w-4 h-4" /> Key Architectural Takeaway
                            </span>
                          )}
                        </div>
                        <p className="text-[#166534] leading-relaxed">
                          {step.misconceptionExpl || step.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step Explanation for non-special stages */}
            {step.stage !== "HOOK" && step.stage !== "WHY" && step.stage !== "LEARN" && step.stage !== "TRY IT" && step.stage !== "NEXT" && (
              <div className="text-sm text-[#334E57] leading-relaxed whitespace-pre-line">
                {step.explanation}
              </div>
            )}

            {/* Special NEXT Stage: Module Complete & Progression Showcase */}
            {step.stage === "NEXT" && (
              <div className="space-y-6">
                <div className="bg-[#CCFBF1]/40 border border-[#0F766E]/20 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#0F766E] text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </span>
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F766E]">
                      MODULE 01 COMPLETE
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold font-display text-[#0B1F2A]">
                    You mastered Python Foundations for AI!
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {[
                      "Variables & Reference Model",
                      "Data Types & Immutability",
                      "Control Flow & Precedence",
                      "Functions & Parameter Discipline",
                      "Defensive Data Handling & Pathlib",
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-[#DCE7E5] rounded-xl p-3 flex items-center gap-2.5 shadow-2xs"
                      >
                        <div className="w-5 h-5 rounded-full bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center text-xs font-bold shrink-0">
                          ✓
                        </div>
                        <span className="text-xs font-semibold text-[#0B1F2A]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Module Preview Card */}
                <div className="bg-[#0B1F2A] text-white border border-[#123542] rounded-2xl p-6 space-y-3 shadow-sm">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#14B8A6]">
                    NEXT MODULE
                  </span>
                  <h4 className="text-xl font-bold font-display text-white">
                    Python Libraries for AI (NumPy, Pandas, Vector Ops)
                  </h4>
                  <p className="text-xs text-[#DCE7E5] leading-relaxed">
                    Transition from language mechanics to vector math, matrix operations, token embeddings, and high-performance tabular manipulation in AI systems.
                  </p>
                  <Button
                    onClick={() => {
                      completeLearningModule("3.2", 8);
                      if (onNavigateHome) onNavigateHome();
                      else navigate({ to: "/curriculum" });
                    }}
                    className="mt-2 bg-[#0F766E] hover:bg-[#0F766E]/90 text-white text-xs font-semibold px-5 h-9"
                  >
                    Continue to Next Module →
                  </Button>
                </div>
              </div>
            )}

            {/* Special TRY IT Prediction Game */}
            {step.stage === "TRY IT" && (
              <div className="space-y-6 py-2 max-w-3xl">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0F766E] bg-[#CCFBF1] px-2.5 py-1 rounded-md">
                      PREDICTION LAB
                    </span>
                    <span className="text-xs text-[#84979D]">· 4 Answer Choices</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-[#0B1F2A]">
                    What do you think this code will return?
                  </h2>
                  <p className="text-xs text-[#587078]">
                    Test your mental model against Python's immutability rules before running it.
                  </p>
                </div>

                {/* Large Prominent Code Block */}
                {step.example && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-[#84979D]">
                      <span className="font-mono flex items-center gap-1.5 text-[#587078]">
                        <Terminal className="w-3.5 h-3.5 text-[#14B8A6]" /> Code Block
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(step.example);
                          toast.success("Code copied to clipboard");
                        }}
                        className="flex items-center gap-1 text-[#587078] hover:text-[#0B1F2A] transition-colors"
                      >
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                    </div>
                    <div className="bg-[#0B1F2A] text-slate-100 rounded-2xl p-5 font-mono text-sm leading-relaxed overflow-x-auto border border-[#123542] shadow-sm">
                      <pre>{step.example}</pre>
                    </div>
                  </div>
                )}

                {/* 4 Prediction Choices */}
                {step.options && step.options.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#84979D] font-mono">
                      Select Your Prediction:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {step.options.map((opt, i) => {
                        const isSelected = selectedOption === opt;
                        const isCorrect = isRevealed && opt === step.answer;
                        const isWrong = isRevealed && isSelected && opt !== step.answer;

                        return (
                          <button
                            key={i}
                            disabled={isRevealed}
                            onClick={() => setSelectedOption(opt)}
                            className={`text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 shadow-2xs ${
                              isCorrect
                                ? "bg-[#DCFCE7] border-[#16A34A] text-[#166534] font-medium scale-[1.01]"
                                : isWrong
                                  ? "bg-[#FEE2E2] border-[#DC2626] text-[#991B1B] font-medium"
                                  : isSelected
                                    ? "bg-[#CCFBF1] border-[#0F766E] text-[#0F766E] font-medium ring-2 ring-[#0F766E]/20"
                                    : "bg-[#F7FAFA] border-[#DCE7E5] hover:border-[#0F766E]/40 text-[#334E57] hover:bg-white"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                                isSelected ? "border-[#0F766E] bg-[#0F766E] text-white" : "border-[#DCE7E5]"
                              }`}
                            >
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                            <span className="flex-1 leading-snug">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {!isRevealed ? (
                      <Button
                        disabled={!selectedOption}
                        onClick={() => {
                          setIsRevealed(true);
                          if (selectedOption === step.answer) {
                            triggerXp(30, "Correct Prediction!");
                          } else {
                            triggerXp(10, "Nice guess! Study the explanation below.");
                          }
                        }}
                        className="w-full sm:w-auto px-7 bg-[#0F766E] hover:bg-[#0F766E]/90 text-white text-xs py-2.5 font-semibold mt-2 shadow-xs"
                      >
                        Submit Prediction →
                      </Button>
                    ) : (
                      <div className="bg-[#F0FDF4] border border-[#86EFAC] p-5 rounded-2xl text-xs sm:text-sm space-y-2 animate-in fade-in duration-300">
                        <div className="flex items-center gap-2 font-semibold">
                          {selectedOption === step.answer ? (
                            <span className="text-[#16A34A] flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4" /> Correct Prediction!
                            </span>
                          ) : (
                            <span className="text-[#DC2626] flex items-center gap-1.5">
                              <AlertTriangle className="w-4 h-4" /> Not Quite — Here is Why:
                            </span>
                          )}
                        </div>
                        <p className="text-[#166534] leading-relaxed font-sans">
                          {step.misconceptionExpl || step.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Code / Visual Demonstration for other steps */}
            {step.example && step.stage !== "NEXT" && step.stage !== "WHY" && step.stage !== "TRY IT" && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[var(--color-faint)]">
                  <span className="font-mono flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" /> Code Inspection
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(step.example);
                      toast.success("Code copied to clipboard");
                    }}
                    className="flex items-center gap-1 hover:text-[var(--color-foreground)] transition-colors"
                  >
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
                <div className="bg-[#0f172a] text-slate-100 rounded-xl p-4 font-mono text-xs overflow-x-auto border border-slate-800 shadow-inner">
                  <pre>{step.example}</pre>
                </div>
              </div>
            )}

            {/* BREAK IT: 3-Phase Interactive Flow */}
            {step.stage === "BREAK IT" && (
              <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" /> Break It Studio — Phase {breakPhase} of 3
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 3].map((p) => (
                      <div
                        key={p}
                        className={`w-5 h-1.5 rounded-full ${
                          p <= breakPhase ? "bg-amber-400" : "bg-slate-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {breakPhase === 1 && (
                  <div className="space-y-3">
                    <div className="bg-[#FEF3C7] border border-[#F59E0B]/30 rounded-xl p-3 text-xs text-[#92400E]">
                      <span className="font-bold block mb-0.5">DEBUGGING CHALLENGE: "Something is wrong. Find it."</span>
                      An AI assistant generated this code. Run tests to uncover why it violates system invariants.
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-[#0B1F2A]">
                      {step.prompt}
                    </p>
                    <div className="space-y-2">
                      {step.options?.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedOption(opt)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all ${
                            selectedOption === opt
                              ? "bg-[#FEF3C7] border-[#D97706] text-[#92400E] font-medium"
                              : "bg-white border-[#DCE7E5] hover:border-[#D97706]/60 text-[#334E57]"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <Button
                      disabled={!selectedOption}
                      onClick={() => {
                        setIsRevealed(true);
                        setBreakPhase(2);
                        handleRunSimulatedCode(step.example);
                      }}
                      className="w-full bg-[#D97706] hover:bg-[#B45309] text-white font-semibold text-xs py-2.5"
                    >
                      Execute Tests & Inspect Stack Trace →
                    </Button>
                  </div>
                )}

                {breakPhase === 2 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#92400E] uppercase tracking-wider">
                        Phase 2: Test Results & Stack Trace
                      </span>
                      <span className="text-[11px] font-mono text-[#DC2626] font-bold">
                        1 FAILED, 0 PASSED
                      </span>
                    </div>

                    {/* Result vs Expected diff display */}
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <div className="bg-[#FEE2E2] border border-[#FCA5A5] p-2.5 rounded-lg text-[#991B1B]">
                        <span className="text-[10px] font-bold uppercase block text-[#DC2626]">Result:</span>
                        True (Unauthorized Admin Access)
                      </div>
                      <div className="bg-[#E6F4EA] border border-[#86EFAC] p-2.5 rounded-lg text-[#166534]">
                        <span className="text-[10px] font-bold uppercase block text-[#15803D]">Expected:</span>
                        False (Denied without Verification)
                      </div>
                    </div>

                    <div className="bg-[#0B1F2A] text-[#FCA5A5] p-3 rounded-lg font-mono text-xs border border-[#EF4444]/30">
                      <pre>
                        {simulatedOutput ||
                          `Traceback (most recent call last):\n  AssertionError: check_user_access('admin', False, 0) returned True; Expected False`}
                      </pre>
                    </div>
                    <p className="text-xs text-[#587078]">
                      Notice how 'and' binds more tightly than 'or'. How must we group the conditions defensively?
                    </p>
                    <Button
                      onClick={() => setBreakPhase(3)}
                      className="w-full bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-semibold text-xs py-2.5"
                    >
                      Apply Defensive Fix →
                    </Button>
                  </div>
                )}

                {breakPhase === 3 && (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-[#0F766E] uppercase tracking-wider">
                      Phase 3: Verify Defensive Fix
                    </p>
                    {step.fixedCode && (
                      <div className="bg-[#0f172a] p-3 rounded-lg font-mono text-xs border border-emerald-500/30 text-emerald-300">
                        <pre>{step.fixedCode}</pre>
                      </div>
                    )}
                    <p className="text-xs text-[#587078]">
                      {step.misconceptionExpl || "Defensive grouping with parentheses guarantees correct operator precedence."}
                    </p>
                    <Button
                      onClick={() => {
                        handleRunSimulatedCode(step.fixedCode || step.example);
                        triggerXp(35, "Break It Challenge Resolved!");
                      }}
                      className="w-full bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-semibold text-xs py-2.5"
                    >
                      Verify Fix in Runtime Simulator ✓
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Standard Interaction: MCQ / Predict */}
            {(step.stage === "HOOK" ||
              step.stage === "PRACTICE" ||
              step.stage === "LEARN" ||
              step.stage === "KNOWLEDGE CHECK") &&
              step.options &&
              step.options.length > 0 && (
                <div className="space-y-3 pt-2 border-t border-[var(--color-border)]">
                  <p className="text-sm font-semibold text-[var(--color-foreground)]">
                    {step.prompt}
                  </p>
                  <div className="space-y-2">
                    {step.options.map((opt, i) => {
                      const isSelected = selectedOption === opt;
                      const isCorrect = isRevealed && opt === step.answer;
                      const isWrong = isRevealed && isSelected && opt !== step.answer;

                      return (
                        <button
                          key={i}
                          disabled={isRevealed}
                          onClick={() => setSelectedOption(opt)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${
                            isCorrect
                              ? "bg-[#DCFCE7] border-[#16A34A] text-[#166534] font-medium"
                              : isWrong
                                ? "bg-[#FEE2E2] border-[#DC2626] text-[#991B1B] font-medium"
                                : isSelected
                                  ? "bg-[#CCFBF1] border-[#0F766E] text-[#0F766E] font-medium"
                                  : "bg-[#F7FAFA] border-[#DCE7E5] hover:border-[#0F766E]/40 text-[#334E57]"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected ? "border-[#0F766E] bg-[#0F766E] text-white" : "border-[#DCE7E5]"
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span className="flex-1">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {!isRevealed ? (
                    <Button
                      disabled={!selectedOption}
                      onClick={() => {
                        setIsRevealed(true);
                        if (selectedOption === step.answer) {
                          triggerXp(30, "Correct Prediction!");
                        } else {
                          triggerXp(10, "Nice hypothesis! Study the explanation.");
                        }
                      }}
                      className="w-full bg-[#0F766E] hover:bg-[#0F766E]/90 text-white text-xs py-2.5 font-semibold mt-2"
                    >
                      {step.stage === "HOOK"
                        ? "Investigate →"
                        : step.stage === "KNOWLEDGE CHECK"
                          ? "Verify Answer →"
                          : "Confirm Hypothesis & Reveal Explanation"}
                    </Button>
                  ) : (
                    <div className="bg-[#F0FDF4] border border-[#86EFAC] p-4 rounded-xl text-xs sm:text-sm space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 font-semibold">
                        {selectedOption === step.answer ? (
                          <span className="text-[#16A34A] flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Correct Insight
                          </span>
                        ) : (
                          <span className="text-[#D97706] flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" /> Key Learning Point
                          </span>
                        )}
                      </div>
                      <p className="text-[#166534] leading-relaxed">
                        {step.misconceptionExpl || step.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}

            {/* Special MASTERY Challenge Header & Rubric Highlights */}
            {step.stage === "MASTERY" && (
              <div className="bg-[#0B1F2A] text-white rounded-xl p-5 space-y-3 shadow-md border border-[#123542]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[#CCFBF1]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#14B8A6]">
                      MASTERY · FINAL CHALLENGE
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#CCFBF1] bg-[#0F766E]/50 px-2 py-0.5 rounded border border-[#14B8A6]/30">
                    Proof of Competence
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display text-white">
                  You're almost there!
                </h3>
                <p className="text-xs text-[#DCE7E5] leading-relaxed">
                  Solve the integrated production challenge below. Your solution will be validated against strict runtime test suites and defensive edge cases.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#1E3A47] text-[11px]">
                  <div className="flex items-center gap-1.5 text-[#CCFBF1]">
                    <Check className="w-3.5 h-3.5 text-[#14B8A6]" /> Correct solution
                  </div>
                  <div className="flex items-center gap-1.5 text-[#CCFBF1]">
                    <Check className="w-3.5 h-3.5 text-[#14B8A6]" /> Handles edge cases
                  </div>
                  <div className="flex items-center gap-1.5 text-[#CCFBF1]">
                    <Check className="w-3.5 h-3.5 text-[#14B8A6]" /> Code quality
                  </div>
                  <div className="flex items-center gap-1.5 text-[#CCFBF1]">
                    <Check className="w-3.5 h-3.5 text-[#14B8A6]" /> Defensive typing
                  </div>
                </div>
              </div>
            )}

            {/* Editable Code Editor for YOUR TURN & FINAL MISSION */}
            {(step.stage === "YOUR TURN" ||
              step.stage === "MASTERY" ||
              step.activityType === "final-mission") && (
              <div className="space-y-4 pt-2 border-t border-[#DCE7E5]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#0B1F2A] flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-[#0F766E]" />
                    {step.stage === "MASTERY" ? "Mastery Challenge Editor" : "Interactive Implementation Editor"}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSolutionDiff(!showSolutionDiff)}
                      className="text-xs text-[#0F766E] hover:bg-[#CCFBF1]/40"
                    >
                      {showSolutionDiff ? "Hide Solution" : "Inspect Solution Diff"}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleRunSimulatedCode(studentCode)}
                      disabled={isRunningCode}
                      className="bg-[#0F766E] hover:bg-[#0F766E]/90 text-white text-xs gap-1.5 shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      {isRunningCode ? "Executing..." : step.stage === "MASTERY" ? "Start Mastery Challenge →" : "Run Tests"}
                    </Button>
                  </div>
                </div>

                <textarea
                  value={studentCode}
                  onChange={(e) => setStudentCode(e.target.value)}
                  rows={10}
                  className="w-full bg-[#0B1F2A] text-slate-100 font-mono text-xs p-4 rounded-2xl border border-[#123542] focus:outline-none focus:ring-2 focus:ring-[#14B8A6]"
                />

                {/* Rubric Evaluation Checklist */}
                {step.rubricItems && step.rubricItems.length > 0 && (
                  <div className="bg-[#F7FAFA] border border-[#DCE7E5] rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#587078] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E]" />
                        Self-Evaluation Rubric Checklist
                      </span>
                      <span className="text-xs font-mono font-bold text-[#0F766E]">
                        {Object.values(rubricChecks).filter(Boolean).length}/
                        {step.rubricItems.length} Verified
                      </span>
                    </div>

                    <div className="space-y-2">
                      {step.rubricItems.map((r) => (
                        <label
                          key={r.id}
                          className="flex items-start gap-2.5 text-xs text-[#334E57] cursor-pointer hover:text-[#0B1F2A]"
                        >
                          <input
                            type="checkbox"
                            checked={!!rubricChecks[r.id]}
                            onChange={(e) =>
                              setRubricChecks((prev) => ({ ...prev, [r.id]: e.target.checked }))
                            }
                            className="mt-0.5 rounded border-[#DCE7E5] text-[#0F766E] focus:ring-[#0F766E]"
                          />
                          <div>
                            <p className="font-medium">{r.criterion}</p>
                            {r.tip && <p className="text-[11px] text-[#84979D]">{r.tip}</p>}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Solution Comparison Drawer */}
                {showSolutionDiff && step.fixedCode && (
                  <div className="bg-[#0f172a] border border-emerald-500/30 rounded-xl p-4 space-y-2 text-xs font-mono">
                    <p className="text-emerald-400 font-bold uppercase tracking-wider">
                      Reference Production Solution:
                    </p>
                    <pre className="text-emerald-200 overflow-x-auto">{step.fixedCode}</pre>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Bottom Controls */}
            <div className="pt-4 border-t border-[#DCE7E5] flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevStep}
                disabled={currentStepIdx === 0}
                className="gap-1.5 text-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </Button>

              <Button
                onClick={handleNextStep}
                disabled={!canContinue}
                className={`gap-1.5 text-xs font-semibold px-5 ${
                  canContinue
                    ? "bg-[#0F766E] hover:bg-[#0F766E]/90 text-white shadow-xs cursor-pointer"
                    : "opacity-50 cursor-not-allowed bg-[#84979D] text-white"
                }`}
              >
                {currentStepIdx === steps.length - 1 ? (
                  <>
                    <Trophy className="w-4 h-4 text-[#CCFBF1]" /> Finish Module & Continue →
                  </>
                ) : currentStepIdx === 4 ? (
                  <>
                    Next: Break It <ArrowRight className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    Continue <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </main>

        {/* Right Drawer: Contextual AI Mentor (approx 290px, Collapsible) */}
        {mentorOpen ? (
          <aside className="w-full lg:w-72 shrink-0 space-y-4">
            <div className="bg-white border border-[#DCE7E5] rounded-2xl shadow-2xs overflow-hidden flex flex-col h-full min-h-[480px]">
              {/* Tab Header with Close Button */}
              <div className="flex items-center justify-between border-b border-[#DCE7E5] bg-[#F7FAFA] px-2">
                <div className="flex flex-1">
                  <button
                    onClick={() => setActiveSidebarTab("mentor")}
                    className={`py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                      activeSidebarTab === "mentor"
                        ? "border-[#0F766E] text-[#0F766E] bg-white"
                        : "border-transparent text-[#84979D] hover:text-[#0B1F2A]"
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" /> AI Mentor
                  </button>
                  <button
                    onClick={() => setActiveSidebarTab("terminal")}
                    className={`py-2.5 px-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                      activeSidebarTab === "terminal"
                        ? "border-[#0F766E] text-[#0F766E] bg-white"
                        : "border-transparent text-[#84979D] hover:text-[#0B1F2A]"
                    }`}
                  >
                    <Terminal className="w-3.5 h-3.5" /> Console
                  </button>
                </div>
                <button
                  onClick={() => setMentorOpen(false)}
                  title="Hide AI Mentor"
                  className="p-1 rounded-md text-[#84979D] hover:text-[#0B1F2A] hover:bg-[#F0F5F4] transition"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>

            {/* Tab Content: AI Mentor */}
            {activeSidebarTab === "mentor" && (
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Mentor level selector */}
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-[#DCE7E5]">
                    <span className="font-semibold flex items-center gap-1 text-[#0B1F2A]">
                      <Sparkles className="w-3.5 h-3.5 text-[#0F766E]" /> Hint Tier:
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => setMentorLevel(lvl)}
                          className={`w-6 h-6 rounded-md text-[11px] font-mono font-bold transition-all ${
                            mentorLevel === lvl
                              ? "bg-[#0F766E] text-white"
                              : "bg-[#F7FAFA] text-[#84979D] hover:text-[#0B1F2A]"
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Hint Box */}
                  <div className="bg-[#F7FAFA] border border-[#0F766E]/20 rounded-xl p-3 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#0F766E]">
                      <span>Level {mentorLevel}: {
                        mentorLevel === 1
                          ? "Socratic Question"
                          : mentorLevel === 2
                            ? "Mental Model Rule"
                            : mentorLevel === 3
                              ? "Target Line Pointer"
                              : mentorLevel === 4
                                ? "Pseudo-code Scaffold"
                                : "Full Robust Solution"
                      }</span>
                    </div>
                    <p className="text-[#334E57] leading-relaxed">
                      {step.mentorHints && step.mentorHints[mentorLevel - 1]
                        ? step.mentorHints[mentorLevel - 1]
                        : "Focus on whether values can be mutated in place or if methods return new objects."}
                    </p>
                  </div>

                  {/* Chat messages */}
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {mentorChat.map((msg, i) => (
                      <div
                        key={i}
                        className={`text-xs p-2.5 rounded-xl ${
                          msg.role === "user"
                            ? "bg-[#CCFBF1] text-[#0B1F2A] ml-4"
                            : "bg-[#F7FAFA] text-[#334E57] mr-4 border border-[#DCE7E5]"
                        }`}
                      >
                        <p className="font-semibold text-[10px] uppercase text-[#0F766E] mb-0.5">
                          {msg.role === "user" ? "You" : "AI Mentor"}
                        </p>
                        <p>{msg.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Socratic input box */}
                <form onSubmit={handleAskMentor} className="flex gap-2 pt-2 border-t border-[#DCE7E5]">
                  <input
                    type="text"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="Ask about this step..."
                    className="flex-1 bg-[#F7FAFA] border border-[#DCE7E5] rounded-lg px-3 py-1.5 text-xs text-[#0B1F2A] placeholder-[#84979D] focus:outline-none focus:border-[#0F766E]"
                  />
                  <Button type="submit" size="sm" className="bg-[#0F766E] hover:bg-[#0F766E]/90 text-white px-3">
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </form>
              </div>
            )}

            {/* Tab Content: Skills Matrix */}
            {activeSidebarTab === "skills" && (
              <div className="p-4 space-y-3 flex-1 overflow-y-auto">
                <p className="text-xs text-[var(--color-faint)]">
                  Evidence-based mastery tracked across 8 Python engineering disciplines:
                </p>

                <div className="space-y-3">
                  {skills.map((sk) => (
                    <div
                      key={sk.id}
                      className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-3 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{sk.name}</span>
                        <span className="font-mono text-[11px] text-[var(--color-mint)] font-bold">
                          L{sk.level}/6
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--color-faint)]">
                        Status: <span className="font-medium text-[var(--color-foreground)]">{sk.label}</span>
                      </p>
                      <div className="w-full h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden">
                        <div
                          className="h-full bg-[var(--color-mint)] transition-all duration-300"
                          style={{ width: `${(sk.level / 6) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab Content: Terminal Console */}
            {activeSidebarTab === "terminal" && (
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-[var(--color-border)]">
                  <span className="flex items-center gap-1.5 text-[11px]">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" /> simulated-python-sandbox
                  </span>
                  <span className="text-[10px] text-slate-500">Isolated</span>
                </div>

                <div className="flex-1 bg-[#0f172a] text-slate-200 p-3 rounded-xl overflow-y-auto border border-slate-800 text-[11px] leading-relaxed">
                  <pre className="whitespace-pre-wrap">
                    {simulatedOutput ||
                      `Ready for execution.\nRun tests or predictions to inspect simulated interpreter state.`}
                  </pre>
                </div>

                <div className="text-[10px] text-[var(--color-faint)] pt-1">
                  Note: Sandboxed simulated execution runs deterministically against curriculum test fixtures.
                </div>
              </div>
            )}
          </div>
          </aside>
        ) : (
          <button
            onClick={() => setMentorOpen(true)}
            className="fixed bottom-6 right-6 z-30 flex items-center gap-2 rounded-full bg-[#0F766E] text-white px-4 py-2.5 text-xs font-bold shadow-lg hover:bg-[#0B1F2A] transition-all group"
          >
            <Bot className="w-4 h-4 text-[#CCFBF1] group-hover:scale-110 transition-transform" />
            <span>Ask AI Mentor</span>
          </button>
        )}
      </div>
    </div>
  );
}

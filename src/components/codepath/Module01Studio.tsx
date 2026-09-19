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

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-[#DCE7E5] bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => (onNavigateHome ? onNavigateHome() : navigate({ to: "/curriculum" }))}
              className="gap-1.5 text-[#587078] hover:text-[#0B1F2A] px-2 h-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-medium">Curriculum</span>
            </Button>
            <div className="h-4 w-px bg-[#DCE7E5]" />
            <div className="flex items-center gap-2 truncate">
              <span className="text-xs font-bold text-[#0B1F2A] font-display">
                Python Foundations for AI
              </span>
              <span className="text-xs text-[#84979D]">·</span>
              <span className="text-xs text-[#587078] truncate">
                Module 01 · Variables and Types
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

            {/* Student Avatar */}
            <div className="w-7 h-7 rounded-full bg-[#0B1F2A] text-white flex items-center justify-center text-xs font-bold font-mono">
              RK
            </div>
          </div>
        </div>
      </header>

      {/* Main Studio Grid */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Navigation Rail (3 columns) */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-white border border-[#DCE7E5] rounded-2xl p-4 shadow-sm">
            {/* Sidebar Top: Module Title & Progress */}
            <div className="pb-3 border-b border-[#DCE7E5] mb-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-[#0F766E] uppercase tracking-wider bg-[#CCFBF1] px-2 py-0.5 rounded">
                  Module 01
                </span>
                <span className="text-[11px] font-mono font-bold text-[#0F766E]">
                  {overallProgressPercent}%
                </span>
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#0B1F2A] font-display leading-tight">
                  Python Foundations for AI
                </h2>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-[#84979D]">
                  <Clock className="w-3 h-3" />
                  <span>Est. 8–12 hours · Step {currentStepIdx + 1} of {steps.length}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-[#F0F5F4] overflow-hidden">
                <div
                  className="h-full bg-[#0F766E] transition-all duration-300 rounded-full"
                  style={{ width: `${overallProgressPercent}%` }}
                />
              </div>
            </div>

            {/* Vertical Steps Rail: Exactly matching the reference style */}
            <div className="space-y-1 max-h-[calc(100vh-320px)] overflow-y-auto pr-1 no-scrollbar">
              {steps.map((s, idx) => {
                const isActive = idx === currentStepIdx;
                const isDone = completedSteps.has(idx);

                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentStepIdx(idx)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-center gap-2.5 ${
                      isActive
                        ? "bg-[#0F766E] text-white font-semibold shadow-sm"
                        : isDone
                          ? "bg-[#CCFBF1]/50 text-[#0F766E] hover:bg-[#CCFBF1]"
                          : "text-[#84979D] hover:bg-[#F0F5F4] hover:text-[#0B1F2A]"
                    }`}
                  >
                    {/* Status icon: ✓ for completed, ● for current, ○ for upcoming */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                        isActive
                          ? "bg-white text-[#0F766E]"
                          : isDone
                            ? "bg-[#0F766E] text-white"
                            : "border border-[#DCE7E5] text-[#84979D]"
                      }`}
                    >
                      {isDone ? (
                        <Check className="w-3 h-3 stroke-[3]" />
                      ) : isActive ? (
                        <span className="w-2 h-2 rounded-full bg-[#0F766E]" />
                      ) : (
                        <span className="text-[9px]">{idx + 1}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wide truncate">
                          {s.stage}
                        </span>
                        {isDone && (
                          <span className={`text-[9px] font-mono ${isActive ? "text-white/80" : "text-[#0F766E]"}`}>
                            ✓
                          </span>
                        )}
                      </div>
                      <p className={`text-[11px] truncate ${isActive ? "text-white/90" : isDone ? "text-[#587078]" : "text-[#84979D]"}`}>
                        {s.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Skill Mastery Progress */}
          <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-[var(--color-mint)]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-faint)]">
                Module Skills (8)
              </h3>
            </div>
            <div className="space-y-2">
              {skills.slice(0, 4).map((sk) => (
                <div key={sk.id} className="text-xs">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="truncate font-medium">{sk.name}</span>
                    <span className="font-mono text-[var(--color-brand)]">
                      L{sk.level}/6
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--color-border)] overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-mint)] transition-all duration-300"
                      style={{ width: `${(sk.level / 6) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveSidebarTab("skills")}
              className="w-full mt-3 text-xs text-[var(--color-brand)] justify-center"
            >
              View Full Skill Matrix →
            </Button>
          </div>
        </aside>

        {/* Center Canvas (6 columns) */}
        <main className="lg:col-span-6 space-y-6">
          {/* Active Step Card */}
          <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl p-6 shadow-sm space-y-6">
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

            {/* Why It Matters Callout */}
            {step.whyItMatters && (
              <div className="bg-[var(--color-surface)] border-l-4 border-[var(--color-brand)] p-3.5 rounded-r-xl text-xs sm:text-sm text-[var(--color-faint)] space-y-1">
                <span className="font-semibold text-[var(--color-brand)] uppercase tracking-wider text-[11px] block">
                  Why This Matters in AI Engineering:
                </span>
                <p>{step.whyItMatters}</p>
              </div>
            )}

            {/* Special HOOK Incident Report Scenario Block */}
            {step.stage === "HOOK" && (
              <div className="bg-[#FEF2F2] border border-[#FCA5A5]/60 rounded-xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#FCA5A5]/40 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#991B1B]">
                      INCIDENT REPORT #101 · PRODUCTION SEVERITY 1
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#991B1B]/80 font-semibold bg-[#FEE2E2] px-2 py-0.5 rounded">
                    E-Commerce Discount Calculator
                  </span>
                </div>

                <div className="text-sm font-semibold text-[#7F1D1D]">
                  Customers are being charged the wrong amount.
                </div>

                {/* Expected vs Actual Comparison Cards */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white border border-[#DCE7E5] rounded-xl p-3 sm:p-4 text-center shadow-xs">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#587078] font-semibold">
                      Expected
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0F766E] mt-1">
                      $84.00
                    </div>
                    <div className="text-[11px] text-[#84979D] mt-0.5">Correct Subtotal</div>
                  </div>

                  <div className="bg-[#FEE2E2]/60 border border-[#F87171]/40 rounded-xl p-3 sm:p-4 text-center shadow-xs">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#991B1B] font-semibold">
                      Actual Charged
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold font-mono text-[#DC2626] mt-1">
                      $79.00
                    </div>
                    <div className="text-[11px] text-[#DC2626]/80 mt-0.5">Silent Bug Detected</div>
                  </div>
                </div>

                <p className="text-xs text-[#991B1B] leading-relaxed">
                  In production AI services, untyped discount API payloads silently inject string values into arithmetic logic, causing catastrophic financial errors or unhandled system crashes.
                </p>
              </div>
            )}

            {/* Special LEARN Interactive Concept Cards & Tabs */}
            {step.stage === "LEARN" && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 border-b border-[#DCE7E5] pb-2">
                  {[
                    { id: "Variables", label: "Variables & Memory" },
                    { id: "Types", label: "Data Types & Immutability" },
                    { id: "Operators", label: "Operators & Precedence" },
                    { id: "Conversion", label: "Type Conversion" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setLearnConceptTab(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        learnConceptTab === tab.id
                          ? "bg-[#0F766E] text-white shadow-xs"
                          : "bg-[#F0F5F4] text-[#587078] hover:text-[#0B1F2A] hover:bg-[#DCE7E5]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Concept tab card content */}
                <div className="bg-[#F7FAFA] border border-[#DCE7E5] rounded-xl p-4 text-xs space-y-2">
                  {learnConceptTab === "Variables" && (
                    <div>
                      <h4 className="font-bold text-[#0B1F2A] text-sm mb-1">Name Tags, Not Storage Boxes</h4>
                      <p className="text-[#587078] leading-relaxed">
                        In Python, a variable does not contain the object directly. Instead, it is an immutable reference pointing to an object residing on the private heap. Assigning <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">b = a</code> merely attaches a second name tag to the identical object!
                      </p>
                    </div>
                  )}
                  {learnConceptTab === "Types" && (
                    <div>
                      <h4 className="font-bold text-[#0B1F2A] text-sm mb-1">Strong, Dynamic Typing</h4>
                      <p className="text-[#587078] leading-relaxed">
                        Every value in Python has an immutable type tag (<code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">int</code>, <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">float</code>, <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">str</code>, <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">bool</code>). String methods like <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">replace()</code> never alter strings in-place — they allocate and return brand new strings.
                      </p>
                    </div>
                  )}
                  {learnConceptTab === "Operators" && (
                    <div>
                      <h4 className="font-bold text-[#0B1F2A] text-sm mb-1">Strict Operator Hierarchy</h4>
                      <p className="text-[#587078] leading-relaxed">
                        In Python boolean logic, <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">not</code> evaluates first, then <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">and</code>, and finally <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">or</code>. Always group security and authorization expressions in explicit parentheses.
                      </p>
                    </div>
                  )}
                  {learnConceptTab === "Conversion" && (
                    <div>
                      <h4 className="font-bold text-[#0B1F2A] text-sm mb-1">Defensive Parsing</h4>
                      <p className="text-[#587078] leading-relaxed">
                        Incoming LLM generations, JSON payloads, and CLI arguments are string buffers. You must wrap type casts (<code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">int()</code>, <code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">float()</code>) in defensive exception blocks (<code className="bg-[#E6F0EE] px-1 py-0.5 rounded text-[#0F766E]">try/except ValueError</code>).
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step Explanation */}
            <div className="text-sm text-[var(--color-foreground)]/90 leading-relaxed whitespace-pre-line">
              {step.explanation}
            </div>

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

            {/* Code / Visual Demonstration */}
            {step.example && step.stage !== "NEXT" && (
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
              step.stage === "TRY IT" ||
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
                              ? "bg-emerald-500/15 border-emerald-500 text-emerald-300 font-medium"
                              : isWrong
                                ? "bg-red-500/15 border-red-500 text-red-300 font-medium"
                                : isSelected
                                  ? "bg-[var(--color-brand)]/15 border-[var(--color-brand)] text-[var(--color-foreground)] font-medium"
                                  : "bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-brand)]/40"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                              isSelected ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-white" : "border-[var(--color-border)]"
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
                        : step.stage === "WHY"
                          ? "Run & See →"
                          : step.stage === "TRY IT"
                            ? "Submit Answer →"
                            : step.stage === "KNOWLEDGE CHECK"
                              ? "Verify Answer →"
                              : "Confirm Hypothesis & Reveal Explanation"}
                    </Button>
                  ) : (
                    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-4 rounded-xl text-xs sm:text-sm space-y-2 animate-in fade-in duration-200">
                      <div className="flex items-center gap-2 font-semibold">
                        {selectedOption === step.answer ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Correct Insight
                          </span>
                        ) : (
                          <span className="text-amber-400 flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4" /> Key Learning Point
                          </span>
                        )}
                      </div>
                      <p className="text-[var(--color-faint)] leading-relaxed">
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
              <div className="space-y-4 pt-2 border-t border-[var(--color-border)]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[var(--color-foreground)] flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-[var(--color-brand)]" />
                    {step.stage === "MASTERY" ? "Mastery Challenge Editor" : "Interactive Implementation Editor"}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSolutionDiff(!showSolutionDiff)}
                      className="text-xs text-[var(--color-brand)]"
                    >
                      {showSolutionDiff ? "Hide Solution" : "Inspect Solution Diff"}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleRunSimulatedCode(studentCode)}
                      disabled={isRunningCode}
                      className="bg-[#0F766E] hover:bg-[#0F766E]/90 text-white text-xs gap-1.5"
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
                  className="w-full bg-[#0f172a] text-slate-100 font-mono text-xs p-4 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
                />

                {/* Rubric Evaluation Checklist */}
                {step.rubricItems && step.rubricItems.length > 0 && (
                  <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-faint)] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-brand)]" />
                        Self-Evaluation Rubric Checklist
                      </span>
                      <span className="text-xs font-mono text-[var(--color-brand)]">
                        {Object.values(rubricChecks).filter(Boolean).length}/
                        {step.rubricItems.length} Verified
                      </span>
                    </div>

                    <div className="space-y-2">
                      {step.rubricItems.map((r) => (
                        <label
                          key={r.id}
                          className="flex items-start gap-2.5 text-xs text-[var(--color-foreground)]/90 cursor-pointer hover:text-[var(--color-foreground)]"
                        >
                          <input
                            type="checkbox"
                            checked={!!rubricChecks[r.id]}
                            onChange={(e) =>
                              setRubricChecks((prev) => ({ ...prev, [r.id]: e.target.checked }))
                            }
                            className="mt-0.5 rounded border-[var(--color-border)] text-[var(--color-brand)] focus:ring-[var(--color-brand)]"
                          />
                          <div>
                            <p className="font-medium">{r.criterion}</p>
                            {r.tip && <p className="text-[11px] text-[var(--color-faint)]">{r.tip}</p>}
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
            <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
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

        {/* Right Drawer: AI Mentor, Skills & Terminal (3 columns) */}
        <aside className="lg:col-span-3 space-y-4">
          <div className="bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
            {/* Tab Header */}
            <div className="flex border-b border-[var(--color-border)] bg-[var(--color-surface)]">
              <button
                onClick={() => setActiveSidebarTab("mentor")}
                className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeSidebarTab === "mentor"
                    ? "border-[#0F766E] text-[#0F766E] bg-[var(--color-surface-elevated)]"
                    : "border-transparent text-[#84979D] hover:text-[#0B1F2A]"
                }`}
              >
                <Bot className="w-3.5 h-3.5" /> Mentor
              </button>
              <button
                onClick={() => setActiveSidebarTab("skills")}
                className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeSidebarTab === "skills"
                    ? "border-[#0F766E] text-[#0F766E] bg-[var(--color-surface-elevated)]"
                    : "border-transparent text-[#84979D] hover:text-[#0B1F2A]"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Skills
              </button>
              <button
                onClick={() => setActiveSidebarTab("terminal")}
                className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                  activeSidebarTab === "terminal"
                    ? "border-[#0F766E] text-[#0F766E] bg-[var(--color-surface-elevated)]"
                    : "border-transparent text-[#84979D] hover:text-[#0B1F2A]"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" /> Console
              </button>
            </div>

            {/* Tab Content: AI Mentor */}
            {activeSidebarTab === "mentor" && (
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  {/* Mentor level selector */}
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-[var(--color-border)]">
                    <span className="font-semibold flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[var(--color-brand)]" /> Hint Tier:
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <button
                          key={lvl}
                          onClick={() => setMentorLevel(lvl)}
                          className={`w-6 h-6 rounded-md text-[11px] font-mono font-bold transition-all ${
                            mentorLevel === lvl
                              ? "bg-[var(--color-brand)] text-white"
                              : "bg-[var(--color-surface)] text-[var(--color-faint)] hover:text-[var(--color-foreground)]"
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Active Hint Box */}
                  <div className="bg-[var(--color-surface)] border border-[var(--color-brand)]/30 rounded-xl p-3 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[var(--color-brand)]">
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
                    <p className="text-[var(--color-foreground)]/90 leading-relaxed">
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
                            ? "bg-[var(--color-brand)]/15 text-[var(--color-foreground)] ml-4"
                            : "bg-[var(--color-surface)] text-[var(--color-faint)] mr-4 border border-[var(--color-border)]"
                        }`}
                      >
                        <p className="font-semibold text-[10px] uppercase text-[var(--color-brand)] mb-0.5">
                          {msg.role === "user" ? "You" : "AI Mentor"}
                        </p>
                        <p>{msg.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Socratic input box */}
                <form onSubmit={handleAskMentor} className="flex gap-2 pt-2 border-t border-[var(--color-border)]">
                  <input
                    type="text"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    placeholder="Ask about this step..."
                    className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[var(--color-brand)]"
                  />
                  <Button type="submit" size="sm" className="bg-[var(--color-brand)] text-white px-3">
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
      </div>
    </div>
  );
}

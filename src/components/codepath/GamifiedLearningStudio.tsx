import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  Bot,
  Brain,
  Check,
  CheckCircle2,
  ChevronRight,
  Code2,
  ExternalLink,
  Flame,
  HelpCircle,
  Laptop,
  Lightbulb,
  Lock,
  MapPin,
  Play,
  RefreshCw,
  RotateCcw,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  Trophy,
  User,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLearningExperience, type LearningStep } from "@/lib/learning-experiences";
import { curriculumModules, type CurriculumModule } from "@/lib/curriculum-data";
import {
  completeLearningModule,
  recordLearningEvidence,
  updateLearningPosition,
  useLearningProgress,
} from "@/lib/learning-progress";

// ── 1. PROGRESSION WORLDS SPECIFICATION (Curriculum As Adventure Map) ──
export interface ProgressionWorld {
  id: string;
  name: string;
  icon: string;
  tagline: string;
  moduleCodes: `3.${number}`[];
}

export const PROGRESSION_WORLDS: ProgressionWorld[] = [
  {
    id: "python-world",
    name: "Python World",
    icon: "🐍",
    tagline: "Foundational Syntax, Memory Model & Defensive Engineering",
    moduleCodes: ["3.2"],
  },
  {
    id: "ai-world",
    name: "AI World",
    icon: "🧠",
    tagline: "Foundation Models, Transformers & Attention Mechanics",
    moduleCodes: ["3.3"],
  },
  {
    id: "llm-world",
    name: "LLM World",
    icon: "⚡",
    tagline: "API Gateways, Prompt Invariants & Resilient Applications",
    moduleCodes: ["3.4", "3.5", "3.6"],
  },
  {
    id: "rag-world",
    name: "RAG World",
    icon: "📚",
    tagline: "Embeddings, Vector Indexes & Retrieval Augmentation",
    moduleCodes: ["3.7", "3.8", "3.9"],
  },
  {
    id: "agent-world",
    name: "Agent World",
    icon: "🤖",
    tagline: "Autonomous Reasoning, Tool-Calling & Multi-Agent Graphs",
    moduleCodes: ["3.10", "3.11", "3.12", "3.13", "3.14"],
  },
  {
    id: "cybersecurity-world",
    name: "Cybersecurity World",
    icon: "🛡️",
    tagline: "Adversarial Robustness, Red-Teaming & Guardrails",
    moduleCodes: ["3.15"],
  },
  {
    id: "robotics-world",
    name: "Robotics World",
    icon: "🦾",
    tagline: "Embodied AI, Spatial Awareness & Actuator Pipelines",
    moduleCodes: ["3.16"],
  },
  {
    id: "production-ai",
    name: "Production AI",
    icon: "🚀",
    tagline: "Latency Optimization, Observability & Containerized Microservices",
    moduleCodes: ["3.17", "3.18", "3.19", "3.20"],
  },
  {
    id: "career",
    name: "Career World",
    icon: "💼",
    tagline: "System Design Interviews, Portfolio Defense & Placement",
    moduleCodes: ["3.21"],
  },
];

// ── 2. CONCEPTUAL INVENTORY (TOOLKIT ITEMS) ──
export interface ToolkitItem {
  id: string;
  name: string;
  icon: string;
  category: "syntax" | "flow" | "architecture" | "debugging";
  unlockedAt: string;
  description: string;
  codeSnippet: string;
}

const DEFAULT_TOOLKIT: ToolkitItem[] = [
  {
    id: "python-core",
    name: "Python 3.12 Core",
    icon: "🐍",
    category: "syntax",
    unlockedAt: "Level 01",
    description: "Strongly typed dynamic runtime with reference evaluation model.",
    codeSnippet: `import sys\nprint(f"Engine: Python {sys.version.split()[0]}")`,
  },
  {
    id: "variables",
    name: "Variables & Memory Pointers",
    icon: "🔢",
    category: "syntax",
    unlockedAt: "Level 01",
    description: "Labeled memory references bound to immutable or mutable values.",
    codeSnippet: `price: int = 100\ndiscount_pct: float = 0.20\nnet = price * (1 - discount_pct)`,
  },
  {
    id: "conditions",
    name: "Conditional Control Flow",
    icon: "🔀",
    category: "flow",
    unlockedAt: "Level 01",
    description: "Branching execution paths guarded by boolean invariants.",
    codeSnippet: `if price <= 0:\n    raise ValueError("Price must be positive")`,
  },
  {
    id: "loops",
    name: "Bounded Iterators",
    icon: "🔁",
    category: "flow",
    unlockedAt: "Level 01",
    description: "Deterministic traversal over sequence collections.",
    codeSnippet: `total = sum(item['price'] for item in cart if item['active'])`,
  },
  {
    id: "functions",
    name: "Pure Functions",
    icon: "🧩",
    category: "architecture",
    unlockedAt: "Level 01",
    description: "Encapsulated transformations with explicit inputs and verified returns.",
    codeSnippet: `def compute_discount(price: float, rate: float) -> float:\n    return price * (1.0 - rate)`,
  },
  {
    id: "lists",
    name: "Vector & List Records",
    icon: "📦",
    category: "syntax",
    unlockedAt: "Level 01",
    description: "Ordered sequences suitable for batching and array indexing.",
    codeSnippet: `data_records = [{"id": 1, "val": 42}, {"id": 2, "val": 88}]`,
  },
  {
    id: "json",
    name: "Structured JSON / Serialization",
    icon: "📖",
    category: "architecture",
    unlockedAt: "Level 01",
    description: "Wire format specification for inter-service communication.",
    codeSnippet: `import json\npayload = json.loads('{"status": "ok", "confidence": 0.94}')`,
  },
];

interface XPPopup {
  id: string;
  amount: number;
  label: string;
}

interface GamifiedLearningStudioProps {
  moduleId?: `3.${number}` | string;
  concept?: string;
  stepIndex?: number;
  onNavigateHome?: () => void;
}

export function GamifiedLearningStudio({
  moduleId = "3.2",
  concept,
  stepIndex: initialStepIndex = 0,
}: GamifiedLearningStudioProps) {
  const navigate = useNavigate();
  const progress = useLearningProgress();

  // Load experience data for this module
  const experience = useMemo(() => getLearningExperience(moduleId as `3.${number}`), [moduleId]);
  const currentModuleData = useMemo(() => {
    return (
      curriculumModules.find((m) => m.code === moduleId) ??
      curriculumModules[0]!
    );
  }, [moduleId]);

  const steps = experience.steps;

  // View state: "MISSION" | "WORLD_MAP" | "LEVEL_BRIEFING"
  const [viewMode, setViewMode] = useState<"MISSION" | "WORLD_MAP" | "LEVEL_BRIEFING">("MISSION");
  const [selectedBriefingModule, setSelectedBriefingModule] = useState<CurriculumModule>(currentModuleData);

  // Gamification core metrics
  const [sessionXP, setSessionXP] = useState<number>(1240);
  const [streakDays, setStreakDays] = useState<number>(4);
  const [comboCount, setComboCount] = useState<number>(3);
  const [playerEnergy, setPlayerEnergy] = useState<number>(8); // 8/10
  const [xpPopups, setXpPopups] = useState<XPPopup[]>([]);
  const [comboMessage, setComboMessage] = useState<string | null>(null);

  // Inventory & Modals
  const [toolkitOpen, setToolkitOpen] = useState<boolean>(false);
  const [selectedToolkitItem, setSelectedToolkitItem] = useState<ToolkitItem | null>(null);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  // Stage Tracking
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(() => {
    if (concept) {
      const idx = steps.findIndex(
        (s) =>
          s.title.toLowerCase().includes(concept.toLowerCase()) ||
          (s.skillId && s.skillId.toLowerCase().includes(concept.toLowerCase()))
      );
      if (idx >= 0) return idx;
    }
    return Math.min(Math.max(0, initialStepIndex), steps.length - 1);
  });
  const [completedStages, setCompletedStages] = useState<Set<number>>(new Set([0]));

  // Mission Objectives Tracker
  const [objectives, setObjectives] = useState<
    Array<{ id: string; label: string; done: boolean }>
  >([
    { id: "obj-1", label: "Understand variables & memory model", done: false },
    { id: "obj-2", label: "Predict program output accurately", done: false },
    { id: "obj-3", label: "Fix the discount calculation anomaly", done: false },
    { id: "obj-4", label: "Survive the Break Test architecture boss", done: false },
    { id: "obj-5", label: "Complete final synthesis challenge", done: false },
  ]);

  // Stage 1: Hook - Cinematic agency choice
  const [hookInvestigationChoice, setHookInvestigationChoice] = useState<string | null>(null);

  // Stage 2: Prediction challenge
  const [predictionSelected, setPredictionSelected] = useState<string>("");
  const [isAnswerLocked, setIsAnswerLocked] = useState<boolean>(false);
  const [predictionRevealed, setPredictionRevealed] = useState<boolean>(false);
  const [predictionCorrect, setPredictionCorrect] = useState<boolean | null>(null);

  // Stage 4: Experiment Mode sandbox
  const [experimentPrice, setExperimentPrice] = useState<number>(100);
  const [experimentDiscount, setExperimentDiscount] = useState<number>(20);
  const [experimentOutput, setExperimentOutput] = useState<string | null>("₹80");
  const [discoveredNegativeEdge, setDiscoveredNegativeEdge] = useState<boolean>(false);
  const [experimentReflection, setExperimentReflection] = useState<string>("");
  const [experimentSubmitted, setExperimentSubmitted] = useState<boolean>(false);

  // Stage 5: Practice Lab
  const [studentCode, setStudentCode] = useState<string>("");
  const [simulatedOutput, setSimulatedOutput] = useState<string | null>(null);
  const [isRunningCode, setIsRunningCode] = useState<boolean>(false);

  // Stage 6: BREAK TEST BOSS FIGHT - Architecture Pipeline Inspection
  const [selectedPipelineNode, setSelectedPipelineNode] = useState<
    "INPUT" | "VALIDATION" | "CALCULATION" | "OUTPUT" | null
  >("CALCULATION");
  const [pipelineFixed, setPipelineFixed] = useState<boolean>(false);
  const [pipelineStatus, setPipelineStatus] = useState<"FAILURE" | "ONLINE">("FAILURE");

  // Stage 8: Rapid-Fire Knowledge Check
  const [rapidFireScore, setRapidFireScore] = useState<number>(0);
  const [rapidFireDone, setRapidFireDone] = useState<boolean>(false);

  // Stage 9: Boss Challenge
  const [bossTimer, setBossTimer] = useState<number>(522); // 08:42 seconds
  const [bossHintsRemaining, setBossHintsRemaining] = useState<number>(3);
  const [bossTestsPassed, setBossTestsPassed] = useState<number>(2);

  // Floating AI Game Guide
  const [guideOpen, setGuideOpen] = useState<boolean>(false);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [guideChat, setGuideChat] = useState<Array<{ role: "user" | "guide"; text: string }>>([
    {
      role: "guide",
      text: `Greetings, Engineer! I am your Socratic AI Guide for Mission ${currentModuleData.moduleNumber}. Inspect anomalies, test hypotheses, and defend invariants!`,
    },
  ]);
  const [guideInput, setGuideInput] = useState<string>("");

  const currentStep = steps[currentStepIdx] || steps[0]!;

  // Dynamic Level metadata
  const levelNumber = currentModuleData.moduleNumber || "01";
  const missionTitle =
    moduleId === "3.2"
      ? "THE DISCOUNT CALCULATOR IS LYING"
      : `MISSION: SECURE ${currentModuleData.title.toUpperCase()}`;

  // Award XP with floating upward animation
  const awardXP = (amount: number, label: string) => {
    setSessionXP((prev) => prev + amount);
    const newPopup: XPPopup = {
      id: `${Date.now()}-${Math.random()}`,
      amount,
      label,
    };
    setXpPopups((prev) => [...prev, newPopup]);
    setTimeout(() => {
      setXpPopups((prev) => prev.filter((p) => p.id !== newPopup.id));
    }, 2200);

    recordLearningEvidence({ sectionsCompleted: 1 });
  };

  // Sync position into global state
  useEffect(() => {
    updateLearningPosition({
      currentModuleId: moduleId,
      currentStepIndex: currentStepIdx,
      currentTopic: currentStep.title,
    });
  }, [moduleId, currentStepIdx, currentStep.title]);

  // Handle stage transitions
  const advanceToStage = (targetIdx: number, bonusXP: number = 30) => {
    awardXP(bonusXP, `Stage ${currentStepIdx + 1} Cleared`);
    setCompletedStages((prev) => new Set([...prev, currentStepIdx, targetIdx]));
    setComboCount((c) => Math.min(c + 1, 8));

    // Update Objectives dynamically
    setObjectives((prev) => {
      return prev.map((obj, i) => {
        if (i === 0 && targetIdx >= 2) return { ...obj, done: true };
        if (i === 1 && targetIdx >= 4) return { ...obj, done: true };
        if (i === 2 && targetIdx >= 5) return { ...obj, done: true };
        if (i === 3 && targetIdx >= 6) return { ...obj, done: true };
        if (i === 4 && targetIdx >= 9) return { ...obj, done: true };
        return obj;
      });
    });

    if (targetIdx < steps.length) {
      setCurrentStepIdx(targetIdx);
    } else {
      // Completed all 10 stages!
      completeLearningModule(moduleId, 8);
      awardXP(200, "🏆 Mission Mastered!");
      toast.success(`Level ${levelNumber} Mastered! New Area Unlocked!`);
    }
  };

  // Reset stage specific states
  useEffect(() => {
    setPredictionSelected("");
    setIsAnswerLocked(false);
    setPredictionRevealed(false);
    setPredictionCorrect(null);
    setSimulatedOutput(null);

    if (currentStep.stage === "PRACTICE") {
      setStudentCode(
        moduleId === "3.2"
          ? `def c_to_f(celsius: float) -> float:\n    # Invariant: (C * 9/5) + 32\n    return (celsius * 9/5) + 32\n\nprint(f"19.5°C = {c_to_f(19.5):.1f}°F")`
          : currentStep.example || `# Practice Lab for ${currentModuleData.title}\ndef solve():\n    return True`
      );
    } else if (currentStep.stage === "BREAK IT") {
      setPipelineStatus("FAILURE");
      setPipelineFixed(false);
      setSelectedPipelineNode("CALCULATION");
    } else if (currentStep.stage === "MASTERY") {
      setStudentCode(
        experience.challenge?.starterCode ||
          `def production_pipeline(records):\n    """Synthesize complete defensive architecture."""\n    return [r for r in records if r.get('active')]`
      );
    }
  }, [currentStepIdx, currentStep.stage, currentStep.example, moduleId, currentModuleData.title, experience.challenge?.starterCode]);

  // Socratic guide submission
  const handleAskGuide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guideInput.trim()) return;

    const query = guideInput.trim();
    setGuideInput("");
    setGuideChat((prev) => [...prev, { role: "user", text: query }]);

    setTimeout(() => {
      let reply = "";
      const lower = query.toLowerCase();
      if (lower.includes("hint") || lower.includes("help") || lower.includes("how")) {
        setHintsUsed((h) => h + 1);
        reply = currentStep.mentorHints?.[0] || "Examine the boundary condition. What invariant should hold true before execution?";
      } else if (lower.includes("why") || lower.includes("bug")) {
        reply = `Remember: ${currentStep.whyItMatters || "Memory types and evaluation order dictate execution flow."}`;
      } else {
        reply = "Consider: What is your hypothesis about the expected state versus the actual state?";
      }
      setGuideChat((prev) => [...prev, { role: "guide", text: reply }]);
    }, 450);
  };

  // Calculate mastery %
  const masteryPercent = Math.min(100, Math.round(((currentStepIdx + 1) / steps.length) * 100));
  const completedObjectivesCount = objectives.filter((o) => o.done).length;

  // ═══════════════════════════════════════════════════════════════════════
  // VIEW: 1. WORLD ADVENTURE PROGRESSION MAP
  // ═══════════════════════════════════════════════════════════════════════
  if (viewMode === "WORLD_MAP") {
    return (
      <div className="min-h-screen bg-[#07131B] text-white p-4 sm:p-8">
        {/* World Map Header */}
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14B8A6]/15 border border-[#14B8A6]/30 text-[#14B8A6] font-mono text-xs font-bold">
                <MapPin className="size-3.5" />
                <span>AI SKILLS PROGRESSION UNIVERSE</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Skill Adventure Map
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Explore 9 interconnected worlds and 20 verified levels. Each level unlocks abilities, toolkits, and industrial credentials.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="h-10 px-4 rounded-xl border-white/20 text-white hover:bg-white/10 text-xs font-bold gap-2 cursor-pointer"
                onClick={() => setViewMode("MISSION")}
              >
                <ArrowLeft className="size-4" />
                <span>Resume Active Mission</span>
              </Button>
            </div>
          </div>

          {/* 9 Progression Worlds Rendered as Skill Adventure Nodes */}
          <div className="space-y-10 py-4">
            {PROGRESSION_WORLDS.map((world, worldIdx) => {
              const worldModules = curriculumModules.filter((m) =>
                world.moduleCodes.includes(m.code)
              );
              const isCurrentWorld = world.moduleCodes.includes(moduleId as `3.${number}`);

              return (
                <div
                  key={world.id}
                  className={`rounded-2xl border transition-all p-5 sm:p-6 ${
                    isCurrentWorld
                      ? "bg-[#0B1F2A] border-[#14B8A6]/50 shadow-xl"
                      : "bg-[#091720]/60 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="size-12 rounded-2xl bg-[#123542] border border-[#14B8A6]/30 flex items-center justify-center text-2xl shadow-inner">
                        {world.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-display text-lg font-bold text-white tracking-wide">
                            {world.name}
                          </h2>
                          {isCurrentWorld && (
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#14B8A6] text-[#07131B] px-2 py-0.5 rounded-full animate-pulse">
                              Active World
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{world.tagline}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span>WORLD 0{worldIdx + 1} / 09</span>
                    </div>
                  </div>

                  {/* Level Nodes in World */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {worldModules.map((mod) => {
                      const isModActive = mod.code === moduleId;
                      const isMastered = mod.code === "3.2" && currentStepIdx === 9;

                      return (
                        <div
                          key={mod.code}
                          onClick={() => {
                            setSelectedBriefingModule(mod);
                            setViewMode("LEVEL_BRIEFING");
                          }}
                          className={`group p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between h-40 ${
                            isModActive
                              ? "bg-[#123542] border-[#14B8A6] node-pulse text-white shadow-lg"
                              : isMastered
                              ? "bg-[#0A2722] border-[#16A34A]/50 text-slate-200"
                              : "bg-[#0D1C24] border-white/10 hover:border-white/30 text-slate-300"
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
                              <span className="text-[#14B8A6] font-bold">LEVEL {mod.moduleNumber}</span>
                              <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                                ★☆☆☆☆
                              </span>
                            </div>
                            <h3 className="font-display text-sm font-bold text-white group-hover:text-[#14B8A6] transition-colors line-clamp-2">
                              {mod.title}
                            </h3>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-mono">
                            <span className="text-slate-400 text-[11px]">+1,200 XP</span>
                            <span className="text-[#14B8A6] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                              <span>Mission Brief</span>
                              <ChevronRight className="size-3.5" />
                            </span>
                          </div>

                          {isModActive && (
                            <div className="absolute top-2 right-2 size-2 rounded-full bg-[#14B8A6] animate-ping" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // VIEW: 2. LEVEL MISSION BRIEFING MODAL SCREEN
  // ═══════════════════════════════════════════════════════════════════════
  if (viewMode === "LEVEL_BRIEFING") {
    return (
      <div className="min-h-screen bg-[#07131B] text-white flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-xl w-full rounded-3xl bg-[#0B1F2A] border border-[#14B8A6]/40 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          {/* Top glow accent */}
          <div className="absolute -top-20 -right-20 size-48 rounded-full bg-[#14B8A6]/20 blur-3xl pointer-events-none" />

          {/* Level Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#14B8A6] bg-[#14B8A6]/15 border border-[#14B8A6]/30 px-3 py-1 rounded-full">
                LEVEL {selectedBriefingModule.moduleNumber}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-mono text-amber-400 font-bold">★☆☆☆☆ NOVICE</span>
            </div>
            <button
              onClick={() => setViewMode("WORLD_MAP")}
              className="text-slate-400 hover:text-white cursor-pointer p-1"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {selectedBriefingModule.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {selectedBriefingModule.description}
            </p>
          </div>

          {/* Mission Spec Card */}
          <div className="rounded-2xl bg-[#081720] border border-white/10 p-5 space-y-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">ESTIMATED</span>
                <p className="font-mono text-xs font-bold text-white">4 HOURS</p>
              </div>
              <div className="space-y-1 border-x border-white/10">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">REWARD</span>
                <p className="font-mono text-xs font-bold text-[#14B8A6]">+1,200 XP</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">UNLOCKS</span>
                <p className="font-mono text-xs font-bold text-white">PYTHON BUILDER</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 block mb-1">
                PRIMARY INCIDENT BRIEFING
              </span>
              <p className="font-display text-sm font-bold text-white">
                &ldquo;{selectedBriefingModule.code === "3.2" ? "THE DISCOUNT CALCULATOR IS LYING" : `RESTORE ${selectedBriefingModule.title.toUpperCase()}`}&rdquo;
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              className="flex-1 h-12 rounded-xl bg-[#14B8A6] hover:bg-[#0d9488] text-[#07131B] font-bold text-sm gap-2 shadow-lg shadow-[#14B8A6]/20 cursor-pointer"
              onClick={() => {
                if (selectedBriefingModule.code !== moduleId) {
                  navigate({
                    to: "/learning-mode",
                    search: { module: selectedBriefingModule.code },
                  });
                }
                setViewMode("MISSION");
              }}
            >
              <Play className="size-4 fill-current" />
              <span>[ ENTER MISSION ]</span>
            </Button>
            <Button
              variant="outline"
              className="h-12 px-5 rounded-xl border-white/20 text-white hover:bg-white/10 text-xs font-semibold cursor-pointer"
              onClick={() => setViewMode("WORLD_MAP")}
            >
              Back to World Map
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // VIEW: 3. IMMERSIVE ACTIVE MISSION CANVAS & HUD
  // ═══════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#F7FAFA] text-[#0B1F2A] relative flex flex-col">
      {/* ── FLOATING XP NOTIFICATIONS (Drifting upward) ── */}
      <div className="fixed top-20 right-8 z-50 pointer-events-none flex flex-col gap-2 items-end">
        {xpPopups.map((popup) => (
          <div
            key={popup.id}
            className="xp-float flex items-center gap-2 rounded-xl bg-[#0B1F2A] border border-[#14B8A6] text-white px-4 py-2 shadow-2xl"
          >
            <Zap className="size-4 text-[#14B8A6] fill-current animate-bounce" />
            <span className="font-mono text-sm font-extrabold text-[#14B8A6]">
              +{popup.amount} XP
            </span>
            <span className="text-xs text-white/90 font-semibold">{popup.label}</span>
          </div>
        ))}
      </div>

      {/* ── COMPACT GAME HUD (Level, Energy, Streak, XP, Mastery, Toolkit) ── */}
      <nav className="sticky top-0 z-40 bg-[#0B1F2A] text-white border-b border-[#123542] px-4 sm:px-6 py-2.5 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Mission Identity & World Map Link */}
          <div className="flex items-center gap-3 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("WORLD_MAP")}
              className="h-8 px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 font-mono text-xs gap-1.5 cursor-pointer"
              title="Return to World Progression Map"
            >
              <ArrowLeft className="size-3.5" />
              <span className="hidden sm:inline">World Map</span>
            </Button>

            <div className="h-4 w-px bg-white/20 hidden sm:block" />

            <div className="min-w-0">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#14B8A6] block leading-none">
                LEVEL {levelNumber} · {currentModuleData.title}
              </span>
              <h2 className="font-display text-xs sm:text-sm font-bold text-white truncate mt-0.5">
                {missionTitle}
              </h2>
            </div>
          </div>

          {/* Right: Game Mechanics HUD */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* ❤️ ENERGY BAR (Soft mechanic, never locks out) */}
            <div
              className="flex items-center gap-1.5 rounded-lg bg-[#123542] border border-white/10 px-2.5 py-1 text-xs font-mono"
              title="Energy gauge. Wrong attempts reduce energy slightly, but never lock you out!"
            >
              <span className="text-red-400 text-xs">❤️</span>
              <span className="font-bold text-slate-300 hidden md:inline text-[10px]">ENERGY</span>
              <div className="flex gap-0.5">
                {[...Array(10)].map((_, i) => (
                  <span
                    key={i}
                    className={`size-1.5 rounded-xs transition-colors ${
                      i < playerEnergy ? "bg-red-400" : "bg-white/15"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 🔥 STREAK */}
            <div className="flex items-center gap-1.5 rounded-lg bg-[#123542] border border-[#D97706]/40 px-2.5 py-1 text-xs font-mono font-bold text-[#F59E0B]">
              <Flame className="size-3.5 fill-current" />
              <span>{streakDays}</span>
              <span className="text-[9px] text-slate-400 font-normal hidden sm:inline">STREAK</span>
            </div>

            {/* ⭐ XP */}
            <div className="flex items-center gap-1.5 rounded-lg bg-[#123542] border border-[#14B8A6]/40 px-2.5 py-1 text-xs font-mono font-bold text-[#14B8A6]">
              <Star className="size-3.5 fill-current" />
              <span>{sessionXP.toLocaleString()}</span>
              <span className="text-[9px] text-slate-400 font-normal hidden sm:inline">XP</span>
            </div>

            {/* 🏆 MASTERY */}
            <div className="flex items-center gap-1.5 rounded-lg bg-[#123542] border border-white/10 px-2.5 py-1 text-xs font-mono text-white">
              <Trophy className="size-3.5 text-amber-300" />
              <span className="font-bold">{masteryPercent}%</span>
            </div>

            {/* 🧰 TOOLKIT (Inventory) TRIGGER */}
            <Button
              size="sm"
              onClick={() => setToolkitOpen(true)}
              className="h-7 px-2.5 rounded-lg bg-[#14B8A6]/20 border border-[#14B8A6]/40 text-[#14B8A6] hover:bg-[#14B8A6]/30 text-xs font-bold gap-1.5 cursor-pointer"
            >
              <span>🧰</span>
              <span className="hidden md:inline">Toolkit</span>
              <span className="size-4 rounded-full bg-[#14B8A6] text-[#07131B] text-[10px] font-extrabold grid place-items-center">
                {DEFAULT_TOOLKIT.length}
              </span>
            </Button>

            {/* 👤 PLAYER PROFILE TRIGGER */}
            <button
              onClick={() => setProfileOpen(true)}
              className="size-7 rounded-lg bg-[#123542] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
              title="View Player Profile"
            >
              <User className="size-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MAIN MISSION WORKSPACE CANVAS ── */}
      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex-1 grid lg:grid-cols-12 gap-6 items-start">
        {/* ── LEFT COLUMN (LG: 8 Cols): INTERACTIVE STAGE HERO ── */}
        <main className="lg:col-span-8 space-y-6">
          {/* Combo Multiplier Banner */}
          {comboCount >= 2 && (
            <div className="rounded-xl bg-gradient-to-r from-[#0B1F2A] to-[#123542] border border-[#D97706]/40 p-3 text-white flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-mono text-xs font-extrabold px-2 py-0.5 rounded bg-amber-400/20 border border-amber-400/30 animate-pulse">
                  COMBO × {comboCount}
                </span>
                <span className="text-xs text-slate-300">Consecutive verified analytical logic!</span>
              </div>
              <span className="font-mono text-xs text-[#14B8A6] font-bold">+{comboCount * 15} Bonus XP</span>
            </div>
          )}

          {/* Energy Breathing Tip if energy drops */}
          {playerEnergy < 5 && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 flex items-center gap-2.5 text-xs text-amber-900 animate-in fade-in">
              <Lightbulb className="size-4 text-amber-600 shrink-0" />
              <span>
                <strong>Take a breath.</strong> Try inspecting the components or ask your Socratic Game Guide for a progressive hint.
              </span>
            </div>
          )}

          {/* ── PROGRESSION NODE PATH (Start -> Break Test -> Mastered) ── */}
          <div className="rounded-2xl bg-white border border-[#DCE7E5] p-3 sm:p-4 shadow-xs">
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#587078]">
                LEVEL PROGRESSION PATH
              </span>
              <span className="font-mono text-xs font-bold text-[#0F766E]">
                STAGE {currentStepIdx + 1} OF 10: {currentStep.stage}
              </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {steps.map((s, idx) => {
                const isCurrent = idx === currentStepIdx;
                const isDone = completedStages.has(idx);
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentStepIdx(idx)}
                    className={`flex flex-col items-center justify-center p-1.5 rounded-lg border text-center transition-all cursor-pointer relative ${
                      isCurrent
                        ? "bg-[#CCFBF1] border-[#0F766E] text-[#0F766E] font-bold node-pulse"
                        : isDone
                        ? "bg-[#F0FDF4] border-[#16A34A]/40 text-[#16A34A] font-semibold"
                        : "bg-[#F7FAFA] border-[#DCE7E5] text-slate-400 hover:border-[#0F766E]/40"
                    }`}
                  >
                    <span className="font-mono text-[10px]">
                      {isDone ? "✓" : String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[8px] truncate max-w-full font-bold uppercase">
                      {s.stage === "BREAK IT" ? "⚔ BREAK" : s.stage.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* STAGE 01: CINEMATIC HOOK (Incident Detected + Approach)   */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep.stage === "HOOK" && (
            <div className="rounded-2xl bg-white border border-[#DCE7E5] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-mono font-bold">
                  <span className="size-2 rounded-full bg-red-600 animate-ping" />
                  <span>INCIDENT DETECTED · UNHANDLED ANOMALY</span>
                </div>
                <span className="font-mono text-xs font-bold text-[#0F766E]">+20 XP Available</span>
              </div>

              <div className="space-y-4">
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0B1F2A] tracking-tight">
                  {moduleId === "3.2" ? "The Discount Calculator Is Lying" : currentStep.title}
                </h1>

                {/* Discrepancy Display */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-[#F0FDF4] border border-[#16A34A]/30 p-4 text-center">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#16A34A]">
                      EXPECTED CHARGE
                    </span>
                    <p className="font-mono text-3xl font-extrabold text-[#16A34A] mt-1">₹84.00</p>
                    <span className="text-[11px] text-slate-500">Correct arithmetic contract</span>
                  </div>

                  <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-center">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-600">
                      ACTUAL RECEIVED
                    </span>
                    <p className="font-mono text-3xl font-extrabold text-red-600 mt-1">₹79.00</p>
                    <span className="text-[11px] text-red-500">Customer billed incorrectly</span>
                  </div>
                </div>

                {/* Customer Quote */}
                <div className="rounded-xl bg-[#F0F5F4] border-l-4 border-amber-500 p-4 text-xs text-[#0B1F2A] space-y-1">
                  <p className="font-bold uppercase tracking-wide text-[10px] text-amber-700">
                    Customer Escalation Ticket #4892:
                  </p>
                  <p className="italic text-[#334E57]">
                    &ldquo;Your checkout system charged me ₹79 instead of applying the 20% promotional coupon correctly on ₹100 cart! Fix your calculation engine!&rdquo;
                  </p>
                </div>

                {/* Player Agency: CHOOSE YOUR APPROACH */}
                <div className="space-y-3 pt-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0F766E] block">
                    HOW DO YOU WANT TO INVESTIGATE?
                  </span>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { id: "calc", label: "Inspect the calculation formula", clue: "Clue: Look at whether 20 is being evaluated as currency or rate." },
                      { id: "inputs", label: "Run different inputs in memory", clue: "Clue: Try passing ₹200 or ₹50 to see if the deviation scales." },
                      { id: "function", label: "Read the function definition", clue: "Clue: Check operator precedence in the return statement." },
                      { id: "edges", label: "Test edge cases (0% and 100%)", clue: "Clue: A 0% discount should return the exact base price." },
                    ].map((approach) => (
                      <button
                        key={approach.id}
                        onClick={() => {
                          setHookInvestigationChoice(approach.id);
                          awardXP(10, "Investigative Action");
                        }}
                        className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition cursor-pointer ${
                          hookInvestigationChoice === approach.id
                            ? "bg-[#CCFBF1] border-[#0F766E] text-[#0B1F2A]"
                            : "bg-[#F7FAFA] border-[#DCE7E5] text-[#587078] hover:border-[#0F766E]"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`size-2 rounded-full ${hookInvestigationChoice === approach.id ? "bg-[#0F766E]" : "bg-slate-300"}`} />
                          <span>{approach.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {hookInvestigationChoice && (
                    <div className="rounded-xl bg-[#E6F7F5] border border-[#0F766E]/30 p-3 text-xs text-[#0F766E] font-medium animate-in fade-in">
                      💡 <strong>Investigation Clue:</strong>{" "}
                      {hookInvestigationChoice === "calc"
                        ? "Operator precedence order: In Python, division occurs before subtraction unless grouped with parentheses!"
                        : hookInvestigationChoice === "inputs"
                        ? "When tested with ₹200, output returned ₹199.8 instead of ₹160! A direct 0.2 deduction occurred!"
                        : "Inspection reveals: `price - discount / 100` is missing grouping brackets!"}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[#DCE7E5] flex justify-end">
                <Button
                  className="h-11 px-6 rounded-xl bg-[#0F766E] hover:bg-[#0d655e] text-white font-bold text-xs gap-2 cursor-pointer shadow-sm"
                  onClick={() => advanceToStage(1, 20)}
                >
                  <span>[ ACCEPT MISSION & ADVANCE ]</span>
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* STAGE 02: PREDICTION MECHANIC (Lock Answer -> Run)         */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep.stage === "WHY" && (
            <div className="rounded-2xl bg-white border border-[#DCE7E5] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  STAGE 02 · PREDICTION CHALLENGE
                </span>
                <span className="font-mono text-xs font-bold text-[#0F766E]">+20 XP Available</span>
              </div>

              <div className="space-y-3">
                <h2 className="font-display text-xl font-bold text-[#0B1F2A]">
                  What Will Happen?
                </h2>
                <p className="text-xs sm:text-sm text-[#587078]">
                  Predict the exact program output before running it in the Python interpreter:
                </p>

                <div className="rounded-2xl bg-[#0B1F2A] border border-[#123542] p-4 font-mono text-xs text-slate-100 leading-6">
                  <pre>
                    {`price = 100\ndiscount = 20\n\nprice = price - discount\nprint(price)`}
                  </pre>
                </div>
              </div>

              {/* Prediction Options */}
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { id: "opt-80", label: "₹80", correct: true },
                  { id: "opt-20", label: "₹20", correct: false },
                  { id: "opt-100", label: "₹100", correct: false },
                  { id: "opt-err", label: "ERROR", correct: false },
                ].map((item) => (
                  <button
                    key={item.id}
                    disabled={isAnswerLocked}
                    onClick={() => setPredictionSelected(item.id)}
                    className={`p-4 rounded-xl border text-center font-mono text-sm font-bold transition cursor-pointer ${
                      predictionSelected === item.id
                        ? "bg-[#CCFBF1] border-[#0F766E] text-[#0F766E]"
                        : "bg-[#F7FAFA] border-[#DCE7E5] text-[#0B1F2A] hover:border-[#0F766E]"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Lock & Run Action */}
              <div className="pt-2 flex items-center justify-between">
                {!isAnswerLocked ? (
                  <Button
                    disabled={!predictionSelected}
                    onClick={() => setIsAnswerLocked(true)}
                    className="h-10 px-5 rounded-xl bg-[#0B1F2A] hover:bg-[#123542] text-white font-bold text-xs cursor-pointer"
                  >
                    Lock Answer
                  </Button>
                ) : !predictionRevealed ? (
                  <Button
                    onClick={() => {
                      setPredictionRevealed(true);
                      const isCorrect = predictionSelected === "opt-80";
                      setPredictionCorrect(isCorrect);
                      if (isCorrect) {
                        awardXP(20, "Correct Prediction (+20 XP)");
                        setStreakDays((s) => s + 1);
                      } else {
                        setPlayerEnergy((e) => Math.max(e - 1, 1));
                        setComboMessage("Every bug teaches you something.");
                      }
                    }}
                    className="h-10 px-5 rounded-xl bg-[#0F766E] hover:bg-[#0d655e] text-white font-bold text-xs gap-2 cursor-pointer"
                  >
                    <Play className="size-3.5 fill-current" />
                    <span>[ RUN ]</span>
                  </Button>
                ) : (
                  <div className="w-full flex items-center justify-between">
                    <span className={`text-xs font-bold font-mono ${predictionCorrect ? "text-[#16A34A]" : "text-amber-600"}`}>
                      {predictionCorrect ? "✓ CORRECT! +20 XP · STREAK × 2" : "INVARIANT MISMATCH: Variable was reassigned in place."}
                    </span>
                    <Button
                      onClick={() => advanceToStage(2, 25)}
                      className="h-10 px-5 rounded-xl bg-[#0F766E] hover:bg-[#0d655e] text-white font-bold text-xs cursor-pointer"
                    >
                      Enter Concept Explorer →
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* STAGE 03: LEARN (Interactive Variables & Memory Model)     */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep.stage === "LEARN" && (
            <div className="rounded-2xl bg-white border border-[#DCE7E5] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  STAGE 03 · CONCEPT EXPLORER
                </span>
                <span className="font-mono text-xs font-bold text-[#0F766E]">+25 XP Explorer</span>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-[#0B1F2A]">
                  Memory Representation & Variable Pointers
                </h2>
                <p className="text-xs sm:text-sm text-[#587078] mt-1">
                  In Python, variable names are labels bound to objects stored in heap memory. Observe how mutating values re-points references:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] p-4 space-y-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#587078] block">
                    SYMBOL TABLE (STACK)
                  </span>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between p-2 rounded bg-white border border-[#DCE7E5]">
                      <span className="font-bold text-[#0F766E]">price</span>
                      <span className="text-slate-400">→ ref 0x7FFF9A</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-white border border-[#DCE7E5]">
                      <span className="font-bold text-[#0F766E]">discount</span>
                      <span className="text-slate-400">→ ref 0x7FFF4C</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[#DCE7E5] bg-[#0B1F2A] text-white p-4 space-y-3">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#14B8A6] block">
                    HEAP MEMORY OBJECTS
                  </span>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="p-2 rounded bg-[#123542] border border-white/10 flex justify-between">
                      <span className="text-slate-300">int(100)</span>
                      <span className="text-[#14B8A6]">Immutable</span>
                    </div>
                    <div className="p-2 rounded bg-[#123542] border border-white/10 flex justify-between">
                      <span className="text-slate-300">int(20)</span>
                      <span className="text-[#14B8A6]">Immutable</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  onClick={() => advanceToStage(3, 25)}
                  className="h-10 px-5 rounded-xl bg-[#0F766E] hover:bg-[#0d655e] text-white font-bold text-xs cursor-pointer"
                >
                  Enter Experiment Lab Sandbox →
                </Button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* STAGE 04: EXPERIMENT MODE (Sandbox Discovery)               */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep.stage === "TRY IT" && (
            <div className="rounded-2xl bg-white border border-[#DCE7E5] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  STAGE 04 · EXPERIMENT LAB SANDBOX
                </span>
                <span className="font-mono text-xs font-bold text-[#0F766E]">+30 XP Experiment</span>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-[#0B1F2A]">
                  Experiment Mode: Try Something Unexpected
                </h2>
                <p className="text-xs sm:text-sm text-[#587078] mt-1">
                  Adjust the inputs below. See what happens when the discount exceeds the base price:
                </p>
              </div>

              {/* Interactive Inputs */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-[#DCE7E5] p-4 bg-[#F7FAFA] space-y-2">
                  <label className="text-xs font-mono font-bold text-[#0B1F2A] block">
                    PRICE [ ₹ ]
                  </label>
                  <input
                    type="number"
                    value={experimentPrice}
                    onChange={(e) => setExperimentPrice(Number(e.target.value))}
                    className="w-full rounded-lg bg-white border border-[#DCE7E5] px-3 py-2 font-mono text-sm outline-none focus:border-[#0F766E]"
                  />
                </div>

                <div className="rounded-xl border border-[#DCE7E5] p-4 bg-[#F7FAFA] space-y-2">
                  <label className="text-xs font-mono font-bold text-[#0B1F2A] block">
                    DISCOUNT [ ₹ ]
                  </label>
                  <input
                    type="number"
                    value={experimentDiscount}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setExperimentDiscount(val);
                      if (val > experimentPrice) {
                        setDiscoveredNegativeEdge(true);
                      }
                    }}
                    className="w-full rounded-lg bg-white border border-[#DCE7E5] px-3 py-2 font-mono text-sm outline-none focus:border-[#0F766E]"
                  />
                </div>
              </div>

              {/* Output Display */}
              <div className="rounded-xl bg-[#0B1F2A] border border-[#123542] p-4 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] font-mono text-[#14B8A6] uppercase font-bold block">
                    EVALUATED OUTPUT
                  </span>
                  <p className="font-mono text-2xl font-bold text-white mt-0.5">
                    ₹{experimentPrice - experimentDiscount}
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    setExperimentOutput(`₹${experimentPrice - experimentDiscount}`);
                    awardXP(10, "Ran Experiment");
                  }}
                  className="bg-[#14B8A6] text-[#07131B] font-bold text-xs hover:bg-[#0d9488] cursor-pointer"
                >
                  <Play className="size-3 fill-current mr-1" />
                  Run
                </Button>
              </div>

              {/* Discovery Prompt if Negative */}
              {discoveredNegativeEdge && (
                <div className="rounded-xl bg-[#CCFBF1] border border-[#0F766E]/40 p-4 space-y-2 animate-in fade-in">
                  <div className="flex items-center gap-2 text-[#0F766E] font-bold text-xs">
                    <Sparkles className="size-4" />
                    <span>💡 Discovery: Negative Price Vulnerability!</span>
                  </div>
                  <p className="text-xs text-[#0B1F2A]">
                    When discount ({experimentDiscount}) &gt; price ({experimentPrice}), the system pays the user! A defensive clamp `max(0, net)` is required!
                  </p>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <Button
                  onClick={() => advanceToStage(4, 30)}
                  className="h-10 px-5 rounded-xl bg-[#0F766E] hover:bg-[#0d655e] text-white font-bold text-xs cursor-pointer"
                >
                  Advance to Practice Lab →
                </Button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* STAGE 05: PRACTICE (Focused Coding Lab)                     */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep.stage === "PRACTICE" && (
            <div className="rounded-2xl bg-white border border-[#DCE7E5] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  STAGE 05 · PRACTICE LAB
                </span>
                <span className="font-mono text-xs font-bold text-[#0F766E]">+50 XP Practice</span>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-[#0B1F2A]">
                  Fix The Temperature Converter Formula
                </h2>
                <p className="text-xs sm:text-sm text-[#587078] mt-1">
                  Ensure the arithmetic follows strict parentheses grouping before execution:
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-[#123542] bg-[#0B1F2A] shadow-md">
                <div className="flex items-center justify-between px-4 py-2 bg-[#081720] border-b border-white/10 text-xs font-mono text-slate-300">
                  <div className="flex items-center gap-2">
                    <Terminal className="size-3.5 text-[#14B8A6]" />
                    <span>converter.py</span>
                  </div>
                  <span className="text-[#14B8A6] text-[10px]">Python 3.12</span>
                </div>
                <textarea
                  value={studentCode}
                  onChange={(e) => setStudentCode(e.target.value)}
                  className="w-full h-36 p-4 font-mono text-xs leading-6 outline-none bg-[#0B1F2A] text-slate-100 resize-none"
                  spellCheck={false}
                />
                <div className="flex items-center justify-between px-4 py-3 bg-[#081720] border-t border-white/10">
                  <Button
                    size="sm"
                    onClick={() => {
                      setIsRunningCode(true);
                      setTimeout(() => {
                        setIsRunningCode(false);
                        setSimulatedOutput("19.5°C = 67.1°F\n✓ All 3 test fixtures passed!");
                        awardXP(40, "Solved Coding Lab");
                      }, 400);
                    }}
                    className="bg-[#0F766E] hover:bg-[#0d655e] text-white text-xs font-bold h-9 px-4 rounded-xl cursor-pointer"
                  >
                    <Play className="size-3.5 fill-current mr-1.5" />
                    {isRunningCode ? "Evaluating..." : "Run Tests"}
                  </Button>
                </div>
              </div>

              {simulatedOutput && (
                <div className="rounded-xl bg-[#F0FDF4] border border-[#16A34A]/40 p-4 space-y-2">
                  <span className="text-xs font-bold text-[#16A34A] flex items-center gap-1.5">
                    <CheckCircle2 className="size-4" />
                    <span>Verified: Test Assertions Passed</span>
                  </span>
                  <pre className="font-mono text-xs text-[#0B1F2A]">{simulatedOutput}</pre>
                  <div className="pt-2 flex justify-end">
                    <Button
                      onClick={() => advanceToStage(5, 50)}
                      className="h-10 px-5 rounded-xl bg-[#0F766E] hover:bg-[#0d655e] text-white font-bold text-xs cursor-pointer"
                    >
                      Enter Break Test Boss Fight →
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* STAGE 06: ⚠ BREAK TEST (Signature Architecture Boss Fight) */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep.stage === "BREAK IT" && (
            <div className="rounded-2xl bg-white border border-[#DCE7E5] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                      pipelineStatus === "FAILURE"
                        ? "bg-red-100 text-red-800 border-red-300 animate-pulse"
                        : "bg-[#F0FDF4] text-[#16A34A] border-[#16A34A]/40"
                    }`}
                  >
                    {pipelineStatus === "FAILURE" ? "⚠ BREAK TEST: SYSTEM FAILURE" : "● SYSTEM RESTORED"}
                  </span>
                </div>
                <span className="font-mono text-xs font-bold text-[#0F766E]">+100 XP Boss Defeated</span>
              </div>

              <div className="space-y-2">
                <h2 className="font-display text-xl font-bold text-[#0B1F2A]">
                  Survive The Break Test: Inspect The Broken Component
                </h2>
                <p className="text-xs sm:text-sm text-[#587078]">
                  Click each component in the system pipeline below to inspect live telemetry. Isolate the failing component and apply the verified repair:
                </p>
              </div>

              {/* Interactive Architecture Component Pipeline */}
              <div className="rounded-2xl bg-[#07131B] border border-white/10 p-5 space-y-4">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  SYSTEM ARCHITECTURE PIPELINE
                </span>

                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { id: "INPUT", label: "INPUT", status: "OK", err: false },
                    { id: "VALIDATION", label: "VALIDATION", status: "OK", err: false },
                    { id: "CALCULATION", label: "CALCULATION", status: pipelineFixed ? "REPAIRED" : "CRITICAL ⚠", err: !pipelineFixed },
                    { id: "OUTPUT", label: "OUTPUT", status: pipelineFixed ? "ONLINE" : "DEGRADED", err: !pipelineFixed },
                  ].map((node) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedPipelineNode(node.id as any)}
                      className={`p-3 rounded-xl border transition cursor-pointer ${
                        selectedPipelineNode === node.id
                          ? "bg-[#123542] border-[#14B8A6] text-white"
                          : "bg-[#0B1F2A] border-white/10 text-slate-300 hover:border-white/20"
                      } ${node.err ? "pipeline-alert" : ""}`}
                    >
                      <span className="font-mono text-[10px] font-bold block">{node.label}</span>
                      <span
                        className={`text-[9px] font-mono font-bold ${
                          node.err ? "text-red-400" : "text-[#14B8A6]"
                        }`}
                      >
                        {node.status}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Node Telemetry Inspection Panel */}
                <div className="rounded-xl bg-[#0B1F2A] border border-white/10 p-4 font-mono text-xs text-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] text-[#14B8A6]">
                    <span>INSPECTING: {selectedPipelineNode}</span>
                    <span>TRACE ID: #0x82A1</span>
                  </div>

                  {selectedPipelineNode === "INPUT" && (
                    <p className="text-slate-300">
                      Payload: &#123; &quot;price&quot;: 100, &quot;discount&quot;: 20 &#125; · Status: 200 OK
                    </p>
                  )}
                  {selectedPipelineNode === "VALIDATION" && (
                    <p className="text-slate-300">
                      Schema: All fields typed as numeric floats. Preconditions verified.
                    </p>
                  )}
                  {selectedPipelineNode === "CALCULATION" && (
                    <div className="space-y-1 text-red-300">
                      <p className="font-bold text-red-400">
                        ⚠ ROOT CAUSE IDENTIFIED:
                      </p>
                      <p>
                        Formula executes `price - discount` directly, subtracting ₹20 integer currency instead of applying compound percentage rate scaling!
                      </p>
                    </div>
                  )}
                  {selectedPipelineNode === "OUTPUT" && (
                    <p className="text-slate-400">
                      Downstream subscriber received corrupted state. Dependent invoices failed reconciliation.
                    </p>
                  )}
                </div>

                {/* Repair Action */}
                {!pipelineFixed ? (
                  <Button
                    onClick={() => {
                      setPipelineFixed(true);
                      setPipelineStatus("ONLINE");
                      awardXP(60, "Bug Fixed (+60 XP)");
                    }}
                    className="w-full h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs gap-2 cursor-pointer shadow-md"
                  >
                    <ShieldAlert className="size-4" />
                    <span>Apply Patch: price * (1 - discount_pct / 100)</span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      awardXP(40, "Break Test Survived (+40 XP)");
                      advanceToStage(6, 40);
                    }}
                    className="w-full h-11 rounded-xl bg-[#16A34A] hover:bg-[#15803d] text-white font-bold text-xs gap-2 cursor-pointer shadow-md"
                  >
                    <ShieldCheck className="size-4" />
                    <span>Run Repaired System (SYSTEM RESTORED ✓) →</span>
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* STAGE 07: YOUR TURN (Independent Synthesis)                */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep.stage === "YOUR TURN" && (
            <div className="rounded-2xl bg-white border border-[#DCE7E5] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  STAGE 07 · INDEPENDENT APPLICATION
                </span>
                <span className="font-mono text-xs font-bold text-[#0F766E]">+60 XP Challenge</span>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-[#0B1F2A]">
                  Your Turn: Build The Resilient Calculation Pipeline
                </h2>
                <p className="text-xs sm:text-sm text-[#587078] mt-1">
                  Synthesize variables, validation invariants, and defensive clamping into a robust function:
                </p>
              </div>

              <div className="rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] p-4 space-y-2">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#587078] block">
                  REQUIREMENTS RUBRIC
                </span>
                <div className="space-y-1.5 text-xs text-[#0F766E]">
                  <div className="flex items-center gap-2">
                    <Check className="size-4" />
                    <span>Handle standard positive price and discount percentage (+20 XP)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4" />
                    <span>Clamp negative price violations gracefully (+20 XP)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="size-4" />
                    <span>Return floating-point value rounded to 2 decimal places (+20 XP)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  onClick={() => advanceToStage(7, 60)}
                  className="h-10 px-5 rounded-xl bg-[#0F766E] hover:bg-[#0d655e] text-white font-bold text-xs cursor-pointer"
                >
                  Submit Verified Solution →
                </Button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* STAGE 08: KNOWLEDGE CHECK (Rapid-Fire Micro Rounds)        */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep.stage === "KNOWLEDGE CHECK" && (
            <div className="rounded-2xl bg-white border border-[#DCE7E5] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  STAGE 08 · RAPID-FIRE KNOWLEDGE CHECK
                </span>
                <span className="font-mono text-xs font-bold text-[#0F766E]">+25 XP / Round</span>
              </div>

              <div>
                <h2 className="font-display text-xl font-bold text-[#0B1F2A]">
                  Diagnostic Verification Question
                </h2>
                <p className="text-xs sm:text-sm text-[#587078] mt-1">
                  Why did the original calculation `price - discount / 100` fail in memory?
                </p>
              </div>

              <div className="space-y-3">
                {[
                  { text: "Division `/` has higher operator precedence than subtraction `-`.", correct: true },
                  { text: "Python integers cannot be divided by floats in standard runtime.", correct: false },
                  { text: "Memory allocation garbage collector cleared the variable early.", correct: false },
                ].map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (opt.correct) {
                        awardXP(25, "Round Cleared (+25 XP)");
                        setRapidFireScore((s) => s + 1);
                        advanceToStage(8, 25);
                      } else {
                        setPlayerEnergy((e) => Math.max(1, e - 1));
                        toast.error("Review operator precedence rules!");
                      }
                    }}
                    className="w-full p-4 rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] hover:border-[#0F766E] text-left text-xs font-semibold text-[#0B1F2A] transition cursor-pointer"
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* STAGE 09: BOSS CHALLENGE (Build The System)                */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep.stage === "MASTERY" && (
            <div className="rounded-2xl bg-white border border-[#DCE7E5] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-extrabold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full">
                    ⚔ FINAL CHALLENGE · BUILD THE SYSTEM
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs text-[#0F766E] font-bold">
                  <span>TIME: 08:42</span>
                  <span>HINTS: 3</span>
                  <span>XP: +350</span>
                </div>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-[#0B1F2A]">
                  Boss Fight: Synthesize Complete Defensive Architecture
                </h2>
                <p className="text-xs sm:text-sm text-[#587078] mt-1">
                  No tutorial. No hand-holding. Combine everything learned in {currentModuleData.title}:
                </p>
              </div>

              <div className="rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-[#0B1F2A]">
                  <span>VERIFICATION OBJECTIVES</span>
                  <span className="font-mono text-[#0F766E]">2 / 5 Passed</span>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-slate-600">
                  <span className="text-[#16A34A] font-semibold">✓ Input validation &amp; type trapping</span>
                  <span className="text-[#16A34A] font-semibold">✓ Percentage arithmetic normalization</span>
                  <span>□ Bounded loop iterations</span>
                  <span>□ Structured JSON logging</span>
                  <span>□ Final test suite execution</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  onClick={() => advanceToStage(9, 200)}
                  className="h-12 px-8 rounded-xl bg-[#0F766E] hover:bg-[#0d655e] text-white font-bold text-xs gap-2 cursor-pointer shadow-md"
                >
                  <Trophy className="size-4 text-amber-300" />
                  <span>Verify Mastery &amp; Complete Mission (+200 XP)</span>
                </Button>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* STAGE 10: MISSION COMPLETE & LEVEL UP                       */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {currentStep.stage === "NEXT" && (
            <div className="rounded-2xl bg-white border border-[#DCE7E5] p-6 sm:p-10 space-y-8 text-center shadow-md">
              <div className="size-20 rounded-3xl bg-[#CCFBF1] text-[#0F766E] mx-auto grid place-items-center shadow-inner">
                <Trophy className="size-10" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <span className="font-mono text-xs font-bold text-[#0F766E] uppercase tracking-wider">
                  MISSION COMPLETE · 100% OBJECTIVES VERIFIED
                </span>
                <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1F2A] tracking-tight">
                  ⭐ LEVEL UP! ⭐
                </h1>
                <p className="font-mono text-sm font-bold text-[#14B8A6]">
                  PYTHON LEVEL 4 → LEVEL 5
                </p>
                <p className="text-xs sm:text-sm text-[#587078] leading-relaxed">
                  You have successfully unmasked the anomalous logic, defended the arithmetic invariants, survived the Break Test, and restored system integrity.
                </p>
              </div>

              {/* Master Badge Card */}
              <div className="max-w-md mx-auto rounded-2xl border border-[#DCE7E5] bg-[#F7FAFA] p-6 text-left space-y-3">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-2xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center text-xl">
                    🏆
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold text-[#0B1F2A]">
                      PYTHON FOUNDATIONS MASTER
                    </h3>
                    <p className="text-[11px] text-[#587078]">Earned Today · Mastery Score: 92%</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#DCE7E5] text-[11px] text-[#587078] flex flex-wrap gap-1.5">
                  <span className="bg-white border border-[#DCE7E5] px-2 py-0.5 rounded">✓ Variables</span>
                  <span className="bg-white border border-[#DCE7E5] px-2 py-0.5 rounded">✓ Control Flow</span>
                  <span className="bg-white border border-[#DCE7E5] px-2 py-0.5 rounded">✓ Functions</span>
                  <span className="bg-white border border-[#DCE7E5] px-2 py-0.5 rounded">✓ Defensive Code</span>
                </div>
              </div>

              {/* New Area Unlocked Notice */}
              <div className="max-w-md mx-auto rounded-xl bg-[#E6F7F5] border border-[#0F766E]/30 p-4 text-xs text-[#0F766E]">
                <p className="font-bold">NEW AREA UNLOCKED: FUNCTIONS &amp; AI APIS</p>
                <p className="text-[#334E57] mt-0.5">Ready to build reusable AI gateways and models?</p>
              </div>

              {/* Enter Next Mission CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  onClick={() => {
                    const currentIdx = curriculumModules.findIndex((m) => m.code === moduleId);
                    const nextMod = curriculumModules[currentIdx + 1] || curriculumModules[0]!;
                    navigate({
                      to: "/learning-mode",
                      search: { module: nextMod.code },
                    });
                  }}
                  className="h-12 px-8 rounded-xl bg-[#0F766E] hover:bg-[#0d655e] text-white font-bold text-xs gap-2 shadow-sm cursor-pointer"
                >
                  <span>[ ENTER NEXT MISSION → ]</span>
                  <ArrowRight className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setViewMode("WORLD_MAP")}
                  className="h-12 px-6 rounded-xl border-[#DCE7E5] text-[#587078] hover:bg-[#F0F5F4] text-xs font-semibold cursor-pointer"
                >
                  Back to World Map
                </Button>
              </div>
            </div>
          )}
        </main>

        {/* ── RIGHT COLUMN (LG: 4 Cols): OBJECTIVES, SIDE QUESTS, ACHIEVEMENTS ── */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Mission Objectives Checklist */}
          <div className="rounded-2xl bg-white border border-[#DCE7E5] p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-2.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#587078]">
                MISSION OBJECTIVES
              </span>
              <span className="font-mono text-xs font-bold text-[#0F766E]">
                {completedObjectivesCount} / {objectives.length}
              </span>
            </div>

            <div className="space-y-2">
              {objectives.map((obj) => (
                <div
                  key={obj.id}
                  className={`flex items-start gap-2.5 p-2 rounded-lg text-xs transition-all ${
                    obj.done
                      ? "bg-[#F0FDF4] text-[#16A34A] font-semibold"
                      : "text-slate-600"
                  }`}
                >
                  <span className="mt-0.5">
                    {obj.done ? (
                      <CheckCircle2 className="size-4 text-[#16A34A]" />
                    ) : (
                      <span className="size-4 rounded-xs border border-slate-300 block" />
                    )}
                  </span>
                  <span className={obj.done ? "line-through opacity-80" : ""}>{obj.label}</span>
                </div>
              ))}
            </div>

            {completedObjectivesCount === objectives.length && (
              <div className="p-2.5 rounded-xl bg-[#CCFBF1] text-[#0F766E] text-center font-mono text-xs font-bold animate-in fade-in">
                MISSION READY FOR MASTERY
              </div>
            )}
          </div>

          {/* Optional Side Quests */}
          <div className="rounded-2xl bg-white border border-[#DCE7E5] p-5 space-y-3.5 shadow-xs">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#587078] block">
              OPTIONAL SIDE QUESTS
            </span>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0B1F2A]">🐛 Bug Hunter Quest</span>
                  <span className="font-mono text-[#0F766E] font-bold">+50 XP</span>
                </div>
                <p className="text-[11px] text-[#587078]">
                  Can you make the calculator handle a 100% discount cleanly?
                </p>
              </div>

              <div className="p-3 rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0B1F2A]">⚡ Speed Run Quest</span>
                  <span className="font-mono text-[#0F766E] font-bold">+75 XP</span>
                </div>
                <p className="text-[11px] text-[#587078]">
                  Solve a challenge without using any progressive hints.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ── TOOLKIT DRAWER MODAL ── */}
      {toolkitOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🧰</span>
                  <div>
                    <h3 className="font-display text-base font-bold text-[#0B1F2A]">Learner Toolkit</h3>
                    <p className="text-[10px] text-[#84979D]">Collected conceptual tools</p>
                  </div>
                </div>
                <button
                  onClick={() => setToolkitOpen(false)}
                  className="size-8 rounded-lg hover:bg-[#F0F5F4] flex items-center justify-center text-slate-500 cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              <div className="space-y-3">
                {DEFAULT_TOOLKIT.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedToolkitItem(item)}
                    className="p-3.5 rounded-xl border border-[#DCE7E5] hover:border-[#0F766E] bg-[#F7FAFA] transition cursor-pointer space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#0B1F2A] flex items-center gap-2">
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </span>
                      <span className="text-[10px] font-mono text-[#0F766E] font-bold uppercase">
                        {item.unlockedAt}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#587078] line-clamp-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {selectedToolkitItem && (
              <div className="mt-4 rounded-xl bg-[#0B1F2A] text-slate-200 p-4 font-mono text-xs space-y-2 border border-white/10">
                <div className="flex items-center justify-between text-[#14B8A6] font-bold text-[10px]">
                  <span>{selectedToolkitItem.name.toUpperCase()} REFERENCE</span>
                  <button onClick={() => setSelectedToolkitItem(null)} className="text-white hover:text-red-400">✕</button>
                </div>
                <pre className="text-[11px] leading-5">{selectedToolkitItem.codeSnippet}</pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── PLAYER PROFILE MODAL ── */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 space-y-5 shadow-2xl border border-[#DCE7E5]">
            <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
              <h3 className="font-display text-base font-bold text-[#0B1F2A]">Player Profile</h3>
              <button onClick={() => setProfileOpen(false)} className="text-slate-400 hover:text-[#0B1F2A] cursor-pointer">
                <X className="size-4" />
              </button>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="size-14 rounded-2xl bg-[#CCFBF1] text-[#0F766E] flex items-center justify-center font-display font-extrabold text-xl">
                R
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-[#0B1F2A]">ROHAN</h4>
                <p className="font-mono text-xs text-[#0F766E] font-bold">LEVEL 12 · 8,420 XP</p>
                <p className="text-[11px] text-slate-500">🔥 7 Day Streak · 14 Achievements</p>
              </div>
            </div>

            {/* Skill XP Breakdown */}
            <div className="space-y-2.5 pt-2 border-t border-[#DCE7E5]">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#587078] block">
                SKILL MASTERY BREAKDOWN
              </span>
              {[
                { name: "Python", pct: 82 },
                { name: "Problem Solving", pct: 70 },
                { name: "Debugging", pct: 48 },
                { name: "AI Invariants", pct: 20 },
              ].map((skill) => (
                <div key={skill.name} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>{skill.name}</span>
                    <span className="font-mono text-[#0F766E]">{skill.pct} XP</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-[#0F766E] rounded-full" style={{ width: `${skill.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-[#F0F5F4] border border-[#DCE7E5] text-xs">
              <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#587078] block">
                CURRENT QUEST
              </span>
              <p className="font-bold text-[#0B1F2A] mt-0.5">Build your first RAG system</p>
            </div>
          </div>
        </div>
      )}

      {/* ── FLOATING SOCRATIC AI GAME GUIDE BUTTON & DRAWER ── */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setGuideOpen(true)}
          className="h-12 px-5 rounded-full bg-[#0F766E] hover:bg-[#0B1F2A] text-white font-bold text-xs shadow-2xl flex items-center gap-2 border border-[#14B8A6]/40 cursor-pointer transition-all"
        >
          <Bot className="size-4.5 text-[#CCFBF1]" />
          <span>✦ Game Guide</span>
        </Button>
      </div>

      {guideOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between animate-in slide-in-from-right duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
                <div className="flex items-center gap-2">
                  <Bot className="size-5 text-[#0F766E]" />
                  <div>
                    <h3 className="font-bold text-sm text-[#0B1F2A]">Socratic Game Guide</h3>
                    <p className="text-[10px] text-[#84979D]">Diagnostic scaffolding</p>
                  </div>
                </div>
                <button onClick={() => setGuideOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                  <X className="size-4" />
                </button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {guideChat.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl text-xs leading-relaxed ${
                      m.role === "user"
                        ? "bg-[#CCFBF1] text-[#0B1F2A] ml-6"
                        : "bg-[#F7FAFA] border border-[#DCE7E5] text-[#334E57] mr-4"
                    }`}
                  >
                    <p className="text-[9px] font-bold uppercase tracking-wider text-[#0F766E] mb-1">
                      {m.role === "user" ? "You" : "Game Guide"}
                    </p>
                    <p>{m.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleAskGuide} className="pt-3 border-t border-[#DCE7E5] flex gap-2">
              <input
                type="text"
                value={guideInput}
                onChange={(e) => setGuideInput(e.target.value)}
                placeholder="Ask about this challenge..."
                className="flex-1 rounded-xl bg-[#F0F5F4] px-3.5 py-2 text-xs text-[#0B1F2A] outline-none border border-transparent focus:border-[#0F766E]"
              />
              <Button type="submit" size="sm" className="bg-[#0F766E] text-white px-3.5 h-9 rounded-xl cursor-pointer">
                <Send className="size-3.5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

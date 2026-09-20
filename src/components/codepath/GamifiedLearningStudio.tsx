import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
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
  Cpu,
  FileCode,
  Flame,
  FolderTree,
  HelpCircle,
  Laptop,
  Lightbulb,
  Lock,
  Network,
  Play,
  RefreshCw,
  RotateCcw,
  Send,
  ShieldAlert,
  ShieldCheck,
  Sliders,
  Sparkles,
  Star,
  Swords,
  Terminal,
  Trophy,
  User,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  QUEST_WORLDS,
  INITIAL_KNOWLEDGE_INVENTORY,
  type QuestWorld,
  type QuestLandmark,
  type KnowledgeItem,
} from "@/lib/ai-quest-data";
import { recordLearningEvidence } from "@/lib/learning-progress";

export function GamifiedLearningStudio({
  moduleId = "3.2",
}: {
  moduleId?: string;
  concept?: string;
  stepIndex?: number;
  onNavigateHome?: () => void;
}) {
  const navigate = useNavigate();

  // ── 1. ACTIVE WORLD & NAVIGATION ──
  const initialWorldId = moduleId === "3.3" ? "world-02" : "world-01";
  const [currentWorldId, setCurrentWorldId] = useState<"world-01" | "world-02" | "world-03">(initialWorldId);

  const activeWorld = QUEST_WORLDS.find((w) => w.id === currentWorldId) || QUEST_WORLDS[0]!;

  // Game Mode: "MAP" | "MISSION"
  const [gameMode, setGameMode] = useState<"MAP" | "MISSION">("MAP");
  const [activeLandmark, setActiveLandmark] = useState<QuestLandmark>(activeWorld.landmarks[0]!);

  // ── 2. PLAYER IDENTITY & STATS ──
  const [playerXP, setPlayerXP] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("ai_quest_xp");
      return saved ? parseInt(saved, 10) : 2840;
    }
    return 2840;
  });
  const [playerLevel, setPlayerLevel] = useState<number>(7);
  const [playerStreak, setPlayerStreak] = useState<number>(4);
  const [playerEnergy, setPlayerEnergy] = useState<number>(8); // 8/10 pips

  // Floating XP Notifications
  const [xpToasts, setXpToasts] = useState<Array<{ id: string; amount: number; label: string }>>([]);

  const triggerXP = (amount: number, label: string) => {
    setPlayerXP((prev) => {
      const next = prev + amount;
      if (typeof window !== "undefined") {
        localStorage.setItem("ai_quest_xp", String(next));
      }
      return next;
    });
    const item = { id: `${Date.now()}-${Math.random()}`, amount, label };
    setXpToasts((prev) => [...prev, item]);
    setTimeout(() => {
      setXpToasts((prev) => prev.filter((t) => t.id !== item.id));
    }, 2000);
    recordLearningEvidence({ sectionsCompleted: 1 });
  };

  // ── 3. KNOWLEDGE INVENTORY ──
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>(INITIAL_KNOWLEDGE_INVENTORY);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [selectedKnowledgeItem, setSelectedKnowledgeItem] = useState<KnowledgeItem | null>(null);

  // ── 4. IN-WORLD NPC GUIDE: ✦ NOVA ──
  const [novaOpen, setNovaOpen] = useState(false);
  const [novaMessages, setNovaMessages] = useState<Array<{ role: "user" | "nova"; text: string }>>([
    {
      role: "nova",
      text: "Greetings, Engineer! I am NOVA, your system guide. I will help you trace memory, inspect boundaries, and construct AI architectures. What are you investigating?",
    },
  ]);
  const [novaInput, setNovaInput] = useState("");

  const handleAskNova = (actionType: "THINK" | "HINT" | "SHOW_ME") => {
    let reply = "";
    if (actionType === "THINK") {
      reply = "Consider: What invariant does this system assume about incoming data types before execution?";
    } else if (actionType === "HINT") {
      reply = "Look at the operator precedence order or the data shape. Notice which operand is evaluated first in memory.";
    } else {
      reply = "Here is the verified pattern: always validate types and wrap arithmetic with explicit grouping parentheses.";
    }
    setNovaMessages((prev) => [
      ...prev,
      { role: "user", text: `[REQUEST: ${actionType}]` },
      { role: "nova", text: reply },
    ]);
  };

  // ═══════════════════════════════════════════════════════════════════════
  // MISSION 01 INTERACTIVE STATES: COMMAND CAMP & VALUE VALLEY
  // ═══════════════════════════════════════════════════════════════════════
  const [inspectedCustomerField, setInspectedCustomerField] = useState<string | null>(null);
  const [predictAgeChoice, setPredictAgeChoice] = useState<number | null>(null);
  const [predictAgeRevealed, setPredictAgeRevealed] = useState(false);
  const [sandboxValue, setSandboxValue] = useState(20);
  const [sandboxMultiplier, setSandboxMultiplier] = useState(5);

  // ═══════════════════════════════════════════════════════════════════════
  // MISSION 02: THE DECISION GATE (SECURITY DOOR)
  // ═══════════════════════════════════════════════════════════════════════
  const [doorTestAge, setDoorTestAge] = useState<number>(17);
  const isDoorUnlocked = doorTestAge >= 18;

  // ═══════════════════════════════════════════════════════════════════════
  // MISSION 03: THE LOOP LAB (ROBOT BATCH PROCESSOR)
  // ═══════════════════════════════════════════════════════════════════════
  const [robotRecords, setRobotRecords] = useState([
    { id: 101, name: "Customer Alpha", status: "QUEUED" },
    { id: 102, name: "Customer Beta", status: "QUEUED" },
    { id: 103, name: "Customer Gamma", status: "QUEUED" },
    { id: 104, name: "Customer Delta", status: "QUEUED" },
    { id: 105, name: "Customer Epsilon", status: "QUEUED" },
  ]);
  const [isRobotLoopRunning, setIsRobotLoopRunning] = useState(false);
  const [robotLoopCompleted, setRobotLoopCompleted] = useState(false);

  const runRobotBatchLoop = () => {
    setIsRobotLoopRunning(true);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < 5) {
        setRobotRecords((prev) =>
          prev.map((rec, i) => (i === idx ? { ...rec, status: "PROCESSED ✓" } : rec))
        );
        idx++;
      } else {
        clearInterval(interval);
        setIsRobotLoopRunning(false);
        setRobotLoopCompleted(true);
        triggerXP(40, "Batch Loop Executed");
      }
    }, 350);
  };

  // ═══════════════════════════════════════════════════════════════════════
  // MISSION 04: THE FUNCTION FORGE (INTERACTIVE BUILDER)
  // ═══════════════════════════════════════════════════════════════════════
  const [funcName, setFuncName] = useState("calculate_discount");
  const [funcParams, setFuncParams] = useState("price, discount_rate=0.20");
  const [funcReturnExpr, setFuncReturnExpr] = useState("price * (1.0 - discount_rate)");
  const [forgeTestPrice, setForgeTestPrice] = useState(100);
  const [forgeOutput, setForgeOutput] = useState<number | null>(null);

  // ═══════════════════════════════════════════════════════════════════════
  // MISSION 05: DATA VAULT (STRUCTURE SELECTOR)
  // ═══════════════════════════════════════════════════════════════════════
  const [dataVaultAnswers, setDataVaultAnswers] = useState<Record<string, string>>({});

  // ═══════════════════════════════════════════════════════════════════════
  // MISSION 06: FILE TERMINAL (/data FILESYSTEM)
  // ═══════════════════════════════════════════════════════════════════════
  const [activeFile, setActiveFile] = useState<"customers.json" | "errors.log" | "report.txt">("customers.json");
  const [fileSystemLogs, setFileSystemLogs] = useState<string[]>([
    "INFO 2026-09-20T23:50:00Z: /data volume mounted successfully.",
  ]);

  // ═══════════════════════════════════════════════════════════════════════
  // MISSION 07: JSON CORE (GLOWING TREE & REPAIR)
  // ═══════════════════════════════════════════════════════════════════════
  const [jsonNavPath, setJsonNavPath] = useState<string[]>(["user"]);
  const [jsonSyntaxFixed, setJsonSyntaxFixed] = useState(false);

  // ═══════════════════════════════════════════════════════════════════════
  // MISSION 08: ENVIRONMENT LAB (VENV & PIP)
  // ═══════════════════════════════════════════════════════════════════════
  const [envStep, setEnvStep] = useState<1 | 2 | 3 | 4>(1);

  // ═══════════════════════════════════════════════════════════════════════
  // WORLD 01 BOSS: THE BROKEN AI PIPELINE (6 PHASES)
  // ═══════════════════════════════════════════════════════════════════════
  const [pythonBossPhase, setPythonBossPhase] = useState<number>(1);
  const [pythonBossHP, setPythonBossHP] = useState<number>(600); // 100 per phase
  const pythonBossPhases = [
    { num: 1, label: "Read customers.json file safely with pathlib and json.loads", dmg: 100 },
    { num: 2, label: "Filter active customers with balance > 0 using list comprehension", dmg: 100 },
    { num: 3, label: "Calculate discounted net amounts with defensive pure function", dmg: 100 },
    { num: 4, label: "Trap missing key and TypeError exceptions without crashing", dmg: 100 },
    { num: 5, label: "Write formatted report.txt and append diagnostic audit log", dmg: 100 },
    { num: 6, label: "Freeze isolated dependencies into requirements.txt", dmg: 100 },
  ];

  // ═══════════════════════════════════════════════════════════════════════
  // WORLD 02 MISSIONS (AI ORIGIN)
  // ═══════════════════════════════════════════════════════════════════════
  // Mission 01: AI Classifier
  const [aiClassifierAnswers, setAiClassifierAnswers] = useState<Record<string, "AI" | "RULE_BASED">>({});

  // Mission 02: Model Forge (ML vs DL vs GenAI)
  const [modelForgeAnswers, setModelForgeAnswers] = useState<Record<string, "ML" | "DL" | "GenAI">>({});

  // Mission 03: Neural Lab (Weight tuning)
  const [neuralWeight, setNeuralWeight] = useState<number>(0.8);
  const neuralLoss = Math.abs(neuralWeight - 0.25).toFixed(3);

  // Mission 04: LLM Core (Next-Token Prediction)
  const [llmTokenPrompt] = useState("The AI engineer deployed the reliable");
  const [selectedNextToken, setSelectedNextToken] = useState<string | null>(null);

  // Mission 05: Token Chamber & Context Window
  const [docTokenCount, setDocTokenCount] = useState<number>(4000);
  const contextCapacity = 8192;

  // Mission 06: Failure Lab
  const [failureDiagnosis, setFailureDiagnosis] = useState<Record<string, string>>({});

  // WORLD 02 BOSS: THE AI ARCHITECT
  const [aiArchitectChoice, setAiArchitectChoice] = useState<"ML" | "LLM" | "RAG" | "AGENT" | null>(null);
  const [aiArchitectSubmitted, setAiArchitectSubmitted] = useState(false);

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER VIEW: WORLD MAP SCREEN
  // ═══════════════════════════════════════════════════════════════════════
  if (gameMode === "MAP") {
    return (
      <div className="min-h-screen bg-[#071522] text-slate-100 flex flex-col font-sans relative overflow-hidden">
        {/* Floating XP Toasts */}
        <div className="fixed top-16 right-6 z-50 pointer-events-none flex flex-col gap-2 items-end">
          {xpToasts.map((toast) => (
            <div
              key={toast.id}
              className="flex items-center gap-2 rounded-xl bg-[#0D2233] border border-[#14B8A6] px-4 py-2 text-white shadow-2xl animate-in slide-in-from-top-4 duration-300"
            >
              <Zap className="size-4 text-[#14B8A6] fill-current" />
              <span className="font-mono text-sm font-extrabold text-[#14B8A6]">+{toast.amount} XP</span>
              <span className="text-xs text-slate-300 font-semibold">{toast.label}</span>
            </div>
          ))}
        </div>

        {/* Minimal Game Top Bar */}
        <header className="relative z-10 border-b border-white/10 bg-[#0D2233]/90 backdrop-blur-md px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-[#14B8A6]/20 border border-[#14B8A6]/40 flex items-center justify-center text-xl shadow-lg">
              ⚔️
            </div>
            <div>
              <span className="font-mono text-[10px] font-bold text-[#14B8A6] tracking-widest block uppercase">
                THE AI QUEST
              </span>
              <h1 className="font-display text-sm font-bold text-white tracking-wide">
                {activeWorld.name} · {activeWorld.title}
              </h1>
            </div>
          </div>

          {/* World Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#071522] border border-white/10">
            {QUEST_WORLDS.map((world) => {
              const isSelected = world.id === currentWorldId;
              return (
                <button
                  key={world.id}
                  disabled={!world.isUnlocked}
                  onClick={() => {
                    setCurrentWorldId(world.id);
                    setActiveLandmark(world.landmarks[0]!);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-[#14B8A6] text-[#071522] shadow-md"
                      : world.isUnlocked
                      ? "text-slate-300 hover:text-white hover:bg-white/5"
                      : "text-slate-600 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <span>{world.title}</span>
                  {!world.isUnlocked && <Lock className="size-3" />}
                </button>
              );
            })}
          </div>

          {/* Player Stats */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setInventoryOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#071522] border border-white/10 text-xs font-mono text-[#14B8A6] hover:border-[#14B8A6] cursor-pointer"
            >
              <span>🧰</span>
              <span>MY KNOWLEDGE</span>
            </button>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#071522] border border-white/10 text-xs font-mono">
              <span className="size-2 rounded-full bg-[#14B8A6] animate-pulse" />
              <span className="font-bold text-white">ROHAN</span>
              <span className="text-amber-400 font-bold">⭐ {playerXP.toLocaleString()} XP</span>
            </div>
          </div>
        </header>

        {/* Adventure Journey World Map Canvas */}
        <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full p-6 sm:p-10 flex flex-col items-center justify-center">
          <div className="text-center space-y-1 mb-8">
            <span className="text-[11px] font-mono font-bold text-[#14B8A6] uppercase tracking-wider">
              {activeWorld.subtitle}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              {activeWorld.tagline}
            </h2>
          </div>

          {/* Curved Landmark Node Path */}
          <div className="w-full max-w-xl space-y-3 relative">
            <div className="absolute left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-[#14B8A6] via-[#0F766E] to-slate-700 opacity-40 z-0" />

            {activeWorld.landmarks.map((node) => {
              const isBoss = node.status === "BOSS";
              return (
                <div
                  key={node.id}
                  onClick={() => {
                    setActiveLandmark(node);
                    setGameMode("MISSION");
                  }}
                  className={`relative z-10 p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    isBoss
                      ? "bg-[#1A0F13] border-amber-500/50 hover:border-amber-400 shadow-lg"
                      : "bg-[#0D2233] border-white/10 hover:border-[#14B8A6] hover:scale-[1.01]"
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`size-11 rounded-xl flex items-center justify-center text-xl border ${
                        isBoss
                          ? "bg-amber-950/40 border-amber-500 text-amber-300"
                          : "bg-[#071522] border-white/10 text-white"
                      }`}
                    >
                      {node.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#14B8A6]">
                          {node.label}
                        </span>
                        {isBoss && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold uppercase">
                            FINAL BOSS
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-sm font-bold text-white mt-0.5">
                        {node.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-1">{node.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end shrink-0 font-mono text-xs">
                    <span className="text-amber-400 font-bold">+{node.xpReward} XP</span>
                    <span className="text-[#14B8A6] text-[10px] flex items-center gap-1 mt-1">
                      ENTER <ChevronRight className="size-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER VIEW: PLAYABLE MISSION CANVAS
  // ═══════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-[#071522] text-slate-100 flex flex-col font-sans relative">
      {/* Top Game HUD */}
      <header className="border-b border-white/10 bg-[#0D2233] px-6 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setGameMode("MAP")}
            className="px-2.5 py-1 rounded-lg bg-[#071522] text-slate-300 hover:text-white font-mono text-xs flex items-center gap-1.5 cursor-pointer border border-white/10"
          >
            <ArrowLeft className="size-3.5" /> World Map
          </button>
          <span className="text-white/20">|</span>
          <span className="font-mono text-xs text-[#14B8A6] font-bold">
            {activeWorld.title} · {activeLandmark.label}
          </span>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <span className="text-red-400">❤️ ENERGY {playerEnergy}/10</span>
          <span className="text-[#14B8A6] font-bold">⭐ {playerXP.toLocaleString()} XP</span>
          <button
            onClick={() => setNovaOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#14B8A6]/20 text-[#14B8A6] border border-[#14B8A6]/40 cursor-pointer text-xs font-bold"
          >
            <Bot className="size-3.5" /> ✦ NOVA
          </button>
        </div>
      </header>

      {/* Main Playable Arena */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-6 space-y-6">
        {/* ═══════════════════════════════════════════════════════════ */}
        {/* WORLD 01: MISSION 01 — COMMAND CAMP & VALUE VALLEY          */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {activeLandmark.missionType === "INSPECT_PREDICT" && (
          <div className="rounded-3xl bg-[#0D2233] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#14B8A6] font-bold uppercase">
                  MISSION 01 · THE LANGUAGE OF MACHINES
                </span>
                <h2 className="font-display text-xl font-bold text-white mt-1">
                  Customer Record Type Inspection &amp; Operators
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">+100 XP REWARD</span>
            </div>

            {/* Inspect Mechanic */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-slate-300 block">
                1. INSPECT MODE: Click each field in the incoming record to analyze its memory type:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                {[
                  { field: "name", val: '"Rohan"', type: "str (String)", expl: "Text sequence for names and prompt instructions." },
                  { field: "age", val: "21", type: "int (Integer)", expl: "Whole number count for index positions and counters." },
                  { field: "active", val: "True", type: "bool (Boolean)", expl: "Binary flag used to gate control flow conditions." },
                  { field: "balance", val: "450.50", type: "float (Float)", expl: "Floating-point precision for currency and token costs." },
                ].map((item) => (
                  <button
                    key={item.field}
                    onClick={() => {
                      setInspectedCustomerField(`${item.field}: ${item.type} — ${item.expl}`);
                      triggerXP(10, `Inspected ${item.field}`);
                    }}
                    className="p-3.5 rounded-xl border border-white/10 bg-[#071522] hover:border-[#14B8A6] text-left transition cursor-pointer"
                  >
                    <span className="text-slate-400 text-[10px] uppercase block">{item.field}</span>
                    <span className="font-bold text-white mt-0.5 block">{item.val}</span>
                  </button>
                ))}
              </div>

              {inspectedCustomerField && (
                <div className="p-3 rounded-xl bg-[#071522] border border-[#14B8A6]/40 text-xs font-mono text-[#14B8A6] animate-in fade-in">
                  💡 {inspectedCustomerField}
                </div>
              )}
            </div>

            {/* Prediction Encounter */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="text-xs font-mono text-slate-300 block">
                2. PREDICTION ENCOUNTER: What will the variable `age` become after these statements?
              </span>

              <pre className="p-3.5 rounded-xl bg-[#071522] border border-white/10 font-mono text-xs text-slate-200">
                {`age = 20\nage = age + 1`}
              </pre>

              <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                {[19, 20, 21, 99].map((choice) => (
                  <button
                    key={choice}
                    onClick={() => {
                      setPredictAgeChoice(choice);
                      setPredictAgeRevealed(true);
                      if (choice === 21) triggerXP(20, "Correct Prediction");
                    }}
                    className={`p-3 rounded-xl border font-bold transition cursor-pointer ${
                      predictAgeChoice === choice
                        ? choice === 21
                          ? "bg-[#14B8A6] text-[#071522] border-[#14B8A6]"
                          : "bg-red-900/40 text-red-300 border-red-500"
                        : "bg-[#071522] border-white/10 text-white hover:border-[#14B8A6]"
                    }`}
                  >
                    {choice === 99 ? "ERROR" : choice}
                  </button>
                ))}
              </div>

              {predictAgeRevealed && (
                <div className={`p-3 rounded-xl text-xs font-mono ${predictAgeChoice === 21 ? "bg-[#14B8A6]/20 text-[#14B8A6] border border-[#14B8A6]/40" : "bg-amber-900/20 text-amber-300 border border-amber-500/40"}`}>
                  {predictAgeChoice === 21
                    ? "✓ Correct! Variables evaluate the right-hand expression (20 + 1) and re-bind the name to 21."
                    : "Not quite. Python reads the right-hand side first (20 + 1 = 21), then reassigns to age."}
                </div>
              )}
            </div>

            {/* Sandbox Experimenter */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="text-xs font-mono text-slate-300 block">
                3. OPERATOR SANDBOX: Adjust values to test arithmetic scaling:
              </span>

              <div className="grid sm:grid-cols-2 gap-3 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-[#071522] border border-white/10 space-y-1">
                  <label className="text-slate-400 text-[10px]">VALUE: {sandboxValue}</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={sandboxValue}
                    onChange={(e) => setSandboxValue(Number(e.target.value))}
                    className="w-full accent-[#14B8A6]"
                  />
                </div>
                <div className="p-3.5 rounded-xl bg-[#071522] border border-white/10 space-y-1">
                  <label className="text-slate-400 text-[10px]">MULTIPLIER (*): {sandboxMultiplier}</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={sandboxMultiplier}
                    onChange={(e) => setSandboxMultiplier(Number(e.target.value))}
                    className="w-full accent-[#14B8A6]"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#071522] border border-[#14B8A6]/30 flex items-center justify-between font-mono text-xs">
                <span className="text-slate-300">
                  {sandboxValue} * {sandboxMultiplier} = <strong className="text-[#14B8A6] text-base">{sandboxValue * sandboxMultiplier}</strong>
                </span>
                <Button
                  size="sm"
                  onClick={() => triggerXP(20, "Discovered Operator Scaling")}
                  className="bg-[#14B8A6] text-[#071522] font-bold text-xs"
                >
                  Verify Scaling
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <Button
                onClick={() => {
                  triggerXP(50, "Completed Mission 01");
                  setActiveLandmark(activeWorld.landmarks[1]!);
                }}
                className="h-11 px-6 rounded-xl bg-[#14B8A6] hover:bg-[#0d9488] text-[#071522] font-bold text-xs cursor-pointer"
              >
                Proceed to Logic Forest →
              </Button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* WORLD 01: MISSION 02 — THE DECISION GATE (SECURITY DOOR)    */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {activeLandmark.missionType === "DECISION_GATE" && (
          <div className="rounded-3xl bg-[#0D2233] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#14B8A6] font-bold uppercase">
                  MISSION 02 · THE DECISION GATE
                </span>
                <h2 className="font-display text-xl font-bold text-white mt-1">
                  Control Flow &amp; Boolean Guardrails
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">+120 XP REWARD</span>
            </div>

            {/* Interactive Security Door */}
            <div className="rounded-2xl bg-[#071522] border border-white/10 p-6 text-center space-y-4">
              <div className="size-20 rounded-2xl mx-auto flex items-center justify-center text-4xl border border-white/10 bg-[#0D2233]">
                {isDoorUnlocked ? "🔓" : "🔒"}
              </div>

              <div>
                <span className="font-mono text-xs font-bold text-slate-400 uppercase">
                  SECURITY GATE STATUS:
                </span>
                <p className={`font-mono text-lg font-bold mt-0.5 ${isDoorUnlocked ? "text-[#14B8A6]" : "text-red-400"}`}>
                  {isDoorUnlocked ? "ACCESS GRANTED (OPEN)" : "ACCESS DENIED (LOCKED)"}
                </p>
              </div>

              {/* Code Gating Visualization */}
              <pre className="p-4 rounded-xl bg-[#0D2233] text-left font-mono text-xs text-slate-200 max-w-md mx-auto">
                {`required_age = 18\n\nif age >= required_age:\n    door_status = "OPEN"\nelse:\n    door_status = "LOCKED"`}
              </pre>

              {/* Age Modifier Buttons */}
              <div className="flex justify-center gap-2 font-mono text-xs">
                {[16, 17, 18, 25].map((age) => (
                  <button
                    key={age}
                    onClick={() => {
                      setDoorTestAge(age);
                      triggerXP(10, `Tested Age: ${age}`);
                    }}
                    className={`px-4 py-2 rounded-xl border font-bold cursor-pointer transition ${
                      doorTestAge === age
                        ? "bg-[#14B8A6] text-[#071522] border-[#14B8A6]"
                        : "bg-[#071522] border-white/10 text-white hover:border-[#14B8A6]"
                    }`}
                  >
                    age = {age}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <Button
                onClick={() => {
                  triggerXP(50, "Cleared Decision Gate");
                  setActiveLandmark(activeWorld.landmarks[2]!);
                }}
                className="h-11 px-6 rounded-xl bg-[#14B8A6] hover:bg-[#0d9488] text-[#071522] font-bold text-xs cursor-pointer"
              >
                Proceed to Loop Lab →
              </Button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* WORLD 01: MISSION 03 — THE LOOP LAB (ROBOT STATION)         */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {activeLandmark.missionType === "ROBOT_LOOP" && (
          <div className="rounded-3xl bg-[#0D2233] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#14B8A6] font-bold uppercase">
                  MISSION 03 · THE LOOP LAB
                </span>
                <h2 className="font-display text-xl font-bold text-white mt-1">
                  Batch Iteration Over Customer Records
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">+140 XP REWARD</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              The AI dispatch agent has 5 customer records queued in memory. Instead of copy-pasting identical processing logic 5 times, execute a bounded iterator:
            </p>

            <pre className="p-4 rounded-xl bg-[#071522] border border-white/10 font-mono text-xs text-slate-200">
              {`for record in customer_queue:\n    process_record(record)\n    record.status = "PROCESSED"`}
            </pre>

            {/* Animated Records List */}
            <div className="space-y-2 font-mono text-xs">
              {robotRecords.map((r) => (
                <div
                  key={r.id}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    r.status.includes("PROCESSED")
                      ? "bg-[#14B8A6]/10 border-[#14B8A6] text-[#14B8A6]"
                      : "bg-[#071522] border-white/10 text-slate-400"
                  }`}
                >
                  <span>RECORD #{r.id} · {r.name}</span>
                  <span className="font-bold">{r.status}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Button
                disabled={isRobotLoopRunning || robotLoopCompleted}
                onClick={runRobotBatchLoop}
                className="h-11 px-5 rounded-xl bg-[#14B8A6] hover:bg-[#0d9488] text-[#071522] font-bold text-xs cursor-pointer"
              >
                <Play className="size-4 fill-current mr-1.5" />
                {isRobotLoopRunning ? "Processing Batch Loop..." : robotLoopCompleted ? "Loop Finished ✓" : "Run for Loop"}
              </Button>

              {robotLoopCompleted && (
                <Button
                  onClick={() => {
                    triggerXP(50, "Cleared Loop Lab");
                    setActiveLandmark(activeWorld.landmarks[3]!);
                  }}
                  className="h-11 px-6 rounded-xl bg-[#14B8A6] hover:bg-[#0d9488] text-[#071522] font-bold text-xs cursor-pointer"
                >
                  Proceed to Function Forge →
                </Button>
              )}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* WORLD 01: MISSION 04 — FUNCTION FORGE                       */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {activeLandmark.missionType === "FUNCTION_FORGE" && (
          <div className="rounded-3xl bg-[#0D2233] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#14B8A6] font-bold uppercase">
                  MISSION 04 · FUNCTION FORGE
                </span>
                <h2 className="font-display text-xl font-bold text-white mt-1">
                  Assemble A Pure Reusable Calculation Module
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">+160 XP REWARD</span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-[#071522] border border-white/10 space-y-2">
                <span className="text-[#14B8A6] text-[10px] uppercase font-bold block">
                  FUNCTION CONTRACT SPECIFICATION
                </span>
                <p className="text-slate-300 leading-relaxed">
                  def {funcName}({funcParams}):<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&quot;&quot;&quot;Deduct promotional rate and return clean float.&quot;&quot;&quot;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;return {funcReturnExpr}
                </p>
              </div>

              {/* Interactive Function Runner */}
              <div className="p-4 rounded-xl bg-[#071522] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">TEST INPUT PRICE: ₹{forgeTestPrice}</span>
                  <div className="flex gap-2">
                    {[50, 100, 200].map((val) => (
                      <button
                        key={val}
                        onClick={() => setForgeTestPrice(val)}
                        className={`px-3 py-1 rounded-lg border text-xs cursor-pointer ${forgeTestPrice === val ? "bg-[#14B8A6] text-[#071522] border-[#14B8A6]" : "bg-[#0D2233] border-white/10 text-white"}`}
                      >
                        ₹{val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <Button
                    size="sm"
                    onClick={() => {
                      const net = forgeTestPrice * (1.0 - 0.20);
                      setForgeOutput(net);
                      triggerXP(30, "Function Tested");
                    }}
                    className="bg-[#14B8A6] text-[#071522] font-bold text-xs"
                  >
                    Execute calculate_discount({forgeTestPrice})
                  </Button>
                  {forgeOutput !== null && (
                    <span className="font-bold text-[#14B8A6]">RETURN: ₹{forgeOutput.toFixed(2)}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <Button
                onClick={() => {
                  triggerXP(50, "Cleared Function Forge");
                  setActiveLandmark(activeWorld.landmarks[4]!);
                }}
                className="h-11 px-6 rounded-xl bg-[#14B8A6] hover:bg-[#0d9488] text-[#071522] font-bold text-xs cursor-pointer"
              >
                Proceed to Data Vault →
              </Button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* WORLD 01: MISSION 05 — DATA VAULT (LIST vs SET vs DICT)     */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {activeLandmark.missionType === "DATA_VAULT" && (
          <div className="rounded-3xl bg-[#0D2233] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#14B8A6] font-bold uppercase">
                  MISSION 05 · DATA VAULT
                </span>
                <h2 className="font-display text-xl font-bold text-white mt-1">
                  Choose The Right Structure For The AI Task
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">+180 XP REWARD</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {[
                { id: "q1", task: "Preserve ordered sequence of chat prompt messages", correct: "LIST", options: ["LIST", "SET", "DICT"] },
                { id: "q2", task: "Deduplicate unique model vocabulary tokens", correct: "SET", options: ["LIST", "SET", "DICT"] },
                { id: "q3", task: "Store customer metadata with named key lookup", correct: "DICT", options: ["LIST", "SET", "DICT"] },
              ].map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-[#071522] border border-white/10 space-y-2">
                  <p className="text-slate-200 font-bold">{item.task}</p>
                  <div className="flex gap-2">
                    {item.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setDataVaultAnswers((prev) => ({ ...prev, [item.id]: opt }));
                          if (opt === item.correct) triggerXP(20, "Correct Structure");
                        }}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${
                          dataVaultAnswers[item.id] === opt
                            ? opt === item.correct
                              ? "bg-[#14B8A6] text-[#071522] border-[#14B8A6]"
                              : "bg-red-900/40 text-red-300 border-red-500"
                            : "bg-[#0D2233] border-white/10 text-white hover:border-[#14B8A6]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <Button
                onClick={() => {
                  triggerXP(50, "Cleared Data Vault");
                  setActiveLandmark(activeWorld.landmarks[5]!);
                }}
                className="h-11 px-6 rounded-xl bg-[#14B8A6] hover:bg-[#0d9488] text-[#071522] font-bold text-xs cursor-pointer"
              >
                Proceed to File Terminal →
              </Button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* WORLD 01: MISSION 06 — FILE TERMINAL (/data FILESYSTEM)     */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {activeLandmark.missionType === "FILE_TERMINAL" && (
          <div className="rounded-3xl bg-[#0D2233] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#14B8A6] font-bold uppercase">
                  MISSION 06 · FILE TERMINAL
                </span>
                <h2 className="font-display text-xl font-bold text-white mt-1">
                  Persist History &amp; Handle /data Filesystems
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">+200 XP REWARD</span>
            </div>

            <div className="grid sm:grid-cols-12 gap-4 font-mono text-xs">
              {/* File Tree */}
              <div className="sm:col-span-4 p-4 rounded-xl bg-[#071522] border border-white/10 space-y-2">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">
                  EXPLORER: /data
                </span>
                {(["customers.json", "errors.log", "report.txt"] as const).map((file) => (
                  <button
                    key={file}
                    onClick={() => setActiveFile(file)}
                    className={`w-full p-2.5 rounded-lg text-left flex items-center gap-2 cursor-pointer ${activeFile === file ? "bg-[#14B8A6] text-[#071522] font-bold" : "text-slate-300 hover:bg-white/5"}`}
                  >
                    <FileCode className="size-3.5" />
                    <span>{file}</span>
                  </button>
                ))}
              </div>

              {/* File Content Preview */}
              <div className="sm:col-span-8 p-4 rounded-xl bg-[#071522] border border-white/10 space-y-3">
                <span className="text-[#14B8A6] text-[10px] font-bold block">
                  OPEN: /data/{activeFile}
                </span>
                <pre className="text-slate-200 text-xs leading-relaxed bg-[#0D2233] p-3 rounded-lg border border-white/5 overflow-x-auto">
                  {activeFile === "customers.json" && `[\n  {"id": 1, "name": "Rohan", "balance": 450.50},\n  {"id": 2, "name": "Aarav", "balance": 0.0}\n]`}
                  {activeFile === "errors.log" && `2026-09-20T23:51:00Z WARN: Zero balance customer skipped.\n2026-09-20T23:51:02Z INFO: Pipeline flush complete.`}
                  {activeFile === "report.txt" && `REVENUE REPORT:\nTotal Eligible Customers: 1\nDiscount Billed: ₹360.40`}
                </pre>

                <Button
                  size="sm"
                  onClick={() => {
                    setFileSystemLogs((prev) => [...prev, `Appended record to /data/${activeFile}`]);
                    triggerXP(30, "File Handled");
                  }}
                  className="bg-[#14B8A6] text-[#071522] font-bold text-xs"
                >
                  Append Diagnostic Invariant
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <Button
                onClick={() => {
                  triggerXP(50, "Cleared File Terminal");
                  setActiveLandmark(activeWorld.landmarks[6]!);
                }}
                className="h-11 px-6 rounded-xl bg-[#14B8A6] hover:bg-[#0d9488] text-[#071522] font-bold text-xs cursor-pointer"
              >
                Proceed to JSON Core →
              </Button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* WORLD 01: MISSION 07 — JSON CORE                           */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {activeLandmark.missionType === "JSON_CORE" && (
          <div className="rounded-3xl bg-[#0D2233] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#14B8A6] font-bold uppercase">
                  MISSION 07 · JSON CORE
                </span>
                <h2 className="font-display text-xl font-bold text-white mt-1">
                  Navigate Nested Payloads &amp; Repair Broken JSON
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">+220 XP REWARD</span>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <p className="text-slate-300">
                JSON is the universal lingua franca of LLMs and tool calling. Click into the nested tree structure:
              </p>

              {/* Interactive JSON Tree */}
              <div className="p-4 rounded-xl bg-[#071522] border border-[#14B8A6]/30 space-y-2">
                <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <span>PATH:</span>
                  <span className="text-[#14B8A6] font-bold">payload.{jsonNavPath.join(".")}</span>
                </div>

                <div className="flex gap-2">
                  {["user", "skills", "tokens"].map((key) => (
                    <button
                      key={key}
                      onClick={() => setJsonNavPath(["user", key])}
                      className="px-3 py-1.5 rounded-lg bg-[#0D2233] border border-white/10 hover:border-[#14B8A6] text-white cursor-pointer"
                    >
                      .{key}
                    </button>
                  ))}
                </div>
              </div>

              {/* Broken JSON Puzzle */}
              <div className="p-4 rounded-xl bg-[#071522] border border-white/10 space-y-2">
                <span className="text-red-400 font-bold block">
                  SYNTAX ERROR DETECTED: Missing trailing quote in LLM response!
                </span>
                <pre className="text-slate-300 p-3 rounded-lg bg-[#0D2233] border border-white/5">
                  {jsonSyntaxFixed
                    ? `{\n  "status": "success",\n  "confidence": 0.98\n}`
                    : `{\n  "status": "success,\n  "confidence": 0.98\n}`}
                </pre>

                {!jsonSyntaxFixed ? (
                  <Button
                    size="sm"
                    onClick={() => {
                      setJsonSyntaxFixed(true);
                      triggerXP(40, "Repaired JSON Syntax");
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs"
                  >
                    Install Missing Quote (&quot;) &amp; Validate with json.loads()
                  </Button>
                ) : (
                  <span className="text-[#14B8A6] font-bold">✓ Validated: json.loads() parsed clean dictionary!</span>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <Button
                onClick={() => {
                  triggerXP(50, "Cleared JSON Core");
                  setActiveLandmark(activeWorld.landmarks[7]!);
                }}
                className="h-11 px-6 rounded-xl bg-[#14B8A6] hover:bg-[#0d9488] text-[#071522] font-bold text-xs cursor-pointer"
              >
                Proceed to Environment Lab →
              </Button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* WORLD 01: MISSION 08 — ENVIRONMENT LAB (VENV & PIP)        */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {activeLandmark.missionType === "ENV_LAB" && (
          <div className="rounded-3xl bg-[#0D2233] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#14B8A6] font-bold uppercase">
                  MISSION 08 · ENVIRONMENT LAB
                </span>
                <h2 className="font-display text-xl font-bold text-white mt-1">
                  Virtual Environments &amp; Dependency Pinning
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">+240 XP REWARD</span>
            </div>

            <div className="rounded-2xl bg-[#071522] border border-white/10 p-5 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[10px] uppercase font-bold">WORKSTATION TERMINAL</span>
                <span className="text-[#14B8A6] text-[10px]">STEP {envStep} OF 4</span>
              </div>

              {envStep === 1 && (
                <div className="space-y-2">
                  <p className="text-slate-200">Create isolated interpreter environment:</p>
                  <pre className="p-3 rounded-lg bg-[#0D2233] text-[#14B8A6]">python3 -m venv .venv</pre>
                  <Button
                    size="sm"
                    onClick={() => { setEnvStep(2); triggerXP(20, "venv created"); }}
                    className="bg-[#14B8A6] text-[#071522] font-bold text-xs"
                  >
                    Execute Command
                  </Button>
                </div>
              )}

              {envStep === 2 && (
                <div className="space-y-2">
                  <p className="text-slate-200">Activate isolated environment:</p>
                  <pre className="p-3 rounded-lg bg-[#0D2233] text-[#14B8A6]">source .venv/bin/activate</pre>
                  <Button
                    size="sm"
                    onClick={() => { setEnvStep(3); triggerXP(20, "venv activated"); }}
                    className="bg-[#14B8A6] text-[#071522] font-bold text-xs"
                  >
                    Activate Shell
                  </Button>
                </div>
              )}

              {envStep === 3 && (
                <div className="space-y-2">
                  <p className="text-slate-200">Install pinned AI dependencies:</p>
                  <pre className="p-3 rounded-lg bg-[#0D2233] text-[#14B8A6]">pip install requests==2.31.0 pydantic==2.8.2</pre>
                  <Button
                    size="sm"
                    onClick={() => { setEnvStep(4); triggerXP(30, "packages installed"); }}
                    className="bg-[#14B8A6] text-[#071522] font-bold text-xs"
                  >
                    Install Packages
                  </Button>
                </div>
              )}

              {envStep === 4 && (
                <div className="space-y-2">
                  <p className="text-slate-200">Freeze dependencies to prevent future breakage:</p>
                  <pre className="p-3 rounded-lg bg-[#0D2233] text-[#14B8A6]">pip freeze &gt; requirements.txt</pre>
                  <span className="text-[#14B8A6] font-bold block">✓ requirements.txt frozen and verified!</span>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <Button
                onClick={() => {
                  triggerXP(50, "Cleared Environment Lab");
                  setActiveLandmark(activeWorld.landmarks[8]!);
                }}
                className="h-11 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-[#071522] font-bold text-xs cursor-pointer shadow-lg"
              >
                Enter Final Boss: The Broken AI Pipeline 👑 →
              </Button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* WORLD 01 FINAL BOSS: THE BROKEN AI PIPELINE                */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {activeLandmark.missionType === "PYTHON_BOSS" && (
          <div className="rounded-3xl bg-[#0D2233] border border-amber-500/50 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-amber-400 font-bold uppercase">
                  WORLD 01 CAPSTONE · THE BROKEN AI PIPELINE
                </span>
                <h2 className="font-display text-xl font-bold text-white mt-1">
                  Build The Production CLI Data Pipeline
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">+500 XP MASTERY</span>
            </div>

            {/* Boss Integrity Bar */}
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-amber-400 font-bold">PIPELINE ANOMALY INTEGRITY</span>
                <span className="text-white">{pythonBossHP} / 600 HP</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#071522] overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-red-600 transition-all duration-300 rounded-full"
                  style={{ width: `${(pythonBossHP / 600) * 100}%` }}
                />
              </div>
            </div>

            {/* 6 Phases of the Official Curriculum CLI Practice */}
            <div className="space-y-2 font-mono text-xs">
              {pythonBossPhases.map((phase) => {
                const isCleared = phase.num < pythonBossPhase;
                const isCurrent = phase.num === pythonBossPhase;

                return (
                  <div
                    key={phase.num}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition ${
                      isCleared
                        ? "bg-[#14B8A6]/15 border-[#14B8A6] text-[#14B8A6]"
                        : isCurrent
                        ? "bg-[#071522] border-amber-400 text-white"
                        : "bg-[#071522]/50 border-white/5 text-slate-500"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {isCleared ? <CheckCircle2 className="size-4 text-[#14B8A6]" /> : <span className="size-2 rounded-full bg-amber-400" />}
                      <span>PHASE {phase.num}: {phase.label}</span>
                    </div>

                    {isCurrent && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setPythonBossHP((hp) => Math.max(0, hp - 100));
                          setPythonBossPhase((p) => p + 1);
                          triggerXP(60, `Phase ${phase.num} Cleared`);
                        }}
                        className="bg-amber-500 hover:bg-amber-600 text-[#071522] font-bold text-xs"
                      >
                        Execute Phase
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Boss Cleared -> Unlock World 02 */}
            {pythonBossHP === 0 && (
              <div className="p-5 rounded-2xl bg-[#071522] border border-[#14B8A6] space-y-3 text-center animate-in zoom-in-95">
                <Trophy className="size-10 text-amber-400 mx-auto" />
                <h3 className="font-display text-lg font-bold text-white">
                  👑 PYTHON FOUNDATION MASTERED!
                </h3>
                <p className="text-xs font-mono text-slate-300">
                  Ability Unlocked: <strong>🐍 PYTHON BUILDER</strong>. You have demonstrated programming discipline for AI!
                </p>
                <Button
                  onClick={() => {
                    setCurrentWorldId("world-02");
                    setActiveLandmark(QUEST_WORLDS[1]!.landmarks[0]!);
                    setGameMode("MAP");
                    triggerXP(200, "World 02 Unlocked!");
                  }}
                  className="h-12 px-8 rounded-xl bg-[#14B8A6] hover:bg-[#0d9488] text-[#071522] font-bold text-xs cursor-pointer shadow-lg"
                >
                  Enter World 02: AI ORIGIN 🚀 →
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* WORLD 02: MISSION 01 — INTELLIGENCE LAB (AI CLASSIFIER)     */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {activeLandmark.missionType === "AI_CLASSIFIER" && (
          <div className="rounded-3xl bg-[#0D2233] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#38BDF8] font-bold uppercase">
                  WORLD 02 · INTELLIGENCE LAB
                </span>
                <h2 className="font-display text-xl font-bold text-white mt-1">
                  Classify Systems: Perceive, Decide, and Act
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">+120 XP REWARD</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {[
                { id: "s1", name: "Spam Filter (Statistical Token Scoring)", correct: "AI" },
                { id: "s2", name: "Hard-coded if/else Sales Tax Calculator", correct: "RULE_BASED" },
                { id: "s3", name: "Autonomous Warehouse Sorting Robot", correct: "AI" },
              ].map((sys) => (
                <div key={sys.id} className="p-4 rounded-xl bg-[#071522] border border-white/10 flex items-center justify-between">
                  <span>{sys.name}</span>
                  <div className="flex gap-2">
                    {(["AI", "RULE_BASED"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setAiClassifierAnswers((prev) => ({ ...prev, [sys.id]: opt }));
                          if (opt === sys.correct) triggerXP(20, "Correctly Classified");
                        }}
                        className={`px-3 py-1 rounded-lg border text-xs font-bold cursor-pointer ${
                          aiClassifierAnswers[sys.id] === opt
                            ? opt === sys.correct
                              ? "bg-[#38BDF8] text-[#071522] border-[#38BDF8]"
                              : "bg-red-900/40 text-red-300 border-red-500"
                            : "bg-[#0D2233] border-white/10 text-white"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <Button
                onClick={() => {
                  triggerXP(50, "Cleared Intelligence Lab");
                  setActiveLandmark(activeWorld.landmarks[1]!);
                }}
                className="h-11 px-6 rounded-xl bg-[#38BDF8] hover:bg-[#0284c7] text-[#071522] font-bold text-xs cursor-pointer"
              >
                Proceed to Model Forge →
              </Button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* WORLD 02: MISSION 03 — NEURAL LAB (WEIGHT TUNER)            */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {activeLandmark.missionType === "NEURAL_LAB" && (
          <div className="rounded-3xl bg-[#0D2233] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#38BDF8] font-bold uppercase">
                  WORLD 02 · NEURAL LAB
                </span>
                <h2 className="font-display text-xl font-bold text-white mt-1">
                  Tune Synaptic Weights to Minimize Loss
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">+180 XP REWARD</span>
            </div>

            <div className="rounded-2xl bg-[#071522] border border-white/10 p-6 space-y-5 text-center font-mono text-xs">
              <div className="flex justify-around items-center max-w-sm mx-auto">
                <div className="p-3 rounded-xl bg-[#0D2233] border border-white/10">INPUT [x=1.0]</div>
                <span>──(w={neuralWeight.toFixed(2)})──&gt;</span>
                <div className="p-3 rounded-xl bg-[#0D2233] border border-white/10">NEURON</div>
                <span>──&gt;</span>
                <div className="p-3 rounded-xl bg-[#0D2233] border border-white/10">PRED</div>
              </div>

              <div className="space-y-2 max-w-md mx-auto text-left">
                <label className="text-slate-400 text-[10px] block">ADJUST WEIGHT (w):</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={neuralWeight}
                  onChange={(e) => setNeuralWeight(Number(e.target.value))}
                  className="w-full accent-[#38BDF8]"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#0D2233] border border-white/10 flex justify-between max-w-sm mx-auto font-bold">
                <span>LOSS / ERROR:</span>
                <span className={Number(neuralLoss) < 0.05 ? "text-[#38BDF8]" : "text-red-400"}>
                  {neuralLoss} {Number(neuralLoss) < 0.05 && "✓ CONVERGED!"}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <Button
                onClick={() => {
                  triggerXP(50, "Cleared Neural Lab");
                  setActiveLandmark(activeWorld.landmarks[3]!);
                }}
                className="h-11 px-6 rounded-xl bg-[#38BDF8] hover:bg-[#0284c7] text-[#071522] font-bold text-xs cursor-pointer"
              >
                Proceed to LLM Core →
              </Button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* WORLD 02: MISSION 04 — LLM CORE (NEXT TOKEN PREDICTOR)      */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {activeLandmark.missionType === "LLM_CORE" && (
          <div className="rounded-3xl bg-[#0D2233] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#38BDF8] font-bold uppercase">
                  WORLD 02 · LLM CORE
                </span>
                <h2 className="font-display text-xl font-bold text-white mt-1">
                  Transformers Predict The Next Probabilistic Token
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">+200 XP REWARD</span>
            </div>

            <div className="rounded-2xl bg-[#071522] border border-white/10 p-6 space-y-4 font-mono text-xs">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">
                GENERATION CHAMBER PROMPT STREAM:
              </span>
              <p className="text-base text-slate-200">
                &ldquo;{llmTokenPrompt} <strong className="text-[#38BDF8] underline">{selectedNextToken || "___"}</strong>&rdquo;
              </p>

              <span className="text-[10px] text-slate-400 block pt-2">SELECT HIGHEST PROBABILITY TOKEN:</span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { token: "pipeline", prob: "84%" },
                  { token: "banana", prob: "0.1%" },
                  { token: "volcano", prob: "0.2%" },
                  { token: "elephant", prob: "0.1%" },
                ].map((t) => (
                  <button
                    key={t.token}
                    onClick={() => {
                      setSelectedNextToken(t.token);
                      if (t.token === "pipeline") triggerXP(30, "Next Token Predicted");
                    }}
                    className={`p-3 rounded-xl border text-center transition cursor-pointer ${
                      selectedNextToken === t.token
                        ? "bg-[#38BDF8] text-[#071522] border-[#38BDF8] font-bold"
                        : "bg-[#0D2233] border-white/10 text-white hover:border-[#38BDF8]"
                    }`}
                  >
                    <span className="block font-bold">&quot;{t.token}&quot;</span>
                    <span className="text-[9px] opacity-70 mt-0.5 block">{t.prob}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <Button
                onClick={() => {
                  triggerXP(50, "Cleared LLM Core");
                  setActiveLandmark(activeWorld.landmarks[4]!);
                }}
                className="h-11 px-6 rounded-xl bg-[#38BDF8] hover:bg-[#0284c7] text-[#071522] font-bold text-xs cursor-pointer"
              >
                Proceed to Token Chamber →
              </Button>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════ */}
        {/* WORLD 02 FINAL BOSS: THE AI ARCHITECT                       */}
        {/* ═══════════════════════════════════════════════════════════ */}
        {activeLandmark.missionType === "AI_BOSS" && (
          <div className="rounded-3xl bg-[#0D2233] border border-amber-500/50 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-amber-400 font-bold uppercase">
                  WORLD 02 CAPSTONE · THE AI ARCHITECT
                </span>
                <h2 className="font-display text-xl font-bold text-white mt-1">
                  Enterprise Architecture Specification Brief
                </h2>
              </div>
              <span className="text-xs font-mono text-amber-400 font-bold">+500 XP MASTERY</span>
            </div>

            <div className="p-4 rounded-xl bg-[#071522] border border-white/10 space-y-2 font-mono text-xs">
              <span className="text-amber-400 font-bold block">BUSINESS PROBLEM STATEMENT:</span>
              <p className="text-slate-200 leading-relaxed">
                &ldquo;A legal firm has 10,000 internal PDF contract agreements. They need an assistant that accurately answers partner questions, cites precise paragraphs, and refuses to fabricate answers when information is absent.&rdquo;
              </p>
            </div>

            <div className="space-y-2 font-mono text-xs">
              <span className="text-slate-300 font-bold block">CHOOSE THE OPTIMAL ARCHITECTURE:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(["ML", "LLM", "RAG", "AGENT"] as const).map((arch) => (
                  <button
                    key={arch}
                    onClick={() => {
                      setAiArchitectChoice(arch);
                      if (arch === "RAG") triggerXP(50, "Selected RAG Architecture");
                    }}
                    className={`p-4 rounded-xl border text-center font-bold transition cursor-pointer ${
                      aiArchitectChoice === arch
                        ? arch === "RAG"
                          ? "bg-[#38BDF8] text-[#071522] border-[#38BDF8]"
                          : "bg-red-900/40 text-red-300 border-red-500"
                        : "bg-[#071522] border-white/10 text-white hover:border-[#38BDF8]"
                    }`}
                  >
                    {arch}
                  </button>
                ))}
              </div>

              {aiArchitectChoice === "RAG" && (
                <div className="p-4 rounded-xl bg-[#071522] border border-[#38BDF8] text-xs font-mono text-slate-200 space-y-2 animate-in fade-in">
                  <p className="text-[#38BDF8] font-bold">✓ ARCHITECTURE JUSTIFICATION:</p>
                  <p>
                    RAG (Retrieval-Augmented Generation) connects private documents to generation through vector search, providing exact citations and grounding to prevent hallucination.
                  </p>
                </div>
              )}
            </div>

            {aiArchitectChoice === "RAG" && (
              <div className="pt-4 border-t border-white/10 flex justify-end">
                <Button
                  onClick={() => {
                    triggerXP(200, "Defeated The AI Architect");
                    setAiArchitectSubmitted(true);
                  }}
                  className="h-12 px-8 rounded-xl bg-amber-500 hover:bg-amber-600 text-[#071522] font-bold text-xs cursor-pointer shadow-lg"
                >
                  Verify Capstone Brief &amp; Claim World 02 Mastery 👑
                </Button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* ── KNOWLEDGE INVENTORY MODAL (MY KNOWLEDGE) ── */}
      {inventoryOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-[#0D2233] border border-white/10 rounded-3xl p-6 space-y-5 shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧰</span>
                <h3 className="font-display text-base font-bold text-white">MY KNOWLEDGE INVENTORY</h3>
              </div>
              <button onClick={() => setInventoryOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {knowledgeItems.map((k) => (
                <div
                  key={k.id}
                  onClick={() => setSelectedKnowledgeItem(k)}
                  className="p-3.5 rounded-xl bg-[#071522] border border-white/10 hover:border-[#14B8A6] cursor-pointer flex items-center justify-between transition"
                >
                  <div>
                    <span className="text-[10px] text-[#14B8A6] font-bold uppercase">{k.category} · {k.curriculumRef}</span>
                    <p className="font-bold text-white mt-0.5">{k.title}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#14B8A6]/20 text-[#14B8A6] text-[10px] font-bold">
                    {k.status} ✓
                  </span>
                </div>
              ))}
            </div>

            {selectedKnowledgeItem && (
              <div className="p-3.5 rounded-xl bg-[#071522] border border-white/10 space-y-1.5 text-slate-300">
                <p className="font-bold text-white">{selectedKnowledgeItem.title}</p>
                <p className="text-[11px] text-slate-400">{selectedKnowledgeItem.explanation}</p>
                <pre className="p-2.5 rounded bg-[#0D2233] text-[#14B8A6] text-[11px] overflow-x-auto">
                  {selectedKnowledgeItem.codeSnippet}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── IN-WORLD NPC GUIDE: ✦ NOVA SLIDE-OVER ── */}
      {novaOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-[#0D2233] border-l border-white/10 h-full p-6 flex flex-col justify-between font-mono text-xs animate-in slide-in-from-right duration-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-[#14B8A6]">
                  <Bot className="size-5" />
                  <span className="font-bold text-sm text-white">✦ NOVA (System Guide)</span>
                </div>
                <button onClick={() => setNovaOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                  <X className="size-4" />
                </button>
              </div>

              {/* Socratic Action Deck */}
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleAskNova("THINK")} className="flex-1 bg-[#071522] hover:bg-white/5 border border-white/10 text-xs text-[#14B8A6]">
                  [ THINK ]
                </Button>
                <Button size="sm" onClick={() => handleAskNova("HINT")} className="flex-1 bg-[#071522] hover:bg-white/5 border border-white/10 text-xs text-amber-400">
                  [ HINT ]
                </Button>
                <Button size="sm" onClick={() => handleAskNova("SHOW_ME")} className="flex-1 bg-[#071522] hover:bg-white/5 border border-white/10 text-xs text-white">
                  [ SHOW ME ]
                </Button>
              </div>

              {/* Messages Feed */}
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {novaMessages.map((m, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl leading-relaxed ${
                      m.role === "user" ? "bg-[#071522] text-[#14B8A6] ml-6 border border-white/10" : "bg-[#071522] text-slate-200 mr-4 border border-[#14B8A6]/30"
                    }`}
                  >
                    <span className="text-[9px] uppercase font-bold text-slate-500 block mb-1">
                      {m.role === "user" ? "Player" : "NOVA"}
                    </span>
                    <p>{m.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!novaInput.trim()) return;
                setNovaMessages((prev) => [
                  ...prev,
                  { role: "user", text: novaInput },
                  { role: "nova", text: "Look closely at the data contract and invariant boundaries in this mission." },
                ]);
                setNovaInput("");
              }}
              className="pt-3 border-t border-white/10 flex gap-2"
            >
              <input
                type="text"
                value={novaInput}
                onChange={(e) => setNovaInput(e.target.value)}
                placeholder="Ask NOVA for guidance..."
                className="flex-1 rounded-xl bg-[#071522] border border-white/10 px-3 py-2 text-xs text-white outline-none focus:border-[#14B8A6]"
              />
              <Button type="submit" size="sm" className="bg-[#14B8A6] text-[#071522] px-3">
                <Send className="size-3.5" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

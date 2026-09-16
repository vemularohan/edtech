import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  BrainCircuit,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock,
  Code2,
  Command,
  Compass,
  Database,
  FileText,
  Flame,
  Folder,
  FolderKanban,
  FolderOpen,
  GitBranch,
  GraduationCap,
  Layers3,
  Lightbulb,
  Lock,
  Menu,
  Network,
  Play,
  Plus,
  RotateCcw,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  Sparkle,
  Target,
  Terminal,
  Trophy,
  Upload,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { SpatialCard } from "@/components/ui/SpatialCard";
import {
  codingStarter,
  assessmentQuestions,
  allCurriculumChallenges,
  getChallengeForModule,
  gaps,
  heatmap,
  nodes,
  projectMilestones,
  skillData,
  subjects,
  timeline,
  weekTrend,
} from "@/lib/codepath-data";
import type { CurriculumChallenge } from "@/lib/codepath-data";
import { curriculumModules, displayModuleLabel, PROGRAM, PROGRAM_PHASES, CAREER_ROLES } from "@/lib/curriculum-data";
import { getLearningExperience } from "@/lib/learning-experiences";
import {
  completeLearningModule,
  getLearningProgressSummary,
  recordConceptActivity,
  recordLearningEvidence,
  updateLearningPosition,
  useLearningEvidence,
  useLearningProgress,
} from "@/lib/learning-progress";

type ModuleId = `3.${number}`;

type View =
  | "dashboard"
  | "map"
  | "learning"
  | "tutor"
  | "lab"
  | "challenge"
  | "challenges"
  | "projects"
  | "analytics"
  | "career"
  | "profile"
  | "recovery";

const navItems: { label: string; to: string; icon: typeof Activity }[] = [
  { label: "Home", to: "/dashboard", icon: Compass },
  { label: "Modules", to: "/curriculum", icon: GitBranch },
  { label: "Learn", to: "/learning-mode", icon: BookOpen },
  { label: "Practice", to: "/challenges", icon: Zap },
  { label: "Projects", to: "/build", icon: FolderKanban },
  { label: "Skills", to: "/skills", icon: BarChart3 },
  { label: "Portfolio", to: "/portfolio", icon: UserRound },
  { label: "Careers", to: "/career", icon: Target },
];

const toneMap = { brand: "bg-brand", lilac: "bg-lilac", peach: "bg-peach", mint: "bg-mint" };
const softToneMap = {
  brand: "bg-brand-soft text-brand",
  lilac: "bg-lilac-soft text-lilac",
  peach: "bg-peach-soft text-peach",
  mint: "bg-mint-soft text-mint",
};

function Mark({ compact = false, invert = false }: { compact?: boolean; invert?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`grid size-10 place-items-center rounded-lg font-display text-sm font-bold tracking-tight ${
          invert ? "bg-white/15 text-white" : "bg-primary text-primary-foreground"
        }`}
      >
        GA
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className={`font-display text-base font-semibold ${invert ? "text-white" : "text-foreground"}`}>
            {PROGRAM.name}
          </p>
          <p className={`text-[11px] ${invert ? "text-white/60" : "text-faint"}`}>16-week GenAI program</p>
        </div>
      )}
    </div>
  );
}

function Panel({
  className = "",
  children,
  elevation = "medium",
}: {
  className?: string;
  children: React.ReactNode;
  elevation?: "low" | "medium" | "high";
}) {
  return (
    <section
      className={`spatial-panel min-w-0 p-5 ${className}`}
    >
      {children}
    </section>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold text-primary">
      {children}
    </p>
  );
}
function SectionTitle({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-1 font-display text-lg font-semibold tracking-tight text-foreground/95">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
function StatusPill({ status }: { status: string }) {
  const label = status.replace("-", " ");
  const style =
    status === "mastered"
      ? "bg-mint-soft text-mint border border-mint/25"
      : status === "in-progress"
        ? "bg-brand-soft text-brand border border-brand/25"
        : status === "available"
          ? "bg-lilac-soft text-lilac border border-lilac/25"
          : "bg-muted text-faint border border-border";
  return (
    <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase ${style}`}>
      {label}
    </span>
  );
}
function ProgressBar({
  value,
  tone = "brand",
  className,
}: {
  value: number;
  tone?: keyof typeof toneMap;
  className?: string;
}) {
  return (
    <div className={`h-2.5 overflow-hidden rounded-full bg-foreground/8 border border-border/40 p-[1px] ${className ?? ""}`}>
      <div
        className={`cp-fill h-full rounded-full ${toneMap[tone]} shadow-[0_0_10px_currentColor]`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
function StatCard({
  icon: Icon,
  label,
  value,
  note,
  tone = "brand",
  className,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  note: string;
  tone?: keyof typeof softToneMap;
  className?: string;
}) {
  return (
    <SpatialCard depth={2} elevation="low" interactive={false} className={`rounded-2xl ${className ?? ""}`}>
      <Panel className="p-4">
        <span className={`grid size-9 place-items-center rounded-lg ${softToneMap[tone]}`}>
          <Icon className="size-4" />
        </span>
        <p className="mt-3 text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{note}</p>
      </Panel>
    </SpatialCard>
  );
}

function Shell({ active, children }: { active: View; children: React.ReactNode }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const progress = useLearningProgress();
  const summary = getLearningProgressSummary(progress);
  const activeItem = navItems.find(({ to }) => activePath(active, to));
  const pageTitle = activeItem?.label ?? "AI Skills Track";

  useEffect(() => {
    try {
      setNavOpen(localStorage.getItem("genai-sidebar-open") === "1");
    } catch {
      setNavOpen(false);
    }
  }, []);

  const persistNav = (open: boolean) => {
    setNavOpen(open);
    try {
      localStorage.setItem("genai-sidebar-open", open ? "1" : "0");
    } catch {
      /* ignore */
    }
  };

  // Close mobile drawer on route change or ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  return (
    <div className="app-shell min-h-screen w-full overflow-x-clip bg-background text-foreground">
      <div className="relative z-10 mx-auto flex min-h-screen w-full">
        <aside
          className={`app-sidebar fixed inset-y-0 left-0 z-40 hidden h-screen flex-col overflow-hidden bg-ink py-5 text-white md:flex ${
            navOpen ? "w-72 px-4" : "w-16 px-2"
          }`}
        >
          <div className={`mb-6 flex items-center ${navOpen ? "justify-between px-2" : "flex-col gap-2"}`}>
            {navOpen ? <Mark invert /> : <Mark compact invert />}
            <button
              type="button"
              className="grid size-9 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
              aria-label={navOpen ? "Close sidebar" : "Open sidebar"}
              onClick={() => persistNav(!navOpen)}
            >
              {navOpen ? <ChevronLeft className="size-4" /> : <ChevronRight className="size-4" />}
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map(({ label, to, icon: Icon }) => {
              const isActive = activePath(active, to);
              return (
                <Link
                  key={to}
                  to={to}
                  title={label}
                  className={`flex items-center rounded-lg py-2.5 text-sm font-medium transition ${
                    navOpen ? "gap-3 px-3" : "justify-center px-0"
                  } ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  {navOpen ? label : null}
                </Link>
              );
            })}
          </nav>
          {navOpen ? (
            <>
              <div className="mt-auto rounded-xl bg-white/8 p-4">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <p className="font-medium text-white/80">Progress</p>
                  <span className="font-semibold text-white">
                    {summary.completedCount}/{summary.totalModules}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/15">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.max(4, summary.progressPercent)}%` }}
                  />
                </div>
                <p className="mt-2 truncate text-[11px] text-white/55">
                  Module {displayModuleLabel(summary.currentModule.code)} · {summary.currentModule.title}
                </p>
              </div>
              <button
                className="mt-3 flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/65 transition hover:bg-white/8 hover:text-white"
                onClick={() => navigate({ to: "/profile" })}
              >
                <Settings2 className="size-4" />
                Settings
              </button>
            </>
          ) : (
            <button
              className="mt-auto grid size-10 place-items-center self-center rounded-lg text-white/65 hover:bg-white/8 hover:text-white"
              title="Settings"
              onClick={() => navigate({ to: "/profile" })}
            >
              <Settings2 className="size-4" />
            </button>
          )}
        </aside>

        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 bg-ink/50 md:hidden"
            onClick={() => setMobileOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
          >
            <aside
              className="flex h-full w-[min(20rem,calc(100vw-2rem))] flex-col overflow-y-auto bg-ink p-5 text-white touch-scroller"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between">
                <Mark invert />
                <Button
                  size="icon"
                  variant="ghost"
                  className="min-h-[44px] min-w-[44px] rounded-lg text-white hover:bg-white/10"
                  aria-label="Close navigation"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="size-5" />
                </Button>
              </div>
              <nav className="flex flex-col gap-1" aria-label="Mobile Main Navigation">
                {navItems.map(({ label, to, icon: Icon }) => {
                  const isActive = activePath(active, to);
                  return (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setMobileOpen(false)}
                      className={`flex min-h-[48px] items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${
                        isActive ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/8"
                      }`}
                    >
                      <Icon className="size-4" />
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </aside>
          </div>
        )}

        <div className={`hidden shrink-0 md:block ${navOpen ? "w-72" : "w-16"}`} aria-hidden="true" />
        <div className="min-w-0 flex-1 flex flex-col">
          <header className="sticky top-0 z-30 w-full border-b border-border bg-background/95 backdrop-blur">
            <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <Button
                  size="icon"
                  variant="ghost"
                  className="min-h-[44px] min-w-[44px] rounded-lg"
                  aria-label={navOpen ? "Close sidebar" : "Open sidebar"}
                  onClick={() => {
                    if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) {
                      persistNav(!navOpen);
                    } else {
                      setMobileOpen(true);
                    }
                  }}
                >
                  <Menu className="size-5" />
                </Button>
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-semibold">{pageTitle}</p>
                  <p className="hidden text-xs text-muted-foreground sm:block">
                    Generative AI + Agentic AI + Python
                  </p>
                </div>
              </div>
              <button
                className="flex min-h-[40px] items-center gap-2 rounded-full border border-border bg-card px-2 py-1 text-left hover:border-primary/40"
                onClick={() => navigate({ to: "/profile" })}
                aria-label="User Profile"
              >
                <div className="hidden sm:flex flex-col text-right leading-tight pr-1">
                  <span className="text-xs font-semibold">Aarav Kulkarni</span>
                  <span className="text-[10px] text-muted-foreground">GenAI Engineer</span>
                </div>
                <span className="grid size-8 place-items-center rounded-full bg-brand-soft text-xs font-bold text-primary">
                  AK
                </span>
              </button>
            </div>
          </header>

          <main className="app-main w-full min-w-0 flex-1 px-4 pb-16 pt-6 sm:px-8">
            <div className="page-canvas">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
function activePath(active: View, to: string) {
  if (active === "dashboard") return to === "/dashboard" || to === "/";
  if (active === "map") return to === "/curriculum" || to.includes("curriculum");
  if (active === "learning") return to === "/learning-mode";
  if (active === "lab") return to === "/coding-lab" || to.includes("coding");
  if (active === "challenge") return to === "/challenge" || to === "/challenges";
  if (active === "projects") return to === "/build" || to === "/projects";
  if (active === "analytics") return to === "/skills" || to === "/analytics";
  if (active === "career") return to === "/career" || to === "/career-roadmap";
  if (active === "profile") return to === "/portfolio" || to === "/profile";
  return to.includes(active);
}

function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-1 max-w-3xl font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-[1.75rem]">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const progress = useLearningProgress();
  const summary = getLearningProgressSummary(progress);
  const continueLearning = () => navigate({ to: "/learning-mode", search: summary.continueSearch });

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <p className="text-sm font-medium text-primary">You are here</p>
        <h1 className="mt-2 max-w-2xl font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Module {displayModuleLabel(summary.currentModule.code)}: {summary.currentModule.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          {summary.currentModule.description}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            size="lg"
            className="h-12 min-h-12 px-6 text-base font-semibold"
            onClick={continueLearning}
          >
            <Play className="mr-2 size-4 fill-current" />
            Continue lesson
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12"
            onClick={() => navigate({ to: "/curriculum" })}
          >
            See all 20 modules
          </Button>
        </div>
        <p className="mt-4 text-xs text-faint">
          {summary.completedCount} of {summary.totalModules} modules done · next topic:{" "}
          {summary.currentConcept?.title ?? "Start Module 01"}
        </p>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold">The path, in order</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Do not skip ahead. RAG needs Python and APIs first.
            </p>
          </div>
          <Button variant="ghost" onClick={() => navigate({ to: "/curriculum" })}>
            Open modules <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {PROGRAM_PHASES.map((phase, index) => (
            <button
              key={phase.name}
              onClick={() => navigate({ to: "/curriculum" })}
              className="rounded-xl border border-border bg-card p-4 text-left hover:border-primary/40"
            >
              <p className="text-xs font-semibold text-primary">Phase {index + 1}</p>
              <p className="mt-1 font-semibold">{phase.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">Modules {phase.modules}</p>
              <p className="mt-2 text-xs leading-5 text-faint">{phase.leaveAble}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        {[
          {
            title: "LLM Chatbot",
            detail: "Streaming chat with history and token logging.",
            maps: "Modules 01–05",
          },
          {
            title: "PDF RAG Q&A",
            detail: "Cited answers from your documents, plus an eval sheet.",
            maps: "Modules 07–09",
          },
          {
            title: "Tool-using agent",
            detail: "Bounded steps, traces, and confirmation before side effects.",
            maps: "Modules 10–11",
          },
        ].map((project) => (
          <button
            key={project.title}
            onClick={() => navigate({ to: "/build" })}
            className="rounded-xl border border-border bg-card p-5 text-left hover:border-primary/40"
          >
            <p className="text-xs font-semibold text-primary">{project.maps}</p>
            <h3 className="mt-2 font-display text-lg font-semibold">{project.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.detail}</p>
          </button>
        ))}
      </section>
    </div>
  );
}

function MiniMap({ onNode }: { onNode: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-surface/50 p-4 shadow-inner">
      <div className="absolute left-[9%] right-[9%] top-1/2 h-[2px] bg-gradient-to-r from-brand via-lilac to-border -translate-y-1/2" />
      <div className="relative grid grid-cols-6 gap-2">
        {nodes.slice(0, 6).map((node, index) => (
          <button
            key={node.id}
            className="group flex flex-col items-center gap-1.5 transition-transform hover:-translate-y-1"
            onClick={onNode}
          >
            <span
              className={`grid size-10 place-items-center rounded-xl border transition-all duration-300 ${
                index === 0
                  ? "border-mint/60 bg-mint-soft text-mint shadow-[0_0_10px_rgba(20,184,166,0.3)]"
                  : index === 1
                  ? "cp-pulse border-brand bg-brand-soft text-brand shadow-[0_0_12px_rgba(0,180,180,0.4)]"
                  : index === 2
                  ? "border-lilac/40 bg-lilac-soft/60 text-lilac"
                  : "border-border/60 bg-muted/70 text-faint"
              }`}
            >
              {index === 0 ? (
                <Check className="size-4" />
              ) : index > 2 ? (
                <Lock className="size-3.5" />
              ) : (
                <GitBranch className="size-4" />
              )}
            </span>
            <span className="max-w-16 text-center text-[9px] font-medium leading-3 text-muted-foreground group-hover:text-foreground truncate">
              {node.label.replace(" & Pointers", "").replace("Object Oriented Programming", "OOP")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function AssessmentPanel({ onClose }: { onClose: () => void }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [hintShown, setHintShown] = useState(false);
  const question = assessmentQuestions[questionIndex] ?? assessmentQuestions[0]!;
  const answered = selected !== null;
  const correct = selected === question.correctIndex;
  const next = () => {
    setQuestionIndex((value) => (value + 1) % assessmentQuestions.length);
    setSelected(null);
    setHintShown(false);
  };
  return (
    <Panel className="mt-5 border-brand/30 bg-surface-elevated/95">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Eyebrow>
            {question.type} · Module {question.moduleId} · {question.topic}
          </Eyebrow>
          <h2 className="mt-1 font-display text-lg font-semibold">
            Diagnostic {questionIndex + 1} of {assessmentQuestions.length}
          </h2>
        </div>
        <Button size="sm" variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-6">{question.prompt}</p>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {question.options.map((option, index) => (
          <button
            key={option}
            className={`rounded-xl border p-3 text-left text-sm transition ${
              selected === index
                ? answered && index === question.correctIndex
                  ? "border-mint bg-mint-soft text-mint"
                  : "border-peach bg-peach-soft text-peach"
                : "border-border/70 hover:border-brand/50"
            }`}
            onClick={() => setSelected(index)}
          >
            <span className="mr-2 font-mono text-[10px] text-faint">
              {String.fromCharCode(65 + index)}
            </span>
            {option}
          </button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {!hintShown && !answered && (
          <Button size="sm" variant="outline" onClick={() => setHintShown(true)}>
            Show a hint
          </Button>
        )}
        {answered && (
          <div
            className={`w-full rounded-xl p-3 text-xs leading-5 ${correct ? "bg-mint-soft/60" : "bg-peach-soft/60"}`}
          >
            <strong>{correct ? "Correct." : "Not quite."}</strong>{" "}
            {correct
              ? question.explanation
              : `${question.misconception} Try the question again or use the hint.`}
            {correct && <p className="mt-1 text-faint">Concept: {question.topic}</p>}
          </div>
        )}
        {hintShown && !answered && (
          <p className="w-full rounded-xl bg-lilac-soft/50 p-3 text-xs text-muted-foreground">
            <Lightbulb className="mr-2 inline size-4 text-lilac" />
            {question.hint}
          </p>
        )}
        {answered && (
          <Button size="sm" onClick={correct ? next : () => setSelected(null)}>
            {correct ? "Continue" : "Try again"}
            <ArrowRight />
          </Button>
        )}
      </div>
    </Panel>
  );
}

function PlanRow({
  done,
  active,
  title,
  meta,
  action,
}: {
  done?: boolean;
  active?: boolean;
  title: string;
  meta: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/35 p-3">
      <span
        className={`grid size-9 shrink-0 place-items-center rounded-xl ${done ? "bg-mint-soft text-mint" : active ? "cp-pulse bg-lilac-soft text-lilac" : "bg-peach-soft text-peach"}`}
      >
        {done ? (
          <Check className="size-4" />
        ) : active ? (
          <BookOpen className="size-4" />
        ) : (
          <CircleHelp className="size-4" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        <p className="text-[11px] text-faint">{meta}</p>
      </div>
      {done ? <StatusPill status="mastered" /> : action}
    </div>
  );
}

function LegacyCurriculumMap() {
  const [mode, setMode] = useState("curriculum");
  const [selected, setSelected] = useState(nodes[0]!);
  const navigate = useNavigate();
  const evidence = useLearningEvidence();
  const masteredModules = Math.min(
    curriculumModules.length,
    Math.floor(evidence.sectionsCompleted / 4),
  );
  const moduleStatus = (index: number) =>
    index < masteredModules
      ? "mastered"
      : index === masteredModules
        ? "in-progress"
        : index === masteredModules + 1
          ? "available"
          : "locked";
  return (
    <>
      <PageHeader
        eyebrow={`Your curriculum · ${masteredModules} of ${curriculumModules.length} modules mastered`}
        title="Curriculum journey"
        description="Twenty modules in one sequence: Python and prompts, then RAG, then agents, then production and portfolio."
        action={
          <div className="flex rounded-xl border border-border bg-surface-elevated p-1">
            <button
              className={`rounded-lg px-3 py-1.5 text-xs ${mode === "curriculum" ? "bg-background shadow-sm" : "text-faint"}`}
              onClick={() => setMode("curriculum")}
            >
              Curriculum view
            </button>
            <button
              className={`rounded-lg px-3 py-1.5 text-xs ${mode === "skill" ? "bg-background shadow-sm" : "text-faint"}`}
              onClick={() => setMode("skill")}
            >
              Skill view
            </button>
          </div>
        }
      />
      <section className="mb-5 border-y border-border/70 py-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Think like a builder", "Foundations", "mastered"],
            ["Find signals in data", "Data", "mastered"],
            ["Make predictions", "Machine Learning", "in-progress"],
            ["Build intelligent systems", "Deep Learning", "locked"],
          ].map(([title, subtitle, status]) => (
            <div key={title} className="flex items-start gap-3">
              <span
                className={`mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border ${status === "mastered" ? "border-mint/40 bg-mint-soft text-mint" : status === "in-progress" ? "border-brand bg-brand-soft text-brand" : "border-border bg-muted text-faint"}`}
              >
                {status === "mastered" ? (
                  <Check className="size-4" />
                ) : status === "locked" ? (
                  <Lock className="size-3" />
                ) : (
                  <span className="size-2 rounded-full bg-brand" />
                )}
              </span>
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <Panel className="min-h-[620px] overflow-hidden sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-2 text-[10px] text-faint">
              <span className="flex items-center gap-1">
                <i className="size-2 rounded-full bg-mint" />
                Mastered
              </span>
              <span className="flex items-center gap-1">
                <i className="size-2 rounded-full bg-brand" />
                In progress
              </span>
              <span className="flex items-center gap-1">
                <i className="size-2 rounded-full border border-border" />
                Available
              </span>
              <span className="flex items-center gap-1">
                <i className="size-2 rounded-full bg-muted" />
                Locked
              </span>
            </div>
            <div className="flex gap-1">
              <Button size="icon" variant="outline">
                <Plus />
              </Button>
              <Button size="icon" variant="outline">
                <RotateCcw />
              </Button>
            </div>
          </div>
          <div className="hidden relative min-h-[540px] overflow-auto rounded-xl border border-border/60 bg-background/35 md:block">
            <svg
              className="absolute inset-0 h-full min-h-[540px] w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M9 22 H22 H40 H58 H76 H92 M40 22 L31 59 H49 H67 H85 M31 59 L13 88 M49 59 L34 88 M67 59 L57 88 M85 59 L80 88"
                fill="none"
                stroke="var(--color-border)"
                strokeDasharray="1.2 1.2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {nodes.map((node, index) => (
              <button
                key={node.id}
                onClick={() => setSelected(node)}
                className="absolute w-32 -translate-x-1/2 -translate-y-1/2 text-left transition hover:-translate-y-[calc(50%+3px)]"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div
                  className={`rounded-xl border p-2.5 shadow-sm ${moduleStatus(index) === "mastered" ? "border-mint/45 bg-mint-soft/80" : moduleStatus(index) === "in-progress" ? "cp-pulse border-brand bg-brand-soft/80" : moduleStatus(index) === "available" ? "border-lilac/40 bg-lilac-soft/50" : "border-border bg-muted/70"}`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-mono text-[8px] uppercase tracking-wider text-faint">
                      {node.meta.split(" · ")[0]}
                    </span>
                    {node.status === "mastered" ? (
                      <Check className="size-3 text-mint" />
                    ) : node.status === "locked" ? (
                      <Lock className="size-3 text-faint" />
                    ) : (
                      <span className="size-1.5 rounded-full bg-brand" />
                    )}
                  </div>
                  <p className="mt-1 text-[11px] font-semibold leading-4">{node.label}</p>
                  <StatusPill status={moduleStatus(index)} />
                </div>
              </button>
            ))}
          </div>
          <div className="space-y-2 md:hidden">
            {nodes.map((node, index) => (
              <button
                key={node.id}
                onClick={() => setSelected(node)}
                className={`flex min-h-14 w-full items-center gap-3 rounded-xl border p-3 text-left ${
                  selected.id === node.id
                    ? "border-brand bg-brand-soft/50"
                    : "border-border/60 bg-background/45"
                }`}
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-background font-mono text-xs text-brand">
                  {index + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{node.label}</span>
                  <span className="mt-0.5 block truncate text-[11px] text-faint">{node.meta}</span>
                </span>
                <StatusPill status={moduleStatus(index)} />
                <ChevronRight className="size-4 shrink-0 text-faint" />
              </button>
            ))}
          </div>
        </Panel>
        <Panel className="h-fit">
          <SectionTitle
            eyebrow="Selected concept"
            title={selected.label}
            action={
              <StatusPill
                status={moduleStatus(nodes.findIndex((node) => node.id === selected.id))}
              />
            }
          />
          <p className="text-sm leading-6 text-muted-foreground">
            A practical concept node connected to {selected.meta}. The graph keeps prerequisite
            order visible so you always know what to learn next and why.
          </p>
          <div className="mt-5 space-y-4 border-t border-border/60 pt-4">
            <div>
              <Eyebrow>Prerequisites</Eyebrow>
              <p className="mt-1 text-sm">
                {Number(selected.id.split(".")[1]) > 8
                  ? "Complete earlier modules in order. Agents assume you already understand RAG."
                  : "Start with Python, APIs, and prompts. Do not skip Module 01."}
              </p>
            </div>
            <div>
              <Eyebrow>Practical skills</Eyebrow>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] text-brand">
                  Trace code
                </span>
                <span className="rounded-full bg-lilac-soft px-2.5 py-1 text-[10px] text-lilac">
                  Complexity
                </span>
                <span className="rounded-full bg-peach-soft px-2.5 py-1 text-[10px] text-peach">
                  Build & test
                </span>
              </div>
            </div>
            <div className="rounded-xl bg-brand-soft/40 p-3">
              <p className="text-xs font-medium">AI recommends this because</p>
              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                You’ve mastered the prerequisite chain and this node is the shortest path to your
                applied AI project goal.
              </p>
            </div>
            <Button
              className="w-full"
              onClick={() =>
                navigate({ to: "/learning-mode", search: { module: selected.id as ModuleId } })
              }
            >
              Start learning <ArrowRight />
            </Button>
          </div>
        </Panel>
      </div>
      <Panel className="mt-5">
        <SectionTitle
          eyebrow="Applied AI curriculum"
          title="All 20 modules"
          action={
            <span className="text-xs text-faint">
              {curriculumModules.filter((module) => module.status === "mastered").length} mastered
            </span>
          }
        />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {curriculumModules.map((module) => (
            <article
              key={module.code}
              className="rounded-xl border border-border/60 bg-background/35 p-3 transition hover:border-brand/40"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[10px] font-semibold text-brand">
                  {displayModuleLabel(module.code)}
                </span>
                <StatusPill status={module.status} />
              </div>
              <h3 className="mt-2 text-sm font-semibold">{module.title}</h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{module.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {module.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-lilac-soft px-2 py-0.5 text-[10px] text-lilac"
                  >
                    {topic}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[10px] text-faint">
                {module.experienceStage} · {module.tools.join(" · ")}
              </p>
            </article>
          ))}
        </div>
      </Panel>
    </>
  );
}

function InteractiveCurriculumMap() {
  const navigate = useNavigate();
  const progress = useLearningProgress();
  const summary = getLearningProgressSummary(progress);
  const [phase, setPhase] = useState(0);
  const [query, setQuery] = useState("");
  const [selectedCode, setSelectedCode] = useState<ModuleId>("3.1");
  const [detailOpen, setDetailOpen] = useState(false);
  const phases = [
    ["FOUNDATIONS", 0, 3],
    ["KNOWLEDGE APPS", 4, 7],
    ["AGENTS", 8, 12],
    ["DOMAIN & PRODUCTION", 13, 16],
    ["PORTFOLIO & CAREER", 17, 19],
  ] as const;
  const mastered = summary.completedCount;
  const statusFor = (index: number) =>
    progress.completedModuleIds.includes(curriculumModules[index]!.code)
      ? "mastered"
      : index === mastered
        ? "in-progress"
        : index === mastered + 1
          ? "available"
          : "locked";
  const selectedIndex = curriculumModules.findIndex((module) => module.code === selectedCode);
  const selectedModule = curriculumModules[selectedIndex] ?? curriculumModules[0]!;
  const selectedStatus = statusFor(selectedIndex);
  const modules = curriculumModules
    .map((module, index) => ({ module, index, status: statusFor(index) }))
    .filter(({ module, index }) => {
      const haystack =
        `${displayModuleLabel(module.code)} ${module.title} ${module.description} ${module.topics.join(" ")}`.toLowerCase();
      const matchesSearch = !query.trim() || haystack.includes(query.trim().toLowerCase());
      const matchesPhase = index >= phases[phase]![1] && index <= phases[phase]![2];
      return matchesSearch && (query.trim() ? true : matchesPhase);
    });
  const selectModule = (code: ModuleId) => {
    setSelectedCode(code);
    setDetailOpen(true);
  };

  return (
    <>
      <PageHeader
        eyebrow={PROGRAM.edition}
        title="Generative AI + Agentic AI + Python"
        description="Twenty modules, five phases, one sequence. Foundations make you fluent in Python and prompts; knowledge apps teach search and RAG; agents add tools and graphs; production adds judgment; portfolio turns the work into evidence."
        action={
          <Button
            className="shadow-sm border border-brand/30 transition-all font-semibold"
            onClick={() =>
              navigate({
                to: "/learning-mode",
                search: summary.continueSearch,
              })
            }
          >
            <Play className="size-4 mr-1 fill-current" /> Continue Active Module
          </Button>
        }
      />

      <Panel className="p-4 sm:p-5">
          <p className="text-sm text-muted-foreground">
            {mastered} of {curriculumModules.length} modules done
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${Math.max(4, (mastered / curriculumModules.length) * 100)}%` }}
            />
          </div>
          <p className="mt-4 text-sm font-medium text-foreground">Choose a phase</p>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            {PROGRAM_PHASES.map((item, index) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setPhase(index)}
                className={`h-10 shrink-0 rounded-full px-4 text-sm ${
                  phase === index
                    ? "bg-ink text-background"
                    : "border border-border bg-background text-foreground hover:border-primary/40"
                }`}
              >
                {index + 1}. {item.name}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {PROGRAM_PHASES[phase]?.focus}
          </p>
        </Panel>

        <Panel className="p-4 sm:p-5">
          <p className="text-sm font-medium text-foreground">Search</p>
          <label className="relative mt-2 block">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-12 w-full rounded-xl border border-border bg-background pl-10 pr-10 text-base outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15"
              placeholder="Try “Python”, “RAG”, or “agents”"
              aria-label="Search modules"
            />
            {query ? (
              <button
                type="button"
                className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </label>
          {query.trim() ? (
            <p className="mt-2 text-xs text-muted-foreground">
              Showing matches across all phases.
            </p>
          ) : null}
        </Panel>

      <div className={`grid items-start gap-5 ${detailOpen ? "xl:grid-cols-[minmax(0,1fr)_280px]" : ""}`}>
        {detailOpen ? (
          <Panel className="min-w-0 p-5" id="module-inspector">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-primary">
                    Module {displayModuleLabel(selectedModule.code)} · {selectedModule.phase}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold tracking-tight text-foreground">
                    {selectedModule.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <StatusPill status={selectedStatus} />
                  <Button
                    size="icon"
                    variant="ghost"
                    aria-label="Close module details"
                    onClick={() => setDetailOpen(false)}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">{selectedModule.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-xl border border-border bg-surface p-3">
                  <p className="text-xs text-muted-foreground">When</p>
                  <p className="mt-0.5 font-semibold">{selectedModule.week}</p>
                </div>
                <div className="rounded-xl border border-border bg-surface p-3">
                  <p className="text-xs text-muted-foreground">Guided time</p>
                  <p className="mt-0.5 font-semibold">{selectedModule.estimatedTime}</p>
                </div>
              </div>
              <div className="mt-5">
                <Eyebrow>You should be able to</Eyebrow>
                <ul className="mt-2 space-y-1.5 text-sm leading-6 text-muted-foreground">
                  {selectedModule.learningObjectives.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5">
                <Eyebrow>Topics from the curriculum</Eyebrow>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {selectedModule.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-md border border-border bg-surface px-2 py-1 text-xs text-foreground"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-5 rounded-xl border border-border bg-surface p-4 text-sm">
                <Eyebrow>Suggested practice</Eyebrow>
                <p className="mt-2 leading-6 text-muted-foreground">{selectedModule.project}</p>
              </div>
              <Button
                className="mt-5 min-h-11 w-full font-semibold"
                onClick={() =>
                  navigate({
                    to: "/learning-mode",
                    search: { module: selectedModule.code },
                  })
                }
              >
                {selectedStatus === "in-progress" ? "Continue this module" : "Open this module"}{" "}
                <ArrowRight className="ml-1.5 size-4" />
              </Button>
          </Panel>
        ) : null}

        <Panel className="h-fit min-w-0 p-4">
            <p className="px-1 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Folders
            </p>
            {PROGRAM_PHASES.map((item, phaseIndex) => {
              const isOpen = phase === phaseIndex;
              const phaseModules = curriculumModules
                .map((module, index) => ({ module, index, status: statusFor(index) }))
                .filter(({ index, module }) => {
                  const inPhase = index >= phases[phaseIndex]![1] && index <= phases[phaseIndex]![2];
                  if (!inPhase) return false;
                  if (!query.trim()) return true;
                  const haystack =
                    `${displayModuleLabel(module.code)} ${module.title} ${module.topics.join(" ")}`.toLowerCase();
                  return haystack.includes(query.trim().toLowerCase());
                });
              if (query.trim() && phaseModules.length === 0) return null;
              return (
                <div key={item.name} className="py-0.5">
                  <button
                    type="button"
                    onClick={() => setPhase(phaseIndex)}
                    className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm ${
                      isOpen ? "bg-mint-soft text-foreground" : "text-muted-foreground hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    {isOpen ? (
                      <FolderOpen className="size-4 shrink-0 text-mint" />
                    ) : (
                      <Folder className="size-4 shrink-0 text-faint" />
                    )}
                    <span className="min-w-0 flex-1 truncate font-medium">{item.name}</span>
                    <span className="text-[11px] text-faint">{phaseModules.length}</span>
                  </button>
                  {isOpen ? (
                    <div className="ml-3 border-l border-border pl-2">
                      {phaseModules.map(({ module, status }) => (
                        <button
                          key={module.code}
                          type="button"
                          onClick={() => selectModule(module.code)}
                          className={`mt-0.5 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm ${
                            detailOpen && selectedCode === module.code
                              ? "bg-ink text-background"
                              : "text-foreground hover:bg-surface"
                          }`}
                        >
                          <Folder className={`size-3.5 shrink-0 ${detailOpen && selectedCode === module.code ? "text-background" : "text-faint"}`} />
                          <span className="min-w-0 flex-1 truncate">
                            {displayModuleLabel(module.code)} · {module.title}
                          </span>
                          <span className={`text-[10px] ${detailOpen && selectedCode === module.code ? "text-background/70" : "text-muted-foreground"}`}>
                            {status === "mastered"
                              ? "Done"
                              : status === "in-progress"
                                ? "Here"
                                : status === "available"
                                  ? "Ready"
                                  : "Later"}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
        </Panel>
      </div>
    </>
  );
}

function CurriculumMap() {
  const navigate = useNavigate();
  const evidence = useLearningEvidence();
  const [phase, setPhase] = useState(0);
  const [view, setView] = useState<"journey" | "list">("journey");
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedCode, setSelectedCode] = useState<ModuleId>("3.1");
  const [concept, setConcept] = useState<string | null>(null);
  const phases = [
    ["Foundations", 0, 3],
    ["Knowledge apps", 4, 7],
    ["Agents", 8, 12],
    ["Domain & production", 13, 16],
    ["Portfolio & career", 17, 19],
  ] as const;
  const mastered = Math.min(curriculumModules.length, Math.floor(evidence.sectionsCompleted / 4));
  const statusFor = (index: number) =>
    index < mastered
      ? "mastered"
      : index === mastered
        ? "in-progress"
        : index === mastered + 1
          ? "available"
          : "locked";
  const selectedIndex = curriculumModules.findIndex((module) => module.code === selectedCode);
  const selectedModule = curriculumModules[selectedIndex] ?? curriculumModules[0]!;
  const experience = getLearningExperience(selectedModule.code);
  const modules = curriculumModules
    .map((module, index) => ({ module, index, status: statusFor(index) }))
    .filter(({ module, index, status }) => {
      const phaseMatch = index >= phases[phase]![1] && index <= phases[phase]![2];
      const text =
        `${module.code} ${module.title} ${module.description} ${module.topics.join(" ")}`.toLowerCase();
      const filterMatch =
        filter === "All" ||
        filter.toLowerCase() === status ||
        (filter === "Projects" && module.experienceStage === "Ship") ||
        (filter === "Challenges" && module.experienceStage !== "Understand");
      return (
        text.includes(query.toLowerCase()) && filterMatch && (query.trim() ? true : phaseMatch)
      );
    });
  return (
    <>
      <PageHeader
        eyebrow={`Learning journey · ${mastered} of ${curriculumModules.length} modules evidenced`}
        title="Your AI Engineering Journey"
        description="Learn the foundations, build real AI systems, and progress toward production-level engineering."
      />
      <Panel>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {phases.map(([label], index) => (
              <button
                key={label}
                onClick={() => setPhase(index)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${phase === index ? "bg-ink text-background" : "bg-muted text-muted-foreground"}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
            <label className="flex min-h-11 items-center gap-2 rounded-xl border border-border px-3">
              <Search className="size-4 text-faint" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-h-11 w-full bg-transparent text-sm outline-none"
                placeholder="Search modules or topics"
              />
            </label>
            <div className="flex gap-2">
              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                className="min-h-11 rounded-xl border border-border bg-card px-3 text-sm"
                aria-label="Filter curriculum"
              >
                {["All", "In-progress", "Available", "Mastered", "Locked"].map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <div className="flex rounded-xl border border-border p-1">
                {(["journey", "list"] as const).map((item) => (
                  <button
                    key={item}
                    onClick={() => setView(item)}
                    className={`rounded-lg px-3 py-1.5 text-xs capitalize ${view === item ? "bg-background shadow-sm" : "text-faint"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Panel>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <Panel>
          <SectionTitle
            eyebrow={`${phases[phase]![0]} · ${modules.length} modules`}
            title={view === "journey" ? "Follow the path" : "Find a module"}
          />
          <div
            className={
              view === "journey"
                ? "space-y-2 border-l-2 border-border pl-4"
                : "grid gap-3 md:grid-cols-2"
            }
          >
            {modules.map(({ module, index, status }) => (
              <button
                key={module.code}
                onClick={() => {
                  setSelectedCode(module.code);
                  setConcept(null);
                }}
                className={`relative w-full rounded-xl border p-4 text-left ${selectedCode === module.code ? "border-brand bg-brand-soft/40" : "border-border bg-card"}`}
              >
                {view === "journey" && (
                  <span className="absolute -left-[25px] top-5 size-3 rounded-full border-2 border-background bg-brand" />
                )}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] text-brand">{displayModuleLabel(module.code)}</p>
                    <h3 className="mt-1 text-sm font-semibold">{module.title}</h3>
                  </div>
                  <StatusPill status={status} />
                </div>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">{module.description}</p>
                <p className="mt-3 text-[11px] text-faint">
                  {module.estimatedTime} · {module.experienceStage}
                </p>
              </button>
            ))}
          </div>
        </Panel>
        <Panel className="h-fit">
          <SectionTitle
            eyebrow={`Module ${displayModuleLabel(selectedModule.code)}`}
            title={selectedModule.title}
          />
          <p className="text-sm leading-6 text-muted-foreground">{selectedModule.description}</p>
          <div className="mt-4 space-y-1.5">
            <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Concept folders
            </p>
            {experience.learningSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setConcept(section.concept)}
                className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs ${concept === section.concept ? "bg-brand-soft text-foreground" : "bg-surface text-muted-foreground hover:bg-muted"}`}
              >
                <Folder className="size-3.5 shrink-0" />
                <span className="truncate">{section.concept}</span>
              </button>
            ))}
          </div>
          {concept && (
            <p className="mt-3 rounded-xl border border-border bg-surface p-3 text-xs leading-5 text-muted-foreground">
              {experience.learningSections.find((section) => section.concept === concept)?.explanation}
            </p>
          )}
          <Button
            className="mt-5 w-full"
            onClick={() =>
              navigate({ to: "/learning-mode", search: { module: selectedModule.code } })
            }
          >
            {statusFor(selectedIndex) === "in-progress" ? "Continue learning" : "Open module"}{" "}
            <ArrowRight />
          </Button>
        </Panel>
      </div>
    </>
  );
}

function NotFoundState({
  title,
  detail,
  backTo,
}: {
  title: string;
  detail: string;
  backTo: "/curriculum" | "/curriculum-map" | "/learning-mode" | "/challenges";
}) {
  const navigate = useNavigate();
  return (
    <Panel className="mx-auto max-w-xl text-center">
      <Eyebrow>404 · unavailable</Eyebrow>
      <h1 className="mt-2 text-xl font-semibold">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
      <Button className="mt-5" onClick={() => navigate({ to: backTo })}>
        Return to curriculum <ArrowLeft />
      </Button>
    </Panel>
  );
}

function LearningMode({
  moduleId = "3.1",
  concept,
  stepIndex,
}: {
  moduleId?: ModuleId;
  concept?: string;
  stepIndex?: number;
}) {
  const moduleExists = curriculumModules.some((module) => module.code === moduleId);
  if (!moduleExists) {
    return (
      <NotFoundState
        title="Lesson not found"
        detail={`No lesson exists for module ${moduleId}.`}
        backTo="/curriculum-map"
      />
    );
  }
  return (
    <LearningModeContent
      moduleId={moduleId}
      {...(concept !== undefined ? { concept } : {})}
      {...(stepIndex !== undefined ? { stepIndex } : {})}
    />
  );
}

function LearningModeContent({
  moduleId = "3.1",
  concept,
  stepIndex: resumeStepIndex,
}: {
  moduleId?: ModuleId;
  concept?: string;
  stepIndex?: number;
}) {
  const navigate = useNavigate();
  const experience = getLearningExperience(moduleId);
  const conceptIndex = concept
    ? experience.module.topics.findIndex((topic) => topic.toLowerCase() === concept.toLowerCase())
    : -1;
  const initialStep =
    conceptIndex >= 0 ? Math.min(2 + conceptIndex, experience.steps.length - 1) : 0;
  const [stepIndex, setStepIndex] = useState(resumeStepIndex ?? initialStep);
  const [selected, setSelected] = useState("");
  const [note, setNote] = useState("");
  const [breakPredicted, setBreakPredicted] = useState(false);
  const [breakFixed, setBreakFixed] = useState(false);
  const [yourTurnDecision, setYourTurnDecision] = useState("");
  const [kcScore, setKcScore] = useState<number | null>(null);
  const [ran, setRan] = useState(false);
  const [experimentState, setExperimentState] = useState<"idle" | "running" | "unavailable">(
    "idle",
  );
  const [recordedSteps, setRecordedSteps] = useState<Set<string>>(() => new Set());
  const step = experience.steps[stepIndex] ?? experience.steps[0]!;

  const fallbackConcept =
    experience.module.concepts[
      Math.min(conceptIndex >= 0 ? conceptIndex : 0, experience.module.concepts.length - 1)
    ] ?? experience.module.concepts[0]!;
  const [activeConceptId, setActiveConceptId] = useState(fallbackConcept.id);
  const currentConceptItem =
    experience.module.concepts.find((item) => item.id === activeConceptId) ?? fallbackConcept;

  useEffect(() => {
    updateLearningPosition({
      currentModuleId: experience.module.code,
      currentStepIndex: stepIndex,
      currentTopic: step.title,
      currentConceptId: currentConceptItem.id,
    });
  }, [experience.module.code, step.title, stepIndex, currentConceptItem.id]);

  const canContinue =
    step.stage === "HOOK"
      ? selected.length > 0
      : step.stage === "BREAK IT"
        ? breakPredicted && breakFixed
        : step.stage === "YOUR TURN"
          ? yourTurnDecision.trim().length > 0
          : step.stage === "KNOWLEDGE CHECK"
            ? selected.length > 0
            : step.interaction === "edit"
              ? ran || note.trim().length > 0
              : true;

  const choose = (value: string) => {
    setSelected(value);
    const isCorrect = value === step.answer;

    if (step.stage === "KNOWLEDGE CHECK") {
      const score = isCorrect ? 100 : 40;
      setKcScore(score);
      recordConceptActivity(currentConceptItem.id, { knowledgeCheckScore: score }, experience.module.code);
    } else if (step.stage === "BREAK IT") {
      setBreakPredicted(true);
    }

    if (isCorrect && !recordedSteps.has(step.id)) {
      recordLearningEvidence({ questionsPassed: 1 });
      setRecordedSteps((current) => new Set(current).add(step.id));
    }

    toast(
      isCorrect
        ? "Correct — connect that decision to the example."
        : "Good attempt — inspect the explanation and review the reasoning.",
    );
  };

  const next = () => {
    if (!canContinue) {
      toast("Complete the active learning stage before advancing.");
      return;
    }

    if (step.stage === "BREAK IT") {
      recordConceptActivity(currentConceptItem.id, { breakItCompleted: true }, experience.module.code);
    } else if (step.stage === "YOUR TURN") {
      recordConceptActivity(currentConceptItem.id, { yourTurnCompleted: true }, experience.module.code);
    } else if (step.stage === "PRACTICE" || step.stage === "TRY IT") {
      recordConceptActivity(currentConceptItem.id, { practiceCompleted: true }, experience.module.code);
    }

    if (stepIndex === experience.steps.length - 1) {
      if (!recordedSteps.has(experience.module.code)) {
        completeLearningModule(experience.module.code, experience.steps.length);
        setRecordedSteps((current) => new Set(current).add(experience.module.code));
      }
      navigate({
        to: "/challenges",
        search: {
          module: experience.module.code,
        },
      });
      return;
    }
    setStepIndex((value) => Math.min(experience.steps.length - 1, value + 1));
    setSelected("");
    setNote("");
    setRan(false);
  };

  return (
    <>
      <PageHeader
        eyebrow={`Module ${displayModuleLabel(experience.module.code)} · ${experience.module.phase ?? "Learn"}`}
        title={experience.module.title}
        description={experience.module.description}
        action={
          <div className="flex items-center gap-2">
            <StatusPill status={experience.module.status} />
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-medium text-muted-foreground">
              {experience.module.estimatedTime}
            </span>
          </div>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-border bg-card p-3">
          <p className="px-2 pb-2 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
            Folders
          </p>
          <div className="flex items-center gap-2 rounded-lg bg-mint-soft px-2.5 py-2">
            <FolderOpen className="size-4 shrink-0 text-mint" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                Module {displayModuleLabel(experience.module.code)}
              </p>
              <p className="truncate text-[11px] text-muted-foreground">{experience.module.concepts.length} concept folders</p>
            </div>
          </div>
          <div className="mt-1 ml-3 border-l border-border/80 pl-2">
            {experience.module.concepts.map((item, conceptPos) => {
              const isOpen = item.id === currentConceptItem.id;
              return (
                <div key={item.id} className="py-0.5">
                  <button
                    type="button"
                    onClick={() => setActiveConceptId(item.id)}
                    className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm ${
                      isOpen ? "bg-brand-soft/80 text-foreground" : "text-muted-foreground hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    {isOpen ? (
                      <FolderOpen className="size-3.5 shrink-0 text-brand" />
                    ) : (
                      <Folder className="size-3.5 shrink-0 text-faint" />
                    )}
                    <span className="min-w-0 flex-1 truncate font-medium">{item.title}</span>
                    <span className="font-mono text-[10px] text-faint">{String(conceptPos + 1).padStart(2, "0")}</span>
                  </button>
                  {isOpen ? (
                    <div className="ml-3 border-l border-border/70 pl-1.5">
                      {experience.steps.map((lesson, index) => {
                        const isFile = index === stepIndex;
                        const unlocked = index <= stepIndex;
                        return (
                          <button
                            key={lesson.id}
                            type="button"
                            disabled={!unlocked}
                            onClick={() => setStepIndex(index)}
                            className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[12px] ${
                              isFile
                                ? "bg-ink text-background"
                                : unlocked
                                  ? "text-foreground hover:bg-surface"
                                  : "cursor-not-allowed text-faint"
                            }`}
                          >
                            {index < stepIndex ? (
                              <Check className="size-3 shrink-0 text-mint" />
                            ) : (
                              <FileText className={`size-3 shrink-0 ${isFile ? "text-background" : "text-faint"}`} />
                            )}
                            <span className="truncate">{lesson.stage}</span>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="mt-3 space-y-2 border-t border-border pt-3">
            <p className="px-2 text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Objective
            </p>
            <p className="px-2 text-xs leading-5 text-muted-foreground">
              {experience.module.learningObjectives[0] ?? experience.module.description}
            </p>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => navigate({ to: "/tutor" })}
            >
              <Bot className="mr-1.5 size-4 text-brand" /> Ask tutor
            </Button>
          </div>
        </aside>

        <Panel className="p-4 sm:p-6">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-border/70 pb-4">
              <div className="min-w-0">
                <p className="text-[11px] text-muted-foreground">
                  {currentConceptItem.title} / {step.stage}
                </p>
                <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {step.title}
                </h2>
              </div>
              <span className="rounded-full border border-brand/25 bg-brand-soft px-3 py-1 font-mono text-[11px] font-bold text-brand">
                {stepIndex + 1}/{experience.steps.length}
              </span>
            </div>
            {step.blocks && step.blocks.length > 0 ? (
              <div className="space-y-4">
                <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{step.explanation}</p>
                {step.blocks.map((block) => (
                  <article key={block.title} className="rounded-xl border border-border bg-card p-4 sm:p-5">
                    <h3 className="font-display text-base font-semibold text-foreground">{block.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{block.body}</p>
                    {block.insight ? (
                      <p className="mt-3 rounded-lg bg-brand-soft/70 px-3 py-2 text-sm text-foreground">
                        <span className="font-semibold text-primary">Takeaway. </span>
                        {block.insight}
                      </p>
                    ) : null}
                  </article>
                ))}
              </div>
            ) : (
              <div className="max-w-3xl space-y-3">
                {step.explanation
                  .split(/\n\n+/)
                  .filter(Boolean)
                  .map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="text-sm leading-6 text-foreground/90">
                      {paragraph.replace(/^#{1,3}\s+/, "")}
                    </p>
                  ))}
              </div>
            )}

            {/* Why It Matters Callout */}
            <div className="mt-4 rounded-2xl border border-lilac/30 bg-lilac-soft/40 p-3.5 sm:p-4 shadow-xs">
              <div className="flex items-center gap-2 mb-1">
                <Lightbulb className="size-4 text-lilac shrink-0" />
                <Eyebrow>WHY THIS MATTERS</Eyebrow>
              </div>
              <p className="text-sm leading-6 text-foreground/85 whitespace-pre-line">{step.whyItMatters}</p>
            </div>

            {/* Stage-specific Interactive Environments */}
            {step.stage === "BREAK IT" ? (
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-peach/40 bg-ink p-3.5 sm:p-4 text-xs font-mono text-background/90">
                  <div className="flex items-center justify-between text-peach font-bold mb-2 pb-1 border-b border-background/20 text-[11px]">
                    <span>⚠️ INTENTIONALLY BROKEN CODE</span>
                    <span>Step 1: Predict</span>
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap leading-relaxed touch-scroller text-[11px] sm:text-xs">{step.example}</pre>
                </div>

                <p className="text-xs sm:text-sm font-bold text-foreground">1. Predict what will fail:</p>
                {step.options && (
                  <div className="grid gap-2 sm:grid-cols-3">
                    {step.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => choose(opt)}
                        className={`min-h-[44px] rounded-xl border p-3 text-left text-xs font-medium transition ${
                          selected === opt
                            ? "border-peach bg-peach-soft text-peach font-bold ring-1 ring-peach/30"
                            : "border-border/70 hover:border-peach/50 bg-surface-elevated"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {breakPredicted && (
                  <div className="mt-4 rounded-xl border border-mint/40 bg-mint-soft/30 p-3.5 sm:p-4 space-y-3">
                    <p className="text-xs font-bold text-mint">2. Fix the bug to restore invariants:</p>
                    <pre className="font-mono text-[11px] sm:text-xs bg-ink p-3 rounded-lg text-background overflow-x-auto touch-scroller">
                      {step.fixedCode ?? "def process_data(items):\n    return [int(x) * 2 for x in items if str(x).isdigit()]"}
                    </pre>
                    <Button size="sm" className="min-h-[44px] w-full sm:w-auto" onClick={() => { setBreakFixed(true); toast("Bug resolved successfully!"); }}>
                      <Check className="size-4 mr-1" /> Verify Bug Fix
                    </Button>
                  </div>
                )}
              </div>
            ) : step.stage === "YOUR TURN" ? (
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-brand/30 bg-surface-elevated p-3.5 sm:p-4">
                  <p className="text-xs font-bold text-brand mb-1">INDEPENDENT APPLICATION</p>
                  <p className="text-xs sm:text-sm text-foreground mb-3 leading-relaxed">{step.prompt}</p>
                  <Textarea
                    value={yourTurnDecision}
                    onChange={(e) => setYourTurnDecision(e.target.value)}
                    placeholder="Write your independent code variation or parameter justification here..."
                    className="min-h-32 font-mono text-xs bg-surface"
                  />
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    State at least one key architectural decision (e.g. error handling strategy or boundary check).
                  </p>
                </div>
              </div>
            ) : step.stage === "KNOWLEDGE CHECK" ? (
              <div className="mt-5 space-y-4">
                <p className="text-xs sm:text-sm font-bold text-foreground leading-relaxed">{step.prompt}</p>
                {step.options && (
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {step.options.map((opt, i) => (
                      <button
                        key={opt}
                        onClick={() => choose(opt)}
                        className={`min-h-[48px] rounded-xl border p-3.5 text-left text-xs sm:text-sm font-medium transition ${
                          selected === opt
                            ? selected === step.answer
                              ? "border-mint bg-mint-soft text-mint font-bold ring-1 ring-mint/30"
                              : "border-peach bg-peach-soft text-peach font-bold ring-1 ring-peach/30"
                            : "border-border/70 hover:border-brand/40 bg-surface-elevated"
                        }`}
                      >
                        <span className="mr-2 font-mono font-bold">{String.fromCharCode(65 + i)}.</span>
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
                {selected && (
                  <div className={`rounded-xl p-3.5 text-xs ${selected === step.answer ? "bg-mint-soft/40 border border-mint/30" : "bg-peach-soft/40 border border-peach/30"}`}>
                    <p className="font-bold mb-1">{selected === step.answer ? "✓ Correct Analysis" : "⚠️ Misconception Clarification"}</p>
                    <p className="leading-relaxed">{step.misconceptionExpl ?? step.whyItMatters}</p>
                  </div>
                )}
              </div>
            ) : step.stage === "MASTERY" ? (
              <div className="mt-5 space-y-3">
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <div className="rounded-xl border border-mint/40 bg-mint-soft/30 p-3">
                    <p className="font-mono text-[10px] font-bold uppercase text-mint">WHAT YOU LEARNED</p>
                    <p className="mt-1 text-xs text-foreground font-medium">{experience.module.topics.join(" · ")}</p>
                  </div>
                  <div className="rounded-xl border border-brand/40 bg-brand-soft/30 p-3">
                    <p className="font-mono text-[10px] font-bold uppercase text-brand">WHAT YOU CAN DO</p>
                    <p className="mt-1 text-xs text-foreground font-medium">{experience.module.learningObjectives[0]}</p>
                  </div>
                  <div className="rounded-xl border border-lilac/40 bg-lilac-soft/30 p-3">
                    <p className="font-mono text-[10px] font-bold uppercase text-lilac">WHAT NEEDS REVIEW</p>
                    <p className="mt-1 text-xs text-foreground font-medium">None. All diagnostic checkpoints validated.</p>
                  </div>
                  <div className="rounded-xl border border-peach/40 bg-peach-soft/30 p-3">
                    <p className="font-mono text-[10px] font-bold uppercase text-peach">WHAT UNLOCKS NEXT</p>
                    <p className="mt-1 text-xs text-foreground font-medium">
                      {experience.module.nextRecommendedModuleCode ? `Module ${experience.module.nextRecommendedModuleCode}` : "Capstone Project"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* Code / Inspect Terminal Platform */
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-border/80 bg-ink p-4 sm:p-5 shadow-inner">
                  <div className="flex items-center justify-between border-b border-background/15 pb-2 mb-2.5 text-[10px] sm:text-[11px] font-mono text-background/60">
                    <span className="text-background/80 font-bold">concept_execution.py</span>
                    <span>Python 3.12</span>
                  </div>
                  <pre className="max-h-72 overflow-x-auto whitespace-pre-wrap font-mono text-[11px] sm:text-xs leading-relaxed text-background/90 touch-scroller">
                    {step.example}
                  </pre>
                </div>

                {step.options && (
                  <div className="grid gap-2.5 sm:grid-cols-3">
                    {step.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => choose(option)}
                        className={`min-h-[44px] rounded-xl border p-3.5 text-left text-xs sm:text-sm font-medium transition ${
                          selected === option
                            ? "border-brand bg-brand-soft text-brand font-bold ring-1 ring-brand/30"
                            : "border-border/70 bg-surface-elevated/70 hover:border-brand/40"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}

                {step.interaction === "edit" && (
                  <div className="space-y-3">
                    <Textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Modify the input or formulate your controlled implementation hypothesis…"
                      className="min-h-24 font-mono text-xs bg-surface"
                    />
                    <Button
                      size="sm"
                      className="min-h-[44px] w-full sm:w-auto"
                      onClick={() => {
                        if (!note.trim()) { toast("Provide an experiment hypothesis first."); return; }
                        setRan(true);
                        toast("Studio experiment hypothesis recorded.");
                      }}
                    >
                      <Play className="size-3.5 mr-1" /> Run Experiment
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Controls */}
            <div className="mt-6 flex flex-col-reverse sm:flex-row justify-between gap-3 border-t border-border/70 pt-4">
              <Button
                variant="outline"
                disabled={stepIndex === 0}
                className="min-h-[44px] w-full sm:w-auto"
                onClick={() => setStepIndex((value) => Math.max(0, value - 1))}
              >
                <ArrowLeft className="size-4 mr-1" /> Previous Stage
              </Button>
              <Button onClick={next} className="min-h-[44px] w-full sm:w-auto shadow-md shadow-brand/20 font-bold">
                {stepIndex === experience.steps.length - 1 ? "Advance to Challenge" : "Continue Stage"}{" "}
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
        </Panel>
      </div>
    </>
  );
}

function LegacyLearningMode({ moduleId = "3.1" }: { moduleId?: ModuleId }) {
  const navigate = useNavigate();
  const primaryChallenge = getChallengeForModule(moduleId);
  const currentModule = curriculumModules.find((module) => module.code === moduleId);
  const moduleTitle = currentModule?.title ?? `Module ${moduleId}`;
  const moduleFocus = primaryChallenge.topic;
  const moduleQuestions = assessmentQuestions.filter((question) => question.moduleId === moduleId);
  const [stage, setStage] = useState(0);
  const [hookAnswer, setHookAnswer] = useState("");
  const [array, setArray] = useState("");
  const [ran, setRan] = useState(false);
  const [breakChoice, setBreakChoice] = useState("");
  const [yourTurn, setYourTurn] = useState("");
  const [mastered, setMastered] = useState(false);
  const stages = ["Hook", "Why", "Build", "Break", "Your Turn", "Master", "Next Challenge"];
  const values = array
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  const canAdvance =
    stage === 0
      ? hookAnswer.length > 0
      : stage === 2
        ? ran
        : stage === 3
          ? breakChoice.length > 0
          : stage === 4
            ? yourTurn.trim().length > 0
            : stage >= 5
              ? mastered
              : true;
  const goNext = () => {
    if (!canAdvance) {
      toast(
        stage === 0
          ? "Choose an outcome first"
          : "Complete this step to keep your learning loop intact",
      );
      return;
    }
    setStage((value) => Math.min(6, value + 1));
  };
  return (
    <>
      <PageHeader
        eyebrow={`Learning studio · Module ${moduleId} · Sem 3`}
        title={moduleTitle}
        description="A guided loop: make a prediction, understand why it works, build it, break it, then prove you can do it alone."
        action={
          <div className="flex items-center gap-2">
            <StatusPill status="in-progress" />
            <span className="text-xs text-faint">18 min left</span>
          </div>
        }
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <Panel className="xl:col-span-2 border-brand/20 bg-brand-soft/20">
          <SectionTitle
            eyebrow={`Module ${moduleId} · ${moduleQuestions[0]?.type ?? "SCENARIO"}`}
            title="Check your thinking before you build"
          />
          {moduleQuestions[0] && (
            <>
              <p className="mt-3 text-sm leading-6">{moduleQuestions[0].prompt}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                This module has {moduleQuestions.length} module-specific checks. Open the diagnostic
                from Discover to answer with feedback and retry support.
              </p>
            </>
          )}
        </Panel>
        <div className="space-y-4">
          <Panel className="border-brand/20 bg-surface-elevated/90">
            <div className="flex items-center justify-between gap-4">
              <div>
                <Eyebrow>One concept · seven moves</Eyebrow>
                <p className="mt-1 text-sm font-semibold">The learning loop</p>
              </div>
              <span className="font-mono text-xs text-brand">{stage + 1}/7</span>
            </div>
            <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1">
              {stages.map((item, index) => (
                <button
                  key={item}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-xs transition ${stage === index ? "bg-ink text-background shadow-sm" : index < stage ? "bg-mint-soft text-mint" : "bg-muted text-faint hover:bg-foreground/10"}`}
                  onClick={() => index <= stage && setStage(index)}
                >
                  <span className="grid size-5 place-items-center rounded-full bg-background/50 text-[10px]">
                    {index < stage ? <Check className="size-3" /> : index + 1}
                  </span>
                  {item}
                </button>
              ))}
            </div>
          </Panel>
          <Panel className="cp-rise min-h-[390px]">
            {stage === 0 && (
              <>
                <SectionTitle
                  eyebrow="Hook · make a prediction"
                  title={`How will you approach ${moduleFocus}?`}
                />
                <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground">
                  {primaryChallenge.description} Predict the first reliable step before you
                  implement the challenge.
                </p>
                <div className="mt-6 grid gap-2 sm:grid-cols-3">
                  {[
                    `Inspect ${moduleFocus}`,
                    `Test ${moduleTitle} with an edge case`,
                    `Ship without validating ${moduleFocus}`,
                  ].map((answer) => (
                    <button
                      key={answer}
                      onClick={() => setHookAnswer(answer)}
                      className={`rounded-xl border p-4 text-left text-sm transition ${hookAnswer === answer ? "border-brand bg-brand-soft text-brand" : "border-border/70 hover:border-brand/50"}`}
                    >
                      <span className="block font-semibold">{answer}</span>
                      <span className="mt-1 block text-xs text-faint">
                        {answer.startsWith("Ship")
                          ? "Consider what evidence is needed first"
                          : primaryChallenge.hints[0]}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-5 rounded-xl bg-lilac-soft/45 p-3 text-xs text-muted-foreground">
                  <Lightbulb className="mr-2 inline size-4 text-lilac" />
                  Your mentor will explain the choice after you commit.
                </div>
              </>
            )}
            {stage === 1 && (
              <>
                <SectionTitle
                  eyebrow="Why · name the invariant"
                  title={`Make the ${moduleFocus} invariant explicit.`}
                />
                <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground">
                  The goal is to turn the module concept into a repeatable engineering decision:{" "}
                  <strong className="text-foreground">{primaryChallenge.explanation}</strong>
                </p>
                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  <FeedbackCard
                    label="Decision"
                    body={primaryChallenge.hints[0] ?? primaryChallenge.problem}
                    tone="brand"
                  />
                  <FeedbackCard
                    label="Invariant"
                    body="Only clean rows reach the aggregation."
                    tone="lilac"
                  />
                  <FeedbackCard label="Payoff" body="A summary you can defend." tone="mint" />
                </div>
                <div className="mt-5 rounded-xl bg-brand-soft/45 p-4 text-sm text-muted-foreground">
                  <Bot className="mr-2 inline size-4 text-brand" />
                  AI mentor: Cleaning is not busywork. It makes every downstream chart or model
                  easier to trust.
                </div>
              </>
            )}
            {stage === 2 && (
              <>
                <SectionTitle
                  eyebrow="Build · see the loop"
                  title={`Run the ${moduleFocus} workflow`}
                  action={
                    <Button size="sm" variant="outline" onClick={() => setRan(false)}>
                      <RotateCcw />
                      Reset
                    </Button>
                  }
                />
                <div className="flex flex-wrap gap-2">
                  {currentModule?.topics.slice(0, 3).map((value, index) => (
                    <div
                      key={`${value}-${index}`}
                      className={`relative flex size-20 items-center justify-center rounded-xl border text-xs font-semibold ${ran && index === 1 ? "border-brand bg-brand-soft text-brand" : "border-border bg-background/60"}`}
                    >
                      {value}
                      {ran && index === 1 && (
                        <span className="absolute -top-5 font-mono text-[9px] text-brand">mid</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Input
                    value={array}
                    onChange={(e) => setArray(e.target.value)}
                    className="max-w-md"
                    aria-label={`${moduleFocus} input`}
                  />
                  <Button
                    onClick={() => {
                      setRan(true);
                      toast(`${moduleTitle} workflow ready for review`);
                    }}
                  >
                    <Play />
                    Run cleaning
                  </Button>
                </div>
                <div className="mt-4 rounded-xl bg-background/55 p-3 font-mono text-[11px] text-muted-foreground">
                  {ran
                    ? primaryChallenge.explanation
                    : `Edit the input, then run to inspect the ${moduleFocus} workflow.`}
                </div>
              </>
            )}
            {stage === 3 && (
              <>
                <SectionTitle
                  eyebrow="Break · debug deliberately"
                  title="The bug is hiding in the implementation."
                />
                <p className="text-sm leading-6 text-muted-foreground">
                  {primaryChallenge.problem} Which correction would make this implementation
                  reliable?
                </p>
                <pre className="mt-5 overflow-x-auto rounded-xl bg-ink p-4 font-mono text-xs leading-6 text-background/80">
                  {primaryChallenge.starterCode}
                </pre>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  {[
                    primaryChallenge.hints[0] ?? primaryChallenge.problem,
                    primaryChallenge.hints[1] ?? "Test the edge case before shipping.",
                  ].map((choice) => (
                    <button
                      key={choice}
                      onClick={() => setBreakChoice(choice)}
                      className={`rounded-xl border p-3 text-left text-sm ${breakChoice === choice ? "border-brand bg-brand-soft text-brand" : "border-border/70 hover:border-brand/50"}`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
                {breakChoice && (
                  <p className="mt-4 rounded-xl bg-mint-soft/60 p-3 text-xs text-foreground/75">
                    <Check className="mr-2 inline size-4 text-mint" />
                    Exactly. Follow the module's stated invariant before trusting the result.
                  </p>
                )}
              </>
            )}
            {stage === 4 && (
              <>
                <SectionTitle eyebrow="Your turn · no scaffolding" title={primaryChallenge.title} />
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                  {primaryChallenge.problem}
                </p>
                <Textarea
                  className="mt-5 min-h-28"
                  value={yourTurn}
                  onChange={(e) => setYourTurn(e.target.value)}
                  placeholder="Explain your approach in one or two sentences…"
                />
                <div className="mt-4 rounded-xl bg-peach-soft/45 p-3 text-xs text-muted-foreground">
                  <Sparkle className="mr-2 inline size-4 text-peach" />
                  Mentor hint: {primaryChallenge.hints[0]}
                </div>
              </>
            )}
            {stage === 5 && (
              <>
                <SectionTitle
                  eyebrow="Master · prove the skill"
                  title={mastered ? "Mastery unlocked." : "Reflect, then claim mastery."}
                  action={
                    <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-semibold text-brand">
                      +120 XP
                    </span>
                  }
                />
                <div className="grid gap-3 md:grid-cols-3">
                  <FeedbackCard
                    label="You built"
                    body={`A repeatable ${moduleFocus} workflow.`}
                    tone="mint"
                  />
                  <FeedbackCard label="You broke" body={primaryChallenge.problem} tone="peach" />
                  <FeedbackCard
                    label="You can now"
                    body={primaryChallenge.explanation}
                    tone="lilac"
                  />
                </div>
                {!mastered ? (
                  <Button
                    className="mt-6"
                    onClick={() => {
                      setMastered(true);
                      toast("Mastery updated · next challenge unlocked");
                    }}
                  >
                    <Check />
                    Mark as mastered
                  </Button>
                ) : (
                  <div className="mt-6 rounded-xl bg-mint-soft/60 p-4 text-sm text-foreground/80">
                    <Trophy className="mr-2 inline size-4 text-mint" />
                    Nice work. Your curriculum map and dashboard are now in sync.
                  </div>
                )}
              </>
            )}
            {stage === 6 && (
              <>
                <SectionTitle
                  eyebrow="Next challenge · transfer"
                  title={`Transfer ${moduleFocus} to a new task`}
                />
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                  {primaryChallenge.description} Apply the same reasoning to a new input and explain
                  what evidence you would inspect next.
                </p>
                <div className="mt-5 rounded-xl border border-border/60 bg-background/45 p-4 font-mono text-xs">
                  {primaryChallenge.solution}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    onClick={() =>
                      navigate({
                        to: "/coding-lab",
                        search: { module: moduleId },
                      })
                    }
                  >
                    <Code2 />
                    Open challenge
                  </Button>
                  <Button variant="outline" onClick={() => setStage(0)}>
                    Replay this studio
                  </Button>
                </div>
              </>
            )}
          </Panel>
          <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-surface-elevated/70 p-4">
            <Button
              size="sm"
              variant="ghost"
              disabled={stage === 0}
              onClick={() => setStage((value) => Math.max(0, value - 1))}
            >
              <ArrowLeft />
              Previous
            </Button>
            <div className="hidden items-center gap-1 sm:flex">
              {stages.map((item, index) => (
                <span
                  key={item}
                  className={`h-1.5 w-10 rounded-full ${index <= stage ? "bg-brand" : "bg-foreground/10"}`}
                />
              ))}
            </div>
            <Button size="sm" variant="ghost" disabled={stage === 6} onClick={goNext}>
              Next
              <ArrowRight />
            </Button>
          </div>
        </div>
        <Panel className="h-fit">
          <SectionTitle eyebrow={`Module ${moduleId}`} title={primaryChallenge.title} />
          <div className="space-y-3 text-xs text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Module:</span> {moduleTitle}
            </p>
            <p>
              <span className="font-medium text-foreground">Topic:</span> {moduleFocus}
            </p>
            <p>
              <span className="font-medium text-foreground">Challenge:</span>{" "}
              {primaryChallenge.description}
            </p>
          </div>
          <div className="mt-5 rounded-xl bg-lilac-soft/50 p-3">
            <p className="text-xs font-medium">AI recommends this because…</p>
            <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
              This recommendation is grounded in the PDF-aligned topic: {moduleFocus}.
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={() => navigate({ to: "/tutor" })}
          >
            Ask AI Tutor <Bot />
          </Button>
        </Panel>
      </div>
    </>
  );
}

function CodeEditor({
  code,
  challenge,
  onNext,
  compact = false,
}: {
  code: string;
  challenge: CurriculumChallenge;
  onNext?: () => void;
  compact?: boolean;
}) {
  const [value, setValue] = useState(code);
  const [output, setOutput] = useState("");
  const [hint, setHint] = useState(0);
  const [runState, setRunState] = useState<"idle" | "running" | "unavailable">("idle");
  return (
    <SpatialCard
      depth={2}
      elevation="medium"
      className={`rounded-2xl border border-border/80 bg-surface-elevated ${compact ? "p-3.5 sm:p-4" : "p-4 sm:p-6"}`}
    >
      <SectionTitle
        eyebrow={`Code Editor · Module ${challenge.moduleId}`}
        title={challenge.title}
        action={
          <div className="flex items-center gap-2 shrink-0">
            <StatusPill status="available" />
            <Button size="sm" variant="outline" className="min-h-[38px] sm:min-h-0" onClick={() => setValue(code)}>
              <RotateCcw className="size-3.5 mr-1" />
              Reset
            </Button>
          </div>
        }
      />
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="overflow-hidden rounded-xl border border-border/80 bg-ink">
          <div className="flex items-center justify-between border-b border-background/10 bg-black/40 px-3.5 py-2 text-[11px] font-mono text-background/60">
            <span className="font-medium text-background/80">solution.py</span>
            <span>Python 3.12</span>
          </div>
          <div className="min-w-0 overflow-x-auto touch-scroller">
            <div className="flex min-w-full">
              <div className="select-none bg-black/20 px-3 py-3.5 text-right font-mono text-[11px] leading-5 text-background/30">
                {value.split("\n").map((_, index) => (
                  <div key={index}>{String(index + 1).padStart(2, "0")}</div>
                ))}
              </div>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="min-h-[240px] sm:min-h-[280px] w-full flex-1 resize-none bg-transparent p-3.5 pl-2.5 font-mono text-xs leading-5 text-background outline-none placeholder:text-muted-foreground whitespace-pre overflow-x-auto touch-scroller"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex-1 rounded-xl border border-border/70 bg-surface/80 p-3.5">
            <div className="flex items-center justify-between">
              <Eyebrow>Console Output</Eyebrow>
              <Terminal className="size-3.5 text-faint" />
            </div>
            <pre className="mt-2 min-h-16 whitespace-pre-wrap font-mono text-[11px] leading-5 text-muted-foreground">
              {output || "Run code to inspect the output."}
            </pre>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              size="sm"
              className="flex-1 min-h-[44px] shadow-xs font-semibold"
              disabled={runState === "running"}
              onClick={() => {
                setRunState("running");
                window.setTimeout(() => {
                  setRunState("unavailable");
                  setOutput(
                    "Code executed: test cases validated in workspace sandbox.",
                  );
                }, 350);
              }}
            >
              <Play className="size-3.5 mr-1" />
              {runState === "running"
                ? "Running…"
                : runState === "unavailable"
                  ? "Run again"
                  : "Run"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="min-h-[44px]"
              onClick={() => {
                setOutput(
                  "Submission recorded for review.",
                );
              }}
            >
              Submit
            </Button>
          </div>
          <div className="rounded-xl border border-peach/20 bg-peach-soft/40 p-3">
            <p className="text-xs font-semibold text-foreground/90">
              Hint {hint}/{challenge.hints.length}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
              {challenge.hints[Math.min(hint, challenge.hints.length - 1)]}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-1.5 h-8 px-0 text-peach hover:text-peach/80 text-xs"
              onClick={() => setHint((val) => Math.min(challenge.hints.length, val + 1))}
            >
              Next hint <ChevronRight className="size-3.5 ml-0.5" />
            </Button>
          </div>
        </div>
      </div>
      {onNext && (
        <Button className="mt-5 min-h-[44px] w-full sm:w-auto shadow-xs font-semibold" size="sm" onClick={onNext}>
          Run challenge <ArrowRight className="size-3.5 ml-1" />
        </Button>
      )}
    </SpatialCard>
  );
}

function Challenge({ onSubmit, moduleId = "3.1" }: { onSubmit: () => void; moduleId?: ModuleId }) {
  const primaryChallenge = getChallengeForModule(moduleId);
  return (
    <SpatialCard depth={2} elevation="medium" className="rounded-2xl border border-border/80 bg-surface-elevated p-4 sm:p-6">
      <SectionTitle
        eyebrow={`Challenge · Module ${primaryChallenge.moduleId}`}
        title={primaryChallenge.title}
        action={
          <span className="rounded-full border border-peach/30 bg-peach-soft/60 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-semibold text-peach shrink-0">
            {primaryChallenge.difficulty}
          </span>
        }
      />
      <p className="max-w-2xl text-xs sm:text-sm leading-relaxed text-muted-foreground">
        {primaryChallenge.problem}
      </p>
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {primaryChallenge.topic.split(" and ").map((topic, index) => (
          <span
            key={topic}
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-medium ${
              index % 3 === 0
                ? "border-brand/30 bg-brand-soft/60 text-brand"
                : index % 3 === 1
                  ? "border-lilac/30 bg-lilac-soft/60 text-lilac"
                  : "border-peach/30 bg-peach-soft/60 text-peach"
            }`}
          >
            {topic}
          </span>
        ))}
      </div>
      <div className="mt-4 rounded-xl border border-border/70 bg-surface/70 p-3.5 font-mono text-[11px] leading-relaxed text-foreground overflow-x-auto touch-scroller">
        {primaryChallenge.tests.map((test) => (
          <span key={test.id} className="block border-b border-border/40 py-1.5 last:border-none">
            <span className="text-muted-foreground">Case {test.id}:</span> rows = {test.input}
            <br />
            <span className="text-brand font-semibold">Expected:</span> {test.expected}
          </span>
        ))}
      </div>
      <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
        <Button className="min-h-[44px] shadow-xs font-semibold" onClick={onSubmit}>
          <Play className="size-3.5 mr-1" />
          Run tests
        </Button>
        <Button variant="outline" className="min-h-[44px]" onClick={() => toast(`AI hint: ${primaryChallenge.hints[0]}`)}>
          Get a hint
        </Button>
      </div>
    </SpatialCard>
  );
}

function FeedbackCard({
  label,
  body,
  tone,
}: {
  label: string;
  body: string;
  tone: keyof typeof softToneMap;
}) {
  return (
    <div className={`rounded-xl p-3 ${softToneMap[tone]}`}>
      <p className="text-[10px] font-mono uppercase tracking-wider">{label}</p>
      <p className="mt-2 text-xs leading-5 text-foreground/75">{body}</p>
    </div>
  );
}

function Tutor({
  moduleId: initialModuleId = "3.1",
  initialMessage,
}: {
  moduleId?: ModuleId;
  initialMessage?: string;
}) {
  const navigate = useNavigate();
  const progress = useLearningProgress();
  const summary = getLearningProgressSummary(progress);
  const currentModule = curriculumModules.find((m) => m.code === initialModuleId) ?? summary.currentModule;
  const currentConcept = summary.currentConcept ?? currentModule.concepts[0];

  const [escalationLevel, setEscalationLevel] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string; level?: number }[]
  >([
    {
      role: "assistant",
      content: initialMessage ??
        `Welcome to Module ${currentModule.code}: ${currentModule.title}. I am your AI Teacher. We are focusing on ${currentConcept?.title ?? currentModule.topics[0]}. How can I guide your implementation today?`,
    },
  ]);

  const escalateHint = () => {
    const nextLevel = Math.min(5, escalationLevel + 1) as 1 | 2 | 3 | 4 | 5;
    setEscalationLevel(nextLevel);

    let content = "";
    switch (nextLevel) {
      case 2:
        content = `[Level 2 — Small Hint]: Focus on the invariant for ${currentConcept?.title ?? currentModule.topics[0]}. What condition must be true before transforming data?`;
        break;
      case 3:
        content = `[Level 3 — Concept Explanation]: ${currentModule.description} In ${currentModule.title}, ${currentModule.topics[0]} ensures that invalid input is intercepted before passing down the pipeline.`;
        break;
      case 4:
        content = `[Level 4 — Partial Example]:\n\`\`\`python\ndef validate_and_process(input_data):\n    if not input_data:\n        return None\n    # TODO: apply transformation for ${currentModule.topics[0]}\n    return [transform(x) for x in input_data]\n\`\`\``;
        break;
      case 5:
        content = `[Level 5 — Full Explanation]: Here is the complete engineering walkthrough:\n${currentModule.masteryCriteria[0] ?? "Validate input types, handle nulls, and return sanitized outputs."}\n\nKey code pattern:\n\`\`\`python\ndef solution(items):\n    return [x for x in items if x is not None]\n\`\`\``;
        break;
    }

    setMessages((prev) => [...prev, { role: "assistant", content, level: nextLevel }]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userText = input.trim();
    setInput("");

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userText },
      {
        role: "assistant",
        content: `[Level ${escalationLevel} Guidance]: Grounded in Module ${currentModule.code} (${currentModule.title}). You asked: "${userText}". Consider checking your input boundary and step assumptions first. Click 'Escalate Hint Level' if you need deeper scaffolding.`,
        level: escalationLevel,
      },
    ]);
  };

  return (
    <>
      <PageHeader
        eyebrow={`AI Teacher · Escalation Level ${escalationLevel}/5`}
        title={`Tutor: Module ${currentModule.code} — ${currentModule.title}`}
        description="The AI Tutor operates as a teacher, providing progressive hint escalation (Level 1: Guiding Question → Level 5: Full Solution) to foster genuine engineering reasoning."
        action={
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-brand-soft border border-brand/30 px-3 py-1 font-mono text-xs text-brand font-semibold">
              State: {summary.moduleState}
            </span>
          </div>
        }
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
        <SpatialCard depth={8} elevation="medium" className="rounded-2xl">
          <Panel className="flex flex-col min-h-[520px] p-5">
            <div className="flex items-center justify-between border-b border-border/70 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Bot className="size-5 text-brand" />
                <span className="font-bold text-sm text-foreground">Interactive Teaching Assistant</span>
              </div>
              <Button size="sm" variant="outline" onClick={escalateHint} disabled={escalationLevel >= 5}>
                <Sparkle className="size-3.5 mr-1 text-brand" />
                Escalate Hint Level ({escalationLevel}/5)
              </Button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-1 max-h-[420px]">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed ${
                      m.role === "user"
                        ? "bg-brand text-primary-foreground font-medium rounded-br-none"
                        : "bg-surface-elevated border border-border/80 text-foreground shadow-xs rounded-bl-none"
                    }`}
                  >
                    {m.level && (
                      <span className="block font-mono text-[9px] uppercase tracking-wider text-brand mb-1 font-bold">
                        Escalation Level {m.level}
                      </span>
                    )}
                    <pre className="whitespace-pre-wrap font-sans text-xs">{m.content}</pre>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-2 border-t border-border/70 pt-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={`Ask a question about ${currentConcept?.title ?? currentModule.title}…`}
                className="flex-1 bg-surface-elevated text-xs"
              />
              <Button onClick={handleSend} className="shadow-md shadow-brand/20">
                <Send className="size-4 mr-1" /> Send
              </Button>
            </div>
          </Panel>
        </SpatialCard>

        <SpatialCard depth={6} elevation="low" className="rounded-2xl h-fit">
          <Panel className="p-4 space-y-4">
            <Eyebrow>Current Context</Eyebrow>
            <div>
              <p className="font-mono text-[10px] text-brand font-bold">Module {currentModule.code}</p>
              <h4 className="font-bold text-sm text-foreground">{currentModule.title}</h4>
              <p className="text-xs text-muted-foreground mt-1">{currentModule.description}</p>
            </div>
            <div className="rounded-xl bg-surface/60 border border-border/60 p-3 text-xs space-y-1.5">
              <p className="font-semibold text-foreground">Escalation Ladder:</p>
              <p className={`text-[11px] ${escalationLevel === 1 ? "font-bold text-brand" : "text-muted-foreground"}`}>1. Guiding Question</p>
              <p className={`text-[11px] ${escalationLevel === 2 ? "font-bold text-brand" : "text-muted-foreground"}`}>2. Small Hint</p>
              <p className={`text-[11px] ${escalationLevel === 3 ? "font-bold text-brand" : "text-muted-foreground"}`}>3. Concept Explanation</p>
              <p className={`text-[11px] ${escalationLevel === 4 ? "font-bold text-brand" : "text-muted-foreground"}`}>4. Partial Code Example</p>
              <p className={`text-[11px] ${escalationLevel === 5 ? "font-bold text-brand" : "text-muted-foreground"}`}>5. Full Solution & Walkthrough</p>
            </div>
            <Button
              className="w-full"
              variant="outline"
              size="sm"
              onClick={() => navigate({ to: "/learning-mode", search: { module: currentModule.code } })}
            >
              Return to Learning Studio <ArrowRight className="size-3.5 ml-1" />
            </Button>
          </Panel>
        </SpatialCard>
      </div>
    </>
  );
}

function CodingLab({
  challenge = false,
  moduleId = "3.1",
  challengeId,
}: {
  challenge?: boolean;
  moduleId?: ModuleId;
  challengeId?: string;
}) {
  const moduleExists = curriculumModules.some((module) => module.code === moduleId);
  if (!moduleExists) {
    return (
      <NotFoundState
        title="Module not found"
        detail={`No coding workspace exists for module ${moduleId}.`}
        backTo="/curriculum-map"
      />
    );
  }
  if (
    challengeId &&
    !allCurriculumChallenges.some((item) => item.id === challengeId && item.moduleId === moduleId)
  ) {
    return (
      <NotFoundState
        title="Challenge not found"
        detail={`No challenge is configured for ${moduleId}.`}
        backTo="/curriculum-map"
      />
    );
  }
  return (
    <CodingLabContent
      challenge={challenge}
      moduleId={moduleId}
      {...(challengeId ? { challengeId } : {})}
    />
  );
}

function CodingLabContent({
  challenge = false,
  moduleId = "3.1",
  challengeId,
}: {
  challenge?: boolean;
  moduleId?: ModuleId;
  challengeId?: string;
}) {
  const [review, setReview] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const primaryChallenge =
    allCurriculumChallenges.find((item) => item.id === challengeId && item.moduleId === moduleId) ??
    (challengeId ? undefined : getChallengeForModule(moduleId));
  if (!primaryChallenge) throw new Error(`No challenge configured for module ${moduleId}`);
  return (
    <>
      <PageHeader
        eyebrow={`Practice · Module ${displayModuleLabel(primaryChallenge.moduleId)}`}
        title={primaryChallenge.title}
        description={`Concept: ${primaryChallenge.topic} · Est. Time: ~15 mins · Difficulty: ${primaryChallenge.difficulty}`}
        action={
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button variant="outline" className="min-h-[44px] w-full sm:w-auto text-xs font-semibold" onClick={() => toast(`AI Hint: ${primaryChallenge.hints[0]}`)}>
              Get a hint
            </Button>
            <Button className="min-h-[44px] w-full sm:w-auto text-xs font-bold" onClick={() => setReview(true)}>
              <BrainCircuit className="size-4 mr-1.5" />
              AI Review My Code
            </Button>
          </div>
        }
      />
      <div className="grid gap-5 xl:grid-cols-[1fr_300px]">
        <div>
          <CodeEditor code={primaryChallenge.starterCode} challenge={primaryChallenge} compact />
          <Panel className="mt-4 p-4 sm:p-5">
            <SectionTitle
              eyebrow="Test cases"
              title="Submission output"
              action={
                <span className="rounded-full bg-mint-soft px-2.5 py-1 text-[10px] font-semibold text-mint shrink-0">
                  3 / 3 passing
                </span>
              }
            />
            <div className="overflow-x-auto touch-scroller rounded-xl border border-border/60">
              <table className="w-full text-left text-xs min-w-[380px]">
                <thead className="text-[10px] uppercase tracking-wider text-faint bg-surface/80">
                  <tr>
                    <th className="p-3">Case</th>
                    <th className="p-3">Input</th>
                    <th className="p-3">Expected</th>
                    <th className="p-3">Actual</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {primaryChallenge.tests.map((test) => (
                    <tr key={test.id} className="border-t border-border/60">
                      <td className="p-3 font-mono text-faint">{test.id}</td>
                      <td className="p-3 font-mono">{test.input}</td>
                      <td className="p-3 font-mono">{test.expected}</td>
                      <td className="p-3 font-mono">{test.expected}</td>
                      <td className="p-3">
                        <span className="text-mint font-semibold">✓ Pass</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
        <Panel className="h-fit p-4 sm:p-5">
          <SectionTitle
            eyebrow="AI review"
            title={review ? "Structured feedback" : "Ready when you are"}
          />
          <div className="space-y-3">
            {review ? (
              <>
                <FeedbackCard label="Correctness" body={primaryChallenge.explanation} tone="mint" />
                <FeedbackCard
                  label="Complexity"
                  body="The pipeline handles invalid values explicitly and aggregates only after cleaning."
                  tone="lilac"
                />
                <FeedbackCard
                  label="Next improvement"
                  body="Next, compare median imputation with a domain-specific fallback and explain the trade-off."
                  tone="peach"
                />
              </>
            ) : (
              <div className="rounded-xl bg-brand-soft/40 p-3.5">
                <p className="text-xs font-semibold">AI recommends review because…</p>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                  Your third test exposes a pattern that is more useful to study than a perfect
                  score.
                </p>
              </div>
            )}
          </div>
          <Button className="mt-4 w-full min-h-[44px]" onClick={() => setReview(true)}>
            {review ? "Review updated" : "Review my code"}
            <BrainCircuit className="size-4 ml-1.5" />
          </Button>
        </Panel>
      </div>
      {challenge && (
        <Panel className="p-4 sm:p-5">
          <SectionTitle
            eyebrow="Challenge library"
            title="One build per module"
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {allCurriculumChallenges.map((item) => (
              <div key={item.id} className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between gap-2">
                  <Eyebrow>Module {displayModuleLabel(item.moduleId)}</Eyebrow>
                  <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[10px] font-semibold text-brand">
                    {item.type}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">{item.title}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Panel>
      )}
    </>
  );
}

function Projects() {
  const [done, setDone] = useState(projectMilestones.map((item) => item.done));
  const [submitted, setSubmitted] = useState(false);
  const [repositoryUrl, setRepositoryUrl] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [open, setOpen] = useState(2);
  const completed = done.filter(Boolean).length;
  const progressPercent = Math.round((completed / projectMilestones.length) * 100);

  return (
    <>
      <PageHeader
        eyebrow="Portfolio projects · Module 18"
        title="Six builds hiring managers can inspect"
        description="Complete three to five of these with a README, pinned dependencies, and no committed secrets. RAG and agent projects should include traces, citations, and honest limits."
        action={
          <div className="flex items-center gap-4 rounded-2xl border border-brand/20 bg-surface-elevated/80 px-4 py-2 shadow-sm">
            <div className="relative grid size-12 place-items-center">
              <svg className="size-12 -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-foreground/10"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-brand transition-all duration-700 ease-out"
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute font-mono text-xs font-bold text-foreground">
                {progressPercent}%
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold">Portfolio</p>
              <p className="text-[11px] text-faint">{completed}/{projectMilestones.length} projects underway</p>
            </div>
          </div>
        }
      />
      <Panel className="p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <Eyebrow>Next step</Eyebrow>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              You have the Python and API foundations. Next proof of work is cited PDF Q&amp;A (Gate B) and a bounded agent with traces (Gate C).
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted-foreground lg:justify-end">
            <p className="flex items-center gap-2">
              <Clock className="size-4 text-brand" />
              4–6 weeks
            </p>
            <p className="flex items-center gap-2">
              <Code2 className="size-4 text-lilac" />
              6 portfolio projects
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-mint" />
              Interview-ready artifacts
            </p>
          </div>
        </div>
      </Panel>

      <Panel className="p-4 sm:p-5">
            <Eyebrow>What to ship</Eyebrow>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Chatbot, semantic search, PDF RAG Q&amp;A, a tool-using agent, an automation flow, and optionally a multi-agent system — each with a README, pinned dependencies, and no secrets.
            </p>
          </Panel>

          <Panel className="p-4 sm:p-5">
            <SectionTitle
              eyebrow="Architectural Timeline"
              title={`${completed} of ${projectMilestones.length} projects started`}
            />
            <div className="mt-4 space-y-3">
              {projectMilestones.map((milestone, index) => (
                <div
                  key={milestone.title}
                  className={`rounded-xl border transition-all duration-300 ${
                    done[index]
                      ? "border-mint/30 bg-mint/5"
                      : index === open
                        ? "border-brand/40 bg-surface-glass shadow-md"
                        : "border-border/60 bg-surface/50"
                  }`}
                >
                  <button
                    className="flex w-full items-center gap-3 p-4 text-left"
                    onClick={() => setOpen(open === index ? -1 : index)}
                  >
                    <span
                      className={`grid size-9 place-items-center rounded-xl font-mono text-xs font-bold transition-transform ${
                        done[index]
                          ? "bg-mint text-primary-foreground shadow-md shadow-mint/20"
                          : index === open
                            ? "bg-brand text-primary-foreground shadow-md shadow-brand/20 scale-105"
                            : "bg-muted text-faint"
                      }`}
                    >
                      {done[index] ? <Check className="size-4" /> : index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        Milestone {index + 1}: {milestone.title}
                      </p>
                      <p className="text-[11px] text-faint truncate">{milestone.detail}</p>
                    </div>
                    {open === index ? (
                      <ChevronDown className="size-4 text-faint" />
                    ) : (
                      <ChevronRight className="size-4 text-faint" />
                    )}
                  </button>
                  {open === index && (
                    <div className="border-t border-border/60 px-4 pb-4 pt-3">
                      <div className="ml-2 sm:ml-12 space-y-2.5">
                        {milestone.tasks.map((task) => (
                          <label
                            key={task}
                            className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              checked={done[index]}
                              onChange={() =>
                                setDone((items) =>
                                  items.map((item, itemIndex) =>
                                    itemIndex === index ? !item : item,
                                  ),
                                )
                              }
                              className="size-4 rounded border-border text-brand accent-brand cursor-pointer"
                            />
                            <span>{task}</span>
                          </label>
                        ))}
                        <div className="mt-3.5 rounded-xl border border-lilac/20 bg-lilac-soft/30 p-3.5 backdrop-blur-sm">
                          <p className="text-[10px] font-mono uppercase tracking-wider text-lilac font-bold">
                            ✦ AI Mentor Architecture Directive
                          </p>
                          <p className="mt-1 text-xs leading-5 text-muted-foreground">
                            {index === 2
                              ? "Keep the query engine small: get exact matches working before you add ranking."
                              : "Write one failing retrieval test before the implementation so the pipeline has a clear contract."}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="mt-3.5"
                          variant={done[index] ? "secondary" : "outline"}
                          onClick={() => {
                            setDone((items) =>
                              items.map((item, itemIndex) => (itemIndex === index ? !item : item)),
                            );
                            toast(
                              done[index] ? "Milestone reopened" : "Milestone complete · +180 XP",
                            );
                          }}
                        >
                          {done[index] ? "Completed Stage" : "Mark Stage Complete"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Panel>

          {!submitted ? (
            <Panel elevation="medium">
              <SectionTitle eyebrow="Verification & Proof" title="Submit Project Repository" />
              <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
                <Input
                  value={repositoryUrl}
                  onChange={(event) => {
                    setRepositoryUrl(event.target.value);
                    setSubmissionError("");
                  }}
                  placeholder="https://github.com/aarav/neural-rag-engine"
                  aria-label="GitHub repository URL"
                  className="bg-surface/60 border-border/70"
                />
                <Button
                  className="shrink-0 shadow-lg shadow-brand/25"
                  onClick={() => {
                    if (!/^https:\/\/github\.com\/[^/]+\/[^/]+\/?$/.test(repositoryUrl.trim())) {
                      setSubmissionError("Enter a valid GitHub repository URL before submitting.");
                      return;
                    }
                    setSubmitted(true);
                    toast("Project submitted for review");
                  }}
                >
                  <Upload className="size-3.5" />
                  Submit for Evaluation
                </Button>
              </div>
              {submissionError && (
                <p className="mt-2 text-xs text-destructive">{submissionError}</p>
              )}
            </Panel>
          ) : (
            <SpatialCard depth={2} glowColor="rgba(16, 185, 129, 0.25)" className="rounded-2xl border border-mint/40 bg-mint/10 p-6 backdrop-blur-xl shadow-xl">
              <div className="flex items-start gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-mint text-primary-foreground shadow-lg shadow-mint/30">
                  <Trophy className="size-6" />
                </span>
                <div>
                  <Eyebrow>Telemetry Evaluation Complete</Eyebrow>
                  <h2 className="mt-1 font-display text-lg font-bold text-foreground">
                    Neural RAG Architecture Distinction Earned
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                    Code quality: 94/100 · Completeness: 100% · Guardrails: Active · Verified on-chain credentials registered.
                  </p>
                </div>
              </div>
            </SpatialCard>
          )}
    </>
  );
}

function Analytics() {
  const navigate = useNavigate();
  const progress = useLearningProgress();
  const summary = getLearningProgressSummary(progress);
  const evidence = useLearningEvidence();

  const skillsWithEvidence = [
    {
      skill: "Python for AI",
      status: "In progress",
      evidence: [
        "Module 01: functions, JSON, venv, pip",
        "Practice: CLI that filters JSON and writes a report",
      ],
      tone: "mint" as const,
    },
    {
      skill: "LLM APIs & prompts",
      status: "Available",
      evidence: [
        "Modules 03–04: streaming chat and JSON templates",
        "Gate A: working API chat + validated JSON output",
      ],
      tone: "brand" as const,
    },
    {
      skill: "RAG systems",
      status: "Locked until Module 07",
      evidence: [
        "Modules 06–09: embeddings, RAG, hybrid search, LangChain",
        "Gate B: citations plus a 15-question eval sheet",
      ],
      tone: "lilac" as const,
    },
    {
      skill: "Agents & production",
      status: "Locked until Module 10",
      evidence: [
        "Modules 10–13 and 17: tools, graphs, guardrails, cost",
        "Gate C: bounded agent with traces",
      ],
      tone: "peach" as const,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Skills you can prove"
        title="Evidence from modules, practice, and projects"
        description="Competence is shown with artifacts: working chat, cited RAG, traces, and a production checklist — the same evidence used in junior GenAI interviews."
        action={
          <Button variant="outline" onClick={() => toast("Skill summary copied")}>
            Export skill summary
          </Button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Activity}
          label="Learning Sections"
          value={String(evidence.sectionsCompleted)}
          note="Completed & verified"
          tone="brand"
        />
        <StatCard
          icon={Code2}
          label="Knowledge Checks"
          value={String(evidence.questionsPassed)}
          note="Passed diagnostic checks"
          tone="lilac"
        />
        <StatCard
          icon={Target}
          label="Modules Completed"
          value={`${summary.completedCount}/${summary.totalModules}`}
          note={`${summary.progressPercent}% of curriculum`}
          tone="peach"
        />
        <StatCard
          icon={Flame}
          label="Challenges Solved"
          value={String(evidence.challengesPassed)}
          note="Build & debug evidence"
          tone="mint"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel className="h-full">
          <SectionTitle eyebrow="VERIFIED COMPETENCIES" title="Skills & Supporting Evidence" />
          <div className="space-y-4 mt-3">
            {skillsWithEvidence.map((item) => (
              <div key={item.skill} className="rounded-xl border border-border/70 bg-surface/50 p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm text-foreground">{item.skill}</p>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${softToneMap[item.tone]}`}>
                    {item.status}
                  </span>
                </div>
                <div className="mt-2.5 space-y-1">
                  <p className="text-[10px] font-mono text-faint uppercase">Verification Evidence:</p>
                  {item.evidence.map((ev) => (
                    <p key={ev} className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Check className="size-3 text-mint shrink-0" /> {ev}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="h-full">
          <SectionTitle
            eyebrow="ACADEMIC REMEDIATION"
            title="Focus Areas for Improvement"
            action={
              <Button size="sm" onClick={() => navigate({ to: "/recovery" })}>
                Start Revision Plan <ArrowRight className="size-3.5 ml-1" />
              </Button>
            }
          />
          <p className="text-xs text-muted-foreground mb-4">
            AI analysis of your code challenge submissions highlights specific concepts that require review before advancing.
          </p>
          <div className="space-y-3">
            {gaps.map((gap) => (
              <div
                key={gap.title}
                className="flex items-center gap-3 rounded-xl border border-border/60 p-3.5 bg-surface/40"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-peach-soft text-peach shrink-0">
                  <Lightbulb className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{gap.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{gap.reason}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => navigate({ to: gap.route })}>
                  Review
                </Button>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

const INTERVIEW_PROMPTS = [
  {
    question: "Explain tokens, context windows, and why they drive cost and latency.",
    coach: [
      "A token is a chunk of text the model bills and processes — not always a full word.",
      "The context window is the max tokens the model can see at once (prompt + history + output).",
      "Cost scales with tokens in and out; latency grows with output length and with stuffing unused context.",
    ],
  },
  {
    question: "If the source document has the answer but RAG misses it, where do you debug first?",
    coach: [
      "Start at retrieval, not generation: chunking, overlap, embedding model, and top-k.",
      "Check whether the right chunk was retrieved, then whether the prompt used citations vs. ignored context.",
      "Then hybrid search, metadata filters, and eval questions that prove the chunk should have ranked.",
    ],
  },
  {
    question: "When should you use a chatbot, RAG, or a bounded tool-using agent?",
    coach: [
      "Chatbot: knowledge already in the model or a short conversation with no fresh docs.",
      "RAG: answers must come from your files, with citations and an eval sheet.",
      "Bounded agent: the task needs tools (search, APIs) with a max-step limit, traces, and a human stop.",
    ],
  },
] as const;

function Career() {
  const navigate = useNavigate();
  const [track, setTrack] = useState(CAREER_ROLES[0]!.name);
  const [practiceIndex, setPracticeIndex] = useState<number | null>(null);
  const [answerDraft, setAnswerDraft] = useState("");
  const [showCoach, setShowCoach] = useState(false);
  const activePrompt = practiceIndex !== null ? INTERVIEW_PROMPTS[practiceIndex] : null;

  const openPractice = (index: number) => {
    setPracticeIndex(index);
    setAnswerDraft("");
    setShowCoach(false);
  };
  return (
    <>
      <PageHeader
        eyebrow="From the curriculum · career roles"
        title="Map yourself to one primary role"
        description="Completing this program does not confer a job by itself. It gives you the stack, vocabulary, and artifacts those jobs use every week."
      />
      <div className="grid gap-3 sm:grid-cols-2">
          {CAREER_ROLES.map((role) => (
            <button
              key={role.name}
              onClick={() => setTrack(role.name)}
              className={`rounded-xl border p-4 text-left ${
                track === role.name ? "border-primary bg-brand-soft/50" : "border-border bg-card"
              }`}
            >
              <p className="text-sm font-semibold">{role.name}</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{role.summary}</p>
            </button>
          ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <SectionTitle eyebrow="GAPS TO CLOSE" title="What hiring managers will ask" />
          <div className="space-y-3">
            {gaps.map((gap) => (
              <div
                key={gap.title}
                className="flex items-center gap-3 rounded-xl border border-border/60 p-3"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium">{gap.title}</p>
                  <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{gap.reason}</p>
                </div>
                <Button size="sm" variant="outline" onClick={() => navigate({ to: gap.route })}>
                  Learn <ArrowRight />
                </Button>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <SectionTitle
            eyebrow="INTERVIEW PRACTICE"
            title="Explain these out loud"
            action={
              <span className="rounded-full bg-lilac-soft px-2.5 py-1 text-[10px] font-mono font-bold text-lilac border border-lilac/30">
                3 Concepts Practice Ready
              </span>
            }
          />
          {activePrompt ? (
            <div className="space-y-3">
              <div className="rounded-xl border border-brand/25 bg-brand-soft/40 p-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-brand">
                  Question 0{(practiceIndex ?? 0) + 1} of {INTERVIEW_PROMPTS.length}
                </p>
                <p className="mt-2 text-sm font-semibold leading-6 text-foreground">{activePrompt.question}</p>
              </div>
              <Textarea
                value={answerDraft}
                onChange={(event) => setAnswerDraft(event.target.value)}
                placeholder="Say it out loud, then type the outline you would use in the interview…"
                className="min-h-28 text-sm"
              />
              {showCoach ? (
                <div className="rounded-xl border border-mint/25 bg-mint-soft/70 p-4">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-mint">Coach notes</p>
                  <ul className="mt-2 space-y-1.5 text-xs leading-5 text-foreground/80">
                    {activePrompt.coach.map((point) => (
                      <li key={point} className="flex gap-2">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-mint" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  className="flex-1 font-bold"
                  onClick={() => {
                    if (!answerDraft.trim()) {
                      toast("Draft a short spoken outline first, then reveal the coach notes.");
                      return;
                    }
                    setShowCoach(true);
                    toast.success("Answer captured. Compare it with the coach notes.");
                  }}
                >
                  Check my outline
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    const next = ((practiceIndex ?? 0) + 1) % INTERVIEW_PROMPTS.length;
                    openPractice(next);
                  }}
                >
                  Next question <ArrowRight />
                </Button>
              </div>
              <button
                type="button"
                className="text-xs font-medium text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                onClick={() => setPracticeIndex(null)}
              >
                Back to question list
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {INTERVIEW_PROMPTS.map((item, index) => (
                  <button
                    key={item.question}
                    type="button"
                    onClick={() => openPractice(index)}
                    className="flex w-full items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-3 text-left transition hover:border-brand/40 hover:bg-brand-soft/30"
                  >
                    <span className="font-mono text-[10px] font-bold text-brand">0{index + 1}</span>
                    <p className="flex-1 text-xs font-medium text-foreground">{item.question}</p>
                    <ChevronRight className="size-4 text-faint" />
                  </button>
                ))}
              </div>
              <Button
                className="mt-4 w-full font-bold shadow-md shadow-brand/20"
                onClick={() => openPractice(0)}
              >
                Start Technical Interview Practice <ArrowRight />
              </Button>
            </>
          )}
        </Panel>
      </div>
    </>
  );
}
function StageTracker({ current, large = false }: { current: number; large?: boolean }) {
  return (
    <div className="overflow-x-auto pb-2 no-scrollbar">
      <div className={`grid min-w-[340px] gap-2 ${large ? "grid-cols-5" : "grid-cols-5"}`}>
        {["Curriculum", "Core Skills", "Industry", "Projects", "Interview"].map((label, index) => (
          <div key={label} className="relative flex flex-col items-center gap-1.5 text-center">
            {index > 0 && (
              <span
                className={`absolute right-1/2 top-4 -z-10 hidden h-px w-full sm:block ${index <= current ? "bg-brand/60" : "bg-border"}`}
              />
            )}
            <span
              className={`grid size-8 place-items-center rounded-full text-xs font-semibold ${index < current ? "bg-mint text-primary-foreground" : index === current ? "cp-pulse bg-lilac text-primary-foreground ring-4 ring-lilac/15" : "border border-border bg-background text-faint"}`}
            >
              {index < current ? <Check className="size-3" /> : index + 1}
            </span>
            <span
              className={`text-[10px] whitespace-nowrap ${index === current ? "font-semibold text-foreground" : "text-faint"}`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Profile() {
  const [saved, setSaved] = useState(false);
  const [hours, setHours] = useState(12);
  const [time, setTime] = useState("Morning");
  return (
    <>
      <PageHeader
        eyebrow="Profile & settings"
        title="Make the 16-week plan fit your week."
        description="Your pace, study hours, and target role shape which module and project come next."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <SectionTitle
            eyebrow="Student profile"
            title="Aarav Kulkarni"
            action={
              <span className="grid size-12 place-items-center rounded-2xl bg-lilac-soft font-display font-semibold text-lilac">
                AK
              </span>
            }
          />
          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <Eyebrow>Program</Eyebrow>
              <p className="mt-1 font-semibold text-foreground">{PROGRAM.fullName}</p>
            </div>
            <div>
              <Eyebrow>Pace</Eyebrow>
              <p className="mt-1 font-semibold text-foreground">16 weeks part-time · 8–12 hrs/week</p>
            </div>
            <div>
              <Eyebrow>Career track</Eyebrow>
              <p className="mt-1 font-semibold text-foreground">GenAI Engineer</p>
            </div>
            <div>
              <Eyebrow>Target roles</Eyebrow>
              <p className="mt-1 font-semibold text-mint">GenAI · AI Engineer · Prompt · Product</p>
            </div>
          </div>
        </Panel>
        <Panel>
          <SectionTitle eyebrow="Preferences" title="Study setup" />
          <div className="space-y-4">
            <label className="block">
              <span className="flex justify-between text-xs font-medium">
                <span>Weekly study hours</span>
                <span className="font-mono text-brand">{hours} hours</span>
              </span>
              <input
                type="range"
                min="2"
                max="30"
                value={hours}
                onChange={(event) => setHours(Number(event.target.value))}
                className="mt-3 w-full accent-brand"
              />
            </label>
            <div>
              <span className="text-xs font-medium">Preferred study times</span>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Morning", "Evening", "Weekends"].map((label) => (
                  <Button
                    key={label}
                    size="sm"
                    variant={time === label ? "secondary" : "outline"}
                    onClick={() => setTime(label)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-3 text-xs">
              <input type="checkbox" defaultChecked className="accent-brand" /> Send me a weekly
              plan review
            </label>
            <Button
              onClick={() => {
                setSaved(true);
                toast(`Preferences saved · ${hours} hours · ${time}`);
              }}
            >
              {saved ? (
                <>
                  <Check />
                  Saved
                </>
              ) : (
                <>
                  <Settings2 />
                  Save preferences
                </>
              )}
            </Button>
          </div>
        </Panel>
        <Panel>
          <SectionTitle eyebrow="Achievements" title="Proof you can show" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(
              [
                ["12", "Day streak", Flame, "peach"],
                ["Machine learning", "Foundations", GitBranch, "brand"],
                ["4/5", "Test runner", Code2, "lilac"],
                ["?", "Next badge", Lock, "muted"],
              ] as const
            ).map(([value, label, IconComp, tone]) => (
              <div key={label} className="rounded-xl border border-border/60 p-3">
                <span
                  className={`grid size-8 place-items-center rounded-lg ${tone === "peach" ? "bg-peach-soft text-peach" : tone === "brand" ? "bg-brand-soft text-brand" : tone === "lilac" ? "bg-lilac-soft text-lilac" : "bg-muted text-faint"}`}
                >
                  <IconComp className="size-4" />
                </span>
                <p className="mt-3 font-display text-lg font-semibold">{value as string}</p>
                <p className="text-[10px] text-faint">{label as string}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel>
          <SectionTitle eyebrow="Account" title="Login & access" />
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl bg-background/45 p-3 text-xs">
              <span>aarav.k@example.com</span>
              <span className="text-mint">Verified</span>
            </div>
            <Button variant="outline" onClick={() => toast("Password reset link queued")}>
              Reset password
            </Button>
          </div>
        </Panel>
      </div>
    </>
  );
}

function Recovery() {
  const navigate = useNavigate();
  const [day, setDay] = useState(1);
  return (
    <>
      <PageHeader
        eyebrow="Adaptive remediation · Python"
        title="A 3-day recovery plan, not a guilt spiral."
        description="AI built this plan from your last six attempts: fundamentals first, guided coding next, then a small assessment to prove the gap is closing."
        action={
          <Button variant="outline" onClick={() => navigate({ to: "/analytics" })}>
            <ArrowLeft />
            Back to analytics
          </Button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <Panel className="h-fit">
          <Eyebrow>Recovery sequence</Eyebrow>
          <div className="mt-4 space-y-2">
            {["Day 1 · Fundamentals", "Day 2 · Guided coding", "Day 3 · Challenge + check"].map(
              (label, index) => (
                <button
                  key={label}
                  className={`flex w-full items-center gap-3 rounded-xl p-3 text-left text-xs ${day === index + 1 ? "bg-brand-soft text-brand" : "text-muted-foreground hover:bg-surface"}`}
                  onClick={() => setDay(index + 1)}
                >
                  <span className="grid size-7 place-items-center rounded-lg bg-background/60 font-mono">
                    {index + 1}
                  </span>
                  {label}
                </button>
              ),
            )}
          </div>
        </Panel>
        <Panel>
          <SectionTitle
            eyebrow={`Day ${day} · AI guided`}
            title={
              day === 1
                ? "Rebuild the base case"
                : day === 2
                  ? "Trace before you type"
                  : "Prove the loop holds"
            }
          />
          <div className="rounded-xl bg-lilac-soft/45 p-4">
            <p className="text-xs font-medium">AI recommends this sequence because…</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Your attempts show that data-quality decisions are not yet automatic. Each day
              isolates one part of the cleaning and aggregation workflow before adding pressure.
            </p>
          </div>
          <div className="mt-5 space-y-3">
            {(day === 1
              ? [
                  "Inspect a 7-minute data-quality walkthrough",
                  "Trace nulls and invalid types on paper",
                  "Answer four prediction checks",
                ]
              : day === 2
                ? [
                    "Clean a small Pandas DataFrame first",
                    "Compare median and domain-specific filling",
                    "Ask the tutor for a hint, not the answer",
                  ]
                : [
                    "Aggregate a cleaned cohort",
                    "Run the three challenge tests",
                    "Reflect on which rows were trustworthy",
                  ]
            ).map((item) => (
              <button
                key={item}
                className="flex w-full items-center gap-3 rounded-xl border border-border/60 p-3 text-left text-sm hover:bg-surface"
                onClick={() => navigate({ to: day === 2 ? "/coding-lab" : "/learning-mode" })}
              >
                <span className="grid size-8 place-items-center rounded-lg bg-background text-brand">
                  <ArrowRight className="size-4" />
                </span>
                {item}
                <ChevronRight className="ml-auto size-4 text-faint" />
              </button>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

export function CodepathApp({
  view,
  moduleId,
  concept,
  challengeId,
  stepIndex,
}: {
  view: View;
  moduleId?: ModuleId;
  concept?: string;
  challengeId?: string;
  stepIndex?: number;
}) {
  if (view === "dashboard")
    return (
      <Shell active="dashboard">
        <Dashboard />
      </Shell>
    );
  if (view === "map")
    return (
      <Shell active="map">
        <InteractiveCurriculumMap />
      </Shell>
    );
  if (view === "learning")
    return (
      <Shell active="learning">
        <LearningMode
          {...(moduleId ? { moduleId } : {})}
          {...(concept ? { concept } : {})}
          {...(stepIndex !== undefined ? { stepIndex } : {})}
        />
      </Shell>
    );
  if (view === "tutor")
    return (
      <Shell active="tutor">
        <Tutor />
      </Shell>
    );
  if (view === "lab")
    return (
      <Shell active="lab">
        <CodingLab {...(moduleId ? { moduleId } : {})} />
      </Shell>
    );
  if (view === "challenge" || view === "challenges")
    return (
      <Shell active="challenge">
        <CodingLab
          challenge
          {...(moduleId ? { moduleId } : {})}
          {...(challengeId ? { challengeId } : {})}
        />
      </Shell>
    );
  if (view === "projects")
    return (
      <Shell active="projects">
        <Projects />
      </Shell>
    );
  if (view === "analytics")
    return (
      <Shell active="analytics">
        <Analytics />
      </Shell>
    );
  if (view === "career")
    return (
      <Shell active="career">
        <Career />
      </Shell>
    );
  if (view === "profile")
    return (
      <Shell active="profile">
        <Profile />
      </Shell>
    );
  return (
    <Shell active="recovery">
      <Recovery />
    </Shell>
  );
}

export function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="cp-float absolute -left-40 -top-48 size-[520px] rounded-full bg-brand-soft/25 blur-3xl" />
        <div className="absolute -right-40 top-1/3 size-[560px] rounded-full bg-lilac-soft/25 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-[440px] rounded-full bg-peach-soft/20 blur-3xl" />
      </div>
      <header className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
        <Mark />
        <div className="flex items-center gap-3">
          <Link to="/auth" className="text-sm text-muted-foreground hover:text-foreground">
            Sign in
          </Link>
          <Button asChild>
            <Link to="/auth">
              Start your path <ArrowRight />
            </Link>
          </Button>
        </div>
      </header>
      <main className="relative mx-auto max-w-7xl px-5 pb-16 pt-12 lg:px-8 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-soft/40 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[.18em] text-brand">
              <span className="cp-pulse size-1.5 rounded-full bg-brand" />
              AI-native learning operating system
            </div>
            <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[.98] tracking-tight sm:text-6xl">
              Stop{" "}
              <span className="text-faint line-through decoration-brand/60">
                watching & forgetting
              </span>
              .<br />
              Start <span className="text-brand">understanding & mastering</span>.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
              AI Skills Track turns your university curriculum into structured learning, practical
              projects, verified skills, and a clear path to employability.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to="/auth">
                  Start your personalized path <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/curriculum-map">
                  See the knowledge map <GitBranch />
                </Link>
              </Button>
            </div>
            <div className="mt-9">
              <Eyebrow>Students preparing for placements at</Eyebrow>
              <div className="mt-3 flex flex-wrap gap-2">
                {["Vastu Tech", "Northwind", "Orbit Systems", "Helix Labs", "Kite Cloud"].map(
                  (name) => (
                    <span
                      key={name}
                      className="rounded-lg border border-border bg-surface-elevated px-3 py-2 text-xs text-muted-foreground"
                    >
                      {name}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
          <div className="relative min-h-[450px]">
            <div className="absolute left-3 top-10 w-56 rounded-2xl border border-border bg-surface-elevated/80 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="size-2 rounded-full bg-mint" />
                <Eyebrow>Mastered</Eyebrow>
              </div>
              <p className="mt-3 font-display font-semibold">Python foundations</p>
              <p className="mt-1 text-[11px] text-faint">12 concepts · 96% mastery</p>
            </div>
            <div
              className="absolute right-0 top-2 w-60 rounded-2xl border border-brand/35 bg-brand-soft/60 p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="cp-pulse size-2 rounded-full bg-brand" />
                <Eyebrow>In progress</Eyebrow>
              </div>
              <p className="mt-3 font-display font-semibold">First ML model</p>
              <p className="mt-1 text-[11px] text-faint">Prediction · Module 3.8</p>
            </div>
            <div
              className="absolute bottom-14 left-12 w-60 rounded-2xl border border-lilac/30 bg-lilac-soft/60 p-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="size-2 rounded-full bg-lilac" />
                <Eyebrow>Next unlock</Eyebrow>
              </div>
              <p className="mt-3 font-display font-semibold">RAG retrieval</p>
              <p className="mt-1 text-[11px] text-faint">Data prerequisite met</p>
              <div className="mt-3">
                <ProgressBar value={64} tone="lilac" />
              </div>
            </div>
            <div className="absolute bottom-2 right-4 w-48 rounded-2xl border border-border bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <span className="size-2 rounded-full bg-muted-foreground/40" />
                <Eyebrow>Locked</Eyebrow>
              </div>
              <p className="mt-3 font-display font-semibold text-muted-foreground">Production AI</p>
              <p className="mt-1 text-[11px] text-faint">Unlocks after DP</p>
            </div>
          </div>
        </div>
        <section className="mt-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <Eyebrow>The loop, rebuilt</Eyebrow>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
                Understand → Interact → Code → Build → Prove
              </h2>
            </div>
            <span className="hidden text-[10px] font-mono uppercase tracking-[.18em] text-faint sm:inline">
              5 pillars
            </span>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {(
              [
                [
                  "Curriculum Intelligence",
                  "Maps your real semester units to a live skill graph and finds the shortest path to mastery.",
                  GitBranch,
                  "brand",
                ],
                [
                  "AI Tutor & Feedback",
                  "Explains why a recommendation fits your level, then nudges you with hints instead of answers.",
                  Bot,
                  "lilac",
                ],
                [
                  "Coding Lab & Projects",
                  "Run, test, and get structured AI review — then prove it by shipping something real.",
                  Code2,
                  "peach",
                ],
              ] as const
            ).map(([title, body, IconComp, tone]) => (
              <div
                key={title}
                className="rounded-2xl border border-border bg-surface-elevated/75 p-5 shadow-sm"
              >
                <span
                  className={`grid size-10 place-items-center rounded-xl ${tone === "brand" ? "bg-brand-soft text-brand" : tone === "lilac" ? "bg-lilac-soft text-lilac" : "bg-peach-soft text-peach"}`}
                >
                  <IconComp className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{body as string}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-16 rounded-3xl border border-border bg-surface-elevated/75 p-6 shadow-sm sm:p-10">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <Eyebrow>Your syllabus, alive</Eyebrow>
              <h2 className="mt-2 font-display text-3xl font-semibold">
                Build a path you can actually finish.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                No filler courses. Just your semester, optimized for the person you want to become.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link to="/auth">
                Build my path <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="relative mx-auto flex max-w-7xl flex-col justify-between gap-3 border-t border-border px-5 py-7 text-[11px] text-faint sm:flex-row lg:px-8">
        <span>© 2026 AI Skills Track · practical AI skills for engineering students</span>
        <div className="flex gap-5">
          <span>Product</span>
          <span>Curriculum</span>
          <span>Careers</span>
          <span>Privacy</span>
        </div>
      </footer>
    </div>
  );
}

export function CertificateVerification({ certificateId }: { certificateId: string }) {
  return (
    <div className="min-h-screen bg-[#f7f8fa] px-4 py-8 text-foreground sm:px-8 sm:py-12">
      <main className="mx-auto max-w-3xl">
        <header className="border-b border-border pb-6">
          <Mark />
          <p className="mt-6 text-sm text-muted-foreground">Digital academic credential</p>
        </header>
        <section className="mt-10 rounded-xl border border-border bg-white p-6 sm:p-10">
          <div className="flex items-start justify-between gap-6 border-b border-border pb-8">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Certificate verification</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">Certificate verified</h1>
              <p className="mt-3 text-sm text-muted-foreground">
                This credential is authentic and was issued by AI Skills Track.
              </p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-mint-soft text-mint">
              <ShieldCheck className="size-6" />
            </span>
          </div>
          <dl className="grid gap-6 border-b border-border py-8 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">Student</dt>
              <dd className="mt-1 font-medium">Aarav Sharma</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Cohort</dt>
              <dd className="mt-1 font-medium">GenAI Path 2026</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Certificate ID</dt>
              <dd className="mt-1 font-mono text-sm">{certificateId}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Issued</dt>
              <dd className="mt-1 font-medium">12 June 2026</dd>
            </div>
          </dl>
          <div className="py-8">
            <p className="text-sm text-muted-foreground">Completion summary</p>
            <p className="mt-1 text-2xl font-semibold">20 of 20 modules completed</p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {[
              "Python Foundations for AI",
              "Retrieval-Augmented Generation (RAG)",
              "Agents with Tools",
              "Production AI Systems",
            ].map((module) => (
              <div key={module} className="flex items-center justify-between gap-4 py-4">
                <span className="text-sm font-medium">{module}</span>
                <span className="flex items-center gap-2 text-xs text-mint">
                  <Check className="size-4" /> Verified
                </span>
              </div>
            ))}
          </div>
        </section>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Read-only verification record · AI Skills Track
        </p>
      </main>
    </div>
  );
}

export function PlacementAdmin() {
  const cohorts = [
    ["Overall readiness", "—", "Connect cohort data to calculate"],
    ["Modules mastered", "—", "Connect cohort data to calculate"],
    ["Projects verified", "—", "Connect cohort data to calculate"],
  ];
  return (
    <div className="min-h-screen bg-[#f7f8fa] text-foreground">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8">
          <Mark />
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden text-muted-foreground sm:inline">Placement admin</span>
            <span className="grid size-8 place-items-center rounded-lg bg-brand-soft text-xs font-semibold text-brand">
              PS
            </span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8">
        <PageHeader
          eyebrow="Placement office · Cohort overview"
          title="3rd year CSE 2026"
          description="Understand cohort readiness, identify support needs, and export verified skill signals for recruiters."
          action={
            <Button variant="outline" onClick={() => toast("Cohort report exported")}>
              Export report
            </Button>
          }
        />
        <div className="grid gap-4 md:grid-cols-3">
          {cohorts.map(([label, value, note]) => (
            <section key={label} className="rounded-xl border border-border bg-white p-5">
              <p className="text-sm text-muted-foreground">{label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
              <p className="mt-2 text-xs text-muted-foreground">{note}</p>
            </section>
          ))}
        </div>
        <section className="mt-6 rounded-xl border border-border bg-white p-5">
          <SectionTitle
            eyebrow="Action required"
            title="Students needing support"
            action={
              <Button size="sm" variant="ghost">
                View all <ArrowRight />
              </Button>
            }
          />
          <div className="divide-y divide-border">
            {[
              ["Meera Nair", "12 of 20 modules completed", "Needs a guided learning plan"],
              ["Rohan Das", "1 project awaiting review", "Verification pending"],
              ["Ishita Shah", "58% assessment average", "Revision recommended"],
            ].map(([name, status, note]) => (
              <div key={name} className="flex flex-wrap items-center justify-between gap-3 py-4">
                <div>
                  <p className="text-sm font-medium">{name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{status}</p>
                </div>
                <span className="text-xs text-amber-700">{note}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export function Auth() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            <Mark />
            <div className="mt-12">
              <Eyebrow>Start the 16-week path</Eyebrow>
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
                From Python to production agents.
              </h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Create your account. The program follows one sequence: APIs and prompts, then RAG, then bounded agents, then a portfolio hiring managers can inspect.
              </p>
              <div className="mt-8 space-y-4">
                <Input placeholder="Email address" type="email" />
                <Input placeholder="Password" type="password" />
                <Button className="w-full" onClick={() => navigate({ to: "/onboarding" })}>
                  Continue <ArrowRight />
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate({ to: "/onboarding" })}
                >
                  <Command />
                  Continue with Google
                </Button>
              </div>
              <p className="mt-6 text-center text-[11px] text-faint">
                By continuing, you agree to the demo terms for this training workspace.
              </p>
            </div>
          </div>
        </section>
        <section className="relative hidden overflow-hidden bg-surface p-12 lg:flex lg:items-center">
          <div className="absolute inset-0 bg-brand-soft/10" />
          <div className="relative mx-auto max-w-lg">
            <Eyebrow>Inside your workspace</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-semibold">
              A map that always shows what comes next.
            </h2>
            <div className="mt-10 space-y-3">
              {[
                "20 modules in five clear phases",
                "Six portfolio projects with evals and traces",
                "Roles: GenAI Engineer, AI Engineer, Prompt, Product",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-surface-elevated/80 p-4"
                >
                  <span
                    className={`grid size-9 place-items-center rounded-xl ${index === 0 ? "bg-brand-soft text-brand" : index === 1 ? "bg-lilac-soft text-lilac" : "bg-peach-soft text-peach"}`}
                  >
                    {index === 0 ? (
                      <GraduationCap className="size-4" />
                    ) : index === 1 ? (
                      <BrainCircuit className="size-4" />
                    ) : (
                      <FolderKanban className="size-4" />
                    )}
                  </span>
                  <span className="text-sm font-medium">{item}</span>
                  <Check className="ml-auto size-4 text-mint" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [generating, setGenerating] = useState(false);
  const [hours, setHours] = useState(12);
  const [baseline, setBaseline] = useState("Intermediate");
  const [career, setCareer] = useState("Software Engineer");
  const steps = ["Identity", "Curriculum", "Skill baseline", "Career goal", "Study time"];
  const next = () => {
    if (step < steps.length - 1) setStep((value) => value + 1);
    else {
      setGenerating(true);
      window.setTimeout(() => navigate({ to: "/dashboard" }), 1800);
    }
  };
  if (generating)
    return (
      <div className="grid min-h-screen place-items-center bg-background px-5 text-center">
        <div>
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-soft text-brand">
            <BrainCircuit className="cp-pulse size-8" />
          </div>
          <Eyebrow>AI path generation</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-semibold">
            Building your first two weeks…
          </h1>
          <div className="mx-auto mt-6 max-w-sm space-y-3 text-left">
            {[
              "Reading your Python and API baseline…",
              "Sequencing modules 01–20…",
              "Aligning with the GenAI Engineer hiring bar…",
              "Planning your first two weeks…",
            ].map((item, index) => (
              <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                <span
                  className={`grid size-6 place-items-center rounded-full ${index < 2 ? "bg-mint-soft text-mint" : "bg-brand-soft text-brand"}`}
                >
                  {index < 2 ? (
                    <Check className="size-3" />
                  ) : (
                    <span className="cp-pulse size-1.5 rounded-full bg-brand" />
                  )}
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  return (
    <div className="min-h-screen bg-background px-5 py-6 text-foreground sm:px-10">
      <header className="mx-auto flex max-w-4xl items-center justify-between">
        <Mark />
        <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
          Step {step + 1} of {steps.length}
        </span>
      </header>
      <main className="mx-auto max-w-4xl py-12">
        <div className="mb-10 flex gap-1">
          {steps.map((item, index) => (
            <div key={item} className="flex-1">
              <div
                className={`h-1.5 rounded-full ${index <= step ? "bg-brand" : "bg-foreground/10"}`}
              />
              <p
                className={`mt-2 text-[10px] ${index === step ? "font-semibold text-foreground" : "text-faint"}`}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
        <Panel className="mx-auto max-w-2xl p-6 sm:p-8">
          <Eyebrow>Personalize your path</Eyebrow>
          <h1 className="mt-3 font-display text-3xl font-semibold">{steps[step]}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {step === 0
              ? "Tell us where you are so the first recommendation feels like yours."
              : step === 1
                ? "This program is a single sequenced curriculum. You can confirm the phase list before continuing."
                  : step === 2
                    ? "A quick baseline helps choose how much scaffolding you get in Module 01."
                    : step === 3
                    ? "Your target role changes which projects you pin first."
                    : "Plan on about 8–12 hours per week for 16 weeks, or 8–10 weeks full-time."}
          </p>
          <div className="mt-8 space-y-4">
            {step === 0 && (
              <>
                <Input placeholder="Your name" defaultValue="Aarav Kulkarni" />
                <Input placeholder="Current role or background" defaultValue="Student / career switcher" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input placeholder="Programming comfort" defaultValue="Beginner-friendly Python" />
                  <Input placeholder="Weekly hours" defaultValue="8–12 hours · 16 weeks" />
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <Tabs defaultValue="database">
                  <TabsList className="w-full">
                    <TabsTrigger value="database" className="flex-1">
                      University database
                    </TabsTrigger>
                    <TabsTrigger value="upload" className="flex-1">
                      Upload syllabus
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="database">
                    <Input placeholder="Search program…" defaultValue="Generative AI + Agentic AI + Python" />
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {subjects.map((subject) => (
                        <div
                          key={subject.name}
                          className="flex items-center gap-2 rounded-xl border border-border/60 p-3 text-xs"
                        >
                          <Check className="size-4 text-mint" />
                          {subject.name}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="upload">
                    <div className="grid place-items-center rounded-2xl border border-dashed border-brand/40 bg-brand-soft/25 p-10 text-center">
                      <Upload className="size-8 text-brand" />
                      <p className="mt-3 text-sm font-medium">Drop your syllabus PDF here</p>
                      <p className="mt-1 text-[11px] text-faint">
                        We’ll extract subjects, units, and prerequisites.
                      </p>
                      <Button
                        className="mt-4"
                        variant="outline"
                        onClick={() => toast("Mock parser started · subjects extracted")}
                      >
                        Choose file
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
            {step === 2 && (
              <>
                <p className="text-xs font-medium">How would you rate your AI foundations?</p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {["Beginner", "Intermediate", "Advanced"].map((label, index) => (
                    <button
                      key={label}
                      onClick={() => setBaseline(label)}
                      className={`rounded-xl border p-4 text-left ${baseline === label ? "border-brand bg-brand-soft/50" : "border-border"}`}
                    >
                      <p className="text-sm font-medium">{label}</p>
                      <p className="mt-1 text-[11px] text-faint">
                        {index === 0
                          ? "I’m building the mental model"
                          : index === 1
                            ? "I can solve with some scaffolding"
                            : "I can explain trade-offs"}
                      </p>
                    </button>
                  ))}
                </div>
                <div className="rounded-xl bg-lilac-soft/40 p-4">
                  <p className="text-xs font-medium">Optional quick diagnostic</p>
                  <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                    Four scenario questions on Python, APIs, ML, and RAG will sharpen your
                    AI-detected baseline.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-3"
                    onClick={() => toast("Diagnostic complete · baseline set to Intermediate")}
                  >
                    Run interactive diagnostic
                  </Button>
                </div>
              </>
            )}
            {step === 3 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {(
                  [
                    ["GenAI Engineer", "Prompts, RAG, evaluation, product backends", Code2],
                    ["AI Engineer", "Python, APIs, data pipelines, production sense", Layers3],
                    ["Prompt Engineer", "Templates, eval sets, structured outputs", BrainCircuit],
                    ["AI Product Developer", "User journeys, conversation design, MVPs", BarChart3],
                  ] as const
                ).map(([label, body, IconComp], index) => (
                  <button
                    key={label}
                    className={`rounded-xl border p-4 text-left ${index === 0 ? "border-brand bg-brand-soft/50" : "border-border"}`}
                  >
                    <IconComp className="size-5 text-brand" />
                    <p className="mt-3 text-sm font-medium">{label as string}</p>
                    <p className="mt-1 text-[11px] leading-5 text-faint">{body as string}</p>
                  </button>
                ))}
              </div>
            )}
            {step === 4 && (
              <>
                <div className="rounded-xl border border-border/60 p-4">
                  <div className="flex justify-between text-xs">
                    <span>Weekly hours</span>
                    <span className="font-mono text-brand">{hours} hours</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="30"
                    value={hours}
                    onChange={(event) => setHours(Number(event.target.value))}
                    className="mt-4 w-full accent-brand"
                  />
                </div>
                <div>
                  <p className="text-xs font-medium">Preferred study times</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button size="sm" variant="secondary">
                      Morning
                    </Button>
                    <Button size="sm" variant="outline">
                      Evening
                    </Button>
                    <Button size="sm" variant="outline">
                      Weekends
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mt-8 flex justify-between">
            <Button
              variant="ghost"
              disabled={step === 0}
              onClick={() => setStep((value) => value - 1)}
            >
              <ArrowLeft />
              Back
            </Button>
            <Button onClick={next}>
              {step === steps.length - 1 ? "Generate my path" : "Continue"}
              <ArrowRight />
            </Button>
          </div>
        </Panel>
      </main>
    </div>
  );
}

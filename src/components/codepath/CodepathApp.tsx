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
  ChevronRight,
  CircleHelp,
  Clock,
  Code2,
  Command,
  Compass,
  Database,
  Flame,
  FolderKanban,
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
import { Background3D } from "@/components/ui/Background3D";
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
import { curriculumModules } from "@/lib/curriculum-data";
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
  { label: "Discover", to: "/dashboard", icon: Compass },
  { label: "Curriculum", to: "/curriculum", icon: GitBranch },
  { label: "Learning Mode", to: "/learning-mode", icon: BookOpen },
  { label: "Challenges", to: "/challenges", icon: Zap },
  { label: "Build", to: "/build", icon: FolderKanban },
  { label: "Skills", to: "/skills", icon: BarChart3 },
  { label: "Portfolio", to: "/portfolio", icon: UserRound },
  { label: "Career", to: "/career", icon: Target },
];

const toneMap = { brand: "bg-brand", lilac: "bg-lilac", peach: "bg-peach", mint: "bg-mint" };
const softToneMap = {
  brand: "bg-brand-soft text-brand",
  lilac: "bg-lilac-soft text-lilac",
  peach: "bg-peach-soft text-peach",
  mint: "bg-mint-soft text-mint",
};

function Mark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid size-9 place-items-center rounded-xl bg-ink text-background">
        <GitBranch className="size-5" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p className="font-display text-[15px] font-semibold text-foreground">AI Skills Track</p>
          <p className="text-[10px] uppercase tracking-[.18em] text-faint">
            Curriculum intelligence
          </p>
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
    <p className="font-mono text-[10px] uppercase tracking-[.2em] text-brand/90 font-medium">
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
      ? "bg-mint-soft text-mint border border-mint/30 shadow-[0_0_12px_rgba(20,184,166,0.25)]"
      : status === "in-progress"
        ? "bg-brand-soft text-brand border border-brand/35 cp-pulse shadow-[0_0_14px_rgba(0,180,180,0.3)]"
        : status === "available"
          ? "bg-lilac-soft text-lilac border border-lilac/30 shadow-sm"
          : "bg-muted/70 text-faint border border-border/50";
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
    <SpatialCard depth={8} elevation="medium" className={`rounded-2xl ${className ?? ""}`}>
      <Panel className="p-4.5">
        <div className="flex items-start justify-between">
          <span className={`grid size-10 place-items-center rounded-xl shadow-sm ${softToneMap[tone]}`}>
            <Icon className="size-4.5" />
          </span>
          <span className="font-mono text-[10px] font-semibold text-brand bg-brand-soft/70 px-2 py-0.5 rounded-full border border-brand/20">
            Active
          </span>
        </div>
        <p className="mt-4 text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground">{value}</p>
        <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{note}</p>
      </Panel>
    </SpatialCard>
  );
}

function Shell({ active, children }: { active: View; children: React.ReactNode }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const evidence = useLearningEvidence();
  const progress = useLearningProgress();
  const summary = getLearningProgressSummary(progress);
  const pageTitle = navItems.find(({ to }) => activePath(active, to))?.label ?? "AI Skills Track";
  return (
    <div className="app-shell min-h-screen overflow-x-clip bg-background text-foreground relative">
      <Background3D />
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="cp-float absolute -left-40 -top-48 size-[580px] rounded-full bg-brand-soft/25 blur-3xl opacity-70" />
        <div className="absolute -right-40 top-1/4 size-[620px] rounded-full bg-lilac-soft/20 blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-1/3 size-[480px] rounded-full bg-peach-soft/20 blur-3xl opacity-50" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1540px]">
        <aside className="app-sidebar sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border/70 bg-surface/60 px-4 py-5 backdrop-blur-2xl md:flex">
          <div className="mb-7 px-2">
            <Mark />
          </div>
          <div className="px-2">
            <Eyebrow>3D Laboratory</Eyebrow>
          </div>
          <nav className="mt-2.5 flex flex-col gap-1.5">
            {navItems.map(({ label, to, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activePath(active, to)
                    ? "bg-surface-elevated/95 text-foreground shadow-md ring-1 ring-border/80 translate-x-1"
                    : "text-muted-foreground hover:bg-surface-elevated/60 hover:text-foreground hover:translate-x-0.5"
                }`}
              >
                <Icon
                  className={`size-4 transition-colors ${activePath(active, to) ? "text-brand" : "text-faint"}`}
                />
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto rounded-2xl border border-border/80 bg-surface-elevated/85 p-3.5 shadow-sm backdrop-blur-md">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold">Spine Progress</p>
              <span className="rounded-full bg-lilac-soft px-2 py-0.5 text-[10px] font-semibold text-lilac border border-lilac/30">
                {summary.completedCount}/{summary.totalModules}
              </span>
            </div>
            <ProgressBar value={summary.progressPercent} />
            <p className="mt-2 text-[11px] text-faint truncate">
              Module {summary.currentModule.code} · {summary.currentStepTitle || "Ready to start"}
            </p>
          </div>
          <button
            className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-surface-elevated hover:text-foreground"
            onClick={() => navigate({ to: "/profile" })}
          >
            <Settings2 className="size-4 text-faint" />
            Settings & Lab Config
          </button>
        </aside>
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-foreground/25 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <aside
              className="h-full w-[min(19rem,calc(100vw-2rem))] overflow-y-auto bg-background/95 p-5 shadow-2xl backdrop-blur-xl border-r border-border"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-7 flex items-center justify-between">
                <Mark />
                <Button size="icon" variant="ghost" onClick={() => setMobileOpen(false)}>
                  <X />
                </Button>
              </div>
              <nav className="flex flex-col gap-1.5">
                {navItems.map(({ label, to, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex min-h-11 items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-medium ${
                      activePath(active, to)
                        ? "bg-brand-soft font-semibold text-brand shadow-sm"
                        : "text-muted-foreground hover:bg-surface"
                    }`}
                  >
                    <Icon className="size-4 text-brand" />
                    {label}
                  </Link>
                ))}
              </nav>
            </aside>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-2xl">
            <div className="flex min-h-16 items-center gap-2 px-3 sm:gap-3 sm:px-6">
              <Button
                size="icon"
                variant="ghost"
                className="md:hidden"
                aria-label="Open navigation menu"
                onClick={() => setMobileOpen(true)}
              >
                <Menu />
              </Button>
              <p className="min-w-0 flex-1 truncate font-display text-sm font-semibold sm:hidden">
                {pageTitle}
              </p>
              <div className="hidden flex-1 items-center gap-2 rounded-xl border border-border/80 bg-surface-elevated/80 px-3.5 py-2 shadow-inner backdrop-blur-md sm:flex sm:max-w-md">
                <Search className="size-4 text-faint" />
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-faint"
                  placeholder="Search topics, 3D labs, neural models…"
                />
                <span className="hidden rounded-md bg-foreground/10 px-1.5 py-0.5 font-mono text-[10px] text-faint sm:inline">
                  ⌘K
                </span>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2 rounded-full border border-brand/30 bg-brand-soft/50 px-3 py-1 text-[11px] font-mono text-brand font-medium">
                  <span className="size-2 rounded-full bg-brand cp-pulse" />
                  AI Lab Active
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hidden sm:inline-flex"
                  aria-label="Notifications"
                  onClick={() => toast("All telemetry streams are healthy")}
                >
                  <Bell className="size-4 text-faint" />
                </Button>
                <button
                  className="flex min-h-10 items-center gap-2 rounded-xl bg-surface-elevated/90 px-2.5 py-1.5 text-left border border-border/60 shadow-sm transition"
                  onClick={() => navigate({ to: "/profile" })}
                >
                  <span className="hidden text-xs font-semibold sm:inline">Aarav K.</span>
                  <span className="grid size-7 place-items-center rounded-lg bg-lilac-soft text-xs font-bold text-lilac">
                    AK
                  </span>
                </button>
              </div>
            </div>
          </header>
          <main className="app-main min-w-0 px-4 pb-16 pt-5 sm:px-8 sm:pt-8 lg:px-10">
            {children}
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
    <div className="cp-rise mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:flex-wrap sm:items-end">
      <div className="min-w-0">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-2 max-w-3xl break-words font-display text-[clamp(1.75rem,7vw,2.25rem)] font-semibold leading-tight tracking-tight text-foreground">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] leading-6 text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const evidence = useLearningEvidence();
  const progress = useLearningProgress();
  const summary = getLearningProgressSummary(progress);
  const continueLearning = () => navigate({ to: "/learning-mode", search: summary.continueSearch });
  const startNextModule = () =>
    navigate({ to: "/learning-mode", search: { module: summary.nextModule.code } });

  // 30 curriculum modules spine for 3D path
  const modulesTrack = useMemo(() => {
    return curriculumModules.map((module, idx) => {
      const isCompleted = progress.completedModuleIds.includes(module.code);
      const isCurrent = module.code === summary.currentModule.code;
      const isNext = module.code === summary.nextModule.code;
      const status = isCompleted ? "mastered" : isCurrent ? "in-progress" : isNext ? "available" : "locked";
      return { ...module, status, isCompleted, isCurrent, isNext, index: idx };
    });
  }, [progress.completedModuleIds, summary.currentModule.code, summary.nextModule.code]);

  return (
    <>
      <PageHeader
        eyebrow="AI Engineering Curriculum"
        title="Learning Dashboard"
        description="Track your mastery, explore the 30-module AI engineering curriculum, and continue where you left off."
        action={
          <div className="flex items-center gap-3">
            <Button
              className="shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              onClick={continueLearning}
            >
              <Play className="size-4 mr-1.5 fill-current" /> Continue Learning
            </Button>
          </div>
        }
      />

      {/* Hero Spatial Deck - Primary Learning Action Hub */}
      <SpatialCard depth={2} elevation="medium" className="mb-6 rounded-2xl">
        <section className="spatial-deck rounded-2xl p-6 sm:p-7 relative overflow-hidden">
          <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft border border-brand/25 px-3 py-1 text-[11px] font-mono font-bold text-brand mb-2.5">
                <span className="size-2 rounded-full bg-brand cp-pulse" />
                LEARNING STATE: {summary.moduleState}
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-semibold tracking-tight text-foreground">
                Continue Learning
              </h2>
              <p className="mt-1 text-base text-foreground/90 font-medium max-w-xl">
                Module {summary.currentModule.code} — {summary.currentModule.title}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground font-mono">
                Next: {summary.currentConcept?.title ?? summary.currentStepTitle} · ~{summary.currentConcept?.estimatedMinutes ?? 12} min
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                className="shadow-lg shadow-brand/25 hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm font-bold"
                onClick={continueLearning}
              >
                <Play className="size-4 mr-2 fill-current" /> Resume Learning Studio
              </Button>
            </div>
          </div>

          {/* Curriculum Mastery Evidence Metrics */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-border/60 pt-4">
            <div className="rounded-xl bg-surface-elevated/80 border border-border/70 p-3">
              <p className="text-[10px] font-mono text-faint uppercase">Curriculum Progress</p>
              <p className="mt-1 text-lg font-bold text-foreground">{summary.progressPercent}%</p>
              <p className="text-[11px] text-muted-foreground">{summary.completedCount} / {summary.totalModules} modules</p>
            </div>
            <div className="rounded-xl bg-surface-elevated/80 border border-border/70 p-3">
              <p className="text-[10px] font-mono text-faint uppercase">Concepts Mastered</p>
              <p className="mt-1 text-lg font-bold text-mint">{summary.masteredConceptsCount}</p>
              <p className="text-[11px] text-muted-foreground">verified by check & challenge</p>
            </div>
            <div className="rounded-xl bg-surface-elevated/80 border border-border/70 p-3">
              <p className="text-[10px] font-mono text-faint uppercase">Needs Review</p>
              <p className="mt-1 text-lg font-bold text-peach">{summary.reviewConceptsCount}</p>
              <p className="text-[11px] text-muted-foreground">flagged for revision</p>
            </div>
            <div className="rounded-xl bg-surface-elevated/80 border border-border/70 p-3">
              <p className="text-[10px] font-mono text-faint uppercase">Next Recommended</p>
              <p className="mt-1 text-lg font-bold text-lilac">Module {summary.nextModule.code}</p>
              <p className="text-[11px] text-muted-foreground truncate">{summary.nextModule.title}</p>
            </div>
          </div>

          {/* 3D Connected Waypoints Stream (30 Modules Spine) */}
          <div className="relative mt-6 pt-2 pb-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <GitBranch className="size-3.5 text-brand" /> 30-Module AI Engineering Spine
              </p>
              <span className="font-mono text-xs font-bold text-brand">{summary.progressPercent}% Mastered</span>
            </div>

            {/* Dimensional Path Bar */}
            <div className="relative h-2.5 rounded-full bg-foreground/10 p-[2px] border border-border/60 overflow-hidden mb-5">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand via-lilac to-mint shadow-[0_0_15px_rgba(20,184,166,0.6)] transition-all duration-700"
                style={{ width: `${Math.max(4, summary.progressPercent)}%` }}
              />
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-3 pt-1 no-scrollbar scroll-smooth">
              {modulesTrack.map((mod) => (
                <button
                  key={mod.code}
                  onClick={() =>
                    navigate({
                      to: "/learning-mode",
                      search: { module: mod.code },
                    })
                  }
                  className={`group relative flex-shrink-0 flex flex-col items-start justify-between p-3.5 rounded-xl border transition-all duration-200 text-left w-36 sm:w-40 ${
                    mod.isCurrent
                      ? "border-brand bg-surface-elevated shadow-sm -translate-y-1 ring-1 ring-brand/30"
                      : mod.isCompleted
                      ? "border-mint/30 bg-surface-elevated/90 hover:-translate-y-0.5 hover:border-mint/60 shadow-xs"
                      : mod.isNext
                      ? "border-lilac/40 bg-surface-elevated/80 hover:-translate-y-0.5 hover:border-lilac"
                      : "border-border/60 bg-surface/50 opacity-70 hover:opacity-100 hover:bg-surface-elevated"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span className="font-mono text-[10px] font-semibold text-brand bg-brand-soft px-2 py-0.5 rounded">
                      {mod.code}
                    </span>
                    {mod.isCompleted ? (
                      <span className="grid size-4.5 place-items-center rounded-full bg-mint text-primary-foreground">
                        <Check className="size-3" />
                      </span>
                    ) : mod.isCurrent ? (
                      <span className="size-2 rounded-full bg-brand ring-2 ring-brand/20" />
                    ) : mod.isNext ? (
                      <span className="size-2 rounded-full bg-lilac" />
                    ) : (
                      <Lock className="size-3 text-faint" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-foreground line-clamp-2 leading-snug w-full">
                    {mod.title}
                  </p>
                  <div className="mt-3 flex items-center justify-between w-full text-[10px] text-faint">
                    <span className="truncate">{mod.experienceStage}</span>
                    <span className="font-medium text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                      Open →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </SpatialCard>

      {/* Grid of Telemetry & Next Steps */}
      <section className="mb-6 grid gap-5 lg:grid-cols-2">
        <SpatialCard depth={8} elevation="medium" className="rounded-2xl">
          <Panel className="h-full">
            <SectionTitle
              eyebrow="Neural Mastery History"
              title="Recently Mastered Concepts"
              action={
                <span className="font-mono text-xs text-mint font-semibold">
                  {summary.completedCount} Complete
                </span>
              }
            />
            {summary.recentlyCompleted.length ? (
              <div className="space-y-2.5 mt-3">
                {summary.recentlyCompleted.map((module) => (
                  <div
                    key={module.code}
                    className="flex items-center justify-between gap-3 rounded-xl border border-mint/25 bg-mint-soft/30 p-3 text-sm transition"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="grid size-6 place-items-center rounded-lg bg-mint text-primary-foreground shrink-0 shadow-sm">
                        <Check className="size-3.5" />
                      </span>
                      <span className="font-medium text-foreground truncate">
                        Module {module.code} — {module.title}
                      </span>
                    </div>
                    <span className="rounded-full bg-mint/15 px-2.5 py-0.5 text-[10px] font-mono font-bold text-mint uppercase shrink-0">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border/70 p-6 text-center text-sm text-muted-foreground">
                <p>Complete your first module challenge to record verified evidence here.</p>
                <Button className="mt-3" size="sm" variant="outline" onClick={continueLearning}>
                  Start First Module
                </Button>
              </div>
            )}
          </Panel>
        </SpatialCard>

        <SpatialCard depth={8} elevation="medium" className="rounded-2xl">
          <Panel className="h-full">
            <SectionTitle
              eyebrow="Recommended Flight Node"
              title="Next In Line"
              action={<StatusPill status="available" />}
            />
            <div className="rounded-xl border border-lilac/30 bg-lilac-soft/30 p-4 mt-2">
              <p className="font-mono text-xs font-bold text-lilac">MODULE {summary.nextModule.code}</p>
              <h4 className="font-bold text-base mt-1 text-foreground">{summary.nextModule.title}</h4>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {summary.nextModule.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="rounded-lg bg-surface-elevated/90 border border-border/60 px-2.5 py-1 text-foreground font-medium">
                  {summary.nextModule.experienceStage} Stage
                </span>
                <span className="rounded-lg bg-surface-elevated/90 border border-border/60 px-2.5 py-1 text-muted-foreground font-mono">
                  {summary.nextModule.estimatedTime}
                </span>
              </div>
            </div>
            <Button className="mt-4 w-full shadow-sm" variant="outline" onClick={startNextModule}>
              Initialize Next Module <ArrowRight className="size-4 ml-1" />
            </Button>
          </Panel>
        </SpatialCard>
      </section>

      {/* Explore Further Spatial Matrix */}
      <section className="mb-6 border-t border-border/70 pt-6">
        <Eyebrow>3D Laboratory Workspaces</Eyebrow>
        <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-3">
          <SpatialCard depth={8} elevation="low" className="rounded-2xl">
            <Panel className="h-full">
              <SectionTitle
                eyebrow="Interactive Map"
                title="Curriculum Topology"
                action={
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate({ to: "/curriculum-map" })}
                  >
                    Open <ArrowRight className="size-3.5 ml-1" />
                  </Button>
                }
              />
              <p className="text-xs text-muted-foreground mb-4">
                Explore connected nodes across 5 phases of AI mastery with live prerequisite vectors.
              </p>
              <MiniMap onNode={() => navigate({ to: "/curriculum-map" })} />
            </Panel>
          </SpatialCard>

          <SpatialCard depth={8} elevation="low" className="rounded-2xl">
            <Panel className="h-full">
              <SectionTitle eyebrow="Engineering Lab" title="Target Challenge" />
              <div className="rounded-xl bg-brand-soft/40 border border-brand/20 p-3.5 mt-2">
                <p className="font-bold text-sm text-foreground">{summary.nextModule.title}</p>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                  {summary.nextModule.project || summary.nextModule.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
                  <span className="rounded-md bg-brand-soft px-2 py-0.5 font-semibold text-brand">
                    {summary.nextModule.experienceStage}
                  </span>
                  <span className="font-mono text-muted-foreground">{summary.nextModule.estimatedTime}</span>
                </div>
              </div>
              <Button className="mt-4 w-full" size="sm" onClick={startNextModule}>
                Launch Code Challenge <Code2 className="size-4 ml-1.5" />
              </Button>
            </Panel>
          </SpatialCard>

          <SpatialCard depth={8} elevation="low" className="rounded-2xl">
            <Panel className="h-full">
              <SectionTitle
                eyebrow="Telemetry Evidence"
                title="Capability Metrics"
                action={
                  <Button size="sm" variant="ghost" onClick={() => navigate({ to: "/skills" })}>
                    Inspect
                  </Button>
                }
              />
              <div className="space-y-2.5 text-xs mt-2">
                <div className="flex items-center justify-between rounded-lg bg-surface-elevated/60 border border-border/50 p-2.5">
                  <span className="text-muted-foreground">Sections Finished</span>
                  <span className="font-mono font-bold text-brand">{evidence.sectionsCompleted}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-surface-elevated/60 border border-border/50 p-2.5">
                  <span className="text-muted-foreground">Diagnostic Checks</span>
                  <span className="font-mono font-bold text-lilac">{evidence.questionsPassed}</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-surface-elevated/60 border border-border/50 p-2.5">
                  <span className="text-muted-foreground">Challenges Solved</span>
                  <span className="font-mono font-bold text-mint">{evidence.challengesPassed}</span>
                </div>
              </div>
              <ProgressBar value={summary.progressPercent} className="mt-4" tone="lilac" />
            </Panel>
          </SpatialCard>
        </div>
      </section>

      {/* Activity & Radar Telemetry */}
      <section className="border-t border-border/70 pt-6">
        <Eyebrow>Real-Time Telemetry Stream</Eyebrow>
        <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-12">
          <SpatialCard depth={6} className="lg:col-span-4 rounded-2xl">
            <Panel className="h-full">
              <SectionTitle
                eyebrow="Frequency"
                title="Activity Density"
                action={
                  <span className="flex items-center gap-1 text-xs font-bold text-peach bg-peach-soft/60 px-2.5 py-0.5 rounded-full border border-peach/25">
                    <Flame className="size-3.5" />
                    {evidence.sectionsCompleted} units
                  </span>
                }
              />
              <div className="grid grid-cols-10 gap-1.5 mt-2">
                {heatmap.slice(0, 50).map((item) => (
                  <span
                    key={item.id}
                    className={`aspect-square rounded-[5px] transition-all ${
                      item.intensity === 0
                        ? "bg-foreground/8"
                        : item.intensity === 1
                        ? "bg-brand/35"
                        : item.intensity === 2
                        ? "bg-brand/60"
                        : item.intensity === 3
                        ? "bg-brand/85 shadow-[0_0_8px_rgba(20,184,166,0.5)]"
                        : "bg-brand shadow-[0_0_12px_rgba(20,184,166,0.8)]"
                    }`}
                  />
                ))}
              </div>
            </Panel>
          </SpatialCard>

          <SpatialCard depth={6} className="lg:col-span-4 rounded-2xl">
            <Panel className="h-full">
              <SectionTitle eyebrow="Milestones" title="Career Bridge Signal" />
              <div className="pt-2">
                <StageTracker current={Math.min(4, Math.floor(evidence.challengesPassed / 3))} />
              </div>
              <p className="mt-4 text-[11px] text-faint font-mono">
                {evidence.challengesPassed} of {summary.totalModules} project challenges evidenced
              </p>
            </Panel>
          </SpatialCard>

          <SpatialCard depth={6} className="lg:col-span-4 rounded-2xl">
            <Panel className="h-full">
              <SectionTitle eyebrow="Mastery Profile" title="Competency Web" />
              <div className="relative">
                <ResponsiveContainer width="100%" height={140}>
                  <RadarChart data={skillData}>
                    <PolarGrid stroke="var(--color-border)" />
                    <PolarAngleAxis
                      dataKey="skill"
                      tick={{ fill: "var(--color-faint)", fontSize: 9 }}
                    />
                    <Radar
                      dataKey="mastery"
                      stroke="var(--color-brand)"
                      fill="var(--color-brand)"
                      fillOpacity={0.25}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Panel>
          </SpatialCard>
        </div>
      </section>
    </>
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
        description="Follow the capabilities that turn your degree into practical AI skills. Academic concepts stay connected underneath."
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
                {selected.id === "3.13"
                  ? "Python, data cleaning, model evaluation"
                  : "Programming Fundamentals"}
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
          title="All 30 modules"
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
                  {module.code}
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
  const [lens, setLens] = useState<"journey" | "skills" | "projects" | "list">("journey");
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedCode, setSelectedCode] = useState<ModuleId>("3.1");
  const [concept, setConcept] = useState<string | null>(null);
  const phases = [
    ["FOUNDATION", 0, 6],
    ["MACHINE LEARNING", 7, 12],
    ["DEEP LEARNING & APPLIED AI", 13, 19],
    ["ADVANCED AI ENGINEERING", 20, 27],
    ["CAREER & CAPSTONE", 28, 29],
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
  const relatedBefore = curriculumModules.slice(Math.max(0, selectedIndex - 2), selectedIndex);
  const relatedAfter = curriculumModules.slice(selectedIndex + 1, selectedIndex + 3);
  const allTopics = Array.from(new Set(curriculumModules.flatMap((module) => module.topics)));
  const modules = curriculumModules
    .map((module, index) => ({ module, index, status: statusFor(index) }))
    .filter(({ module, index, status }) => {
      const text =
        `${module.code} ${module.title} ${module.description} ${module.topics.join(" ")}`.toLowerCase();
      const phaseMatch = index >= phases[phase]![1] && index <= phases[phase]![2];
      const filterMatch =
        filter === "All" ||
        filter.toLowerCase() === status ||
        (filter === "Projects" && module.experienceStage === "Ship") ||
        (filter === "Challenges" && module.experienceStage !== "Understand");
      const lensMatch =
        lens === "projects"
          ? module.experienceStage === "Ship"
          : lens === "skills"
            ? module.topics.some((topic) => topic.toLowerCase() === query.toLowerCase())
            : true;
      return (
        text.includes(query.toLowerCase()) &&
        filterMatch &&
        lensMatch &&
        (query.trim() ? true : phaseMatch)
      );
    });
  const selectModule = (code: ModuleId) => {
    setSelectedCode(code);
    setConcept(null);
  };

  return (
    <>
      <PageHeader
        eyebrow={`3D Topology Map · ${mastered} of ${curriculumModules.length} nodes integrated`}
        title="Interactive Curriculum Constellation"
        description="Navigate the spatial topology from Python foundations up to production-grade AI systems."
        action={
          <Button
            className="shadow-lg shadow-brand/20 border border-brand/30 transition-all"
            onClick={() =>
              navigate({
                to: "/learning-mode",
                search: summary.continueSearch,
              })
            }
          >
            <Play className="size-4 mr-1 fill-current" /> Continue Flight Path
          </Button>
        }
      />

      {/* 3D Spatial Deck Filter Hub */}
      <SpatialCard depth={10} elevation="medium" className="mb-6 rounded-2xl">
        <Panel className="border-brand/25 bg-surface-elevated/90 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <span className="size-2.5 rounded-full bg-brand cp-pulse" />
              <div>
                <Eyebrow>ACTIVE NEURAL HIGHWAY</Eyebrow>
                <p className="text-sm font-bold text-foreground">
                  {mastered} of {curriculumModules.length} Knowledge Nodes Mastered
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-brand bg-brand-soft px-3 py-1 rounded-full border border-brand/25">
                {Math.round((mastered / curriculumModules.length) * 100)}% Synchronized
              </span>
            </div>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-foreground/10 p-[2px] border border-border/60">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand via-lilac to-mint transition-all duration-700 shadow-[0_0_12px_rgba(20,184,166,0.6)]"
              style={{ width: `${Math.max(3, (mastered / curriculumModules.length) * 100)}%` }}
            />
          </div>

          {/* Phase Switchers */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
            {phases.map(([label], index) => (
              <button
                key={label}
                onClick={() => {
                  setPhase(index);
                  document
                    .getElementById(`phase-${index}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                }}
                className={`shrink-0 rounded-xl px-3.5 py-2 text-[11px] font-bold tracking-wide transition-all ${
                  phase === index
                    ? "bg-ink text-background shadow-md scale-105"
                    : "bg-surface text-muted-foreground hover:bg-surface-elevated hover:text-foreground border border-border/60"
                }`}
              >
                PHASE 0{index + 1} · {label}
              </button>
            ))}
          </div>

          {/* Search, Filter & Spatial Lens Controls */}
          <div className="mt-4 grid gap-2.5 sm:grid-cols-[1fr_auto_auto]">
            <label className="flex items-center gap-2 rounded-xl border border-border/80 bg-surface/80 px-3.5 shadow-inner">
              <Search className="size-4 text-faint" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-h-11 w-full bg-transparent text-sm outline-none placeholder:text-faint"
                placeholder="Filter spatial nodes, embeddings, RAG, agents…"
              />
            </label>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-xl border border-border/80 bg-surface-elevated px-3 text-sm font-medium shadow-sm"
              aria-label="Filter curriculum"
            >
              {[
                "All",
                "In-progress",
                "Available",
                "Mastered",
                "Locked",
                "Challenges",
                "Projects",
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <div className="flex overflow-x-auto rounded-xl border border-border/80 bg-surface/60 p-1">
              {(["journey", "skills", "projects", "list"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setLens(item)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                    lens === item ? "bg-background text-foreground shadow-sm scale-105" : "text-faint hover:text-foreground"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </Panel>
      </SpatialCard>

      {/* Main Spatial Constellation & Inspector Grid */}
      <div className="grid gap-5 xl:grid-cols-[1fr_370px]">
        <SpatialCard depth={8} elevation="medium" className="rounded-2xl">
          <Panel className="overflow-hidden">
            <SectionTitle
              eyebrow={`PHASE 0${phase + 1} · ${phases[phase]![0]}`}
              title={
                lens === "journey"
                  ? "Connected Spatial Learning Nodes"
                  : lens === "skills"
                    ? "Interactive Skills Lattice"
                    : lens === "projects"
                      ? "Milestone Engineering Builds"
                      : "Knowledge Registry Index"
              }
              action={
                <span className="font-mono text-xs text-brand font-semibold">
                  {modules.length} Nodes in View
                </span>
              }
            />

            {lens === "skills" && (
              <div className="mb-5 flex flex-wrap gap-2 border-b border-border/70 pb-4">
                {allTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setQuery(query === topic ? "" : topic)}
                    className={`rounded-xl px-3 py-1.5 text-[11px] font-medium transition-all ${
                      query === topic
                        ? "bg-brand text-primary-foreground shadow-md shadow-brand/20 scale-105"
                        : "bg-lilac-soft/60 text-lilac border border-lilac/30 hover:bg-lilac-soft"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}

            {/* Dimensional Learning Roadmap View */}
            <div
              className={
                lens === "journey"
                  ? "relative space-y-3.5 pl-6 before:absolute before:bottom-4 before:left-3 before:top-4 before:w-[2px] before:bg-gradient-to-b before:from-brand/60 via-lilac/50 to-border"
                  : lens === "list"
                    ? "grid gap-3.5 md:grid-cols-2"
                    : "grid gap-3.5"
              }
            >
              {modules.map(({ module, index, status }) => (
                <button
                  key={module.code}
                  id={index === phases[phase]![1] ? `phase-${phase}` : undefined}
                  onClick={() => selectModule(module.code)}
                  className={`group relative w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                    selectedCode === module.code
                      ? "border-brand bg-brand-soft/40 shadow-sm ring-1 ring-brand/40 -translate-y-0.5"
                      : "border-border/70 bg-surface-elevated hover:border-brand/40 hover:-translate-y-0.5 hover:shadow-xs"
                  }`}
                >
                  {lens === "journey" && (
                    <span
                      className={`absolute -left-[29px] top-5 size-3.5 rounded-full border-2 border-background transition-all ${
                        status === "mastered"
                          ? "bg-mint shadow-xs"
                          : status === "in-progress"
                          ? "bg-brand ring-2 ring-brand/20"
                          : "bg-border"
                      }`}
                    />
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] font-semibold text-brand bg-brand-soft px-2 py-0.5 rounded border border-brand/20">
                        Module {module.code}
                      </span>
                      <h3 className="mt-1.5 text-sm font-semibold text-foreground group-hover:text-brand transition-colors">
                        {module.title}
                      </h3>
                    </div>
                    <StatusPill status={status} />
                  </div>
                  <p className="mt-1.5 text-xs leading-5 text-muted-foreground">{module.description}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {module.topics.slice(0, 4).map((topic) => (
                      <span
                        key={topic}
                        className="rounded-md bg-lilac-soft/60 px-2 py-0.5 text-[10px] font-medium text-lilac border border-lilac/20"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-2 text-[10px] text-faint font-mono border-t border-border/40 pt-2">
                    <span>
                      {module.estimatedTime} · {module.experienceStage}
                    </span>
                    <span className="text-brand font-medium opacity-0 transition-opacity group-hover:opacity-100 flex items-center gap-1">
                      View details →
                    </span>
                  </div>
                </button>
              ))}
              {!modules.length && (
                <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                  No modules match the active spatial lens. Switch phase or clear search filter.
                </div>
              )}
            </div>
          </Panel>
        </SpatialCard>

        {/* 3D Floating Node Telemetry Inspector */}
        <SpatialCard depth={12} elevation="high" className="h-fit rounded-2xl sticky top-20">
          <Panel className="border-brand/35 bg-surface-elevated/95 p-5 shadow-lg">
            <div className="flex items-center justify-between gap-2 border-b border-border/70 pb-3 mb-3">
              <span className="font-mono text-xs font-bold text-brand bg-brand-soft px-2.5 py-0.5 rounded-md">
                NODE {selectedModule.code}
              </span>
              <StatusPill status={selectedStatus} />
            </div>

            <h3 className="font-display text-lg font-bold tracking-tight text-foreground">
              {selectedModule.title}
            </h3>
            <p className="mt-2 text-xs leading-5 text-muted-foreground">
              {selectedModule.description}
            </p>

            {/* Prerequisite & Dependent Vector HUD */}
            <div className="mt-4 rounded-xl border border-brand/25 bg-brand-soft/40 p-3.5 text-xs">
              <Eyebrow>PREREQUISITE VECTOR STREAM</Eyebrow>
              <p className="mt-1.5 text-muted-foreground leading-relaxed">
                {relatedBefore.length
                  ? `Ascends directly from ${relatedBefore.map((mod) => `Module ${mod.code}`).join(" and ")}.`
                  : "Foundation entry point of your AI engineering path."}{" "}
                {relatedAfter.length
                  ? `Prerequisite for ${relatedAfter.map((mod) => `Module ${mod.code}`).join(" and ")}.`
                  : "Capstone terminal of the curriculum."}
              </p>
            </div>

            <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-border/60 bg-surface/70 p-2.5">
                <Eyebrow>Stage Level</Eyebrow>
                <p className="mt-1 font-bold text-foreground">{selectedModule.experienceStage}</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-surface/70 p-2.5">
                <Eyebrow>Time Velocity</Eyebrow>
                <p className="mt-1 font-bold text-foreground">{selectedModule.estimatedTime}</p>
              </div>
            </div>

            <div className="mt-4">
              <Eyebrow>Concept Sub-Nodes</Eyebrow>
              <div className="mt-2 space-y-1.5">
                {selectedModule.topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => setConcept(topic)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition-all ${
                      concept === topic
                        ? "bg-lilac-soft text-lilac border border-lilac/35 shadow-sm"
                        : "bg-surface/60 hover:bg-lilac-soft/40 text-muted-foreground hover:text-foreground border border-border/40"
                    }`}
                  >
                    <span>{topic}</span>
                    <ChevronRight className="size-3 text-faint" />
                  </button>
                ))}
              </div>
            </div>

            {concept && (
              <div className="mt-3 rounded-xl border border-brand/35 bg-brand-soft/40 p-3 text-xs">
                <p className="font-bold text-brand">{concept}</p>
                <p className="mt-1 text-muted-foreground leading-5">
                  Launch the interactive studio to build, break, and master {concept} with guided diagnostic loops.
                </p>
              </div>
            )}

            <div className="mt-4 rounded-xl border border-border/70 bg-surface/50 p-3 text-xs">
              <Eyebrow>Associated Milestone Build</Eyebrow>
              <p className="mt-1 text-xs font-semibold text-foreground">{selectedModule.project}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {selectedModule.tools.slice(0, 3).map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md bg-peach-soft px-2 py-0.5 text-[10px] font-medium text-peach border border-peach/25"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <Button
              className="mt-5 w-full shadow-md shadow-brand/20"
              onClick={() =>
                navigate({
                  to: "/learning-mode",
                  search: { module: selectedModule.code, concept: concept ?? undefined },
                })
              }
            >
              {selectedStatus === "in-progress" ? "Resume Active Mission" : "Engage Learning Studio"}{" "}
              <ArrowRight className="size-4 ml-1.5" />
            </Button>
          </Panel>
        </SpatialCard>
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
    ["Foundations", 0, 6],
    ["Machine Learning", 7, 12],
    ["Deep Learning & Applied AI", 13, 19],
    ["Advanced AI Engineering", 20, 27],
    ["Career & Capstone", 28, 29],
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
      <Panel className="mb-5">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {phases.map(([label], index) => (
            <button
              key={label}
              onClick={() => setPhase(index)}
              className={`shrink-0 rounded-full px-3 py-2 text-xs ${phase === index ? "bg-ink text-background" : "bg-muted text-faint"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto_auto]">
          <label className="flex items-center gap-2 rounded-xl border border-border/70 px-3">
            <Search className="size-4 text-faint" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="min-h-11 w-full bg-transparent text-sm outline-none"
              placeholder="Search modules, topics, or skills"
            />
          </label>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-xl border border-border/70 bg-surface-elevated px-3 text-sm"
            aria-label="Filter curriculum"
          >
            {[
              "All",
              "In-progress",
              "Available",
              "Mastered",
              "Locked",
              "Challenges",
              "Projects",
            ].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <div className="flex rounded-xl border border-border/70 p-1">
            {(["journey", "list"] as const).map((item) => (
              <button
                key={item}
                onClick={() => setView(item)}
                className={`rounded-lg px-3 py-2 text-xs capitalize ${view === item ? "bg-background shadow-sm" : "text-faint"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </Panel>
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Panel>
          <SectionTitle
            eyebrow={`${phases[phase]![0]} · ${modules.length} modules`}
            title={view === "journey" ? "Follow the path" : "Find a module"}
          />
          <div
            className={
              view === "journey"
                ? "space-y-3 border-l-2 border-border pl-4"
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
                className={`relative w-full rounded-xl border p-4 text-left ${selectedCode === module.code ? "border-brand bg-brand-soft/40" : "border-border/70 bg-background/35"}`}
              >
                {view === "journey" && (
                  <span className="absolute -left-[25px] top-5 size-3 rounded-full border-2 border-background bg-brand" />
                )}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-[10px] text-brand">{module.code}</p>
                    <h3 className="mt-1 text-sm font-semibold">{module.title}</h3>
                  </div>
                  <StatusPill status={status} />
                </div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{module.description}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {module.topics.slice(0, 4).map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-lilac-soft px-2 py-1 text-[10px] text-lilac"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-[10px] text-faint">
                  {module.estimatedTime} · {module.experienceStage}
                </p>
              </button>
            ))}
          </div>
        </Panel>
        <Panel className="h-fit">
          <SectionTitle
            eyebrow={`${selectedModule.code} · ${statusFor(selectedIndex)}`}
            title={selectedModule.title}
          />
          <p className="text-sm leading-6 text-muted-foreground">{selectedModule.description}</p>
          <div className="mt-4 rounded-xl bg-brand-soft/40 p-3 text-xs">
            <Eyebrow>Path</Eyebrow>
            <p className="mt-1 text-muted-foreground">
              {selectedIndex
                ? `Prerequisite: ${selectedModule.prerequisites.join(", ")}`
                : "Start here and build your first evidence."}{" "}
              · Next: {curriculumModules[selectedIndex + 1]?.code ?? "Complete"}
            </p>
          </div>
          <Eyebrow>Concepts and activities</Eyebrow>
          <div className="mt-2 space-y-2">
            {experience.learningSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setConcept(section.concept)}
                className={`w-full rounded-lg p-2 text-left text-xs ${concept === section.concept ? "bg-lilac-soft text-lilac" : "bg-background/50"}`}
              >
                {section.concept}
              </button>
            ))}
            <p className="rounded-lg bg-background/50 p-2 text-xs">
              Practice → Break it → Challenge → Mastery evidence
            </p>
          </div>
          {concept && (
            <div className="mt-3 rounded-xl border border-brand/30 p-3 text-xs">
              <strong>{concept}</strong>
              <p className="mt-1 text-muted-foreground">
                {
                  experience.learningSections.find((section) => section.concept === concept)
                    ?.explanation
                }
              </p>
            </div>
          )}
          <Button
            className="mt-5 w-full"
            onClick={() =>
              navigate({ to: "/learning-mode", search: { module: selectedModule.code } })
            }
          >
            {statusFor(selectedIndex) === "in-progress" ? "Continue learning" : "Explore learning"}{" "}
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

  const currentConceptItem =
    experience.module.concepts[
      Math.min(conceptIndex >= 0 ? conceptIndex : 0, experience.module.concepts.length - 1)
    ] ?? experience.module.concepts[0]!;

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
        eyebrow={`AI Classroom Studio · Module ${experience.module.code}`}
        title={experience.module.title}
        description="A comprehensive pedagogical progression: Hook → Why → Learn → Try It → Practice → Break It → Your Turn → Knowledge Check → Mastery → Next."
        action={
          <div className="flex items-center gap-2">
            <StatusPill status={experience.module.status} />
            <span className="rounded-full bg-brand-soft border border-brand/30 px-3 py-1 text-[11px] font-mono font-bold text-brand">
              Stage {stepIndex + 1}/{experience.steps.length}: {step.stage}
            </span>
          </div>
        }
      />

      {/* Concept Progress Hierarchy Bar */}
      <SpatialCard depth={4} elevation="low" className="mb-4 rounded-2xl p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GitBranch className="size-4 text-brand" />
            <span className="text-xs font-bold text-foreground">Module {experience.module.code} Concept Hierarchy:</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground">Est. Total Time:</span>
            <span className="font-mono font-bold text-brand">{experience.module.estimatedTime}</span>
          </div>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-4">
          {experience.module.concepts.map((c, i) => (
            <div
              key={c.id}
              className={`rounded-xl border p-2.5 text-xs transition ${
                c.id === currentConceptItem?.id
                  ? "border-brand bg-brand-soft/50 font-bold text-brand"
                  : "border-border/60 bg-surface/40 text-muted-foreground"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>Concept {i + 1}</span>
                <span className="font-mono text-[10px]">{c.estimatedMinutes}m</span>
              </div>
              <p className="mt-1 font-semibold text-foreground truncate">{c.title}</p>
            </div>
          ))}
        </div>
      </SpatialCard>

      {/* 3D Stepper Tabs */}
      <SpatialCard depth={8} elevation="medium" className="mb-6 rounded-2xl">
        <Panel className="border-brand/30 bg-surface-elevated/95 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-brand cp-pulse" />
                <Eyebrow>{step.stage} STAGE · {currentConceptItem.title.toUpperCase()}</Eyebrow>
              </div>
              <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {step.title}
              </h2>
            </div>
            <span className="font-mono text-xs font-bold text-brand bg-brand-soft px-3 py-1 rounded-full border border-brand/25 shrink-0">
              {Math.round(((stepIndex + 1) / experience.steps.length) * 100)}% Classroom Loop
            </span>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1.5 no-scrollbar">
            {experience.steps.map((item, index) => (
              <button
                key={item.id}
                className={`flex items-center gap-2 shrink-0 rounded-xl px-3 py-2 text-xs font-bold tracking-wide transition-all ${
                  index === stepIndex
                    ? "bg-ink text-background shadow-lg shadow-ink/20 scale-105"
                    : index < stepIndex
                      ? "bg-mint-soft text-mint border border-mint/35 hover:bg-mint-soft/80"
                      : "bg-surface text-faint hover:bg-surface-elevated hover:text-foreground border border-border/60"
                }`}
                onClick={() => index <= stepIndex && setStepIndex(index)}
              >
                <span className={`grid size-5 place-items-center rounded-lg text-[10px] font-mono ${
                  index === stepIndex ? "bg-background/25 text-background" : index < stepIndex ? "bg-mint text-primary-foreground" : "bg-muted"
                }`}>
                  {index < stepIndex ? <Check className="size-3" /> : index + 1}
                </span>
                {item.stage}
              </button>
            ))}
          </div>
        </Panel>
      </SpatialCard>

      {/* Main Studio 3D Interactive Workbench */}
      <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <SpatialCard depth={10} elevation="high" className="rounded-2xl">
          <Panel className="cp-rise p-6">
            <p className="max-w-3xl text-base leading-7 text-foreground/90 font-medium">
              {step.explanation}
            </p>

            {/* Why It Matters Callout */}
            <div className="mt-5 rounded-2xl border border-lilac/30 bg-lilac-soft/40 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1.5">
                <Lightbulb className="size-4 text-lilac" />
                <Eyebrow>WHY THIS MATTERS</Eyebrow>
              </div>
              <p className="text-sm leading-6 text-foreground/85 font-medium">{step.whyItMatters}</p>
            </div>

            {/* Stage-specific Interactive Environments */}
            {step.stage === "BREAK IT" ? (
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-peach/40 bg-ink p-4 text-xs font-mono text-background/90">
                  <div className="flex items-center justify-between text-peach font-bold mb-2 pb-1 border-b border-background/20">
                    <span>⚠️ INTENTIONALLY BROKEN CODE ARTIFACT</span>
                    <span>Step 1: Predict & Inspect</span>
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap">{step.example}</pre>
                </div>

                <p className="text-sm font-bold text-foreground">1. Predict what will fail:</p>
                {step.options && (
                  <div className="grid gap-2 sm:grid-cols-3">
                    {step.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => choose(opt)}
                        className={`rounded-xl border p-3 text-left text-xs font-medium transition ${
                          selected === opt
                            ? "border-peach bg-peach-soft text-peach font-bold"
                            : "border-border/70 hover:border-peach/50 bg-surface-elevated"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {breakPredicted && (
                  <div className="mt-4 rounded-xl border border-mint/40 bg-mint-soft/30 p-4 space-y-3">
                    <p className="text-xs font-bold text-mint">2. Fix the bug to restore invariants:</p>
                    <pre className="font-mono text-xs bg-ink p-3 rounded-lg text-background">
                      {step.fixedCode ?? "def process_data(items):\n    return [int(x) * 2 for x in items if str(x).isdigit()]"}
                    </pre>
                    <Button size="sm" onClick={() => { setBreakFixed(true); toast("Bug resolved successfully!"); }}>
                      <Check className="size-4 mr-1" /> Verify Bug Fix
                    </Button>
                  </div>
                )}
              </div>
            ) : step.stage === "YOUR TURN" ? (
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl border border-brand/30 bg-surface-elevated p-4">
                  <p className="text-xs font-bold text-brand mb-1">INDEPENDENT APPLICATION</p>
                  <p className="text-sm text-foreground mb-3">{step.prompt}</p>
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
                <p className="text-sm font-bold text-foreground">{step.prompt}</p>
                {step.options && (
                  <div className="grid gap-2 sm:grid-cols-2">
                    {step.options.map((opt, i) => (
                      <button
                        key={opt}
                        onClick={() => choose(opt)}
                        className={`rounded-xl border p-3.5 text-left text-xs font-medium transition ${
                          selected === opt
                            ? selected === step.answer
                              ? "border-mint bg-mint-soft text-mint font-bold"
                              : "border-peach bg-peach-soft text-peach font-bold"
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
                    <p>{step.misconceptionExpl ?? step.whyItMatters}</p>
                  </div>
                )}
              </div>
            ) : step.stage === "MASTERY" ? (
              <div className="mt-5 space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-mint/40 bg-mint-soft/30 p-3.5">
                    <p className="font-mono text-[10px] font-bold uppercase text-mint">WHAT YOU LEARNED</p>
                    <p className="mt-1 text-xs text-foreground font-medium">{experience.module.topics.join(" · ")}</p>
                  </div>
                  <div className="rounded-xl border border-brand/40 bg-brand-soft/30 p-3.5">
                    <p className="font-mono text-[10px] font-bold uppercase text-brand">WHAT YOU CAN DO</p>
                    <p className="mt-1 text-xs text-foreground font-medium">{experience.module.learningObjectives[0]}</p>
                  </div>
                  <div className="rounded-xl border border-lilac/40 bg-lilac-soft/30 p-3.5">
                    <p className="font-mono text-[10px] font-bold uppercase text-lilac">WHAT NEEDS REVIEW</p>
                    <p className="mt-1 text-xs text-foreground font-medium">None. All diagnostic checkpoints validated.</p>
                  </div>
                  <div className="rounded-xl border border-peach/40 bg-peach-soft/30 p-3.5">
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
                <div className="rounded-2xl border border-border/80 bg-ink p-5 shadow-inner">
                  <div className="flex items-center justify-between border-b border-background/15 pb-2.5 mb-3 text-[11px] font-mono text-background/60">
                    <span className="text-background/80 font-bold">concept_execution.py</span>
                    <span>Python 3.12</span>
                  </div>
                  <pre className="max-h-72 overflow-auto whitespace-pre-wrap font-mono text-xs leading-6 text-background/90">
                    {step.example}
                  </pre>
                </div>

                {step.options && (
                  <div className="grid gap-2.5 sm:grid-cols-3">
                    {step.options.map((option) => (
                      <button
                        key={option}
                        onClick={() => choose(option)}
                        className={`rounded-xl border p-4 text-left text-sm font-medium transition ${
                          selected === option
                            ? "border-brand bg-brand-soft text-brand font-bold"
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
            <div className="mt-8 flex justify-between gap-3 border-t border-border/70 pt-5">
              <Button
                variant="outline"
                disabled={stepIndex === 0}
                onClick={() => setStepIndex((value) => Math.max(0, value - 1))}
              >
                <ArrowLeft className="size-4 mr-1" /> Previous Stage
              </Button>
              <Button onClick={next} className="shadow-md shadow-brand/20">
                {stepIndex === experience.steps.length - 1 ? "Advance to Challenge" : "Continue Stage"}{" "}
                <ArrowRight className="size-4 ml-1.5" />
              </Button>
            </div>
          </Panel>
        </SpatialCard>

        {/* 3D Context Telemetry & Mentor Sidebar */}
        <SpatialCard depth={10} elevation="medium" className="h-fit rounded-2xl sticky top-20">
          <Panel className="border-brand/35 bg-surface-elevated/95 p-5 shadow-lg">
            <SectionTitle
              eyebrow={`Telemetry · Module ${experience.module.code}`}
              title={experience.challenge.title}
            />
            <p className="text-xs leading-5 text-muted-foreground">
              {experience.challenge.description}
            </p>

            <div className="mt-4 space-y-3 text-xs">
              <FeedbackCard
                label="Concept Sequence"
                body={`${experience.learningSections.length} concepts · ${experience.learningSections.map((sec) => sec.concept).join(" · ")}`}
                tone="brand"
              />
              <FeedbackCard label="Target Topics" body={experience.module.topics.join(" · ")} tone="lilac" />
              <FeedbackCard
                label="Learning Objective"
                body={experience.module.learningObjectives[0] ?? experience.module.description}
                tone="mint"
              />
              <FeedbackCard
                label="AI Mentor Guidance"
                body={experience.challenge.hints[0] ?? experience.challenge.problem}
                tone="peach"
              />
            </div>

            <Button
              variant="outline"
              className="mt-5 w-full border-border/80"
              onClick={() => navigate({ to: "/tutor" })}
            >
              <Bot className="size-4 mr-1.5 text-brand" /> Ask AI Studio Tutor
            </Button>
          </Panel>
        </SpatialCard>
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
      className={`rounded-2xl border border-border/80 bg-surface-elevated ${compact ? "p-4" : "p-5 sm:p-6"}`}
    >
      <SectionTitle
        eyebrow={`Code Editor · Module ${challenge.moduleId}`}
        title={challenge.title}
        action={
          <div className="flex items-center gap-2">
            <StatusPill status="available" />
            <Button size="sm" variant="outline" onClick={() => setValue(code)}>
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
          <div className="min-w-0 overflow-x-auto">
            <div className="flex min-w-max">
              <div className="select-none bg-black/20 px-3.5 py-4 text-right font-mono text-[11px] leading-5 text-background/30">
                {value.split("\n").map((_, index) => (
                  <div key={index}>{String(index + 1).padStart(2, "0")}</div>
                ))}
              </div>
              <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="min-h-[280px] min-w-[34rem] flex-1 resize-none overflow-x-auto bg-transparent p-4 pl-3 font-mono text-[12px] leading-5 text-background outline-none placeholder:text-muted-foreground"
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
              className="flex-1 shadow-xs"
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
            <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
              {challenge.hints[Math.min(hint, challenge.hints.length - 1)]}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-1.5 h-7 px-0 text-peach hover:text-peach/80 text-xs"
              onClick={() => setHint((val) => Math.min(challenge.hints.length, val + 1))}
            >
              Next hint <ChevronRight className="size-3.5 ml-0.5" />
            </Button>
          </div>
        </div>
      </div>
      {onNext && (
        <Button className="mt-5 shadow-xs" size="sm" onClick={onNext}>
          Run challenge <ArrowRight className="size-3.5 ml-1" />
        </Button>
      )}
    </SpatialCard>
  );
}

function Challenge({ onSubmit, moduleId = "3.1" }: { onSubmit: () => void; moduleId?: ModuleId }) {
  const primaryChallenge = getChallengeForModule(moduleId);
  return (
    <SpatialCard depth={2} elevation="medium" className="rounded-2xl border border-border/80 bg-surface-elevated p-5 sm:p-6">
      <SectionTitle
        eyebrow={`Challenge · Module ${primaryChallenge.moduleId}`}
        title={primaryChallenge.title}
        action={
          <span className="rounded-full border border-peach/30 bg-peach-soft/60 px-3 py-1 text-[11px] font-semibold text-peach">
            {primaryChallenge.difficulty}
          </span>
        }
      />
      <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
        {primaryChallenge.problem}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {primaryChallenge.topic.split(" and ").map((topic, index) => (
          <span
            key={topic}
            className={`rounded-full border px-3 py-1 text-[11px] font-medium ${
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
      <div className="mt-5 rounded-xl border border-border/70 bg-surface/70 p-4 font-mono text-[11px] leading-6 text-foreground">
        {primaryChallenge.tests.map((test) => (
          <span key={test.id} className="block border-b border-border/40 py-1 last:border-none">
            <span className="text-muted-foreground">Case {test.id}:</span> rows = {test.input}
            <br />
            <span className="text-brand font-semibold">Expected:</span> {test.expected}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-3">
        <Button className="shadow-xs" onClick={onSubmit}>
          <Play className="size-3.5 mr-1" />
          Run tests
        </Button>
        <Button variant="outline" onClick={() => toast(`AI hint: ${primaryChallenge.hints[0]}`)}>
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
        eyebrow={challenge ? "Challenge · attempt history" : "Coding Lab · build & prove"}
        title={challenge ? primaryChallenge.title : "Turn concepts into runnable code."}
        description={
          challenge
            ? "A focused challenge with examples, attempt history, progressive hints, and AI review."
            : "A focused workspace for practicing Python, Java, C++, and JavaScript against realistic test cases."
        }
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast(`Hint 1: ${primaryChallenge.hints[0]}`)}>
              Get a hint
            </Button>
            <Button onClick={() => setReview(true)}>
              <BrainCircuit />
              AI Review My Code
            </Button>
          </div>
        }
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
        <div>
          <CodeEditor code={primaryChallenge.starterCode} challenge={primaryChallenge} compact />
          <Panel className="mt-4">
            <SectionTitle
              eyebrow="Test cases"
              title="Submission output"
              action={
                <span className="rounded-full bg-mint-soft px-2 py-1 text-[10px] font-semibold text-mint">
                  3 / 3 passing
                </span>
              }
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-[10px] uppercase tracking-wider text-faint">
                  <tr>
                    <th className="pb-3">Case</th>
                    <th className="pb-3">Input</th>
                    <th className="pb-3">Expected</th>
                    <th className="pb-3">Actual</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {primaryChallenge.tests.map((test) => (
                    <tr key={test.id} className="border-t border-border/60">
                      <td className="py-3 font-mono text-faint">{test.id}</td>
                      <td className="py-3 font-mono">{test.input}</td>
                      <td className="py-3 font-mono">{test.expected}</td>
                      <td className="py-3 font-mono">{test.expected}</td>
                      <td className="py-3">
                        <span className="text-mint">✓ Pass</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>
        <Panel className="h-fit">
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
              <div className="rounded-xl bg-brand-soft/40 p-3">
                <p className="text-xs font-medium">AI recommends review because…</p>
                <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                  Your third test exposes a pattern that is more useful to study than a perfect
                  score.
                </p>
              </div>
            )}
          </div>
          <Button className="mt-4 w-full" onClick={() => setReview(true)}>
            {review ? "Review updated" : "Review my code"}
            <BrainCircuit />
          </Button>
        </Panel>
      </div>
      {challenge && (
        <Panel className="mt-4">
          <SectionTitle
            eyebrow="Curriculum challenge library"
            title="One distinct build for every module"
          />
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {allCurriculumChallenges.map((item) => (
              <div key={item.id} className="rounded-xl border border-border/60 p-3">
                <div className="flex items-center justify-between gap-2">
                  <Eyebrow>Module {item.moduleId}</Eyebrow>
                  <span className="rounded-full bg-brand-soft px-2 py-1 text-[10px] text-brand">
                    {item.type}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold">{item.title}</p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.description}</p>
                <p className="mt-2 text-[10px] text-faint">
                  {item.topic} · {item.difficulty}
                </p>
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
        eyebrow="🚀 Applied Capstone · 3D AI Lab"
        title="Document Intelligence & Neural RAG Engine"
        description="Apply vector indexing, semantic embeddings, hierarchical chunking, and grounded generation into an enterprise-grade AI system."
        action={
          <div className="flex items-center gap-4 rounded-2xl border border-brand/20 bg-surface-elevated/80 px-4 py-2 shadow-lg backdrop-blur-md">
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
              <p className="text-xs font-semibold">4–6 Weeks Scope</p>
              <p className="text-[11px] text-faint">{completed}/5 Stages Verified</p>
            </div>
          </div>
        }
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="space-y-5">
          <SpatialCard depth={2} glowColor="rgba(37, 99, 235, 0.15)" className="rounded-2xl border border-border/80 bg-surface-elevated/85 p-6 shadow-xl backdrop-blur-xl">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-brand/30 bg-brand-soft/60 px-3 py-1 text-[11px] font-medium text-brand">
                Python 3.12
              </span>
              <span className="rounded-full border border-lilac/30 bg-lilac-soft/60 px-3 py-1 text-[11px] font-medium text-lilac">
                Vector Retrieval (Qdrant)
              </span>
              <span className="rounded-full border border-peach/30 bg-peach-soft/60 px-3 py-1 text-[11px] font-medium text-peach">
                RAG Triad Evaluation
              </span>
              <span className="rounded-full border border-mint/30 bg-mint-soft/60 px-3 py-1 text-[11px] font-medium text-mint">
                LangGraph Agents
              </span>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Engineer a production-ready document intelligence system. You will ingest unstructured corpora, configure hybrid dense-sparse vector search, build hallucination guardrails, and benchmark real-time retrieval accuracy with TruLens.
            </p>
          </SpatialCard>

          <Panel elevation="medium">
            <SectionTitle
              eyebrow="Architectural Timeline"
              title={`${completed} of 5 Milestones Completed`}
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
                      <div className="ml-12 space-y-2.5">
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
        </div>

        <SpatialCard depth={1} className="h-fit rounded-2xl border border-border/80 bg-surface-elevated/85 p-6 shadow-xl backdrop-blur-xl">
          <SectionTitle eyebrow="AI Mentor Telemetry" title="Readiness Status" />
          <div className="rounded-xl border border-brand/20 bg-brand-soft/40 p-4">
            <p className="text-xs font-semibold text-foreground">Strategic Recommendation</p>
            <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
              You have mastered the prerequisite chain for high-dimensional vector search. This project completes your full-stack AI engineer portfolio.
            </p>
          </div>
          <div className="mt-5 space-y-3.5 text-xs text-muted-foreground">
            <p className="flex items-center gap-2.5">
              <Clock className="size-4 text-brand" />
              <span>Estimated 4–6 weeks</span>
            </p>
            <p className="flex items-center gap-2.5">
              <Code2 className="size-4 text-lilac" />
              <span>5 Verified Architecture Milestones</span>
            </p>
            <p className="flex items-center gap-2.5">
              <ShieldCheck className="size-4 text-mint" />
              <span>Production Interview Portfolio Asset</span>
            </p>
          </div>
        </SpatialCard>
      </div>
    </>
  );
}

function Analytics() {
  const navigate = useNavigate();
  const progress = useLearningProgress();
  const summary = getLearningProgressSummary(progress);
  const evidence = useLearningEvidence();
  const pie = [
    { name: "Complete", value: summary.progressPercent },
    { name: "Remaining", value: 100 - summary.progressPercent },
  ];
  return (
    <>
      <PageHeader
        eyebrow="Learning analytics"
        title="See where effort becomes capability."
        description={`${summary.completedCount} of ${summary.totalModules} curriculum modules completed.`}
        action={
          <Button variant="outline" onClick={() => toast("Weekly report exported")}>
            Export report
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <StatCard
          className="md:col-span-6 lg:col-span-3"
          icon={Activity}
          label="Sections completed"
          value={String(evidence.sectionsCompleted)}
          note={`${summary.progressPercent}% curriculum`}
          tone="brand"
        />
        <StatCard
          className="md:col-span-6 lg:col-span-3"
          icon={Code2}
          label="Questions passed"
          value={String(evidence.questionsPassed)}
          note="Learning checks"
          tone="lilac"
        />
        <StatCard
          className="md:col-span-6 lg:col-span-3"
          icon={Target}
          label="Modules completed"
          value={`${summary.completedCount}/${summary.totalModules}`}
          note={`${summary.progressPercent}% complete`}
          tone="peach"
        />
        <StatCard
          className="md:col-span-6 lg:col-span-3"
          icon={Flame}
          label="Challenges passed"
          value={String(evidence.challengesPassed)}
          note="Build evidence"
          tone="mint"
        />
        <Panel className="lg:col-span-4">
          <SectionTitle eyebrow="Curriculum completion" title="AI Curriculum · Year 3" />
          <div className="relative">
            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                <Pie
                  data={pie}
                  innerRadius={62}
                  outerRadius={82}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  <Cell fill="var(--color-brand)" />
                  <Cell fill="var(--color-foreground)" fillOpacity={0.08} />
                </Pie>
                <text
                  x="50%"
                  y="48%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="var(--color-foreground)"
                  fontSize="28"
                  fontWeight="600"
                >
                  {summary.progressPercent}%
                </text>
                <text
                  x="50%"
                  y="61%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="var(--color-faint)"
                  fontSize="10"
                >
                  complete
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-muted-foreground">
            {summary.completedCount} of {summary.totalModules} modules mastered
          </p>
        </Panel>
        <Panel className="lg:col-span-8">
          <SectionTitle eyebrow="Skill mastery" title="Competencies across your path" />
          <ResponsiveContainer width="100%" height={270}>
            <BarChart data={skillData} layout="vertical" margin={{ left: 20, right: 15 }}>
              <CartesianGrid stroke="var(--color-border)" horizontal={false} />
              <XAxis
                type="number"
                domain={[0, 100]}
                tick={{ fill: "var(--color-faint)", fontSize: 10 }}
              />
              <YAxis
                type="category"
                dataKey="skill"
                tick={{ fill: "var(--color-faint)", fontSize: 10 }}
                width={62}
              />
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface-elevated)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                }}
              />
              <Bar dataKey="mastery" fill="var(--color-brand)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel className="lg:col-span-7">
          <SectionTitle eyebrow="Assessment trend" title="Performance over time" />
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weekTrend}>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="week" tick={{ fill: "var(--color-faint)", fontSize: 10 }} />
              <YAxis domain={[0, 100]} tick={{ fill: "var(--color-faint)", fontSize: 10 }} />
              <Tooltip
                contentStyle={{
                  background: "var(--color-surface-elevated)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="var(--color-lilac)"
                strokeWidth={3}
                dot={{ fill: "var(--color-lilac)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
        <Panel className="lg:col-span-5">
          <SectionTitle eyebrow="Consistency" title="Minutes studied" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={timeline}>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="date" tick={{ fill: "var(--color-faint)", fontSize: 10 }} />
              <YAxis tick={{ fill: "var(--color-faint)", fontSize: 10 }} />
              <Bar dataKey="minutes" fill="var(--color-peach)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel className="lg:col-span-7">
          <SectionTitle
            eyebrow="Recovery queue"
            title="Weak areas"
            action={
              <Button size="sm" onClick={() => navigate({ to: "/recovery" })}>
                Start recovery plan <ArrowRight />
              </Button>
            }
          />
          <div className="space-y-3">
            {gaps.map((gap) => (
              <div
                key={gap.title}
                className="flex items-center gap-3 rounded-xl border border-border/60 p-3"
              >
                <span className="grid size-9 place-items-center rounded-xl bg-peach-soft text-peach">
                  <Lightbulb className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{gap.title}</p>
                  <p className="text-[11px] text-faint">{gap.reason}</p>
                </div>
                <span className="hidden rounded-full bg-peach-soft px-2 py-1 text-[10px] font-semibold text-peach sm:inline-flex">
                  {gap.score}
                </span>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="lg:col-span-5">
          <SectionTitle eyebrow="Readiness score" title="Career composite" />
          <ResponsiveContainer width="100%" height={220}>
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={[{ value: 58, fill: "var(--color-brand)" }]}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                dataKey="value"
                background={{ fill: "var(--color-foreground)", fillOpacity: 0.08 }}
                cornerRadius={12}
              />
              <text
                x="50%"
                y="46%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--color-foreground)"
                fontSize="32"
                fontWeight="600"
              >
                58
              </text>
              <text
                x="50%"
                y="61%"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="var(--color-faint)"
                fontSize="10"
              >
                out of 100
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
          <p className="text-center text-xs text-muted-foreground">
            Curriculum 78 · Skills 56 · Projects 42 · Interview 31
          </p>
        </Panel>
      </div>
    </>
  );
}

function Career() {
  const navigate = useNavigate();
  const [track, setTrack] = useState("Software Engineer");
  const stages = [
    "B.Tech Curriculum",
    "Core Skills",
    "Industry Skills",
    "Projects",
    "Interview Prep",
  ];
  return (
    <>
      <PageHeader
        eyebrow="Career bridge · adaptive track"
        title="Make your semester legible to employers."
        description="AI Skills Track connects your curriculum to practical skills, verified projects, certification, and employability."
        action={
          <select
            value={track}
            onChange={(e) => setTrack(e.target.value)}
            className="h-9 rounded-lg border border-border bg-surface-elevated px-3 text-sm"
          >
            <option>Software Engineer</option>
            <option>AI/ML Engineer</option>
            <option>Data Scientist</option>
          </select>
        }
      />
      <Panel>
        <SectionTitle eyebrow="Readiness path" title={`${track} · 58% overall`} />
        <StageTracker current={2} large />
      </Panel>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel>
          <SectionTitle eyebrow="Gap analysis" title="Industry skills you don't yet have" />
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
            eyebrow="Interview prep"
            title="Practice the proof, not just the theory"
            action={
              <span className="rounded-full bg-lilac-soft px-2 py-1 text-[10px] font-semibold text-lilac">
                31% ready
              </span>
            }
          />
          <div className="space-y-3">
            {[
              "Explain why retrieval quality affects grounded answers",
              "Design an evaluation plan for a production AI feature",
              "When should a workflow use an agent instead of a fixed pipeline?",
            ].map((question, index) => (
              <div
                key={question}
                className="flex items-center gap-3 rounded-xl bg-background/40 p-3"
              >
                <span className="font-mono text-[10px] text-faint">0{index + 1}</span>
                <p className="flex-1 text-xs">{question}</p>
                <ChevronRight className="size-4 text-faint" />
              </div>
            ))}
          </div>
          <Button
            className="mt-4"
            onClick={() => toast("Mock interview ready · first question loaded")}
          >
            Start mock interview <ArrowRight />
          </Button>
        </Panel>
      </div>
    </>
  );
}
function StageTracker({ current, large = false }: { current: number; large?: boolean }) {
  return (
    <div className={`grid gap-2 ${large ? "md:grid-cols-5" : "grid-cols-5"}`}>
      {["Curriculum", "Core Skills", "Industry", "Projects", "Interview"].map((label, index) => (
        <div key={label} className="relative flex flex-col items-center gap-2 text-center">
          {index > 0 && (
            <span
              className={`absolute right-1/2 top-4 -z-10 hidden h-px w-full md:block ${index <= current ? "bg-brand/60" : "bg-border"}`}
            />
          )}
          <span
            className={`grid size-8 place-items-center rounded-full text-xs ${index < current ? "bg-mint text-primary-foreground" : index === current ? "cp-pulse bg-lilac text-primary-foreground ring-4 ring-lilac/15" : "border border-border bg-background text-faint"}`}
          >
            {index < current ? <Check className="size-3" /> : index + 1}
          </span>
          <span
            className={`text-[10px] ${index === current ? "font-semibold text-foreground" : "text-faint"}`}
          >
            {label}
          </span>
        </div>
      ))}
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
        title="Make AI Skills Track fit your semester."
        description="Your preferences shape the learning plan, pace, and AI explanations you receive."
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
              <Eyebrow>University</Eyebrow>
              <p className="mt-1">PES University</p>
            </div>
            <div>
              <Eyebrow>Branch</Eyebrow>
              <p className="mt-1">Computer Science · Sem 3</p>
            </div>
            <div>
              <Eyebrow>Career goal</Eyebrow>
              <p className="mt-1">Software Engineer</p>
            </div>
            <div>
              <Eyebrow>Baseline</Eyebrow>
              <p className="mt-1">Intermediate · AI detected</p>
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
              <dd className="mt-1 font-medium">3rd year CSE 2026</dd>
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
            <p className="mt-1 text-2xl font-semibold">30 of 30 modules completed</p>
          </div>
          <div className="divide-y divide-border border-y border-border">
            {[
              "Python Fundamentals for AI",
              "Build an ML Project",
              "Working with LLMs Professionally",
              "AI System Design",
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
              ["Meera Nair", "12 of 30 modules mastered", "Needs a guided learning plan"],
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
              <Eyebrow>Start your personalized path</Eyebrow>
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
                Your syllabus is the starting point.
              </h1>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Create your AI Skills Track account. We’ll use your curriculum, goals, and available
                time to shape your first two weeks.
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
                By continuing, you agree to AI Skills Track’s demo terms.
              </p>
            </div>
          </div>
        </section>
        <section className="relative hidden overflow-hidden bg-surface p-12 lg:flex lg:items-center">
          <div className="absolute inset-0 bg-brand-soft/10" />
          <div className="relative mx-auto max-w-lg">
            <Eyebrow>Inside your workspace</Eyebrow>
            <h2 className="mt-3 font-display text-4xl font-semibold">
              A learning map that knows what comes next.
            </h2>
            <div className="mt-10 space-y-3">
              {[
                "Semester-aware planning",
                "AI reasoning on every recommendation",
                "Projects mapped to your career goal",
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
              "Analyzing your semester 3 syllabus…",
              "Mapping prerequisites…",
              "Aligning with Software Engineer skill graph…",
              "Building your first 2 weeks…",
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
                ? "We found a strong match for your semester. You can edit it before continuing."
                : step === 2
                  ? "A quick baseline helps AI Skills Track choose the right amount of scaffolding."
                  : step === 3
                    ? "Your goal changes which skills and projects appear next."
                    : "How much time can you realistically protect each week?"}
          </p>
          <div className="mt-8 space-y-4">
            {step === 0 && (
              <>
                <Input placeholder="Your name" defaultValue="Aarav Kulkarni" />
                <Input placeholder="College / University" defaultValue="PES University" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input placeholder="Branch" defaultValue="Computer Science" />
                  <Input placeholder="Year & semester" defaultValue="2nd year · Semester 3" />
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
                    <Input placeholder="Search university…" defaultValue="PES University" />
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
                    ["AI Engineer", "Strong Python, ML, and project proof", Code2],
                    ["Full-Stack Developer", "Products, APIs, and frontend fluency", Layers3],
                    ["AI/ML Engineer", "Models, data, and applied experimentation", BrainCircuit],
                    ["Data Scientist", "SQL, statistics, and analytical thinking", BarChart3],
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

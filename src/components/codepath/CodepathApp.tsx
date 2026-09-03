import { useMemo, useState } from "react";
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
import {
  codingStarter,
  gaps,
  heatmap,
  nodes,
  projectMilestones,
  skillData,
  subjects,
  timeline,
  weekTrend,
} from "@/lib/codepath-data";

type View =
  | "dashboard"
  | "map"
  | "learning"
  | "tutor"
  | "lab"
  | "challenge"
  | "projects"
  | "analytics"
  | "career"
  | "profile"
  | "recovery";

const navItems: { label: string; to: string; icon: typeof Activity }[] = [
  { label: "Dashboard", to: "/dashboard", icon: Compass },
  { label: "Curriculum Map", to: "/curriculum-map", icon: GitBranch },
  { label: "Learning Mode", to: "/learning-mode", icon: BookOpen },
  { label: "AI Tutor", to: "/tutor", icon: Bot },
  { label: "Coding Lab", to: "/coding-lab", icon: Code2 },
  { label: "Projects", to: "/projects", icon: FolderKanban },
  { label: "Career Roadmap", to: "/career-roadmap", icon: Target },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "Profile", to: "/profile", icon: UserRound },
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
          <p className="font-display text-[15px] font-semibold text-foreground">Codepath</p>
          <p className="text-[10px] uppercase tracking-[.18em] text-faint">Learning OS</p>
        </div>
      )}
    </div>
  );
}

function Panel({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <section
      className={`rounded-2xl border border-border/70 bg-surface-elevated/75 p-5 shadow-sm backdrop-blur-md ${className}`}
    >
      {children}
    </section>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-[10px] uppercase tracking-[.18em] text-faint">{children}</p>;
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
        <h2 className="mt-1 font-display text-lg font-semibold tracking-tight text-foreground">
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
      ? "bg-mint-soft text-mint"
      : status === "in-progress"
        ? "bg-brand-soft text-brand"
        : status === "available"
          ? "bg-lilac-soft text-lilac"
          : "bg-muted text-faint";
  return (
    <span className={`rounded-full px-2 py-1 text-[10px] font-semibold capitalize ${style}`}>
      {label}
    </span>
  );
}
function ProgressBar({ value, tone = "brand" }: { value: number; tone?: keyof typeof toneMap }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-foreground/10">
      <div
        className={`cp-fill h-full rounded-full ${toneMap[tone]}`}
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
    <Panel className={`p-4 ${className ?? ""}`}>
      <div className="flex items-start justify-between">
        <span className={`grid size-9 place-items-center rounded-xl ${softToneMap[tone]}`}>
          <Icon className="size-4" />
        </span>
        <span className="font-mono text-[10px] text-brand">+12%</span>
      </div>
      <p className="mt-4 text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-[11px] leading-5 text-muted-foreground">{note}</p>
    </Panel>
  );
}

function Shell({ active, children }: { active: View; children: React.ReactNode }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="cp-float absolute -left-40 -top-48 size-[520px] rounded-full bg-brand-soft/20 blur-3xl" />
        <div className="absolute -right-40 top-1/3 size-[560px] rounded-full bg-lilac-soft/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 size-[440px] rounded-full bg-peach-soft/15 blur-3xl" />
      </div>
      <div className="relative mx-auto flex min-h-screen max-w-[1500px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border/60 bg-surface/45 px-4 py-5 md:flex">
          <div className="mb-7 px-2">
            <Mark />
          </div>
          <div className="px-2">
            <Eyebrow>Workspace</Eyebrow>
          </div>
          <nav className="mt-2 flex flex-col gap-1">
            {navItems.map(({ label, to, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${activePath(active, to) ? "bg-surface-elevated text-foreground shadow-sm ring-1 ring-border" : "text-muted-foreground hover:bg-surface-elevated/60 hover:text-foreground"}`}
              >
                <Icon
                  className={`size-4 ${activePath(active, to) ? "text-brand" : "text-faint"}`}
                />
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto rounded-2xl border border-border/70 bg-surface-elevated/75 p-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold">Level 7</p>
              <span className="rounded-full bg-lilac-soft px-2 py-1 text-[10px] font-semibold text-lilac">
                2,340 XP
              </span>
            </div>
            <ProgressBar value={68} />
            <p className="mt-2 text-[11px] text-faint">68% to Level 8 · 12-day streak</p>
          </div>
        </aside>
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-foreground/20 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <aside
              className="h-full w-72 bg-background p-5"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-7 flex items-center justify-between">
                <Mark />
                <Button size="icon" variant="ghost" onClick={() => setMobileOpen(false)}>
                  <X />
                </Button>
              </div>
              <nav className="flex flex-col gap-1">
                {navItems.map(({ label, to, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted-foreground hover:bg-surface"
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
          <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
            <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
              <Button
                size="icon"
                variant="ghost"
                className="md:hidden"
                onClick={() => setMobileOpen(true)}
              >
                <Menu />
              </Button>
              <div className="flex flex-1 items-center gap-2 rounded-xl border border-border/70 bg-surface-elevated/70 px-3 py-2 sm:max-w-md">
                <Search className="size-4 text-faint" />
                <input
                  className="w-full bg-transparent text-sm outline-none placeholder:text-faint"
                  placeholder="Search topics, projects, skills…"
                />
                <span className="hidden rounded-md bg-foreground/10 px-1.5 py-0.5 font-mono text-[10px] text-faint sm:inline">
                  ⌘K
                </span>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="hidden items-center gap-1 rounded-full bg-peach-soft px-3 py-1.5 text-xs font-semibold text-peach sm:inline-flex">
                  <Flame className="cp-pulse size-3.5" />
                  12
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  className="hidden sm:inline-flex"
                  aria-label="Notifications"
                  onClick={() => toast("You are all caught up")}
                >
                  <Bell />
                </Button>
                <button
                  className="flex items-center gap-2 rounded-xl bg-surface-elevated px-2 py-1.5 text-left"
                  onClick={() => navigate({ to: "/profile" })}
                >
                  <span className="hidden text-xs font-medium sm:inline">Aarav K.</span>
                  <span className="grid size-7 place-items-center rounded-lg bg-lilac-soft text-xs font-semibold text-lilac">
                    AK
                  </span>
                </button>
              </div>
            </div>
          </header>
          <main className="px-4 pb-16 pt-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
function activePath(active: View, to: string) {
  return (
    (active === "map" && to.includes("curriculum")) ||
    (active === "lab" && to.includes("coding")) ||
    (active === "career" && to.includes("career")) ||
    (active === "projects" && to.includes("projects")) ||
    (active === "analytics" && to.includes("analytics")) ||
    (active === "profile" && to.includes("profile")) ||
    to.includes(active)
  );
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
    <div className="cp-rise mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-2 max-w-3xl font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [mastered, setMastered] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="Command center · Wed 12 Jun"
        title="Good morning, Aarav. Here's your plan for today."
        description="Understand → Interact → Code → Build → Prove. Your next move is shaped by your semester, recent attempts, and Software Engineer goal."
        action={
          <Button onClick={() => navigate({ to: "/learning-mode" })}>
            <BookOpen />
            Continue Learning
          </Button>
        }
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Panel className="lg:col-span-7">
          <SectionTitle
            eyebrow="Today's path"
            title="Learning plan"
            action={
              <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-semibold text-brand">
                2 of 3 done
              </span>
            }
          />
          <div className="space-y-2.5">
            <PlanRow
              done
              title="Binary Search Trees — build & insert"
              meta="Data Structures · 25 min"
            />
            <PlanRow
              active
              title="BST Traversal — in-order & recursion"
              meta="Data Structures · 30 min"
              action={
                <Button size="sm" onClick={() => navigate({ to: "/learning-mode" })}>
                  Continue
                </Button>
              }
            />
            <PlanRow
              title="DBMS Normalization quiz"
              meta="Database Systems · 10 min"
              action={
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast("Quiz queued for your evening study block")}
                >
                  Start
                </Button>
              }
            />
          </div>
        </Panel>
        <Panel className="border-lilac/25 bg-lilac-soft/30 lg:col-span-5">
          <SectionTitle
            eyebrow="AI planner"
            title="Recommended next"
            action={
              <span className="cp-pulse grid size-8 place-items-center rounded-lg bg-lilac text-primary-foreground">
                <BrainCircuit className="size-4" />
              </span>
            }
          />
          <p className="font-medium">Balanced BSTs (AVL)</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            AI recommends this because you hit 92% on BST insert/delete and AVL is the next
            prerequisite for your DSA interview goal.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => navigate({ to: "/learning-mode" })}
            >
              Open topic <ArrowRight />
            </Button>
            <span className="rounded-full bg-background/70 px-2.5 py-1 text-[10px] text-faint">
              30 min
            </span>
          </div>
        </Panel>
        <Panel className="lg:col-span-4">
          <SectionTitle eyebrow="Semester 3 · CSE" title="Curriculum progress" />
          {subjects.slice(0, 4).map((subject) => (
            <div key={subject.name} className="mb-4 last:mb-0">
              <div className="mb-1.5 flex justify-between text-xs">
                <span>{subject.name}</span>
                <span className="text-faint">{subject.progress}%</span>
              </div>
              <ProgressBar value={subject.progress} tone={subject.tone as keyof typeof toneMap} />
            </div>
          ))}
        </Panel>
        <Panel className="lg:col-span-8">
          <SectionTitle
            eyebrow="Living skill graph"
            title="Curriculum knowledge map"
            action={
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigate({ to: "/curriculum-map" })}
              >
                Open full map <ArrowRight />
              </Button>
            }
          />
          <MiniMap onNode={() => navigate({ to: "/learning-mode" })} />
        </Panel>
        <Panel className="lg:col-span-4">
          <SectionTitle
            eyebrow="Consistency"
            title="Study streak"
            action={
              <span className="flex items-center gap-1 text-xs font-semibold text-peach">
                <Flame className="size-3.5" />
                12 days
              </span>
            }
          />
          <div className="grid grid-cols-10 gap-1.5">
            {heatmap.slice(0, 50).map((item) => (
              <span
                key={item.id}
                className={`aspect-square rounded-[4px] ${item.intensity === 0 ? "bg-foreground/8" : item.intensity === 1 ? "bg-brand/25" : item.intensity === 2 ? "bg-brand/45" : item.intensity === 3 ? "bg-brand/70" : "bg-brand"}`}
              />
            ))}
          </div>
          <p className="mt-3 text-[11px] text-faint">Last 6 weeks · 87 study sessions</p>
        </Panel>
        <Panel className="lg:col-span-5">
          <SectionTitle eyebrow="Career bridge" title="Software Engineer · 58% ready" />
          <StageTracker current={2} />
        </Panel>
        <Panel className="bg-ink text-background lg:col-span-3">
          <SectionTitle
            eyebrow="In the lab"
            title="BST search"
            action={
              <span className="rounded-full bg-background/10 px-2 py-1 text-[10px] text-background/70">
                Medium
              </span>
            }
          />
          <pre className="overflow-x-auto rounded-xl bg-background/10 p-3 font-mono text-[10px] leading-5 text-background/80">
            {codingStarter.split("\n").slice(0, 7).join("\n")}
          </pre>
          <p className="mt-3 text-[11px] text-background/60">4/5 tests passing · AI review ready</p>
        </Panel>
        <Panel className="lg:col-span-4">
          <SectionTitle
            eyebrow="AI detected baseline"
            title="Skill mastery snapshot"
            action={
              <Button size="sm" variant="ghost" onClick={() => navigate({ to: "/analytics" })}>
                Details
              </Button>
            }
          />
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={skillData}>
              <PolarGrid stroke="var(--color-border)" />
              <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--color-faint)", fontSize: 10 }} />
              <Radar
                dataKey="mastery"
                stroke="var(--color-brand)"
                fill="var(--color-brand)"
                fillOpacity={0.22}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel className="lg:col-span-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Eyebrow>Next checkpoint</Eyebrow>
              <h2 className="mt-1 font-display text-lg font-semibold">
                {mastered
                  ? "Nice work — AVL Trees is now mastered."
                  : "You're one focused session away from your next unlock."}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {mastered
                  ? "AI recommends Queues next because it shares the same traversal mental model."
                  : "Complete BST traversal to unlock Graph Algorithms and your Mini Search Engine project brief."}
              </p>
            </div>
            <Button
              variant={mastered ? "secondary" : "default"}
              onClick={() => {
                setMastered(true);
                toast("Mastery updated · +120 XP");
              }}
            >
              {mastered ? (
                <>
                  <Check />
                  Updated
                </>
              ) : (
                <>
                  Mark BST mastered <Check />
                </>
              )}
            </Button>
          </div>
        </Panel>
      </div>
    </>
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

function MiniMap({ onNode }: { onNode: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border/60 bg-background/45 p-4">
      <div className="absolute left-[9%] right-[9%] top-1/2 h-px bg-border" />
      <div className="relative grid grid-cols-6 gap-3">
        {nodes.slice(0, 6).map((node) => (
          <button key={node.id} className="group flex flex-col items-center gap-2" onClick={onNode}>
            <span
              className={`grid size-11 place-items-center rounded-2xl border ${node.status === "mastered" ? "border-mint/50 bg-mint-soft text-mint" : node.status === "in-progress" ? "cp-pulse border-brand bg-brand-soft text-brand" : "border-border bg-surface text-faint"}`}
            >
              {node.status === "mastered" ? (
                <Check className="size-4" />
              ) : node.status === "locked" ? (
                <Lock className="size-4" />
              ) : (
                <GitBranch className="size-4" />
              )}
            </span>
            <span className="max-w-20 text-center text-[10px] leading-4 text-muted-foreground group-hover:text-foreground">
              {node.label.replace(" & Pointers", "").replace("Object Oriented Programming", "OOP")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function CurriculumMap() {
  const [mode, setMode] = useState("curriculum");
  const [selected, setSelected] = useState(nodes[4]);
  const navigate = useNavigate();
  return (
    <>
      <PageHeader
        eyebrow="CSE · Semester 3"
        title="Curriculum knowledge map"
        description="A prerequisite-aware graph of the concepts, skills, and projects that move you from semester confidence to interview readiness."
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
      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <Panel className="min-h-[620px] overflow-hidden p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] text-faint">
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
          <div className="relative min-h-[540px] overflow-auto rounded-xl border border-border/60 bg-background/35">
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
            {nodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setSelected(node)}
                className="absolute w-32 -translate-x-1/2 -translate-y-1/2 text-left transition hover:-translate-y-[calc(50%+3px)]"
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div
                  className={`rounded-xl border p-2.5 shadow-sm ${node.status === "mastered" ? "border-mint/45 bg-mint-soft/80" : node.status === "in-progress" ? "cp-pulse border-brand bg-brand-soft/80" : node.status === "available" ? "border-lilac/40 bg-lilac-soft/50" : "border-border bg-muted/70"}`}
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
                  <StatusPill status={node.status} />
                </div>
              </button>
            ))}
          </div>
        </Panel>
        <Panel className="h-fit">
          <SectionTitle
            eyebrow="Selected concept"
            title={selected.label}
            action={<StatusPill status={selected.status} />}
          />
          <p className="text-sm leading-6 text-muted-foreground">
            A practical concept node connected to {selected.meta}. The graph keeps prerequisite
            order visible so you always know what to learn next and why.
          </p>
          <div className="mt-5 space-y-4 border-t border-border/60 pt-4">
            <div>
              <Eyebrow>Prerequisites</Eyebrow>
              <p className="mt-1 text-sm">
                {selected.id === "trees"
                  ? "Arrays, Linked Lists, Recursion"
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
                DSA interview goal.
              </p>
            </div>
            <Button className="w-full" onClick={() => navigate({ to: "/learning-mode" })}>
              Start learning <ArrowRight />
            </Button>
          </div>
        </Panel>
      </div>
    </>
  );
}

function LearningMode() {
  const [stage, setStage] = useState(0);
  const [array, setArray] = useState("3, 8, 12, 19, 24, 31, 42");
  const [ran, setRan] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [solution, setSolution] = useState(false);
  const stages = ["Concept", "Explanation", "Interactive", "Code", "Challenge", "Feedback"];
  const values = array
    .split(",")
    .map((x) => Number(x.trim()))
    .filter((x) => Number.isFinite(x));
  return (
    <>
      <PageHeader
        eyebrow="Learning Mode · Data Structures · Sem 3"
        title="Binary Search Trees → Binary Search"
        description="A six-stage session that moves from mental model to runnable code, then gives you feedback without taking the learning away."
        action={
          <div className="flex items-center gap-2">
            <StatusPill status="in-progress" />
            <span className="text-xs text-faint">42 min left</span>
          </div>
        }
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <Panel>
            <div className="flex flex-wrap gap-2">
              {stages.map((item, index) => (
                <button
                  key={item}
                  className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs ${stage === index ? "bg-ink text-background" : index < stage ? "bg-mint-soft text-mint" : "bg-muted text-faint"}`}
                  onClick={() => setStage(index)}
                >
                  <span className="grid size-5 place-items-center rounded-full bg-background/50 text-[10px]">
                    {index < stage ? <Check className="size-3" /> : index + 1}
                  </span>
                  {item}
                </button>
              ))}
            </div>
          </Panel>
          {stage <= 1 && (
            <Panel className="cp-rise">
              <SectionTitle
                eyebrow="AI explanation · tailored to your baseline"
                title="Search less, discard more."
              />
              <div className="grid gap-5 md:grid-cols-[1fr_220px]">
                <div>
                  <p className="text-[15px] leading-7 text-muted-foreground">
                    Binary search works on an ordered collection. Instead of checking every value,
                    it checks the middle and discards the half that cannot contain the target. Each
                    step cuts the search space in half.
                  </p>
                  <div className="mt-4 rounded-xl bg-brand-soft/50 p-4">
                    <p className="text-xs font-medium">AI is tailoring this to your level</p>
                    <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                      You already handled linear scans confidently, so this explanation focuses on
                      the decision boundary and loop invariants.
                    </p>
                  </div>
                </div>
                <div className="rounded-xl border border-border/60 bg-background/45 p-4">
                  <Eyebrow>Complexity</Eyebrow>
                  <p className="mt-2 font-mono text-2xl font-semibold text-brand">O(log n)</p>
                  <p className="mt-1 text-[11px] text-faint">Space: O(1) iterative</p>
                </div>
              </div>
              <div className="mt-5 flex gap-2">
                <Button size="sm" onClick={() => setStage(2)}>
                  Try the interactive example <ArrowRight />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    toast("Deeper explanation queued: invariants, proofs, and edge cases")
                  }
                >
                  Explain deeper
                </Button>
              </div>
            </Panel>
          )}
          {stage === 2 && (
            <Panel className="cp-rise">
              <SectionTitle
                eyebrow="Interactive example"
                title="Move the pointers"
                action={
                  <Button size="sm" variant="outline" onClick={() => setRan(false)}>
                    <RotateCcw />
                    Reset
                  </Button>
                }
              />
              <div className="flex flex-wrap gap-2">
                {values.map((value, index) => (
                  <div
                    key={`${value}-${index}`}
                    className={`relative flex size-12 items-center justify-center rounded-xl border text-sm font-semibold ${ran && index === Math.floor(values.length / 2) ? "border-brand bg-brand-soft text-brand" : "border-border bg-background/60"}`}
                  >
                    <span>{value}</span>
                    {ran && index === Math.floor(values.length / 2) && (
                      <span className="absolute -top-5 font-mono text-[9px] text-brand">mid</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <Input
                  value={array}
                  onChange={(e) => setArray(e.target.value)}
                  className="max-w-md"
                  aria-label="Sorted array values"
                />
                <Button
                  onClick={() => {
                    setRan(true);
                    toast("Pointers moved · mid = 19");
                  }}
                >
                  <Play />
                  Run search
                </Button>
              </div>
              <div className="mt-4 rounded-xl bg-background/55 p-3 font-mono text-[11px] text-muted-foreground">
                {ran
                  ? "low=0 → mid=3 (19) → target is smaller → high=2"
                  : "Edit the sorted values, then run to inspect the first decision."}
              </div>
              <Button className="mt-5" size="sm" onClick={() => setStage(3)}>
                Continue to code <ArrowRight />
              </Button>
            </Panel>
          )}
          {stage === 3 && <CodeEditor code={codingStarter} onNext={() => setStage(4)} />}
          {stage === 4 && (
            <Challenge
              onSubmit={() => {
                setFeedback(true);
                setStage(5);
              }}
            />
          )}
          {stage === 5 && (
            <Panel className="cp-rise">
              <SectionTitle
                eyebrow="AI feedback"
                title={
                  feedback
                    ? "Your reasoning is close. Tighten the edge cases."
                    : "Submit your challenge to unlock feedback."
                }
                action={
                  <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-semibold text-brand">
                    +120 XP
                  </span>
                }
              />
              <div className="grid gap-3 md:grid-cols-3">
                <FeedbackCard
                  label="Strength"
                  body="You kept the search interval sorted and avoided unnecessary recursion."
                  tone="mint"
                />
                <FeedbackCard
                  label="Specific issue"
                  body="When low crosses high, the loop should stop before reading nums[mid]."
                  tone="peach"
                />
                <FeedbackCard
                  label="Hint"
                  body="Name the invariant that must be true before each iteration."
                  tone="lilac"
                />
              </div>
              <div className="mt-4 rounded-xl border border-border/60">
                <button
                  className="flex w-full items-center justify-between p-3 text-left text-sm font-medium"
                  onClick={() => setSolution((value) => !value)}
                >
                  Reveal solution{" "}
                  <ChevronDown className={`size-4 transition ${solution ? "rotate-180" : ""}`} />
                </button>
                {solution && (
                  <pre className="border-t border-border/60 p-3 font-mono text-[11px] leading-5 text-muted-foreground">
                    return -1 # only after low &gt; high
                  </pre>
                )}
              </div>
              <div className="mt-5 flex flex-wrap justify-between gap-2">
                <Button
                  onClick={() => toast("Mastery updated · Dashboard and map are now in sync")}
                >
                  <Check />
                  Mark as mastered
                </Button>
                <Button variant="outline" onClick={() => setStage(2)}>
                  Review interactive example
                </Button>
              </div>
            </Panel>
          )}
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
            <Button
              size="sm"
              variant="ghost"
              disabled={stage === 5}
              onClick={() => setStage((value) => Math.min(5, value + 1))}
            >
              Next
              <ArrowRight />
            </Button>
          </div>
        </div>
        <Panel className="h-fit">
          <SectionTitle eyebrow="Your context" title="Binary Search Trees" />
          <div className="space-y-3 text-xs text-muted-foreground">
            <p>
              <span className="font-medium text-foreground">Subject:</span> Data Structures
            </p>
            <p>
              <span className="font-medium text-foreground">Prerequisites:</span> Arrays, recursion
            </p>
            <p>
              <span className="font-medium text-foreground">Career link:</span> DSA interview
              patterns
            </p>
          </div>
          <div className="mt-5 rounded-xl bg-lilac-soft/50 p-3">
            <p className="text-xs font-medium">AI recommends this because…</p>
            <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
              Your last five attempts show strong array mechanics and one recurring boundary error.
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4 w-full"
            onClick={() => window.location.assign("/tutor")}
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
  onNext,
  compact = false,
}: {
  code: string;
  onNext?: () => void;
  compact?: boolean;
}) {
  const [value, setValue] = useState(code);
  const [output, setOutput] = useState("");
  const [hint, setHint] = useState(0);
  return (
    <Panel className={compact ? "p-4" : "cp-rise"}>
      <SectionTitle
        eyebrow="Code playground · Python"
        title="Implement the search loop"
        action={
          <div className="flex gap-2">
            <StatusPill status="available" />
            <Button size="sm" variant="outline" onClick={() => setValue(code)}>
              <RotateCcw />
              Reset
            </Button>
          </div>
        }
      />
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="overflow-hidden rounded-xl border border-border/60 bg-ink">
          <div className="flex items-center justify-between border-b border-background/10 px-3 py-2 text-[10px] text-background/55">
            <span>solution.py</span>
            <span>Python 3.12</span>
          </div>
          <div className="flex">
            <div className="select-none px-3 py-4 text-right font-mono text-[10px] leading-5 text-background/35">
              {value.split("\n").map((_, index) => (
                <div key={index}>{String(index + 1).padStart(2, "0")}</div>
              ))}
            </div>
            <textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="min-h-[280px] flex-1 resize-none bg-transparent p-4 pl-0 font-mono text-[11px] leading-5 text-background outline-none"
              spellCheck={false}
            />
          </div>
        </div>
        <div className="space-y-3">
          <div className="rounded-xl border border-border/60 bg-background/45 p-3">
            <Eyebrow>Console</Eyebrow>
            <pre className="mt-2 min-h-16 whitespace-pre-wrap font-mono text-[11px] leading-5 text-muted-foreground">
              {output || "Run your code to see test output."}
            </pre>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => setOutput("✓ case 1 passed\n✓ case 2 passed\n✕ case 3 · boundary")}
            >
              <Play />
              Run
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setOutput("Submitted · 4/5 tests passed")}
            >
              Submit
            </Button>
          </div>
          <div className="rounded-xl bg-peach-soft/45 p-3">
            <p className="text-xs font-medium">Progressive hint {hint}/2</p>
            <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
              {hint === 0
                ? "Start by naming the interval you still need to search."
                : hint === 1
                  ? "The interval is bounded by low and high; update one after each comparison."
                  : "Use mid = (low + high) // 2, then move exactly one boundary."}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 px-0"
              onClick={() => setHint((value) => Math.min(2, value + 1))}
            >
              Get next hint <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
      {onNext && (
        <Button className="mt-5" size="sm" onClick={onNext}>
          Run the challenge <ArrowRight />
        </Button>
      )}
    </Panel>
  );
}

function Challenge({ onSubmit }: { onSubmit: () => void }) {
  return (
    <Panel className="cp-rise">
      <SectionTitle
        eyebrow="Challenge · binary search"
        title="Find the first occurrence"
        action={
          <span className="rounded-full bg-peach-soft px-2.5 py-1 text-[10px] font-semibold text-peach">
            Medium
          </span>
        }
      />
      <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
        Given a sorted array of integers that may contain duplicates, return the index of the first
        occurrence of target. Return -1 when the target is absent.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] text-brand">
          Arrays
        </span>
        <span className="rounded-full bg-lilac-soft px-2.5 py-1 text-[10px] text-lilac">
          Binary Search
        </span>
        <span className="rounded-full bg-peach-soft px-2.5 py-1 text-[10px] text-peach">
          Edge cases
        </span>
      </div>
      <div className="mt-5 rounded-xl border border-border/60 bg-background/45 p-4 font-mono text-[11px] leading-5 text-muted-foreground">
        Input: nums = [1, 2, 2, 2, 6], target = 2<br />
        Expected: 1<br />
        <br />
        Input: nums = [1, 4, 9], target = 7<br />
        Expected: -1
      </div>
      <div className="mt-5 flex gap-2">
        <Button onClick={onSubmit}>
          <Play />
          Run tests
        </Button>
        <Button
          variant="outline"
          onClick={() => toast("AI hint: keep searching left after a match")}
        >
          Get a hint
        </Button>
      </div>
    </Panel>
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

function Tutor() {
  const [messages, setMessages] = useState([
    {
      from: "assistant" as const,
      text: "You’re in Binary Search Trees · Data Structures · Sem 3. AI recommends starting with the boundary invariant because your last two attempts found the target but overshot the first occurrence.",
    },
  ]);
  const [thinking, setThinking] = useState(false);
  const prompts = [
    "Explain like I'm a beginner",
    "Give me a hint, not the answer",
    "Connect this to yesterday's topic",
    "Quiz me on this topic",
  ];
  const send = async (text: string) => {
    if (!text.trim()) return;
    setMessages((items) => [...items, { from: "user" as const, text }]);
    setThinking(true);
    await new Promise((resolve) => window.setTimeout(resolve, 850));
    setThinking(false);
    const response = text.toLowerCase().includes("yesterday")
      ? "Yesterday you practiced linked-list traversal: you kept moving a pointer until the stopping condition was true. Binary search uses the same discipline, but moves two boundaries around a midpoint. AI recommends this connection because it turns a new pattern into a familiar loop."
      : text.toLowerCase().includes("hint")
        ? "Hint 1: after a match, ask whether an earlier match could still exist. If yes, keep the answer but move high left. AI recommends this smaller step because your code is already correct for unique values."
        : "Think of the search interval as a contract: if target exists, it must be between low and high. Each comparison must preserve that contract. AI recommends this framing because it will help you debug boundary errors without memorizing a template.";
    setMessages((items) => [...items, { from: "assistant" as const, text: response }]);
  };
  return (
    <>
      <PageHeader
        eyebrow="AI Tutor · context aware"
        title="Ask better questions, build better instincts."
        description="A tutor, coding mentor, and curriculum planner that keeps the current topic visible and explains why it is recommending a next step."
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_300px]">
        <Panel className="min-h-[650px] p-0">
          <div className="border-b border-border/60 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand">
                <Bot className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">Codepath Tutor</p>
                <p className="text-[11px] text-faint">
                  Context: Binary Search Trees · Data Structures · Sem 3
                </p>
              </div>
              <span className="ml-auto size-2 rounded-full bg-mint" />
            </div>
          </div>
          <Conversation className="h-[420px]">
            <ConversationContent className="gap-5 p-5">
              {messages.map((message, index) => (
                <Message key={index} from={message.from}>
                  <MessageContent
                    className={message.from === "user" ? "bg-ink text-background" : ""}
                  >
                    <MessageResponse>{message.text}</MessageResponse>
                  </MessageContent>
                </Message>
              ))}
              {thinking && (
                <Message from="assistant">
                  <MessageContent>
                    <Shimmer>Thinking through your last attempt…</Shimmer>
                  </MessageContent>
                </Message>
              )}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
          <PromptInput
            onSubmit={(message) => {
              void send(message.text);
            }}
            className="m-4"
          >
            <PromptInputTextarea placeholder="Ask about the code, concept, or your next move…" />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit />
            </PromptInputFooter>
          </PromptInput>
        </Panel>
        <Panel className="h-fit">
          <SectionTitle eyebrow="Suggested prompts" title="Keep the loop moving" />
          <div className="space-y-2">
            {prompts.map((prompt) => (
              <Button
                key={prompt}
                variant="outline"
                className="h-auto w-full justify-start whitespace-normal py-2.5 text-left text-xs"
                onClick={() => void send(prompt)}
              >
                {prompt}
                <ArrowRight className="ml-auto shrink-0" />
              </Button>
            ))}
          </div>
          <div className="mt-5 rounded-xl bg-lilac-soft/50 p-3">
            <p className="text-xs font-medium">Tutor memory</p>
            <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
              Yesterday: linked-list traversal · 92% mastery. Your tutor uses that to explain
              today’s boundary moves.
            </p>
          </div>
        </Panel>
      </div>
    </>
  );
}

function CodingLab({ challenge = false }: { challenge?: boolean }) {
  const [review, setReview] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow={challenge ? "Challenge · attempt history" : "Coding Lab · build & prove"}
        title={challenge ? "Find the first occurrence" : "Turn concepts into runnable code."}
        description={
          challenge
            ? "A focused challenge with examples, attempt history, progressive hints, and AI review."
            : "A focused workspace for practicing Python, Java, C++, and JavaScript against realistic test cases."
        }
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => toast("Hint 1: keep a valid search interval")}>
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
          <CodeEditor code={codingStarter} compact />
          <Panel className="mt-4">
            <SectionTitle
              eyebrow="Test cases"
              title="Submission output"
              action={
                <span className="rounded-full bg-mint-soft px-2 py-1 text-[10px] font-semibold text-mint">
                  4 / 5 passing
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
                  {[
                    ["01", "[1, 4, 9], 4", "1", "1", "Pass"],
                    ["02", "[2, 7, 11], 5", "-1", "-1", "Pass"],
                    ["03", "[1, 2, 2, 6], 2", "1", "2", "Review"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-t border-border/60">
                      <td className="py-3 font-mono text-faint">{row[0]}</td>
                      <td className="py-3 font-mono">{row[1]}</td>
                      <td className="py-3 font-mono">{row[2]}</td>
                      <td className="py-3 font-mono">{row[3]}</td>
                      <td className="py-3">
                        <span className={row[4] === "Pass" ? "text-mint" : "text-peach"}>
                          {row[4] === "Pass" ? "✓" : "!"} {row[4]}
                        </span>
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
                <FeedbackCard
                  label="Correctness"
                  body="The core loop is sound; duplicates need a leftward continuation after a match."
                  tone="mint"
                />
                <FeedbackCard
                  label="Complexity"
                  body="O(log n) time and O(1) space. Keep the iterative approach for interview clarity."
                  tone="lilac"
                />
                <FeedbackCard
                  label="Next improvement"
                  body="Store a candidate answer, then continue searching left until the interval closes."
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
    </>
  );
}

function Projects() {
  const [done, setDone] = useState(projectMilestones.map((item) => item.done));
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(2);
  const completed = done.filter(Boolean).length;
  return (
    <>
      <PageHeader
        eyebrow="Build & prove · project workspace"
        title="Build a Mini Search Engine"
        description="Apply arrays, linked lists, stacks, queues, and trees in one portfolio-shaped project that makes your learning visible."
        action={
          <div className="flex items-center gap-3">
            <div className="relative grid size-14 place-items-center rounded-full border-4 border-brand/20">
              <span className="font-display text-sm font-semibold">
                {Math.round((completed / 5) * 100)}%
              </span>
              <div className="absolute inset-[-4px] rounded-full border-4 border-transparent border-t-brand" />
            </div>
            <span className="text-xs text-faint">4–6 weeks</span>
          </div>
        }
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <Panel>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] text-brand">
                Arrays
              </span>
              <span className="rounded-full bg-lilac-soft px-2.5 py-1 text-[10px] text-lilac">
                Linked Lists
              </span>
              <span className="rounded-full bg-peach-soft px-2.5 py-1 text-[10px] text-peach">
                Trees
              </span>
              <span className="rounded-full bg-mint-soft px-2.5 py-1 text-[10px] text-mint">
                Python
              </span>
            </div>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-muted-foreground">
              Create a tiny search engine that ingests a corpus, builds an inverted index, ranks
              results, and explains its decisions. You will practice data structures while shipping
              something you can discuss in an interview.
            </p>
          </Panel>
          <Panel>
            <SectionTitle
              eyebrow="Milestone timeline"
              title={`${completed} of 5 milestones complete`}
            />{" "}
            <div className="space-y-3">
              {projectMilestones.map((milestone, index) => (
                <div key={milestone.title} className="rounded-xl border border-border/60">
                  <button
                    className="flex w-full items-center gap-3 p-3 text-left"
                    onClick={() => setOpen(open === index ? -1 : index)}
                  >
                    <span
                      className={`grid size-8 place-items-center rounded-lg ${done[index] ? "bg-mint-soft text-mint" : index === open ? "bg-brand-soft text-brand" : "bg-muted text-faint"}`}
                    >
                      {done[index] ? <Check className="size-4" /> : index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Milestone {index + 1}: {milestone.title}
                      </p>
                      <p className="text-[11px] text-faint">{milestone.detail}</p>
                    </div>
                    {open === index ? (
                      <ChevronDown className="size-4 text-faint" />
                    ) : (
                      <ChevronRight className="size-4 text-faint" />
                    )}
                  </button>
                  {open === index && (
                    <div className="border-t border-border/60 px-3 pb-3 pt-3">
                      <div className="ml-11 space-y-2">
                        {milestone.tasks.map((task) => (
                          <label
                            key={task}
                            className="flex items-center gap-2 text-xs text-muted-foreground"
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
                              className="accent-brand"
                            />
                            {task}
                          </label>
                        ))}
                        <div className="mt-3 rounded-lg bg-lilac-soft/40 p-3">
                          <p className="text-[10px] font-mono uppercase tracking-wider text-lilac">
                            AI mentor tip
                          </p>
                          <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                            {index === 2
                              ? "Keep the query engine small: get exact matches working before you add ranking."
                              : "Write one failing test before the implementation so the data structure has a job to do."}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="mt-3"
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
                          {done[index] ? "Completed" : "Mark milestone complete"}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Panel>
          {!submitted ? (
            <Panel>
              <SectionTitle eyebrow="Submit for review" title="Show your work" />
              <div className="flex gap-2">
                <Input placeholder="https://github.com/aarav/mini-search-engine" />
                <Button
                  onClick={() => {
                    setSubmitted(true);
                    toast("Project submitted · badge earned");
                  }}
                >
                  <Upload />
                  Submit
                </Button>
              </div>
            </Panel>
          ) : (
            <Panel className="border-brand/40 bg-brand-soft/30">
              <div className="flex items-start gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-brand text-primary-foreground">
                  <Trophy className="size-5" />
                </span>
                <div>
                  <Eyebrow>AI evaluation complete</Eyebrow>
                  <h2 className="mt-1 font-display text-lg font-semibold">
                    Search Builder badge earned
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Code quality: strong · Completeness: 82% · Next suggestion: add typo tolerance
                    to the ranking layer.
                  </p>
                </div>
              </div>
            </Panel>
          )}
        </div>
        <Panel className="h-fit">
          <SectionTitle eyebrow="AI Mentor" title="You're ready to build." />
          <div className="rounded-xl bg-brand-soft/45 p-3">
            <p className="text-xs font-medium">AI recommends this project because…</p>
            <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
              You’ve mastered the prerequisite chain for a search engine. The project turns your DSA
              knowledge into an interview story.
            </p>
          </div>
          <div className="mt-5 space-y-3 text-xs text-muted-foreground">
            <p className="flex items-center gap-2">
              <ClockIcon />
              Estimated 4–6 weeks
            </p>
            <p className="flex items-center gap-2">
              <Code2 className="size-4 text-lilac" />5 core data structures
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-mint" />
              Portfolio-ready review
            </p>
          </div>
        </Panel>
      </div>
    </>
  );
}
function ClockIcon() {
  return (
    <span className="grid size-4 place-items-center rounded-full border border-brand/50 text-[9px] text-brand">
      ◷
    </span>
  );
}

function Analytics() {
  const pie = [
    { name: "Complete", value: 62 },
    { name: "Remaining", value: 38 },
  ];
  return (
    <>
      <PageHeader
        eyebrow="Learning analytics · last 6 weeks"
        title="See where effort becomes capability."
        description="Your dashboard tells you what to do. Analytics shows which habits, skills, and assessments are changing the curve."
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
          label="Study time"
          value="6h 48m"
          note="+1h 12m vs last week"
          tone="brand"
        />
        <StatCard
          className="md:col-span-6 lg:col-span-3"
          icon={Code2}
          label="Problems solved"
          value="24"
          note="8 this week"
          tone="lilac"
        />
        <StatCard
          className="md:col-span-6 lg:col-span-3"
          icon={Target}
          label="Career readiness"
          value="58%"
          note="+6% this month"
          tone="peach"
        />
        <StatCard
          className="md:col-span-6 lg:col-span-3"
          icon={Flame}
          label="Current streak"
          value="12 days"
          note="Best: 18 days"
          tone="mint"
        />
        <Panel className="lg:col-span-4">
          <SectionTitle eyebrow="Curriculum completion" title="Semester 3" />
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
                  62%
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
          {subjects.slice(0, 4).map((item) => (
            <div key={item.name} className="mb-3 flex items-center gap-2 text-xs">
              <span
                className={`size-2 rounded-full ${toneMap[item.tone as keyof typeof toneMap]}`}
              />
              <span className="flex-1">{item.name}</span>
              <span className="font-mono text-faint">{item.progress}%</span>
            </div>
          ))}
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
              <Button size="sm" onClick={() => window.location.assign("/recovery")}>
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
        description="Codepath connects your syllabus to the skill signals and proof points your chosen career track expects."
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
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.location.assign(gap.route)}
                >
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
              "Explain why binary search is O(log n)",
              "Design a URL shortener for 10M links",
              "When would you choose a queue over a stack?",
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
        title="Make Codepath fit your semester."
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
            {[
              ["12", "Day streak", Flame, "peach"],
              ["DSA", "Foundations", GitBranch, "brand"],
              ["4/5", "Test runner", Code2, "lilac"],
              ["?", "Next badge", Lock, "muted"],
            ].map(([value, label, Icon, tone]) => (
              <div key={label as string} className="rounded-xl border border-border/60 p-3">
                <span
                  className={`grid size-8 place-items-center rounded-lg ${tone === "peach" ? "bg-peach-soft text-peach" : tone === "brand" ? "bg-brand-soft text-brand" : tone === "lilac" ? "bg-lilac-soft text-lilac" : "bg-muted text-faint"}`}
                >
                  <Icon className="size-4" />
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
  const [day, setDay] = useState(1);
  return (
    <>
      <PageHeader
        eyebrow="Adaptive remediation · Recursion"
        title="A 3-day recovery plan, not a guilt spiral."
        description="AI built this plan from your last six attempts: fundamentals first, guided coding next, then a small assessment to prove the gap is closing."
        action={
          <Button variant="outline" onClick={() => window.location.assign("/analytics")}>
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
              Your attempts show the recursion idea is familiar, but the stopping condition is not
              yet automatic. Each day isolates one part of the mental model before adding pressure.
            </p>
          </div>
          <div className="mt-5 space-y-3">
            {(day === 1
              ? [
                  "Watch a 7-minute visual on base cases",
                  "Trace factorial(4) on paper",
                  "Answer 5 quick checks",
                ]
              : day === 2
                ? [
                    "Implement factorial iteratively first",
                    "Convert it to recursion",
                    "Ask the tutor for a hint, not the answer",
                  ]
                : [
                    "Solve Fibonacci with memoization",
                    "Run 5 hidden tests",
                    "Reflect on the stopping condition",
                  ]
            ).map((item) => (
              <button
                key={item}
                className="flex w-full items-center gap-3 rounded-xl border border-border/60 p-3 text-left text-sm hover:bg-surface"
                onClick={() => window.location.assign(day === 2 ? "/coding-lab" : "/learning-mode")}
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

export function CodepathApp({ view }: { view: View }) {
  if (view === "dashboard")
    return (
      <Shell active="dashboard">
        <Dashboard />
      </Shell>
    );
  if (view === "map")
    return (
      <Shell active="map">
        <CurriculumMap />
      </Shell>
    );
  if (view === "learning")
    return (
      <Shell active="learning">
        <LearningMode />
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
        <CodingLab />
      </Shell>
    );
  if (view === "challenge")
    return (
      <Shell active="challenge">
        <CodingLab challenge />
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
              Codepath turns your actual B.Tech syllabus into a living, adaptive, project-driven
              path — then connects it directly to employability.
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
            <div className="cp-float absolute left-3 top-10 w-56 rotate-[-6deg] rounded-2xl border border-border bg-surface-elevated/80 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="size-2 rounded-full bg-mint" />
                <Eyebrow>Mastered</Eyebrow>
              </div>
              <p className="mt-3 font-display font-semibold">Arrays & Pointers</p>
              <p className="mt-1 text-[11px] text-faint">12 concepts · 96% mastery</p>
            </div>
            <div
              className="cp-float absolute right-0 top-2 w-60 rotate-6 rounded-2xl border border-brand/35 bg-brand-soft/60 p-4 shadow-sm"
              style={{ animationDelay: "-2s" }}
            >
              <div className="flex items-center justify-between">
                <span className="cp-pulse size-2 rounded-full bg-brand" />
                <Eyebrow>In progress</Eyebrow>
              </div>
              <p className="mt-3 font-display font-semibold">Binary Search Trees</p>
              <p className="mt-1 text-[11px] text-faint">Tree traversal · DSA</p>
            </div>
            <div
              className="cp-float absolute bottom-14 left-12 w-60 rotate-3 rounded-2xl border border-lilac/30 bg-lilac-soft/60 p-4 shadow-sm"
              style={{ animationDelay: "-4s" }}
            >
              <div className="flex items-center justify-between">
                <span className="size-2 rounded-full bg-lilac" />
                <Eyebrow>Next unlock</Eyebrow>
              </div>
              <p className="mt-3 font-display font-semibold">Dynamic Programming</p>
              <p className="mt-1 text-[11px] text-faint">Recursion prerequisite met</p>
              <div className="mt-3">
                <ProgressBar value={64} tone="lilac" />
              </div>
            </div>
            <div className="absolute bottom-2 right-4 w-48 rotate-[-3deg] rounded-2xl border border-border bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <span className="size-2 rounded-full bg-muted-foreground/40" />
                <Eyebrow>Locked</Eyebrow>
              </div>
              <p className="mt-3 font-display font-semibold text-muted-foreground">
                Graph Algorithms
              </p>
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
            {[
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
            ].map(([title, body, Icon, tone]) => (
              <div
                key={title as string}
                className="rounded-2xl border border-border bg-surface-elevated/75 p-5 shadow-sm"
              >
                <span
                  className={`grid size-10 place-items-center rounded-xl ${tone === "brand" ? "bg-brand-soft text-brand" : tone === "lilac" ? "bg-lilac-soft text-lilac" : "bg-peach-soft text-peach"}`}
                >
                  <Icon className="size-5" />
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
        <span>© 2026 Codepath · a learning operating system</span>
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
                Create your Codepath account. We’ll use your curriculum, goals, and available time
                to shape your first two weeks.
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
                By continuing, you agree to Codepath’s demo terms.
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
                  ? "A quick baseline helps Codepath choose the right amount of scaffolding."
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
                <p className="text-xs font-medium">How would you rate your DSA baseline?</p>
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
                    5 sample questions on DSA and OOP will sharpen your AI-detected baseline.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-3"
                    onClick={() => toast("Diagnostic complete · baseline set to Intermediate")}
                  >
                    Run 5-question diagnostic
                  </Button>
                </div>
              </>
            )}
            {step === 3 && (
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  ["Software Engineer", "Strong DSA, systems, and interview proof", Code2],
                  ["Full-Stack Developer", "Products, APIs, and frontend fluency", Layers3],
                  ["AI/ML Engineer", "Models, data, and applied experimentation", BrainCircuit],
                  ["Data Scientist", "SQL, statistics, and analytical thinking", BarChart3],
                ].map(([label, body, Icon], index) => (
                  <button
                    key={label as string}
                    className={`rounded-xl border p-4 text-left ${index === 0 ? "border-brand bg-brand-soft/50" : "border-border"}`}
                  >
                    <Icon className="size-5 text-brand" />
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

import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Code2,
  FileCode,
  Flame,
  FolderKanban,
  GitBranch,
  GraduationCap,
  Lock,
  Play,
  Sparkles,
  Terminal,
  Trophy,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getLearningProgressSummary,
  useLearningProgress,
} from "@/lib/learning-progress";

export function DashboardView() {
  const navigate = useNavigate();
  const progress = useLearningProgress();
  const summary = getLearningProgressSummary(progress);

  const phases = [
    {
      id: 1,
      name: "Foundations",
      desc: "4 modules",
      progress: "15%",
      status: "current" as const,
    },
    {
      id: 2,
      name: "Data & AI",
      desc: "4 modules",
      progress: "0%",
      status: "locked" as const,
    },
    {
      id: 3,
      name: "Applied AI",
      desc: "4 modules",
      progress: "0%",
      status: "locked" as const,
    },
    {
      id: 4,
      name: "Build & Deploy",
      desc: "4 modules",
      progress: "0%",
      status: "locked" as const,
    },
    {
      id: 5,
      name: "Portfolio & Career",
      desc: "4 modules",
      progress: "0%",
      status: "locked" as const,
    },
  ];

  return (
    <div className="page-container page-sections">
      {/* ── 1. HERO BANNER: Primary Action Clear in 2 Seconds ── */}
      <section className="relative overflow-hidden rounded-2xl bg-[#0B1F2A] text-white p-6 sm:p-8 lg:p-10 border border-[#123542]">
        {/* Subtle background glow */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none bg-gradient-to-l from-[#14B8A6] via-transparent to-transparent" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#123542] border border-[#14B8A6]/30 px-3 py-1">
              <span className="size-2 rounded-full bg-[#14B8A6] animate-pulse" />
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#14B8A6] font-bold">
                WELCOME BACK, AARAV! 👋
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display leading-[1.15]">
              Keep Building <br />
              <span className="text-[#CCFBF1]">Your AI Future</span>
            </h1>

            <p className="text-sm text-[#CCFBF1]/80 leading-relaxed font-normal">
              Master state-of-the-art Generative & Agentic AI with hands-on practice, verified production capstones, and university-grade rigor.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                className="h-11 px-6 rounded-xl bg-[#0F766E] hover:bg-[#0d655e] text-white font-bold text-sm shadow-sm transition-all"
                onClick={() => navigate({ to: "/learning-mode", search: { module: "3.2" } })}
              >
                Continue Learning <ArrowRight className="size-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                className="h-11 px-5 rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold transition-all"
                onClick={() => navigate({ to: "/curriculum" })}
              >
                View Curriculum
              </Button>
            </div>
          </div>

          {/* Futuristic Student Progress Badge Card */}
          <div className="hidden lg:flex flex-col items-center justify-center">
            <div className="relative w-80 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-md flex items-center justify-between">
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-[#14B8A6] font-bold tracking-wider">NEXT MILESTONE</span>
                <p className="text-sm font-bold text-white">LLM Prompt Engine</p>
                <p className="text-xs text-white/70">Module 01 Certification</p>
                <div className="pt-2">
                  <div className="w-40 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-[#14B8A6] rounded-full" style={{ width: "30%" }} />
                  </div>
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#0F766E]/40 border border-[#14B8A6]/40 flex items-center justify-center shrink-0">
                <Sparkles className="size-7 text-[#14B8A6]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. DASHBOARD STAT CARDS (4 Standardized Metric Cards) ── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Learning Progress",
            value: "0 / 20 modules",
            icon: BookOpen,
            color: "#0F766E",
            bg: "#CCFBF1",
          },
          {
            label: "Current Streak",
            value: "6 days",
            sub: "Keep going!",
            icon: Flame,
            color: "#D97706",
            bg: "#FEF3C7",
          },
          {
            label: "Total XP",
            value: "1,280",
            sub: "+120 this week",
            icon: Zap,
            color: "#0F766E",
            bg: "#CCFBF1",
          },
          {
            label: "Next Milestone",
            value: "Complete Module 01",
            icon: Trophy,
            color: "#0B1F2A",
            bg: "#F0F5F4",
          },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="ui-card p-5 space-y-2 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#587078] uppercase tracking-wider">
                  {stat.label}
                </span>
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: stat.bg, color: stat.color }}
                >
                  <Icon className="size-4.5" />
                </div>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-display text-[#0B1F2A]">
                  {stat.value}
                </p>
                {stat.sub && (
                  <p className="text-xs text-[#84979D] font-mono mt-0.5">{stat.sub}</p>
                )}
              </div>
            </div>
          );
        })}
      </section>

      {/* ── 3. YOUR LEARNING JOURNEY (5 Standardized Phase Cards) ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
              CURRICULUM ROADMAP
            </p>
            <h2 className="font-display text-xl font-bold text-[#0B1F2A]">
              Your Learning Journey
            </h2>
          </div>
          <button
            onClick={() => navigate({ to: "/curriculum" })}
            className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1"
          >
            Full Curriculum <ArrowRight className="size-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
          {phases.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl border p-4.5 space-y-3 transition-all ${
                p.status === "current"
                  ? "bg-white border-[#0F766E] ring-1 ring-[#0F766E]/30"
                  : "bg-white border-[#DCE7E5] opacity-80"
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[11px] text-[#84979D] font-medium uppercase">
                  Phase 0{p.id}
                </span>
                {p.status === "current" ? (
                  <span className="text-[10px] font-mono font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded-md">
                    Active
                  </span>
                ) : (
                  <span className="text-[10px] text-[#84979D] flex items-center gap-1">
                    <Lock className="size-3 text-[#84979D]" />
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#0B1F2A]">{p.name}</h3>
                <p className="text-xs text-[#84979D] mt-0.5">{p.desc}</p>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#84979D]">Progress</span>
                  <span className="font-bold text-[#0F766E]">{p.progress}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#F0F5F4] overflow-hidden">
                  <div
                    className="h-full bg-[#0F766E] rounded-full transition-all"
                    style={{ width: p.progress }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. CURRENT MODULE + QUICK ACTIONS (2/3 + 1/3 Balanced Grid) ── */}
      <section className="grid lg:grid-cols-3 gap-6 items-stretch">
        {/* CURRENT MODULE (2 cols) */}
        <div className="lg:col-span-2 ui-card p-6 flex flex-col justify-between space-y-5">
          <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#587078]">
              CURRENT MODULE
            </span>
            <span className="text-[11px] font-mono font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-1 rounded-md">
              IN PROGRESS · 15%
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-md">
              <span className="text-xs font-mono font-bold text-[#0F766E]">
                Module 01
              </span>
              <h3 className="text-xl font-bold font-display text-[#0B1F2A]">
                Python Foundations for AI
              </h3>
              <p className="text-xs sm:text-sm text-[#587078] leading-relaxed">
                Variables, data types, control flow, functions, and error handling with clean defensive discipline.
              </p>
              <div className="flex items-center gap-3 pt-1 text-xs text-[#84979D]">
                <span>Est. 4 hours</span>
                <span>·</span>
                <span>Step 3 of 10</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-center gap-2.5 sm:w-56">
              <Button
                className="w-full h-11 rounded-xl bg-[#0F766E] hover:bg-[#0d655e] text-white font-bold text-xs px-5 shadow-sm transition-all"
                onClick={() => navigate({ to: "/learning-mode", search: { module: "3.2" } })}
              >
                Continue: 3. LEARN →
              </Button>
              <button
                onClick={() => navigate({ to: "/curriculum" })}
                className="text-xs text-[#84979D] hover:text-[#0B1F2A] font-medium"
              >
                View all 10 steps →
              </button>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS (1 col) */}
        <div className="ui-card p-6 flex flex-col justify-between space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#587078] block border-b border-[#DCE7E5] pb-3.5">
            QUICK ACTIONS
          </span>
          <div className="grid grid-cols-2 gap-3 text-left">
            {[
              {
                title: "Practice",
                desc: "Sharpen skills",
                icon: Terminal,
                action: () => navigate({ to: "/challenges" }),
              },
              {
                title: "Build Project",
                desc: "Apply learning",
                icon: FolderKanban,
                action: () => navigate({ to: "/build" }),
              },
              {
                title: "View Notes",
                desc: "Review concepts",
                icon: FileCode,
                action: () => navigate({ to: "/curriculum" }),
              },
              {
                title: "Explore Skills",
                desc: "Track growth",
                icon: Trophy,
                action: () => navigate({ to: "/skills" }),
              },
            ].map((qa, idx) => {
              const QAIcon = qa.icon;
              return (
                <button
                  key={idx}
                  onClick={qa.action}
                  className="rounded-xl border border-[#DCE7E5] p-3.5 hover:border-[#0F766E] hover:bg-[#F0F5F4] transition text-left space-y-1.5 group cursor-pointer"
                >
                  <QAIcon className="size-4.5 text-[#0F766E] group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold text-[#0B1F2A]">{qa.title}</p>
                  <p className="text-[11px] text-[#84979D] leading-tight">{qa.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

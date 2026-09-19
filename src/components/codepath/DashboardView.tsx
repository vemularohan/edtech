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
  Quote,
  Sparkles,
  Terminal,
  Trophy,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* ── 1. HERO CARD (Matching Reference Image) ── */}
      <section className="relative overflow-hidden rounded-2xl bg-[#0B1F2A] text-white p-6 sm:p-8 border border-[#123542] shadow-sm">
        {/* Background glow and decorative elements */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none bg-gradient-to-l from-[#14B8A6] via-transparent to-transparent" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#14B8A6] font-bold">
              WELCOME BACK, AARAV! 👋
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display leading-tight">
              Keep Building <br />
              <span className="text-white">Your AI Future</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#CCFBF1]/80 leading-relaxed font-medium">
              Learn. Practice. Build. Get Verified.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Button
                className="bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-bold text-xs px-5 h-9 shadow-xs"
                onClick={() => navigate({ to: "/learning-mode", search: { module: "3.2" } })}
              >
                Continue Learning <ArrowRight className="size-3.5 ml-1.5" />
              </Button>
              <Button
                variant="outline"
                className="border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold h-9"
                onClick={() => navigate({ to: "/curriculum" })}
              >
                View Curriculum
              </Button>
            </div>
          </div>

          {/* Futuristic Student / AI Learning Visual Graphic */}
          <div className="hidden lg:flex flex-col items-center justify-center p-4">
            <div className="relative w-72 h-36 rounded-xl border border-white/15 bg-white/5 p-4 backdrop-blur-md flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-[#14B8A6] font-bold">NEXT GOAL</span>
                <p className="text-xs font-bold text-white">LLM Prompt Engine</p>
                <p className="text-[10px] text-white/60">Module 01 Certification</p>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#0F766E]/40 border border-[#14B8A6]/40 flex items-center justify-center">
                <Sparkles className="size-8 text-[#14B8A6]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. DASHBOARD STAT CARDS (4 compact metrics) ── */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            label: "Learning Progress",
            value: "0 / 30 modules",
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
              className="bg-white border border-[#DCE7E5] rounded-xl p-4 shadow-2xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#587078] uppercase tracking-wider">
                  {stat.label}
                </span>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: stat.bg, color: stat.color }}
                >
                  <Icon className="size-4 fill-current" />
                </div>
              </div>
              <p className="text-lg sm:text-xl font-bold font-display text-[#0B1F2A]">
                {stat.value}
              </p>
              {stat.sub && (
                <p className="text-[11px] text-[#84979D] font-mono">{stat.sub}</p>
              )}
            </div>
          );
        })}
      </section>

      {/* ── 3. YOUR LEARNING JOURNEY (5 horizontal phase cards) ── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#587078]">
            YOUR LEARNING JOURNEY
          </h2>
          <button
            onClick={() => navigate({ to: "/curriculum" })}
            className="text-xs font-semibold text-[#0F766E] hover:underline"
          >
            Full Journey →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {phases.map((p) => (
            <div
              key={p.id}
              className={`rounded-xl border p-4 space-y-3 transition-all ${
                p.status === "current"
                  ? "bg-white border-[#0F766E] ring-1 ring-[#0F766E] shadow-2xs"
                  : "bg-white/70 border-[#DCE7E5] opacity-75"
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-[10px] text-[#84979D] uppercase">
                  Phase {p.id}
                </span>
                {p.status === "current" ? (
                  <span className="text-[10px] font-mono font-bold text-[#0F766E] bg-[#CCFBF1] px-1.5 py-0.5 rounded">
                    Active
                  </span>
                ) : (
                  <span className="text-[10px] text-[#84979D] flex items-center gap-1">
                    <Lock className="size-2.5" />
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-sm text-[#0B1F2A]">{p.name}</h3>
                <p className="text-[11px] text-[#84979D]">{p.desc}</p>
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] font-mono">
                  <span className="text-[#84979D]">Progress</span>
                  <span className="font-bold text-[#0F766E]">{p.progress}</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#F0F5F4] overflow-hidden">
                  <div
                    className="h-full bg-[#0F766E] rounded-full"
                    style={{ width: p.progress }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. CURRENT MODULE + QUICK ACTIONS (2-column layout matching reference) ── */}
      <section className="grid lg:grid-cols-3 gap-5">
        {/* CURRENT MODULE (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-[#DCE7E5] rounded-xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#587078]">
              CURRENT MODULE
            </span>
            <span className="text-[11px] font-mono font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded">
              CURRENT · 15%
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-md">
              <span className="text-xs font-mono font-bold text-[#0F766E]">
                Module 01
              </span>
              <h3 className="text-xl font-bold font-display text-[#0B1F2A]">
                Python Foundations for AI
              </h3>
              <p className="text-xs text-[#587078] leading-relaxed">
                Variables, types, control flow and problem solving with clean defensive discipline.
              </p>
              <div className="flex items-center gap-3 pt-1 text-[11px] text-[#84979D]">
                <span>Est. 4 hours</span>
                <span>·</span>
                <span>Step 3 of 10</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-center gap-2">
              <Button
                className="w-full sm:w-auto bg-[#0F766E] hover:bg-[#0F766E]/90 text-white font-bold text-xs px-5 h-9"
                onClick={() => navigate({ to: "/learning-mode", search: { module: "3.2" } })}
              >
                Continue: 3. LEARN →
              </Button>
              <button
                onClick={() => navigate({ to: "/curriculum" })}
                className="text-[11px] text-[#84979D] hover:text-[#0B1F2A]"
              >
                View all steps →
              </button>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS (1 col, 4 cards matching reference) */}
        <div className="bg-white border border-[#DCE7E5] rounded-xl p-5 shadow-2xs space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#587078] block">
            QUICK ACTIONS
          </span>
          <div className="grid grid-cols-2 gap-2 text-left">
            {[
              {
                title: "Practice",
                desc: "Sharpen your skills",
                icon: Terminal,
                action: () => navigate({ to: "/challenges" }),
              },
              {
                title: "Build Project",
                desc: "Apply what you learn",
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
                desc: "Track point growth",
                icon: Trophy,
                action: () => navigate({ to: "/skills" }),
              },
            ].map((qa, idx) => {
              const QAIcon = qa.icon;
              return (
                <button
                  key={idx}
                  onClick={qa.action}
                  className="rounded-xl border border-[#DCE7E5] p-3 hover:border-[#0F766E] hover:bg-[#F0F5F4] transition text-left space-y-1 shadow-2xs group"
                >
                  <QAIcon className="size-4 text-[#0F766E] group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold text-[#0B1F2A]">{qa.title}</p>
                  <p className="text-[10px] text-[#84979D] leading-tight">{qa.desc}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

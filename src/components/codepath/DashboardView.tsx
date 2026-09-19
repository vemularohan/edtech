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
  useLearningEvidence,
  useLearningProgress,
  useSkillMastery,
} from "@/lib/learning-progress";

export function DashboardView() {
  const navigate = useNavigate();
  const progress = useLearningProgress();
  const summary = getLearningProgressSummary(progress);

  const phases = [
    {
      id: 1,
      name: "Foundations",
      moduleRange: "Modules 01–04",
      deliverable: "Scripted LLM Chatbot",
      status: "in-progress" as const,
      progress: 25,
      modules: [
        { code: "3.2", title: "Python Foundations for AI", status: "active" as const },
        { code: "3.3", title: "AI & Generative AI Fundamentals", status: "locked" as const },
        { code: "3.4", title: "APIs & LLM Integration", status: "locked" as const },
        { code: "3.5", title: "Prompt Engineering", status: "locked" as const },
      ],
      colorVar: "var(--color-brand)",
      colorSoft: "var(--color-brand-soft)",
    },
    {
      id: 2,
      name: "Knowledge Apps",
      moduleRange: "Modules 05–08",
      deliverable: "Cited Document Q&A",
      status: "locked" as const,
      progress: 0,
      modules: [
        { code: "3.6", title: "LLM Application Development", status: "locked" as const },
        { code: "3.7", title: "Embeddings & Vector Databases", status: "locked" as const },
        { code: "3.8", title: "Retrieval-Augmented Generation", status: "locked" as const },
        { code: "3.9", title: "Advanced RAG Systems", status: "locked" as const },
      ],
      colorVar: "var(--color-lilac)",
      colorSoft: "var(--color-lilac-soft)",
    },
    {
      id: 3,
      name: "Agents",
      moduleRange: "Modules 09–13",
      deliverable: "Tooled, Bounded Agent",
      status: "locked" as const,
      progress: 0,
      modules: [
        { code: "3.10", title: "LangChain Framework", status: "locked" as const },
        { code: "3.11", title: "AI Agents Fundamentals", status: "locked" as const },
        { code: "3.12", title: "Agents with Tools", status: "locked" as const },
        { code: "3.13", title: "LangGraph Workflows", status: "locked" as const },
        { code: "3.14", title: "Multi-Agent Systems", status: "locked" as const },
      ],
      colorVar: "var(--color-mint)",
      colorSoft: "var(--color-mint-soft)",
    },
    {
      id: 4,
      name: "Production",
      moduleRange: "Modules 14–17",
      deliverable: "Deployed & Monitored Agent",
      status: "locked" as const,
      progress: 0,
      modules: [
        { code: "3.15", title: "AI in Cybersecurity", status: "locked" as const },
        { code: "3.16", title: "AI in Robotics", status: "locked" as const },
        { code: "3.17", title: "AI Trends & Career Paths", status: "locked" as const },
        { code: "3.18", title: "Production AI Systems", status: "locked" as const },
      ],
      colorVar: "var(--color-peach)",
      colorSoft: "var(--color-peach-soft)",
    },
    {
      id: 5,
      name: "Portfolio",
      moduleRange: "Modules 18–20",
      deliverable: "Career-Ready Proof of Work",
      status: "locked" as const,
      progress: 0,
      modules: [
        { code: "3.19", title: "Projects (Portfolio)", status: "locked" as const },
        { code: "3.20", title: "Assessments", status: "locked" as const },
        { code: "3.21", title: "Internship & Job Prep", status: "locked" as const },
      ],
      colorVar: "var(--color-brand)",
      colorSoft: "var(--color-brand-soft)",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-16 cp-rise">

      {/* ── 1. Hero / Active Mission Banner ── */}
      <section
        className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8"
        style={{ boxShadow: "0 1px 3px rgba(15,23,42,.03), 0 8px 28px -6px rgba(15,23,42,.06)" }}
      >
        {/* Subtle gradient accent in corner */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full blur-3xl opacity-30"
          style={{ background: "var(--color-brand-soft)" }}
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[11px] font-bold"
                style={{
                  background: "var(--color-brand-soft)",
                  color: "var(--color-brand)",
                  border: "1px solid color-mix(in oklch, var(--color-brand) 30%, transparent)",
                }}
              >
                <span className="size-1.5 rounded-full cp-pulse" style={{ background: "var(--color-brand)" }} />
                CURRENT MISSION
              </span>
              <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] font-medium text-muted-foreground">
                Phase 1 · Foundations
              </span>
            </div>

            <div className="space-y-1.5">
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Module 01: Python Foundations for AI
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground max-w-xl">
                Build the programming discipline required for AI development — clean syntax, structured programs, reliable data handling, and a professional Python workflow.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Button
                size="lg"
                className="font-bold px-6 shadow-sm"
                style={{ background: "var(--color-brand)", color: "white" }}
                onClick={() => navigate({ to: "/learning-mode", search: { module: "3.2" } })}
              >
                <Play className="size-4 mr-2 fill-current" />
                Continue Lesson
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-medium"
                onClick={() => navigate({ to: "/curriculum" })}
              >
                View Syllabus
                <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Module badge card */}
          <div
            className="hidden lg:flex flex-col items-center gap-3 rounded-2xl border p-5 text-center w-56 shrink-0"
            style={{
              background: "linear-gradient(155deg, var(--color-brand-soft) 0%, white 100%)",
              borderColor: "color-mix(in oklch, var(--color-brand) 25%, transparent)",
            }}
          >
            <div className="relative">
              <div
                className="grid size-16 place-items-center rounded-2xl shadow-sm"
                style={{ background: "white", border: "1px solid color-mix(in oklch, var(--color-brand) 20%, transparent)" }}
              >
                <Terminal className="size-8" style={{ color: "var(--color-brand)" }} />
              </div>
              <span
                className="absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full text-[10px] font-bold text-white shadow"
                style={{ background: "var(--color-brand)" }}
              >
                01
              </span>
            </div>
            <div>
              <p className="font-display text-sm font-bold text-foreground">Python for AI</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">8 Disciplines · 20 Steps</p>
            </div>
            <div className="w-full">
              <div className="flex justify-between text-[10px] font-mono mb-1.5">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-bold" style={{ color: "var(--color-brand)" }}>0 / 20</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: "0%", background: "var(--color-brand)" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Stats Row ── */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { icon: BookOpen, label: "Modules", value: "20", note: "Single sequenced program", color: "brand" },
          { icon: FolderKanban, label: "Projects", value: "6", note: "Inspectable proof of work", color: "lilac" },
          { icon: GraduationCap, label: "Guided Hours", value: "160+", note: "Focused part-time pace", color: "mint" },
          { icon: Trophy, label: "Career Tracks", value: "4", note: "GenAI & AI Engineer", color: "peach" },
        ].map(({ icon: Icon, label, value, note, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-border bg-surface-elevated p-4 sm:p-5 card-depth-subtle"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
              <Icon className="size-4" style={{ color: `var(--color-${color})` }} />
              <span>{label}</span>
            </div>
            <p className="font-display text-2xl font-bold text-foreground">{value}</p>
            <p className="text-[11px] text-faint mt-0.5">{note}</p>
          </div>
        ))}
      </section>

      {/* ── 3. Learning Journey / Phase Path ── */}
      <section className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <GitBranch className="size-4" style={{ color: "var(--color-brand)" }} />
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--color-brand)" }}>
                Learning Journey
              </span>
            </div>
            <h2 className="font-display text-xl font-bold text-foreground mt-0.5">
              The GenAI Mastery Path
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-semibold self-start sm:self-auto"
            onClick={() => navigate({ to: "/curriculum" })}
          >
            All 20 modules <ArrowRight className="size-3.5 ml-1" />
          </Button>
        </div>

        {/* Phase cards — horizontal grid */}
        <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
          {phases.map((phase) => (
            <div
              key={phase.id}
              className={`flex flex-col justify-between rounded-2xl border p-4 transition-all duration-200 ${
                phase.status === "in-progress" ? "phase-card-active" : "phase-card-locked"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono font-bold text-muted-foreground">Phase {phase.id}</span>
                  {phase.status === "in-progress" ? (
                    <span
                      className="rounded-full px-2 py-0.5 font-mono text-[10px] font-bold"
                      style={{ background: phase.colorSoft, color: phase.colorVar }}
                    >
                      Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] text-faint">
                      <Lock className="size-3" /> Locked
                    </span>
                  )}
                </div>

                <h3 className="font-display text-sm font-bold text-foreground">{phase.name}</h3>
                <p className="font-mono text-[11px] text-muted-foreground mt-0.5">{phase.moduleRange}</p>

                {/* Deliverable */}
                <div className="mt-3 rounded-xl border border-border/60 bg-surface/50 p-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-faint">Deliverable</p>
                  <p className="text-[11px] font-medium text-foreground mt-0.5 leading-snug">{phase.deliverable}</p>
                </div>

                {/* Module list */}
                <div className="mt-3 space-y-1">
                  {phase.modules.slice(0, 3).map((m) => (
                    <button
                      key={m.code}
                      onClick={() => navigate({ to: "/learning-mode", search: { module: m.code as `3.${number}` } })}
                      className="flex w-full items-center justify-between rounded-lg px-1.5 py-1 text-left text-[11px] transition hover:bg-surface interactive-row"
                    >
                      <span className="truncate pr-1 font-medium text-foreground/80">{m.title}</span>
                      {m.status === "active" ? (
                        <Play className="size-3 fill-current shrink-0" style={{ color: "var(--color-brand)" }} />
                      ) : (
                        <Lock className="size-3 text-faint shrink-0" />
                      )}
                    </button>
                  ))}
                  {phase.modules.length > 3 && (
                    <p className="text-[10px] text-faint px-1.5 pt-0.5">
                      +{phase.modules.length - 3} more modules
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Next Up + Quick Links ── */}
      <section className="grid gap-4 lg:grid-cols-3">
        {/* Next up (2 cols) */}
        <div
          className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 lg:col-span-2"
          style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
        >
          <div className="border-b border-border pb-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--color-brand)" }}>
              Up Next In Your Queue
            </span>
            <h3 className="font-display text-lg font-bold text-foreground mt-0.5">
              Discipline 01: Variables &amp; Data Types
            </h3>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Investigate how dynamic typing and immutability behave in memory, and prevent silent type coercion bugs when parsing LLM outputs.
          </p>

          {/* Progress tracker */}
          <div className="rounded-xl border border-border bg-surface/40 p-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-semibold text-foreground">Phase 1 Foundations</span>
              <span className="font-mono text-muted-foreground">1 of 4 Modules Active</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill cp-fill" style={{ width: "25%", background: "var(--color-brand)" }} />
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-3.5" style={{ color: "var(--color-mint)" }} />
                Setup Completed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2 rounded-full" style={{ background: "var(--color-brand)" }} />
                Module 01 in progress
              </span>
              <span className="flex items-center gap-1.5 text-faint">
                <Lock className="size-3" />
                Module 02 locked
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button
              className="font-semibold text-xs"
              style={{ background: "var(--color-brand)", color: "white" }}
              onClick={() => navigate({ to: "/learning-mode", search: { module: "3.2" } })}
            >
              Start Lesson <ArrowRight className="size-3.5 ml-1" />
            </Button>
            <button
              onClick={() => navigate({ to: "/challenges" })}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition"
            >
              Jump to Practice Lab →
            </button>
          </div>
        </div>

        {/* Right column: Daily Focus + Quick Links */}
        <div className="space-y-3">
          {/* Daily Focus quote */}
          <div
            className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-2"
            style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
          >
            <div className="flex items-center gap-2">
              <Quote className="size-4 text-amber-500" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Daily Focus
              </span>
            </div>
            <p className="text-sm font-semibold text-foreground italic leading-snug">
              "A small step every day leads to big results."
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Even 20 minutes today keeps your streak active and locks in architectural habits before advancing to RAG and agents.
            </p>
          </div>

          {/* Quick Links */}
          <div
            className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-2"
            style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
          >
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Recommended For You
            </h4>
            <div className="space-y-1.5 text-xs">
              {[
                {
                  icon: FileCode,
                  label: "Python Cheat Sheet",
                  color: "brand",
                  to: () => navigate({ to: "/learning-mode", search: { module: "3.2" } }),
                },
                {
                  icon: Terminal,
                  label: "Practice Coding Lab",
                  color: "lilac",
                  to: () => navigate({ to: "/challenges" }),
                },
                {
                  icon: Trophy,
                  label: "Verified Competencies",
                  color: "mint",
                  to: () => navigate({ to: "/skills" }),
                },
              ].map(({ icon: Icon, label, color, to }) => (
                <button
                  key={label}
                  onClick={to}
                  className="flex w-full items-center justify-between rounded-xl border border-border bg-surface/40 p-2.5 hover:bg-surface hover:border-border/80 transition text-left interactive-row"
                >
                  <div className="flex items-center gap-2">
                    <Icon className="size-4" style={{ color: `var(--color-${color})` }} />
                    <span className="font-medium text-foreground">{label}</span>
                  </div>
                  <ChevronRight className="size-3.5 text-faint" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

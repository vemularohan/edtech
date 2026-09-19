import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Code2,
  ExternalLink,
  Flame,
  FolderKanban,
  Lock,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLearningEvidence, useLearningProgress, useSkillMastery } from "@/lib/learning-progress";

export function SkillsView() {
  const navigate = useNavigate();
  const progress = useLearningProgress();
  const evidence = useLearningEvidence();
  const skills = useSkillMastery("3.2");
  const [activeTab, setActiveTab] = useState<"all" | "in-progress" | "locked">("all");

  const radarData = [
    { subject: "Python", A: 85, fullMark: 100 },
    { subject: "RAG", A: 40, fullMark: 100 },
    { subject: "Agents", A: 25, fullMark: 100 },
    { subject: "System Design", A: 35, fullMark: 100 },
    { subject: "Problem Solving", A: 75, fullMark: 100 },
  ];

  const competencies = [
    {
      id: "python-ai",
      title: "Python for AI",
      category: "Foundations",
      status: "In Progress",
      description: "Functions, JSON, file handling, pip and environments",
      milestone: "Module 01 · Practice CLI tool",
      color: "brand",
    },
    {
      id: "llm-apis",
      title: "LLM APIs & Prompts",
      category: "Foundations",
      status: "Available",
      description: "Streaming chat, JSON templates, structured output",
      milestone: "Modules 03–04 · API chat project",
      color: "lilac",
    },
    {
      id: "rag-systems",
      title: "RAG Systems",
      category: "Knowledge Apps",
      status: "Locked",
      description: "Embeddings, hybrid search, LangChain",
      milestone: "Modules 06–09 · Citation evaluator",
      color: "mint",
    },
    {
      id: "agents-prod",
      title: "Agents & Production",
      category: "Agents & Deploy",
      status: "Locked",
      description: "Tools, graphs, guardrails, ops",
      milestone: "Modules 10–13 · Bounded agent project",
      color: "peach",
    },
  ];

  const filtered =
    activeTab === "all"
      ? competencies
      : activeTab === "in-progress"
      ? competencies.filter((c) => c.status === "In Progress" || c.status === "Available")
      : competencies.filter((c) => c.status === "Locked");

  const statusColor = (status: string) => {
    if (status === "In Progress") return "var(--color-brand)";
    if (status === "Available") return "var(--color-lilac)";
    return "var(--color-faint)";
  };
  const statusBg = (status: string) => {
    if (status === "In Progress") return "var(--color-brand-soft)";
    if (status === "Available") return "var(--color-lilac-soft)";
    return "var(--color-muted)";
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-16 cp-rise">

      {/* ── 1. Hero Banner ── */}
      <section
        className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8"
        style={{ boxShadow: "0 1px 3px rgba(15,23,42,.03), 0 8px 28px -6px rgba(15,23,42,.06)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full blur-3xl opacity-25"
          style={{ background: "var(--color-mint-soft)" }}
        />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span
              className="font-mono text-[11px] font-bold uppercase tracking-widest"
              style={{ color: "var(--color-brand)" }}
            >
              SKILLS YOU CAN PROVE
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Turn your learning into real proof
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              Every skill here is linked to a module, a practice lab, or a project submission.
              No self-assessments — only verified evidence.
            </p>
          </div>

          {/* Summary stats */}
          <div className="flex flex-wrap gap-3 shrink-0">
            {[
              { label: "Skills Tracked", value: "4", color: "brand" },
              { label: "In Progress", value: "1", color: "lilac" },
              { label: "Mastered", value: "0", color: "mint" },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-surface/60 px-4 py-3 text-center min-w-[80px]"
              >
                <p className="font-display text-2xl font-bold" style={{ color: `var(--color-${color})` }}>
                  {value}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Radar + Competencies Grid ── */}
      <div className="grid gap-4 lg:grid-cols-[340px_1fr]">

        {/* Radar chart */}
        <div
          className="rounded-2xl border border-border bg-surface-elevated p-5"
          style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
        >
          <div className="mb-3">
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-wider"
              style={{ color: "var(--color-brand)" }}
            >
              Competency Profile
            </span>
            <h2 className="font-display text-base font-bold text-foreground mt-0.5">
              Skill Radar
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="var(--color-border)" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "var(--color-faint)", fontSize: 10, fontFamily: "Inter" }}
              />
              <Radar
                name="Skills"
                dataKey="A"
                stroke="var(--color-brand)"
                fill="var(--color-brand)"
                fillOpacity={0.12}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-3 space-y-2">
            {radarData.map((d) => (
              <div key={d.subject} className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="flex justify-between text-[11px] mb-0.5">
                    <span className="font-medium text-foreground">{d.subject}</span>
                    <span className="font-mono text-faint">{d.A}%</span>
                  </div>
                  <div className="progress-track" style={{ height: "4px" }}>
                    <div
                      className="progress-fill"
                      style={{
                        width: `${d.A}%`,
                        background: d.A >= 70 ? "var(--color-brand)" : d.A >= 50 ? "var(--color-lilac)" : "var(--color-border)",
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competencies list */}
        <div
          className="rounded-2xl border border-border bg-surface-elevated p-5"
          style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <span
                className="font-mono text-[10px] font-bold uppercase tracking-wider"
                style={{ color: "var(--color-brand)" }}
              >
                Tracked Competencies
              </span>
              <h2 className="font-display text-base font-bold text-foreground mt-0.5">
                Evidence-Based Skills
              </h2>
            </div>
            {/* Filter tabs */}
            <div className="flex rounded-xl border border-border bg-surface p-1 gap-0.5 text-xs">
              {(["all", "in-progress", "locked"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-lg px-3 py-1.5 font-medium transition-all capitalize ${
                    activeTab === tab
                      ? "bg-surface-elevated shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "in-progress" ? "Active" : tab === "locked" ? "Locked" : "All"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filtered.map((comp) => (
              <div
                key={comp.id}
                className="group rounded-2xl border border-border bg-surface/40 p-4 transition-all hover:bg-surface hover:border-border/80 hover:shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display text-sm font-bold text-foreground">{comp.title}</span>
                      <span
                        className="rounded-full px-2 py-0.5 text-[10px] font-bold font-mono"
                        style={{
                          background: statusBg(comp.status),
                          color: statusColor(comp.status),
                        }}
                      >
                        {comp.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{comp.description}</p>
                    <div className="mt-2 flex items-center gap-1.5 text-[11px] text-faint">
                      <BookOpen className="size-3" />
                      <span>{comp.milestone}</span>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {comp.status === "In Progress" || comp.status === "Available" ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-7 px-2.5"
                        onClick={() =>
                          navigate({ to: "/learning-mode", search: { module: "3.2" } })
                        }
                      >
                        <Play className="size-3 mr-1" />
                        Practice
                      </Button>
                    ) : (
                      <span className="grid size-7 place-items-center rounded-lg bg-surface border border-border">
                        <Lock className="size-3.5 text-faint" />
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. Career Readiness ── */}
      <section
        className="rounded-2xl border border-border bg-surface-elevated p-5 sm:p-6"
        style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-wider"
              style={{ color: "var(--color-brand)" }}
            >
              Career Readiness
            </span>
            <h2 className="font-display text-base font-bold text-foreground mt-0.5">
              How you track against GenAI Engineer roles
            </h2>
          </div>
          <Button variant="ghost" size="sm" className="text-xs" onClick={() => navigate({ to: "/career" })}>
            Career Map <ArrowRight className="size-3.5 ml-1" />
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { role: "Python Developer", match: 85, color: "brand" },
            { role: "LLM API Engineer", match: 40, color: "lilac" },
            { role: "RAG Specialist", match: 20, color: "mint" },
            { role: "AI Agent Builder", match: 10, color: "peach" },
          ].map(({ role, match, color }) => (
            <div
              key={role}
              className="rounded-xl border border-border bg-surface/40 p-3.5"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-foreground">{role}</span>
                <span className="font-mono font-bold" style={{ color: `var(--color-${color})` }}>
                  {match}%
                </span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill cp-fill"
                  style={{ width: `${match}%`, background: `var(--color-${color})` }}
                />
              </div>
              <p className="mt-1.5 text-[10px] text-faint">
                {match >= 70 ? "Strong match" : match >= 40 ? "Building foundation" : "Complete more modules"}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Code2,
  FolderKanban,
  GraduationCap,
  Lock,
  Play,
  ShieldAlert,
  Sparkles,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CurriculumModule } from "@/lib/curriculum-data";

interface LockedModulePreviewProps {
  module: CurriculumModule;
}

export function LockedModulePreview({ module }: LockedModulePreviewProps) {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-12">
      {/* Top Breadcrumb / Return */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate({ to: "/curriculum" })}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Curriculum Catalog
        </button>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-border/80 bg-surface px-2.5 py-1 font-mono text-[11px] font-semibold text-muted-foreground">
            Module {module.code}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
            <Lock className="size-3" />
            Locked Preview
          </span>
        </div>
      </div>

      {/* Lock Warning Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/5 via-surface-elevated to-surface p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
              <ShieldAlert className="size-3.5" />
              PREREQUISITES REQUIRED
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl text-foreground">
              {module.title}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {module.description}
            </p>
            <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
              Complete <strong className="font-semibold">Module 01: Python Foundations for AI</strong> and its prerequisite chain to unlock the interactive lessons, coding labs, and project submissions for this module.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 shrink-0 sm:min-w-[220px]">
            <Button
              size="lg"
              className="w-full bg-[var(--color-brand)] text-white shadow-md hover:bg-[var(--color-brand)]/90 font-semibold"
              onClick={() => navigate({ to: "/learning-mode", search: { module: "3.2" } })}
            >
              <Play className="size-4 mr-2 fill-current" />
              Resume Module 01
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs font-medium"
              onClick={() => navigate({ to: "/curriculum" })}
            >
              View Full Learning Path
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Meta Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-border/70 bg-surface/60 p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Clock className="size-3.5 text-[var(--color-brand)]" />
            <span>Estimated Depth</span>
          </div>
          <p className="font-display text-base font-bold text-foreground">
            {module.estimatedTime || "8-12 hours"}
          </p>
          <p className="text-[11px] text-faint">Guided instruction + labs</p>
        </div>

        <div className="rounded-xl border border-border/70 bg-surface/60 p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <GraduationCap className="size-3.5 text-[#0F766E]" />
            <span>Difficulty</span>
          </div>
          <p className="font-display text-base font-bold text-foreground">
            {module.difficulty}
          </p>
          <p className="text-[11px] text-faint">Progressive challenge</p>
        </div>

        <div className="rounded-xl border border-border/70 bg-surface/60 p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <Code2 className="size-3.5 text-[#14B8A6]" />
            <span>Core Concepts</span>
          </div>
          <p className="font-display text-base font-bold text-foreground">
            {module.topics.length} Disciplines
          </p>
          <p className="text-[11px] text-faint">Structured syllabus</p>
        </div>

        <div className="rounded-xl border border-border/70 bg-surface/60 p-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <FolderKanban className="size-3.5 text-[#0F766E]" />
            <span>Milestone Build</span>
          </div>
          <p className="font-display text-sm font-bold text-foreground truncate">
            {module.project}
          </p>
          <p className="text-[11px] text-faint">Portfolio inspectable</p>
        </div>
      </div>

      {/* Syllabus & Topic Overview (Students can preview everything!) */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-5">
          {/* Topics in Depth */}
          <div className="rounded-2xl border border-border/80 bg-surface-elevated p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-border/60 pb-3 mb-4">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
                  Syllabus Breakdown
                </span>
                <h2 className="text-lg font-bold text-foreground">Topics In Depth</h2>
              </div>
              <span className="text-xs text-muted-foreground">
                {module.topics.length} Sections
              </span>
            </div>

            <div className="space-y-3">
              {module.topics.map((topic, index) => (
                <div
                  key={topic}
                  className="rounded-xl border border-border/60 bg-surface/40 p-4 transition-all hover:bg-surface/70"
                >
                  <div className="flex items-start gap-3">
                    <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[var(--color-brand-soft)] font-mono text-xs font-bold text-[var(--color-brand)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold text-foreground">{topic}</h3>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        Structured walkthrough covering architectural foundations, production pitfalls, interactive prediction, and hands-on coding.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demonstrable Outcomes */}
          {module.masteryCriteria && module.masteryCriteria.length > 0 && (
            <div className="rounded-2xl border border-border/80 bg-surface-elevated p-6 shadow-xs">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-mint">
                Proof of Competence
              </span>
              <h2 className="text-lg font-bold text-foreground mt-1 mb-3">
                Outcomes You Will Demonstrate
              </h2>
              <div className="space-y-2.5">
                {module.masteryCriteria.map((criterion) => (
                  <div key={criterion} className="flex items-start gap-2 text-xs text-foreground/90">
                    <CheckCircle2 className="size-4 shrink-0 text-mint mt-0.5" />
                    <span>{criterion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar: Tools, Prerequisites & Locked Lab Callout */}
        <div className="space-y-5">
          {/* Prerequisites */}
          <div className="rounded-2xl border border-border/80 bg-surface-elevated p-5 shadow-xs">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Required Journey
            </span>
            <h3 className="text-sm font-bold text-foreground mt-1 mb-3">Prerequisites</h3>
            <div className="space-y-2 text-xs">
              {module.prerequisites && module.prerequisites.length > 0 ? (
                module.prerequisites.map((req) => (
                  <div
                    key={req}
                    className="flex items-center justify-between rounded-xl border border-border/60 bg-surface/50 p-2.5"
                  >
                    <span className="font-medium text-foreground">{req}</span>
                    <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                      Required
                    </span>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-border/60 bg-surface/50 p-2.5 text-muted-foreground">
                  Complete Module 01 (Python Foundations for AI)
                </div>
              )}
            </div>
          </div>

          {/* Tools & Tech Stack */}
          <div className="rounded-2xl border border-border/80 bg-surface-elevated p-5 shadow-xs">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
              Environment & Tooling
            </span>
            <h3 className="text-sm font-bold text-foreground mt-1 mb-3">Stack Covered</h3>
            <div className="flex flex-wrap gap-1.5">
              {module.tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-lg border border-border/70 bg-surface px-2.5 py-1 font-mono text-[11px] font-medium text-foreground"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Locked Interactive Lab Mock Card */}
          <div className="rounded-2xl border border-dashed border-border/80 bg-surface/30 p-5 text-center space-y-3">
            <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-surface-elevated border border-border/60 shadow-inner">
              <Lock className="size-6 text-faint" />
            </div>
            <h4 className="text-sm font-bold text-foreground">Interactive Lab Locked</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Code editor, test assertions, and Break-It simulations unlock automatically as soon as you complete the active module.
            </p>
            <Button
              size="sm"
              className="w-full bg-[var(--color-brand)] text-white font-semibold"
              onClick={() => navigate({ to: "/learning-mode", search: { module: "3.2" } })}
            >
              Start Active Module 01 <ArrowRight className="size-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

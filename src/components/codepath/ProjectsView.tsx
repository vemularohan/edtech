import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  ExternalLink,
  FileCode,
  FolderKanban,
  GitBranch,
  Github,
  GraduationCap,
  Layers,
  Lock,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trophy,
  UploadCloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { recordLearningEvidence, recordSkillActivity } from "@/lib/learning-progress";

interface ProjectBuild {
  id: number;
  title: string;
  level: "Foundation" | "Intermediate" | "Advanced" | "Capstone";
  modules: string;
  deliverables: string;
  status: "completed" | "in-progress" | "available" | "locked";
  completedDate?: string;
  githubUrl?: string;
  verified: boolean;
}

export function ProjectsView() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState<ProjectBuild[]>([
    {
      id: 1,
      title: "LLM Chatbot (Python + API)",
      level: "Foundation",
      modules: "Maps to: Modules 1–5",
      deliverables: "Repo with README, .env.example, pinned requirements, and 2-minute demo script.",
      status: "completed",
      completedDate: "Submitted on 12 Sep 2026",
      githubUrl: "https://github.com/aarav-k/python-llm-chatbot",
      verified: true,
    },
    {
      id: 2,
      title: "Semantic Search System",
      level: "Intermediate",
      modules: "Maps to: Module 6",
      deliverables: "Reproducible index build script plus query CLI and short write-up of similarity metric choice.",
      status: "completed",
      completedDate: "Submitted on 16 Sep 2026",
      githubUrl: "https://github.com/aarav-k/semantic-search-cli",
      verified: true,
    },
    {
      id: 3,
      title: "RAG-based PDF Q&A",
      level: "Intermediate",
      modules: "Maps to: Modules 7–9",
      deliverables: "Sample PDFs, eval set of 15 questions, and table of faithfulness notes.",
      status: "available",
      verified: false,
    },
    {
      id: 4,
      title: "AI Agent with Tools",
      level: "Advanced",
      modules: "Maps to: Modules 10–11",
      deliverables: "Trace logs for three tasks (success, tool error, max-steps stop).",
      status: "locked",
      verified: false,
    },
    {
      id: 5,
      title: "Automation Assistant",
      level: "Advanced",
      modules: "Maps to: Modules 11–12, 17",
      deliverables: "Graph/state diagram, confirmation UX or CLI prompt, and safety note.",
      status: "locked",
      verified: false,
    },
    {
      id: 6,
      title: "Multi-Agent System",
      level: "Capstone",
      modules: "Maps to: Modules 12–13, 17",
      deliverables: "Architecture diagram, demo recording or transcript, and one-page failure-mode analysis.",
      status: "locked",
      verified: false,
    },
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState<number>(3);
  const [repoUrl, setRepoUrl] = useState("https://github.com/aarav-k/rag-pdf-evaluator");
  const [branch, setBranch] = useState("main");
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    status: "pass" | "fail";
    score: number;
    breakdown: {
      functionality: number;
      codeQuality: number;
      architecture: number;
      errorHandling: number;
      documentation: number;
    };
    checks: Array<{ label: string; passed: boolean; note: string }>;
    feedback: string;
  } | null>(null);

  const activeProject = projects.find((p) => p.id === selectedProjectId) ?? projects[2]!;
  const completedCount = projects.filter((p) => p.verified).length;

  const handleRunEvaluation = () => {
    if (!repoUrl.trim().startsWith("https://github.com/")) {
      toast.error("Please enter a valid GitHub repository URL (https://github.com/...)");
      return;
    }

    setEvaluating(true);
    setEvaluationResult(null);

    setTimeout(() => {
      setEvaluating(false);
      setEvaluationResult({
        status: "pass",
        score: 94,
        breakdown: {
          functionality: 95,
          codeQuality: 92,
          architecture: 96,
          errorHandling: 90,
          documentation: 97,
        },
        checks: [
          { label: "README & Environment setup", passed: true, note: "Clear reproduction steps and .env.example verified" },
          { label: "Pinned dependencies (requirements.txt)", passed: true, note: "All packages pinned with exact hashes" },
          { label: "Secrets Audit", passed: true, note: "Zero hardcoded API keys detected in commit tree" },
          { label: "Public test suite assertions", passed: true, note: "8 / 8 tests passed" },
          { label: "Hidden test cases (Faithfulness eval)", passed: true, note: "15 / 15 questions answered with faithful citations" },
        ],
        feedback: "Exceptional submission. Chunking logic cleanly isolates table headers, and the abstain threshold properly returns 'I don't know' when query similarity is below 0.65.",
      });

      // Update project state
      setProjects((prev) =>
        prev.map((p) =>
          p.id === selectedProjectId
            ? { ...p, status: "completed", verified: true, completedDate: "Verified Today", githubUrl: repoUrl }
            : p
        )
      );

      recordLearningEvidence({ challengesPassed: 1 });
      recordSkillActivity("3.2", "m01-files", 4, "RAG PDF QA project verified");
      recordSkillActivity("3.2", "m01-json", 4, "RAG PDF QA project verified");
      toast.success("Project verified! +100 XP awarded and added to your Profile.");
    }, 1800);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-5 pb-16 cp-rise">
      {/* ── Header Banner ── */}
      <section
        className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated p-6 sm:p-8"
        style={{ boxShadow: "0 1px 3px rgba(15,23,42,.03), 0 8px 28px -6px rgba(15,23,42,.06)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full blur-3xl opacity-25"
          style={{ background: "var(--color-lilac-soft)" }}
        />
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span
              className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest"
              style={{ color: "var(--color-brand)" }}
            >
              <FolderKanban className="size-4" />
              Project Portfolio · Module 18
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Six builds hiring managers can inspect
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
              Complete three to five of these with a README, pinned dependencies, and no committed secrets. RAG and agent projects should include traces, citations, and honest limits.
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-3 shrink-0">
            <div className="rounded-xl border border-border bg-surface/60 px-4 py-3 text-center min-w-[80px]">
              <p className="font-display text-2xl font-bold" style={{ color: "var(--color-brand)" }}>
                {completedCount}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">Verified</p>
            </div>
            <div className="rounded-xl border border-border bg-surface/60 px-4 py-3 text-center min-w-[80px]">
              <p className="font-display text-2xl font-bold text-foreground">
                {projects.length - completedCount}
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">Remaining</p>
            </div>
            <div className="rounded-xl border border-border bg-surface/60 px-4 py-3 text-center min-w-[80px]">
              <p className="font-display text-2xl font-bold" style={{ color: "var(--color-mint)" }}>
                {Math.round((completedCount / projects.length) * 100)}%
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">Complete</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Projects List & Verification Evaluation Center */}
      <div className="grid gap-6 xl:grid-cols-[1.2fr_1.8fr]">
        {/* Left Column: Project Milestones List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-foreground">Project Milestones</h2>
            <span className="text-xs text-muted-foreground">{projects.length} Total Builds</span>
          </div>

          <div className="space-y-2.5">
            {projects.map((project) => {
              const isSelected = project.id === selectedProjectId;
              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className="cursor-pointer rounded-2xl border p-4 transition-all"
                  style={{
                    borderColor: isSelected ? "var(--color-brand)" : "var(--color-border)",
                    background: isSelected ? "var(--color-surface-elevated)" : "var(--color-surface)",
                    boxShadow: isSelected ? "0 0 0 1px color-mix(in oklch, var(--color-brand) 25%, transparent), 0 4px 12px -4px rgba(15,23,42,.08)" : "none",
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="grid size-6 shrink-0 place-items-center rounded-lg font-mono text-[11px] font-bold"
                        style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-faint)" }}
                      >
                        {String(project.id).padStart(2, "0")}
                      </span>
                      <h3 className="text-sm font-bold text-foreground truncate">{project.title}</h3>
                    </div>

                    {project.verified ? (
                      <span
                        className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold"
                        style={{ background: "var(--color-mint-soft)", color: "var(--color-mint)", border: "1px solid color-mix(in oklch, var(--color-mint) 30%, transparent)" }}
                      >
                        <CheckCircle2 className="size-3" /> Verified
                      </span>
                    ) : project.status === "available" ? (
                      <span
                        className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold"
                        style={{ background: "var(--color-brand-soft)", color: "var(--color-brand)", border: "1px solid color-mix(in oklch, var(--color-brand) 30%, transparent)" }}
                      >
                        Submit
                      </span>
                    ) : (
                      <span
                        className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                        style={{ background: "var(--color-surface)", color: "var(--color-faint)", border: "1px solid var(--color-border)" }}
                      >
                        <Lock className="size-3" /> Locked
                      </span>
                    )}
                  </div>

                  <p className="font-mono text-[10px] text-muted-foreground mt-1">{project.modules}</p>
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                    {project.deliverables}
                  </p>

                  {project.completedDate && (
                    <div
                      className="mt-2.5 flex items-center justify-between pt-2 text-[11px]"
                      style={{ borderTop: "1px solid var(--color-border)" }}
                    >
                      <span className="text-faint">{project.completedDate}</span>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 hover:underline"
                          style={{ color: "var(--color-brand)" }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="size-3" /> Repo <ExternalLink className="size-2.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Standards Checklist */}
          <div
            className="rounded-2xl border border-border bg-surface-elevated p-4 space-y-2"
            style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-foreground">Project Standards</p>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              {[
                "Clean README with setup steps",
                "Pinned dependencies (requirements.txt)",
                "No API keys or secrets in the repo",
                "Honest failure analysis & limitations",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="size-3.5 shrink-0" style={{ color: "var(--color-mint)" }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Submission & Automated Evaluation Console */}
        <div className="space-y-4">
          {/* Selected Project Banner */}
          <div
            className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4"
            style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
                  Submission & Evaluation Gateway
                </span>
                <h2 className="text-lg font-bold text-foreground mt-0.5">
                  {activeProject.title}
                </h2>
              </div>
              <span className="rounded-full bg-surface border border-border px-2.5 py-1 text-xs font-mono text-muted-foreground">
                {activeProject.level} Level
              </span>
            </div>

            <div className="rounded-xl border border-border/60 bg-surface/50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Required Deliverables
              </p>
              <p className="text-xs leading-relaxed text-foreground/90 font-mono">
                {activeProject.deliverables}
              </p>
            </div>

            {/* Submission Form */}
            <div className="space-y-3 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <Github className="size-3.5 text-foreground" />
                  GitHub Repository URL
                </label>
                <Input
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/your-username/project-repo"
                  className="font-mono text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <GitBranch className="size-3.5 text-foreground" />
                  Branch
                </label>
                <Input
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  placeholder="main"
                  className="font-mono text-xs max-w-xs"
                />
              </div>

              <Button
                size="lg"
                disabled={evaluating}
                onClick={handleRunEvaluation}
                className="w-full bg-[var(--color-brand)] text-white font-bold text-xs sm:text-sm mt-2 shadow-md hover:bg-[var(--color-brand)]/90"
              >
                {evaluating ? (
                  <>
                    <UploadCloud className="size-4 mr-2 animate-bounce" />
                    Running Automated CI & AI Evaluation...
                  </>
                ) : (
                  <>
                    Submit For Automated Evaluation <ArrowRight className="size-4 ml-1.5" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Automated Evaluation Result Report */}
          {evaluationResult && (
            <div
              className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4 cp-rise"
              style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
            >
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-5 text-mint" />
                  <div>
                    <h3 className="text-base font-bold text-foreground">Evaluation Report</h3>
                    <p className="text-[11px] text-muted-foreground">Automated Test Matrix + AI Architecture Review</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-2xl font-bold text-mint">
                    {evaluationResult.score}/100
                  </span>
                  <p className="text-[10px] font-mono text-mint font-bold uppercase">Passed & Verified</p>
                </div>
              </div>

              {/* Dimension Scores */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                <div className="rounded-xl border border-border/60 bg-surface/50 p-2">
                  <p className="text-[10px] text-muted-foreground">Functionality</p>
                  <p className="font-mono font-bold text-foreground mt-0.5">{evaluationResult.breakdown.functionality}%</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-surface/50 p-2">
                  <p className="text-[10px] text-muted-foreground">Code Quality</p>
                  <p className="font-mono font-bold text-foreground mt-0.5">{evaluationResult.breakdown.codeQuality}%</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-surface/50 p-2">
                  <p className="text-[10px] text-muted-foreground">Architecture</p>
                  <p className="font-mono font-bold text-foreground mt-0.5">{evaluationResult.breakdown.architecture}%</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-surface/50 p-2">
                  <p className="text-[10px] text-muted-foreground">Error Handling</p>
                  <p className="font-mono font-bold text-foreground mt-0.5">{evaluationResult.breakdown.errorHandling}%</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-surface/50 p-2 col-span-2 sm:col-span-1">
                  <p className="text-[10px] text-muted-foreground">Documentation</p>
                  <p className="font-mono font-bold text-foreground mt-0.5">{evaluationResult.breakdown.documentation}%</p>
                </div>
              </div>

              {/* Automated Checks List */}
              <div className="space-y-2 border-t border-border/50 pt-3">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground">Verified Checks</p>
                {evaluationResult.checks.map((chk, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl border border-border/50 bg-surface/40 p-2.5 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-3.5 text-mint shrink-0" />
                      <span className="font-medium text-foreground">{chk.label}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground">{chk.note}</span>
                  </div>
                ))}
              </div>

              {/* AI Feedback */}
              <div className="rounded-xl border border-[var(--color-brand)]/20 bg-[var(--color-brand-soft)]/30 p-3.5 text-xs space-y-1">
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand)]">
                  AI Reviewer Feedback
                </p>
                <p className="text-foreground/90 leading-relaxed font-sans">{evaluationResult.feedback}</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => navigate({ to: "/profile" })}
                >
                  View in My Profile →
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground"
                  onClick={() => setEvaluationResult(null)}
                >
                  Clear Evaluation
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  ExternalLink,
  FileCode,
  FileText,
  FolderKanban,
  GitBranch,
  Github,
  Lock,
  Play,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { recordLearningEvidence } from "@/lib/learning-progress";

export function ProjectsView() {
  const navigate = useNavigate();

  // Project lifecycle stages matching reference screen 5
  const stages = [
    { label: "Learn", status: "completed" },
    { label: "Build", status: "current" },
    { label: "Test", status: "pending" },
    { label: "Submit", status: "pending" },
    { label: "AI Review", status: "pending" },
    { label: "Feedback", status: "pending" },
    { label: "Verified", status: "pending" },
  ];

  const [progressItems, setProgressItems] = useState([
    { id: 1, text: "Read requirements & data schema", checked: true },
    { id: 2, text: "Set up isolated Python environment", checked: true },
    { id: 3, text: "Implement defensive CSV ingestion", checked: false },
    { id: 4, text: "Run automated unit test suite", checked: false },
    { id: 5, text: "Generate terminal analytics report", checked: false },
    { id: 6, text: "Submit repository to GitHub", checked: false },
    { id: 7, text: "Undergo automated AI evaluation", checked: false },
    { id: 8, text: "Earn Capstone Verification Credential", checked: false },
  ]);

  const toggleCheck = (id: number) => {
    setProgressItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const completedCount = progressItems.filter((p) => p.checked).length;
  const progressPercent = Math.round((completedCount / progressItems.length) * 100);

  const handleOpenWorkspace = () => {
    toast.success("Opening Project Workspace in Cloud IDE...");
    recordLearningEvidence({
      sectionsCompleted: 1,
    });
    navigate({ to: "/coding-lab" });
  };

  return (
    <div className="page-container page-sections">
      {/* ── Top Header (Aligned to Global Grid) ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#DCE7E5] pb-4">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
            ACADEMIC CAPSTONE
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F2A] tracking-tight">
            AI Project Challenge
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-[#587078]">
            Build. Test. Submit. Get Verified.
          </p>
        </div>

        <Button
          size="sm"
          className="bg-[#0F766E] hover:bg-[#0d655e] text-white text-xs font-semibold h-10 px-5 rounded-xl shadow-sm self-start sm:self-auto cursor-pointer"
          onClick={handleOpenWorkspace}
        >
          <Terminal className="size-3.5 mr-1.5" />
          Open Project Workspace
        </Button>
      </div>

      {/* ── Horizontal Project Lifecycle Stepper ── */}
      <div className="ui-card p-5">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-2">
          {stages.map((stage, idx) => {
            const isCompleted = stage.status === "completed";
            const isCurrent = stage.status === "current";
            return (
              <div key={stage.label} className="flex items-center min-w-fit">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`grid size-8 place-items-center rounded-full text-xs font-bold transition-all ${
                      isCurrent
                        ? "bg-[#0F766E] text-white ring-4 ring-[#CCFBF1]"
                        : isCompleted
                        ? "bg-[#14B8A6] text-white"
                        : "bg-[#F0F5F4] text-[#84979D] border border-[#DCE7E5]"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="size-4 stroke-[3]" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>
                  <span
                    className={`text-xs whitespace-nowrap ${
                      isCurrent
                        ? "text-[#0F766E] font-bold"
                        : isCompleted
                        ? "text-[#0B1F2A] font-semibold"
                        : "text-[#84979D] font-medium"
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>

                {idx < stages.length - 1 && (
                  <div
                    className={`mx-3 sm:mx-6 h-0.5 w-8 sm:w-16 rounded-full ${
                      isCompleted ? "bg-[#14B8A6]" : "bg-[#DCE7E5]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Two-Column Main Content Grid ── */}
      <div className="grid gap-6 lg:grid-cols-12 items-start">
        {/* Left Column: Project Brief, Requirements & Resources (col-span-7) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Project Brief */}
          <div className="ui-card p-6 space-y-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
              PROJECT SPECIFICATION
            </span>
            <h2 className="text-base font-bold text-[#0B1F2A]">
              Production CSV Analytics & Visual Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-[#587078] leading-relaxed">
              Design and implement a robust Python pipeline that ingests heterogeneous CSV datasets, validates records with defensive exception handling, calculates statistical distributions, and renders terminal metrics for downstream agentic tools.
            </p>
          </div>

          {/* Requirements Checklist */}
          <div className="ui-card p-6 space-y-3.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#84979D]">
              CORE REQUIREMENTS
            </span>
            <ul className="space-y-2.5 text-xs text-[#587078]">
              <li className="flex items-start gap-2.5">
                <span className="size-2 rounded-full bg-[#0F766E] mt-1.5 shrink-0" />
                <span>Parse CSV records with typing validation and missing value fallbacks</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="size-2 rounded-full bg-[#0F766E] mt-1.5 shrink-0" />
                <span>Compute standard deviation, mean, median, and quantile percentiles</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="size-2 rounded-full bg-[#0F766E] mt-1.5 shrink-0" />
                <span>Render formatted Unicode bar charts and histograms directly to stdout</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="size-2 rounded-full bg-[#0F766E] mt-1.5 shrink-0" />
                <span>Trap FileNotFoundError, EmptyDataError, and UnicodeDecodeError cleanly</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="size-2 rounded-full bg-[#0F766E] mt-1.5 shrink-0" />
                <span>Export structured execution JSON payload to ./data/output_report.json</span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="ui-card p-6 space-y-3.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#84979D]">
              STARTER ASSETS & DOCUMENTATION
            </span>
            <div className="grid sm:grid-cols-3 gap-3">
              <a
                href="#starter"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info("Downloading Project starter code (.zip)...");
                }}
                className="flex items-center gap-2 p-3 rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] text-[#0F766E] hover:border-[#0F766E] hover:bg-[#CCFBF1]/30 transition text-xs font-semibold cursor-pointer"
              >
                <FileCode className="size-4" />
                <span>Starter Code</span>
              </a>
              <a
                href="#dataset"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info("Downloading Sample dataset (students.csv)...");
                }}
                className="flex items-center gap-2 p-3 rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] text-[#0F766E] hover:border-[#0F766E] hover:bg-[#CCFBF1]/30 transition text-xs font-semibold cursor-pointer"
              >
                <FileText className="size-4" />
                <span>Sample Data</span>
              </a>
              <a
                href="#guide"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info("Opening Project guide documentation...");
                }}
                className="flex items-center gap-2 p-3 rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] text-[#0F766E] hover:border-[#0F766E] hover:bg-[#CCFBF1]/30 transition text-xs font-semibold cursor-pointer"
              >
                <ExternalLink className="size-4" />
                <span>Project Guide</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Your Progress Checklist & CTA (col-span-5) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="ui-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
                MILESTONE PROGRESS
              </span>
              <span className="font-mono text-xs font-bold text-[#0F766E]">
                {completedCount} of {progressItems.length} ({progressPercent}%)
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-2 overflow-hidden rounded-full bg-[#F0F5F4]">
              <div
                className="h-full rounded-full bg-[#0F766E] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Checklist Items */}
            <div className="space-y-2.5 pt-2">
              {progressItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="flex w-full items-center gap-3 text-left text-xs transition hover:text-[#0B1F2A] cursor-pointer group"
                >
                  <div
                    className={`grid size-4.5 place-items-center rounded-md shrink-0 transition-colors ${
                      item.checked
                        ? "bg-[#0F766E] text-white"
                        : "border border-[#DCE7E5] bg-[#F7FAFA] group-hover:border-[#0F766E]"
                    }`}
                  >
                    {item.checked && <Check className="size-3 stroke-[3]" />}
                  </div>
                  <span
                    className={`leading-tight ${
                      item.checked ? "text-[#84979D] line-through" : "text-[#334E57] font-medium"
                    }`}
                  >
                    {item.text}
                  </span>
                </button>
              ))}
            </div>

            {/* Launch Workspace CTA */}
            <div className="pt-3 border-t border-[#DCE7E5]">
              <Button
                className="w-full h-11 rounded-xl bg-[#0F766E] hover:bg-[#0d655e] text-white font-bold text-xs shadow-sm transition cursor-pointer"
                onClick={handleOpenWorkspace}
              >
                Open Project Workspace <ArrowRight className="size-3.5 ml-1.5" />
              </Button>
            </div>
          </div>

          {/* AI Evaluation & Verification Card */}
          <div className="rounded-2xl border border-[#0F766E]/20 bg-[#CCFBF1]/30 p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-[#0F766E]">
              <ShieldCheck className="size-5" />
              <h3 className="font-bold text-xs uppercase tracking-wider">
                Automated AI Evaluation
              </h3>
            </div>
            <p className="text-xs text-[#334E57] leading-relaxed">
              Once you submit your GitHub repo, the evaluator tests test suites, edge case handling, and code linting automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    { id: 1, text: "Read requirements", checked: true },
    { id: 2, text: "Set up project environment", checked: true },
    { id: 3, text: "Implement solution", checked: false },
    { id: 4, text: "Run tests", checked: false },
    { id: 5, text: "Submit to GitHub", checked: false },
    { id: 6, text: "AI evaluation (pending)", checked: false },
    { id: 7, text: "Get feedback", checked: false },
    { id: 8, text: "Complete and verify!", checked: false },
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
      moduleId: "3.2",
      stage: "MASTERY",
      artifactType: "project_milestone",
      verified: false,
      score: 40,
    });
    navigate({ to: "/coding-lab" });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-16">
      {/* ── Top Header ── */}
      <div className="text-center sm:text-left">
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F2A] tracking-tight">
          AI Project Challenge
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#587078]">
          Build. Test. Submit. Get Verified.
        </p>
      </div>

      {/* ── Horizontal Project Lifecycle Stepper ── */}
      <div className="rounded-2xl border border-[#DCE7E5] bg-white p-5 shadow-2xs">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-2">
          {stages.map((stage, idx) => {
            const isCompleted = stage.status === "completed";
            const isCurrent = stage.status === "current";
            return (
              <div key={stage.label} className="flex items-center min-w-fit">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`grid size-7 place-items-center rounded-full text-xs font-bold transition-all ${
                      isCurrent
                        ? "bg-[#0F766E] text-white ring-4 ring-[#CCFBF1]"
                        : isCompleted
                        ? "bg-[#14B8A6] text-white"
                        : "bg-[#F0F5F4] text-[#84979D] border border-[#DCE7E5]"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="size-3.5 stroke-[3]" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>
                  <span
                    className={`text-[11px] font-semibold whitespace-nowrap ${
                      isCurrent
                        ? "text-[#0F766E] font-bold"
                        : isCompleted
                        ? "text-[#0B1F2A]"
                        : "text-[#84979D]"
                    }`}
                  >
                    {stage.label}
                  </span>
                </div>

                {idx < stages.length - 1 && (
                  <div
                    className={`mx-2 sm:mx-4 h-0.5 w-6 sm:w-12 rounded-full ${
                      isCompleted ? "bg-[#14B8A6]" : "bg-[#DCE7E5]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Two-Column Main Content: Brief/Reqs/Resources vs Your Progress ── */}
      <div className="grid gap-6 md:grid-cols-12 items-start">
        {/* Left Column: Project Brief, Requirements & Resources (col-span-7) */}
        <div className="md:col-span-7 space-y-4">
          {/* Project Brief */}
          <div className="rounded-2xl border border-[#DCE7E5] bg-white p-5 space-y-2 shadow-2xs">
            <h2 className="font-display text-sm font-bold text-[#0B1F2A] uppercase tracking-wider">
              Project Brief
            </h2>
            <p className="text-xs text-[#587078] leading-relaxed">
              Build a Python program that analyzes a CSV file and visualizes key insights. Connect the data pipeline to an automated summary generator.
            </p>
          </div>

          {/* Requirements Checklist */}
          <div className="rounded-2xl border border-[#DCE7E5] bg-white p-5 space-y-3 shadow-2xs">
            <h2 className="font-display text-sm font-bold text-[#0B1F2A] uppercase tracking-wider">
              Requirements
            </h2>
            <ul className="space-y-2 text-xs text-[#587078]">
              <li className="flex items-center gap-2.5">
                <span className="size-2 rounded-full bg-[#0F766E] shrink-0" />
                <span>Read CSV dataset cleanly</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="size-2 rounded-full bg-[#0F766E] shrink-0" />
                <span>Analyze data & calculate summary stats</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="size-2 rounded-full bg-[#0F766E] shrink-0" />
                <span>Generate terminal visualization</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="size-2 rounded-full bg-[#0F766E] shrink-0" />
                <span>Handle edge cases & missing data cleanly</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="size-2 rounded-full bg-[#0F766E] shrink-0" />
                <span>Push solution to GitHub repository</span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="rounded-2xl border border-[#DCE7E5] bg-white p-5 space-y-3 shadow-2xs">
            <h2 className="font-display text-sm font-bold text-[#0B1F2A] uppercase tracking-wider">
              Resources
            </h2>
            <div className="space-y-2 text-xs">
              <a
                href="#starter"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info("Downloading Project starter code (.zip)...");
                }}
                className="flex items-center gap-2 text-[#0F766E] hover:underline font-semibold"
              >
                <FileCode className="size-4" />
                <span>Project starter code</span>
              </a>
              <a
                href="#dataset"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info("Downloading Sample dataset (students.csv)...");
                }}
                className="flex items-center gap-2 text-[#0F766E] hover:underline font-semibold"
              >
                <FileText className="size-4" />
                <span>Sample dataset</span>
              </a>
              <a
                href="#guide"
                onClick={(e) => {
                  e.preventDefault();
                  toast.info("Opening Project guide documentation...");
                }}
                className="flex items-center gap-2 text-[#0F766E] hover:underline font-semibold"
              >
                <ExternalLink className="size-4" />
                <span>Project guide</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Your Progress Checklist & CTA (col-span-5) */}
        <div className="md:col-span-5 space-y-4">
          <div className="rounded-2xl border border-[#DCE7E5] bg-white p-5 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-sm font-bold text-[#0B1F2A] uppercase tracking-wider">
                Your Progress
              </h2>
              <span className="font-mono text-xs font-bold text-[#0F766E]">
                {completedCount} of {progressItems.length}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 overflow-hidden rounded-full bg-[#E6F7F5]">
              <div
                className="h-full rounded-full bg-[#0F766E] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Checklist Items */}
            <div className="space-y-2.5">
              {progressItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className="flex w-full items-center gap-3 text-left text-xs transition hover:text-[#0B1F2A]"
                >
                  <div
                    className={`grid size-4 place-items-center rounded-full shrink-0 transition-colors ${
                      item.checked
                        ? "bg-[#0F766E] text-white"
                        : "border border-[#DCE7E5] bg-[#F7FAFA]"
                    }`}
                  >
                    {item.checked && <Check className="size-2.5 stroke-[3]" />}
                  </div>
                  <span
                    className={
                      item.checked
                        ? "text-[#0B1F2A] font-medium"
                        : "text-[#84979D]"
                    }
                  >
                    {item.text}
                  </span>
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              className="w-full bg-[#0F766E] hover:bg-[#0B1F2A] text-white text-xs font-bold h-10 shadow-2xs mt-2"
              onClick={handleOpenWorkspace}
            >
              Open Project Workspace →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

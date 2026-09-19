import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronRight,
  Clock,
  Code2,
  Cpu,
  Database,
  FileCode2,
  GitBranch,
  Layers,
  Lock,
  Play,
  Search,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { curriculumModules } from "@/lib/curriculum-data";
import { getLearningProgressSummary, useLearningProgress } from "@/lib/learning-progress";

export function CurriculumView() {
  const navigate = useNavigate();
  const progress = useLearningProgress();
  const summary = getLearningProgressSummary(progress);
  const [tab, setTab] = useState<"path" | "all">("path");
  const [activePhase, setActivePhase] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const phases = [
    {
      id: 1,
      title: "Foundations",
      modulesCount: "4 modules",
      progress: "15%",
      status: "current",
      desc: "Python, types, functions & logic",
      startIndex: 0,
      endIndex: 5,
    },
    {
      id: 2,
      title: "Data & AI",
      modulesCount: "4 modules",
      progress: "0%",
      status: "locked",
      desc: "Data wrangling, NumPy & Pandas",
      startIndex: 6,
      endIndex: 11,
    },
    {
      id: 3,
      title: "Applied AI",
      modulesCount: "4 modules",
      progress: "0%",
      status: "locked",
      desc: "APIs, LLMs, embeddings & RAG",
      startIndex: 12,
      endIndex: 18,
    },
    {
      id: 4,
      title: "Build & Deploy",
      modulesCount: "4 modules",
      progress: "0%",
      status: "locked",
      desc: "Agents, workflows & production",
      startIndex: 19,
      endIndex: 25,
    },
    {
      id: 5,
      title: "Portfolio & Career",
      modulesCount: "4 modules",
      progress: "0%",
      status: "locked",
      desc: "Capstone, verification & interviews",
      startIndex: 26,
      endIndex: 29,
    },
  ];

  // Core 5 flagship modules for the clean reference list
  const showcaseModules = [
    {
      num: "01",
      code: "3.2" as const,
      title: "Python Foundations for AI",
      desc: "Variables, types, operators and problem solving",
      progress: 15,
      estimatedTime: "4 hours",
      status: "current" as const,
      icon: Code2,
    },
    {
      num: "02",
      code: "3.3" as const,
      title: "Control Flow and Logic",
      desc: "If statements, loops and logical thinking",
      progress: 0,
      estimatedTime: "4 hours",
      status: "locked" as const,
      prereq: "Complete Module 01",
      icon: Terminal,
    },
    {
      num: "03",
      code: "3.4" as const,
      title: "Data Structures",
      desc: "Lists, dictionaries, sets and tuples",
      progress: 0,
      estimatedTime: "5 hours",
      status: "locked" as const,
      prereq: "Complete Module 02",
      icon: Database,
    },
    {
      num: "04",
      code: "3.5" as const,
      title: "Functions and Modules",
      desc: "Reusable code and Python modules",
      progress: 0,
      estimatedTime: "4 hours",
      status: "locked" as const,
      prereq: "Complete Module 03",
      icon: Cpu,
    },
    {
      num: "05",
      code: "3.6" as const,
      title: "File Handling",
      desc: "Read, write and work with files",
      progress: 0,
      estimatedTime: "4 hours",
      status: "locked" as const,
      prereq: "Complete Module 04",
      icon: FileCode2,
    },
  ];

  const filteredShowcase = showcaseModules.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allModulesList = curriculumModules.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-16">
      {/* ── Page Header with Title & Mode Toggle ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F2A] tracking-tight">
            Your Learning Path
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#587078]">
            A structured journey from fundamentals to real-world AI impact.
          </p>
        </div>

        {/* Learning Path / All Modules toggle */}
        <div className="flex items-center rounded-xl bg-[#F0F5F4] p-1 border border-[#DCE7E5] self-start sm:self-auto">
          <button
            onClick={() => setTab("path")}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
              tab === "path"
                ? "bg-[#0F766E] text-white shadow-2xs"
                : "text-[#587078] hover:text-[#0B1F2A]"
            }`}
          >
            Learning Path
          </button>
          <button
            onClick={() => setTab("all")}
            className={`rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
              tab === "all"
                ? "bg-[#0F766E] text-white shadow-2xs"
                : "text-[#587078] hover:text-[#0B1F2A]"
            }`}
          >
            All Modules
          </button>
        </div>
      </div>

      {/* ── 5 Horizontal Phase Cards ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {phases.map((p, idx) => {
          const isSelected = activePhase === idx;
          const isCurrent = p.status === "current";
          return (
            <button
              key={p.id}
              onClick={() => setActivePhase(idx)}
              className={`flex flex-col justify-between rounded-xl p-3.5 text-left transition-all border ${
                isSelected
                  ? "bg-[#CCFBF1]/40 border-[#0F766E] shadow-2xs ring-1 ring-[#0F766E]/30"
                  : isCurrent
                  ? "bg-white border-[#14B8A6]/60 shadow-2xs"
                  : "bg-white/90 border-[#DCE7E5] hover:border-[#0F766E]/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-[#84979D]">
                    Phase {p.id}
                  </span>
                  {isCurrent && (
                    <span className="size-2 rounded-full bg-[#14B8A6] animate-pulse" />
                  )}
                </div>
                <p className="mt-1 text-xs font-bold text-[#0B1F2A]">{p.title}</p>
                <p className="text-[10px] text-[#84979D]">{p.modulesCount}</p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#DCE7E5]/60 flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#0F766E]">{p.progress}</span>
                <span className="text-[9px] text-[#84979D] uppercase tracking-wider">
                  {isCurrent ? "Active" : p.status}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Module Search Bar ── */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#84979D]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter modules by topic, keyword, or skill..."
          className="w-full rounded-xl border border-[#DCE7E5] bg-white pl-10 pr-4 py-2.5 text-xs text-[#0B1F2A] placeholder-[#84979D] outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]/30 transition"
        />
      </div>

      {/* ── Modules List ── */}
      {tab === "path" ? (
        <div className="space-y-3">
          {filteredShowcase.map((mod) => {
            const isCurrent = mod.status === "current";
            const Icon = mod.icon;
            return (
              <div
                key={mod.num}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border p-4 sm:p-5 transition-all bg-white ${
                  isCurrent
                    ? "border-[#0F766E]/40 shadow-xs ring-1 ring-[#0F766E]/15"
                    : "border-[#DCE7E5] hover:border-[#0F766E]/30"
                }`}
              >
                {/* Left: Icon & Title info */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={`grid size-11 shrink-0 place-items-center rounded-xl font-mono text-sm font-bold ${
                      isCurrent
                        ? "bg-[#CCFBF1] text-[#0F766E] border border-[#0F766E]/20"
                        : "bg-[#F0F5F4] text-[#587078] border border-[#DCE7E5]"
                    }`}
                  >
                    {mod.num}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#0B1F2A] truncate">{mod.title}</h3>
                    </div>
                    <p className="mt-0.5 text-xs text-[#587078] line-clamp-1">{mod.desc}</p>
                  </div>
                </div>

                {/* Right: Progress, Time, Status badge, CTA */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0 justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-[#0F766E]">
                      {mod.progress}%
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-[#84979D]">
                    <Clock className="size-3.5" />
                    <span>{mod.estimatedTime}</span>
                  </div>

                  {isCurrent ? (
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-[#0F766E] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        Current
                      </span>
                      <Button
                        size="sm"
                        className="bg-[#0F766E] hover:bg-[#0B1F2A] text-white text-xs font-semibold px-3 h-8 shadow-2xs"
                        onClick={() =>
                          navigate({
                            to: "/learning-mode",
                            search: { module: mod.code },
                          })
                        }
                      >
                        Continue →
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Lock className="size-3.5 text-[#84979D]" />
                      <span className="text-[11px] text-[#84979D] font-medium">
                        {mod.prereq}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#DCE7E5] text-[#587078] hover:bg-[#F0F5F4] text-xs font-semibold px-3 h-8"
                        onClick={() =>
                          navigate({
                            to: "/learning-mode",
                            search: { module: mod.code },
                          })
                        }
                      >
                        Preview
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* All 30 curriculum modules catalog */
        <div className="grid gap-3 sm:grid-cols-2">
          {allModulesList.map((m, idx) => {
            const isCompleted = progress.completedModuleIds.includes(m.code);
            const isCurrent = m.code === "3.2";
            return (
              <div
                key={m.code}
                className="flex flex-col justify-between rounded-xl border border-[#DCE7E5] bg-white p-4 hover:border-[#0F766E]/40 transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded border border-[#0F766E]/20">
                      Module {m.code}
                    </span>
                    <span className="text-[10px] text-[#84979D] font-medium">
                      {m.estimatedTime}
                    </span>
                  </div>
                  <h4 className="mt-2 text-xs font-bold text-[#0B1F2A] line-clamp-1">{m.title}</h4>
                  <p className="mt-1 text-[11px] text-[#587078] line-clamp-2">{m.description}</p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-[#DCE7E5]/60 flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-[#84979D]">
                    {m.experienceStage}
                  </span>
                  <button
                    onClick={() =>
                      navigate({
                        to: "/learning-mode",
                        search: { module: m.code },
                      })
                    }
                    className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1"
                  >
                    {isCurrent ? "Continue →" : isCompleted ? "Review →" : "Inspect →"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

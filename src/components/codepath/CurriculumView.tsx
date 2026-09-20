import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Code2,
  Filter,
  GraduationCap,
  Layers,
  Lock,
  Play,
  Search,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { curriculumModules, type CurriculumModule } from "@/lib/curriculum-data";
import { getLearningProgressSummary, useLearningProgress } from "@/lib/learning-progress";

export function CurriculumView() {
  const navigate = useNavigate();
  const progress = useLearningProgress();
  const summary = getLearningProgressSummary(progress);
  const [selectedPhase, setSelectedPhase] = useState<number | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"path" | "grid">("path");

  const phases = [
    {
      id: 1,
      title: "Foundations & Python",
      modulesRange: "Modules 01–04",
      desc: "Python programming, GenAI basics, APIs & Prompting",
      startIndex: 0,
      endIndex: 3,
    },
    {
      id: 2,
      title: "LLMs, Embeddings & RAG",
      modulesRange: "Modules 05–08",
      desc: "App development, Vector DBs, RAG & Advanced RAG",
      startIndex: 4,
      endIndex: 7,
    },
    {
      id: 3,
      title: "LangChain & AI Agents",
      modulesRange: "Modules 09–12",
      desc: "LangChain, Agent frameworks, Tools & LangGraph",
      startIndex: 8,
      endIndex: 11,
    },
    {
      id: 4,
      title: "Multi-Agent & Domains",
      modulesRange: "Modules 13–16",
      desc: "Multi-Agent systems, Cyber, Robotics & Trends",
      startIndex: 12,
      endIndex: 15,
    },
    {
      id: 5,
      title: "Production & Careers",
      modulesRange: "Modules 17–20",
      desc: "Production systems, Capstone portfolio, Job prep",
      startIndex: 16,
      endIndex: 19,
    },
  ];

  // Helper to determine status and prerequisite string for each module
  const getModuleStatus = (module: CurriculumModule, index: number) => {
    const isCompleted = progress.completedModuleIds.includes(module.code);
    if (isCompleted) {
      return { status: "mastered" as const, label: "Mastered", isLocked: false };
    }
    // Module 01 (index 0 / code 3.2) is the current active entry module
    if (index === 0) {
      return { status: "current" as const, label: "In Progress", isLocked: false };
    }
    // Previous module check
    const prevModule = curriculumModules[index - 1];
    const prevCompleted = prevModule ? progress.completedModuleIds.includes(prevModule.code) : false;
    if (prevCompleted) {
      return { status: "available" as const, label: "Unlocked", isLocked: false };
    }
    return { status: "locked" as const, label: "Locked", isLocked: true };
  };

  // Filter modules based on search and selected phase
  const filteredModules = curriculumModules
    .map((module, index) => {
      const moduleNum = String(index + 1).padStart(2, "0");
      const { status, label, isLocked } = getModuleStatus(module, index);
      const phaseInfo = phases.find(
        (p) => index >= p.startIndex && index <= p.endIndex
      ) ?? phases[0]!;
      return {
        ...module,
        moduleNum,
        index,
        status,
        statusLabel: label,
        isLocked,
        phase: phaseInfo,
      };
    })
    .filter((m) => {
      const matchesPhase =
        selectedPhase === "all" ||
        (m.index >= phases[selectedPhase - 1]!.startIndex &&
          m.index <= phases[selectedPhase - 1]!.endIndex);

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.moduleNum.includes(q) ||
        m.topics.some((t) => t.toLowerCase().includes(q)) ||
        m.tools.some((tool) => tool.toLowerCase().includes(q));

      return matchesPhase && matchesSearch;
    });

  return (
    <div className="page-container page-sections">
      {/* ── Page Header (Aligned to Global Grid) ── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
            ACADEMIC PATHWAY
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F2A] tracking-tight">
            Curriculum Roadmap
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#587078] max-w-3xl">
            20 rigorous modules spanning Python foundations, vector embeddings, advanced RAG architectures, multi-agent frameworks, and university capstones.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center rounded-xl bg-[#F0F5F4] p-1 border border-[#DCE7E5] self-start sm:self-auto shrink-0">
          <button
            onClick={() => setViewMode("path")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "path"
                ? "bg-[#0F766E] text-white shadow-2xs"
                : "text-[#587078] hover:text-[#0B1F2A]"
            }`}
          >
            Roadmap View
          </button>
          <button
            onClick={() => setViewMode("grid")}
            className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              viewMode === "grid"
                ? "bg-[#0F766E] text-white shadow-2xs"
                : "text-[#587078] hover:text-[#0B1F2A]"
            }`}
          >
            Catalog Grid
          </button>
        </div>
      </div>

      {/* ── 5 Curriculum Phases Navigator (Clean Uniform Cards) ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <button
          onClick={() => setSelectedPhase("all")}
          className={`flex flex-col justify-between rounded-xl p-3.5 text-left transition-all border cursor-pointer ${
            selectedPhase === "all"
              ? "bg-[#0F766E] text-white border-[#0F766E] shadow-sm"
              : "bg-white text-[#0B1F2A] border-[#DCE7E5] hover:border-[#0F766E]/40"
          }`}
        >
          <div>
            <span className={`font-mono text-[10px] font-bold ${selectedPhase === "all" ? "text-[#CCFBF1]" : "text-[#84979D]"}`}>
              ALL PHASES
            </span>
            <p className="mt-1 text-xs font-bold truncate">All 20 Modules</p>
          </div>
          <span className={`mt-2 text-[10px] font-medium ${selectedPhase === "all" ? "text-[#CCFBF1]" : "text-[#587078]"}`}>
            Full Pathway
          </span>
        </button>

        {phases.map((p) => {
          const isSelected = selectedPhase === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPhase(p.id)}
              className={`flex flex-col justify-between rounded-xl p-3.5 text-left transition-all border cursor-pointer ${
                isSelected
                  ? "bg-[#CCFBF1]/50 border-[#0F766E] shadow-2xs ring-1 ring-[#0F766E]/30"
                  : "bg-white border-[#DCE7E5] hover:border-[#0F766E]/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-[#84979D]">
                    Phase 0{p.id}
                  </span>
                  {p.id === 1 && (
                    <span className="size-2 rounded-full bg-[#14B8A6] animate-pulse" />
                  )}
                </div>
                <p className="mt-1 text-xs font-bold text-[#0B1F2A] truncate">{p.title}</p>
              </div>
              <span className="mt-2 text-[10px] font-medium text-[#84979D]">
                {p.modulesRange}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Search Bar & Filter Summary ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#84979D]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search modules by title, skill, or tool (e.g. LangGraph, RAG, PyTorch, Embeddings)..."
            className="w-full rounded-xl border border-[#DCE7E5] bg-white pl-10 pr-4 py-2.5 text-xs text-[#0B1F2A] placeholder-[#84979D] outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]/30 transition shadow-2xs"
          />
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-2 px-1 text-xs text-[#587078] shrink-0 font-medium">
          <span>Showing <strong>{filteredModules.length}</strong> of 20 modules</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-[#0F766E] underline hover:text-[#0B1F2A] ml-2 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* ── Modules List: STRICT UNIFORM GEOMETRY ACROSS ALL 20 MODULES ── */}
      {viewMode === "path" ? (
        <div className="space-y-3.5">
          {filteredModules.map((mod) => {
            const isCurrent = mod.status === "current";
            const isMastered = mod.status === "mastered";
            const isLocked = mod.isLocked;

            return (
              <div
                key={mod.code}
                className={`flex flex-col lg:flex-row lg:items-center justify-between gap-5 rounded-2xl border p-5 transition-all bg-white ${
                  isCurrent
                    ? "border-[#0F766E] shadow-sm ring-1 ring-[#0F766E]/20"
                    : isMastered
                    ? "border-[#16A34A]/50 bg-white"
                    : "border-[#DCE7E5] hover:border-[#0F766E]/40"
                }`}
              >
                {/* Left: Fixed-dimension Module Number & Content */}
                <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
                  <div
                    className={`grid size-12 shrink-0 place-items-center rounded-xl font-mono text-sm font-bold shadow-2xs ${
                      isCurrent
                        ? "bg-[#0F766E] text-white"
                        : isMastered
                        ? "bg-[#16A34A] text-white"
                        : "bg-[#F0F5F4] text-[#587078] border border-[#DCE7E5]"
                    }`}
                  >
                    {mod.moduleNum}
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded border border-[#0F766E]/20">
                        Module {mod.moduleNum}
                      </span>
                      <span className="text-[10px] text-[#84979D] font-medium">
                        Phase 0{mod.phase.id}: {mod.phase.title}
                      </span>
                      <span className="text-[10px] font-semibold text-[#587078] bg-[#F0F5F4] px-2 py-0.5 rounded">
                        {mod.difficulty}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#0B1F2A]">
                      {mod.moduleNum} — {mod.title}
                    </h3>
                    <p className="text-xs text-[#587078] line-clamp-2 leading-relaxed">
                      {mod.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {mod.topics.slice(0, 4).map((topic) => (
                        <span
                          key={topic}
                          className="rounded-md border border-[#DCE7E5] bg-[#F0F5F4] px-2 py-0.5 text-[10px] font-medium text-[#0B1F2A]"
                        >
                          {topic}
                        </span>
                      ))}
                      {mod.topics.length > 4 && (
                        <span className="text-[10px] text-[#84979D] self-center">
                          +{mod.topics.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Fixed-width Metadata, Lock Status & Standard 40px CTA */}
                <div className="flex flex-wrap items-center gap-4 shrink-0 justify-between lg:justify-end pt-3 lg:pt-0 border-t lg:border-t-0 border-[#DCE7E5]/70 lg:w-72">
                  <div className="flex items-center gap-1.5 text-xs text-[#84979D]">
                    <Clock className="size-3.5" />
                    <span>{mod.estimatedTime}</span>
                  </div>

                  {isCurrent ? (
                    <div className="flex items-center gap-2.5">
                      <span className="rounded-full bg-[#0F766E] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-2xs">
                        Active
                      </span>
                      <Button
                        size="sm"
                        className="bg-[#0F766E] hover:bg-[#0d655e] text-white text-xs font-semibold px-4 h-10 rounded-xl shadow-sm transition cursor-pointer"
                        onClick={() =>
                          navigate({
                            to: "/learning-mode",
                            search: { module: mod.code },
                          })
                        }
                      >
                        Continue <ArrowRight className="size-3.5 ml-1" />
                      </Button>
                    </div>
                  ) : isMastered ? (
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-[10px] font-bold">
                        <CheckCircle2 className="size-3 text-emerald-600" /> Mastered
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#DCE7E5] text-[#0B1F2A] hover:bg-[#F0F5F4] text-xs font-semibold px-3 h-10 rounded-xl cursor-pointer"
                        onClick={() =>
                          navigate({
                            to: "/learning-mode",
                            search: { module: mod.code },
                          })
                        }
                      >
                        Review Studio
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center gap-1 text-[11px] text-[#84979D] font-medium bg-[#F0F5F4] px-2.5 py-1 rounded-lg border border-[#DCE7E5]">
                        <Lock className="size-3 text-[#84979D]" />
                        <span className="truncate max-w-[90px]">
                          {mod.prerequisites && mod.prerequisites.length > 0
                            ? mod.prerequisites[0]
                            : `Mod ${String(mod.index).padStart(2, "0")}`}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#DCE7E5] text-[#587078] hover:bg-[#F0F5F4] hover:text-[#0B1F2A] text-xs font-semibold px-3 h-10 rounded-xl cursor-pointer"
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
        /* ── Grid Catalog View ── */
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredModules.map((mod) => {
            const isCurrent = mod.status === "current";
            const isMastered = mod.status === "mastered";
            return (
              <div
                key={mod.code}
                className={`flex flex-col justify-between rounded-2xl border p-5 transition bg-white ${
                  isCurrent
                    ? "border-[#0F766E] shadow-sm ring-1 ring-[#0F766E]/20"
                    : "border-[#DCE7E5] hover:border-[#0F766E]/40"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded border border-[#0F766E]/20">
                      Module {mod.moduleNum}
                    </span>
                    <span className="text-[10px] text-[#84979D] font-medium">
                      {mod.estimatedTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0B1F2A] leading-snug">
                    {mod.moduleNum} — {mod.title}
                  </h3>
                  <p className="text-xs text-[#587078] line-clamp-3 leading-relaxed">
                    {mod.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {mod.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="rounded border border-[#DCE7E5] bg-[#F0F5F4] px-1.5 py-0.5 text-[9px] font-medium text-[#0B1F2A]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#DCE7E5]/70 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-[#84979D]">
                    {mod.isLocked ? (
                      <>
                        <Lock className="size-3" />
                        <span className="truncate max-w-[120px]">
                          {mod.prerequisites[0] || "Locked"}
                        </span>
                      </>
                    ) : (
                      <span className="text-[#0F766E] font-semibold">Active</span>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      navigate({
                        to: "/learning-mode",
                        search: { module: mod.code },
                      })
                    }
                    className="text-xs font-semibold text-[#0F766E] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {isCurrent ? "Continue →" : isMastered ? "Review →" : "Preview →"}
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

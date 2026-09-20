import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  BarChart3,
  Bot,
  Brain,
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  Flame,
  FolderKanban,
  Lock,
  Play,
  Sparkles,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLearningProgress } from "@/lib/learning-progress";

export function SkillsView() {
  const navigate = useNavigate();
  const progress = useLearningProgress();

  const skillCategories = [
    {
      id: "python",
      title: "Python Foundations",
      icon: Code2,
      count: "3 / 15",
      progress: 20,
    },
    {
      id: "data-analysis",
      title: "Data Analysis",
      icon: BarChart2,
      count: "0 / 15",
      progress: 0,
    },
    {
      id: "machine-learning",
      title: "Machine Learning",
      icon: Brain,
      count: "0 / 15",
      progress: 0,
    },
    {
      id: "ai-applications",
      title: "Applied AI & LLMs",
      icon: Cpu,
      count: "0 / 15",
      progress: 0,
    },
  ];

  const currentSkills = [
    { name: "Variables & Types", status: "Active", level: "Beginner", icon: Code2, locked: false },
    { name: "Data Structures", status: "Active", level: "Beginner", icon: Terminal, locked: false },
    { name: "Defensive Control Flow", status: "Active", level: "Beginner", icon: Code2, locked: false },
  ];

  const upcomingSkills = [
    { name: "Functions & Closures", status: "Locked", level: "Intermediate", icon: Lock, locked: true },
    { name: "CSV Data Parsing", status: "Locked", level: "Intermediate", icon: Lock, locked: true },
    { name: "Vector Embeddings", status: "Locked", level: "Advanced", icon: Lock, locked: true },
    { name: "RAG Retrieval", status: "Locked", level: "Advanced", icon: Lock, locked: true },
    { name: "LangGraph Multi-Agent", status: "Locked", level: "Master", icon: Lock, locked: true },
  ];

  return (
    <div className="page-container page-sections">
      {/* ── Top Header (Aligned to Global Grid) ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#DCE7E5] pb-4">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
            COMPETENCY FRAMEWORK
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F2A] tracking-tight">
            Skill Progression & Mastery Matrix
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-[#587078]">
            Evidence-based tracking across 80 industrial AI competencies.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="border-[#DCE7E5] text-[#0F766E] hover:bg-[#CCFBF1]/40 text-xs font-semibold self-start sm:self-auto h-10 px-4 rounded-xl cursor-pointer"
          onClick={() => navigate({ to: "/career" })}
        >
          View Career Path <ArrowRight className="size-3.5 ml-1.5" />
        </Button>
      </div>

      {/* ── Circular Progress & Skill Categories Row ── */}
      <div className="grid gap-6 lg:grid-cols-12 items-stretch">
        {/* Overall Skill Progress Circular Gauge (col-span-4) */}
        <div className="lg:col-span-4 ui-card p-6 flex flex-col items-center justify-center text-center space-y-3">
          <div className="relative size-36">
            <svg className="size-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#E6F7F5]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#0F766E] transition-all duration-1000"
                strokeDasharray="15, 100"
                strokeLinecap="round"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-3xl font-extrabold text-[#0B1F2A]">15%</span>
              <span className="text-[10px] font-mono text-[#84979D] uppercase">Overall</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-[#0B1F2A]">Curriculum Skill Progress</h3>
            <p className="mt-0.5 text-xs text-[#84979D]">12 of 80 industrial skills unlocked</p>
          </div>
        </div>

        {/* Skill Categories (col-span-8) */}
        <div className="lg:col-span-8 ui-card p-6 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#587078]">
              CORE CATEGORIES
            </span>
            <span className="text-xs text-[#84979D]">4 Domains</span>
          </div>

          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] p-4 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <div className="grid size-8 place-items-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
                      <Icon className="size-4" />
                    </div>
                    <span className="font-mono text-[11px] font-bold text-[#0F766E]">
                      {cat.count}
                    </span>
                  </div>

                  <div className="mt-3">
                    <h4 className="text-xs font-bold text-[#0B1F2A] truncate">{cat.title}</h4>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E6F7F5]">
                      <div
                        className="h-full rounded-full bg-[#0F766E]"
                        style={{ width: `${cat.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Skills Breakdown: Current Active vs Upcoming ── */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Current Active Skills (col-span-5) */}
        <div className="lg:col-span-5 ui-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
              CURRENT ACTIVE SKILLS
            </span>
            <span className="text-xs font-mono text-[#0F766E] font-bold">Module 01</span>
          </div>

          <div className="space-y-2.5">
            {currentSkills.map((sk) => {
              const Icon = sk.icon;
              return (
                <div
                  key={sk.name}
                  className="flex items-center justify-between rounded-xl border border-[#0F766E]/20 bg-[#CCFBF1]/20 p-3.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-8 place-items-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0B1F2A]">{sk.name}</h4>
                      <p className="text-[11px] text-[#587078]">{sk.level}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#0F766E] bg-white px-2 py-0.5 rounded border border-[#0F766E]/20">
                    Active
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Locked Skills (col-span-7) */}
        <div className="lg:col-span-7 ui-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#84979D]">
              NEXT SKILLS IN PIPELINE
            </span>
            <span className="text-xs text-[#84979D]">Phases 02–05</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-2.5">
            {upcomingSkills.map((sk) => (
              <div
                key={sk.name}
                className="flex items-center gap-3 rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] p-3 opacity-80"
              >
                <div className="grid size-7 place-items-center rounded-lg bg-[#F0F5F4] text-[#84979D]">
                  <Lock className="size-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-[#0B1F2A] truncate">{sk.name}</h4>
                  <p className="text-[10px] text-[#84979D]">{sk.level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Recommended Next Actions ── */}
      <div className="space-y-3">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#587078] block">
          RECOMMENDED NEXT ACTIONS
        </span>

        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={() =>
              navigate({
                to: "/learning-mode",
                search: { module: "3.2" },
              })
            }
            className="flex items-center gap-3.5 rounded-xl border border-[#DCE7E5] bg-white p-4 text-left shadow-2xs hover:border-[#0F766E]/50 transition group cursor-pointer"
          >
            <div className="grid size-10 place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E] group-hover:scale-105 transition-transform">
              <Play className="size-4.5 fill-current" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0B1F2A]">Continue Module 01</p>
              <p className="text-[11px] text-[#84979D]">Complete current step</p>
            </div>
          </button>

          <button
            onClick={() => navigate({ to: "/coding-lab" })}
            className="flex items-center gap-3.5 rounded-xl border border-[#DCE7E5] bg-white p-4 text-left shadow-2xs hover:border-[#0F766E]/50 transition group cursor-pointer"
          >
            <div className="grid size-10 place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E] group-hover:scale-105 transition-transform">
              <Terminal className="size-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0B1F2A]">Practice Coding</p>
              <p className="text-[11px] text-[#84979D]">Hands-on Python lab</p>
            </div>
          </button>

          <button
            onClick={() => navigate({ to: "/build" })}
            className="flex items-center gap-3.5 rounded-xl border border-[#DCE7E5] bg-white p-4 text-left shadow-2xs hover:border-[#0F766E]/50 transition group cursor-pointer"
          >
            <div className="grid size-10 place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E] group-hover:scale-105 transition-transform">
              <FolderKanban className="size-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0B1F2A]">Build a Project</p>
              <p className="text-[11px] text-[#84979D]">Data CLI capstone</p>
            </div>
          </button>

          <button
            onClick={() => navigate({ to: "/curriculum" })}
            className="flex items-center gap-3.5 rounded-xl border border-[#DCE7E5] bg-white p-4 text-left shadow-2xs hover:border-[#0F766E]/50 transition group cursor-pointer"
          >
            <div className="grid size-10 place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E] group-hover:scale-105 transition-transform">
              <Sparkles className="size-4.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0B1F2A]">Curriculum Roadmap</p>
              <p className="text-[11px] text-[#84979D]">20-module catalog</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

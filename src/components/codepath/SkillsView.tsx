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
      title: "Python",
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
      title: "AI Applications",
      icon: Cpu,
      count: "0 / 15",
      progress: 0,
    },
  ];

  const recentSkills = [
    { name: "Variables", status: "Active", level: "Beginner", icon: Code2, locked: false },
    { name: "Data Types", status: "Active", level: "Beginner", icon: Terminal, locked: false },
    { name: "Control Flow", status: "Locked", level: "Locked", icon: Lock, locked: true },
    { name: "Functions", status: "Locked", level: "Locked", icon: Lock, locked: true },
    { name: "Data Handling", status: "Locked", level: "Locked", icon: Lock, locked: true },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-16">
      {/* ── Top Header ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#DCE7E5] pb-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F2A] tracking-tight">
            Your Skills
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-[#587078]">
            Track your progress, build expertise, and unlock opportunities.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="border-[#DCE7E5] text-[#0F766E] hover:bg-[#CCFBF1]/40 text-xs font-semibold self-start sm:self-auto h-8"
          onClick={() => navigate({ to: "/career" })}
        >
          View Career Path →
        </Button>
      </div>

      {/* ── Circular Progress & Skill Categories Row ── */}
      <div className="grid gap-4 lg:grid-cols-12 items-stretch">
        {/* Overall Skill Progress Circular Gauge (col-span-4) */}
        <div className="lg:col-span-4 rounded-2xl border border-[#DCE7E5] bg-white p-6 shadow-2xs flex flex-col items-center justify-center text-center">
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
              <span className="font-display text-2xl font-extrabold text-[#0B1F2A]">15%</span>
            </div>
          </div>

          <h3 className="mt-3 text-sm font-bold text-[#0B1F2A]">Overall Skill Progress</h3>
          <p className="mt-0.5 text-xs text-[#84979D]">12 of 80 skills completed</p>
        </div>

        {/* Skill Categories (col-span-8) */}
        <div className="lg:col-span-8 rounded-2xl border border-[#DCE7E5] bg-white p-6 shadow-2xs space-y-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#84979D]">
            Skill Categories
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] p-3.5 flex flex-col justify-between"
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
                    <h4 className="text-xs font-bold text-[#0B1F2A]">{cat.title}</h4>
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

      {/* ── Recent Skills Row ── */}
      <div className="rounded-2xl border border-[#DCE7E5] bg-white p-6 shadow-2xs space-y-3">
        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#84979D]">
          Recent Skills
        </p>

        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {recentSkills.map((sk) => {
            const Icon = sk.icon;
            return (
              <div
                key={sk.name}
                className={`rounded-xl border p-3.5 transition-all ${
                  sk.locked
                    ? "border-[#DCE7E5] bg-[#F7FAFA] opacity-60"
                    : "border-[#0F766E]/30 bg-white shadow-2xs"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`grid size-7 place-items-center rounded-lg text-xs ${
                      sk.locked
                        ? "bg-[#F0F5F4] text-[#84979D]"
                        : "bg-[#CCFBF1] text-[#0F766E]"
                    }`}
                  >
                    <Icon className="size-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B1F2A]">{sk.name}</h4>
                    <p className="text-[10px] text-[#84979D]">{sk.level}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Recommended Next Steps ── */}
      <div className="space-y-3">
        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#84979D]">
          Recommended Next Steps
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={() =>
              navigate({
                to: "/learning-mode",
                search: { module: "3.2" },
              })
            }
            className="flex items-center gap-3 rounded-xl border border-[#DCE7E5] bg-white p-4 text-left shadow-2xs hover:border-[#0F766E]/40 transition group"
          >
            <div className="grid size-9 place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E] group-hover:scale-105 transition-transform">
              <Play className="size-4 fill-current" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0B1F2A]">Continue Module 01</p>
              <p className="text-[10px] text-[#84979D]">Complete current module</p>
            </div>
          </button>

          <button
            onClick={() => navigate({ to: "/coding-lab" })}
            className="flex items-center gap-3 rounded-xl border border-[#DCE7E5] bg-white p-4 text-left shadow-2xs hover:border-[#0F766E]/40 transition group"
          >
            <div className="grid size-9 place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E] group-hover:scale-105 transition-transform">
              <Terminal className="size-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0B1F2A]">Practice Coding</p>
              <p className="text-[10px] text-[#84979D]">Sharpen your skills</p>
            </div>
          </button>

          <button
            onClick={() => navigate({ to: "/build" })}
            className="flex items-center gap-3 rounded-xl border border-[#DCE7E5] bg-white p-4 text-left shadow-2xs hover:border-[#0F766E]/40 transition group"
          >
            <div className="grid size-9 place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E] group-hover:scale-105 transition-transform">
              <FolderKanban className="size-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0B1F2A]">Build a Project</p>
              <p className="text-[10px] text-[#84979D]">Apply what you learn</p>
            </div>
          </button>

          <button
            onClick={() => navigate({ to: "/curriculum" })}
            className="flex items-center gap-3 rounded-xl border border-[#DCE7E5] bg-white p-4 text-left shadow-2xs hover:border-[#0F766E]/40 transition group"
          >
            <div className="grid size-9 place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E] group-hover:scale-105 transition-transform">
              <Sparkles className="size-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0B1F2A]">Explore AI Track</p>
              <p className="text-[10px] text-[#84979D]">See what's next</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

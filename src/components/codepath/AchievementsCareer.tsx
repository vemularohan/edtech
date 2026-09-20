import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  Bot,
  Check,
  ChevronRight,
  Code2,
  Cpu,
  Flame,
  FolderKanban,
  GraduationCap,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AchievementsCareer() {
  const navigate = useNavigate();

  const achievements = [
    {
      id: 1,
      title: "Quick Learner",
      desc: "Completed first module",
      icon: Sparkles,
      color: "text-[#D97706] bg-[#FEF3C7]",
    },
    {
      id: 2,
      title: "7 Day Streak",
      desc: "Logged in 7 consecutive days",
      icon: Flame,
      color: "text-[#D97706] bg-[#FEF3C7]",
    },
    {
      id: 3,
      title: "Practice Pro",
      desc: "Completed 10 challenges",
      icon: Code2,
      color: "text-[#0F766E] bg-[#CCFBF1]",
    },
    {
      id: 4,
      title: "Project Builder",
      desc: "Submitted first project",
      icon: FolderKanban,
      color: "text-[#0F766E] bg-[#CCFBF1]",
    },
  ];

  const careerStages = [
    { id: 1, label: "Learn Foundations", sub: "Python, Data, ML", status: "completed" },
    { id: 2, label: "Build Projects", sub: "Real-world applications", status: "current" },
    { id: 3, label: "Get Verified", sub: "Earn certificates", status: "pending" },
    { id: 4, label: "Career Ready", sub: "Apply for opportunities", status: "pending" },
  ];

  return (
    <div className="page-container page-sections">
      {/* ── Top Header (Aligned to Global Grid) ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-[#DCE7E5] pb-4">
        <div>
          <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
            ACADEMIC PROGRESSION
          </p>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F2A] tracking-tight">
            Achievement Journey & Career Roadmap
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-[#587078]">
            Evidence-backed milestones, verified certificates, and career readiness.
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          className="border-[#DCE7E5] text-[#0F766E] hover:bg-[#CCFBF1]/40 text-xs font-semibold self-start sm:self-auto h-10 px-4 rounded-xl cursor-pointer"
          onClick={() => toast.info("Viewing all academic credentials...")}
        >
          View All Credentials <ArrowRight className="size-3.5 ml-1.5" />
        </Button>
      </div>

      {/* ── Stats Bar (5 compact metrics) ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-2xl border border-[#DCE7E5] bg-white p-4 shadow-2xs flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E]">
            <Sparkles className="size-5" />
          </div>
          <div>
            <p className="font-display text-lg font-bold text-[#0B1F2A]">1,280</p>
            <p className="text-[10px] text-[#84979D]">Total XP</p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#DCE7E5] bg-white p-4 shadow-2xs flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-[#FEF3C7] text-[#D97706]">
            <Flame className="size-5" />
          </div>
          <div>
            <p className="font-display text-lg font-bold text-[#0B1F2A]">6</p>
            <p className="text-[10px] text-[#84979D]">Day Streak</p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#DCE7E5] bg-white p-4 shadow-2xs flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E]">
            <Trophy className="size-5" />
          </div>
          <div>
            <p className="font-display text-lg font-bold text-[#0B1F2A]">3</p>
            <p className="text-[10px] text-[#84979D]">Modules Completed</p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#DCE7E5] bg-white p-4 shadow-2xs flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-[#E0F2FE] text-[#0284C7]">
            <Code2 className="size-5" />
          </div>
          <div>
            <p className="font-display text-lg font-bold text-[#0B1F2A]">12</p>
            <p className="text-[10px] text-[#84979D]">Skills Learned</p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#DCE7E5] bg-white p-4 shadow-2xs flex items-center gap-3 col-span-2 sm:col-span-1">
          <div className="grid size-10 place-items-center rounded-xl bg-[#F3E8FF] text-[#9333EA]">
            <FolderKanban className="size-5" />
          </div>
          <div>
            <p className="font-display text-lg font-bold text-[#0B1F2A]">2</p>
            <p className="text-[10px] text-[#84979D]">Projects Built</p>
          </div>
        </div>
      </div>

      {/* ── Recent Achievements ── */}
      <div className="rounded-2xl border border-[#DCE7E5] bg-white p-6 shadow-2xs space-y-4">
        <h2 className="font-display text-xs font-bold text-[#0B1F2A] uppercase tracking-wider">
          Recent Achievements
        </h2>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((ach) => {
            const Icon = ach.icon;
            return (
              <div
                key={ach.id}
                className="flex items-center gap-3 rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] p-3.5"
              >
                <div className={`grid size-9 place-items-center rounded-xl shrink-0 ${ach.color}`}>
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-[#0B1F2A] truncate">{ach.title}</h3>
                  <p className="text-[10px] text-[#84979D] truncate">{ach.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Your Career Path ── */}
      <div className="rounded-2xl border border-[#DCE7E5] bg-white p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#84979D]">
              Your Career Path
            </p>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="grid size-6 place-items-center rounded-md bg-[#CCFBF1] text-[#0F766E]">
                <Cpu className="size-3.5" />
              </div>
              <h3 className="font-display text-base font-bold text-[#0B1F2A]">AI Engineer</h3>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="border-[#DCE7E5] text-[#0F766E] hover:bg-[#CCFBF1]/40 text-xs font-semibold self-start sm:self-auto h-8"
            onClick={() => toast.info("Opening Career Opportunities Portal...")}
          >
            Explore Career Opportunities →
          </Button>
        </div>

        {/* Stepper */}
        <div className="pt-3">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-2">
            {careerStages.map((st, idx) => {
              const isCompleted = st.status === "completed";
              const isCurrent = st.status === "current";
              return (
                <div key={st.id} className="flex items-center min-w-fit">
                  <div className="flex flex-col items-center gap-1.5 text-center">
                    <div
                      className={`grid size-7 place-items-center rounded-full text-xs font-bold transition-all ${
                        isCurrent
                          ? "bg-[#0F766E] text-white ring-4 ring-[#CCFBF1]"
                          : isCompleted
                          ? "bg-[#14B8A6] text-white"
                          : "bg-[#F0F5F4] text-[#84979D] border border-[#DCE7E5]"
                      }`}
                    >
                      {isCompleted ? <Check className="size-3.5 stroke-[3]" /> : <span>{st.id}</span>}
                    </div>
                    <div>
                      <p
                        className={`text-[11px] font-semibold whitespace-nowrap ${
                          isCurrent ? "text-[#0F766E] font-bold" : "text-[#0B1F2A]"
                        }`}
                      >
                        {st.label}
                      </p>
                      <p className="text-[9px] text-[#84979D] whitespace-nowrap">{st.sub}</p>
                    </div>
                  </div>

                  {idx < careerStages.length - 1 && (
                    <div
                      className={`mx-3 sm:mx-6 h-0.5 w-8 sm:w-16 rounded-full self-start mt-3.5 ${
                        isCompleted ? "bg-[#14B8A6]" : "bg-[#DCE7E5]"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

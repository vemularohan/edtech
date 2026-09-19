import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  Edit3,
  ExternalLink,
  Flame,
  FolderKanban,
  GraduationCap,
  Sparkles,
  Target,
  Trophy,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLearningEvidence, useLearningProgress } from "@/lib/learning-progress";

export function ProfileView() {
  const navigate = useNavigate();
  const evidence = useLearningEvidence();
  const progress = useLearningProgress();
  const [activeTab, setActiveTab] = useState<
    "overview" | "projects" | "skills" | "achievements" | "journey"
  >("overview");

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-16">
      {/* ── Student Header Card ── */}
      <div className="rounded-2xl border border-[#DCE7E5] bg-white p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Student Avatar */}
            <div className="grid size-16 place-items-center rounded-2xl bg-[#0F766E] text-white font-bold text-xl shadow-2xs">
              AK
            </div>
            <div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-[#0B1F2A]">
                Aarav Kulkarni
              </h1>
              <p className="text-xs text-[#587078] mt-0.5">
                B.Tech CSE + AI Track
              </p>
              <p className="text-xs font-semibold text-[#0F766E] mt-1">
                Aspiring AI Engineer | Learning by Building
              </p>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="border-[#DCE7E5] text-[#0B1F2A] hover:bg-[#F0F5F4] text-xs font-semibold self-start sm:self-auto h-8 gap-1.5"
            onClick={() => toast.info("Profile settings opened")}
          >
            <Edit3 className="size-3.5" />
            Edit Profile
          </Button>
        </div>

        {/* Stats Row */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5 border-t border-[#DCE7E5]/80 pt-4">
          <div className="text-center sm:text-left">
            <span className="font-display text-lg font-bold text-[#0B1F2A]">1,280</span>
            <p className="text-[11px] text-[#84979D]">Total XP</p>
          </div>
          <div className="text-center sm:text-left">
            <span className="font-display text-lg font-bold text-[#0B1F2A]">6</span>
            <p className="text-[11px] text-[#84979D]">Day Streak</p>
          </div>
          <div className="text-center sm:text-left">
            <span className="font-display text-lg font-bold text-[#0B1F2A]">3</span>
            <p className="text-[11px] text-[#84979D]">Modules Completed</p>
          </div>
          <div className="text-center sm:text-left">
            <span className="font-display text-lg font-bold text-[#0B1F2A]">2</span>
            <p className="text-[11px] text-[#84979D]">Projects</p>
          </div>
          <div className="text-center sm:text-left col-span-2 sm:col-span-1">
            <span className="font-display text-lg font-bold text-[#0B1F2A]">12</span>
            <p className="text-[11px] text-[#84979D]">Skills</p>
          </div>
        </div>
      </div>

      {/* ── Tabs Navigation ── */}
      <div className="flex border-b border-[#DCE7E5] gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: "overview", label: "Overview" },
          { id: "projects", label: "Projects" },
          { id: "skills", label: "Skills" },
          { id: "achievements", label: "Achievements" },
          { id: "journey", label: "Learning Journey" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "border-[#0F766E] text-[#0F766E]"
                : "border-transparent text-[#587078] hover:text-[#0B1F2A]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab Content: Overview (matching Reference Screen 7) ── */}
      {activeTab === "overview" && (
        <div className="grid gap-4 md:grid-cols-12 items-start">
          {/* About Me (col-span-4) */}
          <div className="md:col-span-4 rounded-2xl border border-[#DCE7E5] bg-white p-5 space-y-3 shadow-2xs">
            <h3 className="font-display text-xs font-bold text-[#0B1F2A] uppercase tracking-wider">
              About Me
            </h3>
            <p className="text-xs text-[#587078] leading-relaxed">
              Passionate about AI and building real-world solutions. Currently learning Python and ML.
            </p>

            <div className="space-y-2 border-t border-[#DCE7E5]/70 pt-3 text-xs text-[#587078]">
              <div className="flex items-center gap-2">
                <GraduationCap className="size-4 text-[#0F766E]" />
                <span>KLH University</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="size-4 text-[#0F766E]" />
                <span>B.Tech Computer Science</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-[#0F766E]" />
                <span>AI Track</span>
              </div>
            </div>
          </div>

          {/* Achievements (col-span-4) */}
          <div className="md:col-span-4 rounded-2xl border border-[#DCE7E5] bg-white p-5 space-y-3 shadow-2xs">
            <h3 className="font-display text-xs font-bold text-[#0B1F2A] uppercase tracking-wider">
              Achievements
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] p-3 text-center">
                <div className="grid size-8 mx-auto place-items-center rounded-lg bg-[#FEF3C7] text-[#D97706]">
                  <Sparkles className="size-4" />
                </div>
                <p className="mt-2 text-[11px] font-bold text-[#0B1F2A]">Quick Learner</p>
                <p className="text-[9px] text-[#84979D]">Completed 1st module</p>
              </div>

              <div className="rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] p-3 text-center">
                <div className="grid size-8 mx-auto place-items-center rounded-lg bg-[#FEF3C7] text-[#D97706]">
                  <Flame className="size-4" />
                </div>
                <p className="mt-2 text-[11px] font-bold text-[#0B1F2A]">7 Day Streak</p>
                <p className="text-[9px] text-[#84979D]">Consistency champion</p>
              </div>

              <div className="rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] p-3 text-center">
                <div className="grid size-8 mx-auto place-items-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
                  <FolderKanban className="size-4" />
                </div>
                <p className="mt-2 text-[11px] font-bold text-[#0B1F2A]">Project Builder</p>
                <p className="text-[9px] text-[#84979D]">Submit first project</p>
              </div>

              <div className="rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] p-3 text-center">
                <div className="grid size-8 mx-auto place-items-center rounded-lg bg-[#CCFBF1] text-[#0F766E]">
                  <Trophy className="size-4" />
                </div>
                <p className="mt-2 text-[11px] font-bold text-[#0B1F2A]">AI Explorer</p>
                <p className="text-[9px] text-[#84979D]">Complete AI track</p>
              </div>
            </div>
          </div>

          {/* Learning Stats & Career Goal (col-span-4) */}
          <div className="md:col-span-4 space-y-4">
            <div className="rounded-2xl border border-[#DCE7E5] bg-white p-5 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xs font-bold text-[#0B1F2A] uppercase tracking-wider">
                  Learning Stats
                </h3>
                <span className="text-[10px] font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded">
                  This Week
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#587078]">Weekly XP</span>
                  <span className="font-bold text-[#0B1F2A]">+320 XP</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#587078]">Study Time</span>
                  <span className="font-bold text-[#0B1F2A]">~5.5 hours</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#587078]">Exercises Run</span>
                  <span className="font-bold text-[#0B1F2A]">18 exercises</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#DCE7E5] bg-gradient-to-br from-[#F0FDF4] to-[#F7FAFA] p-5 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E]">
                  <Target className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-[#84979D]">
                    Career Goal
                  </p>
                  <h4 className="text-sm font-bold text-[#0B1F2A]">AI Engineer</h4>
                  <p className="text-[11px] text-[#587078]">
                    Build the solutions that create real-world impact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fallback for other tabs */}
      {activeTab !== "overview" && (
        <div className="rounded-2xl border border-[#DCE7E5] bg-white p-8 text-center space-y-3">
          <p className="text-sm font-semibold text-[#0B1F2A] capitalize">
            {activeTab} Details
          </p>
          <p className="text-xs text-[#587078]">
            Connected with your academic transcript and verified achievements.
          </p>
          <Button
            size="sm"
            className="bg-[#0F766E] hover:bg-[#0B1F2A] text-white text-xs"
            onClick={() => setActiveTab("overview")}
          >
            Back to Overview
          </Button>
        </div>
      )}
    </div>
  );
}

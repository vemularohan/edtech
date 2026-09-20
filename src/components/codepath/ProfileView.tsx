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
    "overview" | "projects" | "skills" | "achievements"
  >("overview");

  return (
    <div className="page-container page-sections">
      {/* ── Student Header Card (Aligned to Global Grid) ── */}
      <div className="ui-card p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Student Avatar */}
            <div className="grid size-16 place-items-center rounded-2xl bg-[#0F766E] text-white font-bold text-xl shadow-2xs shrink-0">
              AK
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-[#0B1F2A]">
                  Aarav Kulkarni
                </h1>
                <span className="font-mono text-[10px] font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded">
                  STUDENT ID: KLH-2024-AI042
                </span>
              </div>
              <p className="text-xs text-[#587078] mt-0.5">
                B.Tech Computer Science & Engineering · AI Track
              </p>
              <p className="text-xs font-semibold text-[#0F766E] mt-1">
                Aspiring AI Engineer · Learning by Building
              </p>
            </div>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="border-[#DCE7E5] text-[#0B1F2A] hover:bg-[#F0F5F4] text-xs font-semibold self-start sm:self-auto h-10 px-4 rounded-xl gap-2 cursor-pointer"
            onClick={() => toast.info("Profile settings opened")}
          >
            <Edit3 className="size-3.5" />
            Edit Profile
          </Button>
        </div>

        {/* Standardized 5-Metric Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 border-t border-[#DCE7E5] pt-5">
          <div className="rounded-xl bg-[#F7FAFA] p-3.5 border border-[#DCE7E5] text-center sm:text-left">
            <span className="font-display text-xl font-bold text-[#0B1F2A]">1,280</span>
            <p className="text-[11px] text-[#84979D] font-medium">Total XP</p>
          </div>
          <div className="rounded-xl bg-[#F7FAFA] p-3.5 border border-[#DCE7E5] text-center sm:text-left">
            <span className="font-display text-xl font-bold text-[#0B1F2A]">6 Days</span>
            <p className="text-[11px] text-[#84979D] font-medium">Active Streak</p>
          </div>
          <div className="rounded-xl bg-[#F7FAFA] p-3.5 border border-[#DCE7E5] text-center sm:text-left">
            <span className="font-display text-xl font-bold text-[#0B1F2A]">0 / 20</span>
            <p className="text-[11px] text-[#84979D] font-medium">Modules Done</p>
          </div>
          <div className="rounded-xl bg-[#F7FAFA] p-3.5 border border-[#DCE7E5] text-center sm:text-left">
            <span className="font-display text-xl font-bold text-[#0B1F2A]">1 Capstone</span>
            <p className="text-[11px] text-[#84979D] font-medium">In Progress</p>
          </div>
          <div className="rounded-xl bg-[#F7FAFA] p-3.5 border border-[#DCE7E5] text-center sm:text-left col-span-2 sm:col-span-1">
            <span className="font-display text-xl font-bold text-[#0B1F2A]">12 Skills</span>
            <p className="text-[11px] text-[#84979D] font-medium">Competencies</p>
          </div>
        </div>
      </div>

      {/* ── Tabs Navigation ── */}
      <div className="flex border-b border-[#DCE7E5] gap-2 overflow-x-auto no-scrollbar">
        {[
          { id: "overview", label: "Overview" },
          { id: "projects", label: "Projects & Capstones" },
          { id: "skills", label: "Mastery Matrix" },
          { id: "achievements", label: "Badges & Credentials" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? "border-[#0F766E] text-[#0F766E]"
                : "border-transparent text-[#587078] hover:text-[#0B1F2A]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Tab Content: Overview ── */}
      {activeTab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-12 items-start">
          {/* About Me (col-span-4) */}
          <div className="lg:col-span-4 ui-card p-6 space-y-4">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
              ACADEMIC IDENTITY
            </span>
            <p className="text-xs sm:text-sm text-[#587078] leading-relaxed">
              Enrolled in the 20-Module AI Program at KLH University. Specializing in Python foundations, vector retrieval, and autonomous multi-agent systems.
            </p>

            <div className="space-y-3 border-t border-[#DCE7E5] pt-4 text-xs text-[#587078]">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="size-4 text-[#0F766E]" />
                <span>KLH Deemed to be University</span>
              </div>
              <div className="flex items-center gap-2.5">
                <BookOpen className="size-4 text-[#0F766E]" />
                <span>B.Tech Computer Science & Engineering</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="size-4 text-[#0F766E]" />
                <span>AI Specialization Track (Semester 5)</span>
              </div>
            </div>
          </div>

          {/* Achievements (col-span-4) */}
          <div className="lg:col-span-4 ui-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
                EARNED BADGES
              </span>
              <span className="text-xs text-[#0F766E] font-semibold">4 Unlocked</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] p-3.5 text-center">
                <div className="grid size-9 mx-auto place-items-center rounded-xl bg-[#FEF3C7] text-[#D97706]">
                  <Sparkles className="size-4.5" />
                </div>
                <p className="mt-2 text-xs font-bold text-[#0B1F2A]">Quick Learner</p>
                <p className="text-[10px] text-[#84979D]">Started Module 01</p>
              </div>

              <div className="rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] p-3.5 text-center">
                <div className="grid size-9 mx-auto place-items-center rounded-xl bg-[#FEF3C7] text-[#D97706]">
                  <Flame className="size-4.5" />
                </div>
                <p className="mt-2 text-xs font-bold text-[#0B1F2A]">6-Day Streak</p>
                <p className="text-[10px] text-[#84979D]">Consistent builder</p>
              </div>

              <div className="rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] p-3.5 text-center">
                <div className="grid size-9 mx-auto place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E]">
                  <FolderKanban className="size-4.5" />
                </div>
                <p className="mt-2 text-xs font-bold text-[#0B1F2A]">Project Builder</p>
                <p className="text-[10px] text-[#84979D]">Started Capstone</p>
              </div>

              <div className="rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] p-3.5 text-center">
                <div className="grid size-9 mx-auto place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E]">
                  <Trophy className="size-4.5" />
                </div>
                <p className="mt-2 text-xs font-bold text-[#0B1F2A]">AI Pioneer</p>
                <p className="text-[10px] text-[#84979D]">Verified learner</p>
              </div>
            </div>
          </div>

          {/* Career Readiness & Stats (col-span-4) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="ui-card p-6 space-y-3.5">
              <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#587078]">
                  STUDY VELOCITY
                </span>
                <span className="text-[10px] font-bold text-[#0F766E] bg-[#CCFBF1] px-2 py-0.5 rounded">
                  This Week
                </span>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#587078]">Weekly XP Gained</span>
                  <span className="font-bold text-[#0B1F2A]">+120 XP</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#587078]">Estimated Study Time</span>
                  <span className="font-bold text-[#0B1F2A]">~4.5 hours</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#587078]">Code Exercises Solved</span>
                  <span className="font-bold text-[#0B1F2A]">14 tests passed</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#0F766E]/30 bg-gradient-to-br from-[#F0FDF4] to-[#F7FAFA] p-5 shadow-2xs">
              <div className="flex items-center gap-3.5">
                <div className="grid size-11 place-items-center rounded-xl bg-[#CCFBF1] text-[#0F766E] shrink-0">
                  <Target className="size-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#0F766E]">
                    TARGET CAREER GOAL
                  </span>
                  <h4 className="text-sm font-bold text-[#0B1F2A]">Production AI Engineer</h4>
                  <p className="text-xs text-[#587078] mt-0.5 leading-relaxed">
                    Building robust, verified AI applications for top enterprise engineering teams.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Projects */}
      {activeTab === "projects" && (
        <div className="ui-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
              CAPSTONE PORTFOLIO
            </span>
            <Button
              size="sm"
              className="bg-[#0F766E] text-white text-xs h-9 px-4 rounded-xl cursor-pointer"
              onClick={() => navigate({ to: "/build" })}
            >
              Open Active Project →
            </Button>
          </div>
          <div className="p-4 rounded-xl border border-[#DCE7E5] bg-[#F7FAFA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-sm text-[#0B1F2A]">Python CSV Analytics & Visual Pipeline</h3>
              <p className="text-xs text-[#587078] mt-1">Status: In Development · 2 of 8 milestones verified</p>
            </div>
            <span className="font-mono text-xs font-bold text-[#0F766E] bg-[#CCFBF1] px-2.5 py-1 rounded-md">
              25% Complete
            </span>
          </div>
        </div>
      )}

      {/* Tab: Skills */}
      {activeTab === "skills" && (
        <div className="ui-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
              COMPETENCY PROFILE
            </span>
            <Button
              size="sm"
              variant="outline"
              className="border-[#DCE7E5] text-[#0F766E] text-xs h-9 px-4 rounded-xl cursor-pointer"
              onClick={() => navigate({ to: "/skills" })}
            >
              Detailed Skills Matrix →
            </Button>
          </div>
          <p className="text-xs text-[#587078]">
            12 active competencies recorded in Module 01. Complete assignments to level up from Beginner to Advanced AI Engineer.
          </p>
        </div>
      )}

      {/* Tab: Achievements */}
      {activeTab === "achievements" && (
        <div className="ui-card p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#DCE7E5] pb-3">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
              VERIFIED ACADEMIC CREDENTIALS
            </span>
            <Button
              size="sm"
              variant="outline"
              className="border-[#DCE7E5] text-[#0F766E] text-xs h-9 px-4 rounded-xl cursor-pointer"
              onClick={() => navigate({ to: "/career" })}
            >
              View Full Transcripts →
            </Button>
          </div>
          <p className="text-xs text-[#587078]">
            Your cryptographically verified certificates and capstone evaluation reports will be displayed here upon module completion.
          </p>
        </div>
      )}
    </div>
  );
}

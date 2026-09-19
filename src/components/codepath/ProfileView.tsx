import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  Compass,
  Edit3,
  ExternalLink,
  Flame,
  FolderKanban,
  GraduationCap,
  KeyRound,
  Lock,
  Mail,
  Save,
  Settings2,
  Sparkles,
  Target,
  Trophy,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLearningEvidence, useLearningProgress } from "@/lib/learning-progress";

export function ProfileView() {
  const navigate = useNavigate();
  const evidence = useLearningEvidence();
  const progress = useLearningProgress();

  const [hours, setHours] = useState(12);
  const [selectedRole, setSelectedRole] = useState("GenAI Engineer");
  const [reviewEmail, setReviewEmail] = useState(true);
  const [saved, setSaved] = useState(false);

  const [schedule, setSchedule] = useState<{ [key: string]: string }>({
    Mon: "Morning",
    Tue: "Morning",
    Wed: "",
    Thu: "Evening",
    Fri: "Evening",
    Sat: "",
    Sun: "Weekend",
  });

  const toggleSlot = (day: string, slot: string) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: prev[day] === slot ? "" : slot,
    }));
  };

  const handleSave = () => {
    setSaved(true);
    toast.success(`Preferences saved · ${hours} hrs/week · Role: ${selectedRole}`);
    setTimeout(() => setSaved(false), 2500);
  };

  const roles = [
    { id: "GenAI", label: "GenAI Engineer" },
    { id: "AI Engineer", label: "AI Engineer" },
    { id: "Prompt", label: "Prompt Engineer" },
    { id: "Product", label: "AI Product Developer" },
  ];

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const slots = ["Morning", "Evening", "Weekend"];

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-16 cp-rise">

      {/* ── 1. Page Header ── */}
      <div className="border-b border-border pb-5">
        <span
          className="font-mono text-[11px] font-bold uppercase tracking-widest"
          style={{ color: "var(--color-brand)" }}
        >
          PROFILE & SETTINGS
        </span>
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-1">
          Make the 16-week plan fit your week.
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          Your pace, study hours, and target role shape which module and project come next.
        </p>
      </div>

      {/* ── 2. Identity + Achievements ── */}
      <div className="grid gap-4 lg:grid-cols-12">

        {/* Student Identity card */}
        <div
          className="lg:col-span-7 rounded-2xl border border-border bg-surface-elevated p-5 space-y-4"
          style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
        >
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-3">
              <div
                className="grid size-12 place-items-center rounded-2xl font-display text-base font-bold text-white shadow-sm"
                style={{ background: "var(--color-brand)" }}
              >
                AK
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-faint">Student Profile</p>
                <h2 className="font-display text-lg font-bold text-foreground">Aarav Kulkarni</h2>
                <p className="text-xs text-muted-foreground">B.Tech CSE · 3rd Year · Semester 3</p>
              </div>
            </div>
            <button
              className="flex items-center gap-1.5 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-surface-elevated transition"
              onClick={() => toast("Edit profile")}
            >
              <Edit3 className="size-3.5" />
              Edit
            </button>
          </div>

          {/* Info grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: GraduationCap, label: "University", value: "KLH University" },
              { icon: Code2, label: "Department", value: "Computer Science & Engineering" },
              { icon: Target, label: "Target Role", value: selectedRole },
              { icon: Clock, label: "Weekly Goal", value: `${hours} hours / week` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3 rounded-xl border border-border bg-surface/50 p-3">
                <div
                  className="grid size-8 shrink-0 place-items-center rounded-lg"
                  style={{ background: "var(--color-brand-soft)" }}
                >
                  <Icon className="size-4" style={{ color: "var(--color-brand)" }} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-faint">{label}</p>
                  <p className="text-sm font-medium text-foreground mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div
          className="lg:col-span-5 rounded-2xl border border-border bg-surface-elevated p-5 space-y-4"
          style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
        >
          <div>
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-wider"
              style={{ color: "var(--color-brand)" }}
            >
              Achievements
            </span>
            <h2 className="font-display text-base font-bold text-foreground mt-0.5">Your Badges</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Flame, label: "12-Day Streak", color: "peach", earned: true },
              { icon: Brain, label: "First Module", color: "brand", earned: true },
              { icon: Code2, label: "Lab Master", color: "lilac", earned: false },
              { icon: FolderKanban, label: "Project Ship", color: "mint", earned: false },
              { icon: Sparkles, label: "AI Expert", color: "lilac", earned: false },
              { icon: Trophy, label: "Certified", color: "peach", earned: false },
            ].map(({ icon: Icon, label, color, earned }) => (
              <div
                key={label}
                className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-all ${
                  earned ? "border-border bg-surface-elevated" : "border-dashed border-border bg-surface/30 opacity-50"
                }`}
              >
                <div
                  className="grid size-9 place-items-center rounded-xl"
                  style={{
                    background: earned ? `var(--color-${color}-soft)` : "var(--color-surface)",
                  }}
                >
                  <Icon
                    className="size-4"
                    style={{ color: earned ? `var(--color-${color})` : "var(--color-faint)" }}
                  />
                </div>
                <p className="text-[10px] font-medium text-foreground leading-tight">{label}</p>
                {!earned && <Lock className="size-3 text-faint" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3. Target Role ── */}
      <div
        className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4"
        style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
      >
        <div>
          <span
            className="font-mono text-[10px] font-bold uppercase tracking-wider"
            style={{ color: "var(--color-brand)" }}
          >
            Target Role
          </span>
          <h2 className="font-display text-base font-bold text-foreground mt-0.5">
            Which role are you preparing for?
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Your selection shapes the AI-recommended module order and project evaluations.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {roles.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setSelectedRole(label)}
              className={`rounded-xl border p-3.5 text-left transition-all ${
                selectedRole === label
                  ? "border-[var(--color-brand)] bg-[var(--color-brand-soft)] ring-1 ring-[var(--color-brand)]/30"
                  : "border-border bg-surface/40 hover:bg-surface"
              }`}
            >
              <p className="text-sm font-semibold text-foreground">{label}</p>
              {selectedRole === label && (
                <div className="mt-1.5 flex items-center gap-1 text-[10px] font-bold" style={{ color: "var(--color-brand)" }}>
                  <Check className="size-3" /> Selected
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── 4. Weekly Hours + Study Schedule ── */}
      <div className="grid gap-4 lg:grid-cols-2">

        {/* Weekly hours slider */}
        <div
          className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4"
          style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
        >
          <div>
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-wider"
              style={{ color: "var(--color-brand)" }}
            >
              Weekly Commitment
            </span>
            <h2 className="font-display text-base font-bold text-foreground mt-0.5">Study Hours / Week</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Target hours per week</p>
              <span
                className="rounded-xl border border-border bg-surface px-3 py-1 font-mono text-sm font-bold"
                style={{ color: "var(--color-brand)" }}
              >
                {hours} hrs
              </span>
            </div>
            <input
              type="range"
              min="3"
              max="30"
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full h-2 rounded-full cursor-pointer"
              style={{ accentColor: "var(--color-brand)" }}
            />
            <div className="flex justify-between text-[10px] text-faint font-mono">
              <span>3 hrs (minimal)</span>
              <span>30 hrs (intensive)</span>
            </div>
            <p className="text-xs text-muted-foreground pt-1">
              At {hours} hrs/week, you'll complete the full program in approximately{" "}
              <strong className="text-foreground">{Math.round(160 / hours)} weeks</strong>.
            </p>
          </div>
        </div>

        {/* Study schedule matrix */}
        <div
          className="rounded-2xl border border-border bg-surface-elevated p-5 space-y-4"
          style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
        >
          <div>
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-wider"
              style={{ color: "var(--color-brand)" }}
            >
              Study Schedule
            </span>
            <h2 className="font-display text-base font-bold text-foreground mt-0.5">Preferred Study Times</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr>
                  <th className="text-left font-semibold text-faint pb-2 pr-2 w-14">Day</th>
                  {slots.map((slot) => (
                    <th key={slot} className="text-center font-semibold text-faint pb-2 px-1">
                      {slot}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="space-y-1">
                {days.map((day) => (
                  <tr key={day}>
                    <td className="pr-2 py-1 font-mono text-[11px] font-semibold text-foreground">{day}</td>
                    {slots.map((slot) => {
                      const active = schedule[day] === slot;
                      return (
                        <td key={slot} className="text-center px-1 py-1">
                          <button
                            onClick={() => toggleSlot(day, slot)}
                            className="size-8 rounded-lg border transition-all mx-auto block"
                            style={{
                              background: active ? "var(--color-brand)" : "var(--color-surface)",
                              borderColor: active ? "var(--color-brand)" : "var(--color-border)",
                            }}
                            aria-label={`${day} ${slot}`}
                          >
                            {active && <Check className="size-3 text-white mx-auto" />}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── 5. Notifications + Save ── */}
      <div
        className="rounded-2xl border border-border bg-surface-elevated p-5"
        style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-wider"
              style={{ color: "var(--color-brand)" }}
            >
              Notifications
            </span>
            <h2 className="font-display text-base font-bold text-foreground">Progress Review Email</h2>
            <p className="text-xs text-muted-foreground">
              Weekly summary of your modules, evidence, and next recommended steps.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setReviewEmail(!reviewEmail)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full border transition-all ${
                reviewEmail
                  ? "border-[var(--color-brand)] bg-[var(--color-brand)]"
                  : "border-border bg-surface"
              }`}
              aria-label="Toggle email notifications"
            >
              <span
                className={`absolute size-4 rounded-full bg-white shadow transition-transform ${
                  reviewEmail ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className="text-xs text-muted-foreground">{reviewEmail ? "Enabled" : "Disabled"}</span>
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <Button
            onClick={handleSave}
            className="font-bold px-6"
            style={{ background: "var(--color-brand)", color: "white" }}
          >
            {saved ? (
              <>
                <Check className="size-4 mr-2" />
                Saved!
              </>
            ) : (
              <>
                <Save className="size-4 mr-2" />
                Save Preferences
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

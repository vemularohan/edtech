import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  Code2,
  Flame,
  HelpCircle,
  Lightbulb,
  Play,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  Terminal,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { recordLearningEvidence, recordSkillActivity } from "@/lib/learning-progress";

interface TestCase {
  id: number;
  name: string;
  input: string;
  expected: string;
  actual?: string;
  passed: boolean;
  explanation: string;
}

export function PracticeLabView() {
  const navigate = useNavigate();

  const starterCode = `def count_messages(messages):
    """
    Return the number of valid messages in a list.
    A valid message is a non-empty string.
    Ignore empty strings ("") and None values.
    """
    # Buggy AI-generated starter code:
    return sum(1 for message in messages if message)
`;

  const [code, setCode] = useState(starterCode);
  const [ranCode, setRanCode] = useState(false);
  const [ranTests, setRanTests] = useState(false);
  const [hintTier, setHintTier] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [mentorInput, setMentorInput] = useState("");
  const [mentorChat, setMentorChat] = useState<Array<{ role: "user" | "assistant"; text: string }>>([]);

  const requirements = [
    { id: 1, text: 'Ignore empty strings ("")', checked: true },
    { id: 2, text: "Ignore None values without throwing TypeError", checked: true },
    { id: 3, text: "Retain the correct count of valid strings", checked: true },
    { id: 4, text: "Preserve function signature: count_messages(messages)", checked: true },
  ];

  const evaluateTests = (currentCode: string): TestCase[] => {
    const handlesType = currentCode.includes("isinstance") || currentCode.includes("type(");
    const handlesNone = currentCode.includes("None") || currentCode.includes("is not None") || handlesType;
    const handlesEmpty = currentCode.includes("strip") || currentCode.includes('!= ""') || currentCode.includes("len(");

    const test1Passed = true;
    const test2Passed = handlesEmpty;
    const test3Passed = handlesNone;
    const test4Passed = handlesNone && handlesEmpty;
    const test5Passed = handlesType && handlesEmpty;

    return [
      { id: 1, name: "Basic messages", input: "['hello', 'world']", expected: "2", actual: "2", passed: test1Passed, explanation: "Two valid string messages correctly counted." },
      { id: 2, name: "With empty strings", input: "['hi', '', 'there']", expected: "2", actual: test2Passed ? "2" : "2", passed: test2Passed, explanation: "Empty string ignored." },
      { id: 3, name: "With None values", input: "['ok', None, 'test']", expected: "2", actual: test3Passed ? "2" : "Error", passed: test3Passed, explanation: "None value skipped without TypeError." },
      { id: 4, name: "Mixed None + empty", input: "['hi', '', None, 'bye']", expected: "2", actual: test4Passed ? "2" : "Error", passed: test4Passed, explanation: "Both None and empty string correctly filtered." },
      { id: 5, name: "Non-string types", input: "[42, 'valid', None]", expected: "1", actual: test5Passed ? "1" : "2", passed: test5Passed, explanation: "Only string types counted." },
    ];
  };

  const testResults = evaluateTests(code);
  const passCount = testResults.filter((t) => t.passed).length;
  const allPassed = passCount === testResults.length;

  const hints = [
    "The `if message` check skips falsy values like `None` and `''` — but does it also skip `0` or `False`? Is that the right behavior for messages?",
    "Try using `isinstance(message, str)` to ensure you're only counting actual strings. Then add a `.strip()` check to reject whitespace-only messages too.",
    'Solution pattern: `isinstance(m, str) and m.strip() != ""`',
  ];

  const handleRunCode = () => {
    setRanCode(true);
    toast("Code executed · 5 test cases evaluated");
  };

  const handleRunTests = () => {
    setRanTests(true);
    const tc = evaluateTests(code);
    const p = tc.filter((t) => t.passed).length;
    toast(`${p}/${tc.length} tests passed`);
  };

  const handleSubmit = () => {
    if (!allPassed) {
      toast.error("Fix all test cases before submitting.");
      return;
    }
    setSubmitted(true);
    recordLearningEvidence({ challengesPassed: 1 });
    recordSkillActivity("3.2", "python-ai", 2, "count_messages: filtering and type safety fix");
    toast.success("Lab submitted! Evidence recorded.");
  };

  const handleHint = () => {
    setHintTier((prev) => Math.min(prev + 1, hints.length));
  };

  const handleMentorSend = () => {
    if (!mentorInput.trim()) return;
    const userMsg = { role: "user" as const, text: mentorInput };
    const reply = {
      role: "assistant" as const,
      text: `Good question! The key insight here is that Python's truthiness check (\`if message\`) skips \`None\` and \`""\`, but it also skips \`0\`, \`False\`, and empty lists. For message filtering, you usually want to be more precise: check \`isinstance(message, str)\` first, then check \`.strip()\` for whitespace. This prevents silent bugs when your LLM returns non-string types.`,
    };
    setMentorChat((prev) => [...prev, userMsg, reply]);
    setMentorInput("");
    toast("AI Mentor responded");
  };

  return (
    <div className="mx-auto max-w-7xl space-y-4 pb-16 cp-rise">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Terminal className="size-4" style={{ color: "var(--color-brand)" }} />
            <span
              className="font-mono text-[11px] font-bold uppercase tracking-widest"
              style={{ color: "var(--color-brand)" }}
            >
              Practice Lab
            </span>
          </div>
          <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground mt-0.5">
            Python Debugging Challenge
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Module 01 · Discipline 03: Functions & Control Flow
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-600">
            <Flame className="size-3.5" />
            +15 XP
          </div>
          <Button variant="outline" size="sm" className="text-xs" onClick={() => navigate({ to: "/learning-mode", search: { module: "3.2" } })}>
            <ArrowLeft className="size-3.5 mr-1" />
            Back to Lesson
          </Button>
        </div>
      </div>

      {/* ── Main Layout: Problem + Code Editor ── */}
      <div className="grid gap-4 xl:grid-cols-[1fr_420px]">

        {/* Left: Code Editor */}
        <div className="space-y-3">

          {/* Problem brief */}
          <div
            className="rounded-2xl border border-border bg-surface-elevated p-4"
            style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
          >
            <div className="flex items-start gap-3">
              <div
                className="grid size-8 shrink-0 place-items-center rounded-xl"
                style={{ background: "var(--color-brand-soft)" }}
              >
                <Code2 className="size-4" style={{ color: "var(--color-brand)" }} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-base font-bold text-foreground">Fix count_messages()</h2>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  The AI-generated starter code uses <code className="bg-surface border border-border rounded px-1 py-0.5 text-[11px]">if message</code> to filter, which passes most tests. But it fails when the list contains non-string types like <code className="bg-surface border border-border rounded px-1 py-0.5 text-[11px]">42</code> or <code className="bg-surface border border-border rounded px-1 py-0.5 text-[11px]">False</code>. Fix the filter so it only counts valid, non-empty strings.
                </p>
              </div>
            </div>

            {/* Requirements checklist */}
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-[10px] font-bold uppercase tracking-wider text-faint mb-2">Requirements</p>
              <div className="grid gap-1.5 sm:grid-cols-2">
                {requirements.map((req) => (
                  <div key={req.id} className="flex items-start gap-2 text-xs">
                    <CheckCircle2 className="size-3.5 shrink-0 mt-0.5" style={{ color: "var(--color-mint)" }} />
                    <span className="text-muted-foreground">{req.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code editor */}
          <div
            className="rounded-2xl overflow-hidden border"
            style={{
              borderColor: "oklch(0.25 0.025 255)",
              boxShadow: "0 2px 8px rgba(0,0,0,.15)",
            }}
          >
            {/* Editor header bar */}
            <div
              className="flex items-center justify-between px-4 py-2.5 border-b"
              style={{ background: "oklch(0.16 0.02 255)", borderColor: "oklch(0.22 0.025 255)" }}
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-400/80" />
                  <span className="size-2.5 rounded-full bg-amber-400/80" />
                  <span className="size-2.5 rounded-full bg-green-400/80" />
                </div>
                <span className="font-mono text-[11px] text-slate-400 ml-1">solution.py</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-slate-500">Python 3.11</span>
                <button
                  onClick={() => setCode(starterCode)}
                  className="flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-medium text-slate-400 hover:text-slate-200 hover:bg-white/10 transition"
                >
                  <RotateCcw className="size-3" />
                  Reset
                </button>
              </div>
            </div>

            {/* Code textarea */}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full resize-none p-4 font-mono text-[13px] leading-6 outline-none"
              style={{
                background: "oklch(0.14 0.02 255)",
                color: "oklch(0.9 0.02 255)",
                minHeight: "260px",
                caretColor: "var(--color-brand)",
              }}
              spellCheck={false}
              aria-label="Python code editor"
            />

            {/* Run buttons */}
            <div
              className="flex items-center gap-2 px-4 py-2.5 border-t"
              style={{ background: "oklch(0.16 0.02 255)", borderColor: "oklch(0.22 0.025 255)" }}
            >
              <Button
                size="sm"
                className="text-xs font-bold gap-1.5"
                style={{ background: "var(--color-brand)", color: "white" }}
                onClick={handleRunCode}
              >
                <Play className="size-3.5 fill-current" />
                Run Code
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-xs font-medium border-slate-600 text-slate-300 hover:bg-white/10 hover:text-white hover:border-slate-400"
                onClick={handleRunTests}
              >
                <ShieldCheck className="size-3.5 mr-1.5" />
                Run Tests
              </Button>
              <div className="flex-1" />
              {ranCode && (
                <span className="font-mono text-[10px] text-slate-400">
                  Ran at {new Date().toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>

          {/* Test results */}
          {ranTests && (
            <div
              className="rounded-2xl border border-border bg-surface-elevated p-4 space-y-2 cp-rise"
              style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4" style={{ color: allPassed ? "var(--color-mint)" : "var(--color-peach)" }} />
                  <span className="font-display text-sm font-bold text-foreground">
                    Test Results: {passCount}/{testResults.length} Passed
                  </span>
                </div>
                {allPassed ? (
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold font-mono"
                    style={{ background: "var(--color-mint-soft)", color: "var(--color-mint)" }}
                  >
                    All Passing ✓
                  </span>
                ) : (
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold font-mono"
                    style={{ background: "var(--color-peach-soft)", color: "var(--color-peach)" }}
                  >
                    {testResults.length - passCount} Failing
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {testResults.map((test) => (
                  <div
                    key={test.id}
                    className={`flex items-start gap-3 rounded-xl border p-3 text-xs ${
                      test.passed
                        ? "border-[var(--color-mint)]/25 bg-[var(--color-mint-soft)]/40"
                        : "border-[var(--color-peach)]/25 bg-[var(--color-peach-soft)]/40"
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {test.passed ? (
                        <CheckCircle2 className="size-4" style={{ color: "var(--color-mint)" }} />
                      ) : (
                        <XCircle className="size-4" style={{ color: "var(--color-peach)" }} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="font-semibold text-foreground">{test.name}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          Input: {test.input}
                        </span>
                      </div>
                      <div className="mt-1 flex gap-4 font-mono text-[11px]">
                        <span className="text-faint">Expected: <strong>{test.expected}</strong></span>
                        {test.actual && (
                          <span className={test.passed ? "text-faint" : "text-peach"}>
                            Got: <strong>{test.actual}</strong>
                          </span>
                        )}
                      </div>
                      {!test.passed && (
                        <p className="mt-1 text-[11px] text-muted-foreground">{test.explanation}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {allPassed && !submitted && (
                <div className="pt-2">
                  <Button
                    className="w-full font-bold"
                    style={{ background: "var(--color-brand)", color: "white" }}
                    onClick={handleSubmit}
                  >
                    <Trophy className="size-4 mr-2" />
                    Submit Lab — Record Evidence
                  </Button>
                </div>
              )}

              {submitted && (
                <div
                  className="rounded-xl p-4 text-center cp-rise"
                  style={{ background: "var(--color-mint-soft)" }}
                >
                  <CheckCircle2 className="size-8 mx-auto" style={{ color: "var(--color-mint)" }} />
                  <p className="font-display font-bold text-foreground mt-2">Lab Complete!</p>
                  <p className="text-xs text-muted-foreground mt-1">Evidence recorded · +15 XP earned</p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-3 text-xs"
                    onClick={() => navigate({ to: "/learning-mode", search: { module: "3.2" } })}
                  >
                    Return to Lesson <ArrowRight className="size-3.5 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Hints + AI Mentor */}
        <div className="space-y-4">

          {/* Hints panel */}
          <div
            className="rounded-2xl border border-border bg-surface-elevated p-4 space-y-3"
            style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
          >
            <div className="flex items-center gap-2">
              <Lightbulb className="size-4" style={{ color: "var(--color-peach)" }} />
              <span
                className="font-mono text-[10px] font-bold uppercase tracking-wider"
                style={{ color: "var(--color-peach)" }}
              >
                Progressive Hints
              </span>
            </div>

            <div className="space-y-2">
              {hints.slice(0, hintTier - 1).map((hint, i) => (
                <div
                  key={i}
                  className="rounded-xl border p-3 text-xs text-muted-foreground leading-relaxed cp-rise"
                  style={{ borderColor: "color-mix(in oklch, var(--color-peach) 25%, transparent)", background: "var(--color-peach-soft)" }}
                >
                  <span className="font-bold" style={{ color: "var(--color-peach)" }}>Hint {i + 1}: </span>
                  {hint}
                </div>
              ))}
            </div>

            {hintTier <= hints.length && (
              <button
                onClick={handleHint}
                className="flex w-full items-center justify-between rounded-xl border border-dashed border-border bg-surface/50 p-3 text-xs font-medium text-muted-foreground hover:bg-surface hover:text-foreground transition"
              >
                <span className="flex items-center gap-2">
                  <HelpCircle className="size-3.5" />
                  Reveal Hint {hintTier}
                </span>
                <ChevronRight className="size-3.5" />
              </button>
            )}

            {hintTier > hints.length && (
              <p className="text-[11px] text-muted-foreground text-center py-1">All hints revealed. You've got this!</p>
            )}
          </div>

          {/* AI Mentor Chat */}
          <div
            className="rounded-2xl border border-border bg-surface-elevated overflow-hidden"
            style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
          >
            <div
              className="flex items-center gap-2 px-4 py-3 border-b border-border"
              style={{ background: "var(--color-surface)" }}
            >
              <div
                className="grid size-6 place-items-center rounded-lg"
                style={{ background: "var(--color-brand-soft)" }}
              >
                <Bot className="size-3.5" style={{ color: "var(--color-brand)" }} />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">AI Mentor</p>
                <p className="text-[10px] text-muted-foreground">Ask anything about this problem</p>
              </div>
              <span
                className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold font-mono"
                style={{ background: "var(--color-brand-soft)", color: "var(--color-brand)" }}
              >
                Online
              </span>
            </div>

            <div className="p-4 space-y-3 min-h-[160px] max-h-[280px] overflow-y-auto no-scrollbar">
              {mentorChat.length === 0 && (
                <div className="text-center py-4">
                  <Sparkles className="size-6 mx-auto" style={{ color: "var(--color-brand)" }} />
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    Ask me why your filter might fail, what isinstance() does, or how to approach this differently.
                  </p>
                </div>
              )}
              {mentorChat.map((msg, i) => (
                <div
                  key={i}
                  className={`text-xs leading-relaxed cp-rise ${
                    msg.role === "user" ? "text-right" : ""
                  }`}
                >
                  <span
                    className={`inline-block rounded-xl px-3 py-2 max-w-[90%] ${
                      msg.role === "user"
                        ? "text-white"
                        : "bg-surface border border-border text-foreground"
                    }`}
                    style={msg.role === "user" ? { background: "var(--color-brand)" } : {}}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-border p-3">
              <input
                value={mentorInput}
                onChange={(e) => setMentorInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleMentorSend()}
                placeholder="Ask the AI mentor…"
                className="flex-1 rounded-xl border border-border bg-surface px-3 py-1.5 text-xs outline-none focus:border-[var(--color-brand)] transition"
              />
              <button
                onClick={handleMentorSend}
                className="grid size-8 place-items-center rounded-xl text-white transition hover:opacity-90"
                style={{ background: "var(--color-brand)" }}
                aria-label="Send message"
              >
                <Send className="size-3.5" />
              </button>
            </div>
          </div>

          {/* XP breakdown */}
          <div
            className="rounded-2xl border border-border bg-surface-elevated p-4"
            style={{ boxShadow: "0 1px 2px rgba(15,23,42,.025), 0 4px 14px -4px rgba(15,23,42,.05)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Zap className="size-4" style={{ color: "var(--color-peach)" }} />
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--color-peach)" }}>
                XP Breakdown
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              {[
                { label: "All tests pass", xp: "+10 XP", done: allPassed },
                { label: "No hints used", xp: "+5 XP", done: hintTier === 1 },
                { label: "Submit lab", xp: "+15 XP", done: submitted },
              ].map(({ label, xp, done }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className={`flex items-center gap-1.5 ${done ? "text-foreground" : "text-muted-foreground"}`}>
                    {done ? (
                      <CheckCircle2 className="size-3.5" style={{ color: "var(--color-mint)" }} />
                    ) : (
                      <span className="size-3.5 rounded-full border border-border inline-block" />
                    )}
                    {label}
                  </span>
                  <span className="font-mono font-bold" style={{ color: done ? "var(--color-mint)" : "var(--color-faint)" }}>
                    {xp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

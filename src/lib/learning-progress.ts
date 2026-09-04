import * as React from "react";

export type LearningEvidence = {
  sectionsCompleted: number;
  questionsPassed: number;
  challengesPassed: number;
};

const STORAGE_KEY = "ai-skills-track.learning-evidence";
const CHANGE_EVENT = "ai-skills-track.progress-change";

function emptyEvidence(): LearningEvidence {
  return { sectionsCompleted: 0, questionsPassed: 0, challengesPassed: 0 };
}

export function readLearningEvidence(): LearningEvidence {
  if (typeof window === "undefined") return emptyEvidence();
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return emptyEvidence();
  try {
    const parsed = JSON.parse(raw) as Partial<LearningEvidence>;
    return {
      sectionsCompleted: Number.isFinite(parsed.sectionsCompleted)
        ? Math.max(0, parsed.sectionsCompleted ?? 0)
        : 0,
      questionsPassed: Number.isFinite(parsed.questionsPassed)
        ? Math.max(0, parsed.questionsPassed ?? 0)
        : 0,
      challengesPassed: Number.isFinite(parsed.challengesPassed)
        ? Math.max(0, parsed.challengesPassed ?? 0)
        : 0,
    };
  } catch {
    return emptyEvidence();
  }
}

export function recordLearningEvidence(delta: Partial<LearningEvidence>) {
  const current = readLearningEvidence();
  const next = {
    sectionsCompleted: current.sectionsCompleted + (delta.sectionsCompleted ?? 0),
    questionsPassed: current.questionsPassed + (delta.questionsPassed ?? 0),
    challengesPassed: current.challengesPassed + (delta.challengesPassed ?? 0),
  };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
  return next;
}

export function useLearningEvidence() {
  const [evidence, setEvidence] = React.useState<LearningEvidence>(emptyEvidence);

  React.useEffect(() => {
    const refresh = () => setEvidence(readLearningEvidence());
    refresh();
    window.addEventListener(CHANGE_EVENT, refresh);
    return () => window.removeEventListener(CHANGE_EVENT, refresh);
  }, []);

  return evidence;
}

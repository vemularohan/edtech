import * as React from "react";
import { curriculumModules, type CurriculumModule } from "./curriculum-data";
import { getLearningExperience } from "./learning-experiences";

export const CURRICULUM_MODULE_COUNT = curriculumModules.length;

export type LearningEvidence = {
  sectionsCompleted: number;
  questionsPassed: number;
  challengesPassed: number;
};

export type LearningProgress = LearningEvidence & {
  completedModuleIds: string[];
  currentModuleId: string;
  currentStepIndex: number;
  currentTopic: string;
};

const STORAGE_KEY = "ai-skills-track.learning-progress";
const LEGACY_STORAGE_KEY = "ai-skills-track.learning-evidence";
const CHANGE_EVENT = "ai-skills-track.progress-change";

function emptyProgress(): LearningProgress {
  return {
    sectionsCompleted: 0,
    questionsPassed: 0,
    challengesPassed: 0,
    completedModuleIds: [],
    currentModuleId: "3.1",
    currentStepIndex: 0,
    currentTopic: "",
  };
}

export function readLearningProgress(): LearningProgress {
  if (typeof window === "undefined") return emptyProgress();
  const raw =
    window.localStorage.getItem(STORAGE_KEY) ?? window.localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!raw) return emptyProgress();
  try {
    const parsed = JSON.parse(raw) as Partial<LearningProgress>;
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
      completedModuleIds: Array.isArray(parsed.completedModuleIds)
        ? parsed.completedModuleIds.filter((id): id is string => typeof id === "string")
        : [],
      currentModuleId: typeof parsed.currentModuleId === "string" ? parsed.currentModuleId : "3.1",
      currentStepIndex:
        Number.isInteger(parsed.currentStepIndex) && parsed.currentStepIndex
          ? Math.max(0, parsed.currentStepIndex)
          : 0,
      currentTopic: typeof parsed.currentTopic === "string" ? parsed.currentTopic : "",
    };
  } catch {
    return emptyProgress();
  }
}

export function readLearningEvidence(): LearningEvidence {
  const { sectionsCompleted, questionsPassed, challengesPassed } = readLearningProgress();
  return { sectionsCompleted, questionsPassed, challengesPassed };
}

export function recordLearningEvidence(delta: Partial<LearningEvidence>) {
  const current = readLearningProgress();
  const next = {
    ...current,
    sectionsCompleted: current.sectionsCompleted + (delta.sectionsCompleted ?? 0),
    questionsPassed: current.questionsPassed + (delta.questionsPassed ?? 0),
    challengesPassed: current.challengesPassed + (delta.challengesPassed ?? 0),
  };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
  return readLearningProgress();
}

export function updateLearningPosition(
  position: Pick<LearningProgress, "currentModuleId" | "currentStepIndex" | "currentTopic">,
) {
  const current = readLearningProgress();
  if (
    current.currentModuleId === position.currentModuleId &&
    current.currentStepIndex === position.currentStepIndex &&
    current.currentTopic === position.currentTopic
  ) {
    return current;
  }
  const next = { ...current, ...position };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
  return next;
}

export function completeLearningModule(moduleId: string, sectionsCompleted: number) {
  const current = readLearningProgress();
  const isNewModule = !current.completedModuleIds.includes(moduleId);
  const completedModuleIds = Array.from(new Set([...current.completedModuleIds, moduleId]));
  const nextIncomplete = curriculumModules.find(
    (module) => !completedModuleIds.includes(module.code),
  );
  const next = {
    ...current,
    sectionsCompleted: current.sectionsCompleted + (isNewModule ? sectionsCompleted : 0),
    completedModuleIds,
    currentModuleId: nextIncomplete?.code ?? moduleId,
    currentStepIndex: 0,
    currentTopic: "",
  };
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
  return next;
}

export type ContinueLearningSearch = {
  module: CurriculumModule["code"];
  step: number;
};

export type LearningProgressSummary = {
  completedCount: number;
  totalModules: number;
  progressPercent: number;
  currentModule: CurriculumModule;
  currentStepTitle: string;
  currentStepStage: string;
  recentlyCompleted: CurriculumModule[];
  nextModule: CurriculumModule;
  continueSearch: ContinueLearningSearch;
};

export function getLearningProgressSummary(progress: LearningProgress): LearningProgressSummary {
  const completedModules = curriculumModules.filter((module) =>
    progress.completedModuleIds.includes(module.code),
  );
  const firstIncomplete =
    curriculumModules.find((module) => !progress.completedModuleIds.includes(module.code)) ??
    curriculumModules[0]!;
  const currentModule =
    curriculumModules.find(
      (module) =>
        module.code === progress.currentModuleId &&
        !progress.completedModuleIds.includes(module.code),
    ) ?? firstIncomplete;
  const stepIndex = currentModule.code === progress.currentModuleId ? progress.currentStepIndex : 0;
  const experience = getLearningExperience(currentModule.code);
  const currentStep = experience.steps[stepIndex] ?? experience.steps[0]!;

  return {
    completedCount: completedModules.length,
    totalModules: CURRICULUM_MODULE_COUNT,
    progressPercent: Math.round((completedModules.length / CURRICULUM_MODULE_COUNT) * 100),
    currentModule,
    currentStepTitle: progress.currentTopic || currentStep.title,
    currentStepStage: currentStep.stage,
    recentlyCompleted: completedModules.slice(-3).reverse(),
    nextModule: firstIncomplete,
    continueSearch: { module: currentModule.code, step: stepIndex },
  };
}

export function useLearningEvidence() {
  const progress = useLearningProgress();
  return {
    sectionsCompleted: progress.sectionsCompleted,
    questionsPassed: progress.questionsPassed,
    challengesPassed: progress.challengesPassed,
  };
}

export function useLearningProgress() {
  const [progress, setProgress] = React.useState<LearningProgress>(emptyProgress);

  React.useEffect(() => {
    const refresh = () => setProgress(readLearningProgress());
    refresh();
    window.addEventListener(CHANGE_EVENT, refresh);
    return () => window.removeEventListener(CHANGE_EVENT, refresh);
  }, []);

  return progress;
}

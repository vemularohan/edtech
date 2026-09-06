import * as React from "react";
import { curriculumModules, type CurriculumModule, type ConceptItem } from "./curriculum-data";
import { getLearningExperience } from "./learning-experiences";

export const CURRICULUM_MODULE_COUNT = curriculumModules.length;

export type LearningState =
  | "NOT_STARTED"
  | "LEARNING"
  | "PRACTICING"
  | "NEEDS_REVIEW"
  | "READY_FOR_CHALLENGE"
  | "MASTERED";

export type ConceptProgress = {
  conceptId: string;
  status: LearningState;
  lessonViewed: boolean;
  practiceCompleted: boolean;
  knowledgeCheckScore: number; // 0-100
  breakItCompleted: boolean;
  yourTurnCompleted: boolean;
  challengeCompleted: boolean;
  attempts: number;
  lastActivity: string;
};

export type LearningEvidence = {
  sectionsCompleted: number;
  questionsPassed: number;
  challengesPassed: number;
};

export type LearningProgress = LearningEvidence & {
  completedModuleIds: string[];
  moduleStates: Record<string, LearningState>;
  conceptProgressMap: Record<string, ConceptProgress>;
  currentModuleId: string;
  currentConceptId: string;
  currentStepIndex: number;
  currentTopic: string;
};

const STORAGE_KEY = "ai-skills-track.learning-progress-v2";
const LEGACY_STORAGE_KEY = "ai-skills-track.learning-progress";
const CHANGE_EVENT = "ai-skills-track.progress-change";

function emptyProgress(): LearningProgress {
  return {
    sectionsCompleted: 0,
    questionsPassed: 0,
    challengesPassed: 0,
    completedModuleIds: [],
    moduleStates: { "3.1": "LEARNING" },
    conceptProgressMap: {},
    currentModuleId: "3.1",
    currentConceptId: "3.1-c1",
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
    const completedModuleIds = Array.isArray(parsed.completedModuleIds)
      ? parsed.completedModuleIds.filter((id): id is string => typeof id === "string")
      : [];
    const moduleStates = (parsed.moduleStates as Record<string, LearningState>) ?? {};
    completedModuleIds.forEach((id) => {
      moduleStates[id] = "MASTERED";
    });

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
      completedModuleIds,
      moduleStates,
      conceptProgressMap: (parsed.conceptProgressMap as Record<string, ConceptProgress>) ?? {},
      currentModuleId: typeof parsed.currentModuleId === "string" ? parsed.currentModuleId : "3.1",
      currentConceptId: typeof parsed.currentConceptId === "string" ? parsed.currentConceptId : "3.1-c1",
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

export function recordConceptActivity(
  conceptId: string,
  update: Partial<ConceptProgress>,
  moduleCode: string,
) {
  const current = readLearningProgress();
  const existing = current.conceptProgressMap[conceptId] ?? {
    conceptId,
    status: "LEARNING",
    lessonViewed: true,
    practiceCompleted: false,
    knowledgeCheckScore: 0,
    breakItCompleted: false,
    yourTurnCompleted: false,
    challengeCompleted: false,
    attempts: 0,
    lastActivity: new Date().toISOString(),
  };

  const updatedConcept: ConceptProgress = {
    ...existing,
    ...update,
    attempts: existing.attempts + 1,
    lastActivity: new Date().toISOString(),
  };

  if (
    updatedConcept.knowledgeCheckScore >= 80 &&
    updatedConcept.breakItCompleted &&
    updatedConcept.yourTurnCompleted
  ) {
    updatedConcept.status = "MASTERED";
  } else if (updatedConcept.knowledgeCheckScore > 0 && updatedConcept.knowledgeCheckScore < 80) {
    updatedConcept.status = "NEEDS_REVIEW";
  } else if (updatedConcept.practiceCompleted || updatedConcept.breakItCompleted) {
    updatedConcept.status = "PRACTICING";
  } else {
    updatedConcept.status = "LEARNING";
  }

  const nextConceptMap = {
    ...current.conceptProgressMap,
    [conceptId]: updatedConcept,
  };

  const mod = curriculumModules.find((m) => m.code === moduleCode);
  let nextModState: LearningState = current.moduleStates[moduleCode] ?? "LEARNING";
  if (mod) {
    const conceptStates = mod.concepts.map((c) => nextConceptMap[c.id]?.status ?? "NOT_STARTED");
    if (conceptStates.every((s) => s === "MASTERED")) {
      nextModState = "READY_FOR_CHALLENGE";
    } else if (conceptStates.some((s) => s === "NEEDS_REVIEW")) {
      nextModState = "NEEDS_REVIEW";
    } else if (conceptStates.some((s) => s === "PRACTICING" || s === "LEARNING")) {
      nextModState = "LEARNING";
    }
  }

  const next = {
    ...current,
    conceptProgressMap: nextConceptMap,
    moduleStates: {
      ...current.moduleStates,
      [moduleCode]: nextModState,
    },
  };

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }
  return next;
}

export function updateLearningPosition(
  position: Pick<LearningProgress, "currentModuleId" | "currentStepIndex" | "currentTopic"> & {
    currentConceptId?: string | undefined;
  },
) {
  const current = readLearningProgress();
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
    moduleStates: {
      ...current.moduleStates,
      [moduleId]: "MASTERED" as LearningState,
    },
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
  conceptId?: string | undefined;
};

export type LearningProgressSummary = {
  completedCount: number;
  totalModules: number;
  progressPercent: number;
  currentModule: CurriculumModule;
  currentConcept?: ConceptItem | undefined;
  currentStepTitle: string;
  currentStepStage: string;
  recentlyCompleted: CurriculumModule[];
  nextModule: CurriculumModule;
  continueSearch: ContinueLearningSearch;
  moduleState: LearningState;
  masteredConceptsCount: number;
  reviewConceptsCount: number;
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

  const currentConcept =
    currentModule.concepts.find((c) => c.id === progress.currentConceptId) ??
    currentModule.concepts[0];

  const stepIndex = currentModule.code === progress.currentModuleId ? progress.currentStepIndex : 0;
  const experience = getLearningExperience(currentModule.code);
  const currentStep = experience.steps[stepIndex] ?? experience.steps[0]!;

  const moduleState = progress.moduleStates[currentModule.code] ?? (
    progress.completedModuleIds.includes(currentModule.code) ? "MASTERED" : "LEARNING"
  );

  let masteredConceptsCount = 0;
  let reviewConceptsCount = 0;

  Object.values(progress.conceptProgressMap).forEach((cp) => {
    if (cp.status === "MASTERED") masteredConceptsCount++;
    if (cp.status === "NEEDS_REVIEW") reviewConceptsCount++;
  });

  return {
    completedCount: completedModules.length,
    totalModules: CURRICULUM_MODULE_COUNT,
    progressPercent: Math.round((completedModules.length / CURRICULUM_MODULE_COUNT) * 100),
    currentModule,
    currentConcept,
    currentStepTitle: currentConcept ? currentConcept.title : progress.currentTopic || currentStep.title,
    currentStepStage: currentStep.stage,
    recentlyCompleted: completedModules.slice(-3).reverse(),
    nextModule: firstIncomplete,
    continueSearch: { module: currentModule.code, step: stepIndex, conceptId: currentConcept?.id },
    moduleState,
    masteredConceptsCount,
    reviewConceptsCount,
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
  const [progress, setProgress] = React.useState<LearningProgress>(readLearningProgress);

  React.useEffect(() => {
    const refresh = () => setProgress(readLearningProgress());
    refresh();
    window.addEventListener(CHANGE_EVENT, refresh);
    return () => window.removeEventListener(CHANGE_EVENT, refresh);
  }, []);

  return progress;
}

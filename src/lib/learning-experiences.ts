import { allCurriculumChallenges } from "./codepath-data";
import { curriculumModules, type CurriculumModule } from "./curriculum-data";
import { module31Content } from "./module-3-1-content";

export type LearningStepStage =
  | "HOOK"
  | "WHY"
  | "LEARN"
  | "TRY IT"
  | "PRACTICE"
  | "BREAK IT"
  | "YOUR TURN"
  | "KNOWLEDGE CHECK"
  | "MASTERY"
  | "NEXT";

export type LearningStep = {
  id: string;
  stage: LearningStepStage;
  title: string;
  explanation: string;
  whyItMatters: string;
  example: string;
  interaction: "inspect" | "edit" | "choose" | "order";
  prompt: string;
  options?: string[];
  answer?: string;
  fixedCode?: string;
  misconceptionExpl?: string;
  blocks?: { title: string; body: string; insight?: string }[];
};

export type LearningSection = {
  id: string;
  concept: string;
  title: string;
  explanation: string;
  whyItMatters: string;
  example: string;
  practicePrompt: string;
};

export type LearningExperience = {
  module: CurriculumModule;
  learningSections: LearningSection[];
  steps: LearningStep[];
  challenge: (typeof allCurriculumChallenges)[number];
};

function firstItem<T>(items: readonly T[], label: string): T {
  const item = items[0];
  if (item === undefined) {
    throw new Error(`Missing ${label}`);
  }
  return item;
}

function correctChoice<T extends { text: string; isCorrect?: boolean }>(
  options: readonly T[],
  label: string,
): T {
  const chosen = options.find((option) => option.isCorrect) ?? options[0];
  if (chosen === undefined) {
    throw new Error(`Missing ${label}`);
  }
  return chosen;
}

const examples: Record<string, { explanation: string; example: string; prompt: string }> = {
  "3.1": {
    explanation:
      "Python foundations are the habits you reuse in every later module: readable functions, JSON-shaped data, files, and isolated environments.",
    example: `import json\nfrom pathlib import Path\n\ndata = json.loads(Path("items.json").read_text())\nkept = [row for row in data if row.get("status") == "ok"]`,
    prompt: "Why should this project use a virtual environment?",
  },
  "3.2": {
    explanation:
      "Choose the right technique: a classifier, an LLM prompt, retrieval, or an agent. Tokens, context windows, and hallucination are design constraints.",
    example: "private PDF → needs RAG\nfixed categories → maybe a classifier\nmulti-step tools → a bounded agent",
    prompt: "If the model must answer from internal documents, what is missing from a plain chatbot?",
  },
  "3.3": {
    explanation:
      "An LLM API is HTTP plus JSON: authenticate, send messages, stream tokens, and log usage. Secrets never belong in source control.",
    example: `POST /v1/chat/completions\nAuthorization: Bearer $API_KEY\n{"model": "...", "messages": [...], "stream": true}`,
    prompt: "Where should the API key live in a deployed application?",
  },
  "3.4": {
    explanation:
      "Prompts are designed interfaces: role, task, context, constraints, and output format. Structured JSON is the backbone of tools and UIs.",
    example: `system: "Return JSON matching the schema"\ntemperature: 0.2\noutput: {"priority":"high","reason":"..."}`,
    prompt: "What should the application do before using an LLM JSON response?",
  },
  "3.7": {
    explanation:
      "RAG grounds generation in retrieved documents: ingest, chunk, embed, retrieve, inject context, then generate with citations.",
    example: "document → chunks → embeddings → vector search → context → cited answer",
    prompt: "If the correct document was never retrieved, where should you debug first?",
  },
  "3.8": {
    explanation:
      "Production RAG competes on retrieval quality: hybrid search, query rewriting, re-ranking, abstention, and evaluation — not another wrapper library.",
    example: "query → BM25 + vectors → fuse → re-rank → generate → score faithfulness",
    prompt: "What should a RAG system do when retrieved context is too weak?",
  },
  "3.10": {
    explanation:
      "An agent is a controlled loop: observe, think, act, and stop — with a goal, tools, memory, and a step budget.",
    example: "goal → plan → search tool → observation → revise plan → stop",
    prompt: "What should an agent record after a tool call?",
  },
  "3.11": {
    explanation:
      "Tools are small, well-specified functions. Validate arguments, feed results back, and require confirmation before side effects.",
    example: "model proposes lookup(query) → your code runs it → tool result → next step",
    prompt: "What should happen before an agent sends email or writes data?",
  },
  "3.14": {
    explanation:
      "Security copilots triage and summarize. They do not replace access control or human judgment, and they must not execute remediations unsupervised.",
    example: "alert → summarize with sources → human approval → optional playbook",
    prompt: "What should happen to an instruction found inside untrusted retrieved text?",
  },
  "3.17": {
    explanation:
      "Production AI needs secrets, tracing, guardrails, prompt-injection defenses, and a cost budget — not only a working notebook.",
    example: "gateway → app → model + vector store → logs/traces → rate limits",
    prompt: "Which control stops unbounded token spend on a chat feature?",
  },
  "3.18": {
    explanation:
      "Portfolio quality beats project count. A RAG system with an evaluation table outperforms six unmaintained demos.",
    example: "chatbot · semantic search · PDF RAG · tool agent · automation · multi-agent",
    prompt: "Which artifact best proves a RAG project is trustworthy?",
  },
};

function createExperience(moduleId: `3.${number}`): LearningExperience {
  const module = curriculumModules.find((item) => item.code === moduleId);
  if (!module) throw new Error(`Unknown curriculum module: ${moduleId}`);
  const challenge = allCurriculumChallenges.find((item) => item.moduleId === module.code);
  if (!challenge) throw new Error(`No challenge configured for curriculum module: ${module.code}`);

  if (moduleId === "3.1") {
    const c = module31Content;
    const hookChoice = firstItem(c.hook.incidentScenario.predictionOptions, "module 01 hook option");
    const tryChoice = firstItem(c.tryIt.predictionOptions, "module 01 try-it option");
    const practiceActivity = firstItem(c.practice.activities, "module 01 practice activity");
    const practiceCorrect = correctChoice(practiceActivity.options, "module 01 practice answer");
    const breakCorrect = correctChoice(c.breakIt.question1.options, "module 01 break-it answer");
    const yourTurnCorrect = correctChoice(c.yourTurn.options, "module 01 your-turn answer");
    const knowledgeQuestion = firstItem(c.knowledgeCheck.questions, "module 01 knowledge-check question");
    const knowledgeCorrect = correctChoice(knowledgeQuestion.options, "module 01 knowledge-check answer");
    const learningSections = module.topics.map((concept, index) => ({
      id: `${module.code}-concept-${index + 1}`,
      concept,
      title: `Understand ${concept}`,
      explanation: c.teach.pillars[index]?.explanation ?? `Learn how ${concept} works.`,
      whyItMatters: c.teach.pillars[index]?.keyInsight ?? `${concept} is vital for code literacy.`,
      example: c.teach.pillars[index]?.example ?? c.tryIt.code,
      practicePrompt: `Apply ${concept} to verify AI output logic.`,
    }));

    return {
      module,
      learningSections,
      challenge,
      steps: [
        {
          id: "3.1-hook",
          stage: "HOOK",
          title: c.hook.title,
          explanation: `${c.hook.incidentScenario.missionTitle}\n\nExpected: ${c.hook.incidentScenario.expectedBehavior}\nActual: ${c.hook.incidentScenario.actualBehavior}`,
          whyItMatters: "Forming a testable hypothesis before looking at the fix primes your analytical intuition.",
          example: c.hook.incidentScenario.code,
          interaction: "choose",
          prompt: c.hook.incidentScenario.prompt,
          options: c.hook.incidentScenario.predictionOptions.map((o) => o.text),
          answer: hookChoice.text,
          misconceptionExpl: hookChoice.feedback,
        },
        {
          id: "3.1-why",
          stage: "WHY",
          title: c.why.title,
          explanation: c.why.practicalProblem,
          whyItMatters: c.why.coreTakeaways.join("\n• "),
          example: `# Core Philosophy:\n• ${c.why.coreTakeaways.join("\n• ")}`,
          interaction: "inspect",
          prompt: "Why is code understanding essential when AI can write code?",
        },
        {
          id: "3.1-learn",
          stage: "LEARN",
          title: "Python foundations for AI work",
          explanation:
            "Every LLM integration, RAG pipeline, and agent tool is Python. This lesson trains the habits you will reuse: readable functions, JSON-shaped data, files, and isolated environments.",
          whyItMatters:
            "Weak foundations show up later as messy prompts in scripts, broken JSON parsing, and environments that cannot be reproduced.",
          example: c.teach.pillars.map((p) => `# ${p.title}\n${p.example}`).join("\n\n"),
          interaction: "inspect",
          prompt: "Read each topic, then look at the example before you move on.",
          blocks: c.teach.pillars.map((p) => ({
            title: p.title,
            body: p.explanation,
            insight: p.keyInsight,
          })),
        },
        {
          id: "3.1-try",
          stage: "TRY IT",
          title: c.tryIt.title,
          explanation: `${c.tryIt.revelation.predictionSummary}\n\nWhy: ${c.tryIt.revelation.why}\n\nTask: ${c.tryIt.revelation.modificationTask}`,
          whyItMatters: "Tracing code line-by-line reveals boolean operator behavior before runtime execution.",
          example: c.tryIt.code,
          interaction: "choose",
          prompt: c.tryIt.prompt,
          options: c.tryIt.predictionOptions.map((o) => o.text),
          answer: tryChoice.text,
          misconceptionExpl: tryChoice.feedback,
        },
        {
          id: "3.1-practice",
          stage: "PRACTICE",
          title: practiceActivity.title,
          explanation: "Practice activities to build code reading and defect identification habits.",
          whyItMatters: "Scaffolded practice bridges active reading with independent code review.",
          example: practiceActivity.code,
          interaction: "choose",
          prompt: practiceActivity.prompt,
          options: practiceActivity.options.map((o) => o.text),
          answer: practiceCorrect.text,
          misconceptionExpl: practiceCorrect.feedback,
        },
        {
          id: "3.1-break",
          stage: "BREAK IT",
          title: c.breakIt.title,
          explanation: `Subtle Failure: ${c.breakIt.subtleBugDescription}\n\nHints:\n• ${c.breakIt.progressiveHints.join("\n• ")}`,
          whyItMatters: "Senior engineers are defined by their ability to spot inverted conditional logic in critical code path boundaries.",
          example: c.breakIt.brokenCode,
          interaction: "choose",
          prompt: c.breakIt.question1.prompt,
          options: c.breakIt.question1.options.map((o) => o.text),
          answer: breakCorrect.text,
          fixedCode: c.fixIt.fixedCode,
          misconceptionExpl: `What Broke: ${c.fixIt.postFixExplanation.whatBroke}\nWhy It Broke: ${c.fixIt.postFixExplanation.whyItBroke}\nWhy Fix Works: ${c.fixIt.postFixExplanation.whyFixWorks}`,
        },
        {
          id: "3.1-your-turn",
          stage: "YOUR TURN",
          title: c.yourTurn.title,
          explanation: `${c.yourTurn.taskPrompt}\n\nExpected Goal: ${c.yourTurn.expectedGoal}\n\nIdentified Defect: ${c.yourTurn.bugSummary}`,
          whyItMatters: "Independent AI code review evaluates your ability to spot flat discount vs percentage bugs in generated code.",
          example: c.yourTurn.aiGeneratedCode,
          interaction: "choose",
          prompt: "Select the correct code modification to fix the e-commerce coupon bug:",
          options: c.yourTurn.options.map((o) => o.text),
          answer: yourTurnCorrect.text,
          fixedCode: c.yourTurn.fixedCode,
          misconceptionExpl: yourTurnCorrect.feedback,
        },
        {
          id: "3.1-check",
          stage: "KNOWLEDGE CHECK",
          title: "Diagnostic Knowledge Check",
          explanation: "Assess your conceptual understanding across output prediction, logic debugging, and engineering reasoning.",
          whyItMatters: "Diagnostic checks confirm you have internalized why code reading improves vibe coding.",
          example: knowledgeQuestion.code ?? c.yourTurn.fixedCode,
          interaction: "choose",
          prompt: knowledgeQuestion.question,
          options: knowledgeQuestion.options.map((o) => o.text),
          answer: knowledgeCorrect.text,
          misconceptionExpl: knowledgeCorrect.explanation,
        },
        {
          id: "3.1-mastery",
          stage: "MASTERY",
          title: "Mastery Assessment: Module 01",
          explanation: "Mastery criteria checklist backed by evidence:\n• Completed Hook Prediction\n• Validated Try It & Practice\n• Repaired Inverted Rate Limiter Bug\n• Completed Independent Code Review\n• Passed Knowledge Check",
          whyItMatters: "Mastery is granted only after evidence is produced.",
          example: c.mastery.finalEvidencePrompt,
          interaction: "inspect",
          prompt: "Confirm your evidence readiness for Module 01 Mastery.",
        },
        {
          id: "3.1-next",
          stage: "NEXT",
          title: "Next Module: AI & Generative AI Fundamentals",
          explanation: "You have completed Module 01. Continue to Module 02 to map AI, ML, deep learning, and generative models before you write more code.",
          whyItMatters: "Conceptual clarity stops you from using an LLM where a classifier or RAG system is the right tool.",
          example: "Module 02 → AI & Generative AI Fundamentals",
          interaction: "inspect",
          prompt: "Proceed to Challenge Lab or Module 02.",
        },
      ],
    };
  }

  const focused = examples[module.code] ?? {
    explanation: `${module.description} Work through the concepts in order, then apply them to a small, observable AI system.`,
    example: `${module.topics.slice(0, 4).join(" → ")}\n\nUse the first concept to make the next one measurable.`,
    prompt: `Which evidence would show that you understand ${module.topics[0]}?`,
  };
  const [first, second, third, fourth] = module.topics;
  const options = [
    `Inspect evidence for ${first}`,
    `Apply ${second ?? first} to a small example`,
    "Skip validation and trust the first output",
  ];
  const learningSections = module.topics.map((concept, index) => ({
    id: `${module.code}-concept-${index + 1}`,
    concept,
    title: `Understand ${concept}`,
    explanation: `Learn how ${concept} works in ${module.title}, then connect it to the observable result of the workflow.`,
    whyItMatters: `${concept} is part of the prerequisite chain for the module's project and challenge.`,
    example:
      index === 0
        ? focused.example
        : `${module.topics[index - 1]} → ${concept} → measurable result`,
    practicePrompt: `Change one input that exercises ${concept} and describe the result.`,
  }));
  return {
    module,
    learningSections,
    challenge,
    steps: [
      {
        id: `${module.code}-hook`,
        stage: "HOOK",
        title: focused.prompt,
        explanation: `Make an initial prediction before looking at the implementation. How would you solve this challenge in ${module.title}?`,
        whyItMatters: `Forming a testable hypothesis before reading the solution engages active recall and primes your intuition.`,
        example: focused.example,
        interaction: "choose",
        prompt: focused.prompt,
        options,
        answer: options[0] ?? `Inspect evidence for ${first}`,
      },
      {
        id: `${module.code}-why`,
        stage: "WHY",
        title: `Why ${first} matters in AI systems`,
        explanation: `In production AI architectures, ${first} exists because developers must guarantee deterministic boundaries around probabilistic model behavior. Without ${first}, errors propagate silently through downstream pipeline stages.`,
        whyItMatters: `Understanding why ${first} is required turns a syntax chore into an architectural decision you can defend.`,
        example: `${module.topics.slice(0, 4).join(" ➔ ")}\n\nGoal: Ensure valid data transformations before model inference.`,
        interaction: "inspect",
        prompt: `Why do engineers prioritize ${first} early in the lifecycle?`,
      },
      {
        id: `${module.code}-learn`,
        stage: "LEARN",
        title: `Core Concept: ${first}`,
        explanation: focused.explanation,
        whyItMatters: `Deep understanding of ${first} allows you to debug unexpected runtime errors and adapt code across diverse tech stacks.`,
        example: focused.example,
        interaction: "inspect",
        prompt: `In your own words, what role does ${first} play in ${module.title}?`,
      },
      {
        id: `${module.code}-try`,
        stage: "TRY IT",
        title: `Interactive Lab: Experiment with ${first}`,
        explanation: `Run a small controlled experiment. Inspect the input parameters, observe the output transformation, and test what happens when values shift.`,
        whyItMatters: `Interactive manipulation builds visceral comprehension faster than passive reading.`,
        example: focused.example,
        interaction: "edit",
        prompt: `Modify the input or formulate an experiment hypothesis for ${first}.`,
      },
      {
        id: `${module.code}-practice`,
        stage: "PRACTICE",
        title: `Guided Practice: Implementing ${first}`,
        explanation: `Practice applying ${first} to a realistic scenario. Write or verify the logic that ensures the expected outcome is met.`,
        whyItMatters: `Scaffolded practice bridges the gap between passive observation and fully independent application.`,
        example: challenge.starterCode,
        interaction: "choose",
        prompt: `Which approach best implements the invariant for ${first}?`,
        options: [
          `Explicitly validate inputs and handle edge cases for ${first}`,
          `Ignore edge cases and hope the model handles it`,
          `Hardcode a fixed value without dynamic transformation`,
        ],
        answer: `Explicitly validate inputs and handle edge cases for ${first}`,
      },
      {
        id: `${module.code}-break`,
        stage: "BREAK IT",
        title: `Break It: Debugging & Edge Cases in ${first}`,
        explanation: `We have introduced an intentional bug or anti-pattern. Predict what will fail, observe the error trace, and apply the fix.`,
        whyItMatters: `Senior engineers are defined by their ability to anticipate failure modes and restore invariants.`,
        example: challenge.tests[0]?.input
          ? `# Buggy implementation example:\n${challenge.starterCode}\n# Fails on input:\n# ${challenge.tests[0].input}`
          : challenge.starterCode,
        interaction: "choose",
        prompt: `Predict which failure will occur when processing invalid or edge-case input for ${first}:`,
        options: [
          "Runtime TypeError / boundary failure on unexpected or missing input",
          "Visual CSS styling distortion",
          "Silent network disconnect",
        ],
        answer: "Runtime TypeError / boundary failure on unexpected or missing input",
        fixedCode: challenge.solution,
      },
      {
        id: `${module.code}-your-turn`,
        stage: "YOUR TURN",
        title: `Your Turn: Independent Application of ${first}`,
        explanation: `Now apply the concept independently without step-by-step scaffolding. Formulate your solution for ${challenge.title}.`,
        whyItMatters: `Independent transfer demonstrates genuine conceptual mastery rather than memorization.`,
        example: challenge.problem,
        interaction: "edit",
        prompt: `Explain your implementation approach and name the key invariant you will enforce for ${first}:`,
      },
      {
        id: `${module.code}-check`,
        stage: "KNOWLEDGE CHECK",
        title: `Knowledge Check: ${first} & ${second ?? "Architecture"}`,
        explanation: `Verify that you have internalized the core mechanism and trade-offs of ${module.title}.`,
        whyItMatters: `Diagnostic checks give immediate objective feedback on your understanding.`,
        example: `Evaluation Case: ${challenge.tests[0]?.input ?? "Standard input batch"} ➔ Expected: ${challenge.tests[0]?.expected ?? "Verified output"}`,
        interaction: "choose",
        prompt: `When implementing ${first} in production, what is the critical engineering safeguard?`,
        options: [
          `Validate and sanitize inputs before downstream processing`,
          `Disable error logging to improve speed`,
          `Assume all incoming payloads adhere to the happy path`,
          `Bypass validation whenever the client claims it is safe`,
        ],
        answer: `Validate and sanitize inputs before downstream processing`,
        misconceptionExpl: `In production AI systems, assuming inputs always follow the happy path leads to silent data corruption and unexpected hallucinations. Input sanitization is essential.`,
      },
      {
        id: `${module.code}-mastery`,
        stage: "MASTERY",
        title: `Mastery Assessment: ${module.title}`,
        explanation: `Review what you've learned, what you can build, and verify that all diagnostics have passed.`,
        whyItMatters: `Mastery is awarded only after demonstrating both theoretical comprehension and practical execution.`,
        example: `Completed Objectives:\n${module.learningObjectives.join("\n")}\n\nChallenge Invariant:\n${challenge.explanation}`,
        interaction: "inspect",
        prompt: `Confirm your readiness to tackle the independent challenge.`,
      },
      {
        id: `${module.code}-next`,
        stage: "NEXT",
        title: `Next Step: Challenge & Module Progression`,
        explanation: `You've completed the classroom loop! Now transition to the independent Challenge Lab to test your implementation against automated unit tests.`,
        whyItMatters: `Connecting classroom concepts directly to challenge labs turns knowledge into durable proof for your portfolio.`,
        example: challenge.solution,
        interaction: "inspect",
        prompt: `Proceed to Challenge Lab for Module ${module.code}.`,
      },
    ],
  };
}

export function getLearningExperience(moduleId: `3.${number}` = "3.1") {
  return createExperience(moduleId);
}

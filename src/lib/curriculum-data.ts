export type CurriculumStatus = "mastered" | "in-progress" | "available" | "locked";
export type ExperienceStage = "Understand" | "Apply" | "Build" | "Ship" | "Demonstrate";

export interface ConceptItem {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
}

export type CurriculumModule = {
  code: `3.${number}`;
  title: string;
  description: string;
  topics: string[];
  concepts: ConceptItem[];
  tools: string[];
  experienceStage: ExperienceStage;
  status: CurriculumStatus;
  learningObjectives: string[];
  lesson: string;
  project: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  prerequisites: string[];
  masteryCriteria: string[];
  nextRecommendedModuleCode: `3.${number}` | null;
  phase: string;
  week: string;
};

export const PROGRAM = {
  name: "GenAI Path",
  fullName: "Generative AI + Agentic AI + Python",
  edition: "16-week professional program · 2026",
  hours: "160+ guided hours",
  modules: 20,
  projects: 6,
  tracks: 4,
} as const;

export const PROGRAM_PHASES = [
  { name: "Foundations", focus: "Python, AI concepts, APIs, prompts", modules: "01–04", leaveAble: "Ship a scripted LLM chatbot" },
  { name: "Knowledge apps", focus: "App structure, embeddings, RAG", modules: "05–08", leaveAble: "Ship cited document Q&A" },
  { name: "Agents", focus: "LangChain, agents, graphs, teams", modules: "09–13", leaveAble: "Ship a tooled, bounded agent" },
  { name: "Domain & production", focus: "Security, robotics, careers, ops", modules: "14–17", leaveAble: "Talk production and risk" },
  { name: "Portfolio & career", focus: "Projects, assessment, jobs", modules: "18–20", leaveAble: "Interview with proof of work" },
] as const;

export const CAREER_ROLES = [
  {
    name: "GenAI Engineer",
    summary:
      "Owns LLM-powered features end to end: prompts, retrieval, evaluation, and integration with product backends. Strong overlap with Modules 03–09, 17, and the RAG/agent projects.",
  },
  {
    name: "AI Engineer",
    summary:
      "Broader applied AI: may include classical ML plus GenAI. Values Python, data pipelines, APIs, and production sense. This curriculum covers the GenAI half.",
  },
  {
    name: "Prompt Engineer",
    summary:
      "Designs, tests, and maintains prompts and evaluation sets, often with structured outputs and policy constraints. Most sustainable when combined with light engineering from Modules 04, 05, and 17.",
  },
  {
    name: "AI Product Developer",
    summary:
      "Shapes user journeys, conversation design, and MVP scope for AI features. Modules 05, 10–13, 16, and 20 plus a polished demo are the core.",
  },
] as const;

export function displayModuleLabel(code: string) {
  const n = Number(String(code).split(".")[1] ?? String(code).replace(/\D/g, ""));
  return Number.isFinite(n) && n > 0 ? String(n).padStart(2, "0") : code;
}

type RawModule = {
  title: string;
  description: string;
  topics: string[];
  tools: string[];
  experienceStage: ExperienceStage;
  phase: string;
  week: string;
  hours: string;
  objectives: string[];
  practice: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
};

const rawModules: RawModule[] = [
  {
    title: "Python Foundations for AI",
    description:
      "Build the programming discipline required for AI development: clean syntax, structured programs, reliable data handling, and a professional Python workflow.",
    topics: [
      "variables and types",
      "control flow",
      "functions and modules",
      "lists tuples sets dicts",
      "file handling",
      "JSON",
      "virtual environments",
      "pip and requirements",
    ],
    tools: ["Python 3", "venv", "pip"],
    experienceStage: "Apply",
    phase: "Foundations",
    week: "Week 1–2",
    hours: "12 hours",
    objectives: [
      "Write structured, readable Python with functions and modules.",
      "Load, transform, and save data in text and JSON.",
      "Create a virtual environment and install pinned packages.",
    ],
    practice: "CLI utility that reads JSON, filters items, writes a report, and logs errors.",
    difficulty: "Beginner",
  },
  {
    title: "AI & Generative AI Fundamentals",
    description:
      "Build a durable map of the AI landscape so you choose the right technique instead of treating every problem as a chatbot.",
    topics: [
      "AI overview",
      "ML vs DL vs GenAI",
      "real-world applications",
      "neural network basics",
      "large language models",
      "tokens and context window",
      "hallucination and bias",
    ],
    tools: ["None required"],
    experienceStage: "Understand",
    phase: "Foundations",
    week: "Week 2–3",
    hours: "8 hours",
    objectives: [
      "Explain AI, ML, DL, and GenAI to technical and business audiences.",
      "Reason about tokens, context limits, and inference trade-offs.",
      "Identify hallucination and bias risks before building a feature.",
    ],
    practice: "One-page system brief: pick a business problem and argue ML vs LLM vs RAG vs agent.",
    difficulty: "Beginner",
  },
  {
    title: "APIs & LLM Integration (Python)",
    description:
      "Talk to AI models as a programmer: HTTP, authentication, JSON payloads, streaming, and generation parameters.",
    topics: [
      "REST and JSON",
      "Python HTTP clients",
      "LLM API usage",
      "prompt-based chat",
      "streaming responses",
      "temperature and max tokens",
    ],
    tools: ["Python", "requests / httpx", "LLM API"],
    experienceStage: "Build",
    phase: "Foundations",
    week: "Week 3–4",
    hours: "10 hours",
    objectives: [
      "Call an LLM from Python and handle success, streaming, and errors.",
      "Tune generation parameters with intention.",
      "Keep API keys out of source control.",
    ],
    practice: "Command-line chat that streams replies, logs token usage, and accepts temperature as a flag.",
    difficulty: "Beginner",
  },
  {
    title: "Prompt Engineering",
    description:
      "Treat prompts as designed interfaces: instructions, context, constraints, and output contracts that are testable and reusable.",
    topics: [
      "prompt fundamentals",
      "zero-shot and few-shot",
      "role-based prompting",
      "chain-of-thought",
      "structured JSON output",
      "prompt templates",
      "prompt optimization",
    ],
    tools: ["LLM API", "prompt files"],
    experienceStage: "Apply",
    phase: "Foundations",
    week: "Week 4–5",
    hours: "8 hours",
    objectives: [
      "Design prompts with explicit roles, constraints, and output contracts.",
      "Apply zero-shot, few-shot, and structured-output techniques.",
      "Turn a working prompt into a maintainable template.",
    ],
    practice: "Prompt pack for support-ticket classification with validated JSON and five few-shot examples.",
    difficulty: "Beginner",
  },
  {
    title: "LLM Application Development",
    description:
      "Learn how AI products are structured as systems: message roles, conversation state, tools, and workflows.",
    topics: [
      "chat system architecture",
      "system user assistant roles",
      "conversation flow",
      "function calling concepts",
      "structured responses",
      "application workflows",
    ],
    tools: ["Python", "LLM API"],
    experienceStage: "Build",
    phase: "Knowledge apps",
    week: "Week 5–6",
    hours: "10 hours",
    objectives: [
      "Design a chat application with clear roles, state, and persistence.",
      "Explain tool calling as an application pattern.",
      "Map a user journey to an LLM workflow with explicit steps.",
    ],
    practice: "Stub a helpdesk assistant: system prompt, history store, and one ticket-lookup tool.",
    difficulty: "Intermediate",
  },
  {
    title: "Embeddings & Vector Databases",
    description:
      "Represent meaning as vectors so you can search by similarity. Generate embeddings, store them, and query with metadata filters.",
    topics: [
      "embeddings concept",
      "vector representation",
      "cosine and Euclidean search",
      "FAISS and Chroma",
      "metadata filtering",
    ],
    tools: ["FAISS", "Chroma", "embedding model"],
    experienceStage: "Build",
    phase: "Knowledge apps",
    week: "Week 6–7",
    hours: "8 hours",
    objectives: [
      "Generate embeddings and perform similarity search with a clear metric.",
      "Stand up a local vector index with FAISS or Chroma.",
      "Attach and filter on metadata during retrieval.",
    ],
    practice: "Index a folder of notes and return the top-5 similar passages with source filenames.",
    difficulty: "Intermediate",
  },
  {
    title: "Retrieval-Augmented Generation (RAG)",
    description:
      "Connect an LLM to external knowledge so answers can cite your documents. Implement ingest, chunk, embed, retrieve, and generate.",
    topics: [
      "RAG architecture",
      "PDF text and web ingestion",
      "chunking strategies",
      "retrieval pipelines",
      "context injection",
    ],
    tools: ["Python", "vector store", "LLM API"],
    experienceStage: "Build",
    phase: "Knowledge apps",
    week: "Week 7–8",
    hours: "10 hours",
    objectives: [
      "Build an end-to-end RAG path from documents to cited answers.",
      "Choose chunking and top-k settings with an explicit rationale.",
      "Prompt the model to stay grounded in retrieved context.",
    ],
    practice: "PDF Q&A over a public report with citations and page-level metadata.",
    difficulty: "Intermediate",
  },
  {
    title: "Advanced RAG Systems",
    description:
      "Raise RAG from a demo to something you would trust in a review: hybrid retrieval, query rewriting, re-ranking, and evaluation.",
    topics: [
      "hybrid search",
      "query rewriting",
      "re-ranking",
      "context optimization",
      "hallucination reduction",
      "evaluation metrics",
    ],
    tools: ["BM25", "cross-encoder", "eval set"],
    experienceStage: "Apply",
    phase: "Knowledge apps",
    week: "Week 8–9",
    hours: "8 hours",
    objectives: [
      "Sketch a hybrid retrieve → re-rank → generate pipeline.",
      "Reduce ungrounded answers with citations and abstention.",
      "Define a small evaluation set and score a RAG system honestly.",
    ],
    practice: "Add hybrid search or re-ranking to PDF Q&A and report faithfulness on 15 questions.",
    difficulty: "Intermediate",
  },
  {
    title: "LangChain (Framework)",
    description:
      "Use LangChain as a modular toolkit for prompts, chains, parsers, and retrievers — not as a mysterious monolith.",
    topics: [
      "prompt templates",
      "chains and workflows",
      "output parsers",
      "retrievers",
      "vector database integration",
    ],
    tools: ["LangChain", "Pydantic", "Chroma / FAISS"],
    experienceStage: "Build",
    phase: "Agents",
    week: "Week 9–10",
    hours: "10 hours",
    objectives: [
      "Assemble a reusable RAG or QA pipeline with templates, model, parser, and retriever.",
      "Debug a chain by inspecting intermediate messages.",
      "Decide when LangChain helps and when plain Python is clearer.",
    ],
    practice: "Port PDF Q&A into a LangChain pipeline with a JSON parser for {answer, citations[]}.",
    difficulty: "Intermediate",
  },
  {
    title: "AI Agents Fundamentals",
    description:
      "Understand systems that plan, use memory, and take actions toward a goal. Contrast agents with chatbots and RAG.",
    topics: [
      "agent concepts",
      "agent vs chatbot vs RAG",
      "planning memory tools",
      "observe-think-act loop",
      "decision-making systems",
    ],
    tools: ["Python", "LLM API"],
    experienceStage: "Understand",
    phase: "Agents",
    week: "Week 10–11",
    hours: "8 hours",
    objectives: [
      "Define an agent with goal, loop, tools, memory, and stop conditions.",
      "Choose chatbot, RAG, or agent for a given product requirement.",
      "Sketch an observe–think–act loop with failure paths.",
    ],
    practice: "Stub a research agent with max 5 steps, a search tool, and a final summary.",
    difficulty: "Intermediate",
  },
  {
    title: "Agents with Tools",
    description:
      "Give agents the ability to act: APIs, search, and databases via function calling with strict arguments and safe defaults.",
    topics: [
      "tool usage",
      "API search and database tools",
      "function calling",
      "task execution strategies",
    ],
    tools: ["LLM function calling", "mock APIs"],
    experienceStage: "Build",
    phase: "Agents",
    week: "Week 11–12",
    hours: "8 hours",
    objectives: [
      "Implement function calling with validated arguments.",
      "Design a small toolbelt with clear descriptions.",
      "Apply a confirmation step before any side-effecting action.",
    ],
    practice: "Agent that looks up weather (or a mock API) and a local FAQ, then answers mixed questions.",
    difficulty: "Intermediate",
  },
  {
    title: "LangGraph (Advanced Workflows)",
    description:
      "Model complex agent behavior as an explicit graph: nodes, edges, shared state, branches, and human approval.",
    topics: [
      "graph-based workflows",
      "nodes edges and state",
      "conditional routing",
      "multi-step reasoning",
      "human-in-the-loop",
    ],
    tools: ["LangGraph"],
    experienceStage: "Build",
    phase: "Agents",
    week: "Week 12–13",
    hours: "10 hours",
    objectives: [
      "Implement a small graph with state, two branches, and a terminal node.",
      "Add a human-approval interrupt on a sensitive action.",
      "Explain why explicit graphs are easier to test than free-form agents.",
    ],
    practice: "Graph: retrieve → generate → if not grounded, rewrite query (max 2 loops), else return.",
    difficulty: "Advanced",
  },
  {
    title: "Multi-Agent Systems",
    description:
      "Scale beyond one agent by splitting roles: researcher, writer, reviewer, supervisor. Design collaboration and handoff rules.",
    topics: [
      "single vs multi-agent",
      "agent collaboration",
      "task delegation",
      "supervisor agents",
      "distributed workflows",
    ],
    tools: ["LangGraph", "CrewAI"],
    experienceStage: "Build",
    phase: "Agents",
    week: "Week 13–14",
    hours: "8 hours",
    objectives: [
      "Design a supervisor-plus-specialists architecture with stop conditions.",
      "Implement a two-agent critique loop with a round limit.",
      "Justify multi-agent vs single-agent for a given use case.",
    ],
    practice: "Supervisor routes math vs docs questions to two specialists and returns one fused answer.",
    difficulty: "Advanced",
  },
  {
    title: "AI in Cybersecurity",
    description:
      "Apply AI as a defensive accelerator: detecting suspicious patterns, supporting analysts, and automating repetitive security operations.",
    topics: [
      "threat detection",
      "fraud detection",
      "anomaly detection",
      "security automation",
    ],
    tools: ["logs", "policy prompts"],
    experienceStage: "Understand",
    phase: "Domain & production",
    week: "Week 14",
    hours: "6 hours",
    objectives: [
      "Describe defensive AI use cases and failure modes.",
      "Design an analyst-assist workflow with mandatory human approval.",
      "State why prompt injection and data leakage matter in security copilots.",
    ],
    practice: "Alert-summarization assistant case study with sources, confidence, and no autonomous remediations.",
    difficulty: "Intermediate",
  },
  {
    title: "AI in Robotics",
    description:
      "Connect software intelligence to physical systems: sensing, decision, and actuation — and why the physical world is unforgiving compared to chat apps.",
    topics: [
      "robotics with AI",
      "intelligent automation",
      "decision-making in machines",
    ],
    tools: ["simulation concepts"],
    experienceStage: "Understand",
    phase: "Domain & production",
    week: "Week 15",
    hours: "4 hours",
    objectives: [
      "Map a robot skill to sense → decide → act with safety constraints.",
      "Explain the role and limits of LLMs in robotics stacks.",
    ],
    practice: "Warehouse picking assistant sketch: vision + planner + operator chat, with emergency stop outside the LLM.",
    difficulty: "Beginner",
  },
  {
    title: "AI Trends & Career Paths",
    description:
      "Place your skills in the job market: what roles exist, what they actually do, and how automation is changing work.",
    topics: [
      "future of AI",
      "industry trends",
      "job roles",
      "automation impact",
    ],
    tools: ["career map"],
    experienceStage: "Understand",
    phase: "Domain & production",
    week: "Week 15",
    hours: "4 hours",
    objectives: [
      "Name a target role and list the modules that map to its hiring bar.",
      "Discuss industry trends without hype or despair.",
    ],
    practice: "90-day personal skill plan aligned to one role, with two portfolio projects called out.",
    difficulty: "Beginner",
  },
  {
    title: "Production AI Systems",
    description:
      "Take applications from notebook to something operable: architecture, deployment, monitoring, safety, prompt-injection resistance, and cost control.",
    topics: [
      "production architecture",
      "deployment concepts",
      "monitoring and observability",
      "guardrails and safety",
      "prompt injection prevention",
      "cost optimization",
    ],
    tools: ["Docker", "secrets", "tracing"],
    experienceStage: "Ship",
    phase: "Domain & production",
    week: "Week 16",
    hours: "10 hours",
    objectives: [
      "Draw a production architecture for a RAG or agent app.",
      "List concrete guardrails including prompt-injection mitigations.",
      "Propose three cost controls for a chat feature with a monthly budget.",
    ],
    practice: "Production readiness checklist for PDF Q&A: secrets, tracing, evals, rate limits, fallback.",
    difficulty: "Advanced",
  },
  {
    title: "Projects (Portfolio)",
    description:
      "Convert module skills into inspectable proof of work: chatbot, semantic search, PDF RAG, tool-using agent, automation flow, and multi-agent system.",
    topics: [
      "LLM chatbot",
      "semantic search",
      "PDF RAG Q&A",
      "tool-using agent",
      "automation flow",
      "multi-agent system",
    ],
    tools: ["GitHub", "README", ".env.example"],
    experienceStage: "Ship",
    phase: "Portfolio & career",
    week: "Parallel from week 8",
    hours: "40+ hours",
    objectives: [
      "Complete three to five reproducible projects with pinned dependencies and no committed secrets.",
      "Include evals, traces, and honest failure analysis — not only happy-path demos.",
    ],
    practice: "Pin RAG and agent repos with architecture diagrams and a 90-second demo.",
    difficulty: "Advanced",
  },
  {
    title: "Assessments",
    description:
      "Verify skill, not attendance. Practical assignments, project reviews, and time-bounded exercises that mirror how engineers are screened.",
    topics: [
      "practical assignments",
      "project evaluations",
      "skill-based testing",
      "Gates A–D",
    ],
    tools: ["rubrics", "eval sheets"],
    experienceStage: "Demonstrate",
    phase: "Portfolio & career",
    week: "Ongoing between phases",
    hours: "Ongoing",
    objectives: [
      "Pass Gate A: working API chat + JSON prompt template.",
      "Pass Gate B: RAG demo with citations and a 15-question eval sheet.",
      "Pass Gate C: bounded agent with traces.",
      "Pass Gate D: portfolio review and a production checklist.",
    ],
    practice: "Live drill: diagnose why a RAG answer ignored the context.",
    difficulty: "Intermediate",
  },
  {
    title: "Internship & Job Preparation",
    description:
      "Translate skills into a hireable narrative: a focused resume, a public portfolio, interview practice, and a realistic junior-role search plan.",
    topics: [
      "resume building",
      "portfolio creation",
      "interview preparation",
      "internship guidance",
    ],
    tools: ["GitHub", "LinkedIn", "resume"],
    experienceStage: "Demonstrate",
    phase: "Portfolio & career",
    week: "Final weeks",
    hours: "8 hours",
    objectives: [
      "Lead a resume with role target, stack, and one measurable project result.",
      "Practice explaining tokens, RAG failure modes, tool-calling safety, and production sketches.",
      "Target teams that already ship LLM features.",
    ],
    practice: "Application tracker plus a tailored note that references their product and one relevant repo.",
    difficulty: "Beginner",
  },
];

export const curriculumModules: CurriculumModule[] = rawModules.map((raw, index) => {
  const code = `3.${index + 1}` as `3.${number}`;
  const concepts: ConceptItem[] = raw.topics.map((topic, tIdx) => ({
    id: `${code}-c${tIdx + 1}`,
    title: topic.charAt(0).toUpperCase() + topic.slice(1),
    description: `Learn ${topic} as used in ${raw.title}.`,
    estimatedMinutes: 8 + (tIdx % 3) * 4,
  }));
  const nextCode =
    index < rawModules.length - 1 ? (`3.${index + 2}` as `3.${number}`) : null;

  return {
    code,
    title: raw.title,
    description: raw.description,
    topics: raw.topics,
    concepts,
    tools: raw.tools,
    experienceStage: raw.experienceStage,
    learningObjectives: raw.objectives,
    lesson: `${raw.title}: ${raw.description}`,
    project: raw.practice,
    difficulty: raw.difficulty,
    estimatedTime: `${raw.hours} · ${raw.week}`,
    prerequisites: index === 0 ? [] : [`3.${index}` as `3.${number}`],
    masteryCriteria: [
      "Demonstrate the module outcomes without notes",
      "Complete the suggested practice task",
      "Keep secrets out of git and pin dependencies",
      "Record model, parameters, and whether answers were faithful",
    ],
    nextRecommendedModuleCode: nextCode,
    status: (index === 0 ? "in-progress" : index === 1 ? "available" : "locked") as CurriculumStatus,
    phase: raw.phase,
    week: raw.week,
  };
});

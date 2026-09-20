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
  moduleNumber: string; // e.g. "01", "02", ... "20"
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
};

// 20-module Professional Curriculum Specification
const professional20Modules: {
  num: string;
  title: string;
  description: string;
  topics: string[];
  tools: string[];
  experienceStage: ExperienceStage;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedHours: string;
  prereq: string;
  project: string;
}[] = [
  {
    num: "01",
    title: "Python Foundations for AI",
    description: "Build programming discipline for AI: clean syntax, structured programs, data types, and defensive coding.",
    topics: ["Variables & Types", "Control Flow & Logic", "Data Structures", "Functions & Modules", "File & JSON I/O", "Defensive Python"],
    tools: ["Python 3.12", "venv", "pip", "JSON", "pathlib"],
    experienceStage: "Apply",
    difficulty: "Beginner",
    estimatedHours: "4 hours",
    prereq: "None",
    project: "Reliable Data CLI & Extraction Pipeline",
  },
  {
    num: "02",
    title: "AI & Generative AI Fundamentals",
    description: "Core concepts of artificial intelligence, foundation models, transformers, and the generative AI ecosystem.",
    topics: ["AI vs ML vs Deep Learning", "Transformer Architecture", "Tokenization & Context Windows", "Generative Capabilities", "Model Hallucinations & Limits"],
    tools: ["Hugging Face", "Tokenizer Playground", "OpenAI Studio"],
    experienceStage: "Understand",
    difficulty: "Beginner",
    estimatedHours: "4 hours",
    prereq: "Complete Module 01",
    project: "Interactive Generative AI Diagnostic Bench",
  },
  {
    num: "03",
    title: "APIs & LLM Integration (Python)",
    description: "Connect code safely to AI foundation models via HTTP, REST endpoints, JSON schemas, and SDKs.",
    topics: ["REST & HTTP for AI", "API Authentication & Keys", "OpenAI & Gemini SDKs", "Streaming Responses", "Rate Limits & Error Handling"],
    tools: ["Requests", "OpenAI API", "Google Gemini SDK", "Pydantic"],
    experienceStage: "Build",
    difficulty: "Beginner",
    estimatedHours: "5 hours",
    prereq: "Complete Module 02",
    project: "Resilient Multi-Provider AI Gateway",
  },
  {
    num: "04",
    title: "Prompt Engineering",
    description: "Master systematic prompting techniques: few-shot, chain-of-thought, system design, and structured output formatting.",
    topics: ["System Prompts & Personas", "Few-Shot Prompting", "Chain-of-Thought (CoT)", "JSON Output Enforcement", "Prompt Injection Defense"],
    tools: ["Instructor", "Pydantic", "Prompt Benchmarks"],
    experienceStage: "Apply",
    difficulty: "Intermediate",
    estimatedHours: "4 hours",
    prereq: "Complete Module 03",
    project: "Deterministic Schema-Enforcing Prompt Engine",
  },
  {
    num: "05",
    title: "LLM Application Development",
    description: "Architect complete LLM applications featuring state management, chat history, callbacks, and responsive interfaces.",
    topics: ["Chat Memory Patterns", "Context Window Management", "Streaming Server-Sent Events", "FastAPI AI Backend", "Evaluation Frameworks"],
    tools: ["FastAPI", "Uvicorn", "Python", "React Client"],
    experienceStage: "Build",
    difficulty: "Intermediate",
    estimatedHours: "6 hours",
    prereq: "Complete Module 04",
    project: "Full-Stack Conversational Assistant",
  },
  {
    num: "06",
    title: "Embeddings & Vector Databases",
    description: "Convert unstructured text into high-dimensional semantic vectors and index them for rapid similarity lookup.",
    topics: ["Vector Space & Distance Metrics", "Dense Embedding Models", "Vector Databases (Chroma/Qdrant)", "Indexing & Querying", "HNSW & Semantic Search"],
    tools: ["SentenceTransformers", "ChromaDB", "Qdrant", "NumPy"],
    experienceStage: "Build",
    difficulty: "Intermediate",
    estimatedHours: "5 hours",
    prereq: "Complete Module 05",
    project: "Semantic Search & Document Retrieval Engine",
  },
  {
    num: "07",
    title: "Retrieval-Augmented Generation (RAG)",
    description: "Ground foundation models in external proprietary knowledge to eliminate hallucinations and provide cited answers.",
    topics: ["Document Ingestion & Chunking", "Embedding Generation", "Vector Store Retrieval", "Augmented Prompt Synthesis", "Source Citation & Grounding"],
    tools: ["LangChain", "ChromaDB", "OpenAI / Gemini", "Python"],
    experienceStage: "Build",
    difficulty: "Intermediate",
    estimatedHours: "6 hours",
    prereq: "Complete Module 06",
    project: "Production Knowledge-Base RAG Pipeline",
  },
  {
    num: "08",
    title: "Advanced RAG Systems",
    description: "Build robust enterprise RAG pipelines with hybrid retrieval, re-ranking, query transformation, and evaluation.",
    topics: ["Hybrid Search (Dense + BM25)", "Re-ranking with Cross-Encoders", "Query Expansion & Multi-Query", "Context Window Compression", "RAG Triad Evaluation (Ragas)"],
    tools: ["Cohere Rerank", "Ragas", "BM25", "Vector Store"],
    experienceStage: "Apply",
    difficulty: "Advanced",
    estimatedHours: "6 hours",
    prereq: "Complete Module 07",
    project: "High-Precision Enterprise RAG with Citations",
  },
  {
    num: "09",
    title: "LangChain",
    description: "Deep dive into the LangChain framework: runnables, LCEL syntax, memory, chains, and document loaders.",
    topics: ["LangChain Expression Language (LCEL)", "Chains & Runnables", "Document Loaders & Splitters", "Output Parsers", "Callbacks & Tracing"],
    tools: ["LangChain Core", "LangChain Community", "LangSmith"],
    experienceStage: "Build",
    difficulty: "Intermediate",
    estimatedHours: "5 hours",
    prereq: "Complete Module 08",
    project: "Configurable Modular LCEL Processing Engine",
  },
  {
    num: "10",
    title: "AI Agents Fundamentals",
    description: "Transition from linear LLM pipelines to autonomous reasoning loops using the ReAct framework and decision engines.",
    topics: ["Agent Architecture", "ReAct (Reason + Act) Loop", "Autonomous Decision Making", "Action Parsing & Execution", "Stopping Criteria & Loop Prevention"],
    tools: ["LangChain Agents", "Python", "LLM APIs"],
    experienceStage: "Understand",
    difficulty: "Intermediate",
    estimatedHours: "5 hours",
    prereq: "Complete Module 09",
    project: "Autonomous ReAct Problem Solver",
  },
  {
    num: "11",
    title: "Agents with Tools",
    description: "Equip AI agents with custom tools: web search, Python code execution, database queries, and external APIs.",
    topics: ["Tool Calling Schemas", "Safe Execution Environments", "Web Search & Scrape Tools", "SQL Database Tooling", "Error Recovery & Fallback Strategies"],
    tools: ["Tavily API", "SQLAlchemy", "Python REPL", "Function Calling"],
    experienceStage: "Build",
    difficulty: "Advanced",
    estimatedHours: "6 hours",
    prereq: "Complete Module 10",
    project: "Tool-Augmented Autonomous Research Assistant",
  },
  {
    num: "12",
    title: "LangGraph",
    description: "Construct cyclic, stateful, multi-step agent workflows with graphs, conditional edges, checkpoints, and persistence.",
    topics: ["State Graphs & Nodes", "Conditional Edges & Branching", "Cyclic Execution Loops", "State Persistence & Checkpoints", "Human-in-the-Loop Approval"],
    tools: ["LangGraph", "LangChain", "SQLite Checkpointer"],
    experienceStage: "Build",
    difficulty: "Advanced",
    estimatedHours: "7 hours",
    prereq: "Complete Module 11",
    project: "Stateful Multi-Turn Workflow Engine",
  },
  {
    num: "13",
    title: "Multi-Agent Systems",
    description: "Coordinate multiple specialized agents collaborating to solve complex tasks: supervisors, workers, and consensus.",
    topics: ["Supervisor Architecture", "Hierarchical Agent Teams", "Inter-Agent Communication", "Consensus & Voting Protocols", "Shared vs Local State"],
    tools: ["CrewAI", "LangGraph Multi-Agent", "Pydantic"],
    experienceStage: "Build",
    difficulty: "Advanced",
    estimatedHours: "7 hours",
    prereq: "Complete Module 12",
    project: "Collaborative Research & Writing Multi-Agent System",
  },
  {
    num: "14",
    title: "AI in Cybersecurity",
    description: "Protect and exploit AI systems: prompt injection, data exfiltration, adversarial inputs, and defensive guardrails.",
    topics: ["Prompt Injection & Jailbreaking", "Indirect Prompt Injection", "PII & Model Extraction", "NeMo Guardrails & LlamaGuard", "Adversarial Robustness Testing"],
    tools: ["NeMo Guardrails", "LlamaGuard", "OWASP Top 10 for LLMs"],
    experienceStage: "Demonstrate",
    difficulty: "Advanced",
    estimatedHours: "5 hours",
    prereq: "Complete Module 13",
    project: "LLM Security Firewall & Red-Team Test Suite",
  },
  {
    num: "15",
    title: "AI in Robotics",
    description: "Applied artificial intelligence in embodied systems: perception, spatial awareness, inverse kinematics, and ROS2.",
    topics: ["Spatial AI & Vision-Language-Action (VLA)", "Sensor Fusion & Depth Perception", "Obstacle Detection & Path Planning", "ROS2 Bridge & Actuator Commands", "Simulation Environments"],
    tools: ["OpenCV", "ROS2 Python", "Isaac Sim / PyBullet"],
    experienceStage: "Apply",
    difficulty: "Advanced",
    estimatedHours: "6 hours",
    prereq: "Complete Module 14",
    project: "Autonomous Navigation & Object Sorting Simulation",
  },
  {
    num: "16",
    title: "AI Trends & Career Paths",
    description: "Navigate modern AI industry specializations: AI Engineer, Research Engineer, MLOps, and career trajectory design.",
    topics: ["AI Landscape & Ecosystem Shifts", "Roles & Responsibilities in AI", "Open-Source vs Proprietary Models", "Continuous Learning Strategies", "High-Impact Portfolio Building"],
    tools: ["GitHub", "Hugging Face", "arXiv", "Industry Frameworks"],
    experienceStage: "Demonstrate",
    difficulty: "Beginner",
    estimatedHours: "3 hours",
    prereq: "Complete Module 15",
    project: "AI Specialization Roadmap & Portfolio Strategy",
  },
  {
    num: "17",
    title: "Production AI Systems",
    description: "Scale AI applications to production: latency optimization, caching, rate limiting, monitoring, cost control, and Docker.",
    topics: ["Latency Optimization & Streaming", "Semantic Caching with Redis", "Telemetry, Logging & Observability", "Docker & Containerization", "Cost Tracking & Model Routing"],
    tools: ["Docker", "Redis", "Prometheus", "OpenTelemetry", "FastAPI"],
    experienceStage: "Ship",
    difficulty: "Advanced",
    estimatedHours: "8 hours",
    prereq: "Complete Module 16",
    project: "Production-Grade Observable AI Microservice",
  },
  {
    num: "18",
    title: "Projects (Portfolio)",
    description: "Build, package, and document showcase portfolio systems that provide indisputable proof of your AI engineering capabilities.",
    topics: ["System Architecture Documentation", "Live Production Deployment", "Interactive Demonstrations", "Technical Writing & Case Studies", "GitHub Repository Polish"],
    tools: ["GitHub Actions", "Cloud Deployment", "Docker", "Markdown"],
    experienceStage: "Ship",
    difficulty: "Advanced",
    estimatedHours: "10 hours",
    prereq: "Complete Module 17",
    project: "Capstone Full-Stack AI Portfolio Showcase",
  },
  {
    num: "19",
    title: "Assessments",
    description: "Comprehensive diagnostic and practical coding evaluations measuring end-to-end conceptual and practical mastery.",
    topics: ["Architectural System Design", "Live Coding Challenges", "Debugging & Error Isolation", "Theoretical Knowledge Benchmarks", "Peer Code Reviews"],
    tools: ["Automated Test Suite", "Benchmark Harness", "Code Evaluation"],
    experienceStage: "Demonstrate",
    difficulty: "Advanced",
    estimatedHours: "6 hours",
    prereq: "Complete Module 18",
    project: "Verified AI Competence Certification Assessment",
  },
  {
    num: "20",
    title: "Internship & Job Prep",
    description: "Rigorous preparation for AI engineering technical interviews: system design rounds, live coding, and resume defense.",
    topics: ["AI System Design Interviews", "Python Coding Interview Patterns", "Explaining Technical Trade-offs", "Resume Audit & Project Defense", "Mock Interview Simulation"],
    tools: ["Resume Builder", "Interview Simulation", "GitHub"],
    experienceStage: "Demonstrate",
    difficulty: "Intermediate",
    estimatedHours: "6 hours",
    prereq: "Complete Module 19",
    project: "Recruiter-Ready AI Engineer Career Dossier",
  },
];

export const curriculumModules: CurriculumModule[] = professional20Modules.map(
  (mod, index) => {
    // Module code: 3.1 is Bridge/Pre, 3.2 is Module 01, 3.3 is Module 02 ... 3.21 is Module 20
    const code = `3.${index + 2}` as `3.${number}`;
    const concepts: ConceptItem[] = mod.topics.map((t, tIdx) => ({
      id: `${code}-c${tIdx + 1}`,
      title: t,
      description: `Internalize and apply ${t} in the context of ${mod.title}.`,
      estimatedMinutes: 5 + (tIdx % 3) * 4,
    }));
    const nextCode = index < professional20Modules.length - 1 ? (`3.${index + 3}` as `3.${number}`) : null;

    return {
      code,
      moduleNumber: mod.num,
      title: mod.title,
      description: mod.description,
      topics: mod.topics,
      concepts,
      tools: mod.tools,
      experienceStage: mod.experienceStage,
      learningObjectives: mod.topics.map((topic) => `Master ${topic} for practical AI engineering.`),
      lesson: `${mod.title}: ${mod.description}`,
      project: mod.project,
      difficulty: mod.difficulty,
      estimatedTime: mod.estimatedHours,
      prerequisites: index === 0 ? [] : [`3.${index + 1}` as `3.${number}`],
      masteryCriteria: [
        "Pass Knowledge Check with >= 80% accuracy",
        "Complete Break It debugging exercise",
        "Complete Your Turn independent application",
        "Pass module Mastery Assessment challenge",
      ],
      nextRecommendedModuleCode: nextCode,
      status: (index === 0
        ? "in-progress"
        : index === 1
          ? "available"
          : "locked") as CurriculumStatus,
    };
  }
);

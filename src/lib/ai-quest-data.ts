export interface QuestLandmark {
  id: string;
  name: string;
  label: string;
  icon: string;
  worldId: "world-01" | "world-02";
  curriculumTopic: string;
  description: string;
  xpReward: number;
  status: "COMPLETED" | "CURRENT" | "AVAILABLE" | "LOCKED" | "BOSS";
  missionType:
    | "INSPECT_PREDICT"
    | "DECISION_GATE"
    | "ROBOT_LOOP"
    | "FUNCTION_FORGE"
    | "DATA_VAULT"
    | "FILE_TERMINAL"
    | "JSON_CORE"
    | "ENV_LAB"
    | "PYTHON_BOSS"
    | "AI_CLASSIFIER"
    | "MODEL_FORGE"
    | "NEURAL_LAB"
    | "LLM_CORE"
    | "TOKEN_CHAMBER"
    | "FAILURE_LAB"
    | "AI_BOSS";
}

export interface QuestWorld {
  id: "world-01" | "world-02" | "world-03";
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  themeColor: string;
  isUnlocked: boolean;
  unlockRequirement?: string;
  landmarks: QuestLandmark[];
}

export const QUEST_WORLDS: QuestWorld[] = [
  {
    id: "world-01",
    name: "WORLD 01",
    title: "PYTHON FRONTIER",
    subtitle: "Module 01 · Python Foundations for AI",
    tagline: "Build programming discipline for AI: syntax, memory, control flow, functions, files, and isolated environments.",
    themeColor: "#14B8A6",
    isUnlocked: true,
    landmarks: [
      {
        id: "m01-basics",
        name: "Command Camp & Value Valley",
        label: "🏕️ COMMAND CAMP",
        icon: "🏕️",
        worldId: "world-01",
        curriculumTopic: "01 Python basics — variables, data types, operators",
        description: "An AI service has stopped processing customer records due to unexpected value types.",
        xpReward: 100,
        status: "CURRENT",
        missionType: "INSPECT_PREDICT",
      },
      {
        id: "m02-control",
        name: "Logic Forest",
        label: "🔀 LOGIC FOREST",
        icon: "🔀",
        worldId: "world-01",
        curriculumTopic: "02 Control flow — conditionals and loops",
        description: "Configure security door gating with if/else branches and boolean logic.",
        xpReward: 120,
        status: "AVAILABLE",
        missionType: "DECISION_GATE",
      },
      {
        id: "m03-loops",
        name: "Loop Lab",
        label: "🔁 LOOP LAB",
        icon: "🔁",
        worldId: "world-01",
        curriculumTopic: "02 Control flow — iteration over records",
        description: "Batch-process 5 data records without writing redundant procedural code.",
        xpReward: 140,
        status: "AVAILABLE",
        missionType: "ROBOT_LOOP",
      },
      {
        id: "m04-functions",
        name: "Function Forge",
        label: "🧩 FUNCTION FORGE",
        icon: "🧩",
        worldId: "world-01",
        curriculumTopic: "03 Functions and modular programming",
        description: "Construct pure, reusable calculation modules with explicit arguments and returns.",
        xpReward: 160,
        status: "AVAILABLE",
        missionType: "FUNCTION_FORGE",
      },
      {
        id: "m05-data",
        name: "Data Vault",
        label: "📦 DATA VAULT",
        icon: "📦",
        worldId: "world-01",
        curriculumTopic: "04 Data structures — lists, tuples, sets, dictionaries",
        description: "Select the optimal data structure for message queues, vocabularies, and profiles.",
        xpReward: 180,
        status: "AVAILABLE",
        missionType: "DATA_VAULT",
      },
      {
        id: "m06-files",
        name: "File Terminal",
        label: "📁 FILE TERMINAL",
        icon: "📁",
        worldId: "world-01",
        curriculumTopic: "05 File handling and persistent logs",
        description: "Investigate filesystem logs, persist conversation history, and handle encodings.",
        xpReward: 200,
        status: "AVAILABLE",
        missionType: "FILE_TERMINAL",
      },
      {
        id: "m07-json",
        name: "JSON Core",
        label: "{} JSON CORE",
        icon: "{}",
        worldId: "world-01",
        curriculumTopic: "06 JSON handling — loads, dumps, validation",
        description: "Repair glowing nested JSON payloads and parse LLM responses defensively.",
        xpReward: 220,
        status: "AVAILABLE",
        missionType: "JSON_CORE",
      },
      {
        id: "m08-env",
        name: "Environment Lab",
        label: "⚙ ENVIRONMENT LAB",
        icon: "⚙",
        worldId: "world-01",
        curriculumTopic: "07 Virtual environments & 08 Package management",
        description: "Resolve package collision conflicts using venv and freeze requirements.txt.",
        xpReward: 240,
        status: "AVAILABLE",
        missionType: "ENV_LAB",
      },
      {
        id: "m09-boss",
        name: "The Broken AI Pipeline (Boss)",
        label: "👑 PYTHON BOSS",
        icon: "👑",
        worldId: "world-01",
        curriculumTopic: "Module 01 Capstone Practice — Resilient Data CLI",
        description: "Build a CLI utility that reads JSON, filters records, writes reports, and logs errors.",
        xpReward: 500,
        status: "BOSS",
        missionType: "PYTHON_BOSS",
      },
    ],
  },
  {
    id: "world-02",
    name: "WORLD 02",
    title: "AI ORIGIN",
    subtitle: "Module 02 · AI & Generative AI Fundamentals",
    tagline: "Build a durable conceptual map: distinguish ML vs DL vs GenAI, understand neural weights, next-token prediction, and failure constraints.",
    themeColor: "#38BDF8",
    isUnlocked: true,
    landmarks: [
      {
        id: "w2-m01-overview",
        name: "Intelligence Lab",
        label: "🧠 INTELLIGENCE LAB",
        icon: "🧠",
        worldId: "world-02",
        curriculumTopic: "01 Artificial Intelligence overview — Perceive, Decide, Act",
        description: "Classify real commercial systems into Narrow AI, symbolic logic, or statistical engines.",
        xpReward: 120,
        status: "AVAILABLE",
        missionType: "AI_CLASSIFIER",
      },
      {
        id: "w2-m02-models",
        name: "Model Forge",
        label: "⚙ MODEL FORGE",
        icon: "⚙",
        worldId: "world-02",
        curriculumTopic: "02 Machine Learning vs Deep Learning vs Generative AI",
        description: "Choose the correct model tier: when to train a classifier, when to fine-tune, and when to prompt.",
        xpReward: 150,
        status: "AVAILABLE",
        missionType: "MODEL_FORGE",
      },
      {
        id: "w2-m03-neural",
        name: "Neural Lab",
        label: "🧬 NEURAL LAB",
        icon: "🧬",
        worldId: "world-02",
        curriculumTopic: "04 Neural network basics — Neurons, weights, loss, training",
        description: "Tune neural network weights visually to minimize loss and observe convergence.",
        xpReward: 180,
        status: "AVAILABLE",
        missionType: "NEURAL_LAB",
      },
      {
        id: "w2-m04-llm",
        name: "LLM Core",
        label: "🤖 LLM CORE",
        icon: "🤖",
        worldId: "world-02",
        curriculumTopic: "05 Large Language Models — Next-token prediction",
        description: "Observe transformer token distributions and predict the next probabilistic token.",
        xpReward: 200,
        status: "AVAILABLE",
        missionType: "LLM_CORE",
      },
      {
        id: "w2-m05-tokens",
        name: "Token Chamber",
        label: "🔤 TOKEN CHAMBER",
        icon: "🔤",
        worldId: "world-02",
        curriculumTopic: "06 Tokens, context window, and inference limits",
        description: "Slice prompts into BPE tokens and test context window capacity limits.",
        xpReward: 220,
        status: "AVAILABLE",
        missionType: "TOKEN_CHAMBER",
      },
      {
        id: "w2-m06-failure",
        name: "Failure Lab",
        label: "⚠ FAILURE LAB",
        icon: "⚠",
        worldId: "world-02",
        curriculumTopic: "07 Limitations — hallucination, bias, and brittleness",
        description: "Detect ungrounded hallucination, demographic bias, and brittleness in model outputs.",
        xpReward: 250,
        status: "AVAILABLE",
        missionType: "FAILURE_LAB",
      },
      {
        id: "w2-m07-boss",
        name: "The AI Architect (Boss)",
        label: "👑 AI BOSS",
        icon: "👑",
        worldId: "world-02",
        curriculumTopic: "Module 02 Capstone Practice — System Architecture Brief",
        description: "Evaluate an enterprise knowledge problem and argue whether it needs ML, an LLM, RAG, or an Agent.",
        xpReward: 500,
        status: "BOSS",
        missionType: "AI_BOSS",
      },
    ],
  },
  {
    id: "world-03",
    name: "WORLD 03",
    title: "LLM WORKSHOP",
    subtitle: "Module 03 · APIs & LLM Integration (Python)",
    tagline: "Talk to AI models as a programmer: HTTP requests, streaming responses, and token accounting.",
    themeColor: "#818CF8",
    isUnlocked: false,
    unlockRequirement: "Unlock by defeating The AI Architect in World 02",
    landmarks: [],
  },
];

export interface KnowledgeItem {
  id: string;
  category: "Python" | "AI";
  title: string;
  curriculumRef: string;
  status: "UNDERSTOOD" | "PRACTICED" | "MASTERED";
  explanation: string;
  codeSnippet: string;
}

export const INITIAL_KNOWLEDGE_INVENTORY: KnowledgeItem[] = [
  {
    id: "kn-var",
    category: "Python",
    title: "Variables & Data Types",
    curriculumRef: "Module 01 · Topic 01",
    status: "MASTERED",
    explanation: "Dynamic typing in Python binds labels to heap objects (int, float, str, bool, None).",
    codeSnippet: 'price: float = 80000.0\ndiscount: float = 0.20\nnet_price: float = price * (1.0 - discount)',
  },
  {
    id: "kn-control",
    category: "Python",
    title: "Control Flow & Boolean Logic",
    curriculumRef: "Module 01 · Topic 02",
    status: "PRACTICED",
    explanation: "Guards and branching logic prevent unhandled exceptions on unexpected API payloads.",
    codeSnippet: 'if response.status_code == 200:\n    data = response.json()\nelif response.status_code == 429:\n    retry_after = int(response.headers.get("Retry-After", 5))\nelse:\n    raise RuntimeError(f"API Error {response.status_code}")',
  },
  {
    id: "kn-funcs",
    category: "Python",
    title: "Functions & Scope",
    curriculumRef: "Module 01 · Topic 03",
    status: "PRACTICED",
    explanation: "Pure functions isolate side effects, state arguments explicitly, and return typed data contracts.",
    codeSnippet: 'def sanitize_token_stream(tokens: list[str]) -> str:\n    """Concatenate and strip unprintable characters."""\n    return "".join(t for t in tokens if t.isprintable()).strip()',
  },
  {
    id: "kn-structs",
    category: "Python",
    title: "Data Structures (List, Dict, Set)",
    curriculumRef: "Module 01 · Topic 04",
    status: "PRACTICED",
    explanation: "Dictionaries represent structured records; sets deduplicate vocabularies; lists preserve message sequences.",
    codeSnippet: 'messages: list[dict[str, str]] = [\n    {"role": "system", "content": "You are a concise code reviewer."},\n    {"role": "user", "content": "Review this function signature."}\n]',
  },
  {
    id: "kn-json",
    category: "Python",
    title: "JSON Serialization & Loads",
    curriculumRef: "Module 01 · Topic 06",
    status: "UNDERSTOOD",
    explanation: "json.loads() and json.dumps() bridge wire-format strings and in-memory Python dictionaries with .get() safety.",
    codeSnippet: 'import json\n\npayload = json.loads(\'{"model": "gpt-4o", "temperature": 0.2}\')\nmodel_name = payload.get("model", "default-model")',
  },
  {
    id: "kn-ai",
    category: "AI",
    title: "AI vs ML vs Deep Learning vs GenAI",
    curriculumRef: "Module 02 · Topic 02",
    status: "UNDERSTOOD",
    explanation: "ML trains statistical algorithms; DL uses multi-layer neural approximators; GenAI generates novel text, code, or images.",
    codeSnippet: '# Decision Rule:\n# Tabular classification? -> Classical ML (XGBoost)\n# Audio/Vision perception? -> Deep Learning (CNN/ResNet)\n# Unstructured synthesis / Q&A? -> Generative AI (LLM / RAG)',
  },
  {
    id: "kn-tokens",
    category: "AI",
    title: "Tokens & Context Windows",
    curriculumRef: "Module 02 · Topic 06",
    status: "UNDERSTOOD",
    explanation: "LLMs process subword tokens (1 token ≈ 0.75 English words). Exceeding the context window causes truncation or memory errors.",
    codeSnippet: '# 1,000 words ≈ 1,333 tokens\ncontext_limit = 8192\nestimated_prompt_tokens = len(document.split()) * 1.35\nassert estimated_prompt_tokens <= context_limit, "Prompt exceeds context window!"',
  },
];

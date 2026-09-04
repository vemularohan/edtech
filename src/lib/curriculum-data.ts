export type CurriculumStatus = "mastered" | "in-progress" | "available" | "locked";
export type ExperienceStage = "Understand" | "Apply" | "Build" | "Ship" | "Demonstrate";

export type CurriculumModule = {
  code: `3.${number}`;
  title: string;
  description: string;
  topics: string[];
  tools: string[];
  experienceStage: ExperienceStage;
  status: CurriculumStatus;
  learningObjectives: string[];
  lesson: string;
  project: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  prerequisites: string[];
};

const moduleData: Array<Omit<CurriculumModule, "status"> & { status?: CurriculumStatus }> = [
  [
    "Why Code When You Can Vibe Code? (The Bridge)",
    "Understand why coding literacy still matters when AI can generate code.",
    ["generated code", "Python", "debugging"],
    ["Python", "VS Code"],
    "Understand",
  ],
  [
    "Python Fundamentals for AI",
    "Use Python fundamentals to make a first useful AI script.",
    ["variables", "lists", "loops", "functions"],
    ["Python", "Google Colab"],
    "Apply",
  ],
  [
    "Python Libraries for AI",
    "Turn a messy CSV into a useful discovery with the core data libraries.",
    ["NumPy", "Pandas", "Matplotlib", "CSV"],
    ["NumPy", "Pandas", "Matplotlib"],
    "Build",
  ],
  [
    "Working with AI APIs",
    "Connect code to an AI service safely through HTTP and JSON.",
    ["HTTP", "GET/POST", "JSON", "API keys"],
    ["OpenAI API", "Gemini API"],
    "Build",
  ],
  [
    "Build a Chatbot",
    "Build, debug, document, and publish your first Python AI chatbot.",
    ["input", "API calls", "responses", "GitHub"],
    ["Python", "OpenAI API", "GitHub"],
    "Ship",
  ],
  [
    "Data Basics & Cleaning",
    "Find the truth inside messy real-world data.",
    ["nulls", "duplicates", "types", "aggregation"],
    ["Pandas", "CSV"],
    "Apply",
  ],
  [
    "Data Visualisation & Storytelling",
    "Make one chart change someone's mind.",
    ["bar charts", "line charts", "scatter plots", "heatmaps"],
    ["Matplotlib", "Seaborn"],
    "Build",
  ],
  [
    "Introduction to Machine Learning",
    "Teach a machine to predict something without getting lost in the maths.",
    ["features", "labels", "regression", "classification"],
    ["scikit-learn", "Hugging Face"],
    "Understand",
  ],
  [
    "Build an ML Project",
    "Take a real problem from dataset to model, evaluation, and GitHub.",
    ["dataset", "training", "evaluation", "documentation"],
    ["scikit-learn", "GitHub"],
    "Ship",
  ],
  [
    "Deploy Your AI Project",
    "Put your model in front of real users with a live URL.",
    ["Streamlit", "deployment", "live URL", "updates"],
    ["Streamlit", "Hugging Face Spaces"],
    "Ship",
  ],
  [
    "Advanced Python for AI",
    "Keep a growing AI project maintainable, testable, and documented.",
    ["OOP", "decorators", "error handling", "virtual environments"],
    ["Python", "pip", "venv"],
    "Apply",
  ],
  [
    "Deep Dive into Data",
    "Find signal in large datasets through EDA and feature engineering.",
    ["merging", "pivot tables", "time series", "correlation"],
    ["Pandas", "NumPy"],
    "Build",
  ],
  [
    "Machine Learning: Going Deeper",
    "Prove that a model is actually good and understand where it fails.",
    ["decision trees", "random forests", "F1", "cross-validation"],
    ["scikit-learn", "XGBoost"],
    "Apply",
  ],
  [
    "Neural Networks & Deep Learning Fundamentals",
    "Teach a machine to recognise patterns with layers, weights, and learning.",
    ["neurons", "layers", "weights", "backpropagation"],
    ["TensorFlow", "Keras"],
    "Build",
  ],
  [
    "Natural Language Processing (NLP)",
    "Teach a machine to understand and transform human language.",
    ["tokenization", "TF-IDF", "sentiment", "transformers"],
    ["Hugging Face", "spaCy"],
    "Build",
  ],
  [
    "Working with LLMs Professionally",
    "Build reliable LLM workflows with prompts, tools, memory, and structured output.",
    ["system prompts", "temperature", "JSON", "function calling"],
    ["LangChain", "OpenAI API", "Pydantic"],
    "Build",
  ],
  [
    "Computer Vision Basics",
    "Help a machine see through pixels, features, and pretrained models.",
    ["pixels", "channels", "OpenCV", "YOLO"],
    ["OpenCV", "YOLO", "CLIP"],
    "Build",
  ],
  [
    "AI Automation & Agents",
    "Turn repetitive workflows into systems that can browse, search, and act.",
    ["agents", "tools", "workflows", "automation"],
    ["LangChain", "CrewAI", "n8n"],
    "Build",
  ],
  [
    "Building Full-Stack AI Applications",
    "Combine a UI, backend, AI model, and persistent data into one product.",
    ["FastAPI", "React", "authentication", "SQLite"],
    ["FastAPI", "React", "Supabase"],
    "Ship",
  ],
  [
    "Advanced AI Project",
    "Build and deploy a production-shaped AI product for real users.",
    ["frontend", "AI component", "documentation", "demo"],
    ["GitHub", "Docker", "FastAPI"],
    "Ship",
  ],
  [
    "RAG — Deep Dive",
    "Build a retrieval pipeline that gives models the knowledge they need.",
    ["ingestion", "chunking", "embeddings", "retrieval", "MMR", "re-ranking"],
    ["Vector database", "LangChain"],
    "Build",
  ],
  [
    "Advanced LLM Engineering",
    "Make LLM systems more capable, reliable, efficient, and multimodal.",
    ["attention", "context windows", "routing", "caching"],
    ["Pydantic", "LLM APIs"],
    "Apply",
  ],
  [
    "AI Agents & Multi-Agent Systems",
    "Build a Research Agent that plans, uses tools, remembers, and self-corrects.",
    ["planning", "LangGraph", "state", "memory"],
    ["LangGraph", "CrewAI"],
    "Build",
  ],
  [
    "Fine-Tuning & Custom Models",
    "Choose between prompting, RAG, and fine-tuning, then train responsibly.",
    ["prompting", "RAG", "LoRA", "QLoRA", "instruction tuning"],
    ["Hugging Face", "OpenAI fine-tuning"],
    "Apply",
  ],
  [
    "Vector Databases & Embeddings — Production Level",
    "Build semantic search that works at production scale.",
    ["HNSW", "ANN search", "metadata", "hybrid search"],
    ["Sentence Transformers", "Vector database"],
    "Build",
  ],
  [
    "MLOps & Production AI Systems",
    "Track, version, deploy, monitor, and safely retrain AI systems.",
    ["experiment tracking", "CI/CD", "drift", "Docker"],
    ["MLflow", "GitHub Actions", "Docker"],
    "Ship",
  ],
  [
    "AI System Design",
    "Design AI systems for latency, scale, reliability, and cost.",
    ["latency", "throughput", "scalability", "reliability", "cost", "caching"],
    ["Redis", "Celery", "Cloud platforms"],
    "Apply",
  ],
  [
    "AI Security & Safety",
    "Break AI systems safely and build guardrails against real threats.",
    ["prompt injection", "jailbreaking", "PII leakage", "red teaming", "guardrails"],
    ["Content moderation", "DPDP Act", "GDPR"],
    "Demonstrate",
  ],
  [
    "Capstone Preparation & Portfolio Polish",
    "Turn your strongest work into clear evidence that recruiters can trust.",
    ["GitHub audit", "README", "case studies", "portfolio"],
    ["GitHub", "LinkedIn"],
    "Demonstrate",
  ],
  [
    "3rd Year Final Capstone: Production-Grade AI System",
    "Ship a documented, deployed AI system that demonstrates real engineering ability.",
    ["RAG", "agents", "MLOps", "real users"],
    ["GitHub", "Docker", "Cloud deployment"],
    "Demonstrate",
  ],
].map(([title, description, topics, tools, experienceStage], index) => ({
  code: `3.${index + 1}` as `3.${number}`,
  title,
  description,
  topics,
  tools,
  experienceStage,
  learningObjectives: topics.map((topic) => `Use ${topic} in an AI engineering workflow.`),
  lesson: `${title}: ${description}`,
  project: `Build a small ${title.toLowerCase()} artifact and document the engineering decisions.`,
  difficulty: index < 5 ? "Beginner" : index < 20 ? "Intermediate" : "Advanced",
  estimatedTime: index < 5 ? "20–30 min" : index < 20 ? "35–50 min" : "60–90 min",
  prerequisites: index === 0 ? [] : [`3.${index}` as `3.${number}`],
  status: index === 0 ? "in-progress" : index === 1 ? "available" : "locked",
}));

export const curriculumModules: CurriculumModule[] = moduleData;

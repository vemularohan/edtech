import { curriculumModules } from "./curriculum-data";

export type TopicStatus = "mastered" | "in-progress" | "available" | "locked";

export const subjects = [
  { name: "Foundations", progress: 0, tone: "brand" },
  { name: "Knowledge apps", progress: 0, tone: "lilac" },
  { name: "Agents", progress: 0, tone: "peach" },
  { name: "Domain & production", progress: 0, tone: "mint" },
  { name: "Portfolio & career", progress: 0, tone: "brand" },
];

export const nodes = curriculumModules.map((module, index) => ({
  id: module.code,
  label: module.title,
  x: 10 + (index % 5) * 20,
  y: 10 + Math.floor(index / 5) * 15,
  status: module.status,
  meta: `${module.code} · ${module.experienceStage}`,
}));

export const timeline = [
  { date: "Mon", minutes: 0 },
  { date: "Tue", minutes: 0 },
  { date: "Wed", minutes: 0 },
  { date: "Thu", minutes: 0 },
  { date: "Fri", minutes: 0 },
  { date: "Sat", minutes: 0 },
  { date: "Sun", minutes: 0 },
];

export const weekTrend = [
  { week: "W1", score: 0 },
  { week: "W2", score: 0 },
  { week: "W3", score: 0 },
  { week: "W4", score: 0 },
  { week: "W5", score: 0 },
  { week: "W6", score: 0 },
];

export const skillData = [
  { skill: "Python", mastery: 0 },
  { skill: "LLM APIs", mastery: 0 },
  { skill: "Prompts", mastery: 0 },
  { skill: "RAG", mastery: 0 },
  { skill: "Agents", mastery: 0 },
  { skill: "Production", mastery: 0 },
];

export const heatmap = Array.from({ length: 70 }, (_, index) => ({
  id: index,
  intensity: 0,
}));

export const codingStarter = `def classify_question(message):
    message = message.lower()
    if "deadline" in message:
        return "I can help you find a deadline."
    return "I can help with that."`;

export type ChallengeTest = {
  id: string;
  input: string;
  expected: string;
};

export type CurriculumChallenge = {
  id: string;
  moduleId: `3.${number}`;
  topic: string;
  title: string;
  description: string;
  type: "BUILD" | "DEBUG" | "PREDICT" | "EXPERIMENT" | "DECISION";
  difficulty: "Easy" | "Medium" | "Hard" | "Beginner" | "Intermediate" | "Advanced";
  problem: string;
  starterCode: string;
  tests: ChallengeTest[];
  hints: string[];
  solution: string;
  explanation: string;
};

export const curriculumChallenges: CurriculumChallenge[] = [
  {
    id: "3.6-01",
    moduleId: "3.6",
    topic: "Pandas data cleaning and aggregation",
    title: "Clean a Messy Student Dataset",
    description: "Turn inconsistent attendance records into a trustworthy summary.",
    type: "BUILD",
    difficulty: "Medium",
    problem:
      "Complete clean_attendance so it removes rows without a student_id, converts attendance to numbers, fills missing attendance with the cohort median, and returns the mean attendance by student_id as a dictionary.",
    starterCode: `import pandas as pd

def clean_attendance(rows):
    frame = pd.DataFrame(rows)
    # Return {student_id: mean_attendance} after cleaning the data.
    return {}`,
    tests: [
      {
        id: "01",
        input:
          '[{"student_id":"s1","attendance":"80"},{"student_id":"s1","attendance":null},{"student_id":"s2","attendance":"90"}]',
        expected: '{"s1": 85.0, "s2": 90.0}',
      },
      {
        id: "02",
        input:
          '[{"student_id":"s3","attendance":"bad"},{"student_id":null,"attendance":"70"},{"student_id":"s4","attendance":"50"}]',
        expected: '{"s4": 50.0}',
      },
      {
        id: "03",
        input: '[{"student_id":"s5","attendance":"60"},{"student_id":"s6","attendance":null}]',
        expected: '{"s5": 60.0, "s6": 60.0}',
      },
    ],
    hints: [
      "Create a DataFrame first, then inspect which columns contain missing values.",
      "Use pd.to_numeric(..., errors='coerce') so invalid attendance becomes a missing value.",
      "Drop missing student IDs, fill attendance with the median, then group by student_id and take the mean.",
    ],
    solution: `import pandas as pd

def clean_attendance(rows):
    frame = pd.DataFrame(rows)
    frame = frame.dropna(subset=["student_id"]).copy()
    frame["attendance"] = pd.to_numeric(frame["attendance"], errors="coerce")
    frame["attendance"] = frame["attendance"].fillna(frame["attendance"].median())
    return frame.groupby("student_id")["attendance"].mean().round(1).to_dict()`,
    explanation:
      "The cleaning pipeline makes invalid values explicit, removes unusable identifiers, imputes missing numeric values with a robust summary statistic, and aggregates only after the data is trustworthy.",
  },
];

export const primaryChallenge = curriculumChallenges[0];

const moduleSpecificChallenges: Array<Omit<CurriculumChallenge, "id">> = [
  {
    moduleId: "3.1",
    topic: "AI-generated code review",
    title: "AI Code Detective",
    description: "Find and repair a subtle mistake in generated Python.",
    type: "DEBUG",
    difficulty: "Beginner",
    problem:
      "The generated function should return the number of non-empty messages, but it counts blank strings too. Fix the condition and explain the failure.",
    starterCode: `def count_messages(messages):\n    return sum(1 for message in messages if message)`,
    tests: [
      { id: "01", input: '["hello", "", "help"]', expected: "2" },
      { id: "02", input: '["", "ok"]', expected: "1" },
    ],
    hints: [
      "Read the generated condition literally.",
      "An empty string is falsy in Python.",
      "Keep the item only when it contains non-whitespace text.",
    ],
    solution: `def count_messages(messages):\n    return sum(1 for message in messages if message.strip())`,
    explanation:
      "AI-generated code can look plausible while missing an edge case. Reading, reproducing, and testing the behavior is the engineering skill this module develops.",
  },
  {
    moduleId: "3.2",
    topic: "Python functions and dictionaries",
    title: "Format a Prompt Payload",
    description: "Use Python fundamentals to turn a conversation into a predictable prompt.",
    type: "BUILD",
    difficulty: "Beginner",
    problem:
      "Build format_prompt that returns a dictionary with system, user, and message_count keys. Count only non-empty messages.",
    starterCode: `def format_prompt(system, messages):\n    # Return a payload for an AI request.\n    return {}`,
    tests: [
      {
        id: "01",
        input: '("Be concise", ["Hi", "Explain this"])',
        expected: '{"system":"Be concise","user":"Explain this","message_count":2}',
      },
      {
        id: "02",
        input: '("Help", ["", "Status"])',
        expected: '{"system":"Help","user":"Status","message_count":1}',
      },
    ],
    hints: [
      "Use a dictionary with named keys.",
      "The latest non-empty message is the user message.",
      "Loop through messages or use a filtered list.",
    ],
    solution: `def format_prompt(system, messages):\n    clean = [message for message in messages if message]\n    return {"system": system, "user": clean[-1], "message_count": len(clean)}`,
    explanation:
      "Variables, lists, loops, functions, and dictionaries become useful when they shape data for an AI workflow.",
  },
  {
    moduleId: "3.3",
    topic: "NumPy, Pandas, and Matplotlib",
    title: "Find the Most Common Intent",
    description: "Load tabular support data and produce a useful aggregate.",
    type: "BUILD",
    difficulty: "Beginner",
    problem:
      "Using Pandas, count the non-empty intent values and return the most common intent. The CSV includes a missing intent row.",
    starterCode: `import pandas as pd\nfrom io import StringIO\n\ndef most_common_intent(csv_text):\n    frame = pd.read_csv(StringIO(csv_text))\n    return ""`,
    tests: [
      { id: "01", input: '"intent\\nrefund\\nshipping\\nrefund\\n"', expected: '"refund"' },
      { id: "02", input: '"intent\\n\\nshipping\\nshipping\\n"', expected: '"shipping"' },
    ],
    hints: [
      "Read the CSV text into a DataFrame.",
      "Remove missing intent values before counting.",
      "value_counts returns the most frequent value first.",
    ],
    solution: `import pandas as pd\nfrom io import StringIO\n\ndef most_common_intent(csv_text):\n    frame = pd.read_csv(StringIO(csv_text)).dropna(subset=["intent"])\n    return frame["intent"].value_counts().index[0]`,
    explanation:
      "This is a library workflow: read a CSV, clean a column, aggregate it, and return a result that could drive a chart.",
  },
  {
    moduleId: "3.4",
    topic: "HTTP, JSON, and API keys",
    title: "Parse the AI Response",
    description: "Handle a JSON response without exposing credentials.",
    type: "DEBUG",
    difficulty: "Beginner",
    problem:
      "Extract the assistant text from a nested API response. Missing content should return a clear status instead of raising an exception.",
    starterCode: `def response_text(payload):\n    return payload["choices"][0]["message"]["content"]`,
    tests: [
      { id: "01", input: '{"choices":[{"message":{"content":"Hello"}}]}', expected: '"Hello"' },
      { id: "02", input: '{"choices":[]}', expected: '"No response"' },
    ],
    hints: [
      "An empty choices list is a valid failure response.",
      "Check before indexing the first item.",
      "Keep API keys out of this function and load them from environment configuration.",
    ],
    solution: `def response_text(payload):\n    choices = payload.get("choices", [])\n    return choices[0].get("message", {}).get("content", "No response") if choices else "No response"`,
    explanation:
      "API work combines HTTP intent, JSON shape, defensive parsing, and safe credential handling. A successful request is not enough; the response must be validated.",
  },
  {
    moduleId: "3.5",
    topic: "Chatbot conversation flow",
    title: "Build a CLI AI Assistant",
    description: "Turn user input into a useful conversational response.",
    type: "BUILD",
    difficulty: "Intermediate",
    problem:
      "Implement reply so greetings, help requests, and unknown messages receive different responses. Preserve the conversation flow without calling an API in tests.",
    starterCode: `def reply(message):\n    # Return the chatbot response.\n    return ""`,
    tests: [
      { id: "01", input: '"hello"', expected: '"Hi! What can I help you build?"' },
      { id: "02", input: '"help me"', expected: '"Tell me what you are trying to build."' },
      { id: "03", input: '"thanks"', expected: '"I can help with that."' },
    ],
    hints: [
      "Normalize the message before matching.",
      "Check the most specific intent first.",
      "Keep the response logic separate from input/output code.",
    ],
    solution: `def reply(message):\n    text = message.lower().strip()\n    if "hello" in text: return "Hi! What can I help you build?"\n    if "help" in text: return "Tell me what you are trying to build."\n    return "I can help with that."`,
    explanation:
      "Unlike Module 3.4, this challenge uses an API-shaped interaction to build a complete conversational loop with intent and fallback behavior.",
  },
  {
    moduleId: "3.6",
    topic: "Pandas data cleaning and aggregation",
    title: "Clean the Messy Student Dataset",
    description: "Remove unusable rows and calculate trustworthy cohort summaries.",
    type: "BUILD",
    difficulty: "Intermediate",
    problem:
      "Complete clean_attendance so it removes rows without a student_id, converts attendance to numbers, fills missing attendance with the cohort median, and returns the mean attendance by student_id.",
    starterCode: `import pandas as pd\n\ndef clean_attendance(rows):\n    frame = pd.DataFrame(rows)\n    return {}`,
    tests: [
      {
        id: "01",
        input:
          '[{"student_id":"s1","attendance":"80"},{"student_id":"s1","attendance":null},{"student_id":"s2","attendance":"90"}]',
        expected: '{"s1":85.0,"s2":90.0}',
      },
      {
        id: "02",
        input:
          '[{"student_id":"s3","attendance":"bad"},{"student_id":null,"attendance":"70"},{"student_id":"s4","attendance":"50"}]',
        expected: '{"s4":50.0}',
      },
    ],
    hints: [
      "Drop missing IDs first.",
      "Use pd.to_numeric with errors='coerce'.",
      "Fill missing numeric values before groupby.",
    ],
    solution: `import pandas as pd\n\ndef clean_attendance(rows):\n    frame = pd.DataFrame(rows).dropna(subset=["student_id"]).copy()\n    frame["attendance"] = pd.to_numeric(frame["attendance"], errors="coerce")\n    frame["attendance"] = frame["attendance"].fillna(frame["attendance"].median())\n    return frame.groupby("student_id")["attendance"].mean().round(1).to_dict()`,
    explanation:
      "Cleaning is a contract: only valid identifiers and numeric values reach aggregation. That makes the result explainable and testable.",
  },
  {
    moduleId: "3.7",
    topic: "Chart selection and storytelling",
    title: "Tell the Story Behind the Dataset",
    description: "Choose a visual form that makes an insight legible.",
    type: "DECISION" as CurriculumChallenge["type"],
    difficulty: "Beginner",
    problem:
      "Choose the chart type for each evidence question, then explain what a reader should notice. Use line for change over time, bar for category comparison, scatter for relationships, and heatmap for a matrix.",
    starterCode: `def chart_for(question):\n    # Return line, bar, scatter, or heatmap.\n    return ""`,
    tests: [
      { id: "01", input: '"monthly attendance trend"', expected: '"line"' },
      { id: "02", input: '"attendance by cohort"', expected: '"bar"' },
    ],
    hints: [
      "Identify whether the question asks for trend, comparison, relationship, or matrix intensity.",
      "A chart is a communication choice, not decoration.",
    ],
    solution: `def chart_for(question):\n    text = question.lower()\n    if "trend" in text or "over time" in text: return "line"\n    if "relationship" in text: return "scatter"\n    if "matrix" in text: return "heatmap"\n    return "bar"`,
    explanation:
      "The same dataset can tell different stories. Selecting the visual encoding is part of data storytelling.",
  },
  {
    moduleId: "3.8",
    topic: "Features, labels, regression, and classification",
    title: "Is This Regression or Classification?",
    description: "Choose an ML framing before training a model.",
    type: "DECISION" as CurriculumChallenge["type"],
    difficulty: "Beginner",
    problem:
      "Return regression when the target is a continuous quantity and classification when it is a category. Then identify features and labels for a training table.",
    starterCode: `def problem_type(target_examples):\n    # Return regression or classification.\n    return ""`,
    tests: [
      { id: "01", input: "[1200.5, 980.0, 1500.2]", expected: '"regression"' },
      { id: "02", input: '["urgent", "normal", "urgent"]', expected: '"classification"' },
    ],
    hints: [
      "Prices and durations are quantities.",
      "Urgent/normal are categories.",
      "The label is what the model should predict; features are evidence.",
    ],
    solution: `def problem_type(target_examples):\n    return "regression" if all(isinstance(value, (int, float)) for value in target_examples) else "classification"`,
    explanation:
      "Selecting the problem framing determines the model family, evaluation approach, and shape of the label.",
  },
  {
    moduleId: "3.9",
    topic: "End-to-end ML project",
    title: "Ship a Defensible ML Project",
    description: "Plan a mini-project from dataset to evaluated result.",
    type: "BUILD",
    difficulty: "Intermediate",
    problem:
      "Return the required project stages in order: define the problem, prepare data, train, evaluate, and document findings.",
    starterCode: `def project_checklist():\n    return []`,
    tests: [
      { id: "01", input: "()", expected: '["define","prepare","train","evaluate","document"]' },
    ],
    hints: [
      "Start with the question, not the model.",
      "Evaluation must use data held out from training.",
      "Documentation should include limitations.",
    ],
    solution: `def project_checklist():\n    return ["define", "prepare", "train", "evaluate", "document"]`,
    explanation:
      "A mini-project proves more than a model call: it connects a real question, data decisions, evaluation, and a GitHub-ready explanation.",
  },
  {
    moduleId: "3.10",
    topic: "Streamlit and deployment",
    title: "Put Your ML Model Online",
    description: "Connect a model function to a deployable Streamlit interface.",
    type: "BUILD",
    difficulty: "Intermediate",
    problem:
      "Return the deployment checklist needed for a Streamlit app: prediction function, UI input, requirements, and live hosting.",
    starterCode: `def deployment_checklist():\n    return []`,
    tests: [{ id: "01", input: "()", expected: '["predict","input","requirements","deploy"]' }],
    hints: [
      "A local notebook is not a user-facing application.",
      "Dependencies must be reproducible.",
      "A live URL is part of the outcome.",
    ],
    solution: `def deployment_checklist():\n    return ["predict", "input", "requirements", "deploy"]`,
    explanation:
      "Deployment turns a model into a usable product by connecting inference, interface, environment, and hosting.",
  },
  {
    moduleId: "3.11",
    topic: "Classes, decorators, and error handling",
    title: "Refactor the AI Utility",
    description: "Make a growing Python helper maintainable and explicit about failures.",
    type: "DEBUG",
    difficulty: "Intermediate",
    problem:
      "Create a class that stores a model name and returns a clear error message when an empty prompt is submitted.",
    starterCode: `class PromptRunner:\n    def __init__(self, model):\n        self.model = model\n\n    def run(self, prompt):\n        return ""`,
    tests: [
      { id: "01", input: '("gpt", "Summarise this")', expected: '"gpt: Summarise this"' },
      { id: "02", input: '("gpt", "")', expected: '"error: prompt is empty"' },
    ],
    hints: [
      "Keep model configuration on the object.",
      "Validate at the boundary.",
      "Return a useful error instead of hiding it.",
    ],
    solution: `class PromptRunner:\n    def __init__(self, model): self.model = model\n    def run(self, prompt):\n        if not prompt.strip(): return "error: prompt is empty"\n        return f"{self.model}: {prompt}"`,
    explanation:
      "Classes and explicit error handling make AI utilities easier to test, reuse, and safely evolve.",
  },
  {
    moduleId: "3.12",
    topic: "Merging, feature engineering, and correlation",
    title: "Combine Two Real-World Datasets",
    description: "Join learner activity with outcomes and derive a useful feature.",
    type: "BUILD",
    difficulty: "Intermediate",
    problem:
      "Return a new record with total_minutes and the original outcome after joining activity data to a learner record.",
    starterCode: `def join_activity(activity, learner):\n    return {}`,
    tests: [
      {
        id: "01",
        input: '({"minutes":[20,30],"learner_id":"s1"},{"learner_id":"s1","outcome":"pass"})',
        expected: '{"learner_id":"s1","total_minutes":50,"outcome":"pass"}',
      },
    ],
    hints: [
      "Check that the join keys refer to the same learner.",
      "Feature engineering creates a model-ready signal.",
      "Keep the outcome separate from the evidence used to predict it.",
    ],
    solution: `def join_activity(activity, learner):\n    return {"learner_id": learner["learner_id"], "total_minutes": sum(activity["minutes"]), "outcome": learner["outcome"]}`,
    explanation:
      "Deep data work is about joining evidence, creating features, and checking relationships without leaking the target.",
  },
  {
    moduleId: "3.13",
    topic: "Evaluation and overfitting",
    title: "Why Is Your Model Lying?",
    description: "Diagnose a model that performs well only on training data.",
    type: "DEBUG",
    difficulty: "Advanced",
    problem:
      "Given train and validation F1 scores, classify the model as overfit, underfit, or balanced.",
    starterCode: `def diagnose(train_f1, validation_f1):\n    return ""`,
    tests: [
      { id: "01", input: "(0.99, 0.54)", expected: '"overfitting"' },
      { id: "02", input: "(0.61, 0.59)", expected: '"balanced"' },
    ],
    hints: [
      "Compare generalisation, not only training performance.",
      "A large train/validation gap is a warning.",
      "Use F1 when both precision and recall matter.",
    ],
    solution: `def diagnose(train_f1, validation_f1):\n    gap = train_f1 - validation_f1\n    if gap > 0.2: return "overfitting"\n    if train_f1 < 0.65: return "underfitting"\n    return "balanced"`,
    explanation:
      "Evaluation is evidence about generalisation. Cross-validation and tuning help determine whether a model learned signal or memorised the training set.",
  },
  {
    moduleId: "3.14",
    topic: "Neural networks and forward passes",
    title: "Build a Tiny Digit Recognizer",
    description: "Trace a neuron from pixels through weights and activation.",
    type: "PREDICT",
    difficulty: "Advanced",
    problem: "Compute a simple neuron output using a weighted sum and ReLU activation.",
    starterCode: `def neuron(inputs, weights, bias):\n    return 0`,
    tests: [
      { id: "01", input: "([1,2],[0.5,0.25],0)", expected: "1.0" },
      { id: "02", input: "([1,1],[-1,-1],0)", expected: "0" },
    ],
    hints: [
      "Multiply each input by its weight.",
      "Add the bias.",
      "ReLU keeps positive values and maps negative values to zero.",
    ],
    solution: `def neuron(inputs, weights, bias):\n    total = sum(x * w for x, w in zip(inputs, weights)) + bias\n    return max(0, total)`,
    explanation:
      "A forward pass combines inputs, weights, bias, and activation. Training later adjusts weights through a learning signal.",
  },
  {
    moduleId: "3.15",
    topic: "Tokenization and TF-IDF",
    title: "Detect the Mood of a Review",
    description: "Prepare text features before comparing them with a pretrained pipeline.",
    type: "BUILD",
    difficulty: "Intermediate",
    problem:
      "Tokenize a review into lowercase words while removing stopwords so the remaining terms can become text features.",
    starterCode: `def tokens(review, stopwords):\n    return []`,
    tests: [
      {
        id: "01",
        input: '("The movie was not good", ["the","was"])',
        expected: '["movie","not","good"]',
      },
    ],
    hints: [
      "Normalize case first.",
      "Split into words.",
      "Do not remove every short word; use the supplied stopword set.",
    ],
    solution: `def tokens(review, stopwords):\n    return [word for word in review.lower().split() if word not in set(stopwords)]`,
    explanation:
      "Tokenization and stopword choices shape downstream Bag of Words, TF-IDF, sentiment, and transformer inputs.",
  },
  {
    moduleId: "3.16",
    topic: "Structured outputs and function calling",
    title: "Make the LLM Return Reliable JSON",
    description: "Define and validate a response contract for an AI feature.",
    type: "BUILD",
    difficulty: "Intermediate",
    problem:
      "Validate that a model response contains a string summary and a list of action items. Return a safe error when the structure is wrong.",
    starterCode: `def validate_response(response):\n    return {}`,
    tests: [
      {
        id: "01",
        input: '{"summary":"Ready","actions":["ship"]}',
        expected: '{"summary":"Ready","actions":["ship"]}',
      },
      { id: "02", input: '{"summary":7,"actions":[]}', expected: '{"error":"invalid schema"}' },
    ],
    hints: [
      "Treat model output as untrusted input.",
      "Check both field types.",
      "A Pydantic model would make this contract explicit in production.",
    ],
    solution: `def validate_response(response):\n    if isinstance(response.get("summary"), str) and isinstance(response.get("actions"), list): return response\n    return {"error": "invalid schema"}`,
    explanation:
      "Structured output turns a probabilistic response into a testable interface for chains, tools, and applications.",
  },
  {
    moduleId: "3.17",
    topic: "OpenCV pixels and edge detection",
    title: "Find the Edges",
    description: "Prepare an image matrix for an edge-detection step.",
    type: "EXPERIMENT",
    difficulty: "Intermediate",
    problem:
      "Convert RGB pixels to a simple grayscale intensity using the channel average, preserving one value per pixel.",
    starterCode: `def grayscale(pixels):\n    return []`,
    tests: [
      { id: "01", input: "[[255,0,0],[0,0,0]]", expected: "[85,0]" },
      { id: "02", input: "[[255,255,255]]", expected: "[255]" },
    ],
    hints: [
      "Each pixel has three channels.",
      "Average the channels before filtering.",
      "Resolution and channel shape matter to OpenCV operations.",
    ],
    solution: `def grayscale(pixels):\n    return [sum(pixel) // len(pixel) for pixel in pixels]`,
    explanation:
      "Vision pipelines begin with pixel representation and preprocessing before OpenCV filters, YOLO detection, CLIP, or transfer learning.",
  },
  {
    moduleId: "3.18",
    topic: "Automation workflows and tools",
    title: "Build a Research Assistant Workflow",
    description: "Choose a deterministic workflow for search, summarization, and delivery.",
    type: "BUILD",
    difficulty: "Intermediate",
    problem:
      "Return the ordered workflow steps for a research assistant that searches sources, summarizes evidence, and sends a structured brief.",
    starterCode: `def research_workflow():\n    return []`,
    tests: [{ id: "01", input: "()", expected: '["search","collect","summarize","deliver"]' }],
    hints: [
      "Each step should have one job.",
      "Use tools for external interactions.",
      "A fixed repeatable workflow does not need agent autonomy everywhere.",
    ],
    solution: `def research_workflow():\n    return ["search", "collect", "summarize", "deliver"]`,
    explanation:
      "Automation is about choosing the right boundary between fixed workflows and agents with tools, memory, and planning.",
  },
  {
    moduleId: "3.19",
    topic: "FastAPI, React, and persistence",
    title: "Turn the AI Feature Into a Web App",
    description: "Specify the contract between a frontend and a persistent backend.",
    type: "BUILD",
    difficulty: "Advanced",
    problem:
      "Return the request fields required for a frontend to save a user's AI note through a backend endpoint.",
    starterCode: `def save_note_payload(user_id, text):\n    return {}`,
    tests: [{ id: "01", input: '("u1","Try RAG")', expected: '{"user_id":"u1","text":"Try RAG"}' }],
    hints: [
      "The backend needs an identity and the content.",
      "React state alone will disappear on refresh.",
      "Authentication and persistence are separate concerns.",
    ],
    solution: `def save_note_payload(user_id, text):\n    return {"user_id": user_id, "text": text}`,
    explanation:
      "A full-stack AI application connects a UI, FastAPI-style backend, authentication boundary, AI feature, and persistent store.",
  },
  {
    moduleId: "3.20",
    topic: "Advanced AI project delivery",
    title: "Ship an Evidence-Backed AI Product",
    description: "Turn a larger idea into a reviewable product brief.",
    type: "BUILD",
    difficulty: "Advanced",
    problem:
      "Return the evidence an advanced project must include before a demo: frontend, AI component, deployment, documentation, and results.",
    starterCode: `def project_evidence():\n    return []`,
    tests: [
      {
        id: "01",
        input: "()",
        expected: '["frontend","ai","deployment","documentation","results"]',
      },
    ],
    hints: [
      "A project is more than a model call.",
      "Make the result inspectable by another engineer.",
      "Include both outcomes and limitations.",
    ],
    solution: `def project_evidence():\n    return ["frontend", "ai", "deployment", "documentation", "results"]`,
    explanation:
      "Advanced project work demonstrates integration and communication, not just isolated technical novelty.",
  },
];

export const allCurriculumChallenges: CurriculumChallenge[] = moduleSpecificChallenges.map(
  (challenge) => ({
    ...challenge,
    id: `challenge-${challenge.moduleId.replace(".", "-")}-${challenge.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}`,
  }),
);

export function getChallengeForModule(moduleId: `3.${number}`): CurriculumChallenge {
  const challenge = allCurriculumChallenges.find((item) => item.moduleId === moduleId);
  if (!challenge) throw new Error(`No challenge configured for curriculum module: ${moduleId}`);
  return challenge;
}

export function validateChallengeLibrary(
  challenges: CurriculumChallenge[] = allCurriculumChallenges,
) {
  const ids = challenges.map((challenge) => challenge.id);
  const problems = challenges.map((challenge) => challenge.problem);
  const validModules = new Set(curriculumModules.map((module) => module.code));
  return {
    uniqueIds: new Set(ids).size === ids.length,
    uniqueProblems: new Set(problems).size === problems.length,
    validModuleIds: challenges.every((challenge) => validModules.has(challenge.moduleId)),
    completeUnits: challenges.every(
      (challenge) =>
        challenge.id &&
        challenge.starterCode &&
        challenge.tests.length > 0 &&
        challenge.hints.length > 0 &&
        challenge.solution &&
        challenge.explanation,
    ),
  };
}

export type AssessmentQuestion = {
  id: string;
  moduleId: `3.${number}`;
  topic: string;
  type: "PREDICTION" | "SCENARIO" | "DEBUG";
  prompt: string;
  options: string[];
  correctIndex: number;
  hint: string;
  explanation: string;
  misconception: string;
};

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "python-output",
    moduleId: "3.2",
    topic: "Python variables and functions",
    type: "PREDICTION",
    prompt: "Before you run it, what does this Python return?",
    options: ["12", "15", "TypeError", "A list containing 15"],
    correctIndex: 1,
    hint: "The function adds the argument to the value stored in bonus.",
    explanation:
      "Python looks up bonus from the surrounding scope, then adds it to score: 10 + 5 = 15. Predicting scope behavior helps you inspect AI-generated code instead of trusting it blindly.",
    misconception:
      "The function receives score, but bonus is still available from the surrounding scope.",
  },
  {
    id: "api-request",
    moduleId: "3.4",
    topic: "HTTP requests and JSON",
    type: "SCENARIO",
    prompt: "Your chatbot must send a user's message to an AI API. Which request is the best fit?",
    options: [
      "GET with the message only in the URL",
      "POST with a JSON body and an API key kept in environment configuration",
      "POST with the API key hard-coded in the browser",
      "GET with an empty body and no authentication",
    ],
    correctIndex: 1,
    hint: "The program is sending structured information and must protect a credential.",
    explanation:
      "POST communicates a JSON payload, while environment configuration keeps the API key out of source code and client-visible code. GET is primarily for retrieving a resource.",
    misconception:
      "The method and credential handling solve different problems: POST carries the data; environment configuration protects the key.",
  },
  {
    id: "ml-metric",
    moduleId: "3.8",
    topic: "RAG evaluation metrics",
    type: "SCENARIO",
    prompt:
      "A support-ticket classifier must avoid incorrectly flagging urgent customer issues as spam. What should you inspect closely?",
    options: [
      "Precision, because false positives are costly",
      "Only training accuracy",
      "The number of features",
      "The chart color",
    ],
    correctIndex: 0,
    hint: "Ask which error is more damaging: a false positive or a false negative.",
    explanation:
      "Precision asks how many predicted spam items were actually spam. When false positives are costly, precision reveals whether legitimate tickets are being incorrectly flagged; accuracy alone can hide that failure.",
    misconception:
      "A high accuracy score can still conceal harmful false positives, especially when classes are imbalanced.",
  },
  {
    id: "rag-failure",
    moduleId: "3.7",
    topic: "RAG failure analysis",
    type: "DEBUG",
    prompt:
      "The source document contains the answer, but the model says it cannot find it. Where do you investigate first?",
    options: [
      "Retrieval and the context passed to generation",
      "The UI button color",
      "The model's temperature only",
      "The portfolio README",
    ],
    correctIndex: 0,
    hint: "Trace the evidence path: ingestion, chunks, retrieval, context, then generation.",
    explanation:
      "If the document is present but the answer is absent, inspect whether useful chunks were retrieved and actually placed in the generation context. This separates retrieval failure from generation behavior.",
    misconception: "Changing temperature cannot recover evidence that never reached the model.",
  },
];

const moduleQuestionScenarios: Record<string, [string, string[], number, string]> = {
  "3.1": [
    "An AI-generated script fails in production. What is the most useful first move?",
    [
      "Run it again unchanged",
      "Read the code, reproduce the failure, and inspect the error",
      "Delete the project",
      "Add more libraries",
    ],
    1,
    "Generated code still needs human review and debugging.",
  ],
  "3.3": [
    "A CSV has numeric columns loaded as text. What should you do before plotting?",
    [
      "Convert and validate the types",
      "Rename the file",
      "Train a model",
      "Increase the chart size",
    ],
    0,
    "Reliable plots depend on correctly typed data.",
  ],
  "3.5": [
    "Your chatbot repeats one answer for every message. What should you add first?",
    ["An input and response-handling path", "A second logo", "A larger font", "A random delay"],
    0,
    "A chatbot needs a message input, API call, and response path.",
  ],
  "3.7": [
    "You need to show sales changing month by month. Which chart communicates the trend?",
    ["Line chart", "Heatmap", "Single KPI", "Unsorted text list"],
    0,
    "A line chart makes change over an ordered time axis visible.",
  ],
  "3.8": [
    "You want a model to predict whether a ticket is urgent. What are the labels?",
    ["The target urgency values", "The row numbers", "The chart title", "The API key"],
    0,
    "Labels are the outcomes the model learns to predict.",
  ],
  "3.9": [
    "Before celebrating a high model score, what should your project include?",
    [
      "A held-out evaluation and documented limitations",
      "Only training accuracy",
      "A renamed dataset",
      "A screenshot without results",
    ],
    0,
    "A project is credible when evaluation and limitations are visible.",
  ],
  "3.10": [
    "A Streamlit app works locally but not for users. What is missing?",
    [
      "A deployment target and reproducible dependencies",
      "More notebook cells",
      "A private screenshot",
      "A new chart color",
    ],
    0,
    "Deployment requires a reproducible environment and reachable URL.",
  ],
  "3.11": [
    "A Python API call can fail. Which design keeps the app useful?",
    [
      "Explicit exception handling with a meaningful fallback",
      "A bare except that hides every error",
      "Removing validation",
      "Ignoring the response",
    ],
    0,
    "Error handling should surface failures without silently swallowing them.",
  ],
  "3.12": [
    "You merge two datasets and the row count unexpectedly doubles. What should you inspect?",
    [
      "Join keys and duplicate relationships",
      "The plot font",
      "The README title",
      "The Python version only",
    ],
    0,
    "Merging requires checking keys and whether the relationship is one-to-one.",
  ],
  "3.14": [
    "A neural network makes the same prediction for every input. What should you inspect?",
    [
      "Inputs, weights, and the learning signal",
      "The browser tab title",
      "The Git remote name",
      "The chart legend",
    ],
    0,
    "Outputs depend on the data flowing through learned weights and layers.",
  ],
  "3.15": [
    "A sentiment model sees 'not helpful' as positive. What should you investigate?",
    [
      "Tokenization and language context",
      "The image resolution",
      "The API billing page",
      "The CSS spacing",
    ],
    0,
    "NLP failures can come from how text is tokenized and represented.",
  ],
  "3.16": [
    "Your application needs machine-readable model responses. What is the strongest approach?",
    [
      "Structured output with a validated JSON schema",
      "A longer prose prompt only",
      "Higher temperature",
      "Copying the response manually",
    ],
    0,
    "A schema makes the response contract explicit and testable.",
  ],
  "3.17": [
    "A vision model performs poorly on dark images. What should you inspect first?",
    [
      "Image channels and preprocessing",
      "The text tokenizer",
      "The database index",
      "The README length",
    ],
    0,
    "Pixel channels and preprocessing affect what the vision model receives.",
  ],
  "3.18": [
    "A workflow repeats the same fixed steps every time. What should you prefer?",
    [
      "A deterministic automation workflow",
      "An agent with unrestricted tools",
      "A random model call",
      "No logging",
    ],
    0,
    "Agents add flexibility; fixed workflows are safer for fixed repeatable steps.",
  ],
  "3.19": [
    "A full-stack AI feature needs user data to survive refreshes. What layer provides that?",
    ["A persistent backend datastore", "Only React state", "A larger button", "A prompt example"],
    0,
    "Persistent data belongs in the backend or database, not only component state.",
  ],
  "3.20": [
    "A portfolio AI project is hard to evaluate. What would improve it most?",
    [
      "A live demo, architecture, results, and limitations",
      "More decorative gradients",
      "A hidden repository",
      "Removing failure cases",
    ],
    0,
    "Engineering evidence makes an advanced project reviewable.",
  ],
  "3.22": [
    "An LLM request is slow because the same context is sent repeatedly. What can help?",
    [
      "Caching stable context or responses",
      "Increasing temperature",
      "Deleting logs",
      "Adding unrelated tools",
    ],
    0,
    "Caching can reduce repeated work and improve latency.",
  ],
  "3.23": [
    "A research agent can reason but cannot inspect files. What is missing?",
    ["A file-inspection tool", "A second system prompt", "A chart legend", "A CSS class"],
    0,
    "Tools connect an agent's reasoning to external actions.",
  ],
  "3.24": [
    "A model needs new factual knowledge that changes weekly. Which approach is usually a better first choice?",
    [
      "RAG over current documents",
      "Fine-tuning every week",
      "Changing the button label",
      "Removing evaluation",
    ],
    0,
    "RAG can provide changing knowledge without retraining model weights.",
  ],
  "3.25": [
    "Semantic search returns related but outdated documents. What should you add?",
    [
      "Metadata filters and retrieval evaluation",
      "A bigger heading",
      "More random chunks",
      "No identifiers",
    ],
    0,
    "Production retrieval needs metadata controls and measured relevance.",
  ],
  "3.26": [
    "A model's live accuracy drops as user data changes. What should you monitor?",
    [
      "Data drift and model performance",
      "Only deployment color",
      "The README word count",
      "The icon set",
    ],
    0,
    "Monitoring drift connects changing inputs to system quality.",
  ],
  "3.27": [
    "A feature must serve many users with predictable latency. What should the design discuss?",
    [
      "Throughput, caching, reliability, and cost",
      "Only the prompt wording",
      "The logo size",
      "A single local notebook",
    ],
    0,
    "AI system design balances operational constraints, not just model quality.",
  ],
  "3.28": [
    "A user prompt tries to override system instructions and expose private context. What is this?",
    [
      "Prompt injection and possible PII leakage",
      "A visualization issue",
      "A type annotation",
      "A deployment region",
    ],
    0,
    "Treat untrusted instructions as an attack surface and protect private context.",
  ],
  "3.29": [
    "A recruiter opens your repository. What evidence helps them trust the work?",
    [
      "A clear README, architecture, decisions, and honest results",
      "Only a badge",
      "A hidden demo",
      "Unexplained generated files",
    ],
    0,
    "Portfolio polish makes engineering decisions and evidence easy to inspect.",
  ],
  "3.30": [
    "Which capstone is strongest evidence of production AI ability?",
    [
      "A deployed RAG app with evaluation, monitoring, and documented users",
      "An isolated notebook with no results",
      "A copied prompt",
      "A static mockup",
    ],
    0,
    "The capstone should demonstrate an engineered, evaluated, deployed system.",
  ],
};

for (const module of curriculumModules) {
  if (
    module.code === "3.2" ||
    module.code === "3.4" ||
    module.code === "3.6" ||
    module.code === "3.8" ||
    module.code === "3.7"
  )
    continue;
  const scenario = moduleQuestionScenarios[module.code];
  if (!scenario) continue;
  const [prompt, options, correctIndex, explanation] = scenario;
  assessmentQuestions.push({
    id: `module-${module.code}`,
    moduleId: module.code,
    topic: module.topics[0] ?? module.title,
    type: "SCENARIO",
    prompt,
    options,
    correctIndex,
    hint: `Connect the decision to ${module.topics.slice(0, 2).join(" and ")}.`,
    explanation,
    misconception:
      "The tempting alternative focuses on presentation or a shortcut rather than the module's engineering goal.",
  });
}

export function validateAssessmentQuestions(questions: AssessmentQuestion[] = assessmentQuestions) {
  const moduleIds = new Set(curriculumModules.map((module) => module.code));
  const ids = questions.map((question) => question.id);
  return {
    uniqueIds: new Set(ids).size === ids.length,
    validModuleIds: questions.every((question) => moduleIds.has(question.moduleId)),
    everyModuleHasMultiple: curriculumModules.every(
      (module) => questions.filter((question) => question.moduleId === module.code).length >= 2,
    ),
    noGlobalQuestionSet: curriculumModules.every((module) => {
      const moduleQuestionIds = questions
        .filter((question) => question.moduleId === module.code)
        .map((question) => question.id);
      return (
        moduleQuestionIds.length > 0 && moduleQuestionIds.some((id) => id !== questions[0]?.id)
      );
    }),
  };
}

for (const module of curriculumModules) {
  const base = assessmentQuestions.find((question) => question.moduleId === module.code);
  const seed =
    base ??
    ({
      id: `module-${module.code}`,
      moduleId: module.code,
      topic: module.topics[0] ?? module.title,
      type: "SCENARIO",
      prompt: `You are applying ${module.topics[0]} in a real AI project. What should you inspect first?`,
      options: [
        `Evidence related to ${module.topics[0]}`,
        "Only the visual styling",
        "A random implementation from another module",
        "Nothing; generated code is always correct",
      ],
      correctIndex: 0,
      hint: `Start with observable behavior and the ${module.topics[0]} concept.`,
      explanation: `Module ${module.code} is practical: inspect evidence, connect it to ${module.topics[0]}, and then make a measured change.`,
      misconception:
        "The tempting shortcut skips the evidence needed to make a reliable engineering decision.",
    } satisfies AssessmentQuestion);
  if (!base) assessmentQuestions.push(seed);
  assessmentQuestions.push({
    ...seed,
    id: `${seed.id}-apply`,
    type: "SCENARIO",
    prompt: `You are applying ${module.topics[0]} in a real AI project. What should you inspect before changing the implementation?`,
    options: [
      `The ${module.topics[0]} evidence and current behavior`,
      "Only the visual styling",
      "A random implementation from another module",
      "Nothing; generated code is always correct",
    ],
    correctIndex: 0,
    hint: `Start with observable behavior and the ${module.topics[0]} concept.`,
    explanation: `Module ${module.code} is practical: inspect evidence, connect it to ${module.topics[0]}, and then make a measured change.`,
    misconception:
      "The tempting shortcut skips the evidence needed to make a reliable engineering decision.",
  });
}

if (import.meta.env.DEV) {
  const challengeValidation = validateChallengeLibrary();
  const assessmentValidation = validateAssessmentQuestions();
  if (Object.values(challengeValidation).some((valid) => !valid)) {
    throw new Error(`Invalid curriculum challenge library: ${JSON.stringify(challengeValidation)}`);
  }
  if (Object.values(assessmentValidation).some((valid) => !valid)) {
    throw new Error(`Invalid curriculum assessment bank: ${JSON.stringify(assessmentValidation)}`);
  }
}

export const projectMilestones = [
  {
    title: "LLM Chatbot (Python + API)",
    detail: "Streaming chat with system prompt, history, temperature control, and token logging. Maps to modules 01–05.",
    tasks: ["README and .env.example", "Pinned requirements", "2-minute demo script"],
    done: true,
  },
  {
    title: "Semantic Search System",
    detail: "Index notes with embeddings and query by natural language with scores and metadata. Maps to module 06.",
    tasks: ["Index build script", "Query CLI", "Similarity metric write-up"],
    done: true,
  },
  {
    title: "RAG-based PDF Q&A",
    detail: "Ingest PDFs, chunk, retrieve, and answer with citations plus an abstain path. Maps to modules 07–09.",
    tasks: ["Sample PDFs", "15-question eval set", "Faithfulness notes"],
    done: false,
  },
  {
    title: "AI Agent with Tools",
    detail: "Function-calling agent with at least two tools, a max step count, and logged traces. Maps to modules 10–11.",
    tasks: ["Success trace", "Tool-error trace", "Max-steps stop"],
    done: false,
  },
  {
    title: "Automation Assistant",
    detail: "Bounded workflow with human confirmation before side effects. Maps to modules 11–12 and 17.",
    tasks: ["Graph or state diagram", "Confirmation step", "Safety note"],
    done: false,
  },
  {
    title: "Multi-Agent System",
    detail: "Supervisor plus two specialists with round limits and a failure-mode analysis. Maps to modules 12–13 and 17.",
    tasks: ["Architecture diagram", "Demo transcript", "One-page failure analysis"],
    done: false,
  },
];

export const gaps = [
  {
    title: "Grounded RAG answers",
    score: "In progress",
    reason: "Practice citations, abstention, and a 15-question faithfulness eval.",
    route: "/learning-mode",
  },
  {
    title: "Bounded tool-using agents",
    score: "Not started",
    reason: "Add max steps, traces, and confirmation before side effects.",
    route: "/projects",
  },
  {
    title: "Production guardrails",
    score: "Not started",
    reason: "Cover secrets, prompt-injection resistance, tracing, and cost caps.",
    route: "/learning-mode",
  },
];

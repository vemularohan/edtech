export type TopicStatus = "mastered" | "in-progress" | "available" | "locked";

export const subjects = [
  { name: "Data Structures", progress: 64, tone: "brand" },
  { name: "Database Systems", progress: 41, tone: "lilac" },
  { name: "Computer Networks", progress: 28, tone: "peach" },
  { name: "Object Oriented Programming", progress: 77, tone: "mint" },
  { name: "Discrete Mathematics", progress: 53, tone: "brand" },
  { name: "Digital Logic Design", progress: 35, tone: "lilac" },
];

export const nodes = [
  { id: "fundamentals", label: "Programming Fundamentals", x: 4, y: 18, status: "mastered" as TopicStatus, meta: "CSE · Unit 1" },
  { id: "oop", label: "Object Oriented Programming", x: 22, y: 18, status: "mastered" as TopicStatus, meta: "OOP · Unit 2" },
  { id: "arrays", label: "Arrays & Pointers", x: 40, y: 18, status: "mastered" as TopicStatus, meta: "DSA · Unit 2" },
  { id: "linked-lists", label: "Linked Lists", x: 58, y: 18, status: "mastered" as TopicStatus, meta: "DSA · Unit 2" },
  { id: "trees", label: "Trees & BST", x: 76, y: 18, status: "in-progress" as TopicStatus, meta: "DSA · Unit 4" },
  { id: "graphs", label: "Graph Algorithms", x: 92, y: 18, status: "locked" as TopicStatus, meta: "DSA · Unit 5" },
  { id: "recursion", label: "Recursion", x: 31, y: 55, status: "available" as TopicStatus, meta: "DSA · Unit 3" },
  { id: "stacks", label: "Stacks", x: 49, y: 55, status: "mastered" as TopicStatus, meta: "DSA · Unit 3" },
  { id: "queues", label: "Queues", x: 67, y: 55, status: "in-progress" as TopicStatus, meta: "DSA · Unit 3" },
  { id: "sorting", label: "Sorting & Searching", x: 85, y: 55, status: "available" as TopicStatus, meta: "DSA · Unit 4" },
  { id: "sql", label: "SQL & Normalization", x: 13, y: 84, status: "in-progress" as TopicStatus, meta: "DBMS · Unit 2" },
  { id: "networks", label: "Networks & TCP/IP", x: 34, y: 84, status: "available" as TopicStatus, meta: "CN · Unit 3" },
  { id: "projects", label: "Projects", x: 57, y: 84, status: "available" as TopicStatus, meta: "Build track" },
  { id: "career", label: "Career Skills", x: 80, y: 84, status: "locked" as TopicStatus, meta: "Placement track" },
];

export const timeline = [
  { date: "Mon", minutes: 42 }, { date: "Tue", minutes: 68 }, { date: "Wed", minutes: 35 },
  { date: "Thu", minutes: 84 }, { date: "Fri", minutes: 54 }, { date: "Sat", minutes: 96 }, { date: "Sun", minutes: 26 },
];

export const weekTrend = [
  { week: "W1", score: 48 }, { week: "W2", score: 53 }, { week: "W3", score: 61 },
  { week: "W4", score: 58 }, { week: "W5", score: 72 }, { week: "W6", score: 78 },
];

export const skillData = [
  { skill: "Arrays", mastery: 92 }, { skill: "Recursion", mastery: 54 }, { skill: "OOP", mastery: 81 },
  { skill: "SQL", mastery: 48 }, { skill: "Networks", mastery: 36 }, { skill: "Testing", mastery: 67 },
];

export const heatmap = Array.from({ length: 70 }, (_, index) => ({
  id: index,
  intensity: [0, 1, 2, 3, 4, 2, 1, 3, 0, 2, 4, 1][index % 12],
}));

export const codingStarter = `def binary_search(nums, target):
    low, high = 0, len(nums) - 1

    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`;

export const projectMilestones = [
  { title: "Data ingestion", detail: "Load documents, normalize tokens, and create a clean corpus.", tasks: ["Parse markdown and text files", "Tokenize and normalize terms", "Write a small corpus fixture"], done: true },
  { title: "Indexing structure", detail: "Build an inverted index backed by linked lists and hash maps.", tasks: ["Design term → postings shape", "Handle duplicate document hits", "Add index lookup tests"], done: true },
  { title: "Query engine", detail: "Turn a search query into ranked document candidates.", tasks: ["Split and clean the query", "Intersect posting lists", "Return top 10 candidates"], done: false },
  { title: "Ranking", detail: "Use term frequency to make results feel useful, not random.", tasks: ["Score term matches", "Sort by relevance", "Explain ranking to the user"], done: false },
  { title: "Polish & submit", detail: "Wrap the engine in a small interface and document decisions.", tasks: ["Add empty and typo states", "Write README with trade-offs", "Submit for AI review"], done: false },
];

export const gaps = [
  { title: "Recursion fluency", score: "54% mastery", reason: "4 of your last 6 recursive traces stopped at the base case too late.", route: "/learning-mode" },
  { title: "REST API design", score: "Not started", reason: "Your Software Engineer track needs one production-shaped API project.", route: "/projects" },
  { title: "SQL joins", score: "48% mastery", reason: "Your last DBMS quiz missed 3 multi-table queries.", route: "/learning-mode" },
];
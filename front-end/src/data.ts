export interface Repository {
  id: number;
  name: string;
  owner: string;
  description: string;
  language: string;
  languageIcon: string;
  languageColor: string;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  updatedAt: string;
  topics: string[];
  isFavorite: boolean;
}

export const repositories: Repository[] = [
  {
    id: 1,
    name: "react",
    owner: "facebook",
    description:
      "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    language: "JavaScript",
    languageIcon: "⚡",
    languageColor: "#f7df1e",
    stars: 203000,
    forks: 42300,
    watchers: 6500,
    openIssues: 1250,
    difficulty: "intermediate",
    updatedAt: "2023-10-15",
    topics: ["frontend", "ui", "javascript", "library"],
    isFavorite: true,
  },
  {
    id: 2,
    name: "tensorflow",
    owner: "tensorflow",
    description: "An open source machine learning framework for everyone",
    language: "Python",
    languageIcon: "🐍",
    languageColor: "#3776ab",
    stars: 175000,
    forks: 88000,
    watchers: 9800,
    openIssues: 2100,
    difficulty: "advanced",
    updatedAt: "2023-10-12",
    topics: ["machine-learning", "ai", "deep-learning", "python"],
    isFavorite: false,
  },
  {
    id: 3,
    name: "vscode",
    owner: "microsoft",
    description: "Visual Studio Code",
    language: "TypeScript",
    languageIcon: "🔷",
    languageColor: "#3178c6",
    stars: 148000,
    forks: 26000,
    watchers: 3200,
    openIssues: 750,
    difficulty: "intermediate",
    updatedAt: "2023-10-18",
    topics: ["editor", "development", "typescript", "electron"],
    isFavorite: true,
  },
  {
    id: 4,
    name: "flutter",
    owner: "flutter",
    description:
      "Flutter makes it easy and fast to build beautiful apps for mobile and beyond",
    language: "Dart",
    languageIcon: "🎯",
    languageColor: "#0175c2",
    stars: 152000,
    forks: 24800,
    watchers: 3700,
    openIssues: 11200,
    difficulty: "intermediate",
    updatedAt: "2023-10-14",
    topics: ["mobile", "ui", "cross-platform", "dart"],
    isFavorite: false,
  },
  {
    id: 5,
    name: "rust",
    owner: "rust-lang",
    description:
      "Empowering everyone to build reliable and efficient software.",
    language: "Rust",
    languageIcon: "🦀",
    languageColor: "#dea584",
    stars: 83000,
    forks: 11500,
    watchers: 1400,
    openIssues: 8300,
    difficulty: "advanced",
    updatedAt: "2023-10-16",
    topics: ["systems-programming", "language", "performance", "safety"],
    isFavorite: false,
  },
  {
    id: 6,
    name: "next.js",
    owner: "vercel",
    description: "The React Framework for the Web",
    language: "JavaScript",
    languageIcon: "⚡",
    languageColor: "#f7df1e",
    stars: 112000,
    forks: 24600,
    watchers: 2100,
    openIssues: 2300,
    difficulty: "beginner",
    updatedAt: "2023-10-17",
    topics: ["react", "framework", "javascript", "web"],
    isFavorite: true,
  },
  {
    id: 7,
    name: "tailwindcss",
    owner: "tailwindlabs",
    description: "A utility-first CSS framework for rapid UI development",
    language: "CSS",
    languageIcon: "🎨",
    languageColor: "#563d7c",
    stars: 71000,
    forks: 3800,
    watchers: 950,
    openIssues: 320,
    difficulty: "beginner",
    updatedAt: "2023-10-13",
    topics: ["css", "frontend", "design", "utility"],
    isFavorite: false,
  },
  {
    id: 8,
    name: "pytorch",
    owner: "pytorch",
    description:
      "Tensors and Dynamic neural networks in Python with strong GPU acceleration",
    language: "Python",
    languageIcon: "🐍",
    languageColor: "#3776ab",
    stars: 68000,
    forks: 19000,
    watchers: 2300,
    openIssues: 9800,
    difficulty: "advanced",
    updatedAt: "2023-10-11",
    topics: ["machine-learning", "deep-learning", "python", "ai"],
    isFavorite: false,
  },
  {
    id: 9,
    name: "node",
    owner: "nodejs",
    description: "Node.js JavaScript runtime",
    language: "JavaScript",
    languageIcon: "⚡",
    languageColor: "#f7df1e",
    stars: 95000,
    forks: 26500,
    watchers: 3100,
    openIssues: 1350,
    difficulty: "intermediate",
    updatedAt: "2023-10-19",
    topics: ["javascript", "runtime", "server", "node"],
    isFavorite: true,
  },
  {
    id: 10,
    name: "kubernetes",
    owner: "kubernetes",
    description: "Production-Grade Container Orchestration",
    language: "Go",
    languageIcon: "🔵",
    languageColor: "#00ADD8",
    stars: 98000,
    forks: 36000,
    watchers: 3400,
    openIssues: 2200,
    difficulty: "advanced",
    updatedAt: "2023-10-20",
    topics: ["containers", "orchestration", "cloud", "devops"],
    isFavorite: false,
  },
  {
    id: 11,
    name: "vue",
    owner: "vuejs",
    description:
      "Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.",
    language: "JavaScript",
    languageIcon: "⚡",
    languageColor: "#f7df1e",
    stars: 203000,
    forks: 33000,
    watchers: 6100,
    openIssues: 580,
    difficulty: "beginner",
    updatedAt: "2023-10-18",
    topics: ["javascript", "framework", "frontend", "vue"],
    isFavorite: false,
  },
  {
    id: 12,
    name: "svelte",
    owner: "sveltejs",
    description: "Cybernetically enhanced web apps",
    language: "JavaScript",
    languageIcon: "⚡",
    languageColor: "#f7df1e",
    stars: 71000,
    forks: 3700,
    watchers: 1200,
    openIssues: 750,
    difficulty: "beginner",
    updatedAt: "2023-10-16",
    topics: ["javascript", "framework", "frontend", "compiler"],
    isFavorite: true,
  },
];

export const languages = [
  { value: "all", label: "All Languages" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "TypeScript", label: "TypeScript" },
  { value: "Python", label: "Python" },
  { value: "Rust", label: "Rust" },
  { value: "Dart", label: "Dart" },
  { value: "CSS", label: "CSS" },
  { value: "Go", label: "Go" },
];

export const difficulties = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export const starFilters = [
  { value: "all", label: "Any Stars" },
  { value: "1000", label: "> 1K" },
  { value: "10000", label: "> 10K" },
  { value: "50000", label: "> 50K" },
  { value: "100000", label: "> 100K" },
];

export const forkFilters = [
  { value: "all", label: "Any Forks" },
  { value: "1000", label: "> 1K" },
  { value: "5000", label: "> 5K" },
  { value: "20000", label: "> 20K" },
  { value: "50000", label: "> 50K" },
];

export const issueFilters = [
  { value: "all", label: "Any Issues" },
  { value: "low", label: "< 500" },
  { value: "medium", label: "500-2000" },
  { value: "high", label: "> 2000" },
];

export const topicFilters = [
  { value: "all", label: "All Topics" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "machine-learning", label: "Machine Learning" },
  { value: "mobile", label: "Mobile" },
  { value: "devops", label: "DevOps" },
];

export const experienceLevels = [
  { id: "beginner", label: "Less than 1 year" },
  { id: "intermediate", label: "1-3 years" },
  { id: "advanced", label: "3-5 years" },
  { id: "expert", label: "5+ years" },
];

export const userExperience = {
  languages: ["JavaScript", "TypeScript"],
  experienceLevel: "intermediate",
};

export const programmingLanguages = [
  { value: "javascript", label: "⚡ JavaScript" },
  { value: "typescript", label: "🔷 TypeScript" },
  { value: "python", label: "🐍 Python" },
  { value: "java", label: "☕ Java" },
  { value: "csharp", label: "🔶 C#" },
  { value: "cpp", label: "🔧 C++" },
  { value: "c", label: "📝 C" },
  { value: "go", label: "🔵 Go" },
  { value: "rust", label: "🦀 Rust" },
  { value: "ruby", label: "💎 Ruby" },
  { value: "php", label: "🐘 PHP" },
  { value: "swift", label: "🐦 Swift" },
  { value: "kotlin", label: "🟢 Kotlin" },
];

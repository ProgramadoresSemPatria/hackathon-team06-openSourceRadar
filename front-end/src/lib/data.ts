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

export const languaguesData: Record<string, { icon: string; color: string }> = {
  javascript: {
    icon: "🌟",
    color: "#F7DF1E",
  },
  typescript: {
    icon: "🌀",
    color: "#3178C6",
  },
  python: {
    icon: "🐍",
    color: "#3776AB",
  },
  java: {
    icon: "☕",
    color: "#007396",
  },
  c: {
    icon: "🔵",
    color: "#A8B9CC",
  },
  cpp: {
    icon: "🚀",
    color: "#00599C",
  },
  csharp: {
    icon: "🎸",
    color: "#239120",
  },
  php: {
    icon: "🐘",
    color: "#777BB4",
  },
  ruby: {
    icon: "💎",
    color: "#CC342D",
  },
  swift: {
    icon: "🦅",
    color: "#FA7343",
  },
  kotlin: {
    icon: "🤖",
    color: "#0095D5",
  },
  go: {
    icon: "🐹",
    color: "#00ADD8",
  },
  rust: {
    icon: "🦀",
    color: "#000000",
  },
  dart: {
    icon: "🎯",
    color: "#0175C2",
  },
  html: {
    icon: "📜",
    color: "#E34F26",
  },
  css: {
    icon: "🎨",
    color: "#1572B6",
  },
  sql: {
    icon: "📊",
    color: "#4479A1",
  },
};

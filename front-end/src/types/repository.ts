export interface Repository {
  id?: number;
  nodeId: string;
  full_name: string;
  description: string;
  forks_count: number;
  language: string;
  open_issues_count: number;
  stargazers_count: number;
  updated_at: string;
  url: string;
  topics: string[];
}

export interface GraphQlRepository {
  id: string;
  nameWithOwner: string;
  description: string;
  forkCount: number;
  primaryLanguage: { name: string };
  openIssues: { totalCount: number };
  stargazerCount: number;
  updatedAt: string;
  url: string;
  repositoryTopics: { nodes: { topic: { name: string } }[] };
}

export interface RepositoriesData {
  repositories: Repository[];
  totalCount: number;
}

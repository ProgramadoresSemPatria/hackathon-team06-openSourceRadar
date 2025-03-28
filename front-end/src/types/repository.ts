export interface Repository {
  id: number;
  name: string;
  full_name: string;
  description: string;
  forks_count: number;
  language: string;
  open_issues_count: number;
  stargazers_count: number;
  updated_at: string;
}

export interface RepositoriesData {
  repositories: Repository[];
  totalCount: number;
}

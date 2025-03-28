import { RepositoriesData } from "@/types/repository";
import { Endpoints } from "@octokit/types";
import { octokitRequest } from "./octokitRequest";

type Response = Endpoints["GET /search/repositories"]["response"]["data"];

export const fetchRepositories = async (
  searchParam: string,
  perPage: number,
  currentPage: number
): Promise<RepositoriesData | undefined> => {
  const query = `${searchParam || "stars:>10000"} is:public license:mit`;

  const response = await octokitRequest<Response>("GET /search/repositories", {
    q: query,
    sort: "stars",
    order: "desc",
    per_page: perPage,
    page: currentPage,
  });

  if (!response) return;

  const repositories = response.items.map((repository) => ({
    id: repository.id,
    name: repository.name,
    full_name: repository.full_name,
    description: repository.description || "Sem descrição",
    forks_count: repository.forks_count,
    language: repository.language || "Não especificado",
    open_issues_count: repository.open_issues_count,
    stargazers_count: repository.stargazers_count,
    url: repository.html_url,
    topics: repository.topics,
    updated_at: new Date(repository.updated_at).toLocaleDateString(),
  }));

  return {
    repositories,
    totalCount: response.total_count,
  };
};

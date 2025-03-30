import { RepositoriesData, Repository } from "@/types/repository";
import { Endpoints } from "@octokit/types";
import { octokitRequest } from "./octokitRequest";

type Response = Endpoints["GET /search/repositories"]["response"]["data"];

export const fetchRepositories = async (
  searchParam: string,
  perPage: number = 9,
  currentPage: number = 1
): Promise<RepositoriesData | undefined> => {
  // Adicione is:public para filtrar apenas repositórios públicos
  // Isso pode reduzir o número total de resultados
  const query = `${searchParam || "stars:>10000"} is:public`;

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
    topics: repository.topics || [],
    updated_at: new Date(repository.updated_at).toLocaleDateString(),
  }));

  // Limitando o número total de repositórios que reportamos
  // para evitar cálculos excessivos de paginação
  const totalCount = Math.min(response.total_count, 100);

  return {
    repositories,
    totalCount,
  };
};

export const fetchFavoriteRepositories = async (repoIds: string[]): Promise<Repository[]> => {
  if (!repoIds.length) return [];

  try {
    // Como a API não permite buscar múltiplos repositórios por ID de uma vez,
    // vamos fazer consultas individuais e combinar os resultados

    // Criar um array de promessas para buscar cada repositório
    const repoPromises = repoIds.map(async (repoId) => {
      try {
        // Primeiro, precisamos encontrar o full_name do repositório usando a API de busca
        const searchResponse = await octokitRequest<any>("GET /search/repositories", {
          q: `id:${repoId}`,
        });

        if (searchResponse && searchResponse.items && searchResponse.items.length > 0) {
          const repo = searchResponse.items[0];

          return {
            id: repo.id,
            name: repo.name,
            full_name: repo.full_name,
            description: repo.description || "Sem descrição",
            forks_count: repo.forks_count,
            language: repo.language || "Não especificado",
            open_issues_count: repo.open_issues_count,
            stargazers_count: repo.stargazers_count,
            url: repo.html_url,
            topics: repo.topics || [],
            updated_at: new Date(repo.updated_at).toLocaleDateString(),
          } as Repository;
        }
        return null;
      } catch (error) {
        console.error(`Erro ao buscar repositório ${repoId}:`, error);
        return null;
      }
    });

    // Aguardar todas as promessas serem resolvidas
    const results = await Promise.all(repoPromises);

    // Filtrar os resultados nulos
    return results.filter((repo): repo is Repository => repo !== null);
  } catch (error) {
    console.error("Erro ao buscar repositórios favoritos:", error);
    throw error;
  }
};

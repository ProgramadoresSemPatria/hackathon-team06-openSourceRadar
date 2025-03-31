// src/lib/fetchRecommendedRepositories.ts
import { Repository } from "@/types/repository";
import { octokitRequest } from "./octokitRequest";
import { Endpoints } from "@octokit/types";

type RecommendationOptions = {
  languages?: string[];
  experienceLevel?: string;
  perPage?: number;
  page?: number;
};

type Response = Endpoints["GET /search/repositories"]["response"]["data"];

export const fetchRecommendedRepositories = async (
  // userProfile: UserProfile | null,
  options: RecommendationOptions = {}
): Promise<{ repositories: Repository[]; totalCount: number }> => {
  const {
    languages = [],
    experienceLevel = "intermediate",
    perPage = 9,
    page = 1,
  } = options;

  try {
    // Construir uma consulta baseada nas preferências do usuário
    let query = "";

    // Adicionar linguagens preferidas
    if (languages && languages.length > 0) {
      const languageQuery = languages
        .slice(0, 3) // Limitar a 3 linguagens para não sobrecarregar a query
        .map((lang) => `language:${lang}`)
        .join(" OR ");

      if (languageQuery) {
        query = `(${languageQuery})`;
      }
    }

    // Ajustar a complexidade com base no nível de experiência
    if (experienceLevel) {
      // Para iniciantes, mostrar projetos mais amigáveis
      if (experienceLevel === "beginner") {
        query += " good-first-issues:>0 help-wanted-issues:>0";

        // Adicionar tópicos relevantes para iniciantes
        query += " OR topic:beginner-friendly OR topic:good-first-issue";
      }
      // Para níveis intermediários, projetos com documentação
      else if (experienceLevel === "intermediate") {
        query += " stars:>1000";
      }
      // Para níveis avançados, projetos mais complexos
      else if (experienceLevel === "advanced" || experienceLevel === "expert") {
        query += " stars:>5000 forks:>500";
      }
    }

    // Garantir que a consulta tenha algo
    if (!query.trim()) {
      query = "stars:>1000";
    }

    // Adicionar qualificadores comuns
    query += " is:public archived:false";

    // Buscar repositórios
    const response = await octokitRequest<Response>(
      "GET /search/repositories",
      {
        q: query,
        sort: "stars",
        order: "desc",
        per_page: perPage,
        page: page,
      }
    );

    if (!response) {
      return { repositories: [], totalCount: 0 };
    }

    const repos: Repository[] = response.items.map((repo) => ({
      id: repo.id,
      nodeId: repo.node_id,
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
    }));

    console.log(repos);

    return {
      repositories: repos,
      totalCount: Math.min(response.total_count, 1000), // GitHub API limita a 1000 resultados
    };
  } catch (error) {
    console.error("Erro ao buscar repositórios recomendados:", error);
    return { repositories: [], totalCount: 0 };
  }
};

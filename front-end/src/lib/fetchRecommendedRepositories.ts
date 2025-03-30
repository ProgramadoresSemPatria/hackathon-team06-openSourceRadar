// Arquivo: src/lib/fetchRecommendedRepositories.ts
import { Repository } from "@/types/repository";
import { UserProfile } from "./AuthContext";
import { octokitRequest } from "./octokitRequest";

type RecommendationOptions = {
  languages?: string[];
  experienceLevel?: string;
  perPage?: number;
  page?: number;
};

export const fetchRecommendedRepositories = async (
  userProfile: UserProfile | null,
  options: RecommendationOptions = {}
): Promise<{ repositories: Repository[]; totalCount: number }> => {
  const { languages = [], experienceLevel = "intermediate", perPage = 9, page = 1 } = options;

  try {
    // Construir uma consulta baseada nas preferências do usuário
    let query = "";

    // Adicionar linguagens preferidas
    if (languages.length > 0) {
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
    const response = await octokitRequest<any>("GET /search/repositories", {
      q: query,
      sort: "stars",
      order: "desc",
      per_page: perPage,
      page: page,
    });

    if (!response) {
      return { repositories: [], totalCount: 0 };
    }

    const repositories = response.items.map((repository: any) => ({
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
      totalCount: Math.min(response.total_count, 1000), // GitHub API limita a 1000 resultados
    };
  } catch (error) {
    console.error("Erro ao buscar repositórios recomendados:", error);
    return { repositories: [], totalCount: 0 };
  }
};

// src/components/SearchLandingPage/index.tsx
import { Clock3, GitFork, Package, Search, Star, Loader2 } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { useState } from "react";
import { Octokit } from "octokit";
import { Button } from "../../../components/ui/button";
import { useDebounce } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { RepositoryCard } from "../../../components/RepositoryCard";

// Define proper types
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

interface RepositoriesData {
  repositories: Repository[];
  totalCount: number;
}

// Create a singleton Octokit instance
const octokit = new Octokit();

export default function SearchSection() {
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 3;

  // The query function
  const fetchRepositories = async (): Promise<RepositoriesData> => {
    const query = `${debouncedSearch || "stars:>10000"} is:public license:mit`;

    try {
      const response = await octokit.request("GET /search/repositories", {
        q: query,
        sort: "stars",
        order: "desc",
        per_page: perPage,
        page: currentPage,
      });

      const items = response.data.items.map((item: any) => {
        const date = new Date(item.updated_at);
        const formattedDate = date.toISOString().split("T")[0];

        return {
          id: item.id,
          name: item.name,
          full_name: item.full_name,
          description: item.description || "Sem descrição",
          forks_count: item.forks_count,
          language: item.language || "Não especificado",
          open_issues_count: item.open_issues_count,
          stargazers_count: item.stargazers_count,
          updated_at: formattedDate,
        };
      });

      return {
        repositories: items,
        totalCount: response.data.total_count,
      };
    } catch (error: unknown) {
      // Type guard for the error
      if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        error.status === 403 &&
        "response" in error &&
        error.response &&
        typeof error.response === "object" &&
        "headers" in error.response &&
        error.response.headers &&
        typeof error.response.headers === "object" &&
        "x-ratelimit-remaining" in error.response.headers &&
        error.response.headers["x-ratelimit-remaining"] === "0"
      ) {
        const headers = error.response.headers;
        if ("x-ratelimit-reset" in headers && headers["x-ratelimit-reset"]) {
          const resetTime = headers["x-ratelimit-reset"];
          const resetDate =
            typeof resetTime === "string"
              ? new Date(parseInt(resetTime) * 1000)
              : new Date();
          throw new Error(
            `Limite de requisições GitHub atingido. Tente novamente após ${resetDate.toLocaleTimeString()}.`
          );
        }
      }
      throw new Error("Erro ao buscar repositórios: " + String(error));
    }
  };

  // Use React Query with explicit typing
  const { data, isLoading, error } = useQuery<RepositoriesData, Error>({
    queryKey: ["repositories", debouncedSearch, currentPage],
    queryFn: fetchRepositories,
    // Remove keepPreviousData as it's causing typing issues
  });

  // Use empty arrays as defaults to avoid null/undefined errors
  const repositories = data?.repositories ?? [];
  const totalCount = data?.totalCount ?? 0;
  const hasNextPage = currentPage * perPage < totalCount;

  return (
    <section className="flex flex-col">
      <div className="space-y-4 mb-6">
        <h2 className="text-muted-foreground max-w-2xl">
          Descubra projetos open source que combinam com seus interesses e nível
          de habilidade
        </h2>
      </div>

      <div className="space-y-4 mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            className="pl-10"
            placeholder="Buscar repositórios..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="text-center py-8 text-destructive">
          <p>{error.message}</p>
        </div>
      ) : (
        <div className="space-y-4 mb-6">
          <div className="grid gap-8 md:grid-cols-3">
            {repositories.map((repository: Repository) => (
              <RepositoryCard repo={repository} />
            ))}
          </div>
        </div>
      )}

      {totalCount > 0 && (
        <div className="space-y-4">
          <div className="flex justify-between">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage <= 1 || isLoading}
            >
              Anterior
            </Button>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" disabled>
                {currentPage}
              </Button>
              {hasNextPage && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  {currentPage + 1}
                </Button>
              )}
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={!hasNextPage || isLoading}
            >
              Próximo
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

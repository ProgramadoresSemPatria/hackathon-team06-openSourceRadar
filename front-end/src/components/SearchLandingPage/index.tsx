import { Clock3, GitFork, Package, Search, Star, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import { Octokit } from "octokit";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { useDebounce } from "@/lib/utils";

interface RepositoryType {
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

export default function SearchLandingPage() {
  const octokit = new Octokit();
  const [repositories, setRepositories] = useState<RepositoryType[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const perPage = 3;
  const hasNextPage = currentPage * perPage < totalCount;

  useEffect(() => {
    if (debouncedSearch || currentPage > 1) {
      searchOpenSourceRepos();
    }
  }, [debouncedSearch, currentPage]);

  const searchOpenSourceRepos = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await octokit.request("GET /search/repositories", {
        q: `${debouncedSearch || "stars:>10000"} is:public license:mit`,
        sort: "stars",
        order: "desc",
        per_page: perPage,
        page: currentPage,
      });

      const values: RepositoryType[] = response?.data?.items.map((value) => {
        const date = new Date(value.updated_at);
        const formattedDate = date.toISOString().split("T")[0];

        return {
          id: value.id,
          name: value.name,
          full_name: value.full_name,
          description: value.description || "Sem descrição",
          forks_count: value.forks_count,
          language: value.language || "Não especificado",
          open_issues_count: value.open_issues_count,
          stargazers_count: value.stargazers_count,
          updated_at: formattedDate,
        };
      });

      setRepositories(values);
      setTotalCount(response?.data?.total_count || 0);
    } catch (error) {
      console.error("Erro ao buscar repositórios:", error);
      setError("Não foi possível carregar os repositórios. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load of popular repositories
  useEffect(() => {
    searchOpenSourceRepos();
  }, []);

  return (
    <section className="bg-muted/40 py-20 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="space-y-4 mb-6">
          <h2 className="text-muted-foreground max-w-2xl">
            Descubra projetos open source que combinam com seus interesses e nível de habilidade
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

        <div className="space-y-4 mb-6">
          <Badge variant="outline" className="px-3 py-1 text-sm">
            Recomendados
          </Badge>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-destructive">
            <p>{error}</p>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            <div className="grid gap-8 md:grid-cols-3">
              {repositories.map((repository) => (
                <Card key={repository.id} className="bg-background">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <CardTitle>{repository.full_name}</CardTitle>
                    <CardDescription>{repository.description}</CardDescription>
                    <Badge variant="outline" className="px-2 py-1 text-sm bg-primary/10">
                      {repository.language}
                    </Badge>
                    <div className="flex flex-row justify-between text-muted-foreground text-sm">
                      <div className="flex flex-row">
                        <span className="flex flex-row mr-3">
                          <Star className="h-5 w-5" />
                          {" " + repository.stargazers_count}
                        </span>
                        <span className="flex flex-row">
                          <GitFork className="h-5 w-5" />
                          {" " + repository.forks_count}
                        </span>
                      </div>
                      <div className="flex flex-row justify-start">
                        <Clock3 className="h-5 w-5" />
                        {` Atualizado em ${repository.updated_at}`}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

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
                <Button size="sm" variant="outline" onClick={() => setCurrentPage((prev) => prev + 1)}>
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
      </div>
    </section>
  );
}

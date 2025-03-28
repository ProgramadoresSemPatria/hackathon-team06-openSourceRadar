import { Search, Loader2 } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { useDebounce } from "@/lib/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { RepositoryCard } from "../../../components/RepositoryCard";
import { RepositoriesData, Repository } from "@/types/repository";
import { fetchRepositories } from "@/lib/fetchRepositories";

export default function SearchSection() {
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearch = useDebounce(searchInput, 500);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 3;

  const { data, isLoading, error } = useQuery<RepositoriesData | undefined>({
    queryKey: ["repositories", debouncedSearch, currentPage],
    queryFn: () => fetchRepositories(debouncedSearch, perPage, currentPage),
  });

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

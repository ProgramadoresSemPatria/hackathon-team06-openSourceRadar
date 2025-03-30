// src/pages/private/Explore/index.tsx

import { useState, useCallback, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Filters, FilterValues } from "./Filters";
import { Pagination } from "@/components/Pagination";
import { PageLayout } from "@/components/PageLayout";
import { RepositoryCard } from "@/components/RespositoryCard";
import { Button } from "@/components/ui/button";
import { fetchRepositories, fetchFavoriteRepositories } from "@/lib/fetchRepositories";
import { RepositoriesData } from "@/types/repository";
import { Skeleton } from "@/components/RespositoryCard/skeleton";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useDebounce } from "@/lib/useDebounce";
import { toast } from "sonner";

export default function Explore() {
  const [activeTab, setActiveTab] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const { userProfile } = useAuth();
  const queryClient = useQueryClient();
  const perPage = 6; // Reduzir de 9 para 6 para diminuir o número de itens por página

  // Estado para armazenar os filtros atuais
  const [filters, setFilters] = useState<FilterValues>({
    searchQuery: "",
    language: "all",
    difficulty: "all",
    stars: "all",
    forks: "all",
    issues: "all",
    topic: "all",
  });

  // Debounce dos filtros
  const debouncedFilters = useDebounce(filters, 300);

  // Construir a query com base nos filtros
  const buildQuery = useCallback(
    (filters: FilterValues) => {
      // Verificar se há algum filtro específico aplicado
      const hasSpecificFilters =
        filters.searchQuery.trim() !== "" ||
        filters.language !== "all" ||
        filters.stars !== "all" ||
        filters.forks !== "all" ||
        filters.issues !== "all" ||
        filters.topic !== "all";

      // Se tiver filtros específicos, usá-los
      if (hasSpecificFilters) {
        let query = filters.searchQuery || "";

        // Adicionar parâmetros de linguagem
        if (filters.language !== "all") {
          query += ` language:${filters.language}`;
        }

        // Adicionar parâmetros de estrelas
        if (filters.stars !== "all") {
          query += ` stars:>${filters.stars}`;
        }

        // Adicionar parâmetros de forks
        if (filters.forks !== "all") {
          query += ` forks:>${filters.forks}`;
        }

        // Adicionar parâmetros de issues
        if (filters.issues !== "all") {
          if (filters.issues === "low") {
            query += ` open-issues:<500`;
          } else if (filters.issues === "medium") {
            query += ` open-issues:500..2000`;
          } else if (filters.issues === "high") {
            query += ` open-issues:>2000`;
          }
        }

        // Adicionar tópicos
        if (filters.topic !== "all") {
          query += ` topic:${filters.topic}`;
        }

        return query.trim();
      }

      // Se não tiver filtros específicos e o usuário tiver preferências
      if (userProfile?.preferredLanguages?.length) {
        // Usar apenas a primeira linguagem preferida para evitar queries complexas
        return `language:${userProfile.preferredLanguages[0]} stars:>1000`;
      }

      // Query padrão se nada for aplicado - mais simples para economizar rate limit
      return "stars:>10000 sort:stars";
    },
    [userProfile]
  );

  // Flag para controlar se devemos buscar repos
  const shouldFetchRecommended = activeTab === "recommended";

  // Query para buscar repositórios recomendados
  const recommendedQuery = useQuery<RepositoriesData | undefined>({
    queryKey: ["recommended", buildQuery(debouncedFilters), currentPage],
    queryFn: async () => {
      const query = buildQuery(debouncedFilters);
      console.log("Executando busca com query:", query);
      try {
        return fetchRepositories(query, perPage, currentPage);
      } catch (error) {
        console.error("Erro na consulta:", error);
        toast.error("Erro ao buscar repositórios");
        return { repositories: [], totalCount: 0 };
      }
    },
    enabled: shouldFetchRecommended,
    staleTime: 2 * 60 * 1000, // 2 minutos
    refetchOnWindowFocus: false,
  });

  // Query para buscar repositórios favoritos - com flag para desativar quando não necessário
  const shouldFetchFavorites = activeTab === "favorites" && Boolean(userProfile?.favoriteRepos?.length);

  const favoritesQuery = useQuery({
    queryKey: ["favorites", userProfile?.favoriteRepos],
    queryFn: () => fetchFavoriteRepositories(userProfile?.favoriteRepos || []),
    enabled: shouldFetchFavorites,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });

  // Handler para quando os filtros são alterados
  const handleFilterChange = (newFilters: FilterValues) => {
    console.log("Filtros alterados:", newFilters);
    setFilters(newFilters);
    setCurrentPage(1); // Resetar para a primeira página
  };

  // Handler para limpar filtros
  const handleResetFilters = () => {
    console.log("Limpando filtros");
    // Limpar filtros
    const resetFilters = {
      searchQuery: "",
      language: "all",
      difficulty: "all",
      stars: "all",
      forks: "all",
      issues: "all",
      topic: "all",
    };

    setFilters(resetFilters);
    setCurrentPage(1);
  };

  // Handler para alterar a aba
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  // Prefetch de dados ao carregar
  useEffect(() => {
    if (activeTab === "recommended" && !recommendedQuery.data) {
      const defaultQuery = "stars:>10000 sort:stars";
      console.log("Pré-carregando dados com query padrão...");

      // Verificar se já existe no cache antes de buscar
      const existingData = queryClient.getQueryData(["recommended", defaultQuery, 1]);

      if (!existingData) {
        fetchRepositories(defaultQuery, perPage, 1)
          .then((data) => {
            if (data) {
              queryClient.setQueryData(["recommended", defaultQuery, 1], data);
            }
          })
          .catch((err) => console.error("Erro ao pré-carregar dados:", err));
      }
    }
  }, [activeTab, queryClient, recommendedQuery.data]);

  return (
    <PageLayout>
      <div className="py-6 space-y-8">
        <div className="w-full space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Open Source Radar</h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Descubra projetos open source que combinam com seus interesses e nível de habilidade
          </p>
        </div>

        <Filters
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          isLoading={recommendedQuery.isLoading}
          currentFilters={filters}
        />

        {/* Tabs and repository display */}
        <div className="space-y-6">
          <Tabs defaultValue="recommended" className="w-full" value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="w-full md:w-auto md:max-w-md grid grid-cols-2">
              <TabsTrigger value="recommended">Recomendados</TabsTrigger>
              <TabsTrigger value="favorites">Favoritos</TabsTrigger>
            </TabsList>

            <TabsContent value="recommended" className="mt-6">
              {recommendedQuery.isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: perPage }).map((_, index) => (
                    <Skeleton key={index} />
                  ))}
                </div>
              ) : recommendedQuery.error ? (
                <div className="text-center py-12 border rounded-lg bg-muted/20">
                  <AlertCircle className="h-10 w-10 mx-auto text-destructive mb-4" />
                  <h3 className="text-lg font-medium">Erro ao carregar repositórios</h3>
                  <p className="text-muted-foreground mt-2">
                    Ocorreu um erro ao buscar repositórios. Pode ser que você tenha atingido o limite de requisições.
                  </p>
                  <Button onClick={() => recommendedQuery.refetch()} variant="outline" className="mt-4">
                    Tentar novamente
                  </Button>
                </div>
              ) : recommendedQuery.data?.repositories && recommendedQuery.data.repositories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedQuery.data.repositories.map((repo) => (
                    <RepositoryCard key={repo.id} repository={repo} hasFavoriteButton={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg bg-muted/20">
                  <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Nenhum repositório encontrado</h3>
                  <p className="text-muted-foreground mt-2">
                    Tente ajustar seus filtros ou usar termos de busca diferentes.
                  </p>
                  <Button onClick={handleResetFilters} variant="outline" className="mt-4">
                    Limpar filtros e tentar novamente
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              {favoritesQuery.isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: Math.min(userProfile?.favoriteRepos?.length || 0, perPage) }).map(
                    (_, index) => (
                      <Skeleton key={index} />
                    )
                  )}
                </div>
              ) : favoritesQuery.data && favoritesQuery.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoritesQuery.data.map((repo) => (
                    <RepositoryCard key={repo.id} repository={repo} hasFavoriteButton={true} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg bg-muted/20">
                  <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Nenhum repositório favorito</h3>
                  <p className="text-muted-foreground mt-2">
                    Você ainda não adicionou nenhum repositório aos seus favoritos.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Pagination - mostrar apenas na aba de recomendados e se tiver dados */}
          {activeTab === "recommended" &&
            recommendedQuery.data?.repositories &&
            recommendedQuery.data.repositories.length > 0 && (
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={Math.ceil(Math.min(recommendedQuery.data.totalCount || 0, 100) / perPage)}
                disabled={recommendedQuery.isLoading}
              />
            )}
        </div>
      </div>
    </PageLayout>
  );
}

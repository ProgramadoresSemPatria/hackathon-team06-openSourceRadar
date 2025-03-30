import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Filters, FilterValues } from "./Filters";
import { Pagination } from "@/components/Pagination";
import { PageLayout } from "@/components/PageLayout";
import { RepositoryCard } from "@/components/RespositoryCard";
import { fetchRepositories, fetchFavoriteRepositories } from "@/lib/fetchRepositories";
import { fetchRecommendedRepositories } from "@/lib/fetchRecommendedRepositories";
import { Repository } from "@/types/repository";
import { Skeleton } from "@/components/RespositoryCard/skeleton";
import { AlertCircle } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

export default function Explore() {
  const [activeTab, setActiveTab] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [filters, setFilters] = useState<FilterValues>({
    searchQuery: "",
    language: "all",
    difficulty: "all",
    stars: "all",
    forks: "all",
    issues: "all",
    topic: "all",
  });
  const [favoriteRepos, setFavoriteRepos] = useState<Repository[]>([]);
  const { userProfile } = useAuth();

  // Função para construir a query baseada nos filtros
  const buildSearchQuery = (filters: FilterValues) => {
    let query = filters.searchQuery || "";

    // Se estamos na aba de recomendações e não há busca específica, usar as preferências do usuário
    if (activeTab === "recommended" && !query && userProfile?.preferredLanguages?.length) {
      // Construir uma query baseada nas linguagens preferidas do usuário
      const langQuery = userProfile.preferredLanguages
        .slice(0, 3) // Limitar a 3 linguagens para não sobrecarregar a query
        .map((lang) => `language:${lang}`)
        .join(" OR ");

      if (langQuery) {
        query = `(${langQuery})`;
      }
    }

    // Adicionar parâmetros de linguagem se não estiver usando as preferências
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

    return query.trim() || "stars:>1000"; // Default query se nenhum filtro for aplicado
  };

  // Função para carregar os repositórios com base nos filtros
  const loadRepositories = async () => {
    setIsLoading(true);
    try {
      // Se estamos usando filtros específicos, usar a busca normal
      if (
        filters.searchQuery ||
        filters.language !== "all" ||
        filters.stars !== "all" ||
        filters.forks !== "all" ||
        filters.issues !== "all" ||
        filters.topic !== "all"
      ) {
        const query = buildSearchQuery(filters);
        const perPage = 9;

        const data = await fetchRepositories(query, perPage, currentPage);

        if (data) {
          setRepositories(data.repositories);
          setTotalPages(Math.ceil(Math.min(data.totalCount, 1000) / perPage));
        } else {
          setRepositories([]);
          setTotalPages(1);
        }
      }
      // Se não temos filtros específicos, usar recomendações personalizadas
      else {
        const result = await fetchRecommendedRepositories(userProfile, {
          languages: userProfile?.preferredLanguages,
          experienceLevel: userProfile?.experienceLevel,
          perPage: 9,
          page: currentPage,
        });

        setRepositories(result.repositories);
        setTotalPages(Math.ceil(result.totalCount / 9));
      }
    } catch (error) {
      console.error("Erro ao buscar repositórios:", error);
      setRepositories([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };

  // Efeito para carregar repositórios quando os filtros mudarem ou a página mudar
  useEffect(() => {
    if (activeTab === "recommended") {
      loadRepositories();
    }
  }, [filters, currentPage, activeTab]);

  // Efeito para carregar repositórios favoritos quando a aba for alterada
  useEffect(() => {
    const loadFavorites = async () => {
      if (activeTab === "favorites" && userProfile?.favoriteRepos && userProfile.favoriteRepos.length > 0) {
        setIsLoading(true);
        try {
          const favoriteReposData = await fetchFavoriteRepositories(userProfile.favoriteRepos);
          setFavoriteRepos(favoriteReposData);
        } catch (error) {
          console.error("Erro ao carregar repositórios favoritos:", error);
          setFavoriteRepos([]);
        } finally {
          setIsLoading(false);
        }
      } else if (activeTab === "favorites") {
        setFavoriteRepos([]);
      }
    };

    loadFavorites();
  }, [activeTab, userProfile]);

  // Handler para quando os filtros são alterados
  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setCurrentPage(1); // Resetar para a primeira página
  };

  return (
    <PageLayout>
      <div className="py-6 space-y-8">
        <div className="w-full space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Open Source Radar</h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Descubra projetos open source que combinam com seus interesses e nível de habilidade
          </p>
        </div>

        <Filters onFilterChange={handleFilterChange} isLoading={isLoading} />

        {/* Tabs and repository display */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Tabs
              defaultValue="recommended"
              className="w-full md:max-w-md"
              value={activeTab}
              onValueChange={(value) => {
                setActiveTab(value);
                setCurrentPage(1);
              }}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recommended">Recomendados</TabsTrigger>
                <TabsTrigger value="favorites">Favoritos</TabsTrigger>
              </TabsList>

              <TabsContent value="recommended" className="mt-6">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 9 }).map((_, index) => (
                      <Skeleton key={index} />
                    ))}
                  </div>
                ) : repositories.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {repositories.map((repo) => (
                      <RepositoryCard key={repo.id} repository={repo} hasFavoriteButton={true} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border rounded-lg bg-muted/20">
                    <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Nenhum repositório encontrado</h3>
                    <p className="text-muted-foreground mt-2">
                      Tente ajustar seus filtros para encontrar mais repositórios.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="favorites" className="mt-6">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: Math.min(userProfile?.favoriteRepos?.length || 0, 9) }).map((_, index) => (
                      <Skeleton key={index} />
                    ))}
                  </div>
                ) : favoriteRepos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteRepos.map((repo) => (
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
          </div>

          {/* Pagination - mostrar apenas na aba de recomendados */}
          {activeTab === "recommended" && repositories.length > 0 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              disabled={isLoading}
            />
          )}
        </div>
      </div>
    </PageLayout>
  );
}

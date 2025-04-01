// src/pages/private/Explore/index.tsx
import { useState, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Filters, FilterValues } from "./Filters";
import { Pagination } from "@/components/Pagination";
import { PageLayout } from "@/components/PageLayout";
import { RepositoryCard } from "@/components/RespositoryCard";
import { Button } from "@/components/ui/button";
import { fetchRepositories } from "@/lib/fetchers/fetchRepositories";
import { RepositoriesData } from "@/types/repository";
import { Skeleton } from "@/components/RespositoryCard/skeleton";
import { AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchFavoriteRepositories } from "@/lib/fetchers/fetchFavoriteRepositories";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";

export default function Explore() {
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const { userProfile } = useAuth();
  const perPage = 12;

  const [filters, setFilters] = useState<FilterValues>({
    searchQuery: "",
    language: "all",
    stars: "all",
    forks: "all",
    topic: "all",
  });

  const buildQuery = useCallback(() => {
    let query = filters.searchQuery || "";

    if (filters.language !== "all") {
      query += ` language:${filters.language}`;
    }

    if (filters.stars !== "all") {
      query += ` stars:>${filters.stars}`;
    }

    if (filters.forks !== "all") {
      query += ` forks:>${filters.forks}`;
    }

    if (filters.topic !== "all") {
      query += ` topic:${filters.topic}`;
    }

    // Se não tiver nenhum filtro específico e o usuário tiver preferências
    if (!query.trim() && userProfile?.preferredLanguages?.length) {
      const languages = userProfile.preferredLanguages.join(",");
      return `language:${languages}`;
    }

    return query.trim();
  }, [filters, userProfile]);

  // Query para buscar repositórios recomendados
  const recommendedQuery = useQuery<RepositoriesData | undefined>({
    queryKey: ["repositories", buildQuery(), currentPage],
    queryFn: () => fetchRepositories(buildQuery(), perPage, currentPage),
    enabled: activeTab === "recommended",
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });

  // Query para buscar repositórios favoritos
  const favoritesQuery = useQuery({
    queryKey: ["favorites", userProfile?.favoriteRepos],
    queryFn: () => fetchFavoriteRepositories(userProfile?.favoriteRepos || []),
    enabled:
      activeTab === "favorites" && Boolean(userProfile?.favoriteRepos?.length),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Handler para quando os filtros são aplicados
  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Handler para limpar filtros
  const handleResetFilters = () => {
    setFilters({
      searchQuery: "",
      language: "all",
      stars: "all",
      forks: "all",
      topic: "all",
    });
    setCurrentPage(1);
  };

  // Handler para alterar a aba
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  return (
    <PageLayout>
      <div className="py-6 space-y-8">
        <div className="w-full space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Open Source Radar</h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            {t("explore.text1")}
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
          <Tabs
            defaultValue="recommended"
            className="w-full"
            value={activeTab}
            onValueChange={handleTabChange}
          >
            <TabsList className="w-full md:w-auto md:max-w-md grid grid-cols-2">
              <TabsTrigger value="recommended">
                {t("explore.text2")}
              </TabsTrigger>
              <TabsTrigger value="favorites">{t("explore.text3")}</TabsTrigger>
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
                  <h3 className="text-lg font-medium">{t("explore.text4")}</h3>
                  <p className="text-muted-foreground mt-2">
                    {t("explore.text5")}
                  </p>
                  <Button
                    onClick={() => recommendedQuery.refetch()}
                    variant="outline"
                    className="mt-4"
                  >
                    {t("explore.text6")}
                  </Button>
                </div>
              ) : recommendedQuery.data?.repositories &&
                recommendedQuery.data.repositories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendedQuery.data.repositories.map((repo) => (
                    <RepositoryCard
                      key={repo.id}
                      repository={repo}
                      hasFavoriteButton={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg bg-muted/20">
                  <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">{t("explore.text7")}</h3>
                  <p className="text-muted-foreground mt-2">
                    {t("explore.text8")}
                  </p>
                  <Button
                    onClick={handleResetFilters}
                    variant="outline"
                    className="mt-4"
                  >
                    {t("explore.text9")}
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="favorites" className="mt-6">
              {favoritesQuery.isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({
                    length: Math.min(
                      userProfile?.favoriteRepos?.length || 0,
                      perPage
                    ),
                  }).map((_, index) => (
                    <Skeleton key={index} />
                  ))}
                </div>
              ) : favoritesQuery.data && favoritesQuery.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoritesQuery.data.map((repo) => (
                    <RepositoryCard
                      key={repo.id}
                      repository={repo}
                      hasFavoriteButton={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg bg-muted/20">
                  <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">{t("explore.text10")}</h3>
                  <p className="text-muted-foreground mt-2">
                    {t("explore.text11")}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Pagination - mostrar apenas na aba de recomendados com resultados */}
          {activeTab === "recommended" &&
            recommendedQuery.data?.repositories &&
            recommendedQuery.data.repositories.length > 0 && (
              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={
                  recommendedQuery.data?.totalCount
                    ? Math.ceil(recommendedQuery.data.totalCount / perPage)
                    : 0
                }
                disabled={recommendedQuery.isLoading}
              />
            )}
        </div>
      </div>
    </PageLayout>
  );
}

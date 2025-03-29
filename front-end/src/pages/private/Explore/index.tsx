import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filters } from "./Filters";
import { Pagination } from "@/components/Pagination";
import { RepositoryCard } from "@/components/RespositoryCard";
import { RepositoriesData } from "@/types/repository";
import { fetchRepositories } from "@/lib/fetchRepositories";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/RespositoryCard/skeleton";
import { useDebounce } from "@/lib/useDebounce";

export default function Explore() {
  const [activeTab, setActiveTab] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 500);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, error } = useQuery<RepositoriesData | undefined>({
    queryKey: ["repositories", debouncedSearch, currentPage],
    queryFn: () => fetchRepositories(debouncedSearch, perPage, currentPage),
  });

  const repositories = data?.repositories ?? [];
  const totalPages = data?.totalCount
    ? Math.ceil(data?.totalCount / perPage)
    : 1;

  return (
    <div className="py-6 space-y-8">
      <div className="w-full space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Open source radar</h1>
        <p className="text-lg sm:text-xl text-muted-foreground">
          Discover open source projects that match your interests and skill
          level
        </p>
      </div>

      <Filters
        searchQuery={searchQuery}
        handleSearchQuery={(search) => setSearchQuery(search)}
      />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Tabs
            defaultValue="recommended"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="flex ">
              <div className="grid gap-2 w-full grid-cols-2">
                <TabsTrigger
                  value="recommended"
                  onClick={() => setCurrentPage(1)}
                >
                  Recommended
                </TabsTrigger>
                <TabsTrigger
                  value="favorites"
                  onClick={() => setCurrentPage(1)}
                >
                  Favorites
                </TabsTrigger>
              </div>
            </TabsList>

            <TabsContent value="recommended" className="w-full">
              {isLoading ? (
                <div className="grid gap-8 md:grid-cols-3 pb-6">
                  {new Array(perPage).fill(null).map(() => (
                    <Skeleton />
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-12 border rounded-lg bg-muted/20">
                  <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No repositories found</h3>
                  <p className="text-muted-foreground mt-2">
                    {activeTab === "favorites"
                      ? "You haven't added any repositories to your favorites yet."
                      : "Try adjusting your filters to find more repositories."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {repositories.map((repo) => (
                    <RepositoryCard key={repo.id} repository={repo} />
                  ))}
                </div>
              )}

              <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
              />
            </TabsContent>

            <TabsContent value="favorites">
              <div className="text-center py-12 border rounded-lg bg-muted/20">
                <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No repositories found</h3>
                <p className="text-muted-foreground mt-2">
                  {activeTab === "favorites"
                    ? "You haven't added any repositories to your favorites yet."
                    : "Try adjusting your filters to find more repositories."}
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

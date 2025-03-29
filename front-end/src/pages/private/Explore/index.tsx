import { useEffect, useState } from "react";
// import { AlertCircle } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filters } from "./Filters";
import { Octokit } from "octokit";

interface repositoriesType {
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
import { Pagination } from "@/components/Pagination";

export default function Explore() {
  const [activeTab, setActiveTab] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const octokit = new Octokit();

  const perPage = 12;

  useEffect(() => {
    searchOpenSourceRepos();
  }, []);

  const searchOpenSourceRepos = async () => {
    try {
      const response = await octokit.request("GET /search/repositories", {
        q: `stars:>1000 is:public license:mit`,
        sort: "stars",
        order: "desc",
        per_page: perPage,
        page: currentPage,
      });

      const values: repositoriesType[] = response?.data?.items.map((value) => {
        const date = new Date(value.updated_at);
        const formattedDate = date.toISOString().split("T")[0];

        return {
          id: value.id,
          name: value.name,
          full_name: value.full_name,
          description: value.description || "No description",
          forks_count: value.forks_count,
          language: value.language || "Not specified",
          open_issues_count: value.open_issues_count,
          stargazers_count: value.stargazers_count,
          updated_at: formattedDate,
        };
      });

      // setRepositories(values);
      // setTotalCount(response?.data?.total_count || 0);
      console.log(response, values);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  return (
    <div className="py-6 space-y-8">
      <div className="w-full space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Open source radar</h1>
        <p className="text-lg sm:text-xl text-muted-foreground">
          Discover open source projects that match your interests and skill
          level
        </p>
      </div>

      <Filters />

      {/* Tabs and repository display */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Tabs
            defaultValue="recommended"
            className="w-full md:max-w-md"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="recommended"
                onClick={() => setCurrentPage(1)}
              >
                Recommended
              </TabsTrigger>
              <TabsTrigger value="favorites" onClick={() => setCurrentPage(1)}>
                Favorites
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/*         {repositories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map((repo) => (
              <RepositoryCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 border rounded-lg bg-muted/20">
            <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No repositories found</h3>
            <p className="text-muted-foreground mt-2">
              {activeTab === "favorites"
                ? "You haven't added any repositories to your favorites yet."
                : "Try adjusting your filters to find more repositories."}
            </p>
          </div>
        )} */}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

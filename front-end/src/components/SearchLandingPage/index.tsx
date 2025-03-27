import { Clock3, GitFork, Package, Search, Star } from "lucide-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import { Octokit } from "octokit";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

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

export default function SearchLandingPage() {
  const octokit = new Octokit();
  const [repositories, setRepositories] = useState<repositoriesType[]>([]);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const perPage = 3;
  const hasNextPage = currentPage * perPage < totalCount;

  useEffect(() => {
    searchOpenSourceRepos();
  }, [search, currentPage]);

  const searchOpenSourceRepos = async () => {
    try {
      const response = await octokit.request("GET /search/repositories", {
        q: `${search} stars:>1000 is:public license:mit`,
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

      setRepositories(values);
      setTotalCount(response?.data?.total_count || 0);
      console.log(response);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  return (
    <section className="bg-muted/40 py-20 flex items-center justify-center">
      <div className="container px-4 md:px-6">
        <div className="space-y-4 mb-6">
          <h2 className="text-muted-foreground max-w-2xl">
            Discover open source projects that match your interests and skill
            level
          </h2>
        </div>

        <div className="space-y-4 mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              className="pl-10"
              placeholder="Search repositories..."
              onBlur={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <Badge variant="outline" className="px-3 py-1 text-sm">
            Recommended
          </Badge>
        </div>

        <div className="space-y-4  mb-6">
          <div className="grid gap-8 md:grid-cols-3">
            {repositories.map((repositorie) => (
              <Card key={repositorie.id} className="bg-background">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardTitle>{repositorie.full_name}</CardTitle>
                  <CardDescription>{repositorie.description}</CardDescription>
                  <Badge
                    variant="outline"
                    className="px-2 py-1 text-sm bg-primary/10"
                  >
                    {repositorie.language}
                  </Badge>
                  <div className="flex flex-row justify-between text-muted-foreground text-sm">
                    <div className="flex flex-row">
                      <span className="flex flex-row mr-3">
                        <Star className="h-5 w-5" />
                        {" " + repositorie.stargazers_count}
                      </span>
                      <span className="flex flex-row">
                        <GitFork className="h-5 w-5" />
                        {" " + repositorie.forks_count}
                      </span>
                    </div>
                    <div className="flex flex-row justify-start">
                      <Clock3 className="h-5 w-5" />
                      {` Updated ${repositorie.updated_at}`}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage <= 1}
            >
              Previous
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
              disabled={!hasNextPage}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

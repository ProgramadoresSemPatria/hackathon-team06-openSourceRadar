import { useState } from "react";
import { Search, AlertCircle, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  languages,
  difficulties,
  starFilters,
  forkFilters,
  issueFilters,
  topicFilters,
  repositories,
} from "@/data";
import { RepositoryCard } from "./RepositoryCard";
import { Button } from "@/components/ui/button";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedStars, setSelectedStars] = useState("all");
  const [selectedForks, setSelectedForks] = useState("all");
  const [selectedIssues, setSelectedIssues] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [activeTab, setActiveTab] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;

  return (
    <div className="py-6 space-y-8">
      <div className="w-full space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Open source radar</h1>
        <p className="text-lg sm:text-xl text-muted-foreground">
          Discover open source projects that match your interests and skill
          level
        </p>
      </div>

      {/* Search and filters */}
      <div className="space-y-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search repositories..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.value} value={language.value}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedDifficulty}
            onValueChange={setSelectedDifficulty}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStars} onValueChange={setSelectedStars}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Stars" />
            </SelectTrigger>
            <SelectContent>
              {starFilters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedForks} onValueChange={setSelectedForks}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Forks" />
            </SelectTrigger>
            <SelectContent>
              {forkFilters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedIssues} onValueChange={setSelectedIssues}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Open Issues" />
            </SelectTrigger>
            <SelectContent>
              {issueFilters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedTopic} onValueChange={setSelectedTopic}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Topic" />
            </SelectTrigger>
            <SelectContent>
              {topicFilters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button variant="outline">Reset Filters</Button>
          <Button className="gap-2">
            <Filter className="h-4 w-4" />
            Apply Filters
          </Button>
        </div>
      </div>

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

        {repositories.length > 0 ? (
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
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  // Show first page, last page, and pages around current page
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink isActive={page === currentPage}>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  } else if (
                    (page === 2 && currentPage > 3) ||
                    (page === totalPages - 1 && currentPage < totalPages - 2)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }
                  return null;
                }
              )}

              <PaginationItem>
                <PaginationNext />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        {/* Results count */}
        {/* <div className="text-center text-sm text-muted-foreground">
          Showing {repos.length} of {totalCount} repositories
        </div> */}
      </div>
    </div>
  );
}

import { useState } from "react";
import { AlertCircle } from "lucide-react";
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
import { repositories } from "@/data";
import { RepositoryCard } from "./RepositoryCard";
import { Filters } from "./Filters";

export default function Explore() {
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
      </div>
    </div>
  );
}

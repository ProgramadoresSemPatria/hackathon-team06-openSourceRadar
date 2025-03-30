import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filters } from "./Filters";
import { Pagination } from "@/components/Pagination";
import { PageLayout } from "@/components/PageLayout";

export default function Explore() {
  const [activeTab, setActiveTab] = useState("recommended");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;

  console.log(activeTab);

  return (
    <PageLayout>
      <div className="py-6 space-y-8">
        <div className="w-full space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Open Source Radar</h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Descubra projetos open source que combinam com seus interesses e nível de habilidade
          </p>
        </div>

        <Filters />

        {/* Tabs and repository display */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Tabs defaultValue="recommended" className="w-full md:max-w-md" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recommended" onClick={() => setCurrentPage(1)}>
                  Recomendados
                </TabsTrigger>
                <TabsTrigger value="favorites" onClick={() => setCurrentPage(1)}>
                  Favoritos
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
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
        </div>
      </div>
    </PageLayout>
  );
}

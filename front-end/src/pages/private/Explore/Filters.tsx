import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  languages,
  difficulties,
  starFilters,
  forkFilters,
  issueFilters,
  topicFilters,
} from "@/lib/data";
import { Filter, Search } from "lucide-react";
import { useState } from "react";

type FiltersProps = {
  searchQuery: string;
  handleSearchQuery: (searchQuery: string) => void;
};

type LanguageType =
  | "all"
  | "JavaScript"
  | "TypeScript"
  | "Python"
  | "Rust"
  | "Dart"
  | "CSS"
  | "Go";

type TopicType =
  | "all"
  | "frontend"
  | "backend"
  | "machine-learning"
  | "mobile"
  | "devops";

type DifficultyType = "all" | "beginner" | "intermediate" | "advanced";
type StarsType = "all" | "1000" | "10000" | "50000" | "100000";
type forksType = "all" | "1000" | "5000" | "20000" | "50000";
type IssuesType = "all" | "low" | "medium" | "high";

type Filters = {
  language: LanguageType;
  difficulty: DifficultyType;
  stars: StarsType;
  forks: forksType;
  issues: IssuesType;
  topic: TopicType;
};

export function Filters({ searchQuery, handleSearchQuery }: FiltersProps) {
  const [filters, setFilters] = useState<Filters>({
    language: "all",
    difficulty: "all",
    stars: "all",
    forks: "all",
    issues: "all",
    topic: "all",
  });

  console.log(filters);

  return (
    <div>
      <div className="space-y-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search repositories..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => handleSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Select
            value={filters.language}
            onValueChange={(value: LanguageType) =>
              setFilters({ ...filters, language: value })
            }
          >
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
            value={filters.difficulty}
            onValueChange={(value: DifficultyType) =>
              setFilters({ ...filters, difficulty: value })
            }
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

          <Select
            value={filters.stars}
            onValueChange={(value: StarsType) =>
              setFilters({ ...filters, stars: value })
            }
          >
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

          <Select
            value={filters.forks}
            onValueChange={(value: forksType) =>
              setFilters({ ...filters, forks: value })
            }
          >
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

          <Select
            value={filters.issues}
            onValueChange={(value: IssuesType) =>
              setFilters({ ...filters, issues: value })
            }
          >
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

          <Select
            value={filters.topic}
            onValueChange={(value: TopicType) =>
              setFilters({ ...filters, topic: value })
            }
          >
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
    </div>
  );
}

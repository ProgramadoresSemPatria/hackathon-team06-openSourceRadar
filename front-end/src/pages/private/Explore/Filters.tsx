import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { languages, difficulties, starFilters, forkFilters, issueFilters, topicFilters } from "@/lib/data";
import { Filter, Search } from "lucide-react";
import { useState } from "react";

interface FiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  isLoading: boolean;
}

export interface FilterValues {
  searchQuery: string;
  language: string;
  difficulty: string;
  stars: string;
  forks: string;
  issues: string;
  topic: string;
}

export function Filters({ onFilterChange, isLoading }: FiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedStars, setSelectedStars] = useState("all");
  const [selectedForks, setSelectedForks] = useState("all");
  const [selectedIssues, setSelectedIssues] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onFilterChange({
      searchQuery,
      language: selectedLanguage,
      difficulty: selectedDifficulty,
      stars: selectedStars,
      forks: selectedForks,
      issues: selectedIssues,
      topic: selectedTopic,
    });
  };

  const handleReset = () => {
    setSearchQuery("");
    setSelectedLanguage("all");
    setSelectedDifficulty("all");
    setSelectedStars("all");
    setSelectedForks("all");
    setSelectedIssues("all");
    setSelectedTopic("all");

    onFilterChange({
      searchQuery: "",
      language: "all",
      difficulty: "all",
      stars: "all",
      forks: "all",
      issues: "all",
      topic: "all",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar repositórios..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Linguagem" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((language) => (
              <SelectItem key={language.value} value={language.value}>
                {language.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Dificuldade" />
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
            <SelectValue placeholder="Estrelas" />
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
            <SelectValue placeholder="Issues Abertas" />
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
            <SelectValue placeholder="Tópico" />
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
        <Button type="button" variant="outline" onClick={handleReset} disabled={isLoading}>
          Limpar Filtros
        </Button>
        <Button type="submit" className="gap-2" disabled={isLoading}>
          <Filter className="h-4 w-4" />
          Aplicar Filtros
        </Button>
      </div>
    </form>
  );
}

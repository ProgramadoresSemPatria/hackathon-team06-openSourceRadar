// src/pages/private/Explore/Filters.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages, starFilters, forkFilters, topicFilters } from "@/lib/data";
import { Filter, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface FiltersProps {
  onFilterChange: (filters: FilterValues) => void;
  onResetFilters: () => void;
  isLoading: boolean;
  currentFilters: FilterValues;
}

export interface FilterValues {
  searchQuery: string;
  language: string;
  stars: string;
  forks: string;
  topic: string;
}

export function Filters({
  onFilterChange,
  onResetFilters,
  isLoading,
  currentFilters,
}: FiltersProps) {
  const { t } = useTranslation();

  const [searchQuery, setSearchQuery] = useState(
    currentFilters.searchQuery || ""
  );
  const [selectedLanguage, setSelectedLanguage] = useState(
    currentFilters.language || "all"
  );
  const [selectedStars, setSelectedStars] = useState(
    currentFilters.stars || "all"
  );
  const [selectedForks, setSelectedForks] = useState(
    currentFilters.forks || "all"
  );
  const [selectedTopic, setSelectedTopic] = useState(
    currentFilters.topic || "all"
  );

  // Sincronizar com os filtros atuais quando mudarem externamente
  useEffect(() => {
    setSearchQuery(currentFilters.searchQuery || "");
    setSelectedLanguage(currentFilters.language || "all");
    setSelectedStars(currentFilters.stars || "all");
    setSelectedForks(currentFilters.forks || "all");
    setSelectedTopic(currentFilters.topic || "all");
  }, [currentFilters]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newFilters = {
      searchQuery,
      language: selectedLanguage,
      stars: selectedStars,
      forks: selectedForks,
      topic: selectedTopic,
    };

    onFilterChange(newFilters);
  };

  const handleReset = () => {
    // Resetar os estados locais
    setSearchQuery("");
    setSelectedLanguage("all");
    setSelectedStars("all");
    setSelectedForks("all");
    setSelectedTopic("all");

    // Chamar a função de reset fornecida pelo componente pai
    onResetFilters();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("filterExplore.text1")}
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={isLoading}
        >
          {t("filterExplore.text2")}
        </Button>
        <Button type="submit" className="gap-2" disabled={isLoading}>
          <Filter className="h-4 w-4" />
          {t("filterExplore.text3")}
        </Button>
      </div>
    </form>
  );
}

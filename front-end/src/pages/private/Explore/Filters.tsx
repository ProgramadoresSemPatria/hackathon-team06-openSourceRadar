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

export function Filters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedStars, setSelectedStars] = useState("all");
  const [selectedForks, setSelectedForks] = useState("all");
  const [selectedIssues, setSelectedIssues] = useState("all");
  const [selectedTopic, setSelectedTopic] = useState("all");

  return (
    <div>
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
    </div>
  );
}

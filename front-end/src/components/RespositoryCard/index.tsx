import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { languaguesData } from "@/lib/data";
import { Repository } from "@/types/repository";
import { BookOpen, Star, GitFork, AlertCircle, Clock } from "lucide-react";

interface RepositoryCardProps {
  repository: Repository;
  hasFavoriteButton?: boolean;
}

const difficultyConfig = {
  beginner: {
    variant: "outline",
    className:
      "bg-green-100 text-green-800 border-green-200 hover:bg-green-100",
  },
  intermediate: {
    variant: "outline",
    className:
      "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100",
  },
  advanced: {
    variant: "outline",
    className: "bg-red-100 text-red-800 border-red-200 hover:bg-red-100",
  },
} as const;

export const RepositoryCard = ({
  repository,
  hasFavoriteButton,
}: RepositoryCardProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num;
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden border-2 hover:border-primary/50 transition-colors">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center">
              <BookOpen className="h-4 w-4 mr-2 shrink-0" />
              <div>
                <span className="text-muted-foreground mr-1">
                  {repository.full_name.split("/")[0]}/
                </span>
                {repository.full_name.split("/")[1]}
              </div>
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {repository.description}
            </p>
          </div>
          {/* {hasFavoriteButton && (
            <Button
              variant="ghost"
              size="icon"
              className={
                repository.isFavorite ? "text-red-500" : "text-muted-foreground"
              }
            >
              <Heart
                className="h-5 w-5"
                fill={repository.isFavorite ? "currentColor" : "none"}
              />
              <span className="sr-only">
                {repository.isFavorite
                  ? "Remove from favorites"
                  : "Add to favorites"}
              </span>
            </Button>
          )} */}
        </div>
      </CardHeader>
      <CardContent className="flex items-end flex-grow">
        {/* <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics.slice(0, 3).map((topic) => (
            <Badge key={topic} variant="secondary" className="text-xs">
              {topic}
            </Badge>
          ))}
          {repo.topics.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{repo.topics.length - 3} more
            </Badge>
          )}
        </div> */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-lg mr-1">
              {languaguesData?.[repository.language.toLowerCase()]?.icon ??
                "💻"}
            </span>
            <span
              className="text-sm font-medium"
              style={{
                color:
                  languaguesData?.[repository.language.toLowerCase()]?.color,
              }}
            >
              {repository.language}
            </span>
          </div>
          {/*  <Badge
            variant={difficultyConfig[repo.difficulty]?.variant || "outline"}
            className={difficultyConfig[repo.difficulty]?.className}
          >
            {repo.difficulty}
          </Badge> */}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex flex-wrap gap-y-3 gap-x-4 justify-between">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-500" />
            <span>{formatNumber(repository.stargazers_count)}</span>
          </div>
          <div className="flex items-center">
            <GitFork className="h-4 w-4 mr-1" />
            <span>{formatNumber(repository.forks_count)}</span>
          </div>
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>{formatNumber(repository.open_issues_count)}</span>
          </div>
        </div>
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          <span>Updated {repository.updated_at}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

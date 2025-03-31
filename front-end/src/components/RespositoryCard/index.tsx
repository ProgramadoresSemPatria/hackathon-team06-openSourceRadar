import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { languaguesData } from "@/lib/data";
import { Repository } from "@/types/repository";
import { BookOpen, Star, GitFork, Clock, Heart, CircleDot } from "lucide-react";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { ContributionGuide } from "../ContributionGuide";
import { useAuth } from "@/contexts/AuthContext";

interface RepositoryCardProps {
  repository: Repository;
  hasFavoriteButton?: boolean;
}

export const RepositoryCard = ({
  repository,
  hasFavoriteButton = false,
}: RepositoryCardProps) => {
  const { userProfile, toggleFavoriteRepo } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const isFavorite = userProfile?.favoriteRepos?.includes(repository.nodeId);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num;
  };

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setIsUpdating(true);
      await toggleFavoriteRepo(repository.nodeId);
      toast.success(
        isFavorite
          ? "Repositório removido dos favoritos"
          : "Repositório adicionado aos favoritos"
      );
    } catch (error) {
      toast.error("Erro ao atualizar favoritos");
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <motion.a
      href={repository.url}
      target="_blank"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group h-full flex flex-col overflow-hidden border-2 hover:border-primary/50 transition-colors">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center">
                <BookOpen className="h-4 w-4 mr-2 shrink-0" />
                <div>
                  <span className="text-muted-foreground">
                    {repository.full_name.split("/")[0]}/
                  </span>
                  {repository.full_name.split("/")[1]}
                </div>
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                {repository.description}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-0">
              {hasFavoriteButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={
                    isFavorite ? "text-red-500" : "text-muted-foreground"
                  }
                  onClick={handleToggleFavorite}
                  disabled={isUpdating}
                >
                  <Heart
                    className="h-5 w-5"
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                  <span className="sr-only">
                    {isFavorite
                      ? "Remover dos favoritos"
                      : "Adicionar aos favoritos"}
                  </span>
                </Button>
              )}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ContributionGuide repository={repository} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col items-start flex-grow">
          {repository.topics && repository.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {repository.topics.slice(0, 3).map((topic) => (
                <Badge key={topic} variant="secondary" className="text-xs">
                  {topic}
                </Badge>
              ))}
              {repository.topics.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{repository.topics.length - 3} mais
                </Badge>
              )}
            </div>
          )}
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
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex flex-col gap-y-3">
          <div className="flex flex-wrap gap-y-3 gap-x-4 justify-between w-full">
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
                <CircleDot className="h-4 w-4 mr-1 text-green-600" />
                <span>{formatNumber(repository.open_issues_count)}</span>
              </div>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              <span>Atualizado {repository.updated_at}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.a>
  );
};

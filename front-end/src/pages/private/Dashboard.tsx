import { useAuth } from "@/lib/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { programmingLanguages } from "@/lib/data";

export default function Dashboard() {
  const { userProfile } = useAuth();

  // Format experience level for display
  const getExperienceLabel = (level: string) => {
    const experienceLookup: Record<string, string> = {
      beginner: "Menos de 1 ano",
      intermediate: "1-3 anos",
      advanced: "3-5 anos",
      expert: "5+ anos",
    };
    return experienceLookup[level] || level;
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Painel do Usuário</h1>

      {userProfile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Perfil do Usuário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={userProfile.photoURL || "/user-placeholder.png"}
                  alt={userProfile.displayName || "Usuário"}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-bold">{userProfile.displayName}</h2>
                  <p className="text-muted-foreground">{userProfile.githubUsername}</p>
                  <p className="text-muted-foreground">{userProfile.email}</p>
                </div>
              </div>

              {userProfile.preferredLanguages && userProfile.preferredLanguages.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Linguagens Preferidas</h3>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.preferredLanguages.map((lang) => {
                      const language = programmingLanguages.find((l) => l.value === lang);
                      return (
                        <Badge key={lang} variant="secondary">
                          {language?.label || lang}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}

              {userProfile.experienceLevel && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Nível de Experiência</h3>
                  <p>{getExperienceLabel(userProfile.experienceLevel)}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projetos Recomendados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Em breve você receberá recomendações de projetos open source baseadas no seu perfil.
              </p>
              <Link to="/panel/explore">
                <Button>Explorar Projetos</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

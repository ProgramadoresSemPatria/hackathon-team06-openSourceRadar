import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { programmingLanguages, experienceLevels } from "@/lib/data";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import MultiSelector from "@/components/ui/multi-selector";
import { LogOut, Save, User } from "lucide-react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router";
import { PageLayout } from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { userProfile, saveOnboardingData, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    userProfile?.preferredLanguages || []
  );
  const [experienceTime, setExperienceTime] = useState<string>(
    userProfile?.experienceLevel || "intermediate"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Formatar nível de experiência
  const getExperienceLabel = (level: string) => {
    const experienceLookup: Record<string, string> = {
      beginner: "Menos de 1 ano",
      intermediate: "1-3 anos",
      advanced: "3-5 anos",
      expert: "5+ anos",
    };
    return experienceLookup[level] || level;
  };

  const handleSaveProfile = async () => {
    if (selectedLanguages.length === 0) {
      toast.error(
        "Por favor, selecione pelo menos uma linguagem de programação"
      );
      return;
    }

    if (!experienceTime) {
      toast.error("Por favor, selecione seu tempo de experiência");
      return;
    }

    try {
      setIsSubmitting(true);
      await saveOnboardingData(selectedLanguages, experienceTime);
      toast.success("Perfil atualizado com sucesso");
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      toast.error("Erro ao atualizar o perfil");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userProfile) {
    return (
      <PageLayout>
        <div className="py-6">Carregando perfil...</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="py-6 space-y-6">
        <div className="w-full space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">Seu Perfil</h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Gerencie suas preferências e configurações
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                {userProfile.photoURL ? (
                  <img
                    src={userProfile.photoURL}
                    alt={userProfile.displayName || "Usuário"}
                    className="w-32 h-32 rounded-full border-4 border-primary/10"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
                <div className="text-center">
                  <h2 className="text-xl font-bold">
                    {userProfile.displayName}
                  </h2>
                  <p className="text-muted-foreground">{userProfile.email}</p>
                  {userProfile.githubUsername && (
                    <p className="text-sm mt-1">
                      GitHub: @{userProfile.githubUsername}
                    </p>
                  )}
                </div>

                {userProfile.hasCompletedOnboarding && (
                  <div className="w-full mt-4">
                    <h3 className="font-medium mb-2">Nível de Experiência</h3>
                    <p>
                      {getExperienceLabel(userProfile.experienceLevel || "")}
                    </p>

                    {userProfile.preferredLanguages &&
                      userProfile.preferredLanguages.length > 0 && (
                        <div className="mt-4">
                          <h3 className="font-medium mb-2">
                            Linguagens Preferidas
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {userProfile.preferredLanguages.map((lang) => {
                              const language = programmingLanguages.find(
                                (l) => l.value === lang
                              );
                              return (
                                <Badge key={lang} variant="secondary">
                                  {language?.label || lang}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>
              <div className="mt-6">
                <Link to="/explore">
                  <Button className="w-full">Explorar Projetos</Button>
                </Link>
              </div>
              <div className="mt-3">
                <Button
                  variant="outline"
                  className="w-full text-red-500 border-red-500 hover:bg-red-50"
                  onClick={async () => {
                    try {
                      await logout();
                      toast.success("Logout realizado com sucesso");
                      navigate("/");
                    } catch (error) {
                      console.error("Erro ao fazer logout:", error);
                      toast.error("Erro ao fazer logout");
                    }
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair da Conta
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Configurações do Perfil</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base">
                  Linguagens de Programação Preferidas
                </Label>
                <MultiSelector
                  selectedItems={selectedLanguages}
                  setSelectedItems={setSelectedLanguages}
                  items={programmingLanguages}
                  placeholder="Selecione linguagens..."
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base">Nível de Experiência</Label>
                <RadioGroup
                  value={experienceTime}
                  onValueChange={setExperienceTime}
                  className="space-y-2"
                >
                  {experienceLevels.map((level) => (
                    <div key={level.id} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={level.id}
                        id={`experience-${level.id}`}
                      />
                      <Label
                        htmlFor={`experience-${level.id}`}
                        className="font-normal cursor-pointer"
                      >
                        {level.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Button
                onClick={handleSaveProfile}
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Salvando..."
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}

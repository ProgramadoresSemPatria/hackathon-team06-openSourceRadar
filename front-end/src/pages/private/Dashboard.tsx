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
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();

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
      beginner: t("dashboard.text1"),
      intermediate: t("dashboard.text2"),
      advanced: t("dashboard.text3"),
      expert: t("dashboard.text4"),
    };
    return experienceLookup[level] || level;
  };

  const handleSaveProfile = async () => {
    if (selectedLanguages.length === 0) {
      toast.error(t("dashboard.text5"));
      return;
    }

    if (!experienceTime) {
      toast.error(t("dashboard.text6"));
      return;
    }

    try {
      setIsSubmitting(true);
      await saveOnboardingData(selectedLanguages, experienceTime);
      toast.success(t("dashboard.text7"));
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      toast.error(t("dashboard.text8"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userProfile) {
    return (
      <PageLayout>
        <div className="py-6">{t("dashboard.text9")}</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="py-6 space-y-6">
        <div className="w-full space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {t("dashboard.text10")}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            {t("dashboard.text11")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>{t("dashboard.text12")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                {userProfile.photoURL ? (
                  <img
                    src={userProfile.photoURL}
                    alt={userProfile.displayName || t("dashboard.text24")}
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
                    <h3 className="font-medium mb-2">{t("dashboard.text13")}</h3>
                    <p>
                      {getExperienceLabel(userProfile.experienceLevel || "")}
                    </p>

                    {userProfile.preferredLanguages &&
                      userProfile.preferredLanguages.length > 0 && (
                        <div className="mt-4">
                          <h3 className="font-medium mb-2">
                            {t("dashboard.text14")}
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
                  <Button className="w-full">{t("dashboard.text15")}</Button>
                </Link>
              </div>
              <div className="mt-3">
                <Button
                  variant="outline"
                  className="w-full text-red-500 border-red-500 hover:bg-red-50"
                  onClick={async () => {
                    try {
                      await logout();
                      toast.success(t("dashboard.text16"));
                      navigate("/");
                    } catch (error) {
                      console.error("Erro ao fazer logout:", error);
                      toast.error(t("dashboard.text17"));
                    }
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t("dashboard.text18")}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>{t("dashboard.text19")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base">{t("dashboard.text20")}</Label>
                <MultiSelector
                  selectedItems={selectedLanguages}
                  setSelectedItems={setSelectedLanguages}
                  items={programmingLanguages}
                  placeholder={t("dashboard.text25")}
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base">{t("dashboard.text21")}</Label>
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
                  t("dashboard.text22")
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {t("dashboard.text23")}
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

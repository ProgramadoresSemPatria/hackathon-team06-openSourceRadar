import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import MultiSelector from "@/components/ui/multi-selector";
import { programmingLanguages, experienceLevels } from "@/lib/data";
import { useAuth } from "@/lib/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Onboarding() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [experienceTime, setExperienceTime] = useState<string>("");
  const navigate = useNavigate();
  const { userProfile, saveOnboardingData, loading } = useAuth();

  // Check if onboarding is already completed
  useEffect(() => {
    if (!loading && userProfile?.hasCompletedOnboarding) {
      navigate("/dashboard");
    }
  }, [userProfile, loading, navigate]);

  // Load user preferences if they exist
  useEffect(() => {
    if (userProfile) {
      if (userProfile.preferredLanguages && userProfile.preferredLanguages.length > 0) {
        setSelectedItems(userProfile.preferredLanguages);
      }

      if (userProfile.experienceLevel) {
        setExperienceTime(userProfile.experienceLevel);
      }
    }
  }, [userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      toast.error("Por favor, selecione pelo menos uma linguagem de programação");
      return;
    }

    if (!experienceTime) {
      toast.error("Por favor, selecione seu tempo de experiência");
      return;
    }

    try {
      await saveOnboardingData(selectedItems, experienceTime);
      toast.success("Perfil atualizado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erro ao salvar dados do perfil");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="max-w-[96rem] mx-auto px-6 sm:px-12">
        <Navbar />
        <div className="w-full h-svh flex items-center justify-center">
          <p>Carregando...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="max-w-[96rem] mx-auto px-6 sm:px-12">
      <Navbar />
      <div className="w-full h-svh flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-auto border-0 shadow-none">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-xl font-medium">Experiência em Programação</CardTitle>
              <CardDescription>Conte-nos sobre sua experiência em programação e linguagens preferidas.</CardDescription>
            </CardHeader>
            <CardContent className="my-4 space-y-4">
              <div className="space-y-4">
                <Label className="text-base">Quais são suas linguagens de programação preferidas?</Label>
                <MultiSelector
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  items={programmingLanguages}
                  placeholder="Selecione linguagens..."
                />
              </div>

              <div className="space-y-4">
                <Label className="text-base">Qual é seu tempo de experiência?</Label>
                <RadioGroup value={experienceTime} onValueChange={setExperienceTime} className="space-y-2">
                  {experienceLevels.map((level) => (
                    <div key={level.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={level.id} id={`experience-${level.id}`} />
                      <Label htmlFor={`experience-${level.id}`} className="text-sm font-normal cursor-pointer">
                        {level.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Salvar
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

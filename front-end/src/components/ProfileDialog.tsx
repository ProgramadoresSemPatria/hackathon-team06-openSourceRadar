import { programmingLanguages, experienceLevels } from "@/lib/data";
import { Save } from "lucide-react";
import { Button } from "./ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ReactNode, useState, useEffect } from "react";
import { toast } from "sonner";
import MultiSelector from "./ui/multi-selector";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileDialogProps {
  children: ReactNode;
}

export const ProfileDialog = ({ children }: ProfileDialogProps) => {
  const { userProfile, saveOnboardingData } = useAuth();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [experienceTime, setExperienceTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Carregar os dados do usuário quando o dialog for aberto
  useEffect(() => {
    if (isOpen && userProfile) {
      setSelectedLanguages(userProfile.preferredLanguages || []);
      setExperienceTime(userProfile.experienceLevel || "intermediate");
    }
  }, [isOpen, userProfile]);

  const handleProfileSave = async () => {
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
      setIsOpen(false); // Fechar o dialog após salvar
    } catch (error) {
      console.error("Erro ao salvar perfil:", error);
      toast.error("Erro ao atualizar o perfil");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="w-full cursor-pointer">{children}</div>
      </DialogTrigger>

      <AnimatePresence>
        {isOpen && (
          <DialogContent asChild>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="sm:max-w-[425px]"
            >
              <DialogHeader>
                <DialogTitle>Configurações do Perfil</DialogTitle>
                <DialogDescription>
                  Atualize suas preferências de programação para obter melhores
                  recomendações.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-6">
                <div className="space-y-4">
                  <Label>Linguagens de Programação Preferidas</Label>
                  <MultiSelector
                    selectedItems={selectedLanguages}
                    setSelectedItems={setSelectedLanguages}
                    items={programmingLanguages}
                    placeholder="Selecione linguagens..."
                  />
                </div>

                <div className="space-y-4">
                  <Label>Nível de Experiência</Label>
                  <RadioGroup
                    value={experienceTime}
                    onValueChange={setExperienceTime}
                    className="space-y-2"
                  >
                    {experienceLevels.map((level) => (
                      <div
                        key={level.id}
                        className="flex items-center space-x-2"
                      >
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
              </div>

              <DialogFooter>
                <Button
                  className="w-full"
                  onClick={handleProfileSave}
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
              </DialogFooter>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

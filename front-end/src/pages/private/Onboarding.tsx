import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import MultiSelector from "@/components/ui/multi-selector";
import { programmingLanguages, experienceLevels } from "@/data";

export default function Onboarding() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [experienceTime, setExperienceTime] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      toast.error("Please select at least one programming language");
      return;
    }

    if (!experienceTime) {
      toast.error("Please select your experience time");
      return;
    }

    toast.success("Perfil atualizado com sucesso!");
    navigate("/panel/dashboard");
  };

  return (
    <div className="w-full h-svh flex items-center justify-center">
      <Card className="w-full max-w-2xl mx-auto border-0 shadow-none">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-xl font-medium">
              Programming Experience
            </CardTitle>
            <CardDescription>
              Tell us about your programming experience and preferred languages.
            </CardDescription>
          </CardHeader>
          <CardContent className="my-4 space-y-4">
            <div className="space-y-4">
              <Label className="text-base">
                What are your preferred programming languages?
              </Label>
              <MultiSelector
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                items={programmingLanguages}
                placeholder="Select languages..."
              />
            </div>

            <div className="space-y-4">
              <Label className="text-base">What's your experience time?</Label>
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
                      className="text-sm font-normal cursor-pointer"
                    >
                      {level.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

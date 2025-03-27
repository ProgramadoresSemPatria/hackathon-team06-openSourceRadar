import { programmingLanguages, experienceLevels } from "@/data";
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
  DialogClose,
} from "./ui/dialog";
import { ReactNode, useState } from "react";
import { toast } from "sonner";
import MultiSelector from "./ui/multi-selector";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

interface ProfileDialogProps {
  children: ReactNode;
}

export const ProfileDialog = ({ children }: ProfileDialogProps) => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([
    "javascript",
    "typescript",
  ]);
  const [experienceTime, setExperienceTime] = useState("intermediate");

  const handleProfileSave = () => {
    toast.success("Profile updated successfully");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>
            Update your programming preferences to get better recommendations.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div className="space-y-4">
            <Label>Preferred Programming Languages</Label>
            <MultiSelector
              selectedItems={selectedLanguages}
              setSelectedItems={setSelectedLanguages}
              items={programmingLanguages}
              placeholder="Select languages..."
            />
          </div>

          <div className="space-y-4">
            <Label>Experience Level</Label>
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
        </div>
        <DialogFooter>
          <DialogClose>
            <Button className="w-full" onClick={handleProfileSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function LanguageToggle() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => {
        i18n.changeLanguage(currentLanguage === "pt" ? "en" : "pt");
      }}
    >
      <div>{currentLanguage === "pt" ? "PT" : "EN"}</div>
      <span className="sr-only">Toggle languague</span>
    </Button>
  );
}

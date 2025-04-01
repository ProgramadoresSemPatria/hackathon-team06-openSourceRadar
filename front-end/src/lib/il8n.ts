import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEn from "@/translations/en/translation.json";
import translationPt from "@/translations/pt/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEn,
    },
    pt: {
      translation: translationPt,
    },
  },
  lng: "pt",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

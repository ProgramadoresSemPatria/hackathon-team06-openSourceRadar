import { PageLayout } from "@/components/PageLayout";
import { useTranslation } from "react-i18next";

export default function Terms() {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <div className="py-6 space-y-6 max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold">{t("team.text1")}</h1>

        <p className="text-muted-foreground">{t("team.text2")}</p>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{t("team.text3")}</h2>
          <p>{t("team.text4")}</p>

          <h2 className="text-xl font-semibold">{t("team.text5")}</h2>
          <p>{t("team.text6")}</p>

          <h2 className="text-xl font-semibold">{t("team.text7")}</h2>
          <p>{t("team.text8")}</p>

          <h2 className="text-xl font-semibold">{t("team.text9")}</h2>
          <p>{t("team.text10")}</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>{t("team.text11")}</li>
            <li>{t("team.text12")}</li>
            <li>{t("team.text13")}</li>
            <li>{t("team.text14")}</li>
          </ul>

          <h2 className="text-xl font-semibold">{t("team.text15")}</h2>
          <p>{t("team.text16")}</p>

          <h2 className="text-xl font-semibold">{t("team.text17")}</h2>
          <p>{t("team.text18")}</p>

          <h2 className="text-xl font-semibold">{t("team.text19")}</h2>
          <p>{t("team.text20")}</p>

          <h2 className="text-xl font-semibold">{t("team.text21")}</h2>
          <p>{t("team.text22")}</p>

          <h2 className="text-xl font-semibold">{t("team.text23")}</h2>
          <p>{t("team.text24")}</p>
        </div>
      </div>
    </PageLayout>
  );
}

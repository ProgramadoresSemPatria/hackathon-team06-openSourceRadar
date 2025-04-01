import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitBranch, Github, Award, Code, BookOpen, Users } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";
import { useTranslation } from "react-i18next";

export default function Learn() {
  const { t } = useTranslation();

  return (
    <PageLayout>
      <div className="py-6 space-y-8">
        <div className="w-full space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">{t("learns.title")}</h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            {t("learns.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                {t("learns.text1")}
              </CardTitle>
              <CardDescription>{t("learns.text2")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t("learns.text3")}</p>
              <p className="mt-4">{t("learns.text4")}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                {t("learns.text5")}
              </CardTitle>
              <CardDescription>{t("learns.text6")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-2">
                <li>{t("learns.text7")}</li>
                <li>{t("learns.text8")}</li>
                <li>{t("learns.text9")}</li>
                <li>{t("learns.text10")}</li>
                <li>{t("learns.text11")}</li>
                <li>{t("learns.text12")}</li>
                <li>{t("learns.text13")}</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                {t("learns.text14")}
              </CardTitle>
              <CardDescription>{t("learns.text15")}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>
                    <strong>{t("learns.text16")}</strong> {t("learns.text17")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>
                    <strong>{t("learns.text18")}</strong> {t("learns.text19")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>
                    <strong>{t("learns.text20")}</strong> {t("learns.text21")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>
                    <strong>{t("learns.text22")}</strong> {t("learns.text23")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>
                    <strong>{t("learns.text24")}</strong> {t("learns.text25")}
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {t("learns.text26")}
              </CardTitle>
              <CardDescription>{t("learns.text27")}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t("learns.text28")}</p>
              <p className="mt-4">{t("learns.text29")}</p>
              <div className="flex items-center gap-3 mt-4">
                <Github className="h-5 w-5" />
                <GitBranch className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}

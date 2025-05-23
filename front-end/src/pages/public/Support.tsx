"use client";

import {
  Coffee,
  Heart,
  CheckCircle2,
  ExternalLink,
  Share2,
  Code,
  MessageSquare,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/PageLayout";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Support() {
  const { t } = useTranslation();

  const buyMeACoffeeUrl = "https://buymeacoffee.com/opensourceradar";
  const githubUrl =
    "https://github.com/ProgramadoresSemPatria/hackathon-team06-openSourceRadar";

  return (
    <PageLayout>
      <div className="relative min-h-screen flex flex-col">
        {/* Hero section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-block p-3 bg-background rounded-full shadow-md mb-6">
              <Coffee className="h-10 w-10 text-amber-500" />
            </div>
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0 }}
            >
              {t("suport.text1")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
            >
              {t("suport.text2")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button size="lg" className="gap-2" asChild>
                <a
                  href={buyMeACoffeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Coffee className="h-5 w-5" />
                  {t("suport.text3")}
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        <main className="flex-1 container mx-auto py-12 px-4">
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Why support section */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-center">
                {t("suport.text4")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                      <Coffee className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle>{t("suport.text5")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      {t("suport.text6")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                      <Heart className="h-7 w-7 text-red-500" />
                    </div>
                    <CardTitle>{t("suport.text7")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      {t("suport.text8")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                      <CheckCircle2 className="h-7 w-7 text-green-500" />
                    </div>
                    <CardTitle>{t("suport.text9")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      {t("suport.text10")}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.section>

            <Separator />

            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-6">{t("suport.text11")}</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t("suport.text12")}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Spread the word Card */}
                <Card>
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                      <Share2 className="h-7 w-7" />
                    </div>
                    <CardTitle>{t("suport.text13")}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pb-4">
                    <p className="text-muted-foreground mb-4">
                      {t("suport.text14")}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-0 justify-center mt-auto">
                    <Badge variant="secondary">{t("suport.text15")}</Badge>
                  </CardFooter>
                </Card>

                {/* Contribute Code Card */}
                <Card>
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                      <Code className="h-7 w-7" />
                    </div>
                    <CardTitle>{t("suport.text16")}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pb-4">
                    <p className="text-muted-foreground mb-4">
                      {t("suport.text17")}
                    </p>
                    <Button variant="outline" className="gap-2" asChild>
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                        {t("suport.text18")}
                      </a>
                    </Button>
                  </CardContent>
                  <CardFooter className="mt-auto pt-0 justify-center">
                    <Badge variant="secondary">{t("suport.text19")}</Badge>
                  </CardFooter>
                </Card>

                {/* Provide Feedback Card */}
                <Card>
                  <CardHeader className="text-center pb-2">
                    <div className="mx-auto bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-2">
                      <MessageSquare className="h-7 w-7" />
                    </div>
                    <CardTitle>{t("suport.text20")}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pb-4">
                    <p className="text-muted-foreground mb-4">
                      {t("suport.text21")}
                    </p>
                    <Button variant="outline" className="gap-2" asChild>
                      <a
                        href={`${githubUrl}/issues/new`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageSquare className="h-4 w-4" />
                        {t("suport.text22")}
                      </a>
                    </Button>
                  </CardContent>
                  <CardFooter className="mt-auto pt-0 justify-center">
                    <Badge variant="secondary">{t("suport.text23")}</Badge>
                  </CardFooter>
                </Card>
              </div>
            </motion.section>

            {/* CTA section */}
            <section className="bg-primary/10 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">{t("suport.text24")}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
                {t("suport.text25")}
              </p>
              <Button size="lg" className="gap-2" asChild>
                <a
                  href={buyMeACoffeeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Coffee className="h-5 w-5" />
                  {t("suport.text26")}
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              </Button>
            </section>
          </div>
        </main>
      </div>
    </PageLayout>
  );
}

import { Button } from "@/components/ui/button";
import {
  Compass,
  Github,
  Info,
  GitPullRequestIcon,
  Search,
} from "lucide-react";
import { Radar } from "./Radar";
import { Link } from "react-router";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";

export function HeroSection() {
  const { currentUser, signIn } = useAuth();
  const { t } = useTranslation();

  const handleLogin = async () => {
    try {
      await signIn();
      // Se o login foi bem-sucedido, o AuthContext redirecionará para onboarding se necessário
      // ou para o dashboard se já tiver completado o onboarding
    } catch (err) {
      console.error("Erro no login:", err);
      toast.error("Falha ao entrar com GitHub. Por favor, tente novamente.");
    }
  };

  return (
    <section className="grid gap-12 lg:grid-cols-2 md:gap-16 items-center">
      {/* Text container */}
      <motion.div
        className="flex flex-col gap-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="inline-flex items-center rounded-full border px-3 py-1 text-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-foreground"></span>
          <span className="ml-2 font-medium">
            {t("landingPage.bulletText")}
          </span>
        </motion.div>

        <div className="space-y-4">
          <motion.h1
            className="font-bold tracking-tighter text-5xl xl:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t("landingPage.title")}
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-base sm:text-lg xl:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {t("landingPage.subtitle")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="space-y-3"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {currentUser ? (
              <Link to="/explore">
                <Button size="lg" className="w-full sm:w-fit gap-2">
                  <Search className="h-5 w-5" />
                  <span>{t("landingPage.exploreButton")}</span>
                </Button>
              </Link>
            ) : (
              <Button
                onClick={handleLogin}
                size="lg"
                className="w-full sm:w-fit gap-2"
              >
                <Github className="h-5 w-5" />
                <span>{t("landingPage.loginInButton")}</span>
              </Button>
            )}
            <Link to="/learn">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-fit gap-2"
              >
                <Compass className="h-5 w-5" />
                <span>{t("landingPage.learnButton")}</span>
              </Button>
            </Link>
          </div>
          {!currentUser && (
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-gray-500" />
              <span className="text-gray-500 text-sm">
                {t("landingPage.disclaimer")}
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Radar Card */}
      <motion.div
        className="rounded-xl border bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-xl p-6 space-y-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        {/* Header com ícone preto */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
              <Compass className="h-4 w-4 text-gray-900 dark:text-gray-200" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {t("landingPage.radarTitle")}
            </h3>
          </div>
          <motion.div
            className="rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white"
            animate={{
              boxShadow: [
                "0 0 0px rgba(59, 130, 246, 0.3)",
                "0 0 10px rgba(59, 130, 246, 0.7)",
                "0 0 0px rgba(59, 130, 246, 0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Escaneando
          </motion.div>
        </div>

        {/* Body com o radar */}
        <div className="flex items-center justify-center py-5 w-full">
          <Radar />
        </div>

        {/* Footer com ícone e texto atualizados */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <GitPullRequestIcon className="h-4 w-4 text-blue-500 shrink-0" />
            <span className="text-gray-700 dark:text-gray-300">
              {t("landingPage.radarFooter")}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

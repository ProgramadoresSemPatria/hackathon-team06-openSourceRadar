import { ArrowRight, Github, Menu } from "lucide-react";
import { Link, useLocation } from "react-router";
import clsx from "clsx";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "./ThemeToggle";
import { RadarSvg } from "./RadarSvg";
import { LanguageToggle } from "./LanguagueToggle";
import { useTranslation } from "react-i18next";

export const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, signIn, logout, userProfile, loading } = useAuth();

  const openModal = () => {
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = "scroll";
    setIsOpen(false);
  };

  const handleLogin = async () => {
    try {
      await signIn();
      closeModal();
    } catch (err) {
      console.error("Erro no login:", err);
      toast.error("Falha ao entrar com GitHub. Por favor, tente novamente.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      closeModal();
      toast.success("Logout realizado com sucesso");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      toast.error("Erro ao fazer logout");
    }
  };

  const publicRoutes = [
    {
      to: "/learn",
      translationKey: "learn",
    },
    {
      to: "/support",
      translationKey: "support",
    },
  ];

  const authenticatedRoutes = [
    {
      to: "/explore",
      translationKey: "explore",
    },
  ];

  const navRoutes = currentUser ? [...authenticatedRoutes, ...publicRoutes] : publicRoutes;

  return (
    <nav className="bg-background w-full">
      <div className="max-w-[96rem] mx-auto px-6 sm:px-12 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <RadarSvg />
          <span className="text-lg font-semibold">OpenSourceRadar</span>
        </Link>

        {/* Loading State */}
        {loading ? (
          <div className="animate-pulse h-6 w-24 bg-gray-200 rounded" />
        ) : (
          <div className="hidden w-fit lg:block" id="navbar-default">
            <ul className="font-medium flex items-center space-x-8 rtl:space-x-reverse">
              {navRoutes.map((route) => (
                <li key={route.to}>
                  <Link
                    to={route.to}
                    className={clsx(
                      "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 dark:text-white md:hover:bg-transparent md:border-0 md:hover:text-muted-foreground md:p-0",
                      location.pathname === route.to && "underline underline-offset-2"
                    )}
                  >
                    {t(`navbar.${route.translationKey}`)}
                  </Link>
                </li>
              ))}

              {currentUser ? (
                <Link to="/dashboard">
                  <Avatar className="h-10 w-10 border-2 border-primary/20 hover:border-primary transition-colors cursor-pointer">
                    <AvatarImage src={userProfile?.photoURL || ""} alt="Perfil" />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
              ) : (
                <Button onClick={handleLogin} variant="default" type="button" className="gap-2">
                  <Github className="h-4 w-4" />
                  {t("landingPage.loginInButton")}
                </Button>
              )}

              <div className="flex items-center gap-4">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </ul>
          </div>
        )}


        {/* Mobile header controls */}
        <div className="flex items-center gap-4 lg:hidden">
          <ThemeToggle />
          <button onClick={isOpen ? closeModal : openModal}>
            <span className="sr-only">Abrir menu principal</span>
            <Menu size={32} />
          </button>
        </div>

        {/* Mobile Navbar */}
        <div
          className={clsx(
            "absolute lg:hidden top-16 left-0 w-full h-[calc(100svh-5rem)] transition-opacity bg-background z-50 mt-4 flex flex-col justify-between",
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <ul className="font-medium flex flex-col gap-6 p-6">
            {navRoutes.map((route) => (
              <li key={route.to} className="border-b-2 pb-4">
                <Link
                  to={route.to}
                  onClick={closeModal}
                  className={clsx(location.pathname === route.to && "underline underline-offset-2")}
                >
                  <div className="flex items-center justify-between">
                    <p>{t(`navbar.${route.translationKey}`)}</p>
                    <ArrowRight />
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="space-y-4 p-6">
            <div className="flex items-center justify-between mb-4 border-b-2 pb-4">
              <span className="text-muted-foreground">{t("navbar.appearance") || "Aparência"}</span>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <LanguageToggle />
              </div>
            </div>

            {currentUser ? (
              <Button variant="outline" className="w-full border-red-400 text-red-400" onClick={handleLogout}>
                {t("navbar.exitMobileButton")}
              </Button>
            ) : (
              <Button onClick={handleLogin} variant="default" className="w-full gap-2">
                <Github className="h-4 w-4" />
                {t("landingPage.loginInButton")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

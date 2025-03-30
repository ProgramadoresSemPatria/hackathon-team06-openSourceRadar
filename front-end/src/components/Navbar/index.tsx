import { ArrowRight, Github, GitPullRequestArrow, Menu } from "lucide-react";
import { Link, useLocation } from "react-router";
import clsx from "clsx";
import { useState } from "react";
import { Button } from "../ui/button";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, signIn, logout, userProfile } = useAuth();

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

  // Definir rotas baseadas no status de autenticação
  const publicRoutes = [
    {
      to: "/learn",
      title: "Aprender",
    },
  ];

  const authenticatedRoutes = [
    {
      to: "/explore",
      title: "Explorar",
    },
    {
      to: "/dashboard",
      title: "Dashboard",
    },
  ];

  // Determinar quais rotas mostrar
  const navRoutes = currentUser ? [...publicRoutes, ...authenticatedRoutes] : publicRoutes;

  return (
    <nav className="bg-white w-full">
      <div className="max-w-[96rem] mx-auto px-6 sm:px-12 py-4 flex items-center justify-between">
        <Link to="/">
          <GitPullRequestArrow className="h-6 w-6" />
        </Link>

        <button className="block sm:hidden" onClick={isOpen ? closeModal : openModal}>
          <span className="sr-only">Abrir menu principal</span>
          <Menu size={32} />
        </button>

        {/* Desktop Navbar */}
        <div className="hidden w-fit sm:block" id="navbar-default">
          <ul className="font-medium flex items-center space-x-8 rtl:space-x-reverse bg-white">
            {navRoutes.map((route) => (
              <li key={route.to}>
                <Link
                  to={route.to}
                  className={clsx(
                    "block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-muted-foreground md:p-0",
                    location.pathname === route.to && "underline underline-offset-2"
                  )}
                >
                  {route.title}
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
                Entrar com GitHub
              </Button>
            )}
          </ul>
        </div>

        {/* Mobile Navbar */}
        <div
          className={clsx(
            "absolute sm:hidden top-16 left-0 w-full h-[calc(100svh-5rem)] transition-opacity bg-white z-50 mt-4 flex flex-col justify-between",
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
                    <p>{route.title}</p>
                    <ArrowRight />
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <div className="space-y-2 p-6">
            {currentUser ? (
              <Button variant={"outline"} className="w-full border-red-400 text-red-400" onClick={handleLogout}>
                Sair
              </Button>
            ) : (
              <Button onClick={handleLogin} variant={"default"} className="w-full gap-2">
                <Github className="h-4 w-4" />
                Entrar com GitHub
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

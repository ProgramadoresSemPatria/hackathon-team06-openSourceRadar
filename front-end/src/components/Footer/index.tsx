import { Link } from "react-router";
import { GitBranch, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white border-t mt-20">
      <div className="max-w-[96rem] mx-auto py-10 px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <GitBranch className="h-5 w-5" />
              <span className="font-bold">Open Source Radar</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Descubra, contribua e evolua com projetos open source que combinam com suas habilidades e interesses.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-sm text-muted-foreground hover:text-foreground">
                  Explorar Projetos
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-sm text-muted-foreground hover:text-foreground">
                  Aprender
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Recursos</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://docs.github.com/pt/get-started/quickstart/hello-world"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Primeiros Passos no GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://opensource.guide/pt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Guia Open Source
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Termos de Serviço
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-muted-foreground">Projeto desenvolvido para o hackathon Borderless Coding</p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                Feito com <Heart className="h-3 w-3 text-red-500" /> por
                <a
                  href="https://github.com/AlissonFredo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {" "}
                  Douglas Alisson
                </a>
                ,
                <a
                  href="https://github.com/carloshenryck"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {" "}
                  Carlos Henryck
                </a>{" "}
                e
                <a
                  href="https://github.com/enricosaito"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {" "}
                  Enrico Saito
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

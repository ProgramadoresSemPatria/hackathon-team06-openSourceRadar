import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Repository } from "@/types/repository";
import { GitBranch, GitPullRequest, Info, BookOpen, Code } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface ContributionGuideProps {
  repository: Repository;
}

export function ContributionGuide({ repository }: ContributionGuideProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(true);
          }}
          className="w-full flex items-center justify-center gap-2"
        >
          <Info className="h-4 w-4" strokeWidth={1.4} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitPullRequest className="h-5 w-5" />
            Como contribuir para {repository.full_name.split("/")[1]}
          </DialogTitle>
          <DialogDescription>
            Um guia passo a passo para começar suas contribuições neste projeto
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <GitBranch className="h-4 w-4" />
              Passos iniciais
            </h3>
            <ol className="space-y-2 list-decimal list-inside text-sm text-muted-foreground">
              <li>Faça um fork do repositório para sua conta GitHub</li>
              <li>
                Clone seu fork localmente:{" "}
                <code>git clone {repository.url}.git</code>
              </li>
              <li>
                Adicione o repositório original como remote:{" "}
                <code>git remote add upstream {repository.url}.git</code>
              </li>
              <li>
                Crie uma branch para suas alterações:{" "}
                <code>git checkout -b feature/sua-feature</code>
              </li>
            </ol>
          </div>

          <div>
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <Code className="h-4 w-4" />
              Trabalhando no código
            </h3>
            <ol className="space-y-2 list-decimal list-inside text-sm text-muted-foreground">
              <li>
                Certifique-se de ler a documentação de contribuição (se existir)
              </li>
              <li>
                Procure por issues rotuladas como{" "}
                <span className="bg-green-100 text-green-800 py-0.5 px-1.5 rounded text-xs">
                  good first issue
                </span>{" "}
                ou{" "}
                <span className="bg-blue-100 text-blue-800 py-0.5 px-1.5 rounded text-xs">
                  help wanted
                </span>
              </li>
              <li>
                Faça suas alterações seguindo o estilo de código do projeto
              </li>
              <li>Adicione testes para suas alterações quando possível</li>
              <li>
                Certifique-se de que os testes existentes continuam passando
              </li>
            </ol>
          </div>

          <div>
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <GitPullRequest className="h-4 w-4" />
              Enviando sua contribuição
            </h3>
            <ol className="space-y-2 list-decimal list-inside text-sm text-muted-foreground">
              <li>
                Faça o commit das suas alterações:{" "}
                <code>git commit -m "feat: descrição da sua alteração"</code>
              </li>
              <li>
                Faça o push para seu fork:{" "}
                <code>git push origin feature/sua-feature</code>
              </li>
              <li>Abra um Pull Request no repositório original</li>
              <li>Descreva detalhadamente suas alterações no PR</li>
              <li>Aguarde feedback dos mantenedores do projeto</li>
            </ol>
          </div>

          <div>
            <h3 className="font-medium flex items-center gap-2 mb-2">
              <BookOpen className="h-4 w-4" />
              Recursos adicionais
            </h3>
            <ul className="space-y-2 list-disc list-inside text-sm text-muted-foreground">
              <li>
                <a
                  href={`${repository.url}/issues`}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  Ver issues abertas
                </a>
              </li>
              <li>
                <a
                  href={`${repository.url}/pulls`}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  Ver pull requests
                </a>
              </li>
              <li>
                <a
                  href={`${repository.url}/blob/main/CONTRIBUTING.md`}
                  target="_blank"
                  className="text-blue-600 hover:underline"
                >
                  Guia de contribuição (se existir)
                </a>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <Button
              className="w-full"
              onClick={() => window.open(repository.url, "_blank")}
            >
              Visitar repositório
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

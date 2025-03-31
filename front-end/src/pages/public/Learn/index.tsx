import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GitBranch, Github, Award, Code, BookOpen, Users } from "lucide-react";
import { PageLayout } from "@/components/PageLayout";

export default function Learn() {
  return (
    <PageLayout>
      <div className="py-6 space-y-8">
        <div className="w-full space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Aprenda sobre Open Source
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Descubra como contribuir para projetos open source e ampliar seu
            potencial como desenvolvedor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />O que é Open
                Source?
              </CardTitle>
              <CardDescription>
                Entenda os conceitos básicos do universo open source
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Software open source é um tipo de software cujo código fonte é
                disponibilizado publicamente, permitindo que qualquer pessoa
                visualize, utilize, modifique e distribua o código conforme suas
                necessidades.
              </p>
              <p className="mt-4">
                Essa abordagem colaborativa possibilita que desenvolvedores de
                todo o mundo trabalhem juntos, compartilhem conhecimento e criem
                soluções melhores através da transparência e cooperação.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Como Contribuir
              </CardTitle>
              <CardDescription>
                Primeiros passos para contribuir em projetos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  Encontre um projeto que se alinhe com seus interesses e
                  habilidades
                </li>
                <li>Leia a documentação e guias de contribuição do projeto</li>
                <li>
                  Explore issues marcadas como "good first issue" ou "beginner
                  friendly"
                </li>
                <li>Faça um fork do repositório e clone-o localmente</li>
                <li>Crie uma branch para sua contribuição</li>
                <li>Desenvolva sua solução e teste-a</li>
                <li>Envie um pull request com suas mudanças</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Benefícios de Contribuir
              </CardTitle>
              <CardDescription>
                Por que participar da comunidade open source?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>
                    <strong>Portfólio:</strong> Demonstre suas habilidades
                    através de contribuições reais
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>
                    <strong>Networking:</strong> Conecte-se com desenvolvedores
                    do mundo todo
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>
                    <strong>Aprendizado:</strong> Aprenda práticas de código de
                    projetos estabelecidos
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>
                    <strong>Visibilidade:</strong> Ganhe reconhecimento na
                    comunidade técnica
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>
                    <strong>Oportunidades:</strong> Encontre possibilidades de
                    trabalho remoto global
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Comunidade Global
              </CardTitle>
              <CardDescription>
                Faça parte de uma comunidade sem fronteiras
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Contribuir para projetos open source é uma forma de ultrapassar
                barreiras geográficas e conectar-se com desenvolvedores do mundo
                todo. É uma oportunidade de colaborar em projetos significativos
                e construir relacionamentos profissionais internacionais.
              </p>
              <p className="mt-4">
                Através dessa experiência, você pode expandir sua rede de
                contatos, aprimorar habilidades de comunicação em inglês e
                aumentar suas chances de conquistar oportunidades de trabalho
                remoto global.
              </p>
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

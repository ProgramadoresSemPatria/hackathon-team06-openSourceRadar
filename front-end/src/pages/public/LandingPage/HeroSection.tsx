import { Button } from "@/components/ui/button";
import { Compass, Github, Lock } from "lucide-react";
import { Radar } from "./Radar";
import { Link } from "react-router";
import { useAuth } from "@/lib/AuthContext";
import { toast } from "sonner";

export function HeroSection() {
  const { currentUser, signIn } = useAuth();

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
    <section className="grid gap-12 lg:grid-cols-2 md:gap-16 items-center ">
      {/* Text container */}
      <div className="flex flex-col gap-6">
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm">
          <span className="flex h-2 w-2 rounded-full bg-foreground"></span>
          <span className="ml-2 font-medium">Descobrir • Contribuir • Crescer</span>
        </div>

        <div className="space-y-4">
          <h1 className="font-bold tracking-tighter text-5xl xl:text-6xl">
            Seu radar pessoal de <span className="text-foreground">projetos open-source</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg xl:text-xl">
            Encontre projetos que combinam com suas habilidades, acompanhe suas contribuições e construa seu perfil de
            desenvolvedor na comunidade open source.
          </p>
        </div>

        {currentUser ? (
          <Link to="/panel/explore">
            <Button size="lg" className="w-full md:max-w-52 gap-2">
              <Compass className="h-5 w-5" />
              <span>Explorar projetos</span>
            </Button>
          </Link>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={handleLogin} size="lg" className="w-full md:max-w-52 gap-2">
              <Github className="h-5 w-5" />
              <span>Entrar com GitHub</span>
            </Button>
            <Link to="/panel/explore">
              <Button variant="outline" size="lg" className="w-full md:max-w-52 gap-2">
                <Compass className="h-5 w-5" />
                <span>Explorar projetos</span>
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Radar Card */}
      <div className="rounded-xl border bg-card shadow-2xl px-8 py-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10">
              <Compass className="h-4 w-4" />
            </div>
            <h3 className="font-semibold">Radar de Projetos</h3>
          </div>
          <div className="rounded-full bg-foreground/10 px-2 py-1 text-xs font-medium">Escaneando</div>
        </div>

        {/* Body */}
        <div className="flex items-center justify-center py-12 w-full rounded-lg border">
          <Radar />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {currentUser
                ? "Conectado com GitHub. Recomendações personalizadas ativadas."
                : "Conecte-se com GitHub para desbloquear recursos personalizados"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

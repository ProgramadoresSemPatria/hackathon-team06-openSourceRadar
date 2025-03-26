import { useAuth } from "@/lib/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { userProfile, logout } = useAuth();

  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6">Painel do Usuário</h1>

      {userProfile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Perfil do Usuário</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={userProfile.photoURL || "/user-placeholder.png"}
                  alt={userProfile.displayName || "Usuário"}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="text-xl font-bold">{userProfile.displayName}</h2>
                  <p className="text-muted-foreground">{userProfile.githubUsername}</p>
                  <p className="text-muted-foreground">{userProfile.email}</p>
                </div>
              </div>
              <Button onClick={logout} variant="outline" className="mt-4">
                Sair
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Projetos Recomendados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Em breve você receberá recomendações de projetos open source baseadas no seu perfil.
              </p>
              <Link to="/panel/projects">
                <Button>Explorar Projetos</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

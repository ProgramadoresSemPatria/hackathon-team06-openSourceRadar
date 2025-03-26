import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { ArrowLeft, Github, GitPullRequestArrow } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function Login() {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGitHubLogin = async () => {
    try {
      setLoading(true);
      await signIn();
      navigate("/dashboard");
    } catch (err) {
      console.error("Erro no login:", err);
      toast.error("Failed to login with GitHub. Please, try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-svh flex items-center justify-center px-8">
      <Link to={"/"} className="absolute top-8 left-8">
        <Button variant="outline">
          <ArrowLeft />
        </Button>
      </Link>
      <div className="flex flex-col gap-6 max-w-96">
        <form>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  <GitPullRequestArrow />
                </div>
                <span className="sr-only">Acme Inc.</span>
              </a>
              <h1 className="text-xl text-center font-bold">
                Welcome to Open Souce radar
              </h1>
              <div className="text-center text-sm text-muted-foreground">
                Continue with github to unlock tailored content and stay
                connected with your community.
              </div>
            </div>

            <Button
              onClick={handleGitHubLogin}
              variant="default"
              type="button"
              className="w-full"
              disabled={loading}
            >
              <Github />
              Continue with Github
            </Button>
          </div>
        </form>
        <div className="text-muted-foreground *:[span]:hover:text-primary text-center text-xs text-balance *:[span]:underline *:[span]:underline-offset-4">
          Your information is securely <span>protected</span>, and we never
          store your credentials
        </div>
      </div>
    </div>
  );
}

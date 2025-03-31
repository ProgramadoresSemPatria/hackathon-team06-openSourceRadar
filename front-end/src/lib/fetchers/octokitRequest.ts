import { Octokit, RequestError } from "octokit";
import { Endpoints, RequestParameters } from "@octokit/types";
import { toast } from "sonner";
import { useTokenStore } from "@/contexts/useTokenStore";

export const getOctokit = () => {
  const token = useTokenStore.getState().token;
  return new Octokit({ auth: token });
};

export const octokitRequest = async <T>(
  route: keyof Endpoints,
  options: RequestParameters
): Promise<T | undefined> => {
  try {
    const octokit = getOctokit();
    const response = await octokit.request(route, options);

    // Log dos headers de rate limit após a requisição
    const rateLimitRemaining = response.headers["x-ratelimit-remaining"];

    if (rateLimitRemaining && parseInt(rateLimitRemaining) < 10) {
      console.warn(
        `GitHub API rate limit getting low: ${rateLimitRemaining} requests remaining`
      );
    }

    return response.data as T;
  } catch (error: unknown) {
    if (error instanceof RequestError && error.response) {
      const headers = error.response.headers;
      const rateLimitRemaining = headers["x-ratelimit-remaining"] === "0";

      if (error.status === 403 && rateLimitRemaining) {
        const resetTime = Number(
          headers["x-ratelimit-reset"] || Date.now() / 1000
        );
        const resetDate = new Date(resetTime * 1000);
        const now = new Date();
        const waitMinutes = Math.ceil(
          (resetDate.getTime() - now.getTime()) / 60000
        );

        const errorMessage = `Limite de requisições do GitHub atingido. Aguarde ${waitMinutes} minutos ou tente novamente após ${resetDate.toLocaleTimeString()}`;
        console.error(errorMessage);
        toast.error(errorMessage);

        return;
      }
    }

    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao fazer requisição:", errorMessage);
    toast.error("Erro ao buscar repositórios. Tente novamente mais tarde.");
    return;
  }
};

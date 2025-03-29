import { Octokit, RequestError } from "octokit";
import { Endpoints, RequestParameters } from "@octokit/types";
import { toast } from "sonner";

const octokit = new Octokit();

export const octokitRequest = async <T>(
  route: keyof Endpoints,
  options: RequestParameters
): Promise<T | undefined> => {
  try {
    const response = await octokit.request(route, options);
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

        toast.error(
          `Limite de requisições do GitHub atingido. Tente novamente após ${resetDate.toLocaleTimeString()}`
        );
        return;
      }
    }

    toast.error("Erro ao buscar repositórios");
    return;
  }
};

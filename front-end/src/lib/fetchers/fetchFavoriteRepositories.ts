import { GraphQlRepository, Repository } from "@/types/repository";
import { getOctokit } from "./octokitRequest";

export const fetchFavoriteRepositories = async (
  repoIds: string[]
): Promise<Repository[]> => {
  if (!repoIds.length) return [];

  const octokit = getOctokit();
  const query = buildFavoriteRepositoriesQuery(repoIds);
  const response = (await octokit.graphql(query)) as Record<
    string,
    GraphQlRepository
  >;
  const repositories: Repository[] = [];

  Object.values(response).forEach((repo) => {
    repositories.push({
      nodeId: repo.id,
      full_name: repo.nameWithOwner,
      description: repo.description || "",
      forks_count: repo.forkCount,
      language: repo.primaryLanguage ? repo.primaryLanguage.name : "",
      open_issues_count: repo.openIssues.totalCount,
      stargazers_count: repo.stargazerCount,
      updated_at: new Date(repo.updatedAt).toLocaleDateString(),
      url: repo.url,
      topics: repo.repositoryTopics.nodes.map(
        (node: { topic: { name: string } }) => node.topic.name
      ),
    });
  });

  return repositories;
};

const buildFavoriteRepositoriesQuery = (repoIds: string[]) => {
  const repoQueries = repoIds
    .map(
      (id, index) => `
      repo${index}: node(id: "${id}") {
        ... on Repository {
          id
          name
          nameWithOwner
          description
          forkCount
          primaryLanguage {
            name
          }
          openIssues: issues(states: OPEN) {
            totalCount
          }
          stargazerCount
          updatedAt
          url
          repositoryTopics(first: 100) {
            nodes {
              topic {
                name
              }
            }
          }
        }
      }
    `
    )
    .join("\n");

  const query = `
    query {
      ${repoQueries}
    }
  `;

  return query;
};

import { cacheLife, cacheTag } from "next/cache";
import { CACHE_TAGS, LIVE_STATS_CACHE_LIFE } from "@/lib/cache-config";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface Week {
  contributionDays: ContributionDay[];
}

export interface GithubStats {
  totalCommitContributions: number;
  totalContributions: number;
  totalRepos: number;
  weeks: Week[];
}

interface GithubGraphQLResponse {
  data: {
    user: {
      contributionsCollection: {
        totalCommitContributions: number;
        contributionCalendar: {
          totalContributions: number;
          weeks: Week[];
        };
      };
      repositories: {
        totalCount: number;
      };
    };
  };
  errors?: unknown[];
}

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

const USER_CONTRIBUTIONS_QUERY = `
  query($userName: String!) {
    user(login: $userName) {
      contributionsCollection {
        totalCommitContributions
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
      repositories(privacy: PUBLIC) {
        totalCount
      }
    }
  }
`;

export async function getGithubStats(username: string): Promise<GithubStats> {
  "use cache";
  cacheTag(CACHE_TAGS.githubContributions);
  cacheLife(LIVE_STATS_CACHE_LIFE);

  const token = process.env.GITHUB_PERSONAL_ACCESS_TOKEN;
  if (!token) {
    throw new Error("GITHUB_PERSONAL_ACCESS_TOKEN is not set");
  }

  const response = await fetch(GITHUB_GRAPHQL_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: USER_CONTRIBUTIONS_QUERY,
      variables: { userName: username },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub API returned ${response.status}`);
  }

  const data: GithubGraphQLResponse = await response.json();
  if (data.errors) {
    throw new Error(`GitHub GraphQL error: ${JSON.stringify(data.errors)}`);
  }

  const { user } = data.data;

  return {
    totalCommitContributions:
      user.contributionsCollection.totalCommitContributions,
    totalContributions:
      user.contributionsCollection.contributionCalendar.totalContributions,
    totalRepos: user.repositories.totalCount,
    weeks: user.contributionsCollection.contributionCalendar.weeks,
  };
}
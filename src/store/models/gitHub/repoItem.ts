import {
  GitHubRepoOwnerApi,
  GitHubRepoOwnerModel,
  normalizeGitHubRepoOwner,
} from "store/models/gitHub/gitHubRepoOwner";

export type RepoItemApi = {
  id: number;
  url: string;
  name: string;
  stargazers_count: number;
  owner: GitHubRepoOwnerApi;
  updated_at: string;
  visibility: string;
  description: string;
  topics: [];
};
export type RepoItemModel = {
  id: number;
  url: string;
  name: string;
  stargazersCount: number;
  owner: GitHubRepoOwnerModel;
  updatedAt: Date;
  visibility: string;
  description: string;
  topics: [];
};

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => {
  return {
    id: from.id,
    url: from.url,
    name: from.name,
    stargazersCount: from.stargazers_count,
    owner: normalizeGitHubRepoOwner(from.owner),
    updatedAt: new Date(from.updated_at),
    visibility: from.visibility,
    description: from.description,
    topics: from.topics,
  };
};

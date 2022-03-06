import ApiStore from "@shared/store/ApiStore/ApiStore";
import { ApiResponse, HTTPMethod } from "@shared/store/ApiStore/types";

import {
  GetOrganizationReposListParams,
  GetRepoParams,
  IGitHubStore,
  PostOrganizationReposListParams,
  RepoItem,
} from "./types";

export default class GitHubStore implements IGitHubStore {
  private readonly apiStore = new ApiStore("https://api.github.com");

  async getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<ApiResponse<RepoItem[], any>> {
    return await this.apiStore.request({
      method: HTTPMethod.GET,
      headers: {},
      data: {},
      endpoint: `/orgs/${params.organizationName}/repos`,
    });
  }
  async getRepo(params: GetRepoParams): Promise<ApiResponse<RepoItem, any>> {
    return await this.apiStore.request({
      method: HTTPMethod.GET,
      headers: {},
      data: {},
      endpoint: `/repositories/${params.repoId}`,
    });
  }

  async postOrganizationReposList(
    params: PostOrganizationReposListParams
  ): Promise<ApiResponse<RepoItem[], any>> {
    return await this.apiStore.request({
      method: HTTPMethod.POST,
      headers: {},
      data: params.data,
      endpoint: `/orgs/${params.organizationName}/repos`,
    });
  }
}

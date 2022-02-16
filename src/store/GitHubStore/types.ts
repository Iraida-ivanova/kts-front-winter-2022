import { ApiResponse } from '@shared/store/ApiStore/types'

export type RepoItem = {}

export type GetOrganizationReposListParams = {
  organizationName: string
}

export type PostOrganizationReposListParams = {
  organizationName: string
  data: object
}

export interface IGitHubStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams,
  ): Promise<ApiResponse<RepoItem[], any>>

  postOrganizationReposList(
    params: PostOrganizationReposListParams,
  ): Promise<ApiResponse<RepoItem[], any>>
}

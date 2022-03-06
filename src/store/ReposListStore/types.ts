export type GetOrganizationReposListParams = {
  organizationName: string;
};
export type GetRepoParams = {
  repoId: number;
};

export type PostOrganizationReposListParams = {
  organizationName: string;
  data: object;
};

export interface IReposListStore {
  getOrganizationReposList(
    params: GetOrganizationReposListParams
  ): Promise<void>;
}

export interface IRepoItemStore {
  getRepo(params: GetRepoParams): Promise<void>;
}

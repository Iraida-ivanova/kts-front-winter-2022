export type GetOrganizationReposListParams = {
  organizationName: string;
};

export type PostOrganizationReposListParams = {
  organizationName: string;
  data: object;
};

export interface IReposListStore {
  getOrganizationReposList(): Promise<void>;
}

export interface IRepoItemStore {
  getRepo(): Promise<void>;
}

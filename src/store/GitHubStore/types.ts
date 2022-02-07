import {ApiResponse} from "../../shared/store/ApiStore/types";

export type RepoItem = {};

export type GetOrganizationReposListParams = {
    organizationName: string;
};
export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>>;
}

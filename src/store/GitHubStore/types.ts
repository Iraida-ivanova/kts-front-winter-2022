import { HTTPMethod} from "../../shared/store/ApiStore/types";

export type RepoItem = {};
export type ApiResp<ItemsT> = {
    data: ItemsT;
};
export type GetOrganizationReposListParams = {
    method: HTTPMethod;
    endpoint: string;
    headers: Record<string, string>;
    data: object;
};
export interface IGitHubStore {
    getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>>;
}

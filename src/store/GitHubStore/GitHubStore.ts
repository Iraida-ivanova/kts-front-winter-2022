import {ApiResp, GetOrganizationReposListParams, IGitHubStore, RepoItem} from "./types";
import ApiStore from "../../shared/store/ApiStore/ApiStore";
// import {Simulate} from "react-dom/test-utils";
// import error = Simulate.error;


export default class GitHubStore implements IGitHubStore {
    private readonly apiStore = new ApiStore('https://api.github.com');

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResp<RepoItem[]>> {

        let response: ApiResp<RepoItem[]> = await this.apiStore.request(params).catch(error => error)
        return response;

    }
}

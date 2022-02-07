import {GetOrganizationReposListParams, IGitHubStore, RepoItem} from "./types";
import ApiStore from "../../shared/store/ApiStore/ApiStore";
import {ApiResponse, HTTPMethod} from "../../shared/store/ApiStore/types";
// import {Simulate} from "react-dom/test-utils";
// import error = Simulate.error;


export default class GitHubStore implements IGitHubStore {

    private readonly apiStore = new ApiStore('https://api.github.com');

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>> {

        let response: ApiResponse<RepoItem[], any> = await this.apiStore.request({
            method: HTTPMethod.GET,
            headers: {},
            data:{},
            endpoint:`/orgs/${params.organizationName}/repos`
        });
        return response;

    }
}

import {GetOrganizationReposListParams, IGitHubStore, PostOrganizationReposListParams, RepoItem} from "./types";
import ApiStore from "../../shared/store/ApiStore/ApiStore";
import {ApiResponse, HTTPMethod} from "../../shared/store/ApiStore/types";



export default class GitHubStore implements IGitHubStore {

    private readonly apiStore = new ApiStore('https://api.github.com');

    async getOrganizationReposList(params: GetOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>> {

        return  await this.apiStore.request({
            method: HTTPMethod.GET,
            headers: {},
            data:{},
            endpoint:`/orgs/${params.organizationName}/repos`
        });
    }



    async postOrganizationReposList(params: PostOrganizationReposListParams): Promise<ApiResponse<RepoItem[], any>> {
        return  await this.apiStore.request({
            method: HTTPMethod.POST,
            headers: {},
            data: params.data,
            endpoint:`/orgs/${params.organizationName}/repos`
        });
    }
}

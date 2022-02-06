import GitHubStore from "../store/GitHubStore/index";
import {HTTPMethod} from "../shared/store/ApiStore/types";





let gitHubStore = new GitHubStore();
let params = {
    method: HTTPMethod.GET,
    endpoint:'/orgs/ktsstudio/repos',
    headers: {'Content-Type': 'application/json'},
    data: {},
}
const gitRepos = gitHubStore.getOrganizationReposList(params).then(body =>body.data )

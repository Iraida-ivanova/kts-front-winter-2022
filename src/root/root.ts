import { ApiResponse } from "@shared/store/ApiStore/types";
import GitHubStore from "@store/GitHubStore/GitHubStore";
import { RepoItem } from "@store/GitHubStore/types";

const gitHubStore = new GitHubStore();

const EXAMPLE_ORGANIZATION = "ktsstudio";

gitHubStore
  .getOrganizationReposList({
    organizationName: EXAMPLE_ORGANIZATION,
  })
  .then((result: ApiResponse<RepoItem[], any>) => {
    // eslint-disable-next-line no-console
    console.log(result.data);
  });
gitHubStore
  .postOrganizationReposList({
    organizationName: EXAMPLE_ORGANIZATION,
    data: {},
  })
  .then((result) => {
    // eslint-disable-next-line no-console
    console.log(result);
  });

import GitHubStore from '../store/GitHubStore/GitHubStore';

const gitHubStore = new GitHubStore();

const EXAMPLE_ORGANIZATION = 'ktsstudio';

gitHubStore.getOrganizationReposList({
    organizationName: EXAMPLE_ORGANIZATION
}).then(result => {
    console.log(result);
})
gitHubStore.postOrganizationReposList({
    organizationName: EXAMPLE_ORGANIZATION,
    data: {

    }
}).then(result => {
    console.log(result);
})
import IGithubPullRequest from '../../core/github/GithubPullRequest';

export interface IPullRequestsState {
  readonly pullRequests: { [id: string]: IGithubPullRequest };
}

export default {
  pullRequests: { },
} as IPullRequestsState;

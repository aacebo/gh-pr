import IGithubPullRequest from '../../core/github/GithubPullRequest';

class PullRequestsService {
  get pullRequests() { return this._pullRequests; }
  set pullRequests(v) {
    this._pullRequests = v;
  }
  private _pullRequests: { [id: string]: IGithubPullRequest } = { };

  get entities() {
    return Object.values(this._pullRequests);
  }
}

export default new PullRequestsService();

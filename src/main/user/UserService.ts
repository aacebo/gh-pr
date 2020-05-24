import IGithubUser from '../../core/github/GithubUser';

class UserService {
  get user() { return this._user; }
  set user(v) {
    this._user = v;
  }
  private _user?: IGithubUser;
}

export default new UserService();

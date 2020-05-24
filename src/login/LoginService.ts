import { AsyncStorage } from 'react-native';

import github from '../core/github/GithubClient';
import userService from '../main/user/UserService';

class LoginService {
  get code() { return this._code; }
  set code(v) {
    this._code = v;
  }
  private _code?: string;

  get token() { return this._token; }
  set token(v) {
    this._token = v;
    AsyncStorage.setItem('@gh-pr:token', v);
  }
  private _token?: string;

  constructor() {
    this._loadToken();
  }

  private async _loadToken() {
    this._token = await AsyncStorage.getItem('@gh-pr:token');

    if (this._token) {
      userService.user = await github.user();
    }
  }
}

export default new LoginService();

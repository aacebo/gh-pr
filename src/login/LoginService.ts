import { AsyncStorage } from 'react-native';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import github from '../core/github/GithubClient';
import userService from '../main/user/UserService';

import { LOGIN_STATE } from './LoginState';

class LoginService {
  private readonly _state$ = new BehaviorSubject(LOGIN_STATE);

  get code$() { return this._state$.pipe(map(s => s.code)); }
  get code() { return this._state$.value.code; }
  set code(v) {
    this._state$.next({
      ...this._state$.value,
      code: v,
    })
  }

  get token$() { return this._state$.pipe(map(s => s.token)); }
  get token() { return this._state$.value.token; }
  set token(v) {
    this._state$.next({
      ...this._state$.value,
      token: v,
    });

    AsyncStorage.setItem('@gh-pr:token', v);
  }

  constructor() {
    this._loadToken();
  }

  private async _loadToken() {
    this.token = await AsyncStorage.getItem('@gh-pr:token');

    if (this.token) {
      userService.user = await github.user();
    }
  }
}

export default new LoginService();

import AsyncStorage from '@react-native-community/async-storage';

import github from '../core/github/GithubClient';
import RootState from '../core/state/State';
import { createGetter } from '../core/state/Getter';

import userService from '../main/user/UserService';

import LOGIN_STATE from './LoginState';

class LoginService {
  private readonly _state$ = RootState.add('login', LOGIN_STATE);

  get code$() { return this._state$.get(createGetter(s => s.code)); }
  get code() { return this._state$.value.code; }
  set code(v) {
    this._state$.set('code', v);
  }

  get token$() { return this._state$.get(createGetter(s => s.token)); }
  get token() { return this._state$.value.token; }
  set token(v) {
    this._state$.set('token', v);

    if (v) {
      AsyncStorage.setItem('@gh-pr:token', v);
      github.user().then(user => userService.user = user);
    }
  }

  constructor() {
    AsyncStorage.getItem('@gh-pr:token')
                .then(t => this.token = t)
                .catch(err => console.error(err));
  }
}

export default new LoginService();

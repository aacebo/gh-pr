import RootState from '../../core/state/State';
import { createGetter } from '../../core/state/Getter';

import USER_STATE from './UserState';

class UserService {
  private readonly _state$ = RootState.add('user', USER_STATE);

  get user$() { return this._state$.get(createGetter(s => s.user)); }
  get user() { return this._state$.value.user; }
  set user(v) {
    this._state$.set('user', v);
  }
}

export default new UserService();

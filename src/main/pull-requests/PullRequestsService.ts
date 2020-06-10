import RootState from '../../core/state/State';
import { createGetter } from '../../core/state/Getter';

import PULL_REQUESTS_STATE from './PullRequestsState';

class PullRequestsService {
  private readonly _state$ = RootState.add('pullRequests', PULL_REQUESTS_STATE);

  get entities$() { return this._state$.get(createGetter(s => Object.values(s.pullRequests))); }
  get entities() { return Object.values(this._state$.value.pullRequests); }

  get pullRequests$() { return this._state$.get(createGetter(s => s.pullRequests)); }
  get pullRequests() { return this._state$.value.pullRequests; }
  set pullRequests(v) {
    this._state$.set('pullRequests', v);
  }
}

export default new PullRequestsService();

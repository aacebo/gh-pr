import { BehaviorSubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import isEqual from 'lodash.isequal';

import { Getter } from './Getter';

export class State<T = any> extends BehaviorSubject<T> {
  get pureValue() {
    const v = { ...this.value };

    for (const key of Object.getOwnPropertyNames(v)) {
      if (v[key] instanceof State) {
        v[key] = v[key].pureValue;
      }
    }

    return v;
  }

  constructor(v?: T) {
    super(Object.freeze(v));
  }

  add<V>(name: string, value: V) {
    const state = new State<V>(value);
    this.next({
      ...this.value,
      [name]: state,
    });

    return state;
  }

  get<V>(getter: Getter<T, V>) {
    return this.pipe(
      distinctUntilChanged((a, b) => isEqual(a, b)),
      map(v => getter(v)),
    );
  }

  set<V extends keyof T>(name: V, value: T[V]) {
    this.next({
      ...this.value,
      [name]: value,
    });
  }
}

export default new State({ });

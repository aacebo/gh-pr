import { Component } from 'react';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export default class AsyncComponent<P = { }, S = { }, SS = { }> extends Component<P, S, SS> {
  private readonly _destroy$ = new Subject<void>();

  componentWillUnmount() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  setAsyncState<T>(name: keyof S, observable: Observable<T>) {
    observable.pipe(takeUntil(this._destroy$))
              .subscribe(v => this.setState((prevState) => ({
                ...prevState,
                [name]: v,
              })));
  }
}

export type Getter<T, V> = (state: T) => V;
export function createGetter<State, Result>(projector: (state: State) => Result): Getter<State, Result>;
export function createGetter<State, S1, Result>(g1: Getter<State, S1>, projector: (s1: S1) => Result): Getter<State, Result>;
export function createGetter<State, S1, S2, Result>(g1: Getter<State, S1>, g2: Getter<State, S2>, projector: (s1: S1, s2: S2) => Result): Getter<State, Result>;
export function createGetter(...args: any[]) {
  const chain: Getter<any, any>[] = args.slice(0, args.length - 1);
  const projector: (...args: any[]) => any = args[args.length - 1];

  return (state: any) => {
    const args = [];

    for (const link of chain) {
      args.push(link(state));
    }

    if (args.length === 0) {
      args.push(state);
    }

    return projector(...args);
  };
}

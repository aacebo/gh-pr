export interface ILoginState {
  readonly code?: string;
  readonly token?: string;
}

export const LOGIN_STATE: ILoginState = { };

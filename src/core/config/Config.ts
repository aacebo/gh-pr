export default interface IConfig {
  readonly auth: IAuthConfig;
  readonly api: IApiConfig;
}

export interface IAuthConfig {
  readonly base: string;
  readonly id: string;
  readonly secret: string;
  readonly scope: string[];
}

export interface IApiConfig {
  readonly base: string;
}

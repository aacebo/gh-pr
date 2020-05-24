export default interface IGithubLoginResult {
  readonly access_token: string;
  readonly scope: string;
  readonly token_type: string;
}

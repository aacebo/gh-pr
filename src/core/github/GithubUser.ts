export default interface IGithubUser {
  readonly id: string;
  readonly login: string;
  readonly name: string;
  readonly url: string;
  readonly avatarUrl: string;
  readonly email: string;
  readonly company: string;
  readonly createdAt: string | Date;
  readonly updatedAt: string | Date;
}

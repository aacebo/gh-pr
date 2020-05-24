export default interface IGithubPullRequest {
  readonly id: string;
  readonly number: number;
  readonly state: 'MERGED' | 'OPEN' | 'CLOSED';
  readonly title: string;
  readonly url: string;
  readonly checksUrl: string;
  readonly createdAt: string | Date;
  readonly updatedAt: string | Date;
  readonly closedAt?: string | Date;
  readonly publishedAt?: string | Date;
}

import query from 'graphql-tag';

import config from '../config/ConfigClient';
import http from '../http/HttpClient';
import gql from '../gql/GqlClient';

import IGithubUser from './GithubUser';
import IGithubPullRequest from './GithubPullRequest';
import IGithubLoginResult from './GithubLoginResult';

class GithubClient {
  token(code: string) {
    return http.post<any, IGithubLoginResult>(`${config.config.auth.base}/access_token?client_id=${config.config.auth.id}&client_secret=${config.config.auth.secret}&code=${code}`);
  }

  async user() {
    return gql.query<{ viewer: IGithubUser }>(query`
      {
        viewer {
          login
          avatarUrl
          company
          email
          createdAt
          id
          name
          location
          url
          updatedAt
        }
      }
    `).then(v => v.data.viewer);
  }

  async pullRequests() {
    return gql.query<{ viewer: { pullRequests: { edges: [{ node: IGithubPullRequest }] } } }>(query`
      {
        viewer {
          id,
          pullRequests(last: 10, orderBy: {field: UPDATED_AT, direction: DESC}) {
            edges {
              node {
                id
                state
                title
                number
                url
                updatedAt
                publishedAt
                closedAt
                checksUrl
                createdAt
              }
            }
          }
        }
      }
    `).then(v => {
      const prs = v.data.viewer.pullRequests.edges.map(e => e.node);
      const map: { [id: string]: IGithubPullRequest } = { };

      for (const pr of prs) {
        map[pr.id] = pr;
      }

      return map;
    });
  }
}

export default new GithubClient();

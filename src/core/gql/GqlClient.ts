import { AsyncStorage } from 'react-native';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { DocumentNode } from 'graphql';

import config from '../config/ConfigClient';

class GqlClient {
  private _httpLink = new HttpLink({
    headers: { },
    uri: config.config.api.base,
  });

  private _authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem('@gh-pr:token');

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      }
    }
  });

  get client() { return this._client; }
  private readonly _client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      this._authLink,
      this._httpLink,
    ]),
  });

  query<T = any>(query: DocumentNode) {
    return this._client.query<T>({ query });
  }
}

export default new GqlClient();

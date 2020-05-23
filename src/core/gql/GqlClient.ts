import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { DocumentNode } from 'graphql';

class GqlClient {
  private _httpLink = new HttpLink({
    headers: { },
    uri: '',
  });

  private _authLink = setContext((_, { headers }) => {
    // const token = localStorage.getItem('token');

    return {
      headers: {
        ...headers,
        // authorization: token ? `Bearer ${token}` : '',
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

  query(query: DocumentNode) {
    return this._client.query({ query });
  }
}

export default new GqlClient();

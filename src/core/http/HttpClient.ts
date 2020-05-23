class HttpClient {
  private readonly _headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  async get<Result = any>(uri: string): Promise<Result> {
    return fetch(uri, {
      method: 'GET',
      headers: this._headers,
    }).then(res => res.json());
  }

  async post<Body = any, Result = any>(uri: string, body?: Body): Promise<Result> {
    return fetch(uri, {
      method: 'POST',
      headers: this._headers,
      body: body ? JSON.stringify(body) : undefined,
    }).then(res => res.json());
  }
}

export default new HttpClient();

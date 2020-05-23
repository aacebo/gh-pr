class LoginService {
  get code() { return this._code; }
  set code(v) {
    this._code = v;
  }
  private _code?: string;

  get token() { return this._token; }
  set token(v) {
    this._token = v;
  }
  private _token?: string;
}

export default new LoginService();

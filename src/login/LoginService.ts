class LoginService {
  get code() { return this._code; }
  set code(v: string) {
    this._code = v;
  }
  private _code?: string;
}

export default new LoginService();

class LoginService {
  get code() { return this._code; }
  private _code?: string;

  get() { }
}

export default new LoginService();

import Constants from 'expo-constants';

import IConfig from './Config';

class ConfigClient {
  get config() { return this._config; }
  private readonly _config: IConfig;

  constructor() {
    this._config = Constants.manifest.extra;
  }
}

export default new ConfigClient();

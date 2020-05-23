import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import http from '../core/http/HttpClient';
import config from '../core/config/ConfigClient';

import loginService from './LoginService';
import LoginButton from './LoginButton';
import ILoginScreenProps from './LoginScreenProps';
import ILoginResult from './LoginResult';

WebBrowser.maybeCompleteAuthSession();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function LoginScreen(props: ILoginScreenProps) {
  const req = AuthSession.useAuthRequest({
    clientId: config.config.auth.id,
    clientSecret: config.config.auth.secret,
    redirectUri: `${AuthSession.makeRedirectUri()}/Main`,
    scopes: config.config.auth.scope,
  }, {
    authorizationEndpoint: `${config.config.auth.base}/authorize`,
    tokenEndpoint: `${config.config.auth.base}/access_token`,
    revocationEndpoint: `https://github.com/settings/connections/applications/${config.config.auth.id}`,
  });

  const login = async () => {
    const out = await req[2]();

    if (out.type === 'success') {
      loginService.code = out.params.code;
      const res = await http.post<any, ILoginResult>(`${config.config.auth.base}/access_token?client_id=${config.config.auth.id}&client_secret=${config.config.auth.secret}&code=${loginService.code}`);
      loginService.token = res.access_token;
      props.navigation.replace('Main');
    }
  };

  return (
    <View style={styles.container}>
      <LoginButton onPress={() => login()}>Login</LoginButton>
    </View>
  );
}

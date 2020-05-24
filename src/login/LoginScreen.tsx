import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import config from '../core/config/ConfigClient';
import github from '../core/github/GithubClient';

import userService from '../main/user/UserService';

import loginService from './LoginService';
import LoginButton from './LoginButton';
import ILoginScreenProps from './LoginScreenProps';

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
      const res = await github.token(loginService.code);
      loginService.token = res.access_token;
      userService.user = await github.user();
      props.navigation.replace('Main');
    }
  };

  return (
    <View style={styles.container}>
      <LoginButton onPress={() => login()}>Login</LoginButton>
    </View>
  );
}

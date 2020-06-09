import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import config from '../core/config/ConfigClient';
import github from '../core/github/GithubClient';

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
  const [request, response, promptAsync] = AuthSession.useAuthRequest({
    clientId: config.config.auth.id,
    clientSecret: config.config.auth.secret,
    redirectUri: `${AuthSession.makeRedirectUri({ useProxy: true })}`,
    scopes: config.config.auth.scope,
  }, {
    authorizationEndpoint: `${config.config.auth.base}/authorize`,
    tokenEndpoint: `${config.config.auth.base}/access_token`,
    revocationEndpoint: `https://github.com/settings/connections/applications/${config.config.auth.id}`,
  });

  const getToken = async (code: string) => {
    const login = await github.token(code);
    loginService.token = login.access_token;
    props.navigation.replace('Main');
  };

  useEffect(() => {
    if (response?.type === 'success') {
      loginService.code = response.params.code;
      getToken(response.params.code);
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <LoginButton disabled={!request} onPress={() => promptAsync({ useProxy: true })}>
        Sign in to Github
      </LoginButton>
    </View>
  );
}

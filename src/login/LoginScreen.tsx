import React from 'react';
import { StyleSheet, View } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import http from '../core/http/HttpClient';

import loginService from './LoginService';
import LoginButton from './LoginButton';
import ILoginScreenProps from './LoginScreenProps';
import ILoginResult from './LoginResult';

WebBrowser.maybeCompleteAuthSession();

const clientId = '051bf948d5685bc3b4e8';
const clientSecret = 'b7ac2b32c0ba9a2721e14e93d15d65675ff3e7c5';
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
    clientId,
    clientSecret,
    redirectUri: `${AuthSession.makeRedirectUri()}/Main`,
    scopes: [
      'user',
      'public_repo',
      'repo',
      'repo_deployment',
      'repo:status',
      'read:repo_hook',
      'read:org',
      'read:public_key',
      'read:gpg_key',
    ],
  }, {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: `https://github.com/settings/connections/applications/${clientId}`,
  });

  const login = async () => {
    const out = await req[2]();

    if (out.type === 'success') {
      loginService.code = (out as any).params.code;
      const res = await http.post<any, ILoginResult>(`https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${loginService.code}`);
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

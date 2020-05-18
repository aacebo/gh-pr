import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import LoginButton from './LoginButton';
import ILoginScreenProps from './LoginScreenProps';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class LoginScreen extends Component<ILoginScreenProps> {
  render() {
    return (
      <View style={styles.container}>
        <LoginButton onPress={this.login.bind(this)}>test buttons</LoginButton>
      </View>
    );
  }

  login() {
    console.log('hit login');
    this.props.onComplete();
  }
}

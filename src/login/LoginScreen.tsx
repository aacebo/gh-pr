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
  constructor(props: ILoginScreenProps) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginButton onPress={this.login.bind(this)}>test buttons</LoginButton>
      </View>
    );
  }

  login() {
    this.props.navigation.navigate('Main');
  }
}

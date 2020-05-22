import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import ILoginButtonProps from './LoginButtonProps';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 3
  },
  text: {
    color: 'white',
  },
});

export default class LoginButton extends Component<ILoginButtonProps> {
  constructor(readonly props: ILoginButtonProps) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.container} onPress={this.props.onPress} disabled={this.props.disabled}>
        <Text style={styles.text}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

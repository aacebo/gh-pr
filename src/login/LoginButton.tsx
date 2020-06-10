import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import ILoginButtonProps from './LoginButtonProps';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  text: {
    color: 'white',
    marginLeft: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 26,
    color: 'white',
  },
});

export default class LoginButton extends Component<ILoginButtonProps> {
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        disabled={this.props.disabled}
        onPress={this.props.onPress}
      >
        <Feather style={styles.icon} name="github" />
        <Text style={styles.text}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }
}

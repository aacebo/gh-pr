import React, { Component } from 'react';
import { StyleSheet, View , Button} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import loginService from '../../login/LoginService';

import IUserScreenProps from './UserScreenProps';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class UserScreen extends Component<IUserScreenProps> {
  private get _parentNavigation() {
    return this.props.navigation.dangerouslyGetParent() as StackNavigationProp<any>;
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign out" onPress={this.signOut.bind(this)} />
      </View>
    );
  }

  signOut() {
    loginService.token = undefined;
    this._parentNavigation.replace('Login');
  }
}

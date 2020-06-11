import React from 'react';
import { StyleSheet, View , Button, Image} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import AsyncComponent from '../../core/async-component/AsyncComponent';
import loginService from '../../login/LoginService';
import ISubScreenProps from '../SubScreenProps';

import userService from './UserService';
import USER_STATE, { IUserState } from './UserState';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    height: 180,
    width: 180,
    borderRadius: 5,
  },
});

export default class UserScreen extends AsyncComponent<ISubScreenProps, IUserState> {
  state = USER_STATE;

  private get _parentNavigation() {
    return this.props.navigation.dangerouslyGetParent() as StackNavigationProp<any>;
  }

  componentDidMount() {
    this.setAsyncState('user', userService.user$);
  }

  render() {
    if (!this.state.user) {
      return (
        <View style={styles.container}>
          <Button title="Sign out" onPress={this.signOut.bind(this)} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: this.state.user.avatarUrl }} />
        <Button title="Sign out" onPress={this.signOut.bind(this)} />
      </View>
    );
  }

  signOut() {
    loginService.token = undefined;
    this._parentNavigation.replace('Login');
  }
}

import React, { Component } from 'react';
import { StyleSheet, View , Button, Image} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import loginService from '../../login/LoginService';
import userService from './UserService';

import IUserScreenProps from './UserScreenProps';
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

export default class UserScreen extends Component<IUserScreenProps, IUserState> {
  state = USER_STATE;
  private readonly _destroy$ = new Subject<void>();

  private get _parentNavigation() {
    return this.props.navigation.dangerouslyGetParent() as StackNavigationProp<any>;
  }

  componentDidMount() {
    userService.user$.pipe(takeUntil(this._destroy$))
                     .subscribe(user => this.setState({ user }));
  }

  componentWillUnmount() {
    this._destroy$.next();
    this._destroy$.complete();
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

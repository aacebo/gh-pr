import React, { Component } from 'react';
import { StyleSheet, View , Button} from 'react-native';

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
  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign out" onPress={this.signOut.bind(this)} />
      </View>
    );
  }

  signOut() {
    loginService.token = undefined;
    this.props.navigation.navigate('Login');
  }
}

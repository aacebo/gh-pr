import React, { Component } from 'react';

import LoginScreen from './src/login/LoginScreen';
import MainScreen from './src/main/MainScreen';

export default class App extends Component<{}, { auth?: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      this.state.auth ? (
        <MainScreen></MainScreen>
      ) : (
        <LoginScreen onComplete={this.onAuthComplete.bind(this)} />
      )
    );
  }

  onAuthComplete() {
    this.setState({
      auth: !this.state.auth,
    });
  }
}

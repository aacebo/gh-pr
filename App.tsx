import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/login/LoginScreen';
import MainScreen from './src/main/MainScreen';

const Stack = createStackNavigator();

export default class App extends Component<{}, { auth?: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          animationTypeForReplace: 'pop',
          headerShown: false,
        }}>
          {
            !this.state.auth ? (
              <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
              <Stack.Screen name="Main" component={MainScreen} />
            )
          }
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  onAuthComplete() {
    this.setState({
      auth: !this.state.auth,
    });
  }
}

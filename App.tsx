import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ApolloProvider } from '@apollo/react-hooks';

import gql from './src/core/gql/GqlClient';
import LoginScreen from './src/login/LoginScreen';
import loginService from './src/login/LoginService';
import MainScreen from './src/main/MainScreen';
import ErrorHandler from './src/error-handler/ErrorHandler';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <ErrorHandler>
        <ApolloProvider client={gql.client}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={loginService.token ? 'Main' : 'Login'}
              screenOptions={{
                animationTypeForReplace: 'push',
                headerShown: false,
              }}
            >
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Main" component={MainScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApolloProvider>
      </ErrorHandler>
    );
  }
}

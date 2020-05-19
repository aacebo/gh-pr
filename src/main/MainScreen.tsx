import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import PullRequestsScreen from './pull-requests/PullRequestsScreen';
import UserScreen from './user/UserScreen';

const Tab = createBottomTabNavigator();

export default class MainScreen extends Component {
  render() {
    return (
      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: (props) => {
              let icon = '';

              if (route.name === 'Pull Requests') {
                icon = 'git-pull-request';
              } else if (route.name === 'User') {
                icon = 'user';
              }

              return <Feather name={icon} size={30} color={props.color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            showLabel: false,
            style: { backgroundColor: 'black' },
          }}
        >
          <Tab.Screen name="Pull Requests" component={PullRequestsScreen} />
          <Tab.Screen name="User" component={UserScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

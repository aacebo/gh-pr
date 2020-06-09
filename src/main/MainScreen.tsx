import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feather } from '@expo/vector-icons';

import PullRequestsScreen from './pull-requests/PullRequestsScreen';
import UserScreen from './user/UserScreen';

import IMainScreenProps from './MainScreenProps';

const Tab = createMaterialTopTabNavigator();

export default class MainScreen extends Component<IMainScreenProps> {
  render() {
    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
        <NavigationContainer independent={true}>
          <Tab.Navigator
            tabBarPosition="bottom"
            screenOptions={({ route }) => ({
              tabBarIcon: (props) => {
                let icon = '';

                if (route.name === 'Pull Requests') {
                  icon = 'git-pull-request';
                } else if (route.name === 'User') {
                  icon = 'user';
                }

                return <Feather name={icon} size={20} color={props.color} />;
              },
            })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'grey',
              showLabel: false,
              showIcon: true,
              indicatorStyle: {
                display: 'none',
              },
              style: {
                backgroundColor: 'black',
              },
            }}
          >
            <Tab.Screen name="Pull Requests" component={PullRequestsScreen} />
            <Tab.Screen name="User" component={UserScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

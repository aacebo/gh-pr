import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Opens up App.tsx to start working on your app!</Text>
      </View>
    );
  }
}

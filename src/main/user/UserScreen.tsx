import React, { Component } from 'react';
import { StyleSheet, View , Button} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class UserScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="test" onPress={() => console.log('test')} />
      </View>
    );
  }
}

import React, { Component } from 'react';
import { StyleSheet, View , Button} from 'react-native';

import RootState from '../../core/state/State';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class PullRequestsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title="test" onPress={() => console.log(RootState.pureValue)} />
      </View>
    );
  }
}

import React, { Component } from 'react';
import { StyleSheet, View , Button} from 'react-native';

import github from '../../core/github/GithubClient';
import pullRequestService from './PullRequestsService';

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
  constructor(props: any) {
    super(props);
    this._load();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="test" onPress={() => console.log('test')} />
      </View>
    );
  }

  private async _load() {
    pullRequestService.pullRequests = await github.pullRequests();
  }
}

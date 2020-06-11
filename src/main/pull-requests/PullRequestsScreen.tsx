import React, { Component } from 'react';
import { StyleSheet, View , Button} from 'react-native';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import RootState from '../../core/state/State';
import github from '../../core/github/GithubClient';
import ISubScreenProps from '../SubScreenProps';

import pullRequestsService from './PullRequestsService';
import IGithubPullRequest from '../../core/github/GithubPullRequest';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class PullRequestsScreen extends Component<ISubScreenProps, { pullRequests: IGithubPullRequest[] }> {
  state = { pullRequests: [] };
  private readonly _destroy$ = new Subject<void>();

  async componentDidMount() {
    pullRequestsService.pullRequests = await github.pullRequests();
    pullRequestsService.entities$.pipe(takeUntil(this._destroy$))
                                 .subscribe(pullRequests => this.setState({ pullRequests }));
  }

  componentWillUnmount() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="test" onPress={() => console.log(RootState.pureValue)} />
      </View>
    );
  }
}

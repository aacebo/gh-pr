import { Component, ErrorInfo } from 'react';

export default class ErrorHandler extends Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    console.error(error);
  }

  render() {
    return this.props.children;
  }
}

import { Route } from '@react-navigation/native';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';

export default interface IUserScreenProps {
  readonly navigation: MaterialTopTabNavigationProp<any>;
  readonly route: Route<string>;
}

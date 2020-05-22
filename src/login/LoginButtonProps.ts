import { NativeSyntheticEvent, NativeTouchEvent } from 'react-native';

export default interface ILoginButtonProps {
  readonly children?: React.ReactNode;
  readonly disabled?: boolean;
  readonly onPress?: (e?: NativeSyntheticEvent<NativeTouchEvent>) => void;
}

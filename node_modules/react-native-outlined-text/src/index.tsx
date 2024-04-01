import {
  ColorValue,
  Platform,
  UIManager,
  ViewProps,
  requireNativeComponent,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-outlined-text' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type OutlinedTextProps = {
  outlineColor?: ColorValue;
  outlineWidth?: number;
  text: string;
  textSize: number;
  shadowWidth?: number;
  isLeftAlign?: boolean;
} & ViewProps;

const ComponentName = 'OutlinedTextView';

export const OutlinedTextView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<OutlinedTextProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };

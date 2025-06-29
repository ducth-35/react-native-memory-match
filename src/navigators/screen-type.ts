import {NativeStackScreenProps as RNStackScreenProps} from '@react-navigation/native-stack';

export enum APP_SCREEN {
  HOME = 'HOME_SCREEN',
  GAME = 'GAME_SCREEN',
  GAME_OVER = 'GAME_OVER_SCREEN',
  ABOUT = 'ABOUT_SCREEN',
  PROFILE = 'PROFILE_SCREEN',
}

export type RootStackParamList = {
  [APP_SCREEN.HOME]: undefined;
  [APP_SCREEN.GAME]: undefined;
  [APP_SCREEN.GAME_OVER]: undefined;
  [APP_SCREEN.ABOUT]: undefined;
  [APP_SCREEN.PROFILE]: undefined;
};

export type StackScreenProps<T extends keyof RootStackParamList> =
  RNStackScreenProps<RootStackParamList, T>;

import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

import {AppTheme} from '../lib/hooks/useAppTheme.ts';

export const createBaseHeaderOptions = (
  theme: AppTheme,
): NativeStackNavigationOptions => ({
  headerShown: false,
  headerShadowVisible: false,
  // background of the header
  headerStyle: {backgroundColor: theme.colors.background},
  // title text style
  headerTitleStyle: {color: theme.colors.onBackground},
  // back arrow + header buttons color
  headerTintColor: theme.colors.onBackground,
  // optional: "Back" text hidden on iOS
  // headerBackTitleVisible: false,
});

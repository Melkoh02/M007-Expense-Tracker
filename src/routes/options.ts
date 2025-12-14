import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

import {AppTheme} from '../lib/hooks/useAppTheme.ts';

export const createBaseHeaderOptions = (
  theme: AppTheme,
): NativeStackNavigationOptions => ({
  headerShown: false,
  headerShadowVisible: false,
  headerStyle: {
    backgroundColor: theme.colors.background,
  },
  headerTitleStyle: {color: theme.colors.onBackground},
  headerTintColor: theme.colors.onBackground,
  headerLargeTitleStyle: {color: theme.colors.onBackground},
});

import {useNavigation as useDefaultNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

import type {
  AppStackParamList,
  AuthStackParamList,
  HomeStackParamList,
  SettingsStackParamList,
  TransactionStackParamList,
} from '../types/navigation';

type StackName =
  | 'AuthStack'
  | 'HomeStack'
  | 'SettingsStack'
  | 'AppStack'
  | 'TransactionStack';

type NavMap = {
  AuthStack: NativeStackNavigationProp<AuthStackParamList>;
  HomeStack: NativeStackNavigationProp<HomeStackParamList>;
  SettingsStack: NativeStackNavigationProp<SettingsStackParamList>;
  TransactionStack: NativeStackNavigationProp<TransactionStackParamList>;
  AppStack: NativeStackNavigationProp<AppStackParamList>;
};

export function useNavigation(stack: 'AuthStack'): NavMap['AuthStack'];
export function useNavigation(stack: 'HomeStack'): NavMap['HomeStack'];
export function useNavigation(stack: 'SettingsStack'): NavMap['SettingsStack'];
export function useNavigation(stack: 'AppStack'): NavMap['AppStack'];
export function useNavigation(
  stack: 'TransactionStack',
): NavMap['TransactionStack'];

export function useNavigation(stack: StackName) {
  switch (stack) {
    case 'AuthStack':
      return useDefaultNavigation<NavMap['AuthStack']>();
    case 'HomeStack':
      return useDefaultNavigation<NavMap['HomeStack']>();
    case 'SettingsStack':
      return useDefaultNavigation<NavMap['SettingsStack']>();
    case 'AppStack':
      return useDefaultNavigation<NavMap['AppStack']>();
    case 'TransactionStack':
      return useDefaultNavigation<NavMap['TransactionStack']>();
  }
}

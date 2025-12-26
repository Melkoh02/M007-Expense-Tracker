import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';

import {TransactionTypeEnum} from '../constants/transaction.ts';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
};

export type TransactionStackParamList = {
  TransactionScreen: {
    transactionType: TransactionTypeEnum;
  };
};

export type SearchBarNavProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'HomeTab'>,
  DrawerNavigationProp<DrawerParamList>
>;

export type TabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  SettingsTab: NavigatorScreenParams<SettingsStackParamList>;
  // here goes bottom-tabs-only screens if added more in the future.
};

export type DrawerParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  // here goes drawer-only screens if added more in the future.
};

export type AppStackParamList = {
  MainDrawer: NavigatorScreenParams<DrawerParamList>;
  TransactionFlow: NavigatorScreenParams<TransactionStackParamList>;
};

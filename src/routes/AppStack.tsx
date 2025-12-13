import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainDrawer from '../components/molecules/drawer';
import {AppStackParamList} from '../lib/types/navigation';
import TransactionStack from './stacks/TransactionStack';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainDrawer" component={MainDrawer} />
      <Stack.Screen name="TransactionStack" component={TransactionStack} />
    </Stack.Navigator>
  );
}

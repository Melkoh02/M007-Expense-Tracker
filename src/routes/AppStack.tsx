import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainDrawer from '../components/molecules/drawer';
import {AppStackParamList} from '../lib/types/navigation';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainDrawer" component={MainDrawer} />
    </Stack.Navigator>
  );
}

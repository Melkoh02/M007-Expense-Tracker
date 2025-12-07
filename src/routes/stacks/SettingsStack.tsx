import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SettingsScreen from '../../pages/SettingsScreen';
import {SettingsStackParamList} from '../../lib/types/navigation.ts';

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export default function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

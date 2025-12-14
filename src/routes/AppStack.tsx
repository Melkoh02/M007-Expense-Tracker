import React, {useMemo} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainDrawer from '../components/molecules/drawer';
import {useTheme} from '../lib/hooks/useAppTheme';
import {AppStackParamList} from '../lib/types/navigation';
import {createBaseHeaderOptions} from './options';
import TransactionStack from './stacks/TransactionStack';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStack() {
  const theme = useTheme();
  const baseHeaderOptions = useMemo(
    () => createBaseHeaderOptions(theme),
    [theme],
  );

  return (
    <Stack.Navigator screenOptions={baseHeaderOptions}>
      <Stack.Screen name="MainDrawer" component={MainDrawer} />
      <Stack.Screen name="TransactionFlow" component={TransactionStack} />
    </Stack.Navigator>
  );
}

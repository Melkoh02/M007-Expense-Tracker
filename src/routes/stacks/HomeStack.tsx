import {useMemo} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useTheme} from '../../lib/hooks/useAppTheme.ts';
import {HomeStackParamList} from '../../lib/types/navigation.ts';
import HomeScreen from '../../pages/HomeScreen';
import {createBaseHeaderOptions} from '../options.ts';
import TransactionStack from './TransactionStack.tsx';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  const theme = useTheme();
  const screenOptions = useMemo(() => createBaseHeaderOptions(theme), [theme]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Transaction"
        component={TransactionStack}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
}

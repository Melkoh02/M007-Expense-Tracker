import {useMemo} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useTheme} from '../../lib/hooks/useAppTheme.ts';
import {TransactionStackParamList} from '../../lib/types/navigation.ts';
import TransactionScreen from '../../pages/TransactionScreen.tsx';
import {createBaseHeaderOptions} from '../options.ts';

const Stack = createNativeStackNavigator<TransactionStackParamList>();

export default function TransactionStack() {
  const theme = useTheme();
  const screenOptions = useMemo(() => createBaseHeaderOptions(theme), [theme]);

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Transaction" component={TransactionScreen} />
    </Stack.Navigator>
  );
}

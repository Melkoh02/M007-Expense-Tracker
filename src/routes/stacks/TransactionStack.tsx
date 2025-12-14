import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {TransactionStackParamList} from '../../lib/types/navigation.ts';
import TransactionScreen from '../../pages/TransactionScreen.tsx';

const Stack = createNativeStackNavigator<TransactionStackParamList>();

export default function TransactionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TransactionScreen"
        component={TransactionScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

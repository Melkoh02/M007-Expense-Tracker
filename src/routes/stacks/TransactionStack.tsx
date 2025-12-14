import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {TransactionStackParamList} from '../../lib/types/navigation.ts';
import TransactionScreen from '../../pages/TransactionScreen.tsx';

const Stack = createNativeStackNavigator<TransactionStackParamList>();

export default function TransactionStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TransactionScreen" component={TransactionScreen} />
    </Stack.Navigator>
  );
}

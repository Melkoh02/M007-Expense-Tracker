import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TransactionScreen from '../../pages/TransactionScreen.tsx';
import {TransactionStackParamList} from '../../lib/types/navigation.ts';

const Stack = createNativeStackNavigator<TransactionStackParamList>();

export default function TransactionStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Transaction" component={TransactionScreen} />
    </Stack.Navigator>
  );
}

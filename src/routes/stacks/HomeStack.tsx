import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeStackParamList} from '../../lib/types/navigation.ts';
import HomeScreen from '../../pages/HomeScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}

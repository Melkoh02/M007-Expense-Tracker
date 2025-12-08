import BaseLayout from '../components/templates/BaseLayout.tsx';
import {Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TransactionStackParamList} from '../lib/types/navigation.ts';

type Props = NativeStackScreenProps<TransactionStackParamList, 'Transaction'>;

export default function TransactionScreen({route}: Props) {
  const transactionType = route.params.transactionType;

  return (
    <BaseLayout>
      <Text>{transactionType}</Text>
    </BaseLayout>
  );
}

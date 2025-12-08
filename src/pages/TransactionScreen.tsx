import BaseLayout from '../components/templates/BaseLayout.tsx';
import {Text} from 'react-native-paper';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TransactionStackParamList} from '../lib/types/navigation.ts';
import {useTranslation} from 'react-i18next';
import {getTransactionTypeLabel} from '../lib/helpers/transaction.ts';

type Props = NativeStackScreenProps<TransactionStackParamList, 'Transaction'>;

export default function TransactionScreen({route}: Props) {
  const transactionType = route.params.transactionType;
  const {t} = useTranslation();
  const transactionTypeLabel = getTransactionTypeLabel(t, transactionType);
  const title = t('transaction.transactionScreenTitle', {
    TRANSACTION_TYPE: transactionTypeLabel,
  });

  return (
    <BaseLayout>
      <Text>{title}</Text>
    </BaseLayout>
  );
}

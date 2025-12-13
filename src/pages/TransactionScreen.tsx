import {useEffect} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native-paper';

import BaseLayout from '../components/templates/BaseLayout.tsx';
import {getTransactionTypeLabel} from '../lib/helpers/transaction.ts';
import {TransactionStackParamList} from '../lib/types/navigation.ts';

type Props = NativeStackScreenProps<TransactionStackParamList, 'Transaction'>;

export default function TransactionScreen({navigation, route}: Props) {
  const transactionType = route.params.transactionType;
  const {t} = useTranslation();
  const transactionTypeLabel = getTransactionTypeLabel(t, transactionType);
  const title = t('transaction.transactionScreenTitle', {
    TRANSACTION_TYPE: transactionTypeLabel,
  });

  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerShown: true,
    });
  }, [navigation, title]);

  return (
    <BaseLayout>
      <Text>{title}</Text>
    </BaseLayout>
  );
}

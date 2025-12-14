import {useLayoutEffect} from 'react';

import {View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';

import BaseLayout from '../components/templates/BaseLayout.tsx';
import {getTransactionTypeLabel} from '../lib/helpers/transaction.ts';
import {TransactionStackParamList} from '../lib/types/navigation.ts';

type Props = NativeStackScreenProps<
  TransactionStackParamList,
  'TransactionScreen'
>;

export default function TransactionScreen({navigation, route}: Props) {
  const transactionType = route.params.transactionType;
  const {t} = useTranslation();
  const transactionTypeLabel = getTransactionTypeLabel(t, transactionType);
  const title = t('transaction.transactionScreenTitle', {
    TRANSACTION_TYPE: transactionTypeLabel,
  });

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    if (!parent) return;
    parent.setOptions({title, headerShown: true});
  }, [navigation, title]);

  return (
    <BaseLayout>
      <View
        style={{
          // backgroundColor: 'black',
          flex: 1,
        }}></View>
    </BaseLayout>
  );
}

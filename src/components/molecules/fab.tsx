import React from 'react';

import {useTranslation} from 'react-i18next';
import {FAB} from 'react-native-paper';

import {TransactionType} from '../../lib/constants/transaction.ts';
import {useNavigation} from '../../lib/hooks/useNavigation.ts';

const MainFab = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const navigation = useNavigation('HomeStack');
  const {t} = useTranslation();

  return (
    <FAB.Group
      open={open}
      icon={open ? 'close' : 'pencil'}
      variant={'secondary'}
      actions={[
        {
          icon: 'arrow-up',
          label: t('common.expense'),
          onPress: () => {
            navigation.navigate('Transaction', {
              screen: 'TransactionScreen',
              params: {transactionType: TransactionType.EXPENSE},
            });
          },
        },
        {
          icon: 'swap-horizontal',
          label: t('common.transfer'),
          onPress: () => {
            navigation.navigate('Transaction', {
              screen: 'TransactionScreen',
              params: {transactionType: TransactionType.TRANSFER},
            });
          },
        },
        {
          icon: 'arrow-down',
          label: t('common.income'),
          onPress: () => {
            navigation.navigate('Transaction', {
              screen: 'TransactionScreen',
              params: {transactionType: TransactionType.INCOME},
            });
          },
        },
      ]}
      onStateChange={({open}: {open: boolean}) => setOpen(open)}
      visible
    />
  );
};

export default MainFab;

import React from 'react';
import {FAB} from 'react-native-paper';
import {useNavigation} from '../../lib/hooks/useNavigation.ts';
import {TransactionType} from '../../lib/constants/transaction.ts';
import {useTranslation} from 'react-i18next';

const MainFab = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const navigation = useNavigation('AppStack');
  const {t} = useTranslation();

  return (
    <FAB.Group
      open={open}
      icon={open ? 'close' : 'pencil'}
      variant={'secondary'}
      actions={[
        {
          icon: 'arrow-up',
          label: t('fab.expense'),
          onPress: () => {
            navigation.navigate('TransactionStack', {
              screen: 'Transaction',
              params: {transactionType: TransactionType.EXPENSE},
            });
          },
        },
        {
          icon: 'swap-horizontal',
          label: t('fab.transfer'),
          onPress: () => {
            navigation.navigate('TransactionStack', {
              screen: 'Transaction',
              params: {transactionType: TransactionType.TRANSFER},
            });
          },
        },
        {
          icon: 'arrow-down',
          label: t('fab.income'),
          onPress: () => {
            navigation.navigate('TransactionStack', {
              screen: 'Transaction',
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

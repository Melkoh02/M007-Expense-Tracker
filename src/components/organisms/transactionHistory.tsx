import React from 'react';

import {StyleSheet, View} from 'react-native';

import {useTranslation} from 'react-i18next';
import {Surface, Text} from 'react-native-paper';

import {getColorForType} from '../../lib/helpers/getColorForType.ts';
import {getCurrencySymbol} from '../../lib/helpers/getCurrecySymbol.ts';
import {getInitials} from '../../lib/helpers/getInitials.ts';
import {AppTheme, useTheme} from '../../lib/hooks/useAppTheme.ts';
import {useStore} from '../../lib/hooks/useStore.ts';
import {Account, Transaction} from '../../lib/types/transaction.ts';

type Props = {
  data: Transaction[];
};

const renderTransactionItem = (
  item: Transaction,
  theme: AppTheme,
  account: Account,
) => {
  return (
    <Surface elevation={1} style={styles.surface}>
      <View style={styles.rowLeft}>
        <Text variant="titleLarge" style={{color: account.color}}>
          {getInitials(account.name)}
        </Text>
        <Text
          variant="bodyLarge"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.description}>
          {item.description}
        </Text>
      </View>
      <Text
        variant="titleLarge"
        style={[
          styles.amount,
          {color: getColorForType(theme, item.transactionType)},
        ]}>
        {`${getCurrencySymbol(account.currency)}${item.amount}`}
      </Text>
    </Surface>
  );
};

const TransactionHistory: React.FC<Props> = ({data}) => {
  const theme = useTheme();
  const {accountsStore} = useStore();
  const {t} = useTranslation();
  const hasTransactions = data && data.length > 0;

  return (
    <>
      <Text variant="titleMedium" style={styles.title}>
        {t('history.title')}
      </Text>
      {hasTransactions ? (
        <View style={styles.container}>
          {data.map(item => {
            const account = accountsStore.getAccountById(item.fromAccountId);
            if (!account) return null;

            return (
              <React.Fragment key={item.id}>
                {renderTransactionItem(item, theme, account)}
              </React.Fragment>
            );
          })}
        </View>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>{t('history.noHistory')}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 12,
  },
  container: {
    paddingVertical: 12,
    gap: 12,
  },
  surface: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderRadius: 18,
    gap: 12,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingLeft: 12,
  },
  description: {
    flex: 1,
    minWidth: 0,
    fontStyle: 'italic',
  },
  amount: {
    paddingRight: 12,
    flexShrink: 0,
  },
  empty: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontStyle: 'italic',
  },
});

export default TransactionHistory;

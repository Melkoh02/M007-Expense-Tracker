import React, {useMemo} from 'react';

import {StyleSheet, View} from 'react-native';

import {useTranslation} from 'react-i18next';
import {IconButton, Surface, Text, TouchableRipple} from 'react-native-paper';

import {getCurrencySymbol} from '../../lib/helpers/getCurrecySymbol.ts';
import {Account} from '../../lib/types/transaction.ts';

type Props = {
  accountsData: Account[];
};

const AccountsGrid: React.FC<Props> = ({accountsData}) => {
  const {t} = useTranslation();
  const hasAccounts = useMemo(
    () => accountsData && accountsData.length > 0,
    [accountsData],
  );

  return (
    <>
      <View style={styles.header}>
        <Text variant="titleMedium" style={styles.title}>
          {t('accounts.title')}
        </Text>
        <IconButton
          size={20}
          icon={hasAccounts ? 'pencil' : 'plus'}
          style={{marginRight: 0}}
          onPress={() => {}}
        />
      </View>
      {hasAccounts ? (
        <View style={styles.container}>
          {accountsData.map(acc => (
            <TouchableRipple
              key={acc.name}
              onPress={acc.onPress}
              borderless
              style={styles.ripple}>
              <Surface elevation={2} style={styles.pill}>
                <View style={[styles.leftBlock, {backgroundColor: acc.color}]}>
                  <Text style={styles.leftText}>{acc.name}</Text>
                </View>
                <View style={styles.rightBlock}>
                  <Text style={styles.rightText}>
                    {getCurrencySymbol(acc.currency)}
                    {acc.currentTotal}
                  </Text>
                </View>
              </Surface>
            </TouchableRipple>
          ))}
        </View>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>{t('accounts.noAccounts')}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    paddingTop: 12,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  ripple: {
    borderRadius: 50,
    flexGrow: 1,
  },
  pill: {
    flexDirection: 'row',
    borderRadius: 50,
  },
  leftBlock: {
    flexGrow: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  rightBlock: {
    flexGrow: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  rightText: {
    fontWeight: '600',
    fontSize: 13,
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

export default AccountsGrid;

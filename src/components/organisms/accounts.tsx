import React from 'react';

import {StyleSheet, View} from 'react-native';

import {Surface, Text, TouchableRipple} from 'react-native-paper';

import {getCurrencySymbol} from '../../lib/helpers/getCurrecySymbol.ts';
import {Account} from '../../lib/types/accounts.ts';

type Props = {
  accountsData: Account[];
};

const AccountsGrid: React.FC<Props> = ({accountsData}) => {
  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
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
});

export default AccountsGrid;

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Surface, Text, TouchableRipple} from 'react-native-paper';

type AccountItem = {
  name: string;
  amount: string;
  currency: string;
  color: string;
  onPress: () => void;
};

type Props = {
  accountsData: AccountItem[];
};

const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'USD':
      return '$';
    case 'PYG':
      return '₲';
    default:
      return '';
  }
};

const Accounts: React.FC<Props> = ({accountsData}) => {
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
                {acc.amount}
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

export default Accounts;

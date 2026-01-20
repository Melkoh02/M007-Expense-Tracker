import React, {useCallback, useEffect, useState} from 'react';

import {StyleSheet, View} from 'react-native';

import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native-paper';

import {useTheme} from '../../lib/hooks/useAppTheme';
import {useStore} from '../../lib/hooks/useStore';
import {Account} from '../../lib/types/transaction';
import BaseModal from '../molecules/modal';

type Props = {
  isVisible: boolean;
  onDismiss: () => void;
};

const DEFAULT_NEW_ACCOUNT: Omit<Account, 'id' | 'name'> = {
  currentTotal: '0',
  currency: 'USD',
  color: '#4b6c95',
};

const AddAccountModal = ({isVisible, onDismiss}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {accountsStore} = useStore();

  const [accountName, setAccountName] = useState('');

  useEffect(() => {
    if (isVisible) {
      setAccountName('');
    }
  }, [isVisible]);

  const onAddAccount = useCallback(() => {
    const trimmed = accountName.trim();
    if (!trimmed) return;

    accountsStore.addAccount({
      ...DEFAULT_NEW_ACCOUNT,
      name: trimmed,
    });

    onDismiss();
  }, [accountName, accountsStore, onDismiss]);

  return (
    <BaseModal
      title={t('modals.addAccount.title', 'Add Account')}
      isVisible={isVisible}
      onDismiss={onDismiss}
      content={
        <View style={styles.content}>
          <TextInput
            mode="flat"
            value={accountName}
            onChangeText={setAccountName}
            placeholder={t('modals.addAccount.placeholder', 'Account name')}
            underlineColor="transparent"
            activeUnderlineColor={theme.colors.primary}
            style={styles.input}
            returnKeyType="done"
            onSubmitEditing={onAddAccount}
          />
        </View>
      }
      actions={[
        {text: t('common.cancel'), onPress: onDismiss},
        {
          text: t('common.confirm'),
          onPress: onAddAccount,
          disabled: !accountName.trim(),
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    paddingVertical: 4,
  },
  input: {
    backgroundColor: 'transparent',
  },
});

export default AddAccountModal;

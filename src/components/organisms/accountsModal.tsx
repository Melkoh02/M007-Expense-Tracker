import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {StyleSheet, View} from 'react-native';

import {useTranslation} from 'react-i18next';
import {IconButton, TextInput} from 'react-native-paper';

import {useTheme} from '../../lib/hooks/useAppTheme.ts';
import {useStore} from '../../lib/hooks/useStore.ts';
import {Account} from '../../lib/types/transaction.ts';
import BaseModal from '../molecules/modal.tsx';

type Props = {
  isVisible: boolean;
  onDismiss: () => void;
};

type DraftAccount = {
  id: string;
  name: string;
  isNew?: boolean;
};

const DEFAULT_NEW_ACCOUNT: Omit<Account, 'id' | 'name'> = {
  currentTotal: '0',
  currency: 'USD',
  color: '#4b6c95',
};

const AccountsModal = ({isVisible, onDismiss}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {accountsStore} = useStore();

  const [draftAccounts, setDraftAccounts] = useState<DraftAccount[]>([]);
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());
  const [newAccountName, setNewAccountName] = useState('');

  useEffect(() => {
    if (!isVisible) return;
    setDraftAccounts(
      accountsStore.accounts.map(a => ({id: a.id, name: a.name})),
    );
    setDeletedIds(new Set());
    setNewAccountName('');
  }, [isVisible, accountsStore.accounts]);

  const hasChanges = useMemo(() => {
    if (!isVisible) return false;

    if (deletedIds.size > 0) return true;
    if (draftAccounts.some(a => a.isNew)) return true;

    const currentById = new Map(
      accountsStore.accounts.map(a => [a.id, a.name]),
    );
    return draftAccounts.some(
      a => !a.isNew && currentById.get(a.id) !== a.name,
    );
  }, [accountsStore.accounts, deletedIds, draftAccounts, isVisible]);

  const onCancel = useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  const addDraftAccount = useCallback(() => {
    const trimmed = newAccountName.trim();
    if (!trimmed) return;

    setDraftAccounts(prev => [
      ...prev,
      {
        // UI-only id for draft list rendering and edits.
        id: `new-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        name: trimmed,
        isNew: true,
      },
    ]);
    setNewAccountName('');
  }, [newAccountName]);

  const markDeleted = useCallback((id: string) => {
    setDraftAccounts(prev => prev.filter(a => a.id !== id));
    setDeletedIds(prev => {
      const next = new Set(prev);
      // Only track deletions for existing accounts (not draft-only items).
      if (!id.startsWith('new-')) next.add(id);
      return next;
    });
  }, []);

  const updateDraftName = useCallback((id: string, name: string) => {
    setDraftAccounts(prev => prev.map(a => (a.id === id ? {...a, name} : a)));
  }, []);

  const onConfirm = useCallback(() => {
    // 1) Renames / edits to existing accounts (batch updates)
    const draftById = new Map(
      draftAccounts.filter(a => !a.isNew).map(a => [a.id, a.name.trim()]),
    );

    const updates: Array<{id: string; patch: {name: string}}> = [];
    for (const acc of accountsStore.accounts) {
      const nextName = draftById.get(acc.id);
      if (nextName === undefined) continue;
      if (nextName && nextName !== acc.name)
        updates.push({id: acc.id, patch: {name: nextName}});
    }

    accountsStore.updateAccounts(updates);

    // 2) Deletions
    accountsStore.deleteAccounts(Array.from(deletedIds));

    // 3) Additions (store generates real persisted IDs via generateId)
    const newNames = draftAccounts
      .filter(a => a.isNew)
      .map(a => a.name.trim())
      .filter(Boolean);

    for (const name of newNames) {
      accountsStore.addAccount({...DEFAULT_NEW_ACCOUNT, name});
    }

    onDismiss();
  }, [accountsStore, deletedIds, draftAccounts, onDismiss]);

  return (
    <BaseModal
      title={t('modals.accounts.title')}
      content={
        <View style={styles.content}>
          {draftAccounts.map(acc => (
            <View key={acc.id} style={styles.row}>
              <TextInput
                mode="flat"
                value={acc.name}
                onChangeText={text => updateDraftName(acc.id, text)}
                style={styles.input}
                underlineColor="transparent"
                activeUnderlineColor={theme.colors.primary}
              />
              <IconButton
                icon="close"
                size={18}
                onPress={() => markDeleted(acc.id)}
                accessibilityLabel={t('common.delete')}
              />
            </View>
          ))}
          <View style={styles.row}>
            <TextInput
              mode="flat"
              value={newAccountName}
              onChangeText={setNewAccountName}
              placeholder={t('modals.accounts.newAccountPlaceholder')}
              style={styles.input}
              underlineColor="transparent"
              activeUnderlineColor={theme.colors.primary}
              onSubmitEditing={addDraftAccount}
              returnKeyType="done"
            />
            <IconButton
              icon="check"
              size={18}
              disabled={!newAccountName.trim()}
              onPress={addDraftAccount}
              accessibilityLabel={t('common.add')}
            />
          </View>
        </View>
      }
      isVisible={isVisible}
      onDismiss={onDismiss}
      actions={[
        {text: t('common.cancel'), onPress: onCancel},
        {text: t('common.confirm'), onPress: onConfirm, disabled: !hasChanges},
      ]}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default AccountsModal;

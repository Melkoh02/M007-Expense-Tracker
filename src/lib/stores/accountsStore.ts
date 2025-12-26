import {makeAutoObservable} from 'mobx';

import {Account} from '../types/transaction.ts';

export const generateId = (): string => {
  return `A${Math.random().toString(16).slice(2, 10).toUpperCase()}`;
};

export default class AccountsStore {
  accounts: Account[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setAccounts(data: Account[]) {
    this.accounts = data;
  }

  addAccount(account: Omit<Account, 'id'>) {
    this.accounts = [...this.accounts, {...account, id: generateId()}];
  }

  deleteAccounts(ids: string[]) {
    if (!ids.length) return;
    const toDelete = new Set(ids);
    this.accounts = this.accounts.filter(acc => !toDelete.has(acc.id));
  }

  clear() {
    this.accounts = [];
  }

  get accountsById(): Record<string, Account> {
    const map: Record<string, Account> = {};
    for (const acc of this.accounts) {
      map[acc.id] = acc;
    }
    return map;
  }

  getAccountById(id: string): Account | undefined {
    return this.accountsById[id];
  }
}

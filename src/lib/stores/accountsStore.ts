import {makeAutoObservable} from 'mobx';

import {Account} from '../types/transaction.ts';

export default class AccountsStore {
  accounts: Account[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setAccounts(data: Account[]) {
    this.accounts = data;
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

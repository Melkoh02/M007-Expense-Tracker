import {makeAutoObservable} from 'mobx';

import {Account} from '../types/transaction.ts';

export const generateId = (): string => {
  return `A${Math.random().toString(16).slice(2, 10).toUpperCase()}`;
};

type AccountUpdate = {
  id: string;
  patch: Partial<Omit<Account, 'id'>>;
};

export default class AccountsStore {
  accounts: Account[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setAccounts(data: Account[]) {
    this.accounts = data;
  }

  updateAccounts(updates: AccountUpdate[]) {
    if (!updates.length) return;

    const patchesById = new Map<string, AccountUpdate['patch']>();
    for (const u of updates) patchesById.set(u.id, u.patch);

    let changed = false;

    const next = this.accounts.map(acc => {
      const patch = patchesById.get(acc.id);
      if (!patch) return acc;

      changed = true;
      return {...acc, ...patch};
    });

    if (changed) this.accounts = next;
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

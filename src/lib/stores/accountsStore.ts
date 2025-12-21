import {makeAutoObservable} from 'mobx';

import {Account} from '../types/accounts.ts';

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
}

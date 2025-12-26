import {makeAutoObservable} from 'mobx';

import {Transaction} from '../types/transaction.ts';

export default class TransactionHistoryStore {
  transactionHistory: Transaction[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setHistory(data: Transaction[]) {
    this.transactionHistory = data;
  }

  clear() {
    this.transactionHistory = [];
  }
}

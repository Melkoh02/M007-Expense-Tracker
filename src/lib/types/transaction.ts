import {TransactionTypeEnum} from '../constants/transaction.ts';

export type Account = {
  id: string;
  name: string;
  currentTotal: string;
  currency: string;
  color?: string;
  onPress?: () => void;
};

export type Tag = {
  id: string;
  name: string;
};

export type Transaction = {
  id: string;
  transactionType: TransactionTypeEnum;
  amount: number;
  dateTime?: string; // ISO 8601
  fromAccountId: string;
  toAccountId?: string;
  description?: string;
  tagIds?: string[];
  timezoneOffsetMinutes?: number;
};

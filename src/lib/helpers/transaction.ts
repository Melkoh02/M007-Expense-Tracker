import {TransactionType} from '../constants/transaction';
import {TFunction} from 'i18next';

/**
 * Maps enum → localized label.
 */
export const getTransactionTypeLabel = (
  t: TFunction,
  type: TransactionType,
) => {
  return {
    [TransactionType.EXPENSE]: t('common.expense'),
    [TransactionType.TRANSFER]: t('common.transfer'),
    [TransactionType.INCOME]: t('common.income'),
  }[type];
};

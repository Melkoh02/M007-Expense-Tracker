import {TFunction} from 'i18next';

import {TransactionTypeEnum} from '../constants/transaction';

/**
 * Maps enum → localized label.
 */
export const getTransactionTypeLabel = (
  t: TFunction,
  type: TransactionTypeEnum,
) => {
  return {
    [TransactionTypeEnum.EXPENSE]: t('common.expense'),
    [TransactionTypeEnum.TRANSFER]: t('common.transfer'),
    [TransactionTypeEnum.INCOME]: t('common.income'),
  }[type];
};

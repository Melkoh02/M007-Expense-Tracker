import {TransactionTypeEnum} from '../constants/transaction.ts';
import {AppTheme} from '../hooks/useAppTheme.ts';

/**
 * Returns the appropriate color for a transaction amount
 * based on its type and the provided theme.
 */
export const getColorForType = (
  theme: AppTheme,
  type: TransactionTypeEnum,
): string => {
  switch (type) {
    case TransactionTypeEnum.INCOME:
      return theme.colors.success;

    case TransactionTypeEnum.EXPENSE:
      return theme.colors.error;

    case TransactionTypeEnum.TRANSFER:
    default:
      return theme.colors.warning;
  }
};

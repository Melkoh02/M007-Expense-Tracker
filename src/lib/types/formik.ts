import {ViewStyle} from 'react-native';

import type {
  FieldInputProps,
  FieldMetaProps,
  FieldProps,
  FormikProps,
} from 'formik';
import type {TextInputProps} from 'react-native-paper';

import {SelectInputOptionsProp} from './selectInput.ts';
import {Tag} from './transaction.ts';

export type BaseFormikInputProps = {
  field: FieldInputProps<string>;
  meta: FieldMetaProps<string>;
  form: FormikProps<any>;

  /**
   * Optional overrides for formatted / masked inputs.
   * - displayValue: UI-only value to render (e.g. "3,000.99")
   * - onValueChange: custom handler that usually sanitizes and calls setFieldValue
   * - onFieldBlur: custom handler that usually calls setFieldTouched
   */
  displayValue?: string;
  onValueChange?: (text: string) => void;
  onFieldBlur?: () => void;
  selectAllOnFocus?: boolean;
} & Omit<TextInputProps, 'value' | 'onChangeText'> & {label: string};

export interface FormikSelectInputProps
  extends FieldProps,
    Pick<BaseFormikInputProps, 'style'> {
  label?: string;
  placeholder?: string;
  options: SelectInputOptionsProp[];
  defaultValue?: string;
  onSearch?: (query: string) => void;
}

/**
 * Shared sanitization mode for numeric inputs.
 * - number: digits (+ optional decimal)
 * - amount: allow comma input in UI but store raw value without commas
 */
export type NumericSanitizeMode = 'number' | 'amount';

export type FormikNumberInputProps = BaseFormikInputProps & {
  allowDecimal?: boolean;
  sanitizeMode?: NumericSanitizeMode;
};

export type FormikAmountInputProps = BaseFormikInputProps & {
  currencySymbol?: string; // e.g. "$"
};

export type FormikDateInputProps = FieldProps &
  Pick<BaseFormikInputProps, 'style'> & {
    label: string;
  };

export type FormikTimeInputProps = FieldProps &
  Pick<BaseFormikInputProps, 'style'> & {
    label: string;
    use24HourClock?: boolean;
  };

export type FormikSelectTagsProps = FieldProps & {
  tagsData: Tag[];
  readonly?: boolean;
  showUnselected?: boolean;
  label?: string;
  style?: ViewStyle;
};

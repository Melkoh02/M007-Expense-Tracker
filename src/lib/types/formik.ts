import type {
  FieldInputProps,
  FieldMetaProps,
  FieldProps,
  FormikProps,
} from 'formik';
import type {TextInputProps} from 'react-native-paper';
import {DatePickerInputProps} from 'react-native-paper-dates/lib/typescript/Date/DatePickerInput.shared';

import {SelectInputOptionsProp} from './selectInput.ts';

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
  currencySymbol: string; // e.g. "$"
};

/**
 * Date input (react-native-paper-dates DatePickerInput)
 * Stores a Date (or undefined/null) in Formik.
 */
export type FormikDateInputProps = FieldProps &
  Pick<TextInputProps, 'style'> & {
    label: string;
    locale: string;
  } & Omit<DatePickerInputProps, 'date' | 'onChange' | 'label' | 'locale'>;

/**
 * Time input (react-native-paper-dates TimePickerModal + a read-only TextInput trigger)
 * Stores time as "HH:mm" string in Formik.
 */
export type FormikTimeInputProps = FieldProps &
  Pick<TextInputProps, 'style'> & {
    label: string;
    locale: string;
    /**
     * Optional. Defaults to system preference in the picker lib.
     */
    use24HourClock?: boolean;
    /**
     * Optional override for how the time is displayed in the input.
     * Default: HH:mm (zero-padded)
     */
    formatLabel?: (hours: number, minutes: number) => string;

    /**
     * Extra props forwarded to TimePickerModal (kept loose on purpose).
     * You can pass confirmLabel/cancelLabel/animationType/etc here.
     */
    modalProps?: Record<string, any>;
  };

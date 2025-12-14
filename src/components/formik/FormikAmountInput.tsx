import {useMemo} from 'react';

import {TextInput} from 'react-native-paper';

import {FormikAmountInputProps} from '../../lib/types/formik.ts';
import FormikNumberInput from './FormikNumberInput.tsx';

function formatWithThousandsSeparators(raw: string) {
  if (!raw) return '';
  const [intPart, decPart] = raw.split('.');
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decPart == null ? formattedInt : `${formattedInt}.${decPart}`;
}

export default function FormikAmountInput({
  field,
  form,
  currencySymbol,
  ...rest
}: FormikAmountInputProps) {
  const rawValue = field.value == null ? '' : String(field.value);

  const displayValue = useMemo(
    () => formatWithThousandsSeparators(rawValue),
    [rawValue],
  );

  return (
    <FormikNumberInput
      {...rest}
      field={field}
      form={form}
      allowDecimal
      sanitizeMode="amount"
      displayValue={displayValue}
      keyboardType="decimal-pad"
      left={<TextInput.Affix text={currencySymbol} />}
    />
  );
}

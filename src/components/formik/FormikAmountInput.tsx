import React, {useMemo} from 'react';

import {View} from 'react-native';

import {getIn} from 'formik';
import {Text, TextInput} from 'react-native-paper';

import {useTheme} from '../../lib/hooks/useAppTheme.ts';
import {BaseFormikInputProps} from '../../lib/types/formik.ts';

function sanitizeAmountRaw(text: string) {
  // remove commas, spaces, currency symbols, etc; keep digits + dot
  let s = text.replace(/[^\d.]/g, '');

  // allow only one dot
  const firstDot = s.indexOf('.');
  if (firstDot !== -1) {
    s = s.slice(0, firstDot + 1) + s.slice(firstDot + 1).replace(/\./g, '');
  }

  return s;
}

function formatWithThousandsSeparators(raw: string) {
  if (!raw) return '';

  const [intPart, decPart] = raw.split('.');
  const formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // preserve user decimals exactly (don’t round)
  if (decPart == null) return formattedInt;
  return `${formattedInt}.${decPart}`;
}

export type FormikAmountInputProps = BaseFormikInputProps & {
  currencySymbol: string; // e.g. "$"
};

export default function FormikAmountInput(props: FormikAmountInputProps) {
  const {field, form, style, currencySymbol, ...rest} = props;
  const theme = useTheme();

  const error = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);
  const showError = Boolean(touched && error);

  const rawValue = field.value == null ? '' : String(field.value);

  const displayValue = useMemo(
    () => formatWithThousandsSeparators(rawValue),
    [rawValue],
  );

  return (
    <View>
      <TextInput
        {...rest}
        value={displayValue}
        keyboardType="decimal-pad"
        onChangeText={text => {
          const raw = sanitizeAmountRaw(text);
          form.setFieldValue(field.name, raw);
        }}
        onBlur={() => form.setFieldTouched(field.name, true)}
        error={showError}
        style={[
          {backgroundColor: theme.colors.surface, paddingHorizontal: 0},
          style,
        ]}
        left={<TextInput.Affix text={currencySymbol} />}
      />
      {showError && (
        <Text
          variant="bodySmall"
          style={{color: theme.colors.error, marginTop: 4}}>
          {error}
        </Text>
      )}
    </View>
  );
}

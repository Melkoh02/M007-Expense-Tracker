import React from 'react';

import {View} from 'react-native';

import {getIn} from 'formik';
import {Text, TextInput} from 'react-native-paper';

import {useTheme} from '../../lib/hooks/useAppTheme.ts';
import {BaseFormikInputProps} from '../../lib/types/formik.ts';

function sanitizeNumericInput(text: string, opts?: {allowDecimal?: boolean}) {
  const allowDecimal = opts?.allowDecimal ?? true;

  // remove everything except digits and dot
  let s = text.replace(/[^\d.]/g, '');

  if (!allowDecimal) {
    s = s.replace(/\./g, '');
    return s;
  }

  // allow only one dot
  const firstDot = s.indexOf('.');
  if (firstDot !== -1) {
    s = s.slice(0, firstDot + 1) + s.slice(firstDot + 1).replace(/\./g, '');
  }

  return s;
}

export type FormikNumberInputProps = BaseFormikInputProps & {
  allowDecimal?: boolean;
};

export default function FormikNumberInput(props: FormikNumberInputProps) {
  const {field, form, style, allowDecimal = true, ...rest} = props;
  const theme = useTheme();

  const error = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);
  const showError = Boolean(touched && error);

  const rawValue = field.value == null ? '' : String(field.value);

  return (
    <View>
      <TextInput
        {...rest}
        value={rawValue}
        keyboardType={allowDecimal ? 'decimal-pad' : 'number-pad'}
        onChangeText={text => {
          const sanitized = sanitizeNumericInput(text, {allowDecimal});
          form.setFieldValue(field.name, sanitized);
        }}
        onBlur={() => form.setFieldTouched(field.name, true)}
        error={showError}
        style={[
          {backgroundColor: theme.colors.surface, paddingHorizontal: 0},
          style,
        ]}
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

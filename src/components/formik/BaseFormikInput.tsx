import React from 'react';

import {View} from 'react-native';

import {getIn} from 'formik';
import {Text, TextInput} from 'react-native-paper';

import {useTheme} from '../../lib/hooks/useAppTheme.ts';
import {BaseFormikInputProps} from '../../lib/types/formik.ts';

export function BaseFormikInput({
  field,
  form,
  style,
  displayValue,
  onValueChange,
  onFieldBlur,
  selectAllOnFocus,
  ...rest
}: BaseFormikInputProps) {
  const theme = useTheme();

  const error = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);
  const showError = Boolean(touched && error);

  return (
    <View>
      <TextInput
        {...rest}
        value={displayValue ?? field.value}
        onChangeText={onValueChange ?? field.onChange(field.name)}
        onBlur={onFieldBlur ?? field.onBlur(field.name)}
        selectTextOnFocus={selectAllOnFocus}
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

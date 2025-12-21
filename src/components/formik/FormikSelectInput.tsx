import React, {useEffect} from 'react';

import {View} from 'react-native';

import {getIn} from 'formik';
import {Text} from 'react-native-paper';

import {useTheme} from '../../lib/hooks/useAppTheme.ts';
import {FormikSelectInputProps} from '../../lib/types/formik.ts';
import SelectInput from '../molecules/selectInput.tsx';

export default function FormikSelectInput(props: FormikSelectInputProps) {
  const theme = useTheme();

  const {
    field,
    form,
    options,
    label,
    placeholder,
    defaultValue,
    onSearch,
    style,
    ...rest
  } = props;

  const error = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);
  const showError = Boolean(touched && error);

  useEffect(() => {
    if (defaultValue != null && !field.value) {
      form.setFieldValue(field.name, defaultValue);
    }
  }, []);

  return (
    <View>
      <SelectInput
        value={field.value}
        onChange={val => {
          form.setFieldValue(field.name, val, true);
          form.setFieldTouched(field.name, true, false);
        }}
        label={label}
        placeholder={placeholder}
        options={options}
        onSearch={onSearch}
        error={showError}
        style={style}
        {...rest}
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

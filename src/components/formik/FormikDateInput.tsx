import React, {useCallback, useMemo, useState} from 'react';

import {Keyboard, Pressable} from 'react-native';

import {TextInput} from 'react-native-paper';
import {DatePickerModal} from 'react-native-paper-dates';

import {FormikDateInputProps} from '../../lib/types/formik.ts';
import FormikTextInput from './FormikTextInput';

export default function FormikDateInput({
  field,
  form,
  label,
  meta,
  locale,
}: FormikDateInputProps) {
  const [open, setOpen] = useState(false);

  const value = useMemo(() => {
    if (!field.value) return '';
    const d = new Date(field.value);
    return d.toLocaleDateString();
  }, [field.value]);

  const openPicker = useCallback(() => {
    Keyboard.dismiss();
    requestAnimationFrame(() => setOpen(true));
  }, []);

  return (
    <>
      <Pressable onPress={openPicker}>
        <FormikTextInput
          field={field}
          form={form}
          meta={meta}
          label={label}
          editable={false}
          displayValue={value}
          pointerEvents="none"
          right={<TextInput.Icon icon="calendar" onPress={openPicker} />}
          onFieldBlur={() => {
            form.setFieldTouched(field.name, true, false);
          }}
        />
      </Pressable>
      <DatePickerModal
        locale={locale}
        mode="single"
        visible={open}
        date={field.value ? new Date(field.value) : undefined}
        onDismiss={() => setOpen(false)}
        onConfirm={({date}) => {
          setOpen(false);
          form.setFieldValue(field.name, date, true);
          form.setFieldTouched(field.name, true, false);
        }}
      />
    </>
  );
}

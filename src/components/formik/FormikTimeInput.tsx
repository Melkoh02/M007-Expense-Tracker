import React, {useCallback, useMemo, useState} from 'react';

import {Keyboard} from 'react-native';

import {TextInput} from 'react-native-paper';
import {TimePickerModal} from 'react-native-paper-dates';

import {FormikTimeInputProps} from '../../lib/types/formik.ts';
import FormikTextInput from './FormikTextInput';

export default function FormikTimeInput({
  field,
  form,
  label,
  locale,
  meta,
  use24HourClock,
}: FormikTimeInputProps) {
  const [open, setOpen] = useState(false);

  const value = useMemo(() => {
    if (!field.value) return '';
    return field.value;
  }, [field.value]);

  const openPicker = useCallback(() => {
    Keyboard.dismiss();
    requestAnimationFrame(() => setOpen(true));
  }, []);

  return (
    <>
      <FormikTextInput
        field={field}
        form={form}
        label={label}
        meta={meta}
        editable={false}
        displayValue={value}
        right={<TextInput.Icon icon="clock-outline" onPress={openPicker} />}
        onFieldBlur={() => {
          form.setFieldTouched(field.name, true, false);
        }}
      />
      <TimePickerModal
        visible={open}
        locale={locale}
        use24HourClock={use24HourClock}
        onDismiss={() => setOpen(false)}
        onConfirm={({hours, minutes}) => {
          setOpen(false);
          const value = `${String(hours).padStart(2, '0')}:${String(
            minutes,
          ).padStart(2, '0')}`;
          form.setFieldValue(field.name, value, true);
          form.setFieldTouched(field.name, true, false);
        }}
      />
    </>
  );
}

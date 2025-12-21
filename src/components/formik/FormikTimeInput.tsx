import React, {useCallback, useMemo, useState} from 'react';

import {Keyboard, Pressable} from 'react-native';

import {TextInput} from 'react-native-paper';
import {TimePickerModal} from 'react-native-paper-dates';

import {useStore} from '../../lib/hooks/useStore.ts';
import {FormikTimeInputProps} from '../../lib/types/formik.ts';
import FormikTextInput from './FormikTextInput';

export default function FormikTimeInput({
  field,
  form,
  label,
  meta,
  use24HourClock,
}: FormikTimeInputProps) {
  const [open, setOpen] = useState(false);
  const {languageStore} = useStore();

  const locale = languageStore.language;
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
      <Pressable onPress={openPicker}>
        <FormikTextInput
          field={field}
          form={form}
          meta={meta}
          label={label}
          editable={false}
          displayValue={value}
          pointerEvents="none"
          right={<TextInput.Icon icon="clock-outline" onPress={openPicker} />}
          onFieldBlur={() => {
            form.setFieldTouched(field.name, true, false);
          }}
        />
      </Pressable>

      <TimePickerModal
        visible={open}
        locale={locale}
        animationType={'slide'}
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

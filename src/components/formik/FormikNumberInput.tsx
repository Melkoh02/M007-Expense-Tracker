import {sanitizeNumericInput} from '../../lib/helpers/sanitizeNumericInput.ts';
import {FormikNumberInputProps} from '../../lib/types/formik.ts';
import {BaseFormikInput} from './BaseFormikInput.tsx';

export default function FormikNumberInput({
  field,
  form,
  allowDecimal = true,
  sanitizeMode = 'number',
  ...rest
}: FormikNumberInputProps) {
  const rawValue = field.value == null ? '' : String(field.value);
  const displayValue = rest.displayValue ?? rawValue;
  const shouldSelectAllOnFocus = rawValue === '0';

  return (
    <BaseFormikInput
      {...rest}
      field={field}
      form={form}
      displayValue={displayValue}
      keyboardType={allowDecimal ? 'decimal-pad' : 'number-pad'}
      onValueChange={text => {
        const sanitized = sanitizeNumericInput(text, {
          allowDecimal,
          mode: sanitizeMode,
        });
        form.setFieldValue(field.name, sanitized);
      }}
      onFieldBlur={() => form.setFieldTouched(field.name, true)}
      selectAllOnFocus={rest.selectAllOnFocus ?? shouldSelectAllOnFocus}
    />
  );
}

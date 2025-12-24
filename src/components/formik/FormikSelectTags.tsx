import React, {useMemo} from 'react';

import {View} from 'react-native';

import {getIn} from 'formik';
import {Text} from 'react-native-paper';

import {useTheme} from '../../lib/hooks/useAppTheme.ts';
import {FormikSelectTagsProps} from '../../lib/types/formik.ts';
import TagsGrid from '../organisms/tags.tsx';

export default function FormikSelectTags({
  field,
  form,
  tagsData,
  style,
  readonly = false,
  showUnselected = true,
}: FormikSelectTagsProps) {
  const theme = useTheme();

  const error = getIn(form.errors, field.name);
  const touched = getIn(form.touched, field.name);
  const showError = Boolean(touched && error);

  const selectedIds = useMemo(() => {
    if (Array.isArray(field.value)) {
      return field.value.filter(v => typeof v === 'string') as string[];
    }
    return [];
  }, [field.value]);

  return (
    <View>
      <TagsGrid
        tagsData={tagsData}
        selectedTagIds={selectedIds}
        readonly={readonly}
        showUnselected={showUnselected}
        style={style}
        onChange={
          readonly
            ? undefined
            : ids => {
                form.setFieldValue(field.name, ids, true);
                form.setFieldTouched(field.name, true, false);
              }
        }
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

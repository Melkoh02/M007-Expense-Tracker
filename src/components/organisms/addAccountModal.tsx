import React, {useMemo} from 'react';

import {StyleSheet, View} from 'react-native';

import {Field, FormikProvider, useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';

import {useTheme} from '../../lib/hooks/useAppTheme';
import {useStore} from '../../lib/hooks/useStore';
import {Account} from '../../lib/types/transaction';
import FormikTextInput from '../formik/FormikTextInput.tsx';
import BaseModal from '../molecules/modal';

type Props = {
  isVisible: boolean;
  onDismiss: () => void;
};

const AddAccountModal = ({isVisible, onDismiss}: Props) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {accountsStore} = useStore();

  const initialValues = useMemo<Omit<Account, 'id'>>(
    () => ({
      name: '',
      currentTotal: '',
      currency: 'USD',
      color: '#4b6c95',
    }),
    [],
  );

  const validationSchema = Yup.object({
    name: Yup.string().trim().required('Account name is required'),
    currentTotal: Yup.string().trim().required('Current total is required'),
    currency: Yup.string().trim().required('Currency is required'),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: values => {
      accountsStore.addAccount({
        name: values.name,
        currentTotal: values.currentTotal,
        currency: values.currency,
        color: values.color,
      });
      formik.resetForm();
      onDismiss();
    },
  });

  return (
    <BaseModal
      title={t('modals.addAccount.title', 'Add Account')}
      isVisible={isVisible}
      onDismiss={onDismiss}
      content={
        <View style={styles.content}>
          <FormikProvider value={formik}>
            <Field
              component={FormikTextInput}
              name={'name'}
              label={'Name'}
              placeholder={'Type the account name'}
            />
            <Field
              component={FormikTextInput}
              name={'currentTotal'}
              label={'Initial Balance'}
              placeholder={'Type the intial balance'}
            />
            <Field
              component={FormikTextInput}
              name={'currency'}
              label={'Select Currency'}
              placeholder={'Type the currency'}
            />
          </FormikProvider>
        </View>
      }
      actions={[
        {text: t('common.cancel'), onPress: onDismiss},
        {
          text: t('common.confirm'),
          onPress: () => formik.handleSubmit(),
          disabled: false,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    paddingVertical: 4,
  },
  input: {
    backgroundColor: 'transparent',
  },
});

export default AddAccountModal;

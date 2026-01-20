import React, {useMemo} from 'react';

import {StyleSheet, View} from 'react-native';

import {Field, FormikProvider, useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';

import {SUPPORTED_CURRENCIES} from '../../lib/constants/currency.ts';
import {getSelectOptions} from '../../lib/helpers/formik.tsx';
import {useTheme} from '../../lib/hooks/useAppTheme';
import {useStore} from '../../lib/hooks/useStore';
import {Account} from '../../lib/types/transaction';
import FormikAmountInput from '../formik/FormikAmountInput.tsx';
import FormikSelectInput from '../formik/FormikSelectInput.tsx';
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

  const onModalDismiss = () => {
    formik.resetForm();
    onDismiss();
  };

  const currencyOptions = useMemo(
    () => getSelectOptions(t, SUPPORTED_CURRENCIES),
    [t],
  );

  const initialValues = useMemo<Omit<Account, 'id'>>(
    () => ({
      name: '',
      currentTotal: 0,
      currency: '1',
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
      onModalDismiss();
    },
  });

  return (
    <BaseModal
      title={t('modals.addAccount.title', 'Add Account')}
      isVisible={isVisible}
      onDismiss={onModalDismiss}
      content={
        <View style={styles.content}>
          <FormikProvider value={formik}>
            <Field
              component={FormikTextInput}
              name={'name'}
              label={'Name'}
              placeholder={'Type the account name'}
              style={styles.input}
            />
            <Field
              component={FormikAmountInput}
              name={'currentTotal'}
              label={'Initial Balance'}
              style={styles.input}
            />
            <Field
              component={FormikSelectInput}
              name={'currency'}
              label={'Select Currency'}
              showSearch={false}
              options={currencyOptions}
              style={styles.input}
            />
          </FormikProvider>
        </View>
      }
      actions={[
        {text: t('common.cancel'), onPress: onModalDismiss},
        {
          text: t('common.confirm'),
          onPress: () => formik.handleSubmit(),
          disabled: formik.isSubmitting || !formik.isValid || !formik.dirty,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 8,
  },
  input: {
    backgroundColor: 'transparent',
  },
});

export default AddAccountModal;

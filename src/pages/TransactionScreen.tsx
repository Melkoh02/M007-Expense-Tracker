import React, {useCallback, useLayoutEffect, useMemo} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Field, FormikProvider, useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';

import FormikAmountInput from '../components/formik/FormikAmountInput.tsx';
import FormikSelectInput from '../components/formik/FormikSelectInput.tsx';
import BaseLayout from '../components/templates/BaseLayout.tsx';
import {TransactionType} from '../lib/constants/transaction.ts';
import {getTransactionTypeLabel} from '../lib/helpers/transaction.ts';
import {TransactionStackParamList} from '../lib/types/navigation.ts';

type Props = NativeStackScreenProps<
  TransactionStackParamList,
  'TransactionScreen'
>;

export default function TransactionScreen({navigation, route}: Props) {
  const transactionType = route.params.transactionType;
  const {t} = useTranslation();

  const title = useMemo(() => {
    const transactionTypeLabel = getTransactionTypeLabel(t, transactionType);

    return t('transaction.transactionScreenTitle', {
      TRANSACTION_TYPE: transactionTypeLabel,
    });
  }, [t, transactionType]);

  const transactionTypeOptions = useMemo(
    () => [
      {id: TransactionType.EXPENSE, value: t('common.expense')},
      {id: TransactionType.TRANSFER, value: t('common.transfer')},
      {id: TransactionType.INCOME, value: t('common.income')},
    ],
    [t],
  );

  const initialValues = useMemo(
    () => ({
      transactionType,
      amount: 0,
      dateTime: Date.now(),
      description: '',
      tags: [],
    }),
    [transactionType],
  );

  const validationSchema = useMemo(
    () =>
      Yup.object({
        transactionType: Yup.string().required(
          'Transaction is a required field',
        ),
        amount: Yup.number().required('amount is a required field'),
      }),
    [],
  );

  const onSubmit = useCallback((values: typeof initialValues) => {
    console.log('=====> onSubmit =====>', values);
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    if (!parent) return;
    parent.setOptions({title, headerShown: true});
  }, [navigation, title]);

  return (
    <BaseLayout>
      <FormikProvider value={formik}>
        <Field
          component={FormikSelectInput}
          name="transactionType"
          label="Transaction Type"
          options={transactionTypeOptions}
          showSearch={false}
          style={{alignItems: 'center'}}
        />
        <Field
          component={FormikAmountInput}
          name="amount"
          label="Amount"
          currencySymbol="$"
        />
      </FormikProvider>
    </BaseLayout>
  );
}

import React, {useCallback, useLayoutEffect, useMemo} from 'react';

import {Platform} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Field, FormikProvider, useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';

import FormikAmountInput from '../components/formik/FormikAmountInput.tsx';
import FormikSelectInput from '../components/formik/FormikSelectInput.tsx';
import FormikTextInput from '../components/formik/FormikTextInput.tsx';
import BaseLayout from '../components/templates/BaseLayout.tsx';
import {TransactionType} from '../lib/constants/transaction.ts';
import {Col, Row} from '../lib/helpers/formik.tsx';
import {getTransactionTypeLabel} from '../lib/helpers/transaction.ts';
import {useTheme} from '../lib/hooks/useAppTheme.ts';
import {useStore} from '../lib/hooks/useStore.ts';
import {TransactionStackParamList} from '../lib/types/navigation.ts';

type Props = NativeStackScreenProps<
  TransactionStackParamList,
  'TransactionScreen'
>;

export default function TransactionScreen({navigation, route}: Props) {
  const transactionType = route.params.transactionType;
  const {t} = useTranslation();
  const theme = useTheme();
  const {accountsStore} = useStore();

  const accountOptions = useMemo(
    () =>
      accountsStore.accounts.map(account => ({
        id: account.id,
        value: account.name,
      })),
    [accountsStore.accounts],
  );

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
      fromAccountId: undefined,
      toAccountId: undefined,
      tags: [],
    }),
    [transactionType],
  );

  const validationSchema = useMemo(
    () =>
      Yup.object({
        transactionType: Yup.string().required('Type is a required field'),
        amount: Yup.number()
          .typeError('Amount must be a number')
          .required('Amount is a required field'),

        fromAccountId: Yup.string().required(
          'From account is a required field',
        ),
        toAccountId: Yup.string().when('transactionType', {
          is: TransactionType.TRANSFER,
          then: schema => schema.required('To account is a required field'),
          otherwise: schema => schema.notRequired(),
        }),
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

  // TODO:
  //  Improve Header options handling, right now they are applied differently
  //  per platform due to the following behavior:
  //  - iOS requires setting options on the parent navigator to correctly
  //  display the back button
  //  - Android must use screen-level options; using parent options causes
  //  gesture/safe-area layout issues (expanded opaque area at the bottom that
  //  obstructs content)
  useLayoutEffect(() => {
    Platform.OS === 'android'
      ? navigation.setOptions({title, headerShown: true})
      : navigation.getParent()?.setOptions({title, headerShown: true});
  }, [navigation, title]);

  return (
    <BaseLayout edges={[]}>
      <FormikProvider value={formik}>
        <Row gap={0}>
          <Col>
            <Field component={FormikTextInput} name="text1" label="Text 1" />
          </Col>
          <Col>
            <Field component={FormikTextInput} name="text2" label="Text 2" />
          </Col>
        </Row>
        <Field
          component={FormikSelectInput}
          name="transactionType"
          label="Transaction Type"
          options={transactionTypeOptions}
          showSearch={false}
          style={{backgroundColor: theme.colors.background}}
        />
        <Field
          component={FormikAmountInput}
          name="amount"
          label="Amount"
          currencySymbol="$"
        />
        <Field
          component={FormikSelectInput}
          name="fromAccountId"
          label="From Account"
          options={accountOptions}
          showSearch={false}
          style={{backgroundColor: theme.colors.background}}
        />
        {formik.values.transactionType === TransactionType.TRANSFER && (
          <Field
            component={FormikSelectInput}
            name="toAccountId"
            label="To Account"
            options={accountOptions}
            showSearch={false}
            style={{backgroundColor: theme.colors.background}}
          />
        )}
        <Field
          component={FormikTextInput}
          name="description"
          label="Description"
        />
      </FormikProvider>
    </BaseLayout>
  );
}

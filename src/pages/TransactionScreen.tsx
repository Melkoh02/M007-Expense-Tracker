import React, {useCallback, useLayoutEffect, useMemo} from 'react';

import {Platform, View} from 'react-native';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Field, FormikProvider, useFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import {Button} from 'react-native-paper';
import * as Yup from 'yup';

import FormikAmountInput from '../components/formik/FormikAmountInput.tsx';
import FormikDateInput from '../components/formik/FormikDateInput.tsx';
import FormikSelectInput from '../components/formik/FormikSelectInput.tsx';
import FormikSelectTags from '../components/formik/FormikSelectTags.tsx';
import FormikTextInput from '../components/formik/FormikTextInput.tsx';
import FormikTimeInput from '../components/formik/FormikTimeInput.tsx';
import BaseLayout from '../components/templates/BaseLayout.tsx';
import {dummyTags} from '../lib/constants/dummyData.ts';
import {TransactionTypeEnum} from '../lib/constants/transaction.ts';
import {composeDateTime} from '../lib/helpers/composeDateTime.ts';
import {Col, Row} from '../lib/helpers/formik.tsx';
import {getTransactionTypeLabel} from '../lib/helpers/transaction.ts';
import {useTheme} from '../lib/hooks/useAppTheme.ts';
import {useStore} from '../lib/hooks/useStore.ts';
import {TransactionStackParamList} from '../lib/types/navigation.ts';
import {Transaction} from '../lib/types/transaction.ts';

type Props = NativeStackScreenProps<
  TransactionStackParamList,
  'TransactionScreen'
>;

export default function TransactionScreen({navigation, route}: Props) {
  const transactionType = route.params.transactionType;
  const {t} = useTranslation();
  const theme = useTheme();
  const {accountsStore} = useStore();

  const now = useMemo(() => new Date(), []);

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
      {id: TransactionTypeEnum.EXPENSE, value: t('common.expense')},
      {id: TransactionTypeEnum.TRANSFER, value: t('common.transfer')},
      {id: TransactionTypeEnum.INCOME, value: t('common.income')},
    ],
    [t],
  );

  const initialValues = useMemo(
    () => ({
      transactionType,
      amount: 0,
      date: now,
      time: `${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes(),
      ).padStart(2, '0')}`,
      fromAccountId: '',
      toAccountId: undefined,
      description: '',
      tagIds: [],
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
          is: TransactionTypeEnum.TRANSFER,
          then: schema => schema.required('To account is a required field'),
          otherwise: schema => schema.notRequired(),
        }),
      }),
    [],
  );

  const onSubmit = useCallback((values: typeof initialValues) => {
    const dateTime = composeDateTime(values.date, values.time);
    const isTransfer = values.transactionType === TransactionTypeEnum.TRANSFER;

    const payload: Transaction = {
      id: '', // <- TODO figure out ID generation strategy
      transactionType: values.transactionType,
      amount: values.amount,
      fromAccountId: values.fromAccountId,
      toAccountId: isTransfer ? values.toAccountId : undefined,
      description: values.description,
      tagIds: values.tagIds,
      dateTime: dateTime ? dateTime.toISOString() : undefined,
      timezoneOffsetMinutes: dateTime
        ? -dateTime.getTimezoneOffset()
        : undefined,
    };
    console.log('=====> payload =====>', JSON.stringify(payload, null, 2));
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
      : navigation.getParent()?.setOptions({
          title,
          headerShown: true,
          headerBackTitle: t('tabNavigator.home'),
        });
  }, [navigation, title]);

  return (
    <BaseLayout
      edges={['bottom']}
      extraStyles={{
        justifyContent: 'space-between',
      }}>
      <View>
        <FormikProvider value={formik}>
          <Field
            component={FormikSelectInput}
            name="transactionType"
            label={t('transaction.fields.transactionType')}
            options={transactionTypeOptions}
            showSearch={false}
            style={{backgroundColor: theme.colors.background}}
          />
          <Row gap={0}>
            <Col>
              <Field
                component={FormikDateInput}
                name="date"
                label={t('transaction.fields.date')}
              />
            </Col>
            <Col>
              <Field
                component={FormikTimeInput}
                name="time"
                label={t('transaction.fields.time')}
                use24HourClock
              />
            </Col>
          </Row>
          <Field
            component={FormikAmountInput}
            name="amount"
            label={t('transaction.fields.amount')}
            currencySymbol="$"
          />
          <Field
            component={FormikSelectInput}
            name="fromAccountId"
            label={t('transaction.fields.fromAccount')}
            options={accountOptions}
            showSearch={false}
            style={{backgroundColor: theme.colors.background}}
          />
          {formik.values.transactionType === TransactionTypeEnum.TRANSFER && (
            <Field
              component={FormikSelectInput}
              name="toAccountId"
              label={t('transaction.fields.toAccount')}
              options={accountOptions}
              showSearch={false}
              style={{backgroundColor: theme.colors.background}}
            />
          )}
          <Field
            component={FormikTextInput}
            name="description"
            label={t('transaction.fields.description')}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
          <Field
            component={FormikSelectTags}
            name="tagIds"
            label={t('transaction.fields.tags')}
            tagsData={dummyTags}
          />
        </FormikProvider>
      </View>
      <Row>
        <Col>
          <Button onPress={navigation.goBack} mode={'outlined'}>
            {t('common.cancel')}
          </Button>
        </Col>
        <Col>
          <Button onPress={() => formik.handleSubmit()} mode={'contained'}>
            {t('common.confirm')}
          </Button>
        </Col>
      </Row>
    </BaseLayout>
  );
}

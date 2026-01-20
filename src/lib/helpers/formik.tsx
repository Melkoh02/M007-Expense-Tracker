import React from 'react';

import {StyleProp, View, ViewStyle} from 'react-native';

import {TFunction} from 'i18next';

import {SelectInputOptionsProp} from '../types/selectInput.ts';

type ChildrenProps = {
  children: React.ReactNode;
};

type RowProps = ChildrenProps & {
  gap?: number;
  style?: StyleProp<ViewStyle>;
};

type ColProps = ChildrenProps & {
  flex?: number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Horizontal layout helper for Formik fields.
 * Use Row + Col instead of styling inputs directly.
 */
export const Row = ({children, gap = 12, style}: RowProps) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          gap,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

/**
 * Column helper for Row layouts.
 * Defaults to equal width when used inside Row.
 */
export const Col = ({children, flex = 1, style}: ColProps) => {
  return (
    <View
      style={[
        {
          flex,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

type HasIdAndLabelKey = {
  id: string;
  labelKey: string;
};

export const getSelectOptions = (
  t: TFunction,
  arr: readonly HasIdAndLabelKey[],
): SelectInputOptionsProp[] =>
  arr.map(({id, labelKey}) => ({
    id,
    value: t(labelKey),
  }));

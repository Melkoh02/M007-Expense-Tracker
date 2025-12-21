import React, {useState} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';

import MainFab from '../components/molecules/fab.tsx';
import MainSearchBar from '../components/molecules/searchBar.tsx';
import Accounts from '../components/organisms/accounts.tsx';
import SpentSummaryGraph from '../components/organisms/spentSummaryGraph.tsx';
import BaseLayout from '../components/templates/BaseLayout.tsx';
import {HomeStackParamList} from '../lib/types/navigation.ts';

const accountsData = [
  {
    name: 'Cash',
    amount: '123.45',
    currency: 'USD',
    color: '#835a98',
    onPress: () => {
      console.log('Pressed!');
    },
  },
  {
    name: 'Savings ABC',
    amount: '123',
    currency: 'USD',
    color: '#56957d',
    onPress: () => {
      console.log('Pressed!');
    },
  },
  {
    name: 'Debit Card',
    amount: '123.45',
    currency: 'USD',
    color: '#4b6c95',
    onPress: () => {
      console.log('Pressed!');
    },
  },
  {
    name: 'PYG',
    amount: '1,234,567',
    currency: 'PYG',
    color: '#96697f',
    onPress: () => {
      console.log('Pressed!');
    },
  },
  {
    name: 'Cash 2',
    amount: '123.45',
    currency: 'USD',
    color: '#D884FF',
    onPress: () => {
      console.log('Pressed!');
    },
  },
  {
    name: 'Credit Card',
    amount: '123.45',
    currency: 'USD',
    color: '#4b6c95',
    onPress: () => {
      console.log('Pressed!');
    },
  },
];

const summarySpendingAmount = [
  {name: 'Cash', spent: '538.97', color: '#835a98'},
  {name: 'Savings ABC', spent: '173.21', color: '#56957d'},
  {name: 'Debit Card', spent: '123', color: '#4b6c95'},
  {name: 'PYG', spent: '634', color: '#96697f'},
  {name: 'Cash 2', spent: '123.45', color: '#D884FF'},
  {name: 'Credit Card', spent: '452', color: '#4b6c95'},
];

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function HomeScreen({}: Props) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <BaseLayout scrollable>
        <MainSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <Accounts accountsData={accountsData} />
        <SpentSummaryGraph spentItems={summarySpendingAmount} />
      </BaseLayout>
      <MainFab />
    </>
  );
}

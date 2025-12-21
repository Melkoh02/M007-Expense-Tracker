import {Account} from '../types/accounts.ts';

export const accountsData: Account[] = [
  {
    id: 'A001',
    name: 'Cash',
    currentTotal: '123.45',
    currency: 'USD',
    color: '#835a98',
    onPress: () => {
      console.log('Pressed!');
    },
  },
  {
    id: 'A002',
    name: 'Savings ABC',
    currentTotal: '123',
    currency: 'USD',
    color: '#56957d',
    onPress: () => {
      console.log('Pressed!');
    },
  },
  {
    id: 'A003',
    name: 'Debit Card',
    currentTotal: '123.45',
    currency: 'USD',
    color: '#4b6c95',
    onPress: () => {
      console.log('Pressed!');
    },
  },
  {
    id: 'A004',
    name: 'PYG',
    currentTotal: '1,234,567',
    currency: 'PYG',
    color: '#96697f',
    onPress: () => {
      console.log('Pressed!');
    },
  },
  {
    id: 'A005',
    name: 'Cash 2',
    currentTotal: '123.45',
    currency: 'USD',
    color: '#D884FF',
    onPress: () => {
      console.log('Pressed!');
    },
  },
  {
    id: 'A006',
    name: 'Credit Card',
    currentTotal: '123.45',
    currency: 'USD',
    color: '#4b6c95',
    onPress: () => {
      console.log('Pressed!');
    },
  },
];

export const summarySpendingAmount = [
  {name: 'Cash', spent: '538.97', color: '#835a98'},
  {name: 'Savings ABC', spent: '173.21', color: '#56957d'},
  {name: 'Debit Card', spent: '123', color: '#4b6c95'},
  {name: 'PYG', spent: '634', color: '#96697f'},
  {name: 'Cash 2', spent: '123.45', color: '#D884FF'},
  {name: 'Credit Card', spent: '452', color: '#4b6c95'},
];

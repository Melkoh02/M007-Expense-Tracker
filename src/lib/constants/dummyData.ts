import {Account, Tag} from '../types/transaction.ts';

export const dummyTags: Tag[] = [
  {id: 'tag1', name: 'Food'},
  {id: 'tag2', name: 'Shopping'},
  {id: 'tag3', name: 'Groceries'},
  {id: 'tag4', name: 'Restaurants'},
  {id: 'tag5', name: 'Coffee'},
  {id: 'tag6', name: 'Transport'},
  {id: 'tag7', name: 'Fuel'},
  {id: 'tag8', name: 'Public Transport'},
  {id: 'tag9', name: 'Rent'},
  {id: 'tag10', name: 'Utilities'},
  {id: 'tag11', name: 'Electricity'},
  {id: 'tag12', name: 'Water'},
  {id: 'tag13', name: 'Internet'},
  {id: 'tag14', name: 'Phone'},
  {id: 'tag15', name: 'Entertainment'},
  {id: 'tag16', name: 'Streaming'},
  // {id: 'tag17', name: 'Games'},
  // {id: 'tag18', name: 'Health'},
  // {id: 'tag19', name: 'Pharmacy'},
  // {id: 'tag20', name: 'Medical'},
  // {id: 'tag21', name: 'Fitness'},
  // {id: 'tag22', name: 'Education'},
  // {id: 'tag23', name: 'Courses'},
  // {id: 'tag24', name: 'Books'},
  // {id: 'tag25', name: 'Travel'},
  // {id: 'tag26', name: 'Hotels'},
  // {id: 'tag27', name: 'Flights'},
  // {id: 'tag28', name: 'Gifts'},
  // {id: 'tag29', name: 'Subscriptions'},
  // {id: 'tag30', name: 'Miscellaneous'},
];

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
    tagIds: ['tag1', 'tag2', 'tag3'],
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
    tagIds: ['tag1', 'tag2', 'tag3'],
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
    tagIds: ['tag1', 'tag2', 'tag3'],
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
    tagIds: ['tag1', 'tag2', 'tag3'],
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
    tagIds: ['tag1', 'tag2', 'tag3'],
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
    tagIds: ['tag1', 'tag2', 'tag3'],
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

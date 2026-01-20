import {Account, Tag, Transaction} from '../types/transaction.ts';
import {TransactionTypeEnum} from './transaction.ts';

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
    currentTotal: 123.45,
    currency: 'USD',
    color: '#835a98',
  },
  {
    id: 'A002',
    name: 'Savings ABC',
    currentTotal: 123,
    currency: 'USD',
    color: '#56957d',
  },
  {
    id: 'A003',
    name: 'Debit Card',
    currentTotal: 123.45,
    currency: 'USD',
    color: '#4b6c95',
  },
  {
    id: 'A004',
    name: 'PYG',
    currentTotal: 1234.567,
    currency: 'PYG',
    color: '#96697f',
  },
  {
    id: 'A005',
    name: 'Cash 2',
    currentTotal: 123.45,
    currency: 'USD',
    color: '#D884FF',
  },
  {
    id: 'A006',
    name: 'Credit Card',
    currentTotal: 123.45,
    currency: 'USD',
    color: '#4b6c95',
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

export const transactionHistory: Transaction[] = [
  {
    id: 'T001',
    transactionType: TransactionTypeEnum.EXPENSE,
    amount: 12.5,
    fromAccountId: 'A001', // Cash
    description: 'Morning coffee before going to the office to work',
    tagIds: ['tag5'], // Coffee
    dateTime: '2025-01-10T08:15:00.000Z',
    timezoneOffsetMinutes: -180,
  },
  {
    id: 'T002',
    transactionType: TransactionTypeEnum.EXPENSE,
    amount: 45.9,
    fromAccountId: 'A003', // Debit Card
    description: 'Groceries at supermarket',
    tagIds: ['tag3'], // Groceries
    dateTime: '2025-01-09T18:42:00.000Z',
    timezoneOffsetMinutes: -180,
  },
  {
    id: 'T003',
    transactionType: TransactionTypeEnum.EXPENSE,
    amount: 28,
    fromAccountId: 'A006', // Credit Card
    description: 'Dinner with friends',
    tagIds: ['tag4', 'tag15'], // Restaurants + Entertainment
    dateTime: '2025-01-08T21:10:00.000Z',
    timezoneOffsetMinutes: -180,
  },
  {
    id: 'T004',
    transactionType: TransactionTypeEnum.INCOME,
    amount: 1200,
    fromAccountId: 'A002', // Savings ABC
    description: 'Monthly salary',
    tagIds: [],
    dateTime: '2025-01-05T09:00:00.000Z',
    timezoneOffsetMinutes: -180,
  },
  {
    id: 'T005',
    transactionType: TransactionTypeEnum.TRANSFER,
    amount: 300,
    fromAccountId: 'A002', // Savings ABC
    toAccountId: 'A001', // Cash
    description: 'ATM withdrawal',
    tagIds: [],
    dateTime: '2025-01-04T16:30:00.000Z',
    timezoneOffsetMinutes: -180,
  },
  {
    id: 'T006',
    transactionType: TransactionTypeEnum.EXPENSE,
    amount: 60,
    fromAccountId: 'A003', // Debit Card
    description: 'Internet bill',
    tagIds: ['tag10', 'tag13'], // Utilities + Internet
    dateTime: '2025-01-03T11:20:00.000Z',
    timezoneOffsetMinutes: -180,
  },
  {
    id: 'T007',
    transactionType: TransactionTypeEnum.EXPENSE,
    amount: 40,
    fromAccountId: 'A001', // Cash
    description: 'Fuel',
    tagIds: ['tag7'], // Fuel
    dateTime: '2025-01-02T14:05:00.000Z',
    timezoneOffsetMinutes: -180,
  },
  {
    id: 'T008',
    transactionType: TransactionTypeEnum.TRANSFER,
    amount: 500,
    fromAccountId: 'A003', // Debit Card
    toAccountId: 'A002', // Savings ABC
    description: 'Move money to savings',
    tagIds: [],
    dateTime: '2025-01-01T10:00:00.000Z',
    timezoneOffsetMinutes: -180,
  },
];

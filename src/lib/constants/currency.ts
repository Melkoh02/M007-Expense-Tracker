export type Currency = {
  id: string;
  labelKey: string;
  symbol: string;
};

export const SUPPORTED_CURRENCIES: Currency[] = [
  {id: '1', labelKey: 'currency.USD.label', symbol: '$'},
  {id: '2', labelKey: 'currency.PYG.label', symbol: '₲'},
];

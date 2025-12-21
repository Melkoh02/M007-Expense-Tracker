export const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'USD':
      return '$';
    case 'PYG':
      return '₲';
    default:
      return '';
  }
};

export type Account = {
  id: string;
  name: string;
  currentTotal: string;
  currency: string;
  color?: string;
  onPress?: () => void;
};

import AccountsStore from './accountsStore.ts';
import {LanguageStore} from './languageStore.ts';
import {ThemeStore} from './themeStore.ts';
import TransactionHistoryStore from './transactionHistory.tsx';
import {UIStore} from './uiStore.ts';
import {UserStore} from './userStore.ts';

export class RootStore {
  userStore: UserStore;
  themeStore: ThemeStore;
  languageStore: LanguageStore;
  uiStore: UIStore;
  accountsStore: AccountsStore;
  transactionHistoryStore: TransactionHistoryStore;

  constructor() {
    this.userStore = new UserStore();
    this.themeStore = new ThemeStore();
    this.languageStore = new LanguageStore();
    this.uiStore = new UIStore();
    this.accountsStore = new AccountsStore();
    this.transactionHistoryStore = new TransactionHistoryStore();
  }
}

const rootStore = new RootStore();
export default rootStore;

import React, {useEffect, useState} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';

import MainFab from '../components/molecules/fab.tsx';
import MainSearchBar from '../components/molecules/searchBar.tsx';
import AccountsGrid from '../components/organisms/accounts.tsx';
import SpentSummaryGraph from '../components/organisms/spentSummaryGraph.tsx';
import BaseLayout from '../components/templates/BaseLayout.tsx';
import {
  accountsData,
  summarySpendingAmount,
} from '../lib/constants/dummyData.ts';
import {useStore} from '../lib/hooks/useStore.ts';
import {HomeStackParamList} from '../lib/types/navigation.ts';

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

function HomeScreen({}: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const {accountsStore} = useStore();

  useEffect(() => {
    accountsStore.setAccounts(accountsData);
  }, []);

  return (
    <>
      <BaseLayout scrollable>
        <MainSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <AccountsGrid accountsData={accountsStore.accounts} />
        <SpentSummaryGraph spentItems={summarySpendingAmount} />
      </BaseLayout>
      <MainFab />
    </>
  );
}

export default observer(HomeScreen);

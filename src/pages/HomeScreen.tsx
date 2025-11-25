import React, {useState} from 'react';
import MainSearchBar from '../components/molecules/searchBar.tsx';
import MainFab from '../components/molecules/fab.tsx';
import BaseLayout from '../components/templates/BaseLayout.tsx';
import Accounts from '../components/organisms/accounts.tsx';
import {accountsData, summarySpendingAmount} from '../../dummyData.ts';
import SpentSummaryGraph from '../components/organisms/spentSummaryGraph.tsx';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <BaseLayout>
      <MainSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <Accounts accountsData={accountsData} />
      <SpentSummaryGraph spentItems={summarySpendingAmount} />
      <MainFab />
    </BaseLayout>
  );
}

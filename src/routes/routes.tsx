import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';

import {StoreContext} from '../../index.tsx';
import AppStack from './AppStack.tsx';
import AuthStack from './stacks/AuthStack.tsx';

function Routes() {
  const {userStore} = React.useContext(StoreContext);
  const isLoggedIn = Boolean(userStore.accessToken);

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default observer(Routes);

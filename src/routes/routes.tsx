import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StoreContext} from '../../index.tsx';
import AuthStack from './stacks/AuthStack.tsx';
import {observer} from 'mobx-react-lite';
import AppStack from './AppStack.tsx';

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

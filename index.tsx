import React, {createContext} from 'react';

import {AppRegistry} from 'react-native';

import {observer} from 'mobx-react-lite';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {name as appName} from './app.json';
import {SnackbarProvider} from './src/lib/providers/SnackBarProvider.tsx';
import rootStore from './src/lib/stores/rootStore';
import App from './src/pages/App';

export const StoreContext = createContext(rootStore);

const PaperWrapper = observer(({children}: {children: React.ReactNode}) => (
  <PaperProvider theme={rootStore.themeStore.theme}>{children}</PaperProvider>
));

function Main() {
  return (
    <StoreContext.Provider value={rootStore}>
      <PaperWrapper>
        <SnackbarProvider>
          <SafeAreaProvider>
            <App />
          </SafeAreaProvider>
        </SnackbarProvider>
      </PaperWrapper>
    </StoreContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

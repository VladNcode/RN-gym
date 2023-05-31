import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { RecoilRoot } from 'recoil';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import mapping from './mapping.json';
import { Routes } from './src/Routes';
import theme from './theme.json';

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }} customMapping={mapping}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ApplicationProvider>
    </RecoilRoot>
  );
}

export default App;

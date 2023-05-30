import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { RecoilRoot } from 'recoil';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import { Routes } from './src/Routes';

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     background: COLOR_SCHEME.lightGray2,
//   },
// };

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ApplicationProvider>
    </RecoilRoot>
  );
}

export default App;

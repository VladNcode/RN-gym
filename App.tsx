import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { RecoilRoot } from 'recoil';

import { TamaguiProvider } from 'tamagui';

import { Routes } from './src/Routes';
import { COLOR_SCHEME } from './src/constants';
import config from './tamagui.config';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLOR_SCHEME.lightGray2,
  },
};

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <TamaguiProvider config={config}>
        <NavigationContainer theme={theme}>
          <Routes />
        </NavigationContainer>
      </TamaguiProvider>
    </RecoilRoot>
  );
}

export default App;

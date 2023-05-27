import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { RecoilRoot } from 'recoil';

import { Routes } from './src/Routes';
import { COLOR_SCHEME } from './src/constants';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLOR_SCHEME.white,
  },
};

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <NavigationContainer theme={theme}>
        <Routes />
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;

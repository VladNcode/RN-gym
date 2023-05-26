import 'react-native-gesture-handler';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

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
    <NavigationContainer theme={theme}>
      <Routes />
    </NavigationContainer>
  );
}

export default App;

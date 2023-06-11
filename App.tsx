import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import mapping from './mapping.json';
import { Routes } from './src/Routes';
import useTheme from './src/store/theme';
import theme from './theme.json';

function App(): JSX.Element {
  const [scheme] = useTheme();

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={{
          ...eva[scheme as keyof typeof eva],
          ...theme,
          ...(scheme === 'light' ? { 'text-basic-color': '$color-basic-900' } : {}),
        }}
        customMapping={mapping}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}

export default App;

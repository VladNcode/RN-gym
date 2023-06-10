import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { enableLatestRenderer } from 'react-native-maps';
import { RecoilRoot } from 'recoil';

import * as eva from '@eva-design/eva';
import { StripeProvider } from '@stripe/stripe-react-native';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import mapping from './mapping.json';
import { Routes } from './src/Routes';
import theme from './theme.json';

enableLatestRenderer();

function App(): JSX.Element {
  const scheme: ['dark' | 'light'] = ['dark'];

  return (
    <StripeProvider publishableKey="pk_test_51NGQHFGfrqqL0GXxpdLsBKE62uVZwsOs5x0otCgq9mYfLCk5t9VBjJGGPO7M455xA2WWaLbEqOng1emBFZOei8BD00L7i5WL8n">
      <RecoilRoot>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider
          {...eva}
          theme={{
            ...eva[scheme[0] as keyof typeof eva],
            ...theme,
            ...(scheme[0] === 'light' ? { 'text-basic-color': '$color-basic-900' } : {}),
          }}
          customMapping={mapping}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </ApplicationProvider>
      </RecoilRoot>
    </StripeProvider>
  );
}

export default App;

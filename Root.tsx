import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import 'react-native-gesture-handler';
import { enableLatestRenderer } from 'react-native-maps';
import { RecoilRoot } from 'recoil';

import { StripeProvider } from '@stripe/stripe-react-native';

import App from './App';
import { NotificationListener, requestUserPermission } from './src/utils/pushNotificationHelper';

enableLatestRenderer();

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

function Root(): JSX.Element {
  useEffect(() => {
    requestUserPermission();
    NotificationListener();
  }, []);

  return (
    <StripeProvider publishableKey="pk_test_51NGQHFGfrqqL0GXxpdLsBKE62uVZwsOs5x0otCgq9mYfLCk5t9VBjJGGPO7M455xA2WWaLbEqOng1emBFZOei8BD00L7i5WL8n">
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </StripeProvider>
  );
}

export default Root;

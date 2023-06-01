import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { useRecoilState } from 'recoil';

import AuthStack from './navigators/AuthStack';
import DrawerNavigator from './navigators/Drawer';
import { userState } from './store/user';

export const Routes = React.memo(() => {
  const [initializing, setInitializing] = useState(true);
  const [userData, setUserData] = useRecoilState(userState);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUserData(user);

    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged); // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return auth().onUserChanged(user => {
      setUserData(user);
    });
  }, [setUserData]);

  if (userData && userData.displayName) {
    return <DrawerNavigator />;
  }

  return <AuthStack />;
});

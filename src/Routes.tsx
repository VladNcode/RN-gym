import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { useRecoilState } from 'recoil';

import { CustomDrawerContent } from './components';
import {
  CustomDrawerContentType,
  RootDrawerParamsList,
  RootStackParamsList,
  RootTabParamsList,
  TrainersStackParamsList,
} from './constants';
import { Onboarding, SignIn, SignUp } from './screens';
import Home from './screens/app/Home/Home';
import CategoriesSelect from './screens/app/Trainers/CategorySelect';
import TrainerDetails from './screens/app/Trainers/TrainerDetails';
import TrainersSelect from './screens/app/Trainers/TrainersSelect';
import { userState } from './store/user';

const Stack = createStackNavigator<RootStackParamsList>();
const StackTrainers = createStackNavigator<TrainersStackParamsList>();
const Drawer = createDrawerNavigator<RootDrawerParamsList>();
const Tab = createBottomTabNavigator<RootTabParamsList>();

const styles = StyleSheet.create({
  tabIcons: {
    width: 20,
    height: 20,
  },
  activeTabIcon: {
    backgroundColor: 'red',
  },
  tempStyle: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

const AddTask = () => {
  return (
    <View style={styles.tempStyle}>
      <Text>AddTask Screen</Text>
    </View>
  );
};

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
    const Trainers = () => (
      <StackTrainers.Navigator screenOptions={{ headerBackTitle: 'Back', title: 'Trainers' }}>
        <StackTrainers.Screen
          name="CategoriesSelect"
          component={CategoriesSelect}
          options={{ title: 'Trainers categories' }}
        />
        <StackTrainers.Screen name="TrainersSelect" component={TrainersSelect} options={{ title: 'Trainers' }} />
        <StackTrainers.Screen name="TrainerDetails" component={TrainerDetails} options={{ title: 'Trainer' }} />
      </StackTrainers.Navigator>
    );

    const Tabs = () => (
      <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                style={styles.tabIcons}
                source={focused ? require('./assets/homeActive.png') : require('./assets/home.png')}
              />
            ),
          }}
        />
        <Tab.Screen
          name="TrainersScreen"
          component={Trainers}
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                style={styles.tabIcons}
                source={focused ? require('./assets/calendarActive.png') : require('./assets/calendar.png')}
              />
            ),
          }}
        />
      </Tab.Navigator>
    );

    return (
      <Drawer.Navigator
        screenOptions={{ headerShown: false }}
        drawerContent={props => <CustomDrawerContent {...(props as unknown as CustomDrawerContentType)} />}>
        <Drawer.Screen name="Tabs" component={Tabs} />
        <Drawer.Screen name="AddTask" component={AddTask} />
      </Drawer.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
});

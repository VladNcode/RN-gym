import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { ImageProps, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { useRecoilState } from 'recoil';

import { BottomNavigation, BottomNavigationTab, Icon, IconElement } from '@ui-kitten/components';

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

const styles = StyleSheet.create({
  tabIcons: {
    width: 20,
    height: 20,
  },
  activeTabIcon: {
    backgroundColor: 'red',
  },
  tempStyle: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  bottomTab: {
    marginVertical: 8,
  },
});

const AddTask = () => {
  return (
    <View style={styles.tempStyle}>
      <Text>AddTask Screen</Text>
    </View>
  );
};

const Stack = createStackNavigator<RootStackParamsList>();
const StackTrainers = createStackNavigator<TrainersStackParamsList>();
const Drawer = createDrawerNavigator<RootDrawerParamsList>();

const { Navigator, Screen } = createBottomTabNavigator<RootTabParamsList>();

const PersonIcon = (props: Partial<ImageProps> | undefined): IconElement => <Icon {...props} name="person-outline" />;
const BellIcon = (props: Partial<ImageProps> | undefined): IconElement => <Icon {...props} name="bell-outline" />;

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => {
  return (
    <BottomNavigation selectedIndex={state.index} onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab style={styles.bottomTab} title="Home" icon={BellIcon} />
      <BottomNavigationTab style={styles.bottomTab} title="Trainers" icon={PersonIcon} />
    </BottomNavigation>
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
      <StackTrainers.Navigator screenOptions={{ headerShown: false }}>
        <StackTrainers.Screen name="CategoriesSelect" component={CategoriesSelect} />
        <StackTrainers.Screen name="TrainersSelect" component={TrainersSelect} />
        <StackTrainers.Screen name="TrainerDetails" component={TrainerDetails} />
      </StackTrainers.Navigator>
    );

    const Tabs = () => (
      <Navigator tabBar={props => <BottomTabBar {...props} />} screenOptions={{ headerShown: false }}>
        <Screen name="Home" component={Home} />
        <Screen name="TrainersScreen" component={Trainers} />
      </Navigator>
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

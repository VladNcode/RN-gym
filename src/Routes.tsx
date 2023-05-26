import 'react-native-gesture-handler';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { CustomDrawerContent } from './components';
import { CustomDrawerContentType, RootDrawerParamsList, RootStackParamsList, RootTabParamsList } from './constants';
import { Onboarding, SignIn, SignUp } from './screens';

const Stack = createStackNavigator<RootStackParamsList>();
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

const Home = () => {
  return (
    <View style={styles.tempStyle}>
      <Text>Home Screen</Text>
    </View>
  );
};

const Tasks = () => {
  return (
    <View style={styles.tempStyle}>
      <Text>Tasks Screen</Text>
    </View>
  );
};

const AddTask = () => {
  return (
    <View style={styles.tempStyle}>
      <Text>AddTask Screen</Text>
    </View>
  );
};

export const Routes = React.memo(() => {
  const [loggedIn] = useState(false);

  if (loggedIn) {
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
          name="Tasks"
          component={Tasks}
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

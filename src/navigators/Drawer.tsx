import auth from '@react-native-firebase/auth';
import { DrawerContentComponentProps, createDrawerNavigator } from '@react-navigation/drawer';
import { Linking, StyleSheet } from 'react-native';

import { Drawer, DrawerItem, IndexPath } from '@ui-kitten/components';

import { PRIVACY_POLICY_LINK, RootDrawerParamsList, TERMS_AND_CONDITIONS_LINK } from '../constants';
import useTheme from '../store/theme';
import BottomTabs from './BottomTabs';
import Stats from './StatsStack';

const styles = StyleSheet.create({
  drawerItem: {
    marginTop: 100,
  },
});

const { Navigator, Screen } = createDrawerNavigator<RootDrawerParamsList>();

const onLinkPress = (url: string) => {
  Linking.openURL(url);
};

const DrawerContent = ({ navigation, state }: DrawerContentComponentProps) => {
  const [, { toggle }] = useTheme();

  const logout = () => {
    auth().signOut();
  };

  return (
    <Drawer
      selectedIndex={new IndexPath(state.index)}
      onSelect={index => {
        if (index.row < 2) navigation.navigate(state.routeNames[index.row]);
      }}>
      <DrawerItem style={styles.drawerItem} title="Home" />
      <DrawerItem title="Stats" />
      <DrawerItem title="Privacy policy" onPress={() => onLinkPress(PRIVACY_POLICY_LINK)} />
      <DrawerItem title="Terms & Conditions" onPress={() => onLinkPress(TERMS_AND_CONDITIONS_LINK)} />
      <DrawerItem title="Toggle theme" onPress={toggle} />
      <DrawerItem title="Logout" onPress={logout} />
    </Drawer>
  );
};

export const DrawerNavigator = () => {
  return (
    <Navigator
      screenOptions={{ headerShown: false, swipeEnabled: false }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Screen name="Tabs" component={BottomTabs} />
      <Screen name="Stats" component={Stats} />
    </Navigator>
  );
};

export default DrawerNavigator;

import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImageProps, StyleSheet } from 'react-native';

import { BottomNavigation, BottomNavigationTab, Icon, IconElement } from '@ui-kitten/components';

import { RootTabParamsList } from '../constants';
import Home from '../screens/app/Home/Home';
import Map from '../screens/app/Map/Map';
import Shop from '../screens/app/Shop/Shop';
import Classes from './ClassesStack';
import Trainers from './Stack';

const styles = StyleSheet.create({
  bottomTab: {
    marginVertical: 8,
  },
});

const { Navigator, Screen } = createBottomTabNavigator<RootTabParamsList>();

const ActivityIcon = (props: Partial<ImageProps> | undefined): IconElement => (
  <Icon {...props} name="activity-outline" />
);
const PersonIcon = (props: Partial<ImageProps> | undefined): IconElement => <Icon {...props} name="person-outline" />;
const HomeIcon = (props: Partial<ImageProps> | undefined): IconElement => <Icon {...props} name="home-outline" />;
const CartIcon = (props: Partial<ImageProps> | undefined): IconElement => (
  <Icon {...props} name="shopping-cart-outline" />
);
const MapIcon = (props: Partial<ImageProps> | undefined): IconElement => <Icon {...props} name="map" />;

const BottomTabBar = ({ navigation, state }: BottomTabBarProps) => {
  return (
    <BottomNavigation selectedIndex={state.index} onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab style={styles.bottomTab} title="Classes" icon={ActivityIcon} />
      <BottomNavigationTab style={styles.bottomTab} title="Trainers" icon={PersonIcon} />
      <BottomNavigationTab style={styles.bottomTab} title="Home" icon={HomeIcon} />
      <BottomNavigationTab style={styles.bottomTab} title="Map" icon={MapIcon} />
      <BottomNavigationTab style={styles.bottomTab} title="Shop" icon={CartIcon} />
    </BottomNavigation>
  );
};

const BottomTabs = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />} screenOptions={{ headerShown: false }}>
    <Screen name="ClassesScreen" component={Classes} />
    <Screen name="TrainersScreen" component={Trainers} />
    <Screen name="Home" component={Home} />
    <Screen name="Map" component={Map} />
    <Screen name="Shop" component={Shop} />
  </Navigator>
);

export default BottomTabs;

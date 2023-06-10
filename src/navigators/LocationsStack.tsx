import { createStackNavigator } from '@react-navigation/stack';

import { LocationsStackParamsList } from '../constants';
import SelectLocations from '../screens/app/Map/Locations';
import Map from '../screens/app/Map/Map';

const StackTrainers = createStackNavigator<LocationsStackParamsList>();

const Locations = () => (
  <StackTrainers.Navigator screenOptions={{ headerShown: false }}>
    <StackTrainers.Screen name="SelectLocations" component={SelectLocations} />
    <StackTrainers.Screen name="Map" component={Map} />
  </StackTrainers.Navigator>
);

export default Locations;

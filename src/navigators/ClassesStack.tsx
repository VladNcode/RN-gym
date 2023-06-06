import { createStackNavigator } from '@react-navigation/stack';

import { ClassesStackParamsList } from '../constants';
import ClassAppointment from '../screens/app/Classes/ClassAppointment';
import ClassDetails from '../screens/app/Classes/ClassDetails';
import ClassesSelect from '../screens/app/Classes/ClassesSelect';

const StackClasses = createStackNavigator<ClassesStackParamsList>();

const Classes = () => (
  <StackClasses.Navigator screenOptions={{ headerShown: false }}>
    <StackClasses.Screen name="ClassesSelect" component={ClassesSelect} />
    <StackClasses.Screen name="ClassDetails" component={ClassDetails} />
    <StackClasses.Screen name="ClassAppointment" component={ClassAppointment} />
  </StackClasses.Navigator>
);

export default Classes;

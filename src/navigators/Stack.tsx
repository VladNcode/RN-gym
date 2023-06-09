import { createStackNavigator } from '@react-navigation/stack';

import { TrainersStackParamsList } from '../constants';
import CategoriesSelect from '../screens/app/Trainers/CategorySelect';
import TrainerAppointment from '../screens/app/Trainers/TrainerAppointment';
import TrainerDetails from '../screens/app/Trainers/TrainerDetails';
import TrainersSelect from '../screens/app/Trainers/TrainersSelect';

const StackTrainers = createStackNavigator<TrainersStackParamsList>();

const Trainers = () => (
  <StackTrainers.Navigator screenOptions={{ headerShown: false }}>
    <StackTrainers.Screen name="CategoriesSelect" component={CategoriesSelect} />
    <StackTrainers.Screen name="TrainersSelect" component={TrainersSelect} />
    <StackTrainers.Screen name="TrainerDetails" component={TrainerDetails} />
    <StackTrainers.Screen name="TrainerAppointment" component={TrainerAppointment} />
  </StackTrainers.Navigator>
);

export default Trainers;

import { createStackNavigator } from '@react-navigation/stack';

import { StatsStackParamsList } from '../constants';
import MeasurementsCharts from '../screens/app/Stats/Charts/MeasurementsCharts/MeasurementsCharts';
import WorkoutsCharts from '../screens/app/Stats/Charts/WorkoutsCharts/WorkoutsCharts';
import MeasurementsForm from '../screens/app/Stats/MeasurementsForm/MeasurementsForm';
import StatsOverview from '../screens/app/Stats/StatsOverview/StatsOverview';
import WorkoutsForm from '../screens/app/Stats/WorkoutsForm/WorkoutsForm';

const StackClasses = createStackNavigator<StatsStackParamsList>();

const Stats = () => (
  <StackClasses.Navigator screenOptions={{ headerShown: false }}>
    <StackClasses.Screen name="StatsOverview" component={StatsOverview} />
    <StackClasses.Screen name="WorkoutsForm" component={WorkoutsForm} />
    <StackClasses.Screen name="MeasurementsForm" component={MeasurementsForm} />
    <StackClasses.Screen name="WorkoutsCharts" component={WorkoutsCharts} />
    <StackClasses.Screen name="MeasurementsCharts" component={MeasurementsCharts} />
  </StackClasses.Navigator>
);

export default Stats;

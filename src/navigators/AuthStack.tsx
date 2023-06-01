import { createStackNavigator } from '@react-navigation/stack';

import { RootStackParamsList } from '../constants';
import { Onboarding, SignIn, SignUp } from '../screens';

const Stack = createStackNavigator<RootStackParamsList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;

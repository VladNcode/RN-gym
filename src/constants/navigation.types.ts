import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { TrainerProfile } from '../screens/app/Trainers/types';

export type RootStackParamsList = {
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type TrainersStackParamsList = {
  CategoriesSelect: undefined;
  TrainersSelect: { category: number };
  TrainerDetails: { trainer: TrainerProfile; category: number };
};

export type CategoriesSelectNavigationProp = StackNavigationProp<TrainersStackParamsList, 'CategoriesSelect'>;

export type TrainersSelectRoute = RouteProp<TrainersStackParamsList, 'TrainersSelect'>;
export type TrainersSelectNavigationProp = StackNavigationProp<TrainersStackParamsList, 'TrainersSelect'>;

export type TrainerDetailsRoute = RouteProp<TrainersStackParamsList, 'TrainerDetails'>;
export type TrainerDetailsNavigationProp = StackNavigationProp<TrainersStackParamsList, 'TrainerDetails'>;

export type RootDrawerParamsList = {
  Tabs: undefined;
  AddTask: undefined;
};

export type RootTabParamsList = {
  Home: undefined;
  TrainersScreen: undefined;
};

export type OnboardingNavigationProp = StackNavigationProp<RootStackParamsList, 'Onboarding'>;
export type SignInNavigationProp = StackNavigationProp<RootStackParamsList, 'SignIn'>;
export type SignUpNavigationProp = StackNavigationProp<RootStackParamsList, 'SignUp'>;

export type HomeNavigationProp = BottomTabNavigationProp<RootTabParamsList, 'Home'>;
export type HomeRoute = RouteProp<RootTabParamsList, 'Home'>;

export type CustomDrawerContentType = Omit<DrawerContentComponentProps, 'navigation'> &
  Omit<DrawerScreenProps<RootTabParamsList & RootDrawerParamsList>, 'route'>;

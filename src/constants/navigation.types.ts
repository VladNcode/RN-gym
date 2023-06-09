import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { GymClassWidthoutRefs } from '../screens/app/Classes/types';
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
  TrainerAppointment: { trainer: TrainerProfile };
};

export type ClassesStackParamsList = {
  ClassesSelect: undefined;
  ClassDetails: { classInfo: GymClassWidthoutRefs };
  ClassAppointment: { classInfo: GymClassWidthoutRefs };
};

export type CategoriesSelectNavigationProp = StackNavigationProp<TrainersStackParamsList, 'CategoriesSelect'>;

export type TrainersSelectRoute = RouteProp<TrainersStackParamsList, 'TrainersSelect'>;
export type TrainersSelectNavigationProp = StackNavigationProp<TrainersStackParamsList, 'TrainersSelect'>;

export type TrainerDetailsRoute = RouteProp<TrainersStackParamsList, 'TrainerDetails'>;
export type TrainerDetailsNavigationProp = StackNavigationProp<TrainersStackParamsList, 'TrainerDetails'>;

export type TrainerAppointmentRoute = RouteProp<TrainersStackParamsList, 'TrainerAppointment'>;
export type TrainerAppointmentNavigationProp = StackNavigationProp<TrainersStackParamsList, 'TrainerAppointment'>;

export type ClassSelectRoute = RouteProp<ClassesStackParamsList, 'ClassesSelect'>;
export type ClassSelectNavigationProp = StackNavigationProp<ClassesStackParamsList, 'ClassesSelect'>;

export type ClassDetailsRoute = RouteProp<ClassesStackParamsList, 'ClassDetails'>;
export type ClassDetailsNavigationProp = StackNavigationProp<ClassesStackParamsList, 'ClassDetails'>;

export type ClassAppointmentRoute = RouteProp<ClassesStackParamsList, 'ClassAppointment'>;
export type ClassAppointmentNavigationProp = StackNavigationProp<ClassesStackParamsList, 'ClassAppointment'>;

export type RootDrawerParamsList = {
  Tabs: undefined;
  AddTask: undefined;
};

export type RootTabParamsList = {
  Home: undefined;
  Shop: undefined;
  ClassesScreen: undefined;
  TrainersScreen: undefined;
  Map: undefined;
};

export type OnboardingNavigationProp = StackNavigationProp<RootStackParamsList, 'Onboarding'>;
export type SignInNavigationProp = StackNavigationProp<RootStackParamsList, 'SignIn'>;
export type SignUpNavigationProp = StackNavigationProp<RootStackParamsList, 'SignUp'>;

export type HomeNavigationProp = BottomTabNavigationProp<RootTabParamsList, 'Home'>;
export type HomeRoute = RouteProp<RootTabParamsList, 'Home'>;

export type CustomDrawerContentType = Omit<DrawerContentComponentProps, 'navigation'> &
  Omit<DrawerScreenProps<RootTabParamsList & RootDrawerParamsList>, 'route'>;

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

interface GymClass {
  name: string;
  dateAndTime: string;
  location: string;
  instructor: string;
  shortDescription: string;
  longDescription: string;
  availabilityDays: number[];
  id: string;
  trainer: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;
  limit: number;
}

interface GymClassWidthoutRefs {
  name: string;
  imageUrl: string;
  dateAndTime: string;
  location: string;
  instructor: string;
  shortDescription: string;
  longDescription: string;
  availabilityDays: number[];
  id: string;
  trainer: string;
  limit: number;
}

export type { GymClass, GymClassWidthoutRefs };

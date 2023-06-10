import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface TrainerProfile {
  name: string;
  certifications: string;
  areasOfExpertise: string;
  availability: string;
  shortDescription: string;
  longDescription: string;
  id: string;
  availabilityDays: [0, 1, 2, 3, 4, 5, 6, 7];
  availabilityHours: [number, number];
}

export interface TrainerBooking {
  date: Date;
  slot: [number, number];
  userId: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;
  trainerId: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;
}

export type FirebaseTrainerBooking = Omit<TrainerBooking, 'date'> & { date: { seconds: number; nanoseconds: number } };

export interface ClassBooking {
  id: string;
  date: string;
  limit: number;
  participants: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>[];
  trainerId: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;
  classId: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;
}

export type FirebaseClassBooking = Omit<ClassBooking, 'date'> & { date: { seconds: number; nanoseconds: number } };

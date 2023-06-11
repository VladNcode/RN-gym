import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { atom } from 'recoil';

import { localPersist } from '../utils';

export const userState = atom<FirebaseAuthTypes.User | null>({
  key: 'userState',
  default: null,
  effects: [localPersist],
});

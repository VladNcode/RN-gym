import AsyncStorage from '@react-native-async-storage/async-storage';
import { AtomEffect } from 'recoil';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const localPersist: AtomEffect<any> = ({ onSet, setSelf, node, trigger }) => {
  const loadPersisted = async () => {
    const savedValue = await AsyncStorage.getItem(node.key);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  };

  if (trigger === 'get') {
    loadPersisted();
  }

  onSet(async (newData, __, isReset) => {
    isReset ? AsyncStorage.removeItem(node.key) : AsyncStorage.setItem(node.key, JSON.stringify(newData));
  });
};

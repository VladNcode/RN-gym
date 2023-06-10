import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useEffect, useRef, useState } from 'react';

const useMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

const useSnapshot = <T>(
  query: FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>,
): { data: T[]; loading: boolean } => {
  const [data, updateData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const mounted = useMounted();

  useEffect(() => {
    const snapshot = query.onSnapshot(snap => {
      const d: T[] = [];

      snap.forEach(doc => {
        d.push(doc.data() as T);
      });

      if (mounted.current) updateData(d);
      if (setLoading && mounted.current) setLoading(false);
    });

    return () => {
      snapshot();
    };
  }, []);

  return { data, loading };
};

export default useSnapshot;

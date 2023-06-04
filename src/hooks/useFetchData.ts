import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

type Where = Parameters<FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>['where']>;

type QueryBuild =
  | FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>
  | FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>;

const useFetchData = <T>(collectionName: string, where?: Where): [T[], boolean] => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  let query: QueryBuild = firestore().collection(collectionName);

  if (where && where.length) {
    query = query.where(...where);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const classesDocs = (await query.get()).docs;
        setData(classesDocs.map(doc => ({ ...(doc.data() as T), id: doc.id })));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [data, loading];
};

export default useFetchData;

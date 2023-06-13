import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';

type Where = [
  fieldPath: string | number | FirebaseFirestoreTypes.FieldPath,
  opStr: FirebaseFirestoreTypes.WhereFilterOp,
  value:
    | string
    | number
    | boolean
    | Date
    | FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>,
];

type QueryBuild =
  | FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>
  | FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>;

const useFetchData = <T>(collectionName: string, ...where: Where[]): [T[], boolean] => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);

  let query: QueryBuild = firestore().collection(collectionName);

  if (where && where.length) {
    where.forEach(w => {
      query = query.where(...w);
    });
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

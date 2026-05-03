import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, query, getDocs, QueryConstraint, onSnapshot } from 'firebase/firestore';

export function useFirestoreCol<T>(colPath: string, constraints: QueryConstraint[] = []) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const q = query(collection(db, colPath), ...constraints);
    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
        setData(docs);
        setLoading(false);
      },
      (err) => {
        try {
          handleFirestoreError(err, OperationType.LIST, colPath);
        } catch (wrappedErr) {
          setError(wrappedErr as Error);
        }
        setLoading(false);
      }
    );

    return unsubscribe;
  }, [colPath, ...constraints]);

  return { data, loading, error };
}

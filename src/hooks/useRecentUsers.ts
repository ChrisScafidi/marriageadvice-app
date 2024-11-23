import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface RecentUser {
  id: string;
  name: string;
  email: string;
  plan: string;
  joinDate: Date;
  status: 'Active' | 'Inactive';
}

export function useRecentUsers(limitCount: number = 10) {
  const [users, setUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, 'users'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        try {
          const usersData = await Promise.all(
            snapshot.docs.map(async (doc) => {
              const userData = doc.data();
              
              // Get subscription status
              const subscriptionDoc = await db
                .collection('subscriptions')
                .doc(doc.id)
                .get();
              
              const subscription = subscriptionDoc.exists
                ? subscriptionDoc.data()
                : null;

              return {
                id: doc.id,
                name: userData.name || 'Anonymous',
                email: userData.email,
                plan: subscription?.plan || 'Free',
                joinDate: userData.createdAt.toDate(),
                status: userData.disabled ? 'Inactive' : 'Active',
              };
            })
          );

          setUsers(usersData);
          setLoading(false);
        } catch (err) {
          console.error('Error fetching recent users:', err);
          setError('Failed to fetch recent users');
          setLoading(false);
        }
      },
      (err) => {
        console.error('Error in users snapshot listener:', err);
        setError('Failed to listen to user updates');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [limitCount]);

  return { users, loading, error };
}
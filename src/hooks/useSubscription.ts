import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export function useSubscription() {
  const { currentUser } = useAuth();
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSubscription() {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        const subscriptionDoc = await getDoc(doc(db, 'subscriptions', currentUser.uid));
        setSubscription(subscriptionDoc.data());
      } catch (err) {
        console.error('Error fetching subscription:', err);
        setError('Failed to load subscription details');
      } finally {
        setLoading(false);
      }
    }

    fetchSubscription();
  }, [currentUser]);

  return { subscription, loading, error };
}
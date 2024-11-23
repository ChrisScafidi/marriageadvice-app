import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface AdminStats {
  totalUsers: number;
  activeSubscriptions: number;
  chatSessions: number;
  monthlyRevenue: number;
  userGrowth: number;
  subscriptionGrowth: number;
  chatGrowth: number;
  revenueGrowth: number;
}

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const thirtyDaysAgo = Timestamp.fromDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    
    // Set up real-time listeners
    const unsubscribers = [
      // Users listener
      onSnapshot(collection(db, 'users'), (snapshot) => {
        const total = snapshot.size;
        const newUsers = snapshot.docs.filter(
          doc => doc.data().createdAt > thirtyDaysAgo
        ).length;
        const growth = (newUsers / total) * 100;

        setStats(prev => ({
          ...prev,
          totalUsers: total,
          userGrowth: growth,
        } as AdminStats));
      }),

      // Subscriptions listener
      onSnapshot(
        query(
          collection(db, 'subscriptions'),
          where('status', '==', 'active')
        ),
        (snapshot) => {
          const total = snapshot.size;
          const newSubs = snapshot.docs.filter(
            doc => doc.data().createdAt > thirtyDaysAgo
          ).length;
          const growth = (newSubs / total) * 100;

          setStats(prev => ({
            ...prev,
            activeSubscriptions: total,
            subscriptionGrowth: growth,
          } as AdminStats));
        }
      ),

      // Chat sessions listener
      onSnapshot(collection(db, 'chatHistory'), (snapshot) => {
        const total = snapshot.size;
        const newChats = snapshot.docs.filter(
          doc => doc.data().createdAt > thirtyDaysAgo
        ).length;
        const growth = (newChats / total) * 100;

        setStats(prev => ({
          ...prev,
          chatSessions: total,
          chatGrowth: growth,
        } as AdminStats));
      }),

      // Revenue listener
      onSnapshot(
        query(
          collection(db, 'payments'),
          where('status', '==', 'succeeded')
        ),
        (snapshot) => {
          const totalRevenue = snapshot.docs.reduce(
            (sum, doc) => sum + doc.data().amount,
            0
          );
          const recentRevenue = snapshot.docs
            .filter(doc => doc.data().createdAt > thirtyDaysAgo)
            .reduce((sum, doc) => sum + doc.data().amount, 0);
          const growth = (recentRevenue / totalRevenue) * 100;

          setStats(prev => ({
            ...prev,
            monthlyRevenue: totalRevenue,
            revenueGrowth: growth,
          } as AdminStats));
        }
      ),
    ];

    setLoading(false);

    // Cleanup listeners
    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  }, []);

  return { stats, loading, error };
}
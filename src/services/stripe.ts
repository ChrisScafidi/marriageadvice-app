import { loadStripe } from '@stripe/stripe-js';
import { db } from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export async function createSubscription(userId: string, priceId: string) {
  try {
    // Create a subscription in Firestore
    const subscriptionRef = doc(db, 'subscriptions', userId);
    await setDoc(subscriptionRef, {
      priceId,
      status: 'active',
      createdAt: new Date().toISOString(),
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    });

    return { success: true };
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
}

export async function getSubscription(userId: string) {
  try {
    const subscriptionRef = doc(db, 'subscriptions', userId);
    const subscription = await getDoc(subscriptionRef);
    return subscription.data();
  } catch (error) {
    console.error('Error getting subscription:', error);
    throw error;
  }
}

export { stripePromise };
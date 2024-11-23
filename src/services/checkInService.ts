import { collection, doc, setDoc, getDoc, query, where, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CheckInData } from '../components/dashboard/DailyCheckIn/DailyCheckIn';

const COLLECTION_NAME = 'dailyCheckIns';

// Initialize collection for user if it doesn't exist
async function initializeUserCheckIns(userId: string) {
  try {
    const userDoc = doc(db, COLLECTION_NAME, userId);
    const docSnap = await getDoc(userDoc);
    
    if (!docSnap.exists()) {
      await setDoc(userDoc, {
        initialized: true,
        createdAt: Timestamp.now()
      });
    }
  } catch (error) {
    console.error('Error initializing user check-ins:', error);
  }
}

export async function saveDailyCheckIn(userId: string, data: CheckInData): Promise<void> {
  try {
    await initializeUserCheckIns(userId);
    
    const checkInRef = doc(db, COLLECTION_NAME, `${userId}_${new Date().toISOString().split('T')[0]}`);
    await setDoc(checkInRef, {
      ...data,
      userId,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error saving daily check-in:', error);
    throw new Error('Failed to save daily check-in. Please try again.');
  }
}

export async function getTodayCheckIn(userId: string): Promise<CheckInData | null> {
  try {
    await initializeUserCheckIns(userId);
    
    const today = new Date().toISOString().split('T')[0];
    const checkInRef = doc(db, COLLECTION_NAME, `${userId}_${today}`);
    const checkInDoc = await getDoc(checkInRef);

    if (!checkInDoc.exists()) {
      return null;
    }

    return checkInDoc.data() as CheckInData;
  } catch (error) {
    console.error('Error fetching today\'s check-in:', error);
    return null;
  }
}

export async function getCheckInHistory(userId: string): Promise<CheckInData[]> {
  try {
    await initializeUserCheckIns(userId);
    
    const checkInsRef = collection(db, COLLECTION_NAME);
    const q = query(
      checkInsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc'),
      limit(30)
    );

    const querySnapshot = await getDocs(q);
    const history = querySnapshot.docs
      .map(doc => {
        const data = doc.data();
        return {
          ...data,
          date: data.date || data.createdAt.toDate().toISOString(),
        } as CheckInData;
      })
      .filter(data => data.emotional !== undefined); // Filter out initialization doc

    return history;
  } catch (error) {
    console.error('Error fetching check-in history:', error);
    return [];
  }
}
import { collection, doc, setDoc, getDoc, query, where, orderBy, limit, getDocs, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ChatMessage } from '../types/chat';

const CHAT_HISTORY_LIMIT = 50; // Number of recent messages to fetch
const COLLECTION_NAME = 'chatHistory';

export interface ChatHistoryEntry {
  userId: string;
  messages: ChatMessage[];
  lastUpdated: Date;
}

export async function saveChatHistory(userId: string, messages: ChatMessage[]): Promise<void> {
  try {
    const chatRef = doc(db, COLLECTION_NAME, userId);
    await setDoc(chatRef, {
      userId,
      messages: messages.map(msg => ({
        ...msg,
        timestamp: Timestamp.fromDate(msg.timestamp)
      })),
      lastUpdated: Timestamp.now()
    });
  } catch (error) {
    console.error('Error saving chat history:', error);
    throw new Error('Failed to save chat history');
  }
}

export async function getChatHistory(userId: string): Promise<ChatMessage[]> {
  try {
    const chatRef = doc(db, COLLECTION_NAME, userId);
    const chatDoc = await getDoc(chatRef);

    if (!chatDoc.exists()) {
      return [];
    }

    const data = chatDoc.data();
    return data.messages.map((msg: any) => ({
      ...msg,
      timestamp: msg.timestamp.toDate()
    }));
  } catch (error) {
    console.error('Error fetching chat history:', error);
    throw new Error('Failed to fetch chat history');
  }
}

export async function deleteChatHistory(userId: string): Promise<void> {
  try {
    const chatRef = doc(db, COLLECTION_NAME, userId);
    await deleteDoc(chatRef);
  } catch (error) {
    console.error('Error deleting chat history:', error);
    throw new Error('Failed to delete chat history');
  }
}

export async function getRecentChats(userId: string): Promise<ChatMessage[]> {
  try {
    const chatRef = collection(db, COLLECTION_NAME);
    const q = query(
      chatRef,
      where('userId', '==', userId),
      orderBy('lastUpdated', 'desc'),
      limit(CHAT_HISTORY_LIMIT)
    );

    const querySnapshot = await getDocs(q);
    const chats: ChatMessage[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      chats.push(...data.messages.map((msg: any) => ({
        ...msg,
        timestamp: msg.timestamp.toDate()
      })));
    });

    return chats;
  } catch (error) {
    console.error('Error fetching recent chats:', error);
    throw new Error('Failed to fetch recent chats');
  }
}
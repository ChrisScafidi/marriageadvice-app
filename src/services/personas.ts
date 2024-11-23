import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Persona, DEFAULT_PERSONA_ID, DEFAULT_PERSONAS } from '../types/persona';

const COLLECTION_NAME = 'personas';

export async function initializePersonas() {
  try {
    const batch = [];
    for (const persona of DEFAULT_PERSONAS) {
      const docRef = doc(db, COLLECTION_NAME, persona.id);
      batch.push(setDoc(docRef, persona));
    }
    await Promise.all(batch);
    console.log('Successfully initialized personas');
  } catch (error) {
    console.error('Error initializing personas:', error);
    throw error;
  }
}

export async function getPersonas(): Promise<Persona[]> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    
    if (querySnapshot.empty) {
      // Initialize personas if none exist
      await initializePersonas();
      return DEFAULT_PERSONAS;
    }

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Persona));
  } catch (error) {
    console.error('Error fetching personas:', error);
    throw error;
  }
}

export async function getPersona(personaId: string = DEFAULT_PERSONA_ID): Promise<Persona> {
  try {
    const docRef = doc(db, COLLECTION_NAME, personaId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      // If persona doesn't exist, try to initialize and return default
      await initializePersonas();
      const defaultPersona = DEFAULT_PERSONAS.find(p => p.id === personaId);
      if (!defaultPersona) {
        throw new Error(`Persona with ID ${personaId} not found`);
      }
      return defaultPersona;
    }
    
    return {
      id: docSnap.id,
      ...docSnap.data()
    } as Persona;
  } catch (error) {
    console.error('Error fetching persona:', error);
    throw error;
  }
}
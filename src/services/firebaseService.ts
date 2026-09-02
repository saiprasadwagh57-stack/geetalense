import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, doc, setDoc, getDoc, query, orderBy } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth();

export async function trackUserActivity() {
  const user = auth.currentUser;
  if (!user) return;

  const path = `users/${user.uid}`;
  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const email = user.email || "";
    const displayName = user.displayName || "Seeker";

    if (userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        email,
        displayName,
        lastSeen: serverTimestamp(),
        visitCount: (userDoc.data().visitCount || 0) + 1
      }, { merge: true });
    } else {
      await setDoc(doc(db, 'users', user.uid), {
        email,
        displayName,
        lastSeen: serverTimestamp(),
        visitCount: 1
      });
    }
  } catch (error) {
    console.warn("User activity tracking notice:", error);
  }
}

export async function getAllFeedback() {
  const path = 'feedback';
  try {
    const q = query(collection(db, path), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

export async function getAllUsers() {
  const path = 'users';
  try {
    const q = query(collection(db, path), orderBy('lastSeen', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function submitFeedback(data: {
  shlokaReference: string;
  rating: number;
  comment: string;
  query: string;
}) {
  const path = 'feedback';
  try {
    const feedbackData = {
      ...data,
      timestamp: serverTimestamp(),
      userId: auth.currentUser?.uid || "anonymous"
    };
    await addDoc(collection(db, path), feedbackData);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

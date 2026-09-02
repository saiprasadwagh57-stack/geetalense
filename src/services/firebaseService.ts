import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, doc, setDoc, getDoc, query, orderBy } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export interface UserProfileData {
  uid?: string;
  displayName?: string;
  email?: string;
  phone?: string;
}

export async function trackUserActivity(customData?: UserProfileData) {
  const user = auth.currentUser;
  const uid = customData?.uid || user?.uid || (localStorage.getItem('gitaUserId') || `seeker_${Date.now()}`);
  
  if (!localStorage.getItem('gitaUserId')) {
    localStorage.setItem('gitaUserId', uid);
  }

  const email = customData?.email || user?.email || "";
  const displayName = customData?.displayName || user?.displayName || "Seeker";
  const phone = customData?.phone || "";

  // Always save local user log in localStorage cache
  try {
    const rawLocalUsers = localStorage.getItem('gitaLocalSeekers');
    const localUsers: any[] = rawLocalUsers ? JSON.parse(rawLocalUsers) : [];
    const existingIdx = localUsers.findIndex(u => u.uid === uid || (email && u.email === email));
    const updatedUser = {
      id: uid,
      uid,
      displayName,
      email,
      phone,
      lastSeen: new Date().toISOString(),
      visitCount: existingIdx >= 0 ? (localUsers[existingIdx].visitCount || 1) + 1 : 1
    };
    if (existingIdx >= 0) {
      localUsers[existingIdx] = { ...localUsers[existingIdx], ...updatedUser };
    } else {
      localUsers.unshift(updatedUser);
    }
    localStorage.setItem('gitaLocalSeekers', JSON.stringify(localUsers));
  } catch (e) {
    // ignore
  }

  const path = `users/${uid}`;
  try {
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);

    const docPayload: any = {
      email,
      displayName,
      lastSeen: serverTimestamp(),
      visitCount: userDoc.exists() ? ((userDoc.data()?.visitCount || 0) + 1) : 1
    };
    if (phone) {
      docPayload.phone = phone;
    }

    await setDoc(userDocRef, docPayload, { merge: true });
  } catch (error) {
    console.warn("User activity tracking sync note:", error);
  }
}

export async function getAllFeedback() {
  const path = 'feedback';
  try {
    const q = query(collection(db, path), orderBy('timestamp', 'desc'));
    const snapshot = await getDocs(q);
    const remoteData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return remoteData;
  } catch (error) {
    console.warn('Feedback fetch warning:', error);
    return [];
  }
}

export async function getAllUsers() {
  const path = 'users';
  try {
    const q = query(collection(db, path), orderBy('lastSeen', 'desc'));
    const snapshot = await getDocs(q);
    const remoteData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Merge with local seekers if any
    const rawLocal = localStorage.getItem('gitaLocalSeekers');
    const localSeekers: any[] = rawLocal ? JSON.parse(rawLocal) : [];
    
    const combined = [...remoteData];
    for (const local of localSeekers) {
      if (!combined.some(r => r.id === local.id || (local.email && r.email === local.email))) {
        combined.push(local);
      }
    }
    return combined;
  } catch (error) {
    console.warn('Users fetch warning:', error);
    const rawLocal = localStorage.getItem('gitaLocalSeekers');
    return rawLocal ? JSON.parse(rawLocal) : [];
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

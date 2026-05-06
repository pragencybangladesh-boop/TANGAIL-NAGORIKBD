
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, doc, getDocFromServer, setLogLevel } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  firestoreDatabaseId: '(default)',
};

// Fallback to json if env vars are missing
import firebaseJsonConfig from '../../firebase-applet-config.json';
const config = firebaseConfig.apiKey ? firebaseConfig : (firebaseJsonConfig as any);

const app = initializeApp(config);

// Debug log for configuration (sanitized)
console.log('Firebase Config Source:', firebaseConfig.apiKey ? 'ENV' : 'JSON');
console.log('Firebase Initialized with Project:', config.projectId);

// Initialize Firestore
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, config.firestoreDatabaseId || '(default)');

export const auth = getAuth(app);

// Test the connection to Firestore
async function testConnection() {
  try {
    // Try a simple get to verify connectivity
    await getDocFromServer(doc(db, 'test-connection', 'bootstrap'));
    console.log('Firebase connection test successful');
  } catch (error: any) {
    if (error?.message?.includes('the client is offline')) {
      console.error('Firebase connection failed: Client appears to be offline. This often means the Project ID or API Key in your configuration is incorrect, or Firestore is not enabled for this project.');
      console.error('Current Config:', {
        projectId: config.projectId,
        authDomain: config.authDomain,
        databaseId: (config as any).firestoreDatabaseId || '(default)'
      });
    } else {
      console.warn('Firebase connection test warning:', error?.message || error);
    }
  }
}

testConnection();

export enum OperationType {
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

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
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

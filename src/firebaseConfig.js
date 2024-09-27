import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if all required environment variables are present
const missingVars = Object.entries(firebaseConfig).filter(([key, value]) => !value);

if (missingVars.length > 0) {
  console.error('Missing Firebase configuration. Please check your environment variables:');
  missingVars.forEach(([key]) => console.error(`- ${key}`));
  throw new Error('Firebase configuration is incomplete. Check the console for details.');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
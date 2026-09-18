import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD0MAsYks9iSwnA914j8je9YTwqHTxNOjM",
  authDomain: "evaluacion-final-142dc.firebaseapp.com",
  projectId: "evaluacion-final-142dc",
  storageBucket: "evaluacion-final-142dc.firebasestorage.app",
  messagingSenderId: "902279867498",
  appId: "1:902279867498:web:c994fe8731e00cb79f2e13"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBOwI6x7HmQuVswdgb8g3pPDgTY-tHHaF4",
  authDomain: "homecooked-ecf13.firebaseapp.com",
  projectId: "homecooked-ecf13",
  storageBucket: "homecooked-ecf13.appspot.com",
  messagingSenderId: "452728545417",
  appId: "1:452728545417:web:dc22249a060c0618e5e658",
  measurementId: "G-PG2RBJJRFL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = auth;
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);


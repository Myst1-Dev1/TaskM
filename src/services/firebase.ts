import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDHcmaRgqbcLr2p88Q0ufXhYWeOZIh7n8E",
  authDomain: "taskm-b1902.firebaseapp.com",
  databaseURL: "https://taskm-b1902-default-rtdb.firebaseio.com",
  projectId: "taskm-b1902",
  storageBucket: "taskm-b1902.firebasestorage.app",
  messagingSenderId: "1086868644754",
  appId: "1:1086868644754:web:d5d9be4bb5f3927f63174b"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
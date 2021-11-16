import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBTYGxNMaAmzwCgKZDco6gPtd0Ye6LmAoQ',
  authDomain: 'redux-login-maig.firebaseapp.com',
  projectId: 'redux-login-maig',
  storageBucket: 'redux-login-maig.appspot.com',
  messagingSenderId: '582449306869',
  appId: '1:582449306869:web:07087e5ed6bcc0df8b39bc',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleAuthProvider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);

export { firebaseApp, googleAuthProvider, db };

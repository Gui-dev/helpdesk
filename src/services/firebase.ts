import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID
} from '@env'

const firebaseConfig = {
  apiKey: 'AIzaSyDMoTaSSrBxaderIn_E_nAVmwkKwEtIbUw',
  authDomain: 'helpdesk-79981.firebaseapp.com',
  projectId: 'helpdesk-79981',
  storageBucket: 'helpdesk-79981.appspot.com',
  messagingSenderId: '501854130400',
  appId: '1:501854130400:web:24256cbc22242a45000085'

  // apiKey: FIREBASE_API_KEY,
  // authDomain: FIREBASE_AUTH_DOMAIN,
  // projectId: FIREBASE_PROJECT_ID,
  // storageBucket: FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  // appId: FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
export const firebaseAuth = getAuth(app)

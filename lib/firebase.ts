import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDMBTooa4lO60-XAgv1hYbOjZk3Z6HPxc8",
  authDomain: "iron-ring-431913-v6.firebaseapp.com",
  projectId: "iron-ring-431913-v6",
  storageBucket: "iron-ring-431913-v6.firebasestorage.app",
  messagingSenderId: "115036740284",
  appId: "1:115036740284:web:bb8c2e0d9cf5243c708eb9",
  measurementId: "G-94QM4S75YP"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

// Initialize Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null

export default app 
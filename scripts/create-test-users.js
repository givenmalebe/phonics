// Script to create test users for the education platform
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore'

// Firebase config (replace with your actual config)
const firebaseConfig = {
  // Add your Firebase config here
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

// Test users to create
const testUsers = [
  {
    email: "admin@stretcheducation.edu",
    password: "admin123",
    firstName: "System",
    lastName: "Administrator",
    role: "ADMIN",
    phoneNumber: "+27 11 123 4567"
  },
  {
    email: "jack.chuene@stretcheducation.edu", 
    password: "tutor123",
    firstName: "Jack",
    lastName: "Chuene",
    role: "TUTOR",
    phoneNumber: "+27 82 123 4567"
  },
  {
    email: "sarah.williams@stretcheducation.edu",
    password: "tutor123", 
    firstName: "Sarah",
    lastName: "Williams",
    role: "TUTOR",
    phoneNumber: "+27 83 234 5678"
  },
  {
    email: "thabo.mthembu@student.edu",
    password: "student123",
    firstName: "Thabo", 
    lastName: "Mthembu",
    role: "STUDENT",
    phoneNumber: "+27 84 345 6789"
  }
]

async function createTestUsers() {
  console.log('Creating test users...')
  
  for (const userData of testUsers) {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        userData.email, 
        userData.password
      )
      
      const user = userCredential.user
      console.log(`✅ Created auth user: ${userData.email}`)
      
      // Create user profile in Firestore
      const userProfile = {
        uid: user.uid,
        email: userData.email,
        displayName: `${userData.firstName} ${userData.lastName}`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        phoneNumber: userData.phoneNumber,
        isActive: true,
        isEmailVerified: false,
        onboardingCompleted: true, // Set to true for easy testing
        preferences: {
          notifications: true,
          theme: 'light',
          language: 'en'
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLoginAt: null
      }
      
      await setDoc(doc(db, 'users', user.uid), userProfile)
      console.log(`✅ Created user profile: ${userData.firstName} ${userData.lastName} (${userData.role})`)
      
    } catch (error) {
      console.error(`❌ Error creating user ${userData.email}:`, error.message)
    }
  }
  
  console.log('\n🎉 Test users creation completed!')
  console.log('\n📝 Login Credentials:')
  console.log('👑 ADMIN: admin@stretcheducation.edu / admin123')
  console.log('👨‍🏫 TUTOR: jack.chuene@stretcheducation.edu / tutor123')
  console.log('👨‍🏫 TUTOR: sarah.williams@stretcheducation.edu / tutor123') 
  console.log('👦 STUDENT: thabo.mthembu@student.edu / student123')
}

// Run the script
createTestUsers().catch(console.error)
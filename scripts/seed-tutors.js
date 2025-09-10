const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, deleteDoc, getDocs, query, where } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDMBTooa4lO60-XAgv1hYbOjZk3Z6HPxc8",
  authDomain: "iron-ring-431913-v6.firebaseapp.com",
  projectId: "iron-ring-431913-v6",
  storageBucket: "iron-ring-431913-v6.firebasestorage.app",
  messagingSenderId: "115036740284",
  appId: "1:115036740284:web:bb8c2e0d9cf5243c708eb9",
  measurementId: "G-94QM4S75YP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Updated sample tutors with proper TutorProfile structure
const sampleTutors = [
  {
    uid: 'tutor_sarah_johnson',
    email: 'sarah.johnson@stretch.edu',
    displayName: 'Sarah Johnson',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'educator',
    phoneNumber: '+1-555-0101',
    avatar: '/placeholder.svg?height=40&width=40',
    isActive: true,
    isEmailVerified: true,
    onboardingCompleted: true,
    preferences: {
      notifications: true,
      theme: 'light',
      language: 'en'
    },
    specializations: ['Phonics Fundamentals', 'Early Reading'],
    experience: '5 years',
    education: 'M.Ed in Reading Education',
    hourlyRate: 45,
    bio: 'Passionate educator specializing in phonics fundamentals with 5 years of experience helping young learners develop strong reading foundations.',
    certifications: ['Reading Specialist Certification', 'Orton-Gillingham Trained'],
    totalLearners: 27,
    activeLearners: 15,
    rating: 4.9,
    totalSessions: 340,
    avgImprovement: 85,
    completionRate: 92,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date()
  },
  {
    uid: 'tutor_mike_chen',
    email: 'mike.chen@stretch.edu',
    displayName: 'Mike Chen',
    firstName: 'Mike',
    lastName: 'Chen',
    role: 'educator',
    phoneNumber: '+1-555-0102',
    avatar: '/placeholder.svg?height=40&width=40',
    isActive: true,
    isEmailVerified: true,
    onboardingCompleted: true,
    preferences: {
      notifications: true,
      theme: 'light',
      language: 'en'
    },
    specializations: ['Advanced Reading', 'Reading Comprehension'],
    experience: '4 years',
    education: 'B.A. in Elementary Education',
    hourlyRate: 40,
    bio: 'Dedicated to helping learners master advanced reading skills and comprehension strategies.',
    certifications: ['Elementary Teaching License', 'Reading Recovery Trained'],
    totalLearners: 20,
    activeLearners: 12,
    rating: 4.8,
    totalSessions: 280,
    avgImprovement: 82,
    completionRate: 89,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date()
  },
  {
    uid: 'tutor_emily_davis',
    email: 'emily.davis@stretch.edu',
    displayName: 'Emily Davis',
    firstName: 'Emily',
    lastName: 'Davis',
    role: 'educator',
    phoneNumber: '+1-555-0103',
    avatar: '/placeholder.svg?height=40&width=40',
    isActive: true,
    isEmailVerified: true,
    onboardingCompleted: true,
    preferences: {
      notifications: true,
      theme: 'light',
      language: 'en'
    },
    specializations: ['Early Reading', 'Phonemic Awareness'],
    experience: '3 years',
    education: 'M.A. in Special Education',
    hourlyRate: 38,
    bio: 'Specializes in early reading development and phonemic awareness for beginning readers.',
    certifications: ['Special Education License', 'Wilson Reading System Certified'],
    totalLearners: 16,
    activeLearners: 10,
    rating: 4.7,
    totalSessions: 195,
    avgImprovement: 79,
    completionRate: 87,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date()
  },
  {
    uid: 'tutor_david_wilson',
    email: 'david.wilson@stretch.edu',
    displayName: 'David Wilson',
    firstName: 'David',
    lastName: 'Wilson',
    role: 'educator',
    phoneNumber: '+1-555-0104',
    avatar: '/placeholder.svg?height=40&width=40',
    isActive: true,
    isEmailVerified: true,
    onboardingCompleted: true,
    preferences: {
      notifications: true,
      theme: 'dark',
      language: 'en'
    },
    specializations: ['Reading Comprehension', 'Vocabulary Development'],
    experience: '6 years',
    education: 'Ph.D. in Literacy Education',
    hourlyRate: 55,
    bio: 'Experienced educator with expertise in reading comprehension and vocabulary development strategies.',
    certifications: ['Reading Specialist License', 'Literacy Coach Certification'],
    totalLearners: 33,
    activeLearners: 18,
    rating: 4.9,
    totalSessions: 425,
    avgImprovement: 88,
    completionRate: 94,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date()
  },
  {
    uid: 'tutor_jessica_martinez',
    email: 'jessica.martinez@stretch.edu',
    displayName: 'Jessica Martinez',
    firstName: 'Jessica',
    lastName: 'Martinez',
    role: 'educator',
    phoneNumber: '+1-555-0105',
    avatar: '/placeholder.svg?height=40&width=40',
    isActive: true,
    isEmailVerified: true,
    onboardingCompleted: true,
    preferences: {
      notifications: true,
      theme: 'light',
      language: 'en'
    },
    specializations: ['Learning Disabilities', 'Dyslexia Support'],
    experience: '7 years',
    education: 'M.Ed in Learning Disabilities',
    hourlyRate: 50,
    bio: 'Specializes in supporting learners with learning disabilities and dyslexia using evidence-based approaches.',
    certifications: ['Learning Disabilities Specialist', 'Dyslexia Therapist Certification'],
    totalLearners: 25,
    activeLearners: 14,
    rating: 4.8,
    totalSessions: 350,
    avgImprovement: 83,
    completionRate: 91,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date()
  },
  {
    uid: 'tutor_robert_thompson',
    email: 'robert.thompson@stretch.edu',
    displayName: 'Robert Thompson',
    firstName: 'Robert',
    lastName: 'Thompson',
    role: 'educator',
    phoneNumber: '+1-555-0106',
    avatar: '/placeholder.svg?height=40&width=40',
    isActive: true,
    isEmailVerified: true,
    onboardingCompleted: true,
    preferences: {
      notifications: true,
      theme: 'light',
      language: 'en'
    },
    specializations: ['Vocabulary Development', 'Fluency Training'],
    experience: '4 years',
    education: 'B.A. in English Education',
    hourlyRate: 42,
    bio: 'Focuses on vocabulary development and reading fluency to help learners become confident readers.',
    certifications: ['Secondary Teaching License', 'Fluency Specialist Certification'],
    totalLearners: 18,
    activeLearners: 11,
    rating: 4.6,
    totalSessions: 220,
    avgImprovement: 77,
    completionRate: 88,
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date()
  }
];

async function seedTutors() {
  try {
    console.log('Starting to seed tutors...');
    
    // Clear existing tutors from users collection
    const existingTutorsQuery = query(collection(db, 'users'), where('role', '==', 'educator'));
    const existingTutors = await getDocs(existingTutorsQuery);
    console.log(`Found ${existingTutors.size} existing tutors to delete`);
    
    for (const doc of existingTutors.docs) {
      await deleteDoc(doc.ref);
    }
    console.log('Cleared existing tutors');

    // Also clear old tutors collection if it exists
    try {
      const oldTutorsCollection = await getDocs(collection(db, 'tutors'));
      console.log(`Found ${oldTutorsCollection.size} old tutor documents to delete`);
      for (const doc of oldTutorsCollection.docs) {
        await deleteDoc(doc.ref);
      }
      console.log('Cleared old tutors collection');
    } catch (error) {
      console.log('No old tutors collection found (this is fine)');
    }

    // Add sample tutors to users collection
    for (const tutor of sampleTutors) {
      const docRef = await addDoc(collection(db, 'users'), tutor);
      console.log(`Added tutor: ${tutor.displayName} with ID: ${docRef.id}`);
    }

    console.log('✅ Successfully seeded tutors!');
    console.log(`Added ${sampleTutors.length} tutors to the users collection`);
    
    // Specialization distribution summary
    const specializationCounts = {};
    sampleTutors.forEach(tutor => {
      tutor.specializations.forEach(spec => {
        specializationCounts[spec] = (specializationCounts[spec] || 0) + 1;
      });
    });
    
    console.log('\n📊 Specialization Distribution:');
    Object.entries(specializationCounts).forEach(([spec, count]) => {
      console.log(`${spec}: ${count} tutors`);
    });

    console.log('\n💰 Rate Distribution:');
    const rates = sampleTutors.map(t => t.hourlyRate).sort((a, b) => a - b);
    console.log(`Min Rate: $${rates[0]}/hour`);
    console.log(`Max Rate: $${rates[rates.length - 1]}/hour`);
    console.log(`Avg Rate: $${Math.round(rates.reduce((a, b) => a + b, 0) / rates.length)}/hour`);
    
  } catch (error) {
    console.error('Error seeding tutors:', error);
  }
}

seedTutors(); 
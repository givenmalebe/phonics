// Demo script to seed Firebase with sample data
// Run with: node scripts/seed-firebase.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');

// Firebase config - replace with your actual config
const firebaseConfig = {
    apiKey: "demo-api-key",
    authDomain: "phonics-app-demo.firebaseapp.com",
    projectId: "phonics-app-demo",
    storageBucket: "phonics-app-demo.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:demo"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedData() {
    console.log('🌱 Seeding Firebase with sample data...');

    try {
        // Seed tutors
        const tutors = [
            {
                name: 'Sarah Johnson',
                email: 'sarah@phonographix.edu',
                avatar: '/placeholder.svg?height=40&width=40',
                specialization: 'Phonics Fundamentals',
                experience: '5 years',
                rating: 4.9,
                efficiency: 92,
                engagement: 88,
                retention: 94,
                currentLearners: 15,
                completedLearners: 12,
                avgImprovement: 85.2,
                trend: 'up',
                monthlyImprovement: 3.2,
                sessionsThisMonth: 68,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            },
            {
                name: 'Mike Chen',
                email: 'mike@phonographix.edu',
                avatar: '/placeholder.svg?height=40&width=40',
                specialization: 'Advanced Reading',
                experience: '4 years',
                rating: 4.8,
                efficiency: 89,
                engagement: 91,
                retention: 87,
                currentLearners: 12,
                completedLearners: 8,
                avgImprovement: 82.7,
                trend: 'up',
                monthlyImprovement: 2.8,
                sessionsThisMonth: 54,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            }
        ];

        for (const tutor of tutors) {
            await addDoc(collection(db, 'tutors'), tutor);
        }
        console.log('✅ Tutors seeded');

        // Seed learners
        const learners = [
            {
                name: 'Emma Thompson',
                age: 7,
                level: 'PINK',
                progress: 85,
                tutor: 'Sarah Johnson',
                tutorId: 'tutor1',
                lastSession: '2024-01-15',
                nextSession: '2024-01-22',
                status: 'ACTIVE',
                avatar: '/placeholder.svg?height=40&width=40',
                parent: {
                    name: 'Michael Thompson',
                    email: 'michael.t@email.com',
                    phone: '(555) 123-4567'
                },
                weeklyGoal: 90,
                sessionsThisWeek: 2,
                targetSessions: 3,
                currentStreak: 5,
                needsAttention: false,
                upcomingAssignments: 2,
                completedAssignments: 8,
                totalAssignments: 10,
                grade: '2nd Grade',
                enrollmentDate: '2023-09-15',
                strengths: ['Phoneme Awareness', 'Letter Recognition'],
                challenges: ['Blending', 'Reading Fluency'],
                notes: 'Making excellent progress with sound recognition',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            },
            {
                name: 'Jake Miller',
                age: 8,
                level: 'BLUE',
                progress: 72,
                tutor: 'Mike Chen',
                tutorId: 'tutor2',
                lastSession: '2024-01-14',
                nextSession: '2024-01-21',
                status: 'ACTIVE',
                avatar: '/placeholder.svg?height=40&width=40',
                parent: {
                    name: 'Lisa Miller',
                    email: 'lisa.m@email.com',
                    phone: '(555) 234-5678'
                },
                weeklyGoal: 85,
                sessionsThisWeek: 1,
                targetSessions: 3,
                currentStreak: 3,
                needsAttention: true,
                upcomingAssignments: 3,
                completedAssignments: 6,
                totalAssignments: 9,
                grade: '3rd Grade',
                enrollmentDate: '2023-10-01',
                strengths: ['Memory', 'Focus'],
                challenges: ['Complex Sounds', 'Reading Speed'],
                notes: 'Needs encouragement with difficult words',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            },
            {
                name: 'Sophia Chen',
                age: 6,
                level: 'PINK',
                progress: 45,
                tutor: 'Sarah Johnson',
                tutorId: 'tutor1',
                lastSession: '2024-01-13',
                nextSession: '2024-01-20',
                status: 'ACTIVE',
                avatar: '/placeholder.svg?height=40&width=40',
                parent: {
                    name: 'David Chen',
                    email: 'david.c@email.com',
                    phone: '(555) 345-6789'
                },
                weeklyGoal: 60,
                sessionsThisWeek: 3,
                targetSessions: 3,
                currentStreak: 8,
                needsAttention: false,
                upcomingAssignments: 1,
                completedAssignments: 4,
                totalAssignments: 5,
                grade: '1st Grade',
                enrollmentDate: '2023-11-15',
                strengths: ['Attention to Detail', 'Following Instructions'],
                challenges: ['Sound Discrimination', 'Confidence'],
                notes: 'Shy but very attentive during sessions',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            }
        ];

        for (const learner of learners) {
            await addDoc(collection(db, 'learners'), learner);
        }
        console.log('✅ Learners seeded');

        // Seed assignments
        const assignments = [
            {
                title: 'Phoneme Segmentation Practice',
                description: 'Practice breaking words into individual sounds',
                learner: 'Emma Thompson',
                learnerId: 'learner1',
                level: 'PINK',
                status: 'COMPLETED',
                score: 92,
                dueDate: '2024-01-20',
                completedDate: '2024-01-19',
                estimatedTime: 15,
                actualTime: 12,
                difficulty: 'EASY',
                skills: ['Phoneme Awareness', 'Segmentation'],
                feedback: 'Excellent work! Emma shows strong understanding of sound segmentation.',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            },
            {
                title: 'Blending CVC Words',
                description: 'Blend consonant-vowel-consonant words',
                learner: 'Jake Miller',
                learnerId: 'learner2',
                level: 'BLUE',
                status: 'IN_PROGRESS',
                score: null,
                dueDate: '2024-01-25',
                completedDate: null,
                estimatedTime: 20,
                actualTime: null,
                difficulty: 'MEDIUM',
                skills: ['Blending', 'CVC Words'],
                feedback: null,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            }
        ];

        for (const assignment of assignments) {
            await addDoc(collection(db, 'assignments'), assignment);
        }
        console.log('✅ Assignments seeded');

        console.log('🎉 Firebase seeding completed successfully!');
        process.exit(0);

    } catch (error) {
        console.error('❌ Error seeding Firebase:', error);
        process.exit(1);
    }
}

seedData(); 
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    onSnapshot,
    writeBatch,
    serverTimestamp,
    DocumentData,
    QuerySnapshot
} from 'firebase/firestore'
import { db } from './firebase'

// Types
export interface Learner {
    id: string
    name: string
    age: number
    level: 'PINK' | 'BLUE' | 'YELLOW' | 'PURPLE'
    progress: number
    tutor: string
    tutorId: string
    lastSession: string | null
    nextSession: string | null
    status: 'ACTIVE' | 'AT_RISK' | 'COMPLETED' | 'INACTIVE'
    avatar: string
    parent: {
        name: string
        email: string
        phone: string
    }
    weeklyGoal: number
    sessionsThisWeek: number
    targetSessions: number
    currentStreak: number
    needsAttention: boolean
    upcomingAssignments: number
    completedAssignments: number
    totalAssignments: number
    grade: string
    enrollmentDate: string
    strengths: string[]
    challenges: string[]
    notes: string | null
    createdAt: any
    updatedAt: any
}

export interface Tutor {
    id: string
    name: string
    email: string
    avatar: string
    specialization: string
    experience: string
    rating: number
    efficiency: number
    engagement: number
    retention: number
    currentLearners: number
    completedLearners: number
    avgImprovement: number
    trend: 'up' | 'down' | 'stable'
    monthlyImprovement: number
    sessionsThisMonth: number
    createdAt: any
    updatedAt: any
}

export interface Assignment {
    id: string
    title: string
    description: string
    learner: string
    learnerId: string
    level: 'PINK' | 'BLUE' | 'YELLOW' | 'PURPLE'
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'OVERDUE'
    score: number | null
    dueDate: string
    completedDate: string | null
    estimatedTime: number
    actualTime: number | null
    difficulty: 'EASY' | 'MEDIUM' | 'HARD'
    skills: string[]
    feedback: string | null
    createdAt: any
    updatedAt: any
}

// Learners Service
export const learnersService = {
    // Get all learners
    async getAll(): Promise<Learner[]> {
        try {
            const querySnapshot = await getDocs(
                query(collection(db, 'learners'), orderBy('createdAt', 'desc'))
            )
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Learner[]
        } catch (error) {
            console.error('Error fetching learners:', error)
            throw error
        }
    },

    // Get learner by ID
    async getById(id: string): Promise<Learner | null> {
        try {
            const docSnap = await getDoc(doc(db, 'learners', id))
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() } as Learner
            }
            return null
        } catch (error) {
            console.error('Error fetching learner:', error)
            throw error
        }
    },

    // Create new learner
    async create(learnerData: Omit<Learner, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
        try {
            const docRef = await addDoc(collection(db, 'learners'), {
                ...learnerData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            })
            return docRef.id
        } catch (error) {
            console.error('Error creating learner:', error)
            throw error
        }
    },

    // Update learner
    async update(id: string, updates: Partial<Learner>): Promise<void> {
        try {
            await updateDoc(doc(db, 'learners', id), {
                ...updates,
                updatedAt: serverTimestamp()
            })
        } catch (error) {
            console.error('Error updating learner:', error)
            throw error
        }
    },

    // Delete learner
    async delete(id: string): Promise<void> {
        try {
            await deleteDoc(doc(db, 'learners', id))
        } catch (error) {
            console.error('Error deleting learner:', error)
            throw error
        }
    },

    // Get learners by status
    async getByStatus(status: string): Promise<Learner[]> {
        try {
            const q = query(
                collection(db, 'learners'),
                where('status', '==', status),
                orderBy('createdAt', 'desc')
            )
            const querySnapshot = await getDocs(q)
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Learner[]
        } catch (error) {
            console.error('Error fetching learners by status:', error)
            throw error
        }
    }
}

// Tutors Service
export const tutorsService = {
    // Get all tutors
    async getAll(): Promise<Tutor[]> {
        try {
            const querySnapshot = await getDocs(collection(db, 'tutors'))
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Tutor[]
        } catch (error) {
            console.error('Error fetching tutors:', error)
            throw error
        }
    },

    // Get tutor by ID
    async getById(id: string): Promise<Tutor | null> {
        try {
            const docSnap = await getDoc(doc(db, 'tutors', id))
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() } as Tutor
            }
            return null
        } catch (error) {
            console.error('Error fetching tutor:', error)
            throw error
        }
    },

    // Create new tutor
    async create(tutorData: Omit<Tutor, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
        try {
            const docRef = await addDoc(collection(db, 'tutors'), {
                ...tutorData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            })
            return docRef.id
        } catch (error) {
            console.error('Error creating tutor:', error)
            throw error
        }
    }
}

// Assignments Service
export const assignmentsService = {
    // Get all assignments
    async getAll(): Promise<Assignment[]> {
        try {
            const querySnapshot = await getDocs(
                query(collection(db, 'assignments'), orderBy('createdAt', 'desc'))
            )
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Assignment[]
        } catch (error) {
            console.error('Error fetching assignments:', error)
            throw error
        }
    },

    // Get assignments by learner ID
    async getByLearnerId(learnerId: string): Promise<Assignment[]> {
        try {
            const q = query(
                collection(db, 'assignments'),
                where('learnerId', '==', learnerId),
                orderBy('createdAt', 'desc')
            )
            const querySnapshot = await getDocs(q)
            return querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Assignment[]
        } catch (error) {
            console.error('Error fetching assignments for learner:', error)
            throw error
        }
    },

    // Create new assignment
    async create(assignmentData: Omit<Assignment, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
        try {
            const docRef = await addDoc(collection(db, 'assignments'), {
                ...assignmentData,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            })
            return docRef.id
        } catch (error) {
            console.error('Error creating assignment:', error)
            throw error
        }
    },

    // Update assignment
    async update(id: string, updates: Partial<Assignment>): Promise<void> {
        try {
            await updateDoc(doc(db, 'assignments', id), {
                ...updates,
                updatedAt: serverTimestamp()
            })
        } catch (error) {
            console.error('Error updating assignment:', error)
            throw error
        }
    }
}

// Dashboard Service
export const dashboardService = {
    // Get dashboard statistics
    async getStats() {
        try {
            const [learners, tutors, assignments] = await Promise.all([
                learnersService.getAll(),
                tutorsService.getAll(),
                assignmentsService.getAll()
            ])

            const activeLearners = learners.filter(l => l.status === 'ACTIVE').length
            const atRiskLearners = learners.filter(l => l.status === 'AT_RISK').length
            const completedLearners = learners.filter(l => l.status === 'COMPLETED').length

            const avgProgress = learners.length > 0
                ? Math.round(learners.reduce((acc, l) => acc + l.progress, 0) / learners.length)
                : 0

            // Performance data by level
            const performanceData = ['PINK', 'BLUE', 'YELLOW', 'PURPLE'].map(level => {
                const levelLearners = learners.filter(l => l.level === level)
                const avgLevelProgress = levelLearners.length > 0
                    ? Math.round(levelLearners.reduce((acc, l) => acc + l.progress, 0) / levelLearners.length)
                    : 0

                return {
                    level: level.toLowerCase(),
                    completed: avgLevelProgress,
                    total: 100,
                    enrolled: levelLearners.length
                }
            })

            // Level distribution
            const levelDistribution = performanceData.map(level => ({
                name: `${level.level.charAt(0).toUpperCase() + level.level.slice(1)} Level`,
                value: level.enrolled,
                color: level.level === 'pink' ? '#ec4899' :
                    level.level === 'blue' ? '#3b82f6' :
                        level.level === 'yellow' ? '#eab308' : '#8b5cf6'
            }))

            // Recent activities
            const recentActivities = learners.slice(0, 5).map((learner, index) => ({
                id: learner.id,
                learner: learner.name,
                action: index === 0 ? `completed ${learner.level} Level Module ${Math.floor(Math.random() * 5) + 1}` :
                    index === 1 ? `advanced to ${learner.level} Level` :
                        index === 2 ? 'enrolled as new learner' :
                            index === 3 ? `completed assessment with ${Math.floor(Math.random() * 20) + 80}% score` :
                                'scheduled next lesson for tomorrow',
                time: `${index * 2 + 2} hours ago`,
                icon: 'Target',
                color: ['text-green-500', 'text-blue-500', 'text-purple-500', 'text-orange-500', 'text-indigo-500'][index]
            }))

            return {
                dashboardStats: {
                    totalLearners: learners.length,
                    activeTutors: tutors.length,
                    avgLessonDuration: 47,
                    improvementRate: avgProgress,
                    monthlyGrowth: 12.3
                },
                performanceData,
                levelDistribution,
                recentActivities,
                activeLearners,
                atRiskLearners,
                completedLearners,
                avgProgress
            }
        } catch (error) {
            console.error('Error fetching dashboard stats:', error)
            throw error
        }
    }
}

// Utility functions for Firebase batch operations
export const batchService = {
    // Seed initial data
    async seedData() {
        const batch = writeBatch(db)

        // Sample tutors
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
                trend: 'up' as const,
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
                trend: 'up' as const,
                monthlyImprovement: 2.8,
                sessionsThisMonth: 54,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            }
        ]

        // Add tutors
        tutors.forEach((tutor, index) => {
            const tutorRef = doc(collection(db, 'tutors'))
            batch.set(tutorRef, tutor)
        })

        // Sample learners
        const learners = [
            {
                name: 'Emma Thompson',
                age: 7,
                level: 'PINK' as const,
                progress: 85,
                tutor: 'Sarah Johnson',
                tutorId: 'tutor1',
                lastSession: '2024-01-15',
                nextSession: '2024-01-22',
                status: 'ACTIVE' as const,
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
                level: 'BLUE' as const,
                progress: 72,
                tutor: 'Mike Chen',
                tutorId: 'tutor2',
                lastSession: '2024-01-14',
                nextSession: '2024-01-21',
                status: 'ACTIVE' as const,
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
            }
        ]

        // Add learners
        learners.forEach((learner) => {
            const learnerRef = doc(collection(db, 'learners'))
            batch.set(learnerRef, learner)
        })

        try {
            await batch.commit()
            console.log('Sample data seeded successfully!')
        } catch (error) {
            console.error('Error seeding data:', error)
            throw error
        }
    }
} 
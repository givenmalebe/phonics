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
  onSnapshot,
  DocumentData,
  QuerySnapshot,
  serverTimestamp
} from 'firebase/firestore'
import { db } from './firebase'
import { auth } from './firebase'

// School interface
export interface School {
  id: string
  name: string
  address: string
  principalName: string
  principalEmail: string
  principalPhone: string
  studentCount: number
  tutorCount: number
  isActive: boolean
  district: string
  province: string
  schoolType: 'primary' | 'secondary' | 'combined'
  studentCapacity: number
  contactEmail?: string
  contactPhone?: string
  website?: string
  description?: string
  createdDate: string
  updatedDate?: string
}

// Mock schools data for development/testing
const mockSchools: School[] = [
  {
    id: 'skeen-primary',
    name: 'Skeen Primary School',
    address: '123 Education Street, Johannesburg, 2000',
    principalName: 'Mrs. Sarah Johnson',
    principalEmail: 'principal@skeenprimary.edu',
    principalPhone: '+27 11 123 4567',
    studentCount: 380,
    tutorCount: 25,
    isActive: true,
    district: 'Johannesburg Central',
    province: 'Gauteng',
    schoolType: 'primary',
    studentCapacity: 500,
    createdDate: '2023-01-15'
  },
  {
    id: 'harmony-primary',
    name: 'Cater Primary School',
    address: '456 Learning Avenue, Pretoria, 0001',
    principalName: 'Mr. David Williams',
    principalEmail: 'principal@caterprimary.edu',
    principalPhone: '+27 12 234 5678',
    studentCount: 245,
    tutorCount: 18,
    isActive: true,
    district: 'Pretoria East',
    province: 'Gauteng',
    schoolType: 'primary',
    studentCapacity: 400,
    createdDate: '2023-02-20'
  },
  {
    id: 'sunrise-academy',
    name: 'Sunrise Academy',
    address: '789 Knowledge Road, Cape Town, 8000',
    principalName: 'Dr. Lisa Thompson',
    principalEmail: 'principal@sunriseacademy.edu',
    principalPhone: '+27 21 345 6789',
    studentCount: 312,
    tutorCount: 22,
    isActive: true,
    district: 'Cape Town Metro',
    province: 'Western Cape',
    schoolType: 'primary',
    studentCapacity: 450,
    createdDate: '2023-03-10'
  }
]

// Check if Firebase auth is available and user is authenticated
const isFirebaseAuthenticated = (): boolean => {
  try {
    return auth.currentUser !== null
  } catch (error) {
    return false
  }
}

// School service class
export class SchoolService {
  private static readonly COLLECTION_NAME = 'schools'
  private static mockSchoolsData: School[] = [...mockSchools]

  // Get all schools
  static async getAllSchools(): Promise<School[]> {
    try {
      // If not authenticated with Firebase, use mock data
      if (!isFirebaseAuthenticated()) {
        console.log('Using mock schools data (Firebase not authenticated)')
        return [...this.mockSchoolsData]
      }

      const schoolsRef = collection(db, this.COLLECTION_NAME)
      const q = query(schoolsRef, orderBy('name', 'asc'))
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as School))
    } catch (error) {
      console.error('Error fetching schools from Firebase, falling back to mock data:', error)
      return [...this.mockSchoolsData]
    }
  }

  // Get school by ID
  static async getSchoolById(id: string): Promise<School | null> {
    try {
      // If not authenticated with Firebase, use mock data
      if (!isFirebaseAuthenticated()) {
        return this.mockSchoolsData.find(school => school.id === id) || null
      }

      const schoolRef = doc(db, this.COLLECTION_NAME, id)
      const schoolSnap = await getDoc(schoolRef)
      
      if (schoolSnap.exists()) {
        return {
          id: schoolSnap.id,
          ...schoolSnap.data()
        } as School
      }
      return null
    } catch (error) {
      console.error('Error fetching school from Firebase, falling back to mock data:', error)
      return this.mockSchoolsData.find(school => school.id === id) || null
    }
  }

  // Add new school
  static async addSchool(schoolData: Omit<School, 'id'>): Promise<string> {
    try {
      // If not authenticated with Firebase, use mock data
      if (!isFirebaseAuthenticated()) {
        const newId = `school-${Date.now()}`
        const newSchool: School = {
          ...schoolData,
          id: newId
        }
        this.mockSchoolsData.push(newSchool)
        console.log('Added school to mock data:', newSchool)
        return newId
      }

      const schoolsRef = collection(db, this.COLLECTION_NAME)
      const docRef = await addDoc(schoolsRef, {
        ...schoolData,
        createdDate: serverTimestamp(),
        updatedDate: serverTimestamp()
      })
      
      return docRef.id
    } catch (error) {
      console.error('Error adding school to Firebase, falling back to mock data:', error)
      const newId = `school-${Date.now()}`
      const newSchool: School = {
        ...schoolData,
        id: newId
      }
      this.mockSchoolsData.push(newSchool)
      return newId
    }
  }

  // Update school
  static async updateSchool(id: string, updates: Partial<School>): Promise<void> {
    try {
      // If not authenticated with Firebase, use mock data
      if (!isFirebaseAuthenticated()) {
        const schoolIndex = this.mockSchoolsData.findIndex(school => school.id === id)
        if (schoolIndex !== -1) {
          this.mockSchoolsData[schoolIndex] = {
            ...this.mockSchoolsData[schoolIndex],
            ...updates,
            updatedDate: new Date().toISOString()
          }
          console.log('Updated school in mock data:', this.mockSchoolsData[schoolIndex])
        }
        return
      }

      const schoolRef = doc(db, this.COLLECTION_NAME, id)
      await updateDoc(schoolRef, {
        ...updates,
        updatedDate: serverTimestamp()
      })
    } catch (error) {
      console.error('Error updating school in Firebase, falling back to mock data:', error)
      const schoolIndex = this.mockSchoolsData.findIndex(school => school.id === id)
      if (schoolIndex !== -1) {
        this.mockSchoolsData[schoolIndex] = {
          ...this.mockSchoolsData[schoolIndex],
          ...updates,
          updatedDate: new Date().toISOString()
        }
      }
    }
  }

  // Delete school
  static async deleteSchool(id: string): Promise<void> {
    try {
      // If not authenticated with Firebase, use mock data
      if (!isFirebaseAuthenticated()) {
        this.mockSchoolsData = this.mockSchoolsData.filter(school => school.id !== id)
        console.log('Deleted school from mock data:', id)
        return
      }

      const schoolRef = doc(db, this.COLLECTION_NAME, id)
      await deleteDoc(schoolRef)
    } catch (error) {
      console.error('Error deleting school from Firebase, falling back to mock data:', error)
      this.mockSchoolsData = this.mockSchoolsData.filter(school => school.id !== id)
    }
  }

  // Subscribe to schools changes (real-time updates)
  static subscribeToSchools(callback: (schools: School[]) => void): () => void {
    try {
      // If not authenticated with Firebase, use mock data
      if (!isFirebaseAuthenticated()) {
        console.log('Using mock schools data for subscription (Firebase not authenticated)')
        callback([...this.mockSchoolsData])
        // Return a no-op unsubscribe function
        return () => {}
      }

      const schoolsRef = collection(db, this.COLLECTION_NAME)
      const q = query(schoolsRef, orderBy('name', 'asc'))
      
      return onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {
        const schools = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as School))
        callback(schools)
      }, (error) => {
        console.error('Error in schools subscription, falling back to mock data:', error)
        callback([...this.mockSchoolsData])
      })
    } catch (error) {
      console.error('Error setting up schools subscription, using mock data:', error)
      callback([...this.mockSchoolsData])
      return () => {}
    }
  }

  // Get schools by province
  static async getSchoolsByProvince(province: string): Promise<School[]> {
    try {
      // If not authenticated with Firebase, use mock data
      if (!isFirebaseAuthenticated()) {
        return this.mockSchoolsData.filter(school => school.province === province)
      }

      const schoolsRef = collection(db, this.COLLECTION_NAME)
      const q = query(schoolsRef, where('province', '==', province), orderBy('name', 'asc'))
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as School))
    } catch (error) {
      console.error('Error fetching schools by province from Firebase, falling back to mock data:', error)
      return this.mockSchoolsData.filter(school => school.province === province)
    }
  }

  // Get schools by district
  static async getSchoolsByDistrict(district: string): Promise<School[]> {
    try {
      // If not authenticated with Firebase, use mock data
      if (!isFirebaseAuthenticated()) {
        return this.mockSchoolsData.filter(school => school.district === district)
      }

      const schoolsRef = collection(db, this.COLLECTION_NAME)
      const q = query(schoolsRef, where('district', '==', district), orderBy('name', 'asc'))
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as School))
    } catch (error) {
      console.error('Error fetching schools by district from Firebase, falling back to mock data:', error)
      return this.mockSchoolsData.filter(school => school.district === district)
    }
  }

  // Initialize default schools (for first-time setup)
  static async initializeDefaultSchools(): Promise<void> {
    try {
      // If not authenticated with Firebase, use mock data
      if (!isFirebaseAuthenticated()) {
        console.log('Using mock schools data (Firebase not authenticated)')
        return
      }

      const existingSchools = await this.getAllSchools()
      
      if (existingSchools.length === 0) {
        const defaultSchools: Omit<School, 'id'>[] = [
          {
            name: 'Skeen Primary School',
            address: '123 Education Street, Johannesburg, 2000',
            principalName: 'Mrs. Sarah Johnson',
            principalEmail: 'principal@skeenprimary.edu',
            principalPhone: '+27 11 123 4567',
            studentCount: 380,
            tutorCount: 25,
            isActive: true,
            district: 'Johannesburg Central',
            province: 'Gauteng',
            schoolType: 'primary',
            studentCapacity: 500,
            createdDate: new Date().toISOString()
          },
          {
            name: 'Cater Primary School',
            address: '456 Learning Avenue, Pretoria, 0001',
            principalName: 'Mr. David Williams',
            principalEmail: 'principal@caterprimary.edu',
            principalPhone: '+27 12 234 5678',
            studentCount: 245,
            tutorCount: 18,
            isActive: true,
            district: 'Pretoria East',
            province: 'Gauteng',
            schoolType: 'primary',
            studentCapacity: 400,
            createdDate: new Date().toISOString()
          },
          {
            name: 'Sunrise Academy',
            address: '789 Knowledge Road, Cape Town, 8000',
            principalName: 'Dr. Lisa Thompson',
            principalEmail: 'principal@sunriseacademy.edu',
            principalPhone: '+27 21 345 6789',
            studentCount: 312,
            tutorCount: 22,
            isActive: true,
            district: 'Cape Town Metro',
            province: 'Western Cape',
            schoolType: 'primary',
            studentCapacity: 450,
            createdDate: new Date().toISOString()
          }
        ]

        for (const school of defaultSchools) {
          await this.addSchool(school)
        }
        
        console.log('Default schools initialized successfully')
      }
    } catch (error) {
      console.error('Error initializing default schools:', error)
      // Don't throw error, just log it
    }
  }
}

export default SchoolService

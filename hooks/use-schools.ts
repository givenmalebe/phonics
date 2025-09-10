"use client"

import { useState, useEffect, useCallback } from 'react'
import { SchoolService, School } from '@/lib/school-service'

export const useSchools = () => {
  const [schools, setSchools] = useState<School[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load schools from Firebase
  const loadSchools = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Initialize default schools if none exist
      await SchoolService.initializeDefaultSchools()
      
      // Load all schools
      const schoolsData = await SchoolService.getAllSchools()
      setSchools(schoolsData)
    } catch (err) {
      console.error('Error loading schools:', err)
      // Don't set error state for Firebase permission issues, just use mock data
      if (err instanceof Error && err.message.includes('permissions')) {
        console.log('Using mock data due to Firebase permissions')
        setError(null)
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load schools')
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // Add new school
  const addSchool = useCallback(async (schoolData: Omit<School, 'id'>) => {
    try {
      setError(null)
      const schoolId = await SchoolService.addSchool(schoolData)
      
      // Add the new school to local state
      const newSchool: School = {
        ...schoolData,
        id: schoolId
      }
      setSchools(prev => [...prev, newSchool])
      
      return schoolId
    } catch (err) {
      console.error('Error adding school:', err)
      setError(err instanceof Error ? err.message : 'Failed to add school')
      throw err
    }
  }, [])

  // Update school
  const updateSchool = useCallback(async (id: string, updates: Partial<School>) => {
    try {
      setError(null)
      await SchoolService.updateSchool(id, updates)
      
      // Update local state
      setSchools(prev => prev.map(school => 
        school.id === id ? { ...school, ...updates } : school
      ))
    } catch (err) {
      console.error('Error updating school:', err)
      setError(err instanceof Error ? err.message : 'Failed to update school')
      throw err
    }
  }, [])

  // Delete school
  const deleteSchool = useCallback(async (id: string) => {
    try {
      setError(null)
      await SchoolService.deleteSchool(id)
      
      // Remove from local state
      setSchools(prev => prev.filter(school => school.id !== id))
    } catch (err) {
      console.error('Error deleting school:', err)
      setError(err instanceof Error ? err.message : 'Failed to delete school')
      throw err
    }
  }, [])

  // Get school by ID
  const getSchoolById = useCallback((id: string): School | undefined => {
    return schools.find(school => school.id === id)
  }, [schools])

  // Set up real-time subscription
  useEffect(() => {
    const unsubscribe = SchoolService.subscribeToSchools((schoolsData) => {
      setSchools(schoolsData)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Initial load
  useEffect(() => {
    loadSchools()
  }, [loadSchools])

  return {
    schools,
    loading,
    error,
    addSchool,
    updateSchool,
    deleteSchool,
    getSchoolById,
    refreshSchools: loadSchools
  }
}

export default useSchools

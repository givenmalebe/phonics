"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from 'firebase/auth'
import { authService, type UserProfile } from '@/lib/auth-service'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (data: any) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    let loadingTimeout: NodeJS.Timeout | null = null
    
    const unsubscribe = authService.onAuthStateChange((authUser, userProfile) => {
      setUser(authUser)
      setProfile(userProfile)
      
      // Clear any existing timeout
      if (loadingTimeout) {
        clearTimeout(loadingTimeout)
      }
      
      // Add a small delay to ensure profile is fully loaded and prevent rapid state changes
      loadingTimeout = setTimeout(() => {
        setLoading(false)
      }, 150)
    })

    return () => {
      if (loadingTimeout) {
        clearTimeout(loadingTimeout)
      }
      unsubscribe()
    }
  }, [mounted])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      await authService.login(email, password)
    } finally {
      setLoading(false)
    }
  }

  const signup = async (data: any) => {
    setLoading(true)
    try {
      await authService.signup(data)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await authService.logout()
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (user && profile) {
      await authService.updateUserProfile(user.uid, updates)
    }
  }

  const value: AuthContextType = {
    user: mounted ? user : null,
    profile: mounted ? profile : null,
    loading: mounted ? loading : true,
    login,
    signup,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider 
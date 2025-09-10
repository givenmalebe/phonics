// Mock authentication for testing the user interfaces
// This is for development/testing only - remove in production

export interface MockUser {
  uid: string
  email: string
  firstName: string
  lastName: string
  role: 'ADMIN' | 'TUTOR'
  onboardingCompleted: boolean
}

// Mock test users
export const mockUsers: MockUser[] = [
  {
    uid: 'admin-1',
    email: 'admin@test.com',
    firstName: 'System',
    lastName: 'Administrator', 
    role: 'ADMIN',
    onboardingCompleted: true
  },
  {
    uid: 'tutor-1',
    email: 'jack@test.com',
    firstName: 'Jack',
    lastName: 'Chuene',
    role: 'TUTOR', 
    onboardingCompleted: true
  },
  {
    uid: 'tutor-2',
    email: 'sarah@test.com',
    firstName: 'Sarah',
    lastName: 'Williams',
    role: 'TUTOR',
    onboardingCompleted: true
  }
]

// Mock login function
export const mockLogin = (email: string, password: string): MockUser | null => {
  // Simple password check - in real app this would be handled by Firebase
  if (password !== 'test123') {
    throw new Error('Invalid password. Use "test123" for all test accounts.')
  }
  
  const user = mockUsers.find(u => u.email === email)
  if (!user) {
    throw new Error('User not found. Use one of the test emails.')
  }
  
  return user
}

// Get mock user profile
export const getMockUserProfile = (uid: string) => {
  const user = mockUsers.find(u => u.uid === uid)
  if (!user) return null
  
  return {
    uid: user.uid,
    email: user.email,
    displayName: `${user.firstName} ${user.lastName}`,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    phoneNumber: '+27 82 123 4567',
    isActive: true,
    isEmailVerified: true,
    onboardingCompleted: user.onboardingCompleted,
    preferences: {
      notifications: true,
      theme: 'light' as const,
      language: 'en'
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: new Date()
  }
}
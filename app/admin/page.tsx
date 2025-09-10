"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import {
  Users,
  GraduationCap,
  TrendingUp,
  BarChart3,
  BookOpen,
  Target,
  Award,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Settings,
  Bell,
  LogOut,
  Upload,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Activity,
  School,
  MapPin,
  Trophy
} from 'lucide-react'

import { useRouter } from 'next/navigation'
import { authService } from '@/lib/auth-service'
import SchoolSelector from '@/components/school-selector'
import AddStudentDialog from '@/components/add-student-dialog'
import AddSchoolDialog from '@/components/add-school-dialog'
import EditSchoolDialog from '@/components/edit-school-dialog'
import SchoolAnalytics from '@/components/school-analytics'
import EnhancedAnalytics from '@/components/enhanced-analytics'
import EnhancedSystem from '@/components/enhanced-system'
import TutorDetailsModal from '@/components/tutor-details-modal'
import { useSchools } from '@/hooks/use-schools'

// Schools data is now managed by the useSchools hook

// Mock data for individual schools - Replace with actual GraphQL queries
const mockSchoolData = {
  'skeen-primary': {
    systemStats: {
      totalTutors: 25,
      totalStudents: 380,
      activeSessions: 45,
      averageProgress: 82,
      completionRate: 78,
      newEnrollments: 12
    },
    tutors: [
      {
        id: "tutor-1",
        firstName: "Jack",
        lastName: "Chuene",
        email: "jack.chuene@stretcheducation.edu",
        phoneNumber: "+27 82 123 4567",
        studentCount: 15,
        averageProgress: 85,
        isActive: true,
        joinDate: "2023-08-15",
        lastLogin: "2024-01-16",
        schoolId: "skeen-primary"
      },
      {
        id: "tutor-2",
        firstName: "Sarah",
        lastName: "Williams",
        email: "sarah.williams@stretcheducation.edu",
        phoneNumber: "+27 83 234 5678",
        studentCount: 18,
        averageProgress: 79,
        isActive: true,
        joinDate: "2023-09-01",
        lastLogin: "2024-01-15",
        schoolId: "skeen-primary"
      },
      {
        id: "tutor-3",
        firstName: "Michael",
        lastName: "Johnson",
        email: "michael.johnson@stretcheducation.edu",
        phoneNumber: "+27 84 345 6789",
        studentCount: 12,
        averageProgress: 88,
        isActive: false,
        joinDate: "2023-07-20",
        lastLogin: "2024-01-10",
        schoolId: "skeen-primary"
      }
    ],
    students: [
      {
        id: "student-1",
        firstName: "Thabo",
        lastName: "Mthembu",
        grade: "3A",
        currentLevel: "PINK",
        progress: 75,
        tutorId: "tutor-1",
        tutor: "Jack Chuene",
        enrollmentDate: "2024-01-08",
        guardian: "Sarah Mthembu",
        isActive: true,
        schoolId: "skeen-primary",
        studentId: "SKE240001"
      },
      {
        id: "student-2",
        firstName: "Nomsa",
        lastName: "Dlamini",
        grade: "3B",
        currentLevel: "BLUE",
        progress: 60,
        tutorId: "tutor-2",
        tutor: "Sarah Williams",
        enrollmentDate: "2024-01-05",
        guardian: "Peter Dlamini",
        isActive: true,
        schoolId: "skeen-primary",
        studentId: "SKE240002"
      }
    ],
    analytics: {
      levelDistribution: [
        { level: "PINK", count: 120, percentage: 32 },
        { level: "BLUE", count: 95, percentage: 25 },
        { level: "YELLOW", count: 85, percentage: 22 },
        { level: "PURPLE", count: 80, percentage: 21 }
      ],
      gradeDistribution: [
        { grade: "3A", count: 95, tutors: 5 },
        { grade: "3B", count: 88, tutors: 4 },
        { grade: "3C", count: 92, tutors: 5 },
        { grade: "3D", count: 78, tutors: 4 },
        { grade: "3E", count: 67, tutors: 3 }
      ],
      monthlyProgress: [
        { month: "Sep", completion: 65 },
        { month: "Oct", completion: 72 },
        { month: "Nov", completion: 78 },
        { month: "Dec", completion: 82 },
        { month: "Jan", completion: 85 }
      ]
    }
  }
}

const levelColors = {
  PINK: "bg-pink-100 text-pink-800 border-pink-200",
  BLUE: "bg-blue-100 text-blue-800 border-blue-200",
  YELLOW: "bg-yellow-100 text-yellow-800 border-yellow-200",
  PURPLE: "bg-purple-100 text-purple-800 border-purple-200"
}

export default function AdminDashboard() {
  const router = useRouter()
  const [selectedTab, setSelectedTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false)
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false)
  const [isAddSchoolOpen, setIsAddSchoolOpen] = useState(false)
  const [isEditSchoolOpen, setIsEditSchoolOpen] = useState(false)
  const [editingSchool, setEditingSchool] = useState<any>(null)
  const [isTutorDetailsOpen, setIsTutorDetailsOpen] = useState(false)
  const [selectedTutor, setSelectedTutor] = useState<any>(null)
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null) // null = show all schools
  const [viewMode, setViewMode] = useState<'schools' | 'analytics'>('schools') // Toggle between schools and analytics
  const [schoolData, setSchoolData] = useState(mockSchoolData)

  // Use persistent school data
  const { schools, loading: schoolsLoading, error: schoolsError, addSchool, updateSchool, deleteSchool } = useSchools()

  const handleLogout = async () => {
    try {
      await authService.logout()
      router.replace('/landing')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleSchoolSelect = (schoolId: string) => {
    setSelectedSchoolId(schoolId)
  }

  const handleAddSchool = async (newSchoolData: any) => {
    try {
      console.log('Adding school:', newSchoolData)
      
      // Add to Firebase
      await addSchool(newSchoolData)
      
      // Initialize empty school data for the new school
      setSchoolData(prev => ({
        ...prev,
        [newSchoolData.id]: {
          systemStats: {
            totalTutors: 0,
            totalStudents: 0,
            activeSessions: 0,
            averageProgress: 0,
            completionRate: 0,
            newEnrollments: 0
          },
          tutors: [],
          students: [],
          analytics: {
            levelDistribution: [
              { level: "PINK", count: 0, percentage: 0 },
              { level: "BLUE", count: 0, percentage: 0 },
              { level: "YELLOW", count: 0, percentage: 0 },
              { level: "PURPLE", count: 0, percentage: 0 }
            ],
            gradeDistribution: [
              { grade: "3A", count: 0, tutors: 0 },
              { grade: "3B", count: 0, tutors: 0 },
              { grade: "3C", count: 0, tutors: 0 },
              { grade: "3D", count: 0, tutors: 0 },
              { grade: "3E", count: 0, tutors: 0 }
            ],
            monthlyProgress: [
              { month: "Sep", completion: 0 },
              { month: "Oct", completion: 0 },
              { month: "Nov", completion: 0 },
              { month: "Dec", completion: 0 },
              { month: "Jan", completion: 0 }
            ]
          }
        }
      }))
    } catch (error) {
      console.error('Error adding school:', error)
    }
  }

  const handleEditSchool = (school: any) => {
    setEditingSchool(school)
    setIsEditSchoolOpen(true)
  }

  const handleUpdateSchool = async (updatedSchool: any) => {
    try {
      console.log('Updating school:', updatedSchool)
      
      // Update in Firebase
      await updateSchool(updatedSchool.id, updatedSchool)
    } catch (error) {
      console.error('Error updating school:', error)
    }
  }

  const handleViewTutor = (tutor: any) => {
    console.log('Opening tutor details modal for:', tutor.firstName, tutor.lastName);
    setSelectedTutor(tutor)
    setIsTutorDetailsOpen(true)
  }

  const handleEditTutor = (tutor: any) => {
    const newFirstName = prompt('First Name:', tutor.firstName);
    if (!newFirstName) return;
    
    const newLastName = prompt('Last Name:', tutor.lastName);
    if (!newLastName) return;
    
    const newEmail = prompt('Email:', tutor.email);
    if (!newEmail) return;
    
    const newPhone = prompt('Phone Number:', tutor.phoneNumber);
    if (!newPhone) return;
    
    const updatedTutor = {
      ...tutor,
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      phoneNumber: newPhone,
      updatedDate: new Date().toISOString()
    };
    
    if (selectedSchoolId) {
      setSchoolData(prev => {
        const currentSchoolData = prev[selectedSchoolId];
        if (!currentSchoolData) return prev;
        
        return {
          ...prev,
          [selectedSchoolId]: {
            ...currentSchoolData,
            tutors: currentSchoolData.tutors.map(t => 
              t.id === tutor.id ? updatedTutor : t
            )
          }
        };
      });
      
      alert('✅ Tutor information updated successfully!');
    }
  }

  const handleDeleteTutor = async (tutorId: string) => {
    if (window.confirm('Are you sure you want to delete this tutor? This action cannot be undone.')) {
      console.log('Deleting tutor:', tutorId)
      
      if (selectedSchoolId) {
        setSchoolData(prev => ({
          ...prev,
          [selectedSchoolId]: {
            ...prev[selectedSchoolId],
            tutors: prev[selectedSchoolId].tutors.filter(tutor => tutor.id !== tutorId)
          }
        }))
      }
    }
  }

  const handleDeleteSchool = async (schoolId: string) => {
    if (window.confirm('Are you sure you want to delete this school? This action cannot be undone.')) {
      try {
        console.log('Deleting school:', schoolId)
        
        // Delete from Firebase/mock data
        await deleteSchool(schoolId)
        
        // Remove school data
        setSchoolData(prev => {
          const { [schoolId]: deleted, ...rest } = prev
          return rest
        })
        
        // If this was the selected school, deselect it
        if (selectedSchoolId === schoolId) {
          setSelectedSchoolId(null)
        }
      } catch (error) {
        console.error('Error deleting school:', error)
      }
    }
  }

  const handleAddStudent = async (studentData: any) => {
    if (!selectedSchoolId) return
    
    console.log('Adding student:', studentData)
    
    // For demo purposes, add to local state
    const currentSchoolData = schoolData[selectedSchoolId] || schoolData['skeen-primary']
    const updatedStudents = [...currentSchoolData.students, studentData]
    
    setSchoolData(prev => ({
      ...prev,
      [selectedSchoolId]: {
        ...currentSchoolData,
        students: updatedStudents,
        systemStats: {
          ...currentSchoolData.systemStats,
          totalStudents: currentSchoolData.systemStats.totalStudents + 1,
          newEnrollments: currentSchoolData.systemStats.newEnrollments + 1
        }
      }
    }))
    
    // Update school count in Firebase/mock data
    const currentSchool = schools.find(school => school.id === selectedSchoolId)
    if (currentSchool) {
      await updateSchool(selectedSchoolId, {
        studentCount: currentSchool.studentCount + 1
      })
    }
  }

  // Get current school data
  const currentSchoolData = selectedSchoolId ? schoolData[selectedSchoolId] || schoolData['skeen-primary'] : null
  const schoolTutors = currentSchoolData?.tutors || []
  const schoolStudents = currentSchoolData?.students || []

  // Show school boxes if no school is selected
  if (!selectedSchoolId) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Shield className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">School Management</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <Bell className="h-5 w-5" />
                </Button>
                
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                      A
                    </div>
                  </Avatar>
                  <div className="hidden md:block">
                    <p className="text-sm font-medium text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-500">System Administrator</p>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-8">
          <div className="text-center mb-8">
            <School className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Schools</h1>
            <p className="text-gray-600">Select a school to manage its students and tutors, or add a new school</p>
          </div>

          {/* Navigation and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
            {/* View Toggle */}
            <div className="flex space-x-4">
              <Button 
                variant={viewMode === 'schools' ? 'default' : 'outline'}
                onClick={() => setViewMode('schools')}
              >
                <School className="h-4 w-4 mr-2" />
                Schools
              </Button>
              <Button 
                variant={viewMode === 'analytics' ? 'default' : 'outline'}
                onClick={() => setViewMode('analytics')}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>

            {/* Add School Button */}
            {viewMode === 'schools' && (
              <Button onClick={() => setIsAddSchoolOpen(true)} size="lg">
                <Plus className="h-5 w-5 mr-2" />
                Add New School
              </Button>
            )}
          </div>

          {/* Content based on view mode */}
          {viewMode === 'schools' ? (
            /* Schools Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schools.map((school) => (
                <Card 
                  key={school.id} 
                  className="hover:shadow-lg transition-shadow border-2 hover:border-blue-300"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{school.name}</CardTitle>
                      {school.isActive && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {school.district}, {school.province}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600">{school.address}</p>
                      <p className="text-sm font-medium">Principal: {school.principalName}</p>
                      
                      <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Users className="h-4 w-4 text-blue-600" />
                            <span className="text-2xl font-bold text-blue-600">{school.studentCount}</span>
                          </div>
                          <p className="text-xs text-gray-500">Students</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <GraduationCap className="h-4 w-4 text-green-600" />
                            <span className="text-2xl font-bold text-green-600">{school.tutorCount}</span>
                          </div>
                          <p className="text-xs text-gray-500">Tutors</p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2 pt-3 border-t">
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={() => handleSchoolSelect(school.id)}
                        >
                          Manage School
                        </Button>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditSchool(school)
                            }}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteSchool(school.id)
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* Analytics View */
            <SchoolAnalytics schools={schools} schoolData={schoolData} />
          )}
        </div>

        {/* Add School Dialog */}
        <AddSchoolDialog
          isOpen={isAddSchoolOpen}
          onClose={() => setIsAddSchoolOpen(false)}
          onAddSchool={handleAddSchool}
        />

        {/* Edit School Dialog */}
        <EditSchoolDialog
          isOpen={isEditSchoolOpen}
          onClose={() => {
            setIsEditSchoolOpen(false)
            setEditingSchool(null)
          }}
          onUpdateSchool={handleUpdateSchool}
          school={editingSchool}
        />

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">System Administrator</p>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* School Selector */}
      <SchoolSelector 
        selectedSchoolId={selectedSchoolId} 
        onSchoolSelect={handleSchoolSelect} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tutors</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentSchoolData.systemStats.totalTutors}</div>
              <p className="text-xs text-muted-foreground">Active educators</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentSchoolData.systemStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Enrolled learners</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentSchoolData.systemStats.activeSessions}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentSchoolData.systemStats.averageProgress}%</div>
              <p className="text-xs text-muted-foreground">System-wide</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentSchoolData.systemStats.completionRate}%</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Enrollments</CardTitle>
              <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentSchoolData.systemStats.newEnrollments}</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tutors">Tutors</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Level Distribution</CardTitle>
                  <CardDescription>Students across Phono-Graphix levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentSchoolData.analytics.levelDistribution.map((level) => (
                      <div key={level.level} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge className={levelColors[level.level]}>{level.level}</Badge>
                          <span className="text-sm">{level.count} students</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-24">
                            <Progress value={level.percentage} className="h-2" />
                          </div>
                          <span className="text-sm font-medium w-12">{level.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Grade Distribution</CardTitle>
                  <CardDescription>Students and tutors by grade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {currentSchoolData.analytics.gradeDistribution.map((grade) => (
                      <div key={grade.grade} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">Grade {grade.grade}</Badge>
                          <span className="text-sm">{grade.count} students</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {grade.tutors} tutors
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Progress Trend</CardTitle>
                <CardDescription>System-wide completion rates over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentSchoolData.analytics.monthlyProgress.map((month) => (
                    <div key={month.month} className="flex items-center justify-between">
                      <span className="text-sm font-medium w-12">{month.month}</span>
                      <div className="flex-1 mx-4">
                        <Progress value={month.completion} className="h-3" />
                      </div>
                      <span className="text-sm font-medium w-12">{month.completion}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tutors Tab */}
          <TabsContent value="tutors" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search tutors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Dialog open={isCreateUserOpen} onOpenChange={setIsCreateUserOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tutor
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Tutor</DialogTitle>
                    <DialogDescription>
                      Create a new tutor account in the system.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" placeholder="John" />
                      </div>
                      <div>
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" placeholder="Doe" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john.doe@stretcheducation.edu" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="+27 82 123 4567" />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setIsCreateUserOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => setIsCreateUserOpen(false)}>
                        Create Tutor
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {schoolTutors.map((tutor) => (
                <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                            {tutor.firstName[0]}{tutor.lastName[0]}
                          </div>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-lg">{tutor.firstName} {tutor.lastName}</h4>
                          <p className="text-gray-600">{tutor.email}</p>
                          <p className="text-sm text-gray-500">{tutor.phoneNumber}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{tutor.studentCount}</p>
                          <p className="text-xs text-gray-500">Students</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{tutor.averageProgress}%</p>
                          <p className="text-xs text-gray-500">Avg Progress</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={tutor.isActive ? "default" : "secondary"}>
                            {tutor.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewTutor(tutor)}
                            title="View tutor's students with levels, progress, and durations"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditTutor(tutor)}
                            title="Edit tutor information"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="outline" title="More actions">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewTutor(tutor)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Students & Progress
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditTutor(tutor)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Tutor
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleDeleteTutor(tutor.id)}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Tutor
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Joined: {new Date(tutor.joinDate).toLocaleDateString()}</span>
                        <span>Last login: {new Date(tutor.lastLogin).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="3A">Grade 3A</SelectItem>
                    <SelectItem value="3B">Grade 3B</SelectItem>
                    <SelectItem value="3C">Grade 3C</SelectItem>
                    <SelectItem value="3D">Grade 3D</SelectItem>
                    <SelectItem value="3E">Grade 3E</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={() => setIsAddStudentOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {schoolStudents.map((student) => (
                <Card key={student.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                            {student.firstName[0]}{student.lastName[0]}
                          </div>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-lg">{student.firstName} {student.lastName}</h4>
                          <p className="text-gray-600">Grade {student.grade} • Tutor: {student.tutor}</p>
                          <p className="text-sm text-gray-500">Guardian: {student.guardian}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <Badge className={levelColors[student.currentLevel]}>
                          {student.currentLevel}
                        </Badge>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{student.progress}%</p>
                          <p className="text-xs text-gray-500">Progress</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}</span>
                        <Badge variant={student.isActive ? "default" : "secondary"}>
                          {student.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <EnhancedAnalytics 
              currentSchoolData={currentSchoolData} 
              selectedSchoolId={selectedSchoolId || 'skeen-primary'} 
            />
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <EnhancedSystem />
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Student Dialog */}
      <AddStudentDialog
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onAddStudent={handleAddStudent}
        tutors={schoolTutors}
        selectedSchoolId={selectedSchoolId}
      />

      {/* Tutor Details Modal */}
      <TutorDetailsModal
        isOpen={isTutorDetailsOpen}
        onClose={() => {
          setIsTutorDetailsOpen(false)
          setSelectedTutor(null)
        }}
        tutor={selectedTutor}
        students={schoolStudents}
      />
    </div>
  )
}
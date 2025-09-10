'use client';

import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Users, 
  Clock, 
  Calendar, 
  TrendingUp, 
  BookOpen, 
  Target, 
  Award,
  Phone,
  Mail,
  GraduationCap,
  Activity,
  X,
  Star,
  User,
  Shield,
  MapPin,
  ChevronRight,
  Trophy
} from 'lucide-react';

interface TutorDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tutor: any;
  students: any[];
}

export default function TutorDetailsModal({ 
  isOpen, 
  onClose, 
  tutor, 
  students 
}: TutorDetailsModalProps) {
  if (!tutor || !isOpen) return null;

  // Filter students assigned to this tutor
  const assignedStudents = students.filter(student => student.tutorId === tutor.id);

  // Calculate statistics
  const totalSessions = assignedStudents.reduce((sum, student) => sum + (student.sessionsCompleted || 0), 0);
  const averageProgress = assignedStudents.length > 0 
    ? Math.round(assignedStudents.reduce((sum, student) => sum + student.progress, 0) / assignedStudents.length)
    : 0;
  const totalHours = Math.round(totalSessions * 0.75);
  const retentionRate = Math.round((assignedStudents.filter(s => s.isActive).length / Math.max(assignedStudents.length, 1)) * 100);

  // Performance categorization
  const excellentStudents = assignedStudents.filter(s => s.progress >= 80);
  const goodStudents = assignedStudents.filter(s => s.progress >= 60 && s.progress < 80);
  const strugglingStudents = assignedStudents.filter(s => s.progress < 60);

  // Level distribution
  const levelCounts = assignedStudents.reduce((acc, student) => {
    const level = student.currentLevel || 'Unknown';
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Level color mapping
  const levelColors = {
    PINK: "bg-pink-100 text-pink-800 border-pink-200",
    BLUE: "bg-blue-100 text-blue-800 border-blue-200", 
    YELLOW: "bg-yellow-100 text-yellow-800 border-yellow-200",
    PURPLE: "bg-purple-100 text-purple-800 border-purple-200",
    Unknown: "bg-gray-100 text-gray-800 border-gray-200"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in-0 duration-300">
      <div className="bg-white rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden border border-gray-200 animate-in zoom-in-95 duration-300">
        {/* Enhanced Header */}
        <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 text-white overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-l from-white/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-20 w-20 border-4 border-white/30 shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl">
                  {tutor.firstName[0]}{tutor.lastName[0]}
                </div>
              </Avatar>
                {tutor.isActive && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                    {tutor.firstName} {tutor.lastName}
                  </h2>
                  <Shield className="h-6 w-6 text-blue-300" />
                </div>
                <p className="text-blue-100 font-medium text-lg flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Professional Tutor
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <Badge 
                    variant={tutor.isActive ? "default" : "secondary"} 
                    className={`${tutor.isActive 
                      ? 'bg-emerald-500/20 text-emerald-100 border-emerald-400/30 shadow-lg backdrop-blur-sm' 
                      : 'bg-slate-500/20 text-slate-100 border-slate-400/30'
                    } px-3 py-1 text-sm font-semibold`}
                  >
                    {tutor.isActive ? "● Active" : "○ Inactive"}
                  </Badge>
                  <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-100 border-blue-400/30 shadow-lg backdrop-blur-sm px-3 py-1 text-sm font-semibold">
                    <Users className="h-4 w-4 mr-1" />
                    {assignedStudents.length} Students
                  </Badge>
                  <Badge className="bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-100 border-orange-400/30 shadow-lg backdrop-blur-sm px-3 py-1 text-sm font-semibold">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    {averageProgress}% Avg
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Enhanced Close Button */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose} 
              className="text-white hover:bg-white/20 border border-white/20 rounded-full w-10 h-10 p-0 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Quick stats bar */}
          <div className="relative mt-6 pt-6 border-t border-white/20">
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{totalSessions}</div>
                <div className="text-xs text-blue-200 uppercase tracking-wide">Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{totalHours}h</div>
                <div className="text-xs text-blue-200 uppercase tracking-wide">Teaching</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{retentionRate}%</div>
                <div className="text-xs text-blue-200 uppercase tracking-wide">Retention</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{excellentStudents.length}</div>
                <div className="text-xs text-blue-200 uppercase tracking-wide">Excellent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Content */}
        <div className="p-8 overflow-y-auto max-h-[calc(95vh-240px)] bg-gradient-to-b from-gray-50/50 to-white">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-slate-100 to-gray-100 p-1 rounded-xl shadow-inner border">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-gray-200 transition-all duration-300 rounded-lg font-semibold"
              >
                <User className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="students" 
                className="data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-gray-200 transition-all duration-300 rounded-lg font-semibold"
              >
                <Users className="h-4 w-4 mr-2" />
                Students ({assignedStudents.length})
              </TabsTrigger>
              <TabsTrigger 
                value="performance" 
                className="data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-gray-200 transition-all duration-300 rounded-lg font-semibold"
              >
                <Target className="h-4 w-4 mr-2" />
                Performance
              </TabsTrigger>
              <TabsTrigger 
                value="analytics" 
                className="data-[state=active]:bg-white data-[state=active]:text-slate-800 data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-gray-200 transition-all duration-300 rounded-lg font-semibold"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Enhanced Overview Tab */}
            <TabsContent value="overview" className="space-y-8 animate-in fade-in-50 duration-500">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Enhanced Contact Information */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30 overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-cyan-500"></div>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-slate-800 text-xl">
                      <div className="p-2 bg-blue-100 rounded-xl">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      Contact Information
                    </CardTitle>
                    <CardDescription className="text-slate-600">Professional contact details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="group/item flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-blue-100/50 hover:border-blue-200 hover:shadow-md transition-all duration-200">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email Address</p>
                        <p className="font-semibold text-slate-700 group-hover/item:text-blue-600 transition-colors">{tutor.email}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover/item:text-blue-500 transition-colors" />
                    </div>
                    
                    <div className="group/item flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-green-100/50 hover:border-green-200 hover:shadow-md transition-all duration-200">
                      <div className="p-2 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Phone Number</p>
                        <p className="font-semibold text-slate-700 group-hover/item:text-green-600 transition-colors">{tutor.phoneNumber}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover/item:text-green-500 transition-colors" />
                    </div>
                    
                    <div className="group/item flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-purple-100/50 hover:border-purple-200 hover:shadow-md transition-all duration-200">
                      <div className="p-2 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Member Since</p>
                        <p className="font-semibold text-slate-700 group-hover/item:text-purple-600 transition-colors">{new Date(tutor.joinDate).toLocaleDateString()}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover/item:text-purple-500 transition-colors" />
                    </div>
                    
                    <div className="group/item flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-orange-100/50 hover:border-orange-200 hover:shadow-md transition-all duration-200">
                      <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg">
                        <Activity className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Last Active</p>
                        <p className="font-semibold text-slate-700 group-hover/item:text-orange-600 transition-colors">{new Date(tutor.lastLogin).toLocaleDateString()}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover/item:text-orange-500 transition-colors" />
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Key Metrics */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-green-50/30 overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-green-500 to-emerald-500"></div>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-slate-800 text-xl">
                      <div className="p-2 bg-green-100 rounded-xl">
                        <Target className="h-6 w-6 text-green-600" />
                      </div>
                      Performance Metrics
                    </CardTitle>
                    <CardDescription className="text-slate-600">Key teaching performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="group/metric text-center p-6 bg-gradient-to-br from-blue-50 via-blue-100/50 to-cyan-50 rounded-2xl border border-blue-200/50 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl w-fit mx-auto mb-4 shadow-lg group-hover/metric:scale-110 transition-transform duration-300">
                          <Users className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">{assignedStudents.length}</p>
                        <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Students</p>
                      </div>
                      
                      <div className="group/metric text-center p-6 bg-gradient-to-br from-green-50 via-green-100/50 to-emerald-50 rounded-2xl border border-green-200/50 hover:border-green-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl w-fit mx-auto mb-4 shadow-lg group-hover/metric:scale-110 transition-transform duration-300">
                          <TrendingUp className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">{averageProgress}%</p>
                        <p className="text-sm font-semibold text-green-700 uppercase tracking-wide">Progress</p>
                      </div>
                      
                      <div className="group/metric text-center p-6 bg-gradient-to-br from-orange-50 via-orange-100/50 to-amber-50 rounded-2xl border border-orange-200/50 hover:border-orange-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl w-fit mx-auto mb-4 shadow-lg group-hover/metric:scale-110 transition-transform duration-300">
                          <BookOpen className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-1">{totalSessions}</p>
                        <p className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Sessions</p>
                      </div>
                      
                      <div className="group/metric text-center p-6 bg-gradient-to-br from-purple-50 via-purple-100/50 to-violet-50 rounded-2xl border border-purple-200/50 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-500 rounded-2xl w-fit mx-auto mb-4 shadow-lg group-hover/metric:scale-110 transition-transform duration-300">
                          <Clock className="h-8 w-8 text-white" />
                        </div>
                        <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent mb-1">{totalHours}h</p>
                        <p className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Teaching</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Enhanced Students Tab - Admin Modal Focus */}
            <TabsContent value="students" className="space-y-6 animate-in fade-in-50 duration-500">
              {assignedStudents.length === 0 ? (
                <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-white">
                  <CardContent className="p-16 text-center">
                    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
                      <Users className="h-16 w-16 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-700 mb-3">No Students Assigned</h3>
                    <p className="text-gray-500 text-lg max-w-md mx-auto">This tutor doesn't have any students assigned yet. Students will appear here once assigned.</p>
                  </CardContent>
                </Card>
              ) : (
                <>
                  {/* Quick Summary Stats for Modal */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">{assignedStudents.length}</div>
                      <div className="text-sm text-blue-700 font-medium">Total Students</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center border border-green-200">
                      <div className="text-2xl font-bold text-green-600">{excellentStudents.length}</div>
                      <div className="text-sm text-green-700 font-medium">Excellent (80%+)</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center border border-orange-200">
                      <div className="text-2xl font-bold text-orange-600">{totalSessions}</div>
                      <div className="text-sm text-orange-700 font-medium">Total Sessions</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200">
                      <div className="text-2xl font-bold text-purple-600">{totalHours}h</div>
                      <div className="text-sm text-purple-700 font-medium">Teaching Hours</div>
                    </div>
                  </div>

                  {/* Students List - Optimized for Modal */}
                  <div className="space-y-4">
                    {assignedStudents.map((student) => (
                      <Card key={student.id} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-400 hover:border-l-blue-600">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between">
                            {/* Student Info */}
                            <div className="flex items-center space-x-4 flex-1">
                              <Avatar className="h-12 w-12 border-2 border-gray-200">
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                                  {student.firstName[0]}{student.lastName[0]}
                                </div>
                              </Avatar>
                              
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <h4 className="font-bold text-lg text-slate-800">{student.firstName} {student.lastName}</h4>
                                  <Badge className={`${levelColors[student.currentLevel as keyof typeof levelColors] || levelColors.Unknown} font-semibold`}>
                                    {student.currentLevel || 'Unknown'}
                                  </Badge>
                                  {student.progress >= 80 && (
                                    <Badge className="bg-green-100 text-green-800 border-green-200 font-semibold">
                                      <Star className="h-3 w-3 mr-1" />
                                      Top Performer
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-slate-600">
                                  <span className="flex items-center gap-1">
                                    <GraduationCap className="h-4 w-4" />
                                    Grade {student.grade}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <User className="h-4 w-4" />
                                    {student.guardian}
                                  </span>
                                  <span className="text-slate-500">ID: {student.studentId}</span>
                                </div>
                              </div>
                            </div>

                            {/* Progress & Stats */}
                            <div className="flex items-center gap-6">
                              {/* Progress Bar */}
                              <div className="w-32">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-slate-600">Progress</span>
                                  <span className="font-bold text-blue-600">{student.progress}%</span>
                                </div>
                                <Progress value={student.progress} className="h-2" />
                              </div>

                              {/* Key Stats */}
                              <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="bg-blue-50 p-3 rounded-lg min-w-0">
                                  <div className="text-lg font-bold text-blue-600">{student.sessionsCompleted || 0}</div>
                                  <div className="text-xs text-blue-700 uppercase tracking-wide">Sessions</div>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg min-w-0">
                                  <div className="text-lg font-bold text-green-600">{Math.round((student.sessionsCompleted || 0) * 0.75)}h</div>
                                  <div className="text-xs text-green-700 uppercase tracking-wide">Duration</div>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg min-w-0">
                                  <div className="text-lg font-bold text-purple-600">{student.isActive ? '✓' : '✗'}</div>
                                  <div className="text-xs text-purple-700 uppercase tracking-wide">Active</div>
                                </div>
                              </div>

                              {/* Status Indicator */}
                              <div className="flex flex-col items-center">
                                <div className={`w-3 h-3 rounded-full ${student.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                <span className="text-xs text-slate-500 mt-1">{student.isActive ? 'Active' : 'Inactive'}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Additional Info */}
                          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between text-sm text-slate-500">
                            <span>Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}</span>
                            <span>Last Session: {new Date(student.enrollmentDate).toLocaleDateString()}</span>
                          </div>
                        </CardContent>
                      </Card>
                  ))}
                </div>
                </>
              )}
            </TabsContent>

            {/* Enhanced Performance Tab */}
            <TabsContent value="performance" className="space-y-8 animate-in fade-in-50 duration-500">
              {/* Performance Overview Header */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Performance Analysis</h3>
                <p className="text-slate-600">Detailed breakdown of student performance and learning outcomes</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Excellent Students */}
                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-green-50/30 overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-green-500 to-emerald-500"></div>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-green-700 text-lg">
                      <div className="p-2 bg-green-100 rounded-xl">
                        <Star className="h-6 w-6 text-green-600" />
                      </div>
                      Excellent Students
                    </CardTitle>
                    <CardDescription className="text-green-600 font-medium">80%+ Progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-200/50">
                        <p className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">{excellentStudents.length}</p>
                        <p className="text-sm text-green-700 font-semibold">out of {assignedStudents.length} students</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-slate-600">Performance Rate</span>
                          <span className="font-bold text-green-600">{assignedStudents.length > 0 ? Math.round((excellentStudents.length / assignedStudents.length) * 100) : 0}%</span>
                        </div>
                        <Progress 
                          value={assignedStudents.length > 0 ? (excellentStudents.length / assignedStudents.length) * 100 : 0} 
                          className="h-3 bg-green-100" 
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Good Students */}
                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-yellow-50/30 overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-yellow-500 to-orange-500"></div>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-yellow-700 text-lg">
                      <div className="p-2 bg-yellow-100 rounded-xl">
                        <TrendingUp className="h-6 w-6 text-yellow-600" />
                      </div>
                      Good Students
                    </CardTitle>
                    <CardDescription className="text-yellow-600 font-medium">60-79% Progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200/50">
                        <p className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">{goodStudents.length}</p>
                        <p className="text-sm text-yellow-700 font-semibold">out of {assignedStudents.length} students</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-slate-600">Performance Rate</span>
                          <span className="font-bold text-yellow-600">{assignedStudents.length > 0 ? Math.round((goodStudents.length / assignedStudents.length) * 100) : 0}%</span>
                        </div>
                        <Progress 
                          value={assignedStudents.length > 0 ? (goodStudents.length / assignedStudents.length) * 100 : 0} 
                          className="h-3 bg-yellow-100" 
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Students Needing Support */}
                <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-red-50/30 overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-red-500 to-pink-500"></div>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-red-700 text-lg">
                      <div className="p-2 bg-red-100 rounded-xl">
                        <Target className="h-6 w-6 text-red-600" />
                      </div>
                      Need Support
                    </CardTitle>
                    <CardDescription className="text-red-600 font-medium">&lt;60% Progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl border border-red-200/50">
                        <p className="text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-2">{strugglingStudents.length}</p>
                        <p className="text-sm text-red-700 font-semibold">out of {assignedStudents.length} students</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-slate-600">Requires Attention</span>
                          <span className="font-bold text-red-600">{assignedStudents.length > 0 ? Math.round((strugglingStudents.length / assignedStudents.length) * 100) : 0}%</span>
                        </div>
                        <Progress 
                          value={assignedStudents.length > 0 ? (strugglingStudents.length / assignedStudents.length) * 100 : 0} 
                          className="h-3 bg-red-100" 
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Performance Insights */}
              {strugglingStudents.length > 0 && (
                <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 border-l-4 border-l-orange-500">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-orange-800">
                      <div className="p-2 bg-orange-100 rounded-xl">
                        <Target className="h-5 w-5 text-orange-600" />
                      </div>
                      Intervention Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <p className="text-orange-800 font-medium">Students requiring additional support:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {strugglingStudents.slice(0, 4).map(student => (
                          <div key={student.id} className="bg-white/60 p-3 rounded-lg border border-orange-200 flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <div className="w-full h-full bg-gradient-to-br from-red-400 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                                {student.firstName[0]}{student.lastName[0]}
                              </div>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-sm text-slate-800">{student.firstName} {student.lastName}</p>
                              <p className="text-xs text-orange-600">{student.progress}% progress</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Enhanced Analytics Tab */}
            <TabsContent value="analytics" className="space-y-8 animate-in fade-in-50 duration-500">
              {/* Analytics Overview Header */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Advanced Analytics</h3>
                <p className="text-slate-600">Comprehensive insights into teaching effectiveness and student distribution</p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Enhanced Level Distribution */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/30 overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-purple-500 to-indigo-500"></div>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-purple-700 text-xl">
                      <div className="p-2 bg-purple-100 rounded-xl">
                        <GraduationCap className="h-6 w-6 text-purple-600" />
                      </div>
                      Level Distribution
                    </CardTitle>
                    <CardDescription className="text-purple-600">Student progress across Phono-Graphix levels</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {Object.entries(levelCounts).map(([level, count]) => {
                      const studentCount = count as number;
                      return (
                        <div key={level} className="group/level p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-200">
                          <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                              <Badge className={`${levelColors[level as keyof typeof levelColors] || levelColors.Unknown} font-semibold shadow-sm`}>
                            {level}
                          </Badge>
                              <span className="font-semibold text-slate-700">{studentCount} student{studentCount !== 1 ? 's' : ''}</span>
                            </div>
                            <span className="text-sm font-bold text-purple-600">
                              {assignedStudents.length > 0 ? Math.round((studentCount / assignedStudents.length) * 100) : 0}%
                            </span>
                          </div>
                          <div className="w-full">
                            <Progress 
                              value={assignedStudents.length > 0 ? (studentCount / assignedStudents.length) * 100 : 0} 
                              className="h-3 bg-gray-200" 
                            />
                        </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Enhanced Teaching Metrics */}
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/30 overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-cyan-500"></div>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-blue-700 text-xl">
                      <div className="p-2 bg-blue-100 rounded-xl">
                        <Award className="h-6 w-6 text-blue-600" />
                      </div>
                      Teaching Metrics
                    </CardTitle>
                    <CardDescription className="text-blue-600">Key performance indicators and effectiveness measures</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {/* Student Retention Rate */}
                    <div className="group/metric p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-md">
                            <Users className="h-5 w-5 text-white" />
                          </div>
                          <span className="font-semibold text-slate-700">Student Retention Rate</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">{retentionRate}%</span>
                      </div>
                    </div>

                    {/* Session Completion */}
                    <div className="group/metric p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200/50 hover:border-green-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-md">
                            <BookOpen className="h-5 w-5 text-white" />
                          </div>
                          <span className="font-semibold text-slate-700">Session Completion</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">92%</span>
                      </div>
                    </div>

                    {/* Teaching Efficiency */}
                    <div className="group/metric p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200/50 hover:border-yellow-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg shadow-md">
                            <TrendingUp className="h-5 w-5 text-white" />
                          </div>
                          <span className="font-semibold text-slate-700">Teaching Efficiency</span>
                        </div>
                        <span className={`text-2xl font-bold ${
                          averageProgress > 70 ? 'text-green-600' : 
                          averageProgress > 50 ? 'text-yellow-600' : 'text-orange-600'
                        }`}>
                          {averageProgress > 70 ? 'High' : averageProgress > 50 ? 'Medium' : 'Improving'}
                        </span>
                      </div>
                    </div>

                    {/* Total Teaching Hours */}
                    <div className="group/metric p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-200/50 hover:border-purple-300 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg shadow-md">
                            <Clock className="h-5 w-5 text-white" />
                          </div>
                          <span className="font-semibold text-slate-700">Total Teaching Hours</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">{totalHours}h</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Summary */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-slate-50 to-gray-50 overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-slate-500 to-gray-500"></div>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-slate-800">
                    <div className="p-2 bg-slate-100 rounded-xl">
                      <Trophy className="h-6 w-6 text-slate-600" />
                    </div>
                    Performance Summary
                  </CardTitle>
                  <CardDescription>Overall teaching effectiveness and impact assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{Math.round(averageProgress)}%</div>
                      <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Overall Progress</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <div className="text-3xl font-bold text-green-600 mb-2">{Math.round((excellentStudents.length / Math.max(assignedStudents.length, 1)) * 100)}%</div>
                      <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Excellence Rate</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{retentionRate}%</div>
                      <div className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Retention Rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

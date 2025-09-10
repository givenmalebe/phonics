'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, GraduationCap, TrendingUp, Trophy, School, Target, Award, Activity } from 'lucide-react';

interface SchoolAnalyticsProps {
  schools: any[];
  schoolData: any;
}

export default function SchoolAnalytics({ schools, schoolData }: SchoolAnalyticsProps) {
  // Calculate overall statistics
  const totalStudents = schools.reduce((sum, school) => sum + school.studentCount, 0);
  const totalTutors = schools.reduce((sum, school) => sum + school.tutorCount, 0);
  const totalCapacity = schools.reduce((sum, school) => sum + school.studentCapacity, 0);
  const utilizationRate = Math.round((totalStudents / totalCapacity) * 100);

  // Find best performing school
  const schoolPerformanceData = schools.map(school => {
    const data = schoolData[school.id];
    const avgProgress = data?.systemStats?.averageProgress || 0;
    const completionRate = data?.systemStats?.completionRate || 0;
    const studentTutorRatio = school.studentCount / (school.tutorCount || 1);
    
    // Calculate performance score
    const performanceScore = Math.round(
      (avgProgress * 0.4) + 
      (completionRate * 0.4) + 
      (Math.max(0, 100 - studentTutorRatio * 2) * 0.2)
    );

    return {
      ...school,
      avgProgress,
      completionRate,
      studentTutorRatio: Math.round(studentTutorRatio * 10) / 10,
      performanceScore
    };
  });

  const bestPerformingSchool = schoolPerformanceData.reduce((best, current) => 
    current.performanceScore > best.performanceScore ? current : best
  );

  // Provincial distribution
  const provincialData = schools.reduce((acc, school) => {
    acc[school.province] = (acc[school.province] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const provincialChartData = Object.entries(provincialData).map(([province, count]) => ({
    province,
    count
  }));

  // School type distribution
  const schoolTypeData = schools.reduce((acc, school) => {
    acc[school.schoolType] = (acc[school.schoolType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const schoolTypeChartData = Object.entries(schoolTypeData).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count
  }));

  // Student distribution by school
  const studentDistributionData = schools.map(school => ({
    name: school.name.length > 15 ? school.name.substring(0, 15) + '...' : school.name,
    students: school.studentCount,
    tutors: school.tutorCount,
    capacity: school.studentCapacity,
    utilization: Math.round((school.studentCount / school.studentCapacity) * 100)
  }));

  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="space-y-6">
      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Schools</CardTitle>
            <School className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schools.length}</div>
            <p className="text-xs text-muted-foreground">Registered schools</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all schools</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tutors</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTutors}</div>
            <p className="text-xs text-muted-foreground">Active educators</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacity Usage</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{utilizationRate}%</div>
            <p className="text-xs text-muted-foreground">Of total capacity</p>
          </CardContent>
        </Card>
      </div>

      {/* Best Performing School */}
      <Card className="border-2 border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            Best Performing School
          </CardTitle>
          <CardDescription>Highest overall performance score</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold text-yellow-800 mb-2">{bestPerformingSchool.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{bestPerformingSchool.district}, {bestPerformingSchool.province}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Performance Score</span>
                  <Badge className="bg-yellow-600 text-white">{bestPerformingSchool.performanceScore}/100</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Average Progress</span>
                  <span className="font-medium">{bestPerformingSchool.avgProgress}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Completion Rate</span>
                  <span className="font-medium">{bestPerformingSchool.completionRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Student-Tutor Ratio</span>
                  <span className="font-medium">{bestPerformingSchool.studentTutorRatio}:1</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Students</span>
                  <span className="text-sm">{bestPerformingSchool.studentCount}/{bestPerformingSchool.studentCapacity}</span>
                </div>
                <Progress value={(bestPerformingSchool.studentCount / bestPerformingSchool.studentCapacity) * 100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Tutors</span>
                  <span className="text-sm">{bestPerformingSchool.tutorCount} active</span>
                </div>
                <Progress value={Math.min(100, (bestPerformingSchool.tutorCount / 30) * 100)} className="h-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* School Performance Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>School Performance Comparison</CardTitle>
          <CardDescription>Performance scores across all schools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schoolPerformanceData
              .sort((a, b) => b.performanceScore - a.performanceScore)
              .map((school, index) => (
                <div key={school.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                      <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-medium">{school.name}</h4>
                      <p className="text-sm text-gray-600">{school.district}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Students</p>
                      <p className="font-bold">{school.studentCount}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Progress</p>
                      <p className="font-bold">{school.avgProgress}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Score</p>
                      <Badge variant={index === 0 ? "default" : "secondary"}>
                        {school.performanceScore}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Student Distribution by School</CardTitle>
            <CardDescription>Current enrollment vs capacity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="students" fill="#3b82f6" name="Students" />
                <Bar dataKey="capacity" fill="#e5e7eb" name="Capacity" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Provincial Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Schools by Province</CardTitle>
            <CardDescription>Geographic distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={provincialChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ province, count }) => `${province}: ${count}`}
                >
                  {provincialChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* School Types */}
        <Card>
          <CardHeader>
            <CardTitle>School Types</CardTitle>
            <CardDescription>Distribution by education level</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={schoolTypeChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Capacity Utilization */}
        <Card>
          <CardHeader>
            <CardTitle>Capacity Utilization</CardTitle>
            <CardDescription>How efficiently schools are using their capacity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(value) => [`${value}%`, 'Utilization']} />
                <Bar dataKey="utilization" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

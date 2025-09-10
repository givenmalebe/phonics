'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, GraduationCap, BookOpen, Target, Award, Activity, Clock, Calendar, Download, Filter, AlertCircle } from 'lucide-react';

interface EnhancedAnalyticsProps {
  currentSchoolData: any;
  selectedSchoolId: string;
}

export default function EnhancedAnalytics({ currentSchoolData, selectedSchoolId }: EnhancedAnalyticsProps) {
  // Sample data for charts
  const performanceData = [
    { month: 'Aug', students: 320, tutors: 22, sessions: 180, completion: 78 },
    { month: 'Sep', students: 340, tutors: 24, sessions: 195, completion: 82 },
    { month: 'Oct', students: 360, tutors: 25, sessions: 210, completion: 85 },
    { month: 'Nov', students: 375, tutors: 25, sessions: 225, completion: 88 },
    { month: 'Dec', students: 380, tutors: 25, sessions: 240, completion: 90 },
    { month: 'Jan', students: 380, tutors: 25, sessions: 250, completion: 92 }
  ];

  const levelProgressData = [
    { level: 'PINK', completed: 95, inProgress: 25, notStarted: 10 },
    { level: 'BLUE', completed: 78, inProgress: 32, notStarted: 15 },
    { level: 'YELLOW', completed: 62, inProgress: 28, notStarted: 25 },
    { level: 'PURPLE', completed: 45, inProgress: 20, notStarted: 35 }
  ];

  const sessionTypesData = [
    { type: 'Individual', count: 120, color: '#3b82f6' },
    { type: 'Group', count: 85, color: '#10b981' },
    { type: 'Assessment', count: 45, color: '#f59e0b' },
    { type: 'Review', count: 30, color: '#ef4444' }
  ];

  const weeklyActivityData = [
    { day: 'Mon', sessions: 45, attendance: 92 },
    { day: 'Tue', sessions: 52, attendance: 88 },
    { day: 'Wed', sessions: 48, attendance: 94 },
    { day: 'Thu', sessions: 50, attendance: 90 },
    { day: 'Fri', sessions: 47, attendance: 87 },
    { day: 'Sat', sessions: 25, attendance: 95 },
    { day: 'Sun', sessions: 15, attendance: 98 }
  ];

  const kpiData = [
    {
      title: 'Student Retention',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      description: 'vs last month',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Session Completion',
      value: '92.5%',
      change: '+4.3%',
      trend: 'up',
      description: 'vs last month',
      icon: Target,
      color: 'text-blue-600'
    },
    {
      title: 'Tutor Utilization',
      value: '87.8%',
      change: '-1.2%',
      trend: 'down',
      description: 'vs last month',
      icon: GraduationCap,
      color: 'text-orange-600'
    },
    {
      title: 'Average Progress',
      value: '89.6%',
      change: '+5.7%',
      trend: 'up',
      description: 'vs last month',
      icon: TrendingUp,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with filters and export */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">School Analytics</h2>
          <p className="text-gray-600">Comprehensive performance insights and metrics</p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="30d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-2xl font-bold text-gray-900">{kpi.value}</span>
                    <div className={`flex items-center text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                      {kpi.change}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{kpi.description}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-50 ${kpi.color}`}>
                  <kpi.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${kpi.trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`} />
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Performance Trends
            </CardTitle>
            <CardDescription>Monthly progress across key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="completion" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.2} 
                  name="Completion Rate (%)"
                />
                <Area 
                  type="monotone" 
                  dataKey="sessions" 
                  stroke="#10b981" 
                  fill="#10b981" 
                  fillOpacity={0.2} 
                  name="Sessions"
                />
                <Area 
                  type="monotone" 
                  dataKey="students" 
                  stroke="#f59e0b" 
                  fill="#f59e0b" 
                  fillOpacity={0.2} 
                  name="Students"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Level Progress Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Level Progress Analysis
            </CardTitle>
            <CardDescription>Student distribution across phonics levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={levelProgressData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" fontSize={12} />
                <YAxis dataKey="level" type="category" fontSize={12} />
                <Tooltip />
                <Bar dataKey="completed" stackId="a" fill="#10b981" name="Completed" />
                <Bar dataKey="inProgress" stackId="a" fill="#f59e0b" name="In Progress" />
                <Bar dataKey="notStarted" stackId="a" fill="#ef4444" name="Not Started" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Session Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Session Types
            </CardTitle>
            <CardDescription>Distribution of different session types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sessionTypesData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ type, count }) => `${type}: ${count}`}
                >
                  {sessionTypesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity & Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Activity Pattern
            </CardTitle>
            <CardDescription>Sessions and attendance by day of week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="sessions" fill="#3b82f6" name="Sessions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Detailed Metrics
            </CardTitle>
            <CardDescription>Additional performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Session Duration</span>
                <span className="font-semibold">42 min</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Student Satisfaction</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">4.8/5</span>
                  <Badge variant="secondary" className="text-xs">+0.3</Badge>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Material Completion</span>
                <div className="flex items-center gap-2">
                  <Progress value={87} className="w-16 h-2" />
                  <span className="font-semibold text-sm">87%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Homework Submission</span>
                <div className="flex items-center gap-2">
                  <Progress value={92} className="w-16 h-2" />
                  <span className="font-semibold text-sm">92%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Parent Engagement</span>
                <div className="flex items-center gap-2">
                  <Progress value={78} className="w-16 h-2" />
                  <span className="font-semibold text-sm">78%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Technology Adoption</span>
                <div className="flex items-center gap-2">
                  <Progress value={95} className="w-16 h-2" />
                  <span className="font-semibold text-sm">95%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Insights & Recommendations
          </CardTitle>
          <CardDescription>AI-powered insights based on recent performance data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Positive Trend</span>
              </div>
              <p className="text-sm text-green-700">Student completion rates have increased by 12% this month, indicating improved engagement.</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">Recommendation</span>
              </div>
              <p className="text-sm text-blue-700">Consider adding more group sessions on Tuesdays and Thursdays when attendance peaks.</p>
            </div>
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-800">Action Required</span>
              </div>
              <p className="text-sm text-orange-700">3 students in PURPLE level need additional support to maintain progress momentum.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ComposedChart,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Users, BookOpen, Clock, TrendingUp, Award, Target, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { dashboardService } from "@/lib/firebase-service"

const performanceData = [
  { level: "Pink", completed: 85, total: 100 },
  { level: "Blue", completed: 72, total: 100 },
  { level: "Yellow", completed: 45, total: 100 },
  { level: "Purple", completed: 23, total: 100 },
]

const tutorPerformanceData = [
  { name: "Sarah Johnson", learnersEnrolled: 15, learnersCompleted: 12, avgImprovement: 78 },
  { name: "Mike Chen", learnersEnrolled: 10, learnersCompleted: 8, avgImprovement: 82 },
  { name: "Emily Davis", learnersEnrolled: 18, learnersCompleted: 15, avgImprovement: 75 },
  { name: "David Wilson", learnersEnrolled: 12, learnersCompleted: 10, avgImprovement: 80 },
]

const lessonDurationData = [
  { day: "Mon", duration: 45 },
  { day: "Tue", duration: 52 },
  { day: "Wed", duration: 48 },
  { day: "Thu", duration: 55 },
  { day: "Fri", duration: 42 },
  { day: "Sat", duration: 38 },
  { day: "Sun", duration: 35 },
]

const levelDistribution = [
  { name: "Pink Level", value: 45, color: "#ec4899" },
  { name: "Blue Level", value: 32, color: "#3b82f6" },
  { name: "Yellow Level", value: 18, color: "#eab308" },
  { name: "Purple Level", value: 8, color: "#8b5cf6" },
]

const weeklyProgressData = [
  { week: "Week 1", improvement: 10 },
  { week: "Week 2", improvement: 18 },
  { week: "Week 3", improvement: 25 },
  { week: "Week 4", improvement: 32 },
  { week: "Week 5", improvement: 38 },
  { week: "Week 6", improvement: 45 },
  { week: "Week 7", improvement: 52 },
  { week: "Week 8", improvement: 60 },
]

const recentActivities = [
  {
    id: 1,
    learner: "Emma Thompson",
    action: "completed Pink Level Module 5",
    time: "2 hours ago",
    icon: Target,
    color: "text-green-500",
  },
  {
    id: 2,
    learner: "Jake Miller",
    action: "advanced to Blue Level",
    time: "4 hours ago",
    icon: Award,
    color: "text-blue-500",
  },
  {
    id: 3,
    learner: "Sophia Chen",
    action: "enrolled as new learner",
    time: "6 hours ago",
    icon: Users,
    color: "text-purple-500",
  },
  {
    id: 4,
    learner: "Lucas Rodriguez",
    action: "completed assessment with 92% score",
    time: "8 hours ago",
    icon: Target,
    color: "text-orange-500",
  },
  {
    id: 5,
    learner: "Ava Johnson",
    action: "scheduled next lesson for tomorrow",
    time: "10 hours ago",
    icon: Calendar,
    color: "text-indigo-500",
  },
]

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState("week")
  const [selectedTab, setSelectedTab] = useState("overview")
  const [user, setUser] = useState<any>(null)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/landing")
      return
    }
    setUser(JSON.parse(userData))
    fetchDashboardData()
  }, [router])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      const data = await dashboardService.getStats()
      setDashboardData(data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Use fallback data if Firebase fails
      setDashboardData({
        dashboardStats: {
          totalLearners: 0,
          activeTutors: 0,
          avgLessonDuration: 47,
          improvementRate: 0,
          monthlyGrowth: 0
        },
        performanceData,
        tutorPerformanceData,
        lessonDurationData,
        levelDistribution,
        weeklyProgressData,
        recentActivities,
        activeLearners: 0
      })
    } finally {
      setLoading(false)
    }
  }

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Failed to load dashboard data. Please try refreshing the page.</p>
        </div>
      </div>
    )
  }

  const {
    dashboardStats,
    performanceData: firebasePerformanceData,
    tutorPerformanceData: firebaseTutorData,
    levelDistribution: firebaseLevelDistribution,
    recentActivities: firebaseRecentActivities,
    activeLearners: firebaseActiveLearners
  } = dashboardData

  // Use Firebase data if available, otherwise fallback to static data
  const finalPerformanceData = firebasePerformanceData || performanceData
  const finalTutorPerformanceData = firebaseTutorData || tutorPerformanceData
  const finalLevelDistribution = firebaseLevelDistribution || levelDistribution
  const finalRecentActivities = firebaseRecentActivities || recentActivities
  const finalActiveLearners = firebaseActiveLearners || 103

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user.name}!</h2>
          <p className="text-muted-foreground">Here's what's happening with your Phono-Graphix platform today.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline">{finalActiveLearners} Active Learners</Badge>
        </div>
      </div>

      <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="learners">Learners</TabsTrigger>
          <TabsTrigger value="tutors">Tutors</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.totalLearners}</div>
                <p className="text-xs text-muted-foreground">+{dashboardStats.monthlyGrowth}% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Tutors</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardStats.activeTutors}</div>
                <p className="text-xs text-muted-foreground">Active this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Lesson Duration</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47 min</div>
                <p className="text-xs text-muted-foreground">+3 min from last week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Learner Progress by Level */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Learner Progress by Phono-Graphix Level</CardTitle>
                <CardDescription>Progress across Pink, Blue, Yellow, and Purple levels</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    completed: {
                      label: "Completed",
                      color: "hsl(var(--chart-1))",
                    },
                    remaining: {
                      label: "Remaining",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="level" />
                      <YAxis label={{ value: 'Learners', angle: -90, position: 'insideLeft' }} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="completed">
                        {performanceData.map((entry, index) => {
                          const colors: { [key: string]: string } = {
                            "Pink": "#ec4899",
                            "Blue": "#3b82f6",
                            "Yellow": "#eab308",
                            "Purple": "#8b5cf6"
                          };
                          return <Cell key={`cell-${index}`} fill={colors[entry.level] || "var(--color-completed)"} />;
                        })}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Level Distribution */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Learner Distribution</CardTitle>
                <CardDescription>Current level distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    pink: { label: "Pink Level", color: "#ec4899" },
                    blue: { label: "Blue Level", color: "#3b82f6" },
                    yellow: { label: "Yellow Level", color: "#eab308" },
                    purple: { label: "Purple Level", color: "#8b5cf6" },
                  }}
                  className="h-[250px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={finalLevelDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {levelDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            {/* Tutor Performance */}
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Tutor Performance</CardTitle>
                <CardDescription>Tutor effectiveness based on learner improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {finalTutorPerformanceData.map((tutor: any, index: number) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium leading-none">{tutor.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {tutor.learnersEnrolled} enrolled • {tutor.learnersCompleted} completed • {tutor.avgImprovement}% avg improvement
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">{Math.round((tutor.learnersCompleted / tutor.learnersEnrolled) * 100)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Lesson Duration */}
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Weekly Lesson Duration</CardTitle>
                <CardDescription>Average lesson time per day</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    duration: {
                      label: "Duration (minutes)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lessonDurationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="duration" stroke="var(--color-duration)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest learner progress and achievements</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/analytics/activity">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {finalRecentActivities.map((activity: any) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.learner} {activity.action}
                      </p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learners" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Learner Progress Over Time</CardTitle>
              <CardDescription>Weekly improvement across all learners</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  improvement: {
                    label: "Improvement %",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="improvement" stroke="var(--color-improvement)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Learners</CardTitle>
                <CardDescription>Learners with highest improvement rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Ava Johnson", level: "Purple", improvement: 94 },
                    { name: "Lucas Rodriguez", level: "Yellow", improvement: 89 },
                    { name: "Emma Thompson", level: "Pink", improvement: 87 },
                    { name: "Jake Miller", level: "Blue", improvement: 85 },
                    { name: "Sophia Chen", level: "Pink", improvement: 82 },
                  ].map((learner, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{learner.name}</p>
                        <p className="text-sm text-muted-foreground">{learner.level} Level</p>
                      </div>
                      <Badge variant="secondary">{learner.improvement}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learners Needing Attention</CardTitle>
                <CardDescription>Learners with below average progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Oliver Brown", level: "Blue", improvement: 45 },
                    { name: "Mia Garcia", level: "Pink", improvement: 48 },
                    { name: "Noah Martinez", level: "Yellow", improvement: 52 },
                    { name: "Isabella Lee", level: "Pink", improvement: 55 },
                    { name: "Ethan Wilson", level: "Blue", improvement: 58 },
                  ].map((learner, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{learner.name}</p>
                        <p className="text-sm text-muted-foreground">{learner.level} Level</p>
                      </div>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/learners/${i + 6}`}>View Details</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button asChild>
              <Link href="/learners">View All Learners</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="tutors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tutor Effectiveness Comparison</CardTitle>
              <CardDescription>Performance metrics: improvement rates, completed learners, and enrollment capacity</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  avgImprovement: {
                    label: "Avg Improvement %",
                    color: "#10b981", // Bright green
                  },
                  learnersCompleted: {
                    label: "Learners Completed",
                    color: "#f59e0b", // Bright yellow/amber
                  },
                  learnersEnrolled: {
                    label: "Learners Enrolled",
                    color: "#3b82f6", // Bright blue
                  },
                }}
                className="h-[350px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={tutorPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      label={{ value: 'Count / Percentage', angle: -90, position: 'insideLeft' }}
                      domain={[0, 'dataMax + 5']}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          const completionRate = Math.round((data.learnersCompleted / data.learnersEnrolled) * 100);
                          return (
                            <div className="bg-background border rounded-lg p-3 shadow-lg">
                              <p className="font-medium">{label}</p>
                              <p className="text-sm" style={{ color: '#10b981' }}>
                                📈 Avg Improvement: {data.avgImprovement}%
                              </p>
                              <p className="text-sm" style={{ color: '#f59e0b' }}>
                                ✅ Completed: {data.learnersCompleted} learners
                              </p>
                              <p className="text-sm" style={{ color: '#3b82f6' }}>
                                👥 Enrolled: {data.learnersEnrolled} learners
                              </p>
                              <p className="text-sm text-gray-600">
                                🎯 Completion Rate: {completionRate}%
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="avgImprovement"
                      fill="var(--color-avgImprovement)"
                      name="Avg Improvement %"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="learnersCompleted"
                      fill="var(--color-learnersCompleted)"
                      name="Learners Completed"
                      radius={[2, 2, 0, 0]}
                    />
                    <Bar
                      dataKey="learnersEnrolled"
                      fill="var(--color-learnersEnrolled)"
                      name="Learners Enrolled"
                      radius={[2, 2, 0, 0]}
                      opacity={0.8}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button asChild>
              <Link href="/tutors">View All Tutors</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Level Completion Rates</CardTitle>
              <CardDescription>Percentage of learners completing each level</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  completed: {
                    label: "Completed %",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { level: "Pink", completed: 68 },
                      { level: "Blue", completed: 52 },
                      { level: "Yellow", completed: 37 },
                      { level: "Purple", completed: 21 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="level" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="completed">
                      {[
                        { level: "Pink", completed: 68 },
                        { level: "Blue", completed: 52 },
                        { level: "Yellow", completed: 37 },
                        { level: "Purple", completed: 21 },
                      ].map((entry, index) => {
                        const colors: { [key: string]: string } = {
                          "Pink": "#ec4899",
                          "Blue": "#3b82f6",
                          "Yellow": "#eab308",
                          "Purple": "#8b5cf6"
                        };
                        return <Cell key={`cell-${index}`} fill={colors[entry.level] || "var(--color-completed)"} />;
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/performance">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Performance Tracking
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/analytics">View Detailed Analytics</Link>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

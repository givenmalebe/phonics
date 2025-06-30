"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, BookOpen, Clock, TrendingUp, Award, Target, Download, FileText, Mail, Calendar, Star, BarChart3 } from "lucide-react"
import Link from "next/link"

const tutorData = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@phonographix.edu",
    specialization: "Early Reading",
    activeLearners: 12,
    totalLearners: 45,
    avgImprovement: 78,
    rating: 4.8,
    experience: "5 years",
    certifications: ["Phono-Graphix Certified", "Reading Specialist"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@phonographix.edu",
    specialization: "Advanced Decoding",
    activeLearners: 8,
    totalLearners: 32,
    avgImprovement: 82,
    rating: 4.9,
    experience: "3 years",
    certifications: ["Phono-Graphix Certified"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Emily Davis",
    email: "emily.davis@phonographix.edu",
    specialization: "Learning Differences",
    activeLearners: 15,
    totalLearners: 58,
    avgImprovement: 75,
    rating: 4.7,
    experience: "7 years",
    certifications: ["Phono-Graphix Certified", "Special Education", "Dyslexia Specialist"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@phonographix.edu",
    specialization: "Multisyllabic Words",
    activeLearners: 10,
    totalLearners: 38,
    avgImprovement: 80,
    rating: 4.8,
    experience: "4 years",
    certifications: ["Phono-Graphix Certified", "Literacy Coach"],
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const performanceData = [
  { name: "Sarah Johnson", improvement: 78, learners: 12 },
  { name: "Mike Chen", improvement: 82, learners: 8 },
  { name: "Emily Davis", improvement: 75, learners: 15 },
  { name: "David Wilson", improvement: 80, learners: 10 },
]

// Additional data for detailed views
const getTutorPerformanceHistory = (tutorId: number) => {
  const baseData = [
    [
      { month: "Jan", improvement: 72, sessions: 45 },
      { month: "Feb", improvement: 75, sessions: 48 },
      { month: "Mar", improvement: 78, sessions: 52 },
      { month: "Apr", improvement: 80, sessions: 55 },
      { month: "May", improvement: 78, sessions: 50 },
    ],
    [
      { month: "Jan", improvement: 78, sessions: 32 },
      { month: "Feb", improvement: 80, sessions: 35 },
      { month: "Mar", improvement: 82, sessions: 38 },
      { month: "Apr", improvement: 85, sessions: 40 },
      { month: "May", improvement: 82, sessions: 38 },
    ],
    [
      { month: "Jan", improvement: 70, sessions: 58 },
      { month: "Feb", improvement: 72, sessions: 60 },
      { month: "Mar", improvement: 75, sessions: 65 },
      { month: "Apr", improvement: 77, sessions: 68 },
      { month: "May", improvement: 75, sessions: 62 },
    ],
    [
      { month: "Jan", improvement: 75, sessions: 42 },
      { month: "Feb", improvement: 78, sessions: 45 },
      { month: "Mar", improvement: 80, sessions: 48 },
      { month: "Apr", improvement: 82, sessions: 50 },
      { month: "May", improvement: 80, sessions: 47 },
    ],
  ];
  return baseData[tutorId - 1] || baseData[0];
};

export default function TutorsPage() {
  const [selectedTutor, setSelectedTutor] = useState<any>(null)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showReportsModal, setShowReportsModal] = useState(false)
  const [message, setMessage] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [meetingPurpose, setMeetingPurpose] = useState("")

  // Handler functions
  const handleScheduleMeeting = (tutor: any) => {
    setSelectedTutor(tutor)
    setShowScheduleModal(true)
  }

  const handleSendMessage = (tutor: any) => {
    setSelectedTutor(tutor)
    setShowMessageModal(true)
  }

  const handleViewReports = (tutor: any) => {
    setSelectedTutor(tutor)
    setShowReportsModal(true)
  }

  const submitScheduleMeeting = () => {
    // In a real app, this would make an API call
    alert(`Meeting scheduled with ${selectedTutor?.name} on ${selectedDate} at ${selectedTime}`)
    setShowScheduleModal(false)
    setSelectedDate("")
    setSelectedTime("")
    setMeetingPurpose("")
  }

  const submitMessage = () => {
    // In a real app, this would send the message via API
    alert(`Message sent to ${selectedTutor?.name}: "${message}"`)
    setShowMessageModal(false)
    setMessage("")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Tutor Tools</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tutors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Across all tutors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Improvement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">79%</div>
            <p className="text-xs text-muted-foreground">+5% from last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Tutor Performance Overview</CardTitle>
          <CardDescription>Learner improvement rates by tutor</CardDescription>
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
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="improvement" fill="var(--color-improvement)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Tutor Directory */}
      <Card>
        <CardHeader>
          <CardTitle>Tutor Directory</CardTitle>
          <CardDescription>Detailed information about all tutors and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {tutorData.map((tutor) => (
              <div key={tutor.id} className="flex items-start space-x-4 rounded-lg border p-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={tutor.avatar || "/placeholder.svg"} alt={tutor.name} />
                  <AvatarFallback>
                    {tutor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{tutor.name}</h3>
                      <p className="text-sm text-muted-foreground">{tutor.email}</p>
                      <p className="text-sm text-muted-foreground">Specialization: {tutor.specialization}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">{tutor.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-medium">Active Learners</p>
                      <p className="text-2xl font-bold text-blue-600">{tutor.activeLearners}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Taught</p>
                      <p className="text-2xl font-bold text-green-600">{tutor.totalLearners}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Avg Improvement</p>
                      <p className="text-2xl font-bold text-purple-600">{tutor.avgImprovement}%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Experience</p>
                      <p className="text-2xl font-bold text-orange-600">{tutor.experience}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Certifications:</p>
                    <div className="flex flex-wrap gap-2">
                      {tutor.certifications.map((cert, index) => (
                        <Badge key={index} variant="secondary">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  {/* View Details Sheet */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm">
                        <FileText className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[540px]">
                      <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={tutor.avatar || "/placeholder.svg"} alt={tutor.name} />
                            <AvatarFallback>
                              {tutor.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          {tutor.name} - Details
                        </SheetTitle>
                        <SheetDescription>
                          Comprehensive information about this tutor
                        </SheetDescription>
                      </SheetHeader>

                      <div className="mt-6 space-y-6">
                        {/* Contact Information */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Contact Information
                          </h3>
                          <div className="space-y-2 pl-7">
                            <p className="text-sm"><strong>Email:</strong> {tutor.email}</p>
                            <p className="text-sm"><strong>Specialization:</strong> {tutor.specialization}</p>
                            <p className="text-sm"><strong>Experience:</strong> {tutor.experience}</p>
                          </div>
                        </div>

                        {/* Statistics */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <BarChart3 className="h-5 w-5" />
                            Statistics
                          </h3>
                          <div className="grid grid-cols-2 gap-4 pl-7">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Active Learners</p>
                              <p className="text-2xl font-bold text-blue-600">{tutor.activeLearners}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Total Taught</p>
                              <p className="text-2xl font-bold text-green-600">{tutor.totalLearners}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Avg Improvement</p>
                              <p className="text-2xl font-bold text-purple-600">{tutor.avgImprovement}%</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Rating</p>
                              <p className="text-2xl font-bold text-yellow-600 flex items-center gap-1">
                                {tutor.rating} <Star className="h-4 w-4 fill-current" />
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Certifications */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Award className="h-5 w-5" />
                            Certifications
                          </h3>
                          <div className="flex flex-wrap gap-2 pl-7">
                            {tutor.certifications.map((cert, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            Quick Actions
                          </h3>
                          <div className="grid grid-cols-1 gap-2 pl-7">
                            <Button
                              variant="outline"
                              size="sm"
                              className="justify-start"
                              onClick={() => handleScheduleMeeting(tutor)}
                            >
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule Meeting
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="justify-start"
                              onClick={() => handleSendMessage(tutor)}
                            >
                              <Mail className="mr-2 h-4 w-4" />
                              Send Message
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="justify-start"
                              onClick={() => handleViewReports(tutor)}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Reports
                            </Button>
                          </div>
                        </div>
                      </div>
                    </SheetContent>
                  </Sheet>

                  {/* Performance Sheet */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Target className="mr-2 h-4 w-4" />
                        Performance
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[640px]">
                      <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5" />
                          {tutor.name} - Performance Analytics
                        </SheetTitle>
                        <SheetDescription>
                          Detailed performance metrics and trends
                        </SheetDescription>
                      </SheetHeader>

                      <div className="mt-6 space-y-6">
                        {/* Performance Overview */}
                        <div className="grid grid-cols-2 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">Current Rating</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold text-yellow-600 flex items-center gap-1">
                                {tutor.rating} <Star className="h-5 w-5 fill-current" />
                              </div>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm">Avg Improvement</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="text-2xl font-bold text-green-600">{tutor.avgImprovement}%</div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Performance Chart */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">5-Month Performance Trend</CardTitle>
                            <CardDescription>Improvement rates and session counts over time</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ChartContainer
                              config={{
                                improvement: {
                                  label: "Improvement %",
                                  color: "#10b981",
                                },
                                sessions: {
                                  label: "Sessions",
                                  color: "#3b82f6",
                                },
                              }}
                              className="h-[200px]"
                            >
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={getTutorPerformanceHistory(tutor.id)}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Line
                                    type="monotone"
                                    dataKey="improvement"
                                    stroke="var(--color-improvement)"
                                    strokeWidth={2}
                                    dot={{ fill: "var(--color-improvement)" }}
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </ChartContainer>
                          </CardContent>
                        </Card>

                        {/* Learner Distribution */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Learner Progress Distribution</CardTitle>
                            <CardDescription>Current learners by progress level</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ChartContainer
                              config={{
                                excellent: { label: "Excellent (90%+)", color: "#10b981" },
                                good: { label: "Good (70-89%)", color: "#f59e0b" },
                                needs_improvement: { label: "Needs Improvement (<70%)", color: "#ef4444" },
                              }}
                              className="h-[150px]"
                            >
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[
                                  { category: "Excellent", count: Math.floor(tutor.activeLearners * 0.4) },
                                  { category: "Good", count: Math.floor(tutor.activeLearners * 0.5) },
                                  { category: "Needs Improvement", count: Math.floor(tutor.activeLearners * 0.1) },
                                ]}>
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="category" />
                                  <YAxis />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Bar dataKey="count">
                                    {[
                                      { category: "Excellent", count: Math.floor(tutor.activeLearners * 0.4) },
                                      { category: "Good", count: Math.floor(tutor.activeLearners * 0.5) },
                                      { category: "Needs Improvement", count: Math.floor(tutor.activeLearners * 0.1) },
                                    ].map((entry, index) => {
                                      const colors = ["#10b981", "#f59e0b", "#ef4444"];
                                      return <Cell key={`cell-${index}`} fill={colors[index]} />;
                                    })}
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            </ChartContainer>
                          </CardContent>
                        </Card>
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Performance Tracking
            </CardTitle>
            <CardDescription>Monitor individual tutor performance and learner outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/performance">
                <TrendingUp className="mr-2 h-4 w-4" />
                Access Performance Tools
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Resource Library
            </CardTitle>
            <CardDescription>Access Phono-Graphix materials and teaching resources</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Browse Resources</Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Lesson Planning
            </CardTitle>
            <CardDescription>Plan and schedule lessons for your learners</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Plan Lessons</Button>
          </CardContent>
        </Card>
      </div>

      {/* Schedule Meeting Modal */}
      <Sheet open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Meeting with {selectedTutor?.name}
            </SheetTitle>
            <SheetDescription>
              Schedule a meeting to discuss learner progress and teaching strategies
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meeting-date">Meeting Date</Label>
              <Input
                id="meeting-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meeting-time">Meeting Time</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">9:00 AM</SelectItem>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="11:00">11:00 AM</SelectItem>
                  <SelectItem value="13:00">1:00 PM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="15:00">3:00 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meeting-purpose">Meeting Purpose</Label>
              <Select value={meetingPurpose} onValueChange={setMeetingPurpose}>
                <SelectTrigger>
                  <SelectValue placeholder="Select meeting purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="progress-review">Progress Review</SelectItem>
                  <SelectItem value="strategy-discussion">Teaching Strategy Discussion</SelectItem>
                  <SelectItem value="performance-feedback">Performance Feedback</SelectItem>
                  <SelectItem value="resource-planning">Resource Planning</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={submitScheduleMeeting}
                disabled={!selectedDate || !selectedTime || !meetingPurpose}
                className="flex-1"
              >
                Schedule Meeting
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowScheduleModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Send Message Modal */}
      <Sheet open={showMessageModal} onOpenChange={setShowMessageModal}>
        <SheetContent className="w-[400px] sm:w-[540px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Send Message to {selectedTutor?.name}
            </SheetTitle>
            <SheetDescription>
              Send a direct message to discuss learner progress or teaching matters
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message-content">Message</Label>
              <Textarea
                id="message-content"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="resize-none"
              />
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Tip:</strong> Be specific about which learners or topics you'd like to discuss for better communication.
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={submitMessage}
                disabled={!message.trim()}
                className="flex-1"
              >
                Send Message
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowMessageModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* View Reports Modal */}
      <Sheet open={showReportsModal} onOpenChange={setShowReportsModal}>
        <SheetContent className="w-[400px] sm:w-[640px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {selectedTutor?.name} - Reports & Analytics
            </SheetTitle>
            <SheetDescription>
              Detailed reports and analytics for this tutor's performance
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Report Categories */}
            <div className="grid grid-cols-1 gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Monthly Performance Report
                  </CardTitle>
                  <CardDescription>Detailed breakdown of learner improvements and session analytics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Learner Progress Summary
                  </CardTitle>
                  <CardDescription>Individual learner progress reports and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download Excel
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Session Activity Log
                  </CardTitle>
                  <CardDescription>Complete log of all teaching sessions and activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download CSV
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Certification & Training Records
                  </CardTitle>
                  <CardDescription>Training history, certifications, and professional development</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Note:</strong> All reports are generated in real-time and include the most current data available.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

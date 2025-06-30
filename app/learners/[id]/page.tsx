"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { ArrowLeft, Calendar, Clock, FileText, MessageCircle, PenLine, Play, Target, User } from "lucide-react"
import Link from "next/link"

// Sample learner data
const learnerData = {
  id: 1,
  name: "Emma Thompson",
  age: 7,
  grade: "2nd Grade",
  level: "Pink",
  progress: 85,
  tutor: "Sarah Johnson",
  enrollmentDate: "2023-09-15",
  lastSession: "2024-01-15",
  nextSession: "2024-01-22",
  status: "Active",
  avatar: "/placeholder.svg?height=128&width=128",
  parent: {
    name: "Michael Thompson",
    email: "michael.thompson@example.com",
    phone: "(555) 123-4567",
  },
  progressHistory: [
    { week: "Week 1", progress: 10 },
    { week: "Week 2", progress: 25 },
    { week: "Week 3", progress: 35 },
    { week: "Week 4", progress: 42 },
    { week: "Week 5", progress: 55 },
    { week: "Week 6", progress: 68 },
    { week: "Week 7", progress: 75 },
    { week: "Week 8", progress: 85 },
  ],
  completedModules: [
    {
      id: 1,
      title: "Introduction to Sounds",
      level: "Pink",
      completedDate: "2023-10-05",
      score: 92,
    },
    {
      id: 2,
      title: "Single Letter Sounds",
      level: "Pink",
      completedDate: "2023-11-12",
      score: 88,
    },
  ],
  currentModules: [
    {
      id: 3,
      title: "Blending Simple Words",
      level: "Pink",
      progress: 60,
      nextLesson: "2024-01-22",
    },
  ],
  upcomingModules: [
    {
      id: 4,
      title: "Segmenting Sounds",
      level: "Pink",
    },
    {
      id: 5,
      title: "Sound Manipulation",
      level: "Pink",
    },
  ],
  notes: [
    {
      id: 1,
      date: "2024-01-15",
      author: "Sarah Johnson",
      content:
        "Emma is making excellent progress with blending simple words. She's particularly strong with short vowel sounds. We'll continue to work on consonant blends next session.",
    },
    {
      id: 2,
      date: "2024-01-08",
      author: "Sarah Johnson",
      content:
        "Emma struggled a bit with distinguishing between /b/ and /d/ sounds today. We spent extra time on these and will revisit next session.",
    },
    {
      id: 3,
      date: "2024-01-01",
      author: "Sarah Johnson",
      content:
        "Great first session of the year! Emma remembered all her letter sounds from before the break. She's ready to move on to more complex blending activities.",
    },
  ],
}

const getLevelColor = (level: string) => {
  switch (level) {
    case "Pink":
      return "bg-pink-100 text-pink-800"
    case "Blue":
      return "bg-blue-100 text-blue-800"
    case "Yellow":
      return "bg-yellow-100 text-yellow-800"
    case "Purple":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function LearnerProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [newNote, setNewNote] = useState("")

  // In a real app, you would fetch the learner data based on the ID
  const learner = learnerData

  const handleAddNote = () => {
    if (newNote.trim()) {
      alert(`Note added: ${newNote}`)
      setNewNote("")
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/learners">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Learner Profile</h2>
      </div>

      {/* Learner Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <Avatar className="h-24 w-24 border-2 border-muted">
          <AvatarImage src={learner.avatar || "/placeholder.svg"} alt={learner.name} />
          <AvatarFallback>
            {learner.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <h1 className="text-2xl font-bold">{learner.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>
                  {learner.age} years old • {learner.grade}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge className={getLevelColor(learner.level)}>{learner.level} Level</Badge>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                {learner.status}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Enrolled</p>
                <p className="text-sm text-muted-foreground">{learner.enrollmentDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Last Session</p>
                <p className="text-sm text-muted-foreground">{learner.lastSession}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Next Session</p>
                <p className="text-sm text-muted-foreground">{learner.nextSession}</p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{learner.progress}%</span>
            </div>
            <Progress value={learner.progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Current Module</CardTitle>
                <CardDescription>Active learning module and progress</CardDescription>
              </CardHeader>
              <CardContent>
                {learner.currentModules.map((module) => (
                  <div key={module.id} className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">{module.level} Level</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-medium">{module.progress}%</span>
                      </div>
                      <Progress value={module.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Next: {module.nextLesson}</span>
                      </div>
                      <Button asChild>
                        <Link href={`/lessons/pink/module/${module.id}`}>
                          <Play className="mr-2 h-4 w-4" />
                          Continue
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Progress</CardTitle>
                <CardDescription>Weekly improvement tracking</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    progress: {
                      label: "Progress %",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[200px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={learner.progressHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="progress" stroke="var(--color-progress)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Latest Tutor Notes</CardTitle>
              <CardDescription>Recent observations and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learner.notes.slice(0, 2).map((note) => (
                  <div key={note.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{note.author}</p>
                      <p className="text-sm text-muted-foreground">{note.date}</p>
                    </div>
                    <p className="text-sm">{note.content}</p>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => setActiveTab("notes")}>
                  View All Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progress History</CardTitle>
              <CardDescription>Detailed progress over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  progress: {
                    label: "Progress %",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={learner.progressHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="progress" stroke="var(--color-progress)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed Modules</CardTitle>
              <CardDescription>Modules successfully completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learner.completedModules.map((module) => (
                  <div key={module.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {module.level} Level • Completed {module.completedDate}
                      </p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      {module.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Module</CardTitle>
              <CardDescription>Currently active learning module</CardDescription>
            </CardHeader>
            <CardContent>
              {learner.currentModules.map((module) => (
                <div key={module.id} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">{module.level} Level</p>
                    </div>
                    <Badge className={getLevelColor(module.level)}>{module.level}</Badge>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-medium">{module.progress}%</span>
                    </div>
                    <Progress value={module.progress} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Next: {module.nextLesson}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" asChild>
                        <Link href={`/lessons/pink`}>View Lessons</Link>
                      </Button>
                      <Button asChild>
                        <Link href={`/lessons/pink/module/${module.id}`}>
                          <Play className="mr-2 h-4 w-4" />
                          Continue
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Completed Modules</CardTitle>
              <CardDescription>Modules successfully completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learner.completedModules.map((module) => (
                  <div key={module.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {module.level} Level • Completed {module.completedDate}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        {module.score}%
                      </Badge>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/lessons/pink/module/${module.id}`}>Review</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Modules</CardTitle>
              <CardDescription>Modules scheduled for future learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learner.upcomingModules.map((module) => (
                  <div key={module.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h3 className="font-medium">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">{module.level} Level</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/lessons/pink/module/${module.id}`}>Preview</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add Note</CardTitle>
              <CardDescription>Record observations about this learner</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <textarea
                  className="w-full min-h-[100px] p-2 border rounded-md"
                  placeholder="Enter your notes here..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <Button onClick={handleAddNote}>
                  <PenLine className="mr-2 h-4 w-4" />
                  Add Note
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tutor Notes</CardTitle>
              <CardDescription>History of observations and feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {learner.notes.map((note) => (
                  <div key={note.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{note.author}</p>
                      <p className="text-sm text-muted-foreground">{note.date}</p>
                    </div>
                    <p className="text-sm">{note.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Parent/Guardian Information</CardTitle>
              <CardDescription>Contact details for {learner.name}'s parent/guardian</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">{learner.parent.name}</p>
                  <p className="text-sm text-muted-foreground">Parent/Guardian</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm">{learner.parent.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm">{learner.parent.phone}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                  <Button variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Send Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assigned Tutor</CardTitle>
              <CardDescription>Primary instructor for this learner</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{learner.tutor}</p>
                  <p className="text-sm text-muted-foreground">Phono-Graphix Certified Tutor</p>
                </div>
                <Button variant="outline" className="ml-auto" asChild>
                  <Link href="/tutors">View Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
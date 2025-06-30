"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Search, Plus, Filter, Download, Eye, MessageCircle, Calendar,
    BookOpen, TrendingUp, AlertCircle, CheckCircle, Clock,
    Users, BarChart3, Mail, Phone, Settings, Bell
} from "lucide-react"
import Link from "next/link"

const learners = [
    {
        id: 1,
        name: "Emma Thompson",
        age: 7,
        level: "Pink",
        progress: 85,
        tutor: "Sarah Johnson",
        tutorId: 1,
        lastSession: "2024-01-15",
        nextSession: "2024-01-22",
        status: "Active",
        avatar: "/placeholder.svg?height=40&width=40",
        parent: { name: "Michael Thompson", email: "michael.t@email.com", phone: "(555) 123-4567" },
        weeklyGoal: 90,
        sessionsThisWeek: 2,
        targetSessions: 3,
        currentStreak: 5,
        needsAttention: false,
        upcomingAssignments: 2,
        completedAssignments: 8,
        totalAssignments: 10,
        grade: "2nd Grade",
        enrollmentDate: "2023-09-15",
        strengths: ["Phoneme Awareness", "Letter Recognition"],
        challenges: ["Blending", "Reading Fluency"],
        notes: "Making excellent progress with sound recognition",
    },
    {
        id: 2,
        name: "Jake Miller",
        age: 8,
        level: "Blue",
        progress: 72,
        tutor: "Mike Chen",
        tutorId: 2,
        lastSession: "2024-01-14",
        nextSession: "2024-01-21",
        status: "Active",
        avatar: "/placeholder.svg?height=40&width=40",
        parent: { name: "Lisa Miller", email: "lisa.m@email.com", phone: "(555) 234-5678" },
        weeklyGoal: 85,
        sessionsThisWeek: 1,
        targetSessions: 3,
        currentStreak: 3,
        needsAttention: true,
        upcomingAssignments: 3,
        completedAssignments: 6,
        totalAssignments: 9,
        grade: "3rd Grade",
        enrollmentDate: "2023-10-01",
        strengths: ["Memory", "Focus"],
        challenges: ["Complex Sounds", "Reading Speed"],
        notes: "Needs encouragement with difficult words",
    },
    {
        id: 3,
        name: "Sophia Chen",
        age: 6,
        level: "Pink",
        progress: 45,
        tutor: "Emily Davis",
        tutorId: 3,
        lastSession: "2024-01-13",
        nextSession: "2024-01-20",
        status: "Active",
        avatar: "/placeholder.svg?height=40&width=40",
        parent: { name: "David Chen", email: "david.c@email.com", phone: "(555) 345-6789" },
        weeklyGoal: 60,
        sessionsThisWeek: 3,
        targetSessions: 3,
        currentStreak: 8,
        needsAttention: false,
        upcomingAssignments: 1,
        completedAssignments: 4,
        totalAssignments: 5,
        grade: "1st Grade",
        enrollmentDate: "2023-11-15",
        strengths: ["Attention to Detail", "Following Instructions"],
        challenges: ["Sound Discrimination", "Confidence"],
        notes: "Shy but very attentive during sessions",
    },
    {
        id: 4,
        name: "Lucas Rodriguez",
        age: 9,
        level: "Yellow",
        progress: 60,
        tutor: "David Wilson",
        tutorId: 4,
        lastSession: "2024-01-12",
        nextSession: "2024-01-19",
        status: "At Risk",
        avatar: "/placeholder.svg?height=40&width=40",
        parent: { name: "Maria Rodriguez", email: "maria.r@email.com", phone: "(555) 456-7890" },
        weeklyGoal: 75,
        sessionsThisWeek: 1,
        targetSessions: 4,
        currentStreak: 1,
        needsAttention: true,
        upcomingAssignments: 4,
        completedAssignments: 3,
        totalAssignments: 7,
        grade: "4th Grade",
        enrollmentDate: "2023-08-20",
        strengths: ["Motivation", "Perseverance"],
        challenges: ["Multi-syllabic Words", "Reading Comprehension"],
        notes: "Requires additional support and frequent check-ins",
    },
    {
        id: 5,
        name: "Ava Johnson",
        age: 10,
        level: "Purple",
        progress: 90,
        tutor: "Sarah Johnson",
        tutorId: 1,
        lastSession: "2024-01-11",
        nextSession: "2024-01-18",
        status: "Completed",
        avatar: "/placeholder.svg?height=40&width=40",
        parent: { name: "Robert Johnson", email: "robert.j@email.com", phone: "(555) 567-8901" },
        weeklyGoal: 95,
        sessionsThisWeek: 2,
        targetSessions: 2,
        currentStreak: 12,
        needsAttention: false,
        upcomingAssignments: 0,
        completedAssignments: 15,
        totalAssignments: 15,
        grade: "5th Grade",
        enrollmentDate: "2023-07-01",
        strengths: ["Advanced Decoding", "Reading Comprehension", "Independent Learning"],
        challenges: ["Advanced Vocabulary"],
        notes: "Ready for graduation assessment",
    },
]

const tutors = [
    { id: 1, name: "Sarah Johnson" },
    { id: 2, name: "Mike Chen" },
    { id: 3, name: "Emily Davis" },
    { id: 4, name: "David Wilson" },
]

const getLevelColor = (level: string) => {
    switch (level) {
        case "Pink": return "bg-pink-100 text-pink-800"
        case "Blue": return "bg-blue-100 text-blue-800"
        case "Yellow": return "bg-yellow-100 text-yellow-800"
        case "Purple": return "bg-purple-100 text-purple-800"
        default: return "bg-gray-100 text-gray-800"
    }
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "Active": return "bg-green-100 text-green-800"
        case "At Risk": return "bg-red-100 text-red-800"
        case "Completed": return "bg-blue-100 text-blue-800"
        case "Inactive": return "bg-gray-100 text-gray-800"
        default: return "bg-gray-100 text-gray-800"
    }
}

export default function EnhancedLearnersPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedLevel, setSelectedLevel] = useState("all")
    const [selectedTutor, setSelectedTutor] = useState("all")
    const [selectedStatus, setSelectedStatus] = useState("all")
    const [viewMode, setViewMode] = useState("grid")
    const [selectedLearners, setSelectedLearners] = useState<number[]>([])
    const [showBulkActions, setShowBulkActions] = useState(false)
    const [activeTab, setActiveTab] = useState("all")

    // Filter learners based on search and filters
    const filteredLearners = useMemo(() => {
        let filtered = learners

        // Apply tab filter
        if (activeTab === "active") {
            filtered = filtered.filter(l => l.status === "Active")
        } else if (activeTab === "attention") {
            filtered = filtered.filter(l => l.needsAttention || l.status === "At Risk")
        } else if (activeTab === "completed") {
            filtered = filtered.filter(l => l.status === "Completed")
        }

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(learner =>
                learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                learner.tutor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                learner.parent.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Apply other filters
        if (selectedLevel !== "all") {
            filtered = filtered.filter(learner => learner.level === selectedLevel)
        }
        if (selectedTutor !== "all") {
            filtered = filtered.filter(learner => learner.tutorId === parseInt(selectedTutor))
        }
        if (selectedStatus !== "all") {
            filtered = filtered.filter(learner => learner.status === selectedStatus)
        }

        return filtered
    }, [searchTerm, selectedLevel, selectedTutor, selectedStatus, activeTab])

    // Calculate summary stats
    const summaryStats = useMemo(() => {
        const total = learners.length
        const active = learners.filter(l => l.status === "Active").length
        const needingAttention = learners.filter(l => l.needsAttention || l.status === "At Risk").length
        const avgProgress = Math.round(learners.reduce((sum, l) => sum + l.progress, 0) / total)
        const completedThisMonth = learners.filter(l => l.status === "Completed").length

        return { total, active, needingAttention, avgProgress, completedThisMonth }
    }, [])

    const handleSelectLearner = (learnerId: number) => {
        setSelectedLearners(prev =>
            prev.includes(learnerId)
                ? prev.filter(id => id !== learnerId)
                : [...prev, learnerId]
        )
    }

    const handleSelectAll = () => {
        if (selectedLearners.length === filteredLearners.length) {
            setSelectedLearners([])
        } else {
            setSelectedLearners(filteredLearners.map(l => l.id))
        }
    }

    const handleBulkMessage = () => {
        alert(`Sending message to ${selectedLearners.length} learner(s)`)
        setSelectedLearners([])
        setShowBulkActions(false)
    }

    const handleBulkAssignment = () => {
        alert(`Assigning work to ${selectedLearners.length} learner(s)`)
        setSelectedLearners([])
        setShowBulkActions(false)
    }

    const getProgressColor = (progress: number) => {
        if (progress >= 80) return "text-green-600"
        if (progress >= 60) return "text-yellow-600"
        return "text-red-600"
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Enhanced Learner Management</h2>
                <div className="flex items-center space-x-2">
                    {selectedLearners.length > 0 && (
                        <Button variant="outline" onClick={() => setShowBulkActions(true)}>
                            Bulk Actions ({selectedLearners.length})
                        </Button>
                    )}
                    <Button asChild>
                        <Link href="/learners/enroll">
                            <Plus className="mr-2 h-4 w-4" />
                            Enroll New Learner
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Summary Statistics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{summaryStats.total}</div>
                        <p className="text-xs text-muted-foreground">Enrolled students</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{summaryStats.active}</div>
                        <p className="text-xs text-muted-foreground">Currently learning</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Need Attention</CardTitle>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{summaryStats.needingAttention}</div>
                        <p className="text-xs text-muted-foreground">Require support</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
                        <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{summaryStats.avgProgress}%</div>
                        <p className="text-xs text-muted-foreground">Overall completion</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{summaryStats.completedThisMonth}</div>
                        <p className="text-xs text-muted-foreground">This month</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All Learners</TabsTrigger>
                    <TabsTrigger value="active">Active</TabsTrigger>
                    <TabsTrigger value="attention">Need Attention</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="space-y-4">
                    {/* Search and Filter Bar */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                                <div className="flex-1">
                                    <div className="relative">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="Search learners, tutors, or parents..."
                                            className="pl-8"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue placeholder="Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Levels</SelectItem>
                                        <SelectItem value="Pink">Pink</SelectItem>
                                        <SelectItem value="Blue">Blue</SelectItem>
                                        <SelectItem value="Yellow">Yellow</SelectItem>
                                        <SelectItem value="Purple">Purple</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select value={selectedTutor} onValueChange={setSelectedTutor}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue placeholder="Tutor" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Tutors</SelectItem>
                                        {tutors.map(tutor => (
                                            <SelectItem key={tutor.id} value={tutor.id.toString()}>
                                                {tutor.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="At Risk">At Risk</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Learners List */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Learners ({filteredLearners.length})</CardTitle>
                                <CardDescription>Manage and track progress of enrolled learners</CardDescription>
                            </div>
                            <div className="flex items-center space-x-2">
                                {filteredLearners.length > 0 && (
                                    <Checkbox
                                        checked={selectedLearners.length === filteredLearners.length}
                                        onCheckedChange={handleSelectAll}
                                    />
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {filteredLearners.map((learner) => (
                                    <div key={learner.id} className="flex items-center space-x-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                                        <Checkbox
                                            checked={selectedLearners.includes(learner.id)}
                                            onCheckedChange={() => handleSelectLearner(learner.id)}
                                        />

                                        <Avatar className="h-12 w-12">
                                            <AvatarImage src={learner.avatar || "/placeholder.svg"} alt={learner.name} />
                                            <AvatarFallback>
                                                {learner.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-semibold">{learner.name}</h3>
                                                <Badge className={getLevelColor(learner.level)}>{learner.level}</Badge>
                                                <Badge className={getStatusColor(learner.status)}>{learner.status}</Badge>
                                                {learner.needsAttention && (
                                                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                                        <AlertCircle className="w-3 h-3 mr-1" />
                                                        Attention
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                                                <div>
                                                    <span className="font-medium">Age:</span> {learner.age} ({learner.grade})
                                                </div>
                                                <div>
                                                    <span className="font-medium">Tutor:</span> {learner.tutor}
                                                </div>
                                                <div>
                                                    <span className="font-medium">Sessions:</span> {learner.sessionsThisWeek}/{learner.targetSessions} this week
                                                </div>
                                                <div>
                                                    <span className="font-medium">Streak:</span> {learner.currentStreak} days
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">Overall Progress</span>
                                                        <span className={`text-sm font-medium ${getProgressColor(learner.progress)}`}>
                                                            {learner.progress}%
                                                        </span>
                                                    </div>
                                                    <Progress value={learner.progress} className="h-2" />
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium">Assignments</span>
                                                        <span className="text-sm font-medium">
                                                            {learner.completedAssignments}/{learner.totalAssignments}
                                                        </span>
                                                    </div>
                                                    <Progress
                                                        value={(learner.completedAssignments / learner.totalAssignments) * 100}
                                                        className="h-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col space-y-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/learners/${learner.id}`}>
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>

                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <Button variant="outline" size="sm">
                                                        <MessageCircle className="h-4 w-4" />
                                                    </Button>
                                                </SheetTrigger>
                                                <SheetContent>
                                                    <SheetHeader>
                                                        <SheetTitle>Contact {learner.name}'s Family</SheetTitle>
                                                        <SheetDescription>
                                                            Send a message or schedule a call with {learner.parent.name}
                                                        </SheetDescription>
                                                    </SheetHeader>
                                                    <div className="space-y-4 py-4">
                                                        <div className="space-y-2">
                                                            <Label>Parent: {learner.parent.name}</Label>
                                                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                                <Mail className="h-4 w-4" />
                                                                <span>{learner.parent.email}</span>
                                                            </div>
                                                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                                                <Phone className="h-4 w-4" />
                                                                <span>{learner.parent.phone}</span>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="message">Message</Label>
                                                            <Textarea
                                                                id="message"
                                                                placeholder="Type your message here..."
                                                                className="min-h-[100px]"
                                                            />
                                                        </div>
                                                        <div className="flex space-x-2">
                                                            <Button className="flex-1">
                                                                <Mail className="mr-2 h-4 w-4" />
                                                                Send Message
                                                            </Button>
                                                            <Button variant="outline" className="flex-1">
                                                                <Calendar className="mr-2 h-4 w-4" />
                                                                Schedule Call
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </SheetContent>
                                            </Sheet>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Bulk Actions Dialog */}
            <Dialog open={showBulkActions} onOpenChange={setShowBulkActions}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Bulk Actions</DialogTitle>
                        <DialogDescription>
                            Perform actions on {selectedLearners.length} selected learner(s)
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Button onClick={handleBulkMessage} className="justify-start">
                            <MessageCircle className="mr-2 h-4 w-4" />
                            Send Message to Parents
                        </Button>
                        <Button onClick={handleBulkAssignment} variant="outline" className="justify-start">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Assign Activities
                        </Button>
                        <Button variant="outline" className="justify-start">
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule Sessions
                        </Button>
                        <Button variant="outline" className="justify-start">
                            <Download className="mr-2 h-4 w-4" />
                            Export Selected Data
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
} 
"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Search, Plus, Calendar, Clock, BookOpen, CheckCircle,
    AlertTriangle, User, FileText, Send, Download, ArrowLeft
} from "lucide-react"
import Link from "next/link"

const assignments = [
    {
        id: 1,
        title: "Phoneme Segmentation Practice",
        description: "Practice breaking words into individual sounds",
        learner: "Emma Thompson",
        learnerId: 1,
        level: "Pink",
        status: "Completed",
        score: 92,
        dueDate: "2024-01-20",
        completedDate: "2024-01-19",
        estimatedTime: 15,
        actualTime: 12,
        difficulty: "Easy",
        skills: ["Phoneme Awareness", "Segmentation"],
        feedback: "Excellent work! Emma shows strong understanding of sound segmentation.",
    },
    {
        id: 2,
        title: "Blending CVC Words",
        description: "Blend consonant-vowel-consonant words",
        learner: "Jake Miller",
        learnerId: 2,
        level: "Blue",
        status: "In Progress",
        score: null,
        dueDate: "2024-01-25",
        completedDate: null,
        estimatedTime: 20,
        actualTime: null,
        difficulty: "Medium",
        skills: ["Blending", "CVC Words"],
        feedback: null,
    },
    {
        id: 3,
        title: "Letter Recognition Quiz",
        description: "Identify letters and their sounds",
        learner: "Sophia Chen",
        learnerId: 3,
        level: "Pink",
        status: "Overdue",
        score: null,
        dueDate: "2024-01-18",
        completedDate: null,
        estimatedTime: 10,
        actualTime: null,
        difficulty: "Easy",
        skills: ["Letter Recognition", "Sound Mapping"],
        feedback: null,
    },
    {
        id: 4,
        title: "Multi-syllabic Word Reading",
        description: "Read and decode complex multi-syllabic words",
        learner: "Lucas Rodriguez",
        learnerId: 4,
        level: "Yellow",
        status: "Assigned",
        score: null,
        dueDate: "2024-01-28",
        completedDate: null,
        estimatedTime: 30,
        actualTime: null,
        difficulty: "Hard",
        skills: ["Decoding", "Multi-syllabic Words", "Reading Fluency"],
        feedback: null,
    },
    {
        id: 5,
        title: "Reading Comprehension Assessment",
        description: "Complete reading passages with comprehension questions",
        learner: "Ava Johnson",
        learnerId: 5,
        level: "Purple",
        status: "Completed",
        score: 95,
        dueDate: "2024-01-15",
        completedDate: "2024-01-14",
        estimatedTime: 45,
        actualTime: 40,
        difficulty: "Hard",
        skills: ["Reading Comprehension", "Critical Thinking", "Advanced Vocabulary"],
        feedback: "Outstanding performance! Ready for advanced level work.",
    },
]

const getStatusColor = (status: string) => {
    switch (status) {
        case "Completed": return "bg-green-100 text-green-800"
        case "In Progress": return "bg-blue-100 text-blue-800"
        case "Assigned": return "bg-gray-100 text-gray-800"
        case "Overdue": return "bg-red-100 text-red-800"
        default: return "bg-gray-100 text-gray-800"
    }
}

const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case "Easy": return "bg-green-100 text-green-800"
        case "Medium": return "bg-yellow-100 text-yellow-800"
        case "Hard": return "bg-red-100 text-red-800"
        default: return "bg-gray-100 text-gray-800"
    }
}

const getLevelColor = (level: string) => {
    switch (level) {
        case "Pink": return "bg-pink-100 text-pink-800"
        case "Blue": return "bg-blue-100 text-blue-800"
        case "Yellow": return "bg-yellow-100 text-yellow-800"
        case "Purple": return "bg-purple-100 text-purple-800"
        default: return "bg-gray-100 text-gray-800"
    }
}

export default function AssignmentsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedStatus, setSelectedStatus] = useState("all")
    const [selectedLevel, setSelectedLevel] = useState("all")
    const [selectedDifficulty, setSelectedDifficulty] = useState("all")
    const [activeTab, setActiveTab] = useState("all")
    const [selectedAssignments, setSelectedAssignments] = useState<number[]>([])
    const [showCreateDialog, setShowCreateDialog] = useState(false)

    // Filter assignments
    const filteredAssignments = useMemo(() => {
        let filtered = assignments

        // Apply tab filter
        if (activeTab === "pending") {
            filtered = filtered.filter(a => a.status === "Assigned" || a.status === "In Progress")
        } else if (activeTab === "overdue") {
            filtered = filtered.filter(a => a.status === "Overdue")
        } else if (activeTab === "completed") {
            filtered = filtered.filter(a => a.status === "Completed")
        }

        // Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(assignment =>
                assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                assignment.learner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                assignment.description.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        // Apply other filters
        if (selectedStatus !== "all") {
            filtered = filtered.filter(assignment => assignment.status === selectedStatus)
        }
        if (selectedLevel !== "all") {
            filtered = filtered.filter(assignment => assignment.level === selectedLevel)
        }
        if (selectedDifficulty !== "all") {
            filtered = filtered.filter(assignment => assignment.difficulty === selectedDifficulty)
        }

        return filtered
    }, [searchTerm, selectedStatus, selectedLevel, selectedDifficulty, activeTab])

    // Calculate stats
    const stats = useMemo(() => {
        const total = assignments.length
        const completed = assignments.filter(a => a.status === "Completed").length
        const pending = assignments.filter(a => a.status === "Assigned" || a.status === "In Progress").length
        const overdue = assignments.filter(a => a.status === "Overdue").length
        const avgScore = Math.round(
            assignments.filter(a => a.score !== null).reduce((sum, a) => sum + (a.score || 0), 0) /
            assignments.filter(a => a.score !== null).length
        )

        return { total, completed, pending, overdue, avgScore }
    }, [])

    const handleSelectAssignment = (assignmentId: number) => {
        setSelectedAssignments(prev =>
            prev.includes(assignmentId)
                ? prev.filter(id => id !== assignmentId)
                : [...prev, assignmentId]
        )
    }

    const handleSelectAll = () => {
        if (selectedAssignments.length === filteredAssignments.length) {
            setSelectedAssignments([])
        } else {
            setSelectedAssignments(filteredAssignments.map(a => a.id))
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString()
    }

    const isOverdue = (dueDate: string, status: string) => {
        return status !== "Completed" && new Date(dueDate) < new Date()
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" asChild>
                        <Link href="/learners">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <h2 className="text-3xl font-bold tracking-tight">Assignment Management</h2>
                </div>
                <div className="flex items-center space-x-2">
                    <Button onClick={() => setShowCreateDialog(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Assignment
                    </Button>
                </div>
            </div>

            {/* Summary Statistics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <p className="text-xs text-muted-foreground">All assignments</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.completed}</div>
                        <p className="text-xs text-muted-foreground">Finished work</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pending}</div>
                        <p className="text-xs text-muted-foreground">In progress</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.overdue}</div>
                        <p className="text-xs text-muted-foreground">Need attention</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Score</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.avgScore}%</div>
                        <p className="text-xs text-muted-foreground">Performance</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All Assignments</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="overdue">Overdue</TabsTrigger>
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
                                            placeholder="Search assignments..."
                                            className="pl-8"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="Assigned">Assigned</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Completed">Completed</SelectItem>
                                        <SelectItem value="Overdue">Overdue</SelectItem>
                                    </SelectContent>
                                </Select>
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
                                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                                    <SelectTrigger className="w-32">
                                        <SelectValue placeholder="Difficulty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Difficulty</SelectItem>
                                        <SelectItem value="Easy">Easy</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Hard">Hard</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button variant="outline">
                                    <Download className="mr-2 h-4 w-4" />
                                    Export
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Assignments List */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Assignments ({filteredAssignments.length})</CardTitle>
                                <CardDescription>Manage and track learner assignments</CardDescription>
                            </div>
                            <div className="flex items-center space-x-2">
                                {filteredAssignments.length > 0 && (
                                    <Checkbox
                                        checked={selectedAssignments.length === filteredAssignments.length}
                                        onCheckedChange={handleSelectAll}
                                    />
                                )}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {filteredAssignments.map((assignment) => (
                                    <div key={assignment.id} className="flex items-center space-x-4 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                                        <Checkbox
                                            checked={selectedAssignments.includes(assignment.id)}
                                            onCheckedChange={() => handleSelectAssignment(assignment.id)}
                                        />

                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-semibold">{assignment.title}</h3>
                                                <Badge className={getStatusColor(assignment.status)}>{assignment.status}</Badge>
                                                <Badge className={getLevelColor(assignment.level)}>{assignment.level}</Badge>
                                                <Badge className={getDifficultyColor(assignment.difficulty)}>{assignment.difficulty}</Badge>
                                                {isOverdue(assignment.dueDate, assignment.status) && (
                                                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                                        <AlertTriangle className="w-3 h-3 mr-1" />
                                                        Overdue
                                                    </Badge>
                                                )}
                                            </div>

                                            <p className="text-sm text-muted-foreground">{assignment.description}</p>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                                                <div className="flex items-center space-x-1">
                                                    <User className="h-3 w-3" />
                                                    <span>{assignment.learner}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>Due: {formatDate(assignment.dueDate)}</span>
                                                </div>
                                                <div className="flex items-center space-x-1">
                                                    <Clock className="h-3 w-3" />
                                                    <span>{assignment.estimatedTime} min</span>
                                                </div>
                                                {assignment.score !== null && (
                                                    <div className="flex items-center space-x-1">
                                                        <CheckCircle className="h-3 w-3 text-green-500" />
                                                        <span className="font-medium">{assignment.score}%</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {assignment.skills.map((skill, index) => (
                                                    <Badge key={index} variant="outline" className="text-xs">
                                                        {skill}
                                                    </Badge>
                                                ))}
                                            </div>

                                            {assignment.feedback && (
                                                <div className="mt-2 p-2 bg-blue-50 rounded-md">
                                                    <p className="text-sm text-blue-800">{assignment.feedback}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex flex-col space-y-2">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={`/learners/${assignment.learnerId}`}>
                                                    <User className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="outline" size="sm">
                                                <FileText className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Create Assignment Dialog */}
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Create New Assignment</DialogTitle>
                        <DialogDescription>
                            Create a new assignment for learners
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Assignment Title</Label>
                                <Input id="title" placeholder="Enter assignment title" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="level">Level</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Pink">Pink</SelectItem>
                                        <SelectItem value="Blue">Blue</SelectItem>
                                        <SelectItem value="Yellow">Yellow</SelectItem>
                                        <SelectItem value="Purple">Purple</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" placeholder="Describe the assignment" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="difficulty">Difficulty</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Difficulty" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Easy">Easy</SelectItem>
                                        <SelectItem value="Medium">Medium</SelectItem>
                                        <SelectItem value="Hard">Hard</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Est. Time (min)</Label>
                                <Input id="time" type="number" placeholder="15" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="dueDate">Due Date</Label>
                                <Input id="dueDate" type="date" />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                                Cancel
                            </Button>
                            <Button onClick={() => setShowCreateDialog(false)}>
                                <Send className="mr-2 h-4 w-4" />
                                Create Assignment
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
} 
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    Phone,
    Mail,
    Calendar,
    Target,
    BookOpen,
    TrendingUp,
    AlertTriangle,
    CheckCircle
} from "lucide-react"
import Link from "next/link"
import { learnersService, type Learner } from "@/lib/firebase-service"

// Utility functions for styling
const getLevelColor = (level: string) => {
    switch (level.toUpperCase()) {
        case 'PINK': return 'bg-pink-100 text-pink-800'
        case 'BLUE': return 'bg-blue-100 text-blue-800'
        case 'YELLOW': return 'bg-yellow-100 text-yellow-800'
        case 'PURPLE': return 'bg-purple-100 text-purple-800'
        default: return 'bg-gray-100 text-gray-800'
    }
}

const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
        case 'ACTIVE': return 'bg-green-100 text-green-800'
        case 'AT_RISK': return 'bg-red-100 text-red-800'
        case 'COMPLETED': return 'bg-blue-100 text-blue-800'
        case 'INACTIVE': return 'bg-gray-100 text-gray-800'
        default: return 'bg-gray-100 text-gray-800'
    }
}

const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600'
    if (progress >= 60) return 'text-yellow-600'
    return 'text-red-600'
}

export default function LearnersPage() {
    const [learners, setLearners] = useState<Learner[]>([])
    const [filteredLearners, setFilteredLearners] = useState<Learner[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [levelFilter, setLevelFilter] = useState<string>("all")
    const [selectedTab, setSelectedTab] = useState("overview")

    useEffect(() => {
        fetchLearners()
    }, [])

    const fetchLearners = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await learnersService.getAll()
            setLearners(data)
            setFilteredLearners(data)
        } catch (error) {
            console.error('Error fetching learners:', error)
            setError('Failed to fetch learners. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        let filtered = learners

        if (searchTerm) {
            filtered = filtered.filter(learner =>
                learner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                learner.tutor.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (statusFilter !== "all") {
            filtered = filtered.filter(learner => learner.status === statusFilter.toUpperCase())
        }

        if (levelFilter !== "all") {
            filtered = filtered.filter(learner => learner.level === levelFilter.toUpperCase())
        }

        setFilteredLearners(filtered)
    }, [learners, searchTerm, statusFilter, levelFilter])

    if (loading) {
        return (
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="text-center py-8">
                    <p className="text-red-600 mb-4">{error}</p>
                    <Button onClick={fetchLearners}>Try Again</Button>
                </div>
            </div>
        )
    }

    // Stats calculation
    const activeLearners = learners.filter(l => l.status === 'ACTIVE').length
    const atRiskLearners = learners.filter(l => l.status === 'AT_RISK').length
    const completedLearners = learners.filter(l => l.status === 'COMPLETED').length
    const avgProgress = learners.length > 0
        ? Math.round(learners.reduce((acc, l) => acc + l.progress, 0) / learners.length)
        : 0

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Learners</h2>
                    <p className="text-muted-foreground">
                        Manage and track your learners' progress
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Learner
                    </Button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeLearners}</div>
                        <p className="text-xs text-muted-foreground">
                            {learners.length > 0 ? Math.round((activeLearners / learners.length) * 100) : 0}% of total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">At Risk</CardTitle>
                        <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{atRiskLearners}</div>
                        <p className="text-xs text-muted-foreground">Need attention</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{completedLearners}</div>
                        <p className="text-xs text-muted-foreground">Program graduates</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{avgProgress}%</div>
                        <p className="text-xs text-muted-foreground">Overall completion</p>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search learners..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8"
                    />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="at_risk">At Risk</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="pink">Pink</SelectItem>
                        <SelectItem value="blue">Blue</SelectItem>
                        <SelectItem value="yellow">Yellow</SelectItem>
                        <SelectItem value="purple">Purple</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Learners Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredLearners.map((learner) => (
                    <Card key={learner.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={learner.avatar} alt={learner.name} />
                                        <AvatarFallback>{learner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <CardTitle className="text-base">{learner.name}</CardTitle>
                                        <CardDescription>Age {learner.age} • {learner.grade}</CardDescription>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end space-y-1">
                                    <Badge className={getLevelColor(learner.level)}>
                                        {learner.level}
                                    </Badge>
                                    <Badge variant="outline" className={getStatusColor(learner.status)}>
                                        {learner.status}
                                    </Badge>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span>Progress</span>
                                        <span className={getProgressColor(learner.progress)}>{learner.progress}%</span>
                                    </div>
                                    <Progress value={learner.progress} className="h-2" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-muted-foreground">Tutor:</span>
                                        <p className="font-medium">{learner.tutor}</p>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Sessions:</span>
                                        <p className="font-medium">{learner.sessionsThisWeek}/{learner.targetSessions}</p>
                                    </div>
                                </div>

                                {learner.parent && (
                                    <div className="border-t pt-3">
                                        <p className="text-sm font-medium mb-1">Parent Contact</p>
                                        <div className="text-xs text-muted-foreground space-y-1">
                                            <div className="flex items-center space-x-1">
                                                <Mail className="h-3 w-3" />
                                                <span>{learner.parent.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <Phone className="h-3 w-3" />
                                                <span>{learner.parent.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {learner.needsAttention && (
                                    <div className="bg-red-50 border border-red-200 rounded-md p-2">
                                        <div className="flex items-center space-x-1 text-red-800">
                                            <AlertTriangle className="h-3 w-3" />
                                            <span className="text-xs font-medium">Needs Attention</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredLearners.length === 0 && !loading && (
                <div className="text-center py-8">
                    <p className="text-muted-foreground">
                        {learners.length === 0
                            ? "No learners found. Add some learners to get started!"
                            : "No learners found matching your criteria."
                        }
                    </p>
                    {learners.length === 0 && (
                        <Button className="mt-4">
                            <Plus className="mr-2 h-4 w-4" />
                            Add First Learner
                        </Button>
                    )}
                </div>
            )}
        </div>
    )
} 
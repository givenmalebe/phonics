"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, BookOpen, CheckCircle, Clock, Users, Target, Search, Filter } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

const blueLevelModules = [
  {
    id: 1,
    title: "Consonant Blends",
    description: "Learning to blend consonants at the beginning of words",
    duration: "20-25 minutes",
    activities: 8,
    completed: false,
    progress: 75,
  },
  {
    id: 2,
    title: "Consonant Digraphs",
    description: "Understanding two letters that make one sound (sh, ch, th, wh)",
    duration: "25-30 minutes",
    activities: 10,
    completed: false,
    progress: 40,
  },
  {
    id: 3,
    title: "Initial Blends",
    description: "Working with bl, cl, fl, gl, pl, sl, br, cr, dr, fr, gr, pr, tr",
    duration: "30-35 minutes",
    activities: 12,
    completed: false,
    progress: 20,
  },
  {
    id: 4,
    title: "Final Blends",
    description: "Working with nd, nt, ft, lt, mp, nk, pt, sk, sp, st",
    duration: "25-30 minutes",
    activities: 10,
    completed: false,
    progress: 0,
  },
  {
    id: 5,
    title: "Three-Letter Blends",
    description: "Working with spr, str, scr, spl, squ",
    duration: "30-35 minutes",
    activities: 8,
    completed: false,
    progress: 0,
  },
]

const interactiveActivities = [
  {
    title: "Blend Builder",
    description: "Create words by combining consonant blends with vowels",
    type: "Interactive Game",
    difficulty: "Intermediate",
  },
  {
    title: "Digraph Detective",
    description: "Find and identify digraphs in words and sentences",
    type: "Audio Exercise",
    difficulty: "Intermediate",
  },
  {
    title: "Blend Bingo",
    description: "Play bingo with consonant blend words",
    type: "Interactive Game",
    difficulty: "Intermediate",
  },
]

const resources = [
  {
    title: "Consonant Blend Flashcards",
    type: "Printable",
    format: "PDF",
  },
  {
    title: "Digraph Sound Guide",
    type: "Audio",
    format: "MP3",
  },
  {
    title: "Blend Word List",
    type: "Printable",
    format: "PDF",
  },
]

export default function BlueLevelPage() {
  const [activeTab, setActiveTab] = useState("modules")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredModules = blueLevelModules.filter((module) =>
    module.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blue Level</h2>
          <p className="text-muted-foreground">Consonant blends and digraphs</p>
        </div>
        <Badge className="bg-blue-100 text-blue-800">Level 2</Badge>
      </div>

      {/* Level Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Consonant blends and digraphs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">27%</div>
            <p className="text-xs text-muted-foreground">Average across all learners</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">Currently in Blue Level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28 min</div>
            <p className="text-xs text-muted-foreground">Per lesson session</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="modules">Learning Modules</TabsTrigger>
          <TabsTrigger value="activities">Interactive Activities</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="objectives">Learning Objectives</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search modules..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Learning Modules */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Modules</CardTitle>
              <CardDescription>Structured lessons for Blue Level - Consonant blends and digraphs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredModules.map((module) => (
                  <div key={module.id} className="flex items-center space-x-4 rounded-lg border p-4">
                    <div className="flex-shrink-0">
                      {module.completed ? (
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      ) : (
                        <div className="h-8 w-8 rounded-full border-2 border-muted-foreground flex items-center justify-center">
                          <span className="text-sm font-medium">{module.id}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{module.title}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{module.activities} activities</Badge>
                          <Badge variant="outline">{module.duration}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={module.progress} className="flex-1" />
                        <span className="text-sm font-medium">{module.progress}%</span>
                      </div>
                    </div>

                    <Button variant={module.completed ? "outline" : "default"} size="sm" asChild>
                      <Link href={`/lessons/blue/module/${module.id}`}>
                        <Play className="mr-2 h-4 w-4" />
                        {module.completed ? "Review" : "Start"}
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          {/* Interactive Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Interactive Activities</CardTitle>
              <CardDescription>Engaging exercises to reinforce Blue Level concepts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {interactiveActivities.map((activity, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{activity.title}</CardTitle>
                        <Badge variant="secondary">{activity.difficulty}</Badge>
                      </div>
                      <CardDescription>{activity.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{activity.type}</Badge>
                        <Button size="sm">
                          <Play className="mr-2 h-4 w-4" />
                          Play
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          {/* Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Teaching Resources</CardTitle>
              <CardDescription>Materials to support Blue Level instruction</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{resource.title}</CardTitle>
                      <CardDescription>{resource.type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{resource.format}</Badge>
                        <Button size="sm">Download</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objectives" className="space-y-4">
          {/* Learning Objectives */}
          <Card>
            <CardHeader>
              <CardTitle>Blue Level Learning Objectives</CardTitle>
              <CardDescription>Key skills and concepts covered in this level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-semibold">Consonant Blends</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Identify and pronounce initial consonant blends</li>
                    <li>• Blend consonants with vowels to form words</li>
                    <li>• Recognize common blends in text</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Consonant Digraphs</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Recognize that two letters can make one sound</li>
                    <li>• Identify common digraphs: sh, ch, th, wh</li>
                    <li>• Read and spell words with digraphs</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Word Building</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Combine blends and digraphs with vowels</li>
                    <li>• Build and decode more complex words</li>
                    <li>• Increase reading fluency with blend words</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Reading Application</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Apply blend and digraph knowledge in reading</li>
                    <li>• Decode unfamiliar words with blends</li>
                    <li>• Read simple texts with increased confidence</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assessment Criteria</CardTitle>
              <CardDescription>How learners are evaluated in Blue Level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Mastery Requirements</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Accurately identify and pronounce all consonant blends</li>
                    <li>• Correctly read words containing digraphs with 90% accuracy</li>
                    <li>• Demonstrate ability to segment and blend words with consonant blends</li>
                    <li>• Successfully complete all module assessments with 80% or higher</li>
                  </ul>
                </div>
                <div className="flex justify-center mt-4">
                  <Button asChild>
                    <Link href="/lessons/blue/assessment">Take Assessment</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

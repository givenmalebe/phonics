import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, BookOpen, CheckCircle, Clock, Users, Target } from "lucide-react"
import Link from "next/link"

const pinkLevelModules = [
  {
    id: 1,
    title: "Introduction to Sounds",
    description: "Basic phoneme awareness and sound identification",
    duration: "15-20 minutes",
    activities: 5,
    completed: true,
    progress: 100,
  },
  {
    id: 2,
    title: "Single Letter Sounds",
    description: "Learning individual letter-sound correspondences",
    duration: "20-25 minutes",
    activities: 8,
    completed: true,
    progress: 100,
  },
  {
    id: 3,
    title: "Blending Simple Words",
    description: "Combining sounds to form simple CVC words",
    duration: "25-30 minutes",
    activities: 10,
    completed: false,
    progress: 60,
  },
  {
    id: 4,
    title: "Segmenting Sounds",
    description: "Breaking words into individual phonemes",
    duration: "20-25 minutes",
    activities: 7,
    completed: false,
    progress: 0,
  },
  {
    id: 5,
    title: "Sound Manipulation",
    description: "Adding, deleting, and substituting sounds",
    duration: "30-35 minutes",
    activities: 12,
    completed: false,
    progress: 0,
  },
]

const interactiveActivities = [
  {
    title: "Sound Matching Game",
    description: "Match sounds to their corresponding letters",
    type: "Interactive Game",
    difficulty: "Beginner",
  },
  {
    title: "Phoneme Segmentation",
    description: "Break words into individual sounds",
    type: "Audio Exercise",
    difficulty: "Beginner",
  },
  {
    title: "Blending Practice",
    description: "Combine sounds to form words",
    type: "Interactive Exercise",
    difficulty: "Intermediate",
  },
]

export default function PinkLevelPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pink Level</h2>
          <p className="text-muted-foreground">Basic sound-symbol relationships</p>
        </div>
        <Badge className="bg-pink-100 text-pink-800">Level 1</Badge>
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
            <p className="text-xs text-muted-foreground">Foundational concepts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">40%</div>
            <p className="text-xs text-muted-foreground">2 of 5 modules completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">Currently in Pink Level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24 min</div>
            <p className="text-xs text-muted-foreground">Per lesson session</p>
          </CardContent>
        </Card>
      </div>

      {/* Learning Modules */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Modules</CardTitle>
          <CardDescription>Structured lessons for Pink Level - Basic sound-symbol relationships</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pinkLevelModules.map((module) => (
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
                  <Link href={`/lessons/pink/module/${module.id}`}>
                    <Play className="mr-2 h-4 w-4" />
                    {module.completed ? "Review" : "Start"}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Activities</CardTitle>
          <CardDescription>Engaging exercises to reinforce Pink Level concepts</CardDescription>
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

      {/* Learning Objectives */}
      <Card>
        <CardHeader>
          <CardTitle>Pink Level Learning Objectives</CardTitle>
          <CardDescription>Key skills and concepts covered in this level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold">Phoneme Awareness</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Identify individual sounds in words</li>
                <li>• Distinguish between similar sounds</li>
                <li>• Recognize sound patterns</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Sound-Symbol Correspondence</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Match letters to their sounds</li>
                <li>• Recognize letter shapes and forms</li>
                <li>• Understand basic alphabetic principle</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Blending Skills</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Combine individual sounds</li>
                <li>• Form simple CVC words</li>
                <li>• Develop fluent blending</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Segmentation Skills</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Break words into sounds</li>
                <li>• Count phonemes in words</li>
                <li>• Isolate beginning and ending sounds</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

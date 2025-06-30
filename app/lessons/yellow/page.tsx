import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, BookOpen, CheckCircle, Clock, Users, Target, Download } from "lucide-react"
import Link from "next/link"

const yellowLevelModules = [
  {
    id: 1,
    title: "Long Vowel Patterns",
    description: "Understanding silent 'e' and long vowel sounds",
    duration: "25-30 minutes",
    activities: 10,
    completed: false,
    progress: 80,
  },
  {
    id: 2,
    title: "Vowel Teams",
    description: "Learning ai, ay, ee, ea, oa, ow vowel combinations",
    duration: "30-35 minutes",
    activities: 12,
    completed: false,
    progress: 60,
  },
  {
    id: 3,
    title: "R-Controlled Vowels",
    description: "Working with ar, er, ir, or, ur patterns",
    duration: "25-30 minutes",
    activities: 9,
    completed: false,
    progress: 40,
  },
  {
    id: 4,
    title: "Diphthongs",
    description: "Understanding oi, oy, ou, ow sound combinations",
    duration: "30-35 minutes",
    activities: 11,
    completed: false,
    progress: 20,
  },
  {
    id: 5,
    title: "Complex Vowel Patterns",
    description: "Advanced patterns like igh, eigh, augh, ough",
    duration: "35-40 minutes",
    activities: 14,
    completed: false,
    progress: 0,
  },
  {
    id: 6,
    title: "Multi-Syllable Words",
    description: "Breaking down and reading longer words",
    duration: "30-35 minutes",
    activities: 13,
    completed: false,
    progress: 0,
  },
  {
    id: 7,
    title: "Vowel Pattern Review",
    description: "Comprehensive review and application",
    duration: "40-45 minutes",
    activities: 15,
    completed: false,
    progress: 0,
  },
]

const interactiveActivities = [
  {
    title: "Vowel Team Detective",
    description: "Find and identify vowel teams in sentences",
    type: "Interactive Game",
    difficulty: "Advanced",
  },
  {
    title: "R-Controlled Sorting",
    description: "Sort words by their r-controlled vowel patterns",
    type: "Sorting Exercise",
    difficulty: "Advanced",
  },
  {
    title: "Diphthong Builder",
    description: "Create words using diphthong patterns",
    type: "Word Building",
    difficulty: "Advanced",
  },
  {
    title: "Syllable Splitter",
    description: "Practice dividing multi-syllable words",
    type: "Interactive Exercise",
    difficulty: "Expert",
  },
]

const resources = [
  {
    title: "Vowel Pattern Reference Chart",
    type: "Printable",
    format: "PDF",
  },
  {
    title: "R-Controlled Vowel Audio Guide",
    type: "Audio",
    format: "MP3",
  },
  {
    title: "Diphthong Word Lists",
    type: "Printable",
    format: "PDF",
  },
  {
    title: "Multi-Syllable Practice Sheets",
    type: "Printable",
    format: "PDF",
  },
]

export default function YellowLevelPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Yellow Level</h2>
          <p className="text-muted-foreground">Vowel patterns and combinations</p>
        </div>
        <Badge className="bg-yellow-100 text-yellow-800">Level 3</Badge>
      </div>

      {/* Level Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Advanced vowel concepts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">29%</div>
            <p className="text-xs text-muted-foreground">2 of 7 modules in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">Currently in Yellow Level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32 min</div>
            <p className="text-xs text-muted-foreground">Per lesson session</p>
          </CardContent>
        </Card>
      </div>

      {/* Learning Modules */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Modules</CardTitle>
          <CardDescription>Structured lessons for Yellow Level - Vowel patterns and combinations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {yellowLevelModules.map((module) => (
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
                  <Link href={`/lessons/yellow/module/${module.id}`}>
                    <Play className="mr-2 h-4 w-4" />
                    {module.completed ? "Review" : module.progress > 0 ? "Continue" : "Start"}
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
          <CardDescription>Engaging exercises to reinforce Yellow Level concepts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
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

      {/* Resources and Learning Objectives */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Downloadable Resources</CardTitle>
            <CardDescription>Supporting materials for Yellow Level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resources.map((resource, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-sm">{resource.title}</h4>
                    <p className="text-xs text-muted-foreground">{resource.type} • {resource.format}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Yellow Level Learning Objectives</CardTitle>
            <CardDescription>Key skills and concepts covered</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Vowel Patterns</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Master long vowel patterns</li>
                  <li>• Recognize vowel teams</li>
                  <li>• Apply silent 'e' rule</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Complex Sounds</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Understand r-controlled vowels</li>
                  <li>• Identify diphthongs</li>
                  <li>• Read complex patterns</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Word Structure</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Decode multi-syllable words</li>
                  <li>• Apply syllable division rules</li>
                  <li>• Improve reading fluency</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

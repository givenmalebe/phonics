import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, BookOpen, CheckCircle, Clock, Users, Target, Download, Star } from "lucide-react"
import Link from "next/link"

const purpleLevelModules = [
  {
    id: 1,
    title: "Silent Letters",
    description: "Understanding and reading words with silent letters",
    duration: "30-35 minutes",
    activities: 12,
    completed: false,
    progress: 70,
  },
  {
    id: 2,
    title: "Advanced Consonant Patterns",
    description: "Complex consonant combinations and unusual spellings",
    duration: "35-40 minutes",
    activities: 14,
    completed: false,
    progress: 50,
  },
  {
    id: 3,
    title: "Morphology Basics",
    description: "Understanding word parts and their meanings",
    duration: "40-45 minutes",
    activities: 16,
    completed: false,
    progress: 30,
  },
  {
    id: 4,
    title: "Prefixes and Suffixes",
    description: "Common word beginnings and endings",
    duration: "35-40 minutes",
    activities: 15,
    completed: false,
    progress: 15,
  },
  {
    id: 5,
    title: "Root Words and Etymology",
    description: "Understanding word origins and meanings",
    duration: "40-45 minutes",
    activities: 18,
    completed: false,
    progress: 0,
  },
  {
    id: 6,
    title: "Reading Fluency",
    description: "Developing speed, accuracy, and expression",
    duration: "45-50 minutes",
    activities: 20,
    completed: false,
    progress: 0,
  },
  {
    id: 7,
    title: "Advanced Spelling Patterns",
    description: "Complex and irregular spelling rules",
    duration: "40-45 minutes",
    activities: 17,
    completed: false,
    progress: 0,
  },
  {
    id: 8,
    title: "Comprehensive Review",
    description: "Integration of all advanced phonics skills",
    duration: "50-60 minutes",
    activities: 25,
    completed: false,
    progress: 0,
  },
]

const interactiveActivities = [
  {
    title: "Silent Letter Detective",
    description: "Find and identify silent letters in complex words",
    type: "Detective Game",
    difficulty: "Expert",
  },
  {
    title: "Morphology Builder",
    description: "Build words using prefixes, roots, and suffixes",
    type: "Word Construction",
    difficulty: "Expert",
  },
  {
    title: "Fluency Challenge",
    description: "Timed reading exercises with comprehension",
    type: "Reading Challenge",
    difficulty: "Expert",
  },
  {
    title: "Etymology Explorer",
    description: "Discover word origins and meanings",
    type: "Educational Game",
    difficulty: "Expert",
  },
]

const advancedFeatures = [
  {
    title: "Adaptive Assessment",
    description: "AI-powered evaluation of reading skills",
    icon: Star,
  },
  {
    title: "Personalized Learning Path",
    description: "Customized progression based on individual needs",
    icon: Target,
  },
  {
    title: "Advanced Analytics",
    description: "Detailed progress tracking and insights",
    icon: BookOpen,
  },
]

const resources = [
  {
    title: "Advanced Phonics Reference Guide",
    type: "Comprehensive Guide",
    format: "PDF",
  },
  {
    title: "Morphology Workbook",
    type: "Interactive Workbook",
    format: "PDF",
  },
  {
    title: "Fluency Assessment Tools",
    type: "Assessment Kit",
    format: "PDF + Audio",
  },
  {
    title: "Etymology Dictionary",
    type: "Reference Material",
    format: "PDF",
  },
]

export default function PurpleLevelPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Purple Level</h2>
          <p className="text-muted-foreground">Advanced phonics and reading fluency</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800">Level 4 - Expert</Badge>
      </div>

      {/* Level Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Expert-level concepts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21%</div>
            <p className="text-xs text-muted-foreground">2 of 8 modules in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Currently in Purple Level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42 min</div>
            <p className="text-xs text-muted-foreground">Per lesson session</p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Features */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Learning Features</CardTitle>
          <CardDescription>Purple Level includes enhanced learning tools and assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {advancedFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg">
                <feature.icon className="h-6 w-6 text-purple-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-sm">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Modules */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Modules</CardTitle>
          <CardDescription>Structured lessons for Purple Level - Advanced phonics and reading fluency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {purpleLevelModules.map((module) => (
              <div key={module.id} className="flex items-center space-x-4 rounded-lg border p-4">
                <div className="flex-shrink-0">
                  {module.completed ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <div className="h-8 w-8 rounded-full border-2 border-purple-400 flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-600">{module.id}</span>
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
                  <Link href={`/lessons/purple/module/${module.id}`}>
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
          <CardTitle>Expert-Level Activities</CardTitle>
          <CardDescription>Challenging exercises for advanced learners</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {interactiveActivities.map((activity, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow border-purple-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{activity.title}</CardTitle>
                    <Badge className="bg-purple-100 text-purple-800">{activity.difficulty}</Badge>
                  </div>
                  <CardDescription>{activity.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{activity.type}</Badge>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                      <Play className="mr-2 h-4 w-4" />
                      Start
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
            <CardTitle>Expert Resources</CardTitle>
            <CardDescription>Advanced materials for Purple Level</CardDescription>
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
            <CardTitle>Purple Level Mastery Goals</CardTitle>
            <CardDescription>Advanced skills and competencies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Advanced Decoding</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Master silent letter patterns</li>
                  <li>• Decode complex consonant clusters</li>
                  <li>• Apply advanced spelling rules</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Morphological Awareness</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Understand word structure</li>
                  <li>• Apply prefix/suffix knowledge</li>
                  <li>• Recognize root word patterns</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Reading Fluency</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Achieve grade-level reading speed</li>
                  <li>• Demonstrate reading expression</li>
                  <li>• Maintain comprehension accuracy</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

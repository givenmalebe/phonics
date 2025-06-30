import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Users, Clock, Target, ArrowRight, Play, CheckCircle } from "lucide-react"
import Link from "next/link"

const lessonLevels = [
  {
    id: "pink",
    title: "Pink Level",
    subtitle: "Basic Sound-Symbol Relationships",
    description: "Foundation level focusing on phoneme awareness and basic letter-sound correspondences",
    color: "pink",
    modules: 5,
    activeLearners: 45,
    avgDuration: "24 min",
    completionRate: 40,
    difficulty: "Beginner",
    skills: ["Phoneme Awareness", "Letter Recognition", "Basic Blending", "Sound Segmentation"],
    status: "active"
  },
  {
    id: "blue",
    title: "Blue Level",
    subtitle: "Consonant Blends & Digraphs",
    description: "Intermediate level covering consonant combinations and more complex sound patterns",
    color: "blue",
    modules: 6,
    activeLearners: 32,
    avgDuration: "28 min",
    completionRate: 65,
    difficulty: "Intermediate",
    skills: ["Consonant Blends", "Digraphs", "Initial Blends", "Final Blends"],
    status: "active"
  },
  {
    id: "yellow",
    title: "Yellow Level",
    subtitle: "Vowel Patterns & Combinations",
    description: "Advanced level focusing on complex vowel patterns and multi-syllable words",
    color: "yellow",
    modules: 7,
    activeLearners: 28,
    avgDuration: "32 min",
    completionRate: 45,
    difficulty: "Advanced",
    skills: ["Long Vowels", "Vowel Teams", "R-Controlled", "Diphthongs"],
    status: "active"
  },
  {
    id: "purple",
    title: "Purple Level",
    subtitle: "Advanced Phonics & Fluency",
    description: "Expert level covering advanced phonics rules and reading fluency development",
    color: "purple",
    modules: 8,
    activeLearners: 15,
    avgDuration: "35 min",
    completionRate: 30,
    difficulty: "Expert",
    skills: ["Silent Letters", "Morphology", "Prefixes/Suffixes", "Reading Fluency"],
    status: "active"
  }
]

const overallStats = {
  totalLearners: 120,
  totalModules: 26,
  avgCompletionRate: 45,
  totalLessonsCompleted: 1247
}

export default function LessonsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Lessons</h2>
          <p className="text-muted-foreground">
            Structured Phono-Graphix curriculum across all learning levels
          </p>
        </div>
        <Badge className="bg-green-100 text-green-800">4 Active Levels</Badge>
      </div>

      {/* Overall Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalLearners}</div>
            <p className="text-xs text-muted-foreground">Across all levels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Modules</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalModules}</div>
            <p className="text-xs text-muted-foreground">Learning modules available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.avgCompletionRate}%</div>
            <p className="text-xs text-muted-foreground">Across all levels</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallStats.totalLessonsCompleted.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total completions</p>
          </CardContent>
        </Card>
      </div>

      {/* Learning Levels */}
      <Card>
        <CardHeader>
          <CardTitle>Phono-Graphix Learning Levels</CardTitle>
          <CardDescription>
            Progressive curriculum designed to build reading skills systematically
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {lessonLevels.map((level, index) => (
              <div key={level.id} className="relative">
                {index < lessonLevels.length - 1 && (
                  <div className="absolute left-6 top-16 h-16 w-0.5 bg-border"></div>
                )}

                <div className="flex items-start space-x-4 rounded-lg border p-6 hover:shadow-md transition-shadow">
                  <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center ${level.color === 'pink' ? 'bg-pink-100' :
                    level.color === 'blue' ? 'bg-blue-100' :
                      level.color === 'yellow' ? 'bg-yellow-100' :
                        'bg-purple-100'
                    }`}>
                    <BookOpen className={`h-6 w-6 ${level.color === 'pink' ? 'text-pink-600' :
                      level.color === 'blue' ? 'text-blue-600' :
                        level.color === 'yellow' ? 'text-yellow-600' :
                          'text-purple-600'
                      }`} />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold">{level.title}</h3>
                        <p className="text-sm text-muted-foreground">{level.subtitle}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{level.difficulty}</Badge>
                        <Badge className={`${level.color === 'pink' ? 'bg-pink-100 text-pink-800' :
                            level.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                              level.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-purple-100 text-purple-800'
                          }`}>
                          {level.modules} modules
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">{level.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{level.activeLearners} learners</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{level.avgDuration} avg</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span>{level.completionRate}% complete</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={level.completionRate} className="flex-1" />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {level.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/lessons/${level.id}`}>
                            <BookOpen className="mr-2 h-4 w-4" />
                            View Modules
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link href={`/lessons/${level.id}`}>
                            <Play className="mr-2 h-4 w-4" />
                            Start Learning
                          </Link>
                        </Button>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common lesson management tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/tutors/planning">
                <BookOpen className="mr-2 h-4 w-4" />
                Create Lesson Plan
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/learners/reports">
                <Target className="mr-2 h-4 w-4" />
                View Progress Reports
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/tutors/resources">
                <BookOpen className="mr-2 h-4 w-4" />
                Access Resource Library
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Path Recommendations</CardTitle>
            <CardDescription>Suggested progression for different learner types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <h4 className="font-medium text-sm">New Learners</h4>
              <p className="text-xs text-muted-foreground">Start with Pink Level → Blue Level</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-sm">Intermediate Readers</h4>
              <p className="text-xs text-muted-foreground">Begin at Blue Level → Yellow Level</p>
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-sm">Advanced Learners</h4>
              <p className="text-xs text-muted-foreground">Yellow Level → Purple Level</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

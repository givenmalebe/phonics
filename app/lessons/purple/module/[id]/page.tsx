import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, CheckCircle, Clock, Users, BookOpen, Star } from "lucide-react"
import Link from "next/link"

const moduleContent = {
  1: {
    title: "Silent Letters",
    description: "Understanding and reading words with silent letters",
    activities: [
      {
        type: "instruction",
        title: "Silent Letter Patterns",
        content: "Learn common silent letter patterns like silent 'b', 'k', 'l', and 'w'.",
      },
      {
        type: "interactive",
        title: "Silent Letter Detective",
        content: "Find and identify silent letters in complex words.",
      },
      {
        type: "practice",
        title: "Reading Silent Letter Words",
        content: "Practice reading sentences with silent letter words.",
      },
      {
        type: "assessment",
        title: "Silent Letter Mastery Check",
        content: "Demonstrate understanding of silent letter patterns.",
      },
    ],
  },
  2: {
    title: "Advanced Consonant Patterns",
    description: "Complex consonant combinations and unusual spellings",
    activities: [
      {
        type: "instruction",
        title: "Complex Consonant Clusters",
        content: "Master advanced consonant combinations like 'tch', 'dge', 'ght'.",
      },
      {
        type: "interactive",
        title: "Pattern Recognition Game",
        content: "Identify and sort complex consonant patterns.",
      },
      {
        type: "practice",
        title: "Advanced Word Reading",
        content: "Read challenging words with complex consonant patterns.",
      },
      {
        type: "assessment",
        title: "Pattern Mastery Assessment",
        content: "Evaluate understanding of advanced consonant patterns.",
      },
    ],
  },
  3: {
    title: "Morphology Basics",
    description: "Understanding word parts and their meanings",
    activities: [
      {
        type: "instruction",
        title: "Word Parts Introduction",
        content: "Learn about prefixes, roots, and suffixes.",
      },
      {
        type: "interactive",
        title: "Morphology Builder",
        content: "Build words using different morphological components.",
      },
      {
        type: "practice",
        title: "Word Analysis Practice",
        content: "Break down complex words into their component parts.",
      },
      {
        type: "assessment",
        title: "Morphological Analysis Test",
        content: "Demonstrate ability to analyze word structure.",
      },
    ],
  },
}

export default function PurpleModulePage({ params }: { params: { id: string } }) {
  const moduleId = parseInt(params.id)
  const module = moduleContent[moduleId as keyof typeof moduleContent]

  if (!module) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Module Not Found</h2>
          <p className="text-muted-foreground">The requested module does not exist.</p>
          <Button asChild className="mt-4">
            <Link href="/lessons/purple">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Purple Level
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/lessons/purple">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Purple Level
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{module.title}</h2>
          <p className="text-muted-foreground">{module.description}</p>
        </div>
        <Badge className="bg-purple-100 text-purple-800">
          <Star className="mr-1 h-3 w-3" />
          Expert Module {moduleId}
        </Badge>
      </div>

      {/* Module Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activities</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{module.activities.length}</div>
            <p className="text-xs text-muted-foreground">Expert activities</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-muted-foreground">Completion rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 min</div>
            <p className="text-xs text-muted-foreground">Estimated time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Difficulty</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Expert</div>
            <p className="text-xs text-muted-foreground">Advanced level</p>
          </CardContent>
        </Card>
      </div>

      {/* Expert Features Notice */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-800">
            <Star className="mr-2 h-5 w-5" />
            Expert Level Features
          </CardTitle>
          <CardDescription>
            This module includes advanced assessment tools and personalized learning paths.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Module Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Expert Learning Activities</CardTitle>
          <CardDescription>Complete these advanced activities to master {module.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {module.activities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 rounded-lg border border-purple-200 p-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full border-2 border-purple-400 flex items-center justify-center">
                    <span className="text-sm font-medium text-purple-600">{index + 1}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{activity.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="capitalize">{activity.type}</Badge>
                      {activity.type === "assessment" && (
                        <Badge className="bg-purple-100 text-purple-800">
                          <Star className="mr-1 h-3 w-3" />
                          Assessment
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.content}</p>
                  <Progress value={0} className="w-full" />
                </div>

                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Play className="mr-2 h-4 w-4" />
                  Start
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Objectives */}
      <Card>
        <CardHeader>
          <CardTitle>Module Learning Objectives</CardTitle>
          <CardDescription>Skills you will master in this expert-level module</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold">Primary Skills</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Advanced pattern recognition</li>
                <li>• Complex word decoding</li>
                <li>• Morphological analysis</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Assessment Criteria</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 90% accuracy in pattern identification</li>
                <li>• Fluent reading of complex words</li>
                <li>• Successful completion of expert assessment</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Module Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" disabled={moduleId <= 1}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous Module
        </Button>
        <Button disabled={moduleId >= 8} className="bg-purple-600 hover:bg-purple-700">
          Next Module
          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
        </Button>
      </div>
    </div>
  )
}

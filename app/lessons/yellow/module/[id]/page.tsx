import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, CheckCircle, Clock, Users, BookOpen } from "lucide-react"
import Link from "next/link"

const moduleContent = {
  1: {
    title: "Long Vowel Patterns",
    description: "Understanding silent 'e' and long vowel sounds",
    activities: [
      {
        type: "instruction",
        title: "Silent 'E' Magic",
        content: "Learn how adding a silent 'e' changes short vowels to long vowels.",
      },
      {
        type: "interactive",
        title: "Long Vowel Identification",
        content: "Practice identifying long vowel sounds in words.",
      },
      {
        type: "practice",
        title: "Word Transformation",
        content: "Transform short vowel words to long vowel words using silent 'e'.",
      },
    ],
  },
  2: {
    title: "Vowel Teams",
    description: "Learning ai, ay, ee, ea, oa, ow vowel combinations",
    activities: [
      {
        type: "instruction",
        title: "Vowel Team Introduction",
        content: "Discover how two vowels work together to make one sound.",
      },
      {
        type: "interactive",
        title: "Vowel Team Sorting",
        content: "Sort words by their vowel team patterns.",
      },
      {
        type: "practice",
        title: "Reading Vowel Teams",
        content: "Practice reading sentences with vowel team words.",
      },
    ],
  },
  3: {
    title: "R-Controlled Vowels",
    description: "Working with ar, er, ir, or, ur patterns",
    activities: [
      {
        type: "instruction",
        title: "R-Controlled Introduction",
        content: "Learn how 'r' changes the sound of vowels.",
      },
      {
        type: "interactive",
        title: "R-Controlled Matching",
        content: "Match r-controlled words to their sounds.",
      },
      {
        type: "practice",
        title: "R-Controlled Reading",
        content: "Read stories featuring r-controlled vowel words.",
      },
    ],
  },
}

export default function YellowModulePage({ params }: { params: { id: string } }) {
  const moduleId = parseInt(params.id)
  const module = moduleContent[moduleId as keyof typeof moduleContent]

  if (!module) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Module Not Found</h2>
          <p className="text-muted-foreground">The requested module does not exist.</p>
          <Button asChild className="mt-4">
            <Link href="/lessons/yellow">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Yellow Level
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
          <Link href="/lessons/yellow">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Yellow Level
          </Link>
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{module.title}</h2>
          <p className="text-muted-foreground">{module.description}</p>
        </div>
        <Badge className="bg-yellow-100 text-yellow-800">Module {moduleId}</Badge>
      </div>

      {/* Module Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activities</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{module.activities.length}</div>
            <p className="text-xs text-muted-foreground">Learning activities</p>
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
            <div className="text-2xl font-bold">30 min</div>
            <p className="text-xs text-muted-foreground">Estimated time</p>
          </CardContent>
        </Card>
      </div>

      {/* Module Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Activities</CardTitle>
          <CardDescription>Complete these activities in order to master {module.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {module.activities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 rounded-lg border p-4">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full border-2 border-yellow-400 flex items-center justify-center">
                    <span className="text-sm font-medium text-yellow-600">{index + 1}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{activity.title}</h3>
                    <Badge variant="outline" className="capitalize">{activity.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.content}</p>
                  <Progress value={0} className="w-full" />
                </div>

                <Button size="sm">
                  <Play className="mr-2 h-4 w-4" />
                  Start
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Module Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" disabled={moduleId <= 1}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous Module
        </Button>
        <Button disabled={moduleId >= 7}>
          Next Module
          <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
        </Button>
      </div>
    </div>
  )
}

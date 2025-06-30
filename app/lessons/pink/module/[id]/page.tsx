"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Volume2, CheckCircle, RotateCcw, Play } from "lucide-react"
import Link from "next/link"

const moduleContent = {
  1: {
    title: "Introduction to Sounds",
    description: "Basic phoneme awareness and sound identification",
    activities: [
      {
        type: "instruction",
        title: "What are Sounds?",
        content: "Every word is made up of individual sounds called phonemes. Let's learn to hear and identify these sounds.",
        detailedContent: {
          introduction: "Welcome to the wonderful world of sounds! In this lesson, we'll discover how words are made up of tiny building blocks called sounds or 'phonemes'.",
          keyPoints: [
            "Every word has individual sounds that we can hear",
            "These sounds are called 'phonemes' - the smallest units of sound in language",
            "Learning to hear these sounds is the first step to reading",
            "Some sounds are made by our voice (vowels), others by blocking air (consonants)"
          ],
          examples: [
            { word: "cat", sounds: ["/c/", "/a/", "/t/"], description: "The word 'cat' has 3 sounds" },
            { word: "dog", sounds: ["/d/", "/o/", "/g/"], description: "The word 'dog' has 3 sounds" },
            { word: "sun", sounds: ["/s/", "/u/", "/n/"], description: "The word 'sun' has 3 sounds" }
          ],
          tips: [
            "Listen carefully - some sounds are very similar",
            "Put your hand on your throat to feel vibrations",
            "Watch your mouth in a mirror as you make sounds",
            "Practice makes perfect!"
          ]
        }
      },
      {
        type: "interactive",
        title: "Sound Identification Game",
        content: "Listen to each sound and identify what you hear. Click on the correct answer!",
        sounds: [
          { phoneme: "/a/", word: "apple", image: "🍎", description: "The /a/ sound like in 'apple'" },
          { phoneme: "/m/", word: "mouse", image: "🐭", description: "The /m/ sound like in 'mouse'" },
          { phoneme: "/s/", word: "sun", image: "☀️", description: "The /s/ sound like in 'sun'" },
          { phoneme: "/t/", word: "tree", image: "🌳", description: "The /t/ sound like in 'tree'" },
          { phoneme: "/i/", word: "igloo", image: "🏠", description: "The /i/ sound like in 'igloo'" },
          { phoneme: "/n/", word: "nest", image: "🪺", description: "The /n/ sound like in 'nest'" }
        ],
        instructions: [
          "Click the play button to hear a sound",
          "Listen carefully to the phoneme",
          "Choose the picture that starts with that sound",
          "Get feedback on your answer"
        ]
      },
      {
        type: "practice",
        title: "Sound Counting Challenge",
        content: "Count how many sounds you hear in each word. This builds phonemic awareness!",
        exercises: [
          { word: "cat", soundCount: 3, sounds: ["/c/", "/a/", "/t/"], difficulty: "easy" },
          { word: "dog", soundCount: 3, sounds: ["/d/", "/o/", "/g/"], difficulty: "easy" },
          { word: "fish", soundCount: 3, sounds: ["/f/", "/i/", "/sh/"], difficulty: "medium" },
          { word: "bird", soundCount: 3, sounds: ["/b/", "/ir/", "/d/"], difficulty: "medium" },
          { word: "frog", soundCount: 4, sounds: ["/f/", "/r/", "/o/", "/g/"], difficulty: "hard" }
        ],
        instructions: [
          "Listen to the word carefully",
          "Count each individual sound",
          "Remember: some letters make one sound together",
          "Click the number of sounds you hear"
        ]
      },
      {
        type: "interactive",
        title: "First Sound Detective",
        content: "Identify the first sound in different words. This is called 'initial phoneme identification'.",
        words: [
          { word: "ball", firstSound: "/b/", image: "⚽", options: ["/b/", "/d/", "/p/"] },
          { word: "car", firstSound: "/c/", image: "🚗", options: ["/c/", "/k/", "/g/"] },
          { word: "fish", firstSound: "/f/", image: "🐟", options: ["/f/", "/v/", "/th/"] },
          { word: "hat", firstSound: "/h/", image: "👒", options: ["/h/", "/ch/", "/sh/"] },
          { word: "lamp", firstSound: "/l/", image: "💡", options: ["/l/", "/r/", "/w/"] }
        ],
        tips: [
          "Say the word slowly",
          "Focus on the very first sound",
          "Don't be confused by the letter name",
          "Listen for the sound, not the spelling"
        ]
      },
      {
        type: "assessment",
        title: "Sound Awareness Check",
        content: "Let's see how well you can identify and work with sounds!",
        questions: [
          {
            type: "multiple-choice",
            question: "How many sounds are in the word 'sun'?",
            options: ["2", "3", "4"],
            correct: "3",
            explanation: "The word 'sun' has 3 sounds: /s/ /u/ /n/"
          },
          {
            type: "sound-identification",
            question: "What is the first sound in 'dog'?",
            options: ["/d/", "/g/", "/o/"],
            correct: "/d/",
            explanation: "The first sound in 'dog' is /d/"
          },
          {
            type: "sound-matching",
            question: "Which word starts with the same sound as 'cat'?",
            options: ["car", "dog", "fish"],
            correct: "car",
            explanation: "Both 'cat' and 'car' start with the /c/ sound"
          }
        ]
      }
    ],
    learningObjectives: [
      "Understand that words are made up of individual sounds (phonemes)",
      "Identify and isolate individual sounds in spoken words",
      "Count the number of sounds in simple words",
      "Recognize the first sound in words",
      "Distinguish between similar sounds",
      "Develop phonemic awareness as foundation for reading"
    ],
    vocabulary: [
      { term: "Phoneme", definition: "The smallest unit of sound in a language" },
      { term: "Sound", definition: "What we hear when someone speaks" },
      { term: "Word", definition: "A group of sounds that has meaning" },
      { term: "First Sound", definition: "The beginning sound in a word" },
      { term: "Counting Sounds", definition: "Figuring out how many phonemes are in a word" }
    ]
  },
}

export default function ModulePage({ params }: { params: { id: string } }) {
  const [currentActivity, setCurrentActivity] = useState(0)
  const [progress, setProgress] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const moduleId = Number.parseInt(params.id)
  const module = moduleContent[moduleId as keyof typeof moduleContent]

  if (!module) {
    return <div>Module not found</div>
  }

  const currentActivityData = module.activities[currentActivity]
  const totalActivities = module.activities.length

  const handleNext = () => {
    if (currentActivity < totalActivities - 1) {
      setCurrentActivity(currentActivity + 1)
      setProgress(((currentActivity + 1) / totalActivities) * 100)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }

  const handlePrevious = () => {
    if (currentActivity > 0) {
      setCurrentActivity(currentActivity - 1)
      setProgress(((currentActivity - 1) / totalActivities) * 100)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    setShowFeedback(true)
    // Simple logic for demonstration - in real app, this would check against correct answers
    setIsCorrect(Math.random() > 0.5)
  }

  const playSound = (sound: string) => {
    // In a real app, this would play the actual sound
    console.log(`Playing sound: ${sound}`)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/lessons/pink">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{module.title}</h2>
            <p className="text-muted-foreground">{module.description}</p>
          </div>
        </div>
        <Badge className="bg-pink-100 text-pink-800">Pink Level</Badge>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              {currentActivity + 1} of {totalActivities} activities
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>

      {/* Activity Content */}
      <Card className="min-h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {currentActivityData.title}
            <Badge variant="outline">{currentActivityData.type}</Badge>
          </CardTitle>
          <CardDescription>{currentActivityData.content}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentActivityData.type === "instruction" && (
            <div className="space-y-6">
              {/* Introduction */}
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4 text-pink-800">Welcome to Sounds!</h3>
                <p className="text-lg text-gray-700">{currentActivityData.detailedContent?.introduction}</p>
              </div>

              {/* Key Points */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 text-blue-800">Key Learning Points</h4>
                <ul className="space-y-2">
                  {currentActivityData.detailedContent?.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Examples */}
              <div className="bg-yellow-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 text-yellow-800">Sound Examples</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  {currentActivityData.detailedContent?.examples.map((example, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 border border-yellow-200">
                      <h5 className="font-semibold text-lg text-center mb-2">{example.word}</h5>
                      <div className="flex justify-center space-x-1 mb-2">
                        {example.sounds.map((sound, soundIndex) => (
                          <span key={soundIndex} className="bg-yellow-100 px-2 py-1 rounded text-sm font-mono">
                            {sound}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 text-center">{example.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 text-green-800">Helpful Tips</h4>
                <div className="grid gap-3 md:grid-cols-2">
                  {currentActivityData.detailedContent?.tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className="bg-green-200 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentActivityData.type === "interactive" && currentActivityData.sounds && (
            <div className="space-y-6">
              {/* Instructions */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-blue-800">How to Play:</h4>
                <ul className="space-y-1 text-sm">
                  {currentActivityData.instructions?.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="bg-blue-200 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sound Buttons */}
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Click on a sound to hear it:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {currentActivityData.sounds.map((soundObj, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="lg"
                      className="h-24 flex flex-col space-y-2 text-lg hover:bg-pink-50"
                      onClick={() => playSound(soundObj.phoneme)}
                    >
                      <Volume2 className="h-6 w-6 text-pink-600" />
                      <span className="font-mono text-xl">{soundObj.phoneme}</span>
                      <span className="text-xs text-gray-500">{soundObj.word}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Picture Matching */}
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Match the sound to the picture:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {currentActivityData.sounds.map((soundObj, index) => (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all ${selectedAnswer === soundObj.word
                        ? showFeedback
                          ? isCorrect
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                          : "border-blue-500 bg-blue-50"
                        : "hover:border-gray-400 hover:shadow-md"
                        }`}
                      onClick={() => handleAnswerSelect(soundObj.word)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="w-20 h-20 mx-auto mb-3 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-3xl">{soundObj.image}</span>
                        </div>
                        <p className="font-medium text-lg">{soundObj.word}</p>
                        <p className="text-sm text-gray-500 mt-1">{soundObj.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {showFeedback && (
                <div
                  className={`text-center p-4 rounded-lg ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    {isCorrect ? <CheckCircle className="h-5 w-5" /> : <RotateCcw className="h-5 w-5" />}
                    <span className="font-medium">
                      {isCorrect ? "Excellent! You identified the sound correctly!" : "Try again! Listen carefully to the sound and think about which picture starts with that sound."}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentActivityData.type === "practice" && currentActivityData.exercises && (
            <div className="space-y-6">
              {/* Instructions */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-green-800">Practice Instructions:</h4>
                <ul className="space-y-1 text-sm">
                  {currentActivityData.instructions?.map((instruction, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="bg-green-200 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practice Exercises */}
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">{currentActivityData.content}</h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {currentActivityData.exercises.map((exercise, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6 text-center">
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 ${exercise.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                          exercise.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                          {exercise.difficulty}
                        </div>

                        <h4 className="text-2xl font-bold mb-3">{exercise.word}</h4>

                        <div className="flex justify-center space-x-1 mb-4">
                          {exercise.sounds.map((sound, soundIndex) => (
                            <span key={soundIndex} className="bg-blue-100 px-2 py-1 rounded text-sm font-mono">
                              {sound}
                            </span>
                          ))}
                        </div>

                        <p className="text-sm text-gray-600 mb-4">How many sounds do you hear?</p>

                        <div className="flex justify-center space-x-2">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <Button
                              key={num}
                              variant={selectedAnswer === num.toString() ? "default" : "outline"}
                              size="sm"
                              className="w-10 h-10"
                              onClick={() => handleAnswerSelect(num.toString())}
                            >
                              {num}
                            </Button>
                          ))}
                        </div>

                        {showFeedback && selectedAnswer === exercise.soundCount.toString() && (
                          <div className={`mt-4 p-3 rounded-lg ${isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}>
                            <p className="font-medium">
                              {isCorrect
                                ? `Correct! "${exercise.word}" has ${exercise.soundCount} sounds.`
                                : `Try again! Listen carefully to each sound in "${exercise.word}".`
                              }
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Learning Objectives and Vocabulary */}
      {module.learningObjectives && (
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Learning Objectives</CardTitle>
              <CardDescription>What you'll master in this module</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {module.learningObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">{objective}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Key Vocabulary</CardTitle>
              <CardDescription>Important terms to remember</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {module.vocabulary?.map((item, index) => (
                  <div key={index} className="border-l-4 border-pink-200 pl-3">
                    <h4 className="font-semibold text-sm">{item.term}</h4>
                    <p className="text-xs text-gray-600">{item.definition}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={currentActivity === 0}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <Button onClick={handleNext} disabled={currentActivity === totalActivities - 1}>
          Next
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function EnrollLearnerPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/learners">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Enroll New Learner</h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic details about the learner</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter first name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter last name" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input id="dateOfBirth" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade">Grade Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="k">Kindergarten</SelectItem>
                    <SelectItem value="1">1st Grade</SelectItem>
                    <SelectItem value="2">2nd Grade</SelectItem>
                    <SelectItem value="3">3rd Grade</SelectItem>
                    <SelectItem value="4">4th Grade</SelectItem>
                    <SelectItem value="5">5th Grade</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <RadioGroup defaultValue="prefer-not-to-say" className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                  <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Parent/Guardian contact details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="parentName">Parent/Guardian Name</Label>
              <Input id="parentName" placeholder="Enter parent/guardian name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter email address" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input id="emergencyContact" type="tel" placeholder="Emergency contact" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Enter full address" />
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
            <CardDescription>Current reading level and learning needs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentReadingLevel">Current Reading Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select reading level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pre-reader">Pre-Reader</SelectItem>
                  <SelectItem value="emergent">Emergent Reader</SelectItem>
                  <SelectItem value="early">Early Reader</SelectItem>
                  <SelectItem value="developing">Developing Reader</SelectItem>
                  <SelectItem value="fluent">Fluent Reader</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startingLevel">Starting Phono-Graphix Level</Label>
              <Select defaultValue="pink">
                <SelectTrigger>
                  <SelectValue placeholder="Select starting level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pink">Pink Level (Basic sound-symbol relationships)</SelectItem>
                  <SelectItem value="blue">Blue Level (Consonant blends and digraphs)</SelectItem>
                  <SelectItem value="yellow">Yellow Level (Multisyllabic word decoding)</SelectItem>
                  <SelectItem value="purple">Purple Level (Advanced code knowledge)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="learningDifferences">Learning Differences/Special Needs</Label>
              <Textarea
                id="learningDifferences"
                placeholder="Describe any learning differences or special accommodations needed"
              />
            </div>

            <div className="space-y-2">
              <Label>Previous Reading Interventions</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="phonics" />
                  <Label htmlFor="phonics">Phonics-based programs</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="whole-language" />
                  <Label htmlFor="whole-language">Whole language approach</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="orton-gillingham" />
                  <Label htmlFor="orton-gillingham">Orton-Gillingham</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="wilson" />
                  <Label htmlFor="wilson">Wilson Reading System</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="other" />
                  <Label htmlFor="other">Other (please specify in notes)</Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assignment and Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Assignment and Goals</CardTitle>
            <CardDescription>Tutor assignment and learning objectives</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="assignedTutor">Assigned Tutor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select tutor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  <SelectItem value="mike">Mike Chen</SelectItem>
                  <SelectItem value="emily">Emily Davis</SelectItem>
                  <SelectItem value="david">David Wilson</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionFrequency">Session Frequency</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="3-times-week">3 times per week</SelectItem>
                  <SelectItem value="2-times-week">2 times per week</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionDuration">Session Duration (minutes)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="learningGoals">Learning Goals</Label>
              <Textarea
                id="learningGoals"
                placeholder="Describe specific learning goals and objectives for this learner"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes</Label>
              <Textarea id="additionalNotes" placeholder="Any additional information about the learner" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" asChild>
          <Link href="/learners">Cancel</Link>
        </Button>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Enroll Learner
        </Button>
      </div>
    </div>
  )
}

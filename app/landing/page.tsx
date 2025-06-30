"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Users,
  Target,
  Award,
  CheckCircle,
  Star,
  ArrowRight,
  Play,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  Building,
} from "lucide-react"
import { useRouter } from "next/navigation"

// STRETCH SA Logo Component
const StretchLogo = ({ className = "h-12 w-auto" }: { className?: string }) => (
  <Image
    src="/stretch logo.png"
    alt="STRETCH SA Logo"
    width={200}
    height={200}
    className={className}
    priority
  />
)

const features = [
  {
    icon: BookOpen,
    title: "Structured Learning",
    description:
      "Four progressive levels: Pink, Blue, Yellow, and Purple, each building on the previous level's foundation.",
  },
  {
    icon: Users,
    title: "Expert Tutors",
    description: "Certified Phono-Graphix instructors with specialized training in reading intervention.",
  },
  {
    icon: Target,
    title: "Progress Tracking",
    description: "Detailed analytics and progress monitoring for learners, tutors, and administrators.",
  },
  {
    icon: Award,
    title: "Proven Results",
    description: "Evidence-based methodology with demonstrated success in improving reading skills.",
  },
]

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Parent",
    content:
      "My daughter Emma went from struggling with basic sounds to reading confidently in just 6 months. The Phono-Graphix method really works!",
    rating: 5,
  },
  {
    name: "Dr. James Rodriguez",
    role: "Reading Specialist",
    content:
      "As an educator, I've seen many reading programs. Phono-Graphix stands out for its systematic approach and measurable results.",
    rating: 5,
  },
  {
    name: "Lisa Thompson",
    role: "Tutor",
    content:
      "The platform makes it easy to track student progress and customize lessons. My students are more engaged than ever.",
    rating: 5,
  },
]

const stats = [
  { number: "10,000+", label: "Students Helped" },
  { number: "95%", label: "Success Rate" },
  { number: "500+", label: "Certified Tutors" },
  { number: "50+", label: "Schools Using" },
]

export default function LandingPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "parent",
    organization: "",
  })
  const [activeTab, setActiveTab] = useState("login")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login - in real app, this would authenticate with backend
    if (loginData.email && loginData.password) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: loginData.email,
          name: "Demo User",
          role: "administrator",
        }),
      )
      router.push("/")
    } else {
      alert("Please enter email and password")
    }
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate signup - in real app, this would create account
    if (signupData.email && signupData.password && signupData.firstName && signupData.lastName) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: signupData.email,
          name: `${signupData.firstName} ${signupData.lastName}`,
          role: signupData.role,
        }),
      )
      router.push("/")
    } else {
      alert("Please fill in all required fields")
    }
  }

  const handleDemoLogin = () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: "demo@phonographix.edu",
        name: "Demo Administrator",
        role: "administrator",
      }),
    )
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <StretchLogo className="h-20 w-auto" />
              <span className="text-xl font-bold text-gray-900">Stretch Education SA</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
                Testimonials
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </a>
              <Button variant="outline" onClick={() => document.getElementById("auth-section")?.scrollIntoView()}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  Evidence-Based Reading Instruction
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Transform Reading Skills with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600">
                    Phono-Graphix
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  A comprehensive platform for systematic reading instruction using the proven Phono-Graphix
                  methodology. Help learners master the code of written English through structured, interactive lessons.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" onClick={handleDemoLogin}>
                  <Play className="mr-2 h-5 w-5" />
                  Try Demo
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => document.getElementById("auth-section")?.scrollIntoView()}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Learning Progress</h3>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>

                  <div className="space-y-4">
                    {[
                      { level: "Pink Level", progress: 85, color: "bg-pink-500" },
                      { level: "Blue Level", progress: 72, color: "bg-blue-500" },
                      { level: "Yellow Level", progress: 45, color: "bg-yellow-500" },
                      { level: "Purple Level", progress: 23, color: "bg-purple-500" },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{item.level}</span>
                          <span className="text-gray-600">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${item.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Overall Progress</span>
                      <span className="font-semibold">56%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose Phono-Graphix?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines proven methodology with modern technology to deliver exceptional reading
              instruction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">The Phono-Graphix Method</h2>
              <p className="text-lg text-gray-600">
                Phono-Graphix is a research-based approach to reading instruction that teaches learners to understand
                the relationship between sounds and letters in the English language.
              </p>

              <div className="space-y-4">
                {[
                  "Systematic progression through four distinct levels",
                  "Focus on phoneme awareness and manipulation",
                  "Evidence-based methodology with proven results",
                  "Suitable for learners of all ages and abilities",
                ].map((point, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" variant="outline">
                Learn More About Our Method
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Pink Level", desc: "Basic sound-symbol relationships", color: "bg-pink-100 border-pink-200" },
                { title: "Blue Level", desc: "Consonant blends and digraphs", color: "bg-blue-100 border-blue-200" },
                {
                  title: "Yellow Level",
                  desc: "Multisyllabic word decoding",
                  color: "bg-yellow-100 border-yellow-200",
                },
                { title: "Purple Level", desc: "Advanced code knowledge", color: "bg-purple-100 border-purple-200" },
              ].map((level, index) => (
                <Card key={index} className={`${level.color} border-2`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{level.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700">{level.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Community Says</h2>
            <p className="text-xl text-gray-600">
              Hear from parents, educators, and tutors who have experienced success with Phono-Graphix.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">&ldquo;{testimonial.content}&rdquo;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Authentication Section */}
      <section id="auth-section" className="py-20 bg-gray-50">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Get Started Today</h2>
            <p className="text-gray-600">Join thousands of educators and families using Phono-Graphix</p>
          </div>

          <Card className="shadow-xl">
            <CardHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4 mt-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          value={loginData.email}
                          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                          value={loginData.password}
                          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Sign In
                    </Button>

                    <div className="text-center">
                      <Button type="button" variant="link" className="text-sm">
                        Forgot your password?
                      </Button>
                    </div>
                  </form>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">Or</span>
                    </div>
                  </div>

                  <Button type="button" variant="outline" className="w-full" onClick={handleDemoLogin}>
                    <Play className="mr-2 h-4 w-4" />
                    Try Demo Account
                  </Button>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4 mt-6">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="First name"
                          value={signupData.firstName}
                          onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Last name"
                          value={signupData.lastName}
                          onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signupEmail">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signupEmail"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          value={signupData.email}
                          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signupPassword">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="signupPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="pl-10 pr-10"
                          value={signupData.password}
                          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">I am a...</Label>
                      <select
                        id="role"
                        className="w-full p-2 border border-gray-300 rounded-md"
                        value={signupData.role}
                        onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
                      >
                        <option value="parent">Parent/Guardian</option>
                        <option value="tutor">Tutor</option>
                        <option value="administrator">Administrator</option>
                        <option value="educator">Educator</option>
                      </select>
                    </div>

                    {(signupData.role === "tutor" ||
                      signupData.role === "administrator" ||
                      signupData.role === "educator") && (
                        <div className="space-y-2">
                          <Label htmlFor="organization">Organization</Label>
                          <div className="relative">
                            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              id="organization"
                              placeholder="School or organization name"
                              className="pl-10"
                              value={signupData.organization}
                              onChange={(e) => setSignupData({ ...signupData, organization: e.target.value })}
                            />
                          </div>
                        </div>
                      )}

                    <Button type="submit" className="w-full">
                      Create Account
                    </Button>

                    <p className="text-xs text-gray-600 text-center">
                      By signing up, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </form>
                </TabsContent>
              </Tabs>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Get in Touch</h2>
            <p className="text-xl text-gray-600">
              Have questions? We&apos;re here to help you get started with Phono-Graphix.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle>Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">support@phonographix.edu</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle>Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">1-800-PHONO-GX</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Access our help center and documentation</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <StretchLogo className="h-16 w-auto" />
                <span className="text-lg font-bold">Stretch Education SA</span>
              </div>
              <p className="text-gray-400">
                Transforming reading instruction through evidence-based methodology and innovative technology.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Phono-Graphix Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

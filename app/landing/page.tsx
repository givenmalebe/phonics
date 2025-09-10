"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import {
  BookOpen,
  Users,
  Target,
  Award,
  CheckCircle,
  Star,
  ArrowRight,
  Eye,
  EyeOff,
  Mail,
  Lock,
  Phone,
  Building,
  X,
  User,
  Menu,
  Play,
  Sparkles,
  TrendingUp,
  Heart,
  Shield,
  GraduationCap,
  BookMarked,
  BarChart3,
  Clock,
  Calendar,
  FileText,
  Lightbulb,
  Users2,
  Monitor,
  Headphones,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/auth-service"
import { mockLogin, getMockUserProfile } from "@/lib/mock-auth"

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
    icon: BookMarked,
    title: "Structured Curriculum",
    description:
      "Access our comprehensive Phono-Graphix curriculum with four progressive levels: Pink, Blue, Yellow, and Purple.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Users2,
    title: "Student Management",
    description: "Track individual student progress, manage groups, and customize learning paths for each learner.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Detailed reports and analytics to monitor student growth and identify areas for intervention.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Award,
    title: "Professional Development",
    description: "Ongoing training and certification in Phono-Graphix methodology and best practices.",
    gradient: "from-orange-500 to-red-500",
  },
]

const stats = [
  { number: "500+", label: "Active Tutors", icon: Users2 },
  { number: "95%", label: "Student Success Rate", icon: TrendingUp },
  { number: "10,000+", label: "Students Helped", icon: GraduationCap },
  { number: "4", label: "Learning Levels", icon: BookOpen },
]

export default function LandingPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [modalLoginData, setModalLoginData] = useState({ email: "", password: "" })
  const [showModalPassword, setShowModalPassword] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!loginData.email || !loginData.password) {
      alert("Please enter email and password")
      return
    }

    try {
      // Use mock authentication for testing
      const mockUser = mockLogin(loginData.email, loginData.password)
      if (!mockUser) {
        throw new Error("Authentication failed")
      }
      const profile = getMockUserProfile(mockUser.uid)
      
      if (!profile) {
        throw new Error("Failed to get user profile")
      }
      
      // Redirect based on role and onboarding status
      if (profile.onboardingCompleted) {
        switch (profile.role) {
          case 'ADMIN':
            router.replace("/admin")
            break
          case 'TUTOR':
            router.replace("/tutor")
            break
          
          default:
        router.replace("/")
        }
      } else {
        router.replace("/onboarding")
      }
    } catch (error) {
      console.error("Login error:", error)
      alert(error instanceof Error ? error.message : "Login failed. Please try again.")
    }
  }

  const handleModalLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!modalLoginData.email || !modalLoginData.password) {
      alert("Please enter email and password")
      return
    }

    setModalLoading(true)
    try {
      // Use mock authentication for testing
      const mockUser = mockLogin(modalLoginData.email, modalLoginData.password)
      if (!mockUser) {
        throw new Error("Authentication failed")
      }
      const profile = getMockUserProfile(mockUser.uid)
      
      if (!profile) {
        throw new Error("Failed to get user profile")
      }
      
      setIsLoginModalOpen(false)
      
      // Redirect based on role and onboarding status
      if (profile.onboardingCompleted) {
        switch (profile.role) {
          case 'ADMIN':
            router.replace("/admin")
            break
          case 'TUTOR':
            router.replace("/tutor")
            break
          
          default:
        router.replace("/")
        }
      } else {
        router.replace("/onboarding")
      }
    } catch (error) {
      console.error("Modal login error:", error)
      alert(error instanceof Error ? error.message : "Login failed. Please try again.")
    } finally {
      setModalLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50/50 relative overflow-hidden">
      {/* Modern Geometric Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-pink-500/8 to-orange-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-500/6 to-cyan-500/6 rounded-full blur-3xl animate-pulse delay-500"></div>
          
          {/* Geometric Shapes */}
          <div className="absolute top-32 left-32 w-16 h-16 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-2xl rotate-45 animate-bounce"></div>
          <div className="absolute bottom-32 right-32 w-12 h-12 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full animate-bounce delay-700"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-to-br from-emerald-200/25 to-teal-200/25 rounded-3xl rotate-12 animate-pulse delay-300"></div>
        </div>
      </div>

      {/* Modern Navigation */}
      <nav className="relative bg-white/95 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 group">
                <div className="relative">
                  <StretchLogo className="h-20 w-auto transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Stretch Education SA
                  </span>
                  <div className="text-sm text-gray-500 font-medium">Phono-Graphix Platform</div>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <a href="#features" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium">
                Platform Features
              </a>
              <a href="#about" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium">
                Methodology
              </a>
              <a href="#contact" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium">
                Support
              </a>
              <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-2.5">
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md border-0 shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl font-bold">Welcome Back, Tutor</DialogTitle>
                    <DialogDescription className="text-center">
                      Sign in to your Stretch Education tutor account
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleModalLogin} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="modalEmail" className="text-sm font-medium">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="modalEmail"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          value={modalLoginData.email}
                          onChange={(e) => setModalLoginData({ ...modalLoginData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="modalPassword" className="text-sm font-medium">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="modalPassword"
                          type={showModalPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                          value={modalLoginData.password}
                          onChange={(e) => setModalLoginData({ ...modalLoginData, password: e.target.value })}
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          onClick={() => setShowModalPassword(!showModalPassword)}
                        >
                          {showModalPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                      disabled={modalLoading}
                    >
                      {modalLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Signing In...</span>
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                    
                    <div className="text-center text-sm text-gray-600">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="font-semibold text-blue-800 mb-2">🧪 Test Credentials:</p>
                        <div className="text-xs space-y-1 text-blue-700">
                          <p><strong>Admin:</strong> admin@test.com / test123</p>
                          <p><strong>Tutor:</strong> jack@test.com / test123</p>
          
                        </div>
                      </div>
                      Need help?{" "}
                      <button
                        type="button"
                        className="text-blue-600 hover:underline font-medium"
                        onClick={() => {
                          setIsLoginModalOpen(false)
                          document.getElementById("contact")?.scrollIntoView({ behavior: 'smooth' })
                        }}
                      >
                        Contact Support
                      </button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="hover:bg-blue-50"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              <a 
                href="#features" 
                className="block text-gray-600 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Platform Features
              </a>
              <a 
                href="#about" 
                className="block text-gray-600 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Methodology
              </a>
              <a 
                href="#contact" 
                className="block text-gray-600 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Support
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Creative Hero Section with Centered Heading */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Logo Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-3 pointer-events-none">
          <StretchLogo className="h-[600px] w-auto" />
        </div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-32 right-16 w-16 h-16 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-2xl rotate-45 animate-pulse delay-700"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-br from-emerald-200/30 to-cyan-200/30 rounded-full animate-bounce delay-1000"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Main Heading - Centered at Top */}
          <div className="text-center mb-20">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Creative Heading with Decorative Elements */}
              <div className="relative inline-block">
                {/* Decorative Lines */}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                
                {/* Main Heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight relative">
                  <span className="block text-gray-900 mb-2">Phono-Graphix</span>
                  <span className="block text-base md:text-lg font-medium text-gray-600 mb-2">with</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                    Stretch Education
                  </span>
                </h1>
                
                {/* Decorative Stars */}
                <div className="absolute -top-4 -left-8 text-blue-400">
                  <Sparkles className="h-8 w-8 animate-pulse" />
                </div>
                <div className="absolute -top-2 -right-6 text-purple-400">
                  <Sparkles className="h-6 w-6 animate-pulse delay-500" />
                </div>
              </div>
              
              {/* Subtitle Badge */}
              <div className="flex items-center justify-center space-x-3 mt-12 mb-8">
                <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl shadow-lg">
                  <GraduationCap className="h-10 w-10 text-blue-600" />
                </div>
                <Badge className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-2 border-blue-200 px-6 py-3 text-xl font-semibold rounded-2xl shadow-lg">
                  Professional Tutor Platform
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Content Grid Below Heading */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Description */}
            <div className={`space-y-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="space-y-8">
                <h2 className="text-2xl md:text-4xl font-semibold text-gray-700 leading-relaxed">
                  Empower Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Teaching Journey
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  Access our comprehensive Phono-Graphix platform designed specifically for tutors. 
                  Manage students, track progress, and deliver evidence-based reading instruction with confidence.
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 text-xl px-12 py-8 rounded-2xl group"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  <User className="mr-3 h-6 w-6" />
                  <span className="relative z-10">Sign In</span>
                </Button>
              </div>
            </div>

            {/* Right Column - Stats Cards */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="group">
                    <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 hover:border-blue-200">
                      <div className="flex items-center justify-center mb-6">
                        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                          <stat.icon className="h-10 w-10 text-blue-600" />
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                        <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section id="features" className="py-32 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-24">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl">
                <Lightbulb className="h-10 w-10 text-blue-600" />
              </div>
              <div className="text-left">
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900">Platform Features</h2>
                <p className="text-xl text-blue-600 font-medium">for Modern Tutors</p>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Everything you need to deliver effective Phono-Graphix instruction and manage your students successfully with cutting-edge tools.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group bg-white/90 backdrop-blur-md overflow-hidden rounded-3xl border border-gray-200/30 hover:border-blue-200/50">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative pb-8 pt-10">
                  <div className={`mx-auto w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative`}>
                    <feature.icon className="h-10 w-10 text-white" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity duration-500`}></div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-10">
                  <p className="text-gray-600 text-center leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900">Stretch Education</h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Master the evidence-based Phono-Graphix approach to reading instruction. Our platform provides 
                  the tools and resources you need to implement this proven methodology effectively.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  "Systematic progression through four distinct levels",
                  "Comprehensive student assessment and tracking",
                  "Evidence-based methodology with proven results",
                  "Professional development and certification support",
                ].map((point, index) => (
                  <div key={index} className="flex items-center space-x-6 group">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-gray-700 text-xl font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-700 hover:text-blue-700 text-xl px-10 py-8 rounded-2xl transition-all duration-300">
                Learn More About Our Method
                <ArrowRight className="ml-4 h-6 w-6" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {[
                { title: "Pink Level", desc: "Basic sound-symbol relationships", color: "from-pink-500 to-rose-500", bg: "from-pink-50 to-rose-50" },
                { title: "Blue Level", desc: "Consonant blends and digraphs", color: "from-blue-500 to-cyan-500", bg: "from-blue-50 to-cyan-50" },
                {
                  title: "Yellow Level",
                  desc: "Multisyllabic word decoding",
                  color: "from-yellow-500 to-orange-500",
                  bg: "from-yellow-50 to-orange-50",
                },
                { title: "Purple Level", desc: "Advanced code knowledge", color: "from-purple-500 to-violet-500", bg: "from-purple-50 to-violet-50" },
              ].map((level, index) => (
                <Card key={index} className={`bg-gradient-to-br ${level.bg} border-2 border-gray-200/50 hover:border-blue-200 transition-all duration-300 group hover:shadow-2xl rounded-3xl`}>
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold text-gray-900">{level.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 leading-relaxed">{level.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12 mb-32">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl">
                <Headphones className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-6xl md:text-7xl font-bold text-gray-900">Tutor Support</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Need help? Our dedicated support team is here to assist you with any questions about the platform or methodology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <Card className="text-center border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/90 backdrop-blur-sm group border border-gray-200/30 rounded-3xl">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500 relative">
                  <Mail className="h-10 w-10 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-30"></div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Email Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 font-medium text-lg">support@stretcheducation.edu</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/90 backdrop-blur-sm group border border-gray-200/30 rounded-3xl">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500 relative">
                  <Phone className="h-10 w-10 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-xl opacity-30"></div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Phone Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 font-medium text-lg">1-800-STRETCH</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white/90 backdrop-blur-sm group border border-gray-200/30 rounded-3xl">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-500 relative">
                  <BookMarked className="h-10 w-10 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-xl opacity-30"></div>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">Training Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 font-medium text-lg">Access tutorials and guides</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <StretchLogo className="h-20 w-auto" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Stretch Education SA
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed text-lg">
                Empowering tutors with evidence-based reading instruction tools and comprehensive support.
              </p>
            </div>

            <div className="space-y-8">
              <h3 className="font-semibold text-xl text-white">Platform</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 text-lg">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 text-lg">
                    Training
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 text-lg">
                    Resources
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 text-lg">
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-8">
              <h3 className="font-semibold text-xl text-white">Methodology</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 text-lg">
                    Phono-Graphix
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 text-lg">
                    Certification
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 text-lg">
                    Research
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 text-lg">
                    Best Practices
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-8">
              <h3 className="font-semibold text-xl text-white">Legal</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 text-lg">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 text-lg">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 text-lg">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-200 text-lg">
                    Accessibility
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-12 text-center text-gray-400">
            <p className="text-lg">&copy; 2024 Stretch Education SA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, ComposedChart, Area, AreaChart
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  TrendingUp, TrendingDown, Users, BookOpen, Clock, Award, Target,
  Filter, Download, Calendar, BarChart3, PieChart as PieChartIcon,
  AlertTriangle, CheckCircle, Star, Zap, Brain, Trophy, Mail, Phone,
  MapPin, Globe, Calendar as CalendarIcon, Edit, Save, X, FileText
} from "lucide-react"

// Dynamic import for jsPDF to avoid SSR issues
const generatePDF = async (content: any) => {
  const { jsPDF } = await import('jspdf')
  return new jsPDF()
}

// Helper function to create chart images for PDF
const createChartImage = async (chartConfig: any, width: number = 400, height: number = 300) => {
  try {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined') {
      // Browser environment - create canvas-based chart
      return await createBrowserChart(chartConfig, width, height)
    } else {
      // Node environment - use ChartJSNodeCanvas
      const { ChartJSNodeCanvas } = await import('chartjs-node-canvas')
      const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height })
      const buffer = await chartJSNodeCanvas.renderToBuffer(chartConfig)
      return `data:image/png;base64,${buffer.toString('base64')}`
    }
  } catch (error) {
    console.error('Chart generation error:', error)
    return null
  }
}

// Browser-based chart creation
const createBrowserChart = async (chartConfig: any, width: number, height: number) => {
  try {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')

    if (!ctx) return null

    // Import Chart.js dynamically
    const { Chart, registerables } = await import('chart.js')
    Chart.register(...registerables)

    // Create chart
    const chart = new Chart(ctx, chartConfig)

    // Wait for chart to render
    await new Promise(resolve => setTimeout(resolve, 100))

    // Convert to base64
    const imageData = canvas.toDataURL('image/png')

    // Cleanup
    chart.destroy()

    return imageData
  } catch (error) {
    console.error('Browser chart creation error:', error)
    return null
  }
}

// Mock data for performance tracking
const performanceOverview = {
  totalTutors: 24,
  activeLearners: 156,
  avgImprovement: 79.2,
  completionRate: 84.5,
  monthlyGrowth: 12.3,
  satisfactionScore: 4.7
}

const tutorPerformanceData = [
  {
    id: 1, name: "Sarah Johnson", avatar: "/placeholder.svg",
    currentLearners: 15, completedLearners: 45, avgImprovement: 85.2,
    rating: 4.9, efficiency: 92, engagement: 88, retention: 94,
    specialization: "Phonics Fundamentals", experience: "5 years",
    trend: "up", monthlyImprovement: 3.2, sessionsThisMonth: 68
  },
  {
    id: 2, name: "Mike Chen", avatar: "/placeholder.svg",
    currentLearners: 12, completedLearners: 38, avgImprovement: 82.7,
    rating: 4.8, efficiency: 89, engagement: 91, retention: 87,
    specialization: "Advanced Reading", experience: "4 years",
    trend: "up", monthlyImprovement: 2.8, sessionsThisMonth: 54
  },
  {
    id: 3, name: "Emily Davis", avatar: "/placeholder.svg",
    currentLearners: 18, completedLearners: 52, avgImprovement: 78.9,
    rating: 4.6, efficiency: 85, engagement: 86, retention: 89,
    specialization: "Struggling Readers", experience: "6 years",
    trend: "stable", monthlyImprovement: 1.1, sessionsThisMonth: 72
  },
  {
    id: 4, name: "David Wilson", avatar: "/placeholder.svg",
    currentLearners: 14, completedLearners: 41, avgImprovement: 80.5,
    rating: 4.7, efficiency: 87, engagement: 84, retention: 91,
    specialization: "Phonics Mastery", experience: "3 years",
    trend: "up", monthlyImprovement: 4.1, sessionsThisMonth: 61
  }
]

const learnerOutcomes = [
  { level: "Pink", enrolled: 45, completed: 38, improvement: 82, satisfaction: 4.6 },
  { level: "Blue", enrolled: 38, completed: 32, improvement: 79, satisfaction: 4.5 },
  { level: "Yellow", enrolled: 42, completed: 35, improvement: 85, satisfaction: 4.8 },
  { level: "Purple", enrolled: 31, completed: 26, improvement: 77, satisfaction: 4.4 }
]

const monthlyTrends = [
  { month: "Jan", tutorPerformance: 76, learnerSatisfaction: 4.3, completionRate: 78 },
  { month: "Feb", tutorPerformance: 78, learnerSatisfaction: 4.4, completionRate: 81 },
  { month: "Mar", tutorPerformance: 80, learnerSatisfaction: 4.5, completionRate: 83 },
  { month: "Apr", tutorPerformance: 82, learnerSatisfaction: 4.6, completionRate: 85 },
  { month: "May", tutorPerformance: 79, learnerSatisfaction: 4.7, completionRate: 84 }
]

const performanceMetrics = [
  { metric: "Engagement Rate", value: 88, target: 85, status: "above" },
  { metric: "Retention Rate", value: 91, target: 90, status: "above" },
  { metric: "Session Efficiency", value: 87, target: 88, status: "below" },
  { metric: "Learning Velocity", value: 79, target: 75, status: "above" }
]

export default function PerformancePage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month")
  const [selectedTutor, setSelectedTutor] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [showGoalsModal, setShowGoalsModal] = useState(false)
  const [selectedTutorForModal, setSelectedTutorForModal] = useState<any>(null)
  const [goalTarget, setGoalTarget] = useState("")
  const [goalMetric, setGoalMetric] = useState("")
  const [goalDeadline, setGoalDeadline] = useState("")
  const [goalDescription, setGoalDescription] = useState("")
  const [showReportModal, setShowReportModal] = useState(false)
  const [reportType, setReportType] = useState("comprehensive")
  const [reportFormat, setReportFormat] = useState("pdf")
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)

  const handleExportData = (format: string) => {
    alert(`Exporting performance data as ${format.toUpperCase()}...`)
  }

  const handleGenerateReport = () => {
    setShowReportModal(true)
  }

  const generateActualReport = async () => {
    setIsGeneratingReport(true)

    // Simulate report generation delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Generate report content based on type
    const reportContent = await generateReportContent()

    // Create and download the report
    await downloadReport(reportContent)

    setIsGeneratingReport(false)
    setShowReportModal(false)
    alert(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated successfully!`)
  }

  const generateReportContent = async () => {
    const currentDate = new Date().toLocaleDateString()
    const reportTitle = `Tutor Performance Report - ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}`

    if (reportFormat === 'json') {
      return generateJSONReport(currentDate, reportTitle)
    } else if (reportFormat === 'csv') {
      return generateCSVReport(currentDate, reportTitle)
    } else if (reportFormat === 'pdf') {
      return await generatePDFContent(currentDate, reportTitle)
    } else {
      return generateTextReport(currentDate, reportTitle)
    }
  }

  const generateTextReport = (currentDate: string, reportTitle: string) => {
    let content = `${reportTitle}\nGenerated on: ${currentDate}\n\n`

    // Executive Summary
    content += "EXECUTIVE SUMMARY\n"
    content += "================\n"
    content += `Total Active Tutors: ${performanceOverview.totalTutors}\n`
    content += `Active Learners: ${performanceOverview.activeLearners}\n`
    content += `Average Improvement Rate: ${performanceOverview.avgImprovement}%\n`
    content += `Overall Completion Rate: ${performanceOverview.completionRate}%\n`
    content += `Satisfaction Score: ${performanceOverview.satisfactionScore}/5.0\n\n`

    // Individual Tutor Performance
    content += "INDIVIDUAL TUTOR PERFORMANCE\n"
    content += "============================\n\n"

    tutorPerformanceData.forEach((tutor, index) => {
      content += `${index + 1}. ${tutor.name}\n`
      content += `   Specialization: ${tutor.specialization}\n`
      content += `   Experience: ${tutor.experience}\n`
      content += `   Current Learners: ${tutor.currentLearners}\n`
      content += `   Completed Learners: ${tutor.completedLearners}\n`
      content += `   Average Improvement: ${tutor.avgImprovement}%\n`
      content += `   Rating: ${tutor.rating}/5.0\n`
      content += `   Efficiency: ${tutor.efficiency}%\n`
      content += `   Engagement: ${tutor.engagement}%\n`
      content += `   Retention: ${tutor.retention}%\n`
      content += `   Sessions This Month: ${tutor.sessionsThisMonth}\n`
      content += `   Trend: ${tutor.trend}\n`
      content += `   Monthly Improvement: ${tutor.monthlyImprovement}%\n\n`
    })

    // Performance Metrics Analysis
    content += "PERFORMANCE METRICS ANALYSIS\n"
    content += "============================\n\n"

    performanceMetrics.forEach(metric => {
      content += `${metric.metric}: ${metric.value}% (Target: ${metric.target}%)\n`
      content += `Status: ${metric.status === 'above' ? 'Above Target ✓' : 'Below Target ⚠'}\n\n`
    })

    // Learner Outcomes by Level
    content += "LEARNER OUTCOMES BY LEVEL\n"
    content += "=========================\n\n"

    learnerOutcomes.forEach(level => {
      const completionRate = Math.round((level.completed / level.enrolled) * 100)
      content += `${level.level} Level:\n`
      content += `   Enrolled: ${level.enrolled}\n`
      content += `   Completed: ${level.completed}\n`
      content += `   Completion Rate: ${completionRate}%\n`
      content += `   Average Improvement: ${level.improvement}%\n`
      content += `   Satisfaction: ${level.satisfaction}/5.0\n\n`
    })

    // Recommendations
    content += "RECOMMENDATIONS\n"
    content += "===============\n\n"

    // Top Performers
    const topPerformer = tutorPerformanceData.reduce((prev, current) =>
      (prev.avgImprovement > current.avgImprovement) ? prev : current
    )
    content += `1. Top Performer: ${topPerformer.name} with ${topPerformer.avgImprovement}% average improvement\n`
    content += `   Recommendation: Share best practices with other tutors\n\n`

    // Areas for Improvement
    const lowEfficiency = tutorPerformanceData.filter(tutor => tutor.efficiency < 85)
    if (lowEfficiency.length > 0) {
      content += `2. Efficiency Improvement Needed:\n`
      lowEfficiency.forEach(tutor => {
        content += `   - ${tutor.name}: ${tutor.efficiency}% efficiency\n`
      })
      content += `   Recommendation: Provide time management training\n\n`
    }

    // Level-specific recommendations
    const strugglingLevel = learnerOutcomes.reduce((prev, current) =>
      (prev.improvement < current.improvement) ? prev : current
    )
    content += `3. Focus Area: ${strugglingLevel.level} Level needs attention\n`
    content += `   Current improvement rate: ${strugglingLevel.improvement}%\n`
    content += `   Recommendation: Additional training resources and support\n\n`

    content += "END OF REPORT\n"
    content += `Report generated by Phono-Graphix Performance System on ${currentDate}`

    return content
  }

  const generateJSONReport = (currentDate: string, reportTitle: string) => {
    const reportData = {
      title: reportTitle,
      generatedOn: currentDate,
      reportType: reportType,
      executiveSummary: {
        totalTutors: performanceOverview.totalTutors,
        activeLearners: performanceOverview.activeLearners,
        avgImprovement: performanceOverview.avgImprovement,
        completionRate: performanceOverview.completionRate,
        satisfactionScore: performanceOverview.satisfactionScore
      },
      tutorPerformance: tutorPerformanceData.map(tutor => ({
        name: tutor.name,
        specialization: tutor.specialization,
        experience: tutor.experience,
        currentLearners: tutor.currentLearners,
        completedLearners: tutor.completedLearners,
        avgImprovement: tutor.avgImprovement,
        rating: tutor.rating,
        efficiency: tutor.efficiency,
        engagement: tutor.engagement,
        retention: tutor.retention,
        sessionsThisMonth: tutor.sessionsThisMonth,
        trend: tutor.trend,
        monthlyImprovement: tutor.monthlyImprovement
      })),
      performanceMetrics: performanceMetrics,
      learnerOutcomes: learnerOutcomes,
      recommendations: {
        topPerformer: tutorPerformanceData.reduce((prev, current) =>
          (prev.avgImprovement > current.avgImprovement) ? prev : current
        ),
        lowEfficiencyTutors: tutorPerformanceData.filter(tutor => tutor.efficiency < 85),
        strugglingLevel: learnerOutcomes.reduce((prev, current) =>
          (prev.improvement < current.improvement) ? prev : current
        )
      }
    }
    return JSON.stringify(reportData, null, 2)
  }

  const generateCSVReport = (currentDate: string, reportTitle: string) => {
    let csv = `${reportTitle}\nGenerated on: ${currentDate}\n\n`

    // Tutor Performance CSV
    csv += "TUTOR PERFORMANCE DATA\n"
    csv += "Name,Specialization,Experience,Current Learners,Completed Learners,Avg Improvement %,Rating,Efficiency %,Engagement %,Retention %,Sessions This Month,Trend,Monthly Improvement %\n"

    tutorPerformanceData.forEach(tutor => {
      csv += `"${tutor.name}","${tutor.specialization}","${tutor.experience}",${tutor.currentLearners},${tutor.completedLearners},${tutor.avgImprovement},${tutor.rating},${tutor.efficiency},${tutor.engagement},${tutor.retention},${tutor.sessionsThisMonth},"${tutor.trend}",${tutor.monthlyImprovement}\n`
    })

    csv += "\n\nPERFORMANCE METRICS\n"
    csv += "Metric,Value %,Target %,Status\n"
    performanceMetrics.forEach(metric => {
      csv += `"${metric.metric}",${metric.value},${metric.target},"${metric.status}"\n`
    })

    csv += "\n\nLEARNER OUTCOMES BY LEVEL\n"
    csv += "Level,Enrolled,Completed,Completion Rate %,Avg Improvement %,Satisfaction\n"
    learnerOutcomes.forEach(level => {
      const completionRate = Math.round((level.completed / level.enrolled) * 100)
      csv += `"${level.level}",${level.enrolled},${level.completed},${completionRate},${level.improvement},${level.satisfaction}\n`
    })

    return csv
  }

  const generatePDFContent = async (currentDate: string, reportTitle: string) => {
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()

    // Set up colors
    const primaryBlue = [59, 130, 246]
    const darkBlue = [30, 64, 175]
    const green = [16, 185, 129]
    const red = [239, 68, 68]
    const gray = [107, 114, 128]
    const yellow = [245, 158, 11]
    const purple = [139, 92, 246]

    let yPosition = 20
    const pageWidth = doc.internal.pageSize.width
    const margin = 20
    const contentWidth = pageWidth - (margin * 2)

    // Helper function to add new page if needed
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > doc.internal.pageSize.height - 20) {
        doc.addPage()
        yPosition = 20
      }
    }

    // Generate chart configurations
    const levelPerformanceChart = {
      type: 'bar',
      data: {
        labels: learnerOutcomes.map(level => `${level.level} Level`),
        datasets: [
          {
            label: 'Enrolled',
            data: learnerOutcomes.map(level => level.enrolled),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2
          },
          {
            label: 'Completed',
            data: learnerOutcomes.map(level => level.completed),
            backgroundColor: 'rgba(16, 185, 129, 0.8)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 2
          },
          {
            label: 'Improvement %',
            data: learnerOutcomes.map(level => level.improvement),
            backgroundColor: 'rgba(245, 158, 11, 0.8)',
            borderColor: 'rgba(245, 158, 11, 1)',
            borderWidth: 2,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: false,
        plugins: {
          title: {
            display: true,
            text: 'Performance Between Levels',
            font: { size: 16, weight: 'bold' },
            color: '#1e40af'
          },
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
              display: true,
              text: 'Number of Learners'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
              display: true,
              text: 'Improvement %'
            },
            grid: {
              drawOnChartArea: false,
            },
          }
        }
      }
    }

    const tutorPerformanceChart = {
      type: 'radar',
      data: {
        labels: ['Efficiency', 'Engagement', 'Retention', 'Avg Improvement', 'Rating (x20)'],
        datasets: tutorPerformanceData.map((tutor, index) => ({
          label: tutor.name,
          data: [tutor.efficiency, tutor.engagement, tutor.retention, tutor.avgImprovement, tutor.rating * 20],
          backgroundColor: `rgba(${[
            '59, 130, 246',
            '16, 185, 129',
            '245, 158, 11',
            '139, 92, 246'
          ][index % 4]}, 0.2)`,
          borderColor: `rgba(${[
            '59, 130, 246',
            '16, 185, 129',
            '245, 158, 11',
            '139, 92, 246'
          ][index % 4]}, 1)`,
          borderWidth: 2
        }))
      },
      options: {
        responsive: false,
        plugins: {
          title: {
            display: true,
            text: 'Tutor Performance Comparison',
            font: { size: 16, weight: 'bold' },
            color: '#1e40af'
          },
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        }
      }
    }

    const monthlyTrendsChart = {
      type: 'line',
      data: {
        labels: monthlyTrends.map(trend => trend.month),
        datasets: [
          {
            label: 'Tutor Performance',
            data: monthlyTrends.map(trend => trend.tutorPerformance),
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          },
          {
            label: 'Learner Satisfaction',
            data: monthlyTrends.map(trend => trend.learnerSatisfaction * 20), // Scale to match other metrics
            backgroundColor: 'rgba(16, 185, 129, 0.2)',
            borderColor: 'rgba(16, 185, 129, 1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          },
          {
            label: 'Completion Rate',
            data: monthlyTrends.map(trend => trend.completionRate),
            backgroundColor: 'rgba(245, 158, 11, 0.2)',
            borderColor: 'rgba(245, 158, 11, 1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: false,
        plugins: {
          title: {
            display: true,
            text: 'Monthly Performance Trends',
            font: { size: 16, weight: 'bold' },
            color: '#1e40af'
          },
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Performance %'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Month'
            }
          }
        }
      }
    }

    const learnerSatisfactionChart = {
      type: 'doughnut',
      data: {
        labels: learnerOutcomes.map(level => `${level.level} Level`),
        datasets: [{
          data: learnerOutcomes.map(level => level.satisfaction),
          backgroundColor: [
            'rgba(236, 72, 153, 0.8)',  // Pink
            'rgba(59, 130, 246, 0.8)',  // Blue
            'rgba(245, 158, 11, 0.8)',  // Yellow
            'rgba(139, 92, 246, 0.8)'   // Purple
          ],
          borderColor: [
            'rgba(236, 72, 153, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(245, 158, 11, 1)',
            'rgba(139, 92, 246, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: false,
        plugins: {
          title: {
            display: true,
            text: 'Learner Satisfaction by Level',
            font: { size: 16, weight: 'bold' },
            color: '#1e40af'
          },
          legend: {
            display: true,
            position: 'right'
          }
        }
      }
    }

    // Generate chart images
    console.log('Generating charts for PDF...')
    const levelChart = await createChartImage(levelPerformanceChart, 500, 300)
    const tutorChart = await createChartImage(tutorPerformanceChart, 500, 400)
    const trendsChart = await createChartImage(monthlyTrendsChart, 500, 300)
    const satisfactionChart = await createChartImage(learnerSatisfactionChart, 400, 300)

    // Header
    doc.setFontSize(24)
    doc.setTextColor(...darkBlue)
    doc.text(reportTitle, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 10

    doc.setFontSize(12)
    doc.setTextColor(...gray)
    doc.text(`Generated on: ${currentDate}`, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 5

    // Draw header line
    doc.setDrawColor(...primaryBlue)
    doc.setLineWidth(2)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 20

    // Executive Summary Section
    checkPageBreak(60)
    doc.setFontSize(18)
    doc.setTextColor(...darkBlue)
    doc.text('Executive Summary', margin, yPosition)
    yPosition += 15

    // Summary metrics in a grid
    const summaryData = [
      ['Total Active Tutors', performanceOverview.totalTutors.toString()],
      ['Active Learners', performanceOverview.activeLearners.toString()],
      ['Average Improvement', `${performanceOverview.avgImprovement}%`],
      ['Completion Rate', `${performanceOverview.completionRate}%`],
      ['Satisfaction Score', `${performanceOverview.satisfactionScore}/5.0`]
    ]

    doc.setFontSize(12)
    summaryData.forEach(([label, value]) => {
      doc.setTextColor(...gray)
      doc.text(label + ':', margin, yPosition)
      doc.setTextColor(...darkBlue)
      doc.text(value, margin + 80, yPosition)
      yPosition += 8
    })
    yPosition += 10

    // Add Monthly Trends Chart
    if (trendsChart) {
      checkPageBreak(120)
      doc.setFontSize(16)
      doc.setTextColor(...darkBlue)
      doc.text('Monthly Performance Trends', margin, yPosition)
      yPosition += 10

      const chartWidth = contentWidth * 0.8
      const chartHeight = (chartWidth * 300) / 500
      const chartX = margin + (contentWidth - chartWidth) / 2

      doc.addImage(trendsChart, 'PNG', chartX, yPosition, chartWidth, chartHeight)
      yPosition += chartHeight + 20
    }

    // Individual Tutor Performance Section
    checkPageBreak(40)
    doc.setFontSize(18)
    doc.setTextColor(...darkBlue)
    doc.text('Individual Tutor Performance', margin, yPosition)
    yPosition += 15

    tutorPerformanceData.forEach((tutor, index) => {
      checkPageBreak(35)

      // Tutor name
      doc.setFontSize(14)
      doc.setTextColor(...darkBlue)
      doc.text(`${index + 1}. ${tutor.name}`, margin, yPosition)
      yPosition += 8

      // Tutor details
      doc.setFontSize(10)
      doc.setTextColor(...gray)
      doc.text(`${tutor.specialization} • ${tutor.experience} experience`, margin + 10, yPosition)
      yPosition += 6

      // Metrics
      doc.setFontSize(10)
      const metrics = [
        `Current Learners: ${tutor.currentLearners}`,
        `Avg Improvement: ${tutor.avgImprovement}%`,
        `Efficiency: ${tutor.efficiency}%`,
        `Rating: ${tutor.rating}/5.0`
      ]

      metrics.forEach((metric, i) => {
        const xPos = margin + 10 + (i % 2) * 90
        if (i % 2 === 0 && i > 0) yPosition += 6
        doc.setTextColor(...gray)
        doc.text(metric, xPos, yPosition)
      })
      yPosition += 12
    })

    // Add Tutor Performance Comparison Chart
    if (tutorChart) {
      checkPageBreak(150)
      doc.setFontSize(16)
      doc.setTextColor(...darkBlue)
      doc.text('Tutor Performance Comparison', margin, yPosition)
      yPosition += 10

      const chartWidth = contentWidth * 0.9
      const chartHeight = (chartWidth * 400) / 500
      const chartX = margin + (contentWidth - chartWidth) / 2

      doc.addImage(tutorChart, 'PNG', chartX, yPosition, chartWidth, chartHeight)
      yPosition += chartHeight + 20
    }

    // Performance Metrics Analysis Section
    checkPageBreak(60)
    doc.setFontSize(18)
    doc.setTextColor(...darkBlue)
    doc.text('Performance Metrics Analysis', margin, yPosition)
    yPosition += 15

    performanceMetrics.forEach(metric => {
      checkPageBreak(12)
      doc.setFontSize(12)
      doc.setTextColor(...gray)
      doc.text(`${metric.metric}:`, margin, yPosition)

      const statusColor = metric.status === 'above' ? green : red
      doc.setTextColor(...statusColor)
      doc.text(`${metric.value}% (Target: ${metric.target}%)`, margin + 80, yPosition)

      doc.setTextColor(...statusColor)
      doc.text(metric.status === 'above' ? '✓ Above Target' : '⚠ Below Target', margin + 140, yPosition)
      yPosition += 10
    })
    yPosition += 10

    // Learner Outcomes Section
    checkPageBreak(60)
    doc.setFontSize(18)
    doc.setTextColor(...darkBlue)
    doc.text('Learner Outcomes by Level', margin, yPosition)
    yPosition += 15

    // Add Level Performance Chart
    if (levelChart) {
      checkPageBreak(120)
      doc.setFontSize(16)
      doc.setTextColor(...darkBlue)
      doc.text('Performance Between Levels', margin, yPosition)
      yPosition += 10

      const chartWidth = contentWidth * 0.9
      const chartHeight = (chartWidth * 300) / 500
      const chartX = margin + (contentWidth - chartWidth) / 2

      doc.addImage(levelChart, 'PNG', chartX, yPosition, chartWidth, chartHeight)
      yPosition += chartHeight + 20
    }

    learnerOutcomes.forEach(level => {
      checkPageBreak(15)
      const completionRate = Math.round((level.completed / level.enrolled) * 100)

      doc.setFontSize(12)
      doc.setTextColor(...darkBlue)
      doc.text(`${level.level} Level:`, margin, yPosition)
      yPosition += 8

      doc.setFontSize(10)
      doc.setTextColor(...gray)
      const levelMetrics = [
        `Enrolled: ${level.enrolled}`,
        `Completed: ${level.completed}`,
        `Completion Rate: ${completionRate}%`,
        `Avg Improvement: ${level.improvement}%`,
        `Satisfaction: ${level.satisfaction}/5.0`
      ]

      levelMetrics.forEach(metric => {
        doc.text(`  • ${metric}`, margin + 10, yPosition)
        yPosition += 6
      })
      yPosition += 5
    })

    // Add Learner Satisfaction Chart
    if (satisfactionChart) {
      checkPageBreak(120)
      doc.setFontSize(16)
      doc.setTextColor(...darkBlue)
      doc.text('Learner Satisfaction Analysis', margin, yPosition)
      yPosition += 10

      const chartWidth = contentWidth * 0.7
      const chartHeight = (chartWidth * 300) / 400
      const chartX = margin + (contentWidth - chartWidth) / 2

      doc.addImage(satisfactionChart, 'PNG', chartX, yPosition, chartWidth, chartHeight)
      yPosition += chartHeight + 20
    }

    // Recommendations Section
    checkPageBreak(60)
    doc.setFontSize(18)
    doc.setTextColor(...darkBlue)
    doc.text('Recommendations', margin, yPosition)
    yPosition += 15

    const topPerformer = tutorPerformanceData.reduce((prev, current) =>
      (prev.avgImprovement > current.avgImprovement) ? prev : current
    )
    const lowEfficiencyTutors = tutorPerformanceData.filter(tutor => tutor.efficiency < 85)
    const strugglingLevel = learnerOutcomes.reduce((prev, current) =>
      (prev.improvement < current.improvement) ? prev : current
    )

    const recommendations = [
      {
        title: '1. Top Performer Recognition',
        text: `${topPerformer.name} shows exceptional performance with ${topPerformer.avgImprovement}% average improvement. Consider sharing best practices with other tutors.`
      },
      {
        title: '2. Efficiency Improvement Opportunities',
        text: `${lowEfficiencyTutors.length} tutors show efficiency below 85%. Recommend time management training and resource optimization.`
      },
      {
        title: '3. Level-Specific Focus',
        text: `${strugglingLevel.level} Level requires additional attention with ${strugglingLevel.improvement}% improvement rate. Consider additional training resources.`
      }
    ]

    recommendations.forEach(rec => {
      checkPageBreak(25)
      doc.setFontSize(12)
      doc.setTextColor(...darkBlue)
      doc.text(rec.title, margin, yPosition)
      yPosition += 8

      doc.setFontSize(10)
      doc.setTextColor(...gray)
      const lines = doc.splitTextToSize(rec.text, contentWidth - 10)
      doc.text(lines, margin + 10, yPosition)
      yPosition += lines.length * 6 + 8
    })

    // Footer
    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(10)
      doc.setTextColor(...gray)
      doc.text(
        'Report generated by Phono-Graphix Performance System',
        pageWidth / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      )
    }

    return doc
  }

  const downloadReport = async (content: any) => {
    if (reportFormat === 'pdf') {
      // Content is a jsPDF document object
      const fileName = `tutor-performance-report-${reportType}-${new Date().toISOString().split('T')[0]}.pdf`
      content.save(fileName)
      return
    }

    // Handle other formats (string content)
    let mimeType = 'text/plain'
    let fileExtension = reportFormat

    switch (reportFormat) {
      case 'json':
        mimeType = 'application/json'
        break
      case 'csv':
        mimeType = 'text/csv'
        break
      default:
        mimeType = 'text/plain'
        fileExtension = 'txt'
    }

    const blob = new Blob([content], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `tutor-performance-report-${reportType}-${new Date().toISOString().split('T')[0]}.${fileExtension}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const handleViewDetails = (tutor: any) => {
    setSelectedTutorForModal(tutor)
    setShowDetailsModal(true)
  }

  const handleSetGoals = (tutor: any) => {
    setSelectedTutorForModal(tutor)
    setShowGoalsModal(true)
  }

  const handleSaveGoal = () => {
    if (!goalMetric || !goalTarget || !goalDeadline) {
      alert("Please fill in all required fields")
      return
    }
    alert(`Goal set for ${selectedTutorForModal?.name}: ${goalMetric} target of ${goalTarget}% by ${goalDeadline}`)
    setShowGoalsModal(false)
    setGoalTarget("")
    setGoalMetric("")
    setGoalDeadline("")
    setGoalDescription("")
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Performance Tracking</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => handleExportData("csv")}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button onClick={handleGenerateReport}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Performance Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Timeframe</Label>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tutor</Label>
              <Select value={selectedTutor} onValueChange={setSelectedTutor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tutors</SelectItem>
                  {tutorPerformanceData.map(tutor => (
                    <SelectItem key={tutor.id} value={tutor.id.toString()}>{tutor.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Level</Label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="pink">Pink Level</SelectItem>
                  <SelectItem value="blue">Blue Level</SelectItem>
                  <SelectItem value="yellow">Yellow Level</SelectItem>
                  <SelectItem value="purple">Purple Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Quick Actions</Label>
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Custom Range
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Tutors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{performanceOverview.totalTutors}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{performanceOverview.activeLearners}</div>
            <p className="text-xs text-muted-foreground">
              +{performanceOverview.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Improvement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{performanceOverview.avgImprovement}%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tutors">Tutor Performance</TabsTrigger>
          <TabsTrigger value="learners">Learner Outcomes</TabsTrigger>
          <TabsTrigger value="analytics">Advanced Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Performance Metrics Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {performanceMetrics.map((metric, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center justify-between">
                    {metric.metric}
                    {metric.status === "above" ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}%</div>
                  <div className="text-xs text-muted-foreground">
                    Target: {metric.target}%
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className={`h-2 rounded-full ${metric.status === "above" ? "bg-green-500" : "bg-yellow-500"}`}
                      style={{ width: `${(metric.value / 100) * 100}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Monthly Trends Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Monthly performance metrics across all tutors</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  tutorPerformance: { label: "Tutor Performance", color: "#10b981" },
                  learnerSatisfaction: { label: "Learner Satisfaction", color: "#3b82f6" },
                  completionRate: { label: "Completion Rate", color: "#f59e0b" }
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="tutorPerformance"
                      stroke="var(--color-tutorPerformance)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-tutorPerformance)", strokeWidth: 2, r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="completionRate"
                      stroke="var(--color-completionRate)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-completionRate)", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tutors" className="space-y-4">
          {/* Tutor Performance Grid */}
          <div className="grid gap-4">
            {tutorPerformanceData.map((tutor) => (
              <Card key={tutor.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={tutor.avatar} alt={tutor.name} />
                        <AvatarFallback>
                          {tutor.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{tutor.name}</CardTitle>
                        <CardDescription>{tutor.specialization} • {tutor.experience}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {tutor.trend === "up" ? (
                        <TrendingUp className="h-5 w-5 text-green-500" />
                      ) : tutor.trend === "down" ? (
                        <TrendingDown className="h-5 w-5 text-red-500" />
                      ) : (
                        <div className="h-5 w-5 bg-gray-400 rounded-full" />
                      )}
                      <Badge variant={tutor.rating >= 4.8 ? "default" : "secondary"}>
                        {tutor.rating} ⭐
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{tutor.currentLearners}</div>
                      <div className="text-xs text-muted-foreground">Current Learners</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{tutor.avgImprovement}%</div>
                      <div className="text-xs text-muted-foreground">Avg Improvement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{tutor.efficiency}%</div>
                      <div className="text-xs text-muted-foreground">Efficiency</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{tutor.sessionsThisMonth}</div>
                      <div className="text-xs text-muted-foreground">Sessions This Month</div>
                    </div>
                  </div>

                  {/* Performance Bars */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Engagement</span>
                      <span>{tutor.engagement}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${tutor.engagement}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span>Retention</span>
                      <span>{tutor.retention}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${tutor.retention}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleViewDetails(tutor)}
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleSetGoals(tutor)}
                    >
                      <Target className="mr-2 h-4 w-4" />
                      Set Goals
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="learners" className="space-y-4">
          {/* Learner Outcomes by Level */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Learner Progress by Level</CardTitle>
                <CardDescription>Completion rates and improvements across Phono-Graphix levels</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    enrolled: { label: "Enrolled", color: "#3b82f6" },
                    completed: { label: "Completed", color: "#10b981" }
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={learnerOutcomes}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="level" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="enrolled" fill="var(--color-enrolled)" radius={[2, 2, 0, 0]} />
                      <Bar dataKey="completed" fill="var(--color-completed)" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Scores</CardTitle>
                <CardDescription>Learner satisfaction by level</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    satisfaction: { label: "Satisfaction", color: "#f59e0b" }
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={learnerOutcomes}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="level" />
                      <YAxis domain={[4.0, 5.0]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="satisfaction"
                        stroke="var(--color-satisfaction)"
                        fill="var(--color-satisfaction)"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Learner Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Learner Metrics</CardTitle>
              <CardDescription>Comprehensive breakdown of learner performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {learnerOutcomes.map((level, index) => {
                  const completionRate = Math.round((level.completed / level.enrolled) * 100);
                  const colors = ["#ec4899", "#3b82f6", "#eab308", "#8b5cf6"];

                  return (
                    <div key={level.level} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: colors[index] }}
                        ></div>
                        <div>
                          <div className="font-semibold">{level.level} Level</div>
                          <div className="text-sm text-muted-foreground">
                            {level.enrolled} enrolled • {level.completed} completed
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{completionRate}%</div>
                        <div className="text-sm text-muted-foreground">completion rate</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{level.improvement}%</div>
                        <div className="text-sm text-muted-foreground">avg improvement</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold flex items-center gap-1">
                          {level.satisfaction} <Star className="h-4 w-4 fill-current text-yellow-500" />
                        </div>
                        <div className="text-sm text-muted-foreground">satisfaction</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {/* Advanced Analytics Tools */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  AI Performance Insights
                </CardTitle>
                <CardDescription>Machine learning powered performance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" onClick={() => setShowAnalyticsModal(true)}>
                  <Zap className="mr-2 h-4 w-4" />
                  Generate AI Insights
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Performance Benchmarking
                </CardTitle>
                <CardDescription>Compare against industry standards</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Benchmarks
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-green-500" />
                  Custom Analytics
                </CardTitle>
                <CardDescription>Build custom performance dashboards</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Target className="mr-2 h-4 w-4" />
                  Create Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Performance Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Heatmap</CardTitle>
              <CardDescription>Visual representation of tutor performance across different metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2 text-sm">
                <div></div>
                <div className="text-center font-medium">Efficiency</div>
                <div className="text-center font-medium">Engagement</div>
                <div className="text-center font-medium">Retention</div>
                <div className="text-center font-medium">Improvement</div>

                {tutorPerformanceData.map((tutor) => (
                  <>
                    <div key={`${tutor.id}-name`} className="font-medium truncate">{tutor.name}</div>
                    <div key={`${tutor.id}-eff`} className={`p-2 rounded text-center ${tutor.efficiency >= 90 ? 'bg-green-500 text-white' : tutor.efficiency >= 80 ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}>
                      {tutor.efficiency}%
                    </div>
                    <div key={`${tutor.id}-eng`} className={`p-2 rounded text-center ${tutor.engagement >= 90 ? 'bg-green-500 text-white' : tutor.engagement >= 80 ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}>
                      {tutor.engagement}%
                    </div>
                    <div key={`${tutor.id}-ret`} className={`p-2 rounded text-center ${tutor.retention >= 90 ? 'bg-green-500 text-white' : tutor.retention >= 80 ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}>
                      {tutor.retention}%
                    </div>
                    <div key={`${tutor.id}-imp`} className={`p-2 rounded text-center ${tutor.avgImprovement >= 85 ? 'bg-green-500 text-white' : tutor.avgImprovement >= 75 ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'}`}>
                      {tutor.avgImprovement}%
                    </div>
                  </>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI Analytics Modal */}
      <Sheet open={showAnalyticsModal} onOpenChange={setShowAnalyticsModal}>
        <SheetContent className="w-[400px] sm:w-[640px] overflow-y-auto max-h-screen">
          <SheetHeader className="sticky top-0 bg-background z-10 pb-4">
            <SheetTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              AI Performance Insights
            </SheetTitle>
            <SheetDescription>
              Advanced machine learning analysis of tutor and learner performance
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6 pb-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium">High Performer Identified</p>
                    <p className="text-sm text-muted-foreground">Sarah Johnson shows 15% above average improvement rates</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Attention Needed</p>
                    <p className="text-sm text-muted-foreground">Session efficiency across Purple level needs improvement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Positive Trend</p>
                    <p className="text-sm text-muted-foreground">Overall learner satisfaction increased by 8% this quarter</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Optimize Resource Allocation</p>
                  <p className="text-xs text-blue-600">Consider redistributing learners to balance tutor workloads</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Expand Successful Practices</p>
                  <p className="text-xs text-green-600">Implement Sarah Johnson's teaching methods across other tutors</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">Focus Training Efforts</p>
                  <p className="text-xs text-yellow-600">Provide additional training for Purple level instruction techniques</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>

      {/* View Details Modal */}
      <Sheet open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <SheetContent className="w-[400px] sm:w-[640px] overflow-y-auto max-h-screen">
          <SheetHeader className="sticky top-0 bg-background z-10 pb-4">
            <SheetTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {selectedTutorForModal?.name} - Detailed Performance Analysis
            </SheetTitle>
            <SheetDescription>
              Comprehensive performance metrics and insights for this tutor
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6 pb-6">
            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Performance Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current Learners</span>
                      <span className="font-semibold">{selectedTutorForModal?.currentLearners}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Completed Learners</span>
                      <span className="font-semibold">{selectedTutorForModal?.completedLearners}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Avg Improvement</span>
                      <span className="font-semibold text-green-600">{selectedTutorForModal?.avgImprovement}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Rating</span>
                      <span className="font-semibold flex items-center gap-1">
                        {selectedTutorForModal?.rating} <Star className="h-4 w-4 fill-current text-yellow-500" />
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Efficiency</span>
                      <span className="font-semibold">{selectedTutorForModal?.efficiency}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Engagement</span>
                      <span className="font-semibold">{selectedTutorForModal?.engagement}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Retention</span>
                      <span className="font-semibold">{selectedTutorForModal?.retention}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Sessions This Month</span>
                      <span className="font-semibold">{selectedTutorForModal?.sessionsThisMonth}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedTutorForModal?.name?.toLowerCase().replace(' ', '.')}@phonographix.edu</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Room {Math.floor(Math.random() * 100) + 100}, Education Building</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{selectedTutorForModal?.specialization}</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Completed session with Emma Johnson</p>
                    <p className="text-xs text-muted-foreground">2 hours ago • Pink Level</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Updated lesson plan for Blue Level</p>
                    <p className="text-xs text-muted-foreground">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Submitted progress report</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium">Attended training workshop</p>
                    <p className="text-xs text-muted-foreground">3 days ago • Advanced Phonics Techniques</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Performance Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm font-medium text-green-800">Strength: High Learner Engagement</p>
                  <p className="text-xs text-green-600">Consistently maintains {selectedTutorForModal?.engagement}% engagement rate</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Opportunity: Session Efficiency</p>
                  <p className="text-xs text-blue-600">Could improve efficiency by 5% with better time management</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">Trend: Positive Growth</p>
                  <p className="text-xs text-yellow-600">Monthly improvement increased by {selectedTutorForModal?.monthlyImprovement}%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>

      {/* Set Goals Modal */}
      <Sheet open={showGoalsModal} onOpenChange={setShowGoalsModal}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto max-h-screen">
          <SheetHeader className="sticky top-0 bg-background z-10 pb-4">
            <SheetTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Set Performance Goals for {selectedTutorForModal?.name}
            </SheetTitle>
            <SheetDescription>
              Define specific, measurable goals to help improve tutor performance
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6 pb-6">
            {/* Goal Setting Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Goal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-metric">Performance Metric</Label>
                  <Select value={goalMetric} onValueChange={setGoalMetric}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a metric to improve" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="efficiency">Session Efficiency</SelectItem>
                      <SelectItem value="engagement">Learner Engagement</SelectItem>
                      <SelectItem value="retention">Learner Retention</SelectItem>
                      <SelectItem value="improvement">Average Improvement</SelectItem>
                      <SelectItem value="satisfaction">Learner Satisfaction</SelectItem>
                      <SelectItem value="sessions">Monthly Sessions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal-target">Target Value (%)</Label>
                  <Input
                    id="goal-target"
                    type="number"
                    placeholder="e.g., 90"
                    value={goalTarget}
                    onChange={(e) => setGoalTarget(e.target.value)}
                    min="0"
                    max="100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal-deadline">Target Deadline</Label>
                  <Input
                    id="goal-deadline"
                    type="date"
                    value={goalDeadline}
                    onChange={(e) => setGoalDeadline(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goal-description">Description (Optional)</Label>
                  <Textarea
                    id="goal-description"
                    placeholder="Add any additional notes or strategies..."
                    value={goalDescription}
                    onChange={(e) => setGoalDescription(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Current Performance Context */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Current Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Efficiency:</span>
                    <span className="font-semibold ml-2">{selectedTutorForModal?.efficiency}%</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Engagement:</span>
                    <span className="font-semibold ml-2">{selectedTutorForModal?.engagement}%</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Retention:</span>
                    <span className="font-semibold ml-2">{selectedTutorForModal?.retention}%</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Avg Improvement:</span>
                    <span className="font-semibold ml-2">{selectedTutorForModal?.avgImprovement}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Suggested Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Suggested Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setGoalMetric("efficiency")
                    setGoalTarget("90")
                    setGoalDeadline(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
                  }}
                >
                  <Target className="mr-2 h-4 w-4" />
                  Improve Efficiency to 90% (30 days)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setGoalMetric("engagement")
                    setGoalTarget("95")
                    setGoalDeadline(new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
                  }}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Increase Engagement to 95% (60 days)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => {
                    setGoalMetric("improvement")
                    setGoalTarget("85")
                    setGoalDeadline(new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
                  }}
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Boost Avg Improvement to 85% (90 days)
                </Button>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-background pt-4 pb-2 border-t">
              <div className="flex gap-2">
                <Button onClick={handleSaveGoal} className="flex-1">
                  <Save className="mr-2 h-4 w-4" />
                  Save Goal
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowGoalsModal(false)}
                  className="flex-1"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Generate Report Modal */}
      <Sheet open={showReportModal} onOpenChange={setShowReportModal}>
        <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto max-h-screen">
          <SheetHeader className="sticky top-0 bg-background z-10 pb-4">
            <SheetTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generate Comprehensive Tutor Performance Report
            </SheetTitle>
            <SheetDescription>
              Create a detailed report analyzing all tutor performance metrics and outcomes
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6 pb-6">
            {/* Report Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Report Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Report Type</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
                      <SelectItem value="summary">Executive Summary</SelectItem>
                      <SelectItem value="detailed">Detailed Analysis</SelectItem>
                      <SelectItem value="performance">Performance Metrics Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="report-format">Format</Label>
                  <Select value={reportFormat} onValueChange={setReportFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document (.pdf)</SelectItem>
                      <SelectItem value="txt">Text File (.txt)</SelectItem>
                      <SelectItem value="csv">CSV Spreadsheet (.csv)</SelectItem>
                      <SelectItem value="json">JSON Data (.json)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Time Period</Label>
                  <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                      <SelectItem value="year">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Report Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Report Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Executive Summary with key metrics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Individual tutor performance analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Performance metrics breakdown</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Learner outcomes by level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Recommendations and insights</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Top performers and areas for improvement</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Report Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Report Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Tutors Included:</span>
                    <span className="font-semibold ml-2">{tutorPerformanceData.length}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Total Learners:</span>
                    <span className="font-semibold ml-2">{performanceOverview.activeLearners}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Metrics Analyzed:</span>
                    <span className="font-semibold ml-2">{performanceMetrics.length}</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Levels Covered:</span>
                    <span className="font-semibold ml-2">{learnerOutcomes.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generation Progress */}
            {isGeneratingReport && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="text-sm">Generating report... Please wait</span>
                  </div>
                  <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="sticky bottom-0 bg-background pt-4 pb-2 border-t">
              <div className="flex gap-2">
                <Button
                  onClick={generateActualReport}
                  disabled={isGeneratingReport}
                  className="flex-1"
                >
                  {isGeneratingReport ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Generate Report
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowReportModal(false)}
                  disabled={isGeneratingReport}
                  className="flex-1"
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

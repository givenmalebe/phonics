'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Brain, FileText, Users, BarChart3, AlertCircle, CheckCircle, TrendingUp, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, Area, AreaChart, Pie } from 'recharts';

interface AnalysisResult {
  summary: string;
  insights: string[];
  recommendations: string[];
  metrics: {
    studentsAnalyzed: number;
    lessonsTracked: number;
    overallPerformance: string;
  };
  areas: {
    strengths: string[];
    improvements: string[];
  };
  charts: {
    studentProgress: Array<{ name: string; progress: number; level: string }>;
    levelDistribution: Array<{ level: string; count: number; color: string }>;
    performanceTrends: Array<{ week: string; average: number; attendance: number }>;
    gradeBreakdown: Array<{ grade: string; count: number }>;
  };
}

interface AITutorAgentProps {
  tutorData: any; // The complete tutor dashboard data
}

export default function AITutorAgent({ tutorData }: AITutorAgentProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');

  const analyzeWithGemini = async (prompt?: string) => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tutorData,
          customPrompt: prompt || customPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate analysis');
      }

      const result = await response.json();
      setAnalysis(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const predefinedAnalyses = [
    {
      title: 'Overall Performance',
      description: 'Comprehensive analysis of all students and sessions',
      prompt: 'Provide a comprehensive analysis of the overall tutor performance, student progress, and teaching effectiveness based on all available data.',
    },
    {
      title: 'Student Progress',
      description: 'Detailed student learning patterns and progress',
      prompt: 'Analyze student progress patterns, identify students who need additional support, and highlight exceptional performers.',
    },
    {
      title: 'Session Effectiveness',
      description: 'Evaluation of lesson effectiveness and engagement',
      prompt: 'Evaluate the effectiveness of teaching sessions, identify best practices, and suggest improvements for lesson delivery.',
    },
    {
      title: 'Curriculum Insights',
      description: 'Analysis of curriculum coverage and gaps',
      prompt: 'Analyze curriculum coverage, identify learning gaps, and recommend adjustments to improve educational outcomes.',
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            AI Tutor Analysis Agent
          </CardTitle>
          <CardDescription>
            Powered by Gemini Flash 2.5 - Get comprehensive insights about your tutor dashboard, student progress, and teaching effectiveness
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Predefined Analysis Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {predefinedAnalyses.map((analysis, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow border-dashed">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h4 className="font-medium">{analysis.title}</h4>
                      <p className="text-sm text-gray-600">{analysis.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => analyzeWithGemini(analysis.prompt)}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Analyze'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Custom Analysis */}
          <div className="space-y-3">
            <h4 className="font-medium">Custom Analysis</h4>
            <Textarea
              placeholder="Ask specific questions about your tutor data (e.g., 'Which students need the most attention?', 'What are the most effective teaching strategies?', 'How can I improve lesson engagement?')"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={3}
            />
            <Button
              onClick={() => analyzeWithGemini()}
              disabled={isAnalyzing || !customPrompt.trim()}
              className="w-full"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Analyzing with Gemini Flash 2.5...
                </>
              ) : (
                <>
                  <Brain className="h-4 w-4 mr-2" />
                  Generate Custom Analysis
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Analysis Error</span>
            </div>
            <p className="text-red-600 mt-1">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              AI Analysis Report
            </CardTitle>
            <CardDescription>
              Generated by Gemini Flash 2.5 based on your tutor dashboard data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Summary */}
            <div>
              <h4 className="font-medium mb-2">Executive Summary</h4>
              <p className="text-gray-700 leading-relaxed">{analysis.summary}</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-900">Students Analyzed</span>
                </div>
                <p className="text-2xl font-bold text-blue-600 mt-1">{analysis.metrics.studentsAnalyzed}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-900">Lessons Tracked</span>
                </div>
                <p className="text-2xl font-bold text-green-600 mt-1">{analysis.metrics.lessonsTracked}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-600" />
                  <span className="font-medium text-purple-900">Performance</span>
                </div>
                <p className="text-lg font-bold text-purple-600 mt-1">{analysis.metrics.overallPerformance}</p>
              </div>
            </div>

            {/* Key Insights */}
            <div>
              <h4 className="font-medium mb-3">Key Insights</h4>
              <div className="space-y-2">
                {analysis.insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Badge variant="secondary" className="mt-0.5">
                      {index + 1}
                    </Badge>
                    <p className="text-gray-700">{insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths and Areas for Improvement */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 text-green-700">Strengths</h4>
                <div className="space-y-2">
                  {analysis.areas.strengths.map((strength, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{strength}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-3 text-orange-700">Areas for Improvement</h4>
                <div className="space-y-2">
                  {analysis.areas.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{improvement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Charts and Visualizations */}
            {analysis.charts && (
              <div>
                <h4 className="font-medium mb-4 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Data Visualizations
                </h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Student Progress Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Student Progress Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={analysis.charts.studentProgress}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" fontSize={12} />
                          <YAxis fontSize={12} />
                          <Tooltip />
                          <Bar dataKey="progress" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Level Distribution Pie Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Level Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <RechartsPieChart>
                          <Pie
                            data={analysis.charts.levelDistribution}
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            fill="#8884d8"
                            dataKey="count"
                            label={({ level, count }) => `${level}: ${count}`}
                          >
                            {analysis.charts.levelDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Performance Trends */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Performance Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={analysis.charts.performanceTrends}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="week" fontSize={12} />
                          <YAxis fontSize={12} />
                          <Tooltip />
                          <Area type="monotone" dataKey="average" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                          <Area type="monotone" dataKey="attendance" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Grade Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Grade Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={analysis.charts.gradeBreakdown}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="grade" fontSize={12} />
                          <YAxis fontSize={12} />
                          <Tooltip />
                          <Bar dataKey="count" fill="#8b5cf6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div>
              <h4 className="font-medium mb-3">AI Recommendations</h4>
              <div className="space-y-3">
                {analysis.recommendations.map((recommendation, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="mt-0.5">
                        {index + 1}
                      </Badge>
                      <p className="text-gray-700">{recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

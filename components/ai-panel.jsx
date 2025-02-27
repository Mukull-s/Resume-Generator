"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sparkles, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react"
import { Label } from "@/components/ui/label"

export default function AIPanel({ resumeData, onSuggestionApply }) {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [score, setScore] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [generatedContent, setGeneratedContent] = useState("")
  const [targetSection, setTargetSection] = useState("summary")
  const [prompt, setPrompt] = useState("")
  const [feedback, setFeedback] = useState(null)

  const analyzeResume = () => {
    setIsAnalyzing(true)
    // Simulate AI analysis with a timeout
    setTimeout(() => {
      const calculatedScore = Math.floor(Math.random() * 30) + 70 // Random score between 70-100
      setScore(calculatedScore)

      // Generate mock suggestions based on score
      const mockSuggestions = [
        {
          section: "summary",
          issue: "Your summary is too generic and lacks specific achievements.",
          suggestion: "Include quantifiable achievements and highlight your unique value proposition.",
        },
        {
          section: "experience",
          issue: "Job descriptions focus on responsibilities rather than achievements.",
          suggestion: 'Use action verbs and include metrics to demonstrate impact (e.g., "Increased sales by 20%").',
        },
        {
          section: "skills",
          issue: "Skills list is not tailored to the job market.",
          suggestion: "Prioritize in-demand skills relevant to your target positions.",
        },
      ]

      setSuggestions(mockSuggestions)
      setIsAnalyzing(false)
    }, 2000)
  }

  const generateContent = () => {
    if (!prompt) return

    setIsGenerating(true)
    // Simulate AI content generation with a timeout
    setTimeout(() => {
      let generated = ""

      switch (targetSection) {
        case "summary":
          generated =
            "Innovative software engineer with 5+ years of experience developing scalable web applications. Specialized in React and Node.js with a proven track record of improving application performance and user experience. Passionate about clean code and agile methodologies."
          break
        case "experience":
          generated =
            "Led a team of 5 developers to redesign the company's flagship product, resulting in a 30% increase in user engagement and 25% reduction in bounce rate. Implemented CI/CD pipeline that reduced deployment time by 40% and improved code quality through automated testing."
          break
        case "skills":
          generated =
            "React, Node.js, TypeScript, GraphQL, AWS, Docker, Kubernetes, CI/CD, Agile Methodologies, Test-Driven Development"
          break
        default:
          generated = "Content generated for " + targetSection
      }

      setGeneratedContent(generated)
      setIsGenerating(false)
      setFeedback({
        type: "success",
        message: "Content generated successfully!",
      })

      // Clear feedback after 3 seconds
      setTimeout(() => setFeedback(null), 3000)
    }, 1500)
  }

  const applySuggestion = () => {
    if (!generatedContent) return

    // Apply the generated content to the selected section
    if (targetSection === "skills") {
      onSuggestionApply({ skills: generatedContent.split(", ") })
    } else if (targetSection === "summary") {
      onSuggestionApply({ summary: generatedContent })
    } else {
      // For other sections, this would need more complex logic
      // This is just a simplified example
      setFeedback({
        type: "info",
        message: "Applied to " + targetSection,
      })
    }

    // Clear generated content after applying
    setGeneratedContent("")
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="analyzer">
        <TabsList className="grid grid-cols-2 bg-pastel-blue/10 dark:bg-pastel-darkBlue/20 rounded-lg overflow-hidden glassmorphism">
          <TabsTrigger
            value="analyzer"
            className="data-[state=active]:bg-pastel-blue/30 dark:data-[state=active]:bg-pastel-darkBlue/40 data-[state=active]:text-white"
          >
            Resume Analyzer
          </TabsTrigger>
          <TabsTrigger
            value="generator"
            className="data-[state=active]:bg-pastel-purple/30 dark:data-[state=active]:bg-pastel-darkPurple/40 data-[state=active]:text-white"
          >
            Content Generator
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analyzer" className="space-y-4 animate-slide-up">
          <Card className="border-pastel-blue/20 dark:border-pastel-darkBlue/20 glassmorphism">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-dark-text">AI Resume Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dark-muted mb-4">
                Our AI will analyze your resume and provide personalized feedback to help you improve.
              </p>

              {score === null ? (
                <Button
                  onClick={analyzeResume}
                  disabled={isAnalyzing}
                  className="w-full bg-pastel-purple/80 hover:bg-pastel-darkPurple/90 text-white dark:bg-pastel-purple/90 dark:hover:bg-pastel-darkPurple transition-colors duration-300"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Analyze My Resume
                    </>
                  )}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-dark-text">Resume Score</span>
                      <span className="text-sm font-medium text-dark-text">{score}/100</span>
                    </div>
                    <Progress
                      value={score}
                      className="h-2 bg-pastel-blue/30 dark:bg-pastel-darkBlue/30"
                      indicatorClassName="bg-pastel-purple dark:bg-pastel-darkPurple"
                    />
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-dark-text">Improvement Suggestions</h4>
                    {suggestions.map((suggestion, idx) => (
                      <Card
                        key={idx}
                        className="p-3 border-pastel-yellow/30 dark:border-pastel-darkYellow/30 bg-pastel-yellow/10 dark:bg-pastel-darkYellow/10 glassmorphism"
                      >
                        <div className="flex gap-2">
                          <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                          <div>
                            <Badge
                              variant="outline"
                              className="mb-1 bg-pastel-yellow/30 dark:bg-pastel-darkYellow/30 text-dark-text border-0"
                            >
                              {suggestion.section}
                            </Badge>
                            <p className="text-sm font-medium text-dark-text">{suggestion.issue}</p>
                            <p className="text-sm text-dark-muted">{suggestion.suggestion}</p>
                          </div>
                        </div>
                      </Card>
                    ))}

                    <Button
                      variant="outline"
                      onClick={() => {
                        setScore(null)
                        setSuggestions([])
                      }}
                      className="w-full mt-2 border-pastel-red/30 dark:border-pastel-darkRed/30 hover:bg-pastel-red/20 dark:hover:bg-pastel-darkRed/20 text-dark-text"
                    >
                      Reset Analysis
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generator" className="space-y-4 animate-slide-up">
          <Card className="border-pastel-purple/20 dark:border-pastel-darkPurple/20 glassmorphism">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-dark-text">AI Content Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="section-select" className="text-dark-text">
                    Target Section
                  </Label>
                  <select
                    id="section-select"
                    value={targetSection}
                    onChange={(e) => setTargetSection(e.target.value)}
                    className="w-full p-2 border rounded-md bg-white/10 dark:bg-dark-card/30 border-pastel-purple/20 dark:border-pastel-darkPurple/20 text-dark-text focus:ring-pastel-purple dark:focus:ring-pastel-darkPurple"
                  >
                    <option value="summary">Professional Summary</option>
                    <option value="experience">Work Experience</option>
                    <option value="skills">Skills</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="prompt" className="text-dark-text">
                    Your Prompt
                  </Label>
                  <Textarea
                    id="prompt"
                    placeholder={`E.g., "Generate a professional summary for a software engineer with 5 years of experience in React and Node.js"`}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[80px] bg-white/10 dark:bg-dark-card/30 border-pastel-purple/20 dark:border-pastel-darkPurple/20 text-dark-text focus:ring-pastel-purple dark:focus:ring-pastel-darkPurple"
                  />
                </div>

                <Button
                  onClick={generateContent}
                  disabled={isGenerating || !prompt}
                  className="w-full bg-pastel-purple/80 hover:bg-pastel-darkPurple/90 text-white dark:bg-pastel-purple/90 dark:hover:bg-pastel-darkPurple transition-colors duration-300"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Content
                    </>
                  )}
                </Button>

                {generatedContent && (
                  <div className="mt-4 space-y-3 animate-fade-in">
                    <div className="p-3 bg-pastel-blue/10 dark:bg-pastel-darkBlue/10 rounded-md border border-pastel-blue/20 dark:border-pastel-darkBlue/20 glassmorphism">
                      <h4 className="text-sm font-medium mb-2 text-dark-text">Generated Content:</h4>
                      <p className="text-sm text-dark-text">{generatedContent}</p>
                    </div>

                    <Button
                      onClick={applySuggestion}
                      className="w-full bg-pastel-green/80 hover:bg-pastel-darkGreen/90 text-white dark:bg-pastel-green/90 dark:hover:bg-pastel-darkGreen transition-colors duration-300"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Apply to Resume
                    </Button>
                  </div>
                )}

                {feedback && (
                  <div
                    className={`p-2 rounded-md text-sm animate-fade-in ${
                      feedback.type === "success"
                        ? "bg-pastel-green/20 text-dark-text dark:bg-pastel-darkGreen/30 border border-pastel-green/30 dark:border-pastel-darkGreen/30"
                        : "bg-pastel-blue/20 text-dark-text dark:bg-pastel-darkBlue/30 border border-pastel-blue/30 dark:border-pastel-darkBlue/30"
                    } glassmorphism`}
                  >
                    {feedback.message}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


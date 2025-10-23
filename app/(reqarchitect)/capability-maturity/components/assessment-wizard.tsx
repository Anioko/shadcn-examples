"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, Circle, AlertCircle, Brain, Lightbulb, ArrowRight } from "lucide-react"

interface ValidationQuestion {
  id: string
  capability: string
  question: string
  type: 'binary' | 'scale' | 'text'
  aiSuggestion?: string
  confidence: number
  options?: { value: string; label: string }[]
}

export function AssessmentWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [responses, setResponses] = useState<Record<string, string>>({})

  const validationQuestions: ValidationQuestion[] = [
    {
      id: "data-processes",
      capability: "Data Management",
      question: "Are your data management processes documented?",
      type: "binary",
      aiSuggestion: "No - Based on: No process docs found",
      confidence: 67,
      options: [
        { value: "yes", label: "Yes, formally documented" },
        { value: "informal", label: "Yes, but informally" },
        { value: "no", label: "No documentation" }
      ]
    },
    {
      id: "analytics-automation",
      capability: "Analytics & BI",
      question: "What percentage of your reporting is automated?",
      type: "scale",
      aiSuggestion: "26-50% - Based on: Some scheduled reports detected",
      confidence: 84,
      options: [
        { value: "0-25", label: "0-25% (Mostly manual)" },
        { value: "26-50", label: "26-50% (Some automation)" },
        { value: "51-75", label: "51-75% (Mostly automated)" },
        { value: "76-100", label: "76-100% (Fully automated)" }
      ]
    },
    {
      id: "security-monitoring",
      capability: "Security",
      question: "Do you have continuous security monitoring in place?",
      type: "binary",
      aiSuggestion: "Yes - Based on: Security tools detected, SOC processes",
      confidence: 76,
      options: [
        { value: "yes", label: "Yes, 24/7 monitoring" },
        { value: "partial", label: "Partial monitoring" },
        { value: "no", label: "No monitoring" }
      ]
    }
  ]

  const totalQuestions = validationQuestions.length
  const progressPercentage = ((currentStep + 1) / totalQuestions) * 100

  const handleResponse = (questionId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }))
  }

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    // Handle completion - would normally update maturity scores
    alert("Assessment validation complete! Maturity scores updated.")
  }

  const currentQuestion = validationQuestions[currentStep]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-blue-500" />
          <span>AI-Assisted Assessment Validation</span>
        </CardTitle>
        <CardDescription>
          Quick validation to improve assessment accuracy
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{currentStep + 1} of {totalQuestions}</span>
          </div>
          <Progress value={progressPercentage} />
        </div>

        {/* Current Question */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Badge variant="outline">{currentQuestion.capability}</Badge>
            <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
          </div>

          {/* AI Suggestion */}
          <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
            <div className="flex items-start space-x-3">
              <Lightbulb className="h-5 w-5 text-blue-500 mt-0.5" />
              <div className="space-y-1">
                <div className="text-sm font-medium text-blue-900">AI Assessment</div>
                <div className="text-sm text-blue-800">{currentQuestion.aiSuggestion}</div>
                <div className="text-xs text-blue-600">
                  {currentQuestion.confidence}% confident
                </div>
              </div>
            </div>
          </div>

          {/* Response Options */}
          <RadioGroup
            value={responses[currentQuestion.id] || ""}
            onValueChange={(value) => handleResponse(currentQuestion.id, value)}
          >
            {currentQuestion.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="cursor-pointer">
                  {option.label}
                </Label>
                {currentQuestion.aiSuggestion?.includes(option.label.split(' ')[0]) && (
                  <Badge variant="secondary" className="text-xs">AI Suggested</Badge>
                )}
              </div>
            ))}
          </RadioGroup>

          {/* Additional Comments */}
          <div className="space-y-2">
            <Label htmlFor="comments">Additional context (optional)</Label>
            <Textarea
              id="comments"
              placeholder="Any additional information that might help improve the assessment..."
              className="resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          
          {currentStep < totalQuestions - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!responses[currentQuestion.id]}
              className="flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleComplete}
              disabled={!responses[currentQuestion.id]}
              className="flex items-center space-x-2"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Complete Assessment</span>
            </Button>
          )}
        </div>

        {/* Questions Overview */}
        <div className="border-t pt-4">
          <div className="text-sm font-medium mb-2">Assessment Progress</div>
          <div className="flex space-x-2">
            {validationQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                  index < currentStep
                    ? "bg-green-500 text-white"
                    : index === currentStep
                    ? "bg-blue-500 text-white"
                    : responses[validationQuestions[index].id]
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {index < currentStep ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skip Option */}
        <div className="text-center">
          <Button variant="ghost" className="text-xs text-muted-foreground">
            Skip validation (assessments will proceed with lower confidence)
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { IconPlus, IconX, IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import { FormField, FormStep, FrameworkFormSchema } from "@/lib/framework-form-schemas"
import { cn } from "@/lib/utils"

interface DynamicFormProps {
  schema: FrameworkFormSchema
  onSubmit: (data: Record<string, any>) => void
  onCancel?: () => void
  initialData?: Record<string, any>
}

export function DynamicForm({ schema, onSubmit, onCancel, initialData = {} }: DynamicFormProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [formData, setFormData] = React.useState<Record<string, any>>(initialData)

  const currentStepData = schema.steps[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === schema.steps.length - 1

  const updateFormData = (fieldId: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }))
  }

  const handleTagInput = (fieldId: string, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const input = e.currentTarget
      const value = input.value.trim()
      
      if (value) {
        const currentTags = (formData[fieldId] as string[]) || []
        if (!currentTags.includes(value)) {
          updateFormData(fieldId, [...currentTags, value])
        }
        input.value = ""
      }
    }
  }

  const addTag = (fieldId: string, tag: string) => {
    const currentTags = (formData[fieldId] as string[]) || []
    if (!currentTags.includes(tag)) {
      updateFormData(fieldId, [...currentTags, tag])
    }
  }

  const removeTag = (fieldId: string, tagToRemove: string) => {
    const currentTags = (formData[fieldId] as string[]) || []
    updateFormData(
      fieldId,
      currentTags.filter((tag) => tag !== tagToRemove)
    )
  }

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const renderField = (field: FormField) => {
    const value = formData[field.id]

    switch (field.type) {
      case "input":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              placeholder={field.placeholder}
              value={(value as string) || ""}
              onChange={(e) => updateFormData(field.id, e.target.value)}
              required={field.required}
            />
          </div>
        )

      case "number":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              type="number"
              placeholder={field.placeholder}
              value={(value as number) || ""}
              onChange={(e) => updateFormData(field.id, parseFloat(e.target.value) || 0)}
              required={field.required}
            />
          </div>
        )

      case "textarea":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              value={(value as string) || ""}
              onChange={(e) => updateFormData(field.id, e.target.value)}
              required={field.required}
              rows={4}
            />
          </div>
        )

      case "select":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Select
              value={(value as string) || field.defaultValue as string || ""}
              onValueChange={(val) => updateFormData(field.id, val)}
            >
              <SelectTrigger id={field.id}>
                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )

      case "date":
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={field.id}
              type="date"
              value={(value as string) || ""}
              onChange={(e) => updateFormData(field.id, e.target.value)}
              required={field.required}
            />
          </div>
        )

      case "tags":
        const currentTags = (value as string[]) || []
        const availableSuggestions = field.suggestions?.filter(
          (suggestion) => !currentTags.includes(suggestion)
        ) || []

        return (
          <div key={field.id} className="space-y-3">
            <Label>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>

            {/* Display existing tags */}
            {currentTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {currentTags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(field.id, tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      <IconX className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Input for new tags */}
            <Input
              placeholder={field.placeholder}
              onKeyDown={(e) => handleTagInput(field.id, e)}
            />
            <p className="text-xs text-muted-foreground">Press Enter to add</p>

            {/* Suggestion buttons */}
            {availableSuggestions.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Suggestions:</Label>
                <div className="flex flex-wrap gap-2">
                  {availableSuggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addTag(field.id, suggestion)}
                      className="h-7 text-xs"
                    >
                      <IconPlus className="mr-1 h-3 w-3" />
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case "checkbox":
        return (
          <div key={field.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={field.id}
              checked={(value as boolean) || false}
              onChange={(e) => updateFormData(field.id, e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor={field.id}>{field.label}</Label>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Multi-step progress */}
      {schema.steps.length > 1 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>
              Step {currentStep + 1} of {schema.steps.length}
            </span>
            <span>{currentStepData.title}</span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{
                width: `${((currentStep + 1) / schema.steps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Current step title */}
      <div>
        <h3 className="text-lg font-semibold">{currentStepData.title}</h3>
        {currentStepData.description && (
          <p className="text-sm text-muted-foreground mt-1">{currentStepData.description}</p>
        )}
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {currentStepData.fields.map((field) => renderField(field))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between pt-4 border-t">
        <div className="flex gap-2">
          {!isFirstStep && (
            <Button type="button" variant="outline" onClick={handlePrevious}>
              <IconChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          {!isLastStep ? (
            <Button type="button" onClick={handleNext}>
              Next
              <IconChevronRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </div>
    </form>
  )
}

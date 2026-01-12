// Framework Form Schemas
// Maps each grandchild to its form schema for the form generator

export interface FormField {
  id: string
  type: 'input' | 'textarea' | 'select' | 'tags' | 'date' | 'checkbox' | 'radio' | 'number'
  label: string
  placeholder?: string
  required: boolean
  suggestions?: string[]
  options?: string[]
  defaultValue?: string | number | boolean
}

export interface FormStep {
  id: string
  title: string
  description?: string
  fields: FormField[]
}

export interface FrameworkFormSchema {
  id: string
  title: string
  description?: string
  steps: FormStep[]
}

// =============================================================================
// DEFAULT GENERIC SCHEMA (Fallback)
// =============================================================================

export const defaultFormSchema: FrameworkFormSchema = {
  id: "default",
  title: "Add Item",
  description: "Add a new item to this framework",
  steps: [
    {
      id: "basic-info",
      title: "Basic Information",
      fields: [
        {
          id: "title",
          type: "input",
          label: "Title",
          placeholder: "Enter title",
          required: true
        },
        {
          id: "description",
          type: "textarea",
          label: "Description",
          placeholder: "Provide a detailed description",
          required: false
        },
        {
          id: "status",
          type: "select",
          label: "Status",
          required: true,
          options: ["Draft", "In Progress", "Done"],
          defaultValue: "Draft"
        },
        {
          id: "priority",
          type: "select",
          label: "Priority",
          required: false,
          options: ["High", "Medium", "Low"],
          defaultValue: "Medium"
        },
        {
          id: "tags",
          type: "tags",
          label: "Tags",
          placeholder: "Add tags",
          required: false,
          suggestions: []
        },
        {
          id: "dueDate",
          type: "date",
          label: "Due Date",
          required: false
        }
      ]
    }
  ]
}

// =============================================================================
// LEAN CANVAS SCHEMAS
// =============================================================================

export const leanCanvasProblemSchema: FrameworkFormSchema = {
  id: "lean-canvas-problem",
  title: "Add Problem",
  description: "Define a problem that your customers face",
  steps: [
    {
      id: "problem-details",
      title: "Problem Details",
      fields: [
        {
          id: "title",
          type: "input",
          label: "Problem Title",
          placeholder: "e.g., Difficulty tracking multiple projects",
          required: true
        },
        {
          id: "description",
          type: "textarea",
          label: "Problem Description",
          placeholder: "Describe the problem in detail",
          required: true
        },
        {
          id: "customerSegments",
          type: "tags",
          label: "Customer Segments Affected",
          placeholder: "Add customer segments",
          required: false,
          suggestions: [
            "Small Businesses",
            "Enterprises",
            "Startups",
            "Freelancers",
            "Agencies",
            "Non-profits",
            "Educational Institutions"
          ]
        },
        {
          id: "priority",
          type: "select",
          label: "Priority",
          required: true,
          options: ["Critical", "High", "Medium", "Low"],
          defaultValue: "Medium"
        },
        {
          id: "frequency",
          type: "select",
          label: "How Often Does This Occur?",
          required: false,
          options: ["Daily", "Weekly", "Monthly", "Occasionally", "Rarely"]
        }
      ]
    }
  ]
}

export const leanCanvasSolutionSchema: FrameworkFormSchema = {
  id: "lean-canvas-solution",
  title: "Add Solution",
  description: "Define a solution to address customer problems",
  steps: [
    {
      id: "solution-details",
      title: "Solution Details",
      fields: [
        {
          id: "title",
          type: "input",
          label: "Solution Title",
          placeholder: "e.g., Unified dashboard for project tracking",
          required: true
        },
        {
          id: "description",
          type: "textarea",
          label: "Solution Description",
          placeholder: "Describe how this solution addresses the problem",
          required: true
        },
        {
          id: "problemsAddressed",
          type: "tags",
          label: "Problems This Solves",
          placeholder: "Link to problems",
          required: false,
          suggestions: []
        },
        {
          id: "features",
          type: "tags",
          label: "Key Features",
          placeholder: "Add key features",
          required: false,
          suggestions: [
            "Real-time Updates",
            "Mobile Access",
            "Integration API",
            "Custom Reports",
            "Team Collaboration",
            "Automation"
          ]
        },
        {
          id: "complexity",
          type: "select",
          label: "Implementation Complexity",
          required: false,
          options: ["Simple", "Moderate", "Complex", "Very Complex"]
        }
      ]
    }
  ]
}

export const leanCanvasKeyMetricSchema: FrameworkFormSchema = {
  id: "lean-canvas-key-metric",
  title: "Add Key Metric",
  description: "Define a key metric to measure success",
  steps: [
    {
      id: "metric-details",
      title: "Metric Details",
      fields: [
        {
          id: "title",
          type: "input",
          label: "Metric Name",
          placeholder: "e.g., Monthly Active Users",
          required: true
        },
        {
          id: "description",
          type: "textarea",
          label: "Description",
          placeholder: "Describe what this metric measures",
          required: false
        },
        {
          id: "currentValue",
          type: "number",
          label: "Current Value",
          placeholder: "0",
          required: false
        },
        {
          id: "targetValue",
          type: "number",
          label: "Target Value",
          placeholder: "1000",
          required: false
        },
        {
          id: "unit",
          type: "input",
          label: "Unit of Measurement",
          placeholder: "e.g., users, $, %",
          required: false
        },
        {
          id: "frequency",
          type: "select",
          label: "Measurement Frequency",
          required: false,
          options: ["Real-time", "Daily", "Weekly", "Monthly", "Quarterly", "Annually"]
        }
      ]
    }
  ]
}

// =============================================================================
// TOGAF SCHEMAS
// =============================================================================

export const togafArchitectureVisionSchema: FrameworkFormSchema = {
  id: "togaf-architecture-vision",
  title: "Add Architecture Vision",
  description: "Define the architecture vision for Phase A",
  steps: [
    {
      id: "vision-details",
      title: "Vision Details",
      fields: [
        {
          id: "title",
          type: "input",
          label: "Vision Title",
          placeholder: "Enter vision title",
          required: true
        },
        {
          id: "description",
          type: "textarea",
          label: "Vision Description",
          placeholder: "Describe the architecture vision",
          required: true
        },
        {
          id: "objectives",
          type: "tags",
          label: "Business Objectives",
          placeholder: "Add objectives",
          required: false,
          suggestions: [
            "Cost Reduction",
            "Improved Efficiency",
            "Better Customer Experience",
            "Risk Mitigation",
            "Compliance"
          ]
        },
        {
          id: "stakeholders",
          type: "tags",
          label: "Key Stakeholders",
          placeholder: "Add stakeholders",
          required: false,
          suggestions: []
        },
        {
          id: "scope",
          type: "textarea",
          label: "Scope",
          placeholder: "Define the scope of this vision",
          required: false
        }
      ]
    }
  ]
}

// =============================================================================
// ISO 27001 SCHEMAS
// =============================================================================

export const iso27001ControlSchema: FrameworkFormSchema = {
  id: "iso27001-control",
  title: "Add Control",
  description: "Add an ISO 27001 control",
  steps: [
    {
      id: "control-details",
      title: "Control Details",
      fields: [
        {
          id: "title",
          type: "input",
          label: "Control Title",
          placeholder: "e.g., Access Control Policy",
          required: true
        },
        {
          id: "controlId",
          type: "input",
          label: "Control ID",
          placeholder: "e.g., A.5.1",
          required: false
        },
        {
          id: "description",
          type: "textarea",
          label: "Description",
          placeholder: "Describe the control",
          required: true
        },
        {
          id: "category",
          type: "select",
          label: "Control Category",
          required: true,
          options: [
            "Organizational",
            "People",
            "Physical",
            "Technological"
          ]
        },
        {
          id: "implementationStatus",
          type: "select",
          label: "Implementation Status",
          required: true,
          options: [
            "Not Started",
            "In Progress",
            "Partially Implemented",
            "Fully Implemented"
          ],
          defaultValue: "Not Started"
        },
        {
          id: "owner",
          type: "input",
          label: "Control Owner",
          placeholder: "Responsible person/team",
          required: false
        }
      ]
    }
  ]
}

// =============================================================================
// SCHEMA MAPPING
// =============================================================================

export const frameworkFormSchemas: Record<string, Record<string, FrameworkFormSchema>> = {
  "lean-canvas": {
    "problems": leanCanvasProblemSchema,
    "solutions": leanCanvasSolutionSchema,
    "key-metrics": leanCanvasKeyMetricSchema,
    // Use default for others
  },
  "togaf": {
    "architecture-vision": togafArchitectureVisionSchema,
  },
  "iso-27001": {
    "organizational-controls": iso27001ControlSchema,
    "people-controls": iso27001ControlSchema,
    "physical-controls": iso27001ControlSchema,
    "technological-controls": iso27001ControlSchema,
  }
}

/**
 * Get form schema for a specific framework and grandchild
 */
export function getFormSchema(
  frameworkSlug: string,
  grandchildId: string
): FrameworkFormSchema {
  const frameworkSchemas = frameworkFormSchemas[frameworkSlug]
  
  if (frameworkSchemas && frameworkSchemas[grandchildId]) {
    return frameworkSchemas[grandchildId]
  }
  
  // Return default schema as fallback
  return defaultFormSchema
}

/**
 * Check if a framework has custom form schemas
 */
export function hasCustomFormSchema(
  frameworkSlug: string,
  grandchildId: string
): boolean {
  return !!(
    frameworkFormSchemas[frameworkSlug] &&
    frameworkFormSchemas[frameworkSlug][grandchildId]
  )
}

import { z } from "zod";

// Basic field type schema
export const FieldTypeSchema = z.enum([
  "string", 
  "number", 
  "date", 
  "status", 
  "email", 
  "url", 
  "percentage", 
  "currency", 
  "boolean"
]);

// Value range schema for numeric fields
export const ValueRangeSchema = z.object({
  min: z.number(),
  max: z.number(),
}).refine(data => data.min <= data.max, {
  message: "Minimum value must be less than or equal to maximum value",
  path: ["max"],
});

// Date range schema
export const DateRangeSchema = z.object({
  start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
}).refine(data => new Date(data.start) <= new Date(data.end), {
  message: "Start date must be before or equal to end date",
  path: ["end"],
});

// Field definition schema
export const FieldDefinitionSchema = z.object({
  name: z.string().min(1, "Field name is required").regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, "Field name must be valid identifier"),
  type: FieldTypeSchema,
  required: z.boolean(),
  values: z.array(z.string().min(1)).optional(),
  range: ValueRangeSchema.optional(),
  format: z.string().optional(),
  validation: z.object({
    pattern: z.string().optional(),
    message: z.string().optional(),
  }).optional(),
});

// Data configuration schema
export const DataConfigSchema = z.object({
  fields: z.array(FieldDefinitionSchema).min(1, "At least one field is required"),
  count: z.number().int().min(1).max(1000),
  categories: z.array(z.string().min(1)).optional(),
  statuses: z.array(z.string().min(1)).optional(),
  dateRange: DateRangeSchema.optional(),
  valueRanges: z.record(z.string(), ValueRangeSchema).optional(),
});

// Chart visualization schema
export const VisualizationSchema = z.object({
  chartType: z.enum(["line", "bar", "pie", "area", "scatter", "doughnut"]),
  showLegend: z.boolean(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$|^[a-zA-Z]+$/, "Invalid color format"),
  height: z.number().int().min(200).max(800),
  responsive: z.boolean(),
});

// Layout span schema
export const SpanSchema = z.object({
  cols: z.number().int().min(1).max(12),
  rows: z.number().int().min(1).max(6),
});

// Dashboard section types
export const SectionTypeSchema = z.enum([
  "chart", 
  "table", 
  "cards", 
  "metrics", 
  "list", 
  "text", 
  "image",
  "custom"
]);

// Dashboard section schema
export const DashboardSectionSchema = z.object({
  id: z.string().min(1, "Section ID is required").regex(/^[a-zA-Z][a-zA-Z0-9-_]*$/, "Invalid section ID format"),
  type: SectionTypeSchema,
  title: z.string().min(1, "Section title is required").max(100, "Title too long"),
  description: z.string().max(500, "Description too long").optional(),
  span: SpanSchema,
  data: z.string().min(1, "Data source is required"),
  dataConfig: DataConfigSchema,
  visualization: VisualizationSchema.optional(),
  showHeader: z.boolean(),
  showBorder: z.boolean(),
  customClasses: z.string().optional(),
});

// Filter types
export const FilterTypeSchema = z.enum(["select", "date", "search", "range", "multiselect"]);

// Filter configuration schema
export const FilterConfigSchema = z.object({
  id: z.string().min(1, "Filter ID is required").regex(/^[a-zA-Z][a-zA-Z0-9-_]*$/, "Invalid filter ID"),
  type: FilterTypeSchema,
  label: z.string().min(1, "Filter label is required"),
  placeholder: z.string().optional(),
  options: z.array(z.string().min(1)).optional(),
  required: z.boolean(),
  defaultValue: z.string().optional(),
});

// Dashboard layout schema
export const LayoutSchema = z.enum(["grid", "sidebar", "tabs", "stack"]);

// Theme configuration
export const ThemeConfigSchema = z.object({
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format"),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format"),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid background color"),
  textColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid text color"),
  borderRadius: z.number().min(0).max(20),
});

// Main dashboard schema
export const DashboardSchema = z.object({
  id: z.string().min(1, "Dashboard ID is required").regex(/^[a-zA-Z][a-zA-Z0-9-_]*$/, "Invalid dashboard ID"),
  title: z.string().min(1, "Dashboard title is required").max(100, "Title too long"),
  description: z.string().max(500, "Description too long").optional(),
  layout: LayoutSchema,
  sections: z.array(DashboardSectionSchema).min(1, "At least one section is required").max(20, "Too many sections"),
  filters: z.array(FilterConfigSchema).optional(),
  theme: ThemeConfigSchema.optional(),
  refreshInterval: z.number().int().min(0).max(3600000).optional(), // milliseconds
  autoRefresh: z.boolean().default(false),
  exportEnabled: z.boolean().default(true),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
}).refine(data => {
  // Ensure section IDs are unique
  const sectionIds = data.sections.map(s => s.id);
  return new Set(sectionIds).size === sectionIds.length;
}, {
  message: "Section IDs must be unique",
  path: ["sections"],
}).refine(data => {
  // Ensure filter IDs are unique if filters exist
  if (!data.filters) return true;
  const filterIds = data.filters.map(f => f.id);
  return new Set(filterIds).size === filterIds.length;
}, {
  message: "Filter IDs must be unique",
  path: ["filters"],
});

// Form validation schema for the dashboard generator
export const DashboardFormSchema = z.object({
  basicInfo: z.object({
    id: z.string().min(1, "Dashboard ID is required").regex(/^[a-zA-Z][a-zA-Z0-9-_]*$/, "Invalid dashboard ID"),
    title: z.string().min(1, "Dashboard title is required").max(100, "Title too long"),
    description: z.string().max(500, "Description too long").optional(),
    layout: LayoutSchema,
  }),
  sections: z.array(DashboardSectionSchema).min(1, "At least one section is required"),
  filters: z.array(FilterConfigSchema).optional(),
  theme: ThemeConfigSchema.optional(),
  settings: z.object({
    refreshInterval: z.number().int().min(0).max(3600000).optional(),
    autoRefresh: z.boolean(),
    exportEnabled: z.boolean(),
  }),
});

// Field suggestion schemas - following UI guidelines requirement for 20+ options per field
export const FieldSuggestionSchemas = {
  // Business & Industry Categories (30+ options)
  industries: z.array(z.string()).default([
    "Software Development", "SaaS", "E-commerce", "Gaming", "Cybersecurity", 
    "AI/Machine Learning", "Blockchain", "IoT", "Healthcare", "Finance", 
    "Banking", "Insurance", "Real Estate", "Manufacturing", "Retail", 
    "Education", "Transportation", "Energy", "Utilities", "Agriculture", 
    "Construction", "Consulting", "Legal Services", "Accounting", 
    "Marketing Services", "Professional Services", "Entertainment", "Media", 
    "Publishing", "Green Technology", "Renewable Energy", "Biotechnology",
    "Space Technology", "Autonomous Vehicles", "Digital Health"
  ]),

  // Technology Stack (50+ options)
  technologies: z.array(z.string()).default([
    "React", "Vue.js", "Angular", "Next.js", "Nuxt.js", "Svelte", "TypeScript",
    "JavaScript", "Python", "Node.js", "Express", "Fastify", "Django", "Flask",
    "Ruby on Rails", "PHP", "Laravel", "Java", "Spring Boot", "C#", ".NET",
    "Go", "Rust", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch",
    "AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", 
    "Ansible", "Jenkins", "GitHub Actions", "GitLab CI", "React Native", 
    "Flutter", "iOS Native", "Android Native", "Ionic", "Xamarin", "Cordova",
    "GraphQL", "REST API", "gRPC", "WebSocket", "Microservices", "Serverless"
  ]),

  // Business Functions (40+ options)
  businessFunctions: z.array(z.string()).default([
    "Strategic Planning", "Business Development", "Market Research", 
    "Competitive Analysis", "Partnership Management", "Vendor Management",
    "Project Management", "Process Optimization", "Quality Assurance",
    "Supply Chain Management", "Procurement", "Inventory Management",
    "Customer Support", "Customer Success", "Sales", "Marketing",
    "Content Marketing", "Digital Marketing", "Social Media", "SEO/SEM",
    "Account Management", "Business Analysis", "User Research",
    "Software Development", "DevOps", "System Administration",
    "Data Analytics", "Security Management", "IT Support",
    "Financial Planning", "Budget Management", "Legal Compliance",
    "Risk Management", "Audit & Review", "Contract Management",
    "Human Resources", "Talent Acquisition", "Training & Development",
    "Performance Management", "Employee Relations", "Payroll"
  ]),

  // Chart Types (20+ options)
  chartTypes: z.array(z.string()).default([
    "Line Chart", "Bar Chart", "Column Chart", "Area Chart", "Pie Chart",
    "Doughnut Chart", "Scatter Plot", "Bubble Chart", "Radar Chart", 
    "Polar Chart", "Histogram", "Box Plot", "Waterfall Chart", 
    "Gantt Chart", "Heat Map", "Tree Map", "Sunburst Chart", 
    "Funnel Chart", "Sankey Diagram", "Gauge Chart", "Sparkline", 
    "Candlestick Chart", "OHLC Chart", "Timeline Chart"
  ]),

  // Data Sources (25+ options)
  dataSources: z.array(z.string()).default([
    "PostgreSQL Database", "MySQL Database", "MongoDB", "Redis Cache",
    "REST API", "GraphQL API", "CSV Files", "Excel Spreadsheets",
    "Google Sheets", "Airtable", "Notion Database", "JSON Files",
    "XML Data", "Web Scraping", "Email Analytics", "Social Media APIs",
    "CRM Systems", "ERP Systems", "Analytics Platforms", "Webhook Data",
    "Real-time Streams", "Message Queues", "Cloud Storage", 
    "Third-party Services", "Manual Entry"
  ]),

  // Status Values (15+ options)
  statusValues: z.array(z.string()).default([
    "active", "inactive", "pending", "completed", "failed", "cancelled",
    "in-progress", "on-hold", "approved", "rejected", "draft", "published",
    "archived", "suspended", "maintenance"
  ]),

  // Dashboard Layouts (8+ options)
  layoutTypes: z.array(z.string()).default([
    "Grid Layout", "Sidebar Layout", "Tab Layout", "Stack Layout",
    "Masonry Layout", "Card Layout", "List Layout", "Timeline Layout"
  ])
};

// Type exports
export type DashboardConfig = z.infer<typeof DashboardSchema>;
export type DashboardSection = z.infer<typeof DashboardSectionSchema>;
export type FilterConfig = z.infer<typeof FilterConfigSchema>;
export type DataConfig = z.infer<typeof DataConfigSchema>;
export type FieldDefinition = z.infer<typeof FieldDefinitionSchema>;
export type VisualizationConfig = z.infer<typeof VisualizationSchema>;
export type ThemeConfig = z.infer<typeof ThemeConfigSchema>;
export type DashboardFormData = z.infer<typeof DashboardFormSchema>;
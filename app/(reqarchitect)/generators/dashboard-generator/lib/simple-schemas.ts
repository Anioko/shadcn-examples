import { z } from "zod";

// Basic field types
export const FieldTypeSchema = z.enum([
  "string", 
  "number", 
  "date", 
  "status", 
  "email", 
  "currency"
]);

// Section types
export const SectionTypeSchema = z.enum([
  "metrics", 
  "chart", 
  "table"
]);

// Layout types
export const LayoutSchema = z.enum(["grid", "sidebar"]);

// Data source types
export const DataSourceSchema = z.enum(["metrics", "users", "revenue"]);

// Dashboard section schema
export const DashboardSectionSchema = z.object({
  id: z.string().min(1, "Section ID is required"),
  type: SectionTypeSchema,
  title: z.string().min(1, "Section title is required"),
  data: DataSourceSchema
});

// Main dashboard configuration schema
export const DashboardConfigSchema = z.object({
  title: z.string().min(1, "Dashboard title is required"),
  description: z.string(),
  layout: LayoutSchema,
  sections: z.array(DashboardSectionSchema)
});

// Data type schemas
export const MetricDataSchema = z.object({
  label: z.string(),
  value: z.string(),
  change: z.string()
});

export const UserDataSchema = z.object({
  name: z.string(),
  email: z.string(),
  status: z.string(),
  value: z.number()
});

export const RevenueDataSchema = z.object({
  month: z.string(),
  revenue: z.number(),
  target: z.number()
});

// Type exports
export type DashboardConfig = z.infer<typeof DashboardConfigSchema>;
export type DashboardSection = z.infer<typeof DashboardSectionSchema>;
export type SectionType = z.infer<typeof SectionTypeSchema>;
export type LayoutType = z.infer<typeof LayoutSchema>;
export type DataSourceType = z.infer<typeof DataSourceSchema>;
export type MetricData = z.infer<typeof MetricDataSchema>;
export type UserData = z.infer<typeof UserDataSchema>;
export type RevenueData = z.infer<typeof RevenueDataSchema>;

// Schema-driven data generation
export class SimpleDataGenerator {
  private static randomValue = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min);
  private static randomChange = () => {
    const value = Math.floor(Math.random() * 30) - 10; // -10% to +20%
    return value >= 0 ? `+${value}%` : `${value}%`;
  };
  
  private static generateDynamicTemplates() {
    return {
      metrics: [
        { label: "Schema Users", value: this.randomValue(1000, 9999).toLocaleString(), change: this.randomChange() },
        { label: "Generated Revenue", value: `$${this.randomValue(10000, 99999).toLocaleString()}`, change: this.randomChange() },
        { label: "Dynamic Growth", value: `${this.randomValue(10, 99)}.${this.randomValue(0, 9)}%`, change: this.randomChange() },
        { label: "Schema Sessions", value: this.randomValue(500, 5000).toLocaleString(), change: this.randomChange() }
      ],
      users: [
        { name: "Schema User A", email: "user.a@schema.com", status: "active", value: this.randomValue(1000, 2000) },
        { name: "Generated User B", email: "user.b@dynamic.com", status: "pending", value: this.randomValue(500, 1500) },
        { name: "Dynamic User C", email: "user.c@generated.com", status: "active", value: this.randomValue(1200, 1800) },
        { name: "Schema User D", email: "user.d@zod.com", status: "inactive", value: this.randomValue(600, 1200) }
      ],
      revenue: [
        { month: "Q1", revenue: this.randomValue(40000, 60000), target: this.randomValue(50000, 70000) },
        { month: "Q2", revenue: this.randomValue(45000, 65000), target: this.randomValue(55000, 75000) },
        { month: "Q3", revenue: this.randomValue(42000, 62000), target: this.randomValue(52000, 72000) },
        { month: "Q4", revenue: this.randomValue(48000, 68000), target: this.randomValue(58000, 78000) }
      ]
    };
  }

  static generateDataForSource(dataSource: DataSourceType) {
    const templates = this.generateDynamicTemplates();
    const template = templates[dataSource];
    if (!template) {
      throw new Error(`No data template found for source: ${dataSource}`);
    }
    return template;
  }

  static generateSectionData(section: DashboardSection) {
    const baseData = this.generateDataForSource(section.data);
    
    // Add schema validation
    const result = DashboardSectionSchema.safeParse(section);
    if (!result.success) {
      throw new Error(`Invalid section configuration: ${result.error.message}`);
    }

    return baseData;
  }

  static validateDashboardConfig(config: DashboardConfig) {
    const result = DashboardConfigSchema.safeParse(config);
    if (!result.success) {
      return {
        valid: false,
        errors: result.error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      };
    }
    return { valid: true, errors: [] };
  }
}
import { z } from 'zod';

// Layout types
export const LayoutType = z.enum(['grid', 'sidebar']);
export type LayoutType = z.infer<typeof LayoutType>;

// Section types
export const SectionType = z.enum(['metrics', 'chart', 'table']);
export type SectionType = z.infer<typeof SectionType>;

// Data source types  
export const DataSourceType = z.enum(['metrics', 'users', 'revenue']);
export type DataSourceType = z.infer<typeof DataSourceType>;

// Dashboard section schema
export const DashboardSectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Section title is required'),
  type: SectionType,
  data: DataSourceType
});
export type DashboardSection = z.infer<typeof DashboardSectionSchema>;

// Main dashboard configuration schema
export const DashboardConfigSchema = z.object({
  title: z.string().min(1, 'Dashboard title is required'),
  description: z.string().min(1, 'Dashboard description is required'),
  layout: LayoutType,
  sections: z.array(DashboardSectionSchema).min(1, 'At least one section is required')
});
export type DashboardConfig = z.infer<typeof DashboardConfigSchema>;

// Data types for schema-driven generation
export const MetricDataSchema = z.object({
  label: z.string(),
  value: z.number(),
  change: z.number().optional()
});
export type MetricData = z.infer<typeof MetricDataSchema>;

export const UserDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  status: z.enum(['active', 'inactive']),
  joinDate: z.string()
});
export type UserData = z.infer<typeof UserDataSchema>;

export const RevenueDataSchema = z.object({
  month: z.string(),
  amount: z.number(),
  growth: z.number()
});
export type RevenueData = z.infer<typeof RevenueDataSchema>;

// Schema-driven data generator class
export class SimpleDataGenerator {
  generateData(dataType: DataSourceType): MetricData[] | UserData[] | RevenueData[] {
    switch (dataType) {
      case 'metrics':
        return this.generateMetricsData();
      case 'users':
        return this.generateUsersData();
      case 'revenue':
        return this.generateRevenueData();
      default:
        return [];
    }
  }

  private generateMetricsData(): MetricData[] {
    const rawData = [
      { label: 'Total Users', value: 12500, change: 12 },
      { label: 'Active Sessions', value: 1250, change: -5 },
      { label: 'Revenue', value: 45000, change: 23 },
      { label: 'Conversion Rate', value: 3.2, change: 8 }
    ];

    return rawData.map(item => MetricDataSchema.parse(item));
  }

  private generateUsersData(): UserData[] {
    const rawData = [
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', joinDate: '2024-01-15' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', joinDate: '2024-02-20' },
      { id: 3, name: 'Bob Wilson', email: 'bob@example.com', status: 'inactive', joinDate: '2024-01-10' }
    ];

    return rawData.map(item => UserDataSchema.parse(item));
  }

  private generateRevenueData(): RevenueData[] {
    const rawData = [
      { month: 'Jan', amount: 12000, growth: 8 },
      { month: 'Feb', amount: 15000, growth: 25 },
      { month: 'Mar', amount: 13500, growth: -10 }
    ];

    return rawData.map(item => RevenueDataSchema.parse(item));
  }
}
import { 
  DashboardSection, 
  DataConfig, 
  FieldDefinition, 
  FieldSuggestionSchemas 
} from './schemas';

// Schema-driven data generation engine
export class SchemaDataGenerator {
  private static contextualTemplates: Record<string, Record<string, string[]>> = {
    // Activity/Events context
    'activity': {
      'name': [
        'Dashboard Analytics Review', 'User Engagement Analysis', 'Revenue Performance Check',
        'System Health Monitoring', 'Security Audit Process', 'Data Processing Pipeline',
        'Customer Onboarding Flow', 'Product Feature Launch', 'Market Research Survey',
        'Compliance Assessment', 'Performance Optimization', 'Quality Assurance Review'
      ],
      'type': ['view', 'analysis', 'processing', 'monitoring', 'audit', 'research'],
      'description': [
        'Comprehensive analytics dashboard review and optimization',
        'User engagement metrics analysis and reporting',
        'Revenue performance tracking and forecasting',
        'System health monitoring and alerting',
        'Security compliance audit and validation',
        'Data processing pipeline optimization'
      ]
    },
    
    // Events context
    'events': {
      'name': [
        'System Backup Completed', 'User Registration Processed', 'Payment Transaction Verified',
        'Data Migration Finished', 'Security Scan Executed', 'Performance Test Completed',
        'API Endpoint Created', 'Database Optimization', 'Cache Refresh Triggered',
        'Log Analysis Generated', 'Alert Notification Sent', 'Report Generation Started'
      ],
      'type': ['system', 'user', 'payment', 'migration', 'security', 'performance'],
      'status': ['completed', 'in-progress', 'failed', 'pending', 'cancelled', 'scheduled']
    },
    
    // Products/Services context
    'products': {
      'name': [
        'Enterprise Analytics Platform', 'Business Intelligence Suite', 'Real-time Dashboard Pro',
        'Data Visualization Toolkit', 'Customer Insights Engine', 'Performance Metrics Hub',
        'Security Compliance Monitor', 'Process Automation Suite', 'Integration Gateway',
        'Report Generation Engine', 'KPI Tracking System', 'Business Model Analyzer'
      ],
      'category': ['Analytics', 'Business Intelligence', 'Dashboards', 'Security', 'Integration', 'Automation'],
      'sku': ['PLAT-001', 'BI-002', 'DASH-003', 'VIZ-004', 'INS-005', 'PERF-006']
    },
    
    // Users/Contacts context
    'users': {
      'name': [
        'Sarah Chen', 'Michael Rodriguez', 'Emma Thompson', 'David Kim', 'Lisa Johnson',
        'Alex Morgan', 'Jessica Wang', 'Ryan O\'Connor', 'Maria Garcia', 'James Wilson',
        'Ashley Brown', 'Daniel Lee', 'Rachel Smith', 'Kevin Davis', 'Amanda Miller'
      ],
      'email': [
        'sarah.chen@company.com', 'michael.rodriguez@company.com', 'emma.thompson@company.com',
        'david.kim@company.com', 'lisa.johnson@company.com', 'alex.morgan@company.com'
      ],
      'role': ['Admin', 'Manager', 'Analyst', 'Developer', 'Designer', 'Consultant'],
      'department': ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations']
    },
    
    // Revenue/Financial context
    'revenue': {
      'name': [
        'Q1 Revenue Performance', 'Q2 Growth Metrics', 'Annual Recurring Revenue',
        'Monthly Subscription Income', 'Enterprise Contract Value', 'Product Line Revenue',
        'Regional Sales Performance', 'Customer Lifetime Value', 'Gross Margin Analysis',
        'Operating Income Report', 'Cash Flow Statement', 'Budget vs Actual Analysis'
      ],
      'category': ['Recurring', 'One-time', 'Subscription', 'Enterprise', 'SMB', 'Individual'],
      'status': ['confirmed', 'projected', 'at-risk', 'achieved', 'exceeded', 'missed']
    },
    
    // Metrics/KPIs context
    'metrics': {
      'name': [
        'Customer Acquisition Cost', 'Monthly Active Users', 'Conversion Rate',
        'Customer Satisfaction Score', 'Net Promoter Score', 'System Uptime',
        'Response Time Average', 'Error Rate Percentage', 'Feature Adoption Rate',
        'User Retention Rate', 'Revenue Growth Rate', 'Support Ticket Volume'
      ],
      'category': ['Customer', 'Technical', 'Business', 'Operational', 'Financial', 'Quality'],
      'unit': ['percentage', 'count', 'currency', 'time', 'score', 'ratio']
    }
  };

  /**
   * Generate schema-driven data for a dashboard section
   */
  static generateDataFromSchema(dataType: string, section: DashboardSection): Record<string, unknown>[] {
    const config = section.dataConfig;
    
    if (!config?.fields || config.fields.length === 0) {
      throw new Error(`No fields configured for section ${section.id}`);
    }

    const count = Math.max(1, Math.min(config.count, 1000)); // Enforce limits
    const contextualData = this.contextualTemplates[dataType] || {};

    return Array.from({ length: count }, (_, index) => {
      const item: Record<string, unknown> = { 
        id: `${dataType}-${String(index + 1).padStart(4, '0')}`,
        _generatedAt: new Date().toISOString(),
        _index: index
      };

      // Generate data for each field based on schema
      config.fields.forEach(field => {
        item[field.name] = this.generateFieldValue(field, index, count, contextualData);
      });

      // Add category from schema if specified and not already set
      if (config.categories && config.categories.length > 0 && !item.category) {
        item.category = config.categories[index % config.categories.length];
      }

      // Add status from schema if specified and not already set  
      if (config.statuses && config.statuses.length > 0 && !item.status) {
        item.status = config.statuses[index % config.statuses.length];
      }

      return item;
    });
  }

  /**
   * Generate a single field value based on field definition
   */
  private static generateFieldValue(
    field: FieldDefinition, 
    index: number, 
    totalCount: number, 
    contextualData: Record<string, string[]>
  ): unknown {
    // Use explicit field values first (highest priority)
    if (field.values && field.values.length > 0) {
      return field.values[index % field.values.length];
    }

    // Generate based on field type
    switch (field.type) {
      case 'string':
        return this.generateStringValue(field, index, contextualData);
        
      case 'number':
        return this.generateNumberValue(field, index, totalCount);
        
      case 'currency':
        return this.generateCurrencyValue(field, index, totalCount);
        
      case 'percentage':
        return this.generatePercentageValue(field, index, totalCount);
        
      case 'date':
        return this.generateDateValue(field, index, totalCount);
        
      case 'status':
        return this.generateStatusValue(field, index, contextualData);
        
      case 'email':
        return this.generateEmailValue(field, index, contextualData);
        
      case 'url':
        return this.generateUrlValue(field, index);
        
      case 'boolean':
        return this.generateBooleanValue(field, index);
        
      default:
        return `${field.name}_${index + 1}`;
    }
  }

  private static generateStringValue(
    field: FieldDefinition, 
    index: number, 
    contextualData: Record<string, string[]>
  ): string {
    // Use contextual data if available
    if (contextualData[field.name]) {
      const options = contextualData[field.name];
      return options[index % options.length];
    }

    // Special handling for common field names
    if (field.name === 'sku' || field.name === 'code') {
      return `${field.name.toUpperCase()}-${String(index + 1).padStart(4, '0')}`;
    }

    if (field.name === 'name' || field.name === 'title') {
      return `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} ${index + 1}`;
    }

    return `${field.name} ${index + 1}`;
  }

  private static generateNumberValue(
    field: FieldDefinition, 
    index: number, 
    totalCount: number
  ): number {
    if (field.range) {
      // Use deterministic distribution across the range
      const range = field.range.max - field.range.min;
      const step = range / totalCount;
      return Math.round(field.range.min + (step * index));
    }
    
    // Default numeric progression
    return (index + 1) * 10;
  }

  private static generateCurrencyValue(
    field: FieldDefinition, 
    index: number, 
    totalCount: number
  ): number {
    if (field.range) {
      const range = field.range.max - field.range.min;
      const step = range / totalCount;
      const baseValue = field.range.min + (step * index);
      
      // Round to nearest dollar for currency
      return Math.round(baseValue);
    }
    
    // Default currency values (in cents, converted to dollars)
    const baseAmounts = [999, 1999, 4999, 9999, 19999, 49999];
    return baseAmounts[index % baseAmounts.length] / 100;
  }

  private static generatePercentageValue(
    field: FieldDefinition, 
    index: number, 
    totalCount: number
  ): number {
    if (field.range) {
      const range = field.range.max - field.range.min;
      const step = range / totalCount;
      const value = field.range.min + (step * index);
      
      // Round to 1 decimal place for percentages
      return Math.round(value * 10) / 10;
    }
    
    // Default percentage distribution
    return Math.round(((index + 1) / totalCount) * 100 * 10) / 10;
  }

  private static generateDateValue(
    field: FieldDefinition, 
    index: number, 
    totalCount: number
  ): string {
    // Use schema-defined date range if available
    const startDate = new Date('2024-01-01');
    const endDate = new Date('2024-12-31');
    
    const diffTime = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const dayStep = daysDiff / totalCount;
    const targetDay = Math.floor(dayStep * index);
    
    const date = new Date(startDate.getTime() + targetDay * 24 * 60 * 60 * 1000);
    
    if (field.format === 'datetime') {
      return date.toISOString();
    }
    
    return date.toISOString().split('T')[0]; // YYYY-MM-DD format
  }

  private static generateStatusValue(
    field: FieldDefinition, 
    index: number, 
    contextualData: Record<string, string[]>
  ): string {
    // Use contextual status values if available
    if (contextualData['status']) {
      const statuses = contextualData['status'];
      return statuses[index % statuses.length];
    }
    
    // Default status progression
    const defaultStatuses = ['active', 'pending', 'completed', 'inactive'];
    return defaultStatuses[index % defaultStatuses.length];
  }

  private static generateEmailValue(
    field: FieldDefinition, 
    index: number, 
    contextualData: Record<string, string[]>
  ): string {
    // Use contextual email values if available
    if (contextualData['email']) {
      const emails = contextualData['email'];
      return emails[index % emails.length];
    }
    
    // Generate email based on name context if available
    if (contextualData['name']) {
      const names = contextualData['name'];
      const name = names[index % names.length];
      const emailName = name.toLowerCase().replace(/\s+/g, '.');
      return `${emailName}@company.com`;
    }
    
    return `user${index + 1}@company.com`;
  }

  private static generateUrlValue(field: FieldDefinition, index: number): string {
    const domains = ['example.com', 'company.com', 'service.io', 'platform.co'];
    const paths = ['dashboard', 'analytics', 'reports', 'admin', 'api', 'docs'];
    
    const domain = domains[index % domains.length];
    const path = paths[index % paths.length];
    
    return `https://${domain}/${path}/${index + 1}`;
  }

  private static generateBooleanValue(field: FieldDefinition, index: number): boolean {
    // Alternating boolean values with some randomization
    return (index % 3) !== 0; // ~67% true, ~33% false
  }

  /**
   * Validate generated data against schema
   */
  static validateGeneratedData(
    data: Record<string, unknown>[], 
    section: DashboardSection
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    const config = section.dataConfig;

    if (!data || data.length === 0) {
      errors.push('No data generated');
      return { isValid: false, errors };
    }

    // Validate each required field is present
    config.fields.forEach(field => {
      if (field.required) {
        const hasField = data.every(item => item[field.name] !== undefined && item[field.name] !== null);
        if (!hasField) {
          errors.push(`Required field '${field.name}' is missing in some records`);
        }
      }
    });

    // Validate data count matches configuration
    if (data.length !== config.count) {
      errors.push(`Expected ${config.count} records, but generated ${data.length}`);
    }

    // Validate numeric ranges
    config.fields.forEach(field => {
      if (field.type === 'number' && field.range) {
        data.forEach((item, index) => {
          const value = item[field.name];
          if (typeof value === 'number') {
            if (value < field.range!.min || value > field.range!.max) {
              errors.push(`Field '${field.name}' value ${value} at index ${index} is outside valid range [${field.range!.min}, ${field.range!.max}]`);
            }
          }
        });
      }
    });

    return { isValid: errors.length === 0, errors };
  }

  /**
   * Get suggested values for a field based on type and context
   */
  static getFieldSuggestions(fieldType: string, fieldName: string, context?: string): string[] {
    // Use schema-defined suggestions where available
    const suggestions = FieldSuggestionSchemas;
    
    switch (fieldType) {
      case 'string':
        if (fieldName.includes('industry') || fieldName.includes('category')) {
          return suggestions.industries._def.defaultValue() as string[];
        }
        if (fieldName.includes('technology') || fieldName.includes('tech') || fieldName.includes('stack')) {
          return suggestions.technologies._def.defaultValue() as string[];
        }
        if (fieldName.includes('function') || fieldName.includes('department')) {
          return suggestions.businessFunctions._def.defaultValue() as string[];
        }
        break;
        
      case 'status':
        return suggestions.statusValues._def.defaultValue() as string[];
        
      default:
        return [];
    }
    
    return [];
  }
}
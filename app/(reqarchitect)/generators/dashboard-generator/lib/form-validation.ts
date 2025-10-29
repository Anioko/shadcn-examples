import React, { useState, useCallback, useEffect } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  DashboardFormSchema, 
  DashboardSchema, 
  DashboardFormData, 
  DashboardConfig,
  FieldSuggestionSchemas 
} from '../lib/schemas';
import { SchemaDataGenerator } from '../lib/data-generator';

// Form step definitions
export enum FormStep {
  BasicInfo = 0,
  Sections = 1,
  Filters = 2,
  Theme = 3,
  Settings = 4,
  Preview = 5
}

export const FORM_STEPS = [
  { key: FormStep.BasicInfo, label: 'Basic Info', description: 'Dashboard title and layout' },
  { key: FormStep.Sections, label: 'Sections', description: 'Add dashboard sections and data sources' },
  { key: FormStep.Filters, label: 'Filters', description: 'Configure dashboard filters' },
  { key: FormStep.Theme, label: 'Theme', description: 'Customize colors and styling' },
  { key: FormStep.Settings, label: 'Settings', description: 'Advanced configuration' },
  { key: FormStep.Preview, label: 'Preview', description: 'Review and generate' }
];

// Hook for dashboard form management
export function useDashboardForm() {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.BasicInfo);
  const [isValidating, setIsValidating] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Initialize form with react-hook-form and Zod validation
  const form = useForm<DashboardFormData>({
    resolver: zodResolver(DashboardFormSchema),
    mode: 'onChange', // Real-time validation
    defaultValues: {
      basicInfo: {
        id: '',
        title: '',
        description: '',
        layout: 'grid'
      },
      sections: [],
      filters: [],
      theme: {
        primaryColor: '#3b82f6',
        accentColor: '#10b981',
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        borderRadius: 8
      },
      settings: {
        autoRefresh: false,
        exportEnabled: true,
        refreshInterval: 0
      }
    }
  });

  // Validate current step
  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    setIsValidating(true);
    setValidationErrors([]);

    try {
      const formData = form.getValues();
      
      switch (currentStep) {
        case FormStep.BasicInfo:
          await DashboardFormSchema.pick({ basicInfo: true }).parseAsync({ basicInfo: formData.basicInfo });
          break;
          
        case FormStep.Sections:
          if (formData.sections.length === 0) {
            setValidationErrors(['At least one section is required']);
            return false;
          }
          await DashboardFormSchema.pick({ sections: true }).parseAsync({ sections: formData.sections });
          break;
          
        case FormStep.Filters:
          if (formData.filters && formData.filters.length > 0) {
            await DashboardFormSchema.pick({ filters: true }).parseAsync({ filters: formData.filters });
          }
          break;
          
        case FormStep.Theme:
          if (formData.theme) {
            await DashboardFormSchema.pick({ theme: true }).parseAsync({ theme: formData.theme });
          }
          break;
          
        case FormStep.Settings:
          await DashboardFormSchema.pick({ settings: true }).parseAsync({ settings: formData.settings });
          break;
          
        case FormStep.Preview:
          // Full form validation
          const completeData: DashboardConfig = {
            id: formData.basicInfo.id,
            title: formData.basicInfo.title,
            description: formData.basicInfo.description,
            layout: formData.basicInfo.layout,
            sections: formData.sections,
            filters: formData.filters,
            theme: formData.theme,
            autoRefresh: formData.settings.autoRefresh,
            exportEnabled: formData.settings.exportEnabled,
            refreshInterval: formData.settings.refreshInterval,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          
          await DashboardSchema.parseAsync(completeData);
          break;
      }
      
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
        setValidationErrors(errors);
      } else {
        setValidationErrors(['Validation failed']);
      }
      return false;
    } finally {
      setIsValidating(false);
    }
  }, [currentStep, form]);

  // Navigate between steps
  const goToStep = useCallback(async (step: FormStep): Promise<boolean> => {
    if (step < currentStep || await validateCurrentStep()) {
      setCurrentStep(step);
      return true;
    }
    return false;
  }, [currentStep, validateCurrentStep]);

  const nextStep = useCallback(async (): Promise<boolean> => {
    if (currentStep < FormStep.Preview) {
      return await goToStep(currentStep + 1);
    }
    return false;
  }, [currentStep, goToStep]);

  const prevStep = useCallback((): boolean => {
    if (currentStep > FormStep.BasicInfo) {
      setCurrentStep(currentStep - 1);
      return true;
    }
    return false;
  }, [currentStep]);

  // Generate final dashboard configuration
  const generateDashboardConfig = useCallback((): DashboardConfig | null => {
    try {
      const formData = form.getValues();
      
      const config: DashboardConfig = {
        id: formData.basicInfo.id,
        title: formData.basicInfo.title,
        description: formData.basicInfo.description,
        layout: formData.basicInfo.layout,
        sections: formData.sections,
        filters: formData.filters || [],
        theme: formData.theme,
        autoRefresh: formData.settings.autoRefresh,
        exportEnabled: formData.settings.exportEnabled,
        refreshInterval: formData.settings.refreshInterval,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Validate the complete configuration
      return DashboardSchema.parse(config);
    } catch (error) {
      console.error('Failed to generate dashboard config:', error);
      return null;
    }
  }, [form]);

  // Import schema from JSON
  const importSchema = useCallback((jsonSchema: string): boolean => {
    try {
      const parsed = JSON.parse(jsonSchema);
      const validated = DashboardSchema.parse(parsed);
      
      // Update form with imported data
      form.reset({
        basicInfo: {
          id: validated.id,
          title: validated.title,
          description: validated.description,
          layout: validated.layout
        },
        sections: validated.sections,
        filters: validated.filters || [],
        theme: validated.theme,
        settings: {
          autoRefresh: validated.autoRefresh || false,
          exportEnabled: validated.exportEnabled || true,
          refreshInterval: validated.refreshInterval || 0
        }
      });
      
      return true;
    } catch (error) {
      console.error('Failed to import schema:', error);
      return false;
    }
  }, [form]);

  // Export schema to JSON
  const exportSchema = useCallback((): string | null => {
    const config = generateDashboardConfig();
    if (config) {
      return JSON.stringify(config, null, 2);
    }
    return null;
  }, [generateDashboardConfig]);

  return {
    form,
    currentStep,
    isValidating,
    validationErrors,
    goToStep,
    nextStep,
    prevStep,
    validateCurrentStep,
    generateDashboardConfig,
    importSchema,
    exportSchema
  };
}

// Field suggestion hooks
export function useFieldSuggestions() {
  return {
    industries: FieldSuggestionSchemas.industries._def.defaultValue() as string[],
    technologies: FieldSuggestionSchemas.technologies._def.defaultValue() as string[],
    businessFunctions: FieldSuggestionSchemas.businessFunctions._def.defaultValue() as string[],
    chartTypes: FieldSuggestionSchemas.chartTypes._def.defaultValue() as string[],
    dataSources: FieldSuggestionSchemas.dataSources._def.defaultValue() as string[],
    statusValues: FieldSuggestionSchemas.statusValues._def.defaultValue() as string[],
    layoutTypes: FieldSuggestionSchemas.layoutTypes._def.defaultValue() as string[]
  };
}

// Schema validation utilities
export const ValidationUtils = {
  /**
   * Validate a partial dashboard configuration
   */
  validatePartial: async (data: Partial<DashboardConfig>): Promise<{ isValid: boolean; errors: string[] }> => {
    try {
      // Create a partial schema for validation
      const PartialSchema = DashboardFormSchema.partial();
      await PartialSchema.parseAsync(data);
      return { isValid: true, errors: [] };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
        return { isValid: false, errors };
      }
      return { isValid: false, errors: ['Validation failed'] };
    }
  },

  /**
   * Validate field name format
   */
  validateFieldName: (name: string): boolean => {
    return /^[a-zA-Z][a-zA-Z0-9_]*$/.test(name);
  },

  /**
   * Validate section ID format
   */
  validateSectionId: (id: string): boolean => {
    return /^[a-zA-Z][a-zA-Z0-9-_]*$/.test(id);
  },

  /**
   * Validate color format
   */
  validateColor: (color: string): boolean => {
    return /^#[0-9A-Fa-f]{6}$/.test(color) || /^[a-zA-Z]+$/.test(color);
  },

  /**
   * Generate suggested field name from label
   */
  generateFieldName: (label: string): string => {
    return label
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '_')
      .replace(/^[0-9]/, 'field_$&');
  },

  /**
   * Generate suggested section ID from title
   */
  generateSectionId: (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^[0-9]/, 'section-$&');
  }
};

// Real-time validation hook for individual fields
export function useFieldValidation<T>(
  schema: z.ZodSchema<T>,
  value: T,
  debounceMs: number = 300
) {
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const validate = useCallback(async (val: T) => {
    setIsValidating(true);
    try {
      await schema.parseAsync(val);
      setIsValid(true);
      setError(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setIsValid(false);
        setError(err.errors[0]?.message || 'Validation error');
      }
    } finally {
      setIsValidating(false);
    }
  }, [schema]);

  // Debounced validation
  // Trigger validation when value changes with debounce
  React.useEffect(() => {
    if (value !== undefined) {
      const timeoutId = setTimeout(() => {
        validate(value);
      }, debounceMs);

      return () => clearTimeout(timeoutId);
    }
  }, [value, validate, debounceMs]);

  return { isValid, error, isValidating };
}

// Simple debounce utility
function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
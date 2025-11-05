/**
 * Onboarding Data Loader
 * Centralized loader for all onboarding step mock data (frameworks, digital transformation, implementation types)
 */

import frameworksData from './frameworks.json';
import digitalTransformationData from './digital-transformation-templates.json';
import implementationTypesData from './implementation-types.json';

// Type definitions for Frameworks
export interface Framework {
  id: string;
  name: string;
  shortName: string;
  description: string;
  fullDescription: string;
  category: string;
  subcategory: string;
  strategic_domain: string;
  maturityLevel: string;
  industryFocus: string[];
  companySizeFit: string[];
  prerequisites: string[];
  complementaryFrameworks: string[];
  businessValue: string[];
  keyCapabilities: string[];
  implementationComplexity: string;
  estimatedTimeframe: string;
  requiredRoles: string[];
  certifications: string[];
  popularity: number;
}

export interface FrameworkCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

// Type definitions for Digital Transformation Templates
export interface DigitalTransformationTemplate {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  platform: string;
  icon: string;
  category: string;
  phases: string[];
  estimatedDuration: string;
  complexity: string;
  companySizeFit: string[];
  industryFocus: string[];
  strategicBenefits: string[];
  keyFeatures: string[];
  prerequisites: string[];
  integrationPoints: string[];
  successMetrics: string[];
  estimatedCost: string;
  vendors: string[];
  recommendedTeamSize: string;
}

// Type definitions for Implementation Types
export interface ImplementationType {
  id: string;
  icon: string;
  title: string;
  description: string;
  fullDescription: string;
  examples: string[];
  badge: string | null;
  companySizeFit: string[];
  industryFocus: string[];
  typicalUseCase: string;
  advantages: string[];
  challenges: string[];
  keyConsiderations: string[];
  estimatedDuration: string;
  estimatedCost: string;
  requiredExpertise: string[];
  successFactors: string[];
}

// Export raw data
export const allFrameworks: Framework[] = frameworksData.frameworks;
export const frameworkCategories: FrameworkCategory[] = frameworksData.categories;
export const allDigitalTransformationTemplates: DigitalTransformationTemplate[] = digitalTransformationData.templates;
export const allImplementationTypes: ImplementationType[] = implementationTypesData.implementationTypes;

/**
 * FRAMEWORK HELPERS
 */

/**
 * Get frameworks filtered by category
 */
export function getFrameworksByCategory(categoryId: string): Framework[] {
  if (categoryId === 'all') {
    return allFrameworks;
  }
  return allFrameworks.filter(fw => fw.category === categoryId);
}

/**
 * Get frameworks recommended for company size
 */
export function getFrameworksByCompanySize(companySize: string): Framework[] {
  return allFrameworks.filter(fw =>
    fw.companySizeFit.includes(companySize) || fw.companySizeFit.includes('all')
  );
}

/**
 * Get frameworks recommended for industry
 */
export function getFrameworksByIndustry(industry: string): Framework[] {
  return allFrameworks.filter(fw =>
    fw.industryFocus.includes(industry) || fw.industryFocus.includes('all')
  );
}

/**
 * Get recommended frameworks based on organization profile
 */
export function getRecommendedFrameworks(
  companySize?: string,
  industry?: string,
  maturityLevel?: string
): Framework[] {
  let frameworks = allFrameworks;

  // Filter by company size
  if (companySize) {
    frameworks = frameworks.filter(fw =>
      fw.companySizeFit.includes(companySize) || fw.companySizeFit.includes('all')
    );
  }

  // Filter by industry
  if (industry) {
    frameworks = frameworks.filter(fw =>
      fw.industryFocus.includes(industry) || fw.industryFocus.includes('all')
    );
  }

  // Sort by popularity and maturity level match
  return frameworks.sort((a, b) => {
    // Prioritize maturity level match
    if (maturityLevel) {
      const aMatch = a.maturityLevel === maturityLevel ? 1 : 0;
      const bMatch = b.maturityLevel === maturityLevel ? 1 : 0;
      if (aMatch !== bMatch) return bMatch - aMatch;
    }

    // Then sort by popularity
    return b.popularity - a.popularity;
  });
}

/**
 * Get framework by ID
 */
export function getFrameworkById(id: string): Framework | undefined {
  return allFrameworks.find(fw => fw.id === id);
}

/**
 * Get frameworks by maturity level
 */
export function getFrameworksByMaturityLevel(level: string): Framework[] {
  return allFrameworks.filter(fw => fw.maturityLevel === level);
}

/**
 * DIGITAL TRANSFORMATION HELPERS
 */

/**
 * Get digital transformation templates by company size
 */
export function getDTTemplatesByCompanySize(companySize: string): DigitalTransformationTemplate[] {
  return allDigitalTransformationTemplates.filter(template =>
    template.companySizeFit.includes(companySize) || template.companySizeFit.includes('all')
  );
}

/**
 * Get digital transformation templates by industry
 */
export function getDTTemplatesByIndustry(industry: string): DigitalTransformationTemplate[] {
  return allDigitalTransformationTemplates.filter(template =>
    template.industryFocus.includes(industry) || template.industryFocus.includes('all')
  );
}

/**
 * Get recommended digital transformation templates
 */
export function getRecommendedDTTemplates(
  companySize?: string,
  industry?: string
): DigitalTransformationTemplate[] {
  let templates = allDigitalTransformationTemplates;

  // Filter by company size
  if (companySize) {
    templates = templates.filter(template =>
      template.companySizeFit.includes(companySize)
    );
  }

  // Filter by industry
  if (industry) {
    templates = templates.filter(template =>
      template.industryFocus.includes(industry) || template.industryFocus.includes('all')
    );
  }

  return templates;
}

/**
 * Get template by ID
 */
export function getDTTemplateById(id: string): DigitalTransformationTemplate | undefined {
  return allDigitalTransformationTemplates.find(template => template.id === id);
}

/**
 * IMPLEMENTATION TYPE HELPERS
 */

/**
 * Get implementation types recommended for company size
 */
export function getImplementationTypesByCompanySize(companySize: string): ImplementationType[] {
  return allImplementationTypes.filter(type =>
    type.companySizeFit.includes(companySize) || type.companySizeFit.includes('all')
  );
}

/**
 * Get recommended implementation types
 */
export function getRecommendedImplementationTypes(
  companySize?: string,
  industry?: string
): { recommended: ImplementationType[]; others: ImplementationType[] } {
  const selectionGuidance = implementationTypesData.selectionGuidance;

  let recommendedIds: string[] = [];

  // Get recommendations by company size
  if (companySize && selectionGuidance.byCompanySize[companySize as keyof typeof selectionGuidance.byCompanySize]) {
    const sizeGuidance = selectionGuidance.byCompanySize[companySize as keyof typeof selectionGuidance.byCompanySize];
    recommendedIds = [...sizeGuidance.recommended, ...sizeGuidance.consider];
  }

  // Get recommendations by industry (override size recommendations if available)
  if (industry && selectionGuidance.byIndustry[industry as keyof typeof selectionGuidance.byIndustry]) {
    const industryGuidance = selectionGuidance.byIndustry[industry as keyof typeof selectionGuidance.byIndustry];
    recommendedIds = industryGuidance.recommended;
  }

  const recommended = allImplementationTypes.filter(type =>
    recommendedIds.includes(type.id)
  );

  const others = allImplementationTypes.filter(type =>
    !recommendedIds.includes(type.id)
  );

  return { recommended, others };
}

/**
 * Get implementation type by ID
 */
export function getImplementationTypeById(id: string): ImplementationType | undefined {
  return allImplementationTypes.find(type => type.id === id);
}

/**
 * Check if implementation type is recommended for organization
 */
export function isImplementationTypeRecommended(
  typeId: string,
  companySize?: string,
  industry?: string
): boolean {
  const { recommended } = getRecommendedImplementationTypes(companySize, industry);
  return recommended.some(type => type.id === typeId);
}

/**
 * ICON MAPPING HELPERS
 * Map icon names from JSON to actual icon components
 */
export const iconNameMap: Record<string, string> = {
  'Users': 'Users',
  'Building': 'Building',
  'Database': 'Database',
  'Cloud': 'Cloud',
  'Laptop': 'Laptop',
  'ShoppingCart': 'ShoppingCart',
  'Building2': 'Building2',
  'Code2': 'Code2',
  'GitBranch': 'GitBranch',
  'FileText': 'FileText'
};

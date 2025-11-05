/**
 * Organization Data Loader
 * Loads and provides access to organization metadata and compliance standards from JSON files
 */

import complianceData from './compliance-standards.json';
import organizationMetadata from './organization-metadata.json';

// Type definitions
export interface ComplianceStandard {
  id: string;
  name: string;
  fullName: string;
  description: string;
  type: string;
  jurisdiction: string;
  regions: string[];
  industries: string[];
  maturityRequirements: Record<string, number>;
  priority: number;
}

export interface Industry {
  value: string;
  label: string;
  maturityModifiers: Record<string, number>;
}

export interface IndustryCategory {
  category: string;
  items: Industry[];
}

export interface CompanySize {
  value: string;
  label: string;
  range: { min: number; max: number | null };
  maturityModifiers: Record<string, number>;
  recommendedFrameworks: string[];
}

export interface Region {
  value: string;
  label: string;
  countries: string[];
  timezones: string[];
  recommendedCompliance: string[];
}

export interface Sector {
  value: string;
  label: string;
  description: string;
}

export interface GovernanceMaturityLevel {
  value: string;
  label: string;
  description: string;
  level: number;
}

// Export raw data
export const allComplianceStandards: ComplianceStandard[] = complianceData.complianceStandards;
export const industryCategories: IndustryCategory[] = organizationMetadata.industries;
export const companySizes: CompanySize[] = organizationMetadata.companySizes;
export const regions: Region[] = organizationMetadata.regions;
export const sectors: Sector[] = organizationMetadata.sectors;
export const governanceMaturityLevels: GovernanceMaturityLevel[] = organizationMetadata.governanceMaturityLevels;

/**
 * Get compliance standards filtered by region
 */
export function getComplianceStandardsByRegion(regionValue?: string): ComplianceStandard[] {
  if (!regionValue) {
    return allComplianceStandards;
  }

  const region = regions.find(r => r.value === regionValue);
  if (!region) {
    return allComplianceStandards;
  }

  // Get recommended and common standards for this region
  const recommendedIds = region.recommendedCompliance;

  // Separate into recommended and others
  const recommended = allComplianceStandards.filter(std =>
    recommendedIds.includes(std.id)
  );

  const others = allComplianceStandards.filter(std =>
    !recommendedIds.includes(std.id) &&
    (std.regions.includes('all') || std.regions.includes(regionValue))
  );

  // Return recommended first, sorted by priority
  return [
    ...recommended.sort((a, b) => a.priority - b.priority),
    ...others.sort((a, b) => a.priority - b.priority)
  ];
}

/**
 * Get compliance standards filtered by industry
 */
export function getComplianceStandardsByIndustry(industryValue?: string): ComplianceStandard[] {
  if (!industryValue) {
    return allComplianceStandards;
  }

  // Filter standards that are either for all industries or specifically for this industry
  return allComplianceStandards.filter(std =>
    std.industries.includes('all') || std.industries.includes(industryValue)
  ).sort((a, b) => a.priority - b.priority);
}

/**
 * Get compliance standards filtered by both region and industry
 */
export function getRecommendedComplianceStandards(
  regionValue?: string,
  industryValue?: string
): { recommended: ComplianceStandard[]; common: ComplianceStandard[]; other: ComplianceStandard[] } {
  let standards = allComplianceStandards;

  // Get region-specific recommendations
  const region = regionValue ? regions.find(r => r.value === regionValue) : null;
  const regionRecommended = region?.recommendedCompliance || [];

  // Get industry-specific standards
  const industrySpecific = industryValue
    ? complianceData.industrySpecific[industryValue as keyof typeof complianceData.industrySpecific] || []
    : [];

  // Categorize standards
  const recommended = standards.filter(std =>
    regionRecommended.includes(std.id) || industrySpecific.includes(std.id)
  ).sort((a, b) => a.priority - b.priority);

  const recommendedIds = recommended.map(s => s.id);

  // Common standards (international, high priority, not already recommended)
  const common = standards.filter(std =>
    !recommendedIds.includes(std.id) &&
    (std.jurisdiction === 'international' || std.regions.includes('all')) &&
    std.priority <= 2
  ).sort((a, b) => a.priority - b.priority);

  const commonIds = common.map(s => s.id);

  // Other standards
  const other = standards.filter(std =>
    !recommendedIds.includes(std.id) && !commonIds.includes(std.id)
  ).sort((a, b) => a.priority - b.priority);

  return { recommended, common, other };
}

/**
 * Get all industries as a flat list
 */
export function getAllIndustries(): Industry[] {
  return industryCategories.flatMap(category => category.items);
}

/**
 * Get industry by value
 */
export function getIndustryByValue(value: string): Industry | undefined {
  return getAllIndustries().find(ind => ind.value === value);
}

/**
 * Get company size by value
 */
export function getCompanySizeByValue(value: string): CompanySize | undefined {
  return companySizes.find(size => size.value === value);
}

/**
 * Get region by value
 */
export function getRegionByValue(value: string): Region | undefined {
  return regions.find(region => region.value === value);
}

/**
 * Get recommended frameworks for company size
 */
export function getRecommendedFrameworksForSize(sizeValue: string): string[] {
  const size = getCompanySizeByValue(sizeValue);
  return size?.recommendedFrameworks || [];
}

/**
 * Format compliance standards for UI display (grouped)
 */
export function formatComplianceStandardsForUI(
  regionValue?: string,
  industryValue?: string
): Array<{ groupLabel: string; standards: ComplianceStandard[] }> {
  const { recommended, common, other } = getRecommendedComplianceStandards(regionValue, industryValue);

  const groups: Array<{ groupLabel: string; standards: ComplianceStandard[] }> = [];

  if (recommended.length > 0) {
    groups.push({
      groupLabel: 'Recommended for You',
      standards: recommended
    });
  }

  if (common.length > 0) {
    groups.push({
      groupLabel: 'Common Standards',
      standards: common
    });
  }

  if (other.length > 0) {
    groups.push({
      groupLabel: 'Other Standards',
      standards: other
    });
  }

  return groups;
}

/**
 * Get maturity modifiers for organization profile
 */
export function getMaturityModifiers(
  industryValue?: string,
  companySizeValue?: string
): Record<string, number> {
  const modifiers: Record<string, number> = {};

  // Apply industry modifiers
  if (industryValue) {
    const industry = getIndustryByValue(industryValue);
    if (industry) {
      Object.entries(industry.maturityModifiers).forEach(([key, value]) => {
        modifiers[key] = (modifiers[key] || 0) + value;
      });
    }
  }

  // Apply company size modifiers
  if (companySizeValue) {
    const size = getCompanySizeByValue(companySizeValue);
    if (size) {
      Object.entries(size.maturityModifiers).forEach(([key, value]) => {
        modifiers[key] = (modifiers[key] || 0) + value;
      });
    }
  }

  return modifiers;
}

/**
 * Check if compliance standard is recommended for organization
 */
export function isComplianceRecommended(
  standardId: string,
  regionValue?: string,
  industryValue?: string
): boolean {
  const { recommended } = getRecommendedComplianceStandards(regionValue, industryValue);
  return recommended.some(std => std.id === standardId);
}

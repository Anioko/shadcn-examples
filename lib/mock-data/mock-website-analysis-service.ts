import websiteAnalysisSamples from './website-analysis-samples.json';

export interface WebsiteAnalysisResult {
  companyName?: string;
  description?: string;
  industry?: string;
  sector?: string;
  companySize?: string;
  primaryRegion?: string;
  country?: string;
  businessModel?: string;
  complianceRequirements?: string[];
  technologyStack?: string[];
  fundingStage?: string;
  customerBase?: {
    primarySegment?: string;
    averageContractValue?: string;
    customerCount?: string;
  };
  operationalComplexity?: {
    locations?: string;
    shiftOperations?: string;
    seasonalVariations?: boolean;
    regulatoryComplexity?: string;
  };
  implementationUrgency?: string;
  budgetRange?: string;
  governanceMaturity?: string;
  confidence: number;
  sourceUrl: string;
  analysisDate: string;
}

export interface OnboardingData {
  name: string;
  slug: string;
  website: string;
  industry?: string;
  sector?: string;
  companySize?: string;
  primaryRegion?: string;
  complianceRequirements?: string[];
}

/**
 * Analysis stages for progressive loading
 */
export const ANALYSIS_STAGES = [
  { stage: 'Fetching website content...', progress: 20, duration: 400 },
  { stage: 'Analyzing structured data...', progress: 40, duration: 500 },
  { stage: 'Processing content semantics...', progress: 60, duration: 600 },
  { stage: 'Gathering external intelligence...', progress: 80, duration: 500 },
  { stage: 'Generating insights...', progress: 100, duration: 400 }
];

/**
 * Mock Website Analysis Service
 * Simulates the enhanced website analysis service using JSON mock data
 */
class MockWebsiteAnalysisService {
  /**
   * Simulate website analysis with progressive loading
   */
  async analyzeWebsite(
    url: string,
    onProgress?: (stage: string, progress: number) => void
  ): Promise<WebsiteAnalysisResult> {
    // Simulate progressive loading through stages
    for (const { stage, progress, duration } of ANALYSIS_STAGES) {
      if (onProgress) {
        onProgress(stage, progress);
      }
      await this.delay(duration);
    }

    // Find matching sample or use fallback
    const normalizedUrl = url.toLowerCase().trim();
    const sample = websiteAnalysisSamples.samples.find(
      s => normalizedUrl.includes(new URL(s.url).hostname.replace('www.', ''))
    );

    if (sample) {
      return {
        ...sample,
        sourceUrl: url,
        analysisDate: new Date().toISOString()
      };
    }

    // Use fallback analysis with URL
    return {
      ...websiteAnalysisSamples.fallbackAnalysis,
      companyName: this.extractCompanyNameFromUrl(url),
      sourceUrl: url,
      analysisDate: new Date().toISOString()
    };
  }

  /**
   * Map analysis result to onboarding form data
   */
  mapToOnboardingData(analysis: WebsiteAnalysisResult): OnboardingData {
    const companyName = analysis.companyName || 'Company';
    const slug = this.generateSlugFromName(companyName);

    return {
      name: companyName,
      slug: slug,
      website: analysis.sourceUrl,
      industry: analysis.industry,
      sector: analysis.sector,
      companySize: analysis.companySize,
      primaryRegion: analysis.primaryRegion,
      complianceRequirements: analysis.complianceRequirements
    };
  }

  /**
   * Extract company name from URL
   */
  private extractCompanyNameFromUrl(url: string): string {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.replace(/^www\./, '');
      const domain = hostname.split('.')[0];

      // Clean and format the domain name
      return domain
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
    } catch {
      return 'Your Company';
    }
  }

  /**
   * Generate URL-safe slug from company name
   */
  private generateSlugFromName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50)
      || `company-${Date.now().toString().slice(-6)}`;
  }

  /**
   * Delay helper for simulating async operations
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const mockWebsiteAnalysisService = new MockWebsiteAnalysisService();

'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Loader2, CheckCircle2, AlertCircle, Globe } from 'lucide-react';
import { NextButton } from './next-button';
import {
  industryCategories,
  sectors,
  companySizes,
  regions
} from '@/lib/mock-data/organization-data-loader';
import {
  mockWebsiteAnalysisService,
  type WebsiteAnalysisResult
} from '@/lib/mock-data/mock-website-analysis-service';

export type OrganizationStepProps = React.HTMLAttributes<HTMLDivElement> & {
  canNext: boolean;
  loading: boolean;
  isLastStep: boolean;
  handleNext: () => void;
};

function slugify(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9-]/g, '-')
    .toLowerCase()
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

export function OrganizationStep({
  canNext,
  loading,
  isLastStep,
  handleNext,
  className,
  ...other
}: OrganizationStepProps): React.JSX.Element {
  const methods = useFormContext<any>();
  const slug = methods.watch('organizationStep.slug');
  const name = methods.watch('organizationStep.name');

  // Website analyzer state
  const [analyzerUrl, setAnalyzerUrl] = React.useState('');
  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [analysisProgress, setAnalysisProgress] = React.useState(0);
  const [analysisStage, setAnalysisStage] = React.useState('');
  const [analysisResult, setAnalysisResult] = React.useState<WebsiteAnalysisResult | null>(null);
  const [analysisError, setAnalysisError] = React.useState<string | null>(null);

  // Handle website analysis
  const handleAnalyzeWebsite = async () => {
    if (!analyzerUrl.trim()) {
      setAnalysisError('Please enter a valid website URL');
      return;
    }

    // Validate URL format
    try {
      new URL(analyzerUrl);
    } catch {
      setAnalysisError('Please enter a valid website URL (e.g., https://example.com)');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisError(null);
    setAnalysisResult(null);

    try {
      const result = await mockWebsiteAnalysisService.analyzeWebsite(
        analyzerUrl,
        (stage: string, progress: number) => {
          setAnalysisStage(stage);
          setAnalysisProgress(progress);
        }
      );

      setAnalysisResult(result);

      // Auto-populate form fields
      const onboardingData = mockWebsiteAnalysisService.mapToOnboardingData(result);
      methods.setValue('organizationStep.name', onboardingData.name);
      methods.setValue('organizationStep.slug', onboardingData.slug);
      methods.setValue('organizationStep.website', onboardingData.website);
      if (onboardingData.industry) {
        methods.setValue('organizationStep.industry', onboardingData.industry);
      }
      if (onboardingData.sector) {
        methods.setValue('organizationStep.sector', onboardingData.sector);
      }
      if (onboardingData.companySize) {
        methods.setValue('organizationStep.companySize', onboardingData.companySize);
      }
      if (onboardingData.primaryRegion) {
        methods.setValue('organizationStep.primaryRegion', onboardingData.primaryRegion);
      }
      if (onboardingData.complianceRequirements) {
        methods.setValue('organizationStep.complianceRequirements', onboardingData.complianceRequirements);
      }

    } catch (error) {
      setAnalysisError(error instanceof Error ? error.message : 'Failed to analyze website');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div
      className={cn('flex w-full flex-col gap-6', className)}
      {...other}
    >
      {/* Website Analyzer Section */}
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-purple-900 flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Website Analyzer
          </CardTitle>
          <CardDescription className="text-purple-700">
            Let AI analyze your company website to automatically fill in organization details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* URL Input and Analyze Button */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="url"
                placeholder="https://your-company.com"
                value={analyzerUrl}
                onChange={(e) => {
                  setAnalyzerUrl(e.target.value);
                  setAnalysisError(null);
                }}
                disabled={isAnalyzing || loading}
                className="h-11 pl-10"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAnalyzeWebsite();
                  }
                }}
              />
            </div>
            <Button
              onClick={handleAnalyzeWebsite}
              disabled={isAnalyzing || loading || !analyzerUrl.trim()}
              className="h-11 px-6 bg-purple-600 hover:bg-purple-700"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze
                </>
              )}
            </Button>
          </div>

          {/* Error Display */}
          {analysisError && (
            <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{analysisError}</span>
            </div>
          )}

          {/* Progressive Loading */}
          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-700 font-medium">{analysisStage}</span>
                <span className="text-purple-600">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>
          )}

          {/* Analysis Results */}
          {analysisResult && !isAnalyzing && (
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-green-900 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Analysis Complete
                  </CardTitle>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                    {analysisResult.confidence}% Confidence
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Company Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="text-xs text-green-700 font-semibold mb-1">Company Name</div>
                    <div className="text-green-900">{analysisResult.companyName}</div>
                  </div>
                  <div>
                    <div className="text-xs text-green-700 font-semibold mb-1">Industry</div>
                    <div className="text-green-900 capitalize">{analysisResult.industry?.replace(/-/g, ' ')}</div>
                  </div>
                  <div>
                    <div className="text-xs text-green-700 font-semibold mb-1">Company Size</div>
                    <div className="text-green-900 capitalize">{analysisResult.companySize}</div>
                  </div>
                  <div>
                    <div className="text-xs text-green-700 font-semibold mb-1">Region</div>
                    <div className="text-green-900 capitalize">{analysisResult.primaryRegion?.replace(/-/g, ' ')}</div>
                  </div>
                </div>

                {/* Technology Stack */}
                {analysisResult.technologyStack && analysisResult.technologyStack.length > 0 && (
                  <div>
                    <div className="text-xs text-green-700 font-semibold mb-2">Technology Stack</div>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisResult.technologyStack.slice(0, 6).map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-green-100 text-green-800 border-green-300 text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {analysisResult.technologyStack.length > 6 && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-300 text-xs">
                          +{analysisResult.technologyStack.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Compliance Requirements */}
                {analysisResult.complianceRequirements && analysisResult.complianceRequirements.length > 0 && (
                  <div>
                    <div className="text-xs text-green-700 font-semibold mb-2">Detected Compliance Requirements</div>
                    <div className="flex flex-wrap gap-1.5">
                      {analysisResult.complianceRequirements.slice(0, 5).map((req) => (
                        <Badge key={req} variant="outline" className="bg-white text-green-800 border-green-300 text-xs uppercase">
                          {req}
                        </Badge>
                      ))}
                      {analysisResult.complianceRequirements.length > 5 && (
                        <Badge variant="outline" className="bg-white text-green-800 border-green-300 text-xs">
                          +{analysisResult.complianceRequirements.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <div className="text-xs text-green-700 pt-2 border-t border-green-200">
                  Form fields have been automatically populated. You can edit them below.
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Basic Information Section */}
      <div className="space-y-6 rounded-xl border border-border/50 bg-card/30 p-8 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Basic Information</h3>
          <p className="text-sm text-muted-foreground">
            Essential details about your organization
          </p>
        </div>

        {/* Name Field */}
        <FormField
          control={methods.control}
          name="organizationStep.name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col space-y-3">
              <FormLabel className="text-base font-medium">Organization Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  maxLength={64}
                  disabled={loading}
                  className="h-11"
                  placeholder="Your organization name"
                  {...field}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const currentSlug = methods.getValues('organizationStep.slug');
                    if (e.target.value && (currentSlug === '' || currentSlug === slugify(field.value ?? ''))) {
                      methods.setValue(
                        'organizationStep.slug',
                        slugify(e.target.value)
                      );
                    }
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 2-Column Layout for Slug and Website */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Slug Field */}
          <FormField
            control={methods.control}
            name="organizationStep.slug"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col space-y-3">
                <FormLabel className="text-base font-medium">Slug</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    maxLength={255}
                    disabled={loading}
                    className="h-11"
                    placeholder="your-organization-slug"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="break-all text-xs">
                  https://example.com/org/{slug || 'your-slug'}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Website URL */}
          <FormField
            control={methods.control}
            name="organizationStep.website"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col space-y-3">
                <FormLabel className="text-base font-medium">Website URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://your-company.com"
                    maxLength={2000}
                    disabled={loading}
                    className="h-11"
                    {...field}
                    value={field.value || ''}
                  />
                </FormControl>
                <FormDescription className="text-xs">
                  For intelligent framework recommendations
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Organization Context Section */}
      <div className="space-y-6 rounded-xl border border-border/50 bg-card/30 p-8 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Organization Context</h3>
          <p className="text-sm text-muted-foreground">
            Help us understand your organization better
          </p>
        </div>

        {/* Industry */}
        <FormField
          control={methods.control}
          name="organizationStep.industry"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium">Industry</FormLabel>
              <Select onValueChange={field.onChange} value={field.value || ""} disabled={loading}>
                <FormControl>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select your industry (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px]">
                  {industryCategories.map((category, idx) => (
                    <React.Fragment key={category.category}>
                      {idx > 0 && <div className="border-t my-2" />}
                      <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                        {category.category}
                      </div>
                      {category.items.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value}>
                          {industry.label}
                        </SelectItem>
                      ))}
                    </React.Fragment>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* 2-Column Layout for Sector, Company Size, Region */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <FormField
            control={methods.control}
            name="organizationStep.sector"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Sector</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""} disabled={loading}>
                  <FormControl>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select sector (optional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sectors.map((sector) => (
                      <SelectItem key={sector.value} value={sector.value}>
                        {sector.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="organizationStep.companySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Company Size</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""} disabled={loading}>
                  <FormControl>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select size (optional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {companySizes.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="organizationStep.primaryRegion"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Primary Region</FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""} disabled={loading}>
                  <FormControl>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select region (optional)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {regions.map((region) => (
                      <SelectItem key={region.value} value={region.value}>
                        {region.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">
                  Determines compliance recommendations
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <NextButton
        loading={loading}
        disabled={loading}
        isLastStep={isLastStep}
        onClick={handleNext}
      />
    </div>
  );
}

'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { NextButton } from './next-button';
import {
  industryCategories,
  sectors,
  companySizes,
  regions,
  governanceMaturityLevels,
  formatComplianceStandardsForUI,
  isComplianceRecommended
} from '@/lib/mock-data/organization-data-loader';

export type OrganizationContextStepProps = React.HTMLAttributes<HTMLDivElement> & {
  canNext: boolean;
  loading: boolean;
  isLastStep: boolean;
  handleNext: () => void;
  handleBack: () => void;
};

export function OrganizationContextStep({
  canNext,
  loading,
  isLastStep,
  handleNext,
  handleBack,
  className,
  ...other
}: OrganizationContextStepProps): React.JSX.Element {
  const methods = useFormContext<any>();

  // Watch for changes in region and industry to dynamically filter compliance standards
  const selectedRegion = methods.watch('organizationStep.primaryRegion');
  const selectedIndustry = methods.watch('organizationStep.industry');

  // Get filtered compliance standards based on region and industry
  const complianceGroups = React.useMemo(() => {
    return formatComplianceStandardsForUI(selectedRegion, selectedIndustry);
  }, [selectedRegion, selectedIndustry]);

  return (
    <div
      className={cn('flex w-full flex-col gap-6', className)}
      {...other}
    >
      {/* Organization Context Section */}
      <div className="space-y-8 rounded-xl border border-border/50 bg-card/30 p-8 shadow-sm">
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

        {/* Sector, Company Size, Primary Region */}
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
                  Automatically recommends relevant compliance standards
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Compliance Requirements */}
        <FormField
          control={methods.control}
          name="organizationStep.complianceRequirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Compliance Requirements (Optional)</FormLabel>
              <FormDescription>
                Select any compliance standards you currently follow or need to implement.
                {(selectedRegion || selectedIndustry) && (
                  <span className="block mt-1 text-primary font-medium">
                    <Sparkles className="inline h-3 w-3 mr-1" />
                    Showing recommendations for your {selectedRegion ? 'region' : ''}{selectedRegion && selectedIndustry ? ' and ' : ''}{selectedIndustry ? 'industry' : ''}
                  </span>
                )}
              </FormDescription>
              <div className="space-y-6 mt-4">
                {complianceGroups.map((group) => (
                  <div key={group.groupLabel}>
                    <div className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                      {group.groupLabel === 'Recommended for You' && (
                        <Sparkles className="h-4 w-4 text-primary" />
                      )}
                      {group.groupLabel}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {group.standards.map((standard) => {
                        const isChecked = field.value?.includes(standard.id);
                        const isRecommended = isComplianceRecommended(standard.id, selectedRegion, selectedIndustry);

                        return (
                          <div
                            key={standard.id}
                            className={cn(
                              "flex flex-col p-3 rounded-lg border transition-colors",
                              isChecked
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/50",
                              isRecommended && !isChecked && "border-primary/30 bg-primary/5"
                            )}
                          >
                            <div className="flex items-start space-x-3">
                              <FormControl>
                                <Checkbox
                                  id={`compliance-${standard.id}`}
                                  checked={isChecked}
                                  onCheckedChange={(checked: boolean) => {
                                    if (checked) {
                                      field.onChange([...(field.value || []), standard.id]);
                                    } else {
                                      field.onChange(
                                        field.value?.filter(
                                          (value: string) => value !== standard.id
                                        )
                                      );
                                    }
                                  }}
                                />
                              </FormControl>
                              <div className="flex-1 min-w-0">
                                <FormLabel
                                  htmlFor={`compliance-${standard.id}`}
                                  className="text-sm font-medium cursor-pointer flex items-center gap-1"
                                >
                                  {standard.name}
                                  {isRecommended && (
                                    <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                                      Recommended
                                    </span>
                                  )}
                                </FormLabel>
                                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                                  {standard.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Governance Maturity */}
        <FormField
          control={methods.control}
          name="organizationStep.governanceMaturity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Governance Maturity</FormLabel>
              <FormDescription>
                This helps us determine the right starting point and complexity level (optional)
              </FormDescription>
              <Select onValueChange={field.onChange} value={field.value || ""} disabled={loading}>
                <FormControl>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select your current governance maturity level (optional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {governanceMaturityLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Seed Models Toggle */}
      <FormField
        control={methods.control}
        name="organizationStep.seedModelsForSpeed"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-xl border border-blue-200/60 bg-gradient-to-r from-blue-50/70 to-indigo-50/50 p-6 shadow-sm">
            <div className="space-y-2 flex-1 pr-6">
              <FormLabel className="text-base">Seed Models For Speed (Recommended)</FormLabel>
              <FormDescription>
                Pre-populate your workspace with industry-specific frameworks, reference models,
                templates, and best practices to accelerate your onboarding.
              </FormDescription>
              <div className="text-xs text-muted-foreground flex flex-wrap gap-x-4 gap-y-1 pt-2">
                <span>✓ Industry-specific templates</span>
                <span>✓ Compliance frameworks</span>
                <span>✓ Reference models</span>
                <span>✓ Best practices</span>
              </div>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={loading}
                className="scale-110"
              />
            </FormControl>
          </FormItem>
        )}
      />

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={loading}
          size="lg"
        >
          <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
          Back
        </Button>
        <NextButton
          loading={loading}
          disabled={loading}
          isLastStep={isLastStep}
          onClick={handleNext}
        />
      </div>
    </div>
  );
}

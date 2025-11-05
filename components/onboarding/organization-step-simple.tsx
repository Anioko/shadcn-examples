'use client';

import * as React from 'react';
import { UploadIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { NextButton } from './next-button';

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

export function OrganizationStepSimple({
  canNext,
  loading,
  isLastStep,
  handleNext,
  className,
  ...other
}: OrganizationStepProps): React.JSX.Element {
  const methods = useFormContext();
  const slug = methods.watch('organizationStep.slug');

  return (
    <div
      className={cn('flex w-full flex-col gap-6', className)}
      {...other}
    >
      {/* Progress Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Add Your Organization</h2>
        <p className="text-sm text-muted-foreground">
          Tell us about your organization so we can provide tailored recommendations.
        </p>
      </div>

      {/* Logo Upload Placeholder */}
      <div className="space-y-2">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="flex size-[72px] items-center justify-center rounded-md border-2 border-dashed border-border">
              <UploadIcon className="size-5 shrink-0 text-muted-foreground" />
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <Button type="button" variant="outline" size="sm">
              Upload logo
            </Button>
            <span className="text-xs text-muted-foreground">
              *.png, *.jpeg files up to 5 MB
            </span>
          </div>
        </div>
      </div>

      {/* Name Field */}
      <FormField
        control={methods.control}
        name="organizationStep.name"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col space-y-3">
            <FormLabel className="text-base font-medium">Name</FormLabel>
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
            <FormDescription className="break-all">
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
            <FormDescription>
              We'll analyze your website to provide intelligent framework recommendations
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Organization Context Section */}
      <div className="space-y-8 rounded-xl border border-border/50 bg-card/30 p-8 shadow-sm">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold tracking-tight">Organization Context</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Help us recommend the right frameworks and compliance requirements
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
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">Technology & Software</div>
                  <SelectItem value="software-development">Software Development</SelectItem>
                  <SelectItem value="saas-platforms">SaaS Platforms</SelectItem>
                  <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                  <SelectItem value="fintech">FinTech</SelectItem>

                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-t mt-2 pt-3">Financial Services</div>
                  <SelectItem value="banking-traditional">Traditional Banking</SelectItem>
                  <SelectItem value="investment-management">Investment Management</SelectItem>
                  <SelectItem value="insurance">Insurance</SelectItem>

                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-t mt-2 pt-3">Healthcare</div>
                  <SelectItem value="hospitals-health-systems">Hospitals & Health Systems</SelectItem>
                  <SelectItem value="pharmaceutical">Pharmaceutical</SelectItem>
                  <SelectItem value="biotechnology">Biotechnology</SelectItem>

                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground border-t mt-2 pt-3">Other</div>
                  <SelectItem value="other">Other Industry</SelectItem>
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
                    <SelectItem value="private">Private</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="nonprofit">Non-profit</SelectItem>
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
                    <SelectItem value="startup">Startup (1-10)</SelectItem>
                    <SelectItem value="small">Small (11-50)</SelectItem>
                    <SelectItem value="medium">Medium (51-200)</SelectItem>
                    <SelectItem value="large">Large (201-1000)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (1000+)</SelectItem>
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
                    <SelectItem value="north-america">North America</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
                    <SelectItem value="latin-america">Latin America</SelectItem>
                    <SelectItem value="africa">Africa</SelectItem>
                    <SelectItem value="middle-east">Middle East</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-xs">
                  Helps determine compliance requirements
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
              </FormDescription>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
                {[
                  { value: 'soc2', label: 'SOC 2' },
                  { value: 'iso27001', label: 'ISO 27001' },
                  { value: 'gdpr', label: 'GDPR' },
                  { value: 'hipaa', label: 'HIPAA' },
                  { value: 'pci-dss', label: 'PCI DSS' },
                  { value: 'nist', label: 'NIST CSF' },
                  { value: 'cobit', label: 'COBIT' },
                  { value: 'other', label: 'Other' }
                ].map((item) => {
                  const isChecked = field.value?.includes(item.value);

                  return (
                    <div key={item.value} className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          id={`compliance-${item.value}`}
                          checked={isChecked}
                          onCheckedChange={(checked: boolean) => {
                            if (checked) {
                              field.onChange([...(field.value || []), item.value]);
                            } else {
                              field.onChange(
                                field.value?.filter(
                                  (value: string) => value !== item.value
                                )
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor={`compliance-${item.value}`}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {item.label}
                      </FormLabel>
                    </div>
                  );
                })}
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
                  <SelectItem value="none">None - No formal governance processes</SelectItem>
                  <SelectItem value="ad-hoc">Ad-hoc - Informal processes, reactive approach</SelectItem>
                  <SelectItem value="developing">Developing - Some documented processes</SelectItem>
                  <SelectItem value="managed">Managed - Well-defined, consistently applied</SelectItem>
                  <SelectItem value="optimized">Optimized - Continuous improvement culture</SelectItem>
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

      <NextButton
        loading={loading}
        disabled={loading}
        isLastStep={isLastStep}
        onClick={handleNext}
      />
    </div>
  );
}

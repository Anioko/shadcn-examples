'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ArrowRight,
  Sparkles,
  Search,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Info,
  Filter,
  X
} from 'lucide-react';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { NextButton } from './next-button';
import {
  governanceMaturityLevels,
  formatComplianceStandardsForUI,
  isComplianceRecommended,
  allComplianceStandards
} from '@/lib/mock-data/organization-data-loader';

export type ComplianceMaturityStepProps = React.HTMLAttributes<HTMLDivElement> & {
  canNext: boolean;
  loading: boolean;
  isLastStep: boolean;
  handleNext: () => void;
  handleBack: () => void;
};

const maturityLevelOptions = [
  { value: 'none', label: 'Not Implemented', description: 'No current implementation' },
  { value: 'planning', label: 'Planning', description: 'Currently planning implementation' },
  { value: 'partial', label: 'Partially Implemented', description: 'Some requirements met' },
  { value: 'substantial', label: 'Substantially Implemented', description: 'Most requirements met' },
  { value: 'full', label: 'Fully Implemented', description: 'All requirements met and maintained' },
];

export function ComplianceMaturityStep({
  canNext,
  loading,
  isLastStep,
  handleNext,
  handleBack,
  className,
  ...other
}: ComplianceMaturityStepProps): React.JSX.Element {
  const methods = useFormContext<any>();

  // Local state
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showAllGroups, setShowAllGroups] = React.useState(false);
  const [expandedSections, setExpandedSections] = React.useState<string[]>(['recommended']);

  // Watch for changes in region and industry to dynamically filter compliance standards
  const selectedRegion = methods.watch('organizationStep.primaryRegion');
  const selectedIndustry = methods.watch('organizationStep.industry');
  const selectedCompliance = methods.watch('organizationStep.complianceRequirements') || [];
  const complianceMaturityLevels = methods.watch('organizationStep.complianceMaturityLevels') || {};

  // Get filtered compliance standards based on region and industry
  const complianceGroups = React.useMemo(() => {
    return formatComplianceStandardsForUI(selectedRegion, selectedIndustry);
  }, [selectedRegion, selectedIndustry]);

  // Filter by search query
  const filteredGroups = React.useMemo(() => {
    if (!searchQuery.trim()) return complianceGroups;

    const query = searchQuery.toLowerCase();
    return complianceGroups
      .map(group => ({
        ...group,
        standards: group.standards.filter(standard =>
          standard.name.toLowerCase().includes(query) ||
          standard.description.toLowerCase().includes(query) ||
          standard.fullName?.toLowerCase().includes(query)
        )
      }))
      .filter(group => group.standards.length > 0);
  }, [complianceGroups, searchQuery]);

  // Determine which groups to show
  const visibleGroups = showAllGroups
    ? filteredGroups
    : filteredGroups.filter(g => g.groupLabel === 'Recommended for You');

  // Count selected standards
  const selectedCount = selectedCompliance.length;
  const selectedWithMaturity = Object.keys(complianceMaturityLevels).length;

  // Handler for compliance selection
  const handleComplianceToggle = (standardId: string, currentValue: string[] = []) => {
    const isSelected = currentValue.includes(standardId);

    if (isSelected) {
      // Remove from selection
      methods.setValue(
        'organizationStep.complianceRequirements',
        currentValue.filter(id => id !== standardId)
      );
      // Remove maturity level
      const updatedMaturityLevels = { ...complianceMaturityLevels };
      delete updatedMaturityLevels[standardId];
      methods.setValue('organizationStep.complianceMaturityLevels', updatedMaturityLevels);
    } else {
      // Add to selection
      methods.setValue(
        'organizationStep.complianceRequirements',
        [...currentValue, standardId]
      );
    }
  };

  // Handler for maturity level change
  const handleMaturityLevelChange = (standardId: string, level: string) => {
    methods.setValue('organizationStep.complianceMaturityLevels', {
      ...complianceMaturityLevels,
      [standardId]: level
    });
  };

  // Quick select all recommended
  const handleSelectRecommended = () => {
    const recommendedGroup = complianceGroups.find(g => g.groupLabel === 'Recommended for You');
    if (recommendedGroup) {
      const recommendedIds = recommendedGroup.standards.map(s => s.id);
      methods.setValue('organizationStep.complianceRequirements', recommendedIds);
    }
  };

  // Clear all selections
  const handleClearAll = () => {
    methods.setValue('organizationStep.complianceRequirements', []);
    methods.setValue('organizationStep.complianceMaturityLevels', {});
  };

  return (
    <div
      className={cn('flex w-full flex-col gap-6', className)}
      {...other}
    >
      {/* Header with Context */}
      {(selectedRegion || selectedIndustry) && (
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-2">
                <Sparkles className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Smart Recommendations Active</h3>
                <p className="text-sm text-gray-600">
                  Showing compliance standards tailored for{' '}
                  {selectedIndustry && <span className="font-medium">{selectedIndustry}</span>}
                  {selectedIndustry && selectedRegion && ' in '}
                  {selectedRegion && <span className="font-medium">{selectedRegion}</span>}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div className="space-y-6 rounded-xl border border-border/50 bg-card/30 p-8 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Compliance Standards & Implementation Status</h3>
          <p className="text-sm text-muted-foreground">
            Select compliance standards and indicate your current implementation level
          </p>
        </div>

        {/* Search and Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search compliance standards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectRecommended}
              className="whitespace-nowrap"
            >
              <Sparkles className="h-3 w-3 mr-1.5" />
              Select Recommended
            </Button>
            {selectedCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearAll}
                className="whitespace-nowrap"
              >
                <X className="h-3 w-3 mr-1.5" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Selection Summary */}
        {selectedCount > 0 && (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-900">
                      {selectedCount} standard{selectedCount !== 1 ? 's' : ''} selected
                    </p>
                    <p className="text-xs text-green-700">
                      {selectedWithMaturity} with implementation status defined
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  {Math.round((selectedWithMaturity / selectedCount) * 100)}% Complete
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Compliance Standards */}
        <FormField
          control={methods.control}
          name="organizationStep.complianceRequirements"
          render={({ field }) => (
            <FormItem>
              <div className="space-y-4">
                {visibleGroups.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No compliance standards found matching your search</p>
                  </div>
                )}

                <Accordion
                  type="multiple"
                  value={expandedSections}
                  onValueChange={setExpandedSections}
                  className="space-y-3"
                >
                  {visibleGroups.map((group) => {
                    const groupSelectedCount = group.standards.filter(s =>
                      field.value?.includes(s.id)
                    ).length;

                    return (
                      <AccordionItem
                        key={group.groupLabel}
                        value={group.groupLabel.toLowerCase().replace(/\s+/g, '-')}
                        className="border rounded-lg bg-card"
                      >
                        <AccordionTrigger className="px-4 py-3 hover:no-underline">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center gap-3">
                              {group.groupLabel === 'Recommended for You' && (
                                <Sparkles className="h-4 w-4 text-primary" />
                              )}
                              <span className="font-semibold text-sm">
                                {group.groupLabel}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {group.standards.length}
                              </Badge>
                            </div>
                            {groupSelectedCount > 0 && (
                              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                                {groupSelectedCount} selected
                              </Badge>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-3 pt-2">
                            {group.standards.map((standard) => {
                              const isSelected = field.value?.includes(standard.id);
                              const isRecommended = isComplianceRecommended(
                                standard.id,
                                selectedRegion,
                                selectedIndustry
                              );
                              const currentMaturityLevel = complianceMaturityLevels[standard.id];

                              return (
                                <Card
                                  key={standard.id}
                                  className={cn(
                                    "transition-all duration-200",
                                    isSelected
                                      ? "border-primary bg-primary/5 shadow-sm"
                                      : "border-border hover:border-primary/50"
                                  )}
                                >
                                  <CardContent className="p-4">
                                    {/* Header Row */}
                                    <div className="flex items-start gap-3 mb-3">
                                      <FormControl>
                                        <Checkbox
                                          id={`compliance-${standard.id}`}
                                          checked={isSelected}
                                          onCheckedChange={(checked: boolean) => {
                                            handleComplianceToggle(standard.id, field.value);
                                          }}
                                          className="mt-1"
                                        />
                                      </FormControl>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                          <FormLabel
                                            htmlFor={`compliance-${standard.id}`}
                                            className="text-sm font-semibold cursor-pointer"
                                          >
                                            {standard.name}
                                          </FormLabel>
                                          {isRecommended && (
                                            <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                                              <Sparkles className="h-3 w-3 mr-1" />
                                              Recommended
                                            </Badge>
                                          )}
                                          {standard.type && (
                                            <Badge variant="outline" className="text-xs">
                                              {standard.type}
                                            </Badge>
                                          )}
                                        </div>
                                        <p className="text-xs text-muted-foreground mb-1">
                                          {standard.fullName || standard.description}
                                        </p>
                                        {standard.fullName && standard.description !== standard.fullName && (
                                          <p className="text-xs text-muted-foreground">
                                            {standard.description}
                                          </p>
                                        )}
                                      </div>
                                    </div>

                                    {/* Implementation Status - Only show when selected */}
                                    {isSelected && (
                                      <div className="pl-7 pt-3 border-t">
                                        <FormLabel className="text-xs font-medium mb-2 block">
                                          Implementation Status
                                        </FormLabel>
                                        <Select
                                          value={currentMaturityLevel || ''}
                                          onValueChange={(value) => handleMaturityLevelChange(standard.id, value)}
                                        >
                                          <SelectTrigger className="h-9 text-xs">
                                            <SelectValue placeholder="Select implementation status..." />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {maturityLevelOptions.map((option) => (
                                              <SelectItem
                                                key={option.value}
                                                value={option.value}
                                                className="text-xs"
                                              >
                                                <div className="flex flex-col">
                                                  <span className="font-medium">{option.label}</span>
                                                  <span className="text-xs text-muted-foreground">
                                                    {option.description}
                                                  </span>
                                                </div>
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    )}
                                  </CardContent>
                                </Card>
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>

                {/* Show More/Less Button */}
                {!searchQuery && complianceGroups.length > 1 && (
                  <div className="flex justify-center pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAllGroups(!showAllGroups)}
                      className="gap-2"
                    >
                      <Filter className="h-4 w-4" />
                      {showAllGroups ? (
                        <>
                          Show Recommended Only
                          <ChevronUp className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Show All Standards ({complianceGroups.reduce((acc, g) => acc + g.standards.length, 0)} total)
                          <ChevronDown className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Governance Maturity */}
        <div className="pt-6 border-t">
          <FormField
            control={methods.control}
            name="organizationStep.governanceMaturity"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Overall Governance Maturity</FormLabel>
                <FormDescription>
                  Assess your organization's current governance maturity level
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
                        <div className="flex flex-col py-1">
                          <span className="font-medium">{level.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {level.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

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

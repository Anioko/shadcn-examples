'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Building2, Code2, GitBranch, FileText, ArrowRight } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormDescription } from '@/components/ui/form';
import { NextButton } from './next-button';
import {
  allImplementationTypes,
  getRecommendedImplementationTypes,
  isImplementationTypeRecommended
} from '@/lib/mock-data/onboarding-data-loader';

// Icon mapping
const iconMap = {
  Building2,
  Code2,
  GitBranch,
  FileText
};

export function ImplementationPlanningStep({ loading, isLastStep, handleNext, handleBack }: any) {
  const methods = useFormContext<any>();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const companySize = methods.watch('organizationStep.companySize');

  const toggleType = (typeId: string) => {
    if (typeId === 'governance-only') {
      setSelectedTypes(['governance-only']);
      return;
    }

    let updated = selectedTypes.filter(t => t !== 'governance-only');

    if (updated.includes(typeId)) {
      updated = updated.filter(t => t !== typeId);
    } else {
      updated.push(typeId);
    }

    setSelectedTypes(updated);
  };

  const handleSelectAll = () => {
    // Select all types except governance-only (since it's mutually exclusive)
    const allTypeIds = allImplementationTypes
      .filter(t => t.id !== 'governance-only')
      .map(t => t.id);
    setSelectedTypes(allTypeIds);
  };

  const handleClearAll = () => {
    setSelectedTypes([]);
  };

  const getRecommended = (optionId: string) => {
    if (optionId === 'custom-development' && companySize === 'startup') return true;
    if (optionId === 'enterprise-platform' && (companySize === 'large' || companySize === 'enterprise')) return true;
    if (optionId === 'system-integrations' && companySize === 'medium') return true;
    return false;
  };

  return (
    <div className="space-y-6">
      <FormField
        control={methods.control}
        name="implementationPlanningStep.implementationTypes"
        render={() => (
          <FormItem>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <FormLabel>What implementation work is planned?</FormLabel>
                <FormDescription>
                  Select all that apply. This determines which setup steps you'll see next.
                </FormDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  disabled={loading}
                  className="text-xs"
                >
                  Select All
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClearAll}
                  disabled={loading}
                  className="text-xs"
                >
                  Clear All
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {allImplementationTypes.map((option) => {
                const Icon = iconMap[option.icon as keyof typeof iconMap] || FileText;
                const isSelected = selectedTypes.includes(option.id);
                const isRecommended = getRecommended(option.id);

                return (
                  <Card
                    key={option.id}
                    className={`transition-all ${
                      isSelected
                        ? 'border-primary ring-2 ring-primary ring-offset-2'
                        : 'hover:border-primary/50'
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                          }`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-base flex items-center gap-2">
                              {option.title}
                              {isRecommended && (
                                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-normal">
                                  Recommended
                                </span>
                              )}
                            </CardTitle>
                          </div>
                        </div>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleType(option.id)}
                        />
                      </div>
                      <CardDescription className="mt-2">
                        {option.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {option.badge && (
                          <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded inline-block">
                            {option.badge}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          <strong>Examples:</strong>
                          <ul className="list-disc list-inside mt-1 space-y-0.5">
                            {option.examples.slice(0, 3).map((example, idx) => (
                              <li key={idx}>{example}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <FormDescription className="mt-4">
              Your selections will help us tailor the onboarding experience and recommend appropriate tools.
            </FormDescription>
          </FormItem>
        )}
      />

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

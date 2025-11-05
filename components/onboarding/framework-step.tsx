'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowRight,
  Loader2,
  Sparkles,
  Filter,
  Info,
  Star,
  Check,
  Target,
  Building2,
  X,
  CheckCircle2
} from 'lucide-react';
import { NextButton } from './next-button';
import { cn } from '@/lib/utils';
import {
  allFrameworks,
  frameworkCategories,
  getFrameworksByCategory,
  getRecommendedFrameworks
} from '@/lib/mock-data/onboarding-data-loader';

export function FrameworkStep({ loading, isLastStep, handleNext, handleBack }: any) {
  const methods = useFormContext<any>();
  const [isSeeding, setIsSeeding] = useState(false);
  const [setupMode, setSetupMode] = useState<'quick' | 'custom'>('custom');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [localSelectedPresets, setLocalSelectedPresets] = useState<string[]>([]);

  const organizationStep = methods.watch('organizationStep');
  const organizationIndustry = organizationStep?.industry;
  const organizationSize = organizationStep?.companySize;
  const organizationCountry = organizationStep?.primaryRegion;

  const handlePresetToggle = (frameworkId: string) => {
    const newPresets = localSelectedPresets.includes(frameworkId)
      ? localSelectedPresets.filter(id => id !== frameworkId)
      : [...localSelectedPresets, frameworkId];
    setLocalSelectedPresets(newPresets);
  };

  const handleProceed = async () => {
    setIsSeeding(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSeeding(false);
    handleNext();
  };

  const getDisplayFrameworks = () => {
    if (selectedCategory === 'all') return allFrameworks;
    return getFrameworksByCategory(selectedCategory);
  };

  const selectedFrameworks = allFrameworks.filter(f => localSelectedPresets.includes(f.id));
  const totalObjectives = selectedFrameworks.length * 3;

  return (
    <div className="space-y-6">
      {/* Organization Context Card */}
      {organizationIndustry && (
        <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 rounded-full p-2">
                <Info className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-2">Organization Context</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-xs uppercase tracking-wide">Industry</span>
                    <span className="font-medium text-gray-900 capitalize">{organizationIndustry}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 text-xs uppercase tracking-wide">Company Size</span>
                    <span className="font-medium text-gray-900 capitalize">{organizationSize}</span>
                  </div>
                  {organizationCountry && (
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs uppercase tracking-wide">Region</span>
                      <span className="font-medium text-gray-900">{organizationCountry}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Setup Mode Selection */}
      <div className="flex justify-center">
        <div className="bg-white rounded-xl border shadow-sm p-1">
          <div className="flex">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                setupMode === 'quick'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setSetupMode('quick')}
            >
              <Sparkles className="h-4 w-4" />
              <span className="font-medium">Intelligent Setup</span>
              <Badge variant="secondary" className={`text-xs ${setupMode === 'quick' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'}`}>
                AI
              </Badge>
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                setupMode === 'custom'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              onClick={() => setSetupMode('custom')}
            >
              <Filter className="h-4 w-4" />
              <span className="font-medium">Custom Selection</span>
            </button>
          </div>
        </div>
      </div>

      {/* Custom Selection */}
      {setupMode === 'custom' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 rounded-full p-2">
                <Filter className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Custom Framework Selection</h3>
                <p className="text-sm text-gray-500">Choose specific frameworks that match your needs</p>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className={selectedCategory === 'all' ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : ''}
              >
                All Categories ({allFrameworks.length})
              </Button>
              {frameworkCategories.map((categoryObj) => (
                <Button
                  key={categoryObj.id}
                  variant={selectedCategory === categoryObj.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(categoryObj.id)}
                  className={selectedCategory === categoryObj.id ? 'bg-gradient-to-r from-purple-600 to-indigo-600' : ''}
                >
                  {categoryObj.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Selection Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">Quick Selection:</span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLocalSelectedPresets(MOCK_FRAMEWORKS.slice(0, 2).map(f => f.id))}
                className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
              >
                <Target className="h-3 w-3 mr-1" />
                Critical Only
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLocalSelectedPresets(getDisplayFrameworks().map(f => f.id))}
                className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
              >
                <Check className="h-3 w-3 mr-1" />
                Select All ({getDisplayFrameworks().length})
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLocalSelectedPresets([])}
                className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
              >
                <X className="h-3 w-3 mr-1" />
                Clear All
              </Button>
            </div>
          </div>

          {/* Framework Cards */}
          <div className="grid gap-6">
            {getDisplayFrameworks().map((framework) => {
              const isSelected = localSelectedPresets.includes(framework.id);

              return (
                <Card
                  key={framework.id}
                  className={`transition-all duration-300 hover:shadow-lg relative ${
                    isSelected
                      ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50 ring-2 ring-purple-500 ring-opacity-50 shadow-md'
                      : 'hover:border-purple-300 hover:shadow-lg hover:bg-gradient-to-br hover:from-purple-25 hover:to-indigo-25'
                  }`}
                >
                  <CardHeader className="flex flex-row items-center space-y-0 pb-4">
                    <div className="relative mr-4">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) => {
                          const newPresets = checked
                            ? [...localSelectedPresets, framework.id]
                            : localSelectedPresets.filter(id => id !== framework.id);
                          setLocalSelectedPresets(newPresets);
                        }}
                        className={`${isSelected ? 'border-purple-500 bg-purple-500' : ''}`}
                      />
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${isSelected ? 'bg-purple-100' : 'bg-gray-100'}`}>
                          <Building2 className={`h-6 w-6 ${isSelected ? 'text-purple-600' : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-lg font-semibold">{framework.name}</CardTitle>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs bg-gray-50">
                              {framework.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
                              {framework.strategic_domain}
                            </Badge>
                          </div>
                          <CardDescription className="text-sm leading-relaxed">{framework.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  {isSelected && (
                    <CardContent className="space-y-4 bg-gradient-to-r from-purple-25 to-indigo-25 rounded-b-lg border-t border-purple-100">
                      <div>
                        <div className="text-sm font-semibold text-purple-900 mb-2 flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          Framework Details
                        </div>
                        <div className="text-sm text-gray-700 bg-white rounded-md p-3 border border-purple-100 space-y-2">
                          <div><strong>Strategic Domain:</strong> {framework.strategic_domain}</div>
                          <div><strong>Category:</strong> {framework.category.replace('_', ' ')}</div>
                        </div>
                      </div>

                      {framework.prerequisites.length > 0 && (
                        <div>
                          <div className="text-sm font-semibold text-purple-900 mb-2 flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Prerequisites
                          </div>
                          <div className="text-sm text-gray-700 bg-white rounded-md p-3 border border-purple-100">
                            {framework.prerequisites.join(', ')}
                          </div>
                        </div>
                      )}

                      {framework.businessValue && framework.businessValue.length > 0 && (
                        <div>
                          <div className="text-sm font-semibold text-purple-900 mb-2 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Business Value
                          </div>
                          <div className="text-sm text-gray-700 bg-white rounded-md p-3 border border-purple-100">
                            <ul className="list-disc list-inside space-y-1">
                              {framework.businessValue.map((value, idx) => (
                                <li key={idx}>{value}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}

                      <div>
                        <div className="text-sm font-semibold text-purple-900 mb-2 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Implementation Benefits
                        </div>
                        <div className="text-sm text-gray-700 bg-white rounded-md p-3 border border-purple-100">
                          <ul className="list-disc list-inside space-y-1">
                            <li>Structured governance approach</li>
                            <li>Industry-standard best practices</li>
                            <li>Pre-configured objectives and controls</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick/Intelligent Setup */}
      {setupMode === 'quick' && (
        <Card className="border-dashed border-purple-200 bg-gradient-to-br from-purple-25 to-indigo-25">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="bg-purple-100 rounded-full p-4 mb-4">
              <Sparkles className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Intelligent Recommendations</h3>
            <p className="text-sm text-gray-600 text-center max-w-md">
              AI-powered framework recommendations based on your organization profile.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Setup Summary */}
      {selectedFrameworks.length > 0 && !isSeeding && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Setup Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-green-800">{selectedFrameworks.length}</div>
                <div className="text-sm text-green-600">Frameworks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-800">{totalObjectives}</div>
                <div className="text-sm text-green-600">Objectives</div>
              </div>
            </div>

            <div className="text-sm text-green-700">
              <strong>What happens next:</strong> We'll pre-populate your frameworks with industry best practices,
              sample assessments, and reference models.
            </div>
          </CardContent>
        </Card>
      )}

      {/* Seeding Progress */}
      {isSeeding && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
              <div className="flex-1">
                <div className="font-medium">Setting up your frameworks...</div>
                <div className="text-sm text-muted-foreground">
                  Installing reference models and pre-configuring assessments
                </div>
              </div>
            </div>
            <Progress value={65} className="mt-3" />
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={isSeeding}
          size="lg"
        >
          <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
          Back
        </Button>
        <Button
          onClick={handleProceed}
          disabled={isSeeding}
          size="lg"
          className="shadow-lg"
        >
          {isSeeding ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting up...
            </>
          ) : (
            <>
              {isLastStep ? 'Complete Setup' : 'Continue'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

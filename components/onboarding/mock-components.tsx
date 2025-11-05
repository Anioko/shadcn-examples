'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

// Mock StepProgressHeader
export function StepProgressHeader({
  stepTitle,
  stepDescription,
  currentStep,
  totalSteps,
  className
}: {
  stepTitle: string;
  stepDescription: string;
  currentStep: number;
  totalSteps: number;
  organizationType?: string;
  className?: string;
}) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("space-y-4", className)}>
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </div>
            <Badge variant="outline" className="text-xs">
              {Math.round(progress)}% Complete
            </Badge>
          </div>
          <Progress value={progress} className="h-2 mb-2" />
        </CardContent>
      </Card>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">{stepTitle}</h2>
        <p className="text-sm text-muted-foreground">{stepDescription}</p>
      </div>
    </div>
  );
}

// Mock StepMessaging
export function StepMessaging({ className }: { messaging?: any; className?: string }) {
  return null; // Optional component
}

// Mock ValuePropositionCard
export function ValuePropositionCard({ className }: { valueProps?: any; variant?: string; className?: string }) {
  return null; // Optional component
}

// Mock OnboardingMessageAlert
export function OnboardingMessageAlert({ className }: { message?: any; onAction?: any; onDismiss?: any; className?: string }) {
  return null; // Optional component
}

// Mock SmartValidation
export function SmartValidation({ className }: { className?: string }) {
  return null; // Optional component
}

// Mock IntelligentFormHelper
export function IntelligentFormHelper({ className }: { className?: string }) {
  return null; // Optional component
}

// Mock WebsiteAnalysisWidget
export function WebsiteAnalysisWidget({ className, ...props }: any) {
  return null; // Optional component
}

// Mock IntelligentRecommendations
export function IntelligentRecommendations({ className, ...props }: any) {
  return null; // Optional component
}

// Mock IntelligentFrameworkRecommendations
export function IntelligentFrameworkRecommendations({ className, ...props }: any) {
  return null; // Optional component
}

// Mock hooks
export function useOrganizationType() {
  return {
    detection: { type: 'smb', confidence: 0.5, recommendedPath: 'standard' },
    messaging: {},
    shouldShowPersonalization: false
  };
}

export function useOrganizationFieldVisibility() {
  return {
    showFundingStage: false,
    showOperationalComplexity: false,
    showEnhancedCustomerBase: true,
    showGovernmentFields: false,
    showNonprofitFields: false,
    showStartupFeatures: false,
    showEnterpriseFeatures: false
  };
}

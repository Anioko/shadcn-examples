'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { StepIndicator } from './step-indicator';
import { OrganizationStep } from './organization-step';
import { ComplianceMaturityStep } from './compliance-maturity-step';
import { FrameworkStep } from './framework-step';
import { DigitalTransformationStep } from './digital-transformation-step';
import { ImplementationPlanningStep } from './implementation-planning-step';
import { InviteTeamStep } from './invite-team-step';

// Define the onboarding steps
export const OnboardingSteps = {
  Organization: 'organization',
  ComplianceMaturity: 'compliance-maturity',
  Frameworks: 'frameworks',
  DigitalTransformation: 'digital-transformation',
  ImplementationPlanning: 'implementation-planning',
  InviteTeam: 'invite-team',
} as const;

// Zod schema for the organization step
const organizationStepSchema = z.object({
  logo: z.string().optional(),
  name: z.string().min(1, 'Organization name is required'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  website: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  industry: z.string().optional(),
  sector: z.string().optional(),
  companySize: z.string().optional(),
  primaryRegion: z.string().optional(),
  complianceRequirements: z.array(z.string()).optional(),
  complianceMaturityLevels: z.record(z.string()).optional(),
  governanceMaturity: z.string().optional(),
});

// Complete onboarding schema
const completeOnboardingSchema = z.object({
  activeSteps: z.array(z.string()),
  organizationStep: organizationStepSchema,
});

type CompleteOnboardingSchema = z.infer<typeof completeOnboardingSchema>;

export type OnboardingWizardProps = React.HTMLAttributes<HTMLFormElement> & {
  activeSteps: string[];
  metadata?: {
    user?: {
      name?: string;
      email?: string;
    };
    organization?: {
      name?: string;
      slug?: string;
      logo?: string;
    };
  };
};

export function OnboardingWizard({
  activeSteps,
  metadata,
  className,
  ...other
}: OnboardingWizardProps): React.JSX.Element {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState<string>(activeSteps[0]);

  const methods = useForm<CompleteOnboardingSchema>({
    resolver: zodResolver(completeOnboardingSchema),
    mode: 'all',
    defaultValues: {
      activeSteps,
      organizationStep: {
        logo: metadata?.organization?.logo,
        name: metadata?.organization?.name ?? '',
        slug: metadata?.organization?.slug ?? '',
        website: '',
        industry: undefined,
        sector: undefined,
        companySize: undefined,
        primaryRegion: undefined,
        complianceRequirements: [],
        complianceMaturityLevels: {},
        governanceMaturity: undefined,
      },
    },
  });

  const currentStepIndex = activeSteps.indexOf(currentStep);
  const isLastStep = currentStepIndex === activeSteps.length - 1;
  const isFirstStep = currentStepIndex === 0;

  const onSubmit = async (values: CompleteOnboardingSchema): Promise<void> => {
    console.log('Onboarding completed with values:', values);
    toast.success('Onboarding completed successfully!');

    // Navigate to dashboard or next page
    router.push('/dashboard');
  };

  const handleNext = async (): Promise<void> => {
    if (isLastStep) {
      await methods.handleSubmit(onSubmit)();
      return;
    }

    // Move to next step
    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < activeSteps.length) {
      setCurrentStep(activeSteps[nextStepIndex]);
      if (typeof window !== 'undefined') {
        window.scrollTo(0, 0);
      }
    }
  };

  const handleBack = (): void => {
    if (!isFirstStep) {
      const prevStepIndex = currentStepIndex - 1;
      if (prevStepIndex >= 0) {
        setCurrentStep(activeSteps[prevStepIndex]);
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
        }
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn(
          'mx-auto w-full min-w-80 max-w-4xl space-y-6 p-6 pt-24 lg:px-8',
          className
        )}
        {...other}
      >
        <div className="w-full max-w-md space-y-4">
          <p className="text-sm text-muted-foreground">
            Step {currentStepIndex + 1} of {activeSteps.length}
          </p>
          <StepIndicator
            steps={activeSteps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>

        {currentStep === OnboardingSteps.Organization && (
          <OrganizationStep
            canNext={true}
            loading={methods.formState.isSubmitting}
            isLastStep={isLastStep}
            handleNext={handleNext}
          />
        )}

        {currentStep === OnboardingSteps.ComplianceMaturity && (
          <ComplianceMaturityStep
            canNext={true}
            loading={methods.formState.isSubmitting}
            isLastStep={isLastStep}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}

        {currentStep === OnboardingSteps.Frameworks && (
          <FrameworkStep
            canNext={true}
            loading={methods.formState.isSubmitting}
            isLastStep={isLastStep}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}

        {currentStep === OnboardingSteps.DigitalTransformation && (
          <DigitalTransformationStep
            canNext={true}
            loading={methods.formState.isSubmitting}
            isLastStep={isLastStep}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}

        {currentStep === OnboardingSteps.ImplementationPlanning && (
          <ImplementationPlanningStep
            canNext={true}
            loading={methods.formState.isSubmitting}
            isLastStep={isLastStep}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}

        {currentStep === OnboardingSteps.InviteTeam && (
          <InviteTeamStep
            canNext={true}
            loading={methods.formState.isSubmitting}
            isLastStep={isLastStep}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
      </form>
    </FormProvider>
  );
}

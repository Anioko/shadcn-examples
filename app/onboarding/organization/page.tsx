'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronLeftIcon } from 'lucide-react';
import { OnboardingWizard, OnboardingSteps } from '@/components/onboarding/onboarding-wizard';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export default function OnboardingOrganizationPage(): React.JSX.Element {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Logo at the top center */}
      <div className="absolute inset-x-0 top-0 mx-auto flex min-w-80 items-center justify-center p-4">
        <div className="flex items-center justify-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">O</span>
          </div>
          <span className="text-lg font-semibold">Organization Setup</span>
        </div>
      </div>

      {/* Back button at top left */}
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4'
        )}
      >
        <ChevronLeftIcon className="mr-2 size-4 shrink-0" />
        Back
      </Link>

      {/* Onboarding Wizard */}
      <OnboardingWizard
        activeSteps={[
          OnboardingSteps.Organization,
          OnboardingSteps.ComplianceMaturity,
          OnboardingSteps.Frameworks,
          OnboardingSteps.DigitalTransformation,
          OnboardingSteps.ImplementationPlanning,
          OnboardingSteps.InviteTeam
        ]}
        metadata={{
          user: {
            name: 'John Doe',
            email: 'john@example.com'
          },
          organization: {
            name: '',
            slug: '',
          }
        }}
      />
    </div>
  );
}

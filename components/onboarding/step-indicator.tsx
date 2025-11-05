import * as React from 'react';
import { cn } from '@/lib/utils';
import { Step } from './step';

export type StepIndicatorProps = React.HTMLAttributes<HTMLDivElement> & {
  steps: string[];
  currentStep: string;
  setCurrentStep: (value: string) => void;
};

export function StepIndicator({
  steps,
  currentStep,
  setCurrentStep,
  className,
  ...other
}: StepIndicatorProps): React.JSX.Element {
  const currentStepIndex = steps.findIndex((step) => step === currentStep);
  return (
    <div
      className={cn('flex flex-row gap-2', className)}
      {...other}
    >
      {steps.map((step, index) => {
        const active = index <= currentStepIndex;
        const disabled = !active || currentStepIndex === index;
        return (
          <Step
            key={`${step}-${index}`}
            step={step}
            active={active}
            disabled={disabled}
            setCurrentStep={setCurrentStep}
          />
        );
      })}
    </div>
  );
}

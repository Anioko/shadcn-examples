'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

export type StepProps = React.HTMLAttributes<HTMLButtonElement> & {
  step: string;
  active: boolean;
  disabled: boolean;
  setCurrentStep: (value: string) => void;
};

export function Step({
  step,
  active,
  disabled,
  setCurrentStep,
  className,
  ...other
}: StepProps): React.JSX.Element {
  const navigate = (): void => {
    setCurrentStep(step);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };
  return (
    <button
      className={cn(
        'h-1 w-full rounded-[1px]',
        active ? 'bg-primary' : 'bg-muted',
        className
      )}
      type="button"
      tabIndex={-1}
      disabled={disabled}
      onClick={navigate}
      {...other}
    />
  );
}

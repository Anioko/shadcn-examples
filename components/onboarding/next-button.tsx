import * as React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';

export type NextButtonProps = Omit<ButtonProps, 'children'> & {
  isLastStep: boolean;
  loading?: boolean;
};

export function NextButton({
  isLastStep,
  loading,
  disabled,
  ...rest
}: NextButtonProps): React.JSX.Element {
  return (
    <div>
      <Button
        type="button"
        variant="default"
        className="mt-4"
        disabled={disabled || loading}
        {...rest}
      >
        {loading ? 'Loading...' : isLastStep ? 'Finish' : 'Next step →'}
      </Button>
    </div>
  );
}

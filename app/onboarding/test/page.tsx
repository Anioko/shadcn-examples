'use client';

import * as React from 'react';
import Link from 'next/link';
import { ChevronLeftIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TestOnboardingPage(): React.JSX.Element {
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

      {/* Content */}
      <div className="mx-auto w-full min-w-80 max-w-4xl space-y-6 p-6 pt-24 lg:px-8">
        <div className="w-full max-w-md space-y-4">
          <p className="text-sm text-muted-foreground">
            Step 1 of 5
          </p>
          <div className="flex flex-row gap-2">
            <div className="h-1 w-full rounded-[1px] bg-primary" />
            <div className="h-1 w-full rounded-[1px] bg-muted" />
            <div className="h-1 w-full rounded-[1px] bg-muted" />
            <div className="h-1 w-full rounded-[1px] bg-muted" />
            <div className="h-1 w-full rounded-[1px] bg-muted" />
          </div>
        </div>

        <div className="flex w-full flex-col gap-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Add Your Organization</h2>
            <p className="text-sm text-muted-foreground">
              Tell us about your organization so we can provide tailored recommendations.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name</Label>
              <Input id="name" placeholder="Enter organization name" className="h-11" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" placeholder="your-organization-slug" className="h-11" />
              <p className="text-xs text-muted-foreground">
                https://example.com/org/your-slug
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website URL</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://your-company.com"
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">
                We'll analyze your website to provide intelligent framework recommendations
              </p>
            </div>

            <Button className="mt-4">
              Next step →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

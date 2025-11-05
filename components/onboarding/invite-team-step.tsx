'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';
import { NextButton } from './next-button';
import { cn } from '@/lib/utils';

const ROLES = {
  OWNER: 'Owner',
  ADMIN: 'Admin',
  MEMBER: 'Member',
  VIEWER: 'Viewer'
};

type Invitation = {
  id: string;
  email: string;
  role: keyof typeof ROLES;
};

export function InviteTeamStep({ canNext, loading, isLastStep, handleNext, handleBack, className, ...other }: any) {
  const methods = useFormContext();
  const [invitations, setInvitations] = useState<Invitation[]>([
    { id: '1', email: '', role: 'MEMBER' }
  ]);

  const handleAddInvitation = () => {
    if (invitations.length < 5) {
      setInvitations([
        ...invitations,
        { id: Date.now().toString(), email: '', role: 'MEMBER' }
      ]);
    }
  };

  const handleEmailChange = (id: string, email: string) => {
    setInvitations(invitations.map(inv =>
      inv.id === id ? { ...inv, email } : inv
    ));
  };

  const handleRoleChange = (id: string, role: keyof typeof ROLES) => {
    setInvitations(invitations.map(inv =>
      inv.id === id ? { ...inv, role } : inv
    ));
  };

  return (
    <div className={cn('flex w-full flex-col gap-4', className)}>
      <h1 className="text-3xl font-medium">Invite your team</h1>
      <p className="text-base text-muted-foreground">
        Add team members to get started. You can always invite more people later.
      </p>
      <div className="flex flex-col space-y-2">
        <div className="flex h-9 flex-row items-center justify-between">
          <Label>Email address</Label>
          {invitations.length < 5 && (
            <Button
              type="button"
              variant="link"
              onClick={handleAddInvitation}
            >
              + Add invitation
            </Button>
          )}
        </div>
        {invitations.map((invitation) => (
          <div
            key={invitation.id}
            className="flex items-baseline space-x-2"
          >
            <div className="w-full">
              <Input
                type="email"
                maxLength={255}
                placeholder="user@email.com"
                value={invitation.email}
                onChange={(e) => handleEmailChange(invitation.id, e.target.value)}
              />
            </div>
            <div className="w-44">
              <Select
                value={invitation.role}
                onValueChange={(value) => handleRoleChange(invitation.id, value as keyof typeof ROLES)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(ROLES).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
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
          disabled={false}
          isLastStep={isLastStep}
          onClick={handleNext}
        />
      </div>
    </div>
  );
}

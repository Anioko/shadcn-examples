'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

import mockData from '@/lib/mock-data/capability-options-analysis.json';

interface NewAnalysisDialogProps {
  open: boolean;
  onClose: () => void;
  onAnalysisCreated?: (analysis: any) => void;
}

export function NewAnalysisDialog({ open, onClose, onAnalysisCreated }: NewAnalysisDialogProps) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    capability: '',
    description: '',
    selectedOptions: [] as string[]
  });

  const selectedCapability = mockData.capabilities.find(
    c => c.id === formData.capability
  );

  const availableOptions = formData.capability
    ? (mockData.applicationOptions as any)[formData.capability] || []
    : [];

  const handleOptionToggle = (optionId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedOptions: prev.selectedOptions.includes(optionId)
        ? prev.selectedOptions.filter(id => id !== optionId)
        : [...prev.selectedOptions, optionId].slice(0, 3) // Max 3 options
    }));
  };

  const handleCreate = async () => {
    setIsCreating(true);

    // Create new analysis object
    const newAnalysis = {
      id: `analysis-${Date.now()}`,
      name: formData.name,
      capability: formData.capability,
      selectedOptions: formData.selectedOptions,
      status: 'Draft',
      createdDate: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      createdBy: 'Current User', // In real app, get from auth
      scores: formData.selectedOptions.reduce((acc: any, optionId: string) => {
        acc[optionId] = {
          'functional-fit': 0,
          'technical-fit': 0,
          'total-cost': 0,
          'vendor-viability': 0,
          'implementation-risk': 0,
          'scalability': 0,
          'user-experience': 0
        };
        return acc;
      }, {}),
      notes: formData.description || '',
      recommendation: 'Scoring in progress...'
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Store in localStorage for persistence across page loads
    if (typeof window !== 'undefined') {
      const storedAnalyses = localStorage.getItem('userAnalyses');
      const userAnalyses = storedAnalyses ? JSON.parse(storedAnalyses) : [];
      userAnalyses.push(newAnalysis);
      localStorage.setItem('userAnalyses', JSON.stringify(userAnalyses));
    }

    // Show success toast
    toast.success('Analysis created successfully!', {
      description: 'You can now start scoring the options.',
    });

    // Callback if provided
    if (onAnalysisCreated) {
      onAnalysisCreated(newAnalysis);
    }

    // Reset form
    setFormData({
      name: '',
      capability: '',
      description: '',
      selectedOptions: []
    });
    setStep(1);
    setIsCreating(false);

    // Close dialog
    onClose();

    // Navigate to the new analysis detail page
    router.push(`/dashboard/options-analysis/${newAnalysis.id}`);
  };

  const canProceedToStep2 = formData.name && formData.capability;
  const canCreate = formData.selectedOptions.length >= 2;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Options Analysis</DialogTitle>
          <DialogDescription>
            Compare application options for a specific capability
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Analysis Name</Label>
              <Input
                id="name"
                placeholder="e.g., CRM Modernization Initiative"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capability">Select Capability</Label>
              <Select
                value={formData.capability}
                onValueChange={(value) => setFormData(prev => ({ ...prev, capability: value, selectedOptions: [] }))}
              >
                <SelectTrigger id="capability">
                  <SelectValue placeholder="Choose a capability" />
                </SelectTrigger>
                <SelectContent>
                  {mockData.capabilities.map((cap) => (
                    <SelectItem key={cap.id} value={cap.id}>
                      <div className="flex flex-col">
                        <span>{cap.name}</span>
                        <span className="text-xs text-muted-foreground">{cap.category}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCapability && (
              <Card className="p-4 bg-muted/50">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{selectedCapability.name}</h4>
                    <Badge variant="outline">{selectedCapability.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedCapability.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                    <div>
                      <span className="text-muted-foreground">Current State:</span>
                      <p className="font-medium">{selectedCapability.currentState}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Strategic Importance:</span>
                      <p className="font-medium">{selectedCapability.strategicImportance}</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add any context or objectives for this analysis..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Select Applications to Compare</Label>
                <Badge variant="secondary">
                  {formData.selectedOptions.length} of 3 selected
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Select 2-3 application options to compare
              </p>
            </div>

            <div className="grid gap-3">
              {availableOptions.map((option: any) => {
                const isSelected = formData.selectedOptions.includes(option.id);
                const canSelect = formData.selectedOptions.length < 3 || isSelected;

                return (
                  <Card
                    key={option.id}
                    className={`p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : canSelect
                        ? 'hover:border-primary/50'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    onClick={() => canSelect && handleOptionToggle(option.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox
                        checked={isSelected}
                        disabled={!canSelect}
                        className="mt-1"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{option.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {option.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Vendor: {option.vendor}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        <DialogFooter>
          {step === 2 && (
            <Button variant="outline" onClick={() => setStep(1)} disabled={isCreating}>
              Back
            </Button>
          )}
          <Button variant="outline" onClick={onClose} disabled={isCreating}>
            Cancel
          </Button>
          {step === 1 && (
            <Button onClick={() => setStep(2)} disabled={!canProceedToStep2}>
              Next: Select Applications
            </Button>
          )}
          {step === 2 && (
            <Button onClick={handleCreate} disabled={!canCreate || isCreating}>
              {isCreating ? 'Creating...' : 'Create Analysis'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

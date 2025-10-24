"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { X, Save, RotateCcw, Target, Zap, Users, Settings, Database, Building } from 'lucide-react';

interface SelectedElement {
  id: string;
  type: string;
  label: string;
  description?: string;
  layer: string;
  position: { x: number; y: number };
  properties?: Record<string, unknown>;
}

interface PropertiesPanelProps {
  selectedElement?: SelectedElement | null;
  onUpdateElement?: (id: string, updates: Partial<SelectedElement>) => void;
  onClearSelection?: () => void;
}

const elementTypeOptions = [
  { value: 'goal', label: 'Goal', icon: Target, layer: 'motivation' },
  { value: 'capability', label: 'Capability', icon: Zap, layer: 'strategy' },
  { value: 'business-process', label: 'Business Process', icon: Users, layer: 'business' },
  { value: 'application-component', label: 'Application Component', icon: Settings, layer: 'application' },
  { value: 'technology-service', label: 'Technology Service', icon: Database, layer: 'technology' },
];

const layerOptions = [
  { value: 'motivation', label: 'Motivation Layer', color: 'bg-yellow-100 text-yellow-600' },
  { value: 'strategy', label: 'Strategy Layer', color: 'bg-red-100 text-red-600' },
  { value: 'business', label: 'Business Layer', color: 'bg-blue-100 text-blue-600' },
  { value: 'application', label: 'Application Layer', color: 'bg-green-100 text-green-600' },
  { value: 'technology', label: 'Technology Layer', color: 'bg-purple-100 text-purple-600' },
];

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <Settings className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-medium mb-2">No Element Selected</h3>
      <p className="text-sm text-muted-foreground">
        Select an element on the canvas to view and edit its properties
      </p>
    </div>
  );
}

function PropertiesForm({ element, onUpdate }: { 
  element: SelectedElement; 
  onUpdate: (updates: Partial<SelectedElement>) => void; 
}) {
  const [formData, setFormData] = useState({
    label: element.label,
    description: element.description || '',
    type: element.type,
    layer: element.layer,
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate(formData);
    setHasChanges(false);
  };

  const handleReset = () => {
    setFormData({
      label: element.label,
      description: element.description || '',
      type: element.type,
      layer: element.layer,
    });
    setHasChanges(false);
  };

  const selectedElementType = elementTypeOptions.find(opt => opt.value === formData.type);
  const selectedLayer = layerOptions.find(opt => opt.value === formData.layer);

  return (
    <div className="space-y-6">
      {/* Element Header */}
      <div className="flex items-center gap-3">
        {selectedElementType && (
          <div className={`p-2 rounded-md ${selectedLayer?.color}`}>
            <selectedElementType.icon className="w-5 h-5" />
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-medium">{formData.label}</h3>
          <Badge variant="outline" className="text-xs capitalize">
            {formData.layer.replace('-', ' ')}
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Form Tabs */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="element-label">Label</Label>
            <Input
              id="element-label"
              value={formData.label}
              onChange={(e) => handleInputChange('label', e.target.value)}
              placeholder="Element label"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="element-description">Description</Label>
            <Textarea
              id="element-description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Element description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="element-type">Type</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select element type" />
              </SelectTrigger>
              <SelectContent>
                {elementTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <option.icon className="w-4 h-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="element-layer">Layer</Label>
            <Select value={formData.layer} onValueChange={(value) => handleInputChange('layer', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select layer" />
              </SelectTrigger>
              <SelectContent>
                {layerOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${option.color}`} />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Position</Label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="pos-x" className="text-xs">X</Label>
                <Input
                  id="pos-x"
                  type="number"
                  value={element.position.x}
                  readOnly
                  className="h-8"
                />
              </div>
              <div>
                <Label htmlFor="pos-y" className="text-xs">Y</Label>
                <Input
                  id="pos-y"
                  type="number"
                  value={element.position.y}
                  readOnly
                  className="h-8"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="element-id">Element ID</Label>
            <Input
              id="element-id"
              value={element.id}
              readOnly
              className="font-mono text-xs"
            />
          </div>

          <div className="space-y-2">
            <Label>Layer Configuration</Label>
            <div className="text-xs text-muted-foreground">
              Layer-specific properties and validation rules will appear here based on the selected ArchiMate layer.
            </div>
          </div>
        </TabsContent>

        <TabsContent value="metadata" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Created</Label>
            <div className="text-sm text-muted-foreground">
              Just now
            </div>
          </div>

          <div className="space-y-2">
            <Label>Last Modified</Label>
            <div className="text-sm text-muted-foreground">
              Just now
            </div>
          </div>

          <div className="space-y-2">
            <Label>Version</Label>
            <div className="text-sm text-muted-foreground">
              1.0
            </div>
          </div>

          <div className="space-y-2">
            <Label>Relationships</Label>
            <div className="text-sm text-muted-foreground">
              No relationships defined
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      {hasChanges && (
        <div className="flex gap-2 pt-4 border-t">
          <Button size="sm" onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
          <Button size="sm" variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export function PropertiesPanel({ 
  selectedElement, 
  onUpdateElement,
  onClearSelection 
}: PropertiesPanelProps) {
  const handleUpdate = (updates: Partial<SelectedElement>) => {
    if (selectedElement && onUpdateElement) {
      onUpdateElement(selectedElement.id, updates);
    }
  };

  return (
    <Card className="w-80 h-full border-l rounded-none flex flex-col">
      <CardHeader className="pb-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">Properties</CardTitle>
          {selectedElement && onClearSelection && (
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={onClearSelection}
              className="h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-y-auto">
        {selectedElement ? (
          <PropertiesForm 
            element={selectedElement} 
            onUpdate={handleUpdate}
          />
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  );
}
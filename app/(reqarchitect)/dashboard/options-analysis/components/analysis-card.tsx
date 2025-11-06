'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

import mockData from '@/lib/mock-data/capability-options-analysis.json';
import {
  deleteAnalysis,
  duplicateAnalysis,
  exportToJSON,
  exportToCSV,
  exportToMarkdown,
  exportToExcel,
  type Analysis
} from '@/lib/utils/analysis-export';

interface AnalysisCardProps {
  analysis: Analysis;
  onSelect: () => void;
  isSelected: boolean;
  onDeleted?: () => void;
  onDuplicated?: (newAnalysis: Analysis) => void;
}

export function AnalysisCard({ analysis, onSelect, isSelected, onDeleted, onDuplicated }: AnalysisCardProps) {
  const router = useRouter();
  const capability = mockData.capabilities.find(c => c.id === analysis.capability);
  const selectedOptions = analysis.selectedOptions.map((optionId: string) => {
    const options = (mockData.applicationOptions as any)[analysis.capability] || [];
    return options.find((opt: any) => opt.id === optionId);
  }).filter(Boolean);

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/dashboard/options-analysis/${analysis.id}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();

    const isMockData = mockData.savedAnalyses.some(a => a.id === analysis.id);
    if (isMockData) {
      toast.error('Cannot delete mock data', {
        description: 'Mock data analyses cannot be deleted. Only user-created analyses can be removed.'
      });
      return;
    }

    const success = deleteAnalysis(analysis.id);
    if (success) {
      toast.success('Analysis deleted', {
        description: `"${analysis.name}" has been removed.`
      });
      if (onDeleted) {
        onDeleted();
      }
      router.refresh();
    } else {
      toast.error('Failed to delete', {
        description: 'Could not delete the analysis. Please try again.'
      });
    }
  };

  const handleDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      const newAnalysis = duplicateAnalysis(analysis);
      toast.success('Analysis duplicated', {
        description: `Created "${newAnalysis.name}"`
      });

      if (onDuplicated) {
        onDuplicated(newAnalysis);
      }

      router.refresh();
      router.push(`/dashboard/options-analysis/${newAnalysis.id}`);
    } catch (error) {
      toast.error('Failed to duplicate', {
        description: 'Could not duplicate the analysis. Please try again.'
      });
    }
  };

  const handleExport = (format: 'json' | 'csv' | 'md' | 'excel', e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      switch (format) {
        case 'json':
          exportToJSON(analysis);
          break;
        case 'csv':
          exportToCSV(analysis);
          break;
        case 'md':
          exportToMarkdown(analysis);
          break;
        case 'excel':
          exportToExcel(analysis);
          break;
      }

      toast.success('Export successful', {
        description: `Analysis exported as ${format.toUpperCase()}`
      });
    } catch (error) {
      toast.error('Export failed', {
        description: 'Could not export the analysis. Please try again.'
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'draft':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'border-primary ring-2 ring-primary ring-opacity-50' : ''
      }`}
      onClick={handleViewDetails}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg">{analysis.name}</CardTitle>
            <CardDescription className="text-sm">
              {capability?.name}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleViewDetails}>View Details</DropdownMenuItem>
              <DropdownMenuItem onClick={handleDuplicate}>Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={(e) => handleExport('json', e)}>
                    Export as JSON
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => handleExport('csv', e)}>
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => handleExport('md', e)}>
                    Export as Markdown
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => handleExport('excel', e)}>
                    Export as Excel
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={handleDelete}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Badge className={getStatusColor(analysis.status)}>
          {analysis.status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground font-medium">Comparing Options:</p>
          <div className="flex flex-wrap gap-1.5">
            {selectedOptions.map((option: any) => (
              <Badge key={option.id} variant="secondary" className="text-xs">
                {option.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            {analysis.createdBy}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDate(analysis.lastModified)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

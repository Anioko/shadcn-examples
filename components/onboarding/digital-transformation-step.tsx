'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowRight,
  Sparkles,
  CheckCircle2,
  SkipForward,
  Building,
  Users,
  Database,
  Cloud,
  Laptop,
  ShoppingCart
} from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import {
  allDigitalTransformationTemplates,
  getRecommendedDTTemplates
} from '@/lib/mock-data/onboarding-data-loader';

// Icon mapping
const iconMap = {
  Users,
  Building,
  Database,
  Cloud,
  Laptop,
  ShoppingCart
};

const MOCK_DT_TEMPLATES_OLD = [
  {
    id: 'crm',
    name: 'CRM Implementation',
    description: 'Customer relationship management system',
    platform: 'Salesforce',
    icon: Users,
    phases: ['Planning', 'Configuration', 'Migration', 'Launch'],
    estimatedDuration: '4-6 months',
    complexity: 'advanced',
    strategicBenefits: [
      'Unified customer view across all touchpoints',
      '360-degree customer insights and analytics',
      'Automated sales pipeline management',
      'Improved customer retention and satisfaction'
    ],
    keyFeatures: [
      'Contact and account management',
      'Sales force automation',
      'Marketing automation integration',
      'Customer service portal',
      'Mobile CRM access',
      'AI-powered insights'
    ],
    prerequisites: [
      'Customer data mapping and cleanup',
      'Sales process documentation',
      'Integration requirements defined',
      'User roles and permissions planned'
    ],
    integrationPoints: [
      'Marketing automation platforms',
      'Email and calendar systems',
      'ERP and financial systems',
      'Customer support tools',
      'Data analytics platforms'
    ],
    successMetrics: [
      'Sales cycle time reduction',
      'Customer acquisition cost',
      'Lead conversion rate',
      'Customer lifetime value',
      'User adoption rate'
    ]
  },
  {
    id: 'erp',
    name: 'ERP System',
    description: 'Enterprise resource planning',
    platform: 'SAP',
    icon: Building,
    phases: ['Assessment', 'Design', 'Implementation', 'Rollout'],
    estimatedDuration: '8-12 months',
    complexity: 'enterprise',
    strategicBenefits: [
      'Unified business processes across departments',
      'Real-time financial visibility and reporting',
      'Streamlined supply chain management',
      'Enhanced operational efficiency'
    ],
    keyFeatures: [
      'Financial management and accounting',
      'Supply chain and inventory management',
      'Manufacturing and production planning',
      'Human capital management',
      'Business intelligence and analytics',
      'Procurement and vendor management'
    ],
    prerequisites: [
      'Business process analysis and reengineering',
      'Master data management strategy',
      'Change management plan',
      'Infrastructure and hosting decisions',
      'Integration architecture defined'
    ],
    integrationPoints: [
      'Legacy financial systems',
      'Manufacturing execution systems',
      'Customer relationship management',
      'Business intelligence platforms',
      'Third-party logistics providers'
    ],
    successMetrics: [
      'Process automation percentage',
      'Order-to-cash cycle time',
      'Inventory turnover ratio',
      'Financial close time',
      'System uptime and performance'
    ]
  },
  {
    id: 'data-platform',
    name: 'Data Platform',
    description: 'Modern data analytics infrastructure',
    platform: 'Snowflake',
    icon: Database,
    phases: ['Architecture', 'Migration', 'Integration'],
    estimatedDuration: '3-6 months',
    complexity: 'advanced',
    strategicBenefits: [
      'Centralized data warehouse for all business data',
      'Scalable analytics and reporting capabilities',
      'Self-service data access for business users',
      'Advanced ML and AI model deployment'
    ],
    keyFeatures: [
      'Cloud-native data warehouse',
      'Near-infinite scalability',
      'Multi-cloud support',
      'Data sharing and collaboration',
      'Built-in security and governance',
      'Performance optimization'
    ],
    prerequisites: [
      'Data source inventory and assessment',
      'Data governance framework',
      'Security and compliance requirements',
      'Analytics use cases defined',
      'Cloud provider selection'
    ],
    integrationPoints: [
      'Transactional databases',
      'Business intelligence tools',
      'ETL/ELT platforms',
      'Machine learning platforms',
      'Data science environments'
    ],
    successMetrics: [
      'Query performance benchmarks',
      'Data freshness SLAs',
      'User adoption metrics',
      'Cost per query optimization',
      'Data quality scores'
    ]
  },
  {
    id: 'cloud-migration',
    name: 'Cloud Migration',
    description: 'Infrastructure modernization',
    platform: 'AWS',
    icon: Cloud,
    phases: ['Assessment', 'Migration', 'Optimization'],
    estimatedDuration: '6-9 months',
    complexity: 'advanced',
    strategicBenefits: [
      'Reduced infrastructure costs and TCO',
      'Enhanced scalability and flexibility',
      'Improved disaster recovery capabilities',
      'Faster time to market for new services'
    ],
    keyFeatures: [
      'Elastic compute and storage',
      'Managed database services',
      'Global content delivery network',
      'Advanced security and compliance',
      'DevOps and automation tools',
      'Serverless computing options'
    ],
    prerequisites: [
      'Application portfolio assessment',
      'Cloud readiness evaluation',
      'Cost-benefit analysis',
      'Security and compliance review',
      'Migration strategy selection'
    ],
    integrationPoints: [
      'On-premises data centers',
      'Hybrid cloud environments',
      'SaaS applications',
      'CI/CD pipelines',
      'Monitoring and observability tools'
    ],
    successMetrics: [
      'Infrastructure cost reduction',
      'Application performance improvement',
      'System availability and uptime',
      'Deployment frequency',
      'Mean time to recovery'
    ]
  }
];

export function DigitalTransformationStep({ loading, isLastStep, handleNext, handleBack }: any) {
  const methods = useFormContext<any>();
  const [isSeeding, setIsSeeding] = useState(false);
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);

  const organizationStep = methods.watch('organizationStep');
  const organizationSize = organizationStep?.companySize;
  const skipDigitalTransformation = methods.watch('digitalTransformationStep.skipDigitalTransformation') ?? false;

  const handleSkipToggle = (skip: boolean) => {
    methods.setValue('digitalTransformationStep.skipDigitalTransformation', skip, { shouldValidate: true });
    if (skip) {
      setSelectedTemplates([]);
    }
  };

  const handleTemplateToggle = (templateId: string) => {
    setSelectedTemplates(prev =>
      prev.includes(templateId)
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  const handleProceed = async () => {
    setIsSeeding(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSeeding(false);
    handleNext();
  };

  const estimatedValue = selectedTemplates.length > 0 ? {
    totalTemplates: selectedTemplates.length,
    complexTemplates: selectedTemplates.filter(id =>
      allDigitalTransformationTemplates.find(t => t.id === id)?.complexity === 'enterprise'
    ).length,
    avgDuration: 6,
    totalPhases: selectedTemplates.reduce((acc, id) => {
      const template = allDigitalTransformationTemplates.find(t => t.id === id);
      return acc + (template?.phases.length || 0);
    }, 0)
  } : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="h-7 w-7 text-purple-600" />
          Digital Transformation Platforms
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the digital platforms and systems you plan to implement.
          This step is optional for small organizations and startups.
        </p>
      </div>

      {/* Skip Option */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2 text-lg">
            <SkipForward className="h-5 w-5" />
            {organizationSize === 'startup' ? 'Recommended for Later' : 'Optional Step'}
          </CardTitle>
          {organizationSize === 'startup' && (
            <CardDescription className="text-blue-700">
              For startups, it's often better to establish core operations first before undertaking
              major platform transformations.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <FormField
            control={methods.control}
            name="digitalTransformationStep.skipDigitalTransformation"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-white">
                <div className="space-y-0.5">
                  <FormLabel className="text-base font-medium">
                    {organizationSize === 'startup'
                      ? 'Skip for Now (Recommended for Startups)'
                      : 'Skip Digital Transformation Setup'
                    }
                  </FormLabel>
                  <FormDescription>
                    You can add digital transformation programmes later from your dashboard.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value || false}
                    onCheckedChange={handleSkipToggle}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>

      {/* Templates Selection */}
      {!skipDigitalTransformation && (
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Select Platforms to Implement</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {allDigitalTransformationTemplates.map((template) => {
              const Icon = iconMap[template.icon as keyof typeof iconMap] || Database;
              const isSelected = selectedTemplates.includes(template.id);

              return (
                <Card
                  key={template.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    isSelected
                      ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50 ring-2 ring-purple-500 ring-opacity-50'
                      : 'hover:border-purple-300 hover:bg-gradient-to-br hover:from-purple-25 hover:to-indigo-25'
                  }`}
                  onClick={() => handleTemplateToggle(template.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? 'bg-purple-100' : 'bg-gray-100'}`}>
                          <Icon className={`h-6 w-6 ${isSelected ? 'text-purple-600' : 'text-gray-600'}`} />
                        </div>
                        <div>
                          <CardTitle className="text-base font-semibold">{template.name}</CardTitle>
                          <Badge variant="outline" className="mt-1 text-xs bg-gray-50">
                            {template.platform}
                          </Badge>
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                    <CardDescription className="text-sm">{template.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <ArrowRight className="h-3 w-3" />
                        {template.estimatedDuration}
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" />
                        {template.complexity}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">Implementation Phases</div>
                      <div className="text-sm text-gray-600">
                        {template.phases.join(' → ')}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-semibold text-gray-900 mb-1">Strategic Benefits</div>
                      <div className="text-sm text-gray-600">
                        {template.strategicBenefits.slice(0, 2).join(' • ')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Summary */}
      {estimatedValue && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Transformation Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-800">{estimatedValue.totalTemplates}</div>
                <div className="text-sm text-green-600">Platforms</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-800">{estimatedValue.totalPhases}</div>
                <div className="text-sm text-green-600">Total Phases</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-800">{estimatedValue.avgDuration}mo</div>
                <div className="text-sm text-green-600">Avg Duration</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-800">{estimatedValue.complexTemplates}</div>
                <div className="text-sm text-green-600">Enterprise</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={isSeeding}
          size="lg"
        >
          <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
          Back
        </Button>
        <Button
          onClick={handleProceed}
          disabled={isSeeding}
          size="lg"
        >
          {isSeeding ? 'Processing...' : isLastStep ? 'Complete Setup' : 'Continue'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

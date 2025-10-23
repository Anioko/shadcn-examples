# Options Analysis Module - LLM Implementation PRD

## Document Metadata
```yaml
version: 1.0
last_updated: 2025-10-23
product: ReqArchitect Enterprise Architecture Platform
module: Options Analysis & Multi-Criteria Decision Analysis
target_audience: AI Code Assistants, Development Teams
implementation_phases: 4 phases over 12 months
```

## Executive Context

### Problem Statement
Enterprise Architects conduct transformation decisions (cloud migration, application modernization, technology selection) using fragmented tools (Excel spreadsheets, PowerPoint decks, Word documents). This results in:
- 4-6 weeks per analysis (inefficient)
- Inconsistent methodology across organization
- Poor traceability of decision rationale
- Difficulty incorporating architectural context
- Limited stakeholder collaboration
- No organizational learning from past decisions

### Solution Overview
Integrated options analysis module within ReqArchitect that provides:
1. Structured framework for defining and comparing transformation options
2. Multi-Criteria Decision Analysis (MCDA) engine with automated scoring
3. Context-aware data population from existing architecture repository
4. AI-enhanced recommendations and gap identification
5. Financial modeling (TCO, ROI, NPV) with cost-benefit analysis
6. Comprehensive risk assessment with mitigation planning
7. Stakeholder perspective management
8. Automated report generation and decision documentation

### Success Metrics
```yaml
efficiency:
  target: "60% reduction in analysis time"
  baseline: "4-6 weeks"
  goal: "1.5-2.5 weeks"

adoption:
  target: "80% of major transformation decisions"
  timeline: "6 months post-launch"

quality:
  completeness: "90% of analyses meet evidence standards"
  nps: "40+ from Enterprise Architects"

business_impact:
  transformation_success: "+25% improvement rate"
  measurement_period: "12 months post-implementation"
```

---

## System Architecture

### Module Structure
```
options-analysis/
├── core/
│   ├── option-management/      # Option CRUD, versioning, relationships
│   ├── mcda-engine/            # Criteria framework, scoring, calculations
│   ├── impact-analysis/        # Capability/app/tech impact mapping
│   ├── financial-modeling/     # TCO, ROI, cash flow analysis
│   └── risk-management/        # Risk identification, scoring, mitigation
├── ai-assistant/
│   ├── recommendations/        # Option suggestions, gap identification
│   ├── pattern-recognition/    # Learning from past analyses
│   ├── nlp-query/             # Natural language interface
│   └── summarization/         # Auto-generated narratives
├── collaboration/
│   ├── multi-user-editing/    # Real-time co-editing
│   ├── perspectives/          # Stakeholder views
│   ├── commenting/            # Threaded discussions
│   └── workflow/              # Approval routing
├── reporting/
│   ├── templates/             # Pre-built report structures
│   ├── generators/            # PDF, DOCX, PPTX creation
│   ├── visualizations/        # Charts, diagrams, dashboards
│   └── exports/               # Data export utilities
├── integrations/
│   ├── reqarchitect-core/     # BMC, capabilities, apps, tech stack
│   ├── external-systems/      # ERP, PM tools, collaboration
│   └── apis/                  # REST API, webhooks
└── governance/
    ├── templates/             # Analysis templates and standards
    ├── approvals/             # Workflow engine
    ├── audit/                 # Change tracking, compliance
    └── learning/              # Knowledge base, lessons learned
```

### Data Model

#### Core Entities

**Analysis**
```typescript
interface Analysis {
  id: string;
  organizationId: string;
  name: string;
  description: string;
  analysisType: AnalysisType;  // CloudMigration, AppModernization, VendorSelection, etc.
  status: AnalysisStatus;  // Draft, UnderAnalysis, Recommended, Approved, Implemented
  strategicObjective: string;  // Link to BMC or strategic goals
  owner: UserId;
  collaborators: UserId[];
  createdAt: timestamp;
  updatedAt: timestamp;
  decidedAt?: timestamp;
  approvedBy?: UserId[];
  
  // Configuration
  criteriaFramework: CriteriaFramework;
  evaluationPeriodYears: number;  // Default 5
  discountRate: number;  // For NPV calculations
  
  // Relationships
  options: Option[];
  stakeholderPerspectives: Perspective[];
  evidenceRepository: Evidence[];
  assumptions: Assumption[];
  constraints: Constraint[];
  
  // Metadata
  version: number;
  versionHistory: AnalysisVersion[];
  tags: string[];
}

enum AnalysisType {
  CloudMigration = 'cloud_migration',
  ApplicationModernization = 'app_modernization',
  VendorSelection = 'vendor_selection',
  TechnologyStackChange = 'tech_stack_change',
  ProcessAutomation = 'process_automation',
  PlatformConsolidation = 'platform_consolidation',
  Custom = 'custom'
}

enum AnalysisStatus {
  Draft = 'draft',
  UnderAnalysis = 'under_analysis',
  InReview = 'in_review',
  Recommended = 'recommended',
  Approved = 'approved',
  Rejected = 'rejected',
  Implemented = 'implemented',
  Archived = 'archived'
}
```

**Option**
```typescript
interface Option {
  id: string;
  analysisId: string;
  name: string;
  description: string;  // Rich text
  approach: string;  // High-level strategy summary
  
  // Classification
  optionType: string;  // From taxonomy: LiftAndShift, Replatform, etc.
  parentOptionId?: string;  // For option hierarchies
  childOptions?: string[];  // Sub-options or phases
  
  // Timeline & Resources
  estimatedStartDate: date;
  estimatedDuration: number;  // Days
  milestones: Milestone[];
  resourceRequirements: ResourceRequirement[];
  
  // Financial
  budgetRange: {
    min: number;
    max: number;
    currency: string;
  };
  costs: CostElement[];
  benefits: BenefitElement[];
  financialMetrics: FinancialMetrics;
  
  // Impact
  affectedCapabilities: CapabilityImpact[];
  affectedApplications: ApplicationImpact[];
  affectedTechnologies: TechnologyImpact[];
  affectedProcesses: ProcessImpact[];
  affectedStakeholders: StakeholderImpact[];
  
  // Risk
  risks: Risk[];
  overallRiskScore: number;
  
  // Scoring
  criterionScores: CriterionScore[];
  totalScore: number;
  normalizedScore: number;  // 0-100
  
  // Status
  owner: UserId;
  status: OptionStatus;
  createdAt: timestamp;
  updatedAt: timestamp;
}

enum OptionStatus {
  Draft = 'draft',
  UnderEvaluation = 'under_evaluation',
  Recommended = 'recommended',
  Selected = 'selected',
  Rejected = 'rejected',
  InProgress = 'in_progress',
  Completed = 'completed'
}
```

**CriteriaFramework**
```typescript
interface CriteriaFramework {
  id: string;
  name: string;
  description: string;
  categories: CriterionCategory[];
  isTemplate: boolean;
  organizationId?: string;  // Null for system templates
}

interface CriterionCategory {
  id: string;
  name: string;  // Financial, Strategic, Technical, Risk, Organizational
  description: string;
  weight: number;  // Percentage (0-100)
  criteria: Criterion[];
  color: string;  // For visualizations
  icon: string;
}

interface Criterion {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  weight: number;  // Percentage within category
  
  // Evaluation
  evaluationType: EvaluationType;
  scale?: QualitativeScale | QuantitativeScale;
  unit?: string;  // For quantitative (dollars, days, percentage)
  
  // Guidance
  evaluationGuidance: string;  // How to score this criterion
  exampleAnchors?: string[];  // Example scores and what they mean
  
  // Configuration
  isMandatory: boolean;  // Must be scored for analysis completion
  allowsMultipleEvaluators: boolean;
  
  // Sub-criteria
  subCriteria?: Criterion[];
}

enum EvaluationType {
  Quantitative = 'quantitative',  // Direct numeric input
  Qualitative = 'qualitative',    // 1-5 scale with labels
  Binary = 'binary',              // Yes/No, Met/NotMet
  RAG = 'rag'                     // Red/Amber/Green
}

interface QualitativeScale {
  type: 'five_point' | 'three_point';
  labels: {
    value: number;
    label: string;  // VeryLow, Low, Medium, High, VeryHigh
    description: string;
  }[];
}

interface QuantitativeScale {
  min: number;
  max: number;
  optimal: 'minimize' | 'maximize' | 'target';
  targetValue?: number;
}
```

**CriterionScore**
```typescript
interface CriterionScore {
  id: string;
  optionId: string;
  criterionId: string;
  
  // Score
  rawValue: number | string | boolean;  // Depends on evaluation type
  normalizedScore: number;  // 0-100 for aggregation
  weightedScore: number;  // normalizedScore * criterion.weight * category.weight
  
  // Metadata
  evaluator: UserId;
  evaluatedAt: timestamp;
  confidenceLevel: ConfidenceLevel;
  
  // Supporting information
  rationale: string;  // Why this score
  evidence: EvidenceLink[];  // Links to supporting documents/data
  dataSource?: string;  // Where score came from (manual, auto-populated)
  
  // Review
  isReviewed: boolean;
  reviewedBy?: UserId;
  reviewComments?: string;
}

enum ConfidenceLevel {
  Low = 'low',
  Medium = 'medium',
  High = 'high'
}
```

**Risk**
```typescript
interface Risk {
  id: string;
  optionId?: string;  // Null if organizational risk
  
  // Identification
  title: string;
  description: string;  // What could go wrong and impact
  category: RiskCategory;
  subCategory?: string;
  
  // Assessment
  probability: RiskProbability;  // 5%, 20%, 50%, 70%, 90%
  impact: RiskImpact;  // Scale 1-5
  financialImpact: number;  // Monetary estimate if risk occurs
  expectedMonetaryValue: number;  // probability * financialImpact
  riskRating: number;  // probability_level * impact (1-25 scale)
  
  // Context
  triggerConditions?: string[];  // What would cause this risk to occur
  proximity?: date;  // When risk might occur
  
  // Ownership
  riskOwner: UserId;
  
  // Mitigation
  mitigationStrategy: MitigationStrategy;
  mitigationActions: MitigationAction[];
  mitigationCost: number;
  mitigationEffectiveness: number;  // % reduction in probability or impact
  residualProbability: RiskProbability;  // After mitigation
  residualImpact: RiskImpact;
  residualEMV: number;
  
  // Status
  status: RiskStatus;
  identifiedAt: timestamp;
  lastReviewedAt: timestamp;
  reviewFrequency: ReviewFrequency;
}

enum RiskCategory {
  Technical = 'technical',
  Implementation = 'implementation',
  Organizational = 'organizational',
  Financial = 'financial',
  Vendor = 'vendor',
  Regulatory = 'regulatory',
  Operational = 'operational'
}

enum RiskProbability {
  VeryLow = 0.05,
  Low = 0.20,
  Medium = 0.50,
  High = 0.70,
  VeryHigh = 0.90
}

enum RiskImpact {
  Negligible = 1,
  Minor = 2,
  Moderate = 3,
  Major = 4,
  Severe = 5
}

enum MitigationStrategy {
  Avoid = 'avoid',      // Change option to eliminate risk
  Reduce = 'reduce',    // Actions to lower probability/impact
  Transfer = 'transfer', // Insurance, vendor guarantees
  Accept = 'accept'     // Consciously accept the risk
}

interface MitigationAction {
  id: string;
  description: string;
  cost: number;
  effort: number;  // Person-days
  owner: UserId;
  dueDate: date;
  status: 'planned' | 'in_progress' | 'completed' | 'not_effective';
}

enum RiskStatus {
  Identified = 'identified',
  Assessed = 'assessed',
  Mitigated = 'mitigated',
  Accepted = 'accepted',
  Closed = 'closed'
}
```

**FinancialMetrics**
```typescript
interface FinancialMetrics {
  optionId: string;
  
  // Costs
  totalCapEx: number;
  totalOpEx: number;
  totalTransitionalCosts: number;
  totalOpportunityCosts: number;
  totalCostOfOwnership: number;  // Sum of all costs over evaluation period
  
  // Benefits
  totalHardSavings: number;
  totalSoftBenefits: number;  // Converted to financial proxy
  totalBenefits: number;
  
  // Calculated Metrics
  netPresentValue: number;  // Discounted cash flow
  returnOnInvestment: number;  // (Benefits - Costs) / Costs * 100
  paybackPeriod: number;  // Months until cumulative benefits = costs
  internalRateOfReturn: number;  // IRR
  breakEvenPoint: date;
  
  // Cash Flow
  cashFlowByPeriod: CashFlowPeriod[];
  cumulativeCashFlow: CashFlowPeriod[];
  
  // Confidence
  confidenceLevel: ConfidenceLevel;
  sensitivityRanges: {
    npv: { min: number; max: number };
    roi: { min: number; max: number };
    payback: { min: number; max: number };
  };
}

interface CashFlowPeriod {
  period: number;  // Month or quarter number
  periodType: 'month' | 'quarter' | 'year';
  startDate: date;
  endDate: date;
  costs: number;
  benefits: number;
  netCashFlow: number;
  discountedNetCashFlow: number;
}

interface CostElement {
  id: string;
  category: CostCategory;
  subCategory?: string;
  description: string;
  amount: number;
  currency: string;
  frequency: CostFrequency;
  startDate: date;
  endDate?: date;  // Null for ongoing
  confidenceLevel: ConfidenceLevel;
  notes: string;
  dataSource?: string;
  evidence: EvidenceLink[];
}

enum CostCategory {
  CapEx_Hardware = 'capex_hardware',
  CapEx_Software = 'capex_software',
  CapEx_Implementation = 'capex_implementation',
  CapEx_Facilities = 'capex_facilities',
  OpEx_SaaS = 'opex_saas',
  OpEx_Cloud = 'opex_cloud',
  OpEx_Maintenance = 'opex_maintenance',
  OpEx_InternalLabor = 'opex_internal_labor',
  OpEx_ExternalLabor = 'opex_external_labor',
  OpEx_Training = 'opex_training',
  Transitional_Migration = 'transitional_migration',
  Transitional_ParallelRun = 'transitional_parallel_run',
  Transitional_Decommission = 'transitional_decommission',
  Opportunity_DelayedValue = 'opportunity_delayed_value',
  Opportunity_RevenueImpact = 'opportunity_revenue_impact'
}

enum CostFrequency {
  OneTime = 'one_time',
  Monthly = 'monthly',
  Quarterly = 'quarterly',
  Annual = 'annual'
}

interface BenefitElement {
  id: string;
  category: BenefitCategory;
  description: string;
  quantifiedValue: number;  // Monetary value or percentage
  valueType: 'monetary' | 'percentage' | 'time_savings';
  realizationStartDate: date;
  realizationCurve: 'immediate' | 'linear' | 'exponential';
  confidenceLevel: ConfidenceLevel;
  measurementApproach: string;  // How benefit will be tracked
  assumptions: string[];
  evidence: EvidenceLink[];
}

enum BenefitCategory {
  HardSavings_CostReduction = 'hard_cost_reduction',
  HardSavings_RevenueIncrease = 'hard_revenue_increase',
  Soft_ProductivityImprovement = 'soft_productivity',
  Soft_QualityImprovement = 'soft_quality',
  Soft_RiskReduction = 'soft_risk_reduction',
  Soft_StrategicEnablement = 'soft_strategic'
}
```

**Impact Types**
```typescript
interface CapabilityImpact {
  capabilityId: string;  // Links to ReqArchitect capability model
  capabilityName: string;
  currentMaturity: MaturityLevel;
  targetMaturity: MaturityLevel;
  postOptionMaturity: MaturityLevel;
  degreeOfChange: DegreeOfChange;
  impactDescription: string;
  effort: number;  // Person-days
  owner: UserId;
}

enum MaturityLevel {
  Initial = 1,
  Managed = 2,
  Defined = 3,
  QuantitativelyManaged = 4,
  Optimizing = 5
}

enum DegreeOfChange {
  NoChange = 'no_change',
  Minor = 'minor',
  Moderate = 'moderate',
  Major = 'major',
  Transform = 'transform'
}

interface ApplicationImpact {
  applicationId: string;  // Links to ReqArchitect app portfolio
  applicationName: string;
  impactType: ApplicationImpactType;
  description: string;
  effort: number;  // Person-days
  cost: number;
  risk: 'low' | 'medium' | 'high';
  dependencies: string[];  // Other apps that must change
  owner: UserId;
}

enum ApplicationImpactType {
  NoImpact = 'no_impact',
  Configure = 'configure',
  Modify = 'modify',
  Replace = 'replace',
  Retire = 'retire',
  New = 'new'
}

interface TechnologyImpact {
  technologyId: string;  // Links to ReqArchitect tech stack
  technologyName: string;
  currentVersion?: string;
  impactType: TechnologyImpactType;
  targetVersion?: string;
  description: string;
  risk: 'low' | 'medium' | 'high';
  requiredSkills: string[];
  skillGapExists: boolean;
}

enum TechnologyImpactType {
  Same = 'same',
  Upgrade = 'upgrade',
  Replace = 'replace',
  Add = 'add',
  Remove = 'remove'
}

interface StakeholderImpact {
  stakeholderId: string;
  stakeholderName: string;
  stakeholderType: 'individual' | 'team' | 'department' | 'business_unit';
  impactType: StakeholderImpactType;
  impactDescription: string;
  magnitude: DegreeOfChange;
  numberOfPeopleImpacted?: number;
  changeReadiness: 'high' | 'medium' | 'low';
  sentimentCurrent: Sentiment;
  engagementStrategy: string;
}

enum StakeholderImpactType {
  ProcessChange = 'process_change',
  ToolChange = 'tool_change',
  RoleChange = 'role_change',
  SkillRequirement = 'skill_requirement',
  ReportingChange = 'reporting_change'
}

enum Sentiment {
  StronglySupportive = 'strongly_supportive',
  Supportive = 'supportive',
  Neutral = 'neutral',
  Resistant = 'resistant',
  StronglyOpposed = 'strongly_opposed'
}
```

**Evidence & Documentation**
```typescript
interface Evidence {
  id: string;
  analysisId: string;
  type: EvidenceType;
  title: string;
  description?: string;
  
  // Content
  content?: string;  // For notes, inline text
  fileUrl?: string;  // For uploaded documents
  externalUrl?: string;  // For web links
  
  // Metadata
  source: string;  // Author or originating system
  dateCreated: date;
  reliabilityRating: ReliabilityRating;
  tags: string[];
  
  // Relationships
  relatedOptions: string[];
  relatedCriteria: string[];
  relatedRisks: string[];
  
  uploadedBy: UserId;
  uploadedAt: timestamp;
}

enum EvidenceType {
  Document = 'document',
  Link = 'link',
  Note = 'note',
  Quote = 'quote',
  Data = 'data',
  VendorProposal = 'vendor_proposal',
  ResearchReport = 'research_report',
  InterviewSummary = 'interview_summary',
  Screenshot = 'screenshot',
  Diagram = 'diagram'
}

enum ReliabilityRating {
  High = 'high',      // Verified data, official sources
  Medium = 'medium',  // Credible but not verified
  Low = 'low'        // Anecdotal, uncertain
}

interface Assumption {
  id: string;
  analysisId: string;
  statement: string;
  category: 'cost' | 'timeline' | 'technical' | 'business' | 'organizational';
  relatedElements: {
    options: string[];
    criteria: string[];
    risks: string[];
  };
  validationStatus: ValidationStatus;
  validationEvidence?: EvidenceLink[];
  impactIfFalse: string;  // What happens if assumption is wrong
  addedBy: UserId;
  addedAt: timestamp;
}

enum ValidationStatus {
  Unvalidated = 'unvalidated',
  PartiallyValidated = 'partially_validated',
  Validated = 'validated',
  Invalidated = 'invalidated'
}

interface Constraint {
  id: string;
  analysisId: string;
  description: string;
  type: ConstraintType;
  flexibility: 'fixed' | 'flexible';
  relatedOptions: string[];  // Which options are constrained
  impactDescription: string;  // How constraint limits choices
  owner: UserId;
}

enum ConstraintType {
  Budget = 'budget',
  Timeline = 'timeline',
  Technology = 'technology',
  Policy = 'policy',
  Regulatory = 'regulatory',
  Resource = 'resource'
}
```

**Collaboration & Governance**
```typescript
interface Perspective {
  id: string;
  analysisId: string;
  name: string;  // "CFO View", "Technical Team View"
  description: string;
  
  // Customized weights
  criteriaWeights: {
    criterionId: string;
    weight: number;
  }[];
  
  // Filtered criteria (show/hide)
  visibleCriteria: string[];
  
  // Preferred visualizations
  preferredViews: string[];  // Chart types, dashboard layouts
  
  // User
  createdBy: UserId;
  stakeholderType: 'executive' | 'technical' | 'financial' | 'operational' | 'custom';
}

interface Comment {
  id: string;
  analysisId: string;
  elementType: 'option' | 'criterion' | 'score' | 'risk' | 'evidence' | 'analysis';
  elementId: string;
  parentCommentId?: string;  // For threaded discussions
  
  content: string;
  author: UserId;
  createdAt: timestamp;
  updatedAt?: timestamp;
  
  // Mentions
  mentions: UserId[];
  
  // Status
  isResolved: boolean;
  resolvedBy?: UserId;
  resolvedAt?: timestamp;
}

interface Task {
  id: string;
  analysisId: string;
  title: string;
  description: string;
  taskType: 'data_gathering' | 'research' | 'stakeholder_interview' | 'review' | 'custom';
  
  // Assignment
  assignedTo: UserId;
  dueDate: date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Context
  relatedElements: {
    options: string[];
    criteria: string[];
    risks: string[];
  };
  
  // Status
  status: 'todo' | 'in_progress' | 'blocked' | 'completed';
  blockerReason?: string;
  completedAt?: timestamp;
  
  createdBy: UserId;
  createdAt: timestamp;
}

interface ApprovalWorkflow {
  id: string;
  analysisId: string;
  stages: ApprovalStage[];
  currentStage: number;
  overallStatus: 'pending' | 'in_progress' | 'approved' | 'rejected' | 'revisions_requested';
}

interface ApprovalStage {
  stageNumber: number;
  stageName: string;  // "Technical Review", "Financial Review", "Executive Approval"
  approvers: UserId[];  // Can be multiple
  approvalCriteria: string;  // e.g., "Requires 2 of 3 approvers"
  status: 'pending' | 'in_progress' | 'approved' | 'rejected' | 'revisions_requested';
  
  // Approvals received
  approvalActions: ApprovalAction[];
  
  dueDate?: date;
  escalationRules?: {
    escalateTo: UserId;
    escalateAfterDays: number;
  };
}

interface ApprovalAction {
  approver: UserId;
  action: 'approve' | 'reject' | 'request_revisions';
  comments: string;
  timestamp: timestamp;
}

interface DecisionRecord {
  id: string;
  analysisId: string;
  
  // Decision
  selectedOptionId: string;
  decisionDate: date;
  decidedBy: UserId[];
  
  // Context
  problemStatement: string;
  optionsSummary: {
    optionId: string;
    optionName: string;
    summary: string;
  }[];
  
  // Rationale
  criteriaUsed: {
    criterionId: string;
    weight: number;
  }[];
  finalScores: {
    optionId: string;
    score: number;
    rank: number;
  }[];
  rationale: string;  // Why winning option was chosen
  
  // Dissent
  dissentingViews?: {
    stakeholder: UserId;
    preferredOption: string;
    reasoning: string;
  }[];
  
  // Audit
  analysisVersion: number;
  evidenceSnapshot: string[];  // List of evidence IDs
  auditTrailUrl: string;
}
```

---

## Component Implementation Specs

### 1. Option Management Module

#### 1.1 Option CRUD Operations

**Create Option**
```typescript
// POST /api/v1/analyses/{analysisId}/options
async function createOption(
  analysisId: string,
  optionData: Partial<Option>,
  userId: string
): Promise<Option> {
  // 1. Validate analysis exists and user has write permission
  const analysis = await getAnalysis(analysisId);
  if (!hasPermission(userId, analysis, 'write')) {
    throw new ForbiddenError();
  }
  
  // 2. Generate option ID
  const optionId = generateUUID();
  
  // 3. Auto-populate context-aware data
  const contextData = await gatherContextualData(optionData, analysis);
  
  // 4. Create option with defaults
  const option: Option = {
    id: optionId,
    analysisId,
    name: optionData.name,
    description: optionData.description || '',
    approach: optionData.approach || '',
    optionType: optionData.optionType || 'custom',
    estimatedStartDate: optionData.estimatedStartDate || new Date(),
    estimatedDuration: optionData.estimatedDuration || 180, // 6 months default
    budgetRange: optionData.budgetRange || { min: 0, max: 0, currency: 'USD' },
    costs: [],
    benefits: [],
    affectedCapabilities: contextData.capabilities,
    affectedApplications: contextData.applications,
    affectedTechnologies: contextData.technologies,
    risks: contextData.autoIdentifiedRisks,
    criterionScores: initializeCriterionScores(analysis.criteriaFramework),
    status: 'draft',
    owner: userId,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...optionData
  };
  
  // 5. Save to database
  await db.options.insert(option);
  
  // 6. Log activity
  await logActivity(analysisId, 'option_created', { optionId, userId });
  
  // 7. Notify collaborators
  await notifyCollaborators(analysis, 'option_created', option);
  
  return option;
}

// Context-aware data gathering
async function gatherContextualData(
  optionData: Partial<Option>,
  analysis: Analysis
): Promise<{
  capabilities: CapabilityImpact[];
  applications: ApplicationImpact[];
  technologies: TechnologyImpact[];
  autoIdentifiedRisks: Risk[];
}> {
  // Use NLP to extract key terms from option description
  const keyTerms = await nlpExtractKeyTerms(optionData.description);
  
  // Match to capabilities
  const capabilities = await matchCapabilities(keyTerms, analysis.organizationId);
  
  // Match to applications
  const applications = await matchApplications(keyTerms, analysis.organizationId);
  
  // Match to technologies
  const technologies = await matchTechnologies(keyTerms, analysis.organizationId);
  
  // Auto-identify common risks based on option type and content
  const autoIdentifiedRisks = await identifyCommonRisks(
    optionData.optionType,
    keyTerms,
    capabilities,
    applications
  );
  
  return { capabilities, applications, technologies, autoIdentifiedRisks };
}
```

**Version Control**
```typescript
interface AnalysisVersion {
  versionNumber: number;
  createdAt: timestamp;
  createdBy: UserId;
  changeDescription: string;
  snapshot: string;  // Serialized state
  parentVersion: number;
}

async function createVersion(
  analysisId: string,
  changeDescription: string,
  userId: string
): Promise<AnalysisVersion> {
  const analysis = await getAnalysis(analysisId);
  
  const version: AnalysisVersion = {
    versionNumber: analysis.version + 1,
    createdAt: new Date(),
    createdBy: userId,
    changeDescription,
    snapshot: JSON.stringify(analysis),
    parentVersion: analysis.version
  };
  
  await db.analysisVersions.insert(version);
  await db.analyses.update(analysisId, { version: version.versionNumber });
  
  return version;
}

async function compareVersions(
  analysisId: string,
  version1: number,
  version2: number
): Promise<VersionDiff> {
  const v1 = await getAnalysisVersion(analysisId, version1);
  const v2 = await getAnalysisVersion(analysisId, version2);
  
  // Deep diff calculation
  const diff = calculateObjectDiff(
    JSON.parse(v1.snapshot),
    JSON.parse(v2.snapshot)
  );
  
  return {
    added: diff.added,
    modified: diff.modified,
    deleted: diff.deleted,
    summary: generateDiffSummary(diff)
  };
}
```

#### 1.2 Impact Analysis Engine

**Capability Impact Propagation**
```typescript
async function analyzeCapabilityImpacts(
  optionId: string,
  directlyAffectedCapabilityIds: string[]
): Promise<CapabilityImpact[]> {
  const option = await getOption(optionId);
  const analysis = await getAnalysis(option.analysisId);
  
  // Get capability model from ReqArchitect core
  const capabilityModel = await reqArchitectCore.getCapabilityModel(
    analysis.organizationId
  );
  
  // Start with directly affected capabilities
  const impacts: CapabilityImpact[] = directlyAffectedCapabilityIds.map(capId => {
    const capability = capabilityModel.findById(capId);
    return {
      capabilityId: capId,
      capabilityName: capability.name,
      currentMaturity: capability.currentMaturity,
      targetMaturity: capability.targetMaturity,
      postOptionMaturity: capability.currentMaturity, // To be updated
      degreeOfChange: 'moderate', // Default, to be refined
      impactDescription: '',
      effort: 0,
      owner: capability.owner
    };
  });
  
  // Propagate impacts through dependency graph
  const propagatedImpacts = await propagateImpactsThroughDependencies(
    impacts,
    capabilityModel
  );
  
  // Calculate effort estimates
  for (const impact of propagatedImpacts) {
    impact.effort = estimateCapabilityChangeEffort(impact);
  }
  
  return propagatedImpacts;
}

async function propagateImpactsThroughDependencies(
  directImpacts: CapabilityImpact[],
  capabilityModel: CapabilityModel
): Promise<CapabilityImpact[]> {
  const allImpacts = [...directImpacts];
  const processedIds = new Set(directImpacts.map(i => i.capabilityId));
  const queue = [...directImpacts];
  
  while (queue.length > 0) {
    const currentImpact = queue.shift();
    const capability = capabilityModel.findById(currentImpact.capabilityId);
    
    // Find dependent capabilities
    const dependents = capabilityModel.getDependents(capability.id);
    
    for (const dependent of dependents) {
      if (!processedIds.has(dependent.id)) {
        // Calculate downstream impact
        const downstreamImpact: CapabilityImpact = {
          capabilityId: dependent.id,
          capabilityName: dependent.name,
          currentMaturity: dependent.currentMaturity,
          targetMaturity: dependent.targetMaturity,
          postOptionMaturity: dependent.currentMaturity,
          degreeOfChange: calculateDownstreamImpact(
            currentImpact.degreeOfChange
          ),
          impactDescription: `Indirectly affected by changes to ${capability.name}`,
          effort: 0,
          owner: dependent.owner
        };
        
        allImpacts.push(downstreamImpact);
        processedIds.add(dependent.id);
        
        // Only propagate further if impact is significant
        if (downstreamImpact.degreeOfChange !== 'no_change') {
          queue.push(downstreamImpact);
        }
      }
    }
  }
  
  return allImpacts;
}

function calculateDownstreamImpact(upstreamImpact: DegreeOfChange): DegreeOfChange {
  // Decay function: downstream impacts are typically less severe
  const impactLevels = ['no_change', 'minor', 'moderate', 'major', 'transform'];
  const currentLevel = impactLevels.indexOf(upstreamImpact);
  const downstreamLevel = Math.max(0, currentLevel - 1);
  return impactLevels[downstreamLevel] as DegreeOfChange;
}
```

**Application Impact Analysis**
```typescript
async function analyzeApplicationImpacts(
  optionId: string
): Promise<ApplicationImpact[]> {
  const option = await getOption(optionId);
  const analysis = await getAnalysis(option.analysisId);
  
  // Get application portfolio from ReqArchitect core
  const appPortfolio = await reqArchitectCore.getApplicationPortfolio(
    analysis.organizationId
  );
  
  // Identify affected applications based on:
  // 1. Affected capabilities (apps supporting those capabilities)
  // 2. Affected technologies (apps using those technologies)
  // 3. Direct mentions in option description
  
  const impactedApps = new Set<Application>();
  
  // Via capabilities
  for (const capImpact of option.affectedCapabilities) {
    const appsForCap = appPortfolio.getApplicationsForCapability(
      capImpact.capabilityId
    );
    appsForCap.forEach(app => impactedApps.add(app));
  }
  
  // Via technologies
  for (const techImpact of option.affectedTechnologies) {
    const appsUsingTech = appPortfolio.getApplicationsUsingTechnology(
      techImpact.technologyId
    );
    appsUsingTech.forEach(app => impactedApps.add(app));
  }
  
  // Classify impact type for each application
  const impacts: ApplicationImpact[] = [];
  
  for (const app of impactedApps) {
    const impactType = determineApplicationImpactType(app, option);
    const effort = estimateApplicationChangeEffort(app, impactType);
    const cost = estimateApplicationChangeCost(app, impactType, effort);
    const risk = assessApplicationChangeRisk(app, impactType);
    
    impacts.push({
      applicationId: app.id,
      applicationName: app.name,
      impactType,
      description: generateImpactDescription(app, impactType, option),
      effort,
      cost,
      risk,
      dependencies: app.dependencies.map(d => d.id),
      owner: app.owner
    });
  }
  
  return impacts;
}

function determineApplicationImpactType(
  app: Application,
  option: Option
): ApplicationImpactType {
  // Logic to determine if app needs to be configured, modified, replaced, etc.
  // Based on: 
  // - Degree of capability change
  // - Technology changes required
  // - App age and technical debt
  // - Option type and approach
  
  // Simplified example:
  if (option.optionType === 'cloud_migration') {
    if (app.isCloudNative) return 'configure';
    if (app.canBeLiftedAndShifted) return 'modify';
    return 'replatform_or_replace';
  }
  
  // More sophisticated logic would go here...
  return 'modify';
}
```

### 2. MCDA Engine

#### 2.1 Scoring Calculator

**Score Normalization**
```typescript
function normalizeScore(
  rawValue: number | string | boolean,
  criterion: Criterion
): number {
  // Convert raw value to 0-100 scale based on criterion type
  
  if (criterion.evaluationType === 'quantitative') {
    const scale = criterion.scale as QuantitativeScale;
    
    if (scale.optimal === 'minimize') {
      // Lower is better (e.g., cost, risk)
      // Normalize: 100 at min, 0 at max
      const range = scale.max - scale.min;
      return Math.max(0, Math.min(100, 
        100 - ((rawValue as number - scale.min) / range * 100)
      ));
    } else if (scale.optimal === 'maximize') {
      // Higher is better (e.g., ROI, benefits)
      const range = scale.max - scale.min;
      return Math.max(0, Math.min(100,
        ((rawValue as number - scale.min) / range * 100)
      ));
    } else if (scale.optimal === 'target') {
      // Closest to target is best
      const distance = Math.abs((rawValue as number) - scale.targetValue);
      const maxDistance = Math.max(
        Math.abs(scale.max - scale.targetValue),
        Math.abs(scale.min - scale.targetValue)
      );
      return Math.max(0, 100 - (distance / maxDistance * 100));
    }
  } else if (criterion.evaluationType === 'qualitative') {
    // Qualitative scale (1-5)
    // Map to 0-100: 1=0, 2=25, 3=50, 4=75, 5=100
    const value = rawValue as number;
    return (value - 1) * 25;
  } else if (criterion.evaluationType === 'binary') {
    // Binary: true=100, false=0
    return rawValue ? 100 : 0;
  } else if (criterion.evaluationType === 'rag') {
    // RAG: Red=0, Amber=50, Green=100
    const ragMap = { 'red': 0, 'amber': 50, 'green': 100 };
    return ragMap[rawValue as string] || 50;
  }
  
  return 50; // Default to middle
}

async function calculateWeightedScore(
  score: CriterionScore,
  criterion: Criterion,
  category: CriterionCategory
): Promise<number> {
  // Weighted score = normalizedScore × criterionWeight × categoryWeight
  const weightedScore = score.normalizedScore * 
                        (criterion.weight / 100) * 
                        (category.weight / 100);
  
  return weightedScore;
}

async function calculateOptionTotalScore(
  optionId: string
): Promise<{ totalScore: number; categoryScores: CategoryScore[] }> {
  const option = await getOption(optionId);
  const analysis = await getAnalysis(option.analysisId);
  const framework = analysis.criteriaFramework;
  
  const categoryScores: CategoryScore[] = [];
  let totalScore = 0;
  
  for (const category of framework.categories) {
    let categoryScore = 0;
    
    for (const criterion of category.criteria) {
      const score = option.criterionScores.find(
        s => s.criterionId === criterion.id
      );
      
      if (score) {
        const weightedScore = await calculateWeightedScore(
          score,
          criterion,
          category
        );
        categoryScore += weightedScore;
      }
    }
    
    categoryScores.push({
      categoryId: category.id,
      categoryName: category.name,
      score: categoryScore,
      weight: category.weight
    });
    
    totalScore += categoryScore;
  }
  
  // Update option
  await db.options.update(optionId, { 
    totalScore,
    normalizedScore: totalScore // Already 0-100 due to normalization
  });
  
  return { totalScore, categoryScores };
}
```

#### 2.2 Sensitivity Analysis

**Weight Sensitivity Calculator**
```typescript
interface SensitivityResult {
  baselineRanking: OptionRanking[];
  weightVariations: WeightVariation[];
  stabilityScore: number;
  breakpoints: Breakpoint[];
}

interface OptionRanking {
  optionId: string;
  optionName: string;
  rank: number;
  score: number;
}

interface WeightVariation {
  criterionId: string;
  criterionName: string;
  originalWeight: number;
  testWeight: number;
  resultingRanking: OptionRanking[];
  rankingsChanged: boolean;
}

interface Breakpoint {
  criterionId: string;
  weight: number;
  description: string; // "Option A overtakes Option B when [criterion] weight reaches X%"
}

async function performSensitivityAnalysis(
  analysisId: string,
  criterionToVary?: string
): Promise<SensitivityResult> {
  const analysis = await getAnalysis(analysisId);
  const options = analysis.options;
  
  // Baseline ranking with current weights
  const baselineRanking = await calculateRankings(analysis);
  
  // Test variations
  const weightVariations: WeightVariation[] = [];
  const breakpoints: Breakpoint[] = [];
  
  // Get criteria to test (all or specific one)
  const criteriaToTest = criterionToVary 
    ? [findCriterion(analysis, criterionToVary)]
    : getAllCriteria(analysis.criteriaFramework);
  
  for (const criterion of criteriaToTest) {
    // Test weight variations: -20%, -10%, baseline, +10%, +20%
    const weightTests = [0.8, 0.9, 1.0, 1.1, 1.2];
    
    for (const multiplier of weightTests) {
      if (multiplier === 1.0) continue; // Skip baseline
      
      const testWeight = criterion.weight * multiplier;
      
      // Temporarily adjust weight and recalculate
      const tempAnalysis = cloneAnalysis(analysis);
      updateCriterionWeight(tempAnalysis, criterion.id, testWeight);
      
      const testRanking = await calculateRankings(tempAnalysis);
      const rankingsChanged = !areRankingsEqual(baselineRanking, testRanking);
      
      weightVariations.push({
        criterionId: criterion.id,
        criterionName: criterion.name,
        originalWeight: criterion.weight,
        testWeight,
        resultingRanking: testRanking,
        rankingsChanged
      });
      
      // Identify breakpoints (where rankings flip)
      if (rankingsChanged) {
        breakpoints.push(...identifyBreakpoints(
          criterion,
          baselineRanking,
          testRanking,
          testWeight
        ));
      }
    }
  }
  
  // Calculate stability score (0-100)
  // Higher score = rankings are more stable across weight changes
  const stabilityScore = calculateStabilityScore(weightVariations);
  
  return {
    baselineRanking,
    weightVariations,
    stabilityScore,
    breakpoints
  };
}

function calculateStabilityScore(variations: WeightVariation[]): number {
  // Percentage of weight variations that don't change rankings
  const unchangedCount = variations.filter(v => !v.rankingsChanged).length;
  return (unchangedCount / variations.length) * 100;
}
```

### 3. Financial Modeling Engine

#### 3.1 TCO Calculator

**Total Cost of Ownership Calculation**
```typescript
async function calculateTCO(optionId: string): Promise<FinancialMetrics> {
  const option = await getOption(optionId);
  const analysis = await getAnalysis(option.analysisId);
  const evaluationYears = analysis.evaluationPeriodYears;
  
  // Aggregate costs by category
  const costsByCategory = aggregateCostsByCategory(option.costs, evaluationYears);
  
  const totalCapEx = costsByCategory.capex.total;
  const totalOpEx = costsByCategory.opex.total;
  const totalTransitionalCosts = costsByCategory.transitional.total;
  const totalOpportunityCosts = costsByCategory.opportunity.total;
  
  const totalCostOfOwnership = totalCapEx + totalOpEx + 
                                totalTransitionalCosts + totalOpportunityCosts;
  
  // Calculate benefits
  const benefitsByCategory = aggregateBenefitsByCategory(
    option.benefits,
    evaluationYears
  );
  
  const totalHardSavings = benefitsByCategory.hardSavings.total;
  const totalSoftBenefits = benefitsByCategory.softBenefits.total;
  const totalBenefits = totalHardSavings + totalSoftBenefits;
  
  // Generate cash flow by period
  const cashFlowByPeriod = generateCashFlowTimeline(
    option.costs,
    option.benefits,
    evaluationYears,
    'month'
  );
  
  // Calculate NPV
  const netPresentValue = calculateNPV(
    cashFlowByPeriod,
    analysis.discountRate
  );
  
  // Calculate ROI
  const returnOnInvestment = ((totalBenefits - totalCostOfOwnership) / 
                               totalCostOfOwnership) * 100;
  
  // Calculate payback period
  const paybackPeriod = calculatePaybackPeriod(cashFlowByPeriod);
  
  // Calculate IRR
  const internalRateOfReturn = calculateIRR(cashFlowByPeriod);
  
  // Find break-even point
  const breakEvenPoint = findBreakEvenDate(cashFlowByPeriod);
  
  // Calculate cumulative cash flow
  const cumulativeCashFlow = calculateCumulativeCashFlow(cashFlowByPeriod);
  
  // Confidence and sensitivity
  const sensitivityRanges = calculateFinancialSensitivity(option, analysis);
  
  const financialMetrics: FinancialMetrics = {
    optionId,
    totalCapEx,
    totalOpEx,
    totalTransitionalCosts,
    totalOpportunityCosts,
    totalCostOfOwnership,
    totalHardSavings,
    totalSoftBenefits,
    totalBenefits,
    netPresentValue,
    returnOnInvestment,
    paybackPeriod,
    internalRateOfReturn,
    breakEvenPoint,
    cashFlowByPeriod,
    cumulativeCashFlow,
    confidenceLevel: calculateOverallConfidence(option),
    sensitivityRanges
  };
  
  // Save to option
  await db.options.update(optionId, { financialMetrics });
  
  return financialMetrics;
}

function aggregateCostsByCategory(
  costs: CostElement[],
  years: number
): CostAggregation {
  const aggregation = {
    capex: { total: 0, breakdown: {} },
    opex: { total: 0, breakdown: {} },
    transitional: { total: 0, breakdown: {} },
    opportunity: { total: 0, breakdown: {} }
  };
  
  const monthsInPeriod = years * 12;
  
  for (const cost of costs) {
    const categoryType = getCostCategoryType(cost.category);
    const totalCost = calculateTotalCostOverPeriod(cost, monthsInPeriod);
    
    aggregation[categoryType].total += totalCost;
    aggregation[categoryType].breakdown[cost.category] = 
      (aggregation[categoryType].breakdown[cost.category] || 0) + totalCost;
  }
  
  return aggregation;
}

function calculateTotalCostOverPeriod(
  cost: CostElement,
  periodMonths: number
): number {
  if (cost.frequency === 'one_time') {
    return cost.amount;
  }
  
  const startMonth = getMonthsSinceStart(cost.startDate);
  const endMonth = cost.endDate 
    ? Math.min(getMonthsSinceStart(cost.endDate), periodMonths)
    : periodMonths;
  
  const durationMonths = Math.max(0, endMonth - startMonth);
  
  if (cost.frequency === 'monthly') {
    return cost.amount * durationMonths;
  } else if (cost.frequency === 'quarterly') {
    return cost.amount * (durationMonths / 3);
  } else if (cost.frequency === 'annual') {
    return cost.amount * (durationMonths / 12);
  }
  
  return 0;
}

function calculateNPV(
  cashFlow: CashFlowPeriod[],
  discountRate: number
): number {
  let npv = 0;
  
  for (const period of cashFlow) {
    const periodYears = period.period / 12; // Assuming monthly periods
    const discountFactor = Math.pow(1 + discountRate, periodYears);
    const discountedCashFlow = period.netCashFlow / discountFactor;
    npv += discountedCashFlow;
  }
  
  return npv;
}

function calculateIRR(cashFlow: CashFlowPeriod[]): number {
  // Newton-Raphson method to find IRR
  // IRR is the rate where NPV = 0
  
  let irr = 0.1; // Initial guess
  const maxIterations = 100;
  const tolerance = 0.0001;
  
  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let npvDerivative = 0;
    
    for (const period of cashFlow) {
      const periodYears = period.period / 12;
      const discountFactor = Math.pow(1 + irr, periodYears);
      
      npv += period.netCashFlow / discountFactor;
      npvDerivative -= (period.netCashFlow * periodYears) / 
                       Math.pow(1 + irr, periodYears + 1);
    }
    
    if (Math.abs(npv) < tolerance) {
      break;
    }
    
    irr = irr - npv / npvDerivative;
  }
  
  return irr * 100; // Return as percentage
}

function calculatePaybackPeriod(cashFlow: CashFlowPeriod[]): number {
  let cumulativeCashFlow = 0;
  
  for (let i = 0; i < cashFlow.length; i++) {
    cumulativeCashFlow += cashFlow[i].netCashFlow;
    
    if (cumulativeCashFlow >= 0) {
      // Linear interpolation for more precise payback period
      if (i === 0) return 0;
      
      const previousCumulative = cumulativeCashFlow - cashFlow[i].netCashFlow;
      const fraction = Math.abs(previousCumulative) / 
                       Math.abs(cashFlow[i].netCashFlow);
      
      return i - 1 + fraction; // Return in periods (months)
    }
  }
  
  return -1; // Never breaks even
}
```

### 4. AI Assistant Implementation

#### 4.1 Gap Identification Engine

**AI-Powered Analysis Gaps**
```typescript
interface AnalysisGap {
  gapType: GapType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  recommendation: string;
  relatedElements: {
    options?: string[];
    criteria?: string[];
    risks?: string[];
  };
}

enum GapType {
  MissingScore = 'missing_score',
  MissingEvidence = 'missing_evidence',
  UnmitigatedRisk = 'unmitigated_risk',
  IncompleteImpactAnalysis = 'incomplete_impact_analysis',
  UnvalidatedAssumption = 'unvalidated_assumption',
  MissingPerspective = 'missing_perspective',
  InconsistentScoring = 'inconsistent_scoring',
  WeakEvidence = 'weak_evidence'
}

async function identifyAnalysisGaps(analysisId: string): Promise<AnalysisGap[]> {
  const analysis = await getFullAnalysis(analysisId);
  const gaps: AnalysisGap[] = [];
  
  // 1. Check for missing scores
  gaps.push(...identifyMissingScores(analysis));
  
  // 2. Check for criteria with weak or missing evidence
  gaps.push(...identifyWeakEvidence(analysis));
  
  // 3. Check for high risks without mitigation
  gaps.push(...identifyUnmitigatedRisks(analysis));
  
  // 4. Check for incomplete impact analysis
  gaps.push(...identifyIncompleteImpactAnalysis(analysis));
  
  // 5. Check for unvalidated high-impact assumptions
  gaps.push(...identifyUnvalidatedAssumptions(analysis));
  
  // 6. Check for scoring inconsistencies
  gaps.push(...identifyInconsistentScoring(analysis));
  
  // 7. Check for missing stakeholder perspectives
  gaps.push(...identifyMissingPerspectives(analysis));
  
  // Sort by severity
  gaps.sort((a, b) => {
    const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    return severityOrder[b.severity] - severityOrder[a.severity];
  });
  
  return gaps;
}

function identifyMissingScores(analysis: Analysis): AnalysisGap[] {
  const gaps: AnalysisGap[] = [];
  const mandatoryCriteria = getAllMandatoryCriteria(analysis.criteriaFramework);
  
  for (const option of analysis.options) {
    for (const criterion of mandatoryCriteria) {
      const score = option.criterionScores.find(
        s => s.criterionId === criterion.id
      );
      
      if (!score || score.rawValue === null || score.rawValue === undefined) {
        gaps.push({
          gapType: GapType.MissingScore,
          severity: 'high',
          description: `Option "${option.name}" missing score for mandatory criterion "${criterion.name}"`,
          recommendation: `Evaluate and score this criterion. ${criterion.evaluationGuidance}`,
          relatedElements: {
            options: [option.id],
            criteria: [criterion.id]
          }
        });
      }
    }
  }
  
  return gaps;
}

function identifyUnmitigatedRisks(analysis: Analysis): AnalysisGap[] {
  const gaps: AnalysisGap[] = [];
  
  for (const option of analysis.options) {
    const highRisks = option.risks.filter(
      r => (r.probability >= RiskProbability.High || r.impact >= RiskImpact.Major)
        && r.mitigationStrategy === null
    );
    
    for (const risk of highRisks) {
      gaps.push({
        gapType: GapType.UnmitigatedRisk,
        severity: risk.impact === RiskImpact.Severe ? 'critical' : 'high',
        description: `High-severity risk "${risk.title}" has no mitigation strategy`,
        recommendation: `Define mitigation strategy (Avoid, Reduce, Transfer, or Accept with justification)`,
        relatedElements: {
          options: [option.id],
          risks: [risk.id]
        }
      });
    }
  }
  
  return gaps;
}

function identifyInconsistentScoring(analysis: Analysis): AnalysisGap[] {
  const gaps: AnalysisGap[] = [];
  
  // Look for logical inconsistencies
  // Example: Option A has higher cost but scores higher on "Cost" criterion than Option B
  
  for (const criterion of getAllCriteria(analysis.criteriaFramework)) {
    if (criterion.name.toLowerCase().includes('cost')) {
      // Get all options' scores for this criterion
      const optionScores = analysis.options.map(opt => ({
        optionId: opt.id,
        optionName: opt.name,
        score: opt.criterionScores.find(s => s.criterionId === criterion.id),
        actualCost: opt.financialMetrics?.totalCostOfOwnership || 0
      }));
      
      // Check if scoring aligns with actual costs
      for (let i = 0; i < optionScores.length; i++) {
        for (let j = i + 1; j < optionScores.length; j++) {
          const opt1 = optionScores[i];
          const opt2 = optionScores[j];
          
          if (opt1.actualCost > opt2.actualCost && 
              opt1.score.normalizedScore > opt2.score.normalizedScore) {
            gaps.push({
              gapType: GapType.InconsistentScoring,
              severity: 'medium',
              description: `Inconsistency: Option "${opt1.optionName}" has higher cost ($${opt1.actualCost.toLocaleString()}) but scored higher (${opt1.score.normalizedScore}) than "${opt2.optionName}" ($${opt2.actualCost.toLocaleString()}, score: ${opt2.score.normalizedScore}) on cost criterion`,
              recommendation: `Review and verify the cost scoring. Consider if other cost factors (e.g., long-term savings) justify the higher score.`,
              relatedElements: {
                options: [opt1.optionId, opt2.optionId],
                criteria: [criterion.id]
              }
            });
          }
        }
      }
    }
  }
  
  return gaps;
}
```

#### 4.2 AI Recommendations Engine

**Pattern-Based Recommendations**
```typescript
interface AIRecommendation {
  recommendationType: RecommendationType;
  title: string;
  description: string;
  rationale: string;
  confidenceScore: number; // 0-100
  suggestedAction?: string;
  exampleOrganizations?: string[];
  relatedElements?: {
    options?: string[];
    criteria?: string[];
  };
}

enum RecommendationType {
  OptionVariant = 'option_variant',
  AdditionalCriterion = 'additional_criterion',
  RiskMitigation = 'risk_mitigation',
  BenchmarkComparison = 'benchmark_comparison',
  BestPractice = 'best_practice',
  Pitfall = 'pitfall'
}

async function generateAIRecommendations(
  analysisId: string
): Promise<AIRecommendation[]> {
  const analysis = await getFullAnalysis(analysisId);
  const recommendations: AIRecommendation[] = [];
  
  // 1. Suggest option variants based on analysis type
  recommendations.push(...await suggestOptionVariants(analysis));
  
  // 2. Recommend additional criteria based on industry/analysis type
  recommendations.push(...await suggestAdditionalCriteria(analysis));
  
  // 3. Identify potential pitfalls based on historical data
  recommendations.push(...await identifyPotentialPitfalls(analysis));
  
  // 4. Provide benchmark comparisons
  recommendations.push(...await provideBenchmarkInsights(analysis));
  
  // 5. Suggest best practices
  recommendations.push(...await suggestBestPractices(analysis));
  
  // Sort by confidence score
  recommendations.sort((a, b) => b.confidenceScore - a.confidenceScore);
  
  return recommendations;
}

async function suggestOptionVariants(
  analysis: Analysis
): Promise<AIRecommendation[]> {
  const recommendations: AIRecommendation[] = [];
  
  // Query knowledge base for similar analyses
  const similarAnalyses = await knowledgeBase.findSimilarAnalyses({
    analysisType: analysis.analysisType,
    industry: analysis.industry,
    organizationSize: analysis.organizationSize
  });
  
  // Find option patterns that were successful
  const successfulPatterns = similarAnalyses
    .filter(a => a.implementationSuccess === true)
    .map(a => a.selectedOption);
  
  // Identify patterns not present in current analysis
  const existingPatterns = new Set(analysis.options.map(o => o.optionType));
  
  for (const pattern of successfulPatterns) {
    if (!existingPatterns.has(pattern.optionType)) {
      recommendations.push({
        recommendationType: RecommendationType.OptionVariant,
        title: `Consider ${pattern.name} approach`,
        description: pattern.description,
        rationale: `This approach was successful in ${pattern.successCount} similar ${analysis.analysisType} projects. Organizations like ${pattern.exampleOrgs.join(', ')} chose this option with positive outcomes.`,
        confidenceScore: calculateConfidenceScore(pattern.successRate),
        suggestedAction: `Create new option: ${pattern.name}`,
        exampleOrganizations: pattern.exampleOrgs
      });
    }
  }
  
  return recommendations;
}

async function identifyPotentialPitfalls(
  analysis: Analysis
): Promise<AIRecommendation[]> {
  const recommendations: AIRecommendation[] = [];
  
  // Query for common failure patterns
  const failurePatterns = await knowledgeBase.getFailurePatterns({
    analysisType: analysis.analysisType
  });
  
  for (const pattern of failurePatterns) {
    // Check if this analysis exhibits warning signs
    const matchScore = calculatePatternMatch(analysis, pattern);
    
    if (matchScore > 0.6) {
      recommendations.push({
        recommendationType: RecommendationType.Pitfall,
        title: `Warning: ${pattern.name}`,
        description: pattern.description,
        rationale: `${pattern.occurrenceRate}% of similar projects that failed exhibited this pattern. ${pattern.commonCauses}`,
        confidenceScore: matchScore * 100,
        suggestedAction: pattern.preventionStrategy
      });
    }
  }
  
  return recommendations;
}
```

#### 4.3 Natural Language Query Interface

**NLP Query Processing**
```typescript
interface QueryIntent {
  intentType: IntentType;
  entities: Entity[];
  filters: QueryFilter[];
  requestedOutputFormat: 'table' | 'chart' | 'narrative' | 'data';
}

enum IntentType {
  CompareOptions = 'compare_options',
  FindBestOption = 'find_best_option',
  WhatIfScenario = 'what_if_scenario',
  ShowRisks = 'show_risks',
  ShowImpacts = 'show_impacts',
  ExplainScore = 'explain_score',
  SummarizeAnalysis = 'summarize_analysis'
}

interface Entity {
  entityType: 'option' | 'criterion' | 'risk' | 'capability' | 'metric';
  value: string;
  id?: string;
}

interface QueryFilter {
  field: string;
  operator: 'equals' | 'greater_than' | 'less_than' | 'contains';
  value: any;
}

async function processNaturalLanguageQuery(
  query: string,
  analysisId: string
): Promise<QueryResponse> {
  // 1. Parse intent and entities using NLP
  const intent = await parseQueryIntent(query);
  
  // 2. Resolve entities to analysis elements
  const resolvedEntities = await resolveEntities(intent.entities, analysisId);
  
  // 3. Execute query based on intent
  const result = await executeQuery(intent, resolvedEntities, analysisId);
  
  // 4. Format response
  const response = await formatQueryResponse(result, intent);
  
  return response;
}

async function parseQueryIntent(query: string): Promise<QueryIntent> {
  // Use LLM to parse query intent
  const prompt = `
Parse the following natural language query about an options analysis.
Identify the intent, entities, and any filters mentioned.

Query: "${query}"

Return JSON with:
- intentType: one of [compare_options, find_best_option, what_if_scenario, show_risks, show_impacts, explain_score, summarize_analysis]
- entities: array of {entityType, value} where entityType is [option, criterion, risk, capability, metric]
- filters: array of {field, operator, value}
- requestedOutputFormat: one of [table, chart, narrative, data]

Example query: "Which option has the best ROI but lowest risk?"
Example response: {
  "intentType": "find_best_option",
  "entities": [
    {"entityType": "metric", "value": "ROI"},
    {"entityType": "metric", "value": "risk"}
  ],
  "filters": [
    {"field": "ROI", "operator": "maximize"},
    {"field": "risk", "operator": "minimize"}
  ],
  "requestedOutputFormat": "narrative"
}
`;

  const llmResponse = await callLLM(prompt);
  return JSON.parse(llmResponse);
}

async function executeQuery(
  intent: QueryIntent,
  entities: ResolvedEntity[],
  analysisId: string
): Promise<QueryResult> {
  const analysis = await getFullAnalysis(analysisId);
  
  switch (intent.intentType) {
    case IntentType.FindBestOption:
      return findBestOption(analysis, intent.filters);
      
    case IntentType.CompareOptions:
      return compareOptions(analysis, entities);
      
    case IntentType.WhatIfScenario:
      return runWhatIfScenario(analysis, intent);
      
    case IntentType.ShowRisks:
      return showRisks(analysis, intent.filters);
      
    case IntentType.ExplainScore:
      return explainScore(analysis, entities);
      
    default:
      return { error: 'Unknown intent type' };
  }
}

async function formatQueryResponse(
  result: QueryResult,
  intent: QueryIntent
): Promise<QueryResponse> {
  // Generate natural language response
  const narrativeResponse = await generateNarrativeResponse(result, intent);
  
  // Generate visualization if requested
  let visualization = null;
  if (intent.requestedOutputFormat === 'chart') {
    visualization = await generateVisualization(result);
  }
  
  return {
    narrative: narrativeResponse,
    data: result,
    visualization,
    suggestedFollowUps: generateFollowUpQuestions(result, intent)
  };
}
```

### 5. Reporting & Visualization

#### 5.1 Report Generator

**Template-Based Report Generation**
```typescript
interface ReportTemplate {
  id: string;
  name: string;
  type: ReportType;
  sections: ReportSection[];
  outputFormats: OutputFormat[];
}

enum ReportType {
  ExecutiveSummary = 'executive_summary',
  DetailedBusinessCase = 'detailed_business_case',
  TechnicalComparison = 'technical_comparison',
  FinancialAnalysis = 'financial_analysis',
  RiskReport = 'risk_report',
  ImplementationRoadmap = 'implementation_roadmap'
}

enum OutputFormat {
  PDF = 'pdf',
  DOCX = 'docx',
  PPTX = 'pptx',
  HTML = 'html',
  Excel = 'excel'
}

interface ReportSection {
  sectionId: string;
  title: string;
  content: SectionContent;
  includeInTOC: boolean;
  pageBreakBefore: boolean;
}

type SectionContent = 
  | { type: 'text'; text: string }
  | { type: 'table'; tableData: TableData }
  | { type: 'chart'; chartConfig: ChartConfig }
  | { type: 'custom'; renderFunction: string };

async function generateReport(
  analysisId: string,
  templateId: string,
  outputFormat: OutputFormat,
  options?: ReportOptions
): Promise<ReportOutput> {
  // 1. Load template
  const template = await getReportTemplate(templateId);
  
  // 2. Load analysis data
  const analysis = await getFullAnalysis(analysisId);
  
  // 3. Render each section
  const renderedSections: RenderedSection[] = [];
  
  for (const section of template.sections) {
    const renderedContent = await renderSection(section, analysis, options);
    renderedSections.push({
      title: section.title,
      content: renderedContent
    });
  }
  
  // 4. Compile into output format
  const document = await compileDocument(
    renderedSections,
    template,
    outputFormat,
    options
  );
  
  // 5. Store and return
  const reportOutput: ReportOutput = {
    reportId: generateUUID(),
    analysisId,
    templateId,
    format: outputFormat,
    fileUrl: await storeDocument(document),
    generatedAt: new Date(),
    generatedBy: options?.userId
  };
  
  return reportOutput;
}

async function renderSection(
  section: ReportSection,
  analysis: Analysis,
  options?: ReportOptions
): Promise<string> {
  switch (section.content.type) {
    case 'text':
      return renderTextSection(section.content.text, analysis);
      
    case 'table':
      return renderTableSection(section.content.tableData, analysis);
      
    case 'chart':
      return renderChartSection(section.content.chartConfig, analysis);
      
    case 'custom':
      return evaluateCustomRenderer(section.content.renderFunction, analysis);
  }
}

async function renderTextSection(
  templateText: string,
  analysis: Analysis
): Promise<string> {
  // Replace placeholders with actual data
  // Example: {{analysis.name}}, {{recommendedOption.name}}, {{totalCost}}
  
  let renderedText = templateText;
  
  // Analysis-level placeholders
  renderedText = renderedText.replace(/\{\{analysis\.name\}\}/g, analysis.name);
  renderedText = renderedText.replace(/\{\{analysis\.owner\}\}/g, await getUserName(analysis.owner));
  
  // Option-level placeholders
  const recommendedOption = getRecommendedOption(analysis);
  if (recommendedOption) {
    renderedText = renderedText.replace(/\{\{recommendedOption\.name\}\}/g, recommendedOption.name);
    renderedText = renderedText.replace(/\{\{recommendedOption\.totalCost\}\}/g, 
      formatCurrency(recommendedOption.financialMetrics.totalCostOfOwnership));
    renderedText = renderedText.replace(/\{\{recommendedOption\.roi\}\}/g,
      recommendedOption.financialMetrics.returnOnInvestment.toFixed(1) + '%');
  }
  
  // Use AI for dynamic content generation where needed
  const aiGeneratedContent = await generateAISummaries(analysis);
  renderedText = replaceAIPlaceholders(renderedText, aiGeneratedContent);
  
  return renderedText;
}
```

#### 5.2 Visualization Engine

**Chart Generation**
```typescript
interface ChartConfig {
  chartType: ChartType;
  dataSource: DataSourceConfig;
  styling: ChartStyling;
  interactivity: InteractivityConfig;
}

enum ChartType {
  ComparisonMatrix = 'comparison_matrix',
  SpiderRadar = 'spider_radar',
  BarChart = 'bar_chart',
  ScatterPlot = 'scatter_plot',
  HeatMap = 'heat_map',
  GanttChart = 'gantt_chart',
  CashFlowCurve = 'cash_flow_curve',
  RiskHeatMap = 'risk_heat_map'
}

async function generateVisualization(
  analysisId: string,
  chartType: ChartType,
  config?: Partial<ChartConfig>
): Promise<ChartOutput> {
  const analysis = await getFullAnalysis(analysisId);
  
  // Get data for chart
  const data = await prepareChartData(analysis, chartType, config);
  
  // Generate chart using visualization library (e.g., D3, Chart.js)
  const chartSpec = await buildChartSpecification(data, chartType, config);
  
  // Render to multiple formats
  const outputs = {
    svg: await renderToSVG(chartSpec),
    png: await renderToPNG(chartSpec),
    interactive: await renderToInteractiveHTML(chartSpec)
  };
  
  return {
    chartType,
    data,
    outputs,
    config: chartSpec.config
  };
}

async function prepareChartData(
  analysis: Analysis,
  chartType: ChartType,
  config?: Partial<ChartConfig>
): Promise<ChartData> {
  switch (chartType) {
    case ChartType.ComparisonMatrix:
      return prepareComparisonMatrixData(analysis);
      
    case ChartType.SpiderRadar:
      return prepareSpiderRadarData(analysis, config);
      
    case ChartType.ScatterPlot:
      return prepareScatterPlotData(analysis, config);
      
    case ChartType.RiskHeatMap:
      return prepareRiskHeatMapData(analysis);
      
    case ChartType.CashFlowCurve:
      return prepareCashFlowData(analysis);
      
    default:
      throw new Error(`Unsupported chart type: ${chartType}`);
  }
}

function prepareComparisonMatrixData(analysis: Analysis): ChartData {
  // Create tabular data with options as columns, criteria as rows
  const criteria = getAllCriteria(analysis.criteriaFramework);
  
  const rows = criteria.map(criterion => {
    const row: any = {
      criterion: criterion.name,
      category: criterion.category.name,
      weight: criterion.weight
    };
    
    for (const option of analysis.options) {
      const score = option.criterionScores.find(s => s.criterionId === criterion.id);
      row[option.id] = score ? score.normalizedScore : null;
    }
    
    return row;
  });
  
  return {
    type: 'tabular',
    columns: [
      { id: 'criterion', label: 'Criterion' },
      { id: 'category', label: 'Category' },
      { id: 'weight', label: 'Weight' },
      ...analysis.options.map(opt => ({ id: opt.id, label: opt.name }))
    ],
    rows
  };
}

function prepareSpiderRadarData(
  analysis: Analysis,
  config?: Partial<ChartConfig>
): ChartData {
  // Create radar chart data with criteria categories as axes
  const categories = analysis.criteriaFramework.categories;
  
  const series = analysis.options.map(option => {
    const categoryScores = categories.map(category => {
      // Calculate average normalized score for this category
      const criteriaInCategory = category.criteria;
      const scores = criteriaInCategory.map(criterion => {
        const score = option.criterionScores.find(s => s.criterionId === criterion.id);
        return score ? score.normalizedScore : 0;
      });
      const avgScore = scores.reduce((sum, s) => sum + s, 0) / scores.length;
      return avgScore;
    });
    
    return {
      name: option.name,
      values: categoryScores
    };
  });
  
  return {
    type: 'radar',
    axes: categories.map(c => c.name),
    series
  };
}
```

---

## API Specifications

### REST API Endpoints

**Analysis Management**
```
POST   /api/v1/analyses                    # Create new analysis
GET    /api/v1/analyses                    # List analyses
GET    /api/v1/analyses/{id}               # Get analysis details
PUT    /api/v1/analyses/{id}               # Update analysis
DELETE /api/v1/analyses/{id}               # Delete analysis
GET    /api/v1/analyses/{id}/versions      # Get version history
POST   /api/v1/analyses/{id}/versions      # Create new version
GET    /api/v1/analyses/{id}/compare       # Compare versions
```

**Option Management**
```
POST   /api/v1/analyses/{id}/options              # Create option
GET    /api/v1/analyses/{id}/options              # List options
GET    /api/v1/analyses/{id}/options/{optionId}   # Get option
PUT    /api/v1/analyses/{id}/options/{optionId}   # Update option
DELETE /api/v1/analyses/{id}/options/{optionId}   # Delete option
POST   /api/v1/analyses/{id}/options/{optionId}/clone  # Clone option
```

**Scoring & Evaluation**
```
POST   /api/v1/analyses/{id}/options/{optionId}/scores  # Add/update score
GET    /api/v1/analyses/{id}/scores                     # Get all scores
POST   /api/v1/analyses/{id}/calculate                  # Recalculate all scores
GET    /api/v1/analyses/{id}/rankings                   # Get option rankings
POST   /api/v1/analyses/{id}/sensitivity                # Run sensitivity analysis
```

**Financial Analysis**
```
POST   /api/v1/analyses/{id}/options/{optionId}/costs     # Add cost
POST   /api/v1/analyses/{id}/options/{optionId}/benefits  # Add benefit
GET    /api/v1/analyses/{id}/options/{optionId}/financials # Get financial metrics
POST   /api/v1/analyses/{id}/options/{optionId}/financials/calculate # Calculate TCO/ROI
GET    /api/v1/analyses/{id}/options/{optionId}/cashflow  # Get cash flow
```

**Risk Management**
```
POST   /api/v1/analyses/{id}/options/{optionId}/risks     # Add risk
PUT    /api/v1/analyses/{id}/risks/{riskId}               # Update risk
POST   /api/v1/analyses/{id}/risks/{riskId}/mitigations   # Add mitigation
GET    /api/v1/analyses/{id}/risks                        # Get all risks
GET    /api/v1/analyses/{id}/risks/heatmap                # Get risk heatmap data
```

**AI Assistant**
```
GET    /api/v1/analyses/{id}/gaps              # Identify analysis gaps
GET    /api/v1/analyses/{id}/recommendations   # Get AI recommendations
POST   /api/v1/analyses/{id}/query             # Natural language query
POST   /api/v1/analyses/{id}/summarize         # Generate AI summary
```

**Reporting**
```
POST   /api/v1/analyses/{id}/reports           # Generate report
GET    /api/v1/analyses/{id}/reports           # List generated reports
GET    /api/v1/analyses/{id}/reports/{reportId} # Download report
GET    /api/v1/analyses/{id}/visualizations    # Get available charts
POST   /api/v1/analyses/{id}/visualizations    # Generate visualization
```

**Collaboration**
```
POST   /api/v1/analyses/{id}/comments          # Add comment
GET    /api/v1/analyses/{id}/comments          # Get comments
PUT    /api/v1/analyses/{id}/comments/{commentId} # Update comment
POST   /api/v1/analyses/{id}/tasks             # Create task
GET    /api/v1/analyses/{id}/tasks             # List tasks
PUT    /api/v1/analyses/{id}/tasks/{taskId}    # Update task
GET    /api/v1/analyses/{id}/activity          # Get activity feed
```

**Approval Workflow**
```
GET    /api/v1/analyses/{id}/workflow          # Get workflow status
POST   /api/v1/analyses/{id}/workflow/submit   # Submit for approval
POST   /api/v1/analyses/{id}/workflow/approve  # Approve current stage
POST   /api/v1/analyses/{id}/workflow/reject   # Reject with comments
```

---

## Database Schema

### Core Tables

**analyses**
```sql
CREATE TABLE analyses (
  id UUID PRIMARY KEY,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  analysis_type VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL,
  strategic_objective TEXT,
  owner_id UUID NOT NULL REFERENCES users(id),
  evaluation_period_years INTEGER DEFAULT 5,
  discount_rate DECIMAL(5,4) DEFAULT 0.10,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  decided_at TIMESTAMP,
  archived_at TIMESTAMP,
  INDEX idx_org_status (organization_id, status),
  INDEX idx_owner (owner_id),
  INDEX idx_created (created_at)
);
```

**options**
```sql
CREATE TABLE options (
  id UUID PRIMARY KEY,
  analysis_id UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  parent_option_id UUID REFERENCES options(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  approach TEXT,
  option_type VARCHAR(50),
  estimated_start_date DATE,
  estimated_duration INTEGER,
  budget_min DECIMAL(15,2),
  budget_max DECIMAL(15,2),
  budget_currency VARCHAR(3) DEFAULT 'USD',
  total_score DECIMAL(8,4),
  normalized_score DECIMAL(5,2),
  overall_risk_score DECIMAL(5,2),
  status VARCHAR(50) NOT NULL,
  owner_id UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  INDEX idx_analysis (analysis_id),
  INDEX idx_status (status),
  INDEX idx_score (total_score DESC)
);
```

**criteria_frameworks**
```sql
CREATE TABLE criteria_frameworks (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  is_template BOOLEAN DEFAULT false,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  INDEX idx_org_template (organization_id, is_template)
);
```

**criterion_categories**
```sql
CREATE TABLE criterion_categories (
  id UUID PRIMARY KEY,
  framework_id UUID NOT NULL REFERENCES criteria_frameworks(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  weight DECIMAL(5,2) NOT NULL,
  color VARCHAR(7),
  icon VARCHAR(50),
  display_order INTEGER NOT NULL,
  INDEX idx_framework (framework_id)
);
```

**criteria**
```sql
CREATE TABLE criteria (
  id UUID PRIMARY KEY,
  category_id UUID NOT NULL REFERENCES criterion_categories(id) ON DELETE CASCADE,
  parent_criterion_id UUID REFERENCES criteria(id),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  weight DECIMAL(5,2) NOT NULL,
  evaluation_type VARCHAR(20) NOT NULL,
  evaluation_guidance TEXT,
  unit VARCHAR(50),
  is_mandatory BOOLEAN DEFAULT false,
  allows_multiple_evaluators BOOLEAN DEFAULT false,
  display_order INTEGER NOT NULL,
  INDEX idx_category (category_id),
  INDEX idx_parent (parent_criterion_id)
);
```

**criterion_scores**
```sql
CREATE TABLE criterion_scores (
  id UUID PRIMARY KEY,
  option_id UUID NOT NULL REFERENCES options(id) ON DELETE CASCADE,
  criterion_id UUID NOT NULL REFERENCES criteria(id),
  raw_value JSONB NOT NULL,
  normalized_score DECIMAL(5,2) NOT NULL,
  weighted_score DECIMAL(8,4) NOT NULL,
  evaluator_id UUID NOT NULL REFERENCES users(id),
  evaluated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  confidence_level VARCHAR(20),
  rationale TEXT,
  data_source VARCHAR(255),
  is_reviewed BOOLEAN DEFAULT false,
  reviewed_by UUID REFERENCES users(id),
  review_comments TEXT,
  UNIQUE (option_id, criterion_id, evaluator_id),
  INDEX idx_option (option_id),
  INDEX idx_criterion (criterion_id)
);
```

**risks**
```sql
CREATE TABLE risks (
  id UUID PRIMARY KEY,
  option_id UUID REFERENCES options(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  sub_category VARCHAR(100),
  probability DECIMAL(3,2) NOT NULL,
  impact INTEGER NOT NULL CHECK (impact BETWEEN 1 AND 5),
  financial_impact DECIMAL(15,2),
  expected_monetary_value DECIMAL(15,2),
  risk_rating INTEGER NOT NULL,
  mitigation_strategy VARCHAR(50),
  mitigation_cost DECIMAL(15,2),
  mitigation_effectiveness INTEGER,
  residual_probability DECIMAL(3,2),
  residual_impact INTEGER,
  residual_emv DECIMAL(15,2),
  status VARCHAR(50) NOT NULL,
  risk_owner_id UUID REFERENCES users(id),
  identified_at TIMESTAMP NOT NULL DEFAULT NOW(),
  last_reviewed_at TIMESTAMP,
  review_frequency VARCHAR(20),
  INDEX idx_option (option_id),
  INDEX idx_org_category (organization_id, category),
  INDEX idx_risk_rating (risk_rating DESC)
);
```

**cost_elements**
```sql
CREATE TABLE cost_elements (
  id UUID PRIMARY KEY,
  option_id UUID NOT NULL REFERENCES options(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL,
  sub_category VARCHAR(100),
  description TEXT,
  amount DECIMAL(15,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  frequency VARCHAR(20) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  confidence_level VARCHAR(20),
  notes TEXT,
  data_source VARCHAR(255),
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  INDEX idx_option (option_id),
  INDEX idx_category (category)
);
```

**benefit_elements**
```sql
CREATE TABLE benefit_elements (
  id UUID PRIMARY KEY,
  option_id UUID NOT NULL REFERENCES options(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL,
  description TEXT,
  quantified_value DECIMAL(15,2) NOT NULL,
  value_type VARCHAR(20) NOT NULL,
  realization_start_date DATE NOT NULL,
  realization_curve VARCHAR(20) NOT NULL,
  confidence_level VARCHAR(20),
  measurement_approach TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  INDEX idx_option (option_id),
  INDEX idx_category (category)
);
```

**financial_metrics**
```sql
CREATE TABLE financial_metrics (
  id UUID PRIMARY KEY,
  option_id UUID NOT NULL REFERENCES options(id) ON DELETE CASCADE UNIQUE,
  total_capex DECIMAL(15,2),
  total_opex DECIMAL(15,2),
  total_transitional_costs DECIMAL(15,2),
  total_opportunity_costs DECIMAL(15,2),
  total_cost_of_ownership DECIMAL(15,2),
  total_hard_savings DECIMAL(15,2),
  total_soft_benefits DECIMAL(15,2),
  total_benefits DECIMAL(15,2),
  net_present_value DECIMAL(15,2),
  return_on_investment DECIMAL(8,4),
  payback_period DECIMAL(8,2),
  internal_rate_of_return DECIMAL(8,4),
  break_even_date DATE,
  confidence_level VARCHAR(20),
  calculated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  INDEX idx_option (option_id),
  INDEX idx_roi (return_on_investment DESC)
);
```

**evidence**
```sql
CREATE TABLE evidence (
  id UUID PRIMARY KEY,
  analysis_id UUID NOT NULL REFERENCES analyses(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  content TEXT,
  file_url VARCHAR(500),
  external_url VARCHAR(500),
  source VARCHAR(255),
  date_created DATE,
  reliability_rating VARCHAR(20),
  tags TEXT[],
  uploaded_by UUID NOT NULL REFERENCES users(id),
  uploaded_at TIMESTAMP NOT NULL DEFAULT NOW(),
  INDEX idx_analysis (analysis_id),
  INDEX idx_type (type),
  INDEX idx_tags USING GIN(tags)
);
```

**evidence_links**
```sql
CREATE TABLE evidence_links (
  evidence_id UUID NOT NULL REFERENCES evidence(id) ON DELETE CASCADE,
  linked_type VARCHAR(50) NOT NULL,
  linked_id UUID NOT NULL,
  PRIMARY KEY (evidence_id, linked_type, linked_id),
  INDEX idx_linked (linked_type, linked_id)
);
```

---

## Implementation Guidance

### Development Priorities (Phase 1 - MVP)

1. **Week 1-2: Foundation**
   - Database schema setup
   - Core data models (Analysis, Option, Criteria Framework)
   - Basic CRUD APIs
   - Authentication & authorization

2. **Week 3-4: Option Management**
   - Option creation with context-aware suggestions
   - Impact analysis (capabilities, applications)
   - Version control system

3. **Week 5-6: MCDA Engine**
   - Criteria framework management
   - Scoring interface and calculations
   - Weighted score aggregation
   - Comparison matrix visualization

4. **Week 7-8: Financial Modeling**
   - Cost and benefit entry
   - TCO calculation
   - ROI/NPV/Payback calculations
   - Cash flow visualization

5. **Week 9-10: Risk Management**
   - Risk identification and scoring
   - Risk matrix visualization
   - Basic mitigation tracking

6. **Week 11-12: Reporting**
   - Standard report templates
   - PDF/DOCX generation
   - Executive summary report
   - Integration with ReqArchitect core

7. **Week 13-14: Testing & Polish**
   - End-to-end testing
   - Performance optimization
   - UI/UX refinement
   - Documentation

8. **Week 15-16: Beta Launch**
   - Deploy to production
   - Onboard pilot customers
   - Gather feedback
   - Iterate

### Testing Strategy

**Unit Tests**
- All calculation functions (scoring, financial metrics, risk scores)
- Data validation and sanitization
- Permission checks

**Integration Tests**
- API endpoints
- Database operations
- ReqArchitect core integration
- File generation (PDF, DOCX)

**End-to-End Tests**
- Complete analysis workflows
- Multi-user collaboration scenarios
- Report generation pipelines

**Performance Tests**
- Large analysis handling (20 options, 100 criteria)
- Concurrent user load
- Report generation speed
- Complex query performance

### Security Considerations

**Data Protection**
- All sensitive data encrypted at rest (AES-256)
- TLS 1.3 for data in transit
- Row-level security for multi-tenancy
- Regular security audits

**Access Control**
- Role-based permissions (Viewer, Contributor, Owner, Admin)
- Fine-grained permissions on analyses
- Audit logging for all changes
- SSO integration (SAML, OIDC)

**Data Privacy**
- GDPR compliance (data retention, right to deletion)
- Data residency options for EU customers
- PII handling procedures
- Secure file storage

---

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Load Balancer                        │
└────────────────────┬───────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼────────┐      ┌────────▼────────┐
│  Web Server 1  │      │  Web Server 2   │
│  (Node.js)     │      │  (Node.js)      │
└───────┬────────┘      └────────┬────────┘
        │                         │
        └────────────┬────────────┘
                     │
        ┌────────────▼────────────┐
        │   Application Servers   │
        │   (Microservices)       │
        ├─────────────────────────┤
        │ - Options Service       │
        │ - MCDA Engine           │
        │ - Financial Service     │
        │ - Risk Service          │
        │ - AI Assistant          │
        │ - Report Generator      │
        └────────────┬────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────▼────────┐      ┌────────▼────────┐
│   PostgreSQL   │      │     Redis       │
│   (Primary)    │      │     (Cache)     │
└───────┬────────┘      └─────────────────┘
        │
┌───────▼────────┐
│   PostgreSQL   │
│   (Replica)    │
└────────────────┘

Additional Services:
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│  File Storage  │  │  Message Queue │  │   AI Service   │
│   (S3/MinIO)   │  │   (RabbitMQ)   │  │  (OpenAI API)  │
└────────────────┘  └────────────────┘  └────────────────┘
```

---

## Monitoring & Observability

**Key Metrics to Track**
- Analysis creation rate
- Average time to complete analysis
- Report generation success rate
- API response times (p50, p95, p99)
- Error rates by endpoint
- User engagement metrics (DAU, WAU, MAU)

**Logging Strategy**
- Structured logging (JSON format)
- Log levels: DEBUG, INFO, WARN, ERROR
- Correlation IDs for request tracing
- Sensitive data masking in logs

**Alerting Thresholds**
- Error rate > 1%
- API response time p95 > 2 seconds
- Database CPU > 80%
- Disk usage > 85%
- Failed report generation > 5% of attempts

---

## Documentation Requirements

**Developer Documentation**
- API reference (OpenAPI/Swagger spec)
- Data model documentation
- Setup and deployment guides
- Contributing guidelines

**User Documentation**
- User guide with screenshots
- Video tutorials
- FAQ section
- Best practices guide

**Admin Documentation**
- Configuration guide
- Backup and recovery procedures
- Troubleshooting guide
- Monitoring setup

---

## Success Criteria Summary

**Technical Success**
- All P0 requirements implemented and tested
- < 2s page load times
- 99.5% uptime
- Zero critical security vulnerabilities

**Product Success**
- 50+ analyses created in first 3 months
- 80% analysis completion rate
- 70% weekly active usage among pilot customers
- NPS > 40

**Business Success**
- 30-40% price uplift for Enterprise tier
- 20% increase in ACV
- 15% reduction in churn for users of module

---

**END OF LLM-OPTIMIZED PRD**

This document provides comprehensive implementation guidance for AI code assistants and development teams. All technical specifications, data models, algorithms, and workflows are detailed to enable direct implementation without additional clarification.

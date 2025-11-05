-- CreateEnum
CREATE TYPE "ActionType" AS ENUM ('create', 'update', 'delete');

-- CreateEnum
CREATE TYPE "ActorType" AS ENUM ('system', 'member', 'api');

-- CreateEnum
CREATE TYPE "ContactRecord" AS ENUM ('person', 'company');

-- CreateEnum
CREATE TYPE "ContactStage" AS ENUM ('lead', 'qualified', 'opportunity', 'proposal', 'inNegotiation', 'lost', 'won');

-- CreateEnum
CREATE TYPE "ContactTaskStatus" AS ENUM ('open', 'completed');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday');

-- CreateEnum
CREATE TYPE "FeedbackCategory" AS ENUM ('suggestion', 'problem', 'question');

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('pending', 'accepted', 'revoked');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('member', 'admin');

-- CreateEnum
CREATE TYPE "WebhookTrigger" AS ENUM ('contactCreated', 'contactUpdated', 'contactDeleted');

-- CreateEnum
CREATE TYPE "ApplicationComponentStatus" AS ENUM ('planned', 'development', 'testing', 'deployed', 'deprecated', 'retired');

-- CreateEnum
CREATE TYPE "ApplicationComponentType" AS ENUM ('service', 'microservice', 'module', 'library', 'framework', 'plugin', 'custom');

-- CreateEnum
CREATE TYPE "ApplicationEventType" AS ENUM ('user_action', 'system_event', 'business_event', 'error_event', 'lifecycle', 'custom');

-- CreateEnum
CREATE TYPE "ApplicationInterfaceType" AS ENUM ('api', 'ui', 'cli', 'webhook', 'protocol', 'custom');

-- CreateEnum
CREATE TYPE "ApplicationServiceType" AS ENUM ('rest_api', 'graphql', 'web_service', 'message_queue', 'event_stream', 'database', 'custom');

-- CreateEnum
CREATE TYPE "Criticality" AS ENUM ('mission_critical', 'important', 'standard', 'non_critical');

-- CreateEnum
CREATE TYPE "DataClassification" AS ENUM ('public', 'internal', 'confidential', 'restricted', 'pii');

-- CreateEnum
CREATE TYPE "HostingModel" AS ENUM ('on_premises', 'cloud_aws', 'cloud_azure', 'cloud_gcp', 'hybrid', 'saas', 'paas', 'iaas', 'containerized');

-- CreateEnum
CREATE TYPE "BusinessActorType" AS ENUM ('individual', 'team', 'department', 'external', 'system');

-- CreateEnum
CREATE TYPE "BusinessObjectState" AS ENUM ('draft', 'active', 'inactive', 'archived', 'deprecated');

-- CreateEnum
CREATE TYPE "BusinessProcessMaturity" AS ENUM ('initial', 'managed', 'defined', 'quantitative', 'optimizing');

-- CreateEnum
CREATE TYPE "BusinessRoleLevel" AS ENUM ('executive', 'manager', 'supervisor', 'specialist', 'analyst', 'operator');

-- CreateEnum
CREATE TYPE "BusinessServiceType" AS ENUM ('core', 'support', 'shared', 'external', 'digital');

-- CreateEnum
CREATE TYPE "ResourceType" AS ENUM ('human', 'financial', 'technical', 'physical', 'information');

-- CreateEnum
CREATE TYPE "DriverType" AS ENUM ('business', 'technology', 'legal', 'market', 'customer');

-- CreateEnum
CREATE TYPE "GroupingType" AS ENUM ('logical', 'organizational', 'functional', 'geographic', 'temporal', 'security', 'category', 'collection', 'custom');

-- CreateEnum
CREATE TYPE "ResourceCategory" AS ENUM ('internal', 'external', 'shared', 'dedicated');

-- CreateEnum
CREATE TYPE "ValueStreamType" AS ENUM ('operational', 'customer', 'support', 'management');

-- CreateEnum
CREATE TYPE "FrameworkImplementationStatus" AS ENUM ('PLANNING', 'IN_PROGRESS', 'IMPLEMENTED', 'OPTIMIZING', 'RETIRED');

-- CreateEnum
CREATE TYPE "COBITMaturityLevel" AS ENUM ('INCOMPLETE', 'PERFORMED', 'MANAGED', 'ESTABLISHED', 'PREDICTABLE', 'OPTIMIZING');

-- CreateEnum
CREATE TYPE "PCFStandardizationLevel" AS ENUM ('BASIC', 'INTERMEDIATE', 'ADVANCED', 'OPTIMIZED');

-- CreateEnum
CREATE TYPE "ProductLifecycleStage" AS ENUM ('concept', 'development', 'launch', 'growth', 'maturity', 'decline', 'discontinue');

-- CreateEnum
CREATE TYPE "OpportunityStage" AS ENUM ('NEW', 'QUALIFICATION', 'DISCOVERY', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST');

-- CreateEnum
CREATE TYPE "OpportunityStatus" AS ENUM ('OPEN', 'WON', 'LOST', 'ABANDONED');

-- CreateEnum
CREATE TYPE "OpportunitySource" AS ENUM ('WEBSITE', 'REFERRAL', 'COLD_CALL', 'INBOUND', 'PARTNER', 'EVENT', 'CAMPAIGN', 'OTHER');

-- CreateEnum
CREATE TYPE "OpportunityType" AS ENUM ('NEW_BUSINESS', 'EXISTING_CUSTOMER', 'RENEWAL', 'UPSELL', 'CROSS_SELL');

-- CreateEnum
CREATE TYPE "LossReason" AS ENUM ('PRICE', 'COMPETITOR', 'NO_BUDGET', 'NO_DECISION', 'TIMING', 'FEATURES', 'RELATIONSHIP', 'OTHER');

-- CreateEnum
CREATE TYPE "AssessmentStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'APPROVED', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "AssessmentType" AS ENUM ('swot', 'risk', 'pestle', 'capability', 'maturity');

-- CreateEnum
CREATE TYPE "ComplianceStatus" AS ENUM ('pending', 'in_progress', 'completed', 'failed', 'remediated');

-- CreateEnum
CREATE TYPE "SecurityFrameworkType" AS ENUM ('NIST_CSF', 'NIST_800_53', 'ISO_27001', 'CIS_CONTROLS', 'SOC2', 'PCI_DSS', 'HIPAA', 'GDPR', 'CCPA', 'FEDRAMP', 'CMMC', 'COBIT');

-- CreateEnum
CREATE TYPE "FrameworkVersion" AS ENUM ('CSF_1_1', 'CSF_2_0', 'SP_800_53_R5', 'SP_800_171_R2', 'ISO_27001_2022', 'CIS_V8', 'SOC2_2017', 'PCI_DSS_4_0', 'HIPAA_2013', 'GDPR_2018', 'CCPA_2020', 'FEDRAMP_HIGH', 'CMMC_2_0', 'COBIT_2019');

-- CreateEnum
CREATE TYPE "ImplementationStatus" AS ENUM ('NOT_STARTED', 'PLANNING', 'IMPLEMENTING', 'OPERATIONAL', 'OPTIMIZING');

-- CreateEnum
CREATE TYPE "MaturityLevel" AS ENUM ('PARTIAL', 'RISK_INFORMED', 'REPEATABLE', 'ADAPTIVE');

-- CreateEnum
CREATE TYPE "ControlFamily" AS ENUM ('AC', 'AU', 'AT', 'CM', 'CP', 'IA', 'IR', 'MA', 'MP', 'PS', 'PE', 'PL', 'PM', 'RA', 'CA', 'SC', 'SI', 'SA', 'SR');

-- CreateEnum
CREATE TYPE "NISTFunction" AS ENUM ('GV', 'ID', 'PR', 'DE', 'RS', 'RC');

-- CreateEnum
CREATE TYPE "ImplementationLevel" AS ENUM ('NOT_IMPLEMENTED', 'PARTIALLY_IMPLEMENTED', 'LARGELY_IMPLEMENTED', 'FULLY_IMPLEMENTED');

-- CreateEnum
CREATE TYPE "SecurityTaskPriority" AS ENUM ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "AssessmentMethodology" AS ENUM ('SELF_ASSESSMENT', 'INTERNAL_AUDIT', 'EXTERNAL_AUDIT', 'THIRD_PARTY_ASSESSMENT', 'AUTOMATED_ASSESSMENT');

-- CreateEnum
CREATE TYPE "EvidenceType" AS ENUM ('POLICY', 'PROCEDURE', 'SCREENSHOT', 'CONFIGURATION', 'LOG_FILE', 'CERTIFICATE', 'REPORT', 'INTERVIEW_NOTES');

-- CreateEnum
CREATE TYPE "SecurityTaskStatus" AS ENUM ('TODO', 'IN_PROGRESS', 'REVIEW', 'DONE', 'CANCELLED');

-- CreateEnum
CREATE TYPE "SecurityTaskCategory" AS ENUM ('GOVERNANCE', 'IDENTIFY', 'PROTECT', 'DETECT', 'RESPOND', 'RECOVER');

-- CreateEnum
CREATE TYPE "FindingSeverity" AS ENUM ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFORMATIONAL');

-- CreateEnum
CREATE TYPE "FindingStatus" AS ENUM ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'ACCEPTED_RISK', 'FALSE_POSITIVE');

-- CreateEnum
CREATE TYPE "BudgetStatus" AS ENUM ('active', 'paused', 'exceeded', 'expired');

-- CreateEnum
CREATE TYPE "TestOutcome" AS ENUM ('SATISFIED', 'OTHER_THAN_SATISFIED', 'NOT_APPLICABLE', 'NOT_TESTED');

-- CreateEnum
CREATE TYPE "TestMethod" AS ENUM ('EXAMINE', 'INTERVIEW', 'TEST', 'AUTOMATED_SCAN', 'PENETRATION_TEST', 'COMPLIANCE_AUDIT');

-- CreateEnum
CREATE TYPE "IncidentSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "IncidentPriority" AS ENUM ('P1', 'P2', 'P3', 'P4');

-- CreateEnum
CREATE TYPE "IncidentStatus" AS ENUM ('OPEN', 'INVESTIGATING', 'IDENTIFIED', 'RESOLVING', 'RESOLVED', 'CLOSED');

-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AlertType" AS ENUM ('THRESHOLD', 'ANOMALY', 'HEALTH_CHECK', 'PERFORMANCE', 'AVAILABILITY', 'SECURITY');

-- CreateEnum
CREATE TYPE "AlertSeverity" AS ENUM ('INFO', 'WARNING', 'CRITICAL', 'EMERGENCY');

-- CreateEnum
CREATE TYPE "AlertStatus" AS ENUM ('ACTIVE', 'ACKNOWLEDGED', 'RESOLVED', 'SUPPRESSED');

-- CreateEnum
CREATE TYPE "SLAStatus" AS ENUM ('DRAFT', 'ACTIVE', 'EXPIRED', 'TERMINATED', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "LocationType" AS ENUM ('physical', 'virtual', 'geographic', 'facility', 'building', 'room', 'datacenter', 'cloudRegion', 'office', 'custom');

-- CreateEnum
CREATE TYPE "RetentionUnit" AS ENUM ('days', 'weeks', 'months', 'years');

-- CreateEnum
CREATE TYPE "RetentionAction" AS ENUM ('archive', 'delete', 'notify');

-- CreateEnum
CREATE TYPE "COBITDomain" AS ENUM ('EDM', 'APO', 'BAI', 'DSS', 'MEA');

-- CreateEnum
CREATE TYPE "COBITProcessMaturity" AS ENUM ('INCOMPLETE', 'PERFORMED', 'MANAGED', 'ESTABLISHED', 'PREDICTABLE', 'OPTIMIZING');

-- CreateEnum
CREATE TYPE "ProcessImplementationStatus" AS ENUM ('NOT_STARTED', 'PLANNING', 'IN_PROGRESS', 'IMPLEMENTED', 'OPTIMIZING');

-- CreateEnum
CREATE TYPE "FrameworkPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "PCFProcessLevel" AS ENUM ('LEVEL_1', 'LEVEL_2', 'LEVEL_3', 'LEVEL_4');

-- CreateEnum
CREATE TYPE "PCFProcessCategory" AS ENUM ('VISION_STRATEGY', 'PRODUCTS_SERVICES', 'MARKETING_SALES', 'DELIVERY', 'CUSTOMER_SERVICE', 'HUMAN_CAPITAL', 'INFORMATION_TECHNOLOGY', 'FINANCIAL_RESOURCES', 'ASSETS', 'GOVERNANCE', 'EXTERNAL_RELATIONSHIPS', 'BUSINESS_CAPABILITIES');

-- CreateEnum
CREATE TYPE "PCFProcessStandardization" AS ENUM ('UNDEFINED', 'BASIC', 'STANDARDIZED', 'OPTIMIZED', 'BENCHMARKED');

-- CreateEnum
CREATE TYPE "ProcessAutomationLevel" AS ENUM ('MANUAL', 'SEMI_AUTOMATED', 'AUTOMATED', 'INTELLIGENT');

-- CreateEnum
CREATE TYPE "CaseFrameworkRelation" AS ENUM ('SUPPORTS', 'ENABLES', 'REQUIRES', 'VALIDATES', 'IMPLEMENTS');

-- CreateEnum
CREATE TYPE "CaseProcessRelation" AS ENUM ('IMPLEMENTS', 'IMPROVES', 'STANDARDIZES', 'AUTOMATES', 'OPTIMIZES');

-- CreateEnum
CREATE TYPE "ImpactLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'TRANSFORMATIONAL');

-- CreateEnum
CREATE TYPE "ActivityTypeOpp" AS ENUM ('CALL', 'EMAIL', 'MEETING', 'DEMO', 'PROPOSAL_SENT', 'CONTRACT_SENT', 'FOLLOW_UP', 'INTERNAL_NOTE');

-- CreateEnum
CREATE TYPE "JunctionType" AS ENUM ('and', 'or', 'xor', 'decision', 'merge', 'split', 'gateway', 'control', 'custom');

-- CreateEnum
CREATE TYPE "PlateauType" AS ENUM ('current', 'future', 'target', 'interim', 'baseline', 'milestone', 'transition', 'steadyState', 'custom');

-- CreateEnum
CREATE TYPE "AiProviderKeyStatus" AS ENUM ('active', 'inactive', 'expired', 'revoked');

-- CreateEnum
CREATE TYPE "AiProviderType" AS ENUM ('openai', 'anthropic', 'google', 'microsoft', 'aws', 'custom');

-- CreateEnum
CREATE TYPE "AiRunStatus" AS ENUM ('pending', 'running', 'completed', 'failed', 'cancelled');

-- CreateEnum
CREATE TYPE "AiRunType" AS ENUM ('evaluation', 'inference', 'training', 'fine_tuning', 'batch');

-- CreateEnum
CREATE TYPE "BudgetPeriod" AS ENUM ('daily', 'weekly', 'monthly', 'quarterly', 'yearly');

-- CreateEnum
CREATE TYPE "EvalResultStatus" AS ENUM ('pending', 'completed', 'failed', 'partial');

-- CreateEnum
CREATE TYPE "EvalTaskStatus" AS ENUM ('draft', 'active', 'completed', 'archived');

-- CreateEnum
CREATE TYPE "EvalTaskType" AS ENUM ('performance', 'accuracy', 'safety', 'cost', 'latency', 'compliance', 'custom');

-- CreateEnum
CREATE TYPE "CodegenJobStatus" AS ENUM ('pending', 'running', 'completed', 'failed', 'cancelled');

-- CreateEnum
CREATE TYPE "GeneratorCategory" AS ENUM ('backend', 'frontend', 'fullstack', 'mobile', 'infrastructure', 'testing', 'documentation', 'other');

-- CreateEnum
CREATE TYPE "RepositoryLinkType" AS ENUM ('documentation', 'source', 'generated', 'reference');

-- CreateEnum
CREATE TYPE "InitiativePriority" AS ENUM ('low', 'medium', 'high', 'critical');

-- CreateEnum
CREATE TYPE "InitiativeStatus" AS ENUM ('draft', 'planning', 'approved', 'inProgress', 'onHold', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "KpiType" AS ENUM ('revenue', 'cost', 'efficiency', 'quality', 'customer', 'employee', 'custom', 'risk', 'financial', 'operational', 'growth', 'innovation', 'sustainability');

-- CreateEnum
CREATE TYPE "BusinessCasePriority" AS ENUM ('low', 'medium', 'high', 'critical');

-- CreateEnum
CREATE TYPE "BusinessCaseStatus" AS ENUM ('draft', 'review', 'approved', 'rejected', 'onHold', 'completed', 'cancelled', 'archived');

-- CreateEnum
CREATE TYPE "PortfolioType" AS ENUM ('strategic', 'operational', 'tactical', 'innovation', 'transformation');

-- CreateEnum
CREATE TYPE "StrategyType" AS ENUM ('BUSINESS', 'CORPORATE', 'COMPETITIVE', 'FUNCTIONAL', 'OPERATIONAL', 'TECHNOLOGY', 'DIGITAL', 'INNOVATION', 'GROWTH', 'TRANSFORMATION');

-- CreateEnum
CREATE TYPE "StrategyLevel" AS ENUM ('CORPORATE', 'BUSINESS_UNIT', 'FUNCTIONAL', 'OPERATIONAL', 'TACTICAL');

-- CreateEnum
CREATE TYPE "StrategyPriority" AS ENUM ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "StrategyStatus" AS ENUM ('DRAFT', 'PLANNING', 'REVIEW', 'APPROVED', 'EXECUTING', 'ON_HOLD', 'COMPLETED', 'CANCELLED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ApprovalLevel" AS ENUM ('PENDING', 'DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'CONDITIONAL');

-- CreateEnum
CREATE TYPE "VisionStatus" AS ENUM ('DRAFT', 'REVIEW', 'APPROVED', 'ACTIVE', 'INACTIVE', 'ARCHIVED', 'SUPERSEDED');

-- CreateEnum
CREATE TYPE "VisionType" AS ENUM ('CORPORATE', 'DIVISIONAL', 'FUNCTIONAL', 'PRODUCT', 'TECHNOLOGY', 'CUSTOMER', 'SUSTAINABILITY', 'INNOVATION');

-- CreateEnum
CREATE TYPE "VisionScope" AS ENUM ('GLOBAL', 'ENTERPRISE', 'REGIONAL', 'DIVISIONAL', 'DEPARTMENTAL', 'TEAM');

-- CreateEnum
CREATE TYPE "MetricStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "MetricType" AS ENUM ('KPI', 'OKR', 'MEASURE', 'INDICATOR', 'BENCHMARK');

-- CreateEnum
CREATE TYPE "StrategyReviewType" AS ENUM ('MONTHLY', 'QUARTERLY', 'SEMI_ANNUAL', 'ANNUAL', 'AD_HOC', 'MILESTONE');

-- CreateEnum
CREATE TYPE "StakeholderInfluence" AS ENUM ('VERY_HIGH', 'HIGH', 'MEDIUM', 'LOW', 'VERY_LOW');

-- CreateEnum
CREATE TYPE "StakeholderInterest" AS ENUM ('VERY_HIGH', 'HIGH', 'MEDIUM', 'LOW', 'VERY_LOW');

-- CreateEnum
CREATE TYPE "StakeholderStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'DECLINED');

-- CreateEnum
CREATE TYPE "StakeholderType" AS ENUM ('internal', 'external', 'customer', 'supplier', 'partner', 'regulator');

-- CreateEnum
CREATE TYPE "StrategicGoalType" AS ENUM ('FINANCIAL', 'CUSTOMER', 'OPERATIONAL', 'LEARNING_GROWTH', 'MARKET', 'INNOVATION', 'SUSTAINABILITY', 'DIGITAL');

-- CreateEnum
CREATE TYPE "GoalStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'ON_TRACK', 'AT_RISK', 'DELAYED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "GoalPriority" AS ENUM ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "MilestoneStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'DELAYED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "GoalType" AS ENUM ('strategic', 'tactical', 'outcome', 'objective');

-- CreateEnum
CREATE TYPE "RiskCategory" AS ENUM ('STRATEGIC', 'OPERATIONAL', 'FINANCIAL', 'COMPLIANCE', 'TECHNICAL', 'REPUTATIONAL', 'ENVIRONMENTAL', 'SECURITY', 'VENDOR', 'MARKET');

-- CreateEnum
CREATE TYPE "RiskStatus" AS ENUM ('IDENTIFIED', 'ANALYZING', 'MONITORED', 'MITIGATED', 'ACCEPTED', 'CLOSED');

-- CreateEnum
CREATE TYPE "RiskType" AS ENUM ('THREAT', 'OPPORTUNITY', 'UNCERTAINTY', 'VULNERABILITY');

-- CreateEnum
CREATE TYPE "RiskAssessmentStatus" AS ENUM ('DRAFT', 'IN_PROGRESS', 'REVIEW', 'COMPLETED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "MitigationStrategy" AS ENUM ('AVOID', 'TRANSFER', 'MITIGATE', 'ACCEPT', 'MONITOR');

-- CreateEnum
CREATE TYPE "PolicyStatus" AS ENUM ('draft', 'review', 'approved', 'active', 'retired');

-- CreateEnum
CREATE TYPE "BusinessModelCanvasStatus" AS ENUM ('draft', 'review', 'approved', 'active', 'archived', 'inProgress');

-- CreateEnum
CREATE TYPE "BusinessModelCanvasSection" AS ENUM ('KEY_PARTNERS', 'KEY_ACTIVITIES', 'KEY_RESOURCES', 'VALUE_PROPOSITIONS', 'CUSTOMER_RELATIONSHIPS', 'CHANNELS', 'CUSTOMER_SEGMENTS', 'COST_STRUCTURE', 'REVENUE_STREAMS');

-- CreateEnum
CREATE TYPE "CanvasFrameworkRelation" AS ENUM ('INFORMS', 'CONSTRAINS', 'ENABLES', 'GOVERNS', 'SUPPORTS');

-- CreateEnum
CREATE TYPE "KpiFrequency" AS ENUM ('daily', 'weekly', 'monthly', 'quarterly', 'yearly', 'adhoc');

-- CreateEnum
CREATE TYPE "KpiStatus" AS ENUM ('active', 'inactive', 'draft', 'archived', 'paused', 'completed');

-- CreateEnum
CREATE TYPE "CapabilityCategory" AS ENUM ('core', 'supporting', 'enhancing');

-- CreateEnum
CREATE TYPE "CapabilityLevel" AS ENUM ('basic', 'intermediate', 'advanced', 'expert');

-- CreateEnum
CREATE TYPE "CourseOfActionStatus" AS ENUM ('planned', 'active', 'on_hold', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "RelationshipType" AS ENUM ('SUPPORTS', 'DEPENDS_ON', 'IMPLEMENTS', 'OWNS', 'CONTRIBUTES_TO', 'CONFLICTS_WITH', 'ENABLES', 'SERVES', 'REQUIRES', 'REALIZES', 'AGGREGATES', 'SPECIALIZES', 'FLOWS_TO', 'TRIGGERS', 'MITIGATES', 'VALIDATES', 'USES', 'ASSOCIATES');

-- CreateEnum
CREATE TYPE "RelationshipSource" AS ENUM ('MANUAL', 'AI_SUGGESTED', 'IMPORTED', 'INFERRED', 'MIGRATED');

-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('BUSINESS_ACTOR', 'BUSINESS_ROLE', 'BUSINESS_PROCESS', 'BUSINESS_SERVICE', 'CAPABILITY', 'VALUE_STREAM', 'APPLICATION_COMPONENT', 'APPLICATION_SERVICE', 'DATA_OBJECT', 'TECHNOLOGY_COMPONENT', 'NODE', 'DEVICE', 'GOAL', 'DRIVER', 'REQUIREMENT', 'INITIATIVE', 'PROJECT', 'CONTACT', 'RISK', 'POLICY', 'FEATURE', 'WORK_PACKAGE');

-- CreateEnum
CREATE TYPE "ArchiMateLayer" AS ENUM ('STRATEGY', 'BUSINESS', 'APPLICATION', 'TECHNOLOGY', 'PHYSICAL', 'MOTIVATION', 'IMPLEMENTATION_MIGRATION');

-- CreateEnum
CREATE TYPE "ArchiMateElementType" AS ENUM ('RESOURCE', 'CAPABILITY_ARCHIMATE', 'COURSE_OF_ACTION', 'BUSINESS_ACTOR', 'BUSINESS_ROLE', 'BUSINESS_COLLABORATION', 'BUSINESS_INTERFACE', 'BUSINESS_PROCESS', 'BUSINESS_FUNCTION', 'BUSINESS_INTERACTION', 'BUSINESS_EVENT', 'BUSINESS_SERVICE', 'BUSINESS_OBJECT', 'CONTRACT', 'REPRESENTATION', 'PRODUCT_ARCHIMATE', 'APPLICATION_COMPONENT', 'APPLICATION_COLLABORATION', 'APPLICATION_INTERFACE', 'APPLICATION_FUNCTION', 'APPLICATION_INTERACTION', 'APPLICATION_PROCESS', 'APPLICATION_EVENT', 'APPLICATION_SERVICE', 'DATA_OBJECT', 'NODE', 'DEVICE', 'SYSTEM_SOFTWARE', 'TECHNOLOGY_COLLABORATION', 'TECHNOLOGY_INTERFACE', 'PATH', 'COMMUNICATION_NETWORK', 'TECHNOLOGY_FUNCTION', 'TECHNOLOGY_PROCESS', 'TECHNOLOGY_INTERACTION', 'TECHNOLOGY_EVENT', 'TECHNOLOGY_SERVICE', 'ARTIFACT', 'EQUIPMENT', 'FACILITY', 'DISTRIBUTION_NETWORK', 'MATERIAL', 'STAKEHOLDER', 'DRIVER', 'ASSESSMENT', 'GOAL', 'OUTCOME_ARCHIMATE', 'PRINCIPLE', 'REQUIREMENT_ARCHIMATE', 'CONSTRAINT', 'MEANING', 'VALUE_ARCHIMATE', 'WORK_PACKAGE', 'DELIVERABLE_ARCHIMATE', 'IMPLEMENTATION_EVENT', 'PLATEAU', 'GAP');

-- CreateEnum
CREATE TYPE "ArchiMateRelationshipType" AS ENUM ('COMPOSITION', 'AGGREGATION', 'ASSIGNMENT', 'REALIZATION', 'SERVING', 'ACCESS', 'INFLUENCE', 'ASSOCIATION', 'TRIGGERING', 'FLOW', 'SPECIALIZATION', 'JUNCTION_AND', 'JUNCTION_OR');

-- CreateEnum
CREATE TYPE "DiagramType" AS ENUM ('ARCHIMATE', 'ERD', 'UML_CLASS', 'UML_SEQUENCE', 'UML_ACTIVITY', 'BPMN', 'C4_CONTEXT', 'C4_CONTAINER', 'C4_COMPONENT', 'C4_CODE', 'FLOWCHART', 'NETWORK');

-- CreateEnum
CREATE TYPE "DiagramNotation" AS ENUM ('ARCHIMATE_3_2', 'UML_2_5', 'BPMN_2_0', 'ERD', 'C4_MODEL', 'CUSTOM');

-- CreateEnum
CREATE TYPE "TOGAFPhaseType" AS ENUM ('PRELIMINARY', 'PHASE_A_ARCHITECTURE_VISION', 'PHASE_B_BUSINESS_ARCHITECTURE', 'PHASE_C_INFORMATION_SYSTEMS_ARCHITECTURE', 'PHASE_D_TECHNOLOGY_ARCHITECTURE', 'PHASE_E_OPPORTUNITIES_SOLUTIONS', 'PHASE_F_MIGRATION_PLANNING', 'PHASE_G_IMPLEMENTATION_GOVERNANCE', 'PHASE_H_ARCHITECTURE_CHANGE_MANAGEMENT', 'REQUIREMENTS_MANAGEMENT');

-- CreateEnum
CREATE TYPE "TOGAFDeliverableType" AS ENUM ('ARCHITECTURE_PRINCIPLES', 'ARCHITECTURE_FRAMEWORK', 'ARCHITECTURE_VISION', 'STAKEHOLDER_MAP', 'VALUE_PROPOSITIONS', 'BUSINESS_ARCHITECTURE', 'BUSINESS_CAPABILITY_MODEL', 'VALUE_STREAM_MAP', 'ORGANIZATION_MAP', 'DATA_ARCHITECTURE', 'APPLICATION_ARCHITECTURE', 'TECHNOLOGY_ARCHITECTURE', 'TECHNOLOGY_STANDARDS', 'ARCHITECTURE_ROADMAP', 'IMPLEMENTATION_FACTOR_ASSESSMENT', 'MIGRATION_PLAN', 'TRANSITION_ARCHITECTURE', 'IMPLEMENTATION_GOVERNANCE_MODEL', 'ARCHITECTURE_CONTRACT', 'CHANGE_REQUEST', 'ARCHITECTURE_UPDATES', 'REQUIREMENTS_IMPACT_ASSESSMENT');

-- CreateEnum
CREATE TYPE "TOGAFDeliverableStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'REVIEW', 'APPROVED', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "ConnectorType" AS ENUM ('SERVICENOW', 'JIRA', 'AZURE_AD', 'AZURE_DEVOPS', 'CONFLUENCE', 'SHAREPOINT', 'GITHUB', 'GITLAB', 'BITBUCKET', 'SLACK', 'TEAMS', 'SALESFORCE', 'SAP', 'ORACLE', 'CMDB', 'ITSM', 'REST_API', 'GRAPHQL_API', 'SOAP_API', 'DATABASE', 'FILE_SYSTEM', 'CSV_IMPORT', 'EXCEL_IMPORT', 'CUSTOM');

-- CreateEnum
CREATE TYPE "ConnectorStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ERROR', 'SYNCING', 'PENDING_SETUP', 'DISCONNECTED');

-- CreateEnum
CREATE TYPE "SyncStatus" AS ENUM ('IDLE', 'RUNNING', 'SUCCESS', 'FAILED', 'PARTIAL', 'CANCELLED');

-- CreateEnum
CREATE TYPE "DataMappingTransformType" AS ENUM ('DIRECT', 'LOOKUP', 'FORMULA', 'SCRIPT', 'AI_INFER');

-- CreateEnum
CREATE TYPE "CodeLanguage" AS ENUM ('TYPESCRIPT', 'JAVASCRIPT', 'PYTHON', 'JAVA', 'CSHARP', 'GO', 'RUST', 'RUBY', 'PHP', 'SQL');

-- CreateEnum
CREATE TYPE "CodeFramework" AS ENUM ('REACT', 'NEXTJS', 'ANGULAR', 'VUE', 'NESTJS', 'EXPRESS', 'DJANGO', 'FLASK', 'SPRING_BOOT', 'DOTNET_CORE', 'LARAVEL', 'RAILS');

-- CreateEnum
CREATE TYPE "GenerationStatus" AS ENUM ('PENDING', 'GENERATING', 'COMPLETED', 'FAILED', 'REVIEW_REQUIRED');

-- CreateEnum
CREATE TYPE "NotationType" AS ENUM ('ARCHIMATE_3_2', 'CHEN_ERD', 'CROWS_FOOT_ERD', 'UML_2_5', 'C4_MODEL', 'BPMN_2_0');

-- CreateEnum
CREATE TYPE "FrameworkSessionType" AS ENUM ('MARKETPLACE', 'ONBOARDING', 'DASHBOARD', 'SEARCH', 'RECOMMENDATION');

-- CreateEnum
CREATE TYPE "FrameworkEventType" AS ENUM ('FRAMEWORK_VIEWED', 'FRAMEWORK_DETAILS_OPENED', 'FRAMEWORK_SEARCHED', 'CATEGORY_BROWSED', 'FRAMEWORK_INSTALL_STARTED', 'FRAMEWORK_INSTALL_COMPLETED', 'FRAMEWORK_INSTALL_FAILED', 'BUNDLE_INSTALL_STARTED', 'BUNDLE_INSTALL_COMPLETED', 'FRAMEWORK_LAUNCHED', 'FRAMEWORK_CONFIGURED', 'TEMPLATE_USED', 'ASSESSMENT_STARTED', 'ASSESSMENT_COMPLETED', 'DOCUMENTATION_VIEWED', 'VIDEO_WATCHED', 'TUTORIAL_COMPLETED', 'HELP_REQUESTED', 'RECOMMENDATION_SHOWN', 'RECOMMENDATION_ACCEPTED', 'RECOMMENDATION_DISMISSED', 'FEEDBACK_PROVIDED');

-- CreateEnum
CREATE TYPE "FrameworkCategory" AS ENUM ('BUSINESS_STRATEGY', 'COMPETITIVE_ANALYSIS', 'STRATEGIC_PLANNING', 'BUSINESS_MODEL_DESIGN', 'VALUE_CREATION', 'GROWTH_SCALING', 'INNOVATION_MANAGEMENT', 'DIGITAL_TRANSFORMATION', 'DESIGN_THINKING', 'LEAN_STARTUP', 'ENTERPRISE_ARCHITECTURE', 'TECHNOLOGY_STRATEGY', 'IT_GOVERNANCE', 'SYSTEM_DESIGN', 'PRODUCT_STRATEGY', 'PRODUCT_MANAGEMENT', 'PROJECT_MANAGEMENT', 'AGILE_METHODOLOGIES', 'PORTFOLIO_MANAGEMENT', 'ORGANIZATIONAL_STRATEGY', 'CHANGE_MANAGEMENT', 'CULTURE_LEADERSHIP', 'TALENT_MANAGEMENT', 'OPERATIONAL_EXCELLENCE', 'PROCESS_MANAGEMENT', 'QUALITY_MANAGEMENT', 'LEAN_SIX_SIGMA', 'CUSTOMER_STRATEGY', 'CUSTOMER_EXPERIENCE', 'MARKETING_SALES', 'MARKET_ANALYSIS', 'DATA_STRATEGY', 'ANALYTICS_STRATEGY', 'DATA_GOVERNANCE', 'BUSINESS_INTELLIGENCE', 'RISK_MANAGEMENT', 'COMPLIANCE_GOVERNANCE', 'SECURITY_FRAMEWORKS', 'AUDIT_ASSURANCE', 'FINANCIAL_PLANNING', 'COST_MANAGEMENT', 'INVESTMENT_ANALYSIS', 'PERFORMANCE_MEASUREMENT', 'AI_STRATEGY', 'MACHINE_LEARNING', 'AUTOMATION_STRATEGY', 'EMERGING_TECH', 'HEALTHCARE_FRAMEWORKS', 'FINANCIAL_SERVICES', 'MANUFACTURING', 'TECHNOLOGY_FRAMEWORKS', 'MODERN_FRAMEWORKS', 'EXPERIMENTAL', 'RESEARCH_BASED');

-- CreateEnum
CREATE TYPE "FrameworkDomain" AS ENUM ('STRATEGIC', 'OPERATIONAL', 'TACTICAL', 'GOVERNANCE', 'TECHNICAL', 'BEHAVIORAL', 'ANALYTICAL', 'REGULATORY', 'INNOVATION', 'TRANSFORMATION');

-- CreateEnum
CREATE TYPE "FrameworkComplexity" AS ENUM ('VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "FrameworkRelationshipType" AS ENUM ('EXTENDS', 'SPECIALIZES', 'GENERALIZES', 'COMPLEMENTS', 'INTEGRATES_WITH', 'SUPPORTS', 'ENABLES', 'REQUIRES', 'DEPENDS_ON', 'PREREQUISITE', 'ALTERNATIVE_TO', 'COMPETES_WITH', 'REPLACES', 'PRECEDES', 'FOLLOWS', 'EVOLVES_INTO', 'MAPS_TO', 'OVERLAPS_WITH', 'CONFLICTS_WITH', 'USED_WITH', 'RECOMMENDED_WITH', 'COMBINES_WITH');

-- CreateEnum
CREATE TYPE "FrameworkMaturityLevel" AS ENUM ('INITIAL', 'DEVELOPING', 'DEFINED', 'MANAGED', 'OPTIMIZED');

-- CreateEnum
CREATE TYPE "FrameworkAssessmentType" AS ENUM ('MATURITY', 'CAPABILITY', 'READINESS', 'COMPLIANCE', 'EFFECTIVENESS', 'BENCHMARKING', 'GAP_ANALYSIS');

-- CreateEnum
CREATE TYPE "FrameworkTaskType" AS ENUM ('PLANNING', 'IMPLEMENTATION', 'ASSESSMENT', 'TRAINING', 'DOCUMENTATION', 'REVIEW', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "FrameworkTaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'BLOCKED', 'COMPLETED', 'CANCELLED', 'OVERDUE');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "FrameworkMilestoneType" AS ENUM ('PHASE_COMPLETION', 'ASSESSMENT_COMPLETE', 'TRAINING_COMPLETE', 'DOCUMENTATION_COMPLETE', 'GO_LIVE', 'REVIEW_COMPLETE', 'CERTIFICATION_ACHIEVED');

-- CreateEnum
CREATE TYPE "FrameworkMilestoneStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'DELAYED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AnalyticsPeriod" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'QUARTERLY', 'YEARLY');

-- CreateEnum
CREATE TYPE "RecommendationPriority" AS ENUM ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "RecommendationStatus" AS ENUM ('PENDING', 'VIEWED', 'ACCEPTED', 'REJECTED', 'DISMISSED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "RecommendationType" AS ENUM ('ONBOARDING', 'INDUSTRY_BASED', 'SIZE_BASED', 'COMPLIANCE_BASED', 'AI_GENERATED', 'SIMILAR_ORGANIZATIONS', 'TRENDING', 'SEASONAL');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_Account" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "description" VARCHAR(70) NOT NULL,
    "hashedKey" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_ApiKey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthenticatorApp" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountName" VARCHAR(255) NOT NULL,
    "issuer" VARCHAR(255) NOT NULL,
    "secret" VARCHAR(255) NOT NULL,
    "recoveryCodes" VARCHAR(1024) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_AuthenticatorApp" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChangeEmailRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_ChangeEmailRequest" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "record" "ContactRecord" NOT NULL DEFAULT 'person',
    "image" VARCHAR(2048),
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "address" VARCHAR(255),
    "phone" VARCHAR(32),
    "stage" "ContactStage" NOT NULL DEFAULT 'lead',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_Contact" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactActivity" (
    "id" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "actionType" "ActionType" NOT NULL,
    "actorId" VARCHAR(255) NOT NULL,
    "actorType" "ActorType" NOT NULL,
    "metadata" JSONB,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_ContactActivity" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactComment" (
    "id" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" VARCHAR(2000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_ContactComment" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactImage" (
    "id" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "data" BYTEA,
    "contentType" VARCHAR(255),
    "hash" VARCHAR(64),

    CONSTRAINT "PK_ContactImage" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactNote" (
    "id" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" VARCHAR(8000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_ContactNote" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactPageVisit" (
    "id" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "userId" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_ContactPageVisit" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactTag" (
    "id" TEXT NOT NULL,
    "text" VARCHAR(128) NOT NULL,

    CONSTRAINT "PK_ContactTag" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactTask" (
    "id" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(8000),
    "status" "ContactTaskStatus" NOT NULL DEFAULT 'open',
    "dueDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_ContactTask" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "contactId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "PK_Favorite" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT,
    "category" "FeedbackCategory" NOT NULL DEFAULT 'suggestion',
    "message" VARCHAR(4000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_Feedback" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'member',
    "status" "InvitationStatus" NOT NULL DEFAULT 'pending',
    "lastSentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_Invitation" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Membership" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'member',
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_Membership" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "subject" VARCHAR(128),
    "content" VARCHAR(8000) NOT NULL,
    "link" VARCHAR(2000),
    "seenAt" TIMESTAMP(3),
    "dismissed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_Notification" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "status" VARCHAR(64) NOT NULL,
    "provider" VARCHAR(32) NOT NULL,
    "totalAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "currency" VARCHAR(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_Order" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "priceAmount" DOUBLE PRECISION,
    "type" TEXT,
    "model" TEXT,

    CONSTRAINT "PK_OrderItem" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "billingCustomerId" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255),
    "phone" VARCHAR(32),
    "email" VARCHAR(255),
    "website" VARCHAR(2000),
    "facebookPage" VARCHAR(2000),
    "instagramProfile" VARCHAR(2000),
    "linkedInProfile" VARCHAR(2000),
    "tikTokProfile" VARCHAR(2000),
    "xProfile" VARCHAR(2000),
    "youTubeChannel" VARCHAR(2000),
    "logo" VARCHAR(2048),
    "slug" VARCHAR(255) NOT NULL,
    "billingCity" VARCHAR(255),
    "billingCountry" VARCHAR(3),
    "billingEmail" VARCHAR(255),
    "billingLine1" VARCHAR(255),
    "billingLine2" VARCHAR(255),
    "billingPostalCode" VARCHAR(16),
    "billingState" VARCHAR(255),
    "industry" VARCHAR(50),
    "companySize" VARCHAR(20),
    "useIndustryTemplate" BOOLEAN DEFAULT false,
    "selectedTemplateCategories" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "onboardingCompletedAt" TIMESTAMP(3),
    "welcomeTourCompleted" BOOLEAN NOT NULL DEFAULT false,
    "sector" VARCHAR(20),
    "primaryRegion" VARCHAR(50),
    "country" VARCHAR(3),
    "governanceMaturity" VARCHAR(20),
    "complianceRequirements" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "existingFrameworks" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "implementationTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "hasExistingPlatforms" BOOLEAN DEFAULT false,
    "hasDevelopmentTeam" BOOLEAN DEFAULT false,
    "dtSelectedTemplates" JSONB,
    "dtCurrentSystems" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "dtBusinessPriorities" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "dtImplementationApproach" VARCHAR(30),
    "dtBudgetRange" VARCHAR(20),
    "dtSkipped" BOOLEAN DEFAULT false,
    "devSelectedTemplate" JSONB,
    "devLanguage" VARCHAR(30),
    "devFramework" VARCHAR(50),
    "devIntegrationTargets" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "devDeploymentTarget" VARCHAR(30),
    "devCicdPreference" VARCHAR(30),
    "onboardingData" JSONB,
    "lastDashboardRefresh" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_Organization" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganizationLogo" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "data" BYTEA,
    "contentType" VARCHAR(255),
    "hash" VARCHAR(64),

    CONSTRAINT "PK_OrganizationLogo" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResetPasswordRequest" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_ResetPasswordRequest" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_Session" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "status" VARCHAR(64) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "provider" VARCHAR(32) NOT NULL,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "currency" VARCHAR(3) NOT NULL,
    "periodStartsAt" TIMESTAMPTZ(6) NOT NULL,
    "periodEndsAt" TIMESTAMPTZ(6) NOT NULL,
    "trialStartsAt" TIMESTAMPTZ(6),
    "trialEndsAt" TIMESTAMPTZ(6),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_Subscription" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionItem" (
    "id" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "priceAmount" DOUBLE PRECISION,
    "interval" TEXT NOT NULL,
    "intervalCount" INTEGER NOT NULL,
    "type" TEXT,
    "model" TEXT,

    CONSTRAINT "PK_SubscriptionItem" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "image" VARCHAR(2048),
    "name" VARCHAR(64) NOT NULL,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "password" VARCHAR(60),
    "lastLogin" TIMESTAMP(3),
    "phone" VARCHAR(32),
    "locale" VARCHAR(8) NOT NULL DEFAULT 'en-US',
    "completedOnboarding" BOOLEAN NOT NULL DEFAULT false,
    "enabledContactsNotifications" BOOLEAN NOT NULL DEFAULT false,
    "enabledInboxNotifications" BOOLEAN NOT NULL DEFAULT false,
    "enabledWeeklySummary" BOOLEAN NOT NULL DEFAULT false,
    "enabledNewsletter" BOOLEAN NOT NULL DEFAULT false,
    "enabledProductUpdates" BOOLEAN NOT NULL DEFAULT false,
    "lastDashboardVisit" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_User" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserImage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "data" BYTEA,
    "contentType" VARCHAR(255),
    "hash" VARCHAR(64),

    CONSTRAINT "PK_UserImage" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Webhook" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "url" VARCHAR(2000) NOT NULL,
    "triggers" "WebhookTrigger"[],
    "secret" VARCHAR(1024),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_Webhook" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkHours" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL DEFAULT 'sunday',

    CONSTRAINT "PK_WorkHours" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkTimeSlot" (
    "id" TEXT NOT NULL,
    "workHoursId" TEXT NOT NULL,
    "start" TIME(0) NOT NULL,
    "end" TIME(0) NOT NULL,

    CONSTRAINT "PK_WorkTimeSlot" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiProviderKey" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000),
    "provider" "AiProviderType" NOT NULL,
    "keyHash" VARCHAR(512) NOT NULL,
    "keyPreview" VARCHAR(20) NOT NULL,
    "status" "AiProviderKeyStatus" NOT NULL DEFAULT 'active',
    "capabilities" JSONB,
    "rateLimits" JSONB,
    "costPerUnit" DECIMAL(65,30),
    "currency" VARCHAR(3) DEFAULT 'USD',
    "expiresAt" TIMESTAMP(3),
    "lastUsedAt" TIMESTAMP(3),
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "totalCost" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "AiProviderKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiBudget" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "providerKeyId" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000),
    "period" "BudgetPeriod" NOT NULL DEFAULT 'monthly',
    "status" "BudgetStatus" NOT NULL DEFAULT 'active',
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "spentAmount" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "remainingAmount" DECIMAL(65,30) NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'USD',
    "alertThresholds" JSONB,
    "alertsEnabled" BOOLEAN NOT NULL DEFAULT true,
    "autoDisable" BOOLEAN NOT NULL DEFAULT false,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isRecurring" BOOLEAN NOT NULL DEFAULT true,
    "recurringConfig" JSONB,
    "usageBreakdown" JSONB,
    "lastResetAt" TIMESTAMP(3),
    "nextResetAt" TIMESTAMP(3),
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "AiBudget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiRun" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "providerKeyId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000),
    "type" "AiRunType" NOT NULL DEFAULT 'inference',
    "status" "AiRunStatus" NOT NULL DEFAULT 'pending',
    "model" VARCHAR(255) NOT NULL,
    "prompt" VARCHAR(10000),
    "inputTokens" INTEGER,
    "outputTokens" INTEGER,
    "totalTokens" INTEGER,
    "cost" DECIMAL(65,30),
    "duration" INTEGER,
    "requestPayload" JSONB,
    "responsePayload" JSONB,
    "errorMessage" VARCHAR(2000),
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "maxRetries" INTEGER NOT NULL DEFAULT 3,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "AiRun_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvalTask" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" "EvalTaskType" NOT NULL DEFAULT 'performance',
    "status" "EvalTaskStatus" NOT NULL DEFAULT 'draft',
    "criteria" JSONB NOT NULL,
    "testCases" JSONB,
    "expectedOutputs" JSONB,
    "evaluationConfig" JSONB,
    "schedule" JSONB,
    "isAutomated" BOOLEAN NOT NULL DEFAULT false,
    "runCount" INTEGER NOT NULL DEFAULT 0,
    "lastRunAt" TIMESTAMP(3),
    "nextRunAt" TIMESTAMP(3),
    "averageScore" DECIMAL(65,30),
    "passRate" DECIMAL(65,30),
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "EvalTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvalResult" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "runId" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000),
    "status" "EvalResultStatus" NOT NULL DEFAULT 'pending',
    "overallScore" DECIMAL(65,30),
    "maxScore" DECIMAL(65,30),
    "passThreshold" DECIMAL(65,30),
    "passed" BOOLEAN,
    "metrics" JSONB NOT NULL,
    "testCaseResults" JSONB,
    "analysisResults" JSONB,
    "recommendations" JSONB,
    "comparisonData" JSONB,
    "executionTime" INTEGER,
    "resourceUsage" JSONB,
    "errorDetails" JSONB,
    "artifacts" JSONB,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "EvalResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneratorPreset" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "category" "GeneratorCategory" NOT NULL,
    "technology" JSONB NOT NULL,
    "templates" JSONB NOT NULL,
    "configuration" JSONB NOT NULL DEFAULT '{}',
    "cicdBlueprint" JSONB,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "popularity" INTEGER NOT NULL DEFAULT 0,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "version" VARCHAR(50) NOT NULL DEFAULT '1.0.0',
    "examples" JSONB,
    "documentation" TEXT,
    "requirements" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "GeneratorPreset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CodegenJob" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "presetId" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "sourceModels" JSONB,
    "configuration" JSONB NOT NULL DEFAULT '{}',
    "status" "CodegenJobStatus" NOT NULL DEFAULT 'pending',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "executedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "duration" INTEGER,
    "errorMessage" TEXT,
    "logs" JSONB,
    "metrics" JSONB,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "CodegenJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artifact" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "codegenJobId" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'document',
    "category" VARCHAR(100) NOT NULL DEFAULT 'technical',
    "format" VARCHAR(100) NOT NULL DEFAULT 'digital',
    "mimeType" VARCHAR(255),
    "size" BIGINT,
    "version" VARCHAR(100),
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "location" VARCHAR(1000),
    "checksum" VARCHAR(255),
    "content" TEXT,
    "references" JSONB,
    "components" JSONB,
    "services" JSONB,
    "interfaces" JSONB,
    "authors" JSONB,
    "approvers" JSONB,
    "reviews" JSONB,
    "classifications" JSONB,
    "retention" JSONB,
    "access" JSONB,
    "backup" JSONB,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Artifact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepositoryLink" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "codegenJobId" TEXT,
    "artifactId" TEXT,
    "repositoryUrl" VARCHAR(1000) NOT NULL,
    "branch" VARCHAR(100),
    "path" VARCHAR(1000),
    "commitHash" VARCHAR(100),
    "pullRequestUrl" VARCHAR(1000),
    "linkType" "RepositoryLinkType" NOT NULL,
    "sourceModel" JSONB NOT NULL,
    "syncStatus" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "lastSyncAt" TIMESTAMP(3),
    "syncError" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "RepositoryLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SyncJob" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "integrationEndpointId" TEXT NOT NULL,
    "dataMappingId" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(50) NOT NULL DEFAULT 'full',
    "direction" VARCHAR(50) NOT NULL DEFAULT 'inbound',
    "schedule" JSONB,
    "triggers" JSONB,
    "configuration" JSONB,
    "filters" JSONB,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "progress" JSONB,
    "execution" JSONB,
    "statistics" JSONB,
    "errors" JSONB,
    "notifications" JSONB,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "SyncJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseOfAction" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "objective" VARCHAR(1000) NOT NULL,
    "strategy" VARCHAR(1000) NOT NULL,
    "scope" VARCHAR(1000),
    "timeline" JSONB,
    "resources" JSONB,
    "capabilities" JSONB,
    "risks" JSONB,
    "assumptions" JSONB,
    "constraints" JSONB,
    "successCriteria" JSONB,
    "alternatives" JSONB,
    "impact" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "feasibility" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "priority" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "status" "CourseOfActionStatus" NOT NULL DEFAULT 'planned',
    "outcomes" JSONB,
    "owner" VARCHAR(255),
    "stakeholders" JSONB,
    "approval" JSONB,
    "budget" DECIMAL(12,2),
    "actualCost" DECIMAL(12,2),
    "expectedBenefit" DECIMAL(12,2),
    "actualBenefit" DECIMAL(12,2),
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "actualStartDate" TIMESTAMP(3),
    "actualEndDate" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "CourseOfAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Capability" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "category" "CapabilityCategory",
    "level" "CapabilityLevel",
    "maturity" VARCHAR(100),
    "importance" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "currentState" VARCHAR(500),
    "desiredState" VARCHAR(500),
    "gap" VARCHAR(500),
    "owner" VARCHAR(255),
    "stakeholders" JSONB,
    "dependencies" JSONB,
    "risks" JSONB,
    "investments" JSONB,
    "roadmap" JSONB,
    "metrics" JSONB,
    "benchmarks" JSONB,
    "technologies" JSONB,
    "processes" JSONB,
    "people" JSONB,
    "governance" JSONB,
    "compliance" JSONB,
    "version" INTEGER NOT NULL DEFAULT 0,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Capability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Initiative" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255),
    "description" VARCHAR(2000),
    "vision" VARCHAR(1000),
    "mission" VARCHAR(1000),
    "objectives" JSONB,
    "scope" VARCHAR(1000),
    "assumptions" JSONB,
    "constraints" JSONB,
    "dependencies" JSONB,
    "risks" JSONB,
    "successCriteria" JSONB,
    "deliverables" JSONB,
    "timeline" JSONB,
    "milestones" JSONB,
    "resources" JSONB,
    "budget" JSONB,
    "financialProjections" JSONB,
    "costBenefitAnalysis" JSONB,
    "roi" DECIMAL(5,2),
    "npv" DECIMAL(12,2),
    "irr" DECIMAL(5,2),
    "paybackPeriod" INTEGER,
    "breakEvenPoint" JSONB,
    "sensitivityAnalysis" JSONB,
    "scenarioAnalysis" JSONB,
    "marketAnalysis" JSONB,
    "competitorAnalysis" JSONB,
    "swotAnalysis" JSONB,
    "stakeholderAnalysis" JSONB,
    "riskAssessment" JSONB,
    "complianceRequirements" JSONB,
    "governanceFramework" JSONB,
    "changeManagement" JSONB,
    "communicationPlan" JSONB,
    "trainingPlan" JSONB,
    "monitoringFramework" JSONB,
    "evaluationCriteria" JSONB,
    "lessonsLearned" JSONB,
    "bestPractices" JSONB,
    "priority" "InitiativePriority" NOT NULL DEFAULT 'medium',
    "status" "InitiativeStatus" NOT NULL DEFAULT 'draft',
    "stage" VARCHAR(100),
    "progress" DECIMAL(5,2),
    "health" VARCHAR(50),
    "owner" VARCHAR(255),
    "sponsor" VARCHAR(255),
    "champion" VARCHAR(255),
    "teamLead" VARCHAR(255),
    "businessLead" VARCHAR(255),
    "technicalLead" VARCHAR(255),
    "qualityLead" VARCHAR(255),
    "stakeholders" JSONB,
    "approvals" JSONB,
    "governance" JSONB,
    "decisionLog" JSONB,
    "issueLog" JSONB,
    "changeLog" JSONB,
    "documentationLinks" JSONB,
    "externalReferences" JSONB,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "archivedAt" TIMESTAMP(3),
    "archivedBy" TEXT,
    "version" INTEGER NOT NULL DEFAULT 0,
    "publishedVersion" INTEGER,
    "isTemplate" BOOLEAN NOT NULL DEFAULT false,
    "templateOf" TEXT,
    "plannedStartDate" TIMESTAMP(3),
    "plannedEndDate" TIMESTAMP(3),
    "actualStartDate" TIMESTAMP(3),
    "actualEndDate" TIMESTAMP(3),
    "estimatedEffort" DECIMAL(10,2),
    "actualEffort" DECIMAL(10,2),
    "estimatedCost" DECIMAL(12,2),
    "actualCost" DECIMAL(12,2),
    "estimatedBenefit" DECIMAL(12,2),
    "actualBenefit" DECIMAL(12,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Initiative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InitiativeCapability" (
    "id" TEXT NOT NULL,
    "initiativeId" TEXT NOT NULL,
    "capabilityId" TEXT NOT NULL,
    "relationship" VARCHAR(50) NOT NULL,
    "impact" VARCHAR(500),
    "priority" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "InitiativeCapability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InitiativeCourseOfAction" (
    "id" TEXT NOT NULL,
    "initiativeId" TEXT NOT NULL,
    "courseOfActionId" TEXT NOT NULL,
    "relationship" VARCHAR(50) NOT NULL,
    "sequence" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "InitiativeCourseOfAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InitiativeKpi" (
    "id" TEXT NOT NULL,
    "initiativeId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000),
    "type" "KpiType" NOT NULL DEFAULT 'custom',
    "unit" VARCHAR(50),
    "targetValue" DECIMAL(65,30),
    "currentValue" DECIMAL(65,30),
    "baseline" DECIMAL(65,30),
    "frequency" VARCHAR(50),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_InitiativeKpi" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InitiativeStakeholder" (
    "id" TEXT NOT NULL,
    "initiativeId" TEXT NOT NULL,
    "userId" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "role" VARCHAR(100) NOT NULL,
    "department" VARCHAR(100),
    "email" VARCHAR(255),
    "phone" VARCHAR(32),
    "influence" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "interest" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "isRequired" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_InitiativeStakeholder" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InitiativeWorkflowHistory" (
    "id" TEXT NOT NULL,
    "initiativeId" TEXT NOT NULL,
    "fromStatus" "InitiativeStatus",
    "toStatus" "InitiativeStatus" NOT NULL,
    "reason" VARCHAR(500) NOT NULL,
    "comment" VARCHAR(1000),
    "userId" TEXT NOT NULL,
    "userName" VARCHAR(255) NOT NULL,
    "userRole" VARCHAR(50) NOT NULL,
    "requiresApproval" BOOLEAN NOT NULL DEFAULT false,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PK_InitiativeWorkflowHistory" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCase" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(8000),
    "status" "BusinessCaseStatus" NOT NULL DEFAULT 'draft',
    "priority" "BusinessCasePriority" NOT NULL DEFAULT 'medium',
    "businessProblem" VARCHAR(4000),
    "proposedSolution" VARCHAR(4000),
    "expectedBenefits" VARCHAR(4000),
    "riskAssessment" VARCHAR(4000),
    "assumptions" VARCHAR(4000),
    "constraints" VARCHAR(4000),
    "estimatedCost" DECIMAL(65,30),
    "estimatedBenefit" DECIMAL(65,30),
    "estimatedRoi" DECIMAL(65,30),
    "paybackPeriodMonths" INTEGER,
    "npvValue" DECIMAL(65,30),
    "irrValue" DECIMAL(65,30),
    "costBreakdown" JSONB,
    "benefitBreakdown" JSONB,
    "riskMitigation" JSONB,
    "timeline" JSONB,
    "stakeholders" JSONB,
    "successMetrics" JSONB,
    "approvalStatus" VARCHAR(100),
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "rejectionReason" VARCHAR(1000),
    "implementationDate" TIMESTAMP(3),
    "reviewDate" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_BusinessCase" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCaseCourseOfAction" (
    "id" TEXT NOT NULL,
    "businessCaseId" TEXT NOT NULL,
    "courseOfActionId" TEXT NOT NULL,
    "relationship" VARCHAR(100) NOT NULL DEFAULT 'supports',
    "importance" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "contribution" VARCHAR(500),
    "expectedImpact" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_BusinessCaseCourseOfAction" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" "PortfolioType" NOT NULL DEFAULT 'strategic',
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "owner" TEXT,
    "strategicTheme" VARCHAR(100),
    "goalIds" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "totalBudget" DECIMAL(65,30),
    "totalSpent" DECIMAL(65,30),
    "expectedRoi" DECIMAL(65,30),
    "healthScore" INTEGER DEFAULT 0,
    "riskLevel" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioInitiative" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "initiativeId" TEXT NOT NULL,
    "strategicWeight" INTEGER NOT NULL DEFAULT 5,
    "priorityRank" INTEGER,
    "dependencyLevel" VARCHAR(20) NOT NULL DEFAULT 'low',
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addedBy" TEXT,

    CONSTRAINT "PortfolioInitiative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strategies" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "visionId" TEXT,
    "title" VARCHAR(500) NOT NULL,
    "description" TEXT NOT NULL,
    "strategyType" "StrategyType" NOT NULL DEFAULT 'BUSINESS',
    "strategyLevel" "StrategyLevel" NOT NULL DEFAULT 'CORPORATE',
    "objectives" TEXT[],
    "initiatives" TEXT[],
    "successMetrics" TEXT[],
    "competitiveAdvantage" VARCHAR(2000),
    "riskMitigation" VARCHAR(2000),
    "implementationPlan" VARCHAR(5000),
    "resourceRequirements" VARCHAR(2000),
    "timeline" VARCHAR(1000),
    "budget" DECIMAL(15,2),
    "status" "StrategyStatus" NOT NULL DEFAULT 'DRAFT',
    "priority" "StrategyPriority" NOT NULL DEFAULT 'MEDIUM',
    "approvalLevel" "ApprovalLevel" NOT NULL DEFAULT 'PENDING',
    "version" VARCHAR(20) NOT NULL DEFAULT '1.0',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "reviewDate" TIMESTAMP(3),
    "effectiveDate" TIMESTAMP(3),
    "ownerId" TEXT,
    "approvedById" TEXT,
    "sponsorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,

    CONSTRAINT "strategies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visions" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "description" TEXT NOT NULL,
    "visionType" "VisionType" NOT NULL DEFAULT 'CORPORATE',
    "scope" "VisionScope" NOT NULL DEFAULT 'ENTERPRISE',
    "timeHorizon" VARCHAR(50) NOT NULL,
    "inspirationalStatement" VARCHAR(2000) NOT NULL,
    "coreValues" TEXT[],
    "aspirationalGoals" TEXT[],
    "futureStateDescriptor" VARCHAR(2000),
    "status" "VisionStatus" NOT NULL DEFAULT 'DRAFT',
    "approvalLevel" "ApprovalLevel" NOT NULL DEFAULT 'PENDING',
    "version" VARCHAR(20) NOT NULL DEFAULT '1.0',
    "effectiveDate" TIMESTAMP(3),
    "expirationDate" TIMESTAMP(3),
    "ownerId" TEXT,
    "approvedById" TEXT,
    "reviewerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,

    CONSTRAINT "visions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strategy_metrics" (
    "id" TEXT NOT NULL,
    "strategyId" TEXT NOT NULL,
    "title" VARCHAR(300) NOT NULL,
    "description" VARCHAR(1000),
    "metricType" "MetricType" NOT NULL DEFAULT 'KPI',
    "category" VARCHAR(100) NOT NULL,
    "currentValue" VARCHAR(200),
    "targetValue" VARCHAR(200) NOT NULL,
    "measurementUnit" VARCHAR(100),
    "frequency" VARCHAR(50) NOT NULL,
    "status" "MetricStatus" NOT NULL DEFAULT 'ACTIVE',
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "strategy_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strategy_reviews" (
    "id" TEXT NOT NULL,
    "strategyId" TEXT NOT NULL,
    "reviewType" "StrategyReviewType" NOT NULL DEFAULT 'QUARTERLY',
    "reviewDate" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(300) NOT NULL,
    "summary" TEXT NOT NULL,
    "findings" TEXT[],
    "recommendations" TEXT[],
    "overallRating" INTEGER,
    "progressRating" INTEGER,
    "riskRating" INTEGER,
    "decisions" TEXT[],
    "actionItems" TEXT[],
    "nextReviewDate" TIMESTAMP(3),
    "reviewerId" TEXT,
    "participantIds" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "strategy_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strategy_stakeholders" (
    "id" TEXT NOT NULL,
    "strategyId" TEXT NOT NULL,
    "stakeholderType" "StakeholderType" NOT NULL DEFAULT 'internal',
    "role" VARCHAR(100) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "title" VARCHAR(200),
    "organization" VARCHAR(200),
    "email" VARCHAR(255),
    "phone" VARCHAR(50),
    "influence" "StakeholderInfluence" NOT NULL DEFAULT 'MEDIUM',
    "interest" "StakeholderInterest" NOT NULL DEFAULT 'MEDIUM',
    "engagementLevel" VARCHAR(50),
    "communicationPreference" VARCHAR(100),
    "status" "StakeholderStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "strategy_stakeholders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vision_metrics" (
    "id" TEXT NOT NULL,
    "visionId" TEXT NOT NULL,
    "title" VARCHAR(300) NOT NULL,
    "description" VARCHAR(1000),
    "metricType" "MetricType" NOT NULL DEFAULT 'KPI',
    "category" VARCHAR(100) NOT NULL,
    "currentValue" VARCHAR(200),
    "targetValue" VARCHAR(200) NOT NULL,
    "measurementUnit" VARCHAR(100),
    "frequency" VARCHAR(50) NOT NULL,
    "status" "MetricStatus" NOT NULL DEFAULT 'ACTIVE',
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vision_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vision_stakeholders" (
    "id" TEXT NOT NULL,
    "visionId" TEXT NOT NULL,
    "stakeholderType" "StakeholderType" NOT NULL DEFAULT 'internal',
    "role" VARCHAR(100) NOT NULL,
    "name" VARCHAR(200) NOT NULL,
    "title" VARCHAR(200),
    "organization" VARCHAR(200),
    "email" VARCHAR(255),
    "phone" VARCHAR(50),
    "influence" "StakeholderInfluence" NOT NULL DEFAULT 'MEDIUM',
    "interest" "StakeholderInterest" NOT NULL DEFAULT 'MEDIUM',
    "engagementLevel" VARCHAR(50),
    "communicationPreference" VARCHAR(100),
    "status" "StakeholderStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vision_stakeholders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strategic_goals" (
    "id" TEXT NOT NULL,
    "strategyId" TEXT NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "description" TEXT NOT NULL,
    "goalType" "StrategicGoalType" NOT NULL DEFAULT 'OPERATIONAL',
    "category" VARCHAR(100) NOT NULL,
    "targetValue" VARCHAR(200),
    "currentValue" VARCHAR(200),
    "measurementUnit" VARCHAR(100),
    "successCriteria" TEXT[],
    "status" "GoalStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "priority" "GoalPriority" NOT NULL DEFAULT 'MEDIUM',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "startDate" TIMESTAMP(3),
    "targetDate" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "strategic_goals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "strategic_milestones" (
    "id" TEXT NOT NULL,
    "strategicGoalId" TEXT NOT NULL,
    "title" VARCHAR(300) NOT NULL,
    "description" VARCHAR(1000),
    "status" "MilestoneStatus" NOT NULL DEFAULT 'PLANNED',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "plannedDate" TIMESTAMP(3) NOT NULL,
    "actualDate" TIMESTAMP(3),
    "deliverables" TEXT[],
    "successCriteria" TEXT[],
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "strategic_milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" "GoalType" NOT NULL DEFAULT 'strategic',
    "category" VARCHAR(100) NOT NULL,
    "description" VARCHAR(2000),
    "statement" VARCHAR(1000) NOT NULL,
    "rationale" VARCHAR(2000),
    "businessValue" VARCHAR(2000),
    "successCriteria" JSONB,
    "kpis" JSONB,
    "metrics" JSONB,
    "targets" JSONB,
    "timeframe" VARCHAR(100),
    "startDate" TIMESTAMP(3),
    "targetDate" TIMESTAMP(3),
    "actualDate" TIMESTAMP(3),
    "status" VARCHAR(50) NOT NULL DEFAULT 'draft',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "priority" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "difficulty" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "feasibility" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "riskLevel" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "dependencies" JSONB,
    "supports" JSONB,
    "drivers" JSONB,
    "stakeholders" JSONB,
    "resources" JSONB,
    "constraints" JSONB,
    "assumptions" VARCHAR(2000),
    "risks" JSONB,
    "mitigations" JSONB,
    "benefits" JSONB,
    "costs" JSONB,
    "initiatives" JSONB,
    "owner" VARCHAR(255),
    "sponsor" VARCHAR(255),
    "team" JSONB,
    "reviewDate" TIMESTAMP(3),
    "lastReviewDate" TIMESTAMP(3),
    "reviewNotes" VARCHAR(2000),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "tags" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "risks" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "category" "RiskCategory" NOT NULL,
    "type" "RiskType" NOT NULL DEFAULT 'THREAT',
    "status" "RiskStatus" NOT NULL DEFAULT 'IDENTIFIED',
    "probability" "RiskLevel" NOT NULL DEFAULT 'MEDIUM',
    "impact" "RiskLevel" NOT NULL DEFAULT 'MEDIUM',
    "riskScore" INTEGER NOT NULL DEFAULT 0,
    "inherentRisk" "RiskLevel" NOT NULL DEFAULT 'MEDIUM',
    "residualRisk" "RiskLevel" NOT NULL DEFAULT 'MEDIUM',
    "triggers" TEXT[],
    "consequences" TEXT[],
    "affectedAreas" TEXT[],
    "ownerId" TEXT,
    "managerId" TEXT,
    "identifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewDate" TIMESTAMP(3),
    "escalationDate" TIMESTAMP(3),
    "kris" TEXT[],
    "monitoringFreq" VARCHAR(50),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "versionNumber" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "risks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "risk_assessments" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "riskId" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "methodology" "AssessmentMethodology" NOT NULL DEFAULT 'SELF_ASSESSMENT',
    "scope" TEXT[],
    "status" "RiskAssessmentStatus" NOT NULL DEFAULT 'DRAFT',
    "overallScore" INTEGER NOT NULL DEFAULT 0,
    "recommendations" TEXT[],
    "assessmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "versionNumber" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "risk_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "risk_mitigations" (
    "id" TEXT NOT NULL,
    "riskId" TEXT NOT NULL,
    "strategy" "MitigationStrategy" NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "timeline" VARCHAR(100),
    "budget" DECIMAL(15,2),
    "status" "RiskStatus" NOT NULL DEFAULT 'IDENTIFIED',
    "ownerId" TEXT,
    "effectiveness" INTEGER DEFAULT 0,
    "implementedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "risk_mitigations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Policy" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "category" VARCHAR(100) NOT NULL,
    "status" "PolicyStatus" NOT NULL DEFAULT 'draft',
    "effectiveDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "owner" VARCHAR(255),
    "approver" VARCHAR(255),
    "content" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "compliance" JSONB,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessModelCanvas" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "status" "BusinessModelCanvasStatus" NOT NULL DEFAULT 'draft',
    "keyPartners" JSONB,
    "keyActivities" JSONB,
    "keyResources" JSONB,
    "valuePropositions" JSONB,
    "customerRelationships" JSONB,
    "channels" JSONB,
    "customerSegments" JSONB,
    "costStructure" JSONB,
    "revenueStreams" JSONB,
    "assumptions" VARCHAR(4000),
    "hypotheses" VARCHAR(4000),
    "validationStatus" VARCHAR(100),
    "validationNotes" VARCHAR(2000),
    "lastValidatedAt" TIMESTAMP(3),
    "version" INTEGER NOT NULL DEFAULT 0,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_BusinessModelCanvas" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stakeholder" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" "StakeholderType" NOT NULL DEFAULT 'external',
    "category" VARCHAR(100) NOT NULL,
    "description" VARCHAR(2000),
    "contactInfo" VARCHAR(500),
    "role" VARCHAR(255),
    "department" VARCHAR(100),
    "influence" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "interest" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "power" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "attitude" VARCHAR(20) NOT NULL DEFAULT 'neutral',
    "expectations" VARCHAR(2000),
    "concerns" VARCHAR(2000),
    "communicationPref" VARCHAR(100),
    "availability" VARCHAR(500),
    "decisionMaking" VARCHAR(500),
    "requirements" JSONB,
    "constraints" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "priority" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "tags" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Stakeholder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kpi" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" "KpiType" NOT NULL DEFAULT 'custom',
    "status" "KpiStatus" NOT NULL DEFAULT 'draft',
    "category" VARCHAR(100),
    "unit" VARCHAR(50),
    "targetValue" DECIMAL(65,30),
    "currentValue" DECIMAL(65,30),
    "baselineValue" DECIMAL(65,30),
    "thresholdMin" DECIMAL(65,30),
    "thresholdMax" DECIMAL(65,30),
    "frequency" "KpiFrequency" NOT NULL DEFAULT 'monthly',
    "calculationMethod" VARCHAR(1000),
    "dataSource" VARCHAR(500),
    "owner" VARCHAR(255),
    "stakeholders" JSONB,
    "trends" JSONB,
    "historicalData" JSONB,
    "benchmarks" JSONB,
    "targets" JSONB,
    "alerts" JSONB,
    "reportingPeriod" VARCHAR(100),
    "lastMeasuredAt" TIMESTAMP(3),
    "nextMeasureAt" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "version" INTEGER NOT NULL DEFAULT 0,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_Kpi" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationComponent" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" "ApplicationComponentType" NOT NULL DEFAULT 'service',
    "status" "ApplicationComponentStatus" NOT NULL DEFAULT 'planned',
    "version" VARCHAR(50),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "deploymentUnit" VARCHAR(255),
    "repository" VARCHAR(500),
    "documentation" VARCHAR(1000),
    "healthCheckUrl" VARCHAR(500),
    "dependencies" JSONB,
    "interfaces" JSONB,
    "configuration" JSONB,
    "resources" JSONB,
    "monitoring" JSONB,
    "security" JSONB,
    "metadata" JSONB,
    "tags" JSONB,
    "businessOwnerId" TEXT,
    "itOwnerId" TEXT,
    "vendor" VARCHAR(255),
    "hostingModel" "HostingModel",
    "criticality" "Criticality",
    "rto" INTEGER,
    "rpo" INTEGER,
    "dataClassification" "DataClassification",
    "eolDate" TIMESTAMP(3),
    "licenseType" VARCHAR(255),
    "licenseExpiration" TIMESTAMP(3),
    "totalCostOfOwnership" DECIMAL(15,2),
    "annualOpex" DECIMAL(15,2),
    "annualCapex" DECIMAL(15,2),
    "supportGroup" VARCHAR(255),
    "mttr" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "ApplicationComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationBusinessCapability" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "capabilityName" VARCHAR(255) NOT NULL,
    "importance" VARCHAR(50),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationBusinessCapability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationCollaboration" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "purpose" VARCHAR(1000),
    "scope" VARCHAR(1000),
    "architecture" JSONB,
    "governance" JSONB,
    "communication" JSONB,
    "dataSharing" JSONB,
    "integration" JSONB,
    "security" JSONB,
    "monitoring" JSONB,
    "lifecycle" JSONB,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "ApplicationCollaboration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationComponentCollaboration" (
    "id" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "collaborationId" TEXT NOT NULL,
    "role" VARCHAR(100),
    "responsibility" VARCHAR(500),

    CONSTRAINT "ApplicationComponentCollaboration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationComponentInteraction" (
    "id" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "interactionId" TEXT NOT NULL,
    "role" VARCHAR(100),
    "priority" INTEGER,

    CONSTRAINT "ApplicationComponentInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationEvent" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "componentId" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" "ApplicationEventType" NOT NULL DEFAULT 'system_event',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "trigger" VARCHAR(500),
    "payload" JSONB,
    "frequency" VARCHAR(100),
    "criticality" VARCHAR(50),
    "handlers" JSONB,
    "routing" JSONB,
    "persistence" JSONB,
    "notification" JSONB,
    "correlation" JSONB,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "ApplicationEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationFunction" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "purpose" VARCHAR(1000),
    "inputs" JSONB,
    "outputs" JSONB,
    "processing" JSONB,
    "complexity" VARCHAR(50),
    "performance" JSONB,
    "dependencies" JSONB,
    "algorithm" VARCHAR(2000),
    "implementation" JSONB,
    "testing" JSONB,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "ApplicationFunction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationInteraction" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "pattern" VARCHAR(100),
    "protocol" VARCHAR(100),
    "synchronicity" VARCHAR(50),
    "participants" JSONB NOT NULL,
    "sequence" JSONB,
    "dataFlow" JSONB,
    "errorHandling" JSONB,
    "timeout" JSONB,
    "retry" JSONB,
    "security" JSONB,
    "monitoring" JSONB,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "ApplicationInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationInterface" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "serviceId" TEXT,
    "providedByComponentId" TEXT,
    "requiredByComponentId" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" "ApplicationInterfaceType" NOT NULL DEFAULT 'api',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "specification" JSONB,
    "protocol" VARCHAR(100),
    "dataFormat" VARCHAR(100),
    "authentication" JSONB,
    "documentation" VARCHAR(1000),
    "examples" JSONB,
    "versioning" JSONB,
    "compatibility" JSONB,
    "security" JSONB,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "ApplicationInterface_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationProcess" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "serviceId" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "purpose" VARCHAR(1000),
    "scope" VARCHAR(1000),
    "workflow" JSONB NOT NULL,
    "steps" JSONB,
    "inputs" JSONB,
    "outputs" JSONB,
    "rules" JSONB,
    "conditions" JSONB,
    "automation" JSONB,
    "sla" JSONB,
    "monitoring" JSONB,
    "exceptions" JSONB,
    "rollback" JSONB,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "ApplicationProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationService" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "componentId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" "ApplicationServiceType" NOT NULL DEFAULT 'rest_api',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "endpoint" VARCHAR(500),
    "protocol" VARCHAR(100),
    "dataFormat" VARCHAR(100),
    "authentication" JSONB,
    "rateLimit" JSONB,
    "documentation" VARCHAR(1000),
    "apiSpec" JSONB,
    "sla" JSONB,
    "monitoring" JSONB,
    "security" JSONB,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "ApplicationService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationSLA" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "slaType" VARCHAR(100) NOT NULL,
    "target" VARCHAR(100) NOT NULL,
    "measurement" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationSLA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnologyCollaboration" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100),
    "pattern" VARCHAR(100),
    "participants" JSONB,
    "roles" JSONB,
    "rules" JSONB,
    "governance" JSONB,
    "coordination" JSONB,
    "monitoring" JSONB,
    "metadata" JSONB,
    "tags" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "TechnologyCollaboration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnologyComponent" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'software',
    "category" VARCHAR(100) NOT NULL DEFAULT 'application',
    "vendor" VARCHAR(255),
    "version" VARCHAR(100),
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "deploymentType" VARCHAR(50) NOT NULL DEFAULT 'cloud',
    "environment" VARCHAR(50) NOT NULL DEFAULT 'production',
    "availability" DECIMAL(5,2),
    "performance" JSONB,
    "capacity" JSONB,
    "dependencies" JSONB,
    "interfaces" JSONB,
    "nodes" JSONB,
    "security" JSONB,
    "compliance" JSONB,
    "cost" DECIMAL(12,2),
    "license" JSONB,
    "support" JSONB,
    "documentation" JSONB,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "TechnologyComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnologyEvent" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'system',
    "eventSchema" JSONB,
    "triggers" JSONB,
    "handlers" JSONB,
    "conditions" JSONB,
    "actions" JSONB,
    "components" JSONB,
    "services" JSONB,
    "severity" VARCHAR(50),
    "frequency" VARCHAR(100),
    "metadata" JSONB,
    "tags" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "TechnologyEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnologyFunction" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100),
    "purpose" VARCHAR(500),
    "inputs" JSONB,
    "outputs" JSONB,
    "parameters" JSONB,
    "algorithm" VARCHAR(1000),
    "implementation" JSONB,
    "testing" JSONB,
    "optimization" JSONB,
    "components" JSONB,
    "services" JSONB,
    "performance" JSONB,
    "metadata" JSONB,
    "tags" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "TechnologyFunction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnologyInteraction" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100),
    "pattern" VARCHAR(100),
    "participants" JSONB,
    "sequence" JSONB,
    "protocol" VARCHAR(100),
    "dataFlow" JSONB,
    "errorHandling" JSONB,
    "timeout" INTEGER,
    "retry" JSONB,
    "security" JSONB,
    "monitoring" JSONB,
    "metadata" JSONB,
    "tags" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "TechnologyInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnologyInterface" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'api',
    "protocol" VARCHAR(100) NOT NULL DEFAULT 'https',
    "endpoint" VARCHAR(500),
    "specification" JSONB,
    "authentication" JSONB,
    "authorization" JSONB,
    "rateLimit" JSONB,
    "versioning" JSONB,
    "components" JSONB,
    "services" JSONB,
    "consumers" JSONB,
    "providers" JSONB,
    "documentation" VARCHAR(1000),
    "examples" JSONB,
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "metadata" JSONB,
    "tags" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "TechnologyInterface_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnologyProcess" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100),
    "workflow" JSONB,
    "steps" JSONB,
    "triggers" JSONB,
    "conditions" JSONB,
    "outputs" JSONB,
    "functions" JSONB,
    "services" JSONB,
    "scheduling" JSONB,
    "monitoring" JSONB,
    "metadata" JSONB,
    "tags" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "TechnologyProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechnologyService" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'application',
    "category" VARCHAR(100) NOT NULL DEFAULT 'business',
    "serviceLevel" VARCHAR(50) NOT NULL DEFAULT 'standard',
    "availability" DECIMAL(5,2),
    "responseTime" INTEGER,
    "throughput" INTEGER,
    "protocols" JSONB,
    "endpoints" JSONB,
    "authentication" JSONB,
    "authorization" JSONB,
    "versioning" JSONB,
    "components" JSONB,
    "interfaces" JSONB,
    "consumers" JSONB,
    "providers" JSONB,
    "dependencies" JSONB,
    "monitoring" JSONB,
    "logging" JSONB,
    "backup" JSONB,
    "recovery" JSONB,
    "cost" DECIMAL(12,2),
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "TechnologyService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataMapping" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "integrationEndpointId" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "sourceFormat" VARCHAR(50) NOT NULL DEFAULT 'json',
    "targetFormat" VARCHAR(50) NOT NULL DEFAULT 'json',
    "direction" VARCHAR(50) NOT NULL DEFAULT 'inbound',
    "mappingRules" JSONB NOT NULL,
    "transformationScript" TEXT,
    "errorHandling" JSONB,
    "validation" JSONB,
    "testing" JSONB,
    "performance" JSONB,
    "status" VARCHAR(50) NOT NULL DEFAULT 'inactive',
    "version" VARCHAR(50) NOT NULL DEFAULT '1.0.0',
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "DataMapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DataObject" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "purpose" VARCHAR(1000),
    "dataType" VARCHAR(100),
    "format" VARCHAR(100),
    "structure" JSONB,
    "size" VARCHAR(50),
    "persistenceType" VARCHAR(100),
    "accessPattern" VARCHAR(100),
    "securityClassification" VARCHAR(100),
    "retentionPolicy" VARCHAR(500),
    "encryptionRequired" BOOLEAN NOT NULL DEFAULT false,
    "piiData" BOOLEAN NOT NULL DEFAULT false,
    "complianceRequirements" JSONB,
    "qualityMetrics" JSONB,
    "relationships" JSONB,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "DataObject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessActor" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" "BusinessActorType" NOT NULL DEFAULT 'individual',
    "category" VARCHAR(100) NOT NULL,
    "description" VARCHAR(2000),
    "responsibilities" VARCHAR(2000),
    "authority" VARCHAR(1000),
    "contactInfo" VARCHAR(500),
    "department" VARCHAR(100),
    "location" VARCHAR(255),
    "skills" JSONB,
    "reportingStructure" JSONB,
    "performance" JSONB,
    "influence" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "interest" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "powerLevel" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "relationship" VARCHAR(100) NOT NULL,
    "communicationPreference" VARCHAR(100),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "PK_BusinessActor" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessActorCapability" (
    "id" TEXT NOT NULL,
    "businessActorId" TEXT NOT NULL,
    "capabilityId" TEXT NOT NULL,
    "proficiency" VARCHAR(20) NOT NULL,
    "responsibility" VARCHAR(50) NOT NULL,

    CONSTRAINT "BusinessActorCapability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessActorProcess" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "processId" TEXT NOT NULL,
    "role" VARCHAR(100) NOT NULL DEFAULT 'participant',
    "responsibility" VARCHAR(500),
    "involvement" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_BusinessActorProcess" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessActorRole" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "assignment" VARCHAR(100) NOT NULL DEFAULT 'primary',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "workload" DECIMAL(5,2),
    "authority" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_BusinessActorRole" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessActorService" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "relationship" VARCHAR(100) NOT NULL DEFAULT 'consumer',
    "usage" VARCHAR(500),
    "expectations" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_BusinessActorService" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCollaboration" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "category" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "PK_BusinessCollaboration" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessEvent" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "eventType" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "PK_BusinessEvent" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessFunction" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "category" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "PK_BusinessFunction" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessInteraction" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "interactionType" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "PK_BusinessInteraction" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessInterface" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "interfaceType" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "PK_BusinessInterface" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_model_canvas_cobit" (
    "id" TEXT NOT NULL,
    "canvasId" TEXT NOT NULL,
    "cobitFrameworkId" TEXT NOT NULL,
    "canvasSection" "BusinessModelCanvasSection" NOT NULL,
    "relationship" "CanvasFrameworkRelation" NOT NULL DEFAULT 'INFORMS',
    "governanceContext" VARCHAR(1000),
    "riskConsiderations" VARCHAR(1000),
    "complianceNotes" VARCHAR(1000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_model_canvas_cobit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_model_canvas_pcf" (
    "id" TEXT NOT NULL,
    "canvasId" TEXT NOT NULL,
    "pcfFrameworkId" TEXT NOT NULL,
    "canvasSection" "BusinessModelCanvasSection" NOT NULL,
    "relationship" "CanvasFrameworkRelation" NOT NULL DEFAULT 'INFORMS',
    "processContext" VARCHAR(1000),
    "operationalNotes" VARCHAR(1000),
    "customerImpact" VARCHAR(1000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_model_canvas_pcf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessObject" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL,
    "category" VARCHAR(100),
    "structure" VARCHAR(1000),
    "attributes" VARCHAR(2000),
    "relationships" VARCHAR(1000),
    "constraints" JSONB,
    "rules" JSONB,
    "states" "BusinessObjectState" NOT NULL DEFAULT 'draft',
    "lifecycle" VARCHAR(500),
    "owner" VARCHAR(255),
    "custodian" VARCHAR(255),
    "sensitivity" VARCHAR(20) NOT NULL DEFAULT 'internal',
    "retention" VARCHAR(100),
    "format" VARCHAR(100),
    "volume" VARCHAR(100),
    "frequency" VARCHAR(100),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "PK_BusinessObject" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessObjectService" (
    "id" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "relationship" VARCHAR(100) NOT NULL DEFAULT 'managed_by',
    "access" VARCHAR(50) NOT NULL DEFAULT 'read',
    "frequency" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_BusinessObjectService" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessProcess" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "purpose" VARCHAR(1000),
    "scope" VARCHAR(1000),
    "inputs" VARCHAR(1000),
    "outputs" VARCHAR(1000),
    "triggers" VARCHAR(1000),
    "frequency" VARCHAR(100),
    "duration" VARCHAR(100),
    "complexity" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "criticality" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "automationLevel" VARCHAR(20) NOT NULL DEFAULT 'manual',
    "maturityLevel" "BusinessProcessMaturity" NOT NULL DEFAULT 'defined',
    "kpis" JSONB,
    "sla" JSONB,
    "compliance" JSONB,
    "risks" JSONB,
    "controls" JSONB,
    "improvements" JSONB,
    "performance" JSONB,
    "ownerId" TEXT,
    "category" VARCHAR(100),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "PK_BusinessProcess" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessProcessCapability" (
    "id" TEXT NOT NULL,
    "businessProcessId" TEXT NOT NULL,
    "capabilityId" TEXT NOT NULL,
    "relationship" VARCHAR(50) NOT NULL,
    "dependency" VARCHAR(20) NOT NULL,

    CONSTRAINT "BusinessProcessCapability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessProcessObject" (
    "id" TEXT NOT NULL,
    "processId" TEXT NOT NULL,
    "objectId" TEXT NOT NULL,
    "relationship" VARCHAR(100) NOT NULL DEFAULT 'uses',
    "operation" VARCHAR(100),
    "frequency" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_BusinessProcessObject" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessProcessResource" (
    "id" TEXT NOT NULL,
    "processId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "relationship" VARCHAR(100) NOT NULL DEFAULT 'uses',
    "allocation" DECIMAL(5,2),
    "criticality" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "timeframe" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_BusinessProcessResource" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessProcessService" (
    "id" TEXT NOT NULL,
    "processId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "relationship" VARCHAR(100) NOT NULL DEFAULT 'uses',
    "integration" VARCHAR(500),
    "criticality" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_BusinessProcessService" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessProcessValueStream" (
    "id" TEXT NOT NULL,
    "processId" TEXT NOT NULL,
    "valueStreamId" TEXT NOT NULL,
    "relationship" VARCHAR(100) NOT NULL DEFAULT 'supports',
    "importance" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "stage" VARCHAR(100),
    "contribution" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_BusinessProcessValueStream" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessRole" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "responsibilities" VARCHAR(2000),
    "authority" VARCHAR(1000),
    "permissions" JSONB,
    "skills" VARCHAR(1000),
    "qualifications" VARCHAR(1000),
    "hierarchy" JSONB,
    "delegation" JSONB,
    "department" VARCHAR(100),
    "level" "BusinessRoleLevel" NOT NULL DEFAULT 'analyst',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "PK_BusinessRole" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessRoleCapability" (
    "id" TEXT NOT NULL,
    "businessRoleId" TEXT NOT NULL,
    "capabilityId" TEXT NOT NULL,
    "requiredLevel" VARCHAR(20) NOT NULL,
    "responsibility" VARCHAR(50) NOT NULL,

    CONSTRAINT "BusinessRoleCapability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessRoleProcess" (
    "id" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,
    "processId" TEXT NOT NULL,
    "involvement" VARCHAR(100) NOT NULL DEFAULT 'participant',
    "permissions" JSONB,
    "responsibilities" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_BusinessRoleProcess" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessService" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" "BusinessServiceType" NOT NULL DEFAULT 'core',
    "purpose" VARCHAR(1000),
    "value" VARCHAR(1000),
    "consumers" VARCHAR(1000),
    "providers" VARCHAR(1000),
    "channels" VARCHAR(1000),
    "dependencies" JSONB,
    "sla" VARCHAR(1000),
    "cost" DECIMAL(12,2),
    "pricing" VARCHAR(500),
    "availability" VARCHAR(100),
    "capacity" VARCHAR(100),
    "quality" VARCHAR(20) NOT NULL DEFAULT 'standard',
    "category" VARCHAR(100),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "PK_BusinessService" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessServiceCapability" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "capabilityId" TEXT NOT NULL,
    "relationship" VARCHAR(100) NOT NULL DEFAULT 'requires',
    "dependency" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "contribution" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_BusinessServiceCapability" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessServiceValueStream" (
    "id" TEXT NOT NULL,
    "businessServiceId" TEXT NOT NULL,
    "valueStreamId" TEXT NOT NULL,
    "contribution" VARCHAR(50) NOT NULL,
    "serviceLevel" VARCHAR(20),

    CONSTRAINT "BusinessServiceValueStream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" "ResourceType" NOT NULL DEFAULT 'human',
    "category" "ResourceCategory" NOT NULL DEFAULT 'internal',
    "availability" VARCHAR(50) NOT NULL DEFAULT 'available',
    "capacity" VARCHAR(100),
    "cost" DECIMAL(12,2),
    "utilization" INTEGER DEFAULT 0,
    "skills" JSONB,
    "specifications" JSONB,
    "location" VARCHAR(255),
    "owner" VARCHAR(255),
    "custodian" VARCHAR(255),
    "constraints" JSONB,
    "dependencies" JSONB,
    "allocation" JSONB,
    "performance" JSONB,
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "version" INTEGER NOT NULL DEFAULT 0,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "PK_Resource" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValueStream" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" "ValueStreamType" NOT NULL DEFAULT 'operational',
    "purpose" VARCHAR(1000) NOT NULL,
    "customer" VARCHAR(500) NOT NULL,
    "valueProposition" VARCHAR(1000) NOT NULL,
    "startTrigger" VARCHAR(500),
    "endOutcome" VARCHAR(500),
    "stakeholders" JSONB,
    "steps" JSONB,
    "stages" JSONB,
    "metrics" JSONB,
    "painPoints" JSONB,
    "improvements" JSONB,
    "digitalOpportunities" JSONB,
    "status" VARCHAR(50) NOT NULL DEFAULT 'current',
    "owner" VARCHAR(255),
    "version" INTEGER NOT NULL DEFAULT 0,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "PK_ValueStream" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cobit_frameworks" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "version" VARCHAR(20) NOT NULL DEFAULT '5.0',
    "description" VARCHAR(2000),
    "implementationStatus" "FrameworkImplementationStatus" NOT NULL DEFAULT 'PLANNING',
    "maturityLevel" "COBITMaturityLevel" NOT NULL DEFAULT 'INCOMPLETE',
    "overallScore" INTEGER NOT NULL DEFAULT 0,
    "edm_maturity" INTEGER NOT NULL DEFAULT 0,
    "apo_maturity" INTEGER NOT NULL DEFAULT 0,
    "bai_maturity" INTEGER NOT NULL DEFAULT 0,
    "dss_maturity" INTEGER NOT NULL DEFAULT 0,
    "mea_maturity" INTEGER NOT NULL DEFAULT 0,
    "implementationDate" TIMESTAMP(3),
    "lastAssessmentDate" TIMESTAMP(3),
    "nextAssessmentDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "cobit_frameworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pcf_frameworks" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "version" VARCHAR(20) NOT NULL DEFAULT '7.3',
    "description" VARCHAR(2000),
    "implementationStatus" "FrameworkImplementationStatus" NOT NULL DEFAULT 'PLANNING',
    "standardizationLevel" "PCFStandardizationLevel" NOT NULL DEFAULT 'BASIC',
    "overallScore" INTEGER NOT NULL DEFAULT 0,
    "vision_strategy_maturity" INTEGER NOT NULL DEFAULT 0,
    "products_services_maturity" INTEGER NOT NULL DEFAULT 0,
    "marketing_sales_maturity" INTEGER NOT NULL DEFAULT 0,
    "delivery_maturity" INTEGER NOT NULL DEFAULT 0,
    "customer_service_maturity" INTEGER NOT NULL DEFAULT 0,
    "human_capital_maturity" INTEGER NOT NULL DEFAULT 0,
    "information_technology_maturity" INTEGER NOT NULL DEFAULT 0,
    "financial_resources_maturity" INTEGER NOT NULL DEFAULT 0,
    "assets_maturity" INTEGER NOT NULL DEFAULT 0,
    "governance_maturity" INTEGER NOT NULL DEFAULT 0,
    "external_relationships_maturity" INTEGER NOT NULL DEFAULT 0,
    "business_capabilities_maturity" INTEGER NOT NULL DEFAULT 0,
    "implementationDate" TIMESTAMP(3),
    "lastReviewDate" TIMESTAMP(3),
    "nextReviewDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "pcf_frameworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL,
    "category" VARCHAR(100),
    "sku" VARCHAR(100),
    "version" VARCHAR(50),
    "features" VARCHAR(2000),
    "benefits" VARCHAR(2000),
    "targetMarket" VARCHAR(1000),
    "market" JSONB,
    "competition" JSONB,
    "roadmap" JSONB,
    "metrics" JSONB,
    "pricing" VARCHAR(500),
    "cost" DECIMAL(12,2),
    "revenue" DECIMAL(12,2),
    "status" VARCHAR(50) NOT NULL DEFAULT 'development',
    "lifecycle" "ProductLifecycleStage" NOT NULL DEFAULT 'development',
    "channels" VARCHAR(1000),
    "competitors" VARCHAR(1000),
    "launchDate" TIMESTAMP(3),
    "endOfLife" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "PK_Product" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductService" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "relationship" VARCHAR(100) NOT NULL DEFAULT 'supported_by',
    "importance" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "integration" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_ProductService" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalesOpportunity" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "accountId" TEXT,
    "contactId" TEXT,
    "amount" DECIMAL(15,2) NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'USD',
    "probability" INTEGER NOT NULL DEFAULT 0,
    "weightedAmount" DECIMAL(15,2) NOT NULL,
    "stage" "OpportunityStage" NOT NULL DEFAULT 'NEW',
    "status" "OpportunityStatus" NOT NULL DEFAULT 'OPEN',
    "source" "OpportunitySource",
    "type" "OpportunityType",
    "closeDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastActivityDate" TIMESTAMP(3),
    "stageEnteredDate" TIMESTAMP(3),
    "ownerId" TEXT NOT NULL,
    "primaryCompetitor" VARCHAR(255),
    "competitors" TEXT[],
    "lossReason" "LossReason",
    "lossNotes" VARCHAR(1000),
    "tags" TEXT[],
    "customFields" JSONB,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "PK_SalesOpportunity" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpportunityProduct" (
    "id" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(15,2) NOT NULL,
    "discount" DECIMAL(5,2) NOT NULL DEFAULT 0,
    "totalPrice" DECIMAL(15,2) NOT NULL,

    CONSTRAINT "OpportunityProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpportunityTeamMember" (
    "id" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" VARCHAR(100) NOT NULL,

    CONSTRAINT "OpportunityTeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "initiativeId" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" VARCHAR(50) NOT NULL DEFAULT 'planning',
    "priority" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "budget" DECIMAL(65,30),
    "actualCost" DECIMAL(65,30),
    "completionRate" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_kpis" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "type" VARCHAR(50) NOT NULL DEFAULT 'percentage',
    "targetValue" DECIMAL(65,30),
    "currentValue" DECIMAL(65,30),
    "unit" VARCHAR(50),
    "category" VARCHAR(100),
    "frequency" VARCHAR(50),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "project_kpis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_milestones" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "dueDate" TIMESTAMP(3),
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "priority" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "completionPercentage" INTEGER DEFAULT 0,
    "completedAt" TIMESTAMP(3),
    "deliverables" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "project_milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "status" VARCHAR(50) NOT NULL DEFAULT 'todo',
    "priority" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "assigneeId" TEXT,
    "sprintId" TEXT,
    "projectId" TEXT,
    "requirementId" TEXT,
    "storyPoints" INTEGER,
    "estimatedHours" DECIMAL(8,2),
    "actualHours" DECIMAL(8,2),
    "startDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "tags" JSONB,
    "metadata" JSONB,
    "workflowId" TEXT,
    "frameworkType" VARCHAR(100),
    "controlId" VARCHAR(255),
    "workflowColumn" VARCHAR(50),
    "columnPosition" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workflows" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "frameworkType" VARCHAR(100) NOT NULL,
    "segment" VARCHAR(255) NOT NULL,
    "segmentName" VARCHAR(255),
    "projectId" TEXT,
    "initiativeId" TEXT,
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "startDate" TIMESTAMP(3),
    "targetDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "totalTasks" INTEGER NOT NULL DEFAULT 0,
    "completedTasks" INTEGER NOT NULL DEFAULT 0,
    "progressPercent" DECIMAL(5,2),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "workflows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sprint" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "goal" VARCHAR(1000),
    "status" VARCHAR(50) NOT NULL DEFAULT 'planning',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "capacity" INTEGER,
    "velocity" DECIMAL(8,2),
    "projectId" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Sprint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkPackage" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'development',
    "phase" VARCHAR(100) NOT NULL DEFAULT 'planning',
    "status" VARCHAR(50) NOT NULL DEFAULT 'planned',
    "priority" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "estimatedHours" INTEGER,
    "actualHours" INTEGER,
    "budget" DECIMAL(12,2),
    "actualCost" DECIMAL(12,2),
    "deliverables" JSONB,
    "dependencies" JSONB,
    "risks" JSONB,
    "resources" JSONB,
    "team" JSONB,
    "milestones" JSONB,
    "progressPercent" INTEGER NOT NULL DEFAULT 0,
    "effort" VARCHAR(100),
    "duration" VARCHAR(100),
    "actualStartDate" TIMESTAMP(3),
    "actualEndDate" TIMESTAMP(3),
    "progress" VARCHAR(100),
    "prerequisites" VARCHAR(2000),
    "assumptions" VARCHAR(2000),
    "owner" VARCHAR(255),
    "assignee" VARCHAR(255),
    "stakeholders" VARCHAR(1000),
    "documentation" VARCHAR(500),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "WorkPackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "taskId" TEXT,
    "content" VARCHAR(4000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalSystem" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'api',
    "vendor" VARCHAR(255),
    "version" VARCHAR(100),
    "status" VARCHAR(50) NOT NULL DEFAULT 'inactive',
    "baseUrl" VARCHAR(1000),
    "apiVersion" VARCHAR(50),
    "authType" VARCHAR(50) NOT NULL DEFAULT 'none',
    "authConfig" JSONB,
    "rateLimits" JSONB,
    "capabilities" JSONB,
    "supportedProtocols" JSONB,
    "healthCheckUrl" VARCHAR(1000),
    "lastHealthCheck" TIMESTAMP(3),
    "isHealthy" BOOLEAN,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "ExternalSystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Integration" (
    "id" VARCHAR(30) NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "provider" VARCHAR(100) NOT NULL,
    "type" VARCHAR(100) NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'inactive',
    "config" JSONB NOT NULL,
    "credentials" JSONB,
    "lastSyncAt" TIMESTAMP(3),
    "syncFrequency" VARCHAR(50),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "errorCount" INTEGER NOT NULL DEFAULT 0,
    "lastError" VARCHAR(1000),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "Integration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationAccount" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "integrationId" VARCHAR(30) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "accountType" VARCHAR(100) NOT NULL,
    "credentials" JSONB NOT NULL,
    "config" JSONB,
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "lastSyncAt" TIMESTAMP(3),
    "syncEnabled" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "IntegrationAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Connector" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "integrationId" VARCHAR(30) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "connectorType" VARCHAR(100) NOT NULL,
    "direction" VARCHAR(50) NOT NULL DEFAULT 'bidirectional',
    "config" JSONB NOT NULL,
    "authentication" JSONB,
    "endpoints" JSONB,
    "rateLimits" JSONB,
    "timeout" INTEGER,
    "retryPolicy" JSONB,
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "isEnabled" BOOLEAN NOT NULL DEFAULT true,
    "lastUsedAt" TIMESTAMP(3),
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Connector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntegrationEndpoint" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "externalSystemId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(50) NOT NULL DEFAULT 'inbound',
    "protocol" VARCHAR(50) NOT NULL DEFAULT 'rest',
    "method" VARCHAR(20) NOT NULL DEFAULT 'GET',
    "url" VARCHAR(2000) NOT NULL,
    "headers" JSONB,
    "queryParams" JSONB,
    "requestFormat" VARCHAR(50) NOT NULL DEFAULT 'json',
    "responseFormat" VARCHAR(50) NOT NULL DEFAULT 'json',
    "authentication" JSONB,
    "rateLimiting" JSONB,
    "timeout" INTEGER,
    "retryPolicy" JSONB,
    "validation" JSONB,
    "monitoring" JSONB,
    "status" VARCHAR(50) NOT NULL DEFAULT 'inactive',
    "lastUsed" TIMESTAMP(3),
    "successRate" DECIMAL(5,4),
    "averageResponseTime" INTEGER,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "IntegrationEndpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mapping" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "integrationAccountId" TEXT NOT NULL,
    "connectorId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "sourceEntity" VARCHAR(255) NOT NULL,
    "targetEntity" VARCHAR(255) NOT NULL,
    "direction" VARCHAR(50) NOT NULL DEFAULT 'inbound',
    "mappingRules" JSONB NOT NULL,
    "transformationLogic" VARCHAR(4000),
    "validation" JSONB,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastExecutedAt" TIMESTAMP(3),
    "executionCount" INTEGER NOT NULL DEFAULT 0,
    "successCount" INTEGER NOT NULL DEFAULT 0,
    "errorCount" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Mapping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transformation" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "connectorId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL,
    "inputFormat" VARCHAR(50) NOT NULL,
    "outputFormat" VARCHAR(50) NOT NULL,
    "transformLogic" VARCHAR(4000) NOT NULL,
    "parameters" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "executionOrder" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Transformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" "AssessmentType" NOT NULL DEFAULT 'swot',
    "category" VARCHAR(100) NOT NULL,
    "description" VARCHAR(2000),
    "purpose" VARCHAR(1000),
    "scope" VARCHAR(1000),
    "methodology" VARCHAR(500),
    "criteria" JSONB,
    "findings" JSONB,
    "recommendations" JSONB,
    "strengths" JSONB,
    "weaknesses" JSONB,
    "opportunities" JSONB,
    "threats" JSONB,
    "risks" JSONB,
    "mitigations" JSONB,
    "assumptions" VARCHAR(2000),
    "limitations" VARCHAR(1000),
    "confidence" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "status" VARCHAR(50) NOT NULL DEFAULT 'draft',
    "reviewDate" TIMESTAMP(3),
    "validUntil" TIMESTAMP(3),
    "participants" JSONB,
    "reviewers" JSONB,
    "approvers" JSONB,
    "priority" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "businessImpact" VARCHAR(2000),
    "actionItems" JSONB,
    "tags" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComplianceReport" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "reportType" VARCHAR(100) NOT NULL,
    "status" "ComplianceStatus" NOT NULL DEFAULT 'pending',
    "reportDate" TIMESTAMP(3) NOT NULL,
    "period" VARCHAR(100),
    "findings" JSONB,
    "recommendations" JSONB,
    "score" INTEGER,
    "owner" VARCHAR(255),
    "reviewer" VARCHAR(255),
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "ComplianceReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compliance_assessments" (
    "id" TEXT NOT NULL,
    "frameworkId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "assessmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assessor" VARCHAR(255) NOT NULL,
    "methodology" "AssessmentMethodology" NOT NULL,
    "scope" TEXT[],
    "overallScore" INTEGER NOT NULL DEFAULT 0,
    "maturityLevel" "MaturityLevel" NOT NULL DEFAULT 'PARTIAL',
    "status" "AssessmentStatus" NOT NULL DEFAULT 'PLANNED',
    "nextAssessmentDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "organizationId" TEXT,

    CONSTRAINT "compliance_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_results" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "controlId" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "implementationLevel" "ImplementationLevel" NOT NULL DEFAULT 'NOT_IMPLEMENTED',
    "testOutcome" "TestOutcome" NOT NULL DEFAULT 'NOT_TESTED',
    "gaps" TEXT[],
    "strengths" TEXT[],
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assessment_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_recommendations" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "priority" "SecurityTaskPriority" NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "description" TEXT NOT NULL,
    "benefits" TEXT[],
    "effort" TEXT,
    "cost" INTEGER,
    "timeline" TEXT,
    "dependencies" TEXT[],
    "relatedControlIds" TEXT[],
    "status" VARCHAR(50) NOT NULL DEFAULT 'proposed',
    "implementedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assessment_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security_frameworks" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "frameworkType" "SecurityFrameworkType" NOT NULL,
    "version" "FrameworkVersion",
    "description" TEXT,
    "implementationStatus" "ImplementationStatus" NOT NULL DEFAULT 'PLANNING',
    "maturityLevel" "MaturityLevel" NOT NULL DEFAULT 'PARTIAL',
    "overallScore" INTEGER NOT NULL DEFAULT 0,
    "implementationDate" TIMESTAMP(3),
    "lastReviewDate" TIMESTAMP(3),
    "nextReviewDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "versionNumber" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "security_frameworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security_controls" (
    "id" TEXT NOT NULL,
    "frameworkId" TEXT NOT NULL,
    "controlId" VARCHAR(50) NOT NULL,
    "name" VARCHAR(500) NOT NULL,
    "description" TEXT,
    "family" "ControlFamily",
    "nistFunction" "NISTFunction",
    "baseline" TEXT[],
    "implementationStatus" "ImplementationLevel" NOT NULL DEFAULT 'NOT_IMPLEMENTED',
    "implementationNotes" TEXT,
    "testStatus" "TestOutcome" NOT NULL DEFAULT 'NOT_TESTED',
    "lastTested" TIMESTAMP(3),
    "nextTestDate" TIMESTAMP(3),
    "testMethod" "TestMethod",
    "responsibleUserId" TEXT,
    "reviewerUserId" TEXT,
    "priority" "SecurityTaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "riskLevel" "RiskLevel" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "organizationId" TEXT,

    CONSTRAINT "security_controls_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "control_test_results" (
    "id" TEXT NOT NULL,
    "controlId" TEXT NOT NULL,
    "testDate" TIMESTAMP(3) NOT NULL,
    "testMethod" "TestMethod" NOT NULL,
    "result" "TestOutcome" NOT NULL,
    "findings" TEXT,
    "recommendations" TEXT,
    "testerId" TEXT,
    "testDuration" INTEGER,
    "testEvidence" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "control_test_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security_evidence" (
    "id" TEXT NOT NULL,
    "controlId" TEXT NOT NULL,
    "taskId" TEXT,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "type" "EvidenceType" NOT NULL,
    "filePath" VARCHAR(500),
    "url" VARCHAR(500),
    "fileSize" BIGINT,
    "mimeType" VARCHAR(100),
    "collectedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "collectorId" TEXT,
    "validUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "security_evidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security_tasks" (
    "id" TEXT NOT NULL,
    "frameworkId" TEXT NOT NULL,
    "controlId" TEXT,
    "title" VARCHAR(500) NOT NULL,
    "description" TEXT,
    "priority" "SecurityTaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "status" "SecurityTaskStatus" NOT NULL DEFAULT 'TODO',
    "category" "SecurityTaskCategory" NOT NULL,
    "riskLevel" "RiskLevel" NOT NULL DEFAULT 'MEDIUM',
    "assignedToId" TEXT,
    "dueDate" TIMESTAMP(3),
    "startDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "progress" INTEGER NOT NULL DEFAULT 0,
    "estimatedHours" INTEGER,
    "actualHours" INTEGER,
    "tags" TEXT[],
    "externalId" VARCHAR(100),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "organizationId" TEXT,

    CONSTRAINT "security_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "security_findings" (
    "id" TEXT NOT NULL,
    "controlId" TEXT NOT NULL,
    "testResultId" TEXT,
    "severity" "FindingSeverity" NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "description" TEXT NOT NULL,
    "remediation" TEXT NOT NULL,
    "status" "FindingStatus" NOT NULL DEFAULT 'OPEN',
    "dueDate" TIMESTAMP(3),
    "assigneeId" TEXT,
    "verificationDate" TIMESTAMP(3),
    "riskLevel" "RiskLevel" NOT NULL DEFAULT 'MEDIUM',
    "businessImpact" TEXT,
    "externalRef" VARCHAR(100),
    "cweId" VARCHAR(20),
    "cveId" VARCHAR(20),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "organizationId" TEXT,

    CONSTRAINT "security_findings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "framework_control_mappings" (
    "id" TEXT NOT NULL,
    "sourceFrameworkId" TEXT NOT NULL,
    "sourceControlId" VARCHAR(50) NOT NULL,
    "targetFrameworkId" TEXT NOT NULL,
    "targetControlId" VARCHAR(50) NOT NULL,
    "mappingType" VARCHAR(20) NOT NULL DEFAULT 'related',
    "confidence" DECIMAL(3,2) NOT NULL DEFAULT 0.8,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT,

    CONSTRAINT "framework_control_mappings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialBudget" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "fiscalYear" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "totalAmount" DECIMAL(15,2) NOT NULL,
    "spentAmount" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "remainingAmount" DECIMAL(15,2) NOT NULL,
    "currency" VARCHAR(3) NOT NULL DEFAULT 'USD',
    "status" "BudgetStatus" NOT NULL DEFAULT 'active',
    "budgetType" VARCHAR(50) NOT NULL DEFAULT 'operational',
    "approvalStatus" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "notes" VARCHAR(4000),
    "tags" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "FinancialBudget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialBudgetLineItem" (
    "id" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "subcategory" VARCHAR(255),
    "description" VARCHAR(1000),
    "plannedAmount" DECIMAL(15,2) NOT NULL,
    "spentAmount" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "remainingAmount" DECIMAL(15,2) NOT NULL,
    "percentage" DECIMAL(5,2),
    "notes" VARCHAR(1000),
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialBudgetLineItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialBudgetAllocation" (
    "id" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "departmentId" TEXT,
    "projectId" TEXT,
    "userId" TEXT,
    "allocationType" VARCHAR(100) NOT NULL,
    "allocatedAmount" DECIMAL(15,2) NOT NULL,
    "spentAmount" DECIMAL(15,2) NOT NULL DEFAULT 0,
    "remainingAmount" DECIMAL(15,2) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "notes" VARCHAR(1000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialBudgetAllocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialBudgetForecast" (
    "id" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "period" VARCHAR(50) NOT NULL,
    "forecastDate" TIMESTAMP(3) NOT NULL,
    "forecastAmount" DECIMAL(15,2) NOT NULL,
    "actualAmount" DECIMAL(15,2),
    "variance" DECIMAL(15,2),
    "variancePercent" DECIMAL(5,2),
    "confidence" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "methodology" VARCHAR(255),
    "assumptions" VARCHAR(2000),
    "notes" VARCHAR(1000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialBudgetForecast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "infrastructure_monitoring" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "assetType" VARCHAR(50) NOT NULL,
    "metricName" VARCHAR(100) NOT NULL,
    "metricValue" DOUBLE PRECISION NOT NULL,
    "threshold" DOUBLE PRECISION,
    "alertEnabled" BOOLEAN NOT NULL DEFAULT true,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "infrastructure_monitoring_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incidents" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "incidentId" VARCHAR(50) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(4000) NOT NULL,
    "severity" "IncidentSeverity" NOT NULL,
    "priority" "IncidentPriority" NOT NULL,
    "status" "IncidentStatus" NOT NULL DEFAULT 'OPEN',
    "affectedAssets" JSONB,
    "affectedServices" JSONB,
    "detectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acknowledgedAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),
    "rootCause" VARCHAR(4000),
    "resolution" VARCHAR(4000),
    "assignedToId" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "incidents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capacity_plans" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "planName" VARCHAR(255) NOT NULL,
    "planPeriod" VARCHAR(100) NOT NULL,
    "currentCapacity" JSONB NOT NULL,
    "forecastedDemand" JSONB NOT NULL,
    "expansionPlan" JSONB NOT NULL,
    "budgetEstimate" DECIMAL(15,2),
    "approvedById" TEXT,
    "approvedDate" TIMESTAMP(3),
    "status" "PlanStatus" NOT NULL DEFAULT 'DRAFT',
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "capacity_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operational_alerts" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "alertName" VARCHAR(255) NOT NULL,
    "alertType" "AlertType" NOT NULL,
    "severity" "AlertSeverity" NOT NULL,
    "status" "AlertStatus" NOT NULL DEFAULT 'ACTIVE',
    "assetId" TEXT,
    "assetType" VARCHAR(50),
    "condition" VARCHAR(500) NOT NULL,
    "threshold" DOUBLE PRECISION,
    "currentValue" DOUBLE PRECISION,
    "message" VARCHAR(1000) NOT NULL,
    "triggeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acknowledgedAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),
    "acknowledgedById" TEXT,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "operational_alerts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_level_agreements" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "serviceName" VARCHAR(255) NOT NULL,
    "availabilityTarget" DOUBLE PRECISION NOT NULL,
    "performanceTarget" JSONB NOT NULL,
    "measurementPeriod" VARCHAR(50) NOT NULL,
    "reportingFrequency" VARCHAR(50) NOT NULL,
    "penalties" JSONB,
    "credits" JSONB,
    "effectiveDate" TIMESTAMP(3) NOT NULL,
    "expirationDate" TIMESTAMP(3),
    "status" "SLAStatus" NOT NULL DEFAULT 'ACTIVE',
    "ownerId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_level_agreements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessCaseValueStream" (
    "id" TEXT NOT NULL,
    "businessCaseId" TEXT NOT NULL,
    "valueStreamId" TEXT NOT NULL,
    "contribution" VARCHAR(50) NOT NULL,
    "expectedValue" DECIMAL(15,2),
    "timeline" VARCHAR(500),

    CONSTRAINT "BusinessCaseValueStream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductBusinessCase" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "businessCaseId" TEXT NOT NULL,
    "relationship" VARCHAR(100) NOT NULL DEFAULT 'supports',
    "contribution" VARCHAR(500),
    "impact" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PK_ProductBusinessCase" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductValueStream" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "valueStreamId" TEXT NOT NULL,
    "relationship" VARCHAR(50) NOT NULL,
    "contribution" DECIMAL(5,2),

    CONSTRAINT "ProductValueStream_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cobit_processes" (
    "id" TEXT NOT NULL,
    "frameworkId" TEXT NOT NULL,
    "processCode" VARCHAR(20) NOT NULL,
    "processName" VARCHAR(255) NOT NULL,
    "domain" "COBITDomain" NOT NULL,
    "description" VARCHAR(2000),
    "purpose" VARCHAR(1000),
    "maturityLevel" "COBITProcessMaturity" NOT NULL DEFAULT 'INCOMPLETE',
    "implementationStatus" "ProcessImplementationStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "riskLevel" "RiskLevel" NOT NULL DEFAULT 'MEDIUM',
    "priority" "FrameworkPriority" NOT NULL DEFAULT 'MEDIUM',
    "inputs" JSONB,
    "outputs" JSONB,
    "raci" JSONB,
    "kpis" JSONB,
    "controls" JSONB,
    "practices" JSONB,
    "relatedBusinessProcesses" JSONB,
    "governanceObjectives" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cobit_processes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pcf_processes" (
    "id" TEXT NOT NULL,
    "frameworkId" TEXT NOT NULL,
    "processCode" VARCHAR(20) NOT NULL,
    "processName" VARCHAR(255) NOT NULL,
    "level" "PCFProcessLevel" NOT NULL,
    "category" "PCFProcessCategory" NOT NULL,
    "description" VARCHAR(2000),
    "purpose" VARCHAR(1000),
    "standardizationLevel" "PCFProcessStandardization" NOT NULL DEFAULT 'UNDEFINED',
    "implementationStatus" "ProcessImplementationStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "automationLevel" "ProcessAutomationLevel" NOT NULL DEFAULT 'MANUAL',
    "priority" "FrameworkPriority" NOT NULL DEFAULT 'MEDIUM',
    "inputs" JSONB,
    "outputs" JSONB,
    "kpis" JSONB,
    "bestPractices" JSONB,
    "benchmarks" JSONB,
    "relatedValueStreams" JSONB,
    "customerImpact" VARCHAR(1000),
    "operationalImpact" VARCHAR(1000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pcf_processes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_case_cobit" (
    "id" TEXT NOT NULL,
    "businessCaseId" TEXT NOT NULL,
    "cobitFrameworkId" TEXT NOT NULL,
    "relationship" "CaseFrameworkRelation" NOT NULL DEFAULT 'SUPPORTS',
    "governanceObjective" VARCHAR(500),
    "riskMitigation" VARCHAR(1000),
    "complianceImpact" VARCHAR(1000),
    "expectedMaturityGain" INTEGER NOT NULL DEFAULT 0,
    "priority" "FrameworkPriority" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_case_cobit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_case_cobit_process" (
    "id" TEXT NOT NULL,
    "businessCaseId" TEXT NOT NULL,
    "cobitProcessId" TEXT NOT NULL,
    "relationship" "CaseProcessRelation" NOT NULL DEFAULT 'IMPLEMENTS',
    "impactLevel" "ImpactLevel" NOT NULL DEFAULT 'MEDIUM',
    "maturityImprovement" INTEGER NOT NULL DEFAULT 0,
    "implementation" VARCHAR(1000),
    "expectedOutcome" VARCHAR(1000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_case_cobit_process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_case_pcf" (
    "id" TEXT NOT NULL,
    "businessCaseId" TEXT NOT NULL,
    "pcfFrameworkId" TEXT NOT NULL,
    "relationship" "CaseFrameworkRelation" NOT NULL DEFAULT 'SUPPORTS',
    "processStandardization" VARCHAR(500),
    "operationalImpact" VARCHAR(1000),
    "customerImpact" VARCHAR(1000),
    "expectedEfficiencyGain" INTEGER NOT NULL DEFAULT 0,
    "priority" "FrameworkPriority" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_case_pcf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_case_pcf_process" (
    "id" TEXT NOT NULL,
    "businessCaseId" TEXT NOT NULL,
    "pcfProcessId" TEXT NOT NULL,
    "relationship" "CaseProcessRelation" NOT NULL DEFAULT 'STANDARDIZES',
    "impactLevel" "ImpactLevel" NOT NULL DEFAULT 'MEDIUM',
    "standardizationGain" VARCHAR(500),
    "processImprovement" VARCHAR(1000),
    "expectedOutcome" VARCHAR(1000),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_case_pcf_process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CapabilityResource" (
    "id" TEXT NOT NULL,
    "capabilityId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "usage" VARCHAR(50) NOT NULL,
    "intensity" VARCHAR(20) NOT NULL,

    CONSTRAINT "CapabilityResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KpiResource" (
    "id" TEXT NOT NULL,
    "kpiId" TEXT NOT NULL,
    "resourceId" TEXT NOT NULL,
    "allocation" DECIMAL(5,2) NOT NULL,
    "impact" VARCHAR(50),

    CONSTRAINT "KpiResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValueStreamCapability" (
    "id" TEXT NOT NULL,
    "valueStreamId" TEXT NOT NULL,
    "capabilityId" TEXT NOT NULL,
    "relationship" VARCHAR(50) NOT NULL,
    "criticality" VARCHAR(20) NOT NULL,

    CONSTRAINT "ValueStreamCapability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpportunityActivity" (
    "id" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "activityType" "ActivityTypeOpp" NOT NULL,
    "subject" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "activityDate" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER,
    "outcome" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "PK_OpportunityActivity" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpportunityNote" (
    "id" TEXT NOT NULL,
    "opportunityId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isPrivate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "PK_OpportunityNote" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchitectureDecision" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "context" VARCHAR(4000),
    "decision" VARCHAR(4000) NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'proposed',
    "alternatives" JSONB,
    "consequences" JSONB,
    "rationale" VARCHAR(2000),
    "stakeholders" JSONB,
    "impactedSystems" JSONB,
    "reviewDate" TIMESTAMP(3),
    "nextReviewDate" TIMESTAMP(3),
    "supersededBy" TEXT,
    "supersedes" TEXT,
    "category" VARCHAR(100) NOT NULL DEFAULT 'technical',
    "priority" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "effort" VARCHAR(50),
    "risk" VARCHAR(50),
    "assumptions" VARCHAR(2000),
    "constraints" VARCHAR(2000),
    "futureConsiderations" VARCHAR(2000),
    "relatedDecisions" VARCHAR(1000),
    "decisionMakers" VARCHAR(500),
    "reviewer" VARCHAR(255),
    "approver" VARCHAR(255),
    "decisionDate" TIMESTAMP(3),
    "implementationStatus" VARCHAR(100),
    "compliance" VARCHAR(500),
    "documentation" VARCHAR(500),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "ArchitectureDecision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deliverable" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "workPackageId" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'document',
    "category" VARCHAR(100) NOT NULL DEFAULT 'technical',
    "status" VARCHAR(50) NOT NULL DEFAULT 'planned',
    "priority" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "dueDate" TIMESTAMP(3),
    "completionDate" TIMESTAMP(3),
    "estimatedEffort" INTEGER,
    "actualEffort" INTEGER,
    "quality" VARCHAR(50),
    "acceptanceCriteria" JSONB,
    "dependencies" JSONB,
    "stakeholders" JSONB,
    "reviewers" JSONB,
    "approvers" JSONB,
    "artifacts" JSONB,
    "location" VARCHAR(500),
    "version" VARCHAR(50),
    "size" VARCHAR(100),
    "format" VARCHAR(100),
    "template" VARCHAR(255),
    "standards" VARCHAR(500),
    "checklist" JSONB,
    "risks" JSONB,
    "issues" JSONB,
    "feedback" JSONB,
    "metrics" JSONB,
    "owner" VARCHAR(255),
    "assignee" VARCHAR(255),
    "team" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Deliverable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gap" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'capability',
    "category" VARCHAR(100) NOT NULL DEFAULT 'technical',
    "severity" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "impact" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "urgency" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "status" VARCHAR(50) NOT NULL DEFAULT 'identified',
    "current_state" VARCHAR(2000),
    "desired_state" VARCHAR(2000),
    "gap_size" VARCHAR(50),
    "root_cause" VARCHAR(2000),
    "analysis" JSONB,
    "recommendations" JSONB,
    "alternatives" JSONB,
    "dependencies" JSONB,
    "barriers" JSONB,
    "enablers" JSONB,
    "risks" JSONB,
    "opportunities" JSONB,
    "cost_estimate" DECIMAL(12,2),
    "effort_estimate" INTEGER,
    "timeline" VARCHAR(100),
    "business_case" VARCHAR(2000),
    "stakeholders" JSONB,
    "workPackages" JSONB,
    "deliverables" JSONB,
    "success_criteria" JSONB,
    "metrics" JSONB,
    "milestones" JSONB,
    "owner" VARCHAR(255),
    "analyst" VARCHAR(255),
    "sponsor" VARCHAR(255),
    "priority_score" INTEGER DEFAULT 0,
    "business_value" VARCHAR(50),
    "technical_complexity" VARCHAR(50),
    "organizational_readiness" VARCHAR(50),
    "external_factors" JSONB,
    "compliance_impact" VARCHAR(2000),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Gap_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ImplementationEvent" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "workPackageId" TEXT,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'milestone',
    "category" VARCHAR(100) NOT NULL DEFAULT 'project',
    "status" VARCHAR(50) NOT NULL DEFAULT 'planned',
    "priority" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "scheduledDate" TIMESTAMP(3),
    "actualDate" TIMESTAMP(3),
    "duration" INTEGER,
    "location" VARCHAR(255),
    "participants" JSONB,
    "agenda" JSONB,
    "outcomes" JSONB,
    "decisions" JSONB,
    "actionItems" JSONB,
    "artifacts" JSONB,
    "dependencies" JSONB,
    "prerequisites" JSONB,
    "success_criteria" JSONB,
    "risks" JSONB,
    "issues" JSONB,
    "resources" JSONB,
    "cost" DECIMAL(12,2),
    "budget" DECIMAL(12,2),
    "roi" VARCHAR(100),
    "impact" VARCHAR(50),
    "complexity" VARCHAR(50),
    "stakeholders" JSONB,
    "communications" JSONB,
    "approvals" JSONB,
    "rollback_plan" VARCHAR(2000),
    "contingency" VARCHAR(2000),
    "lessons_learned" VARCHAR(2000),
    "organizer" VARCHAR(255),
    "facilitator" VARCHAR(255),
    "coordinator" VARCHAR(255),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "ImplementationEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Junction" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000),
    "type" "JunctionType" NOT NULL DEFAULT 'and',
    "logic" JSONB,
    "conditions" JSONB,
    "inputs" JSONB,
    "outputs" JSONB,
    "configuration" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Junction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'server',
    "environment" VARCHAR(50) NOT NULL DEFAULT 'production',
    "location" VARCHAR(255) NOT NULL DEFAULT 'cloud',
    "provider" VARCHAR(255),
    "region" VARCHAR(100),
    "zone" VARCHAR(100),
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "capacity" JSONB,
    "utilization" JSONB,
    "performance" JSONB,
    "network" JSONB,
    "security" JSONB,
    "monitoring" JSONB,
    "backup" JSONB,
    "components" JSONB,
    "services" JSONB,
    "cost" DECIMAL(12,2),
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Path" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'network',
    "protocol" VARCHAR(100),
    "bandwidth" VARCHAR(100),
    "latency" INTEGER,
    "reliability" DECIMAL(5,2),
    "encryption" VARCHAR(100),
    "sourceNodeId" TEXT,
    "targetNodeId" TEXT,
    "routes" JSONB,
    "monitoring" JSONB,
    "metadata" JSONB,
    "tags" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Path_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plateau" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000),
    "type" "PlateauType" NOT NULL DEFAULT 'current',
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "objectives" JSONB,
    "architecture" JSONB,
    "capabilities" JSONB,
    "resources" JSONB,
    "constraints" JSONB,
    "dependencies" JSONB,
    "metrics" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Plateau_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requirement" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'functional',
    "category" VARCHAR(100) NOT NULL DEFAULT 'general',
    "specification" VARCHAR(4000) NOT NULL,
    "acceptance_criteria" JSONB,
    "priority" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "status" VARCHAR(50) NOT NULL DEFAULT 'draft',
    "source" VARCHAR(255),
    "rationale" VARCHAR(2000),
    "constraints" VARCHAR(2000),
    "assumptions" VARCHAR(2000),
    "dependencies" JSONB,
    "conflicts" JSONB,
    "traceability" JSONB,
    "verification" JSONB,
    "validation" JSONB,
    "scope" VARCHAR(100) NOT NULL DEFAULT 'system',
    "domain" VARCHAR(100),
    "stakeholders" JSONB,
    "approvers" JSONB,
    "implementers" JSONB,
    "testers" JSONB,
    "effort_estimate" INTEGER,
    "complexity" VARCHAR(50),
    "risk_level" VARCHAR(50),
    "business_value" VARCHAR(50),
    "technical_impact" VARCHAR(50),
    "cost_estimate" DECIMAL(12,2),
    "target_release" VARCHAR(100),
    "actual_release" VARCHAR(100),
    "compliance_references" JSONB,
    "test_cases" JSONB,
    "defects" JSONB,
    "changes" JSONB,
    "reviews" JSONB,
    "comments" JSONB,
    "attachments" JSONB,
    "parent_requirement" TEXT,
    "child_requirements" JSONB,
    "derived_from" JSONB,
    "allocated_to" JSONB,
    "owner" VARCHAR(255),
    "analyst" VARCHAR(255),
    "architect" VARCHAR(255),
    "version" VARCHAR(50),
    "baseline" VARCHAR(100),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Requirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acceptance_criteria" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "requirementId" TEXT NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "description" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'draft',
    "priority" INTEGER DEFAULT 1,
    "givenWhenThen" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "acceptance_criteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" VARCHAR(30) NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT,
    "action" "ActionType" NOT NULL,
    "entityType" VARCHAR(100) NOT NULL,
    "entityId" VARCHAR(100) NOT NULL,
    "oldValues" JSONB,
    "newValues" JSONB,
    "ipAddress" VARCHAR(45),
    "userAgent" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000),
    "type" "LocationType" NOT NULL DEFAULT 'physical',
    "coordinates" JSONB,
    "capacity" JSONB,
    "accessibility" JSONB,
    "properties" JSONB,
    "parentId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" VARCHAR(30) NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000),
    "category" VARCHAR(100) NOT NULL,
    "content" JSONB NOT NULL,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "version" VARCHAR(20) NOT NULL DEFAULT '1.0.0',
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunicationNetwork" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'lan',
    "topology" VARCHAR(100),
    "protocols" JSONB,
    "addressSpace" VARCHAR(100),
    "vlan" VARCHAR(50),
    "security" JSONB,
    "qos" JSONB,
    "monitoring" JSONB,
    "devices" JSONB,
    "paths" JSONB,
    "metadata" JSONB,
    "tags" VARCHAR(500),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "CommunicationNetwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Constraint" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'technical',
    "category" VARCHAR(100) NOT NULL DEFAULT 'general',
    "specification" VARCHAR(4000) NOT NULL,
    "rationale" VARCHAR(2000),
    "source" VARCHAR(255),
    "scope" VARCHAR(100) NOT NULL DEFAULT 'project',
    "impact" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "priority" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "enforcement" VARCHAR(50) NOT NULL DEFAULT 'mandatory',
    "compliance" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "flexibility" VARCHAR(50) NOT NULL DEFAULT 'rigid',
    "timeframe" VARCHAR(100),
    "conditions" VARCHAR(2000),
    "exceptions" JSONB,
    "waivers" JSONB,
    "implications" JSONB,
    "alternatives" JSONB,
    "mitigation" VARCHAR(2000),
    "workarounds" JSONB,
    "affected_areas" JSONB,
    "stakeholders" JSONB,
    "requirements" JSONB,
    "decisions" JSONB,
    "risks" JSONB,
    "costs" JSONB,
    "benefits" JSONB,
    "measurements" JSONB,
    "violations" JSONB,
    "reviews" JSONB,
    "escalations" JSONB,
    "owner" VARCHAR(255),
    "approver" VARCHAR(255),
    "reviewer" VARCHAR(255),
    "monitor" VARCHAR(255),
    "effective_date" TIMESTAMP(3),
    "expiration_date" TIMESTAMP(3),
    "next_review_date" TIMESTAMP(3),
    "last_review_date" TIMESTAMP(3),
    "version" VARCHAR(50),
    "superseded_by" TEXT,
    "supersedes" TEXT,
    "parent_constraint" TEXT,
    "child_constraints" JSONB,
    "related_constraints" JSONB,
    "regulatory_basis" VARCHAR(2000),
    "business_justification" VARCHAR(2000),
    "technical_justification" VARCHAR(2000),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Constraint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RetentionRule" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "entityType" VARCHAR(100) NOT NULL,
    "retentionPeriod" INTEGER NOT NULL,
    "retentionUnit" "RetentionUnit" NOT NULL DEFAULT 'days',
    "action" "RetentionAction" NOT NULL DEFAULT 'archive',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "RetentionRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_scripts" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "acceptanceCriteriaId" TEXT NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "description" TEXT,
    "testType" VARCHAR(50) NOT NULL DEFAULT 'manual',
    "status" VARCHAR(50) NOT NULL DEFAULT 'draft',
    "automationLevel" VARCHAR(50) NOT NULL DEFAULT 'manual',
    "preconditions" TEXT,
    "testSteps" JSONB NOT NULL,
    "expectedResults" TEXT,
    "estimatedDuration" INTEGER,
    "environment" VARCHAR(50),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "test_scripts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_executions" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "testScriptId" TEXT NOT NULL,
    "executionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "executedBy" TEXT,
    "environment" VARCHAR(50),
    "actualResults" TEXT,
    "defects" JSONB,
    "screenshots" JSONB,
    "logs" TEXT,
    "duration" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "test_executions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mitigation_actions" (
    "id" TEXT NOT NULL,
    "mitigationId" TEXT NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "dueDate" TIMESTAMP(3),
    "assigneeId" TEXT,
    "status" "RiskStatus" NOT NULL DEFAULT 'IDENTIFIED',
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,

    CONSTRAINT "mitigation_actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Principle" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'business',
    "category" VARCHAR(100) NOT NULL DEFAULT 'general',
    "statement" VARCHAR(4000) NOT NULL,
    "rationale" VARCHAR(4000),
    "implications" JSONB,
    "guidelines" JSONB,
    "exceptions" JSONB,
    "scope" VARCHAR(100) NOT NULL DEFAULT 'organization',
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "priority" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "enforcement" VARCHAR(50) NOT NULL DEFAULT 'mandatory',
    "compliance" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "source" VARCHAR(255),
    "references" JSONB,
    "relatedPrinciples" JSONB,
    "stakeholders" JSONB,
    "applicability" VARCHAR(2000),
    "measurements" JSONB,
    "violations" JSONB,
    "reviews" JSONB,
    "approver" VARCHAR(255),
    "reviewer" VARCHAR(255),
    "owner" VARCHAR(255),
    "nextReviewDate" TIMESTAMP(3),
    "lastReviewDate" TIMESTAMP(3),
    "effectiveDate" TIMESTAMP(3),
    "expirationDate" TIMESTAMP(3),
    "version" VARCHAR(50),
    "supersededBy" TEXT,
    "supersedes" TEXT,
    "businessValue" VARCHAR(2000),
    "technicalImpact" VARCHAR(2000),
    "riskMitigation" VARCHAR(2000),
    "costImplications" VARCHAR(2000),
    "implementationGuidance" VARCHAR(4000),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Principle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Outcome" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'business',
    "category" VARCHAR(100) NOT NULL DEFAULT 'strategic',
    "status" VARCHAR(50) NOT NULL DEFAULT 'planned',
    "priority" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "targetDate" TIMESTAMP(3),
    "achievedDate" TIMESTAMP(3),
    "targetValue" VARCHAR(255),
    "actualValue" VARCHAR(255),
    "measurementUnit" VARCHAR(100),
    "scope" VARCHAR(100) NOT NULL DEFAULT 'organization',
    "objectives" JSONB,
    "benefits" JSONB,
    "kpis" JSONB,
    "metrics" JSONB,
    "stakeholders" JSONB,
    "dependencies" JSONB,
    "risks" JSONB,
    "assumptions" VARCHAR(2000),
    "constraints" JSONB,
    "successCriteria" JSONB,
    "progress" INTEGER NOT NULL DEFAULT 0,
    "confidence" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "businessValue" VARCHAR(2000),
    "strategicAlignment" VARCHAR(2000),
    "owner" VARCHAR(255),
    "sponsor" VARCHAR(255),
    "accountable" VARCHAR(255),
    "relatedWorkPackages" JSONB,
    "relatedPlateaus" JSONB,
    "relatedGaps" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Outcome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "values" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "category" VARCHAR(100) NOT NULL DEFAULT 'organizational',
    "type" VARCHAR(100) NOT NULL DEFAULT 'core',
    "priority" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "statement" TEXT,
    "rationale" TEXT,
    "expectedBehaviors" JSONB,
    "measurements" JSONB,
    "stakeholder" VARCHAR(255),
    "scope" VARCHAR(100) NOT NULL DEFAULT 'organization',
    "culturalImportance" VARCHAR(50),
    "strategicAlignment" TEXT,
    "relatedPrinciples" JSONB,
    "relatedGoals" JSONB,
    "examples" JSONB,
    "isCore" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "adoptionLevel" VARCHAR(50),
    "reviewDate" TIMESTAMP(3),
    "approvedDate" TIMESTAMP(3),
    "approvedBy" VARCHAR(255),
    "version" VARCHAR(50),
    "businessArea" VARCHAR(255),
    "owner" VARCHAR(255),
    "stakeholders" JSONB,
    "metadata" JSONB,
    "tags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'computer',
    "category" VARCHAR(100) NOT NULL DEFAULT 'endpoint',
    "manufacturer" VARCHAR(255),
    "model" VARCHAR(255),
    "serialNumber" VARCHAR(255),
    "assetTag" VARCHAR(100),
    "location" VARCHAR(255),
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "operatingSystem" VARCHAR(255),
    "processor" VARCHAR(255),
    "memory" VARCHAR(100),
    "storage" VARCHAR(100),
    "network" JSONB,
    "specifications" JSONB,
    "warranties" JSONB,
    "maintenance" JSONB,
    "assignments" JSONB,
    "software" JSONB,
    "components" JSONB,
    "node" TEXT,
    "cost" DECIMAL(12,2),
    "depreciation" JSONB,
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" "DriverType" NOT NULL DEFAULT 'business',
    "category" VARCHAR(100) NOT NULL,
    "description" VARCHAR(2000),
    "source" VARCHAR(255),
    "urgency" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "impact" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "timeframe" VARCHAR(100),
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "businessValue" VARCHAR(2000),
    "risks" JSONB,
    "opportunities" JSONB,
    "constraints" JSONB,
    "stakeholders" JSONB,
    "dependencies" JSONB,
    "isExternal" BOOLEAN NOT NULL DEFAULT false,
    "isRegulatory" BOOLEAN NOT NULL DEFAULT false,
    "compliance" VARCHAR(500),
    "evidenceBase" VARCHAR(2000),
    "measurability" VARCHAR(500),
    "priority" VARCHAR(20) NOT NULL DEFAULT 'medium',
    "tags" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grouping" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000),
    "type" "GroupingType" NOT NULL DEFAULT 'logical',
    "criteria" JSONB,
    "members" JSONB,
    "hierarchy" JSONB,
    "properties" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "Grouping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SystemSoftware" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(2000),
    "type" VARCHAR(100) NOT NULL DEFAULT 'application',
    "category" VARCHAR(100) NOT NULL DEFAULT 'business',
    "vendor" VARCHAR(255),
    "version" VARCHAR(100),
    "edition" VARCHAR(100),
    "architecture" VARCHAR(50),
    "language" VARCHAR(50),
    "status" VARCHAR(50) NOT NULL DEFAULT 'active',
    "lifecycle" VARCHAR(50) NOT NULL DEFAULT 'production',
    "installation" JSONB,
    "configuration" JSONB,
    "dependencies" JSONB,
    "components" JSONB,
    "devices" JSONB,
    "licensing" JSONB,
    "support" JSONB,
    "security" JSONB,
    "backup" JSONB,
    "updates" JSONB,
    "cost" DECIMAL(12,2),
    "tags" VARCHAR(500),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "SystemSoftware_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "relationships" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "type" "RelationshipType" NOT NULL,
    "sourceEntityType" "EntityType" NOT NULL,
    "sourceEntityId" TEXT NOT NULL,
    "targetEntityType" "EntityType" NOT NULL,
    "targetEntityId" TEXT NOT NULL,
    "strength" INTEGER NOT NULL DEFAULT 50,
    "confidence" INTEGER NOT NULL DEFAULT 100,
    "bidirectional" BOOLEAN NOT NULL DEFAULT false,
    "description" TEXT,
    "tags" TEXT[],
    "properties" JSONB,
    "validFrom" TIMESTAMP(3),
    "validUntil" TIMESTAMP(3),
    "source" "RelationshipSource" NOT NULL DEFAULT 'MANUAL',
    "verifiedBy" TEXT,
    "verifiedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "relationships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "embeddings" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "entityType" VARCHAR(100) NOT NULL,
    "entityId" TEXT NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "embedding" JSONB NOT NULL,
    "dimensions" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "embeddings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "document_chunks" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "documentType" VARCHAR(100) NOT NULL,
    "chunkIndex" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "tokens" INTEGER NOT NULL,
    "startOffset" INTEGER,
    "endOffset" INTEGER,
    "metadata" JSONB,
    "embeddingId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "document_chunks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knowledge_graphs" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "nodeCount" INTEGER NOT NULL DEFAULT 0,
    "edgeCount" INTEGER NOT NULL DEFAULT 0,
    "graphData" JSONB NOT NULL,
    "lastComputedAt" TIMESTAMP(3),
    "computationVersion" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "knowledge_graphs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semantic_searches" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "queryEmbedding" JSONB NOT NULL,
    "results" JSONB NOT NULL,
    "resultCount" INTEGER NOT NULL,
    "filters" JSONB,
    "executionTime" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "semantic_searches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rag_contexts" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "contextType" VARCHAR(100) NOT NULL,
    "entityType" VARCHAR(100),
    "entityId" TEXT,
    "contextData" JSONB NOT NULL,
    "relevanceScore" DECIMAL(5,4),
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "lastUsedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rag_contexts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "context_caches" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "cacheKey" VARCHAR(255) NOT NULL,
    "cacheData" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "context_caches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_conversations" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "context" JSONB,
    "messageCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ai_conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_messages" (
    "id" TEXT NOT NULL,
    "conversationId" TEXT NOT NULL,
    "role" VARCHAR(20) NOT NULL,
    "content" TEXT NOT NULL,
    "model" VARCHAR(100),
    "tokensUsed" INTEGER,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "features" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" VARCHAR(50) NOT NULL DEFAULT 'planned',
    "priority" VARCHAR(50) NOT NULL DEFAULT 'medium',
    "targetDate" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "estimatedEffort" INTEGER,
    "actualEffort" INTEGER,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archimate_diagrams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" "DiagramType" NOT NULL,
    "notation" "DiagramNotation" NOT NULL DEFAULT 'ARCHIMATE_3_2',
    "layer" "ArchiMateLayer",
    "viewpoint" TEXT,
    "metadata" JSONB,
    "layout" JSONB,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "archimate_diagrams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archimate_elements" (
    "id" TEXT NOT NULL,
    "diagramId" TEXT NOT NULL,
    "elementType" "ArchiMateElementType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "documentation" TEXT,
    "layer" "ArchiMateLayer" NOT NULL,
    "properties" JSONB,
    "position" JSONB,
    "size" JSONB,
    "style" JSONB,
    "capabilityId" TEXT,
    "requirementId" TEXT,
    "applicationId" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "archimate_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "archimate_relationships" (
    "id" TEXT NOT NULL,
    "diagramId" TEXT NOT NULL,
    "relationshipType" "ArchiMateRelationshipType" NOT NULL,
    "sourceId" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "properties" JSONB,
    "style" JSONB,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "archimate_relationships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "togaf_phases" (
    "id" TEXT NOT NULL,
    "phaseType" "TOGAFPhaseType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "objectives" TEXT,
    "approach" TEXT,
    "inputs" JSONB,
    "outputs" JSONB,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" "TOGAFDeliverableStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "completionPct" INTEGER NOT NULL DEFAULT 0,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "togaf_phases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "togaf_deliverables" (
    "id" TEXT NOT NULL,
    "phaseId" TEXT NOT NULL,
    "deliverableType" "TOGAFDeliverableType" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "content" TEXT,
    "attachments" JSONB,
    "status" "TOGAFDeliverableStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "dueDate" TIMESTAMP(3),
    "completedDate" TIMESTAMP(3),
    "assignedTo" TEXT,
    "reviewers" JSONB,
    "diagramId" TEXT,
    "capabilityId" TEXT,
    "requirementId" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "togaf_deliverables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "togaf_building_blocks" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "category" TEXT,
    "version" TEXT,
    "status" TEXT,
    "functionality" TEXT,
    "interfaces" JSONB,
    "dependencies" JSONB,
    "elementId" TEXT,
    "capabilityId" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "togaf_building_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connector_configs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ConnectorType" NOT NULL,
    "status" "ConnectorStatus" NOT NULL DEFAULT 'PENDING_SETUP',
    "description" TEXT,
    "credentials" JSONB NOT NULL,
    "endpoint" TEXT,
    "config" JSONB,
    "syncEnabled" BOOLEAN NOT NULL DEFAULT false,
    "syncFrequency" TEXT,
    "lastSyncAt" TIMESTAMP(3),
    "nextSyncAt" TIMESTAMP(3),
    "autoSync" BOOLEAN NOT NULL DEFAULT false,
    "totalSyncs" INTEGER NOT NULL DEFAULT 0,
    "successfulSyncs" INTEGER NOT NULL DEFAULT 0,
    "failedSyncs" INTEGER NOT NULL DEFAULT 0,
    "recordsImported" INTEGER NOT NULL DEFAULT 0,
    "recordsUpdated" INTEGER NOT NULL DEFAULT 0,
    "recordsDeleted" INTEGER NOT NULL DEFAULT 0,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "connector_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connector_sync_jobs" (
    "id" TEXT NOT NULL,
    "connectorId" TEXT NOT NULL,
    "status" "SyncStatus" NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "duration" INTEGER,
    "recordsProcessed" INTEGER NOT NULL DEFAULT 0,
    "recordsImported" INTEGER NOT NULL DEFAULT 0,
    "recordsUpdated" INTEGER NOT NULL DEFAULT 0,
    "recordsSkipped" INTEGER NOT NULL DEFAULT 0,
    "recordsFailed" INTEGER NOT NULL DEFAULT 0,
    "errors" JSONB,
    "warnings" JSONB,
    "summary" TEXT,
    "logs" TEXT,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "connector_sync_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connector_data_mappings" (
    "id" TEXT NOT NULL,
    "connectorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "sourceEntity" TEXT NOT NULL,
    "sourceField" TEXT NOT NULL,
    "sourceType" TEXT,
    "targetEntity" TEXT NOT NULL,
    "targetField" TEXT NOT NULL,
    "targetType" TEXT,
    "transformType" "DataMappingTransformType" NOT NULL DEFAULT 'DIRECT',
    "transformConfig" JSONB,
    "defaultValue" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "validationRules" JSONB,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "connector_data_mappings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webhook_configs" (
    "id" TEXT NOT NULL,
    "connectorId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "secret" TEXT,
    "events" JSONB NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "retryOnFailure" BOOLEAN NOT NULL DEFAULT true,
    "maxRetries" INTEGER NOT NULL DEFAULT 3,
    "retryDelay" INTEGER NOT NULL DEFAULT 60,
    "totalCalls" INTEGER NOT NULL DEFAULT 0,
    "successfulCalls" INTEGER NOT NULL DEFAULT 0,
    "failedCalls" INTEGER NOT NULL DEFAULT 0,
    "lastCalledAt" TIMESTAMP(3),
    "lastStatus" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "webhook_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "webhook_logs" (
    "id" TEXT NOT NULL,
    "webhookId" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "payload" JSONB,
    "response" JSONB,
    "statusCode" INTEGER,
    "success" BOOLEAN NOT NULL,
    "errorMessage" TEXT,
    "executedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "webhook_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mcp_servers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "serverUrl" TEXT NOT NULL,
    "apiKey" TEXT,
    "status" "ConnectorStatus" NOT NULL DEFAULT 'PENDING_SETUP',
    "capabilities" JSONB,
    "config" JSONB,
    "aiModel" TEXT,
    "discoveryEnabled" BOOLEAN NOT NULL DEFAULT true,
    "autoMapping" BOOLEAN NOT NULL DEFAULT true,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "mcp_servers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "code_templates" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "language" "CodeLanguage" NOT NULL,
    "framework" "CodeFramework",
    "category" TEXT,
    "template" TEXT NOT NULL,
    "variables" JSONB,
    "sampleOutput" TEXT,
    "version" TEXT,
    "author" TEXT,
    "tags" JSONB,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "code_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "generated_code" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "requirementId" TEXT,
    "capabilityId" TEXT,
    "diagramId" TEXT,
    "code" TEXT NOT NULL,
    "language" "CodeLanguage" NOT NULL,
    "framework" "CodeFramework",
    "status" "GenerationStatus" NOT NULL DEFAULT 'COMPLETED',
    "variables" JSONB,
    "context" JSONB,
    "aiGenerated" BOOLEAN NOT NULL DEFAULT false,
    "aiModel" TEXT,
    "version" TEXT,
    "parentId" TEXT,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "generated_code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diagrams" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "type" "DiagramType" NOT NULL,
    "notation" "NotationType" NOT NULL,
    "layerId" TEXT,
    "viewpointId" TEXT,
    "layout" JSONB,
    "style" JSONB,
    "metadata" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "diagrams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diagram_layers" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "layerType" VARCHAR(50) NOT NULL,
    "color" VARCHAR(20),
    "zIndex" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,

    CONSTRAINT "diagram_layers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diagram_nodes" (
    "id" TEXT NOT NULL,
    "diagramId" TEXT NOT NULL,
    "nodeType" VARCHAR(100) NOT NULL,
    "elementId" TEXT,
    "elementType" VARCHAR(100),
    "label" VARCHAR(500) NOT NULL,
    "description" TEXT,
    "positionX" DOUBLE PRECISION NOT NULL,
    "positionY" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "style" JSONB,
    "properties" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diagram_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diagram_edges" (
    "id" TEXT NOT NULL,
    "diagramId" TEXT NOT NULL,
    "sourceNodeId" TEXT NOT NULL,
    "targetNodeId" TEXT NOT NULL,
    "edgeType" VARCHAR(100) NOT NULL,
    "relationshipId" TEXT,
    "label" VARCHAR(255),
    "style" JSONB,
    "waypoints" JSONB,
    "properties" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diagram_edges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diagram_views" (
    "id" TEXT NOT NULL,
    "diagramId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "viewpointType" VARCHAR(100) NOT NULL,
    "visibleLayers" TEXT[],
    "hiddenElements" TEXT[],
    "zoom" DOUBLE PRECISION DEFAULT 1.0,
    "panX" DOUBLE PRECISION DEFAULT 0,
    "panY" DOUBLE PRECISION DEFAULT 0,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "diagram_views_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notations" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "version" VARCHAR(20) NOT NULL,
    "type" "NotationType" NOT NULL,
    "elementTypes" JSONB NOT NULL,
    "relationTypes" JSONB NOT NULL,
    "rules" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "erd_tables" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "diagramId" TEXT,
    "schemaName" VARCHAR(100),
    "tableName" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "tableType" VARCHAR(50) NOT NULL DEFAULT 'TABLE',
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "erd_tables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "erd_columns" (
    "id" TEXT NOT NULL,
    "tableId" TEXT NOT NULL,
    "columnName" VARCHAR(255) NOT NULL,
    "dataType" VARCHAR(100) NOT NULL,
    "isPrimaryKey" BOOLEAN NOT NULL DEFAULT false,
    "isForeignKey" BOOLEAN NOT NULL DEFAULT false,
    "isNullable" BOOLEAN NOT NULL DEFAULT true,
    "isUnique" BOOLEAN NOT NULL DEFAULT false,
    "defaultValue" VARCHAR(255),
    "length" INTEGER,
    "precision" INTEGER,
    "scale" INTEGER,
    "description" TEXT,
    "position" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "erd_columns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "erd_relationships" (
    "id" TEXT NOT NULL,
    "sourceTableId" TEXT NOT NULL,
    "targetTableId" TEXT NOT NULL,
    "relationshipType" VARCHAR(50) NOT NULL,
    "sourceCardinality" VARCHAR(20) NOT NULL,
    "targetCardinality" VARCHAR(20) NOT NULL,
    "sourceColumns" TEXT[],
    "targetColumns" TEXT[],
    "constraintName" VARCHAR(255),
    "onDelete" VARCHAR(50),
    "onUpdate" VARCHAR(50),
    "description" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "erd_relationships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uml_classes" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "diagramId" TEXT,
    "className" VARCHAR(255) NOT NULL,
    "packageName" VARCHAR(255),
    "stereotype" VARCHAR(100),
    "visibility" VARCHAR(20) NOT NULL DEFAULT 'public',
    "isAbstract" BOOLEAN NOT NULL DEFAULT false,
    "isInterface" BOOLEAN NOT NULL DEFAULT false,
    "attributes" JSONB,
    "methods" JSONB,
    "description" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "uml_classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uml_relationships" (
    "id" TEXT NOT NULL,
    "sourceClassId" TEXT NOT NULL,
    "targetClassId" TEXT NOT NULL,
    "relationshipType" VARCHAR(50) NOT NULL,
    "sourceMultiplicity" VARCHAR(20),
    "targetMultiplicity" VARCHAR(20),
    "sourceRole" VARCHAR(100),
    "targetRole" VARCHAR(100),
    "description" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "uml_relationships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "c4_components" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "componentType" VARCHAR(50) NOT NULL,
    "technology" VARCHAR(255),
    "level" VARCHAR(50) NOT NULL,
    "parentId" TEXT,
    "tags" TEXT[],
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "c4_components_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bpmn_elements" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "diagramId" TEXT,
    "elementType" VARCHAR(100) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "properties" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bpmn_elements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maturity_level_configs" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT NOT NULL,
    "characteristics" JSONB NOT NULL,
    "color" VARCHAR(20),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maturity_level_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maturity_scores" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "capabilityId" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,
    "dimensionId" TEXT,
    "score" DECIMAL(5,2) NOT NULL,
    "confidence" DECIMAL(5,2) NOT NULL,
    "evidenceSources" JSONB,
    "inferenceData" JSONB,
    "assessedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assessedBy" TEXT,
    "validUntil" TIMESTAMP(3),
    "metadata" JSONB,

    CONSTRAINT "maturity_scores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maturity_dimensions" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "weight" DECIMAL(3,2) NOT NULL DEFAULT 1.0,
    "criteria" JSONB NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maturity_dimensions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "benchmark_data" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "industry" VARCHAR(100) NOT NULL,
    "companySize" VARCHAR(50) NOT NULL,
    "region" VARCHAR(100),
    "capabilityType" VARCHAR(100) NOT NULL,
    "avgScore" DECIMAL(5,2) NOT NULL,
    "medianScore" DECIMAL(5,2) NOT NULL,
    "percentile25" DECIMAL(5,2) NOT NULL,
    "percentile75" DECIMAL(5,2) NOT NULL,
    "sampleSize" INTEGER NOT NULL,
    "dataSource" VARCHAR(100) NOT NULL,
    "collectedAt" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "benchmark_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requirement_sources" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "requirementId" TEXT NOT NULL,
    "sourceType" VARCHAR(100) NOT NULL,
    "sourceId" TEXT,
    "sourceName" VARCHAR(255) NOT NULL,
    "extractedText" TEXT,
    "confidence" DECIMAL(5,2),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "requirement_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requirement_templates" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "category" VARCHAR(100) NOT NULL,
    "template" TEXT NOT NULL,
    "variables" JSONB,
    "exampleOutput" TEXT,
    "usageCount" INTEGER NOT NULL DEFAULT 0,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT[],
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "requirement_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requirement_generations" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "templateId" TEXT,
    "inputData" JSONB NOT NULL,
    "prompt" TEXT NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "generatedText" TEXT NOT NULL,
    "confidence" DECIMAL(5,2) NOT NULL,
    "requirementsCreated" INTEGER NOT NULL DEFAULT 0,
    "feedback" TEXT,
    "rating" INTEGER,
    "executionTime" INTEGER,
    "tokensUsed" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "requirement_generations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "requirement_dependencies" (
    "id" TEXT NOT NULL,
    "sourceRequirementId" TEXT NOT NULL,
    "targetRequirementId" TEXT NOT NULL,
    "dependencyType" VARCHAR(50) NOT NULL,
    "strength" VARCHAR(50) NOT NULL DEFAULT 'REQUIRED',
    "description" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "requirement_dependencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integration_templates" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "providerName" VARCHAR(255) NOT NULL,
    "providerLogo" VARCHAR(500),
    "version" VARCHAR(50) NOT NULL,
    "configSchema" JSONB NOT NULL,
    "mappingTemplate" JSONB NOT NULL,
    "authType" VARCHAR(100) NOT NULL,
    "authSchema" JSONB,
    "endpoints" JSONB NOT NULL,
    "syncFrequency" VARCHAR(50),
    "isOfficial" BOOLEAN NOT NULL DEFAULT false,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "installCount" INTEGER NOT NULL DEFAULT 0,
    "rating" DECIMAL(3,2),
    "documentation" TEXT,
    "tags" TEXT[],
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "integration_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connector_registry" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "config" JSONB NOT NULL,
    "status" VARCHAR(50) NOT NULL DEFAULT 'draft',
    "lastSyncAt" TIMESTAMP(3),
    "nextSyncAt" TIMESTAMP(3),
    "syncCount" INTEGER NOT NULL DEFAULT 0,
    "errorCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT NOT NULL,

    CONSTRAINT "connector_registry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integration_marketplace" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "trending" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "installCount" INTEGER NOT NULL DEFAULT 0,
    "avgRating" DECIMAL(3,2),
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "metadata" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "integration_marketplace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sync_logs" (
    "id" TEXT NOT NULL,
    "syncJobId" TEXT NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "recordsProcessed" INTEGER NOT NULL DEFAULT 0,
    "recordsSuccess" INTEGER NOT NULL DEFAULT 0,
    "recordsFailed" INTEGER NOT NULL DEFAULT 0,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "duration" INTEGER,
    "errorMessage" TEXT,
    "errorDetails" JSONB,
    "metadata" JSONB,

    CONSTRAINT "sync_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "import_jobs" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "importType" VARCHAR(100) NOT NULL,
    "sourceFile" VARCHAR(500),
    "sourceData" JSONB,
    "mapping" JSONB NOT NULL,
    "status" VARCHAR(50) NOT NULL,
    "recordsTotal" INTEGER NOT NULL DEFAULT 0,
    "recordsImported" INTEGER NOT NULL DEFAULT 0,
    "recordsFailed" INTEGER NOT NULL DEFAULT 0,
    "validationErrors" JSONB,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "createdBy" TEXT NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "import_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "framework_interactions" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "frameworkId" TEXT,
    "frameworkName" VARCHAR(255) NOT NULL,
    "interactionType" VARCHAR(50) NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "framework_interactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acm_domains" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(50) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "icon" VARCHAR(100),
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "acm_domains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acm_capabilities" (
    "id" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "code" VARCHAR(100) NOT NULL,
    "name" VARCHAR(500) NOT NULL,
    "description" TEXT NOT NULL,
    "implementation" TEXT,
    "examples" JSONB,
    "bestPractices" JSONB,
    "antiPatterns" JSONB,
    "requiredTools" JSONB,
    "estimatedComplexity" VARCHAR(50),
    "estimatedEffort" VARCHAR(50),
    "skillsRequired" JSONB,
    "tags" TEXT[],
    "templateId" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "acm_capabilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acm_requirement_generations" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "acmCapabilityId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "inputContext" JSONB NOT NULL,
    "generatedText" TEXT NOT NULL,
    "parsedRequirements" JSONB,
    "model" VARCHAR(100) NOT NULL,
    "tokensUsed" INTEGER,
    "executionTime" INTEGER,
    "requirementsCreated" INTEGER NOT NULL DEFAULT 0,
    "status" VARCHAR(50) NOT NULL DEFAULT 'pending',
    "feedback" TEXT,
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "acm_requirement_generations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "framework_analytics_sessions" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionStarted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionEnded" TIMESTAMP(3),
    "totalDuration" INTEGER,
    "actionsCount" INTEGER NOT NULL DEFAULT 0,
    "viewedFrameworks" INTEGER NOT NULL DEFAULT 0,
    "installedFrameworks" INTEGER NOT NULL DEFAULT 0,
    "sessionType" "FrameworkSessionType" NOT NULL DEFAULT 'MARKETPLACE',
    "userAgent" TEXT,
    "referrer" TEXT,
    "metadata" JSONB,

    CONSTRAINT "framework_analytics_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "framework_analytics_events" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "frameworkId" TEXT,
    "frameworkName" VARCHAR(255),
    "eventType" "FrameworkEventType" NOT NULL,
    "eventData" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "framework_analytics_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "framework_usage_metrics" (
    "id" TEXT NOT NULL,
    "frameworkId" TEXT NOT NULL,
    "frameworkName" VARCHAR(255) NOT NULL,
    "organizationId" TEXT NOT NULL,
    "totalViews" INTEGER NOT NULL DEFAULT 0,
    "totalInstallations" INTEGER NOT NULL DEFAULT 0,
    "totalCompletions" INTEGER NOT NULL DEFAULT 0,
    "avgTimeToInstall" INTEGER,
    "avgCompletionTime" INTEGER,
    "successRate" DOUBLE PRECISION,
    "lastUsed" TIMESTAMP(3),
    "popularityScore" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "effectivenessScore" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "weeklyViews" INTEGER NOT NULL DEFAULT 0,
    "monthlyViews" INTEGER NOT NULL DEFAULT 0,
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "framework_usage_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "framework_recommendation_metrics" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "recommendationType" "RecommendationType" NOT NULL,
    "frameworkId" TEXT NOT NULL,
    "frameworkName" VARCHAR(255) NOT NULL,
    "recommendationSource" VARCHAR(100) NOT NULL,
    "recommendationScore" DOUBLE PRECISION NOT NULL,
    "wasAccepted" BOOLEAN NOT NULL DEFAULT false,
    "wasInstalled" BOOLEAN NOT NULL DEFAULT false,
    "timeToAction" INTEGER,
    "rejectionReason" VARCHAR(255),
    "feedbackScore" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "framework_recommendation_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "framework_bundle_analytics" (
    "id" TEXT NOT NULL,
    "bundleId" VARCHAR(100) NOT NULL,
    "bundleName" VARCHAR(255) NOT NULL,
    "organizationId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "installCount" INTEGER NOT NULL DEFAULT 0,
    "completionRate" DOUBLE PRECISION,
    "timeToComplete" INTEGER,
    "abandonmentStage" VARCHAR(100),
    "userRating" INTEGER,
    "businessValue" DOUBLE PRECISION,
    "lastInteraction" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "framework_bundle_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "framework_templates" (
    "id" TEXT NOT NULL,
    "frameworkId" VARCHAR(100) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "shortName" VARCHAR(50),
    "acronym" VARCHAR(20),
    "version" VARCHAR(20) NOT NULL DEFAULT '1.0',
    "description" TEXT NOT NULL,
    "longDescription" TEXT,
    "category" "FrameworkCategory" NOT NULL,
    "subcategory" VARCHAR(100),
    "domain" "FrameworkDomain" NOT NULL,
    "industry" TEXT[],
    "organizationSize" TEXT[],
    "maturityLevel" TEXT[],
    "complexity" "FrameworkComplexity" NOT NULL DEFAULT 'MEDIUM',
    "implementationTime" VARCHAR(50) NOT NULL,
    "prerequisites" TEXT[],
    "dependencies" TEXT[],
    "businessValue" TEXT[],
    "useCases" TEXT[],
    "keyFeatures" TEXT[],
    "outcomes" TEXT[],
    "methodology" JSONB,
    "templates" JSONB,
    "assessments" JSONB,
    "kpis" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "popularity" INTEGER NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "framework_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "framework_relationships" (
    "id" TEXT NOT NULL,
    "sourceFrameworkId" TEXT NOT NULL,
    "targetFrameworkId" TEXT NOT NULL,
    "relationshipType" "FrameworkRelationshipType" NOT NULL,
    "strength" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "description" VARCHAR(500),
    "isBidirectional" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "framework_relationships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organization_frameworks" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "frameworkTemplateId" TEXT NOT NULL,
    "name" VARCHAR(255),
    "status" "FrameworkImplementationStatus" NOT NULL DEFAULT 'PLANNING',
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "maturityLevel" "FrameworkMaturityLevel" NOT NULL DEFAULT 'INITIAL',
    "customizations" JSONB,
    "configuration" JSONB,
    "assessmentResults" JSONB,
    "startDate" TIMESTAMP(3),
    "targetDate" TIMESTAMP(3),
    "completionDate" TIMESTAMP(3),
    "lastAssessmentDate" TIMESTAMP(3),
    "nextAssessmentDate" TIMESTAMP(3),
    "ownerId" TEXT,
    "teamMemberIds" TEXT[],
    "notes" TEXT,
    "tags" TEXT[],
    "priority" "FrameworkPriority" NOT NULL DEFAULT 'MEDIUM',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "organization_frameworks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "framework_assessments" (
    "id" TEXT NOT NULL,
    "organizationFrameworkId" TEXT NOT NULL,
    "assessmentType" "FrameworkAssessmentType" NOT NULL DEFAULT 'MATURITY',
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "overallScore" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "maturityLevel" "FrameworkMaturityLevel" NOT NULL DEFAULT 'INITIAL',
    "results" JSONB NOT NULL,
    "recommendations" JSONB,
    "gaps" JSONB,
    "strengths" JSONB,
    "assessmentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nextAssessmentDate" TIMESTAMP(3),
    "assessorId" TEXT,
    "assessorType" VARCHAR(50),
    "status" "AssessmentStatus" NOT NULL DEFAULT 'COMPLETED',
    "isBaseline" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "framework_assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "framework_tasks" (
    "id" TEXT NOT NULL,
    "organizationFrameworkId" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "taskType" "FrameworkTaskType" NOT NULL DEFAULT 'IMPLEMENTATION',
    "status" "FrameworkTaskStatus" NOT NULL DEFAULT 'PENDING',
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "startDate" TIMESTAMP(3),
    "dueDate" TIMESTAMP(3),
    "completionDate" TIMESTAMP(3),
    "assigneeId" TEXT,
    "estimatedHours" DOUBLE PRECISION,
    "actualHours" DOUBLE PRECISION,
    "dependsOnTaskIds" TEXT[],
    "blockedByTaskIds" TEXT[],
    "tags" TEXT[],
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "framework_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "framework_milestones" (
    "id" TEXT NOT NULL,
    "organizationFrameworkId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "milestoneType" "FrameworkMilestoneType" NOT NULL DEFAULT 'PHASE_COMPLETION',
    "status" "FrameworkMilestoneStatus" NOT NULL DEFAULT 'PENDING',
    "progress" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "targetDate" TIMESTAMP(3) NOT NULL,
    "actualDate" TIMESTAMP(3),
    "successCriteria" JSONB,
    "completionEvidence" JSONB,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "approverId" TEXT,
    "completedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,

    CONSTRAINT "framework_milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "framework_analytics" (
    "id" TEXT NOT NULL,
    "frameworkTemplateId" TEXT NOT NULL,
    "organizationId" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "implementationCount" INTEGER NOT NULL DEFAULT 0,
    "completionCount" INTEGER NOT NULL DEFAULT 0,
    "averageImplementationTime" DOUBLE PRECISION,
    "averageCompletionRate" DOUBLE PRECISION,
    "averageSatisfactionScore" DOUBLE PRECISION,
    "period" "AnalyticsPeriod" NOT NULL DEFAULT 'MONTHLY',
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "lastCalculated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "framework_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "framework_recommendations" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "frameworkTemplateId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "priority" "RecommendationPriority" NOT NULL DEFAULT 'MEDIUM',
    "triggerEvent" VARCHAR(100),
    "contextData" JSONB,
    "status" "RecommendationStatus" NOT NULL DEFAULT 'PENDING',
    "userFeedback" DOUBLE PRECISION,
    "userComments" TEXT,
    "recommendedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiryDate" TIMESTAMP(3),
    "respondedDate" TIMESTAMP(3),
    "algorithmVersion" VARCHAR(20),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "framework_recommendations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "framework_table_data" (
    "id" TEXT NOT NULL,
    "organizationFrameworkId" TEXT NOT NULL,
    "grandchildId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "framework_table_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kanban_boards" (
    "id" TEXT NOT NULL,
    "organizationFrameworkId" TEXT NOT NULL,
    "frameworkSlug" TEXT NOT NULL,
    "columns" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kanban_boards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kanban_cards" (
    "id" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "columnId" TEXT NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "description" TEXT,
    "priority" VARCHAR(50),
    "assignee" VARCHAR(255),
    "dueDate" TIMESTAMP(3),
    "tags" TEXT[],
    "metadata" JSONB,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kanban_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "capability_map_data" (
    "id" TEXT NOT NULL,
    "organizationFrameworkId" TEXT NOT NULL,
    "frameworkSlug" TEXT NOT NULL,
    "capabilities" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "capability_map_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContactToContactTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ContactToContactTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FrameworkTemplateToOrganization" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FrameworkTemplateToOrganization_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FrameworkRecommendationViewer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FrameworkRecommendationViewer_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "IX_Account_userId" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_hashedKey_key" ON "ApiKey"("hashedKey");

-- CreateIndex
CREATE INDEX "IX_ApiKey_organizationId" ON "ApiKey"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthenticatorApp_userId_key" ON "AuthenticatorApp"("userId");

-- CreateIndex
CREATE INDEX "IX_AuthenticatorApp_userId" ON "AuthenticatorApp"("userId");

-- CreateIndex
CREATE INDEX "IX_ChangeEmailRequest_userId" ON "ChangeEmailRequest"("userId");

-- CreateIndex
CREATE INDEX "IX_Contact_organizationId" ON "Contact"("organizationId");

-- CreateIndex
CREATE INDEX "IX_ContactActivity_contactId" ON "ContactActivity"("contactId");

-- CreateIndex
CREATE INDEX "IX_ContactActivity_occurredAt" ON "ContactActivity"("occurredAt");

-- CreateIndex
CREATE INDEX "IX_ContactComment_contactId" ON "ContactComment"("contactId");

-- CreateIndex
CREATE INDEX "IX_ContactComment_userId" ON "ContactComment"("userId");

-- CreateIndex
CREATE INDEX "IX_ContactImage_contactId" ON "ContactImage"("contactId");

-- CreateIndex
CREATE INDEX "IX_ContactNote_contactId" ON "ContactNote"("contactId");

-- CreateIndex
CREATE INDEX "IX_ContactNote_userId" ON "ContactNote"("userId");

-- CreateIndex
CREATE INDEX "IX_ContactPageVisit_contactId" ON "ContactPageVisit"("contactId");

-- CreateIndex
CREATE INDEX "IX_ContactPageVisit_userId" ON "ContactPageVisit"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ContactTag_text_key" ON "ContactTag"("text");

-- CreateIndex
CREATE INDEX "IX_ContactTask_contactId" ON "ContactTask"("contactId");

-- CreateIndex
CREATE INDEX "IX_Favorite_userId" ON "Favorite"("userId");

-- CreateIndex
CREATE INDEX "IX_Favorite_contactId" ON "Favorite"("contactId");

-- CreateIndex
CREATE INDEX "IX_Feedback_organizationId" ON "Feedback"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Feedback_userId" ON "Feedback"("userId");

-- CreateIndex
CREATE INDEX "IX_Invitation_organizationId" ON "Invitation"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Invitation_token" ON "Invitation"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Membership_organizationId_userId_key" ON "Membership"("organizationId", "userId");

-- CreateIndex
CREATE INDEX "IX_Notification_userId" ON "Notification"("userId");

-- CreateIndex
CREATE INDEX "IX_Notification_organizationId" ON "Notification"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Order_organizationId" ON "Order"("organizationId");

-- CreateIndex
CREATE INDEX "IX_OrderItem_orderId" ON "OrderItem"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE INDEX "IX_Organization_billingCustomerId" ON "Organization"("billingCustomerId");

-- CreateIndex
CREATE INDEX "IX_OrganizationLogo_organizationId" ON "OrganizationLogo"("organizationId");

-- CreateIndex
CREATE INDEX "IX_ResetPasswordRequest_email" ON "ResetPasswordRequest"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "IX_Session_userId" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "IX_Subscription_organizationId" ON "Subscription"("organizationId");

-- CreateIndex
CREATE INDEX "IX_SubscriptionItem_subscriptionId" ON "SubscriptionItem"("subscriptionId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "IX_UserImage_userId" ON "UserImage"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE INDEX "IX_Webhook_organizationId" ON "Webhook"("organizationId");

-- CreateIndex
CREATE INDEX "IX_WorkHours_organizationId" ON "WorkHours"("organizationId");

-- CreateIndex
CREATE INDEX "IX_WorkTimeSlot_workHoursId" ON "WorkTimeSlot"("workHoursId");

-- CreateIndex
CREATE INDEX "IX_AiProviderKey_createdBy" ON "AiProviderKey"("createdBy");

-- CreateIndex
CREATE INDEX "IX_AiProviderKey_organizationId" ON "AiProviderKey"("organizationId");

-- CreateIndex
CREATE INDEX "IX_AiProviderKey_provider" ON "AiProviderKey"("provider");

-- CreateIndex
CREATE INDEX "IX_AiProviderKey_status" ON "AiProviderKey"("status");

-- CreateIndex
CREATE INDEX "IX_AiProviderKey_updatedBy" ON "AiProviderKey"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_AiBudget_createdBy" ON "AiBudget"("createdBy");

-- CreateIndex
CREATE INDEX "IX_AiBudget_organizationId" ON "AiBudget"("organizationId");

-- CreateIndex
CREATE INDEX "IX_AiBudget_period" ON "AiBudget"("period");

-- CreateIndex
CREATE INDEX "IX_AiBudget_providerKeyId" ON "AiBudget"("providerKeyId");

-- CreateIndex
CREATE INDEX "IX_AiBudget_status" ON "AiBudget"("status");

-- CreateIndex
CREATE INDEX "IX_AiBudget_updatedBy" ON "AiBudget"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_AiRun_createdBy" ON "AiRun"("createdBy");

-- CreateIndex
CREATE INDEX "IX_AiRun_organizationId" ON "AiRun"("organizationId");

-- CreateIndex
CREATE INDEX "IX_AiRun_providerKeyId" ON "AiRun"("providerKeyId");

-- CreateIndex
CREATE INDEX "IX_AiRun_status" ON "AiRun"("status");

-- CreateIndex
CREATE INDEX "IX_AiRun_type" ON "AiRun"("type");

-- CreateIndex
CREATE INDEX "IX_AiRun_updatedBy" ON "AiRun"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_EvalTask_createdBy" ON "EvalTask"("createdBy");

-- CreateIndex
CREATE INDEX "IX_EvalTask_organizationId" ON "EvalTask"("organizationId");

-- CreateIndex
CREATE INDEX "IX_EvalTask_status" ON "EvalTask"("status");

-- CreateIndex
CREATE INDEX "IX_EvalTask_type" ON "EvalTask"("type");

-- CreateIndex
CREATE INDEX "IX_EvalTask_updatedBy" ON "EvalTask"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_EvalResult_createdBy" ON "EvalResult"("createdBy");

-- CreateIndex
CREATE INDEX "IX_EvalResult_organizationId" ON "EvalResult"("organizationId");

-- CreateIndex
CREATE INDEX "IX_EvalResult_runId" ON "EvalResult"("runId");

-- CreateIndex
CREATE INDEX "IX_EvalResult_status" ON "EvalResult"("status");

-- CreateIndex
CREATE INDEX "IX_EvalResult_taskId" ON "EvalResult"("taskId");

-- CreateIndex
CREATE INDEX "IX_EvalResult_updatedBy" ON "EvalResult"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_GeneratorPreset_category" ON "GeneratorPreset"("category");

-- CreateIndex
CREATE INDEX "IX_GeneratorPreset_createdBy" ON "GeneratorPreset"("createdBy");

-- CreateIndex
CREATE INDEX "IX_GeneratorPreset_isPublic" ON "GeneratorPreset"("isPublic");

-- CreateIndex
CREATE INDEX "IX_GeneratorPreset_organizationId" ON "GeneratorPreset"("organizationId");

-- CreateIndex
CREATE INDEX "IX_GeneratorPreset_popularity" ON "GeneratorPreset"("popularity");

-- CreateIndex
CREATE INDEX "IX_GeneratorPreset_updatedBy" ON "GeneratorPreset"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_CodegenJob_createdBy" ON "CodegenJob"("createdBy");

-- CreateIndex
CREATE INDEX "IX_CodegenJob_organizationId" ON "CodegenJob"("organizationId");

-- CreateIndex
CREATE INDEX "IX_CodegenJob_presetId" ON "CodegenJob"("presetId");

-- CreateIndex
CREATE INDEX "IX_CodegenJob_status" ON "CodegenJob"("status");

-- CreateIndex
CREATE INDEX "IX_CodegenJob_updatedBy" ON "CodegenJob"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_CodegenJob_userId" ON "CodegenJob"("userId");

-- CreateIndex
CREATE INDEX "IX_Artifact_category" ON "Artifact"("category");

-- CreateIndex
CREATE INDEX "IX_Artifact_codegenJobId" ON "Artifact"("codegenJobId");

-- CreateIndex
CREATE INDEX "IX_Artifact_createdBy" ON "Artifact"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Artifact_organizationId" ON "Artifact"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Artifact_status" ON "Artifact"("status");

-- CreateIndex
CREATE INDEX "IX_Artifact_type" ON "Artifact"("type");

-- CreateIndex
CREATE INDEX "IX_Artifact_updatedBy" ON "Artifact"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_RepositoryLink_artifactId" ON "RepositoryLink"("artifactId");

-- CreateIndex
CREATE INDEX "IX_RepositoryLink_codegenJobId" ON "RepositoryLink"("codegenJobId");

-- CreateIndex
CREATE INDEX "IX_RepositoryLink_createdBy" ON "RepositoryLink"("createdBy");

-- CreateIndex
CREATE INDEX "IX_RepositoryLink_linkType" ON "RepositoryLink"("linkType");

-- CreateIndex
CREATE INDEX "IX_RepositoryLink_organizationId" ON "RepositoryLink"("organizationId");

-- CreateIndex
CREATE INDEX "IX_RepositoryLink_syncStatus" ON "RepositoryLink"("syncStatus");

-- CreateIndex
CREATE INDEX "IX_RepositoryLink_updatedBy" ON "RepositoryLink"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_SyncJob_createdBy" ON "SyncJob"("createdBy");

-- CreateIndex
CREATE INDEX "IX_SyncJob_dataMappingId" ON "SyncJob"("dataMappingId");

-- CreateIndex
CREATE INDEX "IX_SyncJob_integrationEndpointId" ON "SyncJob"("integrationEndpointId");

-- CreateIndex
CREATE INDEX "IX_SyncJob_organizationId" ON "SyncJob"("organizationId");

-- CreateIndex
CREATE INDEX "IX_SyncJob_status" ON "SyncJob"("status");

-- CreateIndex
CREATE INDEX "IX_SyncJob_type" ON "SyncJob"("type");

-- CreateIndex
CREATE INDEX "IX_SyncJob_updatedBy" ON "SyncJob"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_CourseOfAction_createdBy" ON "CourseOfAction"("createdBy");

-- CreateIndex
CREATE INDEX "IX_CourseOfAction_endDate" ON "CourseOfAction"("endDate");

-- CreateIndex
CREATE INDEX "IX_CourseOfAction_feasibility" ON "CourseOfAction"("feasibility");

-- CreateIndex
CREATE INDEX "IX_CourseOfAction_impact" ON "CourseOfAction"("impact");

-- CreateIndex
CREATE INDEX "IX_CourseOfAction_organizationId" ON "CourseOfAction"("organizationId");

-- CreateIndex
CREATE INDEX "IX_CourseOfAction_priority" ON "CourseOfAction"("priority");

-- CreateIndex
CREATE INDEX "IX_CourseOfAction_startDate" ON "CourseOfAction"("startDate");

-- CreateIndex
CREATE INDEX "IX_CourseOfAction_status" ON "CourseOfAction"("status");

-- CreateIndex
CREATE INDEX "IX_CourseOfAction_updatedBy" ON "CourseOfAction"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Capability_category" ON "Capability"("category");

-- CreateIndex
CREATE INDEX "IX_Capability_createdBy" ON "Capability"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Capability_importance" ON "Capability"("importance");

-- CreateIndex
CREATE INDEX "IX_Capability_level" ON "Capability"("level");

-- CreateIndex
CREATE INDEX "IX_Capability_maturity" ON "Capability"("maturity");

-- CreateIndex
CREATE INDEX "IX_Capability_organizationId" ON "Capability"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Capability_updatedBy" ON "Capability"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Initiative_actualEndDate" ON "Initiative"("actualEndDate");

-- CreateIndex
CREATE INDEX "IX_Initiative_actualStartDate" ON "Initiative"("actualStartDate");

-- CreateIndex
CREATE INDEX "IX_Initiative_archivedBy" ON "Initiative"("archivedBy");

-- CreateIndex
CREATE INDEX "IX_Initiative_createdBy" ON "Initiative"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Initiative_health" ON "Initiative"("health");

-- CreateIndex
CREATE INDEX "IX_Initiative_organizationId" ON "Initiative"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Initiative_plannedEndDate" ON "Initiative"("plannedEndDate");

-- CreateIndex
CREATE INDEX "IX_Initiative_plannedStartDate" ON "Initiative"("plannedStartDate");

-- CreateIndex
CREATE INDEX "IX_Initiative_priority" ON "Initiative"("priority");

-- CreateIndex
CREATE INDEX "IX_Initiative_progress" ON "Initiative"("progress");

-- CreateIndex
CREATE INDEX "IX_Initiative_stage" ON "Initiative"("stage");

-- CreateIndex
CREATE INDEX "IX_Initiative_status" ON "Initiative"("status");

-- CreateIndex
CREATE INDEX "IX_Initiative_templateOf" ON "Initiative"("templateOf");

-- CreateIndex
CREATE INDEX "IX_Initiative_updatedBy" ON "Initiative"("updatedBy");

-- CreateIndex
CREATE UNIQUE INDEX "Initiative_organizationId_slug_key" ON "Initiative"("organizationId", "slug");

-- CreateIndex
CREATE INDEX "InitiativeCapability_capabilityId_idx" ON "InitiativeCapability"("capabilityId");

-- CreateIndex
CREATE INDEX "InitiativeCapability_initiativeId_idx" ON "InitiativeCapability"("initiativeId");

-- CreateIndex
CREATE INDEX "InitiativeCapability_relationship_idx" ON "InitiativeCapability"("relationship");

-- CreateIndex
CREATE UNIQUE INDEX "InitiativeCapability_initiativeId_capabilityId_key" ON "InitiativeCapability"("initiativeId", "capabilityId");

-- CreateIndex
CREATE INDEX "InitiativeCourseOfAction_courseOfActionId_idx" ON "InitiativeCourseOfAction"("courseOfActionId");

-- CreateIndex
CREATE INDEX "InitiativeCourseOfAction_initiativeId_idx" ON "InitiativeCourseOfAction"("initiativeId");

-- CreateIndex
CREATE UNIQUE INDEX "InitiativeCourseOfAction_initiativeId_courseOfActionId_key" ON "InitiativeCourseOfAction"("initiativeId", "courseOfActionId");

-- CreateIndex
CREATE INDEX "IX_InitiativeKpi_initiativeId" ON "InitiativeKpi"("initiativeId");

-- CreateIndex
CREATE INDEX "IX_InitiativeStakeholder_initiativeId" ON "InitiativeStakeholder"("initiativeId");

-- CreateIndex
CREATE INDEX "IX_InitiativeStakeholder_userId" ON "InitiativeStakeholder"("userId");

-- CreateIndex
CREATE INDEX "IX_InitiativeWorkflowHistory_initiativeId" ON "InitiativeWorkflowHistory"("initiativeId");

-- CreateIndex
CREATE INDEX "IX_InitiativeWorkflowHistory_userId" ON "InitiativeWorkflowHistory"("userId");

-- CreateIndex
CREATE INDEX "IX_BusinessCase_createdBy" ON "BusinessCase"("createdBy");

-- CreateIndex
CREATE INDEX "IX_BusinessCase_organizationId" ON "BusinessCase"("organizationId");

-- CreateIndex
CREATE INDEX "IX_BusinessCase_priority" ON "BusinessCase"("priority");

-- CreateIndex
CREATE INDEX "IX_BusinessCase_status" ON "BusinessCase"("status");

-- CreateIndex
CREATE INDEX "IX_BusinessCase_updatedBy" ON "BusinessCase"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_BusinessCaseCourseOfAction_businessCaseId" ON "BusinessCaseCourseOfAction"("businessCaseId");

-- CreateIndex
CREATE INDEX "IX_BusinessCaseCourseOfAction_courseOfActionId" ON "BusinessCaseCourseOfAction"("courseOfActionId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCaseCourseOfAction_businessCaseId_courseOfActionId_key" ON "BusinessCaseCourseOfAction"("businessCaseId", "courseOfActionId");

-- CreateIndex
CREATE INDEX "IX_Portfolio_organizationId" ON "Portfolio"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Portfolio_owner" ON "Portfolio"("owner");

-- CreateIndex
CREATE INDEX "IX_Portfolio_status" ON "Portfolio"("status");

-- CreateIndex
CREATE INDEX "IX_Portfolio_type" ON "Portfolio"("type");

-- CreateIndex
CREATE INDEX "IX_PortfolioInitiative_portfolioId" ON "PortfolioInitiative"("portfolioId");

-- CreateIndex
CREATE INDEX "IX_PortfolioInitiative_initiativeId" ON "PortfolioInitiative"("initiativeId");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioInitiative_portfolioId_initiativeId_key" ON "PortfolioInitiative"("portfolioId", "initiativeId");

-- CreateIndex
CREATE INDEX "strategies_organizationId_idx" ON "strategies"("organizationId");

-- CreateIndex
CREATE INDEX "strategies_visionId_idx" ON "strategies"("visionId");

-- CreateIndex
CREATE INDEX "strategies_status_idx" ON "strategies"("status");

-- CreateIndex
CREATE INDEX "strategies_strategyType_idx" ON "strategies"("strategyType");

-- CreateIndex
CREATE INDEX "strategies_priority_idx" ON "strategies"("priority");

-- CreateIndex
CREATE INDEX "strategies_ownerId_idx" ON "strategies"("ownerId");

-- CreateIndex
CREATE INDEX "visions_organizationId_idx" ON "visions"("organizationId");

-- CreateIndex
CREATE INDEX "visions_status_idx" ON "visions"("status");

-- CreateIndex
CREATE INDEX "visions_visionType_idx" ON "visions"("visionType");

-- CreateIndex
CREATE INDEX "visions_ownerId_idx" ON "visions"("ownerId");

-- CreateIndex
CREATE INDEX "strategy_metrics_strategyId_idx" ON "strategy_metrics"("strategyId");

-- CreateIndex
CREATE INDEX "strategy_metrics_status_idx" ON "strategy_metrics"("status");

-- CreateIndex
CREATE INDEX "strategy_metrics_metricType_idx" ON "strategy_metrics"("metricType");

-- CreateIndex
CREATE INDEX "strategy_reviews_strategyId_idx" ON "strategy_reviews"("strategyId");

-- CreateIndex
CREATE INDEX "strategy_reviews_reviewDate_idx" ON "strategy_reviews"("reviewDate");

-- CreateIndex
CREATE INDEX "strategy_reviews_reviewType_idx" ON "strategy_reviews"("reviewType");

-- CreateIndex
CREATE INDEX "strategy_stakeholders_strategyId_idx" ON "strategy_stakeholders"("strategyId");

-- CreateIndex
CREATE INDEX "strategy_stakeholders_stakeholderType_idx" ON "strategy_stakeholders"("stakeholderType");

-- CreateIndex
CREATE INDEX "strategy_stakeholders_influence_idx" ON "strategy_stakeholders"("influence");

-- CreateIndex
CREATE INDEX "vision_metrics_visionId_idx" ON "vision_metrics"("visionId");

-- CreateIndex
CREATE INDEX "vision_metrics_status_idx" ON "vision_metrics"("status");

-- CreateIndex
CREATE INDEX "vision_metrics_metricType_idx" ON "vision_metrics"("metricType");

-- CreateIndex
CREATE INDEX "vision_stakeholders_visionId_idx" ON "vision_stakeholders"("visionId");

-- CreateIndex
CREATE INDEX "vision_stakeholders_stakeholderType_idx" ON "vision_stakeholders"("stakeholderType");

-- CreateIndex
CREATE INDEX "vision_stakeholders_influence_idx" ON "vision_stakeholders"("influence");

-- CreateIndex
CREATE INDEX "strategic_goals_strategyId_idx" ON "strategic_goals"("strategyId");

-- CreateIndex
CREATE INDEX "strategic_goals_status_idx" ON "strategic_goals"("status");

-- CreateIndex
CREATE INDEX "strategic_goals_priority_idx" ON "strategic_goals"("priority");

-- CreateIndex
CREATE INDEX "strategic_goals_ownerId_idx" ON "strategic_goals"("ownerId");

-- CreateIndex
CREATE INDEX "strategic_milestones_strategicGoalId_idx" ON "strategic_milestones"("strategicGoalId");

-- CreateIndex
CREATE INDEX "strategic_milestones_status_idx" ON "strategic_milestones"("status");

-- CreateIndex
CREATE INDEX "strategic_milestones_plannedDate_idx" ON "strategic_milestones"("plannedDate");

-- CreateIndex
CREATE INDEX "Goal_category_idx" ON "Goal"("category");

-- CreateIndex
CREATE INDEX "Goal_createdBy_idx" ON "Goal"("createdBy");

-- CreateIndex
CREATE INDEX "Goal_organizationId_idx" ON "Goal"("organizationId");

-- CreateIndex
CREATE INDEX "Goal_priority_idx" ON "Goal"("priority");

-- CreateIndex
CREATE INDEX "Goal_status_idx" ON "Goal"("status");

-- CreateIndex
CREATE INDEX "Goal_targetDate_idx" ON "Goal"("targetDate");

-- CreateIndex
CREATE INDEX "Goal_type_idx" ON "Goal"("type");

-- CreateIndex
CREATE INDEX "Goal_updatedBy_idx" ON "Goal"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Risk_organizationId" ON "risks"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Risk_category" ON "risks"("category");

-- CreateIndex
CREATE INDEX "IX_Risk_status" ON "risks"("status");

-- CreateIndex
CREATE INDEX "IX_Risk_riskScore" ON "risks"("riskScore");

-- CreateIndex
CREATE INDEX "IX_Risk_ownerId" ON "risks"("ownerId");

-- CreateIndex
CREATE INDEX "IX_Risk_reviewDate" ON "risks"("reviewDate");

-- CreateIndex
CREATE INDEX "IX_RiskAssessment_organizationId" ON "risk_assessments"("organizationId");

-- CreateIndex
CREATE INDEX "IX_RiskAssessment_riskId" ON "risk_assessments"("riskId");

-- CreateIndex
CREATE INDEX "IX_RiskAssessment_status" ON "risk_assessments"("status");

-- CreateIndex
CREATE INDEX "IX_RiskAssessment_assessmentDate" ON "risk_assessments"("assessmentDate");

-- CreateIndex
CREATE INDEX "IX_RiskMitigation_riskId" ON "risk_mitigations"("riskId");

-- CreateIndex
CREATE INDEX "IX_RiskMitigation_strategy" ON "risk_mitigations"("strategy");

-- CreateIndex
CREATE INDEX "IX_RiskMitigation_status" ON "risk_mitigations"("status");

-- CreateIndex
CREATE INDEX "IX_RiskMitigation_ownerId" ON "risk_mitigations"("ownerId");

-- CreateIndex
CREATE INDEX "IX_Policy_organizationId" ON "Policy"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Policy_category" ON "Policy"("category");

-- CreateIndex
CREATE INDEX "IX_Policy_status" ON "Policy"("status");

-- CreateIndex
CREATE INDEX "IX_Policy_createdBy" ON "Policy"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Policy_updatedBy" ON "Policy"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_BusinessModelCanvas_organizationId" ON "BusinessModelCanvas"("organizationId");

-- CreateIndex
CREATE INDEX "IX_BusinessModelCanvas_createdBy" ON "BusinessModelCanvas"("createdBy");

-- CreateIndex
CREATE INDEX "IX_BusinessModelCanvas_updatedBy" ON "BusinessModelCanvas"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_BusinessModelCanvas_status" ON "BusinessModelCanvas"("status");

-- CreateIndex
CREATE INDEX "IX_Stakeholder_organizationId" ON "Stakeholder"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Stakeholder_createdBy" ON "Stakeholder"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Stakeholder_updatedBy" ON "Stakeholder"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Stakeholder_type" ON "Stakeholder"("type");

-- CreateIndex
CREATE INDEX "IX_Stakeholder_category" ON "Stakeholder"("category");

-- CreateIndex
CREATE INDEX "IX_Stakeholder_influence" ON "Stakeholder"("influence");

-- CreateIndex
CREATE INDEX "IX_Stakeholder_interest" ON "Stakeholder"("interest");

-- CreateIndex
CREATE INDEX "IX_Kpi_organizationId" ON "Kpi"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Kpi_createdBy" ON "Kpi"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Kpi_updatedBy" ON "Kpi"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Kpi_type" ON "Kpi"("type");

-- CreateIndex
CREATE INDEX "IX_Kpi_status" ON "Kpi"("status");

-- CreateIndex
CREATE INDEX "IX_Kpi_category" ON "Kpi"("category");

-- CreateIndex
CREATE INDEX "IX_ApplicationComponent_createdBy" ON "ApplicationComponent"("createdBy");

-- CreateIndex
CREATE INDEX "IX_ApplicationComponent_isActive" ON "ApplicationComponent"("isActive");

-- CreateIndex
CREATE INDEX "IX_ApplicationComponent_organizationId" ON "ApplicationComponent"("organizationId");

-- CreateIndex
CREATE INDEX "IX_ApplicationComponent_status" ON "ApplicationComponent"("status");

-- CreateIndex
CREATE INDEX "IX_ApplicationComponent_type" ON "ApplicationComponent"("type");

-- CreateIndex
CREATE INDEX "IX_ApplicationComponent_updatedBy" ON "ApplicationComponent"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_ApplicationComponent_businessOwnerId" ON "ApplicationComponent"("businessOwnerId");

-- CreateIndex
CREATE INDEX "IX_ApplicationComponent_itOwnerId" ON "ApplicationComponent"("itOwnerId");

-- CreateIndex
CREATE INDEX "IX_ApplicationComponent_criticality" ON "ApplicationComponent"("criticality");

-- CreateIndex
CREATE INDEX "IX_ApplicationComponent_hostingModel" ON "ApplicationComponent"("hostingModel");

-- CreateIndex
CREATE INDEX "IX_ApplicationBusinessCapability_applicationId" ON "ApplicationBusinessCapability"("applicationId");

-- CreateIndex
CREATE INDEX "IX_ApplicationCollaboration_createdBy" ON "ApplicationCollaboration"("createdBy");

-- CreateIndex
CREATE INDEX "IX_ApplicationCollaboration_isActive" ON "ApplicationCollaboration"("isActive");

-- CreateIndex
CREATE INDEX "IX_ApplicationCollaboration_organizationId" ON "ApplicationCollaboration"("organizationId");

-- CreateIndex
CREATE INDEX "IX_ApplicationCollaboration_updatedBy" ON "ApplicationCollaboration"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_ApplicationComponentCollaboration_collaborationId" ON "ApplicationComponentCollaboration"("collaborationId");

-- CreateIndex
CREATE INDEX "IX_ApplicationComponentCollaboration_componentId" ON "ApplicationComponentCollaboration"("componentId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationComponentCollaboration_componentId_collaboration_key" ON "ApplicationComponentCollaboration"("componentId", "collaborationId");

-- CreateIndex
CREATE INDEX "IX_ApplicationComponentInteraction_componentId" ON "ApplicationComponentInteraction"("componentId");

-- CreateIndex
CREATE INDEX "IX_ApplicationComponentInteraction_interactionId" ON "ApplicationComponentInteraction"("interactionId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationComponentInteraction_componentId_interactionId_key" ON "ApplicationComponentInteraction"("componentId", "interactionId");

-- CreateIndex
CREATE INDEX "IX_ApplicationEvent_componentId" ON "ApplicationEvent"("componentId");

-- CreateIndex
CREATE INDEX "IX_ApplicationEvent_createdBy" ON "ApplicationEvent"("createdBy");

-- CreateIndex
CREATE INDEX "IX_ApplicationEvent_isActive" ON "ApplicationEvent"("isActive");

-- CreateIndex
CREATE INDEX "IX_ApplicationEvent_organizationId" ON "ApplicationEvent"("organizationId");

-- CreateIndex
CREATE INDEX "IX_ApplicationEvent_type" ON "ApplicationEvent"("type");

-- CreateIndex
CREATE INDEX "IX_ApplicationEvent_updatedBy" ON "ApplicationEvent"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_ApplicationFunction_componentId" ON "ApplicationFunction"("componentId");

-- CreateIndex
CREATE INDEX "IX_ApplicationFunction_createdBy" ON "ApplicationFunction"("createdBy");

-- CreateIndex
CREATE INDEX "IX_ApplicationFunction_isActive" ON "ApplicationFunction"("isActive");

-- CreateIndex
CREATE INDEX "IX_ApplicationFunction_organizationId" ON "ApplicationFunction"("organizationId");

-- CreateIndex
CREATE INDEX "IX_ApplicationFunction_updatedBy" ON "ApplicationFunction"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_ApplicationInteraction_createdBy" ON "ApplicationInteraction"("createdBy");

-- CreateIndex
CREATE INDEX "IX_ApplicationInteraction_isActive" ON "ApplicationInteraction"("isActive");

-- CreateIndex
CREATE INDEX "IX_ApplicationInteraction_organizationId" ON "ApplicationInteraction"("organizationId");

-- CreateIndex
CREATE INDEX "IX_ApplicationInteraction_updatedBy" ON "ApplicationInteraction"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_ApplicationInterface_createdBy" ON "ApplicationInterface"("createdBy");

-- CreateIndex
CREATE INDEX "IX_ApplicationInterface_isActive" ON "ApplicationInterface"("isActive");

-- CreateIndex
CREATE INDEX "IX_ApplicationInterface_organizationId" ON "ApplicationInterface"("organizationId");

-- CreateIndex
CREATE INDEX "IX_ApplicationInterface_providedByComponentId" ON "ApplicationInterface"("providedByComponentId");

-- CreateIndex
CREATE INDEX "IX_ApplicationInterface_requiredByComponentId" ON "ApplicationInterface"("requiredByComponentId");

-- CreateIndex
CREATE INDEX "IX_ApplicationInterface_serviceId" ON "ApplicationInterface"("serviceId");

-- CreateIndex
CREATE INDEX "IX_ApplicationInterface_type" ON "ApplicationInterface"("type");

-- CreateIndex
CREATE INDEX "IX_ApplicationInterface_updatedBy" ON "ApplicationInterface"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_ApplicationProcess_createdBy" ON "ApplicationProcess"("createdBy");

-- CreateIndex
CREATE INDEX "IX_ApplicationProcess_isActive" ON "ApplicationProcess"("isActive");

-- CreateIndex
CREATE INDEX "IX_ApplicationProcess_organizationId" ON "ApplicationProcess"("organizationId");

-- CreateIndex
CREATE INDEX "IX_ApplicationProcess_serviceId" ON "ApplicationProcess"("serviceId");

-- CreateIndex
CREATE INDEX "IX_ApplicationProcess_updatedBy" ON "ApplicationProcess"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_ApplicationService_componentId" ON "ApplicationService"("componentId");

-- CreateIndex
CREATE INDEX "IX_ApplicationService_createdBy" ON "ApplicationService"("createdBy");

-- CreateIndex
CREATE INDEX "IX_ApplicationService_isActive" ON "ApplicationService"("isActive");

-- CreateIndex
CREATE INDEX "IX_ApplicationService_organizationId" ON "ApplicationService"("organizationId");

-- CreateIndex
CREATE INDEX "IX_ApplicationService_type" ON "ApplicationService"("type");

-- CreateIndex
CREATE INDEX "IX_ApplicationService_updatedBy" ON "ApplicationService"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_ApplicationSLA_applicationId" ON "ApplicationSLA"("applicationId");

-- CreateIndex
CREATE INDEX "IX_TechnologyCollaboration_createdBy" ON "TechnologyCollaboration"("createdBy");

-- CreateIndex
CREATE INDEX "IX_TechnologyCollaboration_organizationId" ON "TechnologyCollaboration"("organizationId");

-- CreateIndex
CREATE INDEX "IX_TechnologyCollaboration_pattern" ON "TechnologyCollaboration"("pattern");

-- CreateIndex
CREATE INDEX "IX_TechnologyCollaboration_type" ON "TechnologyCollaboration"("type");

-- CreateIndex
CREATE INDEX "IX_TechnologyCollaboration_updatedBy" ON "TechnologyCollaboration"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_TechnologyComponent_category" ON "TechnologyComponent"("category");

-- CreateIndex
CREATE INDEX "IX_TechnologyComponent_createdBy" ON "TechnologyComponent"("createdBy");

-- CreateIndex
CREATE INDEX "IX_TechnologyComponent_environment" ON "TechnologyComponent"("environment");

-- CreateIndex
CREATE INDEX "IX_TechnologyComponent_organizationId" ON "TechnologyComponent"("organizationId");

-- CreateIndex
CREATE INDEX "IX_TechnologyComponent_status" ON "TechnologyComponent"("status");

-- CreateIndex
CREATE INDEX "IX_TechnologyComponent_type" ON "TechnologyComponent"("type");

-- CreateIndex
CREATE INDEX "IX_TechnologyComponent_updatedBy" ON "TechnologyComponent"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_TechnologyEvent_createdBy" ON "TechnologyEvent"("createdBy");

-- CreateIndex
CREATE INDEX "IX_TechnologyEvent_organizationId" ON "TechnologyEvent"("organizationId");

-- CreateIndex
CREATE INDEX "IX_TechnologyEvent_severity" ON "TechnologyEvent"("severity");

-- CreateIndex
CREATE INDEX "IX_TechnologyEvent_type" ON "TechnologyEvent"("type");

-- CreateIndex
CREATE INDEX "IX_TechnologyEvent_updatedBy" ON "TechnologyEvent"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_TechnologyFunction_createdBy" ON "TechnologyFunction"("createdBy");

-- CreateIndex
CREATE INDEX "IX_TechnologyFunction_organizationId" ON "TechnologyFunction"("organizationId");

-- CreateIndex
CREATE INDEX "IX_TechnologyFunction_type" ON "TechnologyFunction"("type");

-- CreateIndex
CREATE INDEX "IX_TechnologyFunction_updatedBy" ON "TechnologyFunction"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_TechnologyInteraction_createdBy" ON "TechnologyInteraction"("createdBy");

-- CreateIndex
CREATE INDEX "IX_TechnologyInteraction_organizationId" ON "TechnologyInteraction"("organizationId");

-- CreateIndex
CREATE INDEX "IX_TechnologyInteraction_pattern" ON "TechnologyInteraction"("pattern");

-- CreateIndex
CREATE INDEX "IX_TechnologyInteraction_type" ON "TechnologyInteraction"("type");

-- CreateIndex
CREATE INDEX "IX_TechnologyInteraction_updatedBy" ON "TechnologyInteraction"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_TechnologyInterface_createdBy" ON "TechnologyInterface"("createdBy");

-- CreateIndex
CREATE INDEX "IX_TechnologyInterface_organizationId" ON "TechnologyInterface"("organizationId");

-- CreateIndex
CREATE INDEX "IX_TechnologyInterface_protocol" ON "TechnologyInterface"("protocol");

-- CreateIndex
CREATE INDEX "IX_TechnologyInterface_status" ON "TechnologyInterface"("status");

-- CreateIndex
CREATE INDEX "IX_TechnologyInterface_type" ON "TechnologyInterface"("type");

-- CreateIndex
CREATE INDEX "IX_TechnologyInterface_updatedBy" ON "TechnologyInterface"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_TechnologyProcess_createdBy" ON "TechnologyProcess"("createdBy");

-- CreateIndex
CREATE INDEX "IX_TechnologyProcess_organizationId" ON "TechnologyProcess"("organizationId");

-- CreateIndex
CREATE INDEX "IX_TechnologyProcess_type" ON "TechnologyProcess"("type");

-- CreateIndex
CREATE INDEX "IX_TechnologyProcess_updatedBy" ON "TechnologyProcess"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_TechnologyService_category" ON "TechnologyService"("category");

-- CreateIndex
CREATE INDEX "IX_TechnologyService_createdBy" ON "TechnologyService"("createdBy");

-- CreateIndex
CREATE INDEX "IX_TechnologyService_organizationId" ON "TechnologyService"("organizationId");

-- CreateIndex
CREATE INDEX "IX_TechnologyService_serviceLevel" ON "TechnologyService"("serviceLevel");

-- CreateIndex
CREATE INDEX "IX_TechnologyService_type" ON "TechnologyService"("type");

-- CreateIndex
CREATE INDEX "IX_TechnologyService_updatedBy" ON "TechnologyService"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_DataMapping_createdBy" ON "DataMapping"("createdBy");

-- CreateIndex
CREATE INDEX "IX_DataMapping_integrationEndpointId" ON "DataMapping"("integrationEndpointId");

-- CreateIndex
CREATE INDEX "IX_DataMapping_organizationId" ON "DataMapping"("organizationId");

-- CreateIndex
CREATE INDEX "IX_DataMapping_sourceFormat" ON "DataMapping"("sourceFormat");

-- CreateIndex
CREATE INDEX "IX_DataMapping_status" ON "DataMapping"("status");

-- CreateIndex
CREATE INDEX "IX_DataMapping_targetFormat" ON "DataMapping"("targetFormat");

-- CreateIndex
CREATE INDEX "IX_DataMapping_updatedBy" ON "DataMapping"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_DataObject_organizationId" ON "DataObject"("organizationId");

-- CreateIndex
CREATE INDEX "IX_DataObject_createdBy" ON "DataObject"("createdBy");

-- CreateIndex
CREATE INDEX "IX_DataObject_updatedBy" ON "DataObject"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_DataObject_isActive" ON "DataObject"("isActive");

-- CreateIndex
CREATE INDEX "IX_DataObject_dataType" ON "DataObject"("dataType");

-- CreateIndex
CREATE INDEX "IX_DataObject_persistenceType" ON "DataObject"("persistenceType");

-- CreateIndex
CREATE INDEX "IX_BusinessActor_category" ON "BusinessActor"("category");

-- CreateIndex
CREATE INDEX "IX_BusinessActor_isActive" ON "BusinessActor"("isActive");

-- CreateIndex
CREATE INDEX "IX_BusinessActor_organizationId" ON "BusinessActor"("organizationId");

-- CreateIndex
CREATE INDEX "IX_BusinessActor_type" ON "BusinessActor"("type");

-- CreateIndex
CREATE INDEX "BusinessActorCapability_businessActorId_idx" ON "BusinessActorCapability"("businessActorId");

-- CreateIndex
CREATE INDEX "BusinessActorCapability_capabilityId_idx" ON "BusinessActorCapability"("capabilityId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessActorCapability_businessActorId_capabilityId_key" ON "BusinessActorCapability"("businessActorId", "capabilityId");

-- CreateIndex
CREATE INDEX "IX_BusinessActorProcess_actorId" ON "BusinessActorProcess"("actorId");

-- CreateIndex
CREATE INDEX "IX_BusinessActorProcess_processId" ON "BusinessActorProcess"("processId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessActorProcess_actorId_processId_key" ON "BusinessActorProcess"("actorId", "processId");

-- CreateIndex
CREATE INDEX "IX_BusinessActorRole_actorId" ON "BusinessActorRole"("actorId");

-- CreateIndex
CREATE INDEX "IX_BusinessActorRole_roleId" ON "BusinessActorRole"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessActorRole_actorId_roleId_key" ON "BusinessActorRole"("actorId", "roleId");

-- CreateIndex
CREATE INDEX "IX_BusinessActorService_actorId" ON "BusinessActorService"("actorId");

-- CreateIndex
CREATE INDEX "IX_BusinessActorService_serviceId" ON "BusinessActorService"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessActorService_actorId_serviceId_key" ON "BusinessActorService"("actorId", "serviceId");

-- CreateIndex
CREATE INDEX "IX_BusinessCollaboration_organizationId" ON "BusinessCollaboration"("organizationId");

-- CreateIndex
CREATE INDEX "IX_BusinessEvent_organizationId" ON "BusinessEvent"("organizationId");

-- CreateIndex
CREATE INDEX "IX_BusinessFunction_organizationId" ON "BusinessFunction"("organizationId");

-- CreateIndex
CREATE INDEX "IX_BusinessInteraction_organizationId" ON "BusinessInteraction"("organizationId");

-- CreateIndex
CREATE INDEX "IX_BusinessInterface_organizationId" ON "BusinessInterface"("organizationId");

-- CreateIndex
CREATE INDEX "IX_BusinessModelCanvasCOBIT_canvasId" ON "business_model_canvas_cobit"("canvasId");

-- CreateIndex
CREATE INDEX "IX_BusinessModelCanvasCOBIT_cobitFrameworkId" ON "business_model_canvas_cobit"("cobitFrameworkId");

-- CreateIndex
CREATE UNIQUE INDEX "business_model_canvas_cobit_canvasId_cobitFrameworkId_canva_key" ON "business_model_canvas_cobit"("canvasId", "cobitFrameworkId", "canvasSection");

-- CreateIndex
CREATE INDEX "IX_BusinessModelCanvasPCF_canvasId" ON "business_model_canvas_pcf"("canvasId");

-- CreateIndex
CREATE INDEX "IX_BusinessModelCanvasPCF_pcfFrameworkId" ON "business_model_canvas_pcf"("pcfFrameworkId");

-- CreateIndex
CREATE UNIQUE INDEX "business_model_canvas_pcf_canvasId_pcfFrameworkId_canvasSec_key" ON "business_model_canvas_pcf"("canvasId", "pcfFrameworkId", "canvasSection");

-- CreateIndex
CREATE INDEX "IX_BusinessObject_category" ON "BusinessObject"("category");

-- CreateIndex
CREATE INDEX "IX_BusinessObject_isActive" ON "BusinessObject"("isActive");

-- CreateIndex
CREATE INDEX "IX_BusinessObject_organizationId" ON "BusinessObject"("organizationId");

-- CreateIndex
CREATE INDEX "IX_BusinessObject_sensitivity" ON "BusinessObject"("sensitivity");

-- CreateIndex
CREATE INDEX "IX_BusinessObject_type" ON "BusinessObject"("type");

-- CreateIndex
CREATE INDEX "IX_BusinessObjectService_objectId" ON "BusinessObjectService"("objectId");

-- CreateIndex
CREATE INDEX "IX_BusinessObjectService_serviceId" ON "BusinessObjectService"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessObjectService_objectId_serviceId_key" ON "BusinessObjectService"("objectId", "serviceId");

-- CreateIndex
CREATE INDEX "IX_BusinessProcess_category" ON "BusinessProcess"("category");

-- CreateIndex
CREATE INDEX "IX_BusinessProcess_complexity" ON "BusinessProcess"("complexity");

-- CreateIndex
CREATE INDEX "IX_BusinessProcess_isActive" ON "BusinessProcess"("isActive");

-- CreateIndex
CREATE INDEX "IX_BusinessProcess_organizationId" ON "BusinessProcess"("organizationId");

-- CreateIndex
CREATE INDEX "BusinessProcessCapability_businessProcessId_idx" ON "BusinessProcessCapability"("businessProcessId");

-- CreateIndex
CREATE INDEX "BusinessProcessCapability_capabilityId_idx" ON "BusinessProcessCapability"("capabilityId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessProcessCapability_businessProcessId_capabilityId_key" ON "BusinessProcessCapability"("businessProcessId", "capabilityId");

-- CreateIndex
CREATE INDEX "IX_BusinessProcessObject_objectId" ON "BusinessProcessObject"("objectId");

-- CreateIndex
CREATE INDEX "IX_BusinessProcessObject_processId" ON "BusinessProcessObject"("processId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessProcessObject_processId_objectId_key" ON "BusinessProcessObject"("processId", "objectId");

-- CreateIndex
CREATE INDEX "IX_BusinessProcessResource_processId" ON "BusinessProcessResource"("processId");

-- CreateIndex
CREATE INDEX "IX_BusinessProcessResource_resourceId" ON "BusinessProcessResource"("resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessProcessResource_processId_resourceId_key" ON "BusinessProcessResource"("processId", "resourceId");

-- CreateIndex
CREATE INDEX "IX_BusinessProcessService_processId" ON "BusinessProcessService"("processId");

-- CreateIndex
CREATE INDEX "IX_BusinessProcessService_serviceId" ON "BusinessProcessService"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessProcessService_processId_serviceId_key" ON "BusinessProcessService"("processId", "serviceId");

-- CreateIndex
CREATE INDEX "IX_BusinessProcessValueStream_processId" ON "BusinessProcessValueStream"("processId");

-- CreateIndex
CREATE INDEX "IX_BusinessProcessValueStream_valueStreamId" ON "BusinessProcessValueStream"("valueStreamId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessProcessValueStream_processId_valueStreamId_key" ON "BusinessProcessValueStream"("processId", "valueStreamId");

-- CreateIndex
CREATE INDEX "IX_BusinessRole_isActive" ON "BusinessRole"("isActive");

-- CreateIndex
CREATE INDEX "IX_BusinessRole_level" ON "BusinessRole"("level");

-- CreateIndex
CREATE INDEX "IX_BusinessRole_organizationId" ON "BusinessRole"("organizationId");

-- CreateIndex
CREATE INDEX "BusinessRoleCapability_businessRoleId_idx" ON "BusinessRoleCapability"("businessRoleId");

-- CreateIndex
CREATE INDEX "BusinessRoleCapability_capabilityId_idx" ON "BusinessRoleCapability"("capabilityId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessRoleCapability_businessRoleId_capabilityId_key" ON "BusinessRoleCapability"("businessRoleId", "capabilityId");

-- CreateIndex
CREATE INDEX "IX_BusinessRoleProcess_processId" ON "BusinessRoleProcess"("processId");

-- CreateIndex
CREATE INDEX "IX_BusinessRoleProcess_roleId" ON "BusinessRoleProcess"("roleId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessRoleProcess_roleId_processId_key" ON "BusinessRoleProcess"("roleId", "processId");

-- CreateIndex
CREATE INDEX "IX_BusinessService_category" ON "BusinessService"("category");

-- CreateIndex
CREATE INDEX "IX_BusinessService_isActive" ON "BusinessService"("isActive");

-- CreateIndex
CREATE INDEX "IX_BusinessService_organizationId" ON "BusinessService"("organizationId");

-- CreateIndex
CREATE INDEX "IX_BusinessService_type" ON "BusinessService"("type");

-- CreateIndex
CREATE INDEX "IX_BusinessServiceCapability_capabilityId" ON "BusinessServiceCapability"("capabilityId");

-- CreateIndex
CREATE INDEX "IX_BusinessServiceCapability_serviceId" ON "BusinessServiceCapability"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessServiceCapability_serviceId_capabilityId_key" ON "BusinessServiceCapability"("serviceId", "capabilityId");

-- CreateIndex
CREATE INDEX "BusinessServiceValueStream_businessServiceId_idx" ON "BusinessServiceValueStream"("businessServiceId");

-- CreateIndex
CREATE INDEX "BusinessServiceValueStream_valueStreamId_idx" ON "BusinessServiceValueStream"("valueStreamId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessServiceValueStream_businessServiceId_valueStreamId_key" ON "BusinessServiceValueStream"("businessServiceId", "valueStreamId");

-- CreateIndex
CREATE INDEX "IX_Resource_availability" ON "Resource"("availability");

-- CreateIndex
CREATE INDEX "IX_Resource_category" ON "Resource"("category");

-- CreateIndex
CREATE INDEX "IX_Resource_createdBy" ON "Resource"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Resource_organizationId" ON "Resource"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Resource_status" ON "Resource"("status");

-- CreateIndex
CREATE INDEX "IX_Resource_type" ON "Resource"("type");

-- CreateIndex
CREATE INDEX "IX_Resource_updatedBy" ON "Resource"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_ValueStream_createdBy" ON "ValueStream"("createdBy");

-- CreateIndex
CREATE INDEX "IX_ValueStream_customer" ON "ValueStream"("customer");

-- CreateIndex
CREATE INDEX "IX_ValueStream_organizationId" ON "ValueStream"("organizationId");

-- CreateIndex
CREATE INDEX "IX_ValueStream_status" ON "ValueStream"("status");

-- CreateIndex
CREATE INDEX "IX_ValueStream_updatedBy" ON "ValueStream"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_COBITFramework_organizationId" ON "cobit_frameworks"("organizationId");

-- CreateIndex
CREATE INDEX "IX_COBITFramework_implementationStatus" ON "cobit_frameworks"("implementationStatus");

-- CreateIndex
CREATE INDEX "IX_PCFFramework_organizationId" ON "pcf_frameworks"("organizationId");

-- CreateIndex
CREATE INDEX "IX_PCFFramework_implementationStatus" ON "pcf_frameworks"("implementationStatus");

-- CreateIndex
CREATE INDEX "IX_Product_category" ON "Product"("category");

-- CreateIndex
CREATE INDEX "IX_Product_isActive" ON "Product"("isActive");

-- CreateIndex
CREATE INDEX "IX_Product_organizationId" ON "Product"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Product_status" ON "Product"("status");

-- CreateIndex
CREATE INDEX "IX_Product_type" ON "Product"("type");

-- CreateIndex
CREATE INDEX "IX_ProductService_productId" ON "ProductService"("productId");

-- CreateIndex
CREATE INDEX "IX_ProductService_serviceId" ON "ProductService"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductService_productId_serviceId_key" ON "ProductService"("productId", "serviceId");

-- CreateIndex
CREATE INDEX "IX_SalesOpportunity_organizationId" ON "SalesOpportunity"("organizationId");

-- CreateIndex
CREATE INDEX "IX_SalesOpportunity_ownerId" ON "SalesOpportunity"("ownerId");

-- CreateIndex
CREATE INDEX "IX_SalesOpportunity_stage" ON "SalesOpportunity"("stage");

-- CreateIndex
CREATE INDEX "IX_SalesOpportunity_status" ON "SalesOpportunity"("status");

-- CreateIndex
CREATE INDEX "IX_SalesOpportunity_closeDate" ON "SalesOpportunity"("closeDate");

-- CreateIndex
CREATE INDEX "IX_SalesOpportunity_org_stage_status" ON "SalesOpportunity"("organizationId", "stage", "status");

-- CreateIndex
CREATE INDEX "IX_SalesOpportunity_org_owner" ON "SalesOpportunity"("organizationId", "ownerId");

-- CreateIndex
CREATE INDEX "OpportunityProduct_opportunityId_idx" ON "OpportunityProduct"("opportunityId");

-- CreateIndex
CREATE INDEX "OpportunityProduct_productId_idx" ON "OpportunityProduct"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "OpportunityProduct_opportunityId_productId_key" ON "OpportunityProduct"("opportunityId", "productId");

-- CreateIndex
CREATE INDEX "OpportunityTeamMember_opportunityId_idx" ON "OpportunityTeamMember"("opportunityId");

-- CreateIndex
CREATE INDEX "OpportunityTeamMember_userId_idx" ON "OpportunityTeamMember"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OpportunityTeamMember_opportunityId_userId_key" ON "OpportunityTeamMember"("opportunityId", "userId");

-- CreateIndex
CREATE INDEX "IX_Project_organizationId" ON "projects"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Project_initiativeId" ON "projects"("initiativeId");

-- CreateIndex
CREATE INDEX "IX_Project_status" ON "projects"("status");

-- CreateIndex
CREATE INDEX "IX_Project_priority" ON "projects"("priority");

-- CreateIndex
CREATE INDEX "IX_ProjectKPI_organizationId" ON "project_kpis"("organizationId");

-- CreateIndex
CREATE INDEX "IX_ProjectKPI_projectId" ON "project_kpis"("projectId");

-- CreateIndex
CREATE INDEX "IX_ProjectKPI_type" ON "project_kpis"("type");

-- CreateIndex
CREATE INDEX "IX_ProjectMilestone_organizationId" ON "project_milestones"("organizationId");

-- CreateIndex
CREATE INDEX "IX_ProjectMilestone_projectId" ON "project_milestones"("projectId");

-- CreateIndex
CREATE INDEX "IX_ProjectMilestone_status" ON "project_milestones"("status");

-- CreateIndex
CREATE INDEX "IX_ProjectMilestone_dueDate" ON "project_milestones"("dueDate");

-- CreateIndex
CREATE INDEX "IX_Task_organizationId" ON "Task"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Task_status" ON "Task"("status");

-- CreateIndex
CREATE INDEX "IX_Task_priority" ON "Task"("priority");

-- CreateIndex
CREATE INDEX "IX_Task_assigneeId" ON "Task"("assigneeId");

-- CreateIndex
CREATE INDEX "IX_Task_sprintId" ON "Task"("sprintId");

-- CreateIndex
CREATE INDEX "IX_Task_projectId" ON "Task"("projectId");

-- CreateIndex
CREATE INDEX "IX_Task_workflowId" ON "Task"("workflowId");

-- CreateIndex
CREATE INDEX "IX_Task_createdBy" ON "Task"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Task_frameworkType" ON "Task"("frameworkType");

-- CreateIndex
CREATE INDEX "IX_Task_workflowColumn" ON "Task"("workflowColumn");

-- CreateIndex
CREATE INDEX "IX_Task_workflow_lookup" ON "Task"("organizationId", "frameworkType", "workflowColumn");

-- CreateIndex
CREATE INDEX "IX_Task_workflow_kanban" ON "Task"("workflowId", "workflowColumn", "columnPosition");

-- CreateIndex
CREATE INDEX "IX_Workflow_organizationId" ON "workflows"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Workflow_projectId" ON "workflows"("projectId");

-- CreateIndex
CREATE INDEX "IX_Workflow_initiativeId" ON "workflows"("initiativeId");

-- CreateIndex
CREATE INDEX "IX_Workflow_frameworkType" ON "workflows"("frameworkType");

-- CreateIndex
CREATE INDEX "IX_Workflow_segment" ON "workflows"("segment");

-- CreateIndex
CREATE INDEX "IX_Workflow_status" ON "workflows"("status");

-- CreateIndex
CREATE INDEX "IX_Workflow_org_framework" ON "workflows"("organizationId", "frameworkType");

-- CreateIndex
CREATE INDEX "IX_Workflow_project_segment" ON "workflows"("projectId", "frameworkType", "segment");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_Workflow_project_framework_segment" ON "workflows"("projectId", "frameworkType", "segment");

-- CreateIndex
CREATE UNIQUE INDEX "UQ_Workflow_initiative_framework_segment" ON "workflows"("initiativeId", "frameworkType", "segment");

-- CreateIndex
CREATE INDEX "IX_Sprint_organizationId" ON "Sprint"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Sprint_status" ON "Sprint"("status");

-- CreateIndex
CREATE INDEX "IX_Sprint_projectId" ON "Sprint"("projectId");

-- CreateIndex
CREATE INDEX "IX_Sprint_createdBy" ON "Sprint"("createdBy");

-- CreateIndex
CREATE INDEX "IX_WorkPackage_createdBy" ON "WorkPackage"("createdBy");

-- CreateIndex
CREATE INDEX "IX_WorkPackage_organizationId" ON "WorkPackage"("organizationId");

-- CreateIndex
CREATE INDEX "IX_WorkPackage_phase" ON "WorkPackage"("phase");

-- CreateIndex
CREATE INDEX "IX_WorkPackage_priority" ON "WorkPackage"("priority");

-- CreateIndex
CREATE INDEX "IX_WorkPackage_status" ON "WorkPackage"("status");

-- CreateIndex
CREATE INDEX "IX_WorkPackage_type" ON "WorkPackage"("type");

-- CreateIndex
CREATE INDEX "IX_WorkPackage_updatedBy" ON "WorkPackage"("updatedBy");

-- CreateIndex
CREATE INDEX "Comment_organizationId_idx" ON "Comment"("organizationId");

-- CreateIndex
CREATE INDEX "Comment_taskId_idx" ON "Comment"("taskId");

-- CreateIndex
CREATE INDEX "Comment_createdBy_idx" ON "Comment"("createdBy");

-- CreateIndex
CREATE INDEX "IX_ExternalSystem_createdBy" ON "ExternalSystem"("createdBy");

-- CreateIndex
CREATE INDEX "IX_ExternalSystem_organizationId" ON "ExternalSystem"("organizationId");

-- CreateIndex
CREATE INDEX "IX_ExternalSystem_status" ON "ExternalSystem"("status");

-- CreateIndex
CREATE INDEX "IX_ExternalSystem_type" ON "ExternalSystem"("type");

-- CreateIndex
CREATE INDEX "IX_ExternalSystem_updatedBy" ON "ExternalSystem"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Integration_isActive" ON "Integration"("isActive");

-- CreateIndex
CREATE INDEX "IX_Integration_organizationId" ON "Integration"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Integration_provider" ON "Integration"("provider");

-- CreateIndex
CREATE INDEX "IX_Integration_status" ON "Integration"("status");

-- CreateIndex
CREATE INDEX "IX_Integration_type" ON "Integration"("type");

-- CreateIndex
CREATE INDEX "IX_IntegrationAccount_organizationId" ON "IntegrationAccount"("organizationId");

-- CreateIndex
CREATE INDEX "IX_IntegrationAccount_integrationId" ON "IntegrationAccount"("integrationId");

-- CreateIndex
CREATE INDEX "IX_IntegrationAccount_status" ON "IntegrationAccount"("status");

-- CreateIndex
CREATE INDEX "IX_IntegrationAccount_createdBy" ON "IntegrationAccount"("createdBy");

-- CreateIndex
CREATE INDEX "IX_IntegrationAccount_updatedBy" ON "IntegrationAccount"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Connector_organizationId" ON "Connector"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Connector_integrationId" ON "Connector"("integrationId");

-- CreateIndex
CREATE INDEX "IX_Connector_connectorType" ON "Connector"("connectorType");

-- CreateIndex
CREATE INDEX "IX_Connector_status" ON "Connector"("status");

-- CreateIndex
CREATE INDEX "IX_Connector_createdBy" ON "Connector"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Connector_updatedBy" ON "Connector"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_IntegrationEndpoint_createdBy" ON "IntegrationEndpoint"("createdBy");

-- CreateIndex
CREATE INDEX "IX_IntegrationEndpoint_externalSystemId" ON "IntegrationEndpoint"("externalSystemId");

-- CreateIndex
CREATE INDEX "IX_IntegrationEndpoint_organizationId" ON "IntegrationEndpoint"("organizationId");

-- CreateIndex
CREATE INDEX "IX_IntegrationEndpoint_protocol" ON "IntegrationEndpoint"("protocol");

-- CreateIndex
CREATE INDEX "IX_IntegrationEndpoint_status" ON "IntegrationEndpoint"("status");

-- CreateIndex
CREATE INDEX "IX_IntegrationEndpoint_type" ON "IntegrationEndpoint"("type");

-- CreateIndex
CREATE INDEX "IX_IntegrationEndpoint_updatedBy" ON "IntegrationEndpoint"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Mapping_organizationId" ON "Mapping"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Mapping_connectorId" ON "Mapping"("connectorId");

-- CreateIndex
CREATE INDEX "IX_Mapping_integrationAccountId" ON "Mapping"("integrationAccountId");

-- CreateIndex
CREATE INDEX "IX_Mapping_direction" ON "Mapping"("direction");

-- CreateIndex
CREATE INDEX "IX_Mapping_isActive" ON "Mapping"("isActive");

-- CreateIndex
CREATE INDEX "IX_Mapping_createdBy" ON "Mapping"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Mapping_updatedBy" ON "Mapping"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Transformation_organizationId" ON "Transformation"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Transformation_connectorId" ON "Transformation"("connectorId");

-- CreateIndex
CREATE INDEX "IX_Transformation_type" ON "Transformation"("type");

-- CreateIndex
CREATE INDEX "IX_Transformation_isActive" ON "Transformation"("isActive");

-- CreateIndex
CREATE INDEX "IX_Transformation_createdBy" ON "Transformation"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Transformation_updatedBy" ON "Transformation"("updatedBy");

-- CreateIndex
CREATE INDEX "Assessment_category_idx" ON "Assessment"("category");

-- CreateIndex
CREATE INDEX "Assessment_createdBy_idx" ON "Assessment"("createdBy");

-- CreateIndex
CREATE INDEX "Assessment_organizationId_idx" ON "Assessment"("organizationId");

-- CreateIndex
CREATE INDEX "Assessment_reviewDate_idx" ON "Assessment"("reviewDate");

-- CreateIndex
CREATE INDEX "Assessment_status_idx" ON "Assessment"("status");

-- CreateIndex
CREATE INDEX "Assessment_type_idx" ON "Assessment"("type");

-- CreateIndex
CREATE INDEX "Assessment_updatedBy_idx" ON "Assessment"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_ComplianceReport_organizationId" ON "ComplianceReport"("organizationId");

-- CreateIndex
CREATE INDEX "IX_ComplianceReport_reportType" ON "ComplianceReport"("reportType");

-- CreateIndex
CREATE INDEX "IX_ComplianceReport_status" ON "ComplianceReport"("status");

-- CreateIndex
CREATE INDEX "IX_ComplianceReport_createdBy" ON "ComplianceReport"("createdBy");

-- CreateIndex
CREATE INDEX "IX_ComplianceReport_updatedBy" ON "ComplianceReport"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_ComplianceAssessment_frameworkId" ON "compliance_assessments"("frameworkId");

-- CreateIndex
CREATE INDEX "IX_ComplianceAssessment_assessmentDate" ON "compliance_assessments"("assessmentDate");

-- CreateIndex
CREATE INDEX "IX_ComplianceAssessment_status" ON "compliance_assessments"("status");

-- CreateIndex
CREATE INDEX "IX_AssessmentResult_assessmentId" ON "assessment_results"("assessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "assessment_results_assessmentId_controlId_key" ON "assessment_results"("assessmentId", "controlId");

-- CreateIndex
CREATE INDEX "IX_AssessmentRecommendation_assessmentId" ON "assessment_recommendations"("assessmentId");

-- CreateIndex
CREATE INDEX "IX_AssessmentRecommendation_priority" ON "assessment_recommendations"("priority");

-- CreateIndex
CREATE INDEX "IX_SecurityFramework_organizationId" ON "security_frameworks"("organizationId");

-- CreateIndex
CREATE INDEX "IX_SecurityFramework_frameworkType" ON "security_frameworks"("frameworkType");

-- CreateIndex
CREATE INDEX "IX_SecurityFramework_implementationStatus" ON "security_frameworks"("implementationStatus");

-- CreateIndex
CREATE INDEX "IX_SecurityControl_frameworkId" ON "security_controls"("frameworkId");

-- CreateIndex
CREATE INDEX "IX_SecurityControl_implementationStatus" ON "security_controls"("implementationStatus");

-- CreateIndex
CREATE INDEX "IX_SecurityControl_responsibleUserId" ON "security_controls"("responsibleUserId");

-- CreateIndex
CREATE INDEX "IX_SecurityControl_priority" ON "security_controls"("priority");

-- CreateIndex
CREATE UNIQUE INDEX "security_controls_frameworkId_controlId_key" ON "security_controls"("frameworkId", "controlId");

-- CreateIndex
CREATE INDEX "IX_ControlTestResult_controlId" ON "control_test_results"("controlId");

-- CreateIndex
CREATE INDEX "IX_ControlTestResult_testDate" ON "control_test_results"("testDate");

-- CreateIndex
CREATE INDEX "IX_SecurityEvidence_controlId" ON "security_evidence"("controlId");

-- CreateIndex
CREATE INDEX "IX_SecurityEvidence_type" ON "security_evidence"("type");

-- CreateIndex
CREATE INDEX "IX_SecurityEvidence_collectedDate" ON "security_evidence"("collectedDate");

-- CreateIndex
CREATE INDEX "IX_SecurityTask_frameworkId" ON "security_tasks"("frameworkId");

-- CreateIndex
CREATE INDEX "IX_SecurityTask_controlId" ON "security_tasks"("controlId");

-- CreateIndex
CREATE INDEX "IX_SecurityTask_assignedToId" ON "security_tasks"("assignedToId");

-- CreateIndex
CREATE INDEX "IX_SecurityTask_status" ON "security_tasks"("status");

-- CreateIndex
CREATE INDEX "IX_SecurityTask_dueDate" ON "security_tasks"("dueDate");

-- CreateIndex
CREATE INDEX "IX_SecurityTask_category" ON "security_tasks"("category");

-- CreateIndex
CREATE INDEX "IX_SecurityFinding_controlId" ON "security_findings"("controlId");

-- CreateIndex
CREATE INDEX "IX_SecurityFinding_severity" ON "security_findings"("severity");

-- CreateIndex
CREATE INDEX "IX_SecurityFinding_status" ON "security_findings"("status");

-- CreateIndex
CREATE INDEX "IX_SecurityFinding_assigneeId" ON "security_findings"("assigneeId");

-- CreateIndex
CREATE INDEX "IX_FrameworkControlMapping_sourceFrameworkId" ON "framework_control_mappings"("sourceFrameworkId");

-- CreateIndex
CREATE INDEX "IX_FrameworkControlMapping_targetFrameworkId" ON "framework_control_mappings"("targetFrameworkId");

-- CreateIndex
CREATE UNIQUE INDEX "framework_control_mappings_sourceFrameworkId_sourceControlI_key" ON "framework_control_mappings"("sourceFrameworkId", "sourceControlId", "targetFrameworkId", "targetControlId");

-- CreateIndex
CREATE INDEX "FinancialBudget_organizationId_idx" ON "FinancialBudget"("organizationId");

-- CreateIndex
CREATE INDEX "FinancialBudget_fiscalYear_organizationId_idx" ON "FinancialBudget"("fiscalYear", "organizationId");

-- CreateIndex
CREATE INDEX "FinancialBudget_status_idx" ON "FinancialBudget"("status");

-- CreateIndex
CREATE INDEX "FinancialBudgetLineItem_budgetId_idx" ON "FinancialBudgetLineItem"("budgetId");

-- CreateIndex
CREATE INDEX "FinancialBudgetLineItem_category_idx" ON "FinancialBudgetLineItem"("category");

-- CreateIndex
CREATE INDEX "FinancialBudgetAllocation_budgetId_idx" ON "FinancialBudgetAllocation"("budgetId");

-- CreateIndex
CREATE INDEX "FinancialBudgetAllocation_allocationType_idx" ON "FinancialBudgetAllocation"("allocationType");

-- CreateIndex
CREATE INDEX "FinancialBudgetAllocation_status_idx" ON "FinancialBudgetAllocation"("status");

-- CreateIndex
CREATE INDEX "FinancialBudgetForecast_budgetId_idx" ON "FinancialBudgetForecast"("budgetId");

-- CreateIndex
CREATE INDEX "FinancialBudgetForecast_period_idx" ON "FinancialBudgetForecast"("period");

-- CreateIndex
CREATE INDEX "FinancialBudgetForecast_forecastDate_idx" ON "FinancialBudgetForecast"("forecastDate");

-- CreateIndex
CREATE INDEX "infrastructure_monitoring_organizationId_idx" ON "infrastructure_monitoring"("organizationId");

-- CreateIndex
CREATE INDEX "infrastructure_monitoring_assetId_assetType_idx" ON "infrastructure_monitoring"("assetId", "assetType");

-- CreateIndex
CREATE INDEX "infrastructure_monitoring_metricName_idx" ON "infrastructure_monitoring"("metricName");

-- CreateIndex
CREATE INDEX "infrastructure_monitoring_timestamp_idx" ON "infrastructure_monitoring"("timestamp");

-- CreateIndex
CREATE INDEX "incidents_organizationId_idx" ON "incidents"("organizationId");

-- CreateIndex
CREATE INDEX "incidents_status_idx" ON "incidents"("status");

-- CreateIndex
CREATE INDEX "incidents_severity_idx" ON "incidents"("severity");

-- CreateIndex
CREATE UNIQUE INDEX "incidents_organizationId_incidentId_key" ON "incidents"("organizationId", "incidentId");

-- CreateIndex
CREATE INDEX "capacity_plans_organizationId_idx" ON "capacity_plans"("organizationId");

-- CreateIndex
CREATE INDEX "capacity_plans_status_idx" ON "capacity_plans"("status");

-- CreateIndex
CREATE INDEX "operational_alerts_organizationId_idx" ON "operational_alerts"("organizationId");

-- CreateIndex
CREATE INDEX "operational_alerts_status_idx" ON "operational_alerts"("status");

-- CreateIndex
CREATE INDEX "operational_alerts_severity_idx" ON "operational_alerts"("severity");

-- CreateIndex
CREATE INDEX "operational_alerts_assetId_assetType_idx" ON "operational_alerts"("assetId", "assetType");

-- CreateIndex
CREATE INDEX "service_level_agreements_organizationId_idx" ON "service_level_agreements"("organizationId");

-- CreateIndex
CREATE INDEX "service_level_agreements_serviceId_idx" ON "service_level_agreements"("serviceId");

-- CreateIndex
CREATE INDEX "service_level_agreements_status_idx" ON "service_level_agreements"("status");

-- CreateIndex
CREATE INDEX "BusinessCaseValueStream_businessCaseId_idx" ON "BusinessCaseValueStream"("businessCaseId");

-- CreateIndex
CREATE INDEX "BusinessCaseValueStream_valueStreamId_idx" ON "BusinessCaseValueStream"("valueStreamId");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessCaseValueStream_businessCaseId_valueStreamId_key" ON "BusinessCaseValueStream"("businessCaseId", "valueStreamId");

-- CreateIndex
CREATE INDEX "IX_ProductBusinessCase_businessCaseId" ON "ProductBusinessCase"("businessCaseId");

-- CreateIndex
CREATE INDEX "IX_ProductBusinessCase_productId" ON "ProductBusinessCase"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductBusinessCase_productId_businessCaseId_key" ON "ProductBusinessCase"("productId", "businessCaseId");

-- CreateIndex
CREATE INDEX "ProductValueStream_productId_idx" ON "ProductValueStream"("productId");

-- CreateIndex
CREATE INDEX "ProductValueStream_valueStreamId_idx" ON "ProductValueStream"("valueStreamId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductValueStream_productId_valueStreamId_key" ON "ProductValueStream"("productId", "valueStreamId");

-- CreateIndex
CREATE INDEX "IX_COBITProcess_frameworkId" ON "cobit_processes"("frameworkId");

-- CreateIndex
CREATE INDEX "IX_COBITProcess_domain" ON "cobit_processes"("domain");

-- CreateIndex
CREATE INDEX "IX_COBITProcess_maturityLevel" ON "cobit_processes"("maturityLevel");

-- CreateIndex
CREATE UNIQUE INDEX "cobit_processes_frameworkId_processCode_key" ON "cobit_processes"("frameworkId", "processCode");

-- CreateIndex
CREATE INDEX "IX_PCFProcess_frameworkId" ON "pcf_processes"("frameworkId");

-- CreateIndex
CREATE INDEX "IX_PCFProcess_category" ON "pcf_processes"("category");

-- CreateIndex
CREATE INDEX "IX_PCFProcess_level" ON "pcf_processes"("level");

-- CreateIndex
CREATE INDEX "IX_PCFProcess_standardizationLevel" ON "pcf_processes"("standardizationLevel");

-- CreateIndex
CREATE UNIQUE INDEX "pcf_processes_frameworkId_processCode_key" ON "pcf_processes"("frameworkId", "processCode");

-- CreateIndex
CREATE INDEX "IX_BusinessCaseCOBIT_businessCaseId" ON "business_case_cobit"("businessCaseId");

-- CreateIndex
CREATE INDEX "IX_BusinessCaseCOBIT_cobitFrameworkId" ON "business_case_cobit"("cobitFrameworkId");

-- CreateIndex
CREATE UNIQUE INDEX "business_case_cobit_businessCaseId_cobitFrameworkId_key" ON "business_case_cobit"("businessCaseId", "cobitFrameworkId");

-- CreateIndex
CREATE INDEX "IX_BusinessCaseCOBITProcess_businessCaseId" ON "business_case_cobit_process"("businessCaseId");

-- CreateIndex
CREATE INDEX "IX_BusinessCaseCOBITProcess_cobitProcessId" ON "business_case_cobit_process"("cobitProcessId");

-- CreateIndex
CREATE UNIQUE INDEX "business_case_cobit_process_businessCaseId_cobitProcessId_key" ON "business_case_cobit_process"("businessCaseId", "cobitProcessId");

-- CreateIndex
CREATE INDEX "IX_BusinessCasePCF_businessCaseId" ON "business_case_pcf"("businessCaseId");

-- CreateIndex
CREATE INDEX "IX_BusinessCasePCF_pcfFrameworkId" ON "business_case_pcf"("pcfFrameworkId");

-- CreateIndex
CREATE UNIQUE INDEX "business_case_pcf_businessCaseId_pcfFrameworkId_key" ON "business_case_pcf"("businessCaseId", "pcfFrameworkId");

-- CreateIndex
CREATE INDEX "IX_BusinessCasePCFProcess_businessCaseId" ON "business_case_pcf_process"("businessCaseId");

-- CreateIndex
CREATE INDEX "IX_BusinessCasePCFProcess_pcfProcessId" ON "business_case_pcf_process"("pcfProcessId");

-- CreateIndex
CREATE UNIQUE INDEX "business_case_pcf_process_businessCaseId_pcfProcessId_key" ON "business_case_pcf_process"("businessCaseId", "pcfProcessId");

-- CreateIndex
CREATE INDEX "CapabilityResource_capabilityId_idx" ON "CapabilityResource"("capabilityId");

-- CreateIndex
CREATE INDEX "CapabilityResource_resourceId_idx" ON "CapabilityResource"("resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "CapabilityResource_capabilityId_resourceId_key" ON "CapabilityResource"("capabilityId", "resourceId");

-- CreateIndex
CREATE INDEX "KpiResource_kpiId_idx" ON "KpiResource"("kpiId");

-- CreateIndex
CREATE INDEX "KpiResource_resourceId_idx" ON "KpiResource"("resourceId");

-- CreateIndex
CREATE UNIQUE INDEX "KpiResource_kpiId_resourceId_key" ON "KpiResource"("kpiId", "resourceId");

-- CreateIndex
CREATE INDEX "ValueStreamCapability_capabilityId_idx" ON "ValueStreamCapability"("capabilityId");

-- CreateIndex
CREATE INDEX "ValueStreamCapability_valueStreamId_idx" ON "ValueStreamCapability"("valueStreamId");

-- CreateIndex
CREATE UNIQUE INDEX "ValueStreamCapability_valueStreamId_capabilityId_key" ON "ValueStreamCapability"("valueStreamId", "capabilityId");

-- CreateIndex
CREATE INDEX "IX_OpportunityActivity_opportunityId" ON "OpportunityActivity"("opportunityId");

-- CreateIndex
CREATE INDEX "IX_OpportunityActivity_activityDate" ON "OpportunityActivity"("activityDate");

-- CreateIndex
CREATE INDEX "IX_OpportunityNote_opportunityId" ON "OpportunityNote"("opportunityId");

-- CreateIndex
CREATE INDEX "IX_ArchitectureDecision_category" ON "ArchitectureDecision"("category");

-- CreateIndex
CREATE INDEX "IX_ArchitectureDecision_createdBy" ON "ArchitectureDecision"("createdBy");

-- CreateIndex
CREATE INDEX "IX_ArchitectureDecision_organizationId" ON "ArchitectureDecision"("organizationId");

-- CreateIndex
CREATE INDEX "IX_ArchitectureDecision_priority" ON "ArchitectureDecision"("priority");

-- CreateIndex
CREATE INDEX "IX_ArchitectureDecision_status" ON "ArchitectureDecision"("status");

-- CreateIndex
CREATE INDEX "IX_ArchitectureDecision_updatedBy" ON "ArchitectureDecision"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Deliverable_createdBy" ON "Deliverable"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Deliverable_organizationId" ON "Deliverable"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Deliverable_priority" ON "Deliverable"("priority");

-- CreateIndex
CREATE INDEX "IX_Deliverable_status" ON "Deliverable"("status");

-- CreateIndex
CREATE INDEX "IX_Deliverable_type" ON "Deliverable"("type");

-- CreateIndex
CREATE INDEX "IX_Deliverable_updatedBy" ON "Deliverable"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Deliverable_workPackageId" ON "Deliverable"("workPackageId");

-- CreateIndex
CREATE INDEX "IX_Gap_createdBy" ON "Gap"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Gap_impact" ON "Gap"("impact");

-- CreateIndex
CREATE INDEX "IX_Gap_organizationId" ON "Gap"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Gap_severity" ON "Gap"("severity");

-- CreateIndex
CREATE INDEX "IX_Gap_status" ON "Gap"("status");

-- CreateIndex
CREATE INDEX "IX_Gap_type" ON "Gap"("type");

-- CreateIndex
CREATE INDEX "IX_Gap_updatedBy" ON "Gap"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Gap_urgency" ON "Gap"("urgency");

-- CreateIndex
CREATE INDEX "IX_ImplementationEvent_createdBy" ON "ImplementationEvent"("createdBy");

-- CreateIndex
CREATE INDEX "IX_ImplementationEvent_organizationId" ON "ImplementationEvent"("organizationId");

-- CreateIndex
CREATE INDEX "IX_ImplementationEvent_priority" ON "ImplementationEvent"("priority");

-- CreateIndex
CREATE INDEX "IX_ImplementationEvent_status" ON "ImplementationEvent"("status");

-- CreateIndex
CREATE INDEX "IX_ImplementationEvent_type" ON "ImplementationEvent"("type");

-- CreateIndex
CREATE INDEX "IX_ImplementationEvent_updatedBy" ON "ImplementationEvent"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_ImplementationEvent_workPackageId" ON "ImplementationEvent"("workPackageId");

-- CreateIndex
CREATE INDEX "IX_Junction_createdBy" ON "Junction"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Junction_isActive" ON "Junction"("isActive");

-- CreateIndex
CREATE INDEX "IX_Junction_organizationId" ON "Junction"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Junction_updatedBy" ON "Junction"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Node_createdBy" ON "Node"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Node_environment" ON "Node"("environment");

-- CreateIndex
CREATE INDEX "IX_Node_location" ON "Node"("location");

-- CreateIndex
CREATE INDEX "IX_Node_organizationId" ON "Node"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Node_status" ON "Node"("status");

-- CreateIndex
CREATE INDEX "IX_Node_type" ON "Node"("type");

-- CreateIndex
CREATE INDEX "IX_Node_updatedBy" ON "Node"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Path_createdBy" ON "Path"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Path_organizationId" ON "Path"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Path_protocol" ON "Path"("protocol");

-- CreateIndex
CREATE INDEX "IX_Path_type" ON "Path"("type");

-- CreateIndex
CREATE INDEX "IX_Path_updatedBy" ON "Path"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Plateau_createdBy" ON "Plateau"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Plateau_endDate" ON "Plateau"("endDate");

-- CreateIndex
CREATE INDEX "IX_Plateau_isActive" ON "Plateau"("isActive");

-- CreateIndex
CREATE INDEX "IX_Plateau_organizationId" ON "Plateau"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Plateau_startDate" ON "Plateau"("startDate");

-- CreateIndex
CREATE INDEX "IX_Plateau_updatedBy" ON "Plateau"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Requirement_category" ON "Requirement"("category");

-- CreateIndex
CREATE INDEX "IX_Requirement_createdBy" ON "Requirement"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Requirement_organizationId" ON "Requirement"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Requirement_parent" ON "Requirement"("parent_requirement");

-- CreateIndex
CREATE INDEX "IX_Requirement_priority" ON "Requirement"("priority");

-- CreateIndex
CREATE INDEX "IX_Requirement_status" ON "Requirement"("status");

-- CreateIndex
CREATE INDEX "IX_Requirement_type" ON "Requirement"("type");

-- CreateIndex
CREATE INDEX "IX_Requirement_updatedBy" ON "Requirement"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_AcceptanceCriteria_organizationId" ON "acceptance_criteria"("organizationId");

-- CreateIndex
CREATE INDEX "IX_AcceptanceCriteria_requirementId" ON "acceptance_criteria"("requirementId");

-- CreateIndex
CREATE INDEX "IX_AcceptanceCriteria_status" ON "acceptance_criteria"("status");

-- CreateIndex
CREATE INDEX "IX_AuditLog_createdAt" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "IX_AuditLog_entityType" ON "AuditLog"("entityType");

-- CreateIndex
CREATE INDEX "IX_AuditLog_organizationId" ON "AuditLog"("organizationId");

-- CreateIndex
CREATE INDEX "IX_AuditLog_userId" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "IX_Location_createdBy" ON "Location"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Location_isActive" ON "Location"("isActive");

-- CreateIndex
CREATE INDEX "IX_Location_organizationId" ON "Location"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Location_parentId" ON "Location"("parentId");

-- CreateIndex
CREATE INDEX "IX_Location_type" ON "Location"("type");

-- CreateIndex
CREATE INDEX "IX_Location_updatedBy" ON "Location"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Template_category" ON "Template"("category");

-- CreateIndex
CREATE INDEX "IX_Template_isActive" ON "Template"("isActive");

-- CreateIndex
CREATE INDEX "IX_Template_isSystem" ON "Template"("isSystem");

-- CreateIndex
CREATE INDEX "IX_Template_organizationId" ON "Template"("organizationId");

-- CreateIndex
CREATE INDEX "IX_CommunicationNetwork_createdBy" ON "CommunicationNetwork"("createdBy");

-- CreateIndex
CREATE INDEX "IX_CommunicationNetwork_organizationId" ON "CommunicationNetwork"("organizationId");

-- CreateIndex
CREATE INDEX "IX_CommunicationNetwork_topology" ON "CommunicationNetwork"("topology");

-- CreateIndex
CREATE INDEX "IX_CommunicationNetwork_type" ON "CommunicationNetwork"("type");

-- CreateIndex
CREATE INDEX "IX_CommunicationNetwork_updatedBy" ON "CommunicationNetwork"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Constraint_category" ON "Constraint"("category");

-- CreateIndex
CREATE INDEX "IX_Constraint_compliance" ON "Constraint"("compliance");

-- CreateIndex
CREATE INDEX "IX_Constraint_createdBy" ON "Constraint"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Constraint_enforcement" ON "Constraint"("enforcement");

-- CreateIndex
CREATE INDEX "IX_Constraint_organizationId" ON "Constraint"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Constraint_parent" ON "Constraint"("parent_constraint");

-- CreateIndex
CREATE INDEX "IX_Constraint_priority" ON "Constraint"("priority");

-- CreateIndex
CREATE INDEX "IX_Constraint_status" ON "Constraint"("status");

-- CreateIndex
CREATE INDEX "IX_Constraint_type" ON "Constraint"("type");

-- CreateIndex
CREATE INDEX "IX_Constraint_updatedBy" ON "Constraint"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_RetentionRule_organizationId" ON "RetentionRule"("organizationId");

-- CreateIndex
CREATE INDEX "IX_RetentionRule_entityType" ON "RetentionRule"("entityType");

-- CreateIndex
CREATE INDEX "IX_RetentionRule_createdBy" ON "RetentionRule"("createdBy");

-- CreateIndex
CREATE INDEX "IX_RetentionRule_updatedBy" ON "RetentionRule"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_TestScript_organizationId" ON "test_scripts"("organizationId");

-- CreateIndex
CREATE INDEX "IX_TestScript_acceptanceCriteriaId" ON "test_scripts"("acceptanceCriteriaId");

-- CreateIndex
CREATE INDEX "IX_TestScript_status" ON "test_scripts"("status");

-- CreateIndex
CREATE INDEX "IX_TestScript_testType" ON "test_scripts"("testType");

-- CreateIndex
CREATE INDEX "IX_TestExecution_organizationId" ON "test_executions"("organizationId");

-- CreateIndex
CREATE INDEX "IX_TestExecution_testScriptId" ON "test_executions"("testScriptId");

-- CreateIndex
CREATE INDEX "IX_TestExecution_status" ON "test_executions"("status");

-- CreateIndex
CREATE INDEX "IX_TestExecution_executionDate" ON "test_executions"("executionDate");

-- CreateIndex
CREATE INDEX "IX_MitigationAction_mitigationId" ON "mitigation_actions"("mitigationId");

-- CreateIndex
CREATE INDEX "IX_MitigationAction_dueDate" ON "mitigation_actions"("dueDate");

-- CreateIndex
CREATE INDEX "IX_MitigationAction_assigneeId" ON "mitigation_actions"("assigneeId");

-- CreateIndex
CREATE INDEX "IX_Principle_category" ON "Principle"("category");

-- CreateIndex
CREATE INDEX "IX_Principle_compliance" ON "Principle"("compliance");

-- CreateIndex
CREATE INDEX "IX_Principle_createdBy" ON "Principle"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Principle_enforcement" ON "Principle"("enforcement");

-- CreateIndex
CREATE INDEX "IX_Principle_organizationId" ON "Principle"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Principle_priority" ON "Principle"("priority");

-- CreateIndex
CREATE INDEX "IX_Principle_status" ON "Principle"("status");

-- CreateIndex
CREATE INDEX "IX_Principle_type" ON "Principle"("type");

-- CreateIndex
CREATE INDEX "IX_Principle_updatedBy" ON "Principle"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Outcome_createdBy" ON "Outcome"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Outcome_organizationId" ON "Outcome"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Outcome_status" ON "Outcome"("status");

-- CreateIndex
CREATE INDEX "IX_Outcome_priority" ON "Outcome"("priority");

-- CreateIndex
CREATE INDEX "IX_Outcome_type" ON "Outcome"("type");

-- CreateIndex
CREATE INDEX "IX_Outcome_category" ON "Outcome"("category");

-- CreateIndex
CREATE INDEX "IX_Outcome_updatedBy" ON "Outcome"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Value_createdBy" ON "values"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Value_organizationId" ON "values"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Value_category" ON "values"("category");

-- CreateIndex
CREATE INDEX "IX_Value_type" ON "values"("type");

-- CreateIndex
CREATE INDEX "IX_Value_priority" ON "values"("priority");

-- CreateIndex
CREATE INDEX "IX_Value_isCore" ON "values"("isCore");

-- CreateIndex
CREATE INDEX "IX_Value_isActive" ON "values"("isActive");

-- CreateIndex
CREATE INDEX "IX_Value_updatedBy" ON "values"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_Device_category" ON "Device"("category");

-- CreateIndex
CREATE INDEX "IX_Device_createdBy" ON "Device"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Device_organizationId" ON "Device"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Device_status" ON "Device"("status");

-- CreateIndex
CREATE INDEX "IX_Device_type" ON "Device"("type");

-- CreateIndex
CREATE INDEX "IX_Device_updatedBy" ON "Device"("updatedBy");

-- CreateIndex
CREATE INDEX "Driver_category_idx" ON "Driver"("category");

-- CreateIndex
CREATE INDEX "Driver_createdBy_idx" ON "Driver"("createdBy");

-- CreateIndex
CREATE INDEX "Driver_impact_idx" ON "Driver"("impact");

-- CreateIndex
CREATE INDEX "Driver_organizationId_idx" ON "Driver"("organizationId");

-- CreateIndex
CREATE INDEX "Driver_status_idx" ON "Driver"("status");

-- CreateIndex
CREATE INDEX "Driver_type_idx" ON "Driver"("type");

-- CreateIndex
CREATE INDEX "Driver_updatedBy_idx" ON "Driver"("updatedBy");

-- CreateIndex
CREATE INDEX "Driver_urgency_idx" ON "Driver"("urgency");

-- CreateIndex
CREATE INDEX "IX_Grouping_createdBy" ON "Grouping"("createdBy");

-- CreateIndex
CREATE INDEX "IX_Grouping_isActive" ON "Grouping"("isActive");

-- CreateIndex
CREATE INDEX "IX_Grouping_organizationId" ON "Grouping"("organizationId");

-- CreateIndex
CREATE INDEX "IX_Grouping_type" ON "Grouping"("type");

-- CreateIndex
CREATE INDEX "IX_Grouping_updatedBy" ON "Grouping"("updatedBy");

-- CreateIndex
CREATE INDEX "IX_SystemSoftware_category" ON "SystemSoftware"("category");

-- CreateIndex
CREATE INDEX "IX_SystemSoftware_createdBy" ON "SystemSoftware"("createdBy");

-- CreateIndex
CREATE INDEX "IX_SystemSoftware_organizationId" ON "SystemSoftware"("organizationId");

-- CreateIndex
CREATE INDEX "IX_SystemSoftware_status" ON "SystemSoftware"("status");

-- CreateIndex
CREATE INDEX "IX_SystemSoftware_type" ON "SystemSoftware"("type");

-- CreateIndex
CREATE INDEX "IX_SystemSoftware_updatedBy" ON "SystemSoftware"("updatedBy");

-- CreateIndex
CREATE INDEX "relationships_sourceEntityType_sourceEntityId_idx" ON "relationships"("sourceEntityType", "sourceEntityId");

-- CreateIndex
CREATE INDEX "relationships_targetEntityType_targetEntityId_idx" ON "relationships"("targetEntityType", "targetEntityId");

-- CreateIndex
CREATE INDEX "relationships_type_idx" ON "relationships"("type");

-- CreateIndex
CREATE INDEX "relationships_organizationId_idx" ON "relationships"("organizationId");

-- CreateIndex
CREATE INDEX "relationships_source_idx" ON "relationships"("source");

-- CreateIndex
CREATE INDEX "embeddings_organizationId_idx" ON "embeddings"("organizationId");

-- CreateIndex
CREATE INDEX "embeddings_entityType_idx" ON "embeddings"("entityType");

-- CreateIndex
CREATE UNIQUE INDEX "embeddings_entityType_entityId_model_key" ON "embeddings"("entityType", "entityId", "model");

-- CreateIndex
CREATE INDEX "document_chunks_organizationId_idx" ON "document_chunks"("organizationId");

-- CreateIndex
CREATE INDEX "document_chunks_documentId_idx" ON "document_chunks"("documentId");

-- CreateIndex
CREATE INDEX "document_chunks_documentType_idx" ON "document_chunks"("documentType");

-- CreateIndex
CREATE INDEX "knowledge_graphs_organizationId_idx" ON "knowledge_graphs"("organizationId");

-- CreateIndex
CREATE INDEX "semantic_searches_organizationId_idx" ON "semantic_searches"("organizationId");

-- CreateIndex
CREATE INDEX "semantic_searches_userId_idx" ON "semantic_searches"("userId");

-- CreateIndex
CREATE INDEX "semantic_searches_createdAt_idx" ON "semantic_searches"("createdAt");

-- CreateIndex
CREATE INDEX "rag_contexts_organizationId_idx" ON "rag_contexts"("organizationId");

-- CreateIndex
CREATE INDEX "rag_contexts_contextType_idx" ON "rag_contexts"("contextType");

-- CreateIndex
CREATE INDEX "rag_contexts_entityType_entityId_idx" ON "rag_contexts"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "context_caches_organizationId_idx" ON "context_caches"("organizationId");

-- CreateIndex
CREATE INDEX "context_caches_expiresAt_idx" ON "context_caches"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "context_caches_organizationId_cacheKey_key" ON "context_caches"("organizationId", "cacheKey");

-- CreateIndex
CREATE INDEX "ai_conversations_organizationId_idx" ON "ai_conversations"("organizationId");

-- CreateIndex
CREATE INDEX "ai_conversations_userId_idx" ON "ai_conversations"("userId");

-- CreateIndex
CREATE INDEX "ai_messages_conversationId_idx" ON "ai_messages"("conversationId");

-- CreateIndex
CREATE INDEX "features_organizationId_idx" ON "features"("organizationId");

-- CreateIndex
CREATE INDEX "features_productId_idx" ON "features"("productId");

-- CreateIndex
CREATE INDEX "features_status_idx" ON "features"("status");

-- CreateIndex
CREATE INDEX "archimate_diagrams_organizationId_idx" ON "archimate_diagrams"("organizationId");

-- CreateIndex
CREATE INDEX "archimate_diagrams_type_idx" ON "archimate_diagrams"("type");

-- CreateIndex
CREATE INDEX "archimate_diagrams_notation_idx" ON "archimate_diagrams"("notation");

-- CreateIndex
CREATE INDEX "archimate_elements_diagramId_idx" ON "archimate_elements"("diagramId");

-- CreateIndex
CREATE INDEX "archimate_elements_elementType_idx" ON "archimate_elements"("elementType");

-- CreateIndex
CREATE INDEX "archimate_elements_layer_idx" ON "archimate_elements"("layer");

-- CreateIndex
CREATE INDEX "archimate_elements_organizationId_idx" ON "archimate_elements"("organizationId");

-- CreateIndex
CREATE INDEX "archimate_elements_capabilityId_idx" ON "archimate_elements"("capabilityId");

-- CreateIndex
CREATE INDEX "archimate_elements_requirementId_idx" ON "archimate_elements"("requirementId");

-- CreateIndex
CREATE INDEX "archimate_relationships_diagramId_idx" ON "archimate_relationships"("diagramId");

-- CreateIndex
CREATE INDEX "archimate_relationships_relationshipType_idx" ON "archimate_relationships"("relationshipType");

-- CreateIndex
CREATE INDEX "archimate_relationships_sourceId_idx" ON "archimate_relationships"("sourceId");

-- CreateIndex
CREATE INDEX "archimate_relationships_targetId_idx" ON "archimate_relationships"("targetId");

-- CreateIndex
CREATE INDEX "archimate_relationships_organizationId_idx" ON "archimate_relationships"("organizationId");

-- CreateIndex
CREATE INDEX "togaf_phases_organizationId_idx" ON "togaf_phases"("organizationId");

-- CreateIndex
CREATE INDEX "togaf_phases_phaseType_idx" ON "togaf_phases"("phaseType");

-- CreateIndex
CREATE INDEX "togaf_phases_status_idx" ON "togaf_phases"("status");

-- CreateIndex
CREATE INDEX "togaf_deliverables_phaseId_idx" ON "togaf_deliverables"("phaseId");

-- CreateIndex
CREATE INDEX "togaf_deliverables_deliverableType_idx" ON "togaf_deliverables"("deliverableType");

-- CreateIndex
CREATE INDEX "togaf_deliverables_status_idx" ON "togaf_deliverables"("status");

-- CreateIndex
CREATE INDEX "togaf_deliverables_organizationId_idx" ON "togaf_deliverables"("organizationId");

-- CreateIndex
CREATE INDEX "togaf_deliverables_diagramId_idx" ON "togaf_deliverables"("diagramId");

-- CreateIndex
CREATE INDEX "togaf_building_blocks_organizationId_idx" ON "togaf_building_blocks"("organizationId");

-- CreateIndex
CREATE INDEX "togaf_building_blocks_type_idx" ON "togaf_building_blocks"("type");

-- CreateIndex
CREATE INDEX "togaf_building_blocks_category_idx" ON "togaf_building_blocks"("category");

-- CreateIndex
CREATE INDEX "togaf_building_blocks_capabilityId_idx" ON "togaf_building_blocks"("capabilityId");

-- CreateIndex
CREATE INDEX "connector_configs_organizationId_idx" ON "connector_configs"("organizationId");

-- CreateIndex
CREATE INDEX "connector_configs_type_idx" ON "connector_configs"("type");

-- CreateIndex
CREATE INDEX "connector_configs_status_idx" ON "connector_configs"("status");

-- CreateIndex
CREATE INDEX "connector_sync_jobs_connectorId_idx" ON "connector_sync_jobs"("connectorId");

-- CreateIndex
CREATE INDEX "connector_sync_jobs_status_idx" ON "connector_sync_jobs"("status");

-- CreateIndex
CREATE INDEX "connector_sync_jobs_startedAt_idx" ON "connector_sync_jobs"("startedAt");

-- CreateIndex
CREATE INDEX "connector_sync_jobs_organizationId_idx" ON "connector_sync_jobs"("organizationId");

-- CreateIndex
CREATE INDEX "connector_data_mappings_connectorId_idx" ON "connector_data_mappings"("connectorId");

-- CreateIndex
CREATE INDEX "connector_data_mappings_sourceEntity_idx" ON "connector_data_mappings"("sourceEntity");

-- CreateIndex
CREATE INDEX "connector_data_mappings_targetEntity_idx" ON "connector_data_mappings"("targetEntity");

-- CreateIndex
CREATE INDEX "connector_data_mappings_organizationId_idx" ON "connector_data_mappings"("organizationId");

-- CreateIndex
CREATE INDEX "webhook_configs_connectorId_idx" ON "webhook_configs"("connectorId");

-- CreateIndex
CREATE INDEX "webhook_configs_active_idx" ON "webhook_configs"("active");

-- CreateIndex
CREATE INDEX "webhook_configs_organizationId_idx" ON "webhook_configs"("organizationId");

-- CreateIndex
CREATE INDEX "webhook_logs_webhookId_idx" ON "webhook_logs"("webhookId");

-- CreateIndex
CREATE INDEX "webhook_logs_executedAt_idx" ON "webhook_logs"("executedAt");

-- CreateIndex
CREATE INDEX "webhook_logs_success_idx" ON "webhook_logs"("success");

-- CreateIndex
CREATE INDEX "webhook_logs_organizationId_idx" ON "webhook_logs"("organizationId");

-- CreateIndex
CREATE INDEX "mcp_servers_organizationId_idx" ON "mcp_servers"("organizationId");

-- CreateIndex
CREATE INDEX "mcp_servers_status_idx" ON "mcp_servers"("status");

-- CreateIndex
CREATE INDEX "code_templates_organizationId_idx" ON "code_templates"("organizationId");

-- CreateIndex
CREATE INDEX "code_templates_language_idx" ON "code_templates"("language");

-- CreateIndex
CREATE INDEX "code_templates_framework_idx" ON "code_templates"("framework");

-- CreateIndex
CREATE INDEX "code_templates_isPublic_idx" ON "code_templates"("isPublic");

-- CreateIndex
CREATE INDEX "generated_code_templateId_idx" ON "generated_code"("templateId");

-- CreateIndex
CREATE INDEX "generated_code_requirementId_idx" ON "generated_code"("requirementId");

-- CreateIndex
CREATE INDEX "generated_code_capabilityId_idx" ON "generated_code"("capabilityId");

-- CreateIndex
CREATE INDEX "generated_code_diagramId_idx" ON "generated_code"("diagramId");

-- CreateIndex
CREATE INDEX "generated_code_status_idx" ON "generated_code"("status");

-- CreateIndex
CREATE INDEX "generated_code_organizationId_idx" ON "generated_code"("organizationId");

-- CreateIndex
CREATE INDEX "diagrams_organizationId_idx" ON "diagrams"("organizationId");

-- CreateIndex
CREATE INDEX "diagrams_type_idx" ON "diagrams"("type");

-- CreateIndex
CREATE INDEX "diagrams_createdBy_idx" ON "diagrams"("createdBy");

-- CreateIndex
CREATE INDEX "diagram_layers_organizationId_idx" ON "diagram_layers"("organizationId");

-- CreateIndex
CREATE INDEX "diagram_nodes_diagramId_idx" ON "diagram_nodes"("diagramId");

-- CreateIndex
CREATE INDEX "diagram_nodes_elementType_elementId_idx" ON "diagram_nodes"("elementType", "elementId");

-- CreateIndex
CREATE INDEX "diagram_edges_diagramId_idx" ON "diagram_edges"("diagramId");

-- CreateIndex
CREATE INDEX "diagram_edges_sourceNodeId_idx" ON "diagram_edges"("sourceNodeId");

-- CreateIndex
CREATE INDEX "diagram_edges_targetNodeId_idx" ON "diagram_edges"("targetNodeId");

-- CreateIndex
CREATE INDEX "diagram_views_diagramId_idx" ON "diagram_views"("diagramId");

-- CreateIndex
CREATE UNIQUE INDEX "notations_name_key" ON "notations"("name");

-- CreateIndex
CREATE INDEX "erd_tables_organizationId_idx" ON "erd_tables"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "erd_tables_organizationId_schemaName_tableName_key" ON "erd_tables"("organizationId", "schemaName", "tableName");

-- CreateIndex
CREATE INDEX "erd_columns_tableId_idx" ON "erd_columns"("tableId");

-- CreateIndex
CREATE INDEX "erd_relationships_sourceTableId_idx" ON "erd_relationships"("sourceTableId");

-- CreateIndex
CREATE INDEX "erd_relationships_targetTableId_idx" ON "erd_relationships"("targetTableId");

-- CreateIndex
CREATE INDEX "uml_classes_organizationId_idx" ON "uml_classes"("organizationId");

-- CreateIndex
CREATE INDEX "uml_relationships_sourceClassId_idx" ON "uml_relationships"("sourceClassId");

-- CreateIndex
CREATE INDEX "uml_relationships_targetClassId_idx" ON "uml_relationships"("targetClassId");

-- CreateIndex
CREATE INDEX "c4_components_organizationId_idx" ON "c4_components"("organizationId");

-- CreateIndex
CREATE INDEX "c4_components_parentId_idx" ON "c4_components"("parentId");

-- CreateIndex
CREATE INDEX "bpmn_elements_organizationId_idx" ON "bpmn_elements"("organizationId");

-- CreateIndex
CREATE INDEX "maturity_level_configs_organizationId_idx" ON "maturity_level_configs"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "maturity_level_configs_organizationId_level_key" ON "maturity_level_configs"("organizationId", "level");

-- CreateIndex
CREATE INDEX "maturity_scores_organizationId_idx" ON "maturity_scores"("organizationId");

-- CreateIndex
CREATE INDEX "maturity_scores_capabilityId_idx" ON "maturity_scores"("capabilityId");

-- CreateIndex
CREATE INDEX "maturity_scores_assessedAt_idx" ON "maturity_scores"("assessedAt");

-- CreateIndex
CREATE INDEX "maturity_dimensions_organizationId_idx" ON "maturity_dimensions"("organizationId");

-- CreateIndex
CREATE INDEX "benchmark_data_organizationId_idx" ON "benchmark_data"("organizationId");

-- CreateIndex
CREATE INDEX "benchmark_data_industry_companySize_idx" ON "benchmark_data"("industry", "companySize");

-- CreateIndex
CREATE INDEX "requirement_sources_organizationId_idx" ON "requirement_sources"("organizationId");

-- CreateIndex
CREATE INDEX "requirement_sources_requirementId_idx" ON "requirement_sources"("requirementId");

-- CreateIndex
CREATE INDEX "requirement_templates_organizationId_idx" ON "requirement_templates"("organizationId");

-- CreateIndex
CREATE INDEX "requirement_templates_category_idx" ON "requirement_templates"("category");

-- CreateIndex
CREATE INDEX "requirement_generations_organizationId_idx" ON "requirement_generations"("organizationId");

-- CreateIndex
CREATE INDEX "requirement_generations_createdAt_idx" ON "requirement_generations"("createdAt");

-- CreateIndex
CREATE INDEX "requirement_dependencies_sourceRequirementId_idx" ON "requirement_dependencies"("sourceRequirementId");

-- CreateIndex
CREATE INDEX "requirement_dependencies_targetRequirementId_idx" ON "requirement_dependencies"("targetRequirementId");

-- CreateIndex
CREATE INDEX "integration_templates_category_idx" ON "integration_templates"("category");

-- CreateIndex
CREATE INDEX "integration_templates_providerName_idx" ON "integration_templates"("providerName");

-- CreateIndex
CREATE INDEX "connector_registry_organizationId_idx" ON "connector_registry"("organizationId");

-- CreateIndex
CREATE INDEX "connector_registry_templateId_idx" ON "connector_registry"("templateId");

-- CreateIndex
CREATE UNIQUE INDEX "integration_marketplace_templateId_key" ON "integration_marketplace"("templateId");

-- CreateIndex
CREATE INDEX "integration_marketplace_featured_idx" ON "integration_marketplace"("featured");

-- CreateIndex
CREATE INDEX "integration_marketplace_trending_idx" ON "integration_marketplace"("trending");

-- CreateIndex
CREATE INDEX "sync_logs_syncJobId_idx" ON "sync_logs"("syncJobId");

-- CreateIndex
CREATE INDEX "sync_logs_startedAt_idx" ON "sync_logs"("startedAt");

-- CreateIndex
CREATE INDEX "import_jobs_organizationId_idx" ON "import_jobs"("organizationId");

-- CreateIndex
CREATE INDEX "import_jobs_status_idx" ON "import_jobs"("status");

-- CreateIndex
CREATE INDEX "framework_interactions_organizationId_idx" ON "framework_interactions"("organizationId");

-- CreateIndex
CREATE INDEX "framework_interactions_userId_idx" ON "framework_interactions"("userId");

-- CreateIndex
CREATE INDEX "framework_interactions_frameworkName_idx" ON "framework_interactions"("frameworkName");

-- CreateIndex
CREATE INDEX "framework_interactions_interactionType_idx" ON "framework_interactions"("interactionType");

-- CreateIndex
CREATE UNIQUE INDEX "acm_domains_code_key" ON "acm_domains"("code");

-- CreateIndex
CREATE INDEX "acm_domains_code_idx" ON "acm_domains"("code");

-- CreateIndex
CREATE INDEX "acm_domains_order_idx" ON "acm_domains"("order");

-- CreateIndex
CREATE UNIQUE INDEX "acm_capabilities_code_key" ON "acm_capabilities"("code");

-- CreateIndex
CREATE INDEX "acm_capabilities_domainId_idx" ON "acm_capabilities"("domainId");

-- CreateIndex
CREATE INDEX "acm_capabilities_code_idx" ON "acm_capabilities"("code");

-- CreateIndex
CREATE INDEX "acm_capabilities_order_idx" ON "acm_capabilities"("order");

-- CreateIndex
CREATE INDEX "acm_requirement_generations_organizationId_idx" ON "acm_requirement_generations"("organizationId");

-- CreateIndex
CREATE INDEX "acm_requirement_generations_acmCapabilityId_idx" ON "acm_requirement_generations"("acmCapabilityId");

-- CreateIndex
CREATE INDEX "acm_requirement_generations_userId_idx" ON "acm_requirement_generations"("userId");

-- CreateIndex
CREATE INDEX "acm_requirement_generations_createdAt_idx" ON "acm_requirement_generations"("createdAt");

-- CreateIndex
CREATE INDEX "framework_analytics_sessions_organizationId_idx" ON "framework_analytics_sessions"("organizationId");

-- CreateIndex
CREATE INDEX "framework_analytics_sessions_userId_idx" ON "framework_analytics_sessions"("userId");

-- CreateIndex
CREATE INDEX "framework_analytics_sessions_sessionStarted_idx" ON "framework_analytics_sessions"("sessionStarted");

-- CreateIndex
CREATE INDEX "framework_analytics_sessions_sessionType_idx" ON "framework_analytics_sessions"("sessionType");

-- CreateIndex
CREATE INDEX "framework_analytics_events_sessionId_idx" ON "framework_analytics_events"("sessionId");

-- CreateIndex
CREATE INDEX "framework_analytics_events_frameworkId_idx" ON "framework_analytics_events"("frameworkId");

-- CreateIndex
CREATE INDEX "framework_analytics_events_eventType_idx" ON "framework_analytics_events"("eventType");

-- CreateIndex
CREATE INDEX "framework_analytics_events_timestamp_idx" ON "framework_analytics_events"("timestamp");

-- CreateIndex
CREATE INDEX "framework_analytics_events_organizationId_idx" ON "framework_analytics_events"("organizationId");

-- CreateIndex
CREATE INDEX "framework_usage_metrics_frameworkName_idx" ON "framework_usage_metrics"("frameworkName");

-- CreateIndex
CREATE INDEX "framework_usage_metrics_organizationId_idx" ON "framework_usage_metrics"("organizationId");

-- CreateIndex
CREATE INDEX "framework_usage_metrics_popularityScore_idx" ON "framework_usage_metrics"("popularityScore");

-- CreateIndex
CREATE INDEX "framework_usage_metrics_calculatedAt_idx" ON "framework_usage_metrics"("calculatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "framework_usage_metrics_frameworkId_organizationId_key" ON "framework_usage_metrics"("frameworkId", "organizationId");

-- CreateIndex
CREATE INDEX "framework_recommendation_metrics_organizationId_idx" ON "framework_recommendation_metrics"("organizationId");

-- CreateIndex
CREATE INDEX "framework_recommendation_metrics_userId_idx" ON "framework_recommendation_metrics"("userId");

-- CreateIndex
CREATE INDEX "framework_recommendation_metrics_recommendationType_idx" ON "framework_recommendation_metrics"("recommendationType");

-- CreateIndex
CREATE INDEX "framework_recommendation_metrics_frameworkId_idx" ON "framework_recommendation_metrics"("frameworkId");

-- CreateIndex
CREATE INDEX "framework_recommendation_metrics_wasAccepted_idx" ON "framework_recommendation_metrics"("wasAccepted");

-- CreateIndex
CREATE INDEX "framework_recommendation_metrics_createdAt_idx" ON "framework_recommendation_metrics"("createdAt");

-- CreateIndex
CREATE INDEX "framework_bundle_analytics_bundleId_idx" ON "framework_bundle_analytics"("bundleId");

-- CreateIndex
CREATE INDEX "framework_bundle_analytics_organizationId_idx" ON "framework_bundle_analytics"("organizationId");

-- CreateIndex
CREATE INDEX "framework_bundle_analytics_userId_idx" ON "framework_bundle_analytics"("userId");

-- CreateIndex
CREATE INDEX "framework_bundle_analytics_lastInteraction_idx" ON "framework_bundle_analytics"("lastInteraction");

-- CreateIndex
CREATE UNIQUE INDEX "framework_templates_frameworkId_key" ON "framework_templates"("frameworkId");

-- CreateIndex
CREATE INDEX "framework_templates_frameworkId_idx" ON "framework_templates"("frameworkId");

-- CreateIndex
CREATE INDEX "framework_templates_category_idx" ON "framework_templates"("category");

-- CreateIndex
CREATE INDEX "framework_templates_domain_idx" ON "framework_templates"("domain");

-- CreateIndex
CREATE INDEX "framework_templates_complexity_idx" ON "framework_templates"("complexity");

-- CreateIndex
CREATE INDEX "framework_templates_isActive_idx" ON "framework_templates"("isActive");

-- CreateIndex
CREATE INDEX "framework_templates_popularity_idx" ON "framework_templates"("popularity");

-- CreateIndex
CREATE INDEX "framework_relationships_sourceFrameworkId_idx" ON "framework_relationships"("sourceFrameworkId");

-- CreateIndex
CREATE INDEX "framework_relationships_targetFrameworkId_idx" ON "framework_relationships"("targetFrameworkId");

-- CreateIndex
CREATE INDEX "framework_relationships_relationshipType_idx" ON "framework_relationships"("relationshipType");

-- CreateIndex
CREATE UNIQUE INDEX "framework_relationships_sourceFrameworkId_targetFrameworkId_key" ON "framework_relationships"("sourceFrameworkId", "targetFrameworkId", "relationshipType");

-- CreateIndex
CREATE INDEX "organization_frameworks_organizationId_idx" ON "organization_frameworks"("organizationId");

-- CreateIndex
CREATE INDEX "organization_frameworks_frameworkTemplateId_idx" ON "organization_frameworks"("frameworkTemplateId");

-- CreateIndex
CREATE INDEX "organization_frameworks_status_idx" ON "organization_frameworks"("status");

-- CreateIndex
CREATE INDEX "organization_frameworks_priority_idx" ON "organization_frameworks"("priority");

-- CreateIndex
CREATE INDEX "organization_frameworks_ownerId_idx" ON "organization_frameworks"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "organization_frameworks_organizationId_frameworkTemplateId_key" ON "organization_frameworks"("organizationId", "frameworkTemplateId");

-- CreateIndex
CREATE INDEX "framework_assessments_organizationFrameworkId_idx" ON "framework_assessments"("organizationFrameworkId");

-- CreateIndex
CREATE INDEX "framework_assessments_assessmentType_idx" ON "framework_assessments"("assessmentType");

-- CreateIndex
CREATE INDEX "framework_assessments_assessmentDate_idx" ON "framework_assessments"("assessmentDate");

-- CreateIndex
CREATE INDEX "framework_assessments_assessorId_idx" ON "framework_assessments"("assessorId");

-- CreateIndex
CREATE INDEX "framework_tasks_organizationFrameworkId_idx" ON "framework_tasks"("organizationFrameworkId");

-- CreateIndex
CREATE INDEX "framework_tasks_status_idx" ON "framework_tasks"("status");

-- CreateIndex
CREATE INDEX "framework_tasks_priority_idx" ON "framework_tasks"("priority");

-- CreateIndex
CREATE INDEX "framework_tasks_assigneeId_idx" ON "framework_tasks"("assigneeId");

-- CreateIndex
CREATE INDEX "framework_tasks_dueDate_idx" ON "framework_tasks"("dueDate");

-- CreateIndex
CREATE INDEX "framework_milestones_organizationFrameworkId_idx" ON "framework_milestones"("organizationFrameworkId");

-- CreateIndex
CREATE INDEX "framework_milestones_status_idx" ON "framework_milestones"("status");

-- CreateIndex
CREATE INDEX "framework_milestones_targetDate_idx" ON "framework_milestones"("targetDate");

-- CreateIndex
CREATE INDEX "framework_milestones_order_idx" ON "framework_milestones"("order");

-- CreateIndex
CREATE INDEX "framework_analytics_frameworkTemplateId_idx" ON "framework_analytics"("frameworkTemplateId");

-- CreateIndex
CREATE INDEX "framework_analytics_organizationId_idx" ON "framework_analytics"("organizationId");

-- CreateIndex
CREATE INDEX "framework_analytics_period_idx" ON "framework_analytics"("period");

-- CreateIndex
CREATE INDEX "framework_analytics_periodStart_idx" ON "framework_analytics"("periodStart");

-- CreateIndex
CREATE UNIQUE INDEX "framework_analytics_frameworkTemplateId_organizationId_peri_key" ON "framework_analytics"("frameworkTemplateId", "organizationId", "period", "periodStart");

-- CreateIndex
CREATE INDEX "framework_recommendations_organizationId_idx" ON "framework_recommendations"("organizationId");

-- CreateIndex
CREATE INDEX "framework_recommendations_frameworkTemplateId_idx" ON "framework_recommendations"("frameworkTemplateId");

-- CreateIndex
CREATE INDEX "framework_recommendations_status_idx" ON "framework_recommendations"("status");

-- CreateIndex
CREATE INDEX "framework_recommendations_priority_idx" ON "framework_recommendations"("priority");

-- CreateIndex
CREATE INDEX "framework_recommendations_recommendedDate_idx" ON "framework_recommendations"("recommendedDate");

-- CreateIndex
CREATE UNIQUE INDEX "framework_recommendations_organizationId_frameworkTemplateI_key" ON "framework_recommendations"("organizationId", "frameworkTemplateId");

-- CreateIndex
CREATE INDEX "framework_table_data_organizationFrameworkId_idx" ON "framework_table_data"("organizationFrameworkId");

-- CreateIndex
CREATE UNIQUE INDEX "framework_table_data_organizationFrameworkId_grandchildId_key" ON "framework_table_data"("organizationFrameworkId", "grandchildId");

-- CreateIndex
CREATE INDEX "kanban_boards_organizationFrameworkId_idx" ON "kanban_boards"("organizationFrameworkId");

-- CreateIndex
CREATE UNIQUE INDEX "kanban_boards_organizationFrameworkId_frameworkSlug_key" ON "kanban_boards"("organizationFrameworkId", "frameworkSlug");

-- CreateIndex
CREATE INDEX "kanban_cards_boardId_columnId_idx" ON "kanban_cards"("boardId", "columnId");

-- CreateIndex
CREATE INDEX "kanban_cards_boardId_idx" ON "kanban_cards"("boardId");

-- CreateIndex
CREATE INDEX "capability_map_data_organizationFrameworkId_idx" ON "capability_map_data"("organizationFrameworkId");

-- CreateIndex
CREATE UNIQUE INDEX "capability_map_data_organizationFrameworkId_frameworkSlug_key" ON "capability_map_data"("organizationFrameworkId", "frameworkSlug");

-- CreateIndex
CREATE INDEX "_ContactToContactTag_B_index" ON "_ContactToContactTag"("B");

-- CreateIndex
CREATE INDEX "_FrameworkTemplateToOrganization_B_index" ON "_FrameworkTemplateToOrganization"("B");

-- CreateIndex
CREATE INDEX "_FrameworkRecommendationViewer_B_index" ON "_FrameworkRecommendationViewer"("B");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD CONSTRAINT "ApiKey_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthenticatorApp" ADD CONSTRAINT "AuthenticatorApp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeEmailRequest" ADD CONSTRAINT "ChangeEmailRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactActivity" ADD CONSTRAINT "ContactActivity_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactComment" ADD CONSTRAINT "ContactComment_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactComment" ADD CONSTRAINT "ContactComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactNote" ADD CONSTRAINT "ContactNote_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactNote" ADD CONSTRAINT "ContactNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactPageVisit" ADD CONSTRAINT "ContactPageVisit_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactPageVisit" ADD CONSTRAINT "ContactPageVisit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactTask" ADD CONSTRAINT "ContactTask_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Membership" ADD CONSTRAINT "Membership_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionItem" ADD CONSTRAINT "SubscriptionItem_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Webhook" ADD CONSTRAINT "Webhook_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkHours" ADD CONSTRAINT "WorkHours_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkTimeSlot" ADD CONSTRAINT "WorkTimeSlot_workHoursId_fkey" FOREIGN KEY ("workHoursId") REFERENCES "WorkHours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiProviderKey" ADD CONSTRAINT "AiProviderKey_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiProviderKey" ADD CONSTRAINT "AiProviderKey_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiProviderKey" ADD CONSTRAINT "AiProviderKey_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiBudget" ADD CONSTRAINT "AiBudget_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiBudget" ADD CONSTRAINT "AiBudget_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiBudget" ADD CONSTRAINT "AiBudget_providerKeyId_fkey" FOREIGN KEY ("providerKeyId") REFERENCES "AiProviderKey"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiBudget" ADD CONSTRAINT "AiBudget_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiRun" ADD CONSTRAINT "AiRun_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiRun" ADD CONSTRAINT "AiRun_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiRun" ADD CONSTRAINT "AiRun_providerKeyId_fkey" FOREIGN KEY ("providerKeyId") REFERENCES "AiProviderKey"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiRun" ADD CONSTRAINT "AiRun_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvalTask" ADD CONSTRAINT "EvalTask_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvalTask" ADD CONSTRAINT "EvalTask_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvalTask" ADD CONSTRAINT "EvalTask_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvalResult" ADD CONSTRAINT "EvalResult_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvalResult" ADD CONSTRAINT "EvalResult_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvalResult" ADD CONSTRAINT "EvalResult_runId_fkey" FOREIGN KEY ("runId") REFERENCES "AiRun"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvalResult" ADD CONSTRAINT "EvalResult_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "EvalTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvalResult" ADD CONSTRAINT "EvalResult_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratorPreset" ADD CONSTRAINT "GeneratorPreset_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratorPreset" ADD CONSTRAINT "GeneratorPreset_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GeneratorPreset" ADD CONSTRAINT "GeneratorPreset_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodegenJob" ADD CONSTRAINT "CodegenJob_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodegenJob" ADD CONSTRAINT "CodegenJob_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodegenJob" ADD CONSTRAINT "CodegenJob_presetId_fkey" FOREIGN KEY ("presetId") REFERENCES "GeneratorPreset"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodegenJob" ADD CONSTRAINT "CodegenJob_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CodegenJob" ADD CONSTRAINT "CodegenJob_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artifact" ADD CONSTRAINT "Artifact_codegenJobId_fkey" FOREIGN KEY ("codegenJobId") REFERENCES "CodegenJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artifact" ADD CONSTRAINT "Artifact_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artifact" ADD CONSTRAINT "Artifact_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artifact" ADD CONSTRAINT "Artifact_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepositoryLink" ADD CONSTRAINT "RepositoryLink_artifactId_fkey" FOREIGN KEY ("artifactId") REFERENCES "Artifact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepositoryLink" ADD CONSTRAINT "RepositoryLink_codegenJobId_fkey" FOREIGN KEY ("codegenJobId") REFERENCES "CodegenJob"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepositoryLink" ADD CONSTRAINT "RepositoryLink_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepositoryLink" ADD CONSTRAINT "RepositoryLink_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepositoryLink" ADD CONSTRAINT "RepositoryLink_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyncJob" ADD CONSTRAINT "SyncJob_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyncJob" ADD CONSTRAINT "SyncJob_dataMappingId_fkey" FOREIGN KEY ("dataMappingId") REFERENCES "DataMapping"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyncJob" ADD CONSTRAINT "SyncJob_integrationEndpointId_fkey" FOREIGN KEY ("integrationEndpointId") REFERENCES "IntegrationEndpoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyncJob" ADD CONSTRAINT "SyncJob_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SyncJob" ADD CONSTRAINT "SyncJob_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseOfAction" ADD CONSTRAINT "CourseOfAction_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseOfAction" ADD CONSTRAINT "CourseOfAction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseOfAction" ADD CONSTRAINT "CourseOfAction_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capability" ADD CONSTRAINT "Capability_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capability" ADD CONSTRAINT "Capability_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capability" ADD CONSTRAINT "Capability_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Initiative" ADD CONSTRAINT "Initiative_archivedBy_fkey" FOREIGN KEY ("archivedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Initiative" ADD CONSTRAINT "Initiative_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Initiative" ADD CONSTRAINT "Initiative_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Initiative" ADD CONSTRAINT "Initiative_templateOf_fkey" FOREIGN KEY ("templateOf") REFERENCES "Initiative"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Initiative" ADD CONSTRAINT "Initiative_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InitiativeCapability" ADD CONSTRAINT "InitiativeCapability_capabilityId_fkey" FOREIGN KEY ("capabilityId") REFERENCES "Capability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InitiativeCapability" ADD CONSTRAINT "InitiativeCapability_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InitiativeCourseOfAction" ADD CONSTRAINT "InitiativeCourseOfAction_courseOfActionId_fkey" FOREIGN KEY ("courseOfActionId") REFERENCES "CourseOfAction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InitiativeCourseOfAction" ADD CONSTRAINT "InitiativeCourseOfAction_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InitiativeKpi" ADD CONSTRAINT "InitiativeKpi_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InitiativeStakeholder" ADD CONSTRAINT "InitiativeStakeholder_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InitiativeStakeholder" ADD CONSTRAINT "InitiativeStakeholder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InitiativeWorkflowHistory" ADD CONSTRAINT "InitiativeWorkflowHistory_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InitiativeWorkflowHistory" ADD CONSTRAINT "InitiativeWorkflowHistory_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InitiativeWorkflowHistory" ADD CONSTRAINT "InitiativeWorkflowHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCase" ADD CONSTRAINT "BusinessCase_approvedBy_fkey" FOREIGN KEY ("approvedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCase" ADD CONSTRAINT "BusinessCase_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCase" ADD CONSTRAINT "BusinessCase_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCase" ADD CONSTRAINT "BusinessCase_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCaseCourseOfAction" ADD CONSTRAINT "BusinessCaseCourseOfAction_businessCaseId_fkey" FOREIGN KEY ("businessCaseId") REFERENCES "BusinessCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCaseCourseOfAction" ADD CONSTRAINT "BusinessCaseCourseOfAction_courseOfActionId_fkey" FOREIGN KEY ("courseOfActionId") REFERENCES "CourseOfAction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_owner_fkey" FOREIGN KEY ("owner") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioInitiative" ADD CONSTRAINT "PortfolioInitiative_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioInitiative" ADD CONSTRAINT "PortfolioInitiative_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortfolioInitiative" ADD CONSTRAINT "PortfolioInitiative_addedBy_fkey" FOREIGN KEY ("addedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategies" ADD CONSTRAINT "strategies_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategies" ADD CONSTRAINT "strategies_visionId_fkey" FOREIGN KEY ("visionId") REFERENCES "visions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategies" ADD CONSTRAINT "strategies_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategies" ADD CONSTRAINT "strategies_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategies" ADD CONSTRAINT "strategies_sponsorId_fkey" FOREIGN KEY ("sponsorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategies" ADD CONSTRAINT "strategies_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visions" ADD CONSTRAINT "visions_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visions" ADD CONSTRAINT "visions_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visions" ADD CONSTRAINT "visions_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visions" ADD CONSTRAINT "visions_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visions" ADD CONSTRAINT "visions_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategy_metrics" ADD CONSTRAINT "strategy_metrics_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "strategies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategy_metrics" ADD CONSTRAINT "strategy_metrics_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategy_reviews" ADD CONSTRAINT "strategy_reviews_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "strategies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategy_reviews" ADD CONSTRAINT "strategy_reviews_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategy_stakeholders" ADD CONSTRAINT "strategy_stakeholders_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "strategies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vision_metrics" ADD CONSTRAINT "vision_metrics_visionId_fkey" FOREIGN KEY ("visionId") REFERENCES "visions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vision_metrics" ADD CONSTRAINT "vision_metrics_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vision_stakeholders" ADD CONSTRAINT "vision_stakeholders_visionId_fkey" FOREIGN KEY ("visionId") REFERENCES "visions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategic_goals" ADD CONSTRAINT "strategic_goals_strategyId_fkey" FOREIGN KEY ("strategyId") REFERENCES "strategies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategic_goals" ADD CONSTRAINT "strategic_goals_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategic_milestones" ADD CONSTRAINT "strategic_milestones_strategicGoalId_fkey" FOREIGN KEY ("strategicGoalId") REFERENCES "strategic_goals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "strategic_milestones" ADD CONSTRAINT "strategic_milestones_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "risks" ADD CONSTRAINT "risks_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "risks" ADD CONSTRAINT "risks_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "risks" ADD CONSTRAINT "risks_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "risk_assessments" ADD CONSTRAINT "risk_assessments_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "risk_assessments" ADD CONSTRAINT "risk_assessments_riskId_fkey" FOREIGN KEY ("riskId") REFERENCES "risks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "risk_mitigations" ADD CONSTRAINT "risk_mitigations_riskId_fkey" FOREIGN KEY ("riskId") REFERENCES "risks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "risk_mitigations" ADD CONSTRAINT "risk_mitigations_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessModelCanvas" ADD CONSTRAINT "BusinessModelCanvas_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessModelCanvas" ADD CONSTRAINT "BusinessModelCanvas_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessModelCanvas" ADD CONSTRAINT "BusinessModelCanvas_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stakeholder" ADD CONSTRAINT "Stakeholder_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stakeholder" ADD CONSTRAINT "Stakeholder_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stakeholder" ADD CONSTRAINT "Stakeholder_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kpi" ADD CONSTRAINT "Kpi_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kpi" ADD CONSTRAINT "Kpi_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Kpi" ADD CONSTRAINT "Kpi_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationComponent" ADD CONSTRAINT "ApplicationComponent_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationComponent" ADD CONSTRAINT "ApplicationComponent_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationComponent" ADD CONSTRAINT "ApplicationComponent_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationComponent" ADD CONSTRAINT "ApplicationComponent_businessOwnerId_fkey" FOREIGN KEY ("businessOwnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationComponent" ADD CONSTRAINT "ApplicationComponent_itOwnerId_fkey" FOREIGN KEY ("itOwnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationBusinessCapability" ADD CONSTRAINT "ApplicationBusinessCapability_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "ApplicationComponent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationCollaboration" ADD CONSTRAINT "ApplicationCollaboration_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationCollaboration" ADD CONSTRAINT "ApplicationCollaboration_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationCollaboration" ADD CONSTRAINT "ApplicationCollaboration_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationComponentCollaboration" ADD CONSTRAINT "ApplicationComponentCollaboration_collaborationId_fkey" FOREIGN KEY ("collaborationId") REFERENCES "ApplicationCollaboration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationComponentCollaboration" ADD CONSTRAINT "ApplicationComponentCollaboration_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "ApplicationComponent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationComponentInteraction" ADD CONSTRAINT "ApplicationComponentInteraction_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "ApplicationComponent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationComponentInteraction" ADD CONSTRAINT "ApplicationComponentInteraction_interactionId_fkey" FOREIGN KEY ("interactionId") REFERENCES "ApplicationInteraction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationEvent" ADD CONSTRAINT "ApplicationEvent_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "ApplicationComponent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationEvent" ADD CONSTRAINT "ApplicationEvent_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationEvent" ADD CONSTRAINT "ApplicationEvent_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationEvent" ADD CONSTRAINT "ApplicationEvent_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationFunction" ADD CONSTRAINT "ApplicationFunction_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "ApplicationComponent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationFunction" ADD CONSTRAINT "ApplicationFunction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationFunction" ADD CONSTRAINT "ApplicationFunction_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationFunction" ADD CONSTRAINT "ApplicationFunction_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationInteraction" ADD CONSTRAINT "ApplicationInteraction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationInteraction" ADD CONSTRAINT "ApplicationInteraction_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationInteraction" ADD CONSTRAINT "ApplicationInteraction_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationInterface" ADD CONSTRAINT "ApplicationInterface_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationInterface" ADD CONSTRAINT "ApplicationInterface_providedByComponentId_fkey" FOREIGN KEY ("providedByComponentId") REFERENCES "ApplicationComponent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationInterface" ADD CONSTRAINT "ApplicationInterface_requiredByComponentId_fkey" FOREIGN KEY ("requiredByComponentId") REFERENCES "ApplicationComponent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationInterface" ADD CONSTRAINT "ApplicationInterface_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "ApplicationService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationInterface" ADD CONSTRAINT "ApplicationInterface_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationInterface" ADD CONSTRAINT "ApplicationInterface_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationProcess" ADD CONSTRAINT "ApplicationProcess_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationProcess" ADD CONSTRAINT "ApplicationProcess_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "ApplicationService"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationProcess" ADD CONSTRAINT "ApplicationProcess_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationProcess" ADD CONSTRAINT "ApplicationProcess_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationService" ADD CONSTRAINT "ApplicationService_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "ApplicationComponent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationService" ADD CONSTRAINT "ApplicationService_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationService" ADD CONSTRAINT "ApplicationService_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationService" ADD CONSTRAINT "ApplicationService_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationSLA" ADD CONSTRAINT "ApplicationSLA_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "ApplicationComponent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyCollaboration" ADD CONSTRAINT "TechnologyCollaboration_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyCollaboration" ADD CONSTRAINT "TechnologyCollaboration_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyCollaboration" ADD CONSTRAINT "TechnologyCollaboration_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyComponent" ADD CONSTRAINT "TechnologyComponent_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyComponent" ADD CONSTRAINT "TechnologyComponent_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyComponent" ADD CONSTRAINT "TechnologyComponent_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyEvent" ADD CONSTRAINT "TechnologyEvent_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyEvent" ADD CONSTRAINT "TechnologyEvent_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyEvent" ADD CONSTRAINT "TechnologyEvent_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyFunction" ADD CONSTRAINT "TechnologyFunction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyFunction" ADD CONSTRAINT "TechnologyFunction_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyFunction" ADD CONSTRAINT "TechnologyFunction_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyInteraction" ADD CONSTRAINT "TechnologyInteraction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyInteraction" ADD CONSTRAINT "TechnologyInteraction_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyInteraction" ADD CONSTRAINT "TechnologyInteraction_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyInterface" ADD CONSTRAINT "TechnologyInterface_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyInterface" ADD CONSTRAINT "TechnologyInterface_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyInterface" ADD CONSTRAINT "TechnologyInterface_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyProcess" ADD CONSTRAINT "TechnologyProcess_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyProcess" ADD CONSTRAINT "TechnologyProcess_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyProcess" ADD CONSTRAINT "TechnologyProcess_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyService" ADD CONSTRAINT "TechnologyService_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyService" ADD CONSTRAINT "TechnologyService_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TechnologyService" ADD CONSTRAINT "TechnologyService_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataMapping" ADD CONSTRAINT "DataMapping_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataMapping" ADD CONSTRAINT "DataMapping_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataMapping" ADD CONSTRAINT "DataMapping_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataMapping" ADD CONSTRAINT "DataMapping_integrationEndpointId_fkey" FOREIGN KEY ("integrationEndpointId") REFERENCES "IntegrationEndpoint"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataObject" ADD CONSTRAINT "DataObject_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataObject" ADD CONSTRAINT "DataObject_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DataObject" ADD CONSTRAINT "DataObject_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessActor" ADD CONSTRAINT "BusinessActor_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessActor" ADD CONSTRAINT "BusinessActor_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessActorCapability" ADD CONSTRAINT "BusinessActorCapability_businessActorId_fkey" FOREIGN KEY ("businessActorId") REFERENCES "BusinessActor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessActorCapability" ADD CONSTRAINT "BusinessActorCapability_capabilityId_fkey" FOREIGN KEY ("capabilityId") REFERENCES "Capability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessActorProcess" ADD CONSTRAINT "BusinessActorProcess_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "BusinessActor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessActorProcess" ADD CONSTRAINT "BusinessActorProcess_processId_fkey" FOREIGN KEY ("processId") REFERENCES "BusinessProcess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessActorRole" ADD CONSTRAINT "BusinessActorRole_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "BusinessActor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessActorRole" ADD CONSTRAINT "BusinessActorRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "BusinessRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessActorService" ADD CONSTRAINT "BusinessActorService_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "BusinessActor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessActorService" ADD CONSTRAINT "BusinessActorService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "BusinessService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCollaboration" ADD CONSTRAINT "BusinessCollaboration_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessEvent" ADD CONSTRAINT "BusinessEvent_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessFunction" ADD CONSTRAINT "BusinessFunction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessInteraction" ADD CONSTRAINT "BusinessInteraction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessInterface" ADD CONSTRAINT "BusinessInterface_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_model_canvas_cobit" ADD CONSTRAINT "business_model_canvas_cobit_canvasId_fkey" FOREIGN KEY ("canvasId") REFERENCES "BusinessModelCanvas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_model_canvas_cobit" ADD CONSTRAINT "business_model_canvas_cobit_cobitFrameworkId_fkey" FOREIGN KEY ("cobitFrameworkId") REFERENCES "cobit_frameworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_model_canvas_pcf" ADD CONSTRAINT "business_model_canvas_pcf_canvasId_fkey" FOREIGN KEY ("canvasId") REFERENCES "BusinessModelCanvas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_model_canvas_pcf" ADD CONSTRAINT "business_model_canvas_pcf_pcfFrameworkId_fkey" FOREIGN KEY ("pcfFrameworkId") REFERENCES "pcf_frameworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessObject" ADD CONSTRAINT "BusinessObject_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessObject" ADD CONSTRAINT "BusinessObject_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessObjectService" ADD CONSTRAINT "BusinessObjectService_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "BusinessObject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessObjectService" ADD CONSTRAINT "BusinessObjectService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "BusinessService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessProcess" ADD CONSTRAINT "BusinessProcess_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessProcess" ADD CONSTRAINT "BusinessProcess_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessProcessCapability" ADD CONSTRAINT "BusinessProcessCapability_businessProcessId_fkey" FOREIGN KEY ("businessProcessId") REFERENCES "BusinessProcess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessProcessCapability" ADD CONSTRAINT "BusinessProcessCapability_capabilityId_fkey" FOREIGN KEY ("capabilityId") REFERENCES "Capability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessProcessObject" ADD CONSTRAINT "BusinessProcessObject_objectId_fkey" FOREIGN KEY ("objectId") REFERENCES "BusinessObject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessProcessObject" ADD CONSTRAINT "BusinessProcessObject_processId_fkey" FOREIGN KEY ("processId") REFERENCES "BusinessProcess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessProcessResource" ADD CONSTRAINT "BusinessProcessResource_processId_fkey" FOREIGN KEY ("processId") REFERENCES "BusinessProcess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessProcessResource" ADD CONSTRAINT "BusinessProcessResource_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessProcessService" ADD CONSTRAINT "BusinessProcessService_processId_fkey" FOREIGN KEY ("processId") REFERENCES "BusinessProcess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessProcessService" ADD CONSTRAINT "BusinessProcessService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "BusinessService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessProcessValueStream" ADD CONSTRAINT "BusinessProcessValueStream_processId_fkey" FOREIGN KEY ("processId") REFERENCES "BusinessProcess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessProcessValueStream" ADD CONSTRAINT "BusinessProcessValueStream_valueStreamId_fkey" FOREIGN KEY ("valueStreamId") REFERENCES "ValueStream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessRole" ADD CONSTRAINT "BusinessRole_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessRole" ADD CONSTRAINT "BusinessRole_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessRole" ADD CONSTRAINT "BusinessRole_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessRoleCapability" ADD CONSTRAINT "BusinessRoleCapability_businessRoleId_fkey" FOREIGN KEY ("businessRoleId") REFERENCES "BusinessRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessRoleCapability" ADD CONSTRAINT "BusinessRoleCapability_capabilityId_fkey" FOREIGN KEY ("capabilityId") REFERENCES "Capability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessRoleProcess" ADD CONSTRAINT "BusinessRoleProcess_processId_fkey" FOREIGN KEY ("processId") REFERENCES "BusinessProcess"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessRoleProcess" ADD CONSTRAINT "BusinessRoleProcess_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "BusinessRole"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessService" ADD CONSTRAINT "BusinessService_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessService" ADD CONSTRAINT "BusinessService_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessService" ADD CONSTRAINT "BusinessService_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessServiceCapability" ADD CONSTRAINT "BusinessServiceCapability_capabilityId_fkey" FOREIGN KEY ("capabilityId") REFERENCES "Capability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessServiceCapability" ADD CONSTRAINT "BusinessServiceCapability_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "BusinessService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessServiceValueStream" ADD CONSTRAINT "BusinessServiceValueStream_businessServiceId_fkey" FOREIGN KEY ("businessServiceId") REFERENCES "BusinessService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessServiceValueStream" ADD CONSTRAINT "BusinessServiceValueStream_valueStreamId_fkey" FOREIGN KEY ("valueStreamId") REFERENCES "ValueStream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValueStream" ADD CONSTRAINT "ValueStream_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValueStream" ADD CONSTRAINT "ValueStream_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValueStream" ADD CONSTRAINT "ValueStream_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cobit_frameworks" ADD CONSTRAINT "cobit_frameworks_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cobit_frameworks" ADD CONSTRAINT "cobit_frameworks_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cobit_frameworks" ADD CONSTRAINT "cobit_frameworks_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pcf_frameworks" ADD CONSTRAINT "pcf_frameworks_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pcf_frameworks" ADD CONSTRAINT "pcf_frameworks_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pcf_frameworks" ADD CONSTRAINT "pcf_frameworks_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductService" ADD CONSTRAINT "ProductService_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductService" ADD CONSTRAINT "ProductService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "BusinessService"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOpportunity" ADD CONSTRAINT "FK_SalesOpportunity_Organization" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOpportunity" ADD CONSTRAINT "FK_SalesOpportunity_Owner" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOpportunity" ADD CONSTRAINT "FK_SalesOpportunity_Account" FOREIGN KEY ("accountId") REFERENCES "BusinessActor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalesOpportunity" ADD CONSTRAINT "FK_SalesOpportunity_Contact" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityProduct" ADD CONSTRAINT "OpportunityProduct_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "SalesOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityProduct" ADD CONSTRAINT "OpportunityProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityTeamMember" ADD CONSTRAINT "OpportunityTeamMember_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "SalesOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityTeamMember" ADD CONSTRAINT "OpportunityTeamMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "Initiative"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_kpis" ADD CONSTRAINT "project_kpis_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_kpis" ADD CONSTRAINT "project_kpis_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_milestones" ADD CONSTRAINT "project_milestones_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_milestones" ADD CONSTRAINT "project_milestones_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_sprintId_fkey" FOREIGN KEY ("sprintId") REFERENCES "Sprint"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_workflowId_fkey" FOREIGN KEY ("workflowId") REFERENCES "workflows"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_initiativeId_fkey" FOREIGN KEY ("initiativeId") REFERENCES "Initiative"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workflows" ADD CONSTRAINT "workflows_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sprint" ADD CONSTRAINT "Sprint_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sprint" ADD CONSTRAINT "Sprint_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sprint" ADD CONSTRAINT "Sprint_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sprint" ADD CONSTRAINT "Sprint_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkPackage" ADD CONSTRAINT "WorkPackage_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkPackage" ADD CONSTRAINT "WorkPackage_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkPackage" ADD CONSTRAINT "WorkPackage_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalSystem" ADD CONSTRAINT "ExternalSystem_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalSystem" ADD CONSTRAINT "ExternalSystem_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalSystem" ADD CONSTRAINT "ExternalSystem_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Integration" ADD CONSTRAINT "Integration_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationAccount" ADD CONSTRAINT "IntegrationAccount_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "Integration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationAccount" ADD CONSTRAINT "IntegrationAccount_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationAccount" ADD CONSTRAINT "IntegrationAccount_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationAccount" ADD CONSTRAINT "IntegrationAccount_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connector" ADD CONSTRAINT "Connector_integrationId_fkey" FOREIGN KEY ("integrationId") REFERENCES "Integration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connector" ADD CONSTRAINT "Connector_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connector" ADD CONSTRAINT "Connector_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connector" ADD CONSTRAINT "Connector_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationEndpoint" ADD CONSTRAINT "IntegrationEndpoint_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationEndpoint" ADD CONSTRAINT "IntegrationEndpoint_externalSystemId_fkey" FOREIGN KEY ("externalSystemId") REFERENCES "ExternalSystem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationEndpoint" ADD CONSTRAINT "IntegrationEndpoint_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntegrationEndpoint" ADD CONSTRAINT "IntegrationEndpoint_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mapping" ADD CONSTRAINT "Mapping_connectorId_fkey" FOREIGN KEY ("connectorId") REFERENCES "Connector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mapping" ADD CONSTRAINT "Mapping_integrationAccountId_fkey" FOREIGN KEY ("integrationAccountId") REFERENCES "IntegrationAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mapping" ADD CONSTRAINT "Mapping_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mapping" ADD CONSTRAINT "Mapping_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mapping" ADD CONSTRAINT "Mapping_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transformation" ADD CONSTRAINT "Transformation_connectorId_fkey" FOREIGN KEY ("connectorId") REFERENCES "Connector"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transformation" ADD CONSTRAINT "Transformation_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transformation" ADD CONSTRAINT "Transformation_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transformation" ADD CONSTRAINT "Transformation_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceReport" ADD CONSTRAINT "ComplianceReport_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceReport" ADD CONSTRAINT "ComplianceReport_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComplianceReport" ADD CONSTRAINT "ComplianceReport_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_assessments" ADD CONSTRAINT "compliance_assessments_frameworkId_fkey" FOREIGN KEY ("frameworkId") REFERENCES "security_frameworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_assessments" ADD CONSTRAINT "compliance_assessments_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_assessments" ADD CONSTRAINT "compliance_assessments_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_results" ADD CONSTRAINT "assessment_results_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "compliance_assessments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_recommendations" ADD CONSTRAINT "assessment_recommendations_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "compliance_assessments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_frameworks" ADD CONSTRAINT "security_frameworks_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_controls" ADD CONSTRAINT "security_controls_frameworkId_fkey" FOREIGN KEY ("frameworkId") REFERENCES "security_frameworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_controls" ADD CONSTRAINT "security_controls_responsibleUserId_fkey" FOREIGN KEY ("responsibleUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_controls" ADD CONSTRAINT "security_controls_reviewerUserId_fkey" FOREIGN KEY ("reviewerUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_controls" ADD CONSTRAINT "security_controls_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "control_test_results" ADD CONSTRAINT "control_test_results_controlId_fkey" FOREIGN KEY ("controlId") REFERENCES "security_controls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "control_test_results" ADD CONSTRAINT "control_test_results_testerId_fkey" FOREIGN KEY ("testerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_evidence" ADD CONSTRAINT "security_evidence_controlId_fkey" FOREIGN KEY ("controlId") REFERENCES "security_controls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_evidence" ADD CONSTRAINT "security_evidence_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "security_tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_evidence" ADD CONSTRAINT "security_evidence_collectorId_fkey" FOREIGN KEY ("collectorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_tasks" ADD CONSTRAINT "security_tasks_frameworkId_fkey" FOREIGN KEY ("frameworkId") REFERENCES "security_frameworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_tasks" ADD CONSTRAINT "security_tasks_controlId_fkey" FOREIGN KEY ("controlId") REFERENCES "security_controls"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_tasks" ADD CONSTRAINT "security_tasks_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_tasks" ADD CONSTRAINT "security_tasks_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_tasks" ADD CONSTRAINT "security_tasks_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_findings" ADD CONSTRAINT "security_findings_controlId_fkey" FOREIGN KEY ("controlId") REFERENCES "security_controls"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_findings" ADD CONSTRAINT "security_findings_testResultId_fkey" FOREIGN KEY ("testResultId") REFERENCES "control_test_results"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_findings" ADD CONSTRAINT "security_findings_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_findings" ADD CONSTRAINT "security_findings_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "security_findings" ADD CONSTRAINT "security_findings_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_control_mappings" ADD CONSTRAINT "framework_control_mappings_sourceFrameworkId_fkey" FOREIGN KEY ("sourceFrameworkId") REFERENCES "security_frameworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_control_mappings" ADD CONSTRAINT "framework_control_mappings_targetFrameworkId_fkey" FOREIGN KEY ("targetFrameworkId") REFERENCES "security_frameworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_control_mappings" ADD CONSTRAINT "framework_control_mappings_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialBudget" ADD CONSTRAINT "FinancialBudget_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialBudgetLineItem" ADD CONSTRAINT "FinancialBudgetLineItem_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "FinancialBudget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialBudgetAllocation" ADD CONSTRAINT "FinancialBudgetAllocation_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "FinancialBudget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialBudgetForecast" ADD CONSTRAINT "FinancialBudgetForecast_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "FinancialBudget"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "infrastructure_monitoring" ADD CONSTRAINT "infrastructure_monitoring_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_plans" ADD CONSTRAINT "capacity_plans_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_plans" ADD CONSTRAINT "capacity_plans_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capacity_plans" ADD CONSTRAINT "capacity_plans_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operational_alerts" ADD CONSTRAINT "operational_alerts_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operational_alerts" ADD CONSTRAINT "operational_alerts_acknowledgedById_fkey" FOREIGN KEY ("acknowledgedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "operational_alerts" ADD CONSTRAINT "operational_alerts_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_level_agreements" ADD CONSTRAINT "service_level_agreements_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_level_agreements" ADD CONSTRAINT "service_level_agreements_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_level_agreements" ADD CONSTRAINT "service_level_agreements_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCaseValueStream" ADD CONSTRAINT "BusinessCaseValueStream_businessCaseId_fkey" FOREIGN KEY ("businessCaseId") REFERENCES "BusinessCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessCaseValueStream" ADD CONSTRAINT "BusinessCaseValueStream_valueStreamId_fkey" FOREIGN KEY ("valueStreamId") REFERENCES "ValueStream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBusinessCase" ADD CONSTRAINT "ProductBusinessCase_businessCaseId_fkey" FOREIGN KEY ("businessCaseId") REFERENCES "BusinessCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductBusinessCase" ADD CONSTRAINT "ProductBusinessCase_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductValueStream" ADD CONSTRAINT "ProductValueStream_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductValueStream" ADD CONSTRAINT "ProductValueStream_valueStreamId_fkey" FOREIGN KEY ("valueStreamId") REFERENCES "ValueStream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cobit_processes" ADD CONSTRAINT "cobit_processes_frameworkId_fkey" FOREIGN KEY ("frameworkId") REFERENCES "cobit_frameworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pcf_processes" ADD CONSTRAINT "pcf_processes_frameworkId_fkey" FOREIGN KEY ("frameworkId") REFERENCES "pcf_frameworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_case_cobit" ADD CONSTRAINT "business_case_cobit_businessCaseId_fkey" FOREIGN KEY ("businessCaseId") REFERENCES "BusinessCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_case_cobit" ADD CONSTRAINT "business_case_cobit_cobitFrameworkId_fkey" FOREIGN KEY ("cobitFrameworkId") REFERENCES "cobit_frameworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_case_cobit_process" ADD CONSTRAINT "business_case_cobit_process_businessCaseId_fkey" FOREIGN KEY ("businessCaseId") REFERENCES "BusinessCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_case_cobit_process" ADD CONSTRAINT "business_case_cobit_process_cobitProcessId_fkey" FOREIGN KEY ("cobitProcessId") REFERENCES "cobit_processes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_case_pcf" ADD CONSTRAINT "business_case_pcf_businessCaseId_fkey" FOREIGN KEY ("businessCaseId") REFERENCES "BusinessCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_case_pcf" ADD CONSTRAINT "business_case_pcf_pcfFrameworkId_fkey" FOREIGN KEY ("pcfFrameworkId") REFERENCES "pcf_frameworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_case_pcf_process" ADD CONSTRAINT "business_case_pcf_process_businessCaseId_fkey" FOREIGN KEY ("businessCaseId") REFERENCES "BusinessCase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "business_case_pcf_process" ADD CONSTRAINT "business_case_pcf_process_pcfProcessId_fkey" FOREIGN KEY ("pcfProcessId") REFERENCES "pcf_processes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CapabilityResource" ADD CONSTRAINT "CapabilityResource_capabilityId_fkey" FOREIGN KEY ("capabilityId") REFERENCES "Capability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CapabilityResource" ADD CONSTRAINT "CapabilityResource_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KpiResource" ADD CONSTRAINT "KpiResource_kpiId_fkey" FOREIGN KEY ("kpiId") REFERENCES "Kpi"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KpiResource" ADD CONSTRAINT "KpiResource_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValueStreamCapability" ADD CONSTRAINT "ValueStreamCapability_capabilityId_fkey" FOREIGN KEY ("capabilityId") REFERENCES "Capability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValueStreamCapability" ADD CONSTRAINT "ValueStreamCapability_valueStreamId_fkey" FOREIGN KEY ("valueStreamId") REFERENCES "ValueStream"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityActivity" ADD CONSTRAINT "FK_OpportunityActivity_Opportunity" FOREIGN KEY ("opportunityId") REFERENCES "SalesOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityActivity" ADD CONSTRAINT "FK_OpportunityActivity_Creator" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityNote" ADD CONSTRAINT "FK_OpportunityNote_Opportunity" FOREIGN KEY ("opportunityId") REFERENCES "SalesOpportunity"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpportunityNote" ADD CONSTRAINT "FK_OpportunityNote_Creator" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchitectureDecision" ADD CONSTRAINT "ArchitectureDecision_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchitectureDecision" ADD CONSTRAINT "ArchitectureDecision_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArchitectureDecision" ADD CONSTRAINT "ArchitectureDecision_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliverable" ADD CONSTRAINT "Deliverable_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliverable" ADD CONSTRAINT "Deliverable_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliverable" ADD CONSTRAINT "Deliverable_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deliverable" ADD CONSTRAINT "Deliverable_workPackageId_fkey" FOREIGN KEY ("workPackageId") REFERENCES "WorkPackage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gap" ADD CONSTRAINT "Gap_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gap" ADD CONSTRAINT "Gap_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gap" ADD CONSTRAINT "Gap_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImplementationEvent" ADD CONSTRAINT "ImplementationEvent_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImplementationEvent" ADD CONSTRAINT "ImplementationEvent_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImplementationEvent" ADD CONSTRAINT "ImplementationEvent_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ImplementationEvent" ADD CONSTRAINT "ImplementationEvent_workPackageId_fkey" FOREIGN KEY ("workPackageId") REFERENCES "WorkPackage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Junction" ADD CONSTRAINT "Junction_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Junction" ADD CONSTRAINT "Junction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Junction" ADD CONSTRAINT "Junction_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Path" ADD CONSTRAINT "Path_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Path" ADD CONSTRAINT "Path_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Path" ADD CONSTRAINT "Path_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plateau" ADD CONSTRAINT "Plateau_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plateau" ADD CONSTRAINT "Plateau_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plateau" ADD CONSTRAINT "Plateau_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acceptance_criteria" ADD CONSTRAINT "acceptance_criteria_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acceptance_criteria" ADD CONSTRAINT "acceptance_criteria_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "Requirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationNetwork" ADD CONSTRAINT "CommunicationNetwork_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationNetwork" ADD CONSTRAINT "CommunicationNetwork_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationNetwork" ADD CONSTRAINT "CommunicationNetwork_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constraint" ADD CONSTRAINT "Constraint_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constraint" ADD CONSTRAINT "Constraint_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constraint" ADD CONSTRAINT "Constraint_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetentionRule" ADD CONSTRAINT "RetentionRule_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetentionRule" ADD CONSTRAINT "RetentionRule_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RetentionRule" ADD CONSTRAINT "RetentionRule_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_scripts" ADD CONSTRAINT "test_scripts_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_scripts" ADD CONSTRAINT "test_scripts_acceptanceCriteriaId_fkey" FOREIGN KEY ("acceptanceCriteriaId") REFERENCES "acceptance_criteria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_executions" ADD CONSTRAINT "test_executions_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_executions" ADD CONSTRAINT "test_executions_testScriptId_fkey" FOREIGN KEY ("testScriptId") REFERENCES "test_scripts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_executions" ADD CONSTRAINT "test_executions_executedBy_fkey" FOREIGN KEY ("executedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mitigation_actions" ADD CONSTRAINT "mitigation_actions_mitigationId_fkey" FOREIGN KEY ("mitigationId") REFERENCES "risk_mitigations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mitigation_actions" ADD CONSTRAINT "mitigation_actions_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Principle" ADD CONSTRAINT "Principle_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Principle" ADD CONSTRAINT "Principle_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Principle" ADD CONSTRAINT "Principle_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outcome" ADD CONSTRAINT "Outcome_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outcome" ADD CONSTRAINT "Outcome_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Outcome" ADD CONSTRAINT "Outcome_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "values" ADD CONSTRAINT "values_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "values" ADD CONSTRAINT "values_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "values" ADD CONSTRAINT "values_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grouping" ADD CONSTRAINT "Grouping_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grouping" ADD CONSTRAINT "Grouping_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grouping" ADD CONSTRAINT "Grouping_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemSoftware" ADD CONSTRAINT "SystemSoftware_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemSoftware" ADD CONSTRAINT "SystemSoftware_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SystemSoftware" ADD CONSTRAINT "SystemSoftware_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relationships" ADD CONSTRAINT "relationships_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relationships" ADD CONSTRAINT "relationships_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "relationships" ADD CONSTRAINT "relationships_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "embeddings" ADD CONSTRAINT "embeddings_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_chunks" ADD CONSTRAINT "document_chunks_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "document_chunks" ADD CONSTRAINT "document_chunks_embeddingId_fkey" FOREIGN KEY ("embeddingId") REFERENCES "embeddings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "knowledge_graphs" ADD CONSTRAINT "knowledge_graphs_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semantic_searches" ADD CONSTRAINT "semantic_searches_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "semantic_searches" ADD CONSTRAINT "semantic_searches_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rag_contexts" ADD CONSTRAINT "rag_contexts_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "context_caches" ADD CONSTRAINT "context_caches_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_conversations" ADD CONSTRAINT "ai_conversations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_conversations" ADD CONSTRAINT "ai_conversations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_messages" ADD CONSTRAINT "ai_messages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "ai_conversations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "features" ADD CONSTRAINT "features_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "features" ADD CONSTRAINT "features_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archimate_diagrams" ADD CONSTRAINT "archimate_diagrams_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archimate_elements" ADD CONSTRAINT "archimate_elements_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "archimate_diagrams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archimate_elements" ADD CONSTRAINT "archimate_elements_capabilityId_fkey" FOREIGN KEY ("capabilityId") REFERENCES "Capability"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archimate_elements" ADD CONSTRAINT "archimate_elements_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "Requirement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archimate_elements" ADD CONSTRAINT "archimate_elements_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archimate_relationships" ADD CONSTRAINT "archimate_relationships_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "archimate_diagrams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archimate_relationships" ADD CONSTRAINT "archimate_relationships_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "archimate_elements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archimate_relationships" ADD CONSTRAINT "archimate_relationships_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "archimate_elements"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "archimate_relationships" ADD CONSTRAINT "archimate_relationships_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "togaf_phases" ADD CONSTRAINT "togaf_phases_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "togaf_deliverables" ADD CONSTRAINT "togaf_deliverables_phaseId_fkey" FOREIGN KEY ("phaseId") REFERENCES "togaf_phases"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "togaf_deliverables" ADD CONSTRAINT "togaf_deliverables_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "archimate_diagrams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "togaf_deliverables" ADD CONSTRAINT "togaf_deliverables_capabilityId_fkey" FOREIGN KEY ("capabilityId") REFERENCES "Capability"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "togaf_deliverables" ADD CONSTRAINT "togaf_deliverables_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "Requirement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "togaf_deliverables" ADD CONSTRAINT "togaf_deliverables_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "togaf_building_blocks" ADD CONSTRAINT "togaf_building_blocks_capabilityId_fkey" FOREIGN KEY ("capabilityId") REFERENCES "Capability"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "togaf_building_blocks" ADD CONSTRAINT "togaf_building_blocks_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connector_configs" ADD CONSTRAINT "connector_configs_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connector_sync_jobs" ADD CONSTRAINT "connector_sync_jobs_connectorId_fkey" FOREIGN KEY ("connectorId") REFERENCES "connector_configs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connector_sync_jobs" ADD CONSTRAINT "connector_sync_jobs_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connector_data_mappings" ADD CONSTRAINT "connector_data_mappings_connectorId_fkey" FOREIGN KEY ("connectorId") REFERENCES "connector_configs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connector_data_mappings" ADD CONSTRAINT "connector_data_mappings_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webhook_configs" ADD CONSTRAINT "webhook_configs_connectorId_fkey" FOREIGN KEY ("connectorId") REFERENCES "connector_configs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webhook_configs" ADD CONSTRAINT "webhook_configs_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webhook_logs" ADD CONSTRAINT "webhook_logs_webhookId_fkey" FOREIGN KEY ("webhookId") REFERENCES "webhook_configs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "webhook_logs" ADD CONSTRAINT "webhook_logs_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mcp_servers" ADD CONSTRAINT "mcp_servers_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "code_templates" ADD CONSTRAINT "code_templates_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generated_code" ADD CONSTRAINT "generated_code_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "code_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generated_code" ADD CONSTRAINT "generated_code_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "Requirement"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generated_code" ADD CONSTRAINT "generated_code_capabilityId_fkey" FOREIGN KEY ("capabilityId") REFERENCES "Capability"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generated_code" ADD CONSTRAINT "generated_code_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "archimate_diagrams"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "generated_code" ADD CONSTRAINT "generated_code_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagrams" ADD CONSTRAINT "diagrams_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagrams" ADD CONSTRAINT "diagrams_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagrams" ADD CONSTRAINT "diagrams_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagrams" ADD CONSTRAINT "diagrams_layerId_fkey" FOREIGN KEY ("layerId") REFERENCES "diagram_layers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagram_layers" ADD CONSTRAINT "diagram_layers_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagram_nodes" ADD CONSTRAINT "diagram_nodes_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "diagrams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagram_edges" ADD CONSTRAINT "diagram_edges_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "diagrams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagram_edges" ADD CONSTRAINT "diagram_edges_sourceNodeId_fkey" FOREIGN KEY ("sourceNodeId") REFERENCES "diagram_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagram_edges" ADD CONSTRAINT "diagram_edges_targetNodeId_fkey" FOREIGN KEY ("targetNodeId") REFERENCES "diagram_nodes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diagram_views" ADD CONSTRAINT "diagram_views_diagramId_fkey" FOREIGN KEY ("diagramId") REFERENCES "diagrams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "erd_tables" ADD CONSTRAINT "erd_tables_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "erd_columns" ADD CONSTRAINT "erd_columns_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "erd_tables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "erd_relationships" ADD CONSTRAINT "erd_relationships_sourceTableId_fkey" FOREIGN KEY ("sourceTableId") REFERENCES "erd_tables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "erd_relationships" ADD CONSTRAINT "erd_relationships_targetTableId_fkey" FOREIGN KEY ("targetTableId") REFERENCES "erd_tables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uml_classes" ADD CONSTRAINT "uml_classes_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uml_relationships" ADD CONSTRAINT "uml_relationships_sourceClassId_fkey" FOREIGN KEY ("sourceClassId") REFERENCES "uml_classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uml_relationships" ADD CONSTRAINT "uml_relationships_targetClassId_fkey" FOREIGN KEY ("targetClassId") REFERENCES "uml_classes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "c4_components" ADD CONSTRAINT "c4_components_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "c4_components" ADD CONSTRAINT "c4_components_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "c4_components"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bpmn_elements" ADD CONSTRAINT "bpmn_elements_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maturity_level_configs" ADD CONSTRAINT "maturity_level_configs_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maturity_scores" ADD CONSTRAINT "maturity_scores_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maturity_scores" ADD CONSTRAINT "maturity_scores_capabilityId_fkey" FOREIGN KEY ("capabilityId") REFERENCES "Capability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maturity_scores" ADD CONSTRAINT "maturity_scores_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "maturity_level_configs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maturity_scores" ADD CONSTRAINT "maturity_scores_dimensionId_fkey" FOREIGN KEY ("dimensionId") REFERENCES "maturity_dimensions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maturity_dimensions" ADD CONSTRAINT "maturity_dimensions_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "benchmark_data" ADD CONSTRAINT "benchmark_data_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirement_sources" ADD CONSTRAINT "requirement_sources_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirement_sources" ADD CONSTRAINT "requirement_sources_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "Requirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirement_templates" ADD CONSTRAINT "requirement_templates_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirement_templates" ADD CONSTRAINT "requirement_templates_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirement_generations" ADD CONSTRAINT "requirement_generations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirement_generations" ADD CONSTRAINT "requirement_generations_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "requirement_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirement_generations" ADD CONSTRAINT "requirement_generations_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirement_dependencies" ADD CONSTRAINT "requirement_dependencies_sourceRequirementId_fkey" FOREIGN KEY ("sourceRequirementId") REFERENCES "Requirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requirement_dependencies" ADD CONSTRAINT "requirement_dependencies_targetRequirementId_fkey" FOREIGN KEY ("targetRequirementId") REFERENCES "Requirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connector_registry" ADD CONSTRAINT "connector_registry_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connector_registry" ADD CONSTRAINT "connector_registry_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "integration_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connector_registry" ADD CONSTRAINT "connector_registry_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "integration_marketplace" ADD CONSTRAINT "integration_marketplace_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "integration_templates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sync_logs" ADD CONSTRAINT "sync_logs_syncJobId_fkey" FOREIGN KEY ("syncJobId") REFERENCES "SyncJob"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_jobs" ADD CONSTRAINT "import_jobs_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "import_jobs" ADD CONSTRAINT "import_jobs_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_interactions" ADD CONSTRAINT "framework_interactions_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_interactions" ADD CONSTRAINT "framework_interactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acm_capabilities" ADD CONSTRAINT "acm_capabilities_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "acm_domains"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acm_capabilities" ADD CONSTRAINT "acm_capabilities_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "requirement_templates"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acm_requirement_generations" ADD CONSTRAINT "acm_requirement_generations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acm_requirement_generations" ADD CONSTRAINT "acm_requirement_generations_acmCapabilityId_fkey" FOREIGN KEY ("acmCapabilityId") REFERENCES "acm_capabilities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acm_requirement_generations" ADD CONSTRAINT "acm_requirement_generations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_analytics_sessions" ADD CONSTRAINT "framework_analytics_sessions_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_analytics_sessions" ADD CONSTRAINT "framework_analytics_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_analytics_events" ADD CONSTRAINT "framework_analytics_events_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "framework_analytics_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_analytics_events" ADD CONSTRAINT "framework_analytics_events_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_analytics_events" ADD CONSTRAINT "framework_analytics_events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_usage_metrics" ADD CONSTRAINT "framework_usage_metrics_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_recommendation_metrics" ADD CONSTRAINT "framework_recommendation_metrics_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_recommendation_metrics" ADD CONSTRAINT "framework_recommendation_metrics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_bundle_analytics" ADD CONSTRAINT "framework_bundle_analytics_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_bundle_analytics" ADD CONSTRAINT "framework_bundle_analytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_templates" ADD CONSTRAINT "framework_templates_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_templates" ADD CONSTRAINT "framework_templates_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_relationships" ADD CONSTRAINT "framework_relationships_sourceFrameworkId_fkey" FOREIGN KEY ("sourceFrameworkId") REFERENCES "framework_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_relationships" ADD CONSTRAINT "framework_relationships_targetFrameworkId_fkey" FOREIGN KEY ("targetFrameworkId") REFERENCES "framework_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_frameworks" ADD CONSTRAINT "organization_frameworks_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_frameworks" ADD CONSTRAINT "organization_frameworks_frameworkTemplateId_fkey" FOREIGN KEY ("frameworkTemplateId") REFERENCES "framework_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_frameworks" ADD CONSTRAINT "organization_frameworks_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_frameworks" ADD CONSTRAINT "organization_frameworks_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_frameworks" ADD CONSTRAINT "organization_frameworks_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_assessments" ADD CONSTRAINT "framework_assessments_organizationFrameworkId_fkey" FOREIGN KEY ("organizationFrameworkId") REFERENCES "organization_frameworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_assessments" ADD CONSTRAINT "framework_assessments_assessorId_fkey" FOREIGN KEY ("assessorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_assessments" ADD CONSTRAINT "framework_assessments_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_assessments" ADD CONSTRAINT "framework_assessments_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_tasks" ADD CONSTRAINT "framework_tasks_organizationFrameworkId_fkey" FOREIGN KEY ("organizationFrameworkId") REFERENCES "organization_frameworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_tasks" ADD CONSTRAINT "framework_tasks_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_tasks" ADD CONSTRAINT "framework_tasks_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_tasks" ADD CONSTRAINT "framework_tasks_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_milestones" ADD CONSTRAINT "framework_milestones_organizationFrameworkId_fkey" FOREIGN KEY ("organizationFrameworkId") REFERENCES "organization_frameworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_milestones" ADD CONSTRAINT "framework_milestones_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_milestones" ADD CONSTRAINT "framework_milestones_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_milestones" ADD CONSTRAINT "framework_milestones_approverId_fkey" FOREIGN KEY ("approverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_milestones" ADD CONSTRAINT "framework_milestones_completedById_fkey" FOREIGN KEY ("completedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_analytics" ADD CONSTRAINT "framework_analytics_frameworkTemplateId_fkey" FOREIGN KEY ("frameworkTemplateId") REFERENCES "framework_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_analytics" ADD CONSTRAINT "framework_analytics_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_recommendations" ADD CONSTRAINT "framework_recommendations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_recommendations" ADD CONSTRAINT "framework_recommendations_frameworkTemplateId_fkey" FOREIGN KEY ("frameworkTemplateId") REFERENCES "framework_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "framework_table_data" ADD CONSTRAINT "framework_table_data_organizationFrameworkId_fkey" FOREIGN KEY ("organizationFrameworkId") REFERENCES "organization_frameworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kanban_boards" ADD CONSTRAINT "kanban_boards_organizationFrameworkId_fkey" FOREIGN KEY ("organizationFrameworkId") REFERENCES "organization_frameworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kanban_cards" ADD CONSTRAINT "kanban_cards_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "kanban_boards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "capability_map_data" ADD CONSTRAINT "capability_map_data_organizationFrameworkId_fkey" FOREIGN KEY ("organizationFrameworkId") REFERENCES "organization_frameworks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToContactTag" ADD CONSTRAINT "_ContactToContactTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactToContactTag" ADD CONSTRAINT "_ContactToContactTag_B_fkey" FOREIGN KEY ("B") REFERENCES "ContactTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FrameworkTemplateToOrganization" ADD CONSTRAINT "_FrameworkTemplateToOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "framework_templates"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FrameworkTemplateToOrganization" ADD CONSTRAINT "_FrameworkTemplateToOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FrameworkRecommendationViewer" ADD CONSTRAINT "_FrameworkRecommendationViewer_A_fkey" FOREIGN KEY ("A") REFERENCES "framework_recommendations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FrameworkRecommendationViewer" ADD CONSTRAINT "_FrameworkRecommendationViewer_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

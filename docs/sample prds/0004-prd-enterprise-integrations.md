# PRD: Enterprise Integration & Data Import Platform

**Document ID**: 0004-prd-enterprise-integrations
**Version**: 1.0
**Date**: 2025-10-23
**Status**: Proposed New Capability
**Related PRDs**: 0001-prd-achromatic-platform-capabilities.md, 0003-prd-context-graph-relationship-intelligence.md

---

## 1. Executive Summary

### 1.1 Problem Statement

Enterprise organizations adopting Reqarchitect face a **"cold start" problem**: they must manually recreate their existing architecture, applications, capabilities, and business data before realizing value. This creates:

- **90+ days to initial value** (manual data entry)
- **60-70% incomplete data** due to entry fatigue
- **$50K+ consulting costs** for data migration
- **High abandonment risk** during onboarding
- **Resistance to adoption** from teams with existing tools

**Example Pain Point**: A mid-size enterprise has 150+ applications documented in ServiceNow, 45 capabilities in Excel, organization structure in Azure AD, and architecture diagrams in Confluence. Manually recreating this in Reqarchitect takes 200+ hours and results in outdated, incomplete data.

### 1.2 Solution Overview

Build a **comprehensive enterprise integration platform** that enables:

1. **Pre-population from existing systems** via connectors (ServiceNow, Jira, Azure AD, etc.)
2. **Bulk data import** via Excel/CSV templates with intelligent mapping
3. **Real-time synchronization** to keep data current
4. **Model Context Protocol (MCP) servers** for AI-powered data discovery
5. **Webhook system** for event-driven integrations
6. **Custom connector SDK** for proprietary systems

### 1.3 Business Value

**For Customers**:
- **Time to Value**: 90 days → 7 days (93% reduction)
- **Data Completeness**: 60-70% → 95%+ (manual vs. imported)
- **Onboarding Cost**: $50K → $5K (90% reduction)
- **Adoption Rate**: +45% (easier to start)
- **Data Freshness**: Outdated → Real-time sync

**For Reqarchitect**:
- **$500K+ ARR impact** from enterprise sales acceleration
- **Competitive moat** (only platform with comprehensive integrations)
- **40% higher enterprise conversion** rate
- **2.5x faster sales cycles** (POC with real data in days)
- **Premium pricing** justified by integration capabilities

### 1.4 Strategic Differentiation

| Competitor | Integration Approach | Reqarchitect Advantage |
|------------|---------------------|------------------------|
| LeanIX | Manual CSV import only | ✅ 15+ native connectors + MCP + API |
| Archi | No import capabilities | ✅ Full import/sync framework |
| ServiceNow | Locked ecosystem | ✅ Open integration architecture |
| Ardoq | Limited API connectors | ✅ AI-powered discovery via MCP |
| Sparx EA | XMI import only | ✅ Multi-format, intelligent mapping |

---

## 2. Integration Architecture Overview

### 2.1 Integration Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Enterprise Systems                        │
│  ServiceNow │ Jira │ Azure AD │ Confluence │ Excel │ CMDB   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                 Integration Gateway (Node.js)                │
│  • Authentication Hub    • Rate Limiting                     │
│  • Protocol Translation  • Error Handling                    │
│  • Data Transformation   • Retry Logic                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────┬──────────────────┬────────────────────────┐
│   Connectors     │   Import Engine  │    MCP Servers         │
│  • Pre-built     │  • CSV/Excel     │  • AI Discovery        │
│  • Custom SDK    │  • JSON/XML      │  • Natural Language    │
│  • OAuth flows   │  • Templates     │  • Auto-mapping        │
└──────────────────┴──────────────────┴────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              Data Mapping & Transformation                   │
│  • Schema Matching       • Field Mapping Rules              │
│  • Data Validation       • Relationship Inference           │
│  • Deduplication         • Enrichment                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  Context Graph + Storage                     │
│  • PostgreSQL (entities)  • Relationship Graph              │
│  • Audit Logs             • Version Control                 │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                     Webhook System                           │
│  • Outbound notifications to external systems               │
│  • Event streaming                                          │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Integration Patterns

**Pattern 1: One-Time Import (Initial Population)**
- User selects source system connector
- Authenticates with source system
- Previews data mapping
- Reviews and adjusts mappings
- Executes import with rollback capability
- Reviews imported data

**Pattern 2: Scheduled Sync (Keep Current)**
- Configure sync schedule (hourly, daily, weekly)
- System pulls changes from source
- Applies incremental updates
- Resolves conflicts with rules
- Notifies on errors

**Pattern 3: Real-Time Sync (Event-Driven)**
- Source system sends webhooks on changes
- Reqarchitect webhook endpoint receives events
- Events queued for processing
- Updates applied asynchronously
- Bidirectional sync supported

**Pattern 4: MCP-Powered Discovery (AI-Assisted)**
- User describes what to import ("Import all applications from ServiceNow")
- MCP server discovers available data
- AI suggests mappings based on schema analysis
- User approves or adjusts
- Import executes with AI-powered validation

---

## 3. Core Integration Capabilities

### 3.1 Pre-Built Connectors

#### 3.1.1 ITSM & CMDB Systems

**ServiceNow Connector**

```typescript
interface ServiceNowConnectorConfig {
  instance: string; // customer.service-now.com
  authentication: {
    type: 'oauth' | 'basic';
    credentials: {
      clientId?: string;
      clientSecret?: string;
      username?: string;
      password?: string;
    };
  };
  mappings: {
    applications: {
      sourceTable: 'cmdb_ci_appl';
      fields: {
        name: 'name';
        description: 'short_description';
        owner: 'owned_by';
        status: 'operational_status';
        // ... custom field mappings
      };
    };
    infrastructure: {
      sourceTable: 'cmdb_ci_server';
      // ...
    };
  };
  syncSchedule: {
    enabled: boolean;
    frequency: 'hourly' | 'daily' | 'weekly';
    lastSync?: Date;
  };
}
```

**Capabilities**:
- Import applications from CMDB
- Import infrastructure components
- Import business services
- Import relationships/dependencies
- Import change requests as initiatives
- Sync user accounts and teams
- Import incidents as risks

**Data Mapping**:
```
ServiceNow CMDB → Reqarchitect
├── cmdb_ci_appl → ApplicationComponent
├── cmdb_ci_service → BusinessService
├── cmdb_ci_server → TechnologyComponent (Node)
├── cmdb_ci_database → DataObject
├── cmdb_rel_ci → Relationship (DEPENDS_ON, USES)
├── sys_user → User
└── sys_user_group → Team
```

**Jira Connector**

```typescript
interface JiraConnectorConfig {
  cloudId: string; // Jira Cloud site ID
  authentication: {
    type: 'oauth2' | 'api_token';
    credentials: {
      email?: string;
      apiToken?: string;
      accessToken?: string;
    };
  };
  projectFilters: string[]; // Which projects to sync
  issueTypes: {
    epic: 'Epic' | 'Initiative';
    story: 'Story';
    task: 'Task';
  };
  customFieldMappings: Record<string, string>;
}
```

**Capabilities**:
- Import epics as initiatives
- Import user stories as requirements
- Import tasks as work packages
- Import project structure
- Import user accounts
- Sync status changes
- Import comments as activities

**Data Mapping**:
```
Jira → Reqarchitect
├── Epic → Initiative
├── Story → Requirement / Feature
├── Task → WorkPackage
├── Component → Capability (inferred)
├── Version → Plateau (release)
├── User → User
└── Issue Link → Relationship (DEPENDS_ON, BLOCKS)
```

#### 3.1.2 Identity & Directory Services

**Azure Active Directory / Entra ID Connector**

```typescript
interface AzureADConnectorConfig {
  tenantId: string;
  authentication: {
    type: 'service_principal' | 'oauth';
    credentials: {
      clientId: string;
      clientSecret: string;
    };
  };
  syncScope: {
    users: boolean;
    groups: boolean;
    organizationalUnits: boolean;
  };
  autoCreateOrganization: boolean; // Map AD groups to Reqarchitect orgs
}
```

**Capabilities**:
- Import users with metadata
- Import organizational structure
- Import security groups as teams
- Import manager hierarchy as relationships
- Sync user attributes (department, location, title)
- Support for multi-tenant Azure AD

**Data Mapping**:
```
Azure AD → Reqarchitect
├── User → User (with SSO mapping)
├── Group → Team
├── Department → Organization (optional)
├── Manager relationship → OWNS relationship
└── Application Registration → IntegrationConfig
```

**Google Workspace Connector**

Similar to Azure AD but for Google:
- Import users from Google Admin
- Import organizational units
- Import groups as teams
- Import Google Drive files (diagrams, sheets)

#### 3.1.3 Documentation & Knowledge Management

**Confluence Connector**

```typescript
interface ConfluenceConnectorConfig {
  baseUrl: string; // company.atlassian.net/wiki
  authentication: {
    type: 'oauth2' | 'api_token';
    credentials: any;
  };
  spaces: string[]; // Which spaces to index
  contentTypes: {
    architectureDiagrams: boolean;
    requirementsDocs: boolean;
    processFlows: boolean;
  };
  extractionRules: {
    tableAsCapabilities: boolean; // Extract tables as capability lists
    headingsAsStructure: boolean;
  };
}
```

**Capabilities**:
- Extract architecture diagrams (OCR + AI)
- Parse structured content (tables, lists)
- Import pages as documentation
- Detect relationships in text
- Extract capability lists from tables
- Import attachments (Visio, Lucidchart)

**SharePoint Connector**

Similar capabilities for Microsoft SharePoint:
- Import document libraries
- Parse Excel capability matrices
- Extract org charts
- Import lists as entities

#### 3.1.4 Development & DevOps Tools

**GitHub/GitLab Connector**

```typescript
interface GitHubConnectorConfig {
  organization: string;
  authentication: {
    type: 'personal_access_token' | 'github_app';
    token: string;
  };
  repositories: {
    include: string[]; // Repo patterns to include
    exclude: string[];
  };
  mappings: {
    repoAsApplication: boolean; // Each repo = ApplicationComponent
    issuesAsRequirements: boolean;
    milestones As Plateaus: boolean;
  };
}
```

**Capabilities**:
- Import repositories as applications
- Import README as application description
- Detect tech stack from code analysis
- Import issues as requirements
- Import milestones as delivery milestones
- Track repository dependencies (package.json, etc.)

#### 3.1.5 Cloud Infrastructure

**AWS Connector**

```typescript
interface AWSConnectorConfig {
  region: string;
  authentication: {
    accessKeyId: string;
    secretAccessKey: string;
    roleArn?: string; // For cross-account
  };
  services: {
    ec2: boolean;
    rds: boolean;
    s3: boolean;
    lambda: boolean;
    ecs: boolean;
    // ... other services
  };
  tagFilters: Record<string, string>; // Filter by AWS tags
}
```

**Capabilities**:
- Import EC2 instances as nodes
- Import RDS databases as data stores
- Import Lambda functions as services
- Import VPCs as network infrastructure
- Import security groups as security controls
- Detect relationships from network config

**Azure Resource Manager Connector**

Similar for Azure:
- Import Virtual Machines
- Import Azure SQL databases
- Import App Services
- Import Resource Groups as structure

**Google Cloud Platform Connector**

Similar for GCP:
- Import Compute Engine instances
- Import Cloud SQL databases
- Import Cloud Functions
- Import GKE clusters

### 3.2 Bulk Import Engine

#### 3.2.1 Excel/CSV Import

**Template System**

```typescript
interface ImportTemplate {
  id: string;
  name: string;
  description: string;
  entityType: EntityType; // What this imports
  version: string;
  
  schema: {
    requiredColumns: TemplateColumn[];
    optionalColumns: TemplateColumn[];
    relationships?: {
      columnName: string;
      targetEntityType: EntityType;
      relationType: RelationshipType;
    }[];
  };
  
  validation: {
    rules: ValidationRule[];
    uniqueKeys: string[]; // Columns that must be unique
  };
  
  examples: {
    goodExamples: any[];
    badExamples: Array<{ data: any; error: string }>;
  };
}

interface TemplateColumn {
  name: string;
  displayName: string;
  description: string;
  dataType: 'string' | 'number' | 'date' | 'boolean' | 'enum';
  required: boolean;
  validations?: {
    pattern?: string; // Regex
    minLength?: number;
    maxLength?: number;
    enumValues?: string[];
  };
  example: string;
}
```

**Pre-Built Templates**:

1. **Application Inventory Template**
```csv
Application Name*, Description, Owner Email*, Status*, Technology Stack, Annual Cost, Criticality, Supported Capabilities
Customer Portal, Main customer-facing web application, john@company.com, Production, "React, Node.js, PostgreSQL", 50000, High, "Customer Service, Order Management"
```

2. **Capability Catalog Template**
```csv
Capability Name*, Level*, Parent Capability, Description, Maturity, Strategic Importance, Supporting Applications
Customer Service, 1, , Handle customer inquiries and issues, 3, High, "Customer Portal, Support Desk"
Order Management, 1, , Process and track customer orders, 4, High, "E-commerce Platform, Fulfillment System"
Order Processing, 2, Order Management, Process individual orders, 4, Medium, "E-commerce Platform"
```

3. **Initiative Portfolio Template**
```csv
Initiative Name*, Description, Status*, Priority*, Estimated Cost, Expected Benefit, Start Date, End Date, Owner Email*, Dependent Capabilities
Digital Transformation, Modernize legacy systems, PLANNING, HIGH, 500000, 2000000, 2025-01-01, 2025-12-31, jane@company.com, "Order Management, Customer Service"
```

4. **Technology Inventory Template**
```csv
Component Name*, Type*, Vendor, Version, Status*, Location, Annual Cost, Owner, Supported Applications
PostgreSQL Database, DATABASE, PostgreSQL, 15.0, Production, AWS us-east-1, 12000, dba-team@company.com, "Customer Portal, Analytics Platform"
```

**Import Wizard UI**

```typescript
// Step 1: Select Template
<TemplateSelector 
  templates={availableTemplates}
  onSelect={handleTemplateSelect}
  showPreview={true}
/>

// Step 2: Upload File
<FileUploader 
  acceptedFormats={['.xlsx', '.csv', '.tsv']}
  onUpload={handleFileUpload}
  maxSize={50_000_000} // 50MB
/>

// Step 3: Map Columns (if needed)
<ColumnMapper 
  detectedColumns={fileColumns}
  templateColumns={template.schema.requiredColumns}
  autoSuggestedMappings={aiSuggestedMappings}
  onMappingChange={handleMappingChange}
/>

// Step 4: Validate Data
<ValidationResults 
  errors={validationErrors}
  warnings={validationWarnings}
  validRows={validRowCount}
  invalidRows={invalidRowCount}
  onFixErrors={handleFixErrors}
/>

// Step 5: Preview & Confirm
<ImportPreview 
  entitiesToCreate={parsedEntities}
  relationshipsToCreate={parsedRelationships}
  conflictResolution={conflictStrategy}
  onConfirm={handleImportConfirm}
/>

// Step 6: Execute Import
<ImportProgress 
  totalRows={totalRows}
  processedRows={processedRows}
  errors={importErrors}
  canRollback={true}
  onComplete={handleImportComplete}
/>
```

**Smart Features**:

- **Auto-detect encoding** (UTF-8, Latin-1, etc.)
- **Auto-detect delimiter** (comma, semicolon, tab)
- **Column header fuzzy matching** ("App Name" matches "Application Name")
- **Data type inference**
- **Email validation and user lookup**
- **Reference resolution** (lookup existing entities by name)
- **Duplicate detection** with merge suggestions
- **Relationship inference** from column values
- **Batch processing** with progress tracking
- **Rollback capability** if errors occur

#### 3.2.2 JSON/XML Import

Support for structured data formats:

```typescript
interface JSONImportConfig {
  format: 'json' | 'xml' | 'yaml';
  mapping: {
    entityPath: string; // JSONPath or XPath to entities
    fieldMappings: Record<string, string>;
    relationshipPaths?: {
      path: string;
      type: RelationshipType;
      targetPath: string;
    }[];
  };
  transformation?: {
    // JavaScript function to transform data
    function: string;
  };
}

// Example: Import from ArchiMate Exchange Format
const archiMateImport: JSONImportConfig = {
  format: 'xml',
  mapping: {
    entityPath: '//element[@xsi:type="ApplicationComponent"]',
    fieldMappings: {
      'name': '@name',
      'description': 'documentation',
      'id': '@identifier',
    },
    relationshipPaths: [{
      path: '//relationship[@xsi:type="ServingRelationship"]',
      type: 'SERVES',
      targetPath: '@target',
    }],
  },
};
```

### 3.3 Model Context Protocol (MCP) Integration

#### 3.3.1 What is MCP?

MCP (Model Context Protocol) is an open protocol developed by Anthropic that enables AI models to securely access external data sources. For Reqarchitect, MCP servers act as **AI-powered data discovery agents** that can:

- Discover data in external systems
- Understand schema automatically
- Suggest intelligent mappings
- Extract information from unstructured sources
- Enable natural language import commands

#### 3.3.2 MCP Server Architecture

```typescript
// MCP Server for ServiceNow Discovery
class ServiceNowMCPServer implements MCPServer {
  name = 'servicenow-discovery';
  version = '1.0.0';
  
  async listTools(): Promise<MCPTool[]> {
    return [
      {
        name: 'discover_applications',
        description: 'Discover applications in ServiceNow CMDB',
        inputSchema: {
          type: 'object',
          properties: {
            filter: { type: 'string', description: 'Optional filter criteria' },
            limit: { type: 'number', default: 100 },
          },
        },
      },
      {
        name: 'analyze_dependencies',
        description: 'Analyze application dependencies',
        inputSchema: {
          type: 'object',
          properties: {
            applicationId: { type: 'string', required: true },
          },
        },
      },
      {
        name: 'suggest_mappings',
        description: 'Suggest field mappings from ServiceNow to Reqarchitect',
        inputSchema: {
          type: 'object',
          properties: {
            sourceTable: { type: 'string', required: true },
            targetEntity: { type: 'string', required: true },
          },
        },
      },
    ];
  }
  
  async executeTool(toolName: string, args: any): Promise<MCPToolResult> {
    switch (toolName) {
      case 'discover_applications':
        return this.discoverApplications(args);
      case 'analyze_dependencies':
        return this.analyzeDependencies(args);
      case 'suggest_mappings':
        return this.suggestMappings(args);
    }
  }
  
  private async discoverApplications(args: any): Promise<MCPToolResult> {
    // Query ServiceNow API
    const applications = await this.serviceNowClient.getApplications({
      filter: args.filter,
      limit: args.limit,
    });
    
    // Return structured data that AI can understand
    return {
      success: true,
      data: {
        applications: applications.map(app => ({
          id: app.sys_id,
          name: app.name,
          description: app.short_description,
          owner: app.owned_by?.display_value,
          status: app.operational_status,
          category: app.category,
          // AI can reason about this structure
        })),
        metadata: {
          total: applications.length,
          hasMore: applications.length === args.limit,
        },
      },
    };
  }
  
  private async suggestMappings(args: any): Promise<MCPToolResult> {
    // Use AI to analyze ServiceNow schema and suggest mappings
    const sourceSchema = await this.serviceNowClient.getTableSchema(args.sourceTable);
    const targetSchema = await this.getReqarchitectSchema(args.targetEntity);
    
    // AI analyzes field names, types, and descriptions to suggest mappings
    const suggestions = await this.aiMappingService.suggestMappings(
      sourceSchema,
      targetSchema
    );
    
    return {
      success: true,
      data: {
        mappings: suggestions.map(s => ({
          sourceField: s.sourceField,
          targetField: s.targetField,
          confidence: s.confidence,
          reasoning: s.reasoning,
        })),
      },
    };
  }
}
```

#### 3.3.3 MCP Use Cases for Reqarchitect

**Use Case 1: Natural Language Import**

```typescript
// User types in chat interface:
// "Import all production applications from ServiceNow"

// AI uses MCP to:
1. Call servicenow-discovery.discover_applications({ filter: "operational_status=1" })
2. Review discovered applications
3. Call servicenow-discovery.suggest_mappings({ sourceTable: "cmdb_ci_appl", targetEntity: "ApplicationComponent" })
4. Present preview to user
5. Execute import if approved
```

**Use Case 2: Intelligent Schema Analysis**

```typescript
// User: "What data can I import from Jira?"

// AI uses MCP to:
1. Call jira-discovery.list_available_data()
2. Analyzes project structure, custom fields, issue types
3. Suggests: "I found 3 projects with 45 epics, 230 stories. I can import these as initiatives and requirements."
4. Shows sample mapping preview
```

**Use Case 3: Dependency Discovery**

```typescript
// User: "Analyze dependencies for the Customer Portal application"

// AI uses MCP to:
1. Call servicenow-discovery.analyze_dependencies({ applicationId: "xyz" })
2. Discovers database dependencies, API integrations, infrastructure
3. Suggests creating relationships: DEPENDS_ON, USES, REQUIRES
4. Optionally imports dependent systems too
```

#### 3.3.4 MCP Servers to Build

**Priority 1 (MVP)**:
- `servicenow-discovery` - CMDB discovery
- `jira-discovery` - Project and issue discovery
- `confluence-discovery` - Documentation extraction
- `excel-analyzer` - Intelligent Excel parsing

**Priority 2 (Phase 2)**:
- `github-discovery` - Repository analysis
- `aws-discovery` - Cloud infrastructure discovery
- `azure-discovery` - Azure resource discovery
- `diagram-extractor` - Extract entities from diagrams (Visio, Lucidchart)

**Priority 3 (Future)**:
- `salesforce-discovery` - CRM data extraction
- `slack-discovery` - Extract knowledge from Slack conversations
- `email-discovery` - Extract architecture info from emails

### 3.4 Webhook System

#### 3.4.1 Inbound Webhooks (Receive Events)

```typescript
interface WebhookEndpoint {
  id: string;
  url: string; // e.g., /api/webhooks/servicenow/:orgId
  secret: string; // For signature verification
  active: boolean;
  events: WebhookEvent[];
  filters?: WebhookFilter[];
  transformation?: {
    // JavaScript function to transform payload
    function: string;
  };
  retryPolicy: {
    maxAttempts: number;
    backoffStrategy: 'linear' | 'exponential';
  };
}

interface WebhookEvent {
  source: string; // e.g., "servicenow"
  eventType: string; // e.g., "application.updated"
  payloadSchema: any; // JSON Schema for validation
  handler: string; // Handler function name
}

// Example: ServiceNow sends webhook when application changes
POST /api/webhooks/servicenow/:orgId
Headers:
  X-ServiceNow-Signature: sha256=abc123...
Body:
{
  "event": "cmdb.application.updated",
  "timestamp": "2025-10-23T10:00:00Z",
  "data": {
    "sys_id": "abc123",
    "name": "Customer Portal",
    "operational_status": "2", // Changed from 1 to 2
    "changes": {
      "operational_status": { "old": "1", "new": "2" }
    }
  }
}

// Reqarchitect handler:
async function handleServiceNowApplicationUpdate(payload: any) {
  // Verify signature
  const isValid = verifyWebhookSignature(payload, request.headers['x-servicenow-signature']);
  if (!isValid) throw new Error('Invalid signature');
  
  // Find corresponding ApplicationComponent
  const app = await findApplicationByExternalId('servicenow', payload.data.sys_id);
  
  if (app) {
    // Update status
    await updateApplication(app.id, {
      status: mapServiceNowStatus(payload.data.operational_status),
      metadata: {
        ...app.metadata,
        lastSyncedAt: new Date(),
        externalChanges: payload.data.changes,
      },
    });
    
    // Log sync event
    await logSyncEvent({
      source: 'servicenow',
      entityId: app.id,
      eventType: 'UPDATE',
      changes: payload.data.changes,
    });
  }
}
```

#### 3.4.2 Outbound Webhooks (Send Events)

```typescript
interface OutboundWebhookConfig {
  id: string;
  name: string;
  targetUrl: string; // External system URL
  authentication: {
    type: 'none' | 'basic' | 'bearer' | 'custom_header';
    credentials?: any;
  };
  events: OutboundEvent[];
  filters?: {
    entityTypes?: EntityType[];
    organizationIds?: string[];
    customFilters?: string; // JSONLogic format
  };
  active: boolean;
  retryPolicy: {
    maxAttempts: number;
    backoffMs: number[];
  };
}

interface OutboundEvent {
  trigger: 'entity.created' | 'entity.updated' | 'entity.deleted' | 'relationship.created';
  payload: {
    includeFullEntity: boolean;
    includeRelatedEntities?: boolean;
    customTemplate?: string; // Handlebars template
  };
}

// Example: Send to external system when initiative created
{
  "name": "Notify Project Management System",
  "targetUrl": "https://pm-system.company.com/api/webhooks/reqarchitect",
  "authentication": {
    "type": "bearer",
    "credentials": { "token": "secret-token" }
  },
  "events": [{
    "trigger": "entity.created",
    "payload": {
      "includeFullEntity": true,
      "customTemplate": "{\n  \"type\": \"initiative_created\",\n  \"initiative\": {\n    \"id\": \"{{id}}\",\n    \"name\": \"{{name}}\",\n    \"status\": \"{{status}}\"\n  }\n}"
    }
  }],
  "filters": {
    "entityTypes": ["INITIATIVE"]
  }
}

// When initiative created, Reqarchitect sends:
POST https://pm-system.company.com/api/webhooks/reqarchitect
Headers:
  Authorization: Bearer secret-token
  X-Reqarchitect-Event: entity.created
  X-Reqarchitect-Signature: sha256=xyz789...
Body:
{
  "type": "initiative_created",
  "initiative": {
    "id": "init-123",
    "name": "Digital Transformation",
    "status": "PLANNING"
  }
}
```

### 3.5 Custom Connector SDK

#### 3.5.1 SDK Architecture

```typescript
// @reqarchitect/connector-sdk

export abstract class BaseConnector {
  abstract name: string;
  abstract version: string;
  abstract supportedEntities: EntityType[];
  
  // Lifecycle methods
  abstract async authenticate(config: any): Promise<AuthResult>;
  abstract async testConnection(): Promise<ConnectionTestResult>;
  abstract async disconnect(): Promise<void>;
  
  // Discovery methods
  abstract async discover(): Promise<DiscoveryResult>;
  abstract async getSchema(entityType: string): Promise<SchemaDefinition>;
  
  // Import methods
  abstract async fetchEntities(
    entityType: EntityType,
    options: FetchOptions
  ): Promise<Entity[]>;
  
  abstract async fetchRelationships(
    entityType: EntityType,
    options: FetchOptions
  ): Promise<Relationship[]>;
  
  // Sync methods (optional)
  async startSync?(config: SyncConfig): Promise<void>;
  async stopSync?(): Promise<void>;
  
  // Webhook support (optional)
  async registerWebhook?(config: WebhookConfig): Promise<WebhookRegistration>;
  async unregisterWebhook?(webhookId: string): Promise<void>;
  
  // Helper methods provided by SDK
  protected async mapToReqarchitectEntity(
    source: any,
    mapping: FieldMapping
  ): Promise<Entity> {
    // SDK provides mapping utilities
  }
  
  protected async createRelationship(
    source: Entity,
    target: Entity,
    type: RelationshipType
  ): Promise<Relationship> {
    // SDK handles relationship creation
  }
}

// Example: Custom connector for proprietary CMDB
export class CustomCMDBConnector extends BaseConnector {
  name = 'custom-cmdb-connector';
  version = '1.0.0';
  supportedEntities = ['APPLICATION_COMPONENT', 'TECHNOLOGY_COMPONENT'];
  
  private client: CustomCMDBClient;
  
  async authenticate(config: { apiKey: string; baseUrl: string }): Promise<AuthResult> {
    this.client = new CustomCMDBClient(config.baseUrl, config.apiKey);
    
    try {
      await this.client.ping();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  async discover(): Promise<DiscoveryResult> {
    const applications = await this.client.getApplications();
    const servers = await this.client.getServers();
    
    return {
      summary: {
        applications: applications.length,
        servers: servers.length,
      },
      entities: [
        { type: 'APPLICATION_COMPONENT', count: applications.length },
        { type: 'TECHNOLOGY_COMPONENT', count: servers.length },
      ],
    };
  }
  
  async fetchEntities(entityType: EntityType, options: FetchOptions): Promise<Entity[]> {
    if (entityType === 'APPLICATION_COMPONENT') {
      const apps = await this.client.getApplications(options);
      
      return apps.map(app => ({
        type: 'APPLICATION_COMPONENT',
        name: app.applicationName,
        description: app.description,
        properties: {
          status: this.mapStatus(app.status),
          owner: app.owner,
          criticality: app.businessCriticality,
        },
        externalId: app.id,
        externalSource: this.name,
      }));
    }
    
    // Handle other entity types...
  }
  
  async fetchRelationships(entityType: EntityType, options: FetchOptions): Promise<Relationship[]> {
    const dependencies = await this.client.getDependencies();
    
    return dependencies.map(dep => ({
      type: 'DEPENDS_ON',
      sourceType: 'APPLICATION_COMPONENT',
      sourceExternalId: dep.sourceId,
      targetType: 'APPLICATION_COMPONENT',
      targetExternalId: dep.targetId,
      strength: dep.criticalityScore,
    }));
  }
  
  private mapStatus(status: string): string {
    const statusMap: Record<string, string> = {
      'active': 'PRODUCTION',
      'inactive': 'RETIRED',
      'development': 'DEVELOPMENT',
    };
    return statusMap[status] || 'UNKNOWN';
  }
}
```

#### 3.5.2 Publishing Custom Connectors

```typescript
// Connectors can be:
// 1. Private (organization-only)
// 2. Shared within enterprise
// 3. Published to marketplace (future)

// Register connector
await reqarchitect.connectors.register({
  connector: CustomCMDBConnector,
  visibility: 'private',
  configuration: {
    requiredFields: ['apiKey', 'baseUrl'],
    optionalFields: ['syncSchedule'],
  },
});

// Use connector
const connector = await reqarchitect.connectors.create('custom-cmdb-connector', {
  config: {
    apiKey: process.env.CMDB_API_KEY,
    baseUrl: 'https://cmdb.company.internal',
  },
});

await connector.authenticate();
const discovery = await connector.discover();
const entities = await connector.fetchEntities('APPLICATION_COMPONENT', {});
```

---

## 4. Functional Requirements

### 4.1 Connector Management

**REQ-4.1.1**: System SHALL provide a connector marketplace UI listing all available connectors (pre-built and custom)

**REQ-4.1.2**: System SHALL allow administrators to enable/disable connectors per organization

**REQ-4.1.3**: System SHALL support connector configuration with secure credential storage (encrypted at rest)

**REQ-4.1.4**: System SHALL provide connector testing before activation (test connection, validate credentials)

**REQ-4.1.5**: System SHALL log all connector activities for audit purposes

**REQ-4.1.6**: System SHALL support connector versioning and upgrades without data loss

### 4.2 Data Import & Mapping

**REQ-4.2.1**: System SHALL provide import templates for common entity types (downloadable Excel/CSV)

**REQ-4.2.2**: System SHALL auto-detect file encoding, delimiter, and column headers

**REQ-4.2.3**: System SHALL provide AI-powered column mapping suggestions (fuzzy matching)

**REQ-4.2.4**: System SHALL validate imported data against entity schemas before import

**REQ-4.2.5**: System SHALL detect and flag duplicate entities during import

**REQ-4.2.6**: System SHALL provide merge strategies for duplicate entities (keep, skip, merge)

**REQ-4.2.7**: System SHALL infer relationships from reference columns (lookup by name/ID)

**REQ-4.2.8**: System SHALL support partial imports (import only valid rows, flag invalid)

**REQ-4.2.9**: System SHALL provide rollback capability for failed imports

**REQ-4.2.10**: System SHALL track import history and provide re-import capability

### 4.3 Synchronization

**REQ-4.3.1**: System SHALL support scheduled synchronization (hourly, daily, weekly, custom cron)

**REQ-4.3.2**: System SHALL support incremental sync (only changed entities since last sync)

**REQ-4.3.3**: System SHALL detect conflicts (external system changed vs Reqarchitect changed)

**REQ-4.3.4**: System SHALL provide conflict resolution strategies (external wins, reqarchitect wins, manual review)

**REQ-4.3.5**: System SHALL notify administrators of sync failures via email/webhook

**REQ-4.3.6**: System SHALL track sync status and last sync time per connector

**REQ-4.3.7**: System SHALL support bidirectional sync (changes in Reqarchitect pushed to external system)

**REQ-4.3.8**: System SHALL support sync filters (only sync entities matching criteria)

### 4.4 MCP Integration

**REQ-4.4.1**: System SHALL implement MCP protocol for AI-powered data discovery

**REQ-4.4.2**: System SHALL provide MCP servers for top 5 connectors (ServiceNow, Jira, Confluence, Azure AD, GitHub)

**REQ-4.4.3**: System SHALL allow natural language import commands via chat interface

**REQ-4.4.4**: System SHALL use AI to suggest intelligent field mappings

**REQ-4.4.5**: System SHALL provide AI-powered schema analysis and recommendations

**REQ-4.4.6**: System SHALL support custom MCP servers via SDK

### 4.5 Webhook System

**REQ-4.5.1**: System SHALL provide webhook endpoints for inbound events from external systems

**REQ-4.5.2**: System SHALL verify webhook signatures to prevent unauthorized access

**REQ-4.5.3**: System SHALL support outbound webhooks to notify external systems of changes

**REQ-4.5.4**: System SHALL retry failed webhook deliveries with exponential backoff

**REQ-4.5.5**: System SHALL log all webhook events for debugging

**REQ-4.5.6**: System SHALL provide webhook event filtering (by entity type, organization, custom logic)

**REQ-4.5.7**: System SHALL support custom webhook payload templates

### 4.6 Security & Compliance

**REQ-4.6.1**: System SHALL encrypt all connector credentials at rest (AES-256)

**REQ-4.6.2**: System SHALL support OAuth 2.0 for connectors that require it

**REQ-4.6.3**: System SHALL support API keys, basic auth, and custom authentication methods

**REQ-4.6.4**: System SHALL audit all data imports (who, what, when, source)

**REQ-4.6.5**: System SHALL enforce RBAC (only admins can configure connectors)

**REQ-4.6.6**: System SHALL support IP whitelisting for webhook endpoints

**REQ-4.6.7**: System SHALL sanitize imported data to prevent XSS/SQL injection

**REQ-4.6.8**: System SHALL comply with data residency requirements (store credentials in same region as data)

---

## 5. Non-Functional Requirements

### 5.1 Performance

- Connector discovery SHALL complete in < 30 seconds
- Import of 1000 entities SHALL complete in < 2 minutes
- Bulk import of 10,000 entities SHALL complete in < 10 minutes
- Webhook processing SHALL have < 1 second latency
- MCP server responses SHALL be < 5 seconds

### 5.2 Scalability

- System SHALL support 50+ active connectors per organization
- System SHALL support 100+ concurrent imports
- System SHALL process 10,000 webhook events per minute
- System SHALL store unlimited import history (archived after 90 days)

### 5.3 Reliability

- Connector authentication SHALL have 99.5% success rate
- Scheduled syncs SHALL have 99% execution rate
- Import success rate SHALL be 95%+ for valid data
- Webhook delivery SHALL have 99% success rate (after retries)

### 5.4 Usability

- Connector setup SHALL take < 5 minutes for technical users
- Import wizard SHALL have < 10 steps for standard imports
- Error messages SHALL be actionable and clear
- Import preview SHALL show at least 10 sample entities

---

## 6. Implementation Roadmap

### Phase 1: Foundation (Months 1-2)

**Connector Framework**
- [ ] Build connector SDK
- [ ] Implement connector registry
- [ ] Create connector configuration UI
- [ ] Build credential encryption system
- [ ] Implement connection testing

**Bulk Import Engine**
- [ ] Create import template system
- [ ] Build Excel/CSV parser
- [ ] Implement import wizard UI
- [ ] Add validation engine
- [ ] Build rollback capability

**Priority Connectors**
- [ ] ServiceNow connector (CMDB)
- [ ] Azure AD connector (users/org)
- [ ] Excel import templates (5 entity types)

### Phase 2: Synchronization (Months 3-4)

**Sync Engine**
- [ ] Build scheduler system
- [ ] Implement incremental sync logic
- [ ] Create conflict resolution engine
- [ ] Build sync monitoring dashboard
- [ ] Add sync failure notifications

**Additional Connectors**
- [ ] Jira connector
- [ ] GitHub connector
- [ ] AWS connector
- [ ] Confluence connector

### Phase 3: MCP & AI (Months 5-6)

**MCP Integration**
- [ ] Implement MCP protocol
- [ ] Build MCP servers for top 5 connectors
- [ ] Create AI mapping service
- [ ] Build natural language import UI
- [ ] Add schema analysis AI

**Webhooks**
- [ ] Build inbound webhook system
- [ ] Implement outbound webhook system
- [ ] Create webhook management UI
- [ ] Add webhook testing tools

### Phase 4: Advanced Features (Months 7-8)

**Bidirectional Sync**
- [ ] Implement change tracking
- [ ] Build push-to-source capability
- [ ] Add conflict detection
- [ ] Create sync rules engine

**Marketplace**
- [ ] Build connector marketplace UI
- [ ] Enable custom connector uploads
- [ ] Add connector reviews/ratings
- [ ] Implement connector licensing

---

## 7. Success Metrics

| Metric | Baseline | Target | Timeline |
|--------|----------|--------|----------|
| Time to First Import | N/A | < 30 minutes | Month 2 |
| Import Success Rate | N/A | 95%+ | Month 3 |
| Connector Adoption | 0% | 70% of enterprise customers | Month 6 |
| Data Completeness | 60-70% | 95%+ | Month 6 |
| Time to Value | 90 days | 7 days | Month 6 |
| Onboarding Cost | $50K | $5K | Month 6 |
| Enterprise Conversion Rate | Baseline | +40% | Month 12 |

---

## 8. Pricing Strategy

### 8.1 Connector Tiers

**Included in All Plans**:
- Excel/CSV import (unlimited)
- JSON/XML import
- Azure AD connector
- Basic webhooks (100 events/month)

**Professional Plan Add-On** ($500/month):
- 5 pre-built connectors
- Scheduled sync (daily)
- 1,000 webhook events/month
- Basic MCP support

**Enterprise Plan Add-On** ($2,000/month):
- Unlimited pre-built connectors
- Custom connector SDK
- Real-time sync
- Unlimited webhook events
- Full MCP support
- Priority support

### 8.2 Value Justification

| Capability | Value | Competitive Price |
|------------|-------|-------------------|
| ServiceNow Connector | $50K consulting saved | N/A (competitors don't offer) |
| Automated Sync | 10 hours/week saved | $5K/year value |
| MCP AI Discovery | 20 hours onboarding saved | N/A (unique) |
| Custom Connectors | Priceless for unique systems | $20K+ per connector (consulting) |

---

## 9. Competitive Analysis

| Feature | Reqarchitect | LeanIX | Ardoq | ServiceNow | Archi |
|---------|--------------|--------|-------|------------|-------|
| Pre-built Connectors | 15+ | 5 | 8 | N/A (closed) | 0 |
| CSV/Excel Import | ✅ Advanced | ✅ Basic | ✅ Basic | ✅ | ✅ |
| Real-time Sync | ✅ | ❌ | ❌ | ✅ | ❌ |
| MCP/AI Import | ✅ **Unique** | ❌ | ❌ | ❌ | ❌ |
| Custom SDK | ✅ | ❌ | Limited | ❌ | ❌ |
| Bidirectional Sync | ✅ | ❌ | ❌ | ✅ | ❌ |
| Webhook Support | ✅ Full | Limited | Limited | ✅ | ❌ |

**Key Differentiators**:
1. **MCP Integration**: No competitor offers AI-powered discovery
2. **Open SDK**: Only Reqarchitect provides custom connector SDK
3. **Integration Breadth**: Most connectors of any EA platform
4. **Time to Value**: 7 days vs 90+ days for competitors

---

## 10. Risk Mitigation

### 10.1 Technical Risks

**Risk**: Connector authentication failures
- **Mitigation**: Comprehensive testing, retry logic, clear error messages

**Risk**: Data mapping errors causing data corruption
- **Mitigation**: Validation at multiple levels, preview before import, rollback capability

**Risk**: Performance degradation with large imports
- **Mitigation**: Batch processing, progress tracking, async job queue

### 10.2 Business Risks

**Risk**: Competitors copy integration strategy
- **Mitigation**: Fast execution, MCP as moat, continuous innovation

**Risk**: Customers expect too many connectors
- **Mitigation**: Custom SDK, clear roadmap, partnership model

---

## 11. Conclusion

The Enterprise Integration & Data Import Platform is **essential for Reqarchitect's enterprise success**. Without it, customers face a 90-day onboarding nightmare that kills adoption. With it, customers see value in 7 days and achieve 95%+ data completeness.

The combination of **pre-built connectors, MCP-powered AI discovery, and custom SDK** creates an unbeatable integration story that no competitor can match. The $500K+ ARR impact and 40% higher conversion rate make this a strategic imperative.

**Recommended Next Steps**:
1. Approve Phase 1 implementation (foundation + 3 connectors)
2. Assign engineering team
3. Begin ServiceNow connector as proof of concept
4. Launch beta program with 5 enterprise customers
5. Iterate based on feedback

---

**Document End**

This PRD provides a comprehensive integration strategy that solves the cold start problem and positions Reqarchitect as the most integration-friendly enterprise architecture platform in the market.

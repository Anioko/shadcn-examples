# LLM Implementation Guide: 100+ Pre-Built Integrations

**Document Type**: LLM-Optimized Implementation Guide
**Source PRD**: 0005-prd-100-prebuilt-integrations-human.md
**Purpose**: Guide AI assistants in implementing 100+ enterprise connectors
**Last Updated**: 2025-10-23

---

## 🎯 Quick Reference for LLMs

### What This Implements

A plug-and-play integration hub with 100+ pre-built connectors enabling:
- Zero manual data entry (automated import from existing systems)
- 5-minute time to first import
- 98%+ data completeness
- Real-time synchronization
- AI-powered field mapping

### Priority System

- **P0** (20 connectors): Launch blockers - implement first
- **P1** (40 connectors): High demand - implement second
- **P2** (40 connectors): Long tail - implement third

### Key Implementation Principles

1. **Unified interface**: All connectors implement `UniversalConnector` interface
2. **Smart mapping**: AI-powered field mapping with 95%+ accuracy
3. **Fail-safe**: Validation + preview + rollback on every import
4. **Performance**: Batch processing, async jobs, rate limiting
5. **Security**: Encrypted credentials, OAuth 2.0, audit logs

---

## 📋 Complete Connector Catalog

### Priority 0: Launch Blockers (20 connectors)

```typescript
// P0 Connectors - Must implement for enterprise launch
const P0_CONNECTORS = [
  // ITSM & CMDB (2)
  'servicenow',          // CMDB, ITSM, Change Management
  'jira-service-mgmt',   // IT Service Desk
  
  // Identity & Access (3)
  'azure-ad',            // Microsoft Identity
  'okta',                // Identity Platform
  'google-workspace',    // Google Identity
  
  // Cloud Infrastructure (3)
  'aws',                 // Amazon Cloud
  'azure',               // Microsoft Cloud
  'gcp',                 // Google Cloud
  
  // Project Management (2)
  'jira',                // Agile/Issue Tracking
  'azure-devops',        // Microsoft DevOps
  
  // Development (2)
  'github',              // Code Hosting
  'gitlab',              // DevOps Platform
  
  // Documentation (2)
  'confluence',          // Atlassian Wiki
  'sharepoint',          // Microsoft Docs
  
  // CRM (2)
  'salesforce',          // CRM Leader
  'dynamics-365',        // Microsoft CRM
  
  // Communication (2)
  'slack',               // Team Chat
  'microsoft-teams',     // Microsoft Chat
  
  // DevOps (2)
  'kubernetes',          // Container Orchestration
  'terraform',           // Infrastructure as Code
];
```

---

## 🏗️ Core Architecture

### Base Connector Interface

```typescript
// lib/connectors/base/universal-connector.ts

export enum ConnectorCategory {
  ITSM = 'itsm',
  PPM = 'project_portfolio',
  IAM = 'identity_access',
  CLOUD = 'cloud_infrastructure',
  DEVOPS = 'development_devops',
  DOCUMENTATION = 'documentation',
  CRM = 'crm_sales',
  COMMUNICATION = 'communication',
  SECURITY = 'security_compliance',
  ERP = 'erp_financial',
}

export enum AuthType {
  OAUTH2 = 'oauth2',
  API_KEY = 'api_key',
  BASIC = 'basic_auth',
  BEARER = 'bearer_token',
  CUSTOM = 'custom',
}

export interface UniversalConnector {
  // Metadata
  readonly id: string;
  readonly name: string;
  readonly category: ConnectorCategory;
  readonly vendor: string;
  readonly logoUrl: string;
  readonly description: string;
  readonly version: string;
  readonly priority: 'P0' | 'P1' | 'P2';
  readonly status: 'GA' | 'Beta' | 'Alpha' | 'Planned';
  readonly documentationUrl: string;

  // Capabilities
  readonly capabilities: {
    import: boolean;
    export: boolean;
    sync: boolean;
    realtime: boolean;
    bidirectional: boolean;
    aiDiscovery: boolean;
  };

  // Authentication configuration
  readonly authentication: AuthConfig;

  // Entity mappings
  readonly mappings: EntityMapping[];

  // Configuration schema
  readonly configSchema: ConfigSchema;

  // Lifecycle methods
  connect(config: ConnectorConfig): Promise<Connection>;
  disconnect(): Promise<void>;
  testConnection(): Promise<TestResult>;

  // Discovery methods
  discover(): Promise<DiscoveryResult>;
  getSchema(entityType: string): Promise<SchemaDefinition>;

  // Import methods
  fetchEntities(entityType: EntityType, options: FetchOptions): Promise<Entity[]>;
  fetchRelationships(entityType: EntityType, options: FetchOptions): Promise<Relationship[]>;

  // Sync methods (optional)
  startSync?(config: SyncConfig): Promise<void>;
  stopSync?(): Promise<void>;
  
  // Webhook support (optional)
  registerWebhook?(config: WebhookConfig): Promise<WebhookRegistration>;
  unregisterWebhook?(webhookId: string): Promise<void>;
}

export interface EntityMapping {
  sourceType: string;              // External entity type (e.g., 'cmdb_ci_appl')
  targetType: EntityType;          // Reqarchitect entity type
  displayName: string;             // User-friendly name
  description: string;             // What this mapping does
  fieldMappings: FieldMapping[];   // Field-to-field mappings
  transformations: Transformation[]; // Data transformations
  relationships: RelationshipMapping[]; // How to map relationships
  filters?: FilterConfig[];        // Optional data filters
  validation?: ValidationRule[];   // Custom validation rules
}

export interface FieldMapping {
  source: string;                  // Source field path (supports nested: 'owner.email')
  target: string;                  // Target field name
  required: boolean;               // Is this field required?
  transform?: string;              // Transformation function name
  defaultValue?: any;              // Default if source is null
  description?: string;            // Field mapping description
}

export interface Transformation {
  name: string;                    // Transformation name
  description: string;             // What it does
  function: (value: any, context?: any) => any; // Transform function
}

export interface RelationshipMapping {
  sourceField: string;             // Field containing related IDs
  targetType: EntityType;          // Type of related entity
  relationshipType: RelationshipType; // How they're related
  lookupBy: 'externalId' | 'name' | 'custom'; // How to find target
  lookupField?: string;            // Field to lookup by
  defaultStrength?: number;        // Default relationship strength (0-100)
  bidirectional?: boolean;         // Create reverse relationship too?
}

export interface ConnectorConfig {
  organizationId: string;          // Which org this is for
  name: string;                    // User-assigned name
  authentication: Record<string, any>; // Auth credentials
  settings: Record<string, any>;   // Connector-specific settings
  syncSchedule?: {
    enabled: boolean;
    frequency: 'hourly' | 'daily' | 'weekly' | 'monthly';
    time?: string;                 // Time of day for scheduled sync
  };
  filters?: Record<string, any>;   // Data filters
  mappingOverrides?: Partial<EntityMapping>[]; // Custom mapping overrides
}

export interface TestResult {
  success: boolean;
  message: string;
  details?: {
    authenticated: boolean;
    permissionsValid: boolean;
    endpointReachable: boolean;
    apiVersion?: string;
  };
  errors?: string[];
}

export interface DiscoveryResult {
  summary: {
    totalEntities: number;
    entitiesByType: Record<string, number>;
  };
  entities: Array<{
    type: string;
    displayName: string;
    count: number;
    canImport: boolean;
  }>;
  relationships: Array<{
    from: string;
    to: string;
    type: string;
    count: number;
  }>;
  estimatedImportTime: string;     // e.g., "5-10 minutes"
  warnings?: string[];
}
```

### Abstract Base Connector Class

```typescript
// lib/connectors/base/abstract-connector.ts

export abstract class AbstractConnector implements UniversalConnector {
  // Metadata (must be implemented by subclass)
  abstract readonly id: string;
  abstract readonly name: string;
  abstract readonly category: ConnectorCategory;
  abstract readonly vendor: string;
  abstract readonly logoUrl: string;
  abstract readonly description: string;
  abstract readonly priority: 'P0' | 'P1' | 'P2';
  abstract readonly authentication: AuthConfig;
  abstract readonly mappings: EntityMapping[];
  abstract readonly configSchema: ConfigSchema;

  // Default implementations
  readonly version = '1.0.0';
  readonly status: ConnectorStatus = 'GA';
  readonly documentationUrl = `https://docs.reqarchitect.com/connectors/${this.id}`;
  
  readonly capabilities = {
    import: true,
    export: false,
    sync: false,
    realtime: false,
    bidirectional: false,
    aiDiscovery: false,
  };

  protected connection?: Connection;
  protected config?: ConnectorConfig;

  // Helper utilities provided to all connectors
  protected logger = new ConnectorLogger(this.id);
  protected rateLimiter = new RateLimiter();
  protected httpClient = new HttpClient();

  // Abstract methods (must be implemented)
  abstract connect(config: ConnectorConfig): Promise<Connection>;
  abstract testConnection(): Promise<TestResult>;
  abstract discover(): Promise<DiscoveryResult>;
  abstract fetchEntities(entityType: EntityType, options: FetchOptions): Promise<Entity[]>;

  // Default implementations with fallbacks
  async disconnect(): Promise<void> {
    this.connection = undefined;
    this.config = undefined;
  }

  async getSchema(entityType: string): Promise<SchemaDefinition> {
    // Default: return schema from mapping
    const mapping = this.mappings.find(m => m.sourceType === entityType);
    if (!mapping) {
      throw new Error(`No mapping found for entity type: ${entityType}`);
    }

    return {
      type: entityType,
      fields: mapping.fieldMappings.map(fm => ({
        name: fm.source,
        type: 'string', // Default type
        required: fm.required,
        description: fm.description,
      })),
    };
  }

  async fetchRelationships(
    entityType: EntityType,
    options: FetchOptions
  ): Promise<Relationship[]> {
    // Default: no relationships
    return [];
  }

  // Helper methods for subclasses
  protected async mapToReqarchitectEntity(
    source: any,
    mapping: EntityMapping
  ): Promise<Partial<Entity>> {
    const entity: Partial<Entity> = {
      type: mapping.targetType,
      organizationId: this.config!.organizationId,
    };

    // Apply field mappings
    for (const fieldMapping of mapping.fieldMappings) {
      let value = this.getNestedValue(source, fieldMapping.source);

      // Apply transformation
      if (fieldMapping.transform) {
        const transformation = mapping.transformations.find(
          t => t.name === fieldMapping.transform
        );
        if (transformation) {
          value = transformation.function(value, { source, entity });
        }
      }

      // Apply default value
      if (value == null && fieldMapping.defaultValue !== undefined) {
        value = fieldMapping.defaultValue;
      }

      // Set value on entity
      this.setNestedValue(entity, fieldMapping.target, value);
    }

    // Add metadata
    entity.metadata = {
      ...entity.metadata,
      importedFrom: this.id,
      importedAt: new Date(),
      externalId: source.id || source.sys_id || source.key,
      externalUrl: this.buildExternalUrl?.(source),
    };

    return entity;
  }

  protected getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  protected setNestedValue(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    const lastKey = keys.pop()!;
    const target = keys.reduce((current, key) => {
      if (!current[key]) current[key] = {};
      return current[key];
    }, obj);
    target[lastKey] = value;
  }

  protected buildExternalUrl?(source: any): string | undefined {
    // Override in subclass to provide deep links
    return undefined;
  }

  protected async respectRateLimits(): Promise<void> {
    await this.rateLimiter.waitIfNeeded();
  }

  protected async handleApiError(error: any, context: string): Promise<never> {
    this.logger.error(`Error in ${context}:`, error);
    
    if (error.response?.status === 401) {
      throw new ConnectorError('Authentication failed. Please check credentials.', 'AUTH_FAILED');
    }
    if (error.response?.status === 403) {
      throw new ConnectorError('Permission denied. Please check API permissions.', 'PERMISSION_DENIED');
    }
    if (error.response?.status === 429) {
      throw new ConnectorError('Rate limit exceeded. Please try again later.', 'RATE_LIMITED');
    }

    throw new ConnectorError(`Connector error: ${error.message}`, 'UNKNOWN_ERROR', error);
  }
}
```

---

## 🔌 P0 Connector Implementations

### 1. ServiceNow Connector (ITSM/CMDB)

```typescript
// lib/connectors/servicenow/servicenow-connector.ts

export class ServiceNowConnector extends AbstractConnector {
  readonly id = 'servicenow';
  readonly name = 'ServiceNow';
  readonly category = ConnectorCategory.ITSM;
  readonly vendor = 'ServiceNow';
  readonly logoUrl = 'https://cdn.reqarchitect.com/logos/servicenow.svg';
  readonly description = 'Import applications, infrastructure, services, and relationships from ServiceNow CMDB';
  readonly priority = 'P0' as const;

  readonly capabilities = {
    import: true,
    export: false,
    sync: true,
    realtime: true,
    bidirectional: false,
    aiDiscovery: true,
  };

  readonly authentication = {
    type: [AuthType.OAUTH2, AuthType.BASIC],
    oauth: {
      authorizationUrl: 'https://{instance}.service-now.com/oauth_auth.do',
      tokenUrl: 'https://{instance}.service-now.com/oauth_token.do',
      scopes: ['useraccount'],
    },
    basic: {
      fields: ['username', 'password'],
    },
  };

  readonly configSchema = {
    fields: [
      {
        name: 'instance',
        type: 'string',
        required: true,
        label: 'ServiceNow Instance',
        description: 'Your ServiceNow instance subdomain (e.g., "mycompany" for mycompany.service-now.com)',
        placeholder: 'mycompany',
      },
      {
        name: 'authType',
        type: 'select',
        required: true,
        label: 'Authentication Type',
        options: ['OAuth 2.0', 'Basic Auth'],
        default: 'OAuth 2.0',
      },
      {
        name: 'syncSchedule',
        type: 'select',
        required: false,
        label: 'Sync Frequency',
        options: ['Hourly', 'Daily', 'Weekly'],
        default: 'Daily',
      },
    ],
  };

  readonly mappings: EntityMapping[] = [
    // Application mapping
    {
      sourceType: 'cmdb_ci_appl',
      targetType: 'APPLICATION_COMPONENT',
      displayName: 'Applications',
      description: 'Import applications from ServiceNow CMDB',
      fieldMappings: [
        { source: 'name', target: 'name', required: true },
        { source: 'short_description', target: 'description', required: false },
        { source: 'owned_by.email', target: 'ownerEmail', required: false, transform: 'extractEmail' },
        { source: 'operational_status', target: 'status', required: true, transform: 'mapStatus' },
        { source: 'u_criticality', target: 'criticality', required: false, transform: 'mapCriticality' },
        { source: 'cost_cc.cost_center', target: 'costCenter', required: false },
        { source: 'install_status', target: 'lifecycle', required: false, transform: 'mapLifecycle' },
        { source: 'version', target: 'version', required: false },
        { source: 'vendor', target: 'vendor', required: false },
      ],
      transformations: [
        {
          name: 'mapStatus',
          description: 'Map ServiceNow operational status to Reqarchitect status',
          function: (value) => {
            const statusMap: Record<string, string> = {
              '1': 'PRODUCTION',
              '2': 'RETIRED',
              '3': 'DEVELOPMENT',
              '4': 'PRODUCTION',
              '5': 'PRODUCTION',
              '6': 'RETIRED',
            };
            return statusMap[value] || 'UNKNOWN';
          },
        },
        {
          name: 'mapCriticality',
          description: 'Map ServiceNow criticality to Reqarchitect levels',
          function: (value) => {
            const criticalityMap: Record<string, string> = {
              '1': 'CRITICAL',
              '2': 'HIGH',
              '3': 'MEDIUM',
              '4': 'LOW',
            };
            return criticalityMap[value] || 'MEDIUM';
          },
        },
        {
          name: 'mapLifecycle',
          description: 'Map install status to lifecycle stage',
          function: (value) => {
            const lifecycleMap: Record<string, string> = {
              '1': 'DEVELOPMENT',
              '6': 'PRODUCTION',
              '7': 'RETIRED',
            };
            return lifecycleMap[value] || 'PRODUCTION';
          },
        },
        {
          name: 'extractEmail',
          description: 'Extract email from ServiceNow reference field',
          function: (value) => {
            if (typeof value === 'object' && value?.value) {
              return value.value;
            }
            return value;
          },
        },
      ],
      relationships: [
        {
          sourceField: 'depends_on',
          targetType: 'APPLICATION_COMPONENT',
          relationshipType: 'DEPENDS_ON',
          lookupBy: 'externalId',
          defaultStrength: 75,
        },
        {
          sourceField: 'used_by',
          targetType: 'BUSINESS_SERVICE',
          relationshipType: 'SERVES',
          lookupBy: 'externalId',
          defaultStrength: 80,
        },
      ],
      validation: [
        {
          field: 'name',
          rule: 'required',
          message: 'Application name is required',
        },
        {
          field: 'name',
          rule: 'minLength',
          value: 2,
          message: 'Application name must be at least 2 characters',
        },
      ],
    },
    // Infrastructure mapping
    {
      sourceType: 'cmdb_ci_server',
      targetType: 'NODE',
      displayName: 'Servers',
      description: 'Import servers and compute infrastructure',
      fieldMappings: [
        { source: 'name', target: 'name', required: true },
        { source: 'short_description', target: 'description', required: false },
        { source: 'ip_address', target: 'ipAddress', required: false },
        { source: 'os', target: 'operatingSystem', required: false },
        { source: 'host_name', target: 'hostname', required: false },
        { source: 'cpu_count', target: 'cpuCount', required: false },
        { source: 'ram', target: 'memoryGb', required: false, transform: 'convertMemoryToGb' },
      ],
      transformations: [
        {
          name: 'convertMemoryToGb',
          description: 'Convert memory to GB',
          function: (value) => {
            if (!value) return null;
            // Assume value is in MB
            return Math.round(parseInt(value) / 1024);
          },
        },
      ],
      relationships: [
        {
          sourceField: 'hosted_on',
          targetType: 'NODE',
          relationshipType: 'RUNS_ON',
          lookupBy: 'externalId',
        },
      ],
    },
    // Business Service mapping
    {
      sourceType: 'cmdb_ci_service',
      targetType: 'BUSINESS_SERVICE',
      displayName: 'Business Services',
      description: 'Import business services',
      fieldMappings: [
        { source: 'name', target: 'name', required: true },
        { source: 'short_description', target: 'description', required: false },
        { source: 'service_classification', target: 'classification', required: false },
        { source: 'used_for', target: 'purpose', required: false },
      ],
      transformations: [],
      relationships: [],
    },
  ];

  private client?: ServiceNowClient;

  async connect(config: ConnectorConfig): Promise<Connection> {
    this.config = config;
    
    const instance = config.authentication.instance;
    if (!instance) {
      throw new ConnectorError('ServiceNow instance is required', 'MISSING_CONFIG');
    }

    // Initialize ServiceNow REST API client
    this.client = new ServiceNowClient({
      instance,
      auth: config.authentication.authType === 'oauth'
        ? {
            type: 'oauth',
            clientId: config.authentication.clientId,
            clientSecret: config.authentication.clientSecret,
            accessToken: config.authentication.accessToken,
            refreshToken: config.authentication.refreshToken,
          }
        : {
            type: 'basic',
            username: config.authentication.username,
            password: config.authentication.password,
          },
    });

    return {
      id: `servicenow-${config.organizationId}`,
      connector: this,
      config,
      status: 'connected',
      connectedAt: new Date(),
    };
  }

  async testConnection(): Promise<TestResult> {
    if (!this.client) {
      return {
        success: false,
        message: 'Not connected. Please connect first.',
      };
    }

    try {
      // Test by querying a single record
      const response = await this.client.table('sys_user').getRecords({
        sysparm_limit: 1,
      });

      return {
        success: true,
        message: 'Successfully connected to ServiceNow',
        details: {
          authenticated: true,
          permissionsValid: true,
          endpointReachable: true,
          apiVersion: response.headers['x-is-version'] || 'unknown',
        },
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Connection test failed: ${error.message}`,
        details: {
          authenticated: false,
          permissionsValid: false,
          endpointReachable: false,
        },
        errors: [error.message],
      };
    }
  }

  async discover(): Promise<DiscoveryResult> {
    if (!this.client) {
      throw new ConnectorError('Not connected', 'NOT_CONNECTED');
    }

    const summary: DiscoveryResult['summary'] = {
      totalEntities: 0,
      entitiesByType: {},
    };

    const entities: DiscoveryResult['entities'] = [];

    // Discover applications
    const appCount = await this.client.table('cmdb_ci_appl').getCount();
    summary.entitiesByType['Applications'] = appCount;
    summary.totalEntities += appCount;
    entities.push({
      type: 'cmdb_ci_appl',
      displayName: 'Applications',
      count: appCount,
      canImport: true,
    });

    // Discover servers
    const serverCount = await this.client.table('cmdb_ci_server').getCount();
    summary.entitiesByType['Servers'] = serverCount;
    summary.totalEntities += serverCount;
    entities.push({
      type: 'cmdb_ci_server',
      displayName: 'Servers',
      count: serverCount,
      canImport: true,
    });

    // Discover services
    const serviceCount = await this.client.table('cmdb_ci_service').getCount();
    summary.entitiesByType['Business Services'] = serviceCount;
    summary.totalEntities += serviceCount;
    entities.push({
      type: 'cmdb_ci_service',
      displayName: 'Business Services',
      count: serviceCount,
      canImport: true,
    });

    // Estimate import time (rough: 100 entities per minute)
    const totalMinutes = Math.ceil(summary.totalEntities / 100);
    const estimatedImportTime = totalMinutes < 5 ? '< 5 minutes' :
                                 totalMinutes < 15 ? '5-15 minutes' :
                                 totalMinutes < 30 ? '15-30 minutes' :
                                 '30+ minutes';

    return {
      summary,
      entities,
      relationships: [], // TODO: Discover relationships
      estimatedImportTime,
    };
  }

  async fetchEntities(
    entityType: EntityType,
    options: FetchOptions
  ): Promise<Entity[]> {
    if (!this.client) {
      throw new ConnectorError('Not connected', 'NOT_CONNECTED');
    }

    // Find the mapping for this entity type
    const mapping = this.mappings.find(m => m.targetType === entityType);
    if (!mapping) {
      throw new ConnectorError(`No mapping found for ${entityType}`, 'NO_MAPPING');
    }

    const entities: Entity[] = [];
    let offset = 0;
    const limit = 100;
    let hasMore = true;

    while (hasMore) {
      await this.respectRateLimits();

      // Fetch records from ServiceNow
      const response = await this.client.table(mapping.sourceType).getRecords({
        sysparm_limit: limit,
        sysparm_offset: offset,
        sysparm_fields: mapping.fieldMappings.map(fm => fm.source).join(','),
        sysparm_query: options.filters?.query || '',
      });

      // Transform each record
      for (const record of response.result) {
        try {
          const entity = await this.mapToReqarchitectEntity(record, mapping);
          entities.push(entity as Entity);
        } catch (error) {
          this.logger.warn(`Failed to map entity ${record.sys_id}:`, error);
        }
      }

      // Check if there are more records
      hasMore = response.result.length === limit;
      offset += limit;

      // Respect max limit if specified
      if (options.limit && entities.length >= options.limit) {
        hasMore = false;
      }
    }

    return entities;
  }

  async fetchRelationships(
    entityType: EntityType,
    options: FetchOptions
  ): Promise<Relationship[]> {
    if (!this.client) {
      throw new ConnectorError('Not connected', 'NOT_CONNECTED');
    }

    const relationships: Relationship[] = [];

    // Fetch relationship records from cmdb_rel_ci table
    const response = await this.client.table('cmdb_rel_ci').getRecords({
      sysparm_query: 'parent.sys_class_name=cmdb_ci_appl^child.sys_class_name=cmdb_ci_appl',
      sysparm_limit: 1000,
    });

    for (const rel of response.result) {
      relationships.push({
        type: this.mapRelationshipType(rel.type),
        sourceType: 'APPLICATION_COMPONENT',
        sourceExternalId: rel.parent.value,
        targetType: 'APPLICATION_COMPONENT',
        targetExternalId: rel.child.value,
        strength: 75,
        metadata: {
          importedFrom: this.id,
          externalId: rel.sys_id,
        },
      } as any);
    }

    return relationships;
  }

  private mapRelationshipType(serviceNowType: string): RelationshipType {
    const typeMap: Record<string, RelationshipType> = {
      'Depends on': 'DEPENDS_ON',
      'Uses': 'USES',
      'Hosted on': 'RUNS_ON',
      'Provides': 'SERVES',
    };
    return typeMap[serviceNowType] || 'ASSOCIATES';
  }

  protected buildExternalUrl(source: any): string {
    return `https://${this.config!.authentication.instance}.service-now.com/nav_to.do?uri=${source.sys_class_name}.do?sys_id=${source.sys_id}`;
  }
}

// ServiceNow API Client
class ServiceNowClient {
  constructor(private config: { instance: string; auth: any }) {}

  table(tableName: string) {
    return {
      getRecords: async (params: any) => {
        // Implementation of ServiceNow Table API
        const url = `https://${this.config.instance}.service-now.com/api/now/table/${tableName}`;
        // Make HTTP request with auth
        return { result: [], headers: {} };
      },
      getCount: async () => {
        // Get record count
        return 0;
      },
    };
  }
}
```

### 2. Azure AD Connector (Identity)

```typescript
// lib/connectors/azure-ad/azure-ad-connector.ts

export class AzureADConnector extends AbstractConnector {
  readonly id = 'azure-ad';
  readonly name = 'Azure Active Directory';
  readonly category = ConnectorCategory.IAM;
  readonly vendor = 'Microsoft';
  readonly logoUrl = 'https://cdn.reqarchitect.com/logos/azure-ad.svg';
  readonly description = 'Import users, groups, and organizational structure from Azure AD';
  readonly priority = 'P0' as const;

  readonly capabilities = {
    import: true,
    export: false,
    sync: true,
    realtime: false,
    bidirectional: false,
    aiDiscovery: false,
  };

  readonly authentication = {
    type: [AuthType.OAUTH2],
    oauth: {
      authorizationUrl: 'https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize',
      tokenUrl: 'https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token',
      scopes: [
        'User.Read.All',
        'Group.Read.All',
        'Directory.Read.All',
        'Application.Read.All',
      ],
    },
  };

  readonly configSchema = {
    fields: [
      {
        name: 'tenantId',
        type: 'string',
        required: true,
        label: 'Tenant ID',
        description: 'Your Azure AD tenant ID (found in Azure Portal)',
      },
      {
        name: 'importUsers',
        type: 'boolean',
        required: false,
        label: 'Import Users',
        default: true,
      },
      {
        name: 'importGroups',
        type: 'boolean',
        required: false,
        label: 'Import Groups as Teams',
        default: true,
      },
      {
        name: 'importOrgStructure',
        type: 'boolean',
        required: false,
        label: 'Import Organizational Structure',
        default: true,
      },
    ],
  };

  readonly mappings: EntityMapping[] = [
    // User mapping
    {
      sourceType: 'user',
      targetType: 'USER',
      displayName: 'Users',
      description: 'Import Azure AD users',
      fieldMappings: [
        { source: 'userPrincipalName', target: 'email', required: true },
        { source: 'displayName', target: 'name', required: true },
        { source: 'givenName', target: 'firstName', required: false },
        { source: 'surname', target: 'lastName', required: false },
        { source: 'jobTitle', target: 'title', required: false },
        { source: 'department', target: 'department', required: false },
        { source: 'officeLocation', target: 'location', required: false },
        { source: 'mobilePhone', target: 'phone', required: false },
      ],
      transformations: [],
      relationships: [
        {
          sourceField: 'manager',
          targetType: 'USER',
          relationshipType: 'MANAGES',
          lookupBy: 'externalId',
        },
      ],
    },
    // Group mapping
    {
      sourceType: 'group',
      targetType: 'TEAM',
      displayName: 'Groups',
      description: 'Import Azure AD groups as teams',
      fieldMappings: [
        { source: 'displayName', target: 'name', required: true },
        { source: 'description', target: 'description', required: false },
        { source: 'mail', target: 'email', required: false },
      ],
      transformations: [],
      relationships: [],
    },
  ];

  private msGraphClient?: MicrosoftGraphClient;

  async connect(config: ConnectorConfig): Promise<Connection> {
    this.config = config;

    this.msGraphClient = new MicrosoftGraphClient({
      tenantId: config.authentication.tenantId,
      clientId: config.authentication.clientId,
      clientSecret: config.authentication.clientSecret,
      accessToken: config.authentication.accessToken,
    });

    return {
      id: `azure-ad-${config.organizationId}`,
      connector: this,
      config,
      status: 'connected',
      connectedAt: new Date(),
    };
  }

  async testConnection(): Promise<TestResult> {
    if (!this.msGraphClient) {
      return {
        success: false,
        message: 'Not connected',
      };
    }

    try {
      await this.msGraphClient.users.list({ $top: 1 });
      
      return {
        success: true,
        message: 'Successfully connected to Azure AD',
      };
    } catch (error: any) {
      return {
        success: false,
        message: `Connection failed: ${error.message}`,
      };
    }
  }

  async discover(): Promise<DiscoveryResult> {
    if (!this.msGraphClient) {
      throw new ConnectorError('Not connected', 'NOT_CONNECTED');
    }

    const userCount = await this.msGraphClient.users.count();
    const groupCount = await this.msGraphClient.groups.count();

    return {
      summary: {
        totalEntities: userCount + groupCount,
        entitiesByType: {
          Users: userCount,
          Groups: groupCount,
        },
      },
      entities: [
        {
          type: 'user',
          displayName: 'Users',
          count: userCount,
          canImport: true,
        },
        {
          type: 'group',
          displayName: 'Groups',
          count: groupCount,
          canImport: true,
        },
      ],
      relationships: [],
      estimatedImportTime: '< 5 minutes',
    };
  }

  async fetchEntities(entityType: EntityType, options: FetchOptions): Promise<Entity[]> {
    if (!this.msGraphClient) {
      throw new ConnectorError('Not connected', 'NOT_CONNECTED');
    }

    const mapping = this.mappings.find(m => m.targetType === entityType);
    if (!mapping) {
      throw new ConnectorError(`No mapping for ${entityType}`, 'NO_MAPPING');
    }

    if (mapping.sourceType === 'user') {
      return this.fetchUsers(mapping, options);
    } else if (mapping.sourceType === 'group') {
      return this.fetchGroups(mapping, options);
    }

    return [];
  }

  private async fetchUsers(mapping: EntityMapping, options: FetchOptions): Promise<Entity[]> {
    const users: Entity[] = [];
    let nextLink: string | undefined;

    do {
      const response = await this.msGraphClient!.users.list({
        $top: 100,
        $skip: nextLink ? undefined : 0,
      });

      for (const user of response.value) {
        const entity = await this.mapToReqarchitectEntity(user, mapping);
        users.push(entity as Entity);
      }

      nextLink = response['@odata.nextLink'];
    } while (nextLink && (!options.limit || users.length < options.limit));

    return users;
  }

  private async fetchGroups(mapping: EntityMapping, options: FetchOptions): Promise<Entity[]> {
    const groups: Entity[] = [];
    let nextLink: string | undefined;

    do {
      const response = await this.msGraphClient!.groups.list({
        $top: 100,
      });

      for (const group of response.value) {
        const entity = await this.mapToReqarchitectEntity(group, mapping);
        groups.push(entity as Entity);
      }

      nextLink = response['@odata.nextLink'];
    } while (nextLink && (!options.limit || groups.length < options.limit));

    return groups;
  }
}

class MicrosoftGraphClient {
  constructor(private config: any) {}

  users = {
    list: async (params: any) => ({ value: [], '@odata.nextLink': undefined }),
    count: async () => 0,
  };

  groups = {
    list: async (params: any) => ({ value: [], '@odata.nextLink': undefined }),
    count: async () => 0,
  };
}
```

---

## 🔄 Universal Import Pipeline

```typescript
// lib/connectors/pipeline/import-pipeline.ts

export class UniversalImportPipeline {
  private jobQueue: JobQueue;
  private validator: DataValidator;
  private transformer: DataTransformer;
  private deduplicator: Deduplicator;
  private loader: DataLoader;
  private relationshipBuilder: RelationshipBuilder;

  constructor() {
    this.jobQueue = new JobQueue();
    this.validator = new DataValidator();
    this.transformer = new DataTransformer();
    this.deduplicator = new Deduplicator();
    this.loader = new DataLoader();
    this.relationshipBuilder = new RelationshipBuilder();
  }

  /**
   * Execute complete import pipeline
   */
  async executeImport(request: ImportRequest): Promise<ImportResult> {
    // 1. Create import job
    const job = await this.createImportJob(request);

    try {
      // 2. Extract data from source
      await this.updateJobProgress(job.id, 'extracting', 10);
      const sourceData = await this.extract(request);

      // 3. Transform data
      await this.updateJobProgress(job.id, 'transforming', 30);
      const transformedData = await this.transformer.transform(
        sourceData,
        request.mapping
      );

      // 4. Validate
      await this.updateJobProgress(job.id, 'validating', 50);
      const validation = await this.validator.validate(
        transformedData,
        request.mapping.targetType
      );

      if (validation.errors.length > 0 && request.options.failOnError) {
        throw new ImportError('Validation failed', validation.errors);
      }

      // 5. Deduplicate
      await this.updateJobProgress(job.id, 'deduplicating', 65);
      const deduplicated = await this.deduplicator.deduplicate(
        transformedData,
        request.options.deduplicationStrategy
      );

      // 6. Load into database
      await this.updateJobProgress(job.id, 'loading', 80);
      const loaded = await this.loader.load(
        deduplicated,
        request.mapping.targetType,
        request.organizationId
      );

      // 7. Create relationships
      await this.updateJobProgress(job.id, 'relationships', 95);
      await this.relationshipBuilder.createRelationships(
        loaded,
        request.mapping.relationships || []
      );

      // 8. Complete
      await this.updateJobProgress(job.id, 'complete', 100);

      return {
        jobId: job.id,
        success: true,
        imported: loaded.length,
        skipped: transformedData.length - loaded.length,
        errors: validation.warnings,
        duration: Date.now() - job.startedAt.getTime(),
      };

    } catch (error: any) {
      await this.markJobFailed(job.id, error);
      throw error;
    }
  }

  /**
   * Extract data from connector
   */
  private async extract(request: ImportRequest): Promise<any[]> {
    const connector = request.connector;
    const data: any[] = [];

    // Fetch all pages
    let hasMore = true;
    let page = 0;

    while (hasMore) {
      const result = await connector.fetchEntities(
        request.mapping.targetType,
        {
          ...request.options,
          page,
          pageSize: 100,
        }
      );

      data.push(...result);
      hasMore = result.length === 100;
      page++;

      // Respect limits
      if (request.options.limit && data.length >= request.options.limit) {
        break;
      }
    }

    return data;
  }

  private async createImportJob(request: ImportRequest): Promise<ImportJob> {
    const job: ImportJob = {
      id: generateId(),
      organizationId: request.organizationId,
      connectorId: request.connector.id,
      entityType: request.mapping.targetType,
      status: 'running',
      progress: 0,
      stage: 'starting',
      startedAt: new Date(),
      createdBy: request.userId,
    };

    await this.jobQueue.add(job);
    return job;
  }

  private async updateJobProgress(
    jobId: string,
    stage: ImportStage,
    progress: number
  ): Promise<void> {
    await this.jobQueue.update(jobId, { stage, progress });
  }

  private async markJobFailed(jobId: string, error: Error): Promise<void> {
    await this.jobQueue.update(jobId, {
      status: 'failed',
      error: error.message,
      completedAt: new Date(),
    });
  }
}

interface ImportRequest {
  organizationId: string;
  userId: string;
  connector: UniversalConnector;
  mapping: EntityMapping;
  options: {
    limit?: number;
    filters?: any;
    deduplicationStrategy: 'skip' | 'update' | 'merge' | 'fail';
    failOnError: boolean;
  };
}

interface ImportJob {
  id: string;
  organizationId: string;
  connectorId: string;
  entityType: EntityType;
  status: 'running' | 'complete' | 'failed';
  progress: number;
  stage: ImportStage;
  startedAt: Date;
  completedAt?: Date;
  createdBy: string;
  error?: string;
}

type ImportStage =
  | 'starting'
  | 'extracting'
  | 'transforming'
  | 'validating'
  | 'deduplicating'
  | 'loading'
  | 'relationships'
  | 'complete';
```

---

## 📝 Connector Template Generator

To accelerate development of all 100+ connectors, use this template:

```typescript
// scripts/generate-connector.ts

import * as fs from 'fs';
import * as path from 'path';

interface ConnectorSpec {
  id: string;
  name: string;
  category: ConnectorCategory;
  vendor: string;
  priority: 'P0' | 'P1' | 'P2';
  apiType: 'rest' | 'graphql' | 'soap' | 'sdk';
  authTypes: AuthType[];
  entities: Array<{
    sourceType: string;
    targetType: EntityType;
    displayName: string;
    fields: Array<{ source: string; target: string; required: boolean }>;
  }>;
}

function generateConnector(spec: ConnectorSpec): string {
  return `
// lib/connectors/${spec.id}/${spec.id}-connector.ts
// Auto-generated connector for ${spec.name}

export class ${toPascalCase(spec.id)}Connector extends AbstractConnector {
  readonly id = '${spec.id}';
  readonly name = '${spec.name}';
  readonly category = ConnectorCategory.${spec.category.toUpperCase()};
  readonly vendor = '${spec.vendor}';
  readonly logoUrl = 'https://cdn.reqarchitect.com/logos/${spec.id}.svg';
  readonly description = 'Import data from ${spec.name}';
  readonly priority = '${spec.priority}' as const;

  readonly authentication = {
    type: [${spec.authTypes.map(t => `AuthType.${t.toUpperCase()}`).join(', ')}],
    // TODO: Configure auth details
  };

  readonly configSchema = {
    fields: [
      // TODO: Add configuration fields
    ],
  };

  readonly mappings: EntityMapping[] = [
    ${spec.entities.map(e => generateEntityMapping(e)).join(',\n    ')}
  ];

  async connect(config: ConnectorConfig): Promise<Connection> {
    // TODO: Implement connection logic
    throw new Error('Not implemented');
  }

  async testConnection(): Promise<TestResult> {
    // TODO: Implement connection test
    throw new Error('Not implemented');
  }

  async discover(): Promise<DiscoveryResult> {
    // TODO: Implement discovery
    throw new Error('Not implemented');
  }

  async fetchEntities(entityType: EntityType, options: FetchOptions): Promise<Entity[]> {
    // TODO: Implement fetch logic
    throw new Error('Not implemented');
  }
}
`.trim();
}

function generateEntityMapping(entity: any): string {
  return `
    {
      sourceType: '${entity.sourceType}',
      targetType: '${entity.targetType}',
      displayName: '${entity.displayName}',
      description: 'Import ${entity.displayName}',
      fieldMappings: [
        ${entity.fields.map((f: any) => 
          `{ source: '${f.source}', target: '${f.target}', required: ${f.required} }`
        ).join(',\n        ')}
      ],
      transformations: [],
      relationships: [],
    }
  `.trim();
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

// Generate all connectors
const CONNECTOR_SPECS: ConnectorSpec[] = [
  // ServiceNow spec (already implemented above)
  // Azure AD spec (already implemented above)
  
  // Jira spec
  {
    id: 'jira',
    name: 'Jira',
    category: ConnectorCategory.PPM,
    vendor: 'Atlassian',
    priority: 'P0',
    apiType: 'rest',
    authTypes: [AuthType.OAUTH2, AuthType.API_KEY],
    entities: [
      {
        sourceType: 'epic',
        targetType: 'INITIATIVE',
        displayName: 'Epics',
        fields: [
          { source: 'key', target: 'externalId', required: true },
          { source: 'summary', target: 'name', required: true },
          { source: 'description', target: 'description', required: false },
          { source: 'assignee.emailAddress', target: 'ownerEmail', required: false },
        ],
      },
      {
        sourceType: 'story',
        targetType: 'REQUIREMENT',
        displayName: 'Stories',
        fields: [
          { source: 'key', target: 'externalId', required: true },
          { source: 'summary', target: 'name', required: true },
          { source: 'description', target: 'description', required: false },
        ],
      },
    ],
  },

  // Add specs for all 100+ connectors...
  // AWS, Azure, GCP, GitHub, GitLab, etc.
];

// Generate connector files
for (const spec of CONNECTOR_SPECS) {
  const code = generateConnector(spec);
  const outputPath = path.join(__dirname, `../lib/connectors/${spec.id}/${spec.id}-connector.ts`);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, code);
  console.log(`Generated: ${outputPath}`);
}
```

---

## ✅ Implementation Checklist

### Phase 1: Foundation (Weeks 1-4)

**Week 1: Core Framework**
- [ ] Implement `UniversalConnector` interface
- [ ] Implement `AbstractConnector` base class
- [ ] Create `ConnectorRegistry` for connector management
- [ ] Build `UniversalImportPipeline`
- [ ] Implement encryption for credentials
- [ ] Unit tests for framework

**Week 2: First 5 P0 Connectors**
- [ ] ServiceNow connector (complete)
- [ ] Jira connector
- [ ] Azure AD connector
- [ ] AWS connector
- [ ] GitHub connector
- [ ] Integration tests

**Week 3: Next 10 P0 Connectors**
- [ ] GitLab, Confluence, SharePoint, Azure Cloud, GCP
- [ ] Salesforce, Okta, Google Workspace, Teams, Slack
- [ ] Integration tests

**Week 4: Remaining P0 + UI**
- [ ] Kubernetes, Terraform, Dynamics 365, HubSpot, SAP
- [ ] Connector marketplace UI
- [ ] Import wizard UI
- [ ] Job monitoring dashboard
- [ ] E2E tests

### Phase 2: P1 Connectors (Weeks 5-8)

**Week 5-6: ITSM & PPM (15 connectors)**
- [ ] BMC Remedy, Cherwell, Ivanti, ManageEngine, Freshservice
- [ ] Asana, Monday.com, ClickUp, Smartsheet, Wrike
- [ ] Planview, Clarity, MS Project, Trello, Basecamp

**Week 7-8: Cloud & DevOps (15 connectors)**
- [ ] VMware, Oracle Cloud, IBM Cloud, DigitalOcean, Heroku
- [ ] Jenkins, CircleCI, TeamCity, ArgoCD, Octopus
- [ ] Integration tests

### Phase 3: P1 Continued (Weeks 9-12)

**Week 9-10: IAM & Documentation (15 connectors)**
- [ ] OneLogin, Ping Identity, JumpCloud, Auth0, LDAP
- [ ] Notion, Google Drive, OneDrive, Dropbox, Box
- [ ] Integration tests

**Week 11-12: CRM & Remaining P1 (10 connectors)**
- [ ] HubSpot, Pipedrive, Zoho, Freshsales, Copper
- [ ] Integration tests
- [ ] Performance optimization

### Phase 4: P2 Connectors (Weeks 13-18)

**Week 13-15: Long Tail Part 1 (20 connectors)**
- [ ] Niche ITSM, PPM, Cloud tools
- [ ] Open source alternatives
- [ ] Regional leaders

**Week 16-18: Long Tail Part 2 (20 connectors)**
- [ ] Security & Compliance tools
- [ ] ERP & Financial systems
- [ ] Industry-specific tools

### Phase 5: Advanced Features (Weeks 19-24)

**Week 19-20: Bidirectional Sync**
- [ ] Change tracking system
- [ ] Push-to-source capability for top 10 connectors
- [ ] Conflict resolution engine

**Week 21-22: Custom Connector SDK**
- [ ] SDK documentation
- [ ] Code generator
- [ ] Example connectors
- [ ] Testing framework

**Week 23-24: Community & Polish**
- [ ] Connector marketplace launch
- [ ] Community contribution guidelines
- [ ] Certification program
- [ ] Performance tuning
- [ ] Production launch

---

## 🎯 Success Metrics

Track these KPIs to measure implementation success:

```typescript
interface ConnectorMetrics {
  // Performance
  connectionSuccessRate: number;      // Target: 99%+
  averageImportTime: number;          // Target: < 10 min for 1K entities
  dataAccuracy: number;               // Target: 98%+
  
  // Adoption
  connectorsInstalled: number;        // # of connector instances
  entitiesImported: number;           // Total entities imported
  activeOrganizations: number;        // Orgs using ≥1 connector
  
  // Quality
  userSatisfaction: number;           // Target: 4.5+ / 5.0
  errorRate: number;                  // Target: < 2%
  supportTickets: number;             // Lower is better
}

// Track metrics per connector
interface PerConnectorMetrics {
  connectorId: string;
  installs: number;
  successRate: number;
  averageEntitiesImported: number;
  rating: number;
  commonErrors: Array<{ error: string; count: number }>;
}
```

---

## 🔐 Security Best Practices

```typescript
// Credential encryption
class CredentialManager {
  private encryptionKey: string;

  async encrypt(credentials: any): Promise<string> {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-gcm', this.encryptionKey, iv);
    
    const encrypted = Buffer.concat([
      cipher.update(JSON.stringify(credentials), 'utf8'),
      cipher.final(),
    ]);

    const authTag = cipher.getAuthTag();

    return JSON.stringify({
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex'),
      encrypted: encrypted.toString('hex'),
    });
  }

  async decrypt(encryptedData: string): Promise<any> {
    const { iv, authTag, encrypted } = JSON.parse(encryptedData);
    
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      this.encryptionKey,
      Buffer.from(iv, 'hex')
    );

    decipher.setAuthTag(Buffer.from(authTag, 'hex'));

    const decrypted = Buffer.concat([
      decipher.update(Buffer.from(encrypted, 'hex')),
      decipher.final(),
    ]);

    return JSON.parse(decrypted.toString('utf8'));
  }
}

// Audit logging
class ConnectorAuditLogger {
  async logImport(event: {
    connectorId: string;
    organizationId: string;
    userId: string;
    entityType: EntityType;
    entitiesImported: number;
    duration: number;
    success: boolean;
    error?: string;
  }): Promise<void> {
    await prisma.auditLog.create({
      data: {
        action: 'CONNECTOR_IMPORT',
        resource: event.connectorId,
        organizationId: event.organizationId,
        userId: event.userId,
        metadata: event,
        timestamp: new Date(),
      },
    });
  }
}
```

---

## 📚 Documentation Template

For each connector, generate documentation:

```markdown
# [Connector Name] Integration Guide

## Overview
Brief description of what this connector does.

## Prerequisites
- Account requirements
- Required permissions
- API version compatibility

## Setup Instructions

### 1. Obtain Credentials
Step-by-step guide for getting API credentials.

### 2. Configure in Reqarchitect
1. Navigate to Integrations → Connectors
2. Click "Add Connector" → Select [Connector Name]
3. Enter your credentials
4. Test connection

### 3. Configure Import Settings
- Select which entities to import
- Configure field mappings (if custom needed)
- Set sync schedule

## Supported Entities

| Entity Type | Reqarchitect Type | Notes |
|-------------|-------------------|-------|
| ... | ... | ... |

## Field Mappings

### [Entity Type 1]
| Source Field | Reqarchitect Field | Transformation |
|--------------|-------------------|----------------|
| ... | ... | ... |

## Troubleshooting

### Common Errors

**Error**: Authentication failed
**Solution**: Check credentials and permissions

**Error**: Rate limit exceeded
**Solution**: Reduce sync frequency or contact support

## FAQ

**Q**: How often does sync run?
**A**: Configurable (hourly, daily, weekly)

**Q**: Can I customize field mappings?
**A**: Yes, via advanced settings

## Support
- Documentation: https://docs.reqarchitect.com/connectors/[id]
- Community: https://community.reqarchitect.com
- Email: support@reqarchitect.com
```

---

## 🚀 Quick Start Example

Here's how a user would use connectors:

```typescript
// Example: Import from ServiceNow

// 1. User clicks "Add Connector" in UI
// 2. Selects ServiceNow
// 3. Enters instance and credentials
// 4. System executes this flow:

const connector = connectorRegistry.get('servicenow');

// Connect
const connection = await connector.connect({
  organizationId: 'org-123',
  name: 'My ServiceNow',
  authentication: {
    instance: 'mycompany',
    authType: 'oauth',
    clientId: '...',
    clientSecret: '...',
  },
  settings: {},
});

// Test connection
const testResult = await connector.testConnection();
if (!testResult.success) {
  throw new Error('Connection failed');
}

// Discover available data
const discovery = await connector.discover();
console.log(`Found ${discovery.summary.totalEntities} entities`);

// Import applications
const importResult = await importPipeline.executeImport({
  organizationId: 'org-123',
  userId: 'user-123',
  connector,
  mapping: connector.mappings.find(m => m.targetType === 'APPLICATION_COMPONENT')!,
  options: {
    deduplicationStrategy: 'skip',
    failOnError: false,
  },
});

console.log(`Imported ${importResult.imported} applications`);
```

---

## 📊 Connector Priority Matrix

Use this to prioritize connector development:

| Connector | Customer Requests | Market Share | Implementation Effort | Priority Score |
|-----------|-------------------|--------------|----------------------|----------------|
| ServiceNow | 45 | 35% | High | **P0** |
| Jira | 42 | 60% | Medium | **P0** |
| Azure AD | 38 | 45% | Medium | **P0** |
| AWS | 36 | 65% | High | **P0** |
| Salesforce | 32 | 40% | High | **P0** |
| ... | ... | ... | ... | ... |

Priority Formula: `(Requests * 0.4) + (MarketShare * 0.4) - (Effort * 0.2)`

---

**Document End**

This implementation guide provides everything needed to build 100+ production-ready connectors. Use the base classes, follow the patterns, and leverage the code generator to accelerate development.

For specific connector implementations, reference the ServiceNow and Azure AD examples as templates and adapt for each system's API.

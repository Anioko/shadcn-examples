# LLM Implementation Guide: Context Graph & Relationship Intelligence

**Document Type**: LLM-Optimized Implementation Guide  
**Source PRD**: 0003-prd-context-graph-relationship-intelligence.md  
**Purpose**: Guide AI assistants in implementing the context graph system  
**Last Updated**: 2025-10-23

---

## 🎯 Quick Reference for LLMs

### What This System Does

The Context Graph system transforms Reqarchitect into an intelligent knowledge graph that:
1. Models relationships between all 198+ entity types
2. Provides graph query APIs (GraphQL + Cypher-style)
3. Calculates impact analysis for proposed changes
4. Offers AI-powered relationship recommendations
5. Computes relationship analytics (centrality, influence, dependencies)

### Key Implementation Principles

- **Start Simple**: Begin with PostgreSQL storage, migrate to Neo4j if needed
- **API-First**: GraphQL primary, REST secondary
- **Performance Matters**: Target <500ms for most queries
- **AI is Additive**: Start with rule-based, add ML gradually
- **Security Always**: Enforce RBAC at relationship level

---

## 📐 Core Data Models

### Relationship Model (PostgreSQL + Prisma)

```prisma
// Add to schema.prisma
model Relationship {
  id                String   @id @default(cuid())
  
  // Core fields
  type              RelationshipType
  sourceEntityType  EntityType
  sourceEntityId    String
  targetEntityType  EntityType
  targetEntityId    String
  
  // Semantic fields
  strength          Int      @default(50) // 0-100
  confidence        Int      @default(100) // 0-100 (for AI suggestions)
  bidirectional     Boolean  @default(false)
  
  // Metadata
  description       String?
  tags              String[] // Array of tags
  properties        Json?    // Custom properties
  
  // Temporal
  validFrom         DateTime?
  validUntil        DateTime?
  
  // Provenance
  source            RelationshipSource @default(MANUAL)
  verifiedBy        String?
  verifiedAt        DateTime?
  
  // Multi-tenancy
  organizationId    String
  organization      Organization @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  
  // Audit
  createdAt         DateTime @default(now())
  createdBy         String
  createdByUser     User     @relation("RelationshipCreator", fields: [createdBy], references: [id])
  updatedAt         DateTime @updatedAt
  updatedBy         String?
  
  @@index([sourceEntityType, sourceEntityId])
  @@index([targetEntityType, targetEntityId])
  @@index([type])
  @@index([organizationId])
  @@index([validFrom, validUntil])
  @@index([source])
  @@map("relationships")
}

enum RelationshipType {
  SUPPORTS
  DEPENDS_ON
  IMPLEMENTS
  OWNS
  CONTRIBUTES_TO
  CONFLICTS_WITH
  ENABLES
  SERVES
  REQUIRES
  REALIZES
  AGGREGATES
  SPECIALIZES
  FLOWS_TO
  TRIGGERS
  MITIGATES
  VALIDATES
  USES
  ASSOCIATES
}

enum RelationshipSource {
  MANUAL       // User created
  AI_SUGGESTED // AI recommended
  IMPORTED     // Bulk import
  INFERRED     // System inferred
  MIGRATED     // Legacy data
}

enum EntityType {
  // Business Layer
  BUSINESS_ACTOR
  BUSINESS_ROLE
  BUSINESS_PROCESS
  BUSINESS_SERVICE
  CAPABILITY
  VALUE_STREAM
  
  // Application Layer
  APPLICATION_COMPONENT
  APPLICATION_SERVICE
  APPLICATION_INTERFACE
  DATA_OBJECT
  
  // Technology Layer
  TECHNOLOGY_COMPONENT
  NODE
  DEVICE
  INFRASTRUCTURE
  
  // Strategy Layer
  GOAL
  DRIVER
  REQUIREMENT
  COURSE_OF_ACTION
  
  // Portfolio Layer
  INITIATIVE
  PROJECT
  EPIC
  FEATURE
  WORK_PACKAGE
  
  // CRM Layer
  CONTACT
  SALES_OPPORTUNITY
  ACTIVITY
  
  // Security Layer
  SECURITY_CONTROL
  RISK
  COMPLIANCE_ASSESSMENT
  POLICY
  
  // Add all other types from existing schema...
}
```

### In-Memory Graph Structure

```typescript
// lib/graph/types.ts

export interface GraphNode {
  id: string;
  type: EntityType;
  name: string;
  properties: Record<string, any>;
  organizationId: string;
}

export interface GraphEdge {
  id: string;
  type: RelationshipType;
  source: string; // Node ID
  target: string; // Node ID
  strength: number;
  confidence: number;
  bidirectional: boolean;
  metadata: RelationshipMetadata;
}

export interface GraphPath {
  nodes: GraphNode[];
  edges: GraphEdge[];
  length: number;
  totalStrength: number;
}

export interface RelationshipMetadata {
  description?: string;
  tags?: string[];
  validFrom?: Date;
  validUntil?: Date;
  source: RelationshipSource;
  properties?: Record<string, any>;
}

export interface ImpactAnalysisResult {
  entityId: string;
  changeType: ChangeType;
  impactScore: number; // 0-100
  affectedEntities: AffectedEntity[];
  riskAssessment: RiskAssessment;
  dependencyChain: DependencyChain;
  timeline: TimelineEstimate;
  stakeholders: Stakeholder[];
}

export interface AffectedEntity {
  entityType: EntityType;
  entityId: string;
  entityName: string;
  impactLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  impactReason: string;
  distance: number; // Hops from changed entity
  relationshipPath: GraphEdge[];
  suggestedActions: string[];
}

export interface CentralityMetrics {
  entityId: string;
  degreeGentrality: {
    inDegree: number;
    outDegree: number;
    totalDegree: number;
    normalizedScore: number; // 0-100
  };
  betweennessCentrality: {
    score: number;
    criticalPaths: number;
    normalizedScore: number;
  };
  closenessCentrality: {
    score: number;
    averagePathLength: number;
    normalizedScore: number;
  };
  eigenvectorCentrality: {
    score: number;
    normalizedScore: number;
  };
  pageRank: {
    score: number;
    normalizedScore: number;
  };
  strategicValue: number; // Composite score
}

export interface RelationshipRecommendation {
  id: string;
  confidence: number; // 0-100
  relationshipType: RelationshipType;
  sourceEntity: GraphNode;
  targetEntity: GraphNode;
  reasoning: {
    algorithm: 'pattern_matching' | 'collaborative_filtering' | 'semantic_similarity' | 'rule_based';
    evidence: string[];
    similarExamples: GraphEdge[];
  };
  impact: {
    strategicValue: number;
    completeness: number;
    consistency: number;
  };
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  suggestedProperties?: Record<string, any>;
}
```

---

## 🔧 Core Implementation Files

### 1. Graph Repository (Database Access Layer)

```typescript
// lib/graph/relationship-repository.ts

import { prisma } from '@/lib/db';
import { Relationship, RelationshipType, EntityType } from '@prisma/client';

export class RelationshipRepository {
  /**
   * Create a new relationship
   */
  async create(data: {
    type: RelationshipType;
    sourceEntityType: EntityType;
    sourceEntityId: string;
    targetEntityType: EntityType;
    targetEntityId: string;
    strength?: number;
    confidence?: number;
    bidirectional?: boolean;
    description?: string;
    tags?: string[];
    properties?: any;
    validFrom?: Date;
    validUntil?: Date;
    organizationId: string;
    createdBy: string;
  }): Promise<Relationship> {
    // Validate relationship type is valid for entity types
    this.validateRelationshipType(data.type, data.sourceEntityType, data.targetEntityType);
    
    // Check for circular dependencies if applicable
    if (this.isHierarchicalRelationship(data.type)) {
      await this.checkCircularDependency(
        data.sourceEntityId,
        data.targetEntityId,
        data.type
      );
    }
    
    return prisma.relationship.create({
      data: {
        ...data,
        strength: data.strength ?? 50,
        confidence: data.confidence ?? 100,
        bidirectional: data.bidirectional ?? false,
      },
    });
  }

  /**
   * Get all relationships for an entity
   */
  async getRelationships(
    entityType: EntityType,
    entityId: string,
    options?: {
      relationshipTypes?: RelationshipType[];
      direction?: 'outgoing' | 'incoming' | 'both';
      includeInactive?: boolean;
    }
  ): Promise<Relationship[]> {
    const now = new Date();
    const direction = options?.direction ?? 'both';
    
    const where: any = {
      organizationId: await this.getOrganizationId(entityId),
    };

    // Apply direction filter
    if (direction === 'outgoing') {
      where.sourceEntityType = entityType;
      where.sourceEntityId = entityId;
    } else if (direction === 'incoming') {
      where.targetEntityType = entityType;
      where.targetEntityId = entityId;
    } else {
      where.OR = [
        { sourceEntityType: entityType, sourceEntityId: entityId },
        { targetEntityType: entityType, targetEntityId: entityId },
      ];
    }

    // Apply relationship type filter
    if (options?.relationshipTypes?.length) {
      where.type = { in: options.relationshipTypes };
    }

    // Apply temporal filter
    if (!options?.includeInactive) {
      where.AND = [
        {
          OR: [
            { validFrom: null },
            { validFrom: { lte: now } },
          ],
        },
        {
          OR: [
            { validUntil: null },
            { validUntil: { gte: now } },
          ],
        },
      ];
    }

    return prisma.relationship.findMany({ where });
  }

  /**
   * Get related entities (traverse one hop)
   */
  async getRelatedEntities(
    entityType: EntityType,
    entityId: string,
    options?: {
      relationshipTypes?: RelationshipType[];
      targetEntityTypes?: EntityType[];
      limit?: number;
    }
  ): Promise<Array<{ entity: any; relationship: Relationship }>> {
    const relationships = await this.getRelationships(entityType, entityId, {
      relationshipTypes: options?.relationshipTypes,
    });

    const results: Array<{ entity: any; relationship: Relationship }> = [];

    for (const rel of relationships) {
      const isSource = rel.sourceEntityType === entityType && rel.sourceEntityId === entityId;
      const targetType = isSource ? rel.targetEntityType : rel.sourceEntityType;
      const targetId = isSource ? rel.targetEntityId : rel.sourceEntityId;

      // Filter by target entity type if specified
      if (options?.targetEntityTypes && !options.targetEntityTypes.includes(targetType)) {
        continue;
      }

      // Fetch the actual entity
      const entity = await this.fetchEntity(targetType, targetId);
      if (entity) {
        results.push({ entity, relationship: rel });
      }

      // Respect limit
      if (options?.limit && results.length >= options.limit) {
        break;
      }
    }

    return results;
  }

  /**
   * Check if a relationship would create a circular dependency
   */
  private async checkCircularDependency(
    sourceId: string,
    targetId: string,
    relationshipType: RelationshipType
  ): Promise<void> {
    // Use BFS to check if there's already a path from target to source
    const visited = new Set<string>();
    const queue: string[] = [targetId];

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      
      if (currentId === sourceId) {
        throw new Error('Creating this relationship would create a circular dependency');
      }

      if (visited.has(currentId)) {
        continue;
      }
      visited.add(currentId);

      // Get outgoing relationships of the same type
      const relationships = await prisma.relationship.findMany({
        where: {
          sourceEntityId: currentId,
          type: relationshipType,
        },
      });

      for (const rel of relationships) {
        queue.push(rel.targetEntityId);
      }
    }
  }

  /**
   * Validate relationship type is appropriate for entity types
   */
  private validateRelationshipType(
    relType: RelationshipType,
    sourceType: EntityType,
    targetType: EntityType
  ): void {
    const validCombinations: Record<RelationshipType, Array<[EntityType, EntityType]>> = {
      SUPPORTS: [
        ['APPLICATION_COMPONENT', 'CAPABILITY'],
        ['APPLICATION_SERVICE', 'BUSINESS_SERVICE'],
      ],
      DEPENDS_ON: [
        ['INITIATIVE', 'CAPABILITY'],
        ['APPLICATION_COMPONENT', 'APPLICATION_COMPONENT'],
      ],
      IMPLEMENTS: [
        ['APPLICATION_COMPONENT', 'REQUIREMENT'],
        ['WORK_PACKAGE', 'FEATURE'],
      ],
      // Add more validation rules...
    };

    // For now, allow all combinations (can be restricted later)
    // In production, implement strict validation based on validCombinations
  }

  /**
   * Determine if relationship type is hierarchical (can create cycles)
   */
  private isHierarchicalRelationship(type: RelationshipType): boolean {
    return [
      'DEPENDS_ON',
      'AGGREGATES',
      'SPECIALIZES',
      'FLOWS_TO',
    ].includes(type);
  }

  /**
   * Fetch entity from appropriate table based on type
   */
  private async fetchEntity(type: EntityType, id: string): Promise<any> {
    // Map entity type to Prisma model
    const modelMap: Record<EntityType, any> = {
      CAPABILITY: prisma.capability,
      APPLICATION_COMPONENT: prisma.applicationComponent,
      INITIATIVE: prisma.initiative,
      // Add all other mappings...
    };

    const model = modelMap[type];
    if (!model) {
      console.warn(`Unknown entity type: ${type}`);
      return null;
    }

    return model.findUnique({ where: { id } });
  }

  /**
   * Get organization ID for an entity
   */
  private async getOrganizationId(entityId: string): Promise<string> {
    // Try to find in various tables (can be optimized with a unified approach)
    // For now, assume we have a way to lookup organization
    return 'org-id'; // Placeholder
  }
}
```

### 2. Graph Builder (In-Memory Graph)

```typescript
// lib/graph/entity-graph.ts

import { GraphNode, GraphEdge, GraphPath } from './types';
import { RelationshipRepository } from './relationship-repository';

export class EntityGraph {
  private nodes: Map<string, GraphNode> = new Map();
  private edges: Map<string, GraphEdge> = new Map();
  private adjacencyList: Map<string, string[]> = new Map();
  private reverseAdjacencyList: Map<string, string[]> = new Map();
  
  private repository: RelationshipRepository;
  private organizationId: string;

  constructor(organizationId: string) {
    this.repository = new RelationshipRepository();
    this.organizationId = organizationId;
  }

  /**
   * Build graph from database relationships
   */
  async build(): Promise<void> {
    console.log('Building graph for organization:', this.organizationId);
    
    // Fetch all relationships for this organization
    const relationships = await prisma.relationship.findMany({
      where: { organizationId: this.organizationId },
    });

    console.log(`Loaded ${relationships.length} relationships`);

    // Build graph structure
    for (const rel of relationships) {
      // Create nodes if not exists
      if (!this.nodes.has(rel.sourceEntityId)) {
        await this.addNodeFromEntity(rel.sourceEntityType, rel.sourceEntityId);
      }
      if (!this.nodes.has(rel.targetEntityId)) {
        await this.addNodeFromEntity(rel.targetEntityType, rel.targetEntityId);
      }

      // Create edge
      const edge: GraphEdge = {
        id: rel.id,
        type: rel.type,
        source: rel.sourceEntityId,
        target: rel.targetEntityId,
        strength: rel.strength,
        confidence: rel.confidence,
        bidirectional: rel.bidirectional,
        metadata: {
          description: rel.description ?? undefined,
          tags: rel.tags,
          validFrom: rel.validFrom ?? undefined,
          validUntil: rel.validUntil ?? undefined,
          source: rel.source,
          properties: rel.properties,
        },
      };

      this.edges.set(rel.id, edge);

      // Update adjacency lists
      this.addToAdjacencyList(rel.sourceEntityId, rel.targetEntityId);
      this.addToReverseAdjacencyList(rel.targetEntityId, rel.sourceEntityId);

      if (rel.bidirectional) {
        this.addToAdjacencyList(rel.targetEntityId, rel.sourceEntityId);
        this.addToReverseAdjacencyList(rel.sourceEntityId, rel.targetEntityId);
      }
    }

    console.log(`Graph built: ${this.nodes.size} nodes, ${this.edges.size} edges`);
  }

  /**
   * Find shortest path between two entities
   */
  findPath(fromId: string, toId: string, maxDepth: number = 5): GraphPath | null {
    if (!this.nodes.has(fromId) || !this.nodes.has(toId)) {
      return null;
    }

    // BFS to find shortest path
    const queue: Array<{ nodeId: string; path: string[]; edgePath: string[] }> = [
      { nodeId: fromId, path: [fromId], edgePath: [] },
    ];
    const visited = new Set<string>([fromId]);

    while (queue.length > 0) {
      const { nodeId, path, edgePath } = queue.shift()!;

      if (path.length > maxDepth) {
        continue;
      }

      if (nodeId === toId) {
        // Found path
        const nodes = path.map(id => this.nodes.get(id)!);
        const edges = edgePath.map(id => this.edges.get(id)!);
        const totalStrength = edges.reduce((sum, e) => sum + e.strength, 0) / edges.length;

        return {
          nodes,
          edges,
          length: edges.length,
          totalStrength,
        };
      }

      // Explore neighbors
      const neighbors = this.adjacencyList.get(nodeId) || [];
      for (const neighborId of neighbors) {
        if (!visited.has(neighborId)) {
          visited.add(neighborId);
          
          // Find edge ID
          const edgeId = this.findEdgeId(nodeId, neighborId);
          
          queue.push({
            nodeId: neighborId,
            path: [...path, neighborId],
            edgePath: edgeId ? [...edgePath, edgeId] : edgePath,
          });
        }
      }
    }

    return null; // No path found
  }

  /**
   * Find all entities connected within N hops
   */
  findConnected(
    nodeId: string,
    relationshipTypes: RelationshipType[],
    depth: number
  ): GraphNode[] {
    if (!this.nodes.has(nodeId)) {
      return [];
    }

    const connected = new Set<string>();
    const queue: Array<{ id: string; currentDepth: number }> = [
      { id: nodeId, currentDepth: 0 },
    ];
    const visited = new Set<string>([nodeId]);

    while (queue.length > 0) {
      const { id, currentDepth } = queue.shift()!;

      if (currentDepth >= depth) {
        continue;
      }

      const neighbors = this.adjacencyList.get(id) || [];
      for (const neighborId of neighbors) {
        // Check if edge matches relationship type filter
        const edgeId = this.findEdgeId(id, neighborId);
        if (edgeId) {
          const edge = this.edges.get(edgeId);
          if (edge && relationshipTypes.includes(edge.type)) {
            connected.add(neighborId);
            
            if (!visited.has(neighborId)) {
              visited.add(neighborId);
              queue.push({ id: neighborId, currentDepth: currentDepth + 1 });
            }
          }
        }
      }
    }

    return Array.from(connected).map(id => this.nodes.get(id)!);
  }

  /**
   * Calculate degree centrality for a node
   */
  calculateDegreeCentrality(nodeId: string): number {
    if (!this.nodes.has(nodeId)) {
      return 0;
    }

    const outDegree = (this.adjacencyList.get(nodeId) || []).length;
    const inDegree = (this.reverseAdjacencyList.get(nodeId) || []).length;
    const totalDegree = outDegree + inDegree;

    // Normalize by maximum possible degree
    const maxDegree = this.nodes.size - 1;
    return maxDegree > 0 ? (totalDegree / maxDegree) * 100 : 0;
  }

  /**
   * Calculate betweenness centrality (simplified)
   */
  calculateBetweennessCentrality(nodeId: string): number {
    if (!this.nodes.has(nodeId)) {
      return 0;
    }

    let pathsThrough = 0;
    let totalPaths = 0;

    // For each pair of other nodes, check if shortest path goes through this node
    const allNodeIds = Array.from(this.nodes.keys()).filter(id => id !== nodeId);
    
    for (let i = 0; i < allNodeIds.length; i++) {
      for (let j = i + 1; j < allNodeIds.length; j++) {
        const path = this.findPath(allNodeIds[i], allNodeIds[j], 10);
        if (path) {
          totalPaths++;
          if (path.nodes.some(n => n.id === nodeId)) {
            pathsThrough++;
          }
        }
      }
    }

    return totalPaths > 0 ? (pathsThrough / totalPaths) * 100 : 0;
  }

  /**
   * Private helper methods
   */
  private async addNodeFromEntity(type: EntityType, id: string): Promise<void> {
    // Fetch entity details (implement based on entity type)
    const entity = await this.repository['fetchEntity'](type, id);
    
    if (entity) {
      this.nodes.set(id, {
        id,
        type,
        name: entity.name || entity.title || id,
        properties: entity,
        organizationId: this.organizationId,
      });
    }
  }

  private addToAdjacencyList(from: string, to: string): void {
    if (!this.adjacencyList.has(from)) {
      this.adjacencyList.set(from, []);
    }
    this.adjacencyList.get(from)!.push(to);
  }

  private addToReverseAdjacencyList(to: string, from: string): void {
    if (!this.reverseAdjacencyList.has(to)) {
      this.reverseAdjacencyList.set(to, []);
    }
    this.reverseAdjacencyList.get(to)!.push(from);
  }

  private findEdgeId(from: string, to: string): string | null {
    for (const [edgeId, edge] of this.edges.entries()) {
      if (edge.source === from && edge.target === to) {
        return edgeId;
      }
      if (edge.bidirectional && edge.source === to && edge.target === from) {
        return edgeId;
      }
    }
    return null;
  }
}
```

### 3. Impact Analysis Engine

```typescript
// lib/graph/impact-analysis-engine.ts

import { EntityGraph } from './entity-graph';
import { ImpactAnalysisResult, AffectedEntity, ChangeType } from './types';

export class ImpactAnalysisEngine {
  private graph: EntityGraph;

  constructor(graph: EntityGraph) {
    this.graph = graph;
  }

  /**
   * Analyze impact of a proposed change
   */
  async analyzeImpact(
    entityId: string,
    changeType: ChangeType,
    depth: number = 5
  ): Promise<ImpactAnalysisResult> {
    // Find all entities that depend on this entity
    const dependents = this.graph.findConnected(
      entityId,
      ['DEPENDS_ON', 'REQUIRES', 'USES'],
      depth
    );

    // Calculate impact for each dependent
    const affectedEntities: AffectedEntity[] = dependents.map(entity => {
      const path = this.graph.findPath(entityId, entity.id, depth);
      const distance = path?.length || 0;
      
      return {
        entityType: entity.type,
        entityId: entity.id,
        entityName: entity.name,
        impactLevel: this.calculateImpactLevel(distance, changeType),
        impactReason: this.generateImpactReason(entity, changeType, distance),
        distance,
        relationshipPath: path?.edges || [],
        suggestedActions: this.generateSuggestedActions(entity, changeType),
      };
    });

    // Calculate overall impact score
    const impactScore = this.calculateImpactScore(affectedEntities);

    // Assess risk
    const riskAssessment = this.assessRisk(affectedEntities, changeType);

    // Identify stakeholders
    const stakeholders = await this.identifyStakeholders(affectedEntities);

    return {
      entityId,
      changeType,
      impactScore,
      affectedEntities,
      riskAssessment,
      dependencyChain: {
        depth: Math.max(...affectedEntities.map(e => e.distance), 0),
        breadth: affectedEntities.length,
        criticalPathEntities: affectedEntities
          .filter(e => e.impactLevel === 'CRITICAL')
          .map(e => e.entityId),
      },
      timeline: {
        estimatedEffort: this.estimateEffort(affectedEntities),
        estimatedDuration: this.estimateDuration(affectedEntities),
        parallelizable: this.assessParallelizability(affectedEntities),
      },
      approvalRequired: impactScore > 70,
      stakeholders,
    };
  }

  /**
   * Calculate impact level based on distance and change type
   */
  private calculateImpactLevel(
    distance: number,
    changeType: ChangeType
  ): 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' {
    if (changeType === 'DELETE') {
      if (distance <= 1) return 'CRITICAL';
      if (distance <= 2) return 'HIGH';
      if (distance <= 3) return 'MEDIUM';
      return 'LOW';
    }

    if (changeType === 'DEPRECATE') {
      if (distance <= 1) return 'HIGH';
      if (distance <= 2) return 'MEDIUM';
      return 'LOW';
    }

    // MODIFY, MOVE, etc.
    if (distance <= 1) return 'MEDIUM';
    return 'LOW';
  }

  /**
   * Generate human-readable impact reason
   */
  private generateImpactReason(
    entity: GraphNode,
    changeType: ChangeType,
    distance: number
  ): string {
    const action = changeType === 'DELETE' ? 'deletion' : 
                   changeType === 'DEPRECATE' ? 'deprecation' : 'modification';
    
    if (distance === 1) {
      return `Directly depends on the entity being ${action}d`;
    } else {
      return `Indirectly affected through ${distance}-hop dependency chain`;
    }
  }

  /**
   * Generate suggested actions for affected entity
   */
  private generateSuggestedActions(
    entity: GraphNode,
    changeType: ChangeType
  ): string[] {
    if (changeType === 'DELETE') {
      return [
        `Remove dependency on deleted entity`,
        `Find alternative ${entity.type.toLowerCase()}`,
        `Update documentation and notify stakeholders`,
      ];
    }

    if (changeType === 'DEPRECATE') {
      return [
        `Plan migration timeline`,
        `Identify replacement ${entity.type.toLowerCase()}`,
        `Update dependencies gradually`,
      ];
    }

    return [
      `Review changes and assess compatibility`,
      `Test integration after modification`,
    ];
  }

  /**
   * Calculate overall impact score (0-100)
   */
  private calculateImpactScore(affectedEntities: AffectedEntity[]): number {
    if (affectedEntities.length === 0) return 0;

    const levelScores = {
      CRITICAL: 100,
      HIGH: 75,
      MEDIUM: 50,
      LOW: 25,
    };

    const scores = affectedEntities.map(e => levelScores[e.impactLevel]);
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    
    // Factor in breadth (more affected entities = higher impact)
    const breadthFactor = Math.min(affectedEntities.length / 10, 1);
    
    return Math.round(avgScore * (1 + breadthFactor * 0.3));
  }

  /**
   * Assess risk of the change
   */
  private assessRisk(
    affectedEntities: AffectedEntity[],
    changeType: ChangeType
  ): {
    severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    probability: number;
    businessImpact: string[];
    technicalImpact: string[];
    mitigationStrategies: string[];
  } {
    const criticalCount = affectedEntities.filter(e => e.impactLevel === 'CRITICAL').length;
    const highCount = affectedEntities.filter(e => e.impactLevel === 'HIGH').length;

    let severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    if (criticalCount > 0) severity = 'CRITICAL';
    else if (highCount > 3) severity = 'HIGH';
    else if (highCount > 0) severity = 'MEDIUM';
    else severity = 'LOW';

    return {
      severity,
      probability: changeType === 'DELETE' ? 90 : 70,
      businessImpact: this.generateBusinessImpact(affectedEntities),
      technicalImpact: this.generateTechnicalImpact(affectedEntities),
      mitigationStrategies: this.generateMitigationStrategies(severity, affectedEntities),
    };
  }

  private generateBusinessImpact(affectedEntities: AffectedEntity[]): string[] {
    const impacts: string[] = [];
    
    if (affectedEntities.some(e => e.entityType === 'INITIATIVE')) {
      impacts.push('Strategic initiatives may be delayed or blocked');
    }
    
    if (affectedEntities.some(e => e.entityType === 'CAPABILITY')) {
      impacts.push('Business capabilities may lose technical support');
    }

    if (affectedEntities.length > 10) {
      impacts.push('Widespread changes required across multiple systems');
    }

    return impacts;
  }

  private generateTechnicalImpact(affectedEntities: AffectedEntity[]): string[] {
    return [
      `${affectedEntities.length} systems require updates`,
      'Integration testing required across all affected systems',
      'Potential for service disruptions during transition',
    ];
  }

  private generateMitigationStrategies(
    severity: string,
    affectedEntities: AffectedEntity[]
  ): string[] {
    const strategies: string[] = [
      'Create detailed migration plan with rollback procedures',
      'Implement changes in stages with monitoring at each step',
      'Coordinate with all affected teams before execution',
    ];

    if (severity === 'CRITICAL' || severity === 'HIGH') {
      strategies.push(
        'Conduct thorough impact analysis with affected stakeholders',
        'Establish war room for change execution',
        'Prepare communication plan for all stakeholders'
      );
    }

    return strategies;
  }

  private estimateEffort(affectedEntities: AffectedEntity[]): number {
    // Rough estimate: 4 hours per CRITICAL, 2 hours per HIGH, 1 hour per MEDIUM, 0.5 per LOW
    const effortMap = { CRITICAL: 4, HIGH: 2, MEDIUM: 1, LOW: 0.5 };
    return affectedEntities.reduce(
      (total, e) => total + effortMap[e.impactLevel],
      0
    );
  }

  private estimateDuration(affectedEntities: AffectedEntity[]): number {
    // Assume 6 hours of productive work per day
    const effort = this.estimateEffort(affectedEntities);
    return Math.ceil(effort / 6);
  }

  private assessParallelizability(affectedEntities: AffectedEntity[]): boolean {
    // If entities are at similar depths, work can be parallelized
    const depths = affectedEntities.map(e => e.distance);
    const maxDepth = Math.max(...depths);
    const minDepth = Math.min(...depths);
    return maxDepth - minDepth <= 2;
  }

  private async identifyStakeholders(affectedEntities: AffectedEntity[]): Promise<Array<{
    userId: string;
    role: string;
    impactReason: string;
  }>> {
    // This would query ownership information from entities
    // For now, return placeholder
    return [];
  }
}
```

### 4. GraphQL API

```typescript
// app/api/graphql/schema.ts

import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type Entity {
    id: ID!
    type: EntityType!
    name: String!
    properties: JSON!
    relationships(
      types: [RelationshipType!]
      direction: RelationshipDirection
      entityTypes: [EntityType!]
      depth: Int = 1
      limit: Int = 100
    ): [Relationship!]!
    relatedEntities(
      relationshipTypes: [RelationshipType!]
      entityTypes: [EntityType!]
      depth: Int = 1
      limit: Int = 100
    ): [Entity!]!
    impactAnalysis(
      changeType: ChangeType!
      depth: Int = 5
    ): ImpactAnalysisResult!
    centralityMetrics: CentralityMetrics!
  }

  type Relationship {
    id: ID!
    type: RelationshipType!
    source: Entity!
    target: Entity!
    strength: Float!
    confidence: Float!
    bidirectional: Boolean!
    metadata: RelationshipMetadata!
    properties: JSON
  }

  type RelationshipMetadata {
    description: String
    tags: [String!]
    validFrom: DateTime
    validUntil: DateTime
    source: RelationshipSource!
    createdAt: DateTime!
    createdBy: String!
  }

  type ImpactAnalysisResult {
    entityId: ID!
    changeType: ChangeType!
    impactScore: Float!
    affectedEntities: [AffectedEntity!]!
    riskAssessment: RiskAssessment!
    dependencyChain: DependencyChain!
    timeline: TimelineEstimate!
    stakeholders: [Stakeholder!]!
    approvalRequired: Boolean!
  }

  type AffectedEntity {
    entityType: EntityType!
    entityId: ID!
    entityName: String!
    impactLevel: ImpactLevel!
    impactReason: String!
    distance: Int!
    relationshipPath: [Relationship!]!
    suggestedActions: [String!]!
  }

  type CentralityMetrics {
    entityId: ID!
    degreeGentrality: DegreeCentrality!
    betweennessCentrality: BetweennessCentrality!
    closenessCentrality: ClosenessCentrality!
    strategicValue: Float!
  }

  type DegreeCentrality {
    inDegree: Int!
    outDegree: Int!
    totalDegree: Int!
    normalizedScore: Float!
  }

  type Query {
    entity(id: ID!): Entity
    entities(
      types: [EntityType!]
      filters: JSON
      limit: Int = 100
      offset: Int = 0
    ): [Entity!]!
    
    relationship(id: ID!): Relationship
    relationships(
      sourceId: ID
      targetId: ID
      types: [RelationshipType!]
      limit: Int = 100
    ): [Relationship!]!
    
    findPath(
      fromId: ID!
      toId: ID!
      maxDepth: Int = 5
      relationshipTypes: [RelationshipType!]
    ): Path
    
    findConnectedEntities(
      entityId: ID!
      relationshipTypes: [RelationshipType!]
      depth: Int = 2
      entityTypes: [EntityType!]
      limit: Int = 100
    ): [Entity!]!
    
    analyzeImpact(
      entityId: ID!
      changeType: ChangeType!
      depth: Int = 5
    ): ImpactAnalysisResult!
    
    recommendRelationships(
      entityId: ID!
      limit: Int = 10
    ): [RelationshipRecommendation!]!
  }

  type Mutation {
    createRelationship(input: CreateRelationshipInput!): Relationship!
    updateRelationship(id: ID!, input: UpdateRelationshipInput!): Relationship!
    deleteRelationship(id: ID!): Boolean!
    bulkCreateRelationships(inputs: [CreateRelationshipInput!]!): [Relationship!]!
  }

  enum RelationshipType {
    SUPPORTS
    DEPENDS_ON
    IMPLEMENTS
    OWNS
    CONTRIBUTES_TO
    CONFLICTS_WITH
    ENABLES
    SERVES
    REQUIRES
    REALIZES
    AGGREGATES
    SPECIALIZES
    FLOWS_TO
    TRIGGERS
    MITIGATES
    VALIDATES
    USES
    ASSOCIATES
  }

  enum EntityType {
    CAPABILITY
    APPLICATION_COMPONENT
    INITIATIVE
    # ... add all entity types
  }

  enum ChangeType {
    DELETE
    DEPRECATE
    MODIFY
    MOVE
    REPLACE
    MERGE
    SPLIT
  }

  enum ImpactLevel {
    CRITICAL
    HIGH
    MEDIUM
    LOW
  }

  input CreateRelationshipInput {
    type: RelationshipType!
    sourceEntityType: EntityType!
    sourceEntityId: ID!
    targetEntityType: EntityType!
    targetEntityId: ID!
    strength: Int
    confidence: Int
    bidirectional: Boolean
    description: String
    tags: [String!]
    properties: JSON
  }

  scalar DateTime
  scalar JSON
`;

// app/api/graphql/resolvers.ts

import { EntityGraph } from '@/lib/graph/entity-graph';
import { ImpactAnalysisEngine } from '@/lib/graph/impact-analysis-engine';
import { RelationshipRepository } from '@/lib/graph/relationship-repository';

export const resolvers = {
  Query: {
    async entity(_: any, { id }: { id: string }, context: any) {
      const graph = new EntityGraph(context.organizationId);
      await graph.build();
      // Return entity from graph
      return { id, type: 'CAPABILITY', name: 'Example' }; // Implement properly
    },

    async analyzeImpact(
      _: any,
      { entityId, changeType, depth }: { entityId: string; changeType: string; depth: number },
      context: any
    ) {
      const graph = new EntityGraph(context.organizationId);
      await graph.build();
      
      const engine = new ImpactAnalysisEngine(graph);
      return engine.analyzeImpact(entityId, changeType as any, depth);
    },

    async findPath(
      _: any,
      { fromId, toId, maxDepth }: { fromId: string; toId: string; maxDepth: number },
      context: any
    ) {
      const graph = new EntityGraph(context.organizationId);
      await graph.build();
      return graph.findPath(fromId, toId, maxDepth);
    },
  },

  Mutation: {
    async createRelationship(_: any, { input }: { input: any }, context: any) {
      const repository = new RelationshipRepository();
      return repository.create({
        ...input,
        organizationId: context.organizationId,
        createdBy: context.userId,
      });
    },
  },

  Entity: {
    async relationships(entity: any, args: any, context: any) {
      const repository = new RelationshipRepository();
      return repository.getRelationships(entity.type, entity.id, args);
    },

    async centralityMetrics(entity: any, _args: any, context: any) {
      const graph = new EntityGraph(context.organizationId);
      await graph.build();
      
      const degreeScore = graph.calculateDegreeCentrality(entity.id);
      const betweennessScore = graph.calculateBetweennessCentrality(entity.id);
      
      return {
        entityId: entity.id,
        degreeGentrality: {
          totalDegree: 0, // Implement
          normalizedScore: degreeScore,
        },
        betweennessCentrality: {
          score: betweennessScore,
        },
        strategicValue: (degreeScore + betweennessScore) / 2,
      };
    },
  },
};
```

---

## 🎨 UI Components

### Graph Visualization Component

```typescript
// components/graph/graph-visualization.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

interface GraphVisualizationProps {
  nodes: Array<{ id: string; name: string; type: string }>;
  links: Array<{ source: string; target: string; type: string }>;
  onNodeClick?: (node: any) => void;
}

export function GraphVisualization({ nodes, links, onNodeClick }: GraphVisualizationProps) {
  const graphRef = useRef<any>();

  const graphData = {
    nodes: nodes.map(n => ({
      ...n,
      color: getColorByType(n.type),
    })),
    links: links.map(l => ({
      ...l,
      color: '#999',
    })),
  };

  useEffect(() => {
    // Fit graph to view on mount
    if (graphRef.current) {
      graphRef.current.zoomToFit(400);
    }
  }, []);

  return (
    <div className="w-full h-[600px] border rounded-lg bg-background">
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        nodeLabel="name"
        nodeAutoColorBy="type"
        linkDirectionalArrowLength={6}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.2}
        onNodeClick={onNodeClick}
        nodeCanvasObject={(node: any, ctx: any, globalScale: number) => {
          const label = node.name;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          
          // Draw circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI);
          ctx.fillStyle = node.color;
          ctx.fill();
          
          // Draw label
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#333';
          ctx.fillText(label, node.x, node.y + 10);
        }}
      />
    </div>
  );
}

function getColorByType(type: string): string {
  const colorMap: Record<string, string> = {
    CAPABILITY: '#3b82f6',
    APPLICATION_COMPONENT: '#10b981',
    INITIATIVE: '#f59e0b',
    BUSINESS_PROCESS: '#8b5cf6',
    // Add more mappings
  };
  return colorMap[type] || '#6b7280';
}
```

### Impact Analysis UI

```typescript
// components/graph/impact-analysis-panel.tsx

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle2, AlertTriangle, Info } from 'lucide-react';

interface ImpactAnalysisPanelProps {
  entityId: string;
  entityName: string;
  onClose: () => void;
}

export function ImpactAnalysisPanel({ entityId, entityName, onClose }: ImpactAnalysisPanelProps) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function runAnalysis(changeType: string) {
    setLoading(true);
    
    try {
      const response = await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            query AnalyzeImpact($entityId: ID!, $changeType: ChangeType!) {
              analyzeImpact(entityId: $entityId, changeType: $changeType, depth: 5) {
                impactScore
                affectedEntities {
                  entityName
                  entityType
                  impactLevel
                  impactReason
                  distance
                  suggestedActions
                }
                riskAssessment {
                  severity
                  probability
                  businessImpact
                  technicalImpact
                  mitigationStrategies
                }
              }
            }
          `,
          variables: { entityId, changeType },
        }),
      });

      const { data } = await response.json();
      setAnalysis(data.analyzeImpact);
    } finally {
      setLoading(false);
    }
  }

  const ImpactIcon = {
    CRITICAL: AlertCircle,
    HIGH: AlertTriangle,
    MEDIUM: Info,
    LOW: CheckCircle2,
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Impact Analysis: {entityName}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button onClick={() => runAnalysis('DELETE')} disabled={loading}>
              Analyze Deletion Impact
            </Button>
            <Button onClick={() => runAnalysis('DEPRECATE')} disabled={loading} variant="secondary">
              Analyze Deprecation Impact
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Impact Score: {analysis.impactScore}/100</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <strong>Risk Severity:</strong>{' '}
                  <Badge variant={
                    analysis.riskAssessment.severity === 'CRITICAL' ? 'destructive' :
                    analysis.riskAssessment.severity === 'HIGH' ? 'destructive' : 'secondary'
                  }>
                    {analysis.riskAssessment.severity}
                  </Badge>
                </div>
                <div>
                  <strong>Affected Entities:</strong> {analysis.affectedEntities.length}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Affected Entities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysis.affectedEntities.map((entity: any, idx: number) => {
                  const Icon = ImpactIcon[entity.impactLevel as keyof typeof ImpactIcon];
                  
                  return (
                    <div key={idx} className="border-l-4 pl-4" style={{
                      borderColor: entity.impactLevel === 'CRITICAL' ? '#ef4444' :
                                   entity.impactLevel === 'HIGH' ? '#f97316' :
                                   entity.impactLevel === 'MEDIUM' ? '#eab308' : '#22c55e'
                    }}>
                      <div className="flex items-start gap-2">
                        <Icon className="w-5 h-5 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-medium">{entity.entityName}</div>
                          <div className="text-sm text-muted-foreground">{entity.entityType}</div>
                          <div className="text-sm mt-1">{entity.impactReason}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Distance: {entity.distance} hops
                          </div>
                          {entity.suggestedActions.length > 0 && (
                            <div className="mt-2">
                              <div className="text-sm font-medium">Suggested Actions:</div>
                              <ul className="text-sm list-disc list-inside">
                                {entity.suggestedActions.map((action: string, i: number) => (
                                  <li key={i}>{action}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Mitigation Strategies</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-1">
                {analysis.riskAssessment.mitigationStrategies.map((strategy: string, idx: number) => (
                  <li key={idx}>{strategy}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
```

---

## 🚀 Implementation Checklist

### Phase 1: Foundation (Weeks 1-4)

- [ ] Add `Relationship` model to Prisma schema
- [ ] Create and run database migrations
- [ ] Implement `RelationshipRepository` class
- [ ] Implement `EntityGraph` class
- [ ] Create basic GraphQL schema
- [ ] Implement GraphQL resolvers for CRUD operations
- [ ] Write unit tests for repository
- [ ] Write unit tests for graph algorithms
- [ ] Create REST API endpoints
- [ ] Add API documentation

### Phase 2: Impact Analysis (Weeks 5-7)

- [ ] Implement `ImpactAnalysisEngine` class
- [ ] Create impact analysis algorithms
- [ ] Build what-if scenario support
- [ ] Implement blast radius calculation
- [ ] Create impact analysis GraphQL mutations
- [ ] Build impact analysis UI components
- [ ] Add impact visualization
- [ ] Write integration tests
- [ ] Create user documentation

### Phase 3: Analytics (Weeks 8-10)

- [ ] Implement centrality calculations
- [ ] Implement influence analysis
- [ ] Create dependency analysis algorithms
- [ ] Build strategic value scoring
- [ ] Create analytics dashboard UI
- [ ] Add graph statistics API
- [ ] Implement caching for analytics
- [ ] Write performance tests
- [ ] Create analytics documentation

### Phase 4: AI Recommendations (Weeks 11-13)

- [ ] Implement pattern matching algorithm
- [ ] Build anomaly detection rules
- [ ] Create recommendation scoring
- [ ] Implement feedback loop
- [ ] Build recommendation UI panel
- [ ] Add notification system
- [ ] Create recommendation API
- [ ] Write AI model tests
- [ ] Create AI documentation

### Phase 5: Advanced Querying (Weeks 14-16)

- [ ] Implement Cypher query parser
- [ ] Build query execution engine
- [ ] Create query builder UI
- [ ] Add query optimization
- [ ] Implement query templates
- [ ] Add query library
- [ ] Write query tests
- [ ] Create query documentation

### Phase 6: Polish & Launch (Weeks 17-18)

- [ ] Performance optimization
- [ ] Load testing
- [ ] Security audit
- [ ] Complete documentation
- [ ] User training materials
- [ ] Production deployment
- [ ] Monitoring setup
- [ ] Launch announcement

---

## 💡 Key Implementation Tips for LLMs

### 1. Start with the Repository Layer
Always implement data access first. The `RelationshipRepository` is your foundation.

### 2. Build the Graph Incrementally
Don't try to implement all graph algorithms at once. Start with:
1. Basic traversal (findPath)
2. Neighbor discovery (findConnected)
3. Degree centrality
4. Then add more complex algorithms

### 3. Cache Aggressively
Graph operations can be expensive. Use Redis caching for:
- Built graphs (15 min TTL)
- Computed metrics (1 hour TTL)
- Query results (5 min TTL)

### 4. Test with Real Data
Create realistic test datasets with:
- 100+ entities
- 500+ relationships
- Multiple entity types
- Various relationship patterns

### 5. Optimize Queries
- Use Prisma `include` strategically
- Batch database queries with DataLoader
- Implement pagination everywhere
- Add database indexes on foreign keys

### 6. Handle Errors Gracefully
- Validate relationship types
- Check for circular dependencies
- Prevent orphaned relationships
- Provide meaningful error messages

### 7. Document Everything
- Add JSDoc comments to all functions
- Include usage examples in comments
- Document time/space complexity
- Explain algorithm choices

### 8. Security First
- Always enforce RBAC
- Validate all inputs
- Prevent query injection
- Rate limit expensive operations
- Audit all relationship changes

---

## 📚 References

- Source PRD: `0003-prd-context-graph-relationship-intelligence.md`
- Related PRD: `0001-prd-achromatic-platform-capabilities.md`
- Prisma Schema: `packages/database/prisma/schema.prisma`
- GraphQL Docs: https://graphql.org/
- Neo4j Cypher: https://neo4j.com/docs/cypher-manual/current/

---

**Document End**

This implementation guide provides all the code structures, algorithms, and patterns needed to build the Context Graph system. Follow the phased approach and use the provided code as templates.

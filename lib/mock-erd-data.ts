import { WorkflowNode, WorkflowEdge } from "./types/workflow"

/**
 * Mock ERD Data for E-Commerce Database
 * Demonstrates comprehensive crow's foot notation relationships
 */

export const mockERDNodes: WorkflowNode[] = [
  // Users Table
  {
    id: "users-table",
    type: "table",
    label: "users",
    description: "System users and customer accounts",
    status: "active",
    position: { x: 50, y: 50 },
    metadata: {
      tableName: "users",
      schema: "public",
      width: 280,
      height: 220,
      columns: [
        { name: "id", type: "UUID", isPrimaryKey: true, isNullable: false },
        { name: "email", type: "VARCHAR(255)", isUnique: true, isNullable: false },
        { name: "username", type: "VARCHAR(100)", isUnique: true, isNullable: false },
        { name: "password_hash", type: "VARCHAR(255)", isNullable: false },
        { name: "first_name", type: "VARCHAR(100)", isNullable: true },
        { name: "last_name", type: "VARCHAR(100)", isNullable: true },
        { name: "created_at", type: "TIMESTAMP", isNullable: false, defaultValue: "NOW()" },
        { name: "updated_at", type: "TIMESTAMP", isNullable: false, defaultValue: "NOW()" },
      ],
    },
  },

  // Orders Table
  {
    id: "orders-table",
    type: "table",
    label: "orders",
    description: "Customer orders",
    status: "active",
    position: { x: 450, y: 50 },
    metadata: {
      tableName: "orders",
      schema: "public",
      width: 280,
      height: 240,
      columns: [
        { name: "id", type: "UUID", isPrimaryKey: true, isNullable: false },
        { name: "user_id", type: "UUID", isForeignKey: true, isNullable: false },
        { name: "order_number", type: "VARCHAR(50)", isUnique: true, isNullable: false },
        { name: "status", type: "VARCHAR(50)", isNullable: false, defaultValue: "'pending'" },
        { name: "total_amount", type: "DECIMAL(10,2)", isNullable: false },
        { name: "currency", type: "VARCHAR(3)", isNullable: false, defaultValue: "'USD'" },
        { name: "shipping_address_id", type: "UUID", isForeignKey: true, isNullable: true },
        { name: "created_at", type: "TIMESTAMP", isNullable: false, defaultValue: "NOW()" },
        { name: "updated_at", type: "TIMESTAMP", isNullable: false, defaultValue: "NOW()" },
      ],
    },
  },

  // Order Items Table (Junction table for many-to-many)
  {
    id: "order-items-table",
    type: "table",
    label: "order_items",
    description: "Items within each order",
    status: "active",
    position: { x: 850, y: 50 },
    metadata: {
      tableName: "order_items",
      schema: "public",
      width: 280,
      height: 220,
      columns: [
        { name: "id", type: "UUID", isPrimaryKey: true, isNullable: false },
        { name: "order_id", type: "UUID", isForeignKey: true, isNullable: false },
        { name: "product_id", type: "UUID", isForeignKey: true, isNullable: false },
        { name: "quantity", type: "INTEGER", isNullable: false },
        { name: "unit_price", type: "DECIMAL(10,2)", isNullable: false },
        { name: "discount", type: "DECIMAL(5,2)", isNullable: true, defaultValue: "0" },
        { name: "created_at", type: "TIMESTAMP", isNullable: false, defaultValue: "NOW()" },
      ],
    },
  },

  // Products Table
  {
    id: "products-table",
    type: "table",
    label: "products",
    description: "Product catalog",
    status: "active",
    position: { x: 850, y: 350 },
    metadata: {
      tableName: "products",
      schema: "public",
      width: 280,
      height: 260,
      columns: [
        { name: "id", type: "UUID", isPrimaryKey: true, isNullable: false },
        { name: "sku", type: "VARCHAR(100)", isUnique: true, isNullable: false },
        { name: "name", type: "VARCHAR(255)", isNullable: false },
        { name: "description", type: "TEXT", isNullable: true },
        { name: "price", type: "DECIMAL(10,2)", isNullable: false },
        { name: "category_id", type: "UUID", isForeignKey: true, isNullable: true },
        { name: "stock_quantity", type: "INTEGER", isNullable: false, defaultValue: "0" },
        { name: "is_active", type: "BOOLEAN", isNullable: false, defaultValue: "true" },
        { name: "created_at", type: "TIMESTAMP", isNullable: false, defaultValue: "NOW()" },
        { name: "updated_at", type: "TIMESTAMP", isNullable: false, defaultValue: "NOW()" },
      ],
    },
  },

  // Categories Table
  {
    id: "categories-table",
    type: "table",
    label: "categories",
    description: "Product categories (hierarchical)",
    status: "active",
    position: { x: 1200, y: 350 },
    metadata: {
      tableName: "categories",
      schema: "public",
      width: 280,
      height: 200,
      columns: [
        { name: "id", type: "UUID", isPrimaryKey: true, isNullable: false },
        { name: "name", type: "VARCHAR(100)", isNullable: false },
        { name: "slug", type: "VARCHAR(100)", isUnique: true, isNullable: false },
        { name: "parent_id", type: "UUID", isForeignKey: true, isNullable: true },
        { name: "description", type: "TEXT", isNullable: true },
        { name: "created_at", type: "TIMESTAMP", isNullable: false, defaultValue: "NOW()" },
        { name: "updated_at", type: "TIMESTAMP", isNullable: false, defaultValue: "NOW()" },
      ],
    },
  },

  // Addresses Table
  {
    id: "addresses-table",
    type: "table",
    label: "addresses",
    description: "User shipping/billing addresses",
    status: "active",
    position: { x: 50, y: 350 },
    metadata: {
      tableName: "addresses",
      schema: "public",
      width: 280,
      height: 260,
      columns: [
        { name: "id", type: "UUID", isPrimaryKey: true, isNullable: false },
        { name: "user_id", type: "UUID", isForeignKey: true, isNullable: false },
        { name: "type", type: "VARCHAR(20)", isNullable: false, defaultValue: "'shipping'" },
        { name: "street_address", type: "VARCHAR(255)", isNullable: false },
        { name: "city", type: "VARCHAR(100)", isNullable: false },
        { name: "state", type: "VARCHAR(100)", isNullable: true },
        { name: "postal_code", type: "VARCHAR(20)", isNullable: false },
        { name: "country", type: "VARCHAR(2)", isNullable: false },
        { name: "is_default", type: "BOOLEAN", isNullable: false, defaultValue: "false" },
        { name: "created_at", type: "TIMESTAMP", isNullable: false, defaultValue: "NOW()" },
      ],
    },
  },

  // Reviews Table
  {
    id: "reviews-table",
    type: "table",
    label: "reviews",
    description: "Product reviews by users",
    status: "active",
    position: { x: 450, y: 350 },
    metadata: {
      tableName: "reviews",
      schema: "public",
      width: 280,
      height: 220,
      columns: [
        { name: "id", type: "UUID", isPrimaryKey: true, isNullable: false },
        { name: "product_id", type: "UUID", isForeignKey: true, isNullable: false },
        { name: "user_id", type: "UUID", isForeignKey: true, isNullable: false },
        { name: "rating", type: "INTEGER", isNullable: false },
        { name: "title", type: "VARCHAR(255)", isNullable: true },
        { name: "comment", type: "TEXT", isNullable: true },
        { name: "is_verified_purchase", type: "BOOLEAN", isNullable: false, defaultValue: "false" },
        { name: "created_at", type: "TIMESTAMP", isNullable: false, defaultValue: "NOW()" },
      ],
    },
  },
]

export const mockERDEdges: WorkflowEdge[] = [
  // User -> Orders (One-to-Many: A user can have many orders)
  {
    id: "users-orders",
    source: "users-table",
    target: "orders-table",
    type: "crowsfoot",
    label: "places",
    animated: false,
    data: {
      relationshipType: "one-to-many",
      sourceCardinality: "one",
      targetCardinality: "many",
      sourceOptionality: "mandatory",
      targetOptionality: "optional",
    },
  },

  // Orders -> Order Items (One-to-Many: An order can have many items)
  {
    id: "orders-order-items",
    source: "orders-table",
    target: "order-items-table",
    type: "crowsfoot",
    label: "contains",
    animated: false,
    data: {
      relationshipType: "one-to-many",
      sourceCardinality: "one",
      targetCardinality: "many",
      sourceOptionality: "mandatory",
      targetOptionality: "mandatory",
    },
  },

  // Products -> Order Items (One-to-Many: A product can be in many order items)
  {
    id: "products-order-items",
    source: "products-table",
    target: "order-items-table",
    type: "crowsfoot",
    label: "included in",
    animated: false,
    data: {
      relationshipType: "one-to-many",
      sourceCardinality: "one",
      targetCardinality: "many",
      sourceOptionality: "mandatory",
      targetOptionality: "mandatory",
    },
  },

  // Categories -> Products (One-to-Many: A category can have many products)
  {
    id: "categories-products",
    source: "categories-table",
    target: "products-table",
    type: "crowsfoot",
    label: "categorizes",
    animated: false,
    data: {
      relationshipType: "one-to-many",
      sourceCardinality: "one",
      targetCardinality: "many",
      sourceOptionality: "optional",
      targetOptionality: "optional",
    },
  },

  // Categories -> Categories (Self-referencing: Hierarchical categories)
  {
    id: "categories-parent",
    source: "categories-table",
    target: "categories-table",
    type: "crowsfoot",
    label: "parent of",
    animated: false,
    sourceHandle: "right",
    targetHandle: "top",
    data: {
      relationshipType: "one-to-many",
      sourceCardinality: "one",
      targetCardinality: "many",
      sourceOptionality: "optional",
      targetOptionality: "optional",
    },
  },

  // User -> Addresses (One-to-Many: A user can have many addresses)
  {
    id: "users-addresses",
    source: "users-table",
    target: "addresses-table",
    type: "crowsfoot",
    label: "has",
    animated: false,
    data: {
      relationshipType: "one-to-many",
      sourceCardinality: "one",
      targetCardinality: "many",
      sourceOptionality: "mandatory",
      targetOptionality: "optional",
    },
  },

  // Addresses -> Orders (One-to-Many: An address can be used for many orders)
  {
    id: "addresses-orders",
    source: "addresses-table",
    target: "orders-table",
    type: "crowsfoot",
    label: "ships to",
    animated: false,
    data: {
      relationshipType: "one-to-many",
      sourceCardinality: "one",
      targetCardinality: "many",
      sourceOptionality: "optional",
      targetOptionality: "optional",
    },
  },

  // User -> Reviews (One-to-Many: A user can write many reviews)
  {
    id: "users-reviews",
    source: "users-table",
    target: "reviews-table",
    type: "crowsfoot",
    label: "writes",
    animated: false,
    data: {
      relationshipType: "one-to-many",
      sourceCardinality: "one",
      targetCardinality: "many",
      sourceOptionality: "mandatory",
      targetOptionality: "optional",
    },
  },

  // Products -> Reviews (One-to-Many: A product can have many reviews)
  {
    id: "products-reviews",
    source: "products-table",
    target: "reviews-table",
    type: "crowsfoot",
    label: "reviewed by",
    animated: false,
    data: {
      relationshipType: "one-to-many",
      sourceCardinality: "one",
      targetCardinality: "many",
      sourceOptionality: "mandatory",
      targetOptionality: "optional",
    },
  },
]

// Export combined data
export const mockERDData = {
  nodes: mockERDNodes,
  edges: mockERDEdges,
}

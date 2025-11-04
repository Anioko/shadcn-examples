// Mock data for ERD (Entity Relationship Diagram) - Data Architecture
import { WorkflowNode, WorkflowEdge } from "./types/workflow"

// =============================================================================
// Data Architecture - ERD Mock Data
// =============================================================================

export const erdMockNodes: WorkflowNode[] = [
  // Entities
  {
    id: "erd-customer",
    type: "data-object",
    label: "Customer",
    description: "Customer entity with personal information",
    status: "active",
    position: { x: 50, y: 100 },
    metadata: {
      attributes: ["id (PK)", "name", "email", "phone", "created_at"],
      primaryKey: "id",
    },
  },
  {
    id: "erd-order",
    type: "data-object",
    label: "Order",
    description: "Customer order entity",
    status: "active",
    position: { x: 400, y: 100 },
    metadata: {
      attributes: ["id (PK)", "customer_id (FK)", "order_date", "total_amount", "status"],
      primaryKey: "id",
      foreignKeys: ["customer_id"],
    },
  },
  {
    id: "erd-product",
    type: "data-object",
    label: "Product",
    description: "Product catalog entity",
    status: "active",
    position: { x: 750, y: 100 },
    metadata: {
      attributes: ["id (PK)", "name", "description", "price", "stock_quantity"],
      primaryKey: "id",
    },
  },
  {
    id: "erd-order-item",
    type: "data-object",
    label: "OrderItem",
    description: "Line items for orders",
    status: "active",
    position: { x: 575, y: 300 },
    metadata: {
      attributes: ["id (PK)", "order_id (FK)", "product_id (FK)", "quantity", "unit_price"],
      primaryKey: "id",
      foreignKeys: ["order_id", "product_id"],
    },
  },
  {
    id: "erd-payment",
    type: "data-object",
    label: "Payment",
    description: "Payment transaction entity",
    status: "active",
    position: { x: 400, y: 450 },
    metadata: {
      attributes: ["id (PK)", "order_id (FK)", "payment_method", "amount", "payment_date", "status"],
      primaryKey: "id",
      foreignKeys: ["order_id"],
    },
  },
  {
    id: "erd-address",
    type: "data-object",
    label: "Address",
    description: "Customer shipping/billing addresses",
    status: "active",
    position: { x: 50, y: 300 },
    metadata: {
      attributes: ["id (PK)", "customer_id (FK)", "street", "city", "state", "zip_code", "country", "type"],
      primaryKey: "id",
      foreignKeys: ["customer_id"],
    },
  },
  {
    id: "erd-category",
    type: "data-object",
    label: "Category",
    description: "Product category entity",
    status: "active",
    position: { x: 950, y: 300 },
    metadata: {
      attributes: ["id (PK)", "name", "description", "parent_id (FK)"],
      primaryKey: "id",
      foreignKeys: ["parent_id"],
    },
  },
  {
    id: "erd-review",
    type: "data-object",
    label: "Review",
    description: "Product reviews and ratings",
    status: "pending",
    position: { x: 950, y: 100 },
    metadata: {
      attributes: ["id (PK)", "product_id (FK)", "customer_id (FK)", "rating", "comment", "created_at"],
      primaryKey: "id",
      foreignKeys: ["product_id", "customer_id"],
    },
  },
]

export const erdMockEdges: WorkflowEdge[] = [
  // Customer to Order (1:N)
  {
    id: "e-customer-order",
    source: "erd-customer",
    target: "erd-order",
    label: "places (1:N)",
    type: "archimate-dependency",
    archimateRelationType: "association",
  },
  // Customer to Address (1:N)
  {
    id: "e-customer-address",
    source: "erd-customer",
    target: "erd-address",
    label: "has (1:N)",
    type: "archimate-structural",
    archimateRelationType: "composition",
  },
  // Order to OrderItem (1:N)
  {
    id: "e-order-orderitem",
    source: "erd-order",
    target: "erd-order-item",
    label: "contains (1:N)",
    type: "archimate-structural",
    archimateRelationType: "composition",
  },
  // Product to OrderItem (1:N)
  {
    id: "e-product-orderitem",
    source: "erd-product",
    target: "erd-order-item",
    label: "included in (1:N)",
    type: "archimate-dependency",
    archimateRelationType: "association",
  },
  // Order to Payment (1:1)
  {
    id: "e-order-payment",
    source: "erd-order",
    target: "erd-payment",
    label: "paid by (1:1)",
    type: "archimate-dependency",
    archimateRelationType: "association",
  },
  // Category to Product (1:N)
  {
    id: "e-category-product",
    source: "erd-category",
    target: "erd-product",
    label: "categorizes (1:N)",
    type: "archimate-structural",
    archimateRelationType: "aggregation",
  },
  // Category self-reference (parent-child)
  {
    id: "e-category-category",
    source: "erd-category",
    target: "erd-category",
    label: "parent of (1:N)",
    type: "archimate-structural",
    archimateRelationType: "composition",
  },
  // Customer to Review (1:N)
  {
    id: "e-customer-review",
    source: "erd-customer",
    target: "erd-review",
    label: "writes (1:N)",
    type: "archimate-dependency",
    archimateRelationType: "association",
  },
  // Product to Review (1:N)
  {
    id: "e-product-review",
    source: "erd-product",
    target: "erd-review",
    label: "has (1:N)",
    type: "archimate-structural",
    archimateRelationType: "aggregation",
  },
]

export const mockERDData = {
  nodes: erdMockNodes,
  edges: erdMockEdges,
}

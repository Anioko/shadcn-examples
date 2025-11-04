"use client";

import * as React from "react";
import { CRUDTable, renderHelpers } from "@/components/crud-table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type FrameworkItem = {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "active" | "inactive" | "planning";
  totalCards: number;
  completed: number;
  inProgress: number;
  completionPercentage: number;
  hasKanban: boolean;
  tier: number;
  lastUpdated: string;
};

type FrameworksCRUDTableProps = {
  frameworks: FrameworkItem[];
};

export function FrameworksCRUDTable({ frameworks }: FrameworksCRUDTableProps) {
  const handleCreate = async (item: FrameworkItem) => {
    console.log("Create framework:", item);
    // TODO: Implement API call
    alert("Framework created successfully!");
  };

  const handleUpdate = async (item: FrameworkItem) => {
    console.log("Update framework:", item);
    // TODO: Implement API call
    alert("Framework updated successfully!");
  };

  const handleDelete = async (item: FrameworkItem) => {
    console.log("Delete framework:", item);
    // TODO: Implement API call
    alert("Framework deleted successfully!");
  };

  return (
    <CRUDTable
      data={frameworks}
      title="Frameworks Management"
      description="Manage all frameworks in this capability with full CRUD operations"
      columns={[
        {
          key: "name",
          label: "Framework",
          render: (value, row) => (
            <div>
              <div className="font-medium">{value}</div>
              <div className="text-xs text-muted-foreground">{row.description}</div>
            </div>
          ),
        },
        {
          key: "status",
          label: "Status",
          render: (value) => renderHelpers.status(value),
        },
        {
          key: "totalCards",
          label: "Total Items",
          render: (value) => <span className="font-medium">{value}</span>,
        },
        {
          key: "completed",
          label: "Completed",
          render: (value) => (
            <span className="font-medium text-green-600">{value}</span>
          ),
        },
        {
          key: "inProgress",
          label: "In Progress",
          render: (value) => (
            <span className="font-medium text-blue-600">{value}</span>
          ),
        },
        {
          key: "completionPercentage",
          label: "Progress",
          render: (value) => (
            <div className="flex items-center gap-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="text-xs font-medium">{value}%</span>
            </div>
          ),
        },
        {
          key: "hasKanban",
          label: "Kanban",
          render: (value, row) =>
            value ? (
              <Button size="sm" variant="outline" asChild>
                <Link href={`/frameworks/${row.slug}/kanban`}>
                  View Workflow
                </Link>
              </Button>
            ) : (
              <Badge variant="secondary">N/A</Badge>
            ),
        },
        {
          key: "lastUpdated",
          label: "Last Updated",
          render: (value) => renderHelpers.date(value),
        },
      ]}
      fields={[
        {
          name: "name",
          label: "Framework Name",
          type: "text",
          required: true,
          placeholder: "e.g., Scrum",
        },
        {
          name: "slug",
          label: "Slug",
          type: "text",
          required: true,
          placeholder: "e.g., scrum",
        },
        {
          name: "description",
          label: "Description",
          type: "textarea",
          required: true,
          placeholder: "Brief description of the framework",
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          options: [
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "Planning", value: "planning" },
          ],
        },
        {
          name: "tier",
          label: "Tier",
          type: "select",
          required: true,
          options: [
            { label: "Tier 1 (Highly Suitable)", value: "1" },
            { label: "Tier 2 (Moderately Suitable)", value: "2" },
            { label: "Tier 3 (Less Suitable)", value: "3" },
          ],
        },
        {
          name: "hasKanban",
          label: "Has Kanban Workflow",
          type: "select",
          required: true,
          options: [
            { label: "Yes", value: "true" },
            { label: "No", value: "false" },
          ],
        },
      ]}
      onCreateItem={handleCreate}
      onUpdateItem={handleUpdate}
      onDeleteItem={handleDelete}
      getItemId={(item) => item.id}
      emptyMessage="No frameworks found. Add your first framework to get started."
      showCreate={true}
    />
  );
}

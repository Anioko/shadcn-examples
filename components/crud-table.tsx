"use client";

import * as React from "react";
import {
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CRUDDrawer, CRUDMode, FieldConfig } from "./crud-drawer";
import { Badge } from "@/components/ui/badge";

export type ColumnConfig<T> = {
  key: keyof T | string;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
};

export type CRUDTableProps<T> = {
  data: T[];
  columns: ColumnConfig<T>[];
  fields: FieldConfig[];
  title?: string;
  description?: string;
  onCreateItem?: (item: T) => Promise<void> | void;
  onUpdateItem?: (item: T) => Promise<void> | void;
  onDeleteItem?: (item: T) => Promise<void> | void;
  getItemId: (item: T) => string | number;
  emptyMessage?: string;
  showCreate?: boolean;
};

export function CRUDTable<T extends Record<string, any>>({
  data,
  columns,
  fields,
  title,
  description,
  onCreateItem,
  onUpdateItem,
  onDeleteItem,
  getItemId,
  emptyMessage = "No items found",
  showCreate = true,
}: CRUDTableProps<T>) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [drawerMode, setDrawerMode] = React.useState<CRUDMode>("view");
  const [selectedItem, setSelectedItem] = React.useState<T | undefined>();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleView = (item: T) => {
    setSelectedItem(item);
    setDrawerMode("view");
    setDrawerOpen(true);
  };

  const handleEdit = (item: T) => {
    setSelectedItem(item);
    setDrawerMode("edit");
    setDrawerOpen(true);
  };

  const handleDelete = (item: T) => {
    setSelectedItem(item);
    setDrawerMode("delete");
    setDrawerOpen(true);
  };

  const handleCreate = () => {
    setSelectedItem(undefined);
    setDrawerMode("create");
    setDrawerOpen(true);
  };

  const handleSubmit = async (formData: T) => {
    setIsLoading(true);
    try {
      if (drawerMode === "create" && onCreateItem) {
        await onCreateItem(formData);
      } else if (drawerMode === "edit" && onUpdateItem) {
        await onUpdateItem(formData);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedItem || !onDeleteItem) return;
    
    setIsLoading(true);
    try {
      await onDeleteItem(selectedItem);
    } finally {
      setIsLoading(false);
    }
  };

  const getCellValue = (row: T, key: string): any => {
    // Handle nested keys like "user.name"
    const keys = key.split(".");
    let value: any = row;
    for (const k of keys) {
      value = value?.[k];
    }
    return value;
  };

  const getDrawerTitle = () => {
    switch (drawerMode) {
      case "create":
        return `Create ${title || "Item"}`;
      case "edit":
        return `Edit ${title || "Item"}`;
      case "view":
        return `View ${title || "Item"}`;
      case "delete":
        return `Delete ${title || "Item"}`;
      default:
        return title || "Item";
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      {(title || showCreate) && (
        <div className="flex items-center justify-between">
          <div>
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {showCreate && onCreateItem && (
            <Button onClick={handleCreate} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add New
            </Button>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={String(column.key)}>
                  {column.label}
                </TableHead>
              ))}
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="h-24 text-center"
                >
                  <div className="text-muted-foreground">{emptyMessage}</div>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={String(getItemId(row))}>
                  {columns.map((column) => {
                    const value = getCellValue(row, String(column.key));
                    return (
                      <TableCell key={String(column.key)}>
                        {column.render ? column.render(value, row) : value}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleView(row)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        {onUpdateItem && (
                          <DropdownMenuItem onClick={() => handleEdit(row)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        )}
                        {onDeleteItem && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(row)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* CRUD Drawer */}
      <CRUDDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        mode={drawerMode}
        title={getDrawerTitle()}
        description={description}
        fields={fields}
        data={selectedItem}
        onSubmit={handleSubmit}
        onDelete={handleDeleteConfirm}
        isLoading={isLoading}
      />
    </div>
  );
}

// Helper function to render common data types
export const renderHelpers = {
  badge: (value: string, variant: "default" | "secondary" | "destructive" | "outline" = "default") => (
    <Badge variant={variant}>{value}</Badge>
  ),
  date: (value: string | Date) => {
    if (!value) return "-";
    const date = typeof value === "string" ? new Date(value) : value;
    return date.toLocaleDateString();
  },
  boolean: (value: boolean) => (
    <Badge variant={value ? "default" : "secondary"}>
      {value ? "Yes" : "No"}
    </Badge>
  ),
  status: (value: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      inactive: "secondary",
      pending: "outline",
      completed: "default",
      failed: "destructive",
    };
    return <Badge variant={variants[value.toLowerCase()] || "default"}>{value}</Badge>;
  },
};

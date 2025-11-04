"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, MoveUp, MoveDown, Key, Link2, KeyRound } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Column } from "../nodes/database-schema-node"

interface TableEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  tableName: string
  schema: string
  description?: string
  columns: Column[]
  onSave: (data: {
    tableName: string
    schema: string
    description?: string
    columns: Column[]
  }) => void
}

const COMMON_DATA_TYPES = [
  "UUID",
  "VARCHAR",
  "TEXT",
  "INTEGER",
  "BIGINT",
  "DECIMAL",
  "NUMERIC",
  "BOOLEAN",
  "DATE",
  "TIMESTAMP",
  "TIMESTAMPTZ",
  "JSON",
  "JSONB",
  "ARRAY",
]

export function TableEditDialog({
  open,
  onOpenChange,
  tableName: initialTableName,
  schema: initialSchema,
  description: initialDescription,
  columns: initialColumns,
  onSave,
}: TableEditDialogProps) {
  const [tableName, setTableName] = useState(initialTableName)
  const [schema, setSchema] = useState(initialSchema)
  const [description, setDescription] = useState(initialDescription || "")
  const [columns, setColumns] = useState<Column[]>(initialColumns)

  const handleSave = () => {
    onSave({
      tableName,
      schema,
      description,
      columns,
    })
    onOpenChange(false)
  }

  const addColumn = () => {
    const newColumn: Column = {
      name: "new_column",
      type: "VARCHAR",
      isNullable: true,
      isPrimaryKey: false,
      isForeignKey: false,
      isUnique: false,
    }
    setColumns([...columns, newColumn])
  }

  const removeColumn = (index: number) => {
    setColumns(columns.filter((_, i) => i !== index))
  }

  const updateColumn = (index: number, updates: Partial<Column>) => {
    setColumns(
      columns.map((col, i) =>
        i === index ? { ...col, ...updates } : col
      )
    )
  }

  const moveColumn = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index > 0) {
      const newColumns = [...columns]
      ;[newColumns[index - 1], newColumns[index]] = [newColumns[index], newColumns[index - 1]]
      setColumns(newColumns)
    } else if (direction === "down" && index < columns.length - 1) {
      const newColumns = [...columns]
      ;[newColumns[index], newColumns[index + 1]] = [newColumns[index + 1], newColumns[index]]
      setColumns(newColumns)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Edit Table</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Table Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tableName">Table Name</Label>
              <Input
                id="tableName"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                placeholder="e.g., users"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schema">Schema</Label>
              <Input
                id="schema"
                value={schema}
                onChange={(e) => setSchema(e.target.value)}
                placeholder="e.g., public"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional table description"
              rows={2}
            />
          </div>

          {/* Columns Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Columns</Label>
              <Button size="sm" onClick={addColumn} className="gap-1.5">
                <Plus className="h-4 w-4" />
                Add Column
              </Button>
            </div>

            <ScrollArea className="h-[400px] border rounded-md p-4">
              <div className="space-y-3">
                {columns.map((column, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-lg bg-white space-y-3"
                  >
                    {/* Column Name and Type */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs">Column Name</Label>
                        <Input
                          value={column.name}
                          onChange={(e) =>
                            updateColumn(index, { name: e.target.value })
                          }
                          placeholder="column_name"
                          className="h-8"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs">Data Type</Label>
                        <Select
                          value={column.type}
                          onValueChange={(value) =>
                            updateColumn(index, { type: value })
                          }
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {COMMON_DATA_TYPES.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Constraints */}
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`pk-${index}`}
                          checked={column.isPrimaryKey || false}
                          onCheckedChange={(checked) =>
                            updateColumn(index, {
                              isPrimaryKey: !!checked,
                              isNullable: checked ? false : column.isNullable
                            })
                          }
                        />
                        <Label
                          htmlFor={`pk-${index}`}
                          className="text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Key className="h-3 w-3 text-yellow-600" />
                          Primary Key
                        </Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`fk-${index}`}
                          checked={column.isForeignKey || false}
                          onCheckedChange={(checked) =>
                            updateColumn(index, { isForeignKey: !!checked })
                          }
                        />
                        <Label
                          htmlFor={`fk-${index}`}
                          className="text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Link2 className="h-3 w-3 text-blue-600" />
                          Foreign Key
                        </Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`unique-${index}`}
                          checked={column.isUnique || false}
                          onCheckedChange={(checked) =>
                            updateColumn(index, { isUnique: !!checked })
                          }
                        />
                        <Label
                          htmlFor={`unique-${index}`}
                          className="text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <KeyRound className="h-3 w-3 text-green-600" />
                          Unique
                        </Label>
                      </div>

                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`nullable-${index}`}
                          checked={column.isNullable || false}
                          onCheckedChange={(checked) =>
                            updateColumn(index, { isNullable: !!checked })
                          }
                          disabled={column.isPrimaryKey}
                        />
                        <Label
                          htmlFor={`nullable-${index}`}
                          className="text-xs cursor-pointer"
                        >
                          Nullable
                        </Label>
                      </div>
                    </div>

                    {/* Default Value */}
                    <div className="space-y-1.5">
                      <Label className="text-xs">Default Value (optional)</Label>
                      <Input
                        value={column.defaultValue || ""}
                        onChange={(e) =>
                          updateColumn(index, { defaultValue: e.target.value })
                        }
                        placeholder="e.g., NOW(), 0, 'default'"
                        className="h-8 font-mono text-xs"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => moveColumn(index, "up")}
                        disabled={index === 0}
                        className="h-7"
                      >
                        <MoveUp className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => moveColumn(index, "down")}
                        disabled={index === columns.length - 1}
                        className="h-7"
                      >
                        <MoveDown className="h-3 w-3" />
                      </Button>
                      <div className="flex-1" />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeColumn(index)}
                        className="h-7 gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}

                {columns.length === 0 && (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No columns yet. Click "Add Column" to get started.
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

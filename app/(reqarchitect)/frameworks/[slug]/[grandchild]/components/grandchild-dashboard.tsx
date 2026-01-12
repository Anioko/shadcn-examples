"use client"

import * as React from "react"
import { IconTrendingUp, IconPlus, IconArrowLeft } from "@tabler/icons-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FrameworkItem } from "@/lib/mock-framework-data"
import { FrameworkGrandchild } from "@/lib/framework-config"
import { singularize } from "@/lib/utils"
import { AddItemDrawer } from "@/components/framework/add-item-drawer"
import { useGrandchildEntries, useCreateEntry, useDeleteEntry } from "@/lib/api/useGrandchildEntries"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
  VisibilityState,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconChevronDown, IconLayoutColumns, IconChevronLeft as IconPrevious, IconChevronRight as IconNext, IconChevronsLeft, IconChevronsRight, IconDotsVertical } from "@tabler/icons-react"

interface GrandchildDashboardProps {
  frameworkSlug: string
  frameworkName: string
  grandchild: FrameworkGrandchild
  data: FrameworkItem[]
}

export function GrandchildDashboard({
  frameworkSlug,
  frameworkName,
  grandchild,
  data,
}: GrandchildDashboardProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const singularName = singularize(grandchild.name)

  // Fetch entries from API (falls back to provided `data` prop if offline)
  const { data: entriesData = [], isLoading, isError } = useGrandchildEntries(frameworkSlug, grandchild.id, true)

  const createMutation = useCreateEntry(frameworkSlug, grandchild.id)
  const deleteMutation = useDeleteEntry(frameworkSlug, grandchild.id)

  const handleSuccess = (newData: Record<string, unknown>) => {
    // create the new entry via API
    createMutation.mutate(newData)
  }

  // Calculate stats (prefer live entries when available)
  const source = entriesData?.length ? entriesData : data
  const totalCount = source.length
  const doneCount = source.filter((item: FrameworkItem) => item.status === "Done").length
  const inProgressCount = source.filter((item: FrameworkItem) => item.status === "In Progress").length
  const notStartedCount = source.filter((item: FrameworkItem) => item.status === "Not Started").length
  const completionRate = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0

  // Chart data
  const chartData = [
    { status: "Done", count: doneCount },
    { status: "In Progress", count: inProgressCount },
    { status: "Not Started", count: notStartedCount },
  ]

  const chartConfig = {
    count: {
      label: "Count",
      color: "hsl(var(--primary))",
    },
  }

  return (
    <>
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Breadcrumb / Back Button */}
          <div className="px-4 lg:px-6">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/frameworks/${frameworkSlug}/dashboard`}>
                <IconArrowLeft className="h-4 w-4 mr-2" />
                Back to {frameworkName}
              </Link>
            </Button>
          </div>

          {/* Header Section */}
          <div className="flex items-center justify-between px-4 lg:px-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">{grandchild.name}</h1>
              <p className="text-muted-foreground text-sm">
                {grandchild.description || `Manage ${grandchild.name.toLowerCase()} for ${frameworkName}`}
              </p>
            </div>
            <Button onClick={() => setDrawerOpen(true)}>
              <IconPlus className="h-4 w-4" />
              <span className="hidden lg:inline">Add {singularName}</span>
              <span className="lg:hidden">Add</span>
            </Button>
          </div>

          {/* Stats Card */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardDescription>Total {grandchild.name}</CardDescription>
                <CardTitle className="text-3xl font-semibold tabular-nums">
                  {totalCount}
                </CardTitle>
                <CardAction>
                  <Badge variant="outline">
                    {completionRate > 0 && <IconTrendingUp />}
                    {completionRate}% Complete
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <span className="text-muted-foreground">Done: {doneCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <span className="text-muted-foreground">In Progress: {inProgressCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-400" />
                    <span className="text-muted-foreground">Not Started: {notStartedCount}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Chart Section */}
          <div className="px-4 lg:px-6">
            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
                <CardDescription>Breakdown by status</CardDescription>
              </CardHeader>
              <CardFooter>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                  <BarChart data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="status"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="count" fill="var(--color-count)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardFooter>
            </Card>
          </div>

          {/* Data Table */}
          <div className="px-4 lg:px-6">
            <GrandchildTable
              data={source}
              grandchildId={grandchild.id}
              grandchildName={grandchild.name}
              frameworkSlug={frameworkSlug}
              onDelete={(id: string | number) => deleteMutation.mutate(id)}
            />
          </div>
        </div>
      </div>

      {/* Add Item Drawer */}
      <AddItemDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        frameworkSlug={frameworkSlug}
        grandchildId={grandchild.id}
        grandchildName={grandchild.name}
        onSuccess={handleSuccess}
      />
    </>
  )
}

// Simple table component (reusing logic from main dashboard)
function GrandchildTable({
  data,
  grandchildId,
  grandchildName,
  frameworkSlug,
  onDelete,
}: {
  data: FrameworkItem[]
  grandchildId: string
  grandchildName: string
  frameworkSlug: string
  onDelete?: (id: string | number) => void
}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const columns: ColumnDef<FrameworkItem>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={status === "Done" ? "default" : "secondary"}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
    },
    {
      accessorKey: "assignee",
      header: "Assignee",
    },
    {
      id: "actions",
        cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <IconDotsVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600" onSelect={() => onDelete && onDelete((row.original as FrameworkItem).id)}>
                Delete
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{grandchildName}</CardTitle>
            <CardDescription>
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns className="h-4 w-4 mr-2" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardFooter className="flex-col gap-4">
        <div className="rounded-md border w-full">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between w-full">
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <IconChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <IconPrevious className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <IconNext className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <IconChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

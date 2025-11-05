"use client"

import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconTrendingUp,
} from "@tabler/icons-react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useIsMobile } from "@/hooks/use-mobile"
import { CapabilityMap, Capability } from "@/lib/types/capability-map"
import { Target, Cog, Shield } from "lucide-react"

interface CapabilityDataTableProps {
  capabilityMap: CapabilityMap
}

// Create a separate component for the drag handle
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

// Chart data for capability maturity trends
const chartData = [
  { month: "January", maturity: 3.2, investment: 2.8 },
  { month: "February", maturity: 3.4, investment: 3.1 },
  { month: "March", maturity: 3.3, investment: 3.0 },
  { month: "April", maturity: 3.6, investment: 3.3 },
  { month: "May", maturity: 3.8, investment: 3.5 },
  { month: "June", maturity: 3.9, investment: 3.7 },
]

const chartConfig = {
  maturity: {
    label: "Maturity",
    color: "var(--primary)",
  },
  investment: {
    label: "Investment",
    color: "var(--primary)",
  },
} satisfies ChartConfig

// Drawer modal for viewing/editing capability details
function CapabilityCellViewer({ capability }: { capability: Capability }) {
  const isMobile = useIsMobile()

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {capability.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{capability.name}</DrawerTitle>
          <DrawerDescription>Edit capability details</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Area
                    dataKey="investment"
                    type="natural"
                    fill="var(--color-investment)"
                    fillOpacity={0.6}
                    stroke="var(--color-investment)"
                    stackId="a"
                  />
                  <Area
                    dataKey="maturity"
                    type="natural"
                    fill="var(--color-maturity)"
                    fillOpacity={0.4}
                    stroke="var(--color-maturity)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  Trending up by 5.2% this month <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Capability maturity and investment tracking
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="name">Capability Name</Label>
              <Input id="name" defaultValue={capability.name} />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="description">Description</Label>
              <Input id="description" defaultValue={capability.description || ""} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Type</Label>
                <Select defaultValue={capability.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strategic">Strategic</SelectItem>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="supporting">Supporting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="level">Level</Label>
                <Select defaultValue={capability.level.toString()}>
                  <SelectTrigger id="level" className="w-full">
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Level 0</SelectItem>
                    <SelectItem value="1">Level 1</SelectItem>
                    <SelectItem value="2">Level 2</SelectItem>
                    <SelectItem value="3">Level 3</SelectItem>
                    <SelectItem value="4">Level 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="maturity">Maturity (1-5)</Label>
                <Select defaultValue={capability.metrics.maturity.toString()}>
                  <SelectTrigger id="maturity" className="w-full">
                    <SelectValue placeholder="Select maturity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Initial</SelectItem>
                    <SelectItem value="2">2 - Developing</SelectItem>
                    <SelectItem value="3">3 - Defined</SelectItem>
                    <SelectItem value="4">4 - Managed</SelectItem>
                    <SelectItem value="5">5 - Optimized</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="importance">Strategic Importance</Label>
                <Select defaultValue={capability.metrics.strategicImportance}>
                  <SelectTrigger id="importance" className="w-full">
                    <SelectValue placeholder="Select importance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="investment">Current Investment</Label>
                <Select defaultValue={capability.metrics.currentInvestment}>
                  <SelectTrigger id="investment" className="w-full">
                    <SelectValue placeholder="Select investment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="owner">Owner</Label>
                <Input id="owner" defaultValue={capability.metrics.owner || ""} />
              </div>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const columns: ColumnDef<Capability>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Capability Name",
    cell: ({ row }) => {
      return (
        <div className="max-w-xs">
          <div className="font-medium">
            <CapabilityCellViewer capability={row.original} />
          </div>
          {row.original.description && (
            <div className="text-xs text-muted-foreground truncate">
              {row.original.description}
            </div>
          )}
        </div>
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => (
      <div className="w-20">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          L{row.original.level}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "maturity",
    header: "Maturity",
    cell: ({ row }) => {
      const maturity = row.original.metrics.maturity
      const colors = {
        1: 'bg-red-100 text-red-800',
        2: 'bg-orange-100 text-orange-800',
        3: 'bg-yellow-100 text-yellow-800',
        4: 'bg-lime-100 text-lime-800',
        5: 'bg-green-100 text-green-800',
      }
      return (
        <Badge variant="secondary" className={colors[maturity as keyof typeof colors]}>
          {maturity}/5
        </Badge>
      )
    },
  },
  {
    accessorKey: "strategicImportance",
    header: "Importance",
    cell: ({ row }) => {
      const importance = row.original.metrics.strategicImportance
      const colors = {
        critical: 'bg-red-100 text-red-800',
        high: 'bg-purple-100 text-purple-800',
        medium: 'bg-blue-100 text-blue-800',
        low: 'bg-gray-100 text-gray-800',
      }
      return (
        <Badge variant="secondary" className={colors[importance as keyof typeof colors]}>
          {importance}
        </Badge>
      )
    },
  },
  {
    accessorKey: "currentInvestment",
    header: "Investment",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5 capitalize">
        {row.original.metrics.currentInvestment}
      </Badge>
    ),
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => (
      <div className="max-w-xs truncate">
        {row.original.metrics.owner || "-"}
      </div>
    ),
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

function DraggableRow({ row }: { row: Row<Capability> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

// Table component for each capability type tab
function CapabilityTypeTable({
  data,
  typeName,
}: {
  data: Capability[]
  typeName: string
}) {
  const [localData, setLocalData] = React.useState(() => data)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => localData?.map(({ id }) => id) || [],
    [localData]
  )

  const table = useReactTable({
    data: localData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setLocalData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
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
      </div>

      <div className="overflow-hidden rounded-lg border">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows?.length ? (
                <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>

      <div className="flex items-center justify-between px-4">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Rows per page
          </Label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-fit items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <IconChevronsLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <IconChevronLeft />
          </Button>
          <Button
            variant="outline"
            className="size-8"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <IconChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 lg:flex"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <IconChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  )
}

// Main DataTable component with tabs
export function CapabilityDataTable({ capabilityMap }: CapabilityDataTableProps) {
  // Group capabilities by type
  const capabilityTypes = [
    {
      id: 'strategic',
      name: 'Strategic',
      icon: Target,
      data: capabilityMap.capabilities.filter((c) => c.type === 'strategic'),
    },
    {
      id: 'operational',
      name: 'Operational',
      icon: Cog,
      data: capabilityMap.capabilities.filter((c) => c.type === 'operational'),
    },
    {
      id: 'supporting',
      name: 'Supporting',
      icon: Shield,
      data: capabilityMap.capabilities.filter((c) => c.type === 'supporting'),
    },
  ]

  const defaultTab = capabilityTypes[0]?.id || "strategic"

  return (
    <Tabs defaultValue={defaultTab} className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue={defaultTab}>
          <SelectTrigger className="flex w-fit @4xl/main:hidden" size="sm" id="view-selector">
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            {capabilityTypes.map((type) => (
              <SelectItem key={type.id} value={type.id}>
                {type.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          {capabilityTypes.map((type) => {
            const Icon = type.icon
            return (
              <TabsTrigger key={type.id} value={type.id}>
                <Icon className="h-4 w-4 mr-1.5" />
                {type.name}
                {type.data.length > 0 && <Badge variant="secondary">{type.data.length}</Badge>}
              </TabsTrigger>
            )
          })}
        </TabsList>
      </div>

      {capabilityTypes.map((type) => {
        return (
          <TabsContent
            key={type.id}
            value={type.id}
            className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
          >
            <CapabilityTypeTable
              data={type.data}
              typeName={type.name}
            />
          </TabsContent>
        )
      })}
    </Tabs>
  )
}

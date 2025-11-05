"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

interface AddItemDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  frameworkSlug: string
  grandchildId: string
  grandchildName: string
  onSuccess: () => void
}

export function AddItemDrawer({
  open,
  onOpenChange,
  frameworkSlug,
  grandchildId,
  grandchildName,
  onSuccess,
}: AddItemDrawerProps) {
  const [loading, setLoading] = React.useState(false)
  const [formData, setFormData] = React.useState({
    header: "",
    type: grandchildName,
    status: "Not Started",
    target: "0",
    limit: "0",
    reviewer: "Assign reviewer",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Fetch current data
      const getResponse = await fetch(`/api/frameworks/${frameworkSlug}/tables/${grandchildId}`)
      const currentData = await getResponse.json()
      
      // Create new item with unique ID
      const newItem = {
        id: Date.now(), // Simple ID generation
        ...formData,
        grandchildId,
      }

      // Append to existing data
      const updatedData = [...(currentData.data || []), newItem]

      // Save to API
      const saveResponse = await fetch(`/api/frameworks/${frameworkSlug}/tables/${grandchildId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: updatedData })
      })

      if (!saveResponse.ok) {
        throw new Error('Failed to save item')
      }

      toast.success(`${grandchildName} added successfully`)
      
      // Reset form
      setFormData({
        header: "",
        type: grandchildName,
        status: "Not Started",
        target: "0",
        limit: "0",
        reviewer: "Assign reviewer",
      })
      
      onSuccess()
      onOpenChange(false)
    } catch (error) {
      console.error('Error adding item:', error)
      toast.error('Failed to add item')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add {grandchildName}</DrawerTitle>
          <DrawerDescription>Create a new {grandchildName.toLowerCase()} item</DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="header">Name</Label>
            <Input
              id="header"
              value={formData.header}
              onChange={(e) => setFormData({ ...formData, header: e.target.value })}
              placeholder="Enter item name"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Not Started">Not Started</SelectItem>
                  <SelectItem value="In Process">In Process</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="target">Target</Label>
              <Input
                id="target"
                type="number"
                value={formData.target}
                onChange={(e) => setFormData({ ...formData, target: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="limit">Limit</Label>
              <Input
                id="limit"
                type="number"
                value={formData.limit}
                onChange={(e) => setFormData({ ...formData, limit: e.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="reviewer">Reviewer</Label>
            <Select
              value={formData.reviewer}
              onValueChange={(value) => setFormData({ ...formData, reviewer: value })}
            >
              <SelectTrigger id="reviewer">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Assign reviewer">Assign reviewer</SelectItem>
                <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
                <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DrawerFooter className="px-0">
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Item"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}

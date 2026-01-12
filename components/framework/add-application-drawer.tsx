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
import { Textarea } from "@/components/ui/textarea"
import { singularize } from "@/lib/utils"

interface AddApplicationDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  grandchildId: string
  grandchildName: string
  onSuccess: (data: Record<string, any>) => void
}

export function AddApplicationDrawer({
  open,
  onOpenChange,
  grandchildId,
  grandchildName,
  onSuccess,
}: AddApplicationDrawerProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    description: '',
    type: 'service',
    status: 'planned',
    criticality: 'standard',
    hostingModel: 'cloud_aws',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSuccess(formData)
    onOpenChange(false)
    setFormData({
      name: '',
      description: '',
      type: 'service',
      status: 'planned',
      criticality: 'standard',
      hostingModel: 'cloud_aws',
    })
  }

  const singularName = singularize(grandchildName)

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add {singularName}</DrawerTitle>
          <DrawerDescription>
            Create a new application in {grandchildName}
          </DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleSubmit} className="px-4">
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Application Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter application name"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="microservice">Microservice</SelectItem>
                    <SelectItem value="module">Module</SelectItem>
                    <SelectItem value="library">Library</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                    <SelectItem value="testing">Testing</SelectItem>
                    <SelectItem value="deployed">Deployed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="criticality">Criticality</Label>
                <Select
                  value={formData.criticality}
                  onValueChange={(value) => setFormData({ ...formData, criticality: value })}
                >
                  <SelectTrigger id="criticality">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mission_critical">Mission Critical</SelectItem>
                    <SelectItem value="important">Important</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="non_critical">Non-Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="hostingModel">Hosting Model</Label>
                <Select
                  value={formData.hostingModel}
                  onValueChange={(value) => setFormData({ ...formData, hostingModel: value })}
                >
                  <SelectTrigger id="hostingModel">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cloud_aws">AWS</SelectItem>
                    <SelectItem value="cloud_azure">Azure</SelectItem>
                    <SelectItem value="cloud_gcp">GCP</SelectItem>
                    <SelectItem value="on_premises">On-Premises</SelectItem>
                    <SelectItem value="saas">SaaS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button type="submit">Add Application</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  )
}

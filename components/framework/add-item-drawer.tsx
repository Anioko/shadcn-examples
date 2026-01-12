"use client"

import * as React from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { DynamicForm } from "./dynamic-form"
import { getFormSchema } from "@/lib/framework-form-schemas"
import { useIsMobile } from "@/hooks/use-mobile"
import { toast } from "sonner"
import { singularize } from "@/lib/utils"

interface AddItemDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  frameworkSlug: string
  grandchildId: string
  grandchildName: string
  onSuccess?: (data: Record<string, any>) => void
}

export function AddItemDrawer({
  open,
  onOpenChange,
  frameworkSlug,
  grandchildId,
  grandchildName,
  onSuccess,
}: AddItemDrawerProps) {
  const isMobile = useIsMobile()
  const schema = getFormSchema(frameworkSlug, grandchildId)
  const singularName = singularize(grandchildName)

  // Update schema title to use singular name
  const customizedSchema = {
    ...schema,
    title: `Add ${singularName}`,
    description: schema.description || `Add a new ${singularName.toLowerCase()} to ${grandchildName.toLowerCase()}`,
  }

  const handleSubmit = (data: Record<string, any>) => {
    // TODO: In production, this would call an API endpoint
    console.log("Form submitted:", data)

    // Show success toast
    toast.success(`${singularName} added successfully!`, {
      description: `${data.title || "Item"} has been added to ${grandchildName}.`,
    })

    // Call success callback
    if (onSuccess) {
      onSuccess(data)
    }

    // Close drawer
    onOpenChange(false)
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction={isMobile ? "bottom" : "right"}>
      <DrawerContent className={isMobile ? "" : "h-screen w-full max-w-2xl ml-auto"}>
        <DrawerHeader>
          <DrawerTitle>Add {singularName}</DrawerTitle>
          <DrawerDescription>
            Fill out the form below to add a new {singularName.toLowerCase()}.
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <DynamicForm
            schema={customizedSchema}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

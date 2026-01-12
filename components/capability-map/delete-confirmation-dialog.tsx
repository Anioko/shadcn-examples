'use client'

import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Capability } from '@/lib/types/capability-map'
import { AlertTriangle } from 'lucide-react'

interface DeleteConfirmationDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  capability: Capability | null
  childrenCount: number
}

export function DeleteConfirmationDialog({
  open,
  onClose,
  onConfirm,
  capability,
  childrenCount,
}: DeleteConfirmationDialogProps) {
  if (!capability) return null

  const hasChildren = childrenCount > 0

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Delete Capability
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-3">
            <p>
              Are you sure you want to delete <strong>"{capability.name}"</strong>?
            </p>
            {hasChildren && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-900 text-sm font-semibold">
                  ⚠️ Warning: This capability has {childrenCount} sub-capability
                  {childrenCount > 1 ? 'ies' : 'y'}
                </p>
                <p className="text-yellow-800 text-sm mt-1">
                  Deleting this capability will also delete all of its sub-capabilities. This
                  action cannot be undone.
                </p>
              </div>
            )}
            {!hasChildren && (
              <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            Delete {hasChildren ? `(${childrenCount + 1} total)` : ''}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

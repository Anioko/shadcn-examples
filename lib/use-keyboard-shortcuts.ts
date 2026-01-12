import { useEffect } from 'react'

export interface KeyboardShortcutHandlers {
  onUndo?: () => void
  onRedo?: () => void
  onCopy?: () => void
  onPaste?: () => void
  onCut?: () => void
  onDuplicate?: () => void
  onDelete?: () => void
  onSelectAll?: () => void
  onSave?: () => void
  onEscape?: () => void
}

export function useKeyboardShortcuts(handlers: KeyboardShortcutHandlers, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return
      }

      const ctrl = e.ctrlKey || e.metaKey // Support both Windows and Mac

      // Undo: Ctrl+Z
      if (ctrl && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        handlers.onUndo?.()
        return
      }

      // Redo: Ctrl+Y or Ctrl+Shift+Z
      if ((ctrl && e.key === 'y') || (ctrl && e.shiftKey && e.key === 'z')) {
        e.preventDefault()
        handlers.onRedo?.()
        return
      }

      // Copy: Ctrl+C
      if (ctrl && e.key === 'c') {
        e.preventDefault()
        handlers.onCopy?.()
        return
      }

      // Paste: Ctrl+V
      if (ctrl && e.key === 'v') {
        e.preventDefault()
        handlers.onPaste?.()
        return
      }

      // Cut: Ctrl+X
      if (ctrl && e.key === 'x') {
        e.preventDefault()
        handlers.onCut?.()
        return
      }

      // Duplicate: Ctrl+D
      if (ctrl && e.key === 'd') {
        e.preventDefault()
        handlers.onDuplicate?.()
        return
      }

      // Select All: Ctrl+A
      if (ctrl && e.key === 'a') {
        e.preventDefault()
        handlers.onSelectAll?.()
        return
      }

      // Save: Ctrl+S
      if (ctrl && e.key === 's') {
        e.preventDefault()
        handlers.onSave?.()
        return
      }

      // Delete: Delete or Backspace
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        handlers.onDelete?.()
        return
      }

      // Escape: Deselect
      if (e.key === 'Escape') {
        e.preventDefault()
        handlers.onEscape?.()
        return
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handlers, enabled])
}

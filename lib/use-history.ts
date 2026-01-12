import { useState, useCallback, useRef } from 'react'

interface HistoryState<T> {
  past: T[]
  present: T
  future: T[]
}

export function useHistory<T>(initialState: T, maxSize: number = 50) {
  const [history, setHistory] = useState<HistoryState<T>>({
    past: [],
    present: initialState,
    future: []
  })

  const setState = useCallback((newState: T) => {
    setHistory(prev => {
      const newPast = [...prev.past, prev.present]
      if (newPast.length > maxSize) {
        newPast.shift()
      }
      return {
        past: newPast,
        present: newState,
        future: []
      }
    })
  }, [maxSize])

  const undo = useCallback(() => {
    setHistory(prev => {
      if (prev.past.length === 0) return prev
      const newPast = [...prev.past]
      const newPresent = newPast.pop()!
      return {
        past: newPast,
        present: newPresent,
        future: [prev.present, ...prev.future]
      }
    })
  }, [])

  const redo = useCallback(() => {
    setHistory(prev => {
      if (prev.future.length === 0) return prev
      const newFuture = [...prev.future]
      const newPresent = newFuture.shift()!
      return {
        past: [...prev.past, prev.present],
        present: newPresent,
        future: newFuture
      }
    })
  }, [])

  const canUndo = history.past.length > 0
  const canRedo = history.future.length > 0

  return {
    state: history.present,
    setState,
    undo,
    redo,
    canUndo,
    canRedo,
    reset: (newState: T) => setHistory({ past: [], present: newState, future: [] })
  }
}

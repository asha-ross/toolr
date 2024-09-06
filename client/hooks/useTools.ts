// TODO: Update these hooks to integrate the ability to add, edit, and delete tool information
// We'll need to create and use the following API functions in tools.ts:
//   - addTool
//   - editTool
//   - deleteTool

// TODO: Create custom hooks to use these API functions:
//   - useAddTool
//   - useEditTool
//   - useDeleteTool

// TODO: Update useTools to include these new mutation hooks

// Note: We'll use "useMutation" from react-query to create these hooks

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getTools,
  addTool,
  editTool,
  deleteTool,
  getToolsByCategory,
} from '../apis/tools'
import { Tools } from '../../models/tools'

// Hook to fetch all tools
export function useTools() {
  const query = useQuery({
    queryKey: ['tools'],
    queryFn: () => getTools(),
  })
  return {
    ...query,
  }
}

// Hook for adding a tool
export function useAddTool() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addTool,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] })
    },
    onError: (error) => {
      console.error('Error adding tool:', error)
    },
  })
}

export function useToolsByCategory(category?: string) {
  const query = useQuery({
    queryKey: ['tools', category],
    queryFn: () => getToolsByCategory(category),
    enabled: !!category,
  })
  return {
    ...query,
  }
}

// Hook for editing a tool
export function useEditTool() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Tools> }) =>
      editTool(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] })
    },
    onError: (error) => {
      console.error('Error editing tool:', error)
    },
  })
}

// Hook for deleting a tool
export function useDeleteTool() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteTool(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tools'] })
    },
    onError: (error) => {
      console.error('Error deleting tool:', error)
    },
  })
}

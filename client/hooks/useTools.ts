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

import {
  useQuery,
  useMutation,
  useQueryClient,
  MutationFunction,
} from '@tanstack/react-query'
import { getFruits } from '../apis/tools.ts'

export function useFruits() {
  const query = useQuery({ queryKey: ['fruits'], queryFn: getFruits })
  return {
    ...query,
    // Extra queries go here e.g. addFruit: useAddFruit()
  }
}

export function useFruitsMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fruits'] })
    },
  })

  return mutation
}

import type { TodoPostInputParams, TodoUpdateInputParams } from '@/types/todo'

import { useMutation, useQueryClient } from 'react-query'

import { TODOS } from './query-keys'
import { sendTodo, updateTodo } from './todo-api'

export const useSendTodo = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (params: TodoPostInputParams) => sendTodo(params),
    onSuccess: () => {
      queryClient.refetchQueries([TODOS])
    },
  })

  return {
    sendTodo: mutateAsync,
    ...rest,
  }
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (params: TodoUpdateInputParams) => updateTodo(params),
    onSuccess: () => {
      queryClient.refetchQueries([TODOS])
    },
  })

  return {
    updateTodo: mutateAsync,
    ...rest,
  }
}

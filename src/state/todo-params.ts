import type { Updater } from 'react-query/types/core/utils'
import type { TodoParams } from '@/types/todo'

import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'

import { TODOS_PARAMS } from './query-keys'

export const useTodoParams = () => {
  const queryClient = useQueryClient()

  const { data: todoParams = defaultTodoParams } = useQuery<TodoParams>({
    queryKey: TODOS_PARAMS,
    queryFn: () => defaultTodoParams,
  })

  const setTodoParams = useCallback(
    (updater: Updater<TodoParams | undefined, TodoParams | undefined>) => {
      queryClient.setQueryData<TodoParams | undefined>(TODOS_PARAMS, updater)
    },
    [queryClient]
  )

  return {
    todoParams,
    setTodoParams,
  }
}
const now = new Date()
now.setDate(now.getDate() + 7)
const defaultTodoParams: TodoParams = {
  fromDateTIme: new Date().toISOString(),
  toDateTime: now.toISOString(),
}

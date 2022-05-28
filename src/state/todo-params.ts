import type { Updater } from 'react-query/types/core/utils'
import type { TodoParams } from '@/types/todo'

import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { startOfDay } from 'date-fns'

import { TODOS_PARAMS } from './query-keys'
import { useCurrentUser } from './auth-queries'
export const useTodoParams = () => {
  const queryClient = useQueryClient()
  const { currentUser } = useCurrentUser()
  const newDefaultParams = { ...defaultTodoParams, userId: currentUser?.id }
  const { data: todoParams = newDefaultParams } = useQuery<TodoParams>({
    queryKey: TODOS_PARAMS,
    queryFn: () => newDefaultParams,
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
const now = startOfDay(new Date())
now.setDate(now.getDate() + 7)
const defaultTodoParams: TodoParams = {
  fromDateTime: startOfDay(new Date()).toISOString(),
  toDateTime: now.toISOString(),
}

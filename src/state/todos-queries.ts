import type { Todo, TodoGet, TodoParams } from '@/types/todo'
import type { AxiosError } from 'axios'

import { useQuery } from 'react-query'

import { TODOS } from './query-keys'
import { fetchTodos } from './todo-api'

export const useTodos = (todoParams: TodoParams) => {
  const { data: todos, ...rest } = useQuery<TodoGet[], AxiosError>({
    queryKey: [TODOS, todoParams],
    queryFn: () => fetchTodos(todoParams),
    retry: false,
  })

  return { todos, ...rest }
}

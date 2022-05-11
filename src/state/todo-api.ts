import type { Todo, TodoParams } from '@/types/todo'

import { axios } from '@/lib/axios'

export const fetchTodos = (todoParams: TodoParams): Promise<Todo[]> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/todos',
      params: todoParams,
    })
    .then((res) => res.data)
}

import type { Todo, TodoParams, TodoPostInputParams, TodoUpdateInputParams } from '@/types/todo'

import { axios } from '@/lib/axios'
export const fetchTodos = (todoParams: TodoParams): Promise<Todo[]> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/getEvents',
      params: todoParams,
    })
    .then((res) => res.data)
}

export const sendTodo = (todoPost: TodoPostInputParams) => {
  return axios
    .request({
      method: 'POST',
      url: '/api/v1/sendEvent',
      data: todoPost,
    })
    .then((res) => res.data)
}

export const updateTodo = (todoPut: TodoUpdateInputParams) => {
  return axios
    .request({
      method: 'PUT',
      url: '/api/v1/updateEvent',
      data: todoPut,
    })
    .then((res) => res.data)
}

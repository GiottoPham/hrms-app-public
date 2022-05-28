import type { Employee } from '@/types/employee'

import { axios } from '@/lib/axios'

export const fetchEmployee = (id: number): Promise<Employee> => {
  return axios
    .request({
      method: 'GET',
      url: `/api/v1/employee/${id}`,
    })
    .then((res) => res.data)
}
export const fetchEmployees = (): Promise<Employee[]> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/employees',
    })
    .then((res) => res.data)
}

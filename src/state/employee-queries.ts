import type { Employee } from '@/types/employee'
import type { AxiosError } from 'axios'

import { useQuery } from 'react-query'

import { fetchEmployee, fetchEmployees } from './employee-api'
import { EMPLOYEE, EMPLOYEES } from './query-keys'

export const useEmployee = (id: number) => {
  const { data: employee, ...rest } = useQuery<Employee, AxiosError>({
    queryKey: [EMPLOYEE, id],
    queryFn: () => fetchEmployee(id),
    retry: false,
  })

  return { employee, ...rest }
}

export const useEmployees = () => {
  const { data: employees, ...rest } = useQuery<Employee[], AxiosError>({
    queryKey: [EMPLOYEES],
    queryFn: () => fetchEmployees(),
    retry: false,
  })

  return { employees, ...rest }
}

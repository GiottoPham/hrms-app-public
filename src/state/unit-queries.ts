import type { AxiosError } from 'axios'

import { useQuery } from 'react-query'

import { axios } from '@/lib/axios'

import { UNITS } from './query-keys'
export const fetchUnits = (nested?: boolean): Promise<Unit[]> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/departments',
      params: {
        nested,
      },
    })
    .then((res) => res.data)
}
export type Unit = {
  id: number
  type: 'head' | 'sub-head' | 'sub'
  name: string
  peopleNumber: number
  description: string
  subUnits: Unit[] | null
  managerOfUnitId: number
}

export const useUnits = (nested?: boolean) => {
  const { data: units, ...rest } = useQuery<Unit[], AxiosError>({
    queryKey: [UNITS, nested],
    queryFn: () => fetchUnits(nested),
    retry: false,
  })

  return { units, ...rest }
}

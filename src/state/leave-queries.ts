import type { Leaves } from '@/types/leave'
import type { AxiosError } from 'axios'

import { useQuery } from 'react-query'

import { fetchLeaves } from './leave-api'
import { LEAVE } from './query-keys'

export const useLeaves = (id: number) => {
  const { data: leaves, ...rest } = useQuery<Leaves, AxiosError>({
    queryKey: [LEAVE],
    queryFn: () => fetchLeaves(id),
    retry: false,
  })

  return { leaves, ...rest }
}

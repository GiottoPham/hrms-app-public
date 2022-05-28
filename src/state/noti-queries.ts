import type { AxiosError } from 'axios'

import { useQuery } from 'react-query'

import { getNotiTokens } from './noti-api'
import { NOTI } from './query-keys'

export const useNotiToken = () => {
  const { data: listTokens, ...rest } = useQuery<string[], AxiosError>({
    queryKey: [NOTI],
    queryFn: () => getNotiTokens(),
    retry: false,
  })

  return { listTokens, ...rest }
}

import type { HaveCheckedinOutput } from '@/types/check-in'
import type { AxiosError } from 'axios'

import { useQuery } from 'react-query'

import { haveCheckedin } from './checkin-api'
import { CHECKIN } from './query-keys'

export const useHaveCheckedin = (userId: number) => {
  const { data: checkedin, ...rest } = useQuery<HaveCheckedinOutput, AxiosError>({
    queryKey: [CHECKIN, userId],
    queryFn: () => haveCheckedin(userId, new Date().toISOString()),
    retry: false,
  })

  return { checkedin, ...rest }
}

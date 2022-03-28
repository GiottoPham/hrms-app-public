import type { HaveCheckedinOutput } from '@/types/check-in'
import type { AxiosError } from 'axios'

import { useQuery } from 'react-query'

import { haveCheckedin } from './checkin-api'
import { CHECKIN } from './query-keys'

export const useHaveCheckedin = (userId: number, date: string) => {
  const { data: checkedin, ...rest } = useQuery<HaveCheckedinOutput, AxiosError>({
    queryKey: [CHECKIN],
    queryFn: () => haveCheckedin(userId, date),
    retry: false,
  })

  return { checkedin, ...rest }
}

import type { CheckinInputParams, CheckoutInputParams } from '@/types/check-in'

import { useMutation, useQueryClient } from 'react-query'

import { CHECKIN } from './query-keys'
import { sendCheckin_inRequest, sendCheckin_outRequest } from './checkin-api'
import { useCurrentUser } from './auth-queries'
export const useCheckin_inRequest = () => {
  const queryClient = useQueryClient()
  const { currentUser } = useCurrentUser()
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (params: CheckinInputParams) => sendCheckin_inRequest(params),
    onSuccess: () => {
      if (currentUser) queryClient.refetchQueries([CHECKIN, currentUser.id])
    },
  })

  return {
    sendCheckin_inRequest: mutateAsync,
    ...rest,
  }
}

export const useCheckin_outRequest = () => {
  const queryClient = useQueryClient()
  const { currentUser } = useCurrentUser()
  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (params: CheckoutInputParams) => sendCheckin_outRequest(params),
    onSuccess: () => {
      if (currentUser) queryClient.refetchQueries([CHECKIN, currentUser.id])
    },
  })

  return {
    sendCheckin_outRequest: mutateAsync,
    ...rest,
  }
}

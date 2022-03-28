import type { CheckinInputParams, CheckoutInputParams } from '@/types/check-in'

import { useMutation, useQueryClient } from 'react-query'

import { CHECKIN } from './query-keys'
import { sendCheckin_inRequest, sendCheckin_outRequest } from './checkin-api'
export const useCheckin_inRequest = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (params: CheckinInputParams) => sendCheckin_inRequest(params),
    onSuccess: () => {
      queryClient.refetchQueries([CHECKIN])
    },
  })

  return {
    sendCheckin_inRequest: mutateAsync,
    ...rest,
  }
}

export const useCheckin_outRequest = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (params: CheckoutInputParams) => sendCheckin_outRequest(params),
    onSuccess: () => {
      queryClient.refetchQueries([CHECKIN])
    },
  })

  return {
    sendCheckin_outRequest: mutateAsync,
    ...rest,
  }
}

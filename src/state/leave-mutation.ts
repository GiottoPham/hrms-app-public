import type { LeaveInputParams } from '../types/leave'

import { useMutation, useQueryClient } from 'react-query'

import { LEAVE } from './query-keys'
import { sendLeaveRequest } from './leave-api'
export const useSendLeaveRequest = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (params: LeaveInputParams) => sendLeaveRequest(params),
    onSuccess: () => {
      queryClient.refetchQueries([LEAVE])
    },
  })

  return {
    sendLeaveRequest: mutateAsync,
    ...rest,
  }
}

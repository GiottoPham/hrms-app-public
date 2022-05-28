import type { SendNotiInput } from '@/types/Noti'

import { useMutation, useQueryClient } from 'react-query'

import { NOTI } from './query-keys'
import { saveNotiToken } from './noti-api'
export const useSendNotiToken = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: (params: SendNotiInput) => saveNotiToken(params),
    onSuccess: () => {
      queryClient.refetchQueries([NOTI])
    },
  })

  return {
    saveNotiTokenuest: mutateAsync,
    ...rest,
  }
}

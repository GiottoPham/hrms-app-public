import type { Auth } from '../state/auth-api'

import * as SecureStore from 'expo-secure-store'
import { useMutation, useQueryClient } from 'react-query'

import { AUTH } from './query-keys'
import { login } from './auth-api'
export const useLogin = () => {
  const queryClient = useQueryClient()

  const { mutateAsync, ...rest } = useMutation({
    mutationFn: login,
    onSuccess: async (auth) => {
      queryClient.setQueryData<Auth>(AUTH, auth)
      await SecureStore.setItemAsync('token', auth.token)
      await SecureStore.setItemAsync('id', auth.id.toString())
    },
  })

  return {
    login: mutateAsync,
    ...rest,
  }
}

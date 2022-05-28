import type { JwtPayload } from 'jwt-decode'

import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'
import { useQueryClient, useQuery } from 'react-query'
import jwt_decode from 'jwt-decode'

import { authRequestInterceptor, axios } from '@/lib/axios'

import { Auth, fetchUser } from '../state/auth-api'

import { AUTH, CURRENT_USER } from './query-keys'

export const useCurrentUser = () => {
  const { auth } = useAuth()

  const {
    data: currentUser,
    isLoading: isLoadingUser,
    ...rest
  } = useQuery([CURRENT_USER, auth?.token], fetchUser(auth?.id as number), {
    enabled: true,
    retry: false,
  })
  return {
    currentUser: currentUser,
    isLoadingUser,
    ...rest,
  }
}
export const useAuth = () => {
  const queryClient = useQueryClient()
  const auth = queryClient.getQueryData<Auth>(AUTH)
  const [token, setToken] = useState<string | null>(null)
  const [id, setId] = useState<number | null>(null)
  SecureStore.getItemAsync('token').then((data) => setToken(data))
  SecureStore.getItemAsync('id').then((data) => setId(Number(data)))

  if (!auth) {
    const exp = token ? jwt_decode<JwtPayload>(token).exp : undefined
    const isTokenExpired = exp && new Date().getTime() >= exp * 1000
    if (token && !isTokenExpired)
      queryClient.setQueryData<Auth>([AUTH], {
        token: token,
        id: Number(id),
      })
  }

  const accessToken = auth?.token

  useEffect(() => {
    if (accessToken) {
      axios.interceptors.request.use(authRequestInterceptor(accessToken))
    }
  }, [accessToken])

  return { auth: auth }
}

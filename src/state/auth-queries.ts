import * as SecureStore from 'expo-secure-store'
import { useEffect } from 'react'
import { useQueryClient, useQuery } from 'react-query'

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
  let token = ''
  const getToken = async () => {
    token = (await SecureStore.getItemAsync('token')) as string
  }
  getToken()
  if (!auth && token) {
    const isTokenExpired = (token: string) =>
      Date.now() >= JSON.parse(atob(token.split('.')[1])).exp * 1000
    if (token && !isTokenExpired(token))
      queryClient.setQueryData<Auth>([AUTH], {
        token: token,
        id: parseInt(localStorage.getItem('id') as string),
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

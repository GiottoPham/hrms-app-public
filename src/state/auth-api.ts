import type { UserDetail } from '../types/user'

import { axios } from '../lib/axios'
export const fetchUser = (id: number) => (): Promise<UserDetail> => {
  return axios
    .request({
      method: 'GET',
      url: `/api/v1/account/${id}`,
    })
    .then((res) => res.data)
}
export const login = ({ username, password }: { username: string; password: string }) => {
  return axios
    .request<Auth>({
      method: 'POST',
      url: '/api/v1/auth/mobile/login',
      data: {
        username,
        password,
      },
    })
    .then((res) => res.data)
}
export type Auth = {
  token: string
  id: number
}

import type { AxiosRequestConfig } from 'axios'

import { default as Axios } from 'axios'

/**
 * React Query & axios interceptor https://github.com/tannerlinsley/react-query/discussions/931#discussioncomment-59635
 */
export const authRequestInterceptor = (accessToken: string) => (config: AxiosRequestConfig) => {
  config.headers = { ...config.headers, Accept: 'application/json' }

  if (!config.headers?.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
}

export const axios = Axios.create({
  withCredentials: true,
  baseURL: 'http://hrmsapp-env.eba-fgysdbgy.ap-southeast-1.elasticbeanstalk.com',
})

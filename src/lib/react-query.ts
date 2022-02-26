import type { AxiosError } from 'axios'
import type { UseQueryOptions, UseMutationOptions, DefaultOptions } from 'react-query'

import NetInfo from '@react-native-community/netinfo'
import { onlineManager, QueryClient } from 'react-query'

export const setupReactQueryOnlineRefetch = () => {
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener(({ isConnected }) => setOnline(!!isConnected))
  })
}

const queryConfig: DefaultOptions = {
  queries: {
    retry: false,
    // useErrorBoundary: true,
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

export type QueryConfig<FetcherFnType extends (...args: unknown[]) => unknown> = UseQueryOptions<
  Awaited<ReturnType<FetcherFnType>>
>

export type MutationConfig<FetcherFnType extends (...args: unknown[]) => unknown> =
  UseMutationOptions<Awaited<ReturnType<FetcherFnType>>, AxiosError, Parameters<FetcherFnType>[0]>

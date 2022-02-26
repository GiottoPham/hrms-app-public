import type { StackHeaderProps } from '@react-navigation/stack'

import { useQuery, useQueryClient } from 'react-query'
import { useCallback } from 'react'

import { LAST_VISITED_EXPLORE_MAP_ROUTE_KEY } from './query-keys'

export const useLastVistedExploreMapRoute = () => {
  const queryClient = useQueryClient()

  const { data: lastVistedExploreMapRoute } = useQuery<RouteType | undefined>({
    queryKey: LAST_VISITED_EXPLORE_MAP_ROUTE_KEY,
    queryFn: () => undefined,
    staleTime: Infinity,
    refetchOnMount: false,
  })

  const setLastVistedExploreMapRoute = useCallback(
    (route?: RouteType) => {
      queryClient.setQueryData<RouteType | undefined>(LAST_VISITED_EXPLORE_MAP_ROUTE_KEY, route)
    },
    [queryClient]
  )

  return { lastVistedExploreMapRoute, setLastVistedExploreMapRoute }
}

type RouteType = StackHeaderProps['route']

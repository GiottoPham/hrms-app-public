import { useQuery } from 'react-query'

import { loadFont } from './app-api'
import { FONTS } from './query-keys'

export const useFonts = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, ...rest } = useQuery({
    queryKey: [FONTS],
    queryFn: loadFont,
    cacheTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  return rest
}

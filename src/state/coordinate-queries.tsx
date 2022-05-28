import { useQuery } from 'react-query'

import { LOCATIONS } from './query-keys'
import { fetchCoordinates, LocationMap } from './coordinates-api'
export const useCoordinate = () => {
  const { data: coordinates, ...rest } = useQuery<LocationMap>({
    queryKey: [LOCATIONS],
    queryFn: () => fetchCoordinates(),
  })

  return { coordinates, ...rest }
}

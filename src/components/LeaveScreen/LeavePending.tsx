import type { LeaveParse } from '@/types/leave'

import { RefreshControl, ScrollView, View } from 'react-native'
import { useQueryClient } from 'react-query'
import React, { useCallback, useState } from 'react'

import { tw } from '@/lib/tailwind'
import { LEAVE } from '@/state/query-keys'

import { PendingComponent } from './PendingContainer'
export const LeavePending = ({ leaveList }: { leaveList: LeaveParse[] }) => {
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    queryClient.refetchQueries(LEAVE).then(() => setRefreshing(false))
  }, [])
  return (
    <View style={tw('flex relative flex-1 bg-gray-200')}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {leaveList.map((obj, index) => (
          <PendingComponent leave={obj} key={index} />
        ))}
      </ScrollView>
    </View>
  )
}

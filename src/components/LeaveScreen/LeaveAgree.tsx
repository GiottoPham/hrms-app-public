import type { LeaveParse } from '@/types/leave'

import { RefreshControl, ScrollView, View } from 'react-native'
import { useQueryClient } from 'react-query'
import React, { useCallback, useState } from 'react'

import { tw } from '@/lib/tailwind'
import { LEAVE } from '@/state/query-keys'

import { AgreeComponent } from './AcceptContainer'
export const LeaveAccept = ({ leaveList }: { leaveList: LeaveParse[] }) => {
  const queryClient = useQueryClient()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    queryClient.refetchQueries(LEAVE).then(() => setRefreshing(false))
  }, [])
  return (
    <View style={tw('flex flex-1 bg-gray-200')}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {leaveList.map((obj, index) => (
          <AgreeComponent leave={obj} key={index} />
        ))}
      </ScrollView>
    </View>
  )
}

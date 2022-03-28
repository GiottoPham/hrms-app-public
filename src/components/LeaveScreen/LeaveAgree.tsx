import type { LeaveParse, Leaves } from '@/types/leave'

import { ScrollView, View, Text } from 'react-native'

import { tw } from '@/lib/tailwind'

import { AgreeComponent } from './AcceptContainer'
export const LeaveAccept = ({ leaveList }: { leaveList: LeaveParse[] }) => {
  return (
    <View style={tw('flex flex-1 bg-gray-200')}>
      <ScrollView>
        {leaveList.map((obj, index) => (
          <AgreeComponent leave={obj} key={index} />
        ))}
      </ScrollView>
    </View>
  )
}

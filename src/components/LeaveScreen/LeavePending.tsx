import type { LeaveParse } from '@/types/leave'

import { ScrollView, View } from 'react-native'

import { tw } from '@/lib/tailwind'

import { PendingComponent } from './PendingContainer'
export const LeavePending = ({ leaveList }: { leaveList: LeaveParse[] }) => {
  return (
    <View style={tw('flex relative flex-1 bg-gray-200')}>
      <ScrollView>
        <ScrollView>
          {leaveList.map((obj, index) => (
            <PendingComponent leave={obj} key={index} />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  )
}

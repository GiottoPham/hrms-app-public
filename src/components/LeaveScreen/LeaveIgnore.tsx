import type { LeaveParse } from '@/types/leave'

import { ScrollView, View} from 'react-native'

import { tw } from '@/lib/tailwind'

import { IgnoreComponent } from './IgnoreContainer'
export const LeaveIgnore = ({ leaveList }: { leaveList: LeaveParse[] }) => {
  return (
    <View style={tw('flex flex-1 bg-gray-200')}>
      <ScrollView>
        <ScrollView>
          {leaveList.map((obj, index) => (
            <IgnoreComponent leave={obj} key={index} />
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  )
}

import type { SvgProps } from 'react-native-svg'

import Svg, { Path } from 'react-native-svg'

export const CalendarIcon = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M7.667 11.25H5.11v2.5h2.556v-2.5zm5.11 0h-2.555v2.5h2.556v-2.5zm5.112 0h-2.556v2.5h2.556v-2.5zm2.555-8.75h-1.277V0H16.61v2.5H6.39V0H3.833v2.5H2.556C1.137 2.5.013 3.625.013 5L0 22.5C0 23.875 1.137 25 2.556 25h17.888C21.85 25 23 23.875 23 22.5V5c0-1.375-1.15-2.5-2.556-2.5zm0 20H2.556V8.75h17.888V22.5z" />
    </Svg>
  )
}

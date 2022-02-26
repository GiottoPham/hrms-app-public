import type { SvgProps } from 'react-native-svg'

import Svg, { Path } from 'react-native-svg'

export const CheckinIcon = (props: SvgProps) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <Path d="M20.833 6.25h-4.166V4.167a2.076 2.076 0 00-2.084-2.084h-4.166a2.076 2.076 0 00-2.084 2.084V6.25H4.167a2.067 2.067 0 00-2.073 2.083l-.01 11.459c0 1.156.926 2.083 2.083 2.083h16.666a2.076 2.076 0 002.084-2.083V8.333a2.076 2.076 0 00-2.084-2.083zm-6.25 0h-4.166V4.167h4.166V6.25z" />
    </Svg>
  )
}

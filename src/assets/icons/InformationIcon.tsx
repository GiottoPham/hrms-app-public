import type { SvgProps } from 'react-native-svg'

import Svg, { Path } from 'react-native-svg'

export const InformationIcon = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M12.5 0C5.6 0 0 5.6 0 12.5S5.6 25 12.5 25 25 19.4 25 12.5 19.4 0 12.5 0zm0 3.75a3.745 3.745 0 013.75 3.75 3.745 3.745 0 01-3.75 3.75A3.745 3.745 0 018.75 7.5a3.745 3.745 0 013.75-3.75zm0 17.75A9 9 0 015 17.475c.037-2.488 5-3.85 7.5-3.85 2.488 0 7.462 1.363 7.5 3.85a9 9 0 01-7.5 4.025z" />
    </Svg>
  )
}

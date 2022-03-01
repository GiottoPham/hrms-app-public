import type { SvgProps } from 'react-native-svg'

import Svg, { Path } from 'react-native-svg'

export const SalaryIcon = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 25 25" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <Path d="M22.222 2.5h-5.805C15.833 1.05 14.306 0 12.5 0c-1.806 0-3.333 1.05-3.917 2.5H2.778C1.25 2.5 0 3.625 0 5v17.5C0 23.875 1.25 25 2.778 25h19.444C23.75 25 25 23.875 25 22.5V5c0-1.375-1.25-2.5-2.778-2.5zm-9.722 0c.764 0 1.389.563 1.389 1.25 0 .688-.625 1.25-1.389 1.25s-1.389-.563-1.389-1.25c0-.688.625-1.25 1.389-1.25zM15.278 20H5.556v-2.5h9.722V20zm4.166-5H5.556v-2.5h13.888V15zm0-5H5.556V7.5h13.888V10z" />
    </Svg>
  )
}

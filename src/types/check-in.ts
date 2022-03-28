export type CheckinTabProps = {
  CheckinGPS: undefined
  CheckinQR: undefined
}
export type InputParam = {
  userId: number
  deviceId: string
  date: string
}
export type CheckinInputParams = InputParam & {
  timeIn: string
}
export type CheckoutInputParams = InputParam & {
  timeOut: string
}
export type HaveCheckedinOutput = {
  timeIn: string
  checkedIn: boolean
}

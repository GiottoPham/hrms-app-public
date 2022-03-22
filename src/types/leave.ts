export type Leaves = Leave[]
export type Leave = LeaveInputParams & { id: number }
export type LeaveInputParams = {
  amount: number
  fromDate: string
  toDate: string
  leaveType: number
  reason: string
  userId: number
}

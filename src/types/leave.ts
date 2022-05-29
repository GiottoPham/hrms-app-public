export type Leaves = Leave[]
export type Leave = LeaveInputParams & { id: number; status: number; applicationDate: string }
export type LeaveInputParams = {
  amount: number
  fromDate: string
  toDate: string
  leaveType?: LeaveTypeNum
  reason: string
  userId: number
}
export type LeaveParse = {
  amount: number
  fromDate: string
  toDate: string
  leaveType: string
  reason: string
  applicationDate: string
}
export enum LeaveType {
  Paid = 'Unpaid Leave',
  Unpaid = 'Annual Leave',
}
export type LeaveTypeNum = 0 | 1

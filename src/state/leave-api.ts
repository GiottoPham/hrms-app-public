import type { LeaveInputParams, Leaves } from '@/types/leave'

import { axios } from '../lib/axios'
export const fetchLeaves = (id: number): Promise<Leaves> => {
  return axios
    .request({
      method: 'GET',
      url: `/api/v1/getLeave/${id}`,
    })
    .then((res) => res.data)
}
export const sendLeaveRequest = (leaveParams: LeaveInputParams) => {
  return axios
    .request({
      method: 'POST',
      url: '/api/v1/sendRequestLeave',
      data: leaveParams,
    })
    .then((res) => res.data)
}

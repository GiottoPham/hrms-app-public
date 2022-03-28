import type { CheckinInputParams, CheckoutInputParams, HaveCheckedinOutput } from '@/types/check-in'

import axios from 'axios'
export const sendCheckin_inRequest = (checkinParams: CheckinInputParams) => {
  return axios
    .request({
      method: 'POST',
      url: '/api/v1/checkin_in',
      data: checkinParams,
    })
    .then((res) => res.data)
}

export const sendCheckin_outRequest = (checkoutParams: CheckoutInputParams) => {
  return axios
    .request({
      method: 'POST',
      url: '/api/v1/checkin_out',
      data: checkoutParams,
    })
    .then((res) => res.data)
}

export const haveCheckedin = (userId: number, date: string): Promise<HaveCheckedinOutput> => {
  return axios
    .request({
      method: 'GET',
      url: `/api/v1/haveCheckedin?userId=${userId}?date=${date}`,
    })
    .then((res) => res.data)
}

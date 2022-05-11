import type { NotiInputForOne, SendNotiInput } from '@/types/Noti'

import { axios } from '@/lib/axios'

export const sendNoti = async (notiInput: NotiInputForOne) => {
  console.log(notiInput)
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(notiInput),
  })
}
export const saveNotiToken = (token: SendNotiInput) => {
  return axios
    .request({
      method: 'POST',
      url: '/api/v1/sendRequestLeave',
      data: token,
    })
    .then((res) => res.data)
}
export const getNotiTokens = (): Promise<string[]> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/getAllNotiTokens',
    })
    .then((res) => res.data)
}

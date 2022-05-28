import type { Payroll } from '@/types/payroll'
import type { PayrollParams } from '@/types/payroll-params'

import { axios } from '@/lib/axios'

export const fetchPayroll = (payrollParams: PayrollParams): Promise<Payroll> => {
  return axios
    .request({
      method: 'GET',
      url: '/api/v1/payment',
      params: payrollParams,
    })
    .then((res) => res.data)
}

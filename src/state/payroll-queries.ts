import type { Payroll } from '@/types/payroll'
import type { PayrollParams } from '@/types/payroll-params'
import type { AxiosError } from 'axios'

import { useQuery } from 'react-query'

import { fetchPayroll } from './payroll-api'
import { PAYROLL } from './query-keys'

export const usePayroll = (payrollParams: PayrollParams) => {
  const { data: payroll, ...rest } = useQuery<Payroll, AxiosError>({
    queryKey: [PAYROLL, payrollParams],
    queryFn: () => fetchPayroll(payrollParams),
    retry: false,
  })

  return { payroll, ...rest }
}

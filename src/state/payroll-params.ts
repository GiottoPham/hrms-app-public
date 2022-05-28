import type { Updater } from 'react-query/types/core/utils'
import type { PayrollParams } from '@/types/payroll-params'

import { useCallback } from 'react'
import { useQuery, useQueryClient } from 'react-query'

import { PAYROLL_PARAMS } from './query-keys'

export const usePayrollParams = () => {
  const queryClient = useQueryClient()

  const { data: payrollParams = defaultPayrollParams } = useQuery<PayrollParams>({
    queryKey: PAYROLL_PARAMS,
    queryFn: () => defaultPayrollParams,
  })

  const setPayrollParams = useCallback(
    (updater: Updater<PayrollParams | undefined, PayrollParams | undefined>) => {
      queryClient.setQueryData<PayrollParams | undefined>(PAYROLL_PARAMS, updater)
    },
    [queryClient]
  )

  return {
    payrollParams,
    setPayrollParams,
  }
}
const defaultPayrollParams: PayrollParams = {
  month: new Date().toISOString(),
  employeeId: 1,
}

import type { Bonus } from '@frontend/types/employee'

export type Payroll = {
  basicSalary: string
  monthlyInfo: {
    actualDay: string
    standardDay: string
    paidLeave: string
    unpaidLeave: string
  }
  totalDerivedSalary: string
  derivedSalary: string
  bonus: Bonus[]
  totalBonus: string
  mandatoryInsurance: string
  taxableIncome: string
  personalIncomeTax: string
  netIncome: string
}

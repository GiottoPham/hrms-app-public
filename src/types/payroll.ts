import type { Bonus } from './employee'

export type Payroll = {
  basicSalary: number
  monthlyInfo: {
    actualDay: number
    standardDay: number
    paidLeave: number
    unpaidLeave: number
  }
  totalDerivedIncome: number
  totalDeduction: number
  derivedSalary: number
  bonus: Bonus[]
  totalBonus: number
  mandatoryInsurance: number
  taxableIncome: number
  personalIncomeTax: number
  netIncome: number
  dependentRelief: number
  allowanceNotSubjectedToTax: number
  anotherIncome: number
  personalRelief: number
}

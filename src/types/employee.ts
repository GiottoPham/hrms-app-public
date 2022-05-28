import type { UserInputParams } from './user'

export type Employee = {
  id: number
  personalDetail: Omit<PersonalDetailInputParams, 'avatar'> & {
    avatar: string
  }
  jobDetail: JobDetailInputParams
  insuranceDetail: InsuranceInputParams
}
export type PersonalDetailInputParams = {
  avatar: File | Blob
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
  phone: string
  permanentAddress: Address
  temporaryAddress: Address
}
export type JobDetailInputParams = {
  joinDate: string
  jobId: number
  pit: string
  departmentId: number
  salaryGroup: number
  salary: string
  bonus: Bonus[]
}
export type Address = {
  cityId: number
  districtId: number
  wardId: number
  address: string
}
export type Bonus = {
  bonusName: string
  bonusAmount: number
}

export type InsuranceInputParams = {
  id: number
  cityId: number
  kcbId: number
  health: InsuranceCommon
  social: InsuranceCommon
  unemployment: InsuranceCommon
}
export type InsuranceCommon = {
  number: string
  issue_date: string
  to_date: string
  from_date: string
}
export type EmployeeParams = {
  jobDetail: JobDetailInputParams
  personalDetail: PersonalDetailInputParams
  accountDetail: AssignAccountInputParams
}
export type AssignAccountInputParams = {
  type: 'available' | 'new'
  id: number | null
  newAccount: UserInputParams | null
}

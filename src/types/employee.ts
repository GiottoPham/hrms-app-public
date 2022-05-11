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
  unitId: number
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
  health: InsuranceCommon & {
    cityId: number
    kcbId: number
  }
  social: InsuranceCommon
  unemployment: InsuranceCommon
}
export type InsuranceCommon = {
  number: string
  issueDate: string
  toDate: string
  fromDate: string
}

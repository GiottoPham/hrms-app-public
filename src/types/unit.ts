export type Unit = {
  id: number
  type: 'head' | 'sub-head' | 'sub'
  name: string
  peopleNumber: number
  description: string
  subUnits: Unit[] | null
  managerOfUnitId: number
}
export type UnitInputParams = {
  name: string
  description: string
  headOfUnitId: number
  managerOfUnitId: number
}

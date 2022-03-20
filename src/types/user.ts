export type UserInputParams = {
  username: string
  roleid: number
  password: string
  accountStatus: UserStatus
}
export type UserDetail = UserInputParams & { id: number }
export enum UserStatus {
  Enable = 'enable',
  Disable = 'disable',
}

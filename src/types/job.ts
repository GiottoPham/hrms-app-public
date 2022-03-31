export type JobDetail = JobInputParams & {
  id: number
}
export type JobInputParams = {
  title: string
  description: string
  note: string
}
export type JobDetailParams = {
  pagination?: number // 1 page = 10 item
  sort: {
    sortBy: keyof JobDetail // string
    sortOrder: 'asc' | 'desc'
  }
}

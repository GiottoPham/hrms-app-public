export type Todo = {
  id: number
  notes: string
  title: string
  time: string
  timeEnd: string
  type: string
  location: string
  eid: number[] | null
}
export type TodoGet = Omit<Todo, 'eid'>
export type TodoParams = {
  userId?: number
  toDateTime: string
  fromDateTime: string
}
export type TodoUpdateInputParams = Todo
export type TodoPostInputParams = Omit<Todo, 'id'> & {
  userId: number
}

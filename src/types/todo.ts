export type Todo = {
  id: number
  notes: string
  title: string
  time: string
}
export type TodoParams = {
  userId?: number
  toDateTime: string
  fromDateTime: string
}
export type TodoUpdateInputParams = Todo
export type TodoPostInputParams = Omit<Todo, 'id'> & {
  userId: number
}

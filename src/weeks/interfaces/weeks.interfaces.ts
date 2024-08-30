import { UserModel } from 'src/users/schemas'
import { NoteModel } from 'src/notes/schemas'
import { ITask } from 'src/tasks/interfaces'

export interface IWeekDay {
  id: string
  day: string
  notes: NoteModel | null
  tasks: ITask[] | null
  date: Date
}

export interface IGetWeekParams {
  user: UserModel
  date: Date
}

export interface IGetWeekResponse {
  message: string
  weekDays: IWeekDay[]
}

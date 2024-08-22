import { UserModel } from 'src/users/schemas'
import { TaskModel } from 'src/tasks/schemas'
import { NoteModel } from 'src/notes/schemas'

export interface IWeekDay {
  notes: NoteModel | null
  completedTasks: TaskModel[] | null
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

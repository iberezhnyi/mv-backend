import { TaskModel } from '../schemas'

interface ITask extends Partial<TaskModel> {}

export interface ITaskResponse {
  message: string
  task: ITask
}

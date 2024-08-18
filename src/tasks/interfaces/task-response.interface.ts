import { TaskModel } from '../schemas'

interface ITask extends Partial<TaskModel> {}

export interface ITaskResponse {
  message: string
  email?: string
  task?: Omit<ITask, 'completedBy'>
  tasks?: ITask[]
}

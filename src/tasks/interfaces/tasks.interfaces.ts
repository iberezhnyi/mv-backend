import { UserModel } from 'src/users/schemas'
import { UpdateTaskDto } from '../dto'
import { TaskModel } from '../schemas'

interface ITask extends Partial<TaskModel> {}

export interface ITaskResponse {
  message: string
  task: ITask
}

export interface IAllTaskResponse {
  message: string
  tasks: ITask[]
}

export interface ITaskCompleteParams {
  user: UserModel
  updateTaskData: UpdateTaskDto
}

export interface ITaskCompleteResponse {
  message: string
  email: string
  task: ITask
}

export interface IUpdateTaskParams {
  taskId: string
  updateTaskData: UpdateTaskDto
}

import { UserModel } from 'src/users/schemas'
import { UpdateTaskDto } from '../dto'
import { TaskModel } from '../schemas'

export interface ITask extends Partial<TaskModel> {
  completed?: boolean
}

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

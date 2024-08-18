import { UserModel } from 'src/users/schemas'
import { UpdateTaskDto } from '../dto'
import { TaskModel } from '../schemas'

export interface IUpdateTask {
  taskId?: Pick<TaskModel, 'id'>
  updateTaskData: UpdateTaskDto
  user?: UserModel
}

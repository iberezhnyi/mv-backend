import { Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
// import { UpdateTaskDto } from './dto/update-task.dto'
import { InjectModel } from '@nestjs/mongoose'
import { TaskModel } from './schemas'
import { Model } from 'mongoose'
import { UpdateTaskCompletionDto } from './dto/update-task-completion.dto'
import { UserModel } from 'src/users/schemas'
import { ITaskResponse } from './interfaces'

interface ICompleteTask {
  updateTaskData: UpdateTaskCompletionDto
  user: UserModel
}

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(TaskModel.name) private readonly taskModel: Model<TaskModel>,
  ) {}

  async createTask(createTaskData: CreateTaskDto): Promise<ITaskResponse> {
    const task = await this.taskModel.create({
      ...createTaskData,
      completedBy: {},
    })

    return {
      message: 'Task created successfully',
      task: {
        id: task._id,
        type: task.type,
        title: task.title,
        description: task.description,
        date: task.date,
      },
    }
  }

  findAll() {
    return `This action returns all tasks`
  }

  findOne(id: number) {
    return `This action returns a #${id} task`
  }

  async completeTask({ updateTaskData, user }: ICompleteTask) {
    const { taskId } = updateTaskData
    const { id: userId, email } = user

    const task = await this.taskModel.findById(taskId)

    if (task === null) {
      throw new Error('Task not found')
    }

    const isCompleted = task.completedBy.get(userId)

    let message: string

    if (isCompleted) {
      task.completedBy.delete(userId)
      message = 'Task removed from completed list'
    } else {
      task.completedBy.set(userId, true)
      message = 'Task successfully completed'
    }

    await task.save()

    return {
      message,
      email,
      task: {
        _id: task._id,
        title: task.title,
        description: task.description,
        date: task.date,
        type: task.type,
      },
    }
  }

  removeTask(id: number) {
    return `This action removes a #${id} task`
  }
}

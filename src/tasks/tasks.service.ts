import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { isValidObjectId, Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { TaskModel } from './schemas'
import { CreateTaskDto } from './dto'
import {
  IAllTaskResponse,
  ITaskCompleteParams,
  ITaskCompleteResponse,
  ITaskResponse,
  IUpdateTaskParams,
} from './interfaces'

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(TaskModel.name) private readonly taskModel: Model<TaskModel>,
  ) {}

  async findAll(): Promise<IAllTaskResponse> {
    const tasks = await this.taskModel
      .find()
      .select('-createdAt -updatedAt -__v')
      .exec()

    return {
      message: 'Tasks fetched successfully',
      tasks,
    }
  }

  async findOne(taskId: string): Promise<ITaskResponse> {
    if (!isValidObjectId(taskId)) {
      throw new BadRequestException('Invalid Task ID')
    }

    const task = await this.taskModel.findById(taskId).exec()

    if (task === null) {
      throw new NotFoundException('Task not found')
    }

    return {
      message: 'Task fetched successfully',
      task: {
        id: task._id,
        type: task.type,
        title: task.title,
        description: task.description,
        date: task.date,
      },
    }
  }

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

  async completeTask({
    user,
    updateTaskData,
  }: ITaskCompleteParams): Promise<ITaskCompleteResponse> {
    const { taskId } = updateTaskData

    if (user === undefined) {
      throw new UnauthorizedException('User not found')
    }

    const { id: userId, email } = user

    const task = await this.taskModel.findById(taskId)

    if (task === null) {
      throw new NotFoundException('Task not found')
    }

    const isCompleted = task.completedBy.get(userId) ?? false

    const message = isCompleted
      ? 'Task removed from completed list'
      : 'Task successfully completed'

    if (isCompleted) {
      task.completedBy.delete(userId)
    } else {
      task.completedBy.set(userId, true)
    }

    await task.save()

    return {
      message,
      email,
      task: {
        _id: task._id,
        type: task.type,
        title: task.title,
        description: task.description,
        date: task.date,
      },
    }
  }

  async updateTask({
    taskId,
    updateTaskData,
  }: IUpdateTaskParams): Promise<ITaskResponse> {
    if (!isValidObjectId(taskId)) {
      throw new BadRequestException('Invalid Task ID')
    }

    const task = await this.taskModel.findByIdAndUpdate(
      taskId,
      updateTaskData,
      { new: true },
    )

    if (task === null) {
      throw new NotFoundException('Task not found')
    }

    return {
      message: 'Task updated successfully',
      task: {
        id: task._id,
        type: task.type,
        title: task.title,
        description: task.description,
        date: task.date,
      },
    }
  }

  async removeTask(taskId: string): Promise<ITaskResponse> {
    if (!isValidObjectId(taskId)) {
      throw new BadRequestException('Invalid Task ID')
    }

    const task = await this.taskModel.findByIdAndDelete(taskId)

    if (task === null) {
      throw new NotFoundException('Task not found')
    }

    return {
      message: 'Task successfully removed',
      task: {
        id: task._id,
        type: task.type,
        title: task.title,
        description: task.description,
        date: task.date,
      },
    }
  }
}

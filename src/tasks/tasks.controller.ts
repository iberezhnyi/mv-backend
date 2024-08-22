import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common'
import { Request } from 'express'
import { JwtAuthGuard, RolesGuard } from 'src/common/guards'
import { Roles } from 'src/common/decorators'
import { TasksService } from './tasks.service'
import { UserModel } from 'src/users/schemas'
import { CreateTaskDto, UpdateTaskDto } from './dto'
import {
  IAllTaskResponse,
  ITaskCompleteResponse,
  ITaskResponse,
} from './interfaces'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async findAll(): Promise<IAllTaskResponse> {
    return await this.tasksService.findAll()
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  async findOne(@Param('id') taskId: string): Promise<ITaskResponse> {
    return await this.tasksService.findOne(taskId)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async createTask(
    @Body() createTaskData: CreateTaskDto,
  ): Promise<ITaskResponse> {
    return await this.tasksService.createTask(createTaskData)
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async completeTask(
    @Req() req: Request,
    @Body() updateTaskData: UpdateTaskDto,
  ): Promise<ITaskCompleteResponse> {
    const user = req.user as UserModel

    return await this.tasksService.completeTask({ user, updateTaskData })
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async updateTask(
    @Param('id') taskId: string,
    @Body() updateTaskData: UpdateTaskDto,
  ): Promise<ITaskResponse> {
    return await this.tasksService.updateTask({ taskId, updateTaskData })
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async removeTask(@Param('id') taskId: string): Promise<ITaskResponse> {
    return await this.tasksService.removeTask(taskId)
  }
}

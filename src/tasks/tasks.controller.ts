import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { JwtAuthGuard, RolesGuard } from 'src/common/guards'
import { Request as IRequest } from 'express'
import { Roles } from 'src/common/decorators'
import { CreateTaskDto, UpdateTaskDto } from './dto'
import { ITaskResponse, IUpdateTask } from './interfaces'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async findAll(): Promise<ITaskResponse> {
    return this.tasksService.findAll()
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get(':id')
  async findOne(@Param('id') taskId: string): Promise<ITaskResponse> {
    return this.tasksService.findOne(taskId)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async createTask(
    @Body() createTaskData: CreateTaskDto,
  ): Promise<ITaskResponse> {
    return this.tasksService.createTask(createTaskData)
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async completeTask(
    @Request() req: IRequest,
    @Body() updateTaskData: UpdateTaskDto,
  ): Promise<ITaskResponse> {
    return this.tasksService.completeTask({
      updateTaskData,
      user: req.user,
    } as IUpdateTask)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id')
  async updateTask(
    @Param('id') taskId: string,
    @Body() updateTaskData: UpdateTaskDto,
  ): Promise<ITaskResponse> {
    return this.tasksService.updateTask({
      taskId,
      updateTaskData,
    } as IUpdateTask)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async removeTask(@Param('id') taskId: string): Promise<ITaskResponse> {
    return this.tasksService.removeTask(taskId)
  }
}

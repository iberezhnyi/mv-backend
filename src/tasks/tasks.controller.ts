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
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskCompletionDto } from './dto/update-task-completion.dto'
import { JwtAuthGuard } from 'src/common/guards'
// import { UpdateTaskDto } from './dto/update-task.dto'
import { Request as IRequest } from 'express'
import { UserModel } from 'src/users/schemas'

interface ICompleteTask {
  updateTaskData: UpdateTaskCompletionDto
  user: UserModel
}

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body() createTaskData: CreateTaskDto) {
    return this.tasksService.createTask(createTaskData)
  }

  @Get()
  findAll() {
    return this.tasksService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id)
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async completeTask(
    @Request() req: IRequest,
    @Body() updateTaskData: UpdateTaskCompletionDto,
  ) {
    return this.tasksService.completeTask({
      updateTaskData,
      user: req.user,
    } as ICompleteTask)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id)
  }
}

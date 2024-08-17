import { Module } from '@nestjs/common'
import { TasksService } from './tasks.service'
import { TasksController } from './tasks.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { TaskModel, TaskModelSchema } from './schemas'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TaskModel.name, schema: TaskModelSchema },
    ]),
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}

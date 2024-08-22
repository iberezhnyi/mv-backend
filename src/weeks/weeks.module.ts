import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { TaskModel, TaskModelSchema } from 'src/tasks/schemas'
import { NoteModel, NoteModelSchema } from 'src/notes/schemas'
import { WeeksController } from './weeks.controller'
import { WeeksService } from './weeks.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NoteModel.name, schema: NoteModelSchema },
      { name: TaskModel.name, schema: TaskModelSchema },
    ]),
  ],
  controllers: [WeeksController],
  providers: [WeeksService],
})
export class WeeksModule {}

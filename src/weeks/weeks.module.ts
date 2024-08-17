import { Module } from '@nestjs/common'
import { WeeksService } from './weeks.service'
import { WeeksController } from './weeks.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { NoteModel, NoteModelSchema } from '../notes/schemas/note.schema'
import { TaskModel, TaskModelSchema } from 'src/tasks/schemas'

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

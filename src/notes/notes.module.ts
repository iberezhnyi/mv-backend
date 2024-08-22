import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { NoteModel, NoteModelSchema } from './schemas'
import { NotesController } from './notes.controller'
import { NotesService } from './notes.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NoteModel.name, schema: NoteModelSchema },
    ]),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}

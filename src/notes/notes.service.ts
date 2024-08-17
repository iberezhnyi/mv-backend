import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { NoteModel } from './schemas'
import { Model } from 'mongoose'
// import { UserDocument } from 'src/users/schemas'
import { CreateNoteDto } from './dto'
import { UserModel } from 'src/users/schemas'

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NoteModel.name)
    private readonly noteModel: Model<NoteModel>,
  ) {}

  async createNote(noteData: CreateNoteDto, user: UserModel) {
    const { note: noteFromData, date } = noteData

    const note = await this.noteModel.create({
      note: noteFromData,
      owner: user.id,
      date,
    })

    return {
      message: 'Note created',
      note,
      owner: { id: user.id, email: user.email },
    }
  }
}

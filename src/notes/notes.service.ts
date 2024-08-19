import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { NoteModel } from './schemas'
import { Model } from 'mongoose'
import { INoteResponse, INoteUpdate } from './interfaces'

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NoteModel.name)
    private readonly noteModel: Model<NoteModel>,
  ) {}

  async createNote({ noteData, user }: INoteUpdate): Promise<INoteResponse> {
    const { note: noteFromData, date } = noteData

    if (user === undefined) {
      throw new UnauthorizedException('User not found')
    }

    const note = await this.noteModel.create({
      note: noteFromData,
      owner: user.id,
      date,
    })

    return {
      message: 'Note created successfully',
      note: {
        id: note.id,
        date: note.date,
        note: note.note,
      },
      owner: {
        id: user.id,
        email: user.email,
      },
    }
  }

  async updateNote({
    noteId,
    noteData,
    user,
  }: INoteUpdate): Promise<INoteResponse> {
    const note = await this.noteModel.findOneAndUpdate(
      { _id: noteId, owner: user.id },
      { $set: noteData },
      { new: true },
    )

    if (note === null) {
      throw new NotFoundException('Note not found or not owned by user')
    }

    return {
      message: 'Note updated successfully',
      note: {
        id: note.id,
        date: note.date,
        note: note.note,
      },
      owner: {
        id: user.id,
        email: user.email,
      },
    }
  }

  async deleteNote({ noteId, user }: INoteUpdate): Promise<INoteResponse> {
    const note = await this.noteModel.findOneAndDelete({
      _id: noteId,
      owner: user.id,
    })

    if (note === null) {
      throw new NotFoundException('Note not found or not owned by user')
    }

    return {
      message: 'Note deleted successfully',
      note: {
        id: note.id,
        date: note.date,
        note: note.note,
      },
      owner: {
        id: user.id,
        email: user.email,
      },
    }
  }
}

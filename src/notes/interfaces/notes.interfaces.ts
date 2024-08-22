import { UserModel } from 'src/users/schemas'
import { NoteModel } from '../schemas'
import { CreateNoteDto, UpdateNoteDto } from '../dto'

interface INote extends Partial<NoteModel> {}

export interface INoteResponse {
  message: string
  note: INote
  owner: Partial<UserModel>
}

export interface INoteCreate {
  createData: CreateNoteDto
  user: UserModel
}

export interface INoteUpdate {
  noteId: string
  updateData: UpdateNoteDto
  user: UserModel
}

export interface INoteDelete {
  noteId: string
  user: UserModel
}

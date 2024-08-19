import { UserModel } from 'src/users/schemas'
import { UpdateNoteDto } from '../dto'

export interface INoteUpdate {
  noteId?: string
  noteData: UpdateNoteDto
  user: UserModel
}

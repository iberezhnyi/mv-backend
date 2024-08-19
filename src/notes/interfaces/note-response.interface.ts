import { UserModel } from 'src/users/schemas'
import { NoteModel } from '../schemas'

interface INote extends Partial<NoteModel> {}

export interface INoteResponse {
  message: string
  note: INote
  owner: Partial<UserModel>
}

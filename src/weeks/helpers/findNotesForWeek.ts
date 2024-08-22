import { Model } from 'mongoose'
import { NoteModel } from 'src/notes/schemas'

interface IFindNotesForWeekParams {
  noteModel: Model<NoteModel>
  owner: string
  startOfWeek: Date
  endOfWeek: Date
}

export async function findNotesForWeek({
  noteModel,
  owner,
  startOfWeek,
  endOfWeek,
}: IFindNotesForWeekParams) {
  return noteModel
    .find({
      owner,
      date: { $gte: startOfWeek, $lte: endOfWeek },
    })
    .populate('owner', 'email')
    .select('-createdAt -updatedAt -__v')
    .exec()
}

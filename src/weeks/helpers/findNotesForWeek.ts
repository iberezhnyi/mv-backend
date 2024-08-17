import { Model } from 'mongoose'
import { NoteModel } from 'src/notes/schemas'

export async function findNotesForWeek(
  noteModel: Model<NoteModel>,
  owner: string,
  startOfWeek: Date,
  endOfWeek: Date,
) {
  return noteModel
    .find({
      owner,
      date: { $gte: startOfWeek, $lte: endOfWeek },
    })
    .populate('owner', 'email')
    .select('-createdAt -updatedAt -__v')
    .exec()
}

import { Model } from 'mongoose'
import { NoteModel } from 'src/notes/schemas'

interface IFindNotesForWeekParams {
  noteModel: Model<NoteModel>
  ownerId: string
  startOfWeek: Date
  endOfWeek: Date
}

export async function findNotesForWeek({
  noteModel,
  ownerId,
  startOfWeek,
  endOfWeek,
}: IFindNotesForWeekParams) {
  return await noteModel
    .find({
      owner: ownerId,
      date: { $gte: startOfWeek, $lte: endOfWeek },
    })
    .populate('owner', 'email')
    .select('-createdAt -updatedAt -__v')
    .exec()
}

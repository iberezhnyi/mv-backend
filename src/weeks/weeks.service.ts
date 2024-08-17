import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { NoteModel } from '../notes/schemas/note.schema'
import { TaskModel } from 'src/tasks/schemas'
import {
  buildWeekDays,
  findNotesForWeek,
  findTasksForWeek,
  getWeekStartAndEnd,
} from './helpers'
import { UserModel } from 'src/users/schemas'

@Injectable()
export class WeeksService {
  constructor(
    @InjectModel(NoteModel.name)
    private readonly noteModel: Model<NoteModel>,

    @InjectModel(TaskModel.name)
    private readonly taskModel: Model<TaskModel>,
  ) {}

  async getWeekInfo(user: UserModel, date: Date) {
    const { id: owner } = user
    const { startOfWeek, endOfWeek } = getWeekStartAndEnd(date)

    const notes = await findNotesForWeek(
      this.noteModel,
      owner,
      startOfWeek,
      endOfWeek,
    )
    const tasks = await findTasksForWeek(
      this.taskModel,
      owner,
      startOfWeek,
      endOfWeek,
    )

    const weekDays = buildWeekDays(startOfWeek, endOfWeek, notes, tasks)

    return {
      message: `Week from ${startOfWeek} till ${endOfWeek}`,
      weekDays,
    }
  }
}

import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { TaskModel } from 'src/tasks/schemas'
import { NoteModel } from 'src/notes/schemas'
import {
  buildWeekDays,
  findNotesForWeek,
  findTasksForWeek,
  getWeekStartAndEnd,
} from './helpers'
import { IGetWeekParams, IGetWeekResponse } from './interfaces'

@Injectable()
export class WeeksService {
  constructor(
    @InjectModel(NoteModel.name)
    private readonly noteModel: Model<NoteModel>,

    @InjectModel(TaskModel.name)
    private readonly taskModel: Model<TaskModel>,
  ) {}

  async getWeekInfo({ user, date }: IGetWeekParams): Promise<IGetWeekResponse> {
    const { id: ownerId } = user
    const { startOfWeek, endOfWeek } = getWeekStartAndEnd(date)

    const notes = await findNotesForWeek({
      noteModel: this.noteModel,
      ownerId,
      startOfWeek,
      endOfWeek,
    })

    const tasks = await findTasksForWeek({
      taskModel: this.taskModel,
      ownerId,
      startOfWeek,
      endOfWeek,
    })

    const weekDays = buildWeekDays({
      startOfWeek,
      endOfWeek,
      notes,
      tasks,
      ownerId,
    })

    return {
      message: `Week from ${startOfWeek} till ${endOfWeek}`,
      weekDays,
    }
  }
}
